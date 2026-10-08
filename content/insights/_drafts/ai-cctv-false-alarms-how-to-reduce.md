---
title: "Reduce AI CCTV false alarms without hiding real incidents"
metaTitle: "Reduce CCTV false alarms without hiding real incidents"
date: "2026-09-01"
updated: "2026-10-08"
category: "Security Basics"
excerpt: "Every change that cuts false alarms can also hide a real event. A labelled alert log, kept as two separate lists, shows which changes are safe — with a worked example."
metaDescription: "Cut CCTV false alarms by tuning class, zone, schedule and dwell — and log false alerts and missed events separately so tuning never hides a real incident."
readTime: 7
image: "/insights/category/security-basics-2.webp"
draft: true
reviewStatus: "Awaiting PGAK engineer review. No PGAK false-alarm reduction figure exists or is claimed; the worked example is hypothetical. Removed from the live version: 'we include the tuning period in every deployment' (not verified), 'typically cut alert volume dramatically' (unsupported), and the old '#dealer' CTA."
faqs:
  - q: "Why do CCTV motion alerts produce so many false alarms?"
    a: "Because motion detection compares pixels between frames rather than identifying objects. Rain, insects near the infrared lamp, swaying vegetation, headlights and shadows all change pixels, so all of them trigger alerts. The recorder is working as designed; the design does not suit the job."
  - q: "Can reducing false alarms make the system miss real events?"
    a: "Yes. A tighter zone, a longer dwell time, a higher confidence setting or a larger minimum object size each remove false alerts, and each can also stop a real person from being alerted. That is why false alerts and missed events must be logged separately, and every tuning change re-tested with staged walk-throughs."
  - q: "What is a reasonable number of security alerts per night?"
    a: "There is no universal number. The test is whether the person receiving them reads and checks every one. If alerts are being swiped away unread, the practical alert count is zero, whatever the system sends."
---

**Straight answer: you reduce false alarms by changing what is allowed to raise an alert — object class instead of pixel motion, a tight zone instead of the whole frame, a schedule, and a short minimum dwell. But every one of those changes can also hide a real incident. The safe way to tune is to keep two separate logs: alerts that turned out to be false, and real or staged events that should have alerted. A change is only good if the first list shrinks and the second does not.**

Almost every site with cameras has notifications switched off. Usually that was the right decision at the time: the system cried wolf at 2 a.m. often enough that muting it was the only sane option. The fix is not more discipline from the person holding the phone. It is better rules — tested in a way that cannot quietly trade a real intrusion for a quieter night.

## The usual causes of false alarms, and the risk in each fix

| Cause | Typical fix | What the fix can hide |
|---|---|---|
| Pixel motion: rain, insects, headlights, shadows | Alert only on classified objects (person, vehicle) | A person the model misclassifies at night — crouching, partly hidden, or very small in frame |
| Whole-frame rules catching the road or the neighbour's yard | Draw a tight zone; exclude the public side | A person approaching along the edge you cut away |
| No schedule | Arm only the hours that should be empty | Anything during hours you left unarmed — shift change, Sunday, festival days |
| Passers-by briefly entering the zone | Add a minimum dwell of a few seconds | A fast climber who crosses quickly |
| Low-confidence detections | Raise the confidence threshold | Real people seen poorly: in rain, at the edge of IR range |
| Animals on the boundary | Exclude the animal class, or set a minimum object size | A person crawling or bent low, if the model confuses them |
| Duplicate alerts from one event | Cool-down period per rule | A second person arriving inside the cool-down |

None of this argues against tuning. It argues for measuring the right-hand column as carefully as the left.

## The tuning sequence

1. **Classify before you alert.** Only a person or a vehicle should be able to trigger. This removes most weather and vegetation noise on its own.
2. **Draw the zone tight.** The wall line, the bay mouth, the stock room door — not the whole frame. Exclude the public road explicitly.
3. **Add the schedule.** Separate rules for working hours and after hours; most sites need little during the day.
4. **Set a short dwell.** A few seconds inside the zone before it counts removes the footpath without letting a climber through.
5. **Tune against your own site for two weeks**, using the two logs below. Change one setting at a time, so you know which change did what.

## The labelled alert-sample template

This is the heart of the method. Two lists, kept for the same period, by the person who reviews alerts.

### Log A — every alert raised (false positives live here)

| Date | Time | Camera / rule | Snapshot checked? | Label | Cause if false | Action taken |
|---|---|---|---|---|---|---|
| 03-10 | 23:14 | Rear wall / zone 1 | Yes | False | Dog | None |
| 03-10 | 01:52 | Rear wall / zone 1 | Yes | False | Headlights from road | None |
| 04-10 | 02:40 | Yard / zone 2 | Yes | True — staff | Night fitter collecting tools | Logged |
| 04-10 | 03:05 | Yard / zone 2 | Yes | True — unknown | — | Guard sent; person left |

Labels: **true – unknown person/vehicle**, **true – known (staff, vendor)**, **false** (with cause), **can't tell**. Keep "can't tell" honest; a large number of them points to a camera or lighting problem, not a rule problem.

### Log B — every event that *should* have alerted (missed events live here)

| Date | Time | Camera / rule | Event | Source | Alerted? | Seconds to alert | If missed, why? |
|---|---|---|---|---|---|---|---|
| 05-10 | 22:30 | Rear wall / zone 1 | Staged walk, upright | Planned test | Yes | — | — |
| 05-10 | 22:35 | Rear wall / zone 1 | Staged walk, crouched | Planned test | No | — | Too small in frame at far end |
| 06-10 | 04:10 | Yard / zone 2 | Unknown person, found on recording next morning | Review | No | — | Rule disarmed at 04:00 by schedule error |

Log B fills from two sources: **staged walk tests** (planned, with the guard informed) and **anything found later on recordings** — a missing item, a footprint, a report from staff. Without Log B, every tuning change looks like a success, because hidden misses never appear in Log A.

### Worked example (illustrative example)

A hypothetical rear-yard camera, before and after one change: minimum dwell raised from 2 to 8 seconds.

| | Week 1 (dwell 2 s) | Week 2 (dwell 8 s) |
|---|---|---|
| Alerts raised (Log A) | 60 | 20 |
| Of which false | 48 | 12 |
| False share | 48 ÷ 60 = 80% | 12 ÷ 20 = 60% |
| Staged crossings (Log B) | 10 | 10 |
| Staged crossings alerted | 9 | 6 |
| Missed share | 1 ÷ 10 = 10% | 4 ÷ 10 = 40% |

False alerts fell from 48 to 12 — a quieter week. But the missed share rose from 10% to 40%: the three extra misses were all quick, upright crossings near the wall, exactly what the rule exists for. The right decision is to **reverse the change**, and attack the 48 false alerts by cause instead — in this hypothetical, most were dogs and headlights, which point to class filtering and zone shape, not dwell.

Ten staged crossings is a small sample; it is enough to spot a change that breaks the rule, not to state an accuracy figure. Repeat the staged set after every change, and at night as well as day.

## What a sensible target looks like

Not "zero false alarms" — a promise of that is a warning sign. The target is **few enough that the receiver reads and checks every one**, with Log B showing that staged crossings still alert. The number depends on how many people share the review and how fast they must act; the [false-alarm cost calculator](/calculators/false-alarm-cost) turns your Log A counts into reviewer time.

## Limitations, and when tuning is the wrong fix

- **Some noise is a camera problem.** A camera with spider webs across the IR lamp, or one pointed into headlights, needs cleaning or repositioning, not a stricter rule. See [where to place cameras so AI detection works](/insights/where-to-place-cctv-cameras-for-ai-detection).
- **Some "false" alerts are true.** A staff member in the yard at 2 a.m. is a real person. Whether he should be exempt is a site policy decision, not a tuning one.
- **If nobody will act on an alert**, reducing false alarms does not create security. Decide the response first; [how AI intrusion detection works](/insights/how-does-ai-intruder-detection-work) has example rules with the response written in.
- **No figure from us.** PGAK has not published a measured false-alarm reduction for any site. Your two logs are the only numbers worth trusting, from any supplier.

If your alerts are already muted, the estate is not a lost cause: rules can often be rebuilt on the same cameras, subject to checking that each camera's view, stream and lighting can support them.

## Next step

Put your Log A totals into the [False-alarm filtering calculator](/features/false-alarm-filtering#scenario-C26) to see the review time involved, and read the [false-alarm filtering](/features/false-alarm-filtering) page for how filtering layers fit together. If you would rather have the logs set up and read with you on your own cameras, [ask for a site-specific assessment](/free-audit).
