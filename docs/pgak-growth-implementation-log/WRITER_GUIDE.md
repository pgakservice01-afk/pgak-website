# Writer guide for the B001–B100 article assignments

Repository: `/Users/karishma/Documents/code/pgak-growth` (branch `growth/recovery-2026-10-08`).
Briefs: `docs/pgak-growth-implementation-log/article-briefs.tsv` (tab-separated).
Today: 8 October 2026.

You are writing for PGAK Innovations Pvt. Ltd. (Ludhiana, Punjab). PGAK adds AI video
analytics to CCTV that businesses already own. Readers are factory owners,
operations heads, HR/admin managers and security buyers in India — mostly Punjab,
mostly reading on a phone, many comparing quotes. The goal is a reader who can make
a better decision and, where it fits, asks PGAK for a site-specific assessment.

## Where files go

- **Every** article you produce — new or refreshed — is written to
  `content/insights/_drafts/<slug>.md`. Never edit `content/insights/<slug>.md`
  directly. Production never reads `_drafts`; the owner promotes reviewed drafts.
- For a **refresh**, first read the live file `content/insights/<slug>.md` in full.
  Keep its `date`, `image`, `category` and slug. Keep what is accurate and useful;
  rewrite what is thin, wrong, overclaiming or off-brief. Add `updated: "2026-10-08"`.
- For a **new** article, `date: "2026-10-08"`; omit `image` (none exists; never
  reference a file that is not in `public/`).
- Do not run git. Do not touch any file outside `content/insights/_drafts/` except
  reading.

## Frontmatter (exact keys)

```yaml
---
title: "Plain-language headline, the buyer's question"
metaTitle: "≤ 60 characters, query-led"
date: "YYYY-MM-DD"
updated: "2026-10-08"        # refresh only
category: "Camera Setup"     # one of: Security Basics, Camera Setup, Attendance, Buying Guide, Compliance
excerpt: "One or two sentences for the card."
metaDescription: "≤ 155 characters, answers the question, no hype."
readTime: 6
image: "/insights/covers/....webp"   # refresh only, keep the existing value
draft: true
reviewStatus: "Awaiting PGAK engineer review. <list any unresolved claims here>"
faqs:
  - q: "A question a buyer actually asks"
    a: "A complete answer that is ALSO present in the body text."
---
```

Two to four FAQs. FAQ rich results are no longer shown by Google; FAQs are there for
readers, so they must be genuinely useful and repeated in the body.
No `reviewer:` key — nobody has reviewed these yet, and inventing a reviewer is
forbidden.

## Shape of every article

1. Open with `**Straight answer: …**` — two to four sentences that answer the
   primary question directly (house style; see `cctv-storage-how-many-days.md`).
2. The decision variables and prerequisites, explained for this reader.
3. **The original asset named in the brief** — a worked example, checklist, table,
   worksheet or test protocol a reader can actually use. This is the heart of the
   piece. Worked numbers must be labelled “illustrative example” and use round,
   obviously hypothetical inputs. Show the arithmetic.
4. Limitations, and when another approach (including not buying anything) fits better.
5. Next step: link the calculator scenario for the brief's `calc` id as
   `[<feature> calculator](<host path>#scenario-<calc>)` (host paths below), the
   brief's internal links, and one contextual CTA to `/free-audit`
   (“Ask for a site-specific assessment”). One CTA, not a sales pitch.

Length follows the question — usually 900–1,800 words. No padding, no repeated
paragraphs, no keyword stuffing. H2s phrased as questions or plain statements.
Tables in GitHub markdown. Indian English, rupees as ₹ with Indian digit grouping
(₹1,50,000), metric units.

## What you may say about PGAK (verified, do not go beyond it)

- PGAK reuses compatible cameras a site already owns. **Detection runs on an on-site
  processing unit**; camera suitability, stream access, processing hardware and
  network are confirmed at the assessment, and anything extra is itemised in the
  quote. Never write “no new hardware”, “nothing to install”, “live in a day”, or
  “works with any camera”. A brand (Hikvision, CP Plus, Dahua…) does not establish
  compatibility; the model, firmware and stream do.
- PGAK publishes **no per-camera price and no package price**. Do not invent one. If
  a cost example is needed, itemise the components and mark PGAK prices “quoted per
  site”. Third-party published prices may be cited only if you verify them on the
  supplier's own page today and give the date; otherwise do not cite numbers.
- **Published PGAK recordings** (each “limited pilot” in the capability register,
  `/platform/capabilities`; evidence at `/resources/evidence`):
  - Glove/PPE check on an existing overhead line camera, recorded 1 April 2025, 14 s.
    Shows bare hands flagged with model confidence (0.75 and 0.27 on screen). One PPE
    class only. Not an accuracy measurement. Page: `/features/guides/ppe-detection`.
  - Sacks counted across one line at a loading bay, recorded 19 December 2022, 16 s,
    count rises from four to seven, tracking numbers prevent double counting of the
    same sack. Not an inventory system. Page: `/ai-cctv-for-warehouses`.
  - Hot work (angle grinder) detected beside flammable drums, **PGAK's own test
    setup, not a customer site**, 18 February 2025, 11 s. Does not know whether a
    permit exists, does not measure distance, is not fire detection. Camera model and
    confidence not yet recorded. Page: `/industrial-cctv`.
  - ANPR camera fitted on a gate pillar at about 1.5 m, daylight, plus the operator
    console — **photographs only**; they prove a fitting and a working console, not a
    read rate. Page: `/anpr-number-plate-recognition`.
- **Unverified** (no PGAK evidence record): perimeter/intrusion events, attendance
  exceptions, camera-feed health, face recognition, loitering, full VMS. Everything
  in the 24 feature guides that is not above is educational/industry capability,
  supplied as PGAK software, a licensed module, supplied hardware or an integration,
  and is confirmed per site. Say “can be evaluated at your site”, not “PGAK does X”.
- No measured accuracy, latency, uptime, read rate, ROI or customer result is
  published. No customer is named. No testimonial exists that you may quote.
- Phone: +91 62839 93600. Do not promise a response time.
- PGAK is based in Ludhiana and serves Punjab; do not claim offices, staff counts,
  installations, years, certifications (STQC, ISO…) or partnerships.

## Forbidden

Invented statistics, survey results, search volumes, prices, customer stories,
quotations, reviewer names, legal rules, certification claims, “studies show”,
accuracy percentages, guarantees (“prevents theft”, “eliminates proxy attendance”),
monetising deaths or injuries, suggesting fewer guards/lights/supervision than safety
requires, automated punishment or pay deductions from face/attendance data, and
anything that tells a reader to share CCTV passwords, RTSP URLs or footage with
anyone over WhatsApp or a web form.

## Legal, privacy and regulatory content (B081–B090 and any legal point elsewhere)

Use **current official primary sources only** — the Act/Rules text on
indiacode.nic.in, egazette.gov.in, meity.gov.in, uidai.gov.in, labour.gov.in, the
relevant state government, or a court judgment on an official site. Cite each with
its title and date in the text. If you cannot verify a point from a primary source
today, do not state it as fact: either leave it out, or keep it as a clearly worded
open question and record it in `reviewStatus` as “UNRESOLVED: …”. Where a point is
uncertain inside the body, add an HTML comment `<!-- UNRESOLVED: what needs checking -->`
next to it (it is invisible on the page). Every legal article ends with a plain line
that it is general information, not legal advice, and that the reader should confirm
their own obligations with a qualified adviser. These articles are drafts until a
named lawyer has reviewed them; say so in `reviewStatus`.

## Calculator host paths (for `#scenario-Cxx` links)

C01 /features/guides/natural-language-search · C02 /features/guides/cross-camera-search ·
C03 /features/guides/event-summaries · C04 /features/guides/custom-text-alerts ·
C05 /features/guides/edge-ai · C06 /features/guides/object-classification ·
C07 /features/intrusion-alerts · C08 /features/loitering-detection ·
C09 /anpr-number-plate-recognition · C10 /features/guides/ptz-tracking ·
C11 /features/guides/people-counting · C12 /features/guides/queue-analytics ·
C13 /features/guides/tailgating · C14 /features/guides/ppe-detection ·
C15 /features/guides/onsite-learning · C16 /features/guides/scene-change ·
C17 /features/guides/sound-classification · C18 /features/guides/privacy-masking ·
C19 /features/guides/low-light-ai · C20 /features/guides/smoke-flame ·
C21 /features/guides/weapon-detection · C22 /features/guides/abandoned-object ·
C23 /features/guides/two-way-audio · C24 /features/guides/onvif-integration ·
C25 /features/face-recognition · C26 /features/false-alarm-filtering ·
C27 /remote-cctv-monitoring · C28 /features/attendance-automation ·
C29, C30, C31 /platform/capabilities

Standalone calculators: /calculators/cctv-storage, /calculators/bandwidth-and-cloud-cost,
/calculators/retrofit-vs-replacement, /calculators/investigation-time,
/calculators/attendance-admin-time, /calculators/false-alarm-cost,
/calculators/multi-site-travel, /calculators/anpr-gate-time,
/calculators/retail-contribution, /calculators/electricity-cost,
/calculators/shrinkage-reduction, /roi-calculator. Other useful pages:
/platform/compatibility, /platform/deployment, /resources/evidence,
/resources/evaluation-method, /pricing, /free-audit, /ai-cctv-ludhiana,
/industrial-cctv, /factory-security, /face-recognition-attendance-system,
/video-analytics-software. Link only to paths listed here or to existing
`/insights/<slug>` files you have checked exist.

## Overlap decisions already made

- B080 is merged into B014 (`cctv-camera-offline-how-to-know`): the B014 refresh
  must include B080's synthetic-failure checklist and escalation-latency measurement.
  Do not create `camera-health-monitoring-requirements`.
- B098 is merged into B015 (`cctv-amc-what-should-it-include`): the B015 refresh must
  include a section on AI/analytics support terms — support hours, response versus
  resolution time, and who replaces failed processing hardware. Do not create
  `ai-cctv-support-sla-checklist`.
- B100 becomes `factory-cctv-handover-checklist` — “Factory CCTV handover checklist:
  what to test before you sign off” — focused on acceptance and handover, so it does
  not duplicate `/cctv-buying-checklist` or B092 (site survey).
- B095 keeps slug `nri-property-security-plan` but is about **who responds** when a
  camera alerts at an empty property (local response contact, outage plan, remote
  viewing versus local intervention). It must not repeat `/nri-property-security`;
  link to it once.
- B068 links `/school-security`; B069 links `/hospital-security`.

## What to return

A table with one row per brief: `id | slug | decision (refresh/new/merged) | words |
original asset (one line) | status | unresolved claims`. Status is one of:
`ready for engineer review`, `draft — legal review required`, `blocked: <reason>`.
Be honest: if you could not verify something, say so.
