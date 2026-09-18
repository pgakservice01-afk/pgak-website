# PGAK — Interactive Site (Next.js)

The pgak.co.in marketing site, rebuilt as an **Awwwards-style scrollytelling
experience** following the Castimedia "Build a Pro Interactive Portfolio" guide.

**Stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion ·
HTML5 Canvas.

## The signature mechanic

The guide's centerpiece is a sticky full-screen canvas that scrubs through an
image sequence as you scroll. Instead of ~89 pre-rendered WebP frames, this build
**draws the frame procedurally** so it needs zero external assets and is on-brand
for PGAK. As you scroll the 5-screen hero, the canvas plays:

1. Feed initialising → 2. Live monitored scene (CAM 02) → 3. AI scanning sweep +
neural mesh → 4. Subjects identified (KNOWN vs UNKNOWN, with confidence) → 5.
Threat detected → alert.

Parallax overlay copy rides the story: **centred → left → right** (per the guide).

Key files:

- `components/scrolly/ScrollyHero.tsx` — 500vh scroll track + sticky stage, wires
  scroll progress into the canvas and overlay.
- `components/scrolly/ScrollyCanvas.tsx` — the procedural canvas renderer.
- `components/scrolly/Overlay.tsx` — the three parallax text beats.

To use **real animated frames** later (the literal guide workflow): drop your
WebP frames in `public/sequence/` and swap the procedural `draw()` in
`ScrollyCanvas.tsx` for an image-preload + frame-index scrub. The scroll plumbing
already gives you `progress` (0→1).

## Develop

```bash
npm install
cp .env.example .env.local   # set your ERP endpoint + webhook secret
npm run dev                  # http://localhost:3000
```

## Build & deploy

```bash
npm run build
npm run start
```

Deploys cleanly to **Vercel** (same account as the ERP) — import the repo, add the
server-only ERP environment variables, set the domain to `pgak.co.in`. Or `next build` and
host the `.next` output anywhere that runs Node.

## Lead form → ERP

The "Find a dealer" form (`components/sections/DealerForm.tsx`) POSTs to your ERP
leads webhook, preserving the original payload mapping
(`location → district`, `protecting → message`). Configure via `.env.local`:

```
ERP_LEADS_ENDPOINT=https://erp.pgak.co.in/api/leads/inbound
ERP_WEBHOOK_SECRET=your-secret
```

The browser submits to `/api/leads`; ERP credentials stay on the server. Never
prefix secrets with `NEXT_PUBLIC_`. See DEPLOY.md for production configuration.
Analytics loads only on Vercel production deployments. For another production
host, explicitly set `NEXT_PUBLIC_ENABLE_ANALYTICS=true` at build time.

## Content

Current SEO changes and evidence are recorded in `docs/seo/`. Pricing is quoted
per site; historical prices are not a current published offer.
