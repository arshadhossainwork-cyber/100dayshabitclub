/**
 * Multi-format canvas rendering engine for share cards.
 * Produces PNG blobs in three formats: square, portrait, landscape.
 * Supports visibility toggles and a gold completion variant.
 */

const BG = '#080A10';
const SURFACE = '#101320';
const TEXT = '#E8EAF2';
const MUTED = '#8891AB';
const FONT = '-apple-system, BlinkMacSystemFont, sans-serif';
const GOLD = '#F59E0B';

export const CARD_FORMATS = {
  SQUARE: { w: 1080, h: 1080, key: 'square' },
  PORTRAIT: { w: 1080, h: 1920, key: 'portrait' },
  LANDSCAPE: { w: 1920, h: 1080, key: 'landscape' },
};

export const DEFAULT_VISIBILITY = {
  showName: true,
  showDay: true,
  showPct: true,
  showStreak: true,
  showBestStreak: true,
  showGrid: true,
  showMilestones: true,
  showDates: false,
  showIdentity: false,
};

/**
 * @param {object} options
 * @param {'square'|'portrait'|'landscape'} options.format
 * @param {object} options.habit - { name, color, completedDays }
 * @param {object} options.stats - { totalDays, currentStreak, longestStreak, completionPct }
 * @param {Array} [options.milestones] - [{ name, unlocked }]
 * @param {object} [options.visibility] - toggle flags
 * @param {string|null} [options.displayName]
 * @param {boolean} [options.isComplete]
 * @returns {Promise<Blob>}
 */
export function renderShareCard(options) {
  const {
    format = 'square',
    habit,
    stats,
    milestones = [],
    visibility = DEFAULT_VISIBILITY,
    displayName = null,
    isComplete = false,
  } = options;

  const vis = { ...DEFAULT_VISIBILITY, ...visibility };
  const fmt = Object.values(CARD_FORMATS).find((f) => f.key === format) || CARD_FORMATS.SQUARE;
  const W = fmt.w;
  const H = fmt.h;
  const color = isComplete ? GOLD : (habit.color || '#10B981');
  const completedCount = habit.completedDays?.length || 0;
  const unlockedMilestones = milestones.filter((m) => m.unlocked);

  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d');

    // Background
    ctx.fillStyle = BG;
    ctx.fillRect(0, 0, W, H);

    // Accent glow
    const glowX = format === 'landscape' ? W * 0.3 : W / 2;
    const glowY = format === 'portrait' ? H * 0.25 : H * 0.35;
    const glow = ctx.createRadialGradient(glowX, glowY, 0, glowX, glowY, 350);
    glow.addColorStop(0, color + '18');
    glow.addColorStop(1, 'transparent');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, W, H);

    // Top accent bar
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, W, 6);

    if (format === 'landscape') {
      renderLandscape(ctx, W, H, color, habit, stats, vis, unlockedMilestones, completedCount, isComplete, displayName);
    } else if (format === 'portrait') {
      renderPortrait(ctx, W, H, color, habit, stats, vis, unlockedMilestones, completedCount, isComplete, displayName);
    } else {
      renderSquare(ctx, W, H, color, habit, stats, vis, unlockedMilestones, completedCount, isComplete, displayName);
    }

    canvas.toBlob((blob) => resolve(blob), 'image/png');
  });
}

// ─── Square (1080x1080) ─────────────────────────────────────────

function renderSquare(ctx, W, H, color, habit, stats, vis, milestones, completedCount, isComplete, displayName) {
  let y = 70;

  // Achievement title for completion
  if (isComplete) {
    ctx.font = `800 28px ${FONT}`;
    ctx.textAlign = 'center';
    ctx.fillStyle = GOLD;
    ctx.fillText('100 DAYS COMPLETE', W / 2, y);
    y += 50;
  }

  // Habit name
  if (vis.showName && habit.name) {
    ctx.font = `800 52px ${FONT}`;
    ctx.textAlign = 'center';
    ctx.fillStyle = TEXT;
    ctx.fillText(truncate(habit.name, 28), W / 2, y + 30);
    y += 70;
  }

  // Stats row
  y = renderStatsRow(ctx, W, y + 20, color, stats, vis);

  // Grid
  if (vis.showGrid) {
    const gridSize = 64;
    const gridGap = 8;
    y = renderGrid(ctx, W, y + 20, gridSize, gridGap, color, completedCount);
  }

  // Milestones
  if (vis.showMilestones && milestones.length > 0) {
    y = renderMilestones(ctx, W, y + 20, milestones);
  }

  // Identity
  if (vis.showIdentity && displayName) {
    ctx.font = `500 22px ${FONT}`;
    ctx.textAlign = 'center';
    ctx.fillStyle = MUTED;
    ctx.fillText(truncate(displayName, 40), W / 2, H - 80);
  }

  // Watermark
  ctx.font = `600 24px ${FONT}`;
  ctx.fillStyle = MUTED;
  ctx.textAlign = 'center';
  ctx.fillText('100 Days Habit Club', W / 2, H - 40);
}

// ─── Portrait (1080x1920) ───────────────────────────────────────

function renderPortrait(ctx, W, H, color, habit, stats, vis, milestones, completedCount, isComplete, displayName) {
  let y = 100;

  // Achievement title
  if (isComplete) {
    ctx.font = `800 32px ${FONT}`;
    ctx.textAlign = 'center';
    ctx.fillStyle = GOLD;
    ctx.fillText('100 DAYS COMPLETE', W / 2, y);
    y += 60;
  }

  // Habit name (larger)
  if (vis.showName && habit.name) {
    ctx.font = `800 60px ${FONT}`;
    ctx.textAlign = 'center';
    ctx.fillStyle = TEXT;
    ctx.fillText(truncate(habit.name, 24), W / 2, y + 40);
    y += 80;
  }

  // Day count hero
  if (vis.showDay) {
    ctx.font = `800 80px ${FONT}`;
    ctx.textAlign = 'center';
    ctx.fillStyle = color;
    ctx.fillText(`Day ${stats.totalDays}`, W / 2, y + 60);
    ctx.font = `500 28px ${FONT}`;
    ctx.fillStyle = MUTED;
    ctx.fillText('of 100', W / 2, y + 100);
    y += 140;
  }

  // Stats 2x2
  y = renderStats2x2(ctx, W, y + 20, color, stats, vis);

  // Grid (larger cells)
  if (vis.showGrid) {
    const gridSize = 80;
    const gridGap = 10;
    y = renderGrid(ctx, W, y + 30, gridSize, gridGap, color, completedCount);
  }

  // Milestones
  if (vis.showMilestones && milestones.length > 0) {
    y = renderMilestones(ctx, W, y + 30, milestones);
  }

  // Dates
  if (vis.showDates && habit.completedDays?.length > 0) {
    const sorted = [...habit.completedDays].sort();
    const first = formatDateShort(sorted[0]);
    const last = formatDateShort(sorted[sorted.length - 1]);
    ctx.font = `500 24px ${FONT}`;
    ctx.textAlign = 'center';
    ctx.fillStyle = MUTED;
    ctx.fillText(`${first}  \u2192  ${last}`, W / 2, y + 30);
    y += 50;
  }

  // Identity
  if (vis.showIdentity && displayName) {
    ctx.font = `500 24px ${FONT}`;
    ctx.textAlign = 'center';
    ctx.fillStyle = MUTED;
    ctx.fillText(truncate(displayName, 40), W / 2, H - 90);
  }

  // Watermark
  ctx.font = `600 26px ${FONT}`;
  ctx.fillStyle = MUTED;
  ctx.textAlign = 'center';
  ctx.fillText('100 Days Habit Club', W / 2, H - 50);
}

// ─── Landscape (1920x1080) ──────────────────────────────────────

function renderLandscape(ctx, W, H, color, habit, stats, vis, milestones, completedCount, isComplete, displayName) {
  const leftW = W / 2;
  let y = 100;

  // Left half: name + stats + milestones + watermark

  // Achievement title
  if (isComplete) {
    ctx.font = `800 28px ${FONT}`;
    ctx.textAlign = 'center';
    ctx.fillStyle = GOLD;
    ctx.fillText('100 DAYS COMPLETE', leftW / 2, y);
    y += 50;
  }

  // Habit name
  if (vis.showName && habit.name) {
    ctx.font = `800 48px ${FONT}`;
    ctx.textAlign = 'center';
    ctx.fillStyle = TEXT;
    ctx.fillText(truncate(habit.name, 22), leftW / 2, y + 30);
    y += 70;
  }

  // Stats stacked
  const statItems = buildStatItems(stats, vis, color);
  ctx.textAlign = 'center';
  statItems.forEach((s) => {
    ctx.font = `800 44px ${FONT}`;
    ctx.fillStyle = s.highlight ? color : TEXT;
    ctx.fillText(s.value, leftW / 2, y + 20);

    ctx.font = `500 20px ${FONT}`;
    ctx.fillStyle = MUTED;
    ctx.fillText(s.label, leftW / 2, y + 50);
    y += 75;
  });

  // Milestones
  if (vis.showMilestones && milestones.length > 0) {
    y += 10;
    const names = milestones.slice(0, 4).map((m) => m.name);
    ctx.font = `600 20px ${FONT}`;
    ctx.fillStyle = color;
    ctx.textAlign = 'center';
    ctx.fillText(names.join('  \u00B7  '), leftW / 2, y);
    y += 30;
  }

  // Identity
  if (vis.showIdentity && displayName) {
    ctx.font = `500 22px ${FONT}`;
    ctx.textAlign = 'center';
    ctx.fillStyle = MUTED;
    ctx.fillText(truncate(displayName, 40), leftW / 2, H - 80);
  }

  // Watermark
  ctx.font = `600 24px ${FONT}`;
  ctx.fillStyle = MUTED;
  ctx.textAlign = 'center';
  ctx.fillText('100 Days Habit Club', leftW / 2, H - 40);

  // Right half: grid
  if (vis.showGrid) {
    const gridSize = 72;
    const gridGap = 8;
    const gridTotal = gridSize * 10 + gridGap * 9;
    const gridX = leftW + (leftW - gridTotal) / 2;
    const gridY = (H - gridTotal) / 2;
    renderGridAt(ctx, gridX, gridY, gridSize, gridGap, color, completedCount);
  }
}

// ─── Shared rendering helpers ───────────────────────────────────

function renderStatsRow(ctx, W, y, color, stats, vis) {
  const statItems = buildStatItems(stats, vis, color);
  if (statItems.length === 0) return y;

  const statW = 200;
  const startX = (W - statW * statItems.length) / 2;

  ctx.textAlign = 'center';
  statItems.forEach((s, i) => {
    const cx = startX + i * statW + statW / 2;

    ctx.font = `800 44px ${FONT}`;
    ctx.fillStyle = s.highlight ? color : TEXT;
    ctx.fillText(s.value, cx, y);

    ctx.font = `500 20px ${FONT}`;
    ctx.fillStyle = MUTED;
    ctx.fillText(s.label, cx, y + 30);
  });

  return y + 60;
}

function renderStats2x2(ctx, W, y, color, stats, vis) {
  const statItems = buildStatItems(stats, vis, color);
  if (statItems.length === 0) return y;

  const colW = 280;
  const rowH = 100;
  const cols = 2;
  const startX = (W - colW * cols) / 2;

  ctx.textAlign = 'center';
  statItems.forEach((s, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const cx = startX + col * colW + colW / 2;
    const cy = y + row * rowH;

    ctx.font = `800 48px ${FONT}`;
    ctx.fillStyle = s.highlight ? color : TEXT;
    ctx.fillText(s.value, cx, cy);

    ctx.font = `500 22px ${FONT}`;
    ctx.fillStyle = MUTED;
    ctx.fillText(s.label, cx, cy + 34);
  });

  const rows = Math.ceil(statItems.length / cols);
  return y + rows * rowH;
}

function renderGrid(ctx, W, y, gridSize, gridGap, color, completedCount) {
  const gridTotal = gridSize * 10 + gridGap * 9;
  const gridX = (W - gridTotal) / 2;
  renderGridAt(ctx, gridX, y, gridSize, gridGap, color, completedCount);
  return y + gridTotal;
}

function renderGridAt(ctx, x, y, gridSize, gridGap, color, completedCount) {
  for (let i = 0; i < 100; i++) {
    const col = i % 10;
    const row = Math.floor(i / 10);
    const cx = x + col * (gridSize + gridGap);
    const cy = y + row * (gridSize + gridGap);
    const filled = i < completedCount;

    ctx.beginPath();
    ctx.roundRect(cx, cy, gridSize, gridSize, 10);
    ctx.fillStyle = filled ? color : SURFACE;
    ctx.fill();
  }
}

function renderMilestones(ctx, W, y, milestones) {
  const names = milestones.slice(0, 4).map((m) => m.name);
  if (milestones.length > 4) names.push(`+${milestones.length - 4}`);
  const text = names.join('  \u00B7  ');

  ctx.font = `600 22px ${FONT}`;
  ctx.textAlign = 'center';
  ctx.fillStyle = MUTED;
  ctx.fillText(text, W / 2, y);
  return y + 40;
}

function buildStatItems(stats, vis, color) {
  const items = [];
  if (vis.showStreak) items.push({ value: String(stats.currentStreak), label: 'Streak', highlight: true });
  if (vis.showBestStreak) items.push({ value: String(stats.longestStreak), label: 'Best', highlight: false });
  if (vis.showPct) items.push({ value: `${stats.completionPct}%`, label: 'Done', highlight: false });
  if (vis.showDay) items.push({ value: String(stats.totalDays), label: 'Total', highlight: false });
  return items;
}

function truncate(str, max) {
  return str.length > max ? str.slice(0, max - 1) + '\u2026' : str;
}

function formatDateShort(isoStr) {
  const d = new Date(isoStr + 'T12:00:00');
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}
