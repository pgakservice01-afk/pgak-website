# Homepage rebuild — 2026-09-24

Delivery pack for the homepage redesign: asset requests, CMS schema, the
approval gate, the content audit, and the production/QA checklists.

---

## 1. Image and content audit

### 1a. Removed from the homepage

| Asset | What it was | Where it went |
|---|---|---|
| `/media/real-time-response.webp` | Spot AI still, used as the hero backdrop **and** the mobile hero figure | `/capabilities-explained` (as film 03) |
| `/media/camera-intelligence.mp4` + poster | Spot AI reference film "See" | `/capabilities-explained` film 01 |
| `/media/event-context.mp4` + poster | Spot AI reference film "Understand" | `/capabilities-explained` film 02 |
| `/media/real-time-response.mp4` | Spot AI reference film "Respond" | `/capabilities-explained` film 03 |
| `FeatureExplorer` (12 × `/public/features/*.webp`) | Generated feature illustrations | Removed from homepage; still live on `/features` |
| `FeatureChooser`, `JourneyChooser` | Interactive choosers built around the generated feature art | Removed from homepage; components untouched and still used elsewhere |

The homepage previously loaded **four** Spot AI assets. It now loads **zero**.

### 1b. Real PGAK assets now on the homepage

All three verified against commit history as PGAK-original, not generated:

| Asset | Used as | Provenance |
|---|---|---|
| `/proof/anpr-camera-mount.webp` | Hero photograph | Photographed on site; conditions recorded on `/anpr-number-plate-recognition` |
| `/proof/ppe-gloves.mp4` | Real work card 1 | Recorded 1 Apr 2025, existing overhead line camera |
| `/proof/dock-count.mp4` | Real work card 2 | Recorded 19 Dec 2022, existing dock camera; third-party identifiers blurred |

`/team/*.webp` (three founder portraits) are also confirmed real — treated
locally with `sharp`, never regenerated, identities owner-confirmed. They are
not on the new homepage but are available if you want a team section.

### 1c. Assets still needed from PGAK

None of these are blocking — the page is complete without them. Each would
replace or extend something currently carrying more weight than it should.

| Priority | Asset | Why | Minimum size |
|---|---|---|---|
| **P1** | Engineer inspecting camera angles at a live site | The brief's recommended hero. The current hero is a camera on a pillar with no person in frame — good, but a person doing the work is stronger | 1920 × 1080 |
| **P1** | 3–5 site-survey photographs (ladder, laptop at the NVR, measuring a gate approach) | Section 4 has three cards; more real work means a fuller gallery | 1600 × 1000 |
| P2 | Commissioning / handover video | Section 4, and the strongest possible "we finish the job" proof | MP4 H.264, < 15 MB |
| P2 | Office / team-at-work photographs | An optional "who you'd be dealing with" band | 1200 × 1200 |
| P3 | Client-approved portraits (3) | Testimonial cards — **only** with written portrait permission | 800 × 800 |
| P3 | Client-approved company logos (3) | Testimonial cards — **only** with written logo permission | SVG or 600 px wide PNG |

**Format guidance:** WebP or AVIF for stills, MP4 (H.264) or WebM for video,
under 15 MB per clip. Supply the original too — compression is reversible,
a lost original is not.

### 1d. Pending approval

| Item | Status | Blocker |
|---|---|---|
| Sunil Sangal / Sangal Constructions | `draft` | Client has not seen or confirmed the wording |
| Dhruv Agarwal / Hagerstone International | `draft` | Same |
| Shri Anand Kumar Agrawal / Vedic Group | `draft` | Same |

The testimonial section **does not render** until two of these reach
`approved_for_publication`. See §3.

---

## 2. CMS schema

There is no headless CMS on this project — content lives in typed `lib/*.ts`
modules, which the build reads at compile time. The schema below is implemented
exactly as specified, as TypeScript types with the same field names, so it maps
one-to-one onto Sanity/Strapi/Payload later without a content migration.

### 2a. Media consent / approval (`lib/proof/consent.ts`)

```ts
type ApprovalStatus =
  | "draft" | "sent_for_approval" | "approved_for_publication" | "rejected";

type Approval = {
  status:              ApprovalStatus;
  approvedOn:          string;   // ISO date, required when approved
  approverName:        string;   // the person, by name — required when approved
  source:              string;   // where the written confirmation lives
  portraitPermission:  boolean;  // separate consent
  logoPermission:      boolean;  // separate consent
  sitePhotoPermission: boolean;  // separate consent
};
```

Three separate permission booleans, deliberately. Agreeing to a quote is not
agreeing to a photograph, and neither is agreeing to a logo.

### 2b. Testimonials (`lib/proof/testimonials.ts`)

```ts
type Testimonial = {
  id, person, designation, company, context, quote: string;
  portrait?: string;   // rendered only if approval.portraitPermission
  logo?:     string;   // rendered only if approval.logoPermission
  approval:  Approval;
};
```

No `rating` field. Star ratings are not modelled at all, because there is no
approved rating data and an unused field is an invitation to invent one.

### 2c. Project case studies (`lib/proof/projects.ts`)

```ts
type Project = {
  id, title, category, place, scope, description: string;
  conditions: string;  // REQUIRED — what it was recorded under
  limits:     string;  // REQUIRED — what it does not prove
  media: { kind: "video"; src; poster; durationSeconds }
       | { kind: "image"; src; width; height };
  alt:  string;        // REQUIRED
  href: string;
  approval: Approval;
};
```

`conditions` and `limits` are non-optional and the test suite fails a published
record whose values are under 20 characters. A photograph without its
circumstances proves more than it should.

---

## 3. Approval-gate logic

Publishing is not the default. There is **no unfiltered accessor** to forget to
filter.

```
TESTIMONIALS ─┐
              ├─► publishable(records)  ──► only status === "approved_for_publication"
PROJECTS ─────┘
                  │
                  ├─► testimonialsReady()  → false until ≥ 2 approved → section returns null
                  └─► projectsReady()      → false until ≥ 1 approved → gallery returns null
```

Four independent guarantees:

1. **Type-level.** `publishable()` is the only export that returns renderable
   records. The raw arrays are exported for tests only.
2. **Server-only.** `components/home/Proof.tsx` is a server component. Drafts
   are filtered before HTML exists, so they never reach the browser bundle.
   Verified: the built HTML contains zero occurrences of "Sangal", "Hagerstone"
   or "Vedic".
3. **Section-level.** Under two approvals the testimonial section renders
   *nothing* — no placeholder, no "coming soon". An empty promise of proof is
   still a promise of proof.
4. **Test-enforced.** `lib/proof/proof.test.ts` (10 tests, in `npm test`) fails
   the build if a record claims approval without a date, a named approver and a
   written source; if a portrait renders without `portraitPermission`; or if any
   of the three named drafts is flipped to approved.

### To publish a testimonial

1. Send the client the exact `quote` text and get written confirmation.
2. Paste back **what they actually approved**. Their wording wins.
3. Fill `approval` completely — date, name, where the confirmation lives.
4. Set the three permission booleans independently.
5. Set `status: "approved_for_publication"`.
6. Update the count assertion in `proof.test.ts`.

---

## 4. Production-readiness checklist

- [x] Zero Spot AI assets on the homepage (was 4)
- [x] Zero generated/AI imagery on the homepage
- [x] Every homepage image and video is PGAK-original
- [x] Every illustrative visual on `/capabilities-explained` carries the exact
      required disclaimer — 3 of 3 verified in the DOM
- [x] `/capabilities-explained` is `noindex, follow` and deliberately absent
      from the sitemap
- [x] No fabricated testimonial, review, client photo or logo anywhere
- [x] Banned phrasing absent: revolutionise, future-proof, never miss,
      100% accurate, world-class, guaranteed prevention, transform everything
- [x] Analytics limitations stated on the homepage, not only on a deep page
- [x] `npm run build` passes, 0 prerender errors
- [x] `npm test` passes — 10 files, 0 failures
- [x] `npx tsc --noEmit` clean
- [ ] **Owner:** supply P1 photography (§1c)
- [ ] **Owner:** obtain written testimonial approvals (§1d)
- [ ] **Owner:** free disk space — builds fail below ~2 GB (see §6)

---

## 5. QA checklist — verified

| Area | Check | Result |
|---|---|---|
| Desktop 1280 | No horizontal overflow | ✅ `scrollWidth 1280 = innerWidth` |
| Desktop 1280 | 4-col service grid fits | ✅ 1132 px in container |
| Mobile 375 | No horizontal overflow | ✅ `docW 375` |
| Mobile 375 | Form collapses to one column | ✅ `335px` |
| Mobile 375 | CTA tap targets ≥ 44 px | ✅ all 6 buttons 48 px |
| Forms | All 9 brief fields present | ✅ + cameras = 10 |
| Forms | Every field has a `<label for>` | ✅ 10 of 10 |
| Forms | Honeypot present, not named `company` | ✅ |
| Forms | Fields reach the CRM, none dropped | ✅ company → `company` col; requirement + contact time → `message` |
| Media | No autoplay | ✅ `autoplay: false` on both |
| Media | Controls present | ✅ |
| Media | Poster before load | ✅ |
| Media | `preload="none"` (no bytes until play) | ✅ |
| Media | Videos have accessible names | ✅ `aria-label` on both |
| Accessibility | Images with alt text | ✅ 2 of 2 |
| Accessibility | Exactly one `<h1>` | ✅ |
| Accessibility | Contrast | ✅ ink 13.6:1, ink-soft 7.9:1, steel 10.4:1 |
| Accessibility | `prefers-reduced-motion` respected | ✅ in `home.css` |
| Accessibility | Visible focus ring | ✅ 3 px outline, 3 px offset |
| SEO | Title / description / H1 per brief | ✅ |
| SEO | JSON-LD: WebPage, Organization, FAQ | ✅ |
| Approval rules | Testimonial section hidden at 0 approvals | ✅ `#clients` absent |
| Approval rules | No draft content in built HTML | ✅ 0 occurrences |
| Page speed | Homepage bundle | ✅ 2.26 kB / 109 kB first load |

### Not yet done

- **Tablet 768–1024** spot-check beyond the overflow test.
- **Lighthouse / field Core Web Vitals** — needs the deployed URL. The hero is
  a single 1600 px WebP with `fetchPriority="high"`; videos load no bytes until
  played, so LCP should improve against the previous hero.
- **Real-device iOS/Android** pass.

---

## 6. Known environment issue

Five builds failed during this work with `ENOENT` on files Next had just
written (`pages-manifest.json`, `icon.svg/route.js.nft.json`, page chunks for
unrelated routes). Each named a different file. A stash-and-build on the
untouched tree passed, confirming it was not the code.

Cause: free disk space. Clearing npm's cache took the machine from 1.5 GB to
2.0 GB free and the build passed immediately. **The machine is at ~87 % full
and every deploy is a coin flip until that is fixed.**
