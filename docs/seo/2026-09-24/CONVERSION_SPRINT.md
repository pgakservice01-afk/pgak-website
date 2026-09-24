# Conversion sprint — 24 September 2026

Branch `feat/conversion-sprint`. Nothing here is deployed; production is
untouched pending approval.

Baseline verified at the start: `origin/main` had moved past `612c8d9` to
`8e9c5fd`.

---

## 1. The finding that outranks everything else in this sprint

**Production has been accepting enquiries into the ERP only. The Google Sheet
register and both alert emails have been switched off the entire time.**

Verified live on 2026-09-24:

```
GET https://www.pgak.co.in/api/leads
{"ok":true,"erp":true,"mode":"erp only","notify":true,"newLeadAlerts":true,"register":false,"env":"production"}
```

`LEAD_REGISTER_URL` and `LEAD_REGISTER_SECRET` were never set in Vercel
Production, so `recordInRegister` took its "not configured" branch on every
single enquiry. The form said thank you, the ERP accepted, the Telegram alert
fired — and the sheet stayed empty.

**This is why the register contains only three TEST rows.** It is not evidence
that no enquiries happened. It is evidence that no enquiry could ever have
arrived. Those two things look identical from the sheet and mean opposite
things.

The Apps Script endpoint itself is alive (HTTP 200), so the destination works.
The gap is two environment variables, not code.

### Proven end to end, on production

One labelled internal test, 2026-09-24:

| Step | Result |
| --- | --- |
| `POST /api/leads` | `{"ok":true,"delivered":true,"ref":"7a0c2feb-3c62-447a-8453-927ec48705af","erp":true,"register":false}` |
| Validation | Accepted. Obvious junk numbers are rejected (`9999999999` → field error), so the pipeline is not counting rubbish. |
| Unicode | `"cameras":"16–50"` — en dash — survived intact. The earlier signing bug has not regressed. |
| ERP | Accepted |
| Sheet row | **None.** Skipped, as above. |
| Email to director@ / mittaladitya18@ | **Neither sent.** Both are inside the skipped branch. |

Record labelled `ZZ INTERNAL TEST … DO NOT CONTACT`, phone `9000000000`. It
must be marked `Test record` in the sheet's status column if it ever syncs, and
kept out of conversion reporting.

**I have not claimed Aditya received an email.** No email was sent to claim.

---

## 2. Funnel baseline

Every row below is **UNKNOWN**, and the reason is the same for all of them.

| Funnel step | Latest complete period | Why unknown |
| --- | --- | --- |
| Relevant commercial-page visits | UNKNOWN | No GA4 API access from this environment |
| Enquiry starts | UNKNOWN | GA4 `form_start` exists but is unreadable without access |
| Submission attempts | UNKNOWN | `form_submit_attempt` did not exist until this sprint |
| Accepted unique enquiries | UNKNOWN | Lives only in the ERP; no export available here |
| Contactable enquiries | UNKNOWN | Sales judgement, recorded in the sheet — which is empty |
| Qualified enquiries | UNKNOWN | As above |
| Demonstrations / site assessments | UNKNOWN | As above |
| Proposals | UNKNOWN | As above |
| Customers | UNKNOWN | As above |

Segmentation by landing page, source and device: **UNKNOWN**, same cause.

I am not estimating any of these. An invented denominator would make every
later comparison meaningless, and a made-up funnel is worse than an empty one
because it looks like it was measured.

**What is NOT unknown:** attribution is being captured (`utm_*`, click IDs,
landing page) and written into the ERP payload. When the register is switched
on, those columns populate from the same pipeline. The data is being collected;
it is the reporting end that is dark.

---

## 3. Access checklist — one list, everything needed

Send these to whoever administers each account. This is the whole list.

1. **Google Search Console** — add `director@securedengineers.com` as a *Full*
   user on the `pgak.co.in` **domain property** (not a URL-prefix property).
2. **GA4** — add the same address with *Viewer* on property `G-6EMP9HSR2F`, and
   confirm which GA4 **property ID** (numeric) it belongs to.
3. **Vercel** — set `LEAD_REGISTER_URL` and `LEAD_REGISTER_SECRET` on the
   **Production** environment of `pgak-website`, then redeploy. Until this is
   done, nothing reaches the sheet or either inbox. The values are the Apps
   Script `/exec` URL and its shared secret.
4. **PGAK — Master Leads sheet** — confirm `director@securedengineers.com` can
   edit it, so the status workflow can actually be used.
5. **ERP** — a CSV export of leads received since 2026-08-01, with landing page
   and UTM columns. This is the only existing record of real enquiries and the
   only way to reconcile the last two months.
6. **WhatsApp Business** — confirm whether the `+91 62839 93600` account is on
   the WhatsApp Business **app** or the **API**. Conversation counts can only
   be reconciled on the API; on the app it is a manual count.
7. **Meta** — confirm whether any instant-form (lead ad) campaigns have ever
   run. If yes, Business Manager access to the lead forms.

Not requested: anything from securedengineers.com. It is out of scope and stays
untouched.

---

## 4. What changed in this sprint

| Page / file | Previous issue | Change | Customer benefit | Conversion hypothesis | Review metric |
| --- | --- | --- | --- | --- | --- |
| `/video-analytics-software` | Same generic "Get Free Camera Audit" button as every other page | Page-specific offer: "Check which of my cameras can run PGAK analytics", with one line on what comes back | Knows what they receive before giving a number | A named, specific offer converts better than a generic one | `form_view` → `form_submit_attempt` → accepted, per landing page |
| `/factory-security` | As above | "Check my factory's cameras and perimeter" | Speaks to gates, boundary and yard | As above | As above |
| `/cctv-installation-company` | As above; scope was one summary sentence | "Request a CCTV project assessment" **+ an unpriced itemised sample scope** (8 quote lines, assumptions, exclusions) | A new-site buyer can picture the quote and check any vendor's against it | Buyers stall because they cannot picture a quotation; showing its shape without prices removes the stall without inventing a rate | Attempts and accepted enquiries on this page |
| `/book-demo` + nav + homepage | "Book a Demo" promised a confirmed appointment, then asked for a callback | "Request a demo" / "Request a demonstration for your site", and the page says plainly there is no calendar behind the form | No false expectation of a slot | Fewer people feeling misled; a more honest promise is likelier to be kept | Demo requests accepted, and whether they answer the callback |
| `.btn` | `whitespace-nowrap` + `overflow:hidden` silently clipped long labels — at 375px the new CTA rendered as "eck which of my cameras can" | `.btn-wrap` modifier for page-supplied labels | The CTA is readable on a phone | A clipped button is not a working button | Visual check at 375px |
| `lib/lead-client.ts`, `ConversionEvents.tsx` | No event for form seen, submission attempted, or delivery failure | Added `form_view`, `form_submit_attempt`, `lead_delivery_failed` — each deduplicated by the form's `ref` | — | A silent delivery failure and a change of mind currently look identical | The three new events |
| `scripts/check-lead-destinations.mjs` | A missing env var is invisible because nothing breaks | Script asserts every destination is live; exits non-zero otherwise | — | This exact failure cost roughly a day of leads reaching the sheet | Run before and after any env change |

### Deliberately not done

- **Forms were not rebuilt.** The compact form is already two fields.
- **The sales workflow was not rebuilt.** The Apps Script already has assigned
  owner, status (New → Attempted → Contacted → Qualified → Demo booked →
  Proposal → Won, plus Not now / Unqualified / Duplicate / Test record), first
  contact, next follow-up, notes, outcome, and per-recipient email status. It
  is complete and it is empty, which is a delivery problem, not a design one.
- **The buyer decision packs were not rewritten.** All three pages already
  carry supported/not-supported, requirements, scope, price factors, what the
  quote should list, how to judge a pilot, and what happens after an enquiry.
- **No response-time promise was added anywhere.** No SLA is staffed or
  confirmed, so none is advertised.
- **No district pages, no new blog posts.** Paused as instructed.

---

## 5. Test evidence

Separated by environment, as asked.

**Technical (local):**
- `npm run build` — compiled successfully
- `npm test` — 110/110 across 7 suites
- `npx tsc --noEmit` — clean
- `npm run lint` — one pre-existing warning in `Footer.tsx`, untouched by this branch

**Local rendering** (`next start`, port 3123), checked at 1503px and 375px:
- All three pages plus `/book-demo` return 200 and show their new offer
- `/cctv-installation-company` renders "What a quotation covers" with all eight lines
- CTA buttons wrap to two lines on a phone rather than clipping — re-checked after the fix

**Production:**
- `GET /api/leads` health verified
- One labelled test lead accepted end to end (§1)
- `node scripts/check-lead-destinations.mjs` → exit 1, correctly naming `register` as off

**Not tested, and not claimed:** inbox receipt at either address (nothing was
sent); any production browser journey on the changed pages (they are not
deployed); performance comparisons (the changes are content and one CSS
modifier, and local-vs-production timings are not comparable).

---

## 6. How we will know if this worked

Not by watching for "more leads". The register has to be switched on first —
until then there is no denominator and no honest comparison.

Once it is on, for the three changed pages against the same pages before:

1. `form_view` → `form_submit_attempt` rate per landing page
2. `form_submit_attempt` → accepted rate (this is where `lead_delivery_failed`
   earns its place — it separates our fault from theirs)
3. Accepted → **contactable**, from the sheet's status column. This is the
   number that matters, and it is the one nobody has today.
4. Demo requests that convert to an actual demonstration, now that the page
   promises a callback rather than a booking.

Give it enough enquiries to mean something before changing these pages again.
No A/B call on two enquiries, and no rewriting a page before the previous
change has been read.
