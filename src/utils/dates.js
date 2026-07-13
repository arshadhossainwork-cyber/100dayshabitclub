export function getToday() {
  return new Date().toISOString().split('T')[0];
}

export function isConsecutive(dateA, dateB) {
  const a = new Date(dateA);
  const b = new Date(dateB);
  const diffMs = Math.abs(a - b);
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
  return diffDays === 1;
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
