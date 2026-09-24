# B2B readiness release verification

Date: 2026-09-19. Branch: `codex/b2b-readiness-release`. Base: `89b3401`.

## Passed

- Optimized Next.js production build, TypeScript and lint (existing lint warnings remain).
- 65 automated tests: middleware, lead validation, analytics, lead-client, metadata/paint checks and B2B calculator/intake boundaries.
- Local HTTP integration against a synthetic SQLite RPC/CRM adapter: durable acceptance during CRM failure, duplicate receipt, optional details with blank location, invalid token, worker authorization, retry/recovery and failed receipt.
- Chrome form failure retains values; retry succeeds; optional details save after initial receipt. No real customer enquiry was sent.
- Chrome homepage widths 360, 390, 640, 768, 1024 and 1440: no horizontal overflow. Mobile navigation responds to keyboard. Pricing at 390px fits.
- 151 sitemap pages return valid HTML; 435 internal targets have no broken links. No duplicate titles, missing canonicals, invalid JSON-LD, missing image alt text or noindex sitemap entries. Unknown route returns HTTP 404.
- Local mobile Lighthouse: performance 98, accessibility 100, best practices 100, SEO 100; LCP 2.1s, CLS 0, TBT 70ms. A supplemental label/name finding on the footer logo was corrected afterward.

## Limits and release gates

This is a review release, not a claim that every requirement is production-complete.

- The PostgreSQL migration has not been applied or verified against a real database. The SQLite adapter validates application contracts, not PostgreSQL correctness.
- Production durable intake requires approved database provisioning/migration, server configuration, scheduled outbox worker, private queue ownership/alerting and real ERP idempotency verification. Existing direct CRM delivery remains the fallback when intake is not configured.
- Supplemental details are retained privately but require an approved CRM update integration or the documented manual handling process.
- CRM qualification/demo-held/pilot/won outcome ingestion is specified, not connected. Analytics account/debug-view verification has not been performed.
- Product capability evidence, camera/VMS matrices, prices and customer permissions require company verification; no unverified claim has been promoted into the new capability register. Preserved legacy SEO pages still need specialist claim review.
- The 120 content briefs are private editorial hypotheses, not demand-validated or approved articles. No bulk publication occurred.
- Lighthouse is a local lab snapshot. Field p75 LCP/INP/CLS, public PageSpeed Insights, Safari, full screen-reader testing, independent zoom/reduced-motion testing and Search Console/Rich Results checks remain unverified.
- Baseline and after Chrome screenshots were visually inspected during implementation. The retained after-mobile image is Lighthouse's screenshot. Historical baseline reports in `docs/redesign/evidence` predate this branch and are not a controlled before/after performance comparison.

## Rollback

Keep this branch unmerged until release gates are met. For a subsequent production release, record the current Vercel deployment before promotion and restore that deployment if necessary. Disable new durable intake only after queued receipts are reconciled; do not discard the receipt store or outbox. See LEAD-RECOVERY.md.
