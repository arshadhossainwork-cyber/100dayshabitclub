/**
 * Supabase CRUD for shared_cards table.
 * Follows the same pattern as cloudRepository.js.
 */

export async function createSharedCard(supabase, userId, { habitId, slug, cardData, format, showName, showDates, showIdentity, expiresAt }) {
  const { data, error } = await supabase
    .from('shared_cards')
    .insert({
      slug,
      user_id: userId,
      habit_id: habitId,
      card_data: cardData,
      card_format: format || 'square',
      show_name: showName !== false,
      show_dates: showDates === true,
      show_identity: showIdentity === true,
      expires_at: expiresAt || null,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function fetchSharedCardBySlug(supabase, slug) {
  const { data, error } = await supabase
    .from('shared_cards')
    .select('*')
    .eq('slug', slug)
    .eq('active', true)
    .single();

  if (error && error.code !== 'PGRST116') throw error;
  return data || null;
}

export async function fetchSharedCardForHabit(supabase, userId, habitId) {
  const { data, error } = await supabase
    .from('shared_cards')
    .select('*')
    .eq('user_id', userId)
    .eq('habit_id', habitId)
    .eq('active', true)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (error && error.code !== 'PGRST116') throw error;
  return data || null;
}

export async function revokeSharedCard(supabase, cardId, userId) {
  const { error } = await supabase
    .from('shared_cards')
    .update({ active: false })
    .eq('id', cardId)
    .eq('user_id', userId);

  if (error) throw error;
}

export async function updateSharedCardExpiry(supabase, cardId, userId, expiresAt) {
  const { error } = await supabase
    .from('shared_cards')
    .update({ expires_at: expiresAt })
    .eq('id', cardId)
    .eq('user_id', userId);

  if (error) throw error;
}
