-- ============================================
-- ADD LANGUAGE COLUMN TO AI_STORIES TABLE
-- ============================================
-- Run this in your Supabase SQL Editor to add language support
-- This adds a 'language' column to the existing ai_stories table

-- Add language column with default value 'en' (English)
alter table ai_stories 
add column if not exists language text default 'en';

-- Add comment to document the column
comment on column ai_stories.language is 'Story language: en for English, ar for Arabic';

-- Create index for faster language filtering
create index if not exists idx_ai_stories_language on ai_stories(language);

-- ============================================
-- Migration complete! ✅
-- ============================================
