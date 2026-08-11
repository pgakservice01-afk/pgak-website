# Deploying pgak.co.in (Next.js → Vercel)

This is a **Next.js 14** app. Below is the full path from these files to the live site.

## What's in here
- Full site source (`app/`, `components/`, `tailwind.config.ts`, etc.)
- **Your hero image** at `public/hero-landing.png` (already included)
- Env template at `.env.example`

---

## 0. Prerequisites (one-time)
- **Node.js 18+** — check with `node -v`. If missing, install from https://nodejs.org (LTS).
- A **GitHub** account and the website's repo connected to **Vercel**.

## 1. Test locally first (optional but recommended)
```bash
cd pgak-website
npm install
npm run build      # should end with "✓ Compiled successfully"
npm run start      # serves a production build at http://localhost:3000
```
Open http://localhost:3000 and confirm the hero image shows.

## 2A. If you ALREADY have the site's GitHub repo → Vercel
1. Open your local clone of that repo (the one Vercel watches).
2. Copy **everything from this `pgak-website/` folder** into the repo, replacing the old files. (Keep the repo's own `.git/` folder.)
3. Commit & push to the branch Vercel deploys (usually `main`):
   ```bash
   git add -A
   git commit -m "Visual overhaul: new hero image, logo, icons, illustrations; remove Become-a-dealer"
   git push
   ```
4. Vercel auto-builds and deploys to **pgak.co.in** in ~1–2 min. Watch it at https://vercel.com/dashboard.

## 2B. If you need a FRESH repo + Vercel project
1. Create a new GitHub repo (e.g. `pgak-website`), then from this folder:
   ```bash
   cd pgak-website
   git init && git add -A && git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/<you>/pgak-website.git
   git push -u origin main
   ```
2. Go to https://vercel.com → **Add New… → Project** → import the repo.
3. Framework preset auto-detects **Next.js** — leave build/output defaults.
4. Add the env vars (next step) → **Deploy**.
5. After it deploys, go to **Project → Settings → Domains** and add `pgak.co.in` / `www.pgak.co.in`.

## 3. Environment variables (required for the "Find a dealer" form)
In **Vercel → Project → Settings → Environment Variables**, add (Production + Preview):

| Name | Value |
|---|---|
| `NEXT_PUBLIC_ERP_ENDPOINT` | `https://erp.pgak.co.in/api/leads/inbound` |
| `NEXT_PUBLIC_WEBHOOK_SECRET` | *your real webhook secret* |

Redeploy after adding them. Without these, the dealer lead form won't reach the ERP.
(For local testing, copy `.env.example` to `.env.local` and fill the same values.)

## 4. Verify after deploy
- Hero image loads on desktop; the responsive text hero shows on mobile.
- "Book a free demo" / "See how it works" buttons scroll to the right sections.
- Footer shows **+91 62839 93600** and **Pgakinnovation@gmail.com**; no "Become a dealer".
- Submit the dealer form once and confirm it lands in the ERP.

---
**Note:** `NEXT_PUBLIC_*` values are visible in the browser bundle (same as the original site) — rotate the webhook secret periodically.

---

## 5. Hacked-WordPress spam cleanup (open item — owner action required)

**The problem.** Before this Next.js site, `pgak.co.in` ran WordPress and was
compromised into a multilingual gambling-spam farm — root-level posts in
English, German, Italian, French, Danish and Czech. The files are gone and
every one of those URLs returns an error, but **Google's index still holds
them.** Measured 2026-08-10: a `site:pgak.co.in` query returned casino pages
almost to the exclusion of the real site.

This is the largest single drag on organic traffic. Google currently associates
this domain with gambling, not AI CCTV, and no amount of on-site work
outweighs that until the index is cleaned.

**What the code already does.** `middleware.ts` answers those URLs with
`410 Gone` rather than `404` (rules and tests in `lib/spamUrls.ts` /
`lib/spamUrls.test.ts`). 410 asserts permanent, intentional removal, so Google
can drop the URL without the confirming re-crawl a 404 usually earns. Run
`npm run test:middleware` after touching either file.

**That is an accelerator, not the cure.** The rest is Search Console work and
cannot be done from the repo:

1. **Verify the bare `pgak.co.in` host, or add a Domain property.** This is the
   step most likely to have been missed. The site canonicalises to `www.`, so a
   `www.`-only property *never displays the spam at all* — the affected URLs are
   indexed on the bare host. A Domain property (DNS TXT) covers both and is the
   better choice.
2. **Check Security & Manual Actions on that property.** A "Hacked: content
   injection" or "Pure spam" manual action would cap traffic on its own. If one
   is listed, file a reconsideration request describing the WordPress
   compromise, the migration to Next.js, and the 410s.
3. **Submit `https://www.pgak.co.in/sitemap.xml`** and confirm the reported
   indexed count approaches the 51 URLs it contains.
4. **Use Removals → Temporary removals** for the worst offenders. It hides them
   for ~6 months, which buys time while the 410s do the permanent work.
5. **Re-measure monthly** with `site:pgak.co.in`. Recovery is the ratio of real
   pages to casino pages in that result, and it should climb steadily.

**Do not** redirect the spam URLs to the homepage. It reads as a soft 404 and
carries the spam association onto the page you most want to protect.
