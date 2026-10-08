---
title: "Why CCTV misses blind spots around a warehouse"
metaTitle: "Warehouse CCTV blind spots: find them on a site plan"
date: "2026-09-12"
updated: "2026-10-08"
category: "Security Basics"
excerpt: "A blind spot is not only where there is no camera. It is anywhere a camera is too far, blocked, or alone. A site-plan exercise that marks occlusion and overlap, with a worked warehouse example."
metaDescription: "Warehouse CCTV blind spots come from distance, occlusion and single coverage. Map them on a site plan with pixel-density rings and overlapping views."
readTime: 7
image: "/insights/covers/cctv-blind-spots-where-thieves-look.webp"
draft: true
reviewStatus: "Awaiting PGAK engineer review. Perimeter/intrusion is UNVERIFIED for PGAK; the article claims no PGAK detection performance. The pixel-density bands are the rules of thumb already published in /insights/camera-resolution-vs-distance; the example camera (2,560 horizontal pixels, 90-degree lens) is hypothetical. Engineer to confirm the band wording matches that article."
faqs:
  - q: "What counts as a CCTV blind spot?"
    a: "Any place a person can stand or pass where no camera gives usable footage. That includes areas with no camera, but also areas a camera faces from too far away, areas hidden behind racks, stacked pallets or parked trucks, the ground directly under a high camera, and places covered by only one camera, which a single covered lens or failed cable turns blind."
  - q: "Why does a warehouse develop new blind spots after installation?"
    a: "Because the warehouse changes and the cameras do not. Pallet stacks grow, racks are added, trucks park in new places and shutters stay open, each blocking a view that was clear on installation day. Re-check the site plan whenever the layout changes, and at least every few months."
  - q: "How do I check my own warehouse for blind spots?"
    a: "Draw a simple scaled plan, mark each camera's position and view, mark the distance rings at which it can detect, observe, recognise or identify a person, then mark everything that blocks a view. Every gate, shutter, wall stretch and ladder should be seen by at least one camera at a useful level, and the important ones by two cameras from different angles. Confirm the result by walking the site with someone watching the live views, by day and after dark."
  - q: "Does adding more cameras fix blind spots?"
    a: "Only cameras placed to close a specific gap you have mapped. Cameras added without a plan usually duplicate views that already work, while corners, the far side of racks and the side lane stay exactly as exposed."
---

**Straight answer: CCTV misses blind spots around a warehouse for three reasons — distance (the camera sees the area but too few pixels land on a person to be useful), occlusion (racks, stacked pallets, parked trucks and pillars block the view, and they move), and single coverage (one camera on an approach means one covered lens or failed cable blanks it). You find them on a site plan: draw each camera's view, mark how far it is useful, mark what blocks it, and check that every approach is seen — the important ones by two cameras from different angles.**

Owners usually think about cameras from the inside: what the monitor shows. Anyone planning a theft looks from the outside, for the few metres between two views. This exercise is the deliberate version of that look.

## The three causes

**Distance.** A camera covering a 50-metre yard technically "sees" the far gate. Whether that footage is any use depends on pixels per metre at that spot. The [resolution-versus-distance guide](/insights/camera-resolution-vs-distance) explains the arithmetic and the rough bands used in practice: enough pixels to *detect* that someone is there, more to *observe* what they are doing, more again to *recognise* someone you know, and most of all to *identify* a stranger.

**Occlusion.** Racks, pallet stacks, a truck at the dock, an open shutter, a pillar, a tree. A warehouse's blind spots move every week, because its stock and vehicles do. Re-check the plan whenever the layout changes, and at least every few months. The ground directly under a high-mounted camera is a fixed one: a lens aimed at the far yard often sees nothing of the wall beneath it.

**Single coverage.** If an approach is seen by one camera, that camera is a single point of failure. Covering one lens, or a monsoon-soaked junction box, removes it completely. Two cameras from different angles — ideally each able to see the other — survive one being blocked.

## The site-plan exercise

You need a printed plan or squared paper (one square = 5 m works for most plots), a pencil, each camera's specification sheet, and an hour.

**Step 1 — Mark the approaches.** Gates, wicket doors, rolling shutters, dock doors, the side lane, every stretch of boundary wall, roof ladders, drains and culverts, the scrap yard. These are what must be seen.

**Step 2 — Mark each camera.** Position, mounting height, direction, lens angle (from the spec sheet), and horizontal pixel count.

**Step 3 — Draw the view and its distance rings.** For each camera, draw its view as a wedge. Then mark where it stops being useful at each level. For a lens with horizontal angle θ, the view is `2 × distance × tan(θ ÷ 2)` metres wide, and

> pixels per metre = horizontal pixels ÷ view width at that distance

**Step 4 — Shade the occlusions.** Racks, stacks, parked vehicles (where they *usually* park, not where they parked today), open shutters, pillars, trees, and the dead ground under each camera.

**Step 5 — Mark overlap.** For each approach, count the cameras that see it at a useful level, and whether any two see it from different directions.

**Step 6 — Repeat for night.** Shade areas where lighting is too poor for the camera to produce usable footage. A spot that works in daylight can be blind after dark.

**Step 7 — Walk it.** One person walks each approach; another watches the live views and says, at each point, which camera shows them and how clearly. Do it once by day and once after dark. The walk overrules the drawing.

### Worked example (illustrative example)

A hypothetical warehouse: a 60 m × 30 m shed on a plot with a 20 m front yard, a 5 m side lane on the east and a scrap area at the rear. Six cameras, each assumed to have 2,560 horizontal pixels and a 90° lens.

For a 90° lens, tan(45°) = 1, so the view is **2 × distance** wide, and pixels per metre = 2,560 ÷ (2 × distance) = **1,280 ÷ distance**.

| Distance from camera | View width | Pixels per metre | Rough band (from the resolution guide) |
|---|---|---|---|
| 5 m | 10 m | 256 | Identify |
| 10 m | 20 m | 128 | Recognise |
| 20 m | 40 m | 64 | Observe |
| 40 m | 80 m | 32 | Detect only |
| 50 m | 100 m | about 26 | Barely detect |

So each of these cameras identifies a stranger only within about 5 m, recognises a known person to about 10 m, and is of little use beyond about 40 m.

A rough sketch of the plot (north at top):

```
+-------------- rear wall ---------------+
| scrap  [C6]>                     |     |
|                                  |  s  |
|  +------- shed 60 x 30 -------+  |  i  |
|  | racks  racks  <[C5]        |  |  d  |
|  +----dock--dock--shutter-----+  |  e  |
|                                  |     |
|  [C2]>   front yard   <[C3]      |  l  |
|                                  |  a  |
|                                  |  n  |
|                                  |  e  |
|                                  |  ^  |
+--[C1]>--- main gate -------------+-[C4]+
```

Findings, after the plan and the night walk:

| Approach | Cameras seeing it | Best band | Occlusion | Overlap? | Gap | Action |
|---|---|---|---|---|---|---|
| Main gate | C1, C4 | Identify (C1 at 4 m) | None | Yes, two angles | — | None |
| Dock doors | C2, C3 | Observe (C2 at 15–25 m) | Trucks at docks block C3 most evenings | Effectively no — C3 is blocked when it matters | Person behind a parked truck is unseen | Add or move a camera to look *along* the dock face |
| Side lane (east) | C4, looking north | Detect only beyond 40 m | Lane bends behind the shed corner | No | Rear half of the lane unseen | Camera at the shed's north-east corner looking south down the lane |
| Rear wall | C6 | Observe near scrap; detect at far end | Scrap pile grew since installation | No | West end blocked by scrap | Move the scrap pile or the camera; second camera from the opposite corner |
| Shed interior, racks | C5 | Recognise at aisle mouth only | Racks: each aisle visible end-on, not along | No | Aisles 3–6 unseen | Cameras looking along the main aisles, not across them |
| Directly under C2 | None | — | Dead ground under the camera | No | Wall beneath C2 | C3's view extended, or C2 tilted |
| Front yard after dark | C2, C3 | Detect only | Poor lighting in the middle of the yard | Yes but unusable | Night footage unusable | Lighting first, then re-test |

Two lessons this hypothetical example shows clearly. Four of the seven gaps are **occlusion or lighting**, not camera count. And two need **a different angle**, not a new zone — looking along the dock face and along the side lane rather than across them.

## Where this falls short

- **The plan is a model.** Lens angles on spec sheets vary with the actual lens setting; the walk test is the truth.
- **Bands are rules of thumb**, not guarantees; real results depend on lighting, motion blur and compression.
- **A plan does not catch drift.** A camera knocked out of position, a dead camera or a new pallet stack will not appear on last month's drawing. Pair the plan with periodic live-view checks — see [tampering, obstruction and scene changes](/insights/cctv-camera-tampering-detection).
- **Coverage is not response.** A perfectly mapped site still needs someone to act when an alert or a recording shows something; see [how AI intrusion detection works](/insights/how-does-ai-intruder-detection-work) for rules with the response written in.
- **Sometimes the fix is not a camera.** Moving a scrap pile, keeping a dock clear at night, or adding a light can close a gap for less.

For how many cameras a warehouse typically needs and where, see [how many cameras does a warehouse actually need?](/insights/how-many-cameras-does-a-warehouse-need) and [where to place cameras so AI detection works](/insights/where-to-place-cctv-cameras-for-ai-detection).

## Next step

Once the gaps are closed, estimate what alerting on those approaches would cost in review time with the [Intrusion and line crossing calculator](/features/intrusion-alerts#scenario-C07) and the [false-alarm cost calculator](/calculators/false-alarm-cost); the [intrusion alerts](/features/intrusion-alerts) page explains how lines and zones are set. The walk-around costs nothing and needs nobody from outside. If you would like your site plan drawn and walked with you, including which existing cameras could carry detection rules, [ask for a site-specific assessment](/free-audit).
