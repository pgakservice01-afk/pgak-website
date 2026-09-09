---
title: "Camera resolution vs distance: the pixel math"
date: "2026-09-09"
category: "Camera Setup"
excerpt: "A 4MP camera sounds sharp on the box, but at 40 metres it can leave a face as a 40-pixel smudge. The megapixel number alone tells you almost nothing without distance."
readTime: 5
faqs:
  - q: "Does more megapixels mean I can identify faces further away?"
    a: "Not on its own. Megapixels tell you the total detail a sensor captures across its whole field of view. If that field of view is wide, the same pixels get spread thin over a large area, so a high-megapixel camera with a wide lens can still show a face as a handful of blurry pixels at distance. What matters is pixels per metre at the exact spot the face appears, not the megapixel number on the box."
  - q: "Why does a 4MP camera fail to identify a face at 40 metres?"
    a: "With a typical wide lens, a 4MP camera's roughly 2,688 horizontal pixels can be spread across a view that is 60-70 metres wide at 40 metres' distance — around 40 pixels per metre. Identifying a stranger reliably generally needs well over 100 pixels per metre. At 40 pixels per metre, a face occupies only a few pixels across, which is not enough detail for a human reviewer or software to identify anyone."
  - q: "What is pixels per metre and why does it matter more than megapixels?"
    a: "Pixels per metre is the camera's horizontal pixel count divided by how wide its field of view is at a given distance. It tells you how much detail actually lands on a person standing at that spot, which is the number that determines whether a face, a plate or a badge is readable — not the total megapixel count printed on the camera."
  - q: "How can I get better identification range without buying a new camera?"
    a: "Fit a narrower lens (a longer focal length or a varifocal set to zoom in) on the same camera. Narrowing the field of view concentrates the same pixel count onto a smaller area, raising pixel density at distance — at the cost of covering less width, so you may need an extra camera to keep the rest of the area covered."
---

**Straight answer: a camera's megapixel rating tells you almost nothing about whether it can identify a face at a given distance. What matters is pixel density — how many pixels actually land on a person standing at that spot — and a 4MP camera with a wide lens can drop to around 40 pixels per metre at 40 metres, far too little to identify anyone.**

Every quote lists a megapixel number like it settles the question. It doesn't. Two 4MP cameras with different lenses can identify a face at 30 metres or fail completely at 10, depending on how their pixels are spread.

## Why does resolution alone not tell you the identification distance?

A sensor's pixels are fixed, but they get spread across whatever the lens shows. A wide lens shows more of the scene, so the same pixel count covers more ground and gets thinner the further out you look. A narrow lens shows less of the scene, so those same pixels are concentrated and stay useful further away.

This is why the honest question is never "how many megapixels" — it's "how many pixels per metre land on someone standing where I need to recognise them."

## What is pixels per metre, and how do you work it out?

Take the camera's horizontal pixel count and divide it by how wide its field of view is at the distance you care about. A camera with 2,688 horizontal pixels (a common 4MP sensor) and an 80-degree wide lens shows a view roughly 67 metres wide at 40 metres' distance. That's 2,688 ÷ 67 ≈ 40 pixels per metre — spread that thin, a person's face occupies only a few pixels across.

## Why does 4MP at 40 metres identify nobody?

Because 40 pixels per metre isn't close to enough. Surveillance engineers commonly reference published benchmarks (from standards such as EN 62676-4) as rough guidance: roughly 25 pixels per metre is enough to detect that a person is there, around 60 to observe general activity, around 125 to recognise someone you already know, and 250 or more to reliably identify a stranger you've never seen before. These are rules of thumb, not guarantees — actual results vary by algorithm and lighting — but they explain the pattern well. At 40 pixels per metre, you're barely past "detect." Nobody gets identified at that density, however sharp the camera's spec sheet claims it is.

Here's the same lens and sensor at different distances, so you can see how fast density falls off:

| Distance from camera | Approx. field of view width (80° lens) | Pixel density (4MP, 2,688px wide) | What that density supports |
|---|---|---|---|
| 5 m | 8 m | ~320 px/m | Identify a stranger |
| 10 m | 17 m | ~160 px/m | Identify, borderline |
| 20 m | 34 m | ~80 px/m | Recognise a known face |
| 40 m | 67 m | ~40 px/m | Detect presence only |
| 60 m | 101 m | ~27 px/m | Barely detect |

The camera didn't get worse. The distance did the damage.

## How do you actually get identification range further out?

Two honest options, and a trade-off either way.

**Fit a narrower lens.** A longer focal length, or a varifocal lens turned in, shows less width but keeps more pixels on each metre of it. This is usually the cheapest fix if you already own a decent sensor.

**Use a higher-resolution sensor.** More total pixels give you more to spread, so an 8MP camera on the same wide lens roughly doubles the pixel density at every distance compared to 4MP. This costs more per camera than swapping a lens.

The trade-off in both cases is coverage. A narrower lens or a longer zoom sees less width, so the area outside that narrower cone is now unwatched — you may need a second camera to cover what the first one gave up.

## Where does this go wrong in practice?

The most common mistake we see is a single wide camera bought to cover an entire gate or yard, expected to also identify faces or plates at the far end of that same view. One camera usually can't do both jobs well. The honest fix is to split the job: a wide camera for overview and motion, and a second, narrower one aimed at the exact point — a gate, a turnstile, a counter — where identification actually needs to happen.

We install and tune camera positions for exactly this reason, so we're not neutral on recommending it — but the pixel math above holds regardless of who sets the camera up. Work out the pixels-per-metre at your actual identification point before buying on megapixels alone.

[Ask for a free feasibility check](#dealer)
