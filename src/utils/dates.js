export function getToday() {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function isConsecutive(dateA, dateB) {
  // Use noon timestamps to avoid DST boundary issues
  const a = new Date(dateA + 'T12:00:00');
  const b = new Date(dateB + 'T12:00:00');
  const diffMs = Math.abs(a - b);
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
  return diffDays === 1;
}

export function toLocalDateString(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function formatDate(isoString) {
  const date = new Date(isoString + 'T00:00:00');
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function daysSince(isoString) {
  const start = new Date(isoString + 'T00:00:00');
  const now = new Date(getToday() + 'T00:00:00');
  return Math.floor((now - start) / (1000 * 60 * 60 * 24));
}
