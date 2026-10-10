---
title: "When Indian number-plate recognition works and when it fails"
metaTitle: "ANPR camera in India: when it works, when it fails"
date: "2026-09-13"
updated: "2026-10-08"
category: "Security Basics"
excerpt: "ANPR reads plates reliably in a narrower set of conditions than most brochures admit. What makes it work at an Indian gate, where it quietly fails, and a day-and-night test you can run before you pay for it."
metaDescription: "ANPR works at a slow, single-lane gate with the camera at plate height. A day-and-night test for blur, dirty plates, angle and non-standard plates."
readTime: 8
image: "/insights/covers/anpr-number-plate-recognition-when-it-works.webp"
draft: true
reviewStatus: "Awaiting PGAK engineer review. HSRP sentence verified 8 Oct 2026 against G.S.R. 349(E), Gazette of India, 8 May 2026 (Central Motor Vehicles (Sixth Amendment) Rules, 2026); no plate font, size or layout rule is stated because rule 50 text was not verified today. Native-versus-licensed ANPR engine is an open owner decision; wording is true either way. After promotion, consider linking /insights/anpr-pilot-accuracy-checklist (B050) from the test section."
faqs:
  - q: "Does ANPR work reliably on Indian number plates?"
    a: "It works best at a gate built for it: one lane, vehicles slowing or stopping, a camera at roughly plate height looking along the lane, and lighting that does not rely on headlights. It struggles with plates that are dirty, bent, covered by stickers or frames, written in non-standard lettering, or seen at a steep angle. The only reliable way to know how it performs at your gate is to test it there, by day and by night."
  - q: "Why does ANPR fail at some gates and not others?"
    a: "The usual causes are physical, not software: the plate is too few pixels wide because the camera is far away or zoomed wide, the camera looks down or across at the plate instead of along the lane, the vehicle is moving fast enough to blur the characters, headlights wash out the plate at night, or the plate itself is dirty or non-standard. Fix placement and lighting before blaming the recognition engine."
  - q: "Can ANPR replace a security guard at the gate?"
    a: "No. ANPR turns a plate into searchable text and can match it against a list. It does not inspect a vehicle, check a driver, handle a pedestrian or decide what to do when something looks wrong. It supports whoever makes the entry decision."
  - q: "How should I test ANPR before buying it?"
    a: "Run it on your own gate for long enough to include nights, a wet day if possible and your busiest hour. Keep a manual log of every vehicle that actually passed, then compare it with what the system read. Report day and night separately, and count unread plates and wrong reads separately rather than accepting a single accuracy figure."
---

**Straight answer: number-plate recognition (ANPR) is dependable only at a controlled point — a single lane where vehicles slow or stop, with the camera at about plate height, looking along the lane, and lighting that does not depend on the vehicle's headlights. Move it to an open yard, a wide two-lane gate or a camera mounted high for general coverage, and reads fall away quickly. The gap between a vendor's demo and your gate is almost always placement, lighting and plate condition — which is why you should test on your own gate, by day and by night, before paying for it.**

Number-plate recognition gets sold as one capability: point a camera at traffic, get a searchable log of every vehicle. The reality is narrower. ANPR is useful — it turns a handwritten gate register into a record you can search — but only inside a specific set of physical conditions. This article explains those conditions and gives you a test protocol you can run with your own guard and a notebook.

## What ANPR actually does

The software finds a plate-shaped region in a video frame, reads the characters, and stores the text with a time and, in a sensible system, the snapshot it read from. Reading a character depends on how many pixels fall across it. That is why a cheap camera aimed correctly can beat an expensive one aimed badly: the plate, not the vehicle, has to be large and sharp in the frame. [Camera resolution versus distance](/insights/camera-resolution-vs-distance) explains the pixel arithmetic.

Because every downstream step depends on that first image, keep the snapshot with every read. A plate a person cannot read in the snapshot is a plate the software will not read either, and the snapshot is what lets someone check a disputed entry.

## Why Indian gates are harder than the textbook case

The plates a factory or society gate sees are not uniform. Expect:

- **Different plate generations.** Gazette notifications set what registered vehicles must carry. In the vehicle fitness-testing parameters notified by the Ministry of Road Transport and Highways on 8 May 2026 (G.S.R. 349(E), *Central Motor Vehicles (Sixth Amendment) Rules, 2026*), inspectors check that high security registration plates are fitted at the front and rear, including the third registration mark on the windshield, and are securely fixed, with reference to rule 50 of the Central Motor Vehicles Rules, 1989. A gate will still see older, damaged, replaced and decorative plates alongside compliant ones, so a pilot has to include them.
- **Two-line plates** on two-wheelers and many commercial vehicles, which some engines handle less well than single-line plates.
- **Plate condition.** Mud on a truck's rear plate, faded paint, bent corners, a dealer sticker, a tow hook or a bull bar in front of the characters.
- **Lettering that is not the standard style** — stylised fonts, extra text, or characters painted by hand on older commercial vehicles.

None of this makes ANPR impossible. It reduces the margin, which makes placement and lighting matter more.

## Where it works

At a choke point: a boom barrier, a narrow factory gate, a single-lane approach. Vehicles slow down or stop, the camera has one predictable angle to cover, and lighting is planned for the plate rather than borrowed from the yard. The PGAK gate installation shown on the [ANPR page](/anpr-number-plate-recognition) is an example of that geometry: a camera fixed to an existing gate pillar at about 1.5 metres, tilted slightly and aimed along the lane, plus the console the operator works from. Those two photographs prove a fitting and a working console. They are not a read rate, and PGAK publishes no read rate — at your gate, the number has to come from your own test.

## Where it fails

- **High, wide cameras.** A camera mounted at roof height to cover the whole gate sees every vehicle and reads very few plates.
- **One camera for two lanes.** It reads one lane well and the other badly. Plan one camera per lane.
- **Speed.** A vehicle that does not slow down blurs the characters, especially at night when the camera lengthens its exposure.
- **Headlight glare.** At night the plate sits beside two bright lamps; without exposure control and suitable illumination, the plate washes out.
- **Steep angles.** Plates seen from far to the side compress the characters. Ask the supplier for the angle their engine is specified for, then check it on your gate.

If a demonstration uses a clean video filmed at the ideal distance, ask to see it running on your gate's footage instead.

## The day-and-night sample protocol

This is the test to run before you sign anything, whoever the supplier is. It takes a week or two and needs one person who can keep a log.

**Step 1 — Fix the setup.** Agree the camera position, lens and lighting in writing before the test starts. Changing them mid-test resets the results.

**Step 2 — Keep a ground-truth log.** For every vehicle that actually passes, the guard or a clerk writes the time, direction and plate as read by a person (from the vehicle or the stored snapshot). This is the reference the system is compared against.

**Step 3 — Tag each passage with its condition.** Use the buckets below. One vehicle can carry more than one tag.

**Step 4 — Compare and count.** For each bucket, count the outcomes separately. Do not merge them into one percentage.

Fill in one copy of this table for daylight passages and a second copy for night passages. Never add the two together.

| Condition bucket | What to include | Passages (hand log) | Exact reads | Unread | Wrong reads |
|---|---|---|---|---|---|
| Clean plate, vehicle stopped | Baseline; if this is weak, nothing else will be good | | | | |
| Clean plate, normal gate speed | Vehicles as they actually pass, not slowed for the test | | | | |
| Motion blur | Vehicles that did not slow down | | | | |
| Dirty or faded plate | Mud, dust, faded paint | | | | |
| Damaged or obstructed | Bent plate, sticker, tow hook, frame over characters | | | | |
| Angled approach | Vehicles turning in rather than driving straight | | | | |
| Non-standard lettering | Stylised, hand-painted or extra text | | | | |
| Two-line plate | Two-wheelers, many trucks and tractors | | | | |
| Headlight glare (night copy only) | Arrivals with headlights on | | | | |
| Rain | If the pilot catches a wet day | | | | |

**Definitions to agree in advance:**

- **Exact read** — every character correct.
- **Unread** — a vehicle passed and the system logged no plate.
- **Wrong read** — the system logged a plate, but one or more characters are wrong. These matter more than unread plates, because a wrong read can match the wrong vehicle on an allow-list or hide a vehicle in a later search.

**Illustrative example (hypothetical numbers, not a PGAK result):** in the night "clean plate, normal speed" bucket, 100 passages are logged by hand. The system reads 80 exactly, logs nothing for 15 and logs 5 with a wrong character. Exact reads are 80 ÷ 100 = 80%; unread 15 ÷ 100 = 15%; wrong reads 5 ÷ 100 = 5%. If the same bucket by day shows 95 exact reads out of 100, the problem is night lighting or exposure, not the plates — and that is a fix to make before going live, not a reason to accept a blended figure of 87.5%.

**What to ask for after the test:** the bucket table, the snapshots for every wrong read, and what the supplier proposes to change for the weakest bucket.

## When ANPR is the wrong answer

If your site is an open compound where vehicles enter from several directions without slowing, plate reading will not be reliable there, and the money is better spent first on a single controlled entry — a barrier, a narrower lane — and a general camera that records every arrival. If most of your vehicles are your own fleet, a tag-based system such as RFID may suit them better. And if nobody will ever search the log, an ANPR system only produces data.

ANPR is also not a decision-maker. It reports which plate arrived and when; a person still decides whether that vehicle should be let in, and what to do when the plate does not match the paperwork. PGAK's photographed console reflects that: each read is a card an operator approves or denies.

## Next step

To see whether the gate time saved is worth the effort, try the [ANPR and vehicle logs calculator](/anpr-number-plate-recognition#scenario-C09) or the [ANPR gate time calculator](/calculators/anpr-gate-time), which keep theoretical capacity separate from real queue throughput. Placement basics are in [where to place cameras for AI detection](/insights/where-to-place-cctv-cameras-for-ai-detection).

Want your gate checked before anything is quoted? [Ask for a site-specific assessment](/free-audit) — camera position, lane layout and lighting are confirmed on site, and the test above is run on your own footage.
