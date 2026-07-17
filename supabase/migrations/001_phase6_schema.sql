-- Phase 6: Cloud Database Schema
-- Tables: profiles, habits, habit_entries, user_settings
-- With RLS, triggers, and indexes

-- ============================================================
-- TABLES
-- ============================================================

-- profiles — extends auth.users, auto-created on signup via trigger
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  avatar_url TEXT,
  timezone TEXT DEFAULT 'UTC',
  week_starts_on INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- habits — one row per habit, tracks local_id for mapping
CREATE TABLE habits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  local_id TEXT,
  name TEXT NOT NULL CHECK (char_length(name) <= 100),
  color TEXT NOT NULL DEFAULT '#4F46E5',
  archived BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, local_id)
);

-- habit_entries — one row per completed day
CREATE TABLE habit_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  habit_id UUID NOT NULL REFERENCES habits(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  completed_date DATE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(habit_id, completed_date)
);

-- user_settings — synced preferences
CREATE TABLE user_settings (
  user_id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
  reminder_enabled BOOLEAN DEFAULT false,
  reminder_time TIME DEFAULT '09:00',
  sync_enabled BOOLEAN DEFAULT true,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- ROW-LEVEL SECURITY
-- ============================================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "select_own" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "insert_own" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "update_own" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "delete_own" ON profiles FOR DELETE USING (auth.uid() = id);

ALTER TABLE habits ENABLE ROW LEVEL SECURITY;
CREATE POLICY "select_own" ON habits FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "insert_own" ON habits FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "update_own" ON habits FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "delete_own" ON habits FOR DELETE USING (auth.uid() = user_id);

ALTER TABLE habit_entries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "select_own" ON habit_entries FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "insert_own" ON habit_entries FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "update_own" ON habit_entries FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "delete_own" ON habit_entries FOR DELETE USING (auth.uid() = user_id);

ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "select_own" ON user_settings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "insert_own" ON user_settings FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "update_own" ON user_settings FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "delete_own" ON user_settings FOR DELETE USING (auth.uid() = user_id);

-- ============================================================
-- TRIGGERS
-- ============================================================

-- Auto-update updated_at on row modification
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON habits
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON user_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION create_profile_on_signup()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, display_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'display_name', NEW.raw_user_meta_data->>'name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION create_profile_on_signup();

-- ============================================================
-- INDEXES
-- ============================================================

CREATE INDEX idx_habits_user ON habits(user_id);
CREATE INDEX idx_entries_habit ON habit_entries(habit_id);
CREATE INDEX idx_entries_user ON habit_entries(user_id);
CREATE INDEX idx_entries_date ON habit_entries(habit_id, completed_date);
