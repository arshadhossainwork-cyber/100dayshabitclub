import { getToday, isConsecutive, toLocalDateString } from './dates.js';

// ─── Per-habit stats ───────────────────────────────────────────

export function computeHabitStats(habit) {
  if (!habit || !habit.completedDays || habit.completedDays.length === 0) {
    return { totalDays: 0, currentStreak: 0, longestStreak: 0, completionPct: 0 };
  }

  const sorted = [...habit.completedDays].sort();
  const totalDays = sorted.length;
  const completionPct = Math.min(Math.round((totalDays / 100) * 100), 100);

  let longestStreak = 1;
  let run = 1;
  for (let i = 1; i < sorted.length; i++) {
    if (isConsecutive(sorted[i - 1], sorted[i])) {
      run++;
      if (run > longestStreak) longestStreak = run;
    } else {
      run = 1;
    }
  }

  const today = getToday();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = toLocalDateString(yesterday);
  let currentStreak = 0;

  if (sorted.includes(today)) {
    currentStreak = 1;
    let check = today;
    for (let i = sorted.length - 1; i >= 0; i--) {
      if (sorted[i] === check) continue;
      if (isConsecutive(sorted[i], check)) {
        currentStreak++;
        check = sorted[i];
      } else if (sorted[i] < check) break;
    }
  } else if (sorted[sorted.length - 1] === yesterdayStr) {
    currentStreak = 1;
    let check = yesterdayStr;
    for (let i = sorted.length - 2; i >= 0; i--) {
      if (isConsecutive(sorted[i], check)) {
        currentStreak++;
        check = sorted[i];
      } else break;
    }
  }

  return {
    totalDays,
    currentStreak,
    longestStreak: Math.max(longestStreak, currentStreak),
    completionPct,
  };
}

// ─── Aggregate stats across all habits ─────────────────────────

export function computeAggregateStats(habits) {
  if (!habits || habits.length === 0) {
    return {
      totalHabits: 0,
      activeHabits: 0,
      completedHabits: 0,
      totalCompletions: 0,
      overallCompletionRate: 0,
      bestCurrentStreak: 0,
      bestLongestStreak: 0,
      totalActiveDays: 0,
      mostConsistentHabit: null,
      habitNeedingAttention: null,
    };
  }

  const activeHabits = habits.filter((h) => !h.archived);
  const allStats = habits.map((h) => ({ habit: h, stats: computeHabitStats(h) }));
  const activeStats = allStats.filter((s) => !s.habit.archived);

  const totalCompletions = allStats.reduce((sum, s) => sum + s.stats.totalDays, 0);

  // Overall completion rate: average percentage across active habits
  const overallCompletionRate = activeStats.length > 0
    ? Math.round(activeStats.reduce((sum, s) => sum + s.stats.completionPct, 0) / activeStats.length)
    : 0;

  const bestCurrentStreak = Math.max(0, ...allStats.map((s) => s.stats.currentStreak));
  const bestLongestStreak = Math.max(0, ...allStats.map((s) => s.stats.longestStreak));

  // Total unique active days (any habit completed)
  const allDays = new Set();
  for (const h of habits) {
    if (h.completedDays) h.completedDays.forEach((d) => allDays.add(d));
  }

  // Most consistent habit: highest completion rate among active habits
  let mostConsistentHabit = null;
  if (activeStats.length > 0) {
    const sorted = [...activeStats].sort((a, b) => b.stats.completionPct - a.stats.completionPct);
    if (sorted[0].stats.totalDays > 0) {
      mostConsistentHabit = { name: sorted[0].habit.name, color: sorted[0].habit.color, pct: sorted[0].stats.completionPct };
    }
  }

  // Habit needing attention: active habit with longest gap since last completion
  let habitNeedingAttention = null;
  const today = getToday();
  if (activeStats.length > 0) {
    let worstGap = -1;
    for (const { habit, stats } of activeStats) {
      if (stats.totalDays === 0) {
        // Never completed — definitely needs attention
        habitNeedingAttention = { name: habit.name, color: habit.color, daysSince: null };
        worstGap = Infinity;
        continue;
      }
      if (stats.completionPct >= 100) continue; // completed habits don't need attention
      const lastDay = [...habit.completedDays].sort().pop();
      const gap = daysBetween(lastDay, today);
      if (gap > worstGap && gap > 1) {
        worstGap = gap;
        habitNeedingAttention = { name: habit.name, color: habit.color, daysSince: gap };
      }
    }
  }

  const completedHabits = habits.filter((h) => h.completedDays && h.completedDays.length >= 100).length;

  return {
    totalHabits: habits.length,
    activeHabits: activeHabits.length,
    completedHabits,
    totalCompletions,
    overallCompletionRate,
    bestCurrentStreak,
    bestLongestStreak,
    totalActiveDays: allDays.size,
    mostConsistentHabit,
    habitNeedingAttention,
  };
}

// ─── Chart data generators ─────────────────────────────────────

/**
 * Weekly completion data: last 7 days, count of completions per day across all habits
 */
export function weeklyChartData(habits) {
  const today = new Date(getToday() + 'T12:00:00');
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    days.push(toLocalDateString(d));
  }

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const activeHabits = habits.filter((h) => !h.archived);
  const maxPossible = activeHabits.length;

  return days.map((dateStr) => {
    const d = new Date(dateStr + 'T12:00:00');
    let count = 0;
    for (const h of activeHabits) {
      if (h.completedDays && h.completedDays.includes(dateStr)) count++;
    }
    return {
      date: dateStr,
      label: dayNames[d.getDay()],
      count,
      total: maxPossible,
      pct: maxPossible > 0 ? Math.round((count / maxPossible) * 100) : 0,
    };
  });
}

/**
 * Monthly completion data: last 30 days grouped by week
 */
export function monthlyChartData(habits) {
  const today = new Date(getToday() + 'T12:00:00');
  const activeHabits = habits.filter((h) => !h.archived);
  const weeks = [];

  for (let w = 3; w >= 0; w--) {
    const weekStart = new Date(today);
    weekStart.setDate(weekStart.getDate() - (w * 7 + 6));
    const weekEnd = new Date(today);
    weekEnd.setDate(weekEnd.getDate() - w * 7);

    let completions = 0;
    let possible = 0;
    for (let i = 0; i < 7; i++) {
      const d = new Date(weekStart);
      d.setDate(d.getDate() + i);
      const dateStr = toLocalDateString(d);
      for (const h of activeHabits) {
        if (h.completedDays && h.completedDays.includes(dateStr)) completions++;
      }
      possible += activeHabits.length;
    }

    weeks.push({
      label: `Week ${4 - w}`,
      completions,
      possible,
      pct: possible > 0 ? Math.round((completions / possible) * 100) : 0,
    });
  }

  return weeks;
}

/**
 * Weekday completion pattern: which days of the week are most productive
 */
export function weekdayCompletionData(habits) {
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const counts = [0, 0, 0, 0, 0, 0, 0];

  for (const h of habits) {
    if (!h.completedDays) continue;
    for (const dateStr of h.completedDays) {
      const d = new Date(dateStr + 'T12:00:00');
      counts[d.getDay()]++;
    }
  }

  const max = Math.max(1, ...counts);
  return dayNames.map((name, i) => ({
    day: name,
    count: counts[i],
    pct: Math.round((counts[i] / max) * 100),
  }));
}

/**
 * Habit comparison: side-by-side stats for each habit
 */
export function habitComparisonData(habits) {
  return habits
    .filter((h) => !h.archived)
    .map((h) => {
      const stats = computeHabitStats(h);
      return {
        id: h.id,
        name: h.name,
        color: h.color,
        totalDays: stats.totalDays,
        currentStreak: stats.currentStreak,
        longestStreak: stats.longestStreak,
        completionPct: stats.completionPct,
      };
    })
    .sort((a, b) => b.completionPct - a.completionPct);
}

/**
 * Calendar heatmap: last 90 days, intensity = number of habits completed that day
 */
export function calendarHeatmapData(habits) {
  const today = new Date(getToday() + 'T12:00:00');
  const days = [];
  const activeHabits = habits.filter((h) => !h.archived);

  for (let i = 89; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = toLocalDateString(d);
    let count = 0;
    for (const h of activeHabits) {
      if (h.completedDays && h.completedDays.includes(dateStr)) count++;
    }
    days.push({
      date: dateStr,
      count,
      dayOfWeek: d.getDay(),
      month: d.toLocaleDateString('en-US', { month: 'short' }),
    });
  }

  const maxCount = Math.max(1, ...days.map((d) => d.count));
  return { days, maxCount, totalHabits: activeHabits.length };
}

/**
 * Completion trend: weekly completion rates over the last 12 weeks
 */
export function completionTrendData(habits) {
  const today = new Date(getToday() + 'T12:00:00');
  const activeHabits = habits.filter((h) => !h.archived);
  const weeks = [];

  for (let w = 11; w >= 0; w--) {
    const weekEnd = new Date(today);
    weekEnd.setDate(weekEnd.getDate() - w * 7);
    const weekStart = new Date(weekEnd);
    weekStart.setDate(weekStart.getDate() - 6);

    let completions = 0;
    let possible = 0;
    for (let i = 0; i < 7; i++) {
      const d = new Date(weekStart);
      d.setDate(d.getDate() + i);
      const dateStr = toLocalDateString(d);
      for (const h of activeHabits) {
        // Only count if the habit existed at that point
        if (h.createdAt && dateStr >= h.createdAt) {
          possible++;
          if (h.completedDays && h.completedDays.includes(dateStr)) completions++;
        }
      }
    }

    weeks.push({
      weekEnd: toLocalDateString(weekEnd),
      label: weekEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      completions,
      possible,
      pct: possible > 0 ? Math.round((completions / possible) * 100) : 0,
    });
  }

  return weeks;
}

/**
 * Streak history for a single habit: all streaks with start/end dates
 */
export function streakHistoryData(habit) {
  if (!habit || !habit.completedDays || habit.completedDays.length === 0) return [];

  const sorted = [...habit.completedDays].sort();
  const streaks = [];
  let start = sorted[0];
  let end = sorted[0];

  for (let i = 1; i < sorted.length; i++) {
    if (isConsecutive(end, sorted[i])) {
      end = sorted[i];
    } else {
      streaks.push({ start, end, length: daysBetween(start, end) + 1 });
      start = sorted[i];
      end = sorted[i];
    }
  }
  streaks.push({ start, end, length: daysBetween(start, end) + 1 });

  return streaks.sort((a, b) => b.length - a.length);
}

// ─── Milestones ────────────────────────────────────────────────

const MILESTONE_DEFS = [
  { id: 'first_completion', name: 'First Step', description: 'Complete your first day', threshold: 1, type: 'completion' },
  { id: 'streak_3', name: '3-Day Streak', description: 'Maintain a 3-day streak', threshold: 3, type: 'streak' },
  { id: 'streak_7', name: 'One Week', description: 'Maintain a 7-day streak', threshold: 7, type: 'streak' },
  { id: 'streak_14', name: 'Two Weeks', description: 'Maintain a 14-day streak', threshold: 14, type: 'streak' },
  { id: 'streak_30', name: 'One Month', description: 'Maintain a 30-day streak', threshold: 30, type: 'streak' },
  { id: 'streak_50', name: 'Halfway', description: 'Maintain a 50-day streak', threshold: 50, type: 'streak' },
  { id: 'streak_75', name: 'Three Quarters', description: 'Maintain a 75-day streak', threshold: 75, type: 'streak' },
  { id: 'streak_100', name: 'Century', description: 'Maintain a 100-day streak', threshold: 100, type: 'streak' },
  { id: 'perfect_week', name: 'Perfect Week', description: 'Complete every day for a full week', threshold: 7, type: 'perfect_week' },
  { id: 'perfect_month', name: 'Perfect Month', description: 'Complete every day for 30 days straight', threshold: 30, type: 'perfect_month' },
  { id: 'comeback', name: 'Comeback', description: 'Resume after missing 3+ days', threshold: 3, type: 'comeback' },
];

export function computeMilestones(habit) {
  const stats = computeHabitStats(habit);
  const sorted = habit.completedDays ? [...habit.completedDays].sort() : [];

  return MILESTONE_DEFS.map((def) => {
    let unlocked = false;
    let progress = 0;
    let unlockedAt = null;

    switch (def.type) {
      case 'completion':
        unlocked = stats.totalDays >= def.threshold;
        progress = Math.min(stats.totalDays / def.threshold, 1);
        if (unlocked && sorted.length > 0) unlockedAt = sorted[0];
        break;

      case 'streak':
        unlocked = stats.longestStreak >= def.threshold;
        progress = Math.min(stats.longestStreak / def.threshold, 1);
        if (unlocked) {
          // Find when the streak milestone was first reached
          unlockedAt = findStreakMilestoneDate(sorted, def.threshold);
        }
        break;

      case 'perfect_week':
        unlocked = stats.longestStreak >= def.threshold;
        progress = Math.min(stats.longestStreak / def.threshold, 1);
        if (unlocked) unlockedAt = findStreakMilestoneDate(sorted, def.threshold);
        break;

      case 'perfect_month':
        unlocked = stats.longestStreak >= def.threshold;
        progress = Math.min(stats.longestStreak / def.threshold, 1);
        if (unlocked) unlockedAt = findStreakMilestoneDate(sorted, def.threshold);
        break;

      case 'comeback': {
        const comebackDate = findComebackDate(sorted, def.threshold);
        unlocked = comebackDate !== null;
        progress = unlocked ? 1 : 0;
        unlockedAt = comebackDate;
        break;
      }
    }

    return {
      ...def,
      unlocked,
      progress: Math.round(progress * 100),
      unlockedAt,
    };
  });
}

// ─── Achievements ──────────────────────────────────────────────

const ACHIEVEMENT_DEFS = [
  // Consistency
  { id: 'consistent_7', category: 'Consistency', name: 'Getting Started', description: 'Complete 7 days total', icon: 'seed', requirement: { type: 'total_days', value: 7 } },
  { id: 'consistent_25', category: 'Consistency', name: 'Building Momentum', description: 'Complete 25 days total', icon: 'sprout', requirement: { type: 'total_days', value: 25 } },
  { id: 'consistent_50', category: 'Consistency', name: 'Half Century', description: 'Complete 50 days total', icon: 'tree', requirement: { type: 'total_days', value: 50 } },
  { id: 'consistent_100', category: 'Consistency', name: 'Centurion', description: 'Complete 100 days total', icon: 'forest', requirement: { type: 'total_days', value: 100 } },

  // Streaks
  { id: 'streak_ach_7', category: 'Streaks', name: 'Week Warrior', description: '7-day streak on any habit', icon: 'flame', requirement: { type: 'streak', value: 7 } },
  { id: 'streak_ach_14', category: 'Streaks', name: 'Fortnight Focus', description: '14-day streak on any habit', icon: 'fire', requirement: { type: 'streak', value: 14 } },
  { id: 'streak_ach_30', category: 'Streaks', name: 'Monthly Master', description: '30-day streak on any habit', icon: 'blaze', requirement: { type: 'streak', value: 30 } },
  { id: 'streak_ach_50', category: 'Streaks', name: 'Unstoppable', description: '50-day streak on any habit', icon: 'inferno', requirement: { type: 'streak', value: 50 } },

  // Completion
  { id: 'complete_1', category: 'Completion', name: 'First Finish', description: 'Complete one 100-day habit', icon: 'trophy', requirement: { type: 'habits_completed', value: 1 } },
  { id: 'complete_3', category: 'Completion', name: 'Hat Trick', description: 'Complete three 100-day habits', icon: 'crown', requirement: { type: 'habits_completed', value: 3 } },
  { id: 'complete_5', category: 'Completion', name: 'High Five', description: 'Complete five 100-day habits', icon: 'star', requirement: { type: 'habits_completed', value: 5 } },

  // Recovery
  { id: 'comeback_1', category: 'Recovery', name: 'Bounced Back', description: 'Resume a habit after missing 3+ days', icon: 'phoenix', requirement: { type: 'comeback', value: 1 } },
  { id: 'comeback_3', category: 'Recovery', name: 'Resilient', description: 'Make 3 comebacks across all habits', icon: 'shield', requirement: { type: 'total_comebacks', value: 3 } },

  // Multiple habits
  { id: 'multi_2', category: 'Multiple Habits', name: 'Double Down', description: 'Track 2 habits simultaneously', icon: 'pair', requirement: { type: 'active_habits', value: 2 } },
  { id: 'multi_5', category: 'Multiple Habits', name: 'Juggler', description: 'Track 5 habits simultaneously', icon: 'constellation', requirement: { type: 'active_habits', value: 5 } },
  { id: 'multi_perfect', category: 'Multiple Habits', name: 'Perfect Day', description: 'Complete all active habits in one day', icon: 'sun', requirement: { type: 'perfect_day', value: 1 } },

  // Reflection
  { id: 'reflect_streak_lost', category: 'Reflection', name: 'Dust Yourself Off', description: 'Lose a 7+ day streak and come back', icon: 'mirror', requirement: { type: 'streak_lost_comeback', value: 7 } },
  { id: 'reflect_consistent_month', category: 'Reflection', name: 'Steady Progress', description: 'Maintain 80%+ completion rate for 30 days', icon: 'compass', requirement: { type: 'sustained_rate', value: 80 } },

  // Long-term commitment
  { id: 'longterm_30', category: 'Long-term Commitment', name: 'One Month In', description: 'Use the app for 30 days', icon: 'calendar', requirement: { type: 'days_since_start', value: 30 } },
  { id: 'longterm_90', category: 'Long-term Commitment', name: 'Quarter Year', description: 'Use the app for 90 days', icon: 'hourglass', requirement: { type: 'days_since_start', value: 90 } },
  { id: 'longterm_365', category: 'Long-term Commitment', name: 'Full Year', description: 'Use the app for 365 days', icon: 'mountain', requirement: { type: 'days_since_start', value: 365 } },
];

export function computeAchievements(habits) {
  const allHabits = habits || [];
  const activeHabits = allHabits.filter((h) => !h.archived);
  const today = getToday();

  // Pre-compute values needed by achievements
  const allStats = allHabits.map((h) => ({ habit: h, stats: computeHabitStats(h) }));
  const totalDaysAcrossAll = allStats.reduce((sum, s) => sum + s.stats.totalDays, 0);
  const bestStreak = Math.max(0, ...allStats.map((s) => s.stats.longestStreak));
  const habitsCompleted = allHabits.filter((h) => h.completedDays && h.completedDays.length >= 100).length;

  // Count total comebacks
  let totalComebacks = 0;
  for (const h of allHabits) {
    if (!h.completedDays || h.completedDays.length < 2) continue;
    const sorted = [...h.completedDays].sort();
    for (let i = 1; i < sorted.length; i++) {
      const gap = daysBetween(sorted[i - 1], sorted[i]);
      if (gap > 3) totalComebacks++;
    }
  }

  // Check perfect days
  let hasPerfectDay = false;
  if (activeHabits.length >= 1) {
    const allDates = new Set();
    for (const h of activeHabits) {
      if (h.completedDays) h.completedDays.forEach((d) => allDates.add(d));
    }
    for (const dateStr of allDates) {
      if (activeHabits.every((h) => h.completedDays && h.completedDays.includes(dateStr))) {
        hasPerfectDay = true;
        break;
      }
    }
  }

  // Reflection: streak lost + comeback
  let hasStreakLostComeback = false;
  for (const { habit, stats } of allStats) {
    if (!habit.completedDays || habit.completedDays.length < 2) continue;
    const sorted = [...habit.completedDays].sort();
    let hadLongStreak = false;
    let run = 1;
    for (let i = 1; i < sorted.length; i++) {
      if (isConsecutive(sorted[i - 1], sorted[i])) {
        run++;
        if (run >= 7) hadLongStreak = true;
      } else {
        if (hadLongStreak) { hasStreakLostComeback = true; break; }
        run = 1;
      }
    }
    if (hasStreakLostComeback) break;
  }

  // Reflection: sustained 80%+ rate over last 30 days
  let hasSustainedRate = false;
  if (activeHabits.length > 0) {
    const todayDate = new Date(today + 'T12:00:00');
    let last30completions = 0;
    let last30possible = 0;
    for (let i = 0; i < 30; i++) {
      const d = new Date(todayDate);
      d.setDate(d.getDate() - i);
      const dateStr = toLocalDateString(d);
      for (const h of activeHabits) {
        if (h.createdAt && dateStr >= h.createdAt) {
          last30possible++;
          if (h.completedDays && h.completedDays.includes(dateStr)) last30completions++;
        }
      }
    }
    if (last30possible > 0) {
      hasSustainedRate = (last30completions / last30possible) * 100 >= 80;
    }
  }

  // Days since earliest habit creation
  const earliestCreated = allHabits
    .filter((h) => h.createdAt)
    .map((h) => h.createdAt)
    .sort()[0];
  const daysSinceStart = earliestCreated ? daysBetween(earliestCreated, today) : 0;

  return ACHIEVEMENT_DEFS.map((def) => {
    let unlocked = false;
    let progress = 0;
    let current = 0;
    const target = def.requirement.value;

    switch (def.requirement.type) {
      case 'total_days':
        current = totalDaysAcrossAll;
        unlocked = current >= target;
        progress = Math.min(current / target, 1);
        break;

      case 'streak':
        current = bestStreak;
        unlocked = current >= target;
        progress = Math.min(current / target, 1);
        break;

      case 'habits_completed':
        current = habitsCompleted;
        unlocked = current >= target;
        progress = Math.min(current / target, 1);
        break;

      case 'comeback':
        current = totalComebacks > 0 ? 1 : 0;
        unlocked = totalComebacks >= target;
        progress = unlocked ? 1 : 0;
        break;

      case 'total_comebacks':
        current = totalComebacks;
        unlocked = current >= target;
        progress = Math.min(current / target, 1);
        break;

      case 'active_habits':
        current = activeHabits.length;
        unlocked = current >= target;
        progress = Math.min(current / target, 1);
        break;

      case 'perfect_day':
        current = hasPerfectDay ? 1 : 0;
        unlocked = hasPerfectDay;
        progress = unlocked ? 1 : 0;
        break;

      case 'days_since_start':
        current = daysSinceStart;
        unlocked = current >= target;
        progress = Math.min(current / target, 1);
        break;

      case 'streak_lost_comeback':
        current = hasStreakLostComeback ? 1 : 0;
        unlocked = hasStreakLostComeback;
        progress = unlocked ? 1 : 0;
        break;

      case 'sustained_rate':
        current = hasSustainedRate ? 80 : 0;
        unlocked = hasSustainedRate;
        progress = unlocked ? 1 : 0;
        break;
    }

    // Find related habit (the one that unlocked it, when relevant)
    let relatedHabit = null;
    if (unlocked) {
      if (def.requirement.type === 'streak') {
        const best = allStats.reduce((a, b) => a.stats.longestStreak >= b.stats.longestStreak ? a : b);
        if (best.stats.longestStreak >= target) relatedHabit = best.habit.name;
      } else if (def.requirement.type === 'habits_completed') {
        const completed = allHabits.filter((h) => h.completedDays && h.completedDays.length >= 100);
        if (completed.length > 0) relatedHabit = completed[completed.length - 1].name;
      }
    }

    return {
      ...def,
      unlocked,
      progress: Math.round(progress * 100),
      current,
      target,
      relatedHabit,
    };
  });
}

export function getAchievementCategories(achievements) {
  const categories = {};
  for (const a of achievements) {
    if (!categories[a.category]) {
      categories[a.category] = { name: a.category, achievements: [], unlockedCount: 0, total: 0 };
    }
    categories[a.category].achievements.push(a);
    categories[a.category].total++;
    if (a.unlocked) categories[a.category].unlockedCount++;
  }
  return Object.values(categories);
}

// ─── Week comparison (this week vs last week) ──────────────────

export function weekComparison(habits) {
  const today = new Date(getToday() + 'T12:00:00');
  const dayOfWeek = today.getDay(); // 0=Sun
  const activeHabits = habits.filter((h) => !h.archived);

  // This week: Sunday to today
  let thisWeek = 0;
  let thisWeekPossible = 0;
  for (let i = dayOfWeek; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = toLocalDateString(d);
    for (const h of activeHabits) {
      thisWeekPossible++;
      if (h.completedDays && h.completedDays.includes(dateStr)) thisWeek++;
    }
  }

  // Last week: full 7 days
  let lastWeek = 0;
  let lastWeekPossible = 0;
  for (let i = dayOfWeek + 7; i > dayOfWeek; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = toLocalDateString(d);
    for (const h of activeHabits) {
      lastWeekPossible++;
      if (h.completedDays && h.completedDays.includes(dateStr)) lastWeek++;
    }
  }

  const thisWeekPct = thisWeekPossible > 0 ? Math.round((thisWeek / thisWeekPossible) * 100) : 0;
  const lastWeekPct = lastWeekPossible > 0 ? Math.round((lastWeek / lastWeekPossible) * 100) : 0;
  const diff = thisWeekPct - lastWeekPct;

  return { thisWeek, lastWeek, thisWeekPct, lastWeekPct, diff };
}

// ─── Month comparison (this month vs last month) ───────────────

export function monthComparison(habits) {
  const today = new Date(getToday() + 'T12:00:00');
  const activeHabits = habits.filter((h) => !h.archived);

  // This month: 1st to today
  const dayOfMonth = today.getDate();
  let thisMonth = 0;
  let thisMonthPossible = 0;
  for (let i = dayOfMonth - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = toLocalDateString(d);
    for (const h of activeHabits) {
      thisMonthPossible++;
      if (h.completedDays && h.completedDays.includes(dateStr)) thisMonth++;
    }
  }

  // Last month: full month
  const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0);
  const lastMonthDays = lastMonthEnd.getDate();
  let lastMonth = 0;
  let lastMonthPossible = 0;
  for (let i = 0; i < lastMonthDays; i++) {
    const d = new Date(lastMonthEnd);
    d.setDate(d.getDate() - i);
    const dateStr = toLocalDateString(d);
    for (const h of activeHabits) {
      lastMonthPossible++;
      if (h.completedDays && h.completedDays.includes(dateStr)) lastMonth++;
    }
  }

  const thisMonthPct = thisMonthPossible > 0 ? Math.round((thisMonth / thisMonthPossible) * 100) : 0;
  const lastMonthPct = lastMonthPossible > 0 ? Math.round((lastMonth / lastMonthPossible) * 100) : 0;
  const diff = thisMonthPct - lastMonthPct;

  return { thisMonth, lastMonth, thisMonthPct, lastMonthPct, diff };
}

// ─── Helpers ───────────────────────────────────────────────────

function daysBetween(dateA, dateB) {
  const a = new Date(dateA + 'T12:00:00');
  const b = new Date(dateB + 'T12:00:00');
  return Math.round(Math.abs(b - a) / (1000 * 60 * 60 * 24));
}

function findStreakMilestoneDate(sortedDays, threshold) {
  if (sortedDays.length < threshold) return null;
  let run = 1;
  for (let i = 1; i < sortedDays.length; i++) {
    if (isConsecutive(sortedDays[i - 1], sortedDays[i])) {
      run++;
      if (run >= threshold) return sortedDays[i];
    } else {
      run = 1;
    }
  }
  return null;
}

function findComebackDate(sortedDays, gapThreshold) {
  for (let i = 1; i < sortedDays.length; i++) {
    const gap = daysBetween(sortedDays[i - 1], sortedDays[i]);
    if (gap > gapThreshold) return sortedDays[i];
  }
  return null;
}
