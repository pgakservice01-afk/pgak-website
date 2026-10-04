# Ludhiana — the local plan, from what the results actually show (2026-10-05)

Goal stated by the owner: first in Ludhiana for every related query. What follows is what
the live results, the Keyword Planner export and the Maps listing say about how that is
decided, what shipped today, and what only the owner can do. No position is promised.

## What the results page is, query by query (Google, IN/en, personalisation off)

| Query | Planner volume (India) | What leads the page | PGAK |
|---|---|---|---|
| cctv installation ludhiana | — (see "near me") | **Maps pack**: Amit CCTV 4.9★ (321), Creative Infotech 4.9★ (590), Creative Security Systems 4.8★ (118); then Justdial, IndiaMART, Aajjo, dealer sites | absent, page 1 |
| cctv installation companies near me | **50,000 / mo** | localised → the same Maps pack | absent |
| cctv camera ludhiana | 500 / mo | Shopping grid, Justdial, IndiaMART — hardware/dealer intent | absent — and PGAK does not sell cameras; not the fight to pick |
| ai cctv ludhiana | — | organic | **#1** ("AI CCTV in Ludhiana — Our Home City, Our Team"); ArcisAI #2; Foreman Intelligence #5 with a city page mirroring PGAK's hosiery/cycle-parts positioning |
| cctv camera shop in ludhiana / price ludhiana | 50 / mo each | dealers | not PGAK's intent |

**Read:** the AI term is already won. The volume is in installation and "near me", and
those are decided in the Maps pack by **category, reviews and proximity** — not by a page.

## The Google Business Profile, as found

`PGAK Innovations Private limited` — **unclaimed** ("Claim this business" shown) ·
5.0★ from **one** review (an employee) · category **"Software company"** · phone
**077173 03858** (site publishes +91 62839 93600) · address matches the site · pin
30.8783492, 75.858992 · website pgak.co.in.

Pack entries that win are "Security system supplier", "Electronics repair shop",
"Computer store" with 118–590 reviews. A "Software company" with one review cannot
appear in a CCTV-installation pack whatever the website does.

## Shipped today (website side)

- `BUSINESS.geo` corrected to the listing's pin (was ~1.5 km off); `BUSINESS.gbp` added.
- Site-wide LocalBusiness schema: `geo`, `hasMap` → the listing, `areaServed` = City
  Ludhiana (Punjab) + Country India.
- `/ai-cctv-ludhiana`: title keeps the phrase that ranks #1 and adds the installation
  intent — "AI CCTV in Ludhiana — CCTV Installation by Our Own Team, Gill Road"; description
  and H1 likewise. **Only this city**: the H1 wording keys on `hasOffice`, because every
  other city page says "verified partner", and that stays true.
- Footer, every page: "CCTV installation in Ludhiana — our own team" → the city page (its
  ten inbound links previously all read just "Ludhiana"), and "Find us on Google Maps".
- `KEYWORD_TO_PAGE_MAP_LUDHIANA.csv`: 451 rows from the Planner export with **real**
  volumes, source labelled; local share unknown and said so.

## Only the owner can do these — in this order

1. **Claim the profile** (Maps → "Claim this business" → Google's verification). Nothing
   else on this list is possible before it.
2. **Decide the phone.** The site says +91 62839 93600; Maps and Bing say 077173 03858.
   Pick one; the other two sources get corrected to match. NAP mismatch is a direct
   local-ranking drag.
3. **Categories.** Primary: *Security system supplier* (or *Security system installer*);
   secondary: *Software company*. Add services: CCTV installation, AI video analytics,
   attendance system. Add service area: Ludhiana + the belts named on the city page.
4. **Reviews.** Ten clients have approved testimonials in `lib/proof/testimonials.ts`.
   Those are the first ten review requests — real customers, real Ludhiana sites. The
   pack winners have 118–590; the gap closes one honest review at a time.
5. **Photos.** The ANPR gate-pillar photographs, the dock and PPE stills, the office front
   — PGAK-owned, already published, no new approvals needed.
6. **Bing Places**: same NAP fix (the 24 Sep note is still open).

## Not done, and why
- No page for "cctv camera ludhiana" / "shop" / "price": hardware-dealer intent, not PGAK's
  business. Chasing it would mean pretending to be a shop.
- No new city pages, no "near me" doorway pages, no fabricated reviews.
- The two proof clips are not labelled "Ludhiana" — `place` is blank in the registry and
  the owner has not said where they were recorded.

## How this gets measured
GSC page `/ai-cctv-ludhiana` (90 d to 26 Sep: 2 clicks / 109 impr / pos 11.0); the Maps
pack for the two installation queries, read monthly; GBP insights once claimed.
