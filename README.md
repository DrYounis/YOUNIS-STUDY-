# Younis Adventures 🌍

Welcome to the **Younis Adventures** web application! Documenting my journey, one video and photo at a time.

## 🌟 Features

*   **Home, Videos, Gallery:** Explore multimedia content.
*   **Store:** An e-commerce platform with Apple Pay and Bank Transfer processing, integrated with a Supabase database.
*   **Diaries & Friends:** Social sharing pages.
*   **Fun Zone & Kids Tools:** Interactive educational tools for children.
*   **Naskh Calligraphy (خط النسخ):** A fully interactive, iPad & Apple Pencil compatible canvas for learning and tracing Arabic Naskh letters, complete with progress tracking!

## 🚀 Tech Stack

*   **Framework:** Next.js 14+ (App Router)
*   **Styling:** Vanilla CSS & Inline styling
*   **Database & Storage:** Supabase (PostgreSQL & Storage Buckets)
*   **Deployment:** Vercel

## ⚙️ Environment Variables Setup

If you are running this project locally or deploying to a new Vercel instance, you must configure the following environment variables (found in Supabase under `Project Settings -> API`):

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
```

## 🖋️ Naskh Calligraphy Module
Accessible via `/practice/naskh` or the main navigation header.
- Uses `Pointer Events` API to calculate exact Apple Pencil pressure.
- Saves drawing progress automatically to `localStorage`.

## 📜 Deployment

Any push to the `main` branch will automatically trigger a production deployment on Vercel. Ensure your environment variables are set in the Vercel dashboard beforehand structure.

---
© 2026 Younis Adventures. All rights reserved.
