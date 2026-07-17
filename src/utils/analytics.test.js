import { describe, it, expect } from 'vitest';
import { computeHabitStats, computeMilestones, computeAggregateStats } from './analytics.js';
import { getToday, toLocalDateString } from './dates.js';

// Helper: generate N consecutive dates ending on a given date
function consecutiveDays(endDate, count) {
  const end = new Date(endDate + 'T12:00:00');
  const days = [];
  for (let i = count - 1; i >= 0; i--) {
    const d = new Date(end);
    d.setDate(d.getDate() - i);
    days.push(toLocalDateString(d));
  }
  return days;
}

function makeHabit(overrides = {}) {
  return {
    id: 'test-1',
    name: 'Reading',
    color: '#10B981',
    completedDays: [],
    createdAt: '2025-01-01',
    archived: false,
    ...overrides,
  };
}

describe('computeHabitStats', () => {
  describe('edge cases', () => {
    it('returns zeros for null habit', () => {
      const stats = computeHabitStats(null);
      expect(stats).toEqual({ totalDays: 0, currentStreak: 0, longestStreak: 0, completionPct: 0 });
    });

    it('returns zeros for habit with no completedDays', () => {
      const stats = computeHabitStats(makeHabit());
      expect(stats).toEqual({ totalDays: 0, currentStreak: 0, longestStreak: 0, completionPct: 0 });
    });

    it('returns zeros for habit with empty completedDays', () => {
      const stats = computeHabitStats(makeHabit({ completedDays: [] }));
      expect(stats).toEqual({ totalDays: 0, currentStreak: 0, longestStreak: 0, completionPct: 0 });
    });
  });

  describe('totalDays and completionPct', () => {
    it('counts total completed days', () => {
      const stats = computeHabitStats(makeHabit({
        completedDays: ['2025-01-01', '2025-01-03', '2025-01-05'],
      }));
      expect(stats.totalDays).toBe(3);
    });

    it('calculates completion percentage out of 100', () => {
      const stats = computeHabitStats(makeHabit({
        completedDays: Array.from({ length: 25 }, (_, i) => `2025-01-${String(i + 1).padStart(2, '0')}`),
      }));
      expect(stats.completionPct).toBe(25);
    });

    it('caps completion percentage at 100', () => {
      const days = Array.from({ length: 105 }, (_, i) => {
        const d = new Date('2025-01-01T12:00:00');
        d.setDate(d.getDate() + i);
        return toLocalDateString(d);
      });
      const stats = computeHabitStats(makeHabit({ completedDays: days }));
      expect(stats.completionPct).toBe(100);
    });
  });

  describe('streak calculations', () => {
    it('calculates longest streak from non-consecutive days', () => {
      // 3-day streak, gap, 2-day streak
      const stats = computeHabitStats(makeHabit({
        completedDays: ['2025-01-01', '2025-01-02', '2025-01-03', '2025-01-10', '2025-01-11'],
      }));
      expect(stats.longestStreak).toBe(3);
    });

    it('calculates current streak when today is included', () => {
      const today = getToday();
      const days = consecutiveDays(today, 5);
      const stats = computeHabitStats(makeHabit({ completedDays: days }));
      expect(stats.currentStreak).toBe(5);
    });

    it('calculates current streak when yesterday is the last day', () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yStr = toLocalDateString(yesterday);
      const days = consecutiveDays(yStr, 4);
      const stats = computeHabitStats(makeHabit({ completedDays: days }));
      expect(stats.currentStreak).toBe(4);
    });

    it('returns 0 current streak when last day is before yesterday', () => {
      const threeDaysAgo = new Date();
      threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
      const str = toLocalDateString(threeDaysAgo);
      const days = consecutiveDays(str, 5);
      const stats = computeHabitStats(makeHabit({ completedDays: days }));
      expect(stats.currentStreak).toBe(0);
    });

    it('handles single day as a streak of 1', () => {
      const today = getToday();
      const stats = computeHabitStats(makeHabit({ completedDays: [today] }));
      expect(stats.totalDays).toBe(1);
      expect(stats.currentStreak).toBe(1);
      expect(stats.longestStreak).toBe(1);
    });

    it('longestStreak is at least as large as currentStreak', () => {
      const today = getToday();
      const days = consecutiveDays(today, 10);
      const stats = computeHabitStats(makeHabit({ completedDays: days }));
      expect(stats.longestStreak).toBeGreaterThanOrEqual(stats.currentStreak);
    });

    it('handles unsorted completedDays', () => {
      const today = getToday();
      const days = consecutiveDays(today, 3);
      // Reverse to make unsorted
      const stats = computeHabitStats(makeHabit({ completedDays: [...days].reverse() }));
      expect(stats.currentStreak).toBe(3);
      expect(stats.longestStreak).toBe(3);
    });
  });
});

describe('computeMilestones', () => {
  it('returns all milestones for an empty habit', () => {
    const milestones = computeMilestones(makeHabit());
    expect(milestones.length).toBeGreaterThan(0);
    expect(milestones.every((m) => m.unlocked === false)).toBe(true);
  });

  it('unlocks first_completion with 1 day', () => {
    const habit = makeHabit({ completedDays: ['2025-01-01'] });
    const milestones = computeMilestones(habit);
    const first = milestones.find((m) => m.id === 'first_completion');
    expect(first.unlocked).toBe(true);
    expect(first.progress).toBe(100);
  });

  it('unlocks streak milestones based on longest streak', () => {
    const today = getToday();
    const days = consecutiveDays(today, 8);
    const habit = makeHabit({ completedDays: days });
    const milestones = computeMilestones(habit);

    const streak3 = milestones.find((m) => m.id === 'streak_3');
    const streak7 = milestones.find((m) => m.id === 'streak_7');
    const streak14 = milestones.find((m) => m.id === 'streak_14');

    expect(streak3.unlocked).toBe(true);
    expect(streak7.unlocked).toBe(true);
    expect(streak14.unlocked).toBe(false);
  });

  it('unlocks comeback after a gap of 3+ days', () => {
    const habit = makeHabit({
      completedDays: ['2025-01-01', '2025-01-02', '2025-01-10', '2025-01-11'],
    });
    const milestones = computeMilestones(habit);
    const comeback = milestones.find((m) => m.id === 'comeback');
    expect(comeback.unlocked).toBe(true);
  });

  it('does not unlock comeback for gaps <= 3 days', () => {
    const habit = makeHabit({
      completedDays: ['2025-01-01', '2025-01-04'],
    });
    const milestones = computeMilestones(habit);
    const comeback = milestones.find((m) => m.id === 'comeback');
    expect(comeback.unlocked).toBe(false);
  });

  it('calculates progress percentage for partial streaks', () => {
    const today = getToday();
    const days = consecutiveDays(today, 5);
    const habit = makeHabit({ completedDays: days });
    const milestones = computeMilestones(habit);

    const streak7 = milestones.find((m) => m.id === 'streak_7');
    expect(streak7.unlocked).toBe(false);
    expect(streak7.progress).toBe(71); // Math.round(5/7 * 100)
  });
});

describe('computeAggregateStats', () => {
  it('returns zeros for empty array', () => {
    const agg = computeAggregateStats([]);
    expect(agg.totalHabits).toBe(0);
    expect(agg.totalCompletions).toBe(0);
  });

  it('counts active and archived habits', () => {
    const habits = [
      makeHabit({ id: '1', archived: false }),
      makeHabit({ id: '2', archived: true }),
      makeHabit({ id: '3', archived: false }),
    ];
    const agg = computeAggregateStats(habits);
    expect(agg.totalHabits).toBe(3);
    expect(agg.activeHabits).toBe(2);
  });

  it('sums total completions across habits', () => {
    const habits = [
      makeHabit({ id: '1', completedDays: ['2025-01-01', '2025-01-02'] }),
      makeHabit({ id: '2', completedDays: ['2025-01-01'] }),
    ];
    const agg = computeAggregateStats(habits);
    expect(agg.totalCompletions).toBe(3);
  });

  it('counts completed habits (100+ days)', () => {
    const fullDays = Array.from({ length: 100 }, (_, i) => {
      const d = new Date('2025-01-01T12:00:00');
      d.setDate(d.getDate() + i);
      return toLocalDateString(d);
    });
    const habits = [
      makeHabit({ id: '1', completedDays: fullDays }),
      makeHabit({ id: '2', completedDays: ['2025-01-01'] }),
    ];
    const agg = computeAggregateStats(habits);
    expect(agg.completedHabits).toBe(1);
  });
});
