import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase.js';
import {
  createSharedCard,
  fetchSharedCardForHabit,
  revokeSharedCard,
  updateSharedCardExpiry,
} from '../lib/shareRepository.js';
import { useAuth } from '../contexts/AuthContext.jsx';

/**
 * Generate a 12-char base62 slug using crypto.getRandomValues.
 */
function generateSlug() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const bytes = crypto.getRandomValues(new Uint8Array(12));
  let slug = '';
  for (let i = 0; i < 12; i++) {
    slug += chars[bytes[i] % chars.length];
  }
  return slug;
}

export function useShareLink(habitId, isSignedIn) {
  const { user } = useAuth();
  const [publicLink, setPublicLink] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch existing active link for this habit on mount
  useEffect(() => {
    if (!isSignedIn || !habitId || !supabase || !user) {
      setPublicLink(null);
      return;
    }

    let cancelled = false;
    setLoading(true);

    fetchSharedCardForHabit(supabase, user.id, habitId)
      .then((card) => {
        if (!cancelled) {
          setPublicLink(
            card
              ? { id: card.id, slug: card.slug, active: card.active, expiresAt: card.expires_at }
              : null
          );
        }
      })
      .catch(() => {
        if (!cancelled) setPublicLink(null);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [isSignedIn, habitId, user]);

  const createLink = useCallback(async (cardData, format, expiresAt) => {
    if (!supabase || !user || !habitId) return;
    setLoading(true);
    try {
      const slug = generateSlug();
      const card = await createSharedCard(supabase, user.id, {
        habitId,
        slug,
        cardData,
        format,
        showName: cardData.habitName !== null,
        showDates: cardData.dateRange !== null,
        showIdentity: cardData.displayName !== null,
        expiresAt,
      });
      setPublicLink({
        id: card.id,
        slug: card.slug,
        active: card.active,
        expiresAt: card.expires_at,
      });
    } finally {
      setLoading(false);
    }
  }, [habitId, user]);

  const revokeLink = useCallback(async () => {
    if (!supabase || !user || !publicLink) return;
    setLoading(true);
    try {
      await revokeSharedCard(supabase, publicLink.id, user.id);
      setPublicLink(null);
    } finally {
      setLoading(false);
    }
  }, [publicLink, user]);

  const updateExpiry = useCallback(async (expiresAt) => {
    if (!supabase || !user || !publicLink) return;
    setLoading(true);
    try {
      await updateSharedCardExpiry(supabase, publicLink.id, user.id, expiresAt);
      setPublicLink((prev) => prev ? { ...prev, expiresAt } : null);
    } finally {
      setLoading(false);
    }
  }, [publicLink, user]);

  return { publicLink, loading, createLink, revokeLink, updateExpiry };
}
