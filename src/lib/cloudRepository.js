/**
 * Supabase CRUD layer. Every function takes the supabase client as first arg.
 * No business logic — pure data access.
 */

export async function fetchAllHabits(supabase, userId) {
  const { data, error } = await supabase
    .from('habits')
    .select('id, local_id, name, color, archived, created_at, updated_at, reminder_enabled, reminder_time, reminder_days, reminder_message')
    .eq('user_id', userId)
    .order('created_at', { ascending: true });

  if (error) throw error;
  return data || [];
}

export async function fetchAllEntries(supabase, userId) {
  const { data, error } = await supabase
    .from('habit_entries')
    .select('id, habit_id, completed_date')
    .eq('user_id', userId);

  if (error) throw error;
  return data || [];
}

export async function upsertHabit(supabase, userId, habit) {
  const payload = {
    user_id: userId,
    local_id: habit.local_id,
    name: habit.name,
    color: habit.color,
    archived: habit.archived,
    created_at: habit.created_at,
  };

  // Include reminder fields if present
  if (habit.reminder_enabled !== undefined) payload.reminder_enabled = habit.reminder_enabled;
  if (habit.reminder_time !== undefined) payload.reminder_time = habit.reminder_time;
  if (habit.reminder_days !== undefined) payload.reminder_days = habit.reminder_days;
  if (habit.reminder_message !== undefined) payload.reminder_message = habit.reminder_message;

  const { data, error } = await supabase
    .from('habits')
    .upsert(payload, { onConflict: 'user_id,local_id' })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function upsertEntries(supabase, habitId, userId, dates) {
  if (!dates.length) return 0;

  const rows = dates.map((d) => ({
    habit_id: habitId,
    user_id: userId,
    completed_date: d,
  }));

  const { error } = await supabase
    .from('habit_entries')
    .upsert(rows, { onConflict: 'habit_id,completed_date', ignoreDuplicates: true });

  if (error) throw error;
  return dates.length;
}

export async function deleteEntries(supabase, habitId, dates) {
  if (!dates.length) return 0;

  const { error } = await supabase
    .from('habit_entries')
    .delete()
    .eq('habit_id', habitId)
    .in('completed_date', dates);

  if (error) throw error;
  return dates.length;
}

export async function deleteHabit(supabase, habitId) {
  const { error } = await supabase
    .from('habits')
    .delete()
    .eq('id', habitId);

  if (error) throw error;
}

export async function fetchSettings(supabase, userId) {
  const { data, error } = await supabase
    .from('user_settings')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error && error.code !== 'PGRST116') throw error; // PGRST116 = no rows
  return data || null;
}

export async function upsertSettings(supabase, userId, settings) {
  const { data, error } = await supabase
    .from('user_settings')
    .upsert(
      {
        user_id: userId,
        reminder_enabled: settings.reminderEnabled,
        reminder_time: settings.reminderTime,
        sync_enabled: settings.syncEnabled !== undefined ? settings.syncEnabled : true,
        quiet_hours_enabled: settings.quietHoursEnabled,
        quiet_hours_start: settings.quietHoursStart,
        quiet_hours_end: settings.quietHoursEnd,
        weekend_reminders: settings.weekendReminders,
        daily_summary_enabled: settings.dailySummaryEnabled,
        daily_summary_time: settings.dailySummaryTime,
        missed_habit_reminder: settings.missedHabitReminder,
        milestone_notifications: settings.milestoneNotifications,
        timezone: settings.timezone,
      },
      { onConflict: 'user_id' }
    )
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function ensureProfile(supabase, userId, metadata) {
  const { data, error } = await supabase
    .from('profiles')
    .upsert(
      {
        id: userId,
        display_name: metadata?.display_name || metadata?.name || '',
      },
      { onConflict: 'id' }
    )
    .select()
    .single();

  if (error) throw error;
  return data;
}
