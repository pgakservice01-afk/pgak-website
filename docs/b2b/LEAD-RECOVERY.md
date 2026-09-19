# Lead receipt, recovery and configuration

## Current path and release gate

The existing production ERP path remains the default. It returns success only after a CRM row id. It retries transient delivery and has approved owner notifications, but is **not** a transactional intake/outbox. Missing location is accepted. This release must not claim full outage durability while that legacy path is active.

The new adapter is opt-in. Before enabling it, an authorised operator must apply `db/lead-intake.sql` in an approved private PostgreSQL/Supabase database, verify row-level access, and configure the server-only variables below. No production secrets or database schema were changed by this implementation. No managed database connector is available in this session. Local SQLite emulation verifies the app contract; it does not prove the PostgreSQL migration.

- `LEAD_INTAKE_REST_URL`: approved PostgREST base URL, normally ending in `/rest/v1`.
- `LEAD_INTAKE_SERVICE_KEY`: server-only service credential for the approved database. Never use NEXT_PUBLIC.
- `LEAD_OUTBOX_SECRET`: bearer secret for the POST worker route.
- Existing `ERP_LEADS_ENDPOINT`, `ERP_WEBHOOK_SECRET` and approved notification variables remain server-only.

Schedule authenticated POST `/api/lead-outbox` through the approved scheduler at an interval that meets the agreed operating needs. No scheduler, paid service or secret is created automatically. Test config in staging first. Do not enable intake without an owned queue and functioning worker.

## Invariants

Receipt and outbox insert occur in one transaction. Response `received:true` means that transaction returned the matching ref. `queued` and `delivered` are separate. The browser reports one lead outcome after receipt (or legacy CRM acceptance), not after a click. Missing location enters `website-sales`; it is not silently discarded. Repeated receipt refs preserve the first lead. The receipt token is bound to ref and phone and only its hash is stored. Optional details are accepted only with that token; failure cannot erase the original enquiry.

Worker uses limited batches and lease tokens with SKIP LOCKED, bounded requests, exponential retries and an attention state. ERP must implement durable `Idempotency-Key` deduplication: a remote success followed by a lost response otherwise remains a duplication risk. Verify that ERP contract in staging before enabling the adapter. Telegram receives a ref-only queue notification, not contact details. Contact values are not printed in application logs or analytics.

## Operator ownership and recovery

Assign an actual owner to `website-sales` before release. That owner must have authorised private access to receipts joined with outbox status; do not create a public queue. Review queued age, attention jobs and stale leases at the beginning/end of each working shift. Alert on oldest queued age, repeated failure and worker absence through the approved operational channel. The code emits `LEAD_OUTBOX_UNAVAILABLE` when the database/worker boundary fails; a production log alert must be configured by the operator.

On a delivery fault: confirm receipt exists; inspect redacted error category; repair endpoint/auth/connectivity; requeue the job with an operator audit record; preserve the original ref. Never delete the receipt to retry. On missing location: the website-sales owner calls to clarify and assigns the correct territory. Optional details remain on the private receipt; delivered CRM records require an approved update integration or manual reconciliation (not a second lead).

Retain records only for the owner's approved retention period; apply access reviews and deletion procedures. Do not copy customer payloads into issues or public logs. Database backup/restore and retention must be confirmed with its operator.

## Verification and rollback

Local tests use clearly labelled synthetic values, no live sales endpoint and no production analytics loader. Test accepted receipt while ERP fails, retry, duplicate ref, optional details, missing location, failed receipt and preserved input. Repeat using the real staging database before enabling production.

Rollback UI by reverting the release commit. If durable intake was enabled, keep its worker running until pending receipts are reconciled; do not simply remove the tables or disable delivery. Production previously ran main commit 89b3401 before this branch.
