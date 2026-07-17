/**
 * One-time script to generate PWA icons and OG image.
 * Run: node scripts/generate-icons.js
 * Requires: npm install -D canvas
 */
import { createCanvas } from 'canvas';
import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');

const BG = '#080A10';
const SURFACE = '#101320';
const PRIMARY = '#10B981';
const TEXT = '#E8EAF2';
const MUTED = '#8891AB';

function drawLogo(ctx, cx, cy, size) {
  ctx.font = `800 ${size}px -apple-system, BlinkMacSystemFont, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = PRIMARY;
  ctx.fillText('100', cx, cy);
}

function generateIcon(size) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = BG;
  ctx.fillRect(0, 0, size, size);

  // Subtle circle bg
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size * 0.38, 0, Math.PI * 2);
  ctx.fillStyle = SURFACE;
  ctx.fill();

  // Logo text
  drawLogo(ctx, size / 2, size / 2, size * 0.3);

  return canvas.toBuffer('image/png');
}

function generateOGImage() {
  const w = 1200;
  const h = 630;
  const canvas = createCanvas(w, h);
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = BG;
  ctx.fillRect(0, 0, w, h);

  // Subtle gradient overlay
  const grad = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, 400);
  grad.addColorStop(0, 'rgba(16, 185, 129, 0.08)');
  grad.addColorStop(1, 'transparent');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // "100" big text
  ctx.font = '800 180px -apple-system, BlinkMacSystemFont, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = PRIMARY;
  ctx.fillText('100', w / 2, h * 0.35);

  // "Days Habit Club" subtitle
  ctx.font = '700 48px -apple-system, BlinkMacSystemFont, sans-serif';
  ctx.fillStyle = TEXT;
  ctx.fillText('Days Habit Club', w / 2, h * 0.58);

  // Tagline
  ctx.font = '400 24px -apple-system, BlinkMacSystemFont, sans-serif';
  ctx.fillStyle = MUTED;
  ctx.fillText('Build lasting habits. Track your streak.', w / 2, h * 0.72);

  // Small 10x10 grid preview (decorative)
  const gridSize = 8;
  const gridGap = 3;
  const gridTotal = gridSize * 10 + gridGap * 9;
  const gridX = w / 2 - gridTotal / 2;
  const gridY = h * 0.82;
  for (let row = 0; row < 2; row++) {
    for (let col = 0; col < 10; col++) {
      const x = gridX + col * (gridSize + gridGap);
      const y = gridY + row * (gridSize + gridGap);
      ctx.fillStyle = col < 7 - row * 3 ? PRIMARY : SURFACE;
      ctx.beginPath();
      ctx.roundRect(x, y, gridSize, gridSize, 2);
      ctx.fill();
    }
  }

  return canvas.toBuffer('image/png');
}

// Generate all assets
writeFileSync(join(publicDir, 'pwa-192x192.png'), generateIcon(192));
writeFileSync(join(publicDir, 'pwa-512x512.png'), generateIcon(512));
writeFileSync(join(publicDir, 'apple-touch-icon-180x180.png'), generateIcon(180));
writeFileSync(join(publicDir, 'og-image.png'), generateOGImage());

console.log('Generated:');
console.log('  public/pwa-192x192.png');
console.log('  public/pwa-512x512.png');
console.log('  public/apple-touch-icon-180x180.png');
console.log('  public/og-image.png');
