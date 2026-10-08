# Leads: states, delivery, events and measurement

Branch `growth/recovery-2026-10-08`. Written 8 October 2026. Nothing here has been deployed.

## 1. What production looks like today (read-only check, 8 Oct)

`GET https://www.pgak.co.in/api/leads` reports `erp: true`, `notify: true`, `newLeadAlerts: true`, `durableIntake: false`, `register: false`, `mode: "erp only"`. That is configuration, not proof of delivery. GA4 recorded 7 `generate_lead` events from 10 Sep to 7 Oct. They have not been reconciled against ERP rows: that needs the owner's authorised access to the ERP. No test lead was sent to production.

## 2. The five states, kept distinct

| State | Meaning | Where it is recorded | Who can see it |
|---|---|---|---|
| **Accepted** | `/api/leads` validated it (phone present and valid, not honeypot, not rate-limited) | HTTP 200/202 response to the browser; GA4 `lead_accepted` | GA4 (no PII) |
| **Stored** | Durable intake wrote a receipt row (`accept_website_lead`) | `website_receipts` (private DB) | Owner/ops |
| **Delivered** | ERP answered 2xx **with a row id** (a bare 2xx is not delivery) | ERP lead row; `website_outbox.state='delivered'`, `website_receipts.crm_id` | ERP users |
| **Notified** | Telegram accepted the alert | `website_outbox` kind `notification` | Owner |
| **Qualified** | A person decided it is a real opportunity | ERP/CRM stage — **not the website** | Sales |

A receipt is not a sale, and an alert is not a contact. Later stages (contacted, qualified, proposal, won, lost) live only in the CRM; see §6.

## 3. Delivery paths in code

**Without durable intake (today's production mode, "erp only"):**
- Validate, then relay to the ERP with `Idempotency-Key = ref`, up to 2 attempts on timeout or 5xx, never on 4xx.
- A row id is required for `delivered: true`.
- On any failure the owner's Telegram gets the lead (name and phone included, by existing design), and the customer sees WhatsApp/phone fallbacks with their typed values kept.
- The register (sheet plus emails) runs only if `LEAD_REGISTER_URL`/`SECRET` are set in Production. They are not.

**With durable intake (`LEAD_INTAKE_REST_URL` + `LEAD_INTAKE_SERVICE_KEY` set):**
- The receipt is stored first, and the browser gets 202 `received: true` with the state.
- **New on this branch:** delivery is attempted straight after the response via `after()` (`lib/lead-outbox.ts → runOutbox`). It no longer waits for a scheduler.
- **Retries:** whatever fails stays `queued`, with exponential backoff in SQL. After 8 attempts it moves to `attention`. `POST /api/lead-outbox` (Bearer `LEAD_OUTBOX_SECRET`) is the retry worker.
- **New:** `.github/workflows/lead-outbox.yml` calls the worker every 10 minutes, and is inert until the repo secret exists. The Hobby plan's Vercel Cron runs at most daily, which is why GitHub is used.
- Idempotency comes from the per-form `ref`, the receipt primary key, `unique(ref, kind, version)` in the outbox, leases, and the ERP's `Idempotency-Key`.

**Tests (`npm run test:outbox`, 12):**
- success with a row id, and a numeric id counting as a row;
- a 2xx without a row is not delivered;
- a duplicate answer counts as the original row;
- ERP 500 and 401 are reported with coarse reasons and no echoed body;
- a timeout is reported, not thrown;
- missing config never claims delivery;
- the notification carries the ref only;
- a notification failure is recorded separately from CRM delivery;
- one finish per lease;
- an empty queue does nothing;
- a failed `finish()` is not counted as success;
- a retry of the same ref sends the same idempotency key.

## 4. Event contract (GA4, property 547344316)

| Event | Fires when | Once per | Params (never PII) |
|---|---|---|---|
| `form_view` / `form_start` | existing (ConversionEvents) | — | form |
| `form_submit_attempt` | submit tapped | form instance (`ref`) | form_name, cta, feature_id?, calculator_id? |
| `lead_accepted` **(new)** | server answered `received` or `delivered` true | `ref` | form_name, cta, `delivery_state` (`delivered` \| `queued`), lead_ref, feature_id?, calculator_id? |
| `form_submit`, `demo_request` / `pricing_request` / `assessment_request` | same boundary as `lead_accepted` | `ref` | form_name, cta, ids |
| `generate_lead` (key event) | same boundary; **unchanged meaning** | `ref` | form_name, cta, cameras band, protecting, project_type, lead_ref, `delivery_state` (new) |
| `lead_delivery_failed` | 4xx/5xx, failure body, network error | `ref` | form_name, cta, reason (`not_delivered` \| `network`) |
| `calculator_result` / `calculator_share` / `calculator_export` **(new)** | valid result / link copied / CSV downloaded | interaction | calculator_id |
| `compatibility_check_complete` **(new)** | all nine answers given | interaction | use_case |
| WhatsApp / phone clicks | existing `data-cta` click tracking | click | cta — **intent, not a lead** |

None of these fire on validation errors, a honeypot (a 200 with a failure body), a repeat tap (deduplicated by `ref`), or a 2xx without `received`/`delivered`. Tests: `npm run test:lead-client` (10).

**Migration:** `generate_lead` keeps its boundary, so existing key-event reports stay comparable. Register `lead_accepted` as a custom dimension source for `delivery_state` (GA4 → Custom definitions → event-scoped `delivery_state`, `feature_id`, `calculator_id`). Do not make `lead_accepted` a second key event, or leads double-count.

**Internal and test traffic:**
- Mark office IPs with GA4's internal-traffic rule (Admin → Data streams → Configure tag settings → Define internal traffic), then activate the "Internal traffic" filter after a week in testing mode.
- Controlled test leads use a ref starting with the register's test prefix (`isTestRef`, `lib/leadRegister.ts`), so the register flags them `TEST`.
- Raw records are never deleted.

## 5. Attribution carried to the CRM

These are sent with every lead and printed in the ERP message line and the register's message column:
- **first touch:** `first_landing`, `first_source`;
- **last tagged touch:** `landing` and the `utm_*` set;
- **click ids:** `gclid`, `fbclid`;
- **referrer host;**
- **page and cta;**
- **new:** `feature_id` and `calculator_id`.

Ids only: they are regex-checked `^[a-z0-9-]{1,40}$`, so free text cannot reach the CRM through them. Contact details never go to GA4.

## 6. CRM stages and reporting schema (for the owner's ERP / Looker Studio)

**Stages:** New → Contacted → Qualified → Proposal sent → Won / Lost (each with a lost reason). Every stage change needs a timestamp and an owner.

**Fields to add in the ERP if missing:**
- `lead_ref` (the website ref, the join key);
- `received_at`, `first_contact_at`, `qualified_at`, `proposal_at`, `closed_at`;
- `owner`, `stage`, `lost_reason`;
- `source_page`, `first_landing`, `utm_source/medium/campaign`, `gclid`;
- `feature_id`, `calculator_id`, `is_test`.

**Response-time report:** `first_contact_at − received_at`, median and 90th percentile per week, website leads only.

**Deduplication:** one row per `lead_ref`. A second enquiry from the same phone within 30 days goes into the existing row as a note; it is not a new lead.

**Looker Studio:** three separate sources, joined only where keys exist.
1. **GSC** (date, page, query): clicks, impressions, CTR, position.
2. **GA4** (date, landing page, source/medium, event name): users, sessions, event count.
3. **CRM export** (`lead_ref`, dates, stage, source fields).

- Join GA4 `generate_lead.lead_ref` to CRM `lead_ref` to measure delivered and qualified rates by landing page and source.
- GSC joins to the others **only by page and date range**, as context. Never divide GSC clicks by CRM leads as a "conversion rate": different datasets, different users and different windows.
- Always report users, sessions, clicks and events separately, with matched date windows stated.

## 7. Exact production environment requirements (names only)

| Variable | Needed for | Status on 8 Oct (from `/api/leads`) |
|---|---|---|
| `ERP_LEADS_ENDPOINT`, `ERP_WEBHOOK_SECRET` | ERP relay | present |
| `LEAD_ALERT_TELEGRAM_TOKEN`, `LEAD_ALERT_TELEGRAM_CHAT_ID` | failure + new-lead alerts | present |
| `LEAD_REGISTER_URL`, `LEAD_REGISTER_SECRET` | sheet + two emails | **absent** — must be set while logged into Vercel as `pgakservice01-afk` (project `pgak-website`, team `pgakservice01-afks-projects`) |
| `LEAD_INTAKE_REST_URL`, `LEAD_INTAKE_SERVICE_KEY` | durable intake | **absent**: needs a private Postgres/PostgREST database (e.g. Supabase) with `db/lead-intake.sql` applied after review. This is a hosting decision for the owner; nothing paid was created |
| `LEAD_OUTBOX_SECRET` (Vercel) + same value as GitHub repo secret `LEAD_OUTBOX_SECRET` | retry worker | absent |
| `LEAD_REPLAY_SECRET` | register replay endpoint | optional |

## 8. Controlled end-to-end test (only after explicit approval)

1. The owner names the test phone, the ERP user who will look and the Telegram chat, and approves the time.
2. Submit once with name "PGAK TEST — delete". The browser form mints a random ref, so either post the same JSON body to `/api/leads` with `ref: "TEST-<8+ chars>"` (the register then marks it `TEST`), or use the form and mark the ERP row as a test by hand.
3. Read back:
   - the ERP row, with its id;
   - the Telegram message;
   - the register row with `TEST`, and both emails, if the register is configured;
   - GA4 DebugView: `lead_accepted`, then `generate_lead`, with one `lead_ref`.
4. Repeat the same ref and confirm no second ERP row is created.
5. Delivery is proven only when all four are seen. HTTP 200 or a config flag is not proof.
