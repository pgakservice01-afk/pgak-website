# PGAK premium redesign — 19 September 2026

## Implementation

The existing Next.js repository and Vercel Git deployment are retained. Work is isolated on `codex/premium-redesign`, based on `f5aed82`. No existing SEO URL is deleted or renamed.

The homepage now has a white background, large system-font headings, a single primary demo action, a secondary free audit, an original 4 KB SVG product illustration, compatibility explanation, seven capabilities, five industries, four process steps, honest evaluation guidance, native HTML FAQs and an audit form. The illustration is explicitly labelled; no Apple asset, customer footage, testimonial or result is invented.

Shared navigation uses ordinary crawlable links and a native mobile disclosure. The footer's complete service/capability/location directory is a native disclosure rendered in HTML. Detailed service, feature, location, insight and other pages retain their information architecture while adopting the white visual system. The shared Reveal component no longer hides content until JavaScript/scroll events execute. Keyboard skip links target main landmarks.

Global smooth scrolling, ambient effects, animation interactions, progress indicators and floating overlays have been removed from the layout. No webfonts are downloaded. The footer is now a Server Component, keeping the large service taxonomy out of the client bundle. The hero has fixed intrinsic dimensions and fetch priority; existing WebP assets and cache policies remain.

The public GTM-MKZWLS7J container, fetched 19 September, contained one `__googtag` tag for G-6EMP9HSR2F. The redundant GTM loader and iframe have been removed. The existing direct GA4 loader, conversion queue, Meta pixel and Vercel analytics remain. Local/preview traffic is excluded from production analytics loaders as before. GA4 reporting configuration and field performance require separate observed data; laboratory tests do not establish organic lead improvements.

## Leads

New `/book-demo` page uses the shared validated API relay and says that the team will arrange a time. It does not falsely confirm a scheduled booking. `demo_request` fires only after `delivered:true`, alongside deduplicated `form_submit` and `generate_lead`; audit and pricing events remain distinct. The CTA attribution identifies the requested demo in the CRM. All generic click tracking avoids contact field values. The full form now carries its missing `data-lead-form` marker for form-start tracking.

Existing retry reference, validation, notification fallback, WhatsApp and telephone recovery are retained. A local-only CRM sink is used for development verification. Production testing and any receipt limitations are recorded below. No absolute guarantee of zero lead loss is inferred from tests.

## SEO and accessibility

Existing canonical helpers, Organization, SoftwareApplication, Article and breadcrumb markup are preserved. Homepage FAQ markup matches the visible native disclosures. New demo metadata, breadcrumb and sitemap entry are added. Existing robots rules allow public pages to Googlebot, Bingbot, OAI-SearchBot and PerplexityBot while excluding private/API paths. Sitemap contains only public canonical indexable content, checked by the crawl scripts.

## Validation

- Existing 13 URL-protection, 26 lead validation and 3 analytics tests pass.
- Added five lead-client tests: confirmed/deduplicated demo, audit and pricing events; failure/unconfirmed delivery; field errors.
- First local mobile Lighthouse: performance 97, accessibility 96, best practices 100, SEO 100; LCP approximately 2.5 s, TBT 30 ms, CLS 0. Two accessibility findings (step-number contrast, accessible names) corrected after this run.
- First local crawl: 141 sitemap pages, no request errors, no duplicate titles, no missing descriptions.
- Chrome at 390 px: homepage and factory page have no horizontal overflow. Demo form rejects invalid input and reaches confirmed success through the local API and CRM test sink.

Final production evidence is appended after release. Raw results live in `evidence/`. INP requires real user interaction/field data; Lighthouse TBT is not INP.

## Rollback

Revert the GitHub release merge to trigger Vercel's established production deployment. Do not force-push or drop routes. The prior production commit is `f5aed82d311db1d3f8300df90fe80b2434836156`.

### Pre-release results

Final local mobile Lighthouse: **98 performance / 100 accessibility / 100 best practices / 100 SEO**, LCP **2.2 s**, TBT **100 ms**, CLS **0**. This excludes production analytics by design, so production is measured separately.

All **418 internal link targets** pass, including fragment destinations. No missing alt attributes, duplicate titles, non-self canonicals or noindex URLs in the sitemap. Chrome widths 320, 375, 390, 768, 1024 and 1440 were checked. The native mobile menu opens correctly at 320 px. Browser integration tests confirm homepage audit, dedicated audit, pricing, demo and full contact form receipt at the local CRM. An intentional ERP 503 shows the retry action with the phone/camera values still visible and populated WhatsApp/phone fallback links. No WhatsApp message or telephone call was placed.

## Production release and final evidence

[PR 19](https://github.com/pgakservice01-afk/pgak-website/pull/19) merged as `8a1be5e3af1519051069bd5b67ba2d9752eba7a3`. Vercel marked [production deployment](https://vercel.com/pgakservice01-afks-projects/pgak-website/2jgCmSnxqkyqp5JueiAeGMi1Syvg) successful. The public domain serves the new interface, and Chrome verified the desktop/mobile homepage, demo navigation and no captured page errors.

Production validation:

- **141/141 sitemap pages** return 200, with one H1, canonical and parseable JSON-LD. All **418 internal link targets**, including fragments, pass. No missing image alt attributes, duplicate titles, noncanonical sitemap entries or noindex pages.
- Googlebot, Bingbot, OAI-SearchBot and PerplexityBot are permitted by robots.txt; HTTP requests using each user agent return 200 and contain the homepage SEO content. These are access checks, not proof that the actual crawler has indexed the page.
- One production contact submission, labelled **PGAK WEBSITE QA TEST - DO NOT CONTACT**, used PGAK's public business phone. It reached the success UI; reference prefix **3fdb6740**. The relay only returns `delivered:true` when the ERP returns a row identifier or duplicate acknowledgement. This verifies the live relay acknowledgement, not a manual inspection of the CRM or Telegram inbox. The test is not a qualified sales lead and should be excluded from sales reporting. No WhatsApp message or call was placed.
- All five compact/full form types used on the site were tested through the local CRM sink, including article checklist delivery. Failure testing retained fields and offered retry, WhatsApp and phone recovery. Five additional lead-client tests cover event deduplication and failure semantics; 47 total tests pass.

### Performance results (laboratory, not field CWV)

| Measurement | Performance | Accessibility | Best practices | SEO | LCP | TBT | CLS |
|---|---:|---:|---:|---:|---:|---:|---:|
| CLI production before | 80 | 97 | 77 | 100 | 3.6 s | 350 ms | 0 |
| CLI production first after, during concurrent verification | 57 | 100 | 77 | 100 | 3.9 s | 860 ms | 0 |
| CLI production isolated retest | 92 | 100 | 77 | 100 | 1.9 s | 320 ms | 0 |
| Google PSI mobile | 94 | 100 | 100 | 100 | 1.4 s | 280 ms | 0 |
| Google PSI desktop | 92 | 100 | 100 | 100 | 0.3 s | 230 ms | 0 |

[Public PageSpeed report](https://pagespeed.web.dev/analysis/https-www-pgak-co-in/lja9m4dwe2?form_factor=mobile), captured 19 September 2026 at 04:45 IST. The API initially returned quota error 429; the browser report completed successfully. CLI raw reports are retained, including the slower first run. Environment variability is material. CLI best-practices deductions concern the existing Meta pixel's third-party cookies; the Google-hosted report scores these differently. The verified duplicate GTM loader is gone, while the existing Meta lead/ad measurement is preserved.

There is **no field data** in PSI, so **INP ≤200 ms is not yet verified**. TBT is a separate lab metric. Rankings, indexed coverage and qualified-lead gains require elapsed production data and Search Console/analytics access. No numerical growth claim is made.

The post-release audit also found outdated absolute no-hardware/no-lock-in copy and plain URLs in `llms.txt`. [PR 20](https://github.com/pgakservice01-afk/pgak-website/pull/20) corrects these to assessed compatibility, explicit quote scope and Markdown links, and adds the demo page. The robots policy continues to govern crawler access.
