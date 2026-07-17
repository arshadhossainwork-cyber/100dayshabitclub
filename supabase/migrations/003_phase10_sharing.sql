-- Phase 10: Sharing, Public Progress Cards

CREATE TABLE shared_cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  habit_id UUID NOT NULL REFERENCES habits(id) ON DELETE CASCADE,
  card_data JSONB NOT NULL,
  show_name BOOLEAN DEFAULT true,
  show_dates BOOLEAN DEFAULT false,
  show_identity BOOLEAN DEFAULT false,
  active BOOLEAN DEFAULT true,
  expires_at TIMESTAMPTZ DEFAULT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  card_format TEXT DEFAULT 'square'
);

ALTER TABLE shared_cards ENABLE ROW LEVEL SECURITY;

-- Authenticated users: full CRUD on own cards
CREATE POLICY "owner_all" ON shared_cards FOR ALL TO authenticated
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Public read: anyone can read active, non-expired cards
CREATE POLICY "public_read" ON shared_cards FOR SELECT TO anon, authenticated
  USING (active = true AND (expires_at IS NULL OR expires_at > now()));

CREATE INDEX idx_shared_cards_slug ON shared_cards(slug);
CREATE INDEX idx_shared_cards_user ON shared_cards(user_id);
CREATE INDEX idx_shared_cards_habit ON shared_cards(habit_id);
