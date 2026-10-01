# /nri-property-security — build notes and handover

Built 1 October 2026 from **PGAK Master Prompt: NRI Property Security Page**
(7-page PDF, `~/Downloads/`). Branch `feat/nri-property-security`, cut from
`origin/main`.

This file records where the page departs from that brief and why, and what is
still open. The reviewable copy is in
[`nri-property-security-copy.md`](./nri-property-security-copy.md).

---

## 1. Three deliberate departures from the brief

### 1.1 No price, anywhere

The brief specifies ₹1,000/camera/month in the meta description, a pricing
section with a worked four-camera example (₹4,000/month), and an `offers` node
in the Service schema.

The owner's standing rule since **31 August 2026** is that no PGAK rate appears
on any public surface — that figure specifically was unpublished then — and the
rule names structured data as a public surface. Verified before building: no
price appears today on `/pricing`, `/`, or `/residential-security`.

**Owner's decision, 1 Oct 2026: the standing rule wins.**

What the page does instead:

| Brief | Built |
|---|---|
| Price in meta description | Removed; description now ends "alerts your phone, wherever in the world you live" |
| Pricing section with ₹4,000 example | "What decides your price" — the three cost drivers, no figure |
| Guard-cost comparison | Reuses `components/sections/GuardCostCompare.tsx`, which asks the visitor for the rate *they* were quoted and prints none |
| `offers` in Service schema | Omitted. `serviceSchema()` in `lib/schema.ts` now carries a comment saying why, next to the identical note already on `productSchema()` |

If the rule is ever reversed, `/pricing` and `lib/faq.ts` must change in the
same commit or the site contradicts itself.

### 1.2 Not "no new hardware"

The brief's product facts and its trust strip both state that no new hardware is
needed. `lib/offer.ts` exists precisely because that is not reliably true —
detection runs on an on-site processing unit — and it requires copy to say so.

An absolute promise is worse on this page than anywhere else on the site: the
buyer is 7,000 km away and cannot look at the cabinet, so the correction lands
at install, after trust is spent. The page uses `HARDWARE_NOTE_LONG` and says
"works with the cameras you already have", which is the substantiated version
of the same selling point.

### 1.3 Alerts are app notifications, not WhatsApp messages

**Owner's instruction, 1 Oct 2026.** The brief has alerts arriving on WhatsApp.
They arrive in the PGAK app.

The split now running through the page, which should be preserved:

- **WhatsApp** = how a customer reaches *us*. Every CTA, the free remote check, support.
- **The app** = how the cameras reach *them*. Alerts, snapshots, live view.

This retires the brief's **[CONFIRM] #3** ("do WhatsApp alerts work to +1, +44,
+61 numbers?"). An app notification does not route over a mobile network, so the
country of the SIM stops being a question — a better answer for this audience
than a yes would have been, and the page now sells it as one.

---

## 2. [CONFIRM] status

| # | Question | Status |
|---|---|---|
| 1 | 4G/SIM cameras at village houses and farmhouses | **OPEN.** Copy marked `CONFIRM-1` states the requirement (enough steady upload) and routes the specific case to the free remote check — true whichever way it resolves. |
| 2 | Fall / no-movement alerts for parents | **Answered No** from PGAK's own capability set — person/face recognition, intrusion, loitering, false-alarm filtering, ANPR, attendance. No fall detection. Per the brief's own rule, Section 6 was **cut**, as was the elderly keyword block. The page states plainly that PGAK is not a fall-detection system. |
| 3 | WhatsApp alerts to international numbers | **Retired** — see 1.3. |
| 4 | Who handles ground work | **Answered honestly, see §3.** |
| 5 | NRI testimonials | **Answered No** — six converted customers lifetime, none NRI. Section 12 **cut**. The brief forbids inventing them. |

**Also unverified by this session:** which app stores the PGAK app is live on.
The page says "the PGAK app" and never names iOS or Android, which is true
either way — but if an NRI on an iPhone cannot install it today, that needs
saying before this page is promoted.

---

## 3. The Doaba dealer gap

The page targets the Doaba belt — **Jalandhar, Hoshiarpur, Kapurthala, Phagwara,
Nawanshahr** — because that is where NRI-owned property in Punjab is
concentrated.

**As of 1 Oct 2026, none of the 15 registered dealers is in Doaba.** They are in
Ludhiana (×2), Patiala, Sirsa, Ghaziabad, Sitapur, Bulandshahr, Koraput,
Gaurela, Goa, Delhi, Ahmedabad and Mumbai.

**Owner's decision: publish for all of Doaba and recruit dealers in parallel.**

Section 11 therefore does not name a Doaba partner. It describes the three ways
physical work actually gets done — the original installer, a PGAK partner where
one covers the district, or family/caretaker guided on a video call — and
invites the reader to ask what covers their district, promising a straight
answer including "nobody yet".

**Update that section, do not soften it, when a Doaba partner signs.**

Three of the five Doaba districts — Kapurthala, Phagwara, Nawanshahr — have no
city page, so they are named in the coverage list as plain text rather than
linked. `lib/locations.ts` opens with an honesty rule against publishing a city
page for a city that cannot be serviced; creating three is a dealer decision,
not an SEO one.

---

## 4. News citations

All three verified HTTP 200 on 1 Oct 2026. The brief's Kapurthala URL was
mangled by a PDF ligature ("theft" rendered as "the "); the reconstructed URL
was verified before use.

**Standing rule applied:** the page never implies PGAK would have prevented any
reported incident. It says so explicitly under the citations. Keep that line.

---

## 5. What was built

**New**

- `app/nri-property-security/page.tsx`
- `components/nri/NriTracking.tsx` — the named events + scroll depth
- `components/nri/NriWhatsApp.tsx` — UTM-aware WhatsApp CTA
- `components/nri/NriFaq.tsx` — `<details>` accordion, fires `faq_open_nri`
- `public/og-nri-property-security.webp` — 1200×630, rendered from `docs/og-nri-property-security.html`

**Changed**

- `lib/schema.ts` — `serviceSchema()` takes an `areaServed` list, plus `audience` and `serviceType`; comment added on why there is no `offers`
- `lib/solutions.ts` — new optional `alsoSee`, set on `residential-security`
- `components/solutions/SolutionPage.tsx` — renders `alsoSee` in "Read more on this"
- `lib/locations.ts` — new optional `nriBelt`, set on Jalandhar, Hoshiarpur, Moga, Amritsar, Batala, Ludhiana, Patiala
- `components/solutions/LocationPage.tsx` — renders the NRI callout when `nriBelt` is set
- `components/Nav.tsx`, `components/sections/Footer.tsx`, `app/sitemap.ts`, `app/areas-we-serve/page.tsx`, `app/pricing/page.tsx`

### Tracking

GA4 events under the brief's exact names. The brief calls them "GTM events"; the
site retired its GTM container on 2026-09-19 (it held nothing but the same GA4
config) and now loads GA4 directly — same destination, shorter route.

`whatsapp_click_nri` · `audit_click_nri` · `faq_open_nri` · `scroll_depth_nri`
(50 and 90). All four verified firing in a real browser.

Two findings worth keeping:

- **`window.scrollY` is always 0 on this site.** `app/buyer.css` puts
  `overflow-y: auto` on `<body>`, so the scroll offset lives on an element.
  `NriTracking` reads `document.scrollingElement.scrollTop` and listens on
  `document` in the capture phase. A `window.scrollY` tracker would have
  reported a clean zero forever — the worst kind of analytics bug, because the
  dashboard looks like a finding. **Anything else added to this site that
  measures scroll has the same trap.**
- **wa.me does not forward query strings.** `NriWhatsApp` appends the campaign
  marker to the message *body* (`[via: google/cpc/nri_doaba]`), the only part
  that survives the hop, so paid and organic enquiries are separable in the
  WhatsApp inbox. Verified end to end.

---

## 6. Acceptance criteria

| Criterion | Status |
|---|---|
| Live, in sitemap, linked from ≥3 pages | Built, in sitemap, linked from **199** built pages (Nav + Footer are global). Not yet deployed. |
| Title, description, H1, FAQ + Service schema | Title 59/60, description 151/155. Service, FAQPage (8 Q&A), BreadcrumbList, WebPage all emitted. **Rich Results Test still to run against the deployed URL.** |
| Lighthouse mobile ≥90/95/100 | **Not yet run** — needs the deployed URL. |
| WhatsApp CTA above the fold on mobile, pre-filled, fires the event | Verified at 375×812: CTA top at 698px of 812. Pre-filled message and `whatsapp_click_nri` both confirmed. |
| Every [CONFIRM] resolved or its section removed | 2, 3, 5 resolved; 4 answered in copy; **1 open** and written so it is true either way. |
| No unverified claims | Price, hardware and fall detection all handled above. |
| Posts 1–3 within 2 weeks | **Not started.** |

---

## 7. Known gap: the brand palette

`app/buyer.css` — the "White B2B design contract", loaded last in `layout.tsx`
and therefore the one that wins sitewide — sets the accent to **royal blue
`#075FC7`** on white, with `font-family: Arial, Helvetica` and no web font by
design.

`app/globals.css` still declares a mint/teal accent (`124 245 196` dark,
`13 150 122` light) that nothing uses, and `app/premium.css` declares a third.
Three palettes, one winner. Worth collapsing, separately from this page.

The OG card was rebuilt in `#075FC7` to match what the site actually renders.
