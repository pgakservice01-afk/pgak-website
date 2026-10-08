---
title: "How AI intrusion detection works at a factory boundary"
metaTitle: "How AI intrusion detection works at a factory boundary"
date: "2026-07-30"
updated: "2026-10-08"
category: "Security Basics"
excerpt: "Classification, a drawn line or zone, a schedule and a named person who acts. Five example rules for a factory boundary, and how to test them on your own site before trusting them."
metaDescription: "AI intrusion detection classifies objects, then checks a line or zone, a schedule and who responds. Example factory rules and a site test you can run."
readTime: 8
image: "/insights/category/security-basics.webp"
draft: true
reviewStatus: "Awaiting PGAK engineer review. Perimeter/intrusion is UNVERIFIED for PGAK (no evidence record) — the article describes evaluation only and makes no PGAK performance claim. Removed from the live version: 'typically under three seconds', 'stray dogs are the single biggest source of false alarms', the face-recognition exemption described as a PGAK feature, and 'detection survives your internet going down' stated as a PGAK guarantee. Engineer to confirm the wording on what keeps running locally when the internet link drops."
faqs:
  - q: "How is AI intrusion detection different from motion detection?"
    a: "Motion detection fires when enough pixels change between frames, so rain, insects, headlights and shadows all trigger it. AI intrusion detection first classifies what is in the frame — a person, a vehicle, an animal — and tracks it, and only then checks whether that object crossed a line or entered a zone you drew, during hours you armed."
  - q: "Should the line go on top of the compound wall or on the ground inside it?"
    a: "A zone on the ground just inside the wall is often easier to get right, because a person who has climbed over is seen full-length there. A line along the wall top can catch a person mid-climb but is more easily confused by creepers, birds and the camera angle. Test both on your own wall at night before choosing."
  - q: "How fast does an intrusion alert arrive?"
    a: "It depends on the processing, the rule (a dwell condition adds time by design) and the mobile network delivering the notification. PGAK publishes no measured latency, so time it on your own site: walk across the line with a stopwatch running and note when the phone receives the alert, several times, day and night."
  - q: "Does an intrusion alert tell me who the person is?"
    a: "No. It tells you a person, or whatever class you chose, is somewhere at a time you said should be empty. It does not know intent or identity. Every alert needs a person to look at it and decide what to do, which is why the response is written into each rule below."
---

**Straight answer: AI intrusion detection is object classification followed by a few plain rules. The software finds people or vehicles in each frame and tracks them, then asks three questions — did this class of object cross the line or enter the zone I drew, in the direction I care about, during the hours I armed? Only a yes to all of them raises an alert. What makes it work at a factory is not the model; it is drawing the right line, arming it at the right hours, and deciding beforehand who walks out when it fires.**

People ask about this in two tones. Some want reassurance that it isn't magic; others hope that it is. It is neither, and the useful parts are things you control.

## What does motion detection do, and why is it noisy?

Conventional motion detection compares one frame with the next and counts how many pixels changed. Past a threshold, it fires. It has no idea *what* changed.

That is why a recorder's motion alerts react to rain, swaying branches, shadows moving across a wall, headlights sweeping the compound and insects near the infrared lamp at night. All of these change pixels. From the recorder's point of view they look the same as a person climbing your wall.

## What does AI intrusion detection add?

It reverses the order. Instead of asking "did something change?", it asks "what is in this frame?"

1. **Detect and classify.** A detection model runs over the video and returns objects with a class and a position: *person here, vehicle there.*
2. **Track.** The same object is followed from frame to frame, so the system knows the person near the scrap yard now is the one who came over the north wall ten seconds ago. Tracking is what makes direction and dwell possible.
3. **Apply the rule.** Only now does the alert logic run: class, line or zone, direction, schedule and, optionally, a minimum time in the zone.

Everything that fails a rule is still recorded. It simply does not wake anyone.

## The five settings in every intrusion rule

| Setting | The question it answers | Typical mistake |
|---|---|---|
| **Class** | Which objects count — person, vehicle, both? | Leaving "all objects" on, so animals and birds count |
| **Line or zone** | Where must the object be? A line is crossed; a zone is entered or occupied | Drawing the zone over the whole frame, including the public road |
| **Direction** | Inward only, outward only, or both (lines only) | Alerting on staff leaving as well as people arriving |
| **Schedule** | Which hours is the rule armed? | One schedule for every camera, ignoring night shifts and Sundays |
| **Minimum time** | How long must the object be there before it counts? | Setting it so long that a fast climber is gone before it fires |

Then a sixth setting that is not in the software at all: **who receives the alert, and what do they do?** A rule without that answer produces notifications, not security.

## Example configuration for a factory boundary

*Illustrative example.* A hypothetical single-shift factory: work 08:00–20:00 Monday to Saturday, closed Sunday, one guard at the main gate at night, a security supervisor on call. Five camera views, five decisions.

| # | Camera view | Rule | Class and direction | Armed | Minimum time | Who acts, and how |
|---|---|---|---|---|---|---|
| 1 | Rear compound wall, camera looking *along* the wall | Zone: a strip of ground 2–3 m deep just inside the wall | Person | 20:30–07:30 daily; all day Sunday | 2 s | Alert to night guard and supervisor. Guard checks the live view first, then walks the rear road with a torch and phone; supervisor calls the guard within 5 minutes. If the guard does not acknowledge, supervisor calls the next contact. |
| 2 | Scrap and raw-material yard | Zone: the yard area, excluding the internal road | Person and vehicle | 20:30–07:30; all day Sunday | 5 s | Same as rule 1. A vehicle here at night is never routine, so vehicle is included. |
| 3 | Dispatch bay mouth | Line across the bay opening | Vehicle, inward and outward | Outside dispatch hours: 21:00–07:00 | None | Alert to supervisor only. Planned late dispatches are entered in the gate register so the supervisor can check against it. |
| 4 | Roof access ladder | Zone at the foot of the ladder | Person | 24 hours, except a maintenance window booked in advance | 3 s | Alert to supervisor and maintenance in-charge. Outside a booked window, the guard verifies from the live view before anyone climbs. |
| 5 | Main gate | No intrusion rule. Gate is staffed; recording only | — | — | — | The guard is the control here. An alert would duplicate what he already sees. |

Three things the example deliberately does:

- **It arms by schedule, not by habit.** Sunday is fully armed; the half hour after shift end is left for people leaving.
- **It uses zones on the ground for the wall.** A person who has climbed over is seen full-length on the ground inside, which is easier to classify than a figure half-hidden on a wall top among creepers.
- **It writes the human response into the rule.** Every armed rule has a first receiver, a verification step and a fallback contact. Each alert also costs someone's minutes, so every armed rule should be worth them.

If you run night shifts, the schedule column changes completely: zones where people work at night stay disarmed, and the rule moves to areas nobody should enter at any hour.

## How to test the rules on your own boundary

PGAK has not published a recording of perimeter intrusion detection; it is not among the recordings on the [evidence page](/resources/evidence). Treat it as something to evaluate at your site, with your cameras and your lighting — which is the right approach with any supplier. The [evaluation method](/resources/evaluation-method) sets out the general approach; for a boundary, this is the short version.

**Staged walk test.** With the guard and supervisor informed in advance, a staff member walks each armed zone or line:

| Pass | Condition | Repeat | Record |
|---|---|---|---|
| Upright walk across the zone | Daylight | 5 times | Alert yes/no; seconds from crossing to phone |
| Upright walk | After dark, site lights as normal | 5 times | Same |
| Crouched, close to the wall | After dark | 5 times | Same |
| Walk along the far edge of the zone | After dark | 5 times | Same — this is where zones usually leak |
| Walk outside the zone, on the public side | After dark | 5 times | Should produce **no** alert |

**Night log.** For two weeks, keep every alert with its cause: real person, staff, animal, vehicle lights, rain, unknown. Missed crossings and false alerts are counted separately — reducing one often increases the other. The companion article on [reducing false alarms without hiding real incidents](/insights/ai-cctv-false-alarms-how-to-reduce) has the template.

**Latency.** Time the walk test with a stopwatch. A figure measured on your own phone network is the only one worth planning around.

## Where the processing happens

With PGAK, detection runs on an on-site processing unit that reads your cameras' streams. Whether your existing cameras are suitable, whether their streams can be accessed, and what processing hardware and network the site needs are confirmed at the assessment; anything extra is itemised in the quote. Two practical consequences follow. Video is analysed on your premises rather than sent away for analysis. And notifications need a working network path to the phone, so plan for the internet link failing — see [does AI CCTV work without internet](/insights/does-ai-cctv-work-without-internet).

## What intrusion detection does not do

- **It does not know intent.** A person in an armed zone at 2 a.m. is a strong signal, not a verdict. Somebody looks before anyone acts.
- **It does not identify strangers.** Some systems can exempt enrolled staff using face recognition. That is a separate capability with its own accuracy limits and privacy obligations, and should be evaluated separately rather than assumed; see [CCTV in the workplace](/insights/cctv-workplace-privacy-india).
- **It cannot see what the camera cannot.** A wall camera mounted high in a corner, looking straight down the length of the wall in poor light, will miss people whatever the software. Placement comes first — see [where to place cameras so AI detection works](/insights/where-to-place-cctv-cameras-for-ai-detection) and the [blind-spot site-plan exercise](/insights/cctv-blind-spots-where-thieves-look).
- **It does not replace the response.** An alert buys minutes. Whether those minutes are useful depends on rule 1's last column.

When does it not fit at all? If nobody can act on an alert at night — no guard, no reachable contact — start with lighting, physical security and a response arrangement. Detection without a responder only produces a better record of what happened.

## Next step

Estimate the review time your current alerts cost, and what a tuned rule set would change, with the [Intrusion and line crossing calculator](/features/intrusion-alerts#scenario-C07) and the [false-alarm cost calculator](/calculators/false-alarm-cost). The [intrusion alerts](/features/intrusion-alerts) page covers rule types and delivery.

If you would like your own boundary walked with you — which cameras can carry a rule, where the lines should go, and what would need adding — [ask for a site-specific assessment](/free-audit).
