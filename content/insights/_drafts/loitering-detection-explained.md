---
title: "Loitering detection: choose a dwell time that fits your site"
metaTitle: "Loitering detection: choosing a dwell time for your site"
date: "2026-09-13"
updated: "2026-10-08"
category: "Security Basics"
excerpt: "Loitering detection is a timer on a tracked person. The whole decision is the dwell time — and it should come from measuring how long employees and visitors normally stay, then testing a staged trespass."
metaDescription: "Loitering detection alerts when someone stays in a zone past a set time. Measure normal dwell for staff and visitors, then test closed-hour trespass."
readTime: 7
image: "/insights/category/security-basics-2.webp"
draft: true
reviewStatus: "Awaiting PGAK engineer review. Loitering detection is UNVERIFIED for PGAK (no evidence record): the article describes how to evaluate it on site and claims no PGAK performance. Removed from the live version: 'We build this into our AI CCTV systems as one of several detection layers'. All dwell-time figures are hypothetical."
faqs:
  - q: "What is loitering detection in CCTV?"
    a: "It measures how long a tracked person or vehicle stays inside a zone drawn on the camera view, and raises an alert once that time passes a threshold you set. Leave before the threshold and nothing fires. It is person or vehicle tracking with a timer attached."
  - q: "How do I choose the dwell time?"
    a: "Measure it. Sample how long employees and legitimate visitors actually stay in the zone during normal hours, set the threshold comfortably above the longest legitimate stay, then stage a test to confirm a person who stays longer is alerted. Outside working hours, a zone where nobody should be at all is usually better served by an intrusion rule than by a dwell timer."
  - q: "Can loitering detection cause false alarms?"
    a: "Yes, wherever staying is normal — a reception bench, a bus stop outside the gate, a smoking corner, a queue. Nearly everyone crosses the threshold there, the alert stops meaning anything, and people learn to ignore it. Use it only in zones where a long stay is genuinely unusual."
  - q: "Should loitering alerts be used to track employees' breaks?"
    a: "No. A dwell alert is a security signal for review by a person, not a productivity measure. Using it to time staff breaks or to trigger penalties invites disputes and privacy problems; configure zones and schedules so routine staff work does not trigger it."
---

**Straight answer: loitering detection tracks a person or vehicle inside a zone and alerts once they have stayed longer than a dwell time you set. The whole decision is that number. Set it from measurement, not guesswork: find out how long employees and genuine visitors normally stay in that zone, set the threshold above the longest legitimate stay, and confirm with a staged test that a longer stay is alerted. In zones where nobody should be at all after hours, an intrusion rule usually fits better than a dwell timer.**

Ordinary motion detection treats a leaf blowing past the lens and a person studying your gate for ten minutes the same way: something moved. Loitering detection adds the one dimension motion is blind to — time.

## What does loitering detection measure?

It follows one person or vehicle across frames inside a zone you have drawn, starts a clock when they enter, and alerts if they are still there when the clock passes your threshold. That needs **tracking** — keeping the same identity on the same person from frame to frame — which pixel-based motion detection does not do. It is also why the feature has a specific weakness: if the track breaks (the person steps behind a pillar, or a truck passes between them and the camera), the clock may restart. Your test should include that case.

## Where it earns its place, and where it is noise

**Earns its place** where the normal stay is brief and a long stay is unusual:

- a back gate or a gap in the boundary wall;
- a parked-vehicle row beside a loading bay, where a delivery should take a known time;
- the area outside a cash office or a high-value store after hours;
- a shuttered shop front at night.

**Adds noise** where staying is normal: reception, a canteen, a smoking corner, a bus stop outside the gate, the queue at a gate during shift change. Almost everyone crosses the threshold, and the reviewer learns to swipe the alerts away — including at the camera where one might have mattered.

So treat it as a per-zone decision. For each camera, ask: *is there a normal reason to stand here for two minutes?* If yes, either skip loitering there or set a schedule that excludes those hours.

## The dwell-time test: employees, visitors and closed-hour trespass

This is a three-part test you can run on any system offering dwell alerts. Run it per zone. Inform the supervisor and guard before any staged part, and never stage it near a public road without telling them.

### Part 1 — How long do employees normally stay? (open hours)

From recordings of normal working days, pick at least 20 occasions when an employee entered the zone and note how long they stayed. Include the slow, legitimate cases — the forklift driver waiting for a truck, the person on a phone call.

### Part 2 — How long do legitimate visitors normally stay? (open hours)

Do the same for drivers, vendors and visitors: at least 20 occasions. Visitors often wait longer than staff because they are waiting *for* someone.

### Part 3 — Does a staged closed-hour stay alert? (armed hours)

With permission, a staff member stands in the zone for set durations, steps out of view and back, and walks through without stopping.

| Staged pass | Duration | Expected | Alerted? | Seconds from entering to alert | Notes |
|---|---|---|---|---|---|
| Walk straight through | under 10 s | No alert | | | |
| Stand still | threshold minus 30 s | No alert | | | |
| Stand still | threshold plus 30 s | Alert | | | |
| Stand, step behind obstruction 10 s, return | threshold plus 30 s in total | Alert | | | Tests track breaks |
| Stand at the far edge of the zone | threshold plus 30 s | Alert | | | Tests zone edge, small subject |
| Same, after dark | threshold plus 30 s | Alert | | | |

### Worked example (illustrative example)

A hypothetical back gate used by staff for tea breaks and by scrap vendors on weekday mornings.

**Employee stays sampled (seconds):** 10, 15, 20, 20, 25, 30, 30, 35, 40, 40, 45, 50, 60, 60, 70, 80, 90, 120, 150, 240.
Longest: 240 s (someone finishing a phone call). Most stays are under 90 s.

**Vendor stays sampled (seconds):** 45, 60, 60, 90, 90, 120, 120, 150, 180, 180, 240, 240, 300, 300, 360, 420, 480, 600, 720, 900 (the last while waiting for the stores clerk).
Longest: 900 s.

What follows from those numbers:

- **Open hours:** vendors legitimately wait up to 15 minutes. A threshold above that (say 1,200 s) would rarely fire, and a lower one would fire on every vendor. Decision: **no loitering rule during vendor hours**; the gate is managed by the stores clerk instead.
- **Open hours, no vendors (afternoons):** longest employee stay was 240 s. A threshold of 300 s (240 + a 60 s margin) sits above every sampled legitimate stay. Expected alerts: only stays longer than any in the sample.
- **Closed hours:** nobody should be at the back gate at all. Decision: **use an intrusion rule** with a few seconds' minimum presence rather than a dwell timer — any person is the event. See [how AI intrusion detection works](/insights/how-does-ai-intruder-detection-work).

Then run Part 3 at 300 − 30 = 270 s (expect no alert) and 300 + 30 = 330 s (expect an alert). In this hypothetical, the "step behind the gate pillar" pass did not alert because the clock restarted — so the zone was redrawn to keep the pillar outside it.

Twenty samples per group is a starting point, not a statistical guarantee. Re-sample when the site's routine changes: a new shift pattern, a new vendor, a canteen moved.

## How to respond to a loitering alert

A dwell alert is a prompt for a person to look, not a verdict. The usual sensible order is: check the snapshot, open the live view, and if it still warrants it, have someone walk over or speak to the person. Avoid automatic sirens on dwell alerts; the likely false-positive cost is a startled vendor or a confronted customer. Write the response into the rule before arming it, as in the response column of the [intrusion rule examples](/insights/how-does-ai-intruder-detection-work).

## Limitations

- **PGAK has no published recording of loitering detection**; it is not on the [evidence page](/resources/evidence). It can be evaluated at your site with the test above, which is also how you should judge any supplier's version.
- **Behaviour is not intent.** People wait for honest reasons. The alert flags a long stay; a person decides what it means.
- **Track breaks** in crowded or obstructed zones can reset timers and hide long stays.
- **Not a staff-monitoring tool.** Timing employees' breaks with dwell alerts is a different purpose, with different fairness and privacy questions; see [CCTV in the workplace](/insights/cctv-workplace-privacy-india).
- **Sometimes nothing new is needed.** If a zone has one obvious problem — a dark corner where people gather — a light and a locked gate may do more than a timer.

## Next step

Estimate the review time dwell alerts will take with the [Loitering detection calculator](/features/loitering-detection#scenario-C08) and the [false-alarm cost calculator](/calculators/false-alarm-cost); the [loitering detection](/features/loitering-detection) page describes how zones and thresholds are set. To have zones chosen and the dwell test run with you on your own cameras, [ask for a site-specific assessment](/free-audit).
