/**
 * Challenge registry — drives /challenges index and /challenges/:slug detail pages.
 * Imports all category data files and provides lookup functions.
 */

import { fitnessChallenges } from './fitness.js';
import { mindWellbeingChallenges } from './mindWellbeing.js';
import { learningChallenges } from './learning.js';
import { lifestyleChallenges } from './lifestyle.js';

export const CHALLENGE_CATEGORIES = [
  { id: 'fitness', name: 'Fitness', emoji: '💪', color: '#E11D48' },
  { id: 'mind', name: 'Mind & Wellbeing', emoji: '🧠', color: '#4F46E5' },
  { id: 'learning', name: 'Learning & Growth', emoji: '📈', color: '#059669' },
  { id: 'lifestyle', name: 'Lifestyle', emoji: '🌅', color: '#D97706' },
];

const ALL_CHALLENGES = [
  ...fitnessChallenges,
  ...mindWellbeingChallenges,
  ...learningChallenges,
  ...lifestyleChallenges,
];

/** Get all challenges */
export function getAllChallenges() {
  return ALL_CHALLENGES;
}

/** Look up a challenge by its URL slug */
export function getChallengeBySlug(slug) {
  return ALL_CHALLENGES.find((c) => c.slug === slug) || null;
}

/** Get all challenges for a given category id */
export function getChallengesByCategory(categoryId) {
  return ALL_CHALLENGES.filter((c) => c.category === categoryId);
}

/** Get the category object for a challenge */
export function getCategoryForChallenge(challenge) {
  return CHALLENGE_CATEGORIES.find((c) => c.id === challenge.category) || null;
}

/** Get related challenge objects from a challenge's relatedChallenges slugs */
export function getRelatedChallenges(challenge) {
  return (challenge.relatedChallenges || [])
    .map((slug) => ALL_CHALLENGES.find((c) => c.slug === slug))
    .filter(Boolean);
}

export { ALL_CHALLENGES as challenges };
