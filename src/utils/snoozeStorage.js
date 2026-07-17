import { SNOOZE_STORAGE_KEY } from './constants.js';

export const SNOOZE_OPTIONS = {
  FIFTEEN_MIN: {
    key: 'FIFTEEN_MIN',
    label: '15 minutes',
    getDuration: () => 15 * 60 * 1000,
  },
  ONE_HOUR: {
    key: 'ONE_HOUR',
    label: '1 hour',
    getDuration: () => 60 * 60 * 1000,
  },
  LATER_TODAY: {
    key: 'LATER_TODAY',
    label: 'Later today',
    getDuration: () => {
      const now = new Date();
      const later = new Date(now);
      later.setHours(now.getHours() + 3);
      // Cap at end of day
      const endOfDay = new Date(now);
      endOfDay.setHours(23, 59, 59, 999);
      return Math.min(later.getTime(), endOfDay.getTime()) - now.getTime();
    },
  },
  SKIP_TODAY: {
    key: 'SKIP_TODAY',
    label: 'Skip today',
    getDuration: () => {
      const now = new Date();
      const endOfDay = new Date(now);
      endOfDay.setHours(23, 59, 59, 999);
      return endOfDay.getTime() - now.getTime();
    },
  },
};

function loadSnoozes() {
  try {
    const raw = localStorage.getItem(SNOOZE_STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function saveSnoozes(snoozes) {
  try {
    localStorage.setItem(SNOOZE_STORAGE_KEY, JSON.stringify(snoozes));
  } catch {
    // localStorage full or unavailable
  }
}

export function snoozeHabit(habitId, untilTimestamp) {
  const snoozes = loadSnoozes();
  snoozes[habitId] = new Date(untilTimestamp).toISOString();
  saveSnoozes(snoozes);
}

export function clearSnooze(habitId) {
  const snoozes = loadSnoozes();
  delete snoozes[habitId];
  saveSnoozes(snoozes);
}

export function isSnoozed(habitId) {
  const expiry = getSnoozeExpiry(habitId);
  if (!expiry) return false;
  return new Date(expiry).getTime() > Date.now();
}

export function getSnoozeExpiry(habitId) {
  const snoozes = loadSnoozes();
  return snoozes[habitId] || null;
}

export function cleanExpiredSnoozes() {
  const snoozes = loadSnoozes();
  const now = Date.now();
  let changed = false;
  for (const id of Object.keys(snoozes)) {
    if (new Date(snoozes[id]).getTime() <= now) {
      delete snoozes[id];
      changed = true;
    }
  }
  if (changed) saveSnoozes(snoozes);
}
