---
title: "Detect CCTV tampering, obstruction and scene changes"
metaTitle: "CCTV tampering detection: test covered and moved cameras"
date: "2026-08-27"
updated: "2026-10-08"
category: "Security Basics"
excerpt: "A camera that is covered, turned or unplugged usually fails before the part you wanted recorded. A four-test matrix to find out whether your system notices, how fast, and who is told."
metaDescription: "Tampering detection flags covered, moved or dark cameras; video loss flags dead streams. Test all four cases on your site and time who gets told."
readTime: 7
image: "/insights/covers/cctv-camera-tampering-detection.webp"
draft: true
reviewStatus: "Awaiting PGAK engineer review. Camera-feed health monitoring is UNVERIFIED for PGAK (no evidence record): the article describes how to test any system and claims no PGAK detection or timing. Removed from the live version: PGAK's 'about three minutes / about two minutes' offline thresholds, 'dead cameras are close to universal' on sites we assess, and 'events and clips are copied off site as they happen' presented as a PGAK feature. Engineer to confirm the description of recorder 'video loss' and camera tamper events is accurate as general industry information."
faqs:
  - q: "What is CCTV tampering detection?"
    a: "It is the system watching its own cameras for interference rather than watching for people. A covered or sprayed lens, a camera turned away, or a view going suddenly dark changes the whole frame in a recognisable way. Separately, a camera that stops sending video altogether — unplugged, cable cut, recorder removed — is detected by the absence of its stream, usually called video loss."
  - q: "Is scene-change detection the same as tampering detection?"
    a: "No. Tampering detection concerns the camera itself being blocked, redirected or disrupted. Scene-change detection compares a monitored area with a learnt normal state and flags a changed condition inside the view — cartons in a passage that should be clear, for example. Many sites need both, and they are tested differently."
  - q: "How do I test whether my cameras report tampering?"
    a: "Stage four tests on one camera with the guard informed: cover the lens, turn the camera, change the lighting sharply, and disconnect its stream. Time how long each takes to reach a phone, note who received it, and repeat the lighting test at dusk and after closing to check it does not raise false tamper alerts."
  - q: "What happens if thieves take the DVR?"
    a: "If recordings exist only on that box, they leave with it. Keep the recorder locked in a less obvious place, on a UPS, and consider keeping a copy of important events off site. A recorder being removed also stops every camera on it at once, which a health check watching from outside the building can notice."
---

**Straight answer: tampering detection watches the cameras themselves. A covered lens, a camera turned to the wall or a view that suddenly goes dark can be recognised from the video; a camera that has been unplugged or lost its recorder is recognised by its stream disappearing. Neither prevents anything. What matters is whether your system notices each case, how quickly, and whether a person is told while it still matters — and you can find out with four staged tests and a stopwatch.**

A familiar sequence in break-ins goes like this: the cameras were there and recording, and somewhere in the sequence they stopped — turned, sprayed, unplugged, or carried away with the recorder. The owner finds out in the morning. The equipment did its job up to that moment. What failed was that nobody was told.

## Why cameras get disabled rather than avoided

Avoiding cameras means knowing exactly where they point and where the gaps are. Disabling one needs a cloth, a can of spray or a hand on the housing. And it tends to happen early, before the part you wanted recorded — which makes it one of the earliest signals available, if anything is listening for it.

## Four cases, three mechanisms

It helps to separate what can go wrong from what notices it.

| Case | What happens to the video | What can notice it |
|---|---|---|
| **Covered or sprayed lens** | Whole frame turns dark, grey or blurred | Tamper detection on the camera or recorder; video analytics comparing against the normal view |
| **Camera moved or turned** | Whole view shifts, then settles on a new scene | Tamper or "scene changed" detection; analytics comparing against a reference |
| **Sharp lighting change** | Whole frame brightens or darkens | Same mechanisms — which is why this is the main **false** trigger to test |
| **Stream lost** (unplugged, cable cut, power off, recorder removed) | No video at all | Recorder "video loss" events; a separate health check that expects frames and notices when they stop |

Many cameras and recorders already include tamper and video-loss events, often switched off or set to make a beep on a recorder in an empty room. Check what yours can do before buying anything.

**Scene-change detection is a different job.** It compares a monitored area with a learnt normal state — a fire exit that should be clear, a bay that should be empty after hours — and flags a changed condition *inside* the view. It is tested against cleaning, stock movement and lighting changes. The [scene-change guide](/features/guides/scene-change) covers it.

## The tamper test matrix

Run this on at least two cameras: one indoor, one outdoor. Inform the guard and supervisor first, and do the "stream lost" test on a camera whose cover you can spare for a few minutes.

| # | Test | How to stage it safely | Expected | Mechanism that should catch it | Alert raised? | Time to reach phone | Who received it | Notes |
|---|---|---|---|---|---|---|---|---|
| 1 | **Covered lens** | Hold a cloth or card fully over the lens for 60 s. Do not spray anything. | Tamper alert | Camera/recorder tamper or analytics | | | | |
| 2 | **Partly covered lens** | Cover about half the lens for 60 s | Tamper alert, ideally | Same | | | | Often missed — worth knowing |
| 3 | **Camera moved** | Loosen and turn the camera well away from its view, hold 60 s, then restore | Tamper or scene-changed alert | Same | | | | Re-check the view afterwards |
| 4 | **Lighting shift (false-trigger check)** | Switch yard or room lights off and on; repeat at dusk when infrared switches over | **No** tamper alert | — | | | | A tamper alert every dusk will be muted within a week |
| 5 | **Lost stream** | Unplug the camera's network or power cable for 10 minutes | Video-loss or offline alert | Recorder video loss; health check | | | | Note the delay setting, if any |
| 6 | **Recorder off** | Only if safe: power the recorder down briefly out of hours | Alert from something *outside* the recorder | External health check | | | | A recorder cannot report its own removal |

Repeat tests 1, 3 and 5 after dark. For each, write down the **time from the action to the phone**, not to the recorder's screen — nobody is watching that screen at 2 a.m.

### Reading the results (illustrative example)

A hypothetical site runs the matrix on two cameras:

- Test 1: alert on both, but only as a beep on the recorder. **Gap:** nobody is told. Fix: route the event to a phone, or accept that this alert does not exist in practice.
- Test 2: no alert on either. **Gap:** a half-covered lens goes unnoticed. Note it; decide whether the camera's position makes it easy to reach.
- Test 4: the outdoor camera raised a tamper alert at dusk on three test evenings out of three. **Gap:** this alert will be ignored. Lower its sensitivity, then repeat tests 1 and 3 to confirm they still alert.
- Test 5: alert reached the supervisor's phone 11 minutes after unplugging. **Decision:** is 11 minutes useful at this site? If the guard can reach the camera in 5, ask whether the delay can be shortened without making every network blip an alert.
- Test 6: nothing. **Gap:** the recorder's removal would be discovered in the morning.

The point is not a pass mark. It is a written list of what your system will and will not tell you, which nobody has on most sites.

## What to do about it

1. **Keep a copy of important events away from the recorder.** If the only copy is on a box in the building, it is as secure as the building.
2. **Make sure something outside the recorder watches camera health**, and know its delay. For ongoing offline checks, see [your camera has been offline for weeks — would you know?](/insights/cctv-camera-offline-how-to-know).
3. **Put the recorder somewhere less obvious**, in a locked cabinet rather than on an open shelf near the entrance.
4. **Put cameras, recorder and network switch on a UPS.** Otherwise cutting power does what cutting cables does.
5. **Decide who receives tamper and video-loss alerts at night** — and check, with test 5, that they actually do.

Numbers 1 and 5 cost little and do most of the work.

## Limitations

- **Detection is not prevention.** A covered lens stays covered. You gain minutes and a timestamp, which only help if someone acts.
- **No footage of what follows.** Other cameras may still see; plan overlapping views so one disabled camera does not blank an approach — the [blind-spot site-plan exercise](/insights/cctv-blind-spots-where-thieves-look) shows how.
- **Most "offline" alerts are maintenance.** Power supplies fail and monsoon water gets into junctions. Those alerts are still useful: the alternative is a camera dead for weeks.
- **No PGAK figure.** Camera-feed health and tamper alerting have no PGAK evidence record; they can be evaluated at your site using the matrix above, which is also the fair way to judge any supplier's claim.

## Next step

Estimate the daily checking time that tamper and health alerts would replace with the [Scene-change and tamper detection calculator](/features/guides/scene-change#scenario-C16); other site calculators are listed on the [calculators](/calculators) page. You can run the test matrix yourself before speaking to anybody. If you would like it run with you, and the gaps priced item by item, [ask for a site-specific assessment](/free-audit).
