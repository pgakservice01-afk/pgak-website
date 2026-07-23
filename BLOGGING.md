# Posting a daily blog on pgak.co.in

Blogs live as plain markdown files in `content/insights/`. No CMS, no database —
**adding a file and pushing = publishing.**

## Post a new blog (2 minutes)

1. Create a new file in `content/insights/`, named with the URL you want:

   ```
   content/insights/why-guards-fall-asleep-and-ai-doesnt.md
   ```

   The filename becomes the link: `pgak.co.in/insights/why-guards-fall-asleep-and-ai-doesnt`.
   Use lowercase words joined by hyphens. Don't rename a file after publishing
   (it changes the URL and breaks shared links).

2. Start the file with this exact header block (frontmatter), then write the
   article in normal markdown below it:

   ```markdown
   ---
   title: "Why guards fall asleep — and AI doesn't"
   date: "2026-07-24"
   category: "Security Basics"
   excerpt: "One or two lines shown on the card and in Google results."
   readTime: 4
   ---

   Your article starts here. Normal markdown works:

   ## A section heading

   Text with **bold**, *italics*, [links](/#audit) and lists:

   - point one
   - point two
   ```

   Notes:
   - `date` must be `YYYY-MM-DD` — it controls ordering (newest first).
   - `category` is a short label: `Security Basics`, `Attendance`,
     `Camera Setup`, `Business`, etc.
   - `readTime` is optional — it's estimated from length if you skip it.

3. Publish:

   ```bash
   cd ~/Documents/Zoom/pgak-website
   git add content/insights/
   git commit -m "Insight: why guards fall asleep and AI doesn't"
   git push
   ```

   Vercel auto-deploys in ~1 minute. The post appears on
   `/insights`, in the homepage "Insights" section (latest 3), and in the
   sitemap for Google automatically.

## Preview locally before publishing (optional)

```bash
npm run dev
```

Open http://localhost:3000/insights — check the card and the article page.

## Writing style (PGAK voice)

- **Problem first.** Open with the reader's pain in their words, then turn to
  the fix. Never open with "PGAK is…".
- Short sentences. Simple English. No jargon without a plain explanation.
- One idea per post. 600–900 words is the sweet spot.
- Always end with one CTA link: `[Get a free AI audit](/#audit)` or
  `[Book a demo](/#demo)`.
- Be honest — no invented numbers, no fear-mongering. Confidence, not drama.

## Asking Claude to write the daily post

A prompt that works well:

> Write today's PGAK insight post as a markdown file in content/insights/.
> Topic: <your topic>. Follow the frontmatter format and PGAK voice rules in
> BLOGGING.md, then commit and push it.
