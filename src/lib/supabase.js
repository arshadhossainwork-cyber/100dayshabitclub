import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
  ? import.meta.env.VITE_SUPABASE_URL.replace(/\s/g, '')
  : 'https://wlgthrnbvslhylxymluu.supabase.co';

const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
  ? import.meta.env.VITE_SUPABASE_ANON_KEY.replace(/\s/g, '')
  : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndsZ3Rocm5idnNsaHlseHltbHV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQyODEzMTIsImV4cCI6MjA5OTg1NzMxMn0.WqHAqhjALTyhJbE24iOTAJ568_TJ7raLXWKZT2hZqdU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export function isSupabaseConfigured() {
  return supabase !== null;
}
