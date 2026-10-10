---
title: "Cross-camera search: measure investigation time without promising perfect tracking"
metaTitle: "Cross-camera search: how to test it on your site"
date: "2026-10-08"
category: "Buying Guide"
excerpt: "Cross-camera search suggests where else a person or vehicle appeared. It will not hand you a complete journey. A timed exercise on your own site shows how much investigation time it saves once the gaps and wrong matches are counted."
metaDescription: "Time a real walk-through manually and with cross-camera search. Log where the trail breaks and every false match before you believe the saving."
readTime: 7
draft: true
reviewStatus: "Awaiting PGAK engineer review. No PGAK evidence record exists for cross-camera search; written as a buyer evaluation guide only. Engineer to confirm supply wording and that the volunteer-walk exercise is practical on a live site."
faqs:
  - q: "Is cross-camera search the same as face recognition?"
    a: "No. Many systems match appearance — clothing colour, build, what a person is carrying, or a vehicle's type and colour — without recognising a face at all. Ask the supplier exactly what is compared and what the operator sees to check a suggested match."
  - q: "Will cross-camera search follow someone across the whole site?"
    a: "Do not expect it to. Places with no camera, changes in lighting, people hidden behind vehicles and staff in identical uniforms all break the trail. Treat its suggestions as leads, and expect to fill some gaps by hand."
  - q: "How many cameras do I need for a fair test?"
    a: "Enough to cover a route someone actually takes during an incident — typically five to eight cameras from a gate to an internal area and back. Include at least one stretch with no camera coverage, because that is where the trail usually breaks."
---

**Straight answer: cross-camera search takes a person or vehicle you select in one camera and suggests where the same subject appears in other cameras. On a real site it will find some appearances, miss others where coverage, light or angle changes, and occasionally offer someone who only looks similar. The honest way to judge it is a timed exercise: reconstruct the same known route by hand and with the tool, log every place the trail broke and every wrong suggestion, and compare total minutes including checking.**

The pitch for this capability is a complete path across your site in a few clicks. The useful version is more modest — a faster first draft of where to look — and that can still be worth having.

## What does cross-camera search compare?

Most systems compare appearance: upper and lower clothing colour, build, what someone is carrying; for vehicles, type, colour and sometimes shape. Some add a face or number plate where one is visible. The [feature guide](/features/guides/cross-camera-search) notes that this is not the same as face recognition — ask the supplier, in writing, what is compared and what evidence the operator sees beside each suggestion.

This has a direct consequence on Indian factory floors and warehouses: **when thirty people wear the same blue uniform, appearance matching has very little to work with.** That is the case to test, not the visitor in a bright shirt.

## What has to be right before the test?

- **Synchronised clocks on every recorder.** Cross-camera search narrows its suggestions by time. If one recorder runs four minutes slow, a real appearance can fall outside the window. Check and correct clocks first.
- **A camera map with routes.** Sketch the site, mark each camera, and draw the normal walking and driving routes between them. Note stretches with no coverage.
- **All test cameras indexed.** Ask which cameras the tool covers; a camera outside the index is a guaranteed gap.
- **Consent from the volunteer.** The exercise uses a staff member walking a route; ask, explain the purpose, and keep the footage under normal access rules.

## The timed investigation exercise

### Set up

1. Pick a route through five to eight cameras that matches a real incident pattern — for example, gate → parking → side door → store room → dispatch → gate.
2. Ask a volunteer to walk it twice on a normal working day: once in distinctive clothing, once in standard uniform during a shift change when colleagues dressed the same are around. If vehicles matter on your site, add one vehicle route.
3. A second person notes the ground truth: for each camera, the time the volunteer entered and left the view.

### Run A — manual

An investigator who did not see the walk is given the starting camera and time, and reconstructs the route using ordinary recorder playback. Time it from start to a written list of appearances.

### Run B — with the tool

A different investigator selects the volunteer in the first camera and works through the suggestions, accepting or rejecting each. Time it, including the minutes spent opening clips to check suggestions and filling any gaps by hand.

### Log the handoff gaps

A handoff is the move from one camera to the next on the route. Each one either holds or breaks:

| From → to camera | Expected transit (from walk) | Next appearance found by tool? | If not, why | Minutes to recover by hand |
|---|---|---|---|---|
| Gate → parking | 0:40 | Yes | — | 0 |
| Parking → side door | 1:10 | No | Volunteer hidden behind a truck | 6 |
| Side door → store room | 0:30 | No | No camera on corridor; lighting change | 9 |
| | | | | |

Gap causes worth recording: no coverage, steep angle, light change (bright yard to dim store), something blocking the view, a similar-looking person suggested instead.

### Review every false match

| Suggested appearance | Camera and time | Correct? | Why it looked similar | Minutes spent rejecting |
|---|---|---|---|---|
| | | | | |

False matches matter twice. They cost checking time, and if one is accepted without checking, an investigation follows the wrong person. Record each one, even when it was caught.

### Score it

- **Route completeness** = correct appearances found by the tool ÷ ground-truth appearances.
- **False matches per case** = wrong suggestions offered.
- **Total minutes** for Run A and Run B, with Run B including checking and gap recovery.

## Worked example: turning the exercise into time

**Illustrative example** (hypothetical numbers): the uniform walk passes 6 cameras.

- Run A, manual: the investigator spends about 12 minutes per camera — 6 × 12 = 72 minutes.
- Run B, with the tool: 15 minutes working through suggestions; 2 of 6 appearances missed and recovered by hand at about 12 minutes each, so 2 × 12 = 24 minutes; 3 false matches rejected in 5 minutes of checking.
- Run B total = 15 + 24 + 5 = 44 minutes. Saving = 72 − 44 = 28 minutes per case. Route completeness = 4 ÷ 6 ≈ 67%.

The calculator for this feature uses the formula hours = cases × (cameras × old minutes per camera − new total − verification) ÷ 60. With 8 investigations a month, a new total of 39 minutes (the 15 minutes of searching plus the 24 of hand recovery) and 5 minutes of verification:

8 × (6 × 12 − 39 − 5) ÷ 60 = 8 × 28 ÷ 60 ≈ 3.7 hours a month

Run the distinctive-clothing walk too, but do not average it into the uniform result. If your real incidents involve people in uniform, the uniform figure is the one that applies. Those hours are capacity, not cash — the [investigation time calculator](/calculators/investigation-time) shows when they become money and when they do not.

## What not to claim from a cross-camera result

- **Not a complete journey.** Write “appearances consistent with the same person at …”, not “the person went from A to B”, and note the gaps.
- **Not identification.** A suggested match is a lead for a person to verify against the original recordings. It is not, on its own, grounds for disciplinary action or an accusation.
- **Not routine tracking of staff.** Following individual employees around a site is a different purpose from investigating an incident. Restrict the tool to named investigators, log its use, and keep it tied to incidents. The [workplace privacy article](/insights/cctv-workplace-privacy-india) covers what to tell staff.

## When manual review is good enough

On a small site where an incident touches three or four cameras and manual review takes 15 minutes, there is little left to save. And if the exercise shows the trail breaking at the same uncovered corridor every time, the better first spend may be one well-placed camera — see [where the blind spots are](/insights/cctv-blind-spots-where-thieves-look).

## Next step

Enter your own exercise results into the [cross-camera search calculator](/features/guides/cross-camera-search#scenario-C02).

Cross-camera search is an industry capability that PGAK can evaluate on your site; how it would be supplied — PGAK software, a licensed module or an integration — and which cameras it can cover are confirmed per site, with anything extra itemised in the quote. To run this exercise with someone who will record the misses as carefully as the hits, [ask for a site-specific assessment](/free-audit).
