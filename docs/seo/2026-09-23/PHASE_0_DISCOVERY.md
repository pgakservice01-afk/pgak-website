# Phase 0 — verified discovery, 23 September 2026

Everything here was read from this repository or fetched from the live site on
23 September 2026. Nothing is assumed. Where a fact is missing, it says so and
is listed under "Needs owner confirmation" rather than guessed at.

No site change is proposed by this document. It is the basis for one.

---

## 1. Business brief (verified)

| | |
|---|---|
| **What it is** | AI video analytics that runs on compatible CCTV cameras a site already owns. Detection runs on an **on-site edge device** — `lib/offer.ts` exists specifically because earlier copy claimed "no hardware", which the product contradicts. |
| **Job-to-be-done** | Turn a passively-recording camera estate into proactive alerting — perimeter, intrusion, loitering, person/vehicle classification, camera health — without replacing the estate. |
| **Buyer** | Factories, warehouses, logistics, multi-site retail, societies. Economic buyer is the owner, plant head or operations head; the security or facility manager is usually the one who feels the pain. |
| **Primary conversion** | Site/camera audit request. Secondary: WhatsApp, phone, demo booking, dealer enquiry. |
| **Lead routing** | `POST /api/leads` → ERP webhook + Google Sheet register + alert email, with a Telegram owner alert on any path where a validated lead did not reach the CRM (`app/api/leads/route.ts:158-182`). |
| **Pricing** | Per camera per month, on cameras already owned; varies by camera count and site count, deliberately **not published** (`app/pricing/page.tsx:47`). |
| **Entity** | PGAK Innovations Pvt. Ltd., CIN U62013PB2023PTC058631, founded 2023, BK Towers, Gill Rd, Ludhiana 141003. Pinned to the MCA record and byte-matched to the Google Business Profile (`lib/seo.ts:17-50`). |

---

## 2. Technical baseline

**Stack.** Next.js 15.5.24, App Router only, TypeScript, Tailwind. **191 routes
prerendered at build time**; the only dynamic endpoints are the two lead APIs.
No CMS: the blog is 80 markdown files under `content/insights/`, everything
else is typed data (`lib/solutions.ts` 23 entries, `lib/locations.ts` 18,
`lib/capabilities.ts` 6, `lib/feature-explorer.ts` 20, `lib/calc/registry.ts`
12 live calculators).

**What is already right, and should not be broken:**

- One self-referential canonical per page, matching `og:url`. No conflicts.
- Exactly two JSON-LD blocks per page — sitewide `Organization`/`LocalBusiness`
  + `WebSite` from the layout, page-specific from the page. **No duplicate
  `@type` on any page**, verified in built HTML.
- `SoftwareApplication` carries **no `offers`** (`lib/schema.ts:332`) because no
  price is published, and `reviewSchema()` deliberately returns `[]`
  (`lib/schema.ts:300`). No `AggregateRating` anywhere. Both correct.
- `middleware.ts` returns **410 Gone** with `noindex` for legacy WordPress spam
  paths — the right response to the inherited index bloat.
- Sitemap omits `lastmod` on 93 of 178 URLs **on purpose** (`app/sitemap.ts:11-21`):
  it is emitted only where a real date exists. Keep this.
- All 80 posts form a closed crawlable ring via `getRelatedInsights()`
  (`lib/insights.ts:68-80`), independent of the `/insights` hub.
- Analytics is deferred until after paint and gated to production
  (`app/layout.tsx:26`, `components/DeferredAnalytics.tsx:16`).

---

## 3. Findings

Ranked by effect on qualified enquiries, not by ease.

### F1 — The mobile conversion furniture is not on the site

`WhatsAppButton`, `MobileActionBar`, `StickyDemoCTA` and their wrapper
`MarketingOverlays` exist in `components/` and are rendered by **no route**.
Commit `8a1be5e` (19 Sep, "Redesign PGAK … fast HTML and qualified enquiries")
removed the mount from `app/layout.tsx` and left the components behind.

This matters more here than it would elsewhere: the two primary conversions are
WhatsApp and a phone call, and the buyer reads the site on a phone, often on a
factory floor. Right now those actions exist only as inline links the visitor
has to scroll to.

`ChatBot` and `FinalCTA` are dead in the same way, along with ~16 other section
components (`ImageHero`, `GoogleReviews`, `TrustStrip`, `HowItWorks`, …).

**Needs owner confirmation:** was the removal deliberate (a speed decision) or
collateral? The answer changes whether we restore it or delete the components.

### F2 — The homepage LCP image is lazy-loaded and double-rendered

`app/page.tsx:68-73` preloads `/media/real-time-response.webp` with
`fetchPriority="high"`, and then `app/page.tsx:80-88` renders that same file as
a raw `<img loading="lazy">`. The preload says "urgent", the tag says "later".
The mobile copy at `:129-137` renders the same asset a second time.

This is the largest-content element on the most important page, and it is a
raw `<img>` rather than `next/image`, so it gets none of the AVIF/WebP and
`srcset` handling configured in `next.config.mjs:18-29`.

### F3 — Analytics fires with no consent mechanism

GA4 (`G-6EMP9HSR2F`) and the Meta Pixel (`2995891480746659`) load for every
visitor once paint completes. There is no cookie banner, no CMP, and no
`gtag('consent', …)` call anywhere in the repo. The site's own copy discusses
DPDP obligations at length.

**Needs legal/owner decision.** I am not qualified to rule on DPDP exposure and
will not write copy that implies a position on it.

### F4 — robots.txt contradicts the AI-visibility objective

The file's opening comment says content is available to OAI-SearchBot and
PerplexityBot, but there are **no directives for either** — they inherit `*`.
`CCBot` and `Bytespider` are blocked outright; there are no rules for GPTBot,
ClaudeBot or Google-Extended. `/admin/` and `/private/` are disallowed and do
not exist as routes.

If AI-answer visibility is an objective, this file should state deliberately
which crawlers are allowed, rather than leaving it to inheritance and a comment
that describes a policy the file does not implement.

### F5 — One schema claim outruns the site's own wording

`featureList` includes "Works with existing analog, IP, DVR and NVR cameras over
RTSP" (`lib/schema.ts:338`) — unqualified, while `lib/offer.ts` exists to force
the word *compatible* into exactly this kind of statement. Structured data must
match the visible, qualified claim.

### F6 — `/insights` ships 523 KB of HTML

All 80 articles render on one page with 82 H2s and no pagination
(`app/insights/page.tsx:139`). It is the heaviest page on the site by roughly
3×. Same page also hardcodes the site URL instead of the `SITE_URL` constant
(`app/insights/page.tsx:48-50`).

### F7 — Smaller, verified

- `/privacy` and `/terms` render neither `Nav` nor `Footer` — dead ends for
  both users and internal link flow.
- No RSS/Atom feed (`/feed.xml`, `/rss.xml` → 404) despite `Blog` schema on
  `/insights`.
- `Content-Security-Policy` is **report-only**, not enforced.
- Desktop nav has no `/contact` link (mobile menu does).
- `productSchema` and `offerCatalogSchema` are defined and never called.
- `http://pgak.co.in/` reaches the canonical host in two hops.
- No `hreflang` anywhere. The EN/HI toggle is client-side and produces no
  separate URLs, so this is currently correct — but it also means the Hindi
  copy is invisible to search.

---

## 4. Needs owner confirmation (blocking)

| # | Question | Why it blocks work |
|---|---|---|
| B1 | **Delivery model per city** — own teams, partner, or assessment-required? | `docs/seo/2026-09-22/CLAIMS_REGISTER.md` C2 records a live contradiction: city pages say "delivered by a verified PGAK partner"; `/cctv-installation-company` says "our own teams" and claims direct installation in 11 cities. Both cannot be true. Until this is settled, **no city page can be expanded or optimised** — doing so would amplify a false claim across the highest-intent commercial pages. |
| B2 | Was the removal of the mobile CTA furniture (F1) deliberate? | Decides restore vs delete. |
| B3 | DPDP position on analytics consent (F3) | Needs legal review, not an SEO opinion. |
| B4 | Which AI crawlers should be allowed (F4) | A commercial decision about training vs answer-surface visibility. |
| B5 | The open items in the claims register: ₹15,995 audit value (C5), 48-hour/1-hour SLAs (C6), "live within a day" (C7), 150–250 employees per gate camera (C8), STQC dates (C9), Spot AI footage rights (C12) | Each is published today with no substantiation on file. |

---

## 5. What Phase 1 would do

In priority order, each as a separate reviewable PR with affected files, test
evidence and a rollback plan:

1. **F2** — homepage LCP: `next/image`, `priority`, remove the double render.
   Measurable against the Lighthouse baselines already in `docs/seo/evidence/`.
2. **F5** — qualify the `featureList` claim.
3. **F4** — rewrite `robots.txt` to state its policy explicitly (needs B4).
4. **F1** — restore or delete the mobile conversion furniture (needs B2).
5. **F6** — paginate `/insights`, add a feed.
6. **F7** — nav/footer on `/privacy` and `/terms`, constant instead of
   hardcoded URL, enforce CSP.

Nothing here touches the city pages until B1 is answered.
