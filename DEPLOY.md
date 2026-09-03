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
In **Vercel → Project → Settings → Environment Variables**, add (Production):

| Name | Value |
|---|---|
| `ERP_LEADS_ENDPOINT` | `https://erp.pgak.co.in/api/leads/inbound` |
| `ERP_WEBHOOK_SECRET` | *the webhook secret — must match `WORDPRESS_WEBHOOK_SECRET` on the `pgak-erp` Vercel project* |

⚠️ **Server-only names, deliberately.** These have NO `NEXT_PUBLIC_` prefix so
they never enter the browser bundle — the previous `NEXT_PUBLIC_WEBHOOK_SECRET`
was readable in the shipped JavaScript for 44 days (see §6). Never put a
credential behind a `NEXT_PUBLIC_` prefix.

Redeploy after adding them. Without these, the dealer lead form falls back to
WhatsApp for every submission (the site still works; leads just don't reach the
CRM automatically). `GET /api/leads` answers `{"erp":true}` when they are set.
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

**Re-measured 2026-09-03 (Search Console page report, 120 days).** Google
still reported **454 URLs on the bare host against 22 real pages on `www.`**;
the bare host drew 4,669 impressions to the real site's 2,012, almost all of it
casino queries. The Domain property (`sc-domain:pgak.co.in`) is verified, so
step 1 above is done. Meanwhile `/insights`, `/solutions`, `/about`,
`/biometric-attendance` and every attendance page were "Discovered – currently
not indexed, never crawled": Google knows they exist and is declining to fetch
them, which is what a domain with this spam ratio looks like.

What shipped that day:

- `lib/spamUrls.ts` gained a **structural tier** (`/items/X…`, WordPress
  taxonomy paths, numeric slugs, the `-x27-` entity artefact, non-ASCII paths,
  root-level slugs of 7+ hyphens), a context-token rule for short tier-1 slugs,
  ~60 more tier-2 terms and brands, and `?p=NNN` handling. Coverage of the 456
  reported legacy URLs went from 181 to 422; the rest are short, wordless
  slugs that stay ordinary 404s by design.
- `next.config.mjs` now **301s the old site's real pages** (`/career-page`,
  `/about-us`, `/contact-us`, `/shop`, `/privacy-policy`, …) to their new
  homes. `/career-page/` alone had 257 impressions for brand searches.

Still owner-only, in this order:

1. **Search Console → Security & Manual Actions.** Open both reports for the
   Domain property. If either lists anything, the reconsideration request in
   step 2 above is the single highest-leverage action on this site.
2. **Removals → New request → "Remove all URLs with this prefix"** for
   `https://pgak.co.in/items/`. That is 119 URLs in one request. Do NOT request
   a prefix removal of the bare root — Google applies removals to every host
   variant of the URL, so it would hide `www.` too.
3. **URL Inspection → Request indexing**, ten a day, in the order in
   `~/Documents/Zoom/pgak-backlinks/07-request-indexing-order.md`.
4. **Bing Webmaster Tools → Import from Google Search Console**, then
   `npm run indexnow` after every deploy. Bing does not share Google's crawl
   reluctance and indexes within a day.

---

## 6. Rotating the leaked ERP webhook secret — ✅ DONE 2026-08-14

**Status: ROTATED AND VERIFIED, 2026-08-14 ~05:40 IST.** The leaked value now
answers 401 at the ERP (probed), the website relays with the new secret via
server-only env (`ERP_WEBHOOK_SECRET` / `ERP_LEADS_ENDPOINT`), one marked test
lead went through end-to-end (`delivered:true`, row confirmed, then deleted),
and the `NEXT_PUBLIC_ERP_ENDPOINT` / `NEXT_PUBLIC_WEBHOOK_SECRET` vars were
DELETED from Vercel so no future build can re-inline anything. The ERP-side var
is `WORDPRESS_WEBHOOK_SECRET` on the `pgak-erp` Vercel project (updated in
Production and Preview). The single-secret cutover window was ~3 minutes at
dawn, attended; the ERP has no dual-secret support, so the 7-day dual-accept
plan below was not used. Kept for reference:

**The problem.** The dealer form used to POST straight from the browser to the
ERP, carrying `NEXT_PUBLIC_WEBHOOK_SECRET`. Next.js inlines `NEXT_PUBLIC_*` at
**build** time, so that secret shipped inside the public JavaScript bundle. It
was verified readable in the deployed chunk on 2026-08-10, after **44 days**
live on the production domain. Anyone who viewed source could post unlimited
fake leads into the CRM, which auto-assigns them to real dealers.

Checked at the time: **no abuse had occurred** — max 5 leads/day, all across
distinct districts. So this is precautionary, not incident recovery. But the
value must still be treated as compromised: it was public for six weeks, and
anyone who scraped it then still holds it.

**Moving it server-side is not enough on its own.** `app/api/leads/route.ts`
now relays server-to-server so no future build can inline it — but the old
value stays valid at the ERP until it is rotated. Both halves are required.

### The ordering, and why it is what it is

Two constraints make the order non-obvious. Env vars are inlined at **build**
time, so a variable change does nothing until a redeploy. And browser tabs left
open across the change still run the **old** bundle, posting *directly* to the
ERP with the *old* secret. So the ERP must keep accepting the old secret until
those drain — otherwise you break the customers who were mid-form.

The route reads `ERP_WEBHOOK_SECRET` but **falls back to
`NEXT_PUBLIC_WEBHOOK_SECRET`**, purely so step 1 can ship without a
simultaneous env change. That fallback is temporary; step 6 removes it.

1. **Merge and deploy this branch.** Nothing else changes yet — the route picks
   up the existing `NEXT_PUBLIC_*` values via the fallback, so leads keep
   flowing through the new server-side path from the first request. Verify:
   `curl https://www.pgak.co.in/api/leads` → `{"ok":true,"erp":true,...}`, then
   submit one real lead and confirm the CRM row appears.
2. **Set the alert sink** (see `.env.example`): `LEAD_ALERT_TELEGRAM_TOKEN` and
   `LEAD_ALERT_TELEGRAM_CHAT_ID` in Vercel → Production **and** Preview.
   Redeploy. Verify `curl .../api/leads` now returns `"notify":true`. Until
   this is set, a lead the ERP refuses exists only in a Vercel function log
   (~1h retention on Hobby).
3. **Add the server-only vars, still holding the OLD secret value.** In Vercel,
   `ERP_LEADS_ENDPOINT=https://erp.pgak.co.in/api/leads/inbound` and
   `ERP_WEBHOOK_SECRET=<the old value>`. Redeploy. Nothing changes
   behaviourally — this just stops the route depending on the fallback.
   ⚠️ Paste carefully: a trailing newline makes an invalid HTTP header and
   `fetch` throws before the request leaves. The route detects this and logs
   `LEAD_CONFIG_MALFORMED` rather than letting it look like an ERP outage.
4. **At the ERP, accept BOTH secrets.** Add the new value while continuing to
   accept the old one. Mint it with `openssl rand -hex 32`. Deploy the ERP.
   Verify one lead still lands from the live site (which is still sending the
   old value).
5. **Switch the website to the new secret.** Update `ERP_WEBHOOK_SECRET` in
   Vercel → redeploy → submit one lead → confirm the CRM row. If the ERP starts
   rejecting, the route logs `LEAD_ERP_AUTH_FAILED` and pushes a distinctly
   worded alert, so a botched rotation is loud rather than silent.
6. **After 7 days**, stop accepting the old secret at the ERP, and delete
   `NEXT_PUBLIC_ERP_ENDPOINT` and `NEXT_PUBLIC_WEBHOOK_SECRET` from Vercel.
   **This is the step that actually closes the exposure.** Seven days lets any
   long-open tab drain; the ERP's logs will show whether the old secret is
   still being presented.

**Rollback:** before step 5, redeploy the previous deployment — the old bundle
still works because the ERP still accepts the old secret. After step 6, use
Vercel → Deployments → **Instant Rollback**, never a rebuild: a rebuild with the
`NEXT_PUBLIC_*` vars deleted would inline the placeholder string.

### Also worth doing
- **`META_PAGE_ACCESS_TOKEN`** is set in Vercel but referenced nowhere in this
  repo. Either it belongs to something that no longer exists, or it is a live
  credential sitting unused. Delete it or document it.
- **Verify `pgak.co.in` in Meta Business Manager** and enable the Events Manager
  domain allowlist. `FB_PIXEL_ID` is in this public repo, so without it anyone
  can inject fake `Lead` conversions and quietly skew the ad budget.
- **Drop the CORS header** from the ERP's `/api/leads/inbound` once step 6 is
  done. The endpoint is server-to-server now; no browser should ever call it,
  and removing it makes browser-based abuse structurally impossible.

## 7. Lead capture v2 — one offer, two fields, attribution (2026-09-03)

What changed and why, so nobody "fixes" it back:

- **Every button sells the same thing: a free audit of the visitor's existing
  cameras.** The hero, sticky button, mobile bar, chatbot, footer and bottom
  block all say so and all land on the form. The form used to say "Find a
  dealer" under buttons that said "free demo" / "free audit".
- **The hero carries a two-field form** (`components/sections/QuickLead.tsx`):
  WhatsApp number + camera band. The full form at `#dealer` asks phone + camera
  band and offers segment chips, name and city as optional. **Only the phone is
  required server-side** (`lib/leads.ts`) — never destroy a lead over a missing
  name.
- **Segment has no default.** A blank is recorded as `Not specified`; the old
  pre-selected "Home / Apartment" had filed 24 of 33 leads as homeowners.
- **Attribution rides with every lead** (`lib/attribution.ts`): page, button,
  landing page, referrer host, `utm_*`, `gclid`, `fbclid`. It lands in the
  CRM `message` field as `Page: … | CTA: … | Campaign: …` because the ERP
  inbound route has no columns for it yet. Tapping any WhatsApp link appends
  `[from <page title>]` to the prefilled message (`components/LeadAttribution.tsx`).
- **The thank-you promises a call within one working hour, 9–7 Mon–Sat**, and
  offers a prefilled WhatsApp continuation. Honour the hour: the new-lead
  Telegram alert below exists so someone hears about the lead immediately.

Environment (Vercel → Production **and** Preview):

| Variable | Purpose |
|---|---|
| `LEAD_ALERT_TELEGRAM_TOKEN`, `LEAD_ALERT_TELEGRAM_CHAT_ID` | Already documented in §6. Now ALSO used to push every delivered lead to the owner's phone. |
| `LEAD_ALERT_NEW_LEADS` | Optional. `0` keeps only the failure alerts. Default: on when the bot is configured. |
| `NEXT_PUBLIC_BOOKING_URL` | Optional. Google Calendar appointment page / Cal.com link → "Pick a 15-minute slot" on the thank-you screen. |
| `NEXT_PUBLIC_CLARITY_ID` | Optional. Microsoft Clarity recordings + heatmaps. Free; set it. |

Verify after deploy: `GET /api/leads` → `{"ok":true,"erp":true,"notify":true,"newLeadAlerts":true}`.
Then submit the hero form on production with a real number, and check the CRM
row's `message` shows `Cameras: … | Page: / | CTA: hero-quick | …`.
