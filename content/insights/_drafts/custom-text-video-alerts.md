---
title: "Custom text alerts: translate a business rule into an acceptance test"
metaTitle: "Custom AI video alerts: turn a rule into a test"
date: "2026-10-08"
category: "Camera Setup"
excerpt: "“Alert me when a forklift enters the walkway” sounds precise until you ask which walkway, how far in, on which shift, and whether a hand pallet truck counts. A rule-to-test matrix settles those questions before the alert goes live."
metaDescription: "Rewrite a plain-language CCTV alert as object, zone, schedule and exclusions, then test it on positive and negative examples before switching it on."
readTime: 7
draft: true
reviewStatus: "Awaiting PGAK engineer review. No PGAK evidence record exists for custom text alerts; written as a buyer evaluation guide only. Worked numbers are hypothetical. Safety wording deliberately states that an alert does not replace segregation or supervision."
faqs:
  - q: "Will any written instruction work as a CCTV alert?"
    a: "No. Each platform supports a limited set of objects, actions and conditions, and every rule uses processing capacity. A written rule has to be checked against what the platform supports and then tested on representative footage from your own cameras before anyone relies on it."
  - q: "How many test examples does a custom alert need?"
    a: "There is no magic number. Cover every row of the matrix — each situation that should trigger, each look-alike that should not, each schedule edge — in daylight and at night. Then run it live for a trial period and count alerts per day against what the recipient can actually review."
  - q: "Can a custom alert replace a safety barrier or a supervisor?"
    a: "No. A forklift-in-walkway alert tells someone after the event has started; it does not stop the forklift. Physical segregation, marked routes, training and supervision stay exactly as your safety assessment requires. The alert is an extra signal for review."
---

**Straight answer: a custom text alert lets you describe a condition in words — “forklift in the pedestrian walkway”, “person in the dispatch cage after 8 pm” — instead of picking from a fixed menu. The words are the weak point: every everyday phrase hides decisions about which object, which area, which hours, how long and what does not count. Before the alert goes live, rewrite the sentence as an explicit rule, list the situations that must trigger it and the look-alikes that must not, and test both on your own footage, day and night.**

A rule nobody has tested produces one of two outcomes: it fires all day and gets muted, or it stays quiet when it matters. Both look the same on the first afternoon of the demonstration.

## Why is a plain-language rule ambiguous?

Take four ordinary phrases:

| Phrase | Hidden question |
|---|---|
| “near the machine” | How near? Does the operator standing at it count? Which machine, in which camera? |
| “after hours” | Which shift calendar? Sundays? Holidays? The overtime night before dispatch? |
| “vehicle” | Cars and trucks only, or also forklifts, hand pallet trucks, bicycles? |
| “no helmet” | Everywhere, or only on the shop floor? Visitors on the walkway? A helmet carried in the hand? |

The software will answer each question somehow. Your job is to answer it first, in writing, so you can check that the software's answer matches yours.

## Decompose the rule before you write it

Every useful alert can be written as eight parts:

1. **Object** — what must be present (person, forklift, truck).
2. **Action or state** — entering, stopping, staying, carrying.
3. **Zone** — the exact area, drawn on a specific camera view.
4. **Schedule** — when the rule is active, including holidays.
5. **Duration** — how long the condition must last before it counts.
6. **Exclusions** — what looks similar but must not trigger.
7. **Recipient** — a named person per shift, not a group nobody owns.
8. **Response** — what that person does in the first five minutes.

If you cannot fill in parts 7 and 8, stop there. A notification without a response adds noise, not safety.

## The rule-to-test matrix

The matrix is the acceptance test. It is written before the rule is configured, agreed with whoever owns the area, and filled in during testing.

### Example rule

“Alert the shift supervisor when a forklift enters the marked pedestrian walkway between bays 2 and 5, during working shifts, for longer than 2 seconds. Hand pallet trucks and forklifts crossing at the marked crossing point are excluded.”

### Ambiguities resolved

| Phrase | Decision recorded |
|---|---|
| “enters” | Any part of the forklift body inside the painted walkway lines, as seen from camera Bay-2-East |
| “working shifts” | 06:00–22:00 Monday to Saturday; rule off on Sundays and declared holidays |
| “longer than 2 seconds” | Removes a fork tip brushing the line while turning |
| “crossing point” | The 3-metre striped crossing at bay 4 is drawn as an exclusion zone |

### Test cases

| ID | Situation (staged or found in recorded footage) | Expected | Observed | Pass? | Notes |
|---|---|---|---|---|---|
| P1 | Forklift drives fully into walkway, daylight | Alert | | | |
| P2 | Forklift reverses into walkway | Alert | | | |
| P3 | Forklift enters walkway at night under site lighting | Alert | | | |
| P4 | Forklift partly in walkway for 5 seconds while a pallet is placed | Alert | | | |
| N1 | Forklift on the driving lane alongside the walkway | No alert | | | |
| N2 | Forklift crossing at the striped crossing point | No alert | | | |
| N3 | Hand pallet truck pushed along the walkway | No alert | | | |
| N4 | People walking the walkway carrying long items | No alert | | | |
| N5 | Forklift parked at the charging point next to the walkway | No alert | | | |
| N6 | Forklift reflection in a glass panel or puddle | No alert | | | |
| S1 | P1 repeated on a Sunday | No alert | | | |
| S2 | P1 repeated at 21:58 and 22:02 | Alert, then none | | | |
| E1 | P1 in heavy rain or winter fog | Alert | | | |

The P rows prove it fires. The N rows prove it stays quiet for things that happen every day on your floor — these are the rows a demonstration never includes. The S rows prove the schedule. E rows check the conditions your site actually has.

### Agree the pass criteria before testing

Write down, in advance:

- Which P rows must alert. For a safety-related rule, every one.
- How many N-row alerts are acceptable. Ideally none; if any, the reason is recorded and the rule adjusted.
- An **alert budget**: the number of alerts per day the recipient can genuinely review. Then run the rule live for a trial period — two weeks is common — and compare the daily count with the budget.

If the rule passes the matrix but blows the budget in the live trial, it has found a real situation you did not list. Add a row, decide what it should do, and retest.

## Will it save review time?

**Illustrative example** (hypothetical numbers): today a supervisor reviews 200 candidate events a month from generic motion alerts, at about 3 minutes each. With the custom rule, each event takes about 1 minute to review because it arrives with the right context. Keeping the rule and its test matrix up to date takes 2 hours a month.

hours = events × (old − new) ÷ 60 − rule maintenance hours = 200 × (3 − 1) ÷ 60 − 2 ≈ 6.7 − 2 = 4.7 hours a month

Note the maintenance line: rules need revisiting whenever a layout changes, a camera is moved or a new vehicle type arrives. The [false alarm cost calculator](/calculators/false-alarm-cost) is useful if the main problem today is noise from generic alerts.

## Where custom alerts are the wrong tool

- **As a safety control.** An alert does not replace physical segregation, marked routes, training or supervision. Keep every one of those your safety assessment requires; treat the alert as an extra signal.
- **When the camera cannot see the condition.** If the walkway is half hidden by racking from the only camera, no wording fixes it. Start with [camera placement](/insights/where-to-place-cctv-cameras-for-ai-detection).
- **When ordinary tuning would do.** Many noisy sites need a tighter zone, a schedule and a dwell time on a standard person or vehicle rule, not a custom one. The [alert tuning article](/insights/ai-cctv-false-alarms-how-to-reduce) covers that sequence.
- **When the platform does not support the concept.** Supported objects and actions differ between products, and each rule uses processing capacity on the unit that runs it. Ask for the list of supported concepts and how many rules a camera can carry at once.

## Next step

Estimate the review time involved with the [custom text alerts calculator](/features/guides/custom-text-alerts#scenario-C04), and read the [feature guide](/features/guides/custom-text-alerts) for the short version.

Custom text alerts are an industry capability that PGAK can evaluate at your site. PGAK's detection runs on an on-site processing unit, so each rule's processing load is part of the assessment; whether a given rule is supported — as PGAK software, a licensed module or an integration — is confirmed per site and camera, with anything extra itemised in the quote. If you have a rule in mind and want it written up as a matrix and tested on your own footage, [ask for a site-specific assessment](/free-audit).
