const REMINDER_TITLES = [
  'Time for {habit}',
  'Ready for {habit}?',
  '{habit} awaits',
  'Your {habit} reminder',
];

const REMINDER_BODIES = [
  'A few minutes now keeps the streak going.',
  'Small steps, big results.',
  'Your future self will thank you.',
  'Consistency is the key.',
  'Just get started — momentum will follow.',
];

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function getReminderMessage(habit) {
  if (habit.reminderMessage) {
    return {
      title: '100 Days Habit Club',
      body: habit.reminderMessage,
    };
  }

  const title = pick(REMINDER_TITLES).replace('{habit}', habit.name);
  const body = pick(REMINDER_BODIES);
  return { title, body };
}

export function getDailySummaryMessage(completedCount, incompleteCount) {
  if (incompleteCount === 0) {
    return {
      title: 'All done today!',
      body: `You completed all ${completedCount} habit${completedCount === 1 ? '' : 's'}. Great work.`,
    };
  }

  return {
    title: 'Daily summary',
    body: `${completedCount} done, ${incompleteCount} remaining. You've got this.`,
  };
}

export function getMissedHabitMessage(habitNames) {
  if (habitNames.length === 1) {
    return {
      title: 'Gentle reminder',
      body: `${habitNames[0]} is still on your list for today.`,
    };
  }

  return {
    title: 'Gentle reminder',
    body: `${habitNames.length} habits still on your list: ${habitNames.slice(0, 3).join(', ')}${habitNames.length > 3 ? '...' : ''}.`,
  };
}

export function getMilestoneMessage(habitName, milestone) {
  const messages = {
    25: `Quarter century! 25 days of ${habitName}.`,
    50: `Halfway there! 50 days of ${habitName}.`,
    75: `75 days of ${habitName} — the home stretch!`,
    100: `100 days of ${habitName}! You did it!`,
  };

  return {
    title: `${milestone}-day milestone`,
    body: messages[milestone] || `${milestone} days of ${habitName}!`,
  };
}
