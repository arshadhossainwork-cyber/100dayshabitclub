import { describe, it, expect } from 'vitest';
import { getToday, isConsecutive, toLocalDateString, formatDate, daysSince } from './dates.js';

describe('getToday', () => {
  it('returns YYYY-MM-DD format', () => {
    const result = getToday();
    expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it('matches the current date', () => {
    const now = new Date();
    const expected = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    expect(getToday()).toBe(expected);
  });
});

describe('isConsecutive', () => {
  it('returns true for consecutive dates', () => {
    expect(isConsecutive('2025-01-01', '2025-01-02')).toBe(true);
  });

  it('returns true regardless of order', () => {
    expect(isConsecutive('2025-01-02', '2025-01-01')).toBe(true);
  });

  it('returns false for same date', () => {
    expect(isConsecutive('2025-01-01', '2025-01-01')).toBe(false);
  });

  it('returns false for dates 2 days apart', () => {
    expect(isConsecutive('2025-01-01', '2025-01-03')).toBe(false);
  });

  it('works across month boundaries', () => {
    expect(isConsecutive('2025-01-31', '2025-02-01')).toBe(true);
  });

  it('works across year boundaries', () => {
    expect(isConsecutive('2024-12-31', '2025-01-01')).toBe(true);
  });

  it('handles February to March (non-leap year)', () => {
    expect(isConsecutive('2025-02-28', '2025-03-01')).toBe(true);
  });

  it('handles leap year February', () => {
    expect(isConsecutive('2024-02-28', '2024-02-29')).toBe(true);
    expect(isConsecutive('2024-02-29', '2024-03-01')).toBe(true);
  });
});

describe('toLocalDateString', () => {
  it('formats a date as YYYY-MM-DD', () => {
    const date = new Date(2025, 0, 15); // Jan 15, 2025
    expect(toLocalDateString(date)).toBe('2025-01-15');
  });

  it('pads single-digit months and days', () => {
    const date = new Date(2025, 2, 5); // Mar 5, 2025
    expect(toLocalDateString(date)).toBe('2025-03-05');
  });
});

describe('formatDate', () => {
  it('formats ISO date string to readable format', () => {
    const result = formatDate('2025-01-15');
    expect(result).toBe('Jan 15, 2025');
  });

  it('formats December correctly', () => {
    const result = formatDate('2024-12-25');
    expect(result).toBe('Dec 25, 2024');
  });
});

describe('daysSince', () => {
  it('returns 0 for today', () => {
    expect(daysSince(getToday())).toBe(0);
  });

  it('returns positive number for past dates', () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const isoStr = toLocalDateString(yesterday);
    expect(daysSince(isoStr)).toBe(1);
  });

  it('returns correct count for several days ago', () => {
    const fiveDaysAgo = new Date();
    fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);
    const isoStr = toLocalDateString(fiveDaysAgo);
    expect(daysSince(isoStr)).toBe(5);
  });
});
