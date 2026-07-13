import { STORAGE_KEY, DEFAULT_DATA } from './constants.js';

export function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_DATA };

    const parsed = JSON.parse(raw);
    return migrateData(parsed);
  } catch {
    return { ...DEFAULT_DATA };
  }
}

export function saveData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // localStorage full or unavailable. Fail silently.
  }
}

export function migrateData(data) {
  if (!data || typeof data !== 'object') {
    return { ...DEFAULT_DATA };
  }

  // Ensure required structure
  const migrated = {
    version: data.version || 1,
    habits: Array.isArray(data.habits) ? data.habits : [],
    settings: {
      ...DEFAULT_DATA.settings,
      ...(data.settings || {}),
    },
  };

  // Validate each habit
  migrated.habits = migrated.habits
    .filter((h) => h && typeof h === 'object' && h.id && h.name)
    .map((h) => ({
      id: h.id,
      name: String(h.name).slice(0, 100),
      color: h.color || '#4F46E5',
      createdAt: h.createdAt || new Date().toISOString().split('T')[0],
      completedDays: Array.isArray(h.completedDays) ? h.completedDays : [],
      archived: Boolean(h.archived),
    }));

  return migrated;
}
