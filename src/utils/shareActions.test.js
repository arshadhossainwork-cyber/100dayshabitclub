import { describe, it, expect } from 'vitest';
import { generateCaption, sanitizeFilename, buildShareUrl } from './shareActions.js';

describe('generateCaption', () => {
  it('generates completion caption', () => {
    const habit = { name: 'Reading' };
    const stats = { totalDays: 100, currentStreak: 100 };
    const caption = generateCaption(habit, stats, true);
    expect(caption).toBe('100 days of Reading, done. #100DaysHabitClub');
  });

  it('generates in-progress caption with streak', () => {
    const habit = { name: 'Reading' };
    const stats = { totalDays: 34, currentStreak: 12 };
    const caption = generateCaption(habit, stats, false);
    expect(caption).toContain('Day 34');
    expect(caption).toContain('12-day streak');
  });

  it('generates in-progress caption without streak when streak is 1', () => {
    const habit = { name: 'Running' };
    const stats = { totalDays: 10, currentStreak: 1 };
    const caption = generateCaption(habit, stats, false);
    expect(caption).toContain('Day 10');
    expect(caption).not.toContain('streak');
  });

  it('generates in-progress caption without streak when streak is 0', () => {
    const habit = { name: 'Meditating' };
    const stats = { totalDays: 5, currentStreak: 0 };
    const caption = generateCaption(habit, stats, false);
    expect(caption).toBe('Day 5 of my 100-day Meditating habit.');
  });
});

describe('sanitizeFilename', () => {
  it('lowercases and replaces non-alphanumeric chars', () => {
    expect(sanitizeFilename('My Habit Name')).toBe('my-habit-name');
  });

  it('removes leading/trailing hyphens', () => {
    expect(sanitizeFilename('--test--')).toBe('test');
  });

  it('collapses multiple special chars into one hyphen', () => {
    expect(sanitizeFilename('a!!!b???c')).toBe('a-b-c');
  });

  it('handles emoji and unicode', () => {
    const result = sanitizeFilename('Morning 🌅 Routine');
    expect(result).not.toContain('🌅');
    expect(result).toMatch(/^[a-z0-9-]+$/);
  });

  it('handles empty string', () => {
    expect(sanitizeFilename('')).toBe('');
  });
});

describe('buildShareUrl', () => {
  it('builds correct URL with slug', () => {
    const url = buildShareUrl('abc123def456');
    expect(url).toBe('https://100dayshabitclub.vercel.app/s/abc123def456?ref=share');
  });

  it('includes ref=share parameter', () => {
    const url = buildShareUrl('test');
    expect(url).toContain('?ref=share');
  });
});
