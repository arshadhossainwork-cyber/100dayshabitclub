/**
 * Blog article registry — drives /blog, /blog/:pillar, /blog/:pillar/:slug pages.
 * Imports all pillar data files and provides lookup functions.
 */

import { habitFormationArticles } from './habitFormation.js';
import { habitTrackingArticles } from './habitTracking.js';
import { hundredDayChallengesArticles } from './hundredDayChallenges.js';
import { productivityArticles } from './productivity.js';
import { consistencyArticles } from './consistency.js';
import { disciplineArticles } from './discipline.js';

export const PILLARS = [
  {
    slug: 'habit-formation',
    name: 'Habit Formation',
    description: 'The science of how habits form, stick, and transform your brain.',
    emoji: '🧠',
    color: '#4F46E5',
  },
  {
    slug: 'habit-tracking',
    name: 'Habit Tracking',
    description: 'Why tracking works, which methods to use, and how to avoid common pitfalls.',
    emoji: '📊',
    color: '#059669',
  },
  {
    slug: '100-day-challenges',
    name: '100-Day Challenges',
    description: 'Structured challenge guides for fitness, reading, meditation, writing, and coding.',
    emoji: '🔥',
    color: '#E11D48',
  },
  {
    slug: 'productivity',
    name: 'Productivity',
    description: 'Deep work, time management, and routines that amplify your output.',
    emoji: '⚡',
    color: '#D97706',
  },
  {
    slug: 'consistency',
    name: 'Consistency',
    description: 'The compound effect, showing up daily, and building unbreakable routines.',
    emoji: '🔁',
    color: '#0284C7',
  },
  {
    slug: 'discipline',
    name: 'Discipline',
    description: 'Willpower, self-control, and designing your life so discipline becomes automatic.',
    emoji: '🛡️',
    color: '#7C3AED',
  },
];

const ALL_ARTICLES = [
  ...habitFormationArticles,
  ...habitTrackingArticles,
  ...hundredDayChallengesArticles,
  ...productivityArticles,
  ...consistencyArticles,
  ...disciplineArticles,
];

/** Get all pillars */
export function getAllPillars() {
  return PILLARS;
}

/** Look up a pillar by its URL slug */
export function getPillarBySlug(slug) {
  return PILLARS.find((p) => p.slug === slug) || null;
}

/** Get all articles for a given pillar slug */
export function getArticlesByPillar(pillarSlug) {
  return ALL_ARTICLES.filter((a) => a.pillarSlug === pillarSlug);
}

/** Look up a single article by pillar slug + article slug */
export function getArticleBySlug(pillarSlug, articleSlug) {
  return ALL_ARTICLES.find((a) => a.pillarSlug === pillarSlug && a.slug === articleSlug) || null;
}

/** Get related article objects from an article's relatedArticles slugs */
export function getRelatedArticles(article) {
  return (article.relatedArticles || [])
    .map((slug) => ALL_ARTICLES.find((a) => a.slug === slug))
    .filter(Boolean);
}

export { ALL_ARTICLES as articles };
