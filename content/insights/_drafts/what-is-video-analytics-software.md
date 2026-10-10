---
title: "What is video analytics software, and what does PGAK actually supply?"
metaTitle: "What is CCTV video analytics software?"
date: "2026-09-01"
updated: "2026-10-08"
category: "Security Basics"
excerpt: "Video analytics software reads camera streams and raises events for defined situations. Where it runs, what it is supplied as, and which capabilities have evidence behind them matter more than the feature list."
metaDescription: "Video analytics software reads CCTV streams and raises events for defined situations. How it fits together, and what PGAK supplies and has evidenced."
readTime: 7
image: "/insights/category/security-basics.webp"
draft: true
reviewStatus: "Awaiting PGAK engineer review. UNRESOLVED: the owner/engineer must confirm, per capability, whether it is supplied as PGAK software, a licensed module, supplied hardware or an integration — the matrix currently says 'confirmed in the written scope' for every row because no per-capability supply mode is on record. Removed from the live version: camera-health detection described as available (unverified in the register) and 'works on any camera'-style generalisations."
faqs:
  - q: "What is video analytics software?"
    a: "It is software that reads the video stream from a camera or recorder, classifies what is in the frame, and raises an event when a defined situation occurs — for example a person in a zone during set hours, or objects crossing a line. It runs on hardware somewhere: on the camera, on a processing unit at the site, or on a remote server."
  - q: "Is video analytics the same as motion detection?"
    a: "No. Motion detection reacts to any change in pixels between frames, so rain, headlights or a moving branch trigger it. Video analytics classifies what moved — a person, a vehicle — before applying a rule. That can reduce noise, but it is not perfect; false and missed alerts should be measured on your own cameras."
  - q: "What does PGAK supply?"
    a: "PGAK adds analytics to compatible cameras a site already owns. Detection runs on an on-site processing unit. Camera suitability, stream access, processing hardware and network are confirmed at the assessment, and anything extra is itemised in the quote. Which capabilities are included, and on what terms, is set out per site in the written scope; PGAK's capability register shows which have a recorded demonstration and which do not yet."
---

**Straight answer: video analytics software reads the video stream from your cameras, works out what is in the frame, and raises an event when something you defined happens — a person in a closed area, objects crossing a line, a missing item of protective equipment. It does not replace the recorder or the person who responds. With PGAK, detection runs on a processing unit at your site, and what is supplied for each capability is confirmed in a written scope after the cameras are checked.**

Most CCTV in India records on a loop and is only reviewed after something has gone wrong. Analytics is the layer that can notice an event while it is happening. Whether that is worth buying depends less on the feature list than on three questions: where the software runs, what exactly is supplied, and what evidence sits behind each capability.

## How does a video analytics system fit together?

```
 Cameras ──► DVR / NVR ──────────────► Recording (unchanged)
                │
                │ authorised stream (RTSP / ONVIF)
                ▼
     On-site processing unit
     (detection runs here)
                │
                │ events + short clips   ◄── needs network for delivery
                ▼
     Alert channel / dashboard ──► Person verifies ──► Person responds
                │
                └──► Optional: integration with an existing VMS or other system
```

Reading the diagram from the top:

1. **Cameras and recorder** keep doing what they did. Recording stays on the recorder.
2. **An authorised stream** is read from the recorder or camera. Whether that works is a property of the model, firmware and settings, not the brand.
3. **The processing unit** runs the detection. Its capacity limits how many streams, at what settings, it can analyse together.
4. **Events** leave the unit for the alert channel. Delivery needs a network path; detection itself, when it runs on site, does not depend on the internet. See [does AI CCTV work without internet](/insights/does-ai-cctv-work-without-internet).
5. **A person** verifies and responds. No software does that part.

The alternative designs move step 3: onto the camera (on-camera analytics, limited to what that camera's maker supports) or to a remote server (cloud analytics, which needs continuous upload of video). The [edge AI guide](/features/guides/edge-ai) sets out the trade-offs.

## What does the term "video analytics" actually cover?

**Object classification** — is the thing that moved a person, a vehicle or something else? The foundation for most rules.

**Zone and line rules** — a person in a marked area during set hours, or crossing a marked line.

**Counting** — objects or people crossing a line over a period.

**Protective equipment checks** — whether a defined item, such as a glove, is present on a person in view.

**Plate reading and face matching** — reading a number plate or matching a face to an enrolled list. Both need cameras positioned specifically for the task, and face matching carries privacy obligations.

**Camera-feed health** — noticing that a stream has stopped or a view has changed. Valuable, and often overlooked.

## Product versus module: the capability matrix

The matrix below separates three questions buyers often blur: whether a capability has PGAK evidence behind it, how it would be supplied, and what to test. The **evidence state** comes from PGAK's [capability register](/platform/capabilities) (reviewed 3 October 2026). "Limited pilot" means shown on a recorded scene under stated conditions; it is not an accuracy measurement. "Unverified" means no PGAK evidence record yet — it can be evaluated at your site, not that it is promised.

| Capability | PGAK evidence state | What the evidence shows | How it is supplied | What to test at your site |
|---|---|---|---|---|
| Protective equipment (glove) check | Limited pilot | 14-second recording, 1 April 2025, existing overhead line camera; bare hands flagged with model confidence on screen. One PPE class only | Confirmed in the written scope | Your camera angle, your glove colours, day and night shifts |
| Object count across a line | Limited pilot | 16-second recording, 19 December 2022, loading bay; count rises from four to seven with tracking to avoid double counting. Not an inventory system | Confirmed in the written scope | Your crossing point, crowding, object types |
| Hot work beside flammable material | Limited pilot | 11-second recording, 18 February 2025, PGAK's own test setup, not a customer site. Does not check permits, measure distance or detect fire | Confirmed in the written scope | Your work areas; how alerts reach the safety owner |
| Number-plate camera and console | Limited pilot | Photographs of a camera fitted at about 1.5 m on a gate pillar in daylight, and the operator console. Not a read-rate measurement | Camera and console scope confirmed per site | Night reads, speed, plate condition at your gate |
| Zone and perimeter events | Unverified | No PGAK evidence record yet | Confirmed in the written scope | False and missed alerts by day and night |
| Loitering | Unverified | No PGAK evidence record yet | Confirmed in the written scope | Dwell-time thresholds against normal work |
| Face recognition | Unverified | No PGAK evidence record yet | Confirmed in the written scope | Consent, enrolment, camera position, lighting |
| Attendance exceptions | Unverified | No PGAK evidence record yet | Confirmed in the written scope | Match against your existing records |
| Camera-feed health | Unverified | No PGAK evidence record yet | Confirmed in the written scope | Unplug a camera; time the alert |
| Full video management system | Unverified | No PGAK evidence record yet | Confirmed in the written scope | Whether you need it, or your existing VMS suffices |

The recordings are on the [evidence page](/resources/evidence). For any supplier, PGAK included, ask the same of each capability: is it the supplier's own software, a licensed third-party module, supplied hardware, or an integration with something you already own? The answer changes who fixes it, who updates it and what you keep if the contract ends.

## Which claims should you distrust?

**"Predicts crime."** Software detects defined situations. It does not predict intent.

**A precise accuracy percentage with no method.** Accuracy depends on camera position, light, distance and what counts as a hit. Ask for the site, period, sample and whether it was measured or modelled. PGAK publishes no accuracy figure.

**"Works with any camera."** Compatibility is confirmed per model, firmware and stream, and for the specific task. See the [compatibility checks](/insights/add-ai-to-existing-cctv-cameras).

## When is video analytics not the answer?

If nobody will receive and act on an alert, if cameras do not cover the area that matters, or if night footage is unusable, analytics will not fix the gap. Start with coverage, lighting, power backup and a named responder. A system with three rules people trust is more useful than thirty rules everyone has muted.

## Next step

If you are comparing on-site processing with a cloud option, put both quotes into the [edge AI processing calculator](/features/guides/edge-ai#scenario-C05), and use the [bandwidth and cloud cost calculator](/calculators/bandwidth-and-cloud-cost) to size what continuous upload would need. The [video analytics software page](/video-analytics-software) describes PGAK's approach.

To see which rows of the matrix are realistic on your own cameras, [ask for a site-specific assessment](/free-audit).
