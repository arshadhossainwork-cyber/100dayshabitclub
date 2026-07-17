/**
 * Internal linking registry — cross-content-type link maps.
 * Connects articles → challenges, articles → tools, and habits → articles.
 * No existing data files are modified; this is a pure overlay.
 */

import { articles } from './articles/index.js';

// ── Article → Challenge slugs ─────────────────────────────────────────────

const ARTICLE_CHALLENGES = new Map([
  // Habit Formation
  ['the-habit-loop-explained', ['100-day-meditation-challenge', '100-day-journaling-challenge']],
  ['neuroplasticity-and-habit-change', ['100-day-meditation-challenge', '100-day-coding-challenge']],
  ['how-long-to-form-a-habit', ['100-day-meditation-challenge', '100-day-running-challenge']],
  ['identity-based-habits', ['100-day-journaling-challenge', '100-day-reading-challenge']],
  ['habit-stacking-science', ['100-day-meditation-challenge', '100-day-gratitude-challenge', '100-day-morning-routine-challenge']],
  ['environment-design-for-habits', ['100-day-no-phone-morning-challenge', '100-day-deep-work-challenge']],
  ['breaking-bad-habits', ['100-day-no-phone-morning-challenge', '100-day-meditation-challenge']],
  ['motivation-vs-systems', ['100-day-morning-routine-challenge', '100-day-deep-work-challenge']],
  ['the-role-of-dopamine-in-habits', ['100-day-no-phone-morning-challenge', '100-day-running-challenge', '100-day-meditation-challenge']],
  ['keystone-habits', ['100-day-running-challenge', '100-day-meditation-challenge', '100-day-morning-routine-challenge']],

  // Habit Tracking
  ['why-tracking-habits-works', ['100-day-journaling-challenge', '100-day-morning-routine-challenge']],
  ['visual-progress-psychology', ['100-day-coding-challenge', '100-day-journaling-challenge']],
  ['best-habit-tracking-methods', ['100-day-journaling-challenge', '100-day-morning-routine-challenge']],
  ['dont-break-the-chain', ['100-day-writing-challenge', '100-day-coding-challenge']],
  ['what-to-track-what-to-skip', ['100-day-meditation-challenge', '100-day-running-challenge']],
  ['habit-tracking-mistakes', ['100-day-journaling-challenge', '100-day-morning-routine-challenge']],
  ['weekly-habit-reviews', ['100-day-journaling-challenge', '100-day-morning-routine-challenge']],
  ['tracking-versus-doing', ['100-day-deep-work-challenge', '100-day-meditation-challenge']],
  ['habit-data-and-self-knowledge', ['100-day-journaling-challenge', '100-day-meditation-challenge']],
  ['from-tracking-to-identity', ['100-day-running-challenge', '100-day-meditation-challenge']],

  // 100-Day Challenges
  ['why-100-days', ['100-day-meditation-challenge', '100-day-running-challenge', '100-day-coding-challenge']],
  ['100-day-fitness-challenge-guide', ['100-day-running-challenge', '100-day-push-up-challenge', '100-day-yoga-challenge']],
  ['100-day-reading-challenge-guide', ['100-day-reading-challenge', '100-day-no-phone-morning-challenge']],
  ['100-day-meditation-challenge-guide', ['100-day-meditation-challenge', '100-day-yoga-challenge', '100-day-gratitude-challenge']],
  ['100-day-writing-challenge-guide', ['100-day-writing-challenge', '100-day-journaling-challenge', '100-day-deep-work-challenge']],
  ['100-day-coding-challenge-guide', ['100-day-coding-challenge', '100-day-deep-work-challenge']],
  ['how-to-not-quit-a-challenge', ['100-day-meditation-challenge', '100-day-journaling-challenge']],
  ['what-happens-after-100-days', ['100-day-meditation-challenge', '100-day-running-challenge']],
  ['designing-your-own-challenge', ['100-day-journaling-challenge', '100-day-drawing-challenge']],
  ['100-day-challenge-mistakes', ['100-day-meditation-challenge', '100-day-morning-routine-challenge']],

  // Productivity
  ['deep-work-beginners-guide', ['100-day-deep-work-challenge', '100-day-coding-challenge', '100-day-writing-challenge']],
  ['morning-routines-that-work', ['100-day-morning-routine-challenge', '100-day-yoga-challenge', '100-day-meditation-challenge']],
  ['time-blocking-method', ['100-day-deep-work-challenge', '100-day-morning-routine-challenge']],
  ['two-minute-rule', ['100-day-meditation-challenge', '100-day-gratitude-challenge']],
  ['energy-management-over-time', ['100-day-running-challenge', '100-day-morning-routine-challenge']],
  ['eliminating-decision-fatigue', ['100-day-morning-routine-challenge', '100-day-no-phone-morning-challenge']],
  ['single-tasking-over-multitasking', ['100-day-deep-work-challenge', '100-day-no-phone-morning-challenge']],
  ['evening-planning-ritual', ['100-day-journaling-challenge', '100-day-morning-routine-challenge']],
  ['productive-rest', ['100-day-meditation-challenge', '100-day-walking-challenge', '100-day-yoga-challenge']],
  ['batching-similar-tasks', ['100-day-deep-work-challenge', '100-day-morning-routine-challenge']],

  // Consistency
  ['compound-effect-of-daily-habits', ['100-day-reading-challenge', '100-day-running-challenge', '100-day-meditation-challenge']],
  ['showing-up-on-bad-days', ['100-day-meditation-challenge', '100-day-journaling-challenge']],
  ['never-miss-twice-rule', ['100-day-running-challenge', '100-day-meditation-challenge']],
  ['systems-over-goals', ['100-day-deep-work-challenge', '100-day-morning-routine-challenge']],
  ['minimum-viable-effort', ['100-day-meditation-challenge', '100-day-reading-challenge']],
  ['consistency-vs-intensity', ['100-day-running-challenge', '100-day-push-up-challenge', '100-day-stretching-challenge']],
  ['the-plateau-of-latent-potential', ['100-day-coding-challenge', '100-day-writing-challenge', '100-day-running-challenge']],
  ['building-an-unbreakable-routine', ['100-day-morning-routine-challenge', '100-day-meditation-challenge']],
  ['accountability-systems-that-work', ['100-day-journaling-challenge', '100-day-morning-routine-challenge']],
  ['the-identity-consistency-loop', ['100-day-meditation-challenge', '100-day-running-challenge', '100-day-journaling-challenge']],

  // Discipline
  ['willpower-is-finite', ['100-day-morning-routine-challenge', '100-day-no-phone-morning-challenge']],
  ['decision-fatigue-and-habits', ['100-day-morning-routine-challenge', '100-day-no-phone-morning-challenge']],
  ['discipline-vs-motivation', ['100-day-running-challenge', '100-day-meditation-challenge', '100-day-morning-routine-challenge']],
  ['building-self-control', ['100-day-meditation-challenge', '100-day-no-phone-morning-challenge', '100-day-cold-shower-challenge']],
  ['the-marshmallow-test-revisited', ['100-day-meditation-challenge', '100-day-reading-challenge']],
  ['friction-and-habit-design', ['100-day-no-phone-morning-challenge', '100-day-morning-routine-challenge']],
  ['temptation-bundling', ['100-day-running-challenge', '100-day-push-up-challenge', '100-day-reading-challenge']],
  ['delayed-gratification-in-practice', ['100-day-meditation-challenge', '100-day-coding-challenge', '100-day-writing-challenge']],
  ['discipline-in-digital-age', ['100-day-no-phone-morning-challenge', '100-day-deep-work-challenge']],
  ['when-discipline-becomes-automatic', ['100-day-meditation-challenge', '100-day-morning-routine-challenge', '100-day-running-challenge']],
]);

// ── Article → Tool slugs ──────────────────────────────────────────────────

const ARTICLE_TOOLS = new Map([
  // Habit Formation
  ['the-habit-loop-explained', ['habit-streak-calculator']],
  ['neuroplasticity-and-habit-change', ['completion-date-calculator']],
  ['how-long-to-form-a-habit', ['completion-date-calculator', 'habit-streak-calculator']],
  ['identity-based-habits', ['habit-score-calculator']],
  ['habit-stacking-science', ['printable-habit-tracker']],
  ['environment-design-for-habits', ['printable-habit-tracker']],
  ['breaking-bad-habits', ['habit-streak-calculator', 'daily-consistency-calculator']],
  ['motivation-vs-systems', ['daily-consistency-calculator', 'habit-score-calculator']],
  ['the-role-of-dopamine-in-habits', ['habit-streak-calculator']],
  ['keystone-habits', ['habit-score-calculator', 'printable-habit-tracker']],

  // Habit Tracking
  ['why-tracking-habits-works', ['habit-streak-calculator', 'daily-consistency-calculator']],
  ['visual-progress-psychology', ['printable-habit-tracker', 'habit-streak-calculator']],
  ['best-habit-tracking-methods', ['printable-habit-tracker', 'daily-consistency-calculator']],
  ['dont-break-the-chain', ['habit-streak-calculator', 'printable-habit-tracker']],
  ['what-to-track-what-to-skip', ['habit-score-calculator', 'printable-habit-tracker']],
  ['habit-tracking-mistakes', ['daily-consistency-calculator', 'habit-score-calculator']],
  ['weekly-habit-reviews', ['habit-score-calculator', 'daily-consistency-calculator']],
  ['tracking-versus-doing', ['daily-consistency-calculator']],
  ['habit-data-and-self-knowledge', ['habit-score-calculator', 'daily-consistency-calculator']],
  ['from-tracking-to-identity', ['habit-streak-calculator', 'habit-score-calculator']],

  // 100-Day Challenges
  ['why-100-days', ['completion-date-calculator', 'habit-streak-calculator']],
  ['100-day-fitness-challenge-guide', ['completion-date-calculator', 'printable-habit-tracker']],
  ['100-day-reading-challenge-guide', ['completion-date-calculator', 'printable-habit-tracker']],
  ['100-day-meditation-challenge-guide', ['completion-date-calculator', 'habit-streak-calculator']],
  ['100-day-writing-challenge-guide', ['completion-date-calculator', 'habit-streak-calculator']],
  ['100-day-coding-challenge-guide', ['completion-date-calculator', 'habit-streak-calculator']],
  ['how-to-not-quit-a-challenge', ['habit-streak-calculator', 'daily-consistency-calculator']],
  ['what-happens-after-100-days', ['completion-date-calculator', 'habit-score-calculator']],
  ['designing-your-own-challenge', ['completion-date-calculator', 'printable-habit-tracker']],
  ['100-day-challenge-mistakes', ['daily-consistency-calculator', 'habit-streak-calculator']],

  // Productivity
  ['deep-work-beginners-guide', ['daily-consistency-calculator', 'printable-habit-tracker']],
  ['morning-routines-that-work', ['printable-habit-tracker', 'habit-streak-calculator']],
  ['time-blocking-method', ['daily-consistency-calculator']],
  ['two-minute-rule', ['habit-streak-calculator']],
  ['energy-management-over-time', ['daily-consistency-calculator', 'habit-score-calculator']],
  ['eliminating-decision-fatigue', ['printable-habit-tracker']],
  ['single-tasking-over-multitasking', ['daily-consistency-calculator']],
  ['evening-planning-ritual', ['printable-habit-tracker', 'habit-streak-calculator']],
  ['productive-rest', ['daily-consistency-calculator']],
  ['batching-similar-tasks', ['daily-consistency-calculator', 'printable-habit-tracker']],

  // Consistency
  ['compound-effect-of-daily-habits', ['daily-consistency-calculator', 'habit-streak-calculator']],
  ['showing-up-on-bad-days', ['habit-streak-calculator', 'daily-consistency-calculator']],
  ['never-miss-twice-rule', ['habit-streak-calculator', 'daily-consistency-calculator']],
  ['systems-over-goals', ['habit-score-calculator', 'daily-consistency-calculator']],
  ['minimum-viable-effort', ['daily-consistency-calculator', 'habit-streak-calculator']],
  ['consistency-vs-intensity', ['daily-consistency-calculator', 'habit-score-calculator']],
  ['the-plateau-of-latent-potential', ['habit-streak-calculator', 'completion-date-calculator']],
  ['building-an-unbreakable-routine', ['printable-habit-tracker', 'daily-consistency-calculator']],
  ['accountability-systems-that-work', ['habit-score-calculator', 'printable-habit-tracker']],
  ['the-identity-consistency-loop', ['daily-consistency-calculator', 'habit-score-calculator']],

  // Discipline
  ['willpower-is-finite', ['daily-consistency-calculator']],
  ['decision-fatigue-and-habits', ['printable-habit-tracker']],
  ['discipline-vs-motivation', ['habit-streak-calculator', 'daily-consistency-calculator']],
  ['building-self-control', ['daily-consistency-calculator', 'habit-streak-calculator']],
  ['the-marshmallow-test-revisited', ['completion-date-calculator']],
  ['friction-and-habit-design', ['printable-habit-tracker']],
  ['temptation-bundling', ['habit-streak-calculator']],
  ['delayed-gratification-in-practice', ['completion-date-calculator', 'habit-streak-calculator']],
  ['discipline-in-digital-age', ['daily-consistency-calculator', 'printable-habit-tracker']],
  ['when-discipline-becomes-automatic', ['habit-score-calculator', 'daily-consistency-calculator']],
]);

// ── Habit → Article reverse-lookup (computed from article data) ───────────

const HABIT_ARTICLES = new Map();
for (const article of articles) {
  for (const habitSlug of article.relatedHabits || []) {
    if (!HABIT_ARTICLES.has(habitSlug)) {
      HABIT_ARTICLES.set(habitSlug, []);
    }
    HABIT_ARTICLES.get(habitSlug).push({
      pillarSlug: article.pillarSlug,
      slug: article.slug,
    });
  }
}

/** Get challenge slugs related to an article */
export function getRelatedChallengesForArticle(slug) {
  return ARTICLE_CHALLENGES.get(slug) || [];
}

/** Get tool slugs related to an article */
export function getRelatedToolsForArticle(slug) {
  return ARTICLE_TOOLS.get(slug) || [];
}

/** Get article references (pillarSlug + slug pairs) related to a habit */
export function getRelatedArticlesForHabit(habitSlug) {
  return HABIT_ARTICLES.get(habitSlug) || [];
}
