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
