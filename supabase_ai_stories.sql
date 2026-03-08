-- Create table for AI Generated Bedtime Stories
create table ai_stories (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  child_name text not null,
  child_age integer not null,
  story_concept text not null,
  story_title text,
  story_content text not null,
  is_public boolean default true
);

-- Enable Row Level Security (RLS)
alter table ai_stories enable row level security;

-- Policy: Everyone can read public stories
create policy "Enable read access for all public stories"
on ai_stories for select
using (is_public = true);

-- Policy: Everyone can insert stories
create policy "Enable insert access for all users"
on ai_stories for insert
with check (true);

-- Create index for faster queries
create index idx_ai_stories_public on ai_stories(is_public);
create index idx_ai_stories_created on ai_stories(created_at desc);
