# SEO implementation — 18 September 2026

## Scope and reason

The working site already had 138 sitemap URLs and a server-side lead relay. This release preserves those URLs, existing redirects and spam protections, and improves the commercial journey rather than replacing the site.

- Homepage category-led title, H1 and B2B introduction; realistic existing-camera and hardware suitability language.
- Shared solution template gains a short above-the-fold assessment form, contextual WhatsApp enquiry, deployment-readiness checks, pilot acceptance guidance and pricing/checklist links. Category, warehouse, factory and attendance headings are aligned to their primary intent.
- Pricing introduces explicit written scope: camera count, sites, hardware, setup, support, updates, taxes and contract terms. No price is invented.
- Removed fictional customer deployments and unsupported numerical homepage outcomes. Replaced them with explicitly illustrative use cases and evaluation criteria. Animation labels distinguish illustration from customer evidence. Revised English/Hindi FAQs for compatibility, timing, privacy, attendance and pricing.
- Removed the artificial preloader and heavy autoplay hero animation; uses a responsive WebP poster and user-initiated video with fixed aspect ratio.
- Conversion event delegation covers money-page views, CTA intent, WhatsApp, phone, form starts and video plays. Submission events require server-confirmed delivery. Existing generate_lead/Meta handling is preserved. Removed duplicate GA/GTM event dispatch and old overlapping CTA listener. No field values are read by generic conversion listeners.
- Analytics scripts excluded from local/preview builds; Vercel production enables them. Other production hosts must explicitly opt in at build time. GA4 reporting and enhanced measurement settings cannot be verified without PGAK property access.
- Simplified robots crawler groups so public content and private-path exclusions apply consistently. Preserved existing training-crawler restrictions and canonical sitemap. Removed unverified approximate geo coordinates from schema; retained truthful existing entity relationships.
- Updated Next.js 14.2.35 to patched 15.5.24, migrated dynamic route params, restored build-time lint checks, patched transitive dependencies and PostCSS. npm audit reports zero known vulnerabilities after update. Existing anchor-navigation and WallClient hook warnings are documented, not build failures.
- Added crawl and analytics regression tools and the six requested SEO documents, including a 140-keyword map with explicit unavailable-data fields.

## Validation

Production baseline: 138/138 sitemap pages returned 200, one H1, one canonical and valid JSON-LD. Eight mobile PSI reports, Chrome rendered/mobile inspection, Lighthouse, Rich Results and Schema.org validation were completed; actual reports and limitations are in SEO_BASELINE.md.

Local production build, middleware/lead regressions and three analytics unit tests pass. Mobile quick form submits to a loopback mock ERP and displays the success state; no synthetic prospect was sent to production CRM. Test numbers are confined to this local workflow. Production CRM receipt and downstream qualification are not independently verified by this test.

Deployment and post-release evidence are appended after verification.

## Deliberately deferred

No destructive consolidation of attendance/city pages without Search Console query and URL history. No invented customer case study, certification, office, accuracy result or pricing. No outreach sent. GSC access denied and no verified PGAK GA4 property prevent current ranking, organic-conversion and qualified-lead baselines. Real demo bookings and qualified sales outcomes require CRM stage instrumentation; assessment requests are not mislabelled as booked demos. Existing deeper content still requires product-owner evidence review before factual performance claims can be treated as verified.

## Rollback

Pre-change commit: e5846068a3df2081b7db901814c88b79abeb82dc. Full backup: ../pgak-before-seo.bundle outside checkout. Revert the release merge through GitHub to trigger the established Vercel production flow; do not force-push or delete routes.

## Production release and verification

Implementation commit 12e033e merged through [PR 18](https://github.com/pgakservice01-afk/pgak-website/pull/18) as **f74377c4e89d7ff9db33ee67be3fbf4c2edd4084**. Vercel preview BKCLqdUdPdf8kojmjf4NHewMLUkt built successfully; Chrome access was denied by deployment protection for the connected account. No access controls were changed. Local production build and Chrome validation supplied the reviewable preview.

[Vercel production deployment](https://vercel.com/pgakservice01-afks-projects/pgak-website/42mENFVXVKHVshv6HcrAGRiYySec) succeeded. The public domain was verified to serve the new title/H1, copy and enquiry forms. GA4/GTM scripts load on production and Chrome reported no site errors. Live `/api/leads` reports ERP and notifications configured; this is not verification of a CRM row.

Final checks:
- 138/138 production sitemap URLs return 200, one H1 and canonical, and parseable JSON-LD. An initial offices-page network timeout cleared on recheck. Local full crawl also found zero duplicate titles, missing image alt attributes, orphan sitemap pages or non-self canonicals.
- HTTP/non-www and trailing-slash versions resolve to the canonical HTTPS www URL. Robots and sitemap are reachable and public indexing remains allowed.
- 13 middleware + 26 lead + 3 analytics tests pass. Lint/typecheck/build pass with documented pre-existing warnings. Local Chrome assessment/quote success tests reach a loopback ERP. An intentional ERP failure shows retry, retains entered details and exposes contextual WhatsApp/phone fallback. No test WhatsApp message or call was sent.
- [Google Rich Results retest](https://search.google.com/test/rich-results/result?id=_zxD4lk91GygUQQckI8Ccg): three valid items; software retains noncritical issues. Schema.org retest: zero errors, zero warnings, three top-level items.
- IndexNow accepted six priority URLs with HTTP 200: home, category, warehouse, factory, attendance, pricing. This is acceptance of notification, not proof of indexing. GSC submission remains inaccessible.

### Before/after performance — mixed, not a CWV pass

| Test | Before | After |
|---|---|---|
| CLI Lighthouse homepage performance | 58 | 71 |
| CLI homepage LCP | 7.3 s | 3.9 s |
| CLI homepage TBT | 400 ms | 630 ms |
| CLI homepage CLS | 0 | 0 |
| CLI accessibility / best practices / SEO | 97 / 77 / 100 | 97 / 77 / 100 |
| PSI mobile homepage performance | 65 | 61 |
| PSI mobile homepage LCP | 6.4 s | 7.1 s |
| PSI mobile homepage TBT | 290 ms | 430 ms |
| PSI mobile homepage CLS | 0 | 0 |

[Fresh PSI mobile report](https://pagespeed.web.dev/analysis/https-www-pgak-co-in/4b4l2vikr3?form_factor=mobile): accessibility 97, best practices 100, SEO 100. No field data. Independent lab environments disagree; do not cherry-pick the improvement or claim real-user CWV targets achieved. The paragraph is now LCP; PSI reports render delay and remaining JavaScript work. Follow-up must reduce measured main-thread/third-party work without breaking measurement or forms.

Attendance-template CLI Lighthouse after deployment: performance 75, accessibility 97, best practices 77, SEO 100; LCP 3.2 s, TBT 600 ms, CLS 0. Raw JSON reports are in evidence/.

Security dependency audit: zero known npm vulnerabilities after patching, versus 11 before. This does not certify the entire application secure.

### Commercial measurement limits

No organic lead, ranking, revenue or AI-visibility improvement can be concluded on release day. GSC access is denied and the connected GA4 account does not expose a verified PGAK property. Current funnel diagnosis and CRM receipt/qualification need that access and elapsed data. Real evidence, city-service validation, content/claim review, tag-container deduplication and authority work remain in the 90-day plan. No current GSC metric, fake customer proof or fabricated booked-demo event was added.

## 23 September 2026 — Search Console read, and AI-visibility plumbing

GSC access was obtained for `sc-domain:pgak.co.in` and read for the first time. Full figures, method and limits: `docs/seo/2026-09-23/GSC_BASELINE.md`. This supersedes the "GSC submission remains inaccessible" and "GSC access is denied" statements above for all reporting from this date; those statements stay as the record of what was true on release day.

Headline, 90 days to 2026-09-20: 150 clicks, 6.1K impressions, 2.5% CTR, average position 8.4. 63 of the 150 clicks are the query `pgak`. Non-brand demand concentrates in four question clusters (CCTV retention ≥304 impressions, AEBAS/Aadhaar ≥109, attendance fraud ≥99, AI CCTV price ≥47) that recorded zero clicks between them, each against a published article that already answers it. Indexing: 120 indexed against 4,290 not indexed, the bulk of it the documented WordPress spam already answered with `410 Gone`; ~47 real sitemap URLs are unindexed, including two live articles Google crawled and declined.

Changes shipped against that reading:

- `public/llms.txt` (static, 20 commercial links, no articles) replaced by `app/llms.txt/route.ts`, generated from the same data files as `app/sitemap.ts` — 160 links including all 80 answer articles, grouped with the highest-demand clusters first. A new post appears in it on the push that publishes it.
- `lib/aiReferrers.ts`: recognises assistant referrers (ChatGPT, Perplexity, Claude, Gemini, Copilot and others) and AI crawler user agents, keeping answer-time fetchers separate from index crawlers. Host matching is anchored to dot boundaries so a lookalike domain cannot be mislabelled; `lib/aiReferrers.test.ts` covers that case explicitly and is wired into `npm test`.
- `lib/attribution.ts` fires a GA4 `ai_referral` event once per session when an assistant sent the visit; `lib/leadRegister.ts` labels such leads `AI assistant: <name>` ahead of the generic referral line.
- `middleware.ts` logs one `ai-crawl operator="…" path="…"` line per AI bot fetch and sets an `X-AI-Crawler` response header.

These close three measurement gaps that `docs/seo/2026-09-23/AI_VISIBILITY_BASELINE.md` had named without a mechanism: AI-referral sessions, AI-sourced enquiries, and server-log evidence of whether AI agents are actually served.

No citation, ranking or traffic improvement is claimed from any of it. `llms.txt` is a convention no platform has committed to honouring; the rest produces evidence, not visitors. Verification today was local only: `npm test` (30 tests), `npm run test:analytics`, `npm run test:lead-client`, `npm run typecheck`, `npm run lint` and `npm run build` all pass, and `/llms.txt` prerenders to 160 links. Not diagnosed: the 94 server errors (5xx) in the indexing report, whose validation is already "Started".
