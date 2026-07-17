/**
 * AI content overlay registry.
 * Provides getAiContent(slug) to look up quick answers, takeaways,
 * comparison tables, and definitions for article pages.
 */

import { habitFormationAiContent } from './habitFormation.js';
import { habitTrackingAiContent } from './habitTracking.js';
import { hundredDayChallengesAiContent } from './hundredDayChallenges.js';
import { productivityAiContent } from './productivity.js';
import { consistencyAiContent } from './consistency.js';
import { disciplineAiContent } from './discipline.js';

const AI_CONTENT = new Map([
  ...habitFormationAiContent,
  ...habitTrackingAiContent,
  ...hundredDayChallengesAiContent,
  ...productivityAiContent,
  ...consistencyAiContent,
  ...disciplineAiContent,
]);

/**
 * Look up AI content for a given article slug.
 * Returns the content object or null if none exists.
 */
export function getAiContent(slug) {
  return AI_CONTENT.get(slug) || null;
}
