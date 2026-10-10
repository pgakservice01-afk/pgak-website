# Performance — before and after

## Baseline (from the 8 Oct audit; not re-run here)

PageSpeed Insights on the production homepage:
- **mobile:** score 79, LCP 3.9 s, TBT 300 ms, CLS 0;
- **desktop:** score 97, LCP 0.7 s, TBT 140 ms.
- Flagged "properly size images": about 896 KiB.
- Search Console Core Web Vitals: **no field data**.

## What changed (commit 783c4a0)

| Asset | Before | After | Displayed at |
|---|---|---|---|
| 8 client logos (png/webp, up to 1528 px wide) | 505 KiB | 36 KiB (`-128h.webp`) | 64 px tall desktop, 44 px phone |
| PPE poster 1280×720 | 149 KiB | 95 KiB (960×540) | ~360 px grid cell / ~343 px phone |
| Dock poster `dock-count.webp` 1400×787 | 120 KiB | 47 KiB (960×540) | same |
| Hot-work poster 1920×1080 | 71 KiB | 37 KiB (960×540) | same |
| ANPR photo 1000×1501 (declared as 1600×1000) | 135 KiB | 74 KiB (800×1201, true dimensions) | evidence page and homepage |
| Hero srcset | 960w, 1920w | adds 1280w (41 KiB) | 100vw; LCP element, `fetchpriority="high"` already set |

Videos stay at `preload="none"` with no autoplay. Aspect ratios are unchanged, nothing is cropped, and the originals are kept.

## Measured on 8 Oct 2026 (built-in browser, 375×812 viewport, DPR 1, cold load, scrolled to the end)

Image bytes transferred on the homepage, from Resource Timing `encodedBodySize`:
- **production:** 369 KiB across 4 images — `ppe-gloves-poster` 149, `dock-count` 120, `hot-work-poster` 71, hero-960 29;
- **this branch (local):** 208 KiB across 4 images — 95, 47, 37, 29.
- **Change:** −161 KiB (−44%) on the images a phone actually loads.

Logos load lazily and did not register in either run at this scroll speed. Their saving (505 → 36 KiB) applies whenever the logo row is reached.

**Conditions:** a single run each, the same machine and network, and DPR 1 emulation. At DPR 2–3 the hero picks a larger candidate in both builds, and the new 1280w step helps there. This is a byte comparison, not a Lighthouse score.

## Not yet measured

- **Mobile lab score, LCP and TBT on the new code.** The Vercel preview is behind Vercel Authentication, so PageSpeed cannot fetch it. Run PageSpeed on production after release with the same settings, mobile, and record:
  - score, LCP, TBT, CLS;
  - the "properly size images" saving;
  - the top three LCP and TBT contributors.

  Targets: LCP ≤ 2.5 s, TBT ≤ 200 ms, CLS ≤ 0.1.
- **TBT / hydration.** Not profiled in this pass. The analytics scripts already load after first paint (`DeferredAnalytics` with `afterPagePaint`, `lazyOnload`). The homepage hero video loads only on wide screens. If mobile TBT stays above 200 ms after release, profile the next candidates:
  - `framer-motion` and `lenis` on the homepage;
  - the Meta Pixel and Clarity initialisation.
- **Real-user Core Web Vitals.** These need enough Chrome traffic for CrUX; check Search Console after 28 days.
