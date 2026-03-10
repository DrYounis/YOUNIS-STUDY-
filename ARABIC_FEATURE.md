# Arabic Language Feature for Story Generator

## Overview
Added full Arabic language support to the AI Bedtime Story Generator, allowing users to generate and read stories in Arabic.

## Changes Made

### 1. Story Generator Form (`app/bedtime-stories/generate/page.js`)
- Added language state (`language`) to track selected language (English/Arabic)
- Added language selector with radio buttons (🇬🇧 English / 🇸🇦 العربية)
- Updated form submission to send language preference to API
- Added RTL (right-to-left) support for Arabic stories
- Updated UI text to show Arabic translations when Arabic is selected:
  - "✨ Generate Story" → "✨ إنشاء القصة"
  - "🪄 Creating Magic..." → "🪄 جاري إنشاء القصة..."
  - "📝 Create Another Story" → "📝 إنشاء قصة أخرى"
  - "📋 Copy Story" → "📋 نسخ القصة"

### 2. API Route (`app/api/generate-story/route.js`)
- Updated API to accept `language` parameter (default: 'en')
- Modified `generateWithDeepSeek()` function to support Arabic:
  - Arabic prompt for AI story generation
  - Arabic system instructions for the AI
- Updated `generateTemplateStory()` function with full Arabic template stories
- Both AI-generated and fallback templates now support Arabic

### 3. Stories Library (`app/bedtime-stories/page.js`)
- Added language filter state to filter stories by language
- Added filter buttons: "🌍 All Stories", "🇬🇧 English", "🇸🇦 العربية"
- Updated story cards to display with RTL layout for Arabic stories
- Added Arabic font (Arial) for better Arabic text rendering
- Updated modal to support RTL for Arabic stories
- Added Arabic translations for modal buttons:
  - "📋 Copy Story" → "📋 نسخ القصة"
  - "🗑️ Delete" → "🗑️ حذف"
  - "A story for" → "قصة لـ"

### 4. Database Schema
- **Updated**: `supabase_complete_setup.sql` - Added `language` column to `ai_stories` table
- **Created**: `supabase_add_language_column.sql` - Migration script for existing databases

## Database Migration Required

If you already have a Supabase database, run this SQL in your Supabase SQL Editor:

```sql
-- Add language column with default value 'en' (English)
alter table ai_stories 
add column if not exists language text default 'en';

-- Add comment to document the column
comment on column ai_stories.language is 'Story language: en for English, ar for Arabic';

-- Create index for faster language filtering
create index if not exists idx_ai_stories_language on ai_stories(language);
```

Or simply run the migration file: `supabase_add_language_column.sql`

## Features

### For Users:
1. **Language Selection**: Choose between English and Arabic when generating a story
2. **Language Filter**: Filter the story library by language (All, English, Arabic)
3. **RTL Support**: Arabic stories display with proper right-to-left text direction
4. **Arabic Fonts**: Better Arabic text rendering with appropriate fonts
5. **Localized UI**: Buttons and messages appear in the selected language

### For the AI:
1. **Arabic Prompts**: AI receives Arabic instructions when Arabic is selected
2. **Cultural Context**: Stories are generated with appropriate cultural context
3. **Arabic Templates**: Fallback templates available in Arabic if AI is unavailable

## Testing

To test the feature:

1. Navigate to `/bedtime-stories/generate`
2. Fill in the child's name and age
3. Enter a story concept
4. Select "🇸🇦 العربية" language option
5. Click "✨ إنشاء القصة"
6. The generated story should be in Arabic with proper RTL formatting

To test the library filter:

1. Navigate to `/bedtime-stories`
2. Click on "🇸🇦 العربية" to see only Arabic stories
3. Click on "🇬🇧 English" to see only English stories
4. Click on "🌍 All Stories" to see all stories

## Files Modified

1. `app/bedtime-stories/generate/page.js` - Story generator form
2. `app/bedtime-stories/page.js` - Stories library
3. `app/api/generate-story/route.js` - API endpoint
4. `supabase_complete_setup.sql` - Database schema
5. `supabase_add_language_column.sql` - Migration script (new file)

## Notes

- Default language is English ('en')
- Language is stored in the database as 'en' or 'ar'
- Existing stories without a language value will default to 'en'
- The feature works with both AI-generated stories and template fallback
