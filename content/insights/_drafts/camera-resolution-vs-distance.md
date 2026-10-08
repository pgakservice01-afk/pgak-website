---
title: "Camera resolution vs distance: when do pixels stop being useful?"
metaTitle: "CCTV camera resolution vs distance: the pixel maths"
date: "2026-09-09"
updated: "2026-10-08"
category: "Camera Setup"
excerpt: "A 4MP camera with a wide lens can leave a face at the far end of a yard as a few dozen pixels. Megapixels mean little without distance and lens. A scene-measurement exercise to find out what your camera really resolves at the spot that matters."
metaDescription: "What matters is pixels per metre at the spot you need, not megapixels. The formula, a worked gate example and a measurement exercise to test your camera."
readTime: 8
image: "/insights/category/camera-setup-2.webp"
draft: true
reviewStatus: "Awaiting PGAK engineer review. Corrected from the live version: an 8MP sensor (3,840 px wide) gives about 1.43× the pixel density of 4MP (2,688 px) on the same lens, not double. Check: the pixel-density guide figures (25 / 62.5 / 125 / 250 px per metre for detect / observe / recognise / identify) are those commonly cited from IEC/EN 62676-4; an engineer should confirm them against the standard's current text. Removed: 'we install and tune camera positions' (not in the verified PGAK facts)."
faqs:
  - q: "Does more megapixels mean I can identify faces further away?"
    a: "Not on its own. Megapixels are spread across whatever the lens shows. With a wide lens, even a high-resolution camera can put only a few dozen pixels per metre on a person far away. What matters is pixels per metre at the exact spot where the face or plate appears, and that depends on resolution, lens angle and distance together."
  - q: "How do I calculate pixels per metre?"
    a: "Work out the width of the scene at the target distance: width = 2 × distance × tan(half the lens's horizontal angle). Then divide the camera's horizontal pixel count by that width. A 4MP camera, 2,688 pixels wide, with a 90° lens at 12.6 metres sees about 25.3 metres across, so about 106 pixels per metre."
  - q: "How many pixels per metre do I need to identify a face?"
    a: "Commonly cited guidance from the CCTV standard IEC/EN 62676-4 is about 25 pixels per metre to detect a person, 62.5 to observe, 125 to recognise someone you know and 250 to identify a stranger. Treat these as rough planning figures. Lighting, motion blur, compression and camera angle all matter, so confirm with a test at the real spot."
  - q: "How can I get more detail at a distance without a new camera?"
    a: "Narrow the field of view with a longer lens or a varifocal lens set tighter. The same pixels then cover a smaller width, so density rises. The trade-off is that the camera covers less area, so you may need a second camera for the overview."
---

**Straight answer: megapixels tell you little about whether a camera can identify a face or read a plate at a given spot. What matters is pixels per metre where the person or vehicle actually is, and that depends on resolution, lens angle and distance together. A 4MP camera with a 90° lens about 12.6 metres from a gate puts roughly 106 pixels on each metre — enough to recognise someone you know, not enough to reliably identify a stranger. Work it out, then measure it with a simple test at the real spot.**

Quotes list megapixels as if they settle the question. Two 4MP cameras with different lenses can give very different results at the same gate, and analytics running on a lower-resolution sub-stream sees even less.

## Why doesn't resolution alone give you identification distance?

A sensor has a fixed number of pixels across, and they are spread over whatever the lens shows. A wide lens shows more of the scene, so each metre gets fewer pixels, and the further away the target, the wider the scene and the thinner the pixels. A narrow lens shows less, so the same pixels are concentrated and stay useful further out.

The useful question is never "how many megapixels?" It is "how many pixels per metre land on a person standing where I need to see them?"

## How do you work out pixels per metre?

> **Scene width at the target = 2 × distance × tan(horizontal field of view ÷ 2)**
>
> **Pixels per metre = horizontal pixels ÷ scene width**

Use the camera's **horizontal** pixel count (2,688 for a common 4MP sensor, 3,840 for 8MP) and the lens's **horizontal** field of view from the datasheet at the zoom actually set. Use the straight-line distance from the camera to the target. If the camera is mounted high, that is √(height² + ground distance²).

Here is a 4MP camera with an 80° lens at different distances:

| Distance | Scene width (80° lens) | Pixel density (2,688 px) | Roughly supports |
|---|---|---|---|
| 5 m | 8.4 m | ~320 px/m | Identify a stranger |
| 10 m | 16.8 m | ~160 px/m | Recognise a known face |
| 20 m | 33.6 m | ~80 px/m | Observe activity |
| 40 m | 67.1 m | ~40 px/m | Detect presence |
| 60 m | 100.7 m | ~27 px/m | Barely detect |

The camera did not get worse. The distance did the damage.

### What density does each task need?

Commonly cited planning figures from the CCTV standard IEC/EN 62676-4 are about **25 px/m to detect** a person, **62.5 to observe** what they are doing, **125 to recognise** someone you know and **250 to identify** a stranger. They are rules of thumb. Lighting, motion blur, compression, camera angle and the software or reviewer all affect the real result.

## Worked example at a factory gate

**Illustrative example — round, hypothetical figures.** A 4MP camera (2,688 px wide) is mounted 4 m high. The point where people pause at the gate is 12 m away along the ground.

- Distance to target: √(4² + 12²) = √160 ≈ **12.65 m**
- **90° lens:** width = 2 × 12.65 × tan 45° = 2 × 12.65 × 1 = **25.3 m** → 2,688 ÷ 25.3 ≈ **106 px/m**. Enough to recognise, short of the commonly cited figure for identifying a stranger.

Three ways to change the result:

| Option | Arithmetic | Pixel density | Trade-off |
|---|---|---|---|
| Same camera, **30° lens** | width = 2 × 12.65 × tan 15° = 2 × 12.65 × 0.268 ≈ 6.78 m → 2,688 ÷ 6.78 | **≈ 396 px/m** | Covers only about 6.8 m of width; a second camera may be needed for the overview |
| **8MP camera**, same 90° lens | 3,840 ÷ 25.3 | **≈ 152 px/m** | About 1.43× the 4MP figure, not double; more storage per camera |
| Analytics on a **640-pixel sub-stream**, same 90° lens | 640 ÷ 25.3 | **≈ 25 px/m** | Enough for detecting a person, not for faces; check which stream analytics uses |

Two lessons. A narrower lens usually beats a higher-resolution sensor for detail at one point. And the stream that analytics reads matters as much as the camera. If analytics runs on a sub-stream, do the arithmetic with the sub-stream's resolution.

## The scene measurement exercise

The calculation tells you what to expect. This exercise tells you what your camera actually delivers. Allow an hour per position, by day and again after dark.

**You need:** a measuring tape or laser distance meter; a 1-metre rule, or a board marked at 0, 50 and 100 cm; a sheet of A4 paper (210 mm wide) with large printed letters; one colleague who has **agreed** to be filmed for the test; and access to the recorder's playback.

1. **Mark the target point.** The exact spot where a face or plate must be legible: the turnstile, the pause point at the gate, the billing counter, the weighbridge.
2. **Measure the distance** from the camera to that point, and the camera's mounting height. Work out the straight-line distance.
3. **Note the camera's settings:** resolution of the main stream and the sub-stream, the lens or zoom setting, and the horizontal field of view from the datasheet.
4. **Calculate the expected pixels per metre** with the formula above.
5. **Measure the real figure.** Have your colleague hold the 1-metre board level and square to the camera at the target point. Take a full-resolution snapshot from the **main stream**, open it in any image viewer and count the pixels across the 1-metre mark. That is your measured px/m. *Illustrative example:* the gate camera above is calculated at 106 px/m and the board spans 98 px. Use 98. The gap comes from lens distortion, the actual zoom setting or a slightly angled board.
6. **Recognition test.** Have your colleague walk through the target point at a normal pace, then pause there. Review the **recorded** footage, not live view: recording can be compressed more than the live picture. Can someone who knows them recognise them? Can someone who does not know them match them to a photo?
7. **Detail test.** Hold the A4 sheet at the target point. Note which letter size is still readable in recorded footage. For vehicles, drive one through at normal speed and check whether the plate is readable, by day and at night with headlights on.
8. **Repeat after dark.** Infrared and low light reduce detail, and movement blurs more at night. A position that passes by day can fail at night.
9. **Record the result** for each position in the worksheet below, and delete the test clips once you have finished.

| Position | Distance (m) | Lens HFOV | Calculated px/m | Measured px/m | Day: recognise / identify? | Night: recognise / identify? | Action |
|---|---|---|---|---|---|---|---|
| Main gate pause point | | | | | | | |
| Billing counter | | | | | | | |
| Loading bay door | | | | | | | |

## Where does this go wrong in practice?

The most common mistake is asking one wide camera to do two jobs: watch the whole yard and identify faces at the far gate. One camera rarely does both well. Split the job: a wide camera for the overview and movement, and a narrower one aimed at the exact point where identification matters. [Where to place CCTV cameras so AI detection works](/insights/where-to-place-cctv-cameras-for-ai-detection) covers placement, and [how many of your cameras can actually recognise a face](/insights/how-many-of-your-cameras-can-actually-recognize-a-face) applies this test across an estate.

## Limitations

Pixel density is necessary, not sufficient. A badly lit gate, a camera looking down at a steep angle, backlight from the street, helmets, or heavy compression can all defeat a position that passes the arithmetic. At night the limit is often light rather than pixels. [Face recognition at a badly lit gate](/insights/face-recognition-low-light-gate) covers that case.

## Next step

If the fix at your position turns out to be light rather than pixels, the [Low-light imaging calculator](/features/guides/low-light-ai#scenario-C19) compares the power used by lighting with what any added camera draws, and the [low-light imaging guide](/features/guides/low-light-ai) explains what low-light cameras can and cannot do. Other planning tools are on the [calculators page](/calculators). If you would like the measurement exercise done with you at your own gate or counter, [ask for a site-specific assessment](/free-audit).
