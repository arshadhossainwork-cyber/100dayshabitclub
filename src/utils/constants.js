export const GRID_SIZE = 100;
export const GRID_COLS = 10;
export const STORAGE_KEY = 'habitClub_data';

export const HABIT_COLORS = [
  { name: 'Emerald', value: '#059669' },
  { name: 'Indigo', value: '#4F46E5' },
  { name: 'Rose', value: '#E11D48' },
  { name: 'Amber', value: '#D97706' },
  { name: 'Sky', value: '#0284C7' },
  { name: 'Violet', value: '#7C3AED' },
  { name: 'Teal', value: '#0D9488' },
  { name: 'Fuchsia', value: '#C026D3' },
];

export const DEFAULT_DATA = {
  version: 1,
  habits: [],
  settings: {
    reminderEnabled: false,
    reminderTime: '09:00',
  },
};

export const MILESTONES = [25, 50, 75, 100];
