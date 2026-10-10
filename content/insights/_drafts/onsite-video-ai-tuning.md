---
title: "On-site model tuning: what to measure before and after"
metaTitle: "Video analytics model tuning: measure before and after"
date: "2026-10-08"
category: "Camera Setup"
excerpt: "After tuning, the alerts got quieter. Did the system get better, or did it just stop reporting things? A held-out set of your own clips, a change log and a rollback plan are how you tell the difference."
metaDescription: "Judge video analytics tuning on clips never used for training: misses and false alerts before and after, a change log, and a tested rollback."
readTime: 7
draft: true
reviewStatus: "Awaiting PGAK engineer review. No PGAK evidence record exists for on-site learning or tuning; written as a buyer evaluation guide only. All before/after figures are hypothetical. Engineer to confirm that PGAK can keep and restore a previous model version and configuration per camera, before any sales copy links here."
faqs:
  - q: "What is a held-out set, and why does it matter?"
    a: "It is a collection of your own labelled clips that is set aside and never used to train or adjust the model. Because the model has never seen them, they give a fair before-and-after comparison. Testing on the same clips used for training makes almost any change look like an improvement."
  - q: "Is fewer false alarms after tuning enough to call it an improvement?"
    a: "No. Count missed events on the same held-out clips. A change that halves false alerts but doubles misses may be a bad trade, especially for safety or intrusion events. Look at the result by condition, too — a change can help in daylight and hurt at night."
  - q: "How do I undo a tuning change that made things worse?"
    a: "Only if the previous model version and settings were saved and labelled before the change, and someone knows how to restore them. Agree the rollback triggers in advance, restore, then re-run the held-out set to confirm you are back to the earlier result."
---

**Straight answer: tuning a video analytics model on your site — retraining it on your footage, teaching it a new object, or changing its thresholds — should be judged on a held-out set of your own clips that was never used for the tuning, measured the same way before and after. Count both false alerts and missed events, split by condition such as day and night. Log every change with a way to go back, because “quieter” is only better if the system is still reporting the things you need.**

Most tuning is judged by feel: the phones buzz less, so it must be working. That feeling is exactly what a model that has stopped detecting things would also produce.

## What can “tuning” mean?

Four different changes go by the same name, with different risks:

| Change | Example | Risk |
|---|---|---|
| Rule settings | Tighter zone, schedule, dwell time | Low — and usually the first thing to try |
| Confidence threshold | Alert only above a higher model confidence | Fewer false alerts and, often, more misses |
| Retraining on site footage | Adding examples of your own scenes to an existing model | Can improve your scenes and quietly worsen others |
| New custom object | Teaching it your specific trolley or bin | Depends entirely on examples and look-alikes |

Rule settings are covered in the [alert tuning article](/insights/ai-cctv-false-alarms-how-to-reduce) and are the cheaper place to start. This article is about the other three, where the model itself changes. The [on-site learning guide](/features/guides/onsite-learning) explains what a custom object needs.

## Before you start: the prerequisites

- **Permission and access rules for the footage.** Training clips are recordings of people. Keep them under the same access and retention rules as other footage, and delete them when they are no longer needed.
- **One person who labels.** Ground truth — what really happened in each clip — needs a consistent judge, ideally someone who knows the site.
- **Version identifiers.** You need to be able to say which model version and settings were running on which camera on which date.

## Part 1: build the held-out evaluation set

1. **Collect clips across real conditions:** day, night, rain or fog, shift change, an empty site, a busy dispatch hour. Include look-alikes — the things that should not trigger (a hand trolley that resembles the custom trolley, a reflective jacket on a mannequin).
2. **Label every clip before any tuning.** Write down each real event: camera, time, what happened.
3. **Split before training.** Set aside a share of clips — say one in four — as the held-out set. They are never shown to the training process and never used to pick a threshold.
4. **Record the set** so the same clips can be run again later:

| Clip ID | Camera | Date and time | Condition | Real events in clip | Look-alikes present | Held out? |
|---|---|---|---|---|---|---|
| H-01 | Bay-2 | 14 Sep, 02:10 | Night, IR | 1 person enters zone | Stray dog | Yes |
| | | | | | | |

## Part 2: measure before and after on the same clips

Run the current model on the held-out set and record the result. Make the change. Run the new version on exactly the same clips.

| Measure | Before | After |
|---|---|---|
| Real events in held-out set | | |
| Detected (real event, alert raised) | | |
| Missed (real event, no alert) | | |
| False alerts (alert, no real event) | | |

Then split the same table by condition — day, night, weather — because averages hide where a change hurts.

**Illustrative example** (hypothetical figures): 40 held-out clips containing 50 real events.

| Measure | Before | After |
|---|---|---|
| Detected | 44 | 41 |
| Missed | 6 | 9 |
| False alerts | 30 | 12 |

False alerts fell from 30 to 12 — a reduction of 18 ÷ 30 = 60%. Misses rose from 6 to 9. Split by condition:

| Condition | Real events | Missed before | Missed after |
|---|---|---|---|
| Day | 35 | 4 | 4 |
| Night | 15 | 2 | 5 |

The change made no difference to daytime misses and made night noticeably worse. A sensible decision might be: keep the new version on daytime-only cameras, keep the old version at night, and collect more night examples. Whatever you decide, decide it with this table on the desk.

Forty clips is a small sample. A held-out result tells you whether a change is worth a live trial, not what the live alert count will be; confirm it against real alert numbers over the following weeks.

## Part 3: keep a change log

| Change ID | Date | By | What changed (model version, threshold old → new, zones) | Cameras | Reason | Held-out result before → after | Approved by | Rollback point |
|---|---|---|---|---|---|---|---|---|
| T-003 | | | | | | | | |

One line per change. The rollback point names the saved version you would return to.

## Part 4: rollback checklist

- [ ] The previous model version and its settings are saved, labelled and restorable for each affected camera.
- [ ] Someone named knows how to restore them and how long it takes.
- [ ] Rollback triggers are agreed before the change goes live — for example, any increase in misses on the held-out set for a safety-related event, or live alerts above the daily budget for a week.
- [ ] After a rollback, the held-out set is re-run to confirm the earlier result is back.
- [ ] Alert recipients are told what changed and when, so they know which behaviour to expect.

## When should the held-out set be re-run?

After any model update, firmware update, camera move or lens change; when the seasons change (Punjab's winter fog and the monsoon change scenes sharply — the [monsoon failures article](/insights/cctv-monsoon-failures) covers the physical side); and periodically even when nothing seems to have changed. Add new clips over time, but keep the original set too, so results stay comparable.

## Does tuning pay for itself?

Use the measured reduction from your own held-out test, not a brochure figure.

**Illustrative example** (hypothetical numbers): 600 false alerts a month before tuning; the held-out test showed a 0.6 reduction; each false alert takes about 1 minute to review; tuning and re-testing takes 4 hours a month.

hours = false events × measured reduction × review minutes ÷ 60 − tuning hours = 600 × 0.6 × 1 ÷ 60 − 4 = 6 − 4 = 2 hours a month

Two hours a month is modest. If missed events rose, the true value may be negative. The [false alarm cost calculator](/calculators/false-alarm-cost) helps if alert noise is the main cost today.

## When tuning is the wrong approach

- **The camera is the problem.** Too few pixels on the subject, glare, or an angle that hides the event will not be trained away. Move or replace the camera first.
- **Rule settings have not been tried.** Zones, schedules and dwell times are cheaper and easier to reverse.
- **There is no one to own the log.** Tuning without records turns into a system nobody can explain a year later.

## Next step

Enter your own held-out figures into the [on-site learning and tuning calculator](/features/guides/onsite-learning#scenario-C15). For a general pilot worksheet, see the [evaluation method](/resources/evaluation-method).

On-site learning and tuning are industry capabilities that PGAK can evaluate at your site; what can be retrained or added — as PGAK software, a licensed module or an integration — is confirmed per site, and PGAK's detection runs on an on-site processing unit whose capacity is part of that assessment. To build a held-out set from your own cameras before any change is made, [ask for a site-specific assessment](/free-audit).
