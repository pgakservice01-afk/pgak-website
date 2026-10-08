---
title: "Sack counting at loading bays: how to avoid double counts"
metaTitle: "Sack counting with CCTV: avoid double counts"
date: "2026-10-08"
category: "Camera Setup"
excerpt: "PGAK's dock recording shows sacks counted once each as they cross a line. Before you trust a camera count against a challan, test the three cases that break counts: overlap, reverse travel and occlusion."
metaDescription: "A camera can count sacks crossing a line once each. Test overlap, reverse travel and occlusion on your own bay before checking challans against it."
readTime: 7
draft: true
reviewStatus: "Awaiting PGAK engineer review. Check: 19:43 recording time, in/out counters and the 0.84–0.90 confidence range are taken from the /ai-cctv-for-warehouses proof caption in lib/solutions.ts; confirm against the clip. Confirm that the configured line supports separate in and out counts as described. No legal claim is made."
faqs:
  - q: "How does a camera avoid counting the same sack twice?"
    a: "Each sack is detected and given a tracking number as it moves through the frame, and it is counted once when that tracked object crosses the counting line. PGAK's dock recording shows this: the count rises from four to seven during an evening unload. Whether tracking holds on your bay depends on how loads are carried, so test it."
  - q: "What makes a camera sack count go wrong?"
    a: "Three situations: two sacks or two porters crossing the line shoulder to shoulder (overlap), a sack carried out and back in again (reverse travel), and sacks hidden behind a person, a trolley or the lorry door (occlusion). Stage each one on your own bay and compare the camera's count with a person's tally."
  - q: "Can the camera count replace stock counting?"
    a: "No. It counts a known item type crossing a line. It does not read labels, does not know whose consignment a sack belongs to and does not reconcile against a stock ledger. Use it as a figure to check a challan against while the lorry is still at the bay."
---

**Straight answer: a camera avoids double-counting sacks by tracking each one through the frame and counting it once as it crosses a line drawn at the bay. PGAK has a recording of exactly that. The count still goes wrong when sacks overlap, travel back across the line, or are hidden from view, so test those three cases on your own bay before you check a single challan against the figure.**

Most loading-bay disputes come down to a number reconstructed from memory: the porter's tally, the driver's challan and the supervisor's register do not agree, and nobody can say which is right. A line count from a dock camera gives a fourth figure that was recorded while the work happened. Its value depends on knowing when it can be wrong.

## What does PGAK's dock recording show?

The clip plays on the [warehouse page](/ai-cctv-for-warehouses) and is listed with its conditions on the [evidence page](/resources/evidence).

| Item | What is on record |
|---|---|
| Date and time | 19 December 2022, 19:43, an evening unload |
| Length | 16 seconds |
| Camera | An existing dock camera, with one counting line drawn across the dock entrance |
| What happens | Each sack crossing the line is detected, given a tracking number and added to a running total. The count rises from four to seven. |
| Confidence shown | On each box, around 0.84 to 0.90 in this clip |
| Redaction | The transport company's name and phone numbers on the lorry are blurred. No audio. |
| Status | Limited pilot in PGAK's [capability register](/platform/capabilities) |

What it proves: on that camera, with one line and that load, the tracker counted each sack once as it crossed. What it does not prove: a count rate over a full shift, behaviour with two porters side by side, behaviour with a load carried back out, or performance on your bay. PGAK publishes no measured counting accuracy.

## Why do double counts and missed counts happen?

A line count has two parts. Detection finds a sack in each frame. Tracking links the same sack across frames and gives it a number. The count only goes up when a tracked object crosses the line in the counting direction.

Errors come from breaks in that chain:

- **Overlap.** Two sacks, or two porters with a sack each, cross the line close together. The detector may see one object where there are two, so one is missed.
- **Reverse travel.** A sack goes in, then is carried back out because it was the wrong lot, then goes in again. If only one direction is counted, the figure is high by one.
- **Occlusion.** A porter's body, a trolley or the lorry's door hides the sack as it crosses. If the tracker loses the sack and picks it up again with a new number, it can be counted twice; if it never sees it cross, it is missed.
- **Loiter on the line.** A porter pauses on the line to adjust a load. Some trackers count the jitter back and forth.

None of these is unusual. All of them happen on a normal unload, which is why the test below stages them deliberately.

## The test protocol: overlap, reverse travel and occlusion

Run this on your own bay with your own sacks and porters, at the time of day you unload. Keep one person tallying by hand, without seeing the screen. That tally is the reference.

| # | Scenario | How to stage it | Correct count | What to record |
|---|---|---|---|---|
| 1 | Baseline | 20 sacks carried one at a time, clear gaps | 20 in | Camera count, any misses |
| 2 | Side by side | 10 pairs of porters crossing together | 20 in | Misses when paired |
| 3 | Stacked or double load | 10 trips with two sacks on one shoulder or trolley | 20 in | Does it count two or one per trip? |
| 4 | Reverse travel | 10 sacks in, 3 carried back out, 3 brought in again | In 13, out 3, net 10 | Whether out-counts register |
| 5 | Occlusion by porter | 10 sacks carried on the shoulder nearest the camera, 10 on the far shoulder | 20 in | Misses on the far side |
| 6 | Occlusion by door or trolley | 10 sacks crossing behind the lorry door or a parked trolley | 10 in | Misses and double counts |
| 7 | Pause on the line | 5 porters stop on the line for a few seconds | 5 in | Extra counts |
| 8 | Lighting | Repeat scenario 1 at the darkest time you unload | 20 in | Misses in low light |
| 9 | Other items | 10 sacks mixed with 10 cartons or crates | 10 sacks | Whether other items are counted as sacks |

Write the camera count and the hand tally side by side for each row. Then look at the clips for every row that disagrees. The pattern usually points to a fix: move the line, raise the camera, ask porters to cross in single file, or accept that a type of load needs a manual count.

Two of these rows were named in the conditions published with PGAK's own clip: two people through the gap shoulder to shoulder, and a load carried back out and in again. They are the first cases to try.

## Illustrative example: reconciling a lorry

These numbers are invented and round, to show the arithmetic only.

A lorry's challan says 400 sacks. The bay's line has separate in and out counts.

- Camera in-count: 404. Camera out-count: 6. Net = 404 − 6 = 398.
- Porter's hand tally: 400.
- Gap between camera and challan: 400 − 398 = 2 sacks, or 2 ÷ 400 = 0.5%.

What to do with a gap of 2: open the clips at the times the camera's count and the porter's tally diverged, and look. If the clips show two sacks carried together and counted as one, the challan stands and you have learnt something about scenario 3. If they show two sacks that never crossed, you have a question for the driver while the lorry is still at the bay.

The camera count does not settle the dispute on its own. It tells you where to look.

## Where to put the line, and the camera

- **Across the narrowest point** sacks must pass, usually the dock edge or the bay door, not the open floor.
- **At right angles to the direction of travel**, so a sack crosses cleanly rather than running along the line.
- **Seen from above and slightly to the side**, so a porter's body does not hide the sack. A camera mounted for a wide view of the yard is often the wrong one; [where to place cameras for AI detection](/insights/where-to-place-cctv-cameras-for-ai-detection) explains why.
- **Away from where people stand and talk**, so pauses on the line are rare.

## What a line count is not

It is not an inventory system. It does not read a label, does not know whose consignment a sack belongs to and does not reconcile against a stock ledger. It counts a known item type crossing one line. A camera count is also not a weighbridge: it says how many sacks, not how heavy.

If your disputes are about weight, grade or lot, a line count will not help. If your counts are small and a supervisor already tallies every lorry reliably, a camera may add little. Where it fits is a busy bay with frequent short-count arguments and nobody free to count every unload.

For counting people rather than goods, see [people counting from existing cameras](/insights/people-counting-footfall-cctv); for cartons on a conveyor, the same logic applies with different failure cases.

## What is the next step?

The [sack and object counting calculator](/platform/capabilities#scenario-C29) estimates how many hours of batch reconciliation a camera count could save, using your own batch numbers and the exception time it adds. It reminds you that a video count is not a certified weighing or stock system. More estimates are on the [calculators page](/calculators).

To find out whether your existing dock camera can see the line cleanly, [ask for a site-specific assessment](/free-audit).
