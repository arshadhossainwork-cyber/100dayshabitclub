/**
 * Tool registry — drives /tools index and /tools/:slug detail pages.
 * Each tool is an interactive calculator or generator targeting high-intent search queries.
 */

export const TOOLS = [
  {
    slug: 'habit-streak-calculator',
    name: 'Habit Streak Calculator',
    tagline: 'See your completion rate, days remaining, and get a motivational boost.',
    description:
      'Calculate your habit streak completion rate, see how many days remain in your 100-day challenge, and get a motivational message based on your progress.',
    emoji: '🔥',
    keywords: 'habit streak calculator, streak counter, habit completion rate',
  },
  {
    slug: 'completion-date-calculator',
    name: 'Completion Date Calculator',
    tagline: 'Find out exactly when you\'ll finish your 100-day challenge.',
    description:
      'Enter your start date and days completed to see your projected finish date, days remaining, and overall progress percentage.',
    emoji: '📅',
    keywords: '100 day challenge completion date, finish date calculator, challenge end date',
  },
  {
    slug: 'habit-score-calculator',
    name: 'Habit Score Calculator',
    tagline: 'Get a weighted score and letter grade for your habit performance.',
    description:
      'Calculate a weighted habit score from 0 to 100 based on your completion rate, current streak, and total days tracked. Receive a letter grade from A to F.',
    emoji: '🏆',
    keywords: 'habit score calculator, habit grade, habit performance score',
  },
  {
    slug: 'daily-consistency-calculator',
    name: 'Daily Consistency Calculator',
    tagline: 'Measure how consistent you\'ve been and see your benchmark bracket.',
    description:
      'Calculate your daily consistency percentage, see which benchmark bracket you fall into, and understand your average missed days per week.',
    emoji: '📊',
    keywords: 'daily consistency calculator, habit consistency rate, consistency tracker',
  },
  {
    slug: 'printable-habit-tracker',
    name: 'Printable Habit Tracker',
    tagline: 'Generate a 10x10 grid you can print and check off daily.',
    description:
      'Create a printable 100-day habit tracking grid. Enter your habit name, generate the 10x10 grid, and print it to hang on your wall or keep at your desk.',
    emoji: '🖨️',
    keywords: 'printable habit tracker, 100 day tracker printable, habit grid PDF',
  },
];

/** Look up a tool by its URL slug */
export function getToolBySlug(slug) {
  return TOOLS.find((t) => t.slug === slug) || null;
}
