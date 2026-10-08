---
title: "Person versus vehicle detection: choose relevant alerts"
metaTitle: "Human and vehicle detection CCTV: set useful alerts"
date: "2026-10-08"
category: "Security Basics"
excerpt: "Human and vehicle classification only helps if each class gets its own rule — and if you have checked how well each class is recognised on your cameras, by day and by night. A confusion-matrix template and example rules."
metaDescription: "Human and vehicle detection cuts CCTV noise only with class-specific rules. Test each class by day and night with a confusion matrix, then set alerts."
readTime: 6
draft: true
reviewStatus: "Awaiting PGAK engineer review. Object classification is industry capability, confirmed per site; no PGAK accuracy figure exists or is claimed, and all matrix numbers are hypothetical. Perimeter/intrusion is UNVERIFIED for PGAK. Sibling drafts (virtual-tripwire-vs-motion-detection, ai-cctv-alert-response-sop) are not linked because they are not live yet; add links on promotion."
faqs:
  - q: "What is human and vehicle detection on CCTV?"
    a: "It is a classification step that labels what is in the frame — usually a person or a vehicle, sometimes finer classes such as two-wheeler or truck — so that alert rules can respond to the class you care about instead of to any pixel movement. It reduces noise from rain, shadows, headlights and animals; it does not remove errors."
  - q: "Is human detection reliable at night?"
    a: "It depends on the camera, its lighting and how large a person appears in the frame. Under infrared, people far from the camera are small, grey and low in contrast, so they are detected less reliably than in daylight. The only way to know for your site is to test each class separately by day and by night and compare the results."
  - q: "How should a two-wheeler with a rider be treated?"
    a: "Decide before you write rules. A rider is a person on a vehicle, and systems may label it as a person, a vehicle or both. If your after-hours rule is 'person only', check in testing that riders still trigger it; otherwise someone can ride through a zone that would alert on them walking."
---

**Straight answer: person and vehicle detection is useful only when each class has its own rule — a person in the yard at night, a vehicle at the gate after hours, a truck left in the fire lane — and when you have checked how reliably each class is recognised on your own cameras, separately by day and by night. Classification removes most noise from weather, shadows and animals, but it also makes mistakes of its own. A simple confusion matrix, filled from a week of observations and a few staged passes, shows which rules you can trust.**

Many recent recorders offer "human/vehicle" filters on their motion or line-crossing events, and AI video analytics adds the same idea with more classes. The filter is the easy part. Choosing what each class should trigger, and checking that the class labels hold up under your lights, is where sites go wrong.

## What decides whether classification works on a camera

| Variable | Why it matters | What to check |
|---|---|---|
| **Size in frame** | A person 40 m away may be a few pixels wide. Models need enough pixels to tell a person from a post. | The [resolution-versus-distance guide](/insights/camera-resolution-vs-distance) shows how to work out pixels per metre at the far edge of the zone |
| **Angle** | Looking straight down from a high pole shows heads and shoulders, which models handle less well than a side or three-quarter view | Mount height and tilt at the zone |
| **Light** | Infrared turns scenes grey; headlights flare; shadows move | Test after dark under the site's real lights |
| **Occlusion** | A person behind a parked truck, or a rider partly hidden by the vehicle | Where people actually walk |
| **Classes the model knows** | Some models have only "person" and "vehicle"; others separate two-wheelers, trucks or bicycles. Tractors, e-rickshaws, handcarts and cattle are common on Indian sites and may not map neatly | Ask for the supported class list and test the vehicles your site actually sees |

## The day/night confusion-matrix template

A confusion matrix is just a table of *what was really there* against *what the system said*. Fill one for daytime and one for night, per camera or per zone. Inform the guard before any staged passes.

**How to fill it:** for a week, the reviewer records each relevant event on the camera from the recording — real passers-by, vehicles, animals, and things that caused movement (rain, headlights, shadows). Add staged passes to make sure each class has at least 20 examples: a person walking, a car, a two-wheeler with rider. Then mark what the system reported for each.

| What was really there ↓ / System reported → | Person | Vehicle | Both | Nothing | Total |
|---|---|---|---|---|---|
| Person on foot | | | | | |
| Car, van or truck | | | | | |
| Two-wheeler with rider | | | | | |
| Animal | | | | | |
| Nothing relevant (rain, lights, shadow) | | | | | |

### Filled example — night (illustrative example)

A hypothetical yard camera, one week of nights, including staged passes.

| What was really there ↓ / System reported → | Person | Vehicle | Both | Nothing | Total |
|---|---|---|---|---|---|
| Person on foot | 32 | 0 | 0 | 8 | 40 |
| Car, van or truck | 0 | 28 | 0 | 2 | 30 |
| Two-wheeler with rider | 6 | 4 | 8 | 2 | 20 |
| Animal | 3 | 0 | 0 | 22 | 25 |
| Nothing relevant | 1 | 2 | 0 | 12 | 15 |

The arithmetic that matters:

- **People on foot found at night:** 32 ÷ 40 = **80%**. Eight walkers produced no person label — the miss list to investigate.
- **Vehicles found at night:** 28 ÷ 30 = **93%**.
- **Riders who would trigger a person-only rule:** person (6) + both (8) = 14 of 20 = **70%**. Six riders were labelled "vehicle" only and two not at all.
- **Person labels that were not a person:** animals (3) + nothing relevant (1) = 4. Total person labels = 32 + 6 + 8 + 3 + 1 = 50, so 4 ÷ 50 = **8%** of person labels were wrong.

The same camera by day, in this hypothetical, found 38 of 40 walkers (95%) and labelled one animal as a person. The difference between 95% and 80% is the reason to test day and night separately.

**What to do with it.** Look at where the eight missed walkers were. If they were all at the far end of the zone, the camera is too far from that end at night: add light, pull the zone in, or add a camera. If they were crouched near the wall, the rule needs a different view. Twenty to forty examples per class is enough to find a problem like this; it is not enough to quote an accuracy figure, and no one should.

## Class-specific alert rules

Once you know what each class does on each camera, write separate rules. An example set for a hypothetical factory (illustrative example):

| Situation | Class | Rule type | Hours | Who is told | Why |
|---|---|---|---|---|---|
| Anyone in the yard or boundary zone after hours | Person (check riders trigger it) | Zone | Closed hours | Night guard, supervisor | The core security event |
| Vehicle entering the main gate after hours | Vehicle | Line, inward only | Closed hours | Supervisor | Unplanned arrivals; planned ones are in the gate register |
| Vehicle left in the fire lane or in front of a dock | Vehicle | Dwell, 10 minutes | All hours | Admin or dispatch, not security | An operational problem, not an intrusion |
| Two-wheelers in staff parking | — | Record only | Working hours | Nobody | Routine |
| Person at the scrap yard during working hours | — | Record only | Working hours | Nobody | Scrap handling is normal by day |
| Animals anywhere | — | No alert | — | — | But keep checking that excluding animals has not hidden crouching people |

Two rules of thumb follow from the matrix. **Do not make a rule depend on a class the camera recognises poorly at that hour** — fix the camera first. And **send operational events to operational people**: a truck blocking a fire lane matters, but waking the security supervisor for it trains him to ignore the next alert.

For number plates, which is a different capability with different camera requirements, see [when number plate recognition works](/insights/anpr-number-plate-recognition-when-it-works).

## Limitations

- **Classification reduces noise; it does not remove errors.** Expect misses and wrong labels, and keep logging both — the method is in [reducing false alarms without hiding real incidents](/insights/ai-cctv-false-alarms-how-to-reduce).
- **People inside vehicles** are usually not detected as people. A vehicle rule covers them.
- **Retest after changes**: new lights, a moved camera, monsoon conditions, a new kind of vehicle on site.
- **No PGAK figure.** PGAK has not published a classification accuracy measurement; classification can be evaluated at your site with this template, which is the fair test for any supplier.
- **When nothing new is needed:** if your recorder's built-in human/vehicle filter passes this test on the cameras that matter, use it. Better rules on existing equipment may be enough.

## Next step

Estimate how much review time class filtering would save — and the spot-checking it adds — with the [Object classification calculator](/features/guides/object-classification#scenario-C06) and the [false-alarm cost calculator](/calculators/false-alarm-cost). The [human and vehicle classification guide](/features/guides/object-classification) covers the capability, and [how AI intrusion detection works](/insights/how-does-ai-intruder-detection-work) shows how class fits with lines, zones and schedules. To have the matrix filled on your own cameras and rules drafted from it, [ask for a site-specific assessment](/free-audit).
