# AI camera feature collection — local preview

Date: 2026-09-19

- `/features`: dedicated landing page and interactive collection of all 20 researched capabilities.
- `/`: the same collection replaces the previous seven-item detection list.
- Search, category filters, reset state, expandable use cases and requirements, technology references, and camera-assessment links.
- No analytics engine or live camera processing is implemented by this marketing-site change. Every capability remains subject to product and site compatibility assessment.
- Six real Indian stock photographs are reused by relevant setting across the collection. No fake detection boxes or fabricated performance figures are overlaid. Each image has visible credit in the photo-credit disclosure.
- Original source URLs and credits: `lib/feature-explorer.ts`, `FEATURE_PHOTOS`.
- Optimised WebP assets: `public/features/`.
- Pexels licence: https://www.pexels.com/license/
- Unsplash licence: https://unsplash.com/license
- Existing capability detail routes remain available from the guides section.
- Local only. No production deployment performed.

Validation: TypeScript passed; lint completed with existing warnings in unrelated/previously existing code. Browser verification results recorded below when complete.

Browser checks: `/features` renders all 20 cards; category filtering returns four Camera intelligence cards; searching `plates` returns ANPR; an unmatched query exposes a working Reset filters button; native details expand correctly. Mobile viewport 390×844 has no horizontal overflow or broken loaded images. No Next.js error overlay or browser errors were observed. Concurrent B2B site edits changed the homepage during verification; the shared collection was reinserted without reverting those changes.

Final homepage verification: all 20 cards present; no mobile horizontal overflow; no framework error overlay. Category selection colour uses theme ink/background tokens to keep contrast in both site themes. Local preview: http://127.0.0.1:3000/features .

## Unique feature imagery revision

Replaced all feature-card stock-photo mappings with 20 distinct AI-generated feature illustrations in Indian business contexts. No repeated image files or image contents. Each asset directly depicts its named capability through the relevant scene, detection region, equipment, comparison or simulated interface. All generated illustrations were visually reviewed. Cards show an explicit AI-generated illustration caption; the disclosure identifies overlays as simulated. The existing credited factory hero photograph remains.

Assets: `public/features/<feature-slug>.webp`. Built-in image_gen used, one generation per feature. Exact prompts and original generated paths: `docs/features/image-generation-manifest.json`. Images retain their complete 3:2 composition without cropping or hover zoom. TypeScript passed; lint passed with existing unrelated warnings.

## Feature detail and keyword revision

Added 20 server-rendered guides at `/features/guides/<slug>` using plain-language, feature-specific copy in `lib/feature-guides.ts`. Every guide includes its corresponding unique illustration, operational context, setup requirements, evaluation advice, a specific FAQ, related links and camera-assessment CTA. All 20 routes returned HTTP 200 with one H1, expected image and self-canonical; all 20 appear in sitemap. Browser verified 20/20 images load and ANPR guide navigation works. The guide has no horizontal overflow at 390px. TypeScript and lint passed (existing unrelated warnings remain). No production deployment performed.

Google Trends comparison was attempted but returned HTTP 429. Saved evidence and keyword status in `KEYWORD_RESEARCH.md`, `KEYWORD_MAP.csv` and `evidence/google-trends-429.png`. Selected terms are relevance-based targets, not verified high-volume terms or guaranteed rankings.
