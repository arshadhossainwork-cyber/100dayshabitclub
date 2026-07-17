/**
 * Deterministic motivation messages based on real progress data.
 * No randomness — messages are selected by hashing the current date
 * combined with progress metrics, so the same state on the same day
 * always produces the same message.
 */

const STREAK_MESSAGES = [
  (n) => `${n} days in a row. Keep it going.`,
  (n) => `Day ${n} of your streak. Consistency builds results.`,
  (n) => `${n}-day streak. You're proving something to yourself.`,
  (n) => `${n} consecutive days. That's discipline.`,
];

const MILESTONE_MESSAGES = {
  3: 'Three days down. The hardest part is behind you.',
  7: 'One full week. You\'ve built a real pattern.',
  14: 'Two weeks strong. This is becoming part of who you are.',
  25: 'Quarter of the way there. Solid progress.',
  30: 'One month. Most people never make it this far.',
  50: 'Halfway. You\'re doing what most people only talk about.',
  75: 'Three quarters done. The finish line is in sight.',
  100: 'One hundred days. You did it.',
};

const COMPLETION_RATE_MESSAGES = [
  { min: 90, messages: [
    'Your consistency is remarkable.',
    'You\'re in the top tier of commitment.',
  ]},
  { min: 70, messages: [
    'Strong completion rate. Keep pushing.',
    'Solid progress. You\'re building real habits.',
  ]},
  { min: 50, messages: [
    'More than half your days are wins.',
    'You\'re showing up more often than not. That matters.',
  ]},
  { min: 25, messages: [
    'Every day you show up counts.',
    'Progress isn\'t perfection. You\'re moving forward.',
  ]},
  { min: 0, messages: [
    'Today is a chance to build momentum.',
    'One day at a time. Start with today.',
  ]},
];

const COMEBACK_MESSAGES = [
  'Welcome back. What matters is that you returned.',
  'Breaks happen. Starting again is what counts.',
  'Back at it. That takes real courage.',
];

const MULTI_HABIT_MESSAGES = [
  (n) => `Tracking ${n} habits. You\'re building a system, not just a habit.`,
  (n) => `${n} habits, each one a commitment. You\'re investing in yourself.`,
];

const EMPTY_MESSAGES = [
  'Add your first habit to get started.',
  'What would you like to build over the next 100 days?',
];

/**
 * Get a motivation message based on current habit data.
 * Returns { message: string, type: 'streak' | 'milestone' | 'rate' | 'comeback' | 'general' }
 */
export function getMotivationMessage(stats, habits) {
  if (!habits || habits.length === 0) {
    return { message: pickByDate(EMPTY_MESSAGES), type: 'general' };
  }

  const activeHabits = habits.filter((h) => !h.archived);
  if (activeHabits.length === 0) {
    return { message: 'All habits archived. Ready to start something new?', type: 'general' };
  }

  // Priority 0: All habits completed today
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  if (activeHabits.length >= 2 && activeHabits.every((h) => h.completedDays && h.completedDays.includes(todayStr))) {
    return { message: `All ${activeHabits.length} habits done today. That's a perfect day.`, type: 'milestone' };
  }

  // Priority 1: Active milestone (streak just hit a milestone number)
  if (stats.bestCurrentStreak > 0) {
    const milestoneMsg = MILESTONE_MESSAGES[stats.bestCurrentStreak];
    if (milestoneMsg) {
      return { message: milestoneMsg, type: 'milestone' };
    }
  }

  // Priority 2: Active streak
  if (stats.bestCurrentStreak >= 3) {
    const template = pickByDate(STREAK_MESSAGES);
    return { message: template(stats.bestCurrentStreak), type: 'streak' };
  }

  // Priority 3: Comeback detection (had a streak, lost it, came back today)
  if (stats.bestCurrentStreak === 1 && stats.bestLongestStreak >= 3) {
    return { message: pickByDate(COMEBACK_MESSAGES), type: 'comeback' };
  }

  // Priority 4: Completion rate based
  for (const tier of COMPLETION_RATE_MESSAGES) {
    if (stats.overallCompletionRate >= tier.min) {
      return { message: pickByDate(tier.messages), type: 'rate' };
    }
  }

  // Priority 5: Multiple habits
  if (activeHabits.length >= 2) {
    const template = pickByDate(MULTI_HABIT_MESSAGES);
    return { message: template(activeHabits.length), type: 'general' };
  }

  return { message: 'One day at a time.', type: 'general' };
}

/**
 * Get a completion message for a habit that just reached 100 days.
 */
export function getCompletionMessage(habit) {
  const dayCount = habit.completedDays ? habit.completedDays.length : 0;
  if (dayCount < 100) return null;

  const sorted = habit.completedDays ? [...habit.completedDays].sort() : [];
  const firstDay = sorted[0] || '';
  const lastDay = sorted[sorted.length - 1] || '';

  return {
    headline: `${habit.name}: 100 Days Complete`,
    body: `From ${formatShortDate(firstDay)} to ${formatShortDate(lastDay)}, you showed up ${dayCount} times. That's not luck — that's commitment.`,
  };
}

// ─── Helpers ───────────────────────────────────────────────────

/**
 * Deterministic pick: same date → same index.
 * Uses a simple hash of the current date string.
 */
function pickByDate(arr) {
  if (arr.length === 0) return '';
  if (arr.length === 1) return arr[0];
  const today = new Date();
  const dateNum = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  return arr[dateNum % arr.length];
}

function formatShortDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'T12:00:00');
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}
