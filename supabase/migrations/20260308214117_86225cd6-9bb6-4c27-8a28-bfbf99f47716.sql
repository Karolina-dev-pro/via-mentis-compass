
-- Add multilingual columns to news
ALTER TABLE public.news
  ADD COLUMN IF NOT EXISTS title_en text,
  ADD COLUMN IF NOT EXISTS title_ua text,
  ADD COLUMN IF NOT EXISTS excerpt_en text,
  ADD COLUMN IF NOT EXISTS excerpt_ua text,
  ADD COLUMN IF NOT EXISTS body_en text,
  ADD COLUMN IF NOT EXISTS body_ua text,
  ADD COLUMN IF NOT EXISTS category_en text,
  ADD COLUMN IF NOT EXISTS category_ua text;

-- Add multilingual columns to team_members
ALTER TABLE public.team_members
  ADD COLUMN IF NOT EXISTS position_en text,
  ADD COLUMN IF NOT EXISTS position_ua text,
  ADD COLUMN IF NOT EXISTS bio_en text,
  ADD COLUMN IF NOT EXISTS bio_ua text;
