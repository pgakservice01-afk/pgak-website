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
