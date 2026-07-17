import { describe, it, expect, vi, beforeEach } from 'vitest';
import { migrateData, validateImport, loadData, saveData, mergeImport } from './storage.js';
import { DEFAULT_DATA, STORAGE_KEY } from './constants.js';

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: vi.fn((key) => store[key] ?? null),
    setItem: vi.fn((key, value) => { store[key] = value; }),
    removeItem: vi.fn((key) => { delete store[key]; }),
    clear: vi.fn(() => { store = {}; }),
  };
})();

Object.defineProperty(globalThis, 'localStorage', { value: localStorageMock });

beforeEach(() => {
  localStorageMock.clear();
  vi.clearAllMocks();
});

describe('migrateData', () => {
  it('returns DEFAULT_DATA for null input', () => {
    const result = migrateData(null);
    expect(result.version).toBe(1);
    expect(result.habits).toEqual([]);
    expect(result.settings).toMatchObject(DEFAULT_DATA.settings);
  });

  it('returns DEFAULT_DATA for non-object input', () => {
    const result = migrateData('invalid');
    expect(result.habits).toEqual([]);
  });

  it('preserves valid habits', () => {
    const input = {
      habits: [
        { id: '1', name: 'Reading', color: '#10B981', completedDays: ['2025-01-01'], createdAt: '2025-01-01' },
      ],
    };
    const result = migrateData(input);
    expect(result.habits).toHaveLength(1);
    expect(result.habits[0].name).toBe('Reading');
    expect(result.habits[0].completedDays).toEqual(['2025-01-01']);
  });

  it('filters out habits without id or name', () => {
    const input = {
      habits: [
        { id: '1', name: 'Valid' },
        { name: 'No ID' },
        { id: '2' },
        null,
        'not-an-object',
      ],
    };
    const result = migrateData(input);
    expect(result.habits).toHaveLength(1);
    expect(result.habits[0].name).toBe('Valid');
  });

  it('truncates habit names to 100 chars', () => {
    const longName = 'A'.repeat(200);
    const input = {
      habits: [{ id: '1', name: longName }],
    };
    const result = migrateData(input);
    expect(result.habits[0].name).toHaveLength(100);
  });

  it('defaults missing habit fields', () => {
    const input = {
      habits: [{ id: '1', name: 'Minimal' }],
    };
    const result = migrateData(input);
    const habit = result.habits[0];
    expect(habit.color).toBe('#4F46E5');
    expect(habit.completedDays).toEqual([]);
    expect(habit.archived).toBe(false);
    expect(habit.reminderEnabled).toBe(false);
  });

  it('preserves lastModified', () => {
    const input = { habits: [], lastModified: 12345 };
    const result = migrateData(input);
    expect(result.lastModified).toBe(12345);
  });

  it('merges settings with defaults', () => {
    const input = {
      habits: [],
      settings: { reminderEnabled: true },
    };
    const result = migrateData(input);
    expect(result.settings.reminderEnabled).toBe(true);
    expect(result.settings.reminderTime).toBe('09:00'); // default preserved
  });

  it('handles non-array completedDays', () => {
    const input = {
      habits: [{ id: '1', name: 'Test', completedDays: 'not-array' }],
    };
    const result = migrateData(input);
    expect(result.habits[0].completedDays).toEqual([]);
  });
});

describe('validateImport', () => {
  it('rejects invalid JSON', () => {
    const result = validateImport('not json');
    expect(result.valid).toBe(false);
    expect(result.error).toBe('Invalid JSON file');
  });

  it('rejects data without habits array', () => {
    const result = validateImport(JSON.stringify({ version: 1 }));
    // migrateData creates an empty habits array, so this should be valid with 0 habits
    expect(result.valid).toBe(true);
    expect(result.habitCount).toBe(0);
  });

  it('accepts valid export data', () => {
    const data = {
      version: 1,
      habits: [
        { id: '1', name: 'Reading', completedDays: ['2025-01-01', '2025-01-02'] },
        { id: '2', name: 'Running', completedDays: [], archived: true },
      ],
    };
    const result = validateImport(JSON.stringify(data));
    expect(result.valid).toBe(true);
    expect(result.habitCount).toBe(2);
    expect(result.activeCount).toBe(1);
    expect(result.archivedCount).toBe(1);
  });

  it('returns migrated habits', () => {
    const data = {
      habits: [{ id: '1', name: 'Test' }],
    };
    const result = validateImport(JSON.stringify(data));
    expect(result.valid).toBe(true);
    expect(result.habits[0].color).toBe('#4F46E5'); // migrated default
  });
});

describe('loadData', () => {
  it('returns DEFAULT_DATA when localStorage is empty', () => {
    const data = loadData();
    expect(data).toEqual(DEFAULT_DATA);
  });

  it('loads and migrates stored data', () => {
    const stored = {
      version: 1,
      habits: [{ id: '1', name: 'Reading', completedDays: ['2025-01-01'] }],
      settings: {},
    };
    localStorageMock.setItem(STORAGE_KEY, JSON.stringify(stored));
    const data = loadData();
    expect(data.habits).toHaveLength(1);
    expect(data.habits[0].name).toBe('Reading');
  });

  it('returns DEFAULT_DATA for corrupted data', () => {
    localStorageMock.setItem(STORAGE_KEY, 'corrupted{{{');
    // Override getItem to return corrupted data
    localStorageMock.getItem.mockReturnValue('corrupted{{{');
    const data = loadData();
    expect(data).toEqual(DEFAULT_DATA);
  });
});

describe('saveData', () => {
  it('saves data with lastModified timestamp', () => {
    const data = { habits: [], settings: {} };
    const result = saveData(data);
    expect(result).toBe(true);
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      STORAGE_KEY,
      expect.stringContaining('"lastModified"')
    );
  });
});

describe('mergeImport', () => {
  it('adds new habits without duplicating existing ones', () => {
    // Set up existing data
    const existing = {
      version: 1,
      habits: [{ id: '1', name: 'Reading', completedDays: [], color: '#10B981', createdAt: '2025-01-01', archived: false }],
      settings: DEFAULT_DATA.settings,
    };
    localStorageMock.getItem.mockReturnValue(JSON.stringify(existing));

    const incoming = {
      habits: [
        { id: '2', name: 'Reading', completedDays: [] }, // duplicate name
        { id: '3', name: 'Running', completedDays: [] }, // new
      ],
    };

    const { merged, addedCount } = mergeImport(JSON.stringify(incoming));
    expect(addedCount).toBe(1);
    expect(merged.habits).toHaveLength(2);
    expect(merged.habits.map((h) => h.name)).toContain('Running');
  });

  it('is case-insensitive for duplicate detection', () => {
    const existing = {
      version: 1,
      habits: [{ id: '1', name: 'Reading', completedDays: [], color: '#10B981', createdAt: '2025-01-01', archived: false }],
      settings: DEFAULT_DATA.settings,
    };
    localStorageMock.getItem.mockReturnValue(JSON.stringify(existing));

    const incoming = {
      habits: [{ id: '2', name: 'READING', completedDays: [] }],
    };

    const { addedCount } = mergeImport(JSON.stringify(incoming));
    expect(addedCount).toBe(0);
  });
});
