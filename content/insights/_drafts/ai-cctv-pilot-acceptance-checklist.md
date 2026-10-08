---
title: "How to run a 14-day AI CCTV pilot before buying"
metaTitle: "How to run a 14-day AI CCTV pilot before you buy"
date: "2026-10-08"
category: "Buying Guide"
excerpt: "A day-by-day plan and worksheet for testing AI CCTV on your own cameras: log real events by day and night, count true, false and missed alerts, and measure how long alerts take — then decide against criteria set in advance."
metaDescription: "A 14-day AI CCTV pilot plan: log day and night events, measure precision, recall and alert delay, and decide against criteria agreed before you start."
readTime: 9
draft: true
reviewStatus: "Awaiting PGAK engineer review. All counts, delays and acceptance thresholds in the worked example are hypothetical, chosen to show the arithmetic; they are not PGAK results or recommended standards. New article; overlaps checked against /resources/evaluation-method (method, linked not repeated) and /insights/compare-ai-video-analytics-suppliers-india (supplier scorecard, linked not repeated)."
faqs:
  - q: "How long should an AI CCTV pilot run?"
    a: "Long enough to see the conditions that matter: working days and holidays, day and night, and ideally some bad weather. Fourteen days is a practical minimum for a small pilot because it covers two full weekly cycles. Whatever the length, it should produce enough real events to count, and the sample size should be reported with the results."
  - q: "What are precision and recall in an AI CCTV pilot?"
    a: "Precision is the share of alerts that were real: true alerts divided by all alerts. Recall is the share of real events that were alerted: detected eligible events divided by all eligible events. Both need an independent record of what actually happened, kept by a person, not taken from the system's own output."
  - q: "Should acceptance criteria be agreed before the pilot?"
    a: "Yes. Write the events that count, the cameras, the hours and the pass marks before the pilot starts, and do not change thresholds after seeing the results. Otherwise any system can be made to look as if it passed."
  - q: "Can a pilot prove the system will work across the whole site?"
    a: "No. A short pilot on a few cameras shows how the system behaved on those cameras, in that period, under those conditions. It is the best evidence available before buying, but staged events are easier than real ones and other cameras may behave differently. Report the limits alongside the result."
---

**Straight answer: run the pilot on two or three of your own cameras that matter most, for 14 days, with criteria agreed before it starts. Keep a separate log of every real event by day and night, then count true alerts, false alerts and missed events, and time how long each alert took to arrive. Precision, recall and delay — measured against your own log — are what decide the purchase, not a demo or a brochure figure.**

A demo shows that a system can work somewhere. A pilot shows whether it works on your cameras, in your light, with your people walking through the frame. The difference is the whole point of spending two weeks on it.

This article is the practical plan. The underlying method — definitions, denominators, what to report — is on the [pilot worksheet page](/resources/evaluation-method), and the [supplier comparison guide](/insights/compare-ai-video-analytics-suppliers-india) covers how to score several suppliers side by side.

## What has to be agreed before day 1?

Write these down and have the supplier sign or email agreement:

1. **The events that count.** One sentence each, observable on video. "A person enters the closed loading bay after 9 pm" — not "security breach".
2. **The cameras.** Two or three, including at least one that faces the hardest conditions (night, glare, distance).
3. **The hours.** When each rule is active.
4. **Who keeps the ground-truth log** — a named person who is not the supplier.
5. **Pass marks.** For each event: minimum precision, minimum recall by day and by night, and maximum alert delay. These are your numbers; there is no industry standard to copy.
6. **What the supplier may change** during the pilot (zones, schedules, sensitivity) and how each change is recorded.
7. **Data handling.** Who can see pilot footage and events, where they are stored, and when they are deleted. Get permission from people who will appear in staged tests.

Never send camera passwords, stream addresses or remote-access links over WhatsApp or a web form to set this up. Access should be arranged on site, through a permissioned process with named people.

## The 14-day plan

| Days | What happens | Output |
|---|---|---|
| 1–2 | Connect the cameras; confirm stable streams; set zones and schedules; synchronise clocks on recorder, processing unit and the logger's phone | Configuration record: camera models, firmware, software version, zones |
| 3–6 | Normal operation, day and night. Ground-truth logger records every eligible real event | First event log; first alert count |
| 7 | Mid-pilot review. One agreed tuning change, if needed, recorded with time | Change log |
| 8–11 | Normal operation continues, now with staged events: walk-throughs by day and after dark, and **negative examples** (legitimate workers, a vehicle, an animal-sized object, headlights) | Staged-event log |
| 12 | Interruption tests: internet disconnected, one camera unplugged, processing unit restarted | Outage record |
| 13 | Export all events from the system | Event export with timestamps |
| 14 | Count, calculate, decide | Completed worksheet |

The interruption tests on day 12 are described step by step in [does AI CCTV work without internet](/insights/does-ai-cctv-work-without-internet).

## The pilot worksheet

Keep one row per eligible event in the ground-truth log, and one row per alert from the system. Then match them.

**Ground-truth log (kept by your person)**

| # | Date | Time | Camera | Day or night | Event (as defined) | Real or staged | Alert received? | Alert time | Delay (s) |
|---|---|---|---|---|---|---|---|---|---|
| 1 | | | | | | | | | |

**Alert log (from the system export)**

| # | Date | Time | Camera | Rule | Matches a logged event? (Y/N) | If N, what caused it |
|---|---|---|---|---|---|---|
| 1 | | | | | | |

The "what caused it" column for false alerts is the most useful column in the pilot: headlights, shadows, a worker on legitimate duty, rain. It tells you whether tuning or a camera change could fix the problem.

**Summary**

| Measure | Formula | Day | Night | All |
|---|---|---|---|---|
| Eligible events (E) | Count from ground-truth log | | | |
| Alerts (A) | Count from alert log | | | |
| True alerts (T) | Alerts that match a logged event | | | |
| False alerts | A − T | | | |
| Missed events | E − T | | | |
| Precision | T ÷ A | | | |
| Recall | T ÷ E | | | |
| Delay | Distribution of delay for true alerts | | | |

If a denominator is zero — no alerts at night, for example — write "not measured", not 0% or 100%. Model confidence shown on screen is not the same as measured accuracy.

## Worked pilot result: an illustrative example

The figures below are **hypothetical**, chosen to show the arithmetic. They are not a PGAK result.

Three cameras, one rule ("person in the loading bay after hours"), 14 days.

| | Day | Night | All |
|---|---|---|---|
| Eligible events (E) | 24 | 16 | 40 |
| Alerts (A) | 26 | 14 | 40 |
| True alerts (T) | 21 | 9 | 30 |
| False alerts (A − T) | 5 | 5 | 10 |
| Missed events (E − T) | 3 | 7 | 10 |
| Precision (T ÷ A) | 21 ÷ 26 = 80.8% | 9 ÷ 14 = 64.3% | 30 ÷ 40 = 75.0% |
| Recall (T ÷ E) | 21 ÷ 24 = 87.5% | 9 ÷ 16 = 56.3% | 30 ÷ 40 = 75.0% |

**Delay for the 30 true alerts**

| Delay | Alerts | Running total |
|---|---|---|
| Under 30 seconds | 22 | 22 |
| 30–60 seconds | 4 | 26 |
| 1–5 minutes | 3 | 29 |
| Over 5 minutes | 1 (during the day-12 internet test) | 30 |

The middle (15th) alert falls in "under 30 seconds". 29 of 30 alerts — 96.7% — arrived within 5 minutes. Report the whole distribution, not the fastest example.

**Against the pass marks agreed before day 1** (hypothetical): precision at least 70% overall; recall at least 80% by day and 70% by night; 90% of alerts within 5 minutes.

| Criterion | Result | Pass? |
|---|---|---|
| Precision overall ≥ 70% | 75.0% | Pass |
| Day recall ≥ 80% | 87.5% | Pass |
| Night recall ≥ 70% | 56.3% | **Fail** |
| 90% of alerts within 5 minutes | 96.7% | Pass |

The headline numbers look reasonable — 75% and 75% — but the night split shows the system missed 7 of 16 real night events. That is the hour most sites care about. The right decision here is **revise, not buy**: look at the "what caused it" notes and the night footage, change the lighting, camera position or configuration, and rerun the night test against the same pass mark. Lowering the pass mark after seeing the result is not an option.

## Limitations

- **Sample size.** Forty events is a small sample; a few events either way move the percentages a lot. Report counts alongside percentages.
- **Staged events are easier.** People walking through on purpose behave differently from someone trying not to be seen.
- **Seasons change.** Fog, monsoon and winter light are not in a two-week October pilot. Plan a check when they arrive.
- **Other cameras differ.** A pass on three cameras is not a pass on thirty.
- **A failed pilot is useful.** If no supplier passes, buying nothing yet — and fixing coverage or lighting first — is a legitimate result.

## Next step

Tuning between the first and second week is where pilots most often improve or stall. The [on-site learning and tuning calculator](/features/guides/onsite-learning#scenario-C15) estimates the review time a measured before/after reduction in false events would save, using numbers from your own pilot log, and the [false alarm cost calculator](/calculators/false-alarm-cost) shows what the current alert burden costs each month. The [on-site learning guide](/features/guides/onsite-learning) explains what training on your own examples can and cannot do.

If you would like PGAK to scope a pilot on your cameras against criteria you set, [ask for a site-specific assessment](/free-audit). Camera suitability, stream access, processing hardware and network are confirmed first, and pilot terms are agreed in writing.
