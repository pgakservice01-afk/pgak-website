---
title: "Why your CCTV alerts got muted, and how to earn them back"
date: "2026-09-01"
category: "Security Basics"
excerpt: "Every site that muted its alerts did so for a good reason. The four causes of alert fatigue, and the tuning sequence that makes notifications worth reading again."
readTime: 5
faqs:
  - q: "Why do CCTV motion alerts produce so many false alarms?"
    a: "Because motion detection compares pixels between frames rather than identifying objects. Rain, insects near the lens, swaying vegetation, headlights and shadows all change pixels, so all of them trigger alerts. The system is working exactly as designed — the design is simply not suited to the job."
  - q: "How do you reduce false alarms on security cameras?"
    a: "Move from motion detection to object classification so only people or vehicles can trigger an alert, restrict each rule to a drawn zone rather than the whole frame, apply time schedules, and add a minimum dwell time so momentary passes are ignored. Together these typically cut alert volume dramatically without losing real events."
  - q: "What is a reasonable number of security alerts per night?"
    a: "Few enough that a human reads every one. For most single sites that means a handful per night, not dozens. If nobody can read them all, the practical alert count is zero regardless of what the system sends."
---

**Straight answer: you muted the alerts because they were wrong, repeatedly, at 2am. That was the correct response. The fix is not discipline — it is changing what is allowed to raise an alert in the first place.**

Almost every site we visit has notifications switched off. Not because security stopped mattering, but because in week one the system cried wolf enough times that muting became the only sane option.

## The four causes, in order of how much noise they create

**1. Pixel-based motion detection.** Your recorder's built-in motion sensing reacts to change, not to objects. Rain, moths near the IR lamp, a branch, headlights sweeping a wall — all of it is "motion". This alone accounts for most of the noise on a typical estate.

**2. Whole-frame rules.** An alert configured on the entire camera view fires for the public road, the neighbour's yard and passing traffic. Almost nobody needs the whole frame.

**3. No time logic.** A person at the loading bay at 11am is business as usual. The same person at 11pm is the event. A rule with no schedule cannot tell those apart and so reports both.

**4. No dwell threshold.** Someone walking past the gate on the footpath momentarily crosses the zone. Without a minimum dwell, every passer-by is an alert.

## The tuning sequence that works

**Step 1 — Classify before you alert.** Only a person or a vehicle should be able to trigger. This one change removes weather, animals and vegetation from your night entirely.

**Step 2 — Draw the zone tight.** Not the frame — the specific area that matters. The wall line, the bay mouth, the stock room door. Exclude the public road explicitly.

**Step 3 — Add the schedule.** Different rules for working hours and after hours. Most sites need almost nothing during the day and quite a lot at night.

**Step 4 — Set dwell time.** Two or three seconds inside the zone before it counts. Removes the footpath.

**Step 5 — Tune for two weeks against real traffic.** This is the step that decides everything, and it is the one usually skipped. Every alert in the first fortnight either confirms a rule or corrects one.

## The honest target

Not "zero false alarms" — that promise is a warning sign. The target is **few enough that a human reads every one.**

For a typical single site that is a handful of alerts a night. At that volume, people read them, act on them, and the system stays switched on. At thirty a night, nobody reads any, and the sophisticated system performs identically to no system at all.

## Why we include the tuning period in every deployment

Because a system delivered untuned gets muted in week one, and a muted system is a refund conversation waiting to happen. Two weeks of adjustment against your actual traffic is the difference between software that works and software that technically works.

If you already have cameras and muted alerts, that estate is not a lost cause. The rules can be rebuilt on the same hardware.

[Ask for a free feasibility check](#dealer)
