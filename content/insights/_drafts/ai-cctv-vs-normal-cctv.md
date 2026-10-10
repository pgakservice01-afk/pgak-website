---
title: "AI CCTV versus normal CCTV: when analytics earns its cost"
metaTitle: "AI CCTV vs normal CCTV: when analytics earns its cost"
date: "2026-08-28"
updated: "2026-10-08"
category: "Security Basics"
excerpt: "A CCTV system does four jobs: record, detect, verify and respond. Normal CCTV does the first well. Analytics adds automated detection — and only earns its cost when verification and response are already in place."
metaDescription: "Normal CCTV records; AI analytics adds automatic detection. A decision table for recording, detection, verification and response shows when it pays."
readTime: 7
image: "/insights/category/security-basics.webp"
draft: true
reviewStatus: "Awaiting PGAK engineer review. Removed from the live version: 'substantially fewer false alarms' as a general claim, automatic camera-failure flagging 'within minutes' (camera-feed health is unverified), 'most sites we visit' claims and the per-camera-per-month cost shape. Intrusion/zone detection is unverified for PGAK in the capability register and is described as something that can be evaluated at the site."
faqs:
  - q: "What is the difference between AI CCTV and normal CCTV?"
    a: "Normal CCTV records video so people can review it after something happens, and its built-in motion detection reacts to any change in pixels. AI CCTV adds software that classifies what is in the frame, such as a person or a vehicle, so an alert can be raised for a defined event while it is happening. The cameras and recorder are often the same; the difference is the detection layer, and whether someone verifies and responds to what it raises."
  - q: "Does AI CCTV reduce false alarms?"
    a: "It can, because classification can ignore movement that is not a person or vehicle, such as headlights, rain or branches, which pixel-based motion detection reacts to. It does not remove false alarms, and making a system quieter can also make it miss real events. Measure both false and missed alerts on your own cameras, by day and by night, before relying on it."
  - q: "When is normal CCTV enough?"
    a: "When the main need is a record to review after the fact — settling disputes, supporting an insurance claim, checking what happened at a till — and there is nobody available to act on a live alert anyway. In that case good coverage, lighting, enough storage and a working recorder matter more than analytics."
---

**Straight answer: normal CCTV records; AI CCTV adds automatic detection on top of the recording. A security system actually has four jobs — record, detect, verify and respond — and analytics only changes the second. It earns its cost when finding out late is your real problem and someone is ready to verify and act on an alert. If your gap is coverage, lighting or nobody to respond, fix that first.**

The comparison is usually sold badly in both directions. Camera sellers present analytics as a magic upgrade; sceptics dismiss it as motion detection with a new label. Splitting the system into its four jobs makes the decision clearer.

## What are the four jobs of a CCTV system?

1. **Record** — keep usable video for long enough. Cameras, recorder, storage, power.
2. **Detect** — notice that something relevant happened. Normally a person watching, or pixel-based motion detection on the recorder.
3. **Verify** — decide whether the detection is real and matters. A person looking at the clip or the live view.
4. **Respond** — someone does something: calls, walks over, locks up, records the incident.

Normal CCTV is good at job 1. Job 2 is usually done by nobody, because nobody watches the screens and motion alerts get muted after a week of rain and headlights. Analytics is a tool for job 2. Jobs 3 and 4 still need people.

## The decision table

| Job | Normal CCTV | With AI analytics added | Decide by asking |
|---|---|---|---|
| **Record** | Records to DVR/NVR; retention set by storage | Unchanged — analytics usually reads the same streams; recording stays on the recorder | Is footage kept long enough and usable at night? If not, fix this first |
| **Detect** | Motion detection reacts to any pixel change; or a person watching live | Classifies objects (person, vehicle) against rules you set: zone, line, schedule | How often do you discover incidents hours or days later? |
| **Verify** | Someone reviews footage after the fact | Someone reviews the alert clip or live view when the alert arrives | Who will look at an alert, at 2am, within minutes? |
| **Respond** | Whatever happens after someone notices | Unchanged — the alert only starts the response | What will that person actually do, and is it safe? |

Read the table by row. If the "Record" row fails, analytics will not help. If the "Verify" and "Respond" rows have no named person, an alert is just a notification nobody reads. Analytics earns its cost only when the "Detect" row is the weak link and the rows after it are ready.

## Why is pixel-based motion detection usually switched off?

Recorder motion detection compares pixels between frames. A swaying branch, sweeping headlights, rain, a moth near the lens at night — all are pixel change, so all trigger it. Most sites mute it within days.

Object classification works differently: it decides whether what moved is a person or vehicle before raising an alert, so a rule can be "a person in the yard after 8 pm" rather than "anything changed". That can cut the noise. It does not make alerts perfect, and a system tuned to be quiet can also miss real events. The only meaningful number is measured on your own cameras: false alerts and missed events, day and night. The [false alarms guide](/insights/ai-cctv-false-alarms-how-to-reduce) and [1,000 alerts, only one is real](/insights/1000-alerts-only-one-is-real) cover how alert floods happen.

## What does analytics not change?

- **Coverage.** An area nothing points at stays unseen.
- **Light.** A dark smear at night is a dark smear to software too.
- **Physical security.** Analytics does not lock a gate or replace a guard. Do not reduce guarding, lighting or supervision that safety requires on the strength of an alert system.
- **The need for someone to act.** An alert to a phone nobody is holding achieves nothing.

## What can analytics be set to watch for?

Common rules include a person entering a zone during set hours, a line being crossed, a vehicle at a gate, objects counted across a line, or a required item of protective equipment missing. Which of these suits your site depends on camera angle, distance and light, and each **can be evaluated at your site** before you commit.

PGAK has published short recordings of a few of these under stated conditions — a glove check on an existing line camera and sacks counted across one line at a loading bay among them — each listed as a limited pilot in the [capability register](/platform/capabilities) with what it does not prove. Zone and perimeter alerts do not yet have a PGAK evidence record, so treat them as something to test, not a promise. Face matching carries extra privacy obligations; see [is AI CCTV legal in India](/insights/is-ai-cctv-legal-in-india-dpdp-act).

## Who should not buy analytics yet?

- Sites whose cameras do not cover what matters. Coverage first.
- Sites that are dark at night, with no plan to add lighting.
- Anyone expecting a guarantee that nothing will be stolen. Earlier warning is not prevention.
- Anyone with no person and no plan to receive and act on an alert.

Spending on coverage, lighting and a UPS first is often the better decision, whoever you eventually buy analytics from.

## How do you judge whether it earns its cost?

Compare the cost of the analytics project with what late discovery and alert review cost you now. Two measurable inputs matter most: how many alerts or events your team reviews a month, and how many minutes each takes. The [intrusion alerts calculator](/features/intrusion-alerts#scenario-C07) estimates review hours from your own counts, and the [false alarm cost calculator](/calculators/false-alarm-cost) estimates what nuisance alerts cost each month in handling time. For what a quote should contain, see [AI CCTV price in India](/insights/ai-cctv-price-in-india-what-it-should-cost); to check whether your existing cameras can be used, see [adding AI to existing CCTV](/insights/add-ai-to-existing-cctv-cameras).

If you want the four rows of the decision table filled in for your site, [ask for a site-specific assessment](/free-audit).
