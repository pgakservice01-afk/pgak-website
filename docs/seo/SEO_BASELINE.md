# PGAK SEO baseline — 18 September 2026

Source repository confirmed: `pgakservice01-afk/pgak-website`. README, DEPLOY.md, `lib/seo.ts`, page content and Vercel production deployment agree on pgak.co.in. Starting commit: `e5846068a3df2081b7db901814c88b79abeb82dc`; working branch: `codex/seo-qualified-leads`. Full pre-change git bundle is saved outside the checkout at `../pgak-before-seo.bundle`. No unrelated repository was changed.

## Commercial findings

- The homepage H1 was “Your cameras can see. We make them think.” It did not name the software category or B2B audience.
- Six supposed customer deployments carried invented locations, camera counts and outcomes. `lib/trust.ts` explicitly described them as placeholders; adjacent case-study data says scenarios are illustrative. The homepage nevertheless said “Real sites. Real outcomes.” These were not verified proof.
- A blanket no-hardware promise contradicted the documented on-site edge architecture. Hardware requirements must be checked rather than promised away.
- Solution hero demo CTAs led to an audit form far down the page and lacked click instrumentation. Contact clicks were incompletely classified.
- An artificial page preloader covered server-rendered content until hydration plus timers. A complex animated hero added work on mobile.
- Existing public routes, canonical handling, schema and lead relay are substantial working assets. Preserve them.

## Crawl and existing functionality

The complete production sitemap crawl returned 138 pages, all HTTP 200, one H1 each, one canonical each, and parseable JSON-LD. These are sitemap-listed pages, not proof that all are indexed. Raw results: `evidence/crawl-before.json`. Production GET `/api/leads` returned ERP configured, notification configured and new-lead alerts enabled. This health response is not proof of delivery to a CRM row.

`DEPLOY.md` records a previous compromised WordPress site and a 3 September historical GSC analysis. Those figures were not independently re-measured in this run. Current Ahrefs backlinks still include gambling and pharmaceutical legacy URLs. Existing 410 rules and legitimate redirects remain important.

## Ten requested systems: actual use and limitations

1. **Search Console:** Opened Domain property in authenticated Chrome. Access denied for the available Google account; only that account is signed in. Current 16-month/90/28/7-day exports, security/manual-action reports, URL inspection, sitemap submission and AI performance report unavailable. Do not interpret missing data as zero.
2. **GA4:** Authenticated Chrome property picker exposed other businesses, with no verified PGAK property available. No unrelated property's figures are used here. PGAK code uses `G-6EMP9HSR2F`. Organic sessions, conversion baseline and qualified-lead counts unavailable.
3. **Keyword Planner:** Used India, English, Google, last 12 months in the existing Ads session, read-only keyword discovery. AI video analytics software: 10–100 average monthly searches, low paid competition, bid range ₹46.28–₹497.06. Face recognition attendance system: 1K–10K, medium paid competition, ₹30.36–₹184.20. These are broad ranges and ad bids, not exact demand, actual CPC or organic difficulty. No campaigns launched.
4. **Google Trends:** Compared India past 12 months for AI video analytics / CCTV analytics / face recognition attendance. Relative averages 49 / 2 / 36. Many zero samples and noisy unrelated rising queries; do not infer precise volume or sustained growth. Attendance had relevant related queries. This supports evaluating the cluster, not a forecast.
5. **PageSpeed Insights:** Eight mobile templates measured; no CrUX field data available. Homepage: performance 65, accessibility 97, best practices 100, SEO 100; LCP 6.4s, TBT 290ms, CLS 0. See table below.
6. **Chrome Lighthouse:** Separate CLI Chrome run saved at `evidence/lighthouse-before.json`: performance 58, accessibility 97, best practices 77, SEO 100; LCP 7.3s. Different test environment from PSI; do not compare scores across those two runs as before/after.
7. **Chrome DevTools/browser inspection:** Live rendered content, links, forms, schema and console inspected. Captured console had an extension warning, no site error in the inspected initial state. HTTP crawler checks response data separately.
8. **Rich Results Test:** Homepage returned three valid items (LocalBusiness, Organization, Software Apps); software had non-critical issues. No fabricated pricing or ratings were added to silence warnings. [Baseline result](https://search.google.com/test/rich-results/result?id=Czk0zg7wk5O-9jYiSYwnUA).
9. **Schema.org validator:** Homepage reported zero errors, zero warnings across three detected top-level items. JSON parsing of all sitemap pages also passed.
10. **Ahrefs Backlink Checker:** pgak.co.in including subdomains: DR 2.2; approximately 1.1K backlinks; 245 linking websites; 98% dofollow links and 97% dofollow referring websites. Visible samples include legacy casino/pharmaceutical spam and generic blog-host articles. This is a limited free snapshot, not a full backlink export or proof of link quality.

## Mobile PSI baseline

| Page | Performance | Accessibility | Best practices | SEO | Report ID |
|---|---:|---:|---:|---:|---|
| / | 65 | 97 | 100 | 100 | s74nkiao27 |
| /video-analytics-software | 78 | 97 | 100 | 100 | 3fsv0a2t7d |
| /ai-cctv-for-warehouses | 69 | 97 | 100 | 100 | 4tg5f8h1rp |
| /factory-security | 82 | 97 | 100 | 100 | bp2gtowsug |
| /face-recognition-attendance-system | 69 | 97 | 100 | 100 | 9ifhkqfetg |
| /pricing | 90 | 97 | 100 | 100 | nvziosgere |
| /ai-cctv-ludhiana | 84 | 96 | 100 | 100 | ih8jwnsxp3 |
| /insights/what-is-video-analytics-software | 88 | 93 | 100 | 100 | yir318ku4y |

## Competitors and strategy

Google India category search and public source pages were inspected. [Sieora](https://www.sieora.in/video-analytics-software.html) foregrounds existing-camera analytics, modules and demo/quote actions. [Proeffico](https://proeffico.ai/solutions/ai-video-analytics/) explains deployment on existing feeds with industry modules. [CoCompanion](https://www.cocompanion.ai/) also leads with the software category and existing CCTV. Existing-camera compatibility is a category expectation, not a unique claim by itself.

PGAK can be more useful by spelling out camera suitability, on-site processing, pilot acceptance, attendance exceptions and complete quote scope. The implementation adds those decision aids without copying competitor prose or claiming competitor capabilities.

Keyword map retains one primary URL per exact term. Broader category and attendance hubs own general terms; industry pages own their specific context. Potential overlap remains between biometric attendance, face attendance and capability pages, and between intrusion and perimeter pages. Without query/URL GSC evidence, no ranking URL is removed or redirected. City pages are retained pending verified service-area and traffic evidence; no new cities are fabricated.

Google guidance consulted: [AI features](https://developers.google.com/search/docs/appearance/ai-features), [Search Essentials](https://developers.google.com/search/docs/essentials). Conventional crawlability, helpful content and truthful structured data remain the basis; no special AI markup or ranking claim is made for llms.txt.
