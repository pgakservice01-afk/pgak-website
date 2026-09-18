# Spot-inspired PGAK redesign

## Scope

The homepage now uses a cinematic CCTV still, a floating rounded navigation bar, restrained purple CTAs, and three alternating video stories. White content sections retain PGAK's compatibility information, seven detection capabilities, five industries, process, proof policy, FAQs and enquiry form. The shared navigation and CTA style also apply to deeper pages.

The existing title, commercial-intent H1, description, canonical, server-rendered content and JSON-LD are retained. No SEO route or rich service/industry/insight content is removed. The lead API, attribution, analytics and idempotent delivery handling are unchanged.

## Media and performance

Three silent video clips and their stills come from the requested Spot AI reference; source details are in SPOT-MEDIA.md. Each is labelled as reference material rather than a PGAK product demonstration. No competitor customer logos, testimonials or performance numbers are reused.

Videos begin only after an explicit Play action. A small React component replaces a lazy image with native controls; it uses `preload="none"` and never starts playback on page load. This preserves user control and avoids downloading roughly 4 MB of video during initial page load. The hero is a 27 KB WebP with high fetch priority. No new JavaScript dependency, third-party player, font or animation library was added. Media is served locally under the existing immutable cache policy; replace filenames if content changes.

## Verification

- Production Next.js build and TypeScript checks passed.
- 47 automated middleware, lead-validation, analytics and lead-client tests passed.
- Chrome: all three videos played with decoded media and no video errors; all are silent (no audio tracks).
- Chrome: mobile menu, homepage audit form, and success rendering verified through the local ERP sink. The local sink acknowledged the lead. No new live sales enquiry was sent for this visual-only revision.
- No browser console errors during local flow.
- Narrow-screen fixes: white PGAK wordmark on dark navigation; adjusted heading and brand size at 320px.

The production ERP configuration and previously verified delivery path are preserved. Field Core Web Vitals and indexing are external outcomes, not guaranteed by a design deployment.

## Performance measurements

Local mobile Lighthouse after deferred video initialization: performance 96, accessibility 100, best practices 100, SEO 100; LCP 2.7 s, TBT 40 ms, CLS 0. The first version with three native players initialized at page load scored 83 with LCP 3.7 s and TBT 260 ms. These are lab measurements, not field INP. The hero WebP was subsequently reduced from 46,856 to 26,898 bytes. The optimized build and Vercel preview build both passed.

Chrome verified zero video elements before Play, creation and successful playback after Play, and keyboard focus transfer to the native player. Responsive checks found no horizontal overflow at 320, 375, 390, 768, 1024 and 1440 pixels. The Book a Demo link and destination page were also visually checked.

The final HTML crawl passed all 141 canonical sitemap pages and 422 internal link/fragment targets, with no missing descriptions/alts, duplicate titles, noncanonical entries, malformed structured data or indexability errors. The link checker now recognises binary media responses rather than attempting to decode MP4 files as HTML.
