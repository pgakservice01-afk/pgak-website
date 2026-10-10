# Lead reconciliation worksheet and GA4 discrepancies (10 Oct 2026)

## 1. The seven `generate_lead` events: reconciliation worksheet

**Source:** GA4 property 547344316 counted seven `generate_lead` events for 9 Sep–6 Oct 2026 (the audit's figure). GA4 holds no personal data by design, so the match must be made from the ERP/CRM side, by date and time and by form.

**What `generate_lead` means:**
- It fires only after `/api/leads` accepts the enquiry (`lib/lead-client.ts` → `trackLead`).
- It does **not** prove ERP delivery or that anyone was contacted.
- Since 8 Oct, the `lead_accepted` event carries `delivery_state` (delivered or queued).

| # | GA4 date (IST) | GA4 `form_name` / `cta` | ERP/CRM record id | Received by (person) | Contacted? | Qualified? | Outcome / reason lost | Matched by |
|---|---|---|---|---|---|---|---|---|
| 1 | | | | | | | | |
| 2 | | | | | | | | |
| 3 | | | | | | | | |
| 4 | | | | | | | | |
| 5 | | | | | | | | |
| 6 | | | | | | | | |
| 7 | | | | | | | | |

**How to fill it.**
1. In GA4, open Explore → Free form. Use dimensions Date + hour, Event name = `generate_lead`, `form_name` and `cta`, with the event count as the metric. This is read-only.
2. In the ERP, list the enquiries received from 9 Sep to 6 Oct with their creation times.
3. Match by time (allow ±5 min) and form.
4. For an ERP enquiry with no GA4 event, note it as "consent declined or blocked", which is normal.
5. For a GA4 event with no ERP record, note it as **"accepted, not in ERP"**. That is the case to investigate.

**Status:** **blocked on access.** Claude has no ERP/CRM readback. Nothing is matched or inferred here, and no row is invented.

## 2. Two `form_submit_attempt` vs seven `generate_lead`

**Finding (verified fact):**
- `form_submit_attempt` was first added in commit `3089a86` on **24 Sep 2026** (`git log -S form_submit_attempt`).
- `generate_lead` has existed since August.
- So every enquiry from 9 to 23 Sep has a `generate_lead` and **cannot** have an attempt event.

**Hypothesis:** most of the gap is that start date, not a broken form. Cached old bundles after 24 Sep may explain a small remainder.

**Test (read-only, owner's GA4):** restrict the date range to 25 Sep–6 Oct and compare the two events.
- If attempts ≥ leads there, the gap is explained.
- If leads > attempts in that window, look for a path that calls `trackLead` without `submitLead`. There is none in the current code: both lead forms (`AssessmentForm`, `QuickLead`) go through `submitLead`, which fires the attempt first, once per form reference.

## 3. 32 sessions with landing page "(not set)"

**What GA4 does:** it sets the landing page from the session's first `page_view`. A session with no `page_view` reports "(not set)".

**Likely causes (hypotheses, in order):**
1. **Session timeout on an open tab.** A visitor leaves a tab open for 30+ minutes, then scrolls or clicks. GA4 starts a new session with `user_engagement`, `scroll` or `click` but no `page_view`. This is common and harmless.
2. **Events queued before the deferred loader.** GA4 is loaded late on purpose (`components/DeferredAnalytics.tsx`: `afterPagePaint`, then `strategy="lazyOnload"`), and that loader's `config` sends the `page_view`. A click before then — a sticky CTA, WhatsApp or phone — is pushed to `dataLayer` by `trackConversion` (`lib/analytics.ts`) ahead of `js` and `config`. If gtag.js then opens the session on that queued event, the session starts without a `page_view`. **Corollary:** a visitor who leaves before the loader runs sends nothing, so GA4 under-counts short visits. This is a trade-off accepted for performance (`05-performance.md`).
3. **Consent-mode pings** without full cookies. This applies only if consent mode is active. It is not configured in this repo; check the tag settings.

**Test (read-only):** Explore with Landing page = "(not set)", broken down by Event name and Session source / medium.
- Mostly `user_engagement` or `scroll`: cause 1, ignore.
- Conversion events (`cta_click`, `form_start`): cause 2, worth fixing by sending `page_view` explicitly on route change.

**No tag was changed on this branch.** The brief says to inspect runtime behaviour before changing tags, and the read needs the owner's GA4.

## 4. Internal and test traffic

- Test enquiries must use the name prefix `TEST-` and be sent only with the owner's authorisation (`01-lead-states.md` §7).
- No production test lead was sent on this branch.
- GA4 has no internal-traffic filter recorded in the repo. Add one in GA4 (owner's account) for the office IP before reading conversion rates.
