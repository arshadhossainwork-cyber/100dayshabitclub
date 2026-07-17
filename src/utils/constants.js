export const GRID_SIZE = 100;
export const GRID_COLS = 10;
export const STORAGE_KEY = 'habitClub_data';
export const BACKUP_KEY = 'habitClub_data_backup';
export const RECOVERY_KEY = 'habitClub_data_recovery';
export const SYNC_KEY = 'habitClub_sync';
export const SNOOZE_STORAGE_KEY = 'habitClub_snooze';

export const NOTIFICATION_IDS = {
  GLOBAL: 100,
  DAILY_SUMMARY: 101,
  MILESTONE: 102,
  HABIT_BASE: 200,
};

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
    quietHoursEnabled: false,
    quietHoursStart: '22:00',
    quietHoursEnd: '07:00',
    weekendReminders: true,
    dailySummaryEnabled: false,
    dailySummaryTime: '21:00',
    missedHabitReminder: true,
    milestoneNotifications: true,
    timezone: null,
    notificationPermissionAsked: false,
  },
};

export const MILESTONES = [25, 50, 75, 100];
