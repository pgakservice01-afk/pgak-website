---
title: "Face recognition at a low-light gate: test before deployment"
metaTitle: "Face recognition in low light: test your gate first"
date: "2026-09-09"
updated: "2026-10-08"
category: "Camera Setup"
excerpt: "A gate camera that recognises everyone at noon can miss the same people after dark. Why night is different, what to try before buying a new camera, and an enrolment and camera-position test that reports day and night errors separately."
metaDescription: "Face recognition fails at dark gates because night images differ from enrolment photos. A day/night test that reports errors separately."
readTime: 6
image: "/insights/category/camera-setup-3.webp"
draft: true
reviewStatus: "Awaiting PGAK engineer review. Face recognition has no PGAK evidence record; no PGAK accuracy, night performance or deployment is claimed. The earlier version's '₹200 lamp' and '₹150 fixture' figures and the anecdote about sites buying low-light cameras were removed as unverified. Statements about infrared and enrolment mismatch are general camera behaviour and should be checked by an engineer. Test numbers are illustrative."
faqs:
  - q: "Does face recognition work in low light?"
    a: "It can, but night images are different from daytime ones. Most CCTV cameras switch to black-and-white infrared mode in the dark, faces close to the camera can be over-exposed by the infrared light, and shadows change. If people were enrolled from daytime colour photos, the system is comparing two quite different pictures. Detecting that a person is present usually still works; identifying who it is gets harder."
  - q: "Can infrared cameras be used for face recognition?"
    a: "Some recognition engines are designed for infrared images and work well with them; many CCTV-based setups are tuned and enrolled in daylight. Whether your engine copes with your camera's night images is something to test at your gate, not assume. Ask the supplier whether it supports night or infrared images and whether enrolment can include them."
  - q: "What should I try before buying a new camera for a dark gate?"
    a: "Check the camera's height and angle, then lighting: a fixed light that falls on faces at the point where people pass, angled away from the lens, often helps more than a more expensive sensor. Then run a test at night with enrolled volunteers and compare the result with the same test by day."
  - q: "Why report day and night errors separately?"
    a: "Because a combined figure hides the problem. A gate that works well all day and poorly at night can still produce a respectable-looking average. Separate figures show whether the night shift will face repeated failures, which is what decides whether the system is usable."
---

**Straight answer: a gate camera that recognises people by day and misses them after dark is usually comparing two different kinds of picture — a daytime colour enrolment photo against a black-and-white infrared night image, often with glare or shadow on the face. Detection ("a person is there") survives the dark far better than identification ("this is Harpreet"). Before buying a new camera, check height, angle and lighting on the face, then run an enrolment and camera-position test by day and by night, and report the two sets of errors separately.**

If your gate camera flags every person walking through at 9 pm but cannot match them to employee records, this is almost always what is happening. The camera is not broken; it is doing an easier job well and a harder job badly.

## Why night is different

Two jobs get confused. **Detection** — noticing a human shape in the frame — needs little detail and works in low light. **Identification** — matching a face to an enrolled person — needs fine detail: the shape of the eyes, nose and mouth, and the contrast between them.

After dark, several things change at once:

- **The camera switches mode.** Most CCTV cameras move to black-and-white with built-in infrared illumination. The face now looks different from the colour photo it was enrolled from.
- **Infrared can over-expose close faces.** Someone walking close to a camera with strong built-in infrared may appear as a bright, flat shape with little detail.
- **Shadows move.** An overhead lamp throws the eyes into shadow under a cap brim or turban; a light behind the person turns them into a silhouette.
- **Exposure gets longer.** In low light the camera keeps the shutter open longer, so anyone walking briskly blurs.

Some recognition engines are designed for infrared images and cope well. Many CCTV-based setups are not tuned or enrolled that way. That is why the answer for your gate comes from a test, not a brochure. [What affects face recognition accuracy](/insights/face-recognition-accuracy-what-affects-it) covers the general factors.

## What to try first

In rough order of cost:

1. **Camera position.** A camera mounted high, looking steeply down, sees the top of heads by night and day. Get it closer to face height at the point people pass, looking along their walking line.
2. **A point where people pause.** A turnstile, a door, a marked stopping point. Moving faces at night blur.
3. **Light on the face, not in the lens.**
   - In front of or beside the walking path, not behind the person.
   - Angled onto the face, not into the camera, which causes glare.
   - At roughly head height, not lighting the ground.
   - Not so bright that it dazzles people walking towards it.
4. **Camera settings.** Ask the installer to check exposure, infrared strength and day/night switching for the recognition spot specifically, not the whole scene.
5. **Enrolment.** If the engine supports it, ask whether people can be enrolled from images captured in the night conditions as well as by day. See [how many photos face enrolment needs](/insights/how-many-photos-face-enrolment).
6. **A different camera** only if the above has been tried and the test still fails at night.

## The enrolment and camera-position test

Run this before you commit to face recognition at a dark gate, with volunteers who have agreed in writing to take part and know what the images are for.

**Set-up**

- **Volunteers:** enough people to represent your workforce — different heights, with and without spectacles, beards, turbans or caps as people actually wear them at the gate. Do not record anyone's religion, caste or ethnicity; record only the visible condition (for example "spectacles", "cap").
- **Enrolment:** enrol each volunteer the way you would in production. Note how and when (daylight, indoors, phone photo, gate camera).
- **Positions to test:** the current camera position, and one alternative if you are considering moving it.
- **Times:** a daylight session, a dusk session and a full-dark session at the lighting the gate really has.

**Each pass**

Each volunteer walks through at normal pace, as they would at shift change. Repeat several times per session. A second person records what actually happened.

**Outcome for each pass — use these four, not a single "accuracy" number**

| Outcome | Meaning | Why it matters |
|---|---|---|
| Correct match | The right person was identified | What you want |
| No match (false reject) | An enrolled person was not recognised | Queue at the gate, manual entry, frustration |
| Wrong match (false accept) | Recognised as someone else | Most serious: the record is wrong |
| Not detected | No face captured at all | Placement or lighting failure |

**Report sheet — one row per position and session, never combined**

| Camera position | Session | Passes | Correct match | No match | Wrong match | Not detected |
|---|---|---|---|---|---|---|
| Current | Day | | | | | |
| Current | Dusk | | | | | |
| Current | Night | | | | | |
| Alternative | Day | | | | | |
| Alternative | Dusk | | | | | |
| Alternative | Night | | | | | |

**Illustrative example (hypothetical numbers, not a PGAK result).** Twenty volunteers each walk through five times per session — 100 passes. At the current position, by day: 95 correct, 4 no match, 0 wrong, 1 not detected. At night: 60 correct, 30 no match, 2 wrong, 8 not detected. Combined, that is 155 correct out of 200, or 77.5% — a number that describes neither shift. The separate figures show the real story: the day shift works; the night shift would see 30 failed entries in every 100. After a light is added and the camera lowered, the night session is rerun; whatever it shows is the number that decides go or no-go.

**Decide in advance** what result would be acceptable for each outcome, and in particular how many wrong matches you will tolerate (the answer for attendance should be very close to none), before you see the numbers.

## What lighting will not fix

A camera shooting steeply down, people walking past at an angle rather than towards the camera, crowded shift changes and face coverings all cause misses whatever the light. [Do helmets, masks and turbans affect face attendance?](/insights/masks-helmets-turbans-face-recognition) covers coverings.

Whatever the result, keep a non-biometric way in — a card, a PIN or a supervisor's register — for anyone the system does not recognise and anyone who declines to be enrolled. A failed match should never be treated as an absence or lead to a pay deduction; it is a prompt for a person to check. [When an employee refuses biometric attendance](/insights/employee-refuses-biometric-consent) covers the fallback.

## Next step

Estimate the checking time at stake with the [face recognition and face search calculator](/features/face-recognition#scenario-C25), which subtracts the hours spent reviewing false matches; other calculators are on the [calculators page](/calculators). The [face recognition page](/features/face-recognition) explains how enrolment and matching work.

Face recognition at your gate can be evaluated on site, with your cameras and lighting. [Ask for a site-specific assessment](/free-audit) and the day and night test can be planned for your gate.
