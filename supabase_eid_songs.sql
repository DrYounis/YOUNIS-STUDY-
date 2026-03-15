-- ============================================
-- EID SONGS - SAVE FEATURE
-- ============================================
-- Run this in your Supabase SQL Editor
-- https://supabase.com/dashboard/project/YOUR_PROJECT/sql

-- ============================================
-- EID SONGS TABLE (Save songs with user info)
-- ============================================
create table if not exists eid_songs (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  parent_name text not null,
  parent_email text not null,
  parent_phone text,
  child_name text not null,
  song_title text not null,
  song_lyrics text not null,
  language text default 'ar',
  audio_url text,
  is_public boolean default false
);

-- Enable Row Level Security (RLS)
alter table eid_songs enable row level security;

-- Policy: Users can read their own songs (based on email)
create policy "Enable read access for own songs"
on eid_songs for select
using (
  auth.email() = parent_email
  OR auth.role() = 'authenticated'
);

-- Policy: Everyone can insert songs
create policy "Enable insert access for all users"
on eid_songs for insert
with check (true);

-- Policy: Users can update their own songs
create policy "Enable update access for own songs"
on eid_songs for update
using (auth.email() = parent_email);

-- Policy: Users can delete their own songs
create policy "Enable delete access for own songs"
on eid_songs for delete
using (auth.email() = parent_email);

-- Create index for faster queries
create index if not exists idx_eid_songs_email on eid_songs(parent_email);
create index if not exists idx_eid_songs_created on eid_songs(created_at desc);
create index if not exists idx_eid_songs_child on eid_songs(child_name);


-- ============================================
-- SETUP COMPLETE! ✅
-- ============================================
-- Your eid_songs table is ready to use!
-- Users can save Eid songs with their contact info
