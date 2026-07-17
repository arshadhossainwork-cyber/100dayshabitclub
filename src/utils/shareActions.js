/**
 * Sharing utilities: Web Share API, download fallback, clipboard, captions.
 */

const APP_URL = 'https://100dayshabitclub.vercel.app';

/**
 * Share via Web Share API with image + caption, or fall back to download.
 */
export async function shareOrDownload(blob, filename, caption) {
  const file = new File([blob], `${sanitizeFilename(filename)}-streak.png`, {
    type: 'image/png',
  });

  if (navigator.canShare?.({ files: [file] })) {
    await navigator.share({
      files: [file],
      title: '100 Days Habit Club',
      text: caption || `My ${filename} streak!`,
    });
  } else {
    downloadImage(blob, `${sanitizeFilename(filename)}-streak.png`);
  }
}

/**
 * Direct download of a blob as a named file.
 */
export function downloadImage(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

/**
 * Copy text to clipboard using the Clipboard API.
 * Returns true on success, false on failure.
 */
export async function copyTextToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

/**
 * Generate a default caption for sharing.
 */
export function generateCaption(habit, stats, isComplete) {
  if (isComplete) {
    return `100 days of ${habit.name}, done. #100DaysHabitClub`;
  }
  const parts = [`Day ${stats.totalDays} of my 100-day ${habit.name} habit.`];
  if (stats.currentStreak > 1) {
    parts.push(`${stats.currentStreak}-day streak and counting.`);
  }
  return parts.join(' ');
}

/**
 * Build a public share URL for a shared card slug.
 */
export function buildShareUrl(slug) {
  return `${APP_URL}/s/${slug}?ref=share`;
}

/**
 * Sanitize a string for use as a filename.
 */
export function sanitizeFilename(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}
