---
title: "Count cartons on conveyors without treating video as a certified scale"
metaTitle: "Carton counting with CCTV: run a controlled pilot"
date: "2026-10-08"
category: "Camera Setup"
excerpt: "A camera can count cartons crossing a line on a conveyor. It is not a weighing instrument and not a stock system. How to run a controlled count with an independent reference and reconcile it batch by batch."
metaDescription: "A camera can count cartons on a conveyor, but it is not a scale or stock system. Run a controlled pilot against an independent reference count."
readTime: 7
draft: true
reviewStatus: "Awaiting PGAK engineer review. PGAK's published counting evidence is sacks crossing one line at a loading bay (19 December 2022); carton counting on a conveyor has no PGAK evidence record and is written as something to evaluate per site. No legal claim is made; the article states only that a camera count is not a weighing or measuring instrument and carries no certification, without citing weights-and-measures law."
faqs:
  - q: "Can a CCTV camera count cartons on a conveyor?"
    a: "It can be evaluated. A counting line is drawn across the conveyor and each carton is counted once as it crosses. Whether it holds up depends on carton spacing, belt speed, lighting and camera position, which is why a controlled count against an independent reference comes first."
  - q: "Can a camera count replace a weighbridge or a stock count?"
    a: "No. A camera count says how many cartons crossed a line. It does not weigh anything, does not know what is inside a carton, and is not certified as a measuring instrument. Use it to cross-check a batch figure and to find where to look when figures disagree."
  - q: "What is an independent reference count?"
    a: "A count made by a different method that does not depend on the camera, such as a person tallying at the end of the line, a pallet build sheet, or a conveyor sensor already in place. The camera is compared against it, batch by batch, during the pilot."
---

**Straight answer: a camera can count cartons on a conveyor by drawing a line across the belt and counting each carton once as it crosses, and that is worth evaluating where batch counts are disputed or tallied by hand. It is not a weighing or measuring instrument, it is not certified for trade, and it does not know what is inside a carton. Prove it with a controlled count run against an independent reference before anyone uses the figure.**

Packing lines in Punjab produce cartons at a pace no supervisor can tally reliably all shift: hosiery, auto parts, fasteners, food packets. When the packing slip, the dispatch register and the customer's receipt disagree, a camera count is attractive because it is recorded while the cartons move. The risk is treating it as more than it is.

## What has PGAK actually shown?

PGAK's published counting material is a 16-second recording of sacks counted across one line at a loading bay, recorded 19 December 2022 on an existing dock camera. Each sack is given a tracking number so it is not counted twice, and the count rises from four to seven. It plays on the [warehouse page](/ai-cctv-for-warehouses) and is listed as a limited pilot in the [capability register](/platform/capabilities). It is not an inventory system and does not reconcile against a ledger.

Cartons on a conveyor are a different scene: faster, more regular, often touching. Nothing about the sack clip proves carton counting. The same technique can be evaluated on your line; the pilot below is how.

## What decides whether a conveyor count works?

| Variable | Why it matters | What to check |
|---|---|---|
| Carton spacing | Touching cartons can look like one long object | Are there gaps on the belt, or do cartons bunch? |
| Belt speed | Faster belts give fewer frames per carton | Speed at normal and peak output |
| Camera position | A view from above and slightly ahead separates cartons best | Is there an existing camera with that view? |
| Lighting | Glare on shrink-wrap or shadows from overhead fittings confuse detection | Day, night and with doors open |
| Carton variety | Several sizes and colours on one line | Is the model shown every type you run? |
| Rejects and reversals | Cartons pulled off or pushed back across the line | Where do rejects leave the belt? |
| Stops and restarts | A carton stopped on the line may be counted twice | How often does the belt stop? |
| People | Hands and arms crossing the line when cartons are adjusted | Do operators reach across at the counting point? |

## The controlled count run

This protocol is the original asset of this article. It produces a figure you can trust or reject.

**Before the run**

1. Choose one conveyor and one counting point, ideally after the last place a carton can be removed or added.
2. Choose the **independent reference count**: a person tallying at the end of the line on a hand counter, the pallet build sheet, or an existing conveyor sensor. It must not depend on the camera.
3. Write down camera height, angle, distance to belt, lighting and belt speed.
4. Agree the batch size, for example one pallet or one hour of output.

**During the run**

5. Run at least ten batches across different shifts, including one at peak speed and one at night.
6. Stage known problem cases in two batches: cartons bunched with no gap, a reject pulled and returned, a belt stop with a carton on the line, an operator reaching across.
7. The reference counter does not see the camera's figure until the batch is closed.

**After the run**

8. Fill in the reconciliation sheet below.
9. For every batch that disagrees, open the clip at the point of disagreement and record the cause.
10. Decide: accept, adjust and retest, or stop.

### Batch reconciliation sheet

| Batch | Shift | Reference count | Camera count | Difference | Difference % | Cause found in clip |
|---|---|---|---|---|---|---|
| 1 | | | | | | |
| 2 | | | | | | |
| … | | | | | | |
| Total | | | | | | |

Keep this sheet with the clips. It is your evidence of what the system did, and it is also what you would show a customer if a count is ever questioned.

### Illustrative example

These numbers are invented and round, to show the arithmetic only.

Ten batches of 500 cartons each are run, a reference total of 5,000.

| Batch | Reference | Camera | Difference | Cause found |
|---|---|---|---|---|
| 1–6 | 3,000 | 3,000 | 0 | — |
| 7 (bunched, staged) | 500 | 488 | −12 | Touching cartons counted as one |
| 8 (belt stop, staged) | 500 | 503 | +3 | Carton on the line counted on restart |
| 9 (night) | 500 | 496 | −4 | Glare from shrink-wrap |
| 10 (peak speed) | 500 | 499 | −1 | Two cartons close together |
| Total | 5,000 | 4,986 | −14 | |

- Overall difference: −14 ÷ 5,000 = −0.28%.
- But the total hides the pattern: the unstaged normal batches were exact or within a carton or two; bunching and belt stops cause most of the error.
- Next steps: add a gap-maker or move the counting point to where cartons are already spaced, and retest batches 7 to 9.

The useful result is not "0.28%". It is knowing which conditions break the count, so you can fix them or know when to fall back to a manual tally.

## How should the count be used once accepted?

- **As a cross-check, not the record.** Compare it with the packing slip at the end of each batch. Investigate differences; do not overwrite the slip.
- **To find the minute to look at.** When a customer disputes a short shipment, the camera's running count tells you which part of the recording to review. [Cutting investigation time](/calculators/investigation-time) is often the bigger benefit.
- **With exceptions owned by a person.** Someone reviews batches that disagree, daily.

## Limitations, and when not to bother

- **It is not a scale.** If disputes are about weight, use your weighing equipment.
- **It is not a stock system.** It does not read labels, track lots or know what is inside.
- **Existing sensors may be enough.** If the conveyor already has a photo-eye counter that agrees with the packing slip, a camera adds little except the recorded picture.
- **Mixed-product lines** need every product type tested; a new carton size can break a working setup.

For goods crossing a loading bay rather than a conveyor, PGAK's dock recording on the [warehouse page](/ai-cctv-for-warehouses) is the closer example, and [how many cameras a warehouse needs](/insights/how-many-cameras-does-a-warehouse-need) covers camera coverage.

## What is the next step?

The [sack and object counting calculator](/platform/capabilities#scenario-C29) estimates how many hours of batch reconciliation a camera count could save, minus the exception hours it adds, using your own batch numbers. It reminds you that a video count is not a certified weighing or stock system. More estimates are on the [calculators page](/calculators).

To check whether an existing camera sees your conveyor clearly enough to pilot, [ask for a site-specific assessment](/free-audit).
