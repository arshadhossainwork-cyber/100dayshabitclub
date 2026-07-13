import { useMemo } from 'react';
import { getToday, isConsecutive } from '../utils/dates.js';

export function useStats(habit) {
  return useMemo(() => {
    if (!habit || !habit.completedDays || habit.completedDays.length === 0) {
      return {
        totalDays: 0,
        currentStreak: 0,
        longestStreak: 0,
        completionPct: 0,
      };
    }

    const sorted = [...habit.completedDays].sort();
    const totalDays = sorted.length;
    const completionPct = Math.round((totalDays / 100) * 100);

    // Compute streaks
    let longestStreak = 1;
    let currentRun = 1;

    for (let i = 1; i < sorted.length; i++) {
      if (isConsecutive(sorted[i - 1], sorted[i])) {
        currentRun++;
        longestStreak = Math.max(longestStreak, currentRun);
      } else {
        currentRun = 1;
      }
    }

    // Current streak: count backwards from today
    const today = getToday();
    let currentStreak = 0;

    if (sorted.includes(today)) {
      currentStreak = 1;
      let checkDate = today;
      for (let i = sorted.length - 1; i >= 0; i--) {
        if (sorted[i] === checkDate) continue;
        if (isConsecutive(sorted[i], checkDate)) {
          currentStreak++;
          checkDate = sorted[i];
        } else if (sorted[i] < checkDate) {
          break;
        }
      }
    } else {
      // Check if yesterday is the last completed day
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];

      if (sorted[sorted.length - 1] === yesterdayStr) {
        currentStreak = 1;
        let checkDate = yesterdayStr;
        for (let i = sorted.length - 2; i >= 0; i--) {
          if (isConsecutive(sorted[i], checkDate)) {
            currentStreak++;
            checkDate = sorted[i];
          } else {
            break;
          }
        }
      }
    }

    return {
      totalDays,
      currentStreak,
      longestStreak: Math.max(longestStreak, currentStreak),
      completionPct: Math.min(completionPct, 100),
    };
  }, [habit]);
}
