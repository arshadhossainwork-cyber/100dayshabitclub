import { STORAGE_KEY, BACKUP_KEY, RECOVERY_KEY, DEFAULT_DATA } from './constants.js';
import { getToday } from './dates.js';

export function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_DATA };

    const parsed = JSON.parse(raw);
    return migrateData(parsed);
  } catch {
    // Save corrupted data for potential recovery before returning defaults
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        localStorage.setItem(RECOVERY_KEY, raw);
      }
    } catch {
      // Can't save recovery data either — nothing we can do
    }
    return { ...DEFAULT_DATA };
  }
}

export function saveData(data) {
  try {
    const withTimestamp = { ...data, lastModified: Date.now() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(withTimestamp));
    return true;
  } catch {
    return false;
  }
}

export function exportData() {
  const data = loadData();
  const output = { ...data, exportedAt: new Date().toISOString() };
  return JSON.stringify(output, null, 2);
}

export function importData(jsonString) {
  createBackup();
  const parsed = JSON.parse(jsonString);
  const migrated = migrateData(parsed);
  saveData(migrated);
  return migrated;
}

export function exportCSV(habits) {
  const header = 'Habit,Color,Created,Completed Days,Archived,Dates';
  const rows = habits.map((h) => {
    const name = csvEscape(h.name);
    const color = csvEscape(h.color);
    const created = csvEscape(h.createdAt);
    const count = h.completedDays.length;
    const archived = h.archived ? 'Yes' : 'No';
    const dates = csvEscape(h.completedDays.join('; '));
    return `${name},${color},${created},${count},${archived},${dates}`;
  });
  return [header, ...rows].join('\n');
}

function csvEscape(value) {
  const str = String(value);
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export function validateImport(jsonString) {
  try {
    const parsed = JSON.parse(jsonString);
    const migrated = migrateData(parsed);

    if (!Array.isArray(migrated.habits)) {
      return { valid: false, error: 'No habits found in file' };
    }

    const activeCount = migrated.habits.filter((h) => !h.archived).length;
    const archivedCount = migrated.habits.filter((h) => h.archived).length;

    return {
      valid: true,
      data: migrated,
      habitCount: migrated.habits.length,
      activeCount,
      archivedCount,
      habits: migrated.habits,
    };
  } catch {
    return { valid: false, error: 'Invalid JSON file' };
  }
}

export function createBackup() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      localStorage.setItem(BACKUP_KEY, raw);
    }
    return true;
  } catch {
    return false;
  }
}

export function resetAllData() {
  createBackup();
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch {
    return false;
  }
}

export function mergeImport(jsonString) {
  createBackup();
  const current = loadData();
  const parsed = JSON.parse(jsonString);
  const incoming = migrateData(parsed);

  const existingNames = new Set(
    current.habits.map((h) => h.name.toLowerCase())
  );

  const newHabits = incoming.habits.filter(
    (h) => !existingNames.has(h.name.toLowerCase())
  );

  const merged = {
    ...current,
    habits: [...current.habits, ...newHabits],
  };

  saveData(merged);
  return { merged, addedCount: newHabits.length };
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

  // Preserve lastModified if it exists
  if (data.lastModified) {
    migrated.lastModified = data.lastModified;
  }

  // Validate each habit
  migrated.habits = migrated.habits
    .filter((h) => h && typeof h === 'object' && h.id && h.name)
    .map((h) => ({
      id: h.id,
      name: String(h.name).slice(0, 100),
      color: h.color || '#4F46E5',
      createdAt: h.createdAt || getToday(),
      completedDays: Array.isArray(h.completedDays) ? h.completedDays : [],
      archived: Boolean(h.archived),
      updatedAt: h.updatedAt || Date.now(),
      reminderEnabled: Boolean(h.reminderEnabled),
      reminderTime: h.reminderTime || null,
      reminderDays: Array.isArray(h.reminderDays) ? h.reminderDays : null,
      reminderMessage: h.reminderMessage || null,
      snoozedUntil: h.snoozedUntil || null,
    }));

  return migrated;
}
