---
title: "PTZ auto-tracking: understand blind spots while the camera moves"
metaTitle: "PTZ auto tracking: the blind spots it creates"
date: "2026-10-08"
category: "Camera Setup"
excerpt: "When a PTZ camera zooms in to follow one person, it stops watching the rest of the yard. Work out how much it stops seeing, and for how long, before deciding what the fixed cameras must cover."
metaDescription: "A PTZ that auto-tracks one subject leaves the rest of its view unwatched. Calculate the coverage lost while zoomed and plan fixed cameras around it."
readTime: 7
draft: true
reviewStatus: "Awaiting PGAK engineer review. No PGAK evidence record exists for PTZ tracking; written as a buyer evaluation guide only. Lens angles, timeouts and event counts in the examples are hypothetical; the field-of-view formula is standard geometry. Engineer to confirm the statement that zone analytics drawn on a PTZ preset may not apply while the camera is moving."
faqs:
  - q: "Can software make a fixed camera auto-track like a PTZ?"
    a: "Software can crop and follow a subject inside a fixed camera's image, but it cannot add physical pan, tilt or optical zoom. A digital crop gets no more detail than the fixed camera already recorded."
  - q: "What does a PTZ camera miss while it is auto-tracking?"
    a: "Everything outside its zoomed view. At high zoom it may cover only a small fraction of the width it watched at its home position, and that lasts until tracking ends and the camera returns. Zone-based analytics drawn on the home view may also stop applying while the view has changed. Fixed cameras have to cover what matters during that time."
  - q: "Should a PTZ be the only camera covering a yard?"
    a: "Usually not. A PTZ is good at getting a closer look at one subject. Detection along a boundary or at a gate works better from fixed cameras whose view never changes, with the PTZ used to follow up."
---

**Straight answer: a PTZ camera with auto-tracking can follow a person or vehicle and zoom in for detail, which a fixed camera cannot do. The price is coverage: while it is zoomed on one subject, the rest of the area it normally watches is not being watched by that camera at all. Before relying on auto-tracking, work out how much of the scene disappears at the zoom you will use, how long each tracking episode lasts, and which fixed cameras keep watching the gate, the boundary and the loading bay in the meantime.**

A PTZ that follows an intruder across a yard makes an impressive demonstration. Ask what it was doing about the second person who came over the wall while it was busy.

## How does PTZ auto-tracking work?

A PTZ camera has motors to pan and tilt and an optical zoom lens. Auto-tracking adds analytics — either in the camera or in separate software sending movement commands — that pick a subject and keep it in frame. When the subject leaves or tracking times out, the camera returns to a home position (a preset) or continues a patrol between presets.

Three things follow:

- **Only one subject at a time.** Ask what decides which subject is followed when two appear.
- **The view changes constantly.** Any zone drawn on the home view — an intrusion line, a no-go area — may not apply while the camera is pointing elsewhere. Ask the supplier how its analytics behave during movement.
- **Software cannot add motors.** As the [feature guide](/features/guides/ptz-tracking) notes, a fixed camera can be digitally cropped, but that adds no detail and no reach.

## How much does the camera stop seeing?

The width a camera covers at a given distance depends on its horizontal field of view:

width covered = 2 × distance × tan(field of view ÷ 2)

**Illustrative example** (hypothetical lens and distances): a PTZ with a 60° horizontal field of view at its widest zoom, watching a yard 40 metres away.

- Home position: 2 × 40 × tan 30° = 2 × 40 × 0.577 ≈ 46 metres wide.
- Zoomed in to a 10° field of view to follow a person: 2 × 40 × tan 5° = 2 × 40 × 0.087 ≈ 7 metres wide.
- While tracking, it covers about 7 ÷ 46 ≈ 15% of the width it covered at home.

The field-of-view figures for your camera are on its datasheet at the wide and tele ends of the zoom; the zoom used during tracking is visible in a test. Put your own numbers in.

## For how long is the scene uncovered?

Every tracking episode has three parts: the time following the subject, any hold time after the subject is lost, and the time to swing back to home.

**Illustrative example** (hypothetical settings and counts): tracking times out after 60 seconds, the return takes 5 seconds, and on a typical night the camera starts tracking 30 times — some for people, some for stray dogs and headlights.

30 episodes × (60 + 5) seconds = 1,950 seconds ≈ 32 minutes a night when the home view is not being watched by this camera

That number does not mean the site is unprotected for 32 minutes. It means that whatever the PTZ was the only camera for is unwatched for that long, in pieces, usually at exactly the moments something is happening.

## The coverage comparison: fixed cameras versus the tracked scene

This is the planning table. List every zone the PTZ is meant to help with, then ask, for each one, who is watching it in three situations.

| Zone | Fixed camera covering it? | PTZ at home preset? | PTZ tracking at the gate? | PTZ tracking at the far wall? | Gap if PTZ is the only cover | Fix |
|---|---|---|---|---|---|---|
| Main gate | Yes (Gate-1) | Yes | Yes | No | None | — |
| North boundary wall | No | Yes | No | Partly | Every tracking episode away from the wall | Add a fixed camera along the wall line |
| Scrap yard | No | Yes | No | No | Every tracking episode | Fixed camera, or accept the gap in writing |
| Loading bay | Yes (Bay-1) | Partly | No | No | None | — |
| Parking | Yes (Park-1) | Yes | No | No | None | — |

Read across each row. Any zone that depends only on the PTZ at home has a gap every time the PTZ tracks — and an intrusion zone drawn on that home view may not be working during the gap either. Those rows need a fixed camera, a change in what triggers tracking, or a written decision that the gap is acceptable.

## Test protocol for auto-tracking

Run each of these on site, at night as well as by day, and record what the camera did:

- [ ] **Two subjects, opposite ends.** Which one does it follow? Does the other raise any alert anywhere?
- [ ] **Subject passes behind a container or truck.** Does it reacquire the same subject, switch to a different one, or give up?
- [ ] **Subject stops and stands still.** Does tracking hold, or time out?
- [ ] **Fast vehicle.** Can the motors keep up at the zoom used?
- [ ] **Night.** Is the subject still visible at full zoom, or does the infrared range fall short?
- [ ] **Distractions.** Trees, flags, stray animals, headlights sweeping the yard — how often does tracking start for them?
- [ ] **Return.** How long from losing the subject to being back at home, and is that what the settings say?
- [ ] **Recording.** Does the recorder store the tracked view, and is the time of each tracking episode logged?
- [ ] **Analytics during movement.** Do zone alerts on the home view keep working, pause, or misfire while the camera moves?

## Does it save operator time?

Auto-tracking can save an operator steering a PTZ by joystick — and cost time when the camera loses a subject and someone has to find it again.

**Illustrative example** (hypothetical numbers): 40 tracking sessions a month that an operator would otherwise steer; 8 minutes each by hand; 3 minutes each with auto-tracking; 2 minutes each, on average, recovering a lost subject.

hours = sessions × (old − new − recovery) ÷ 60 = 40 × (8 − 3 − 2) ÷ 60 = 2 hours a month

If your site has no one steering PTZ cameras today, there is no operator time to save — the case rests on detail and coverage, not hours.

## When fixed cameras are the better buy

- **Boundary and gate detection.** Fixed views keep zones stable, which is what intrusion rules need. Use the PTZ to look closer after a fixed camera has raised the event.
- **When the coverage table shows several PTZ-only zones.** One or two fixed cameras may cost less than the risk of the gaps. The [blind spots article](/insights/cctv-blind-spots-where-thieves-look) shows how to walk your site to find them, and [camera placement for AI detection](/insights/where-to-place-cctv-cameras-for-ai-detection) covers height and angle.
- **When nobody uses the detail.** A zoomed clip of a subject is valuable if someone reviews it. If nobody will, a wide fixed view recorded continuously may serve you better.

## Next step

Use the [PTZ tracking calculator](/features/guides/ptz-tracking#scenario-C10) for operator time, and the other [calculators](/calculators) for storage and replacement questions that come up when cameras are added.

PTZ tracking is an industry capability that PGAK can evaluate at your site; whether an existing PTZ can be controlled, and whether tracking would be supplied as PGAK software, a licensed module or an integration, is confirmed per camera model, firmware and stream, with anything extra itemised in the quote. To have the coverage table filled in for your own yard, [ask for a site-specific assessment](/free-audit).
