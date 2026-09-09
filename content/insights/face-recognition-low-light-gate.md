---
title: "Face recognition at a badly lit gate"
date: "2026-09-09"
category: "Camera Setup"
excerpt: "A gate camera that works fine all day suddenly stops recognising the same employees after dark. The fix is usually a ₹200 lamp, not a new camera."
readTime: 4
faqs:
  - q: "Does face recognition work in low light?"
    a: "Poorly, and it is worth separating two different jobs. Detecting that a person is present works fine in low light because infrared sensors are built for exactly that. Identifying which specific person it is needs far more detail — skin tone, contrast and fine facial features — which infrared footage does not preserve well. That is why a gate camera can 'see' someone perfectly at night and still fail to recognise them."
  - q: "Can infrared cameras be used for face recognition?"
    a: "Infrared is excellent for detecting movement and presence in the dark, but it flattens the contrast a face-matching algorithm depends on. Faces come out as pale, similar-looking ovals with washed-out detail, which is why IR-only footage is reliable for motion and person detection but weak for identification."
  - q: "What is the cheapest fix for face recognition at a dark gate?"
    a: "In most cases, one warm-white light aimed correctly at the point where people's faces pass, not a new camera. A camera upgrade to a low-light-optimised sensor can cost many times more than a single fixture, and often solves less of the problem if the light hitting the face is still wrong."
  - q: "Where should gate lighting be placed for face recognition to work?"
    a: "In front of or beside the walking path, angled onto the face, and away from the lens. Light placed behind the person creates a silhouette the camera cannot read. Light aimed straight into the lens causes glare and washes out the very detail you need."
  - q: "Will better lighting guarantee face recognition works at night?"
    a: "No. Lighting fixes the most common night-time failure, but a camera mounted too high, a subject looking away, or fast walking through the frame will still cause misses. Lighting removes one large obstacle, not every obstacle."
---

**Straight answer: face recognition struggles at badly lit gates because infrared light — the thing that lets a camera "see" at night — is good at showing that someone is there but bad at capturing the facial detail needed to say who. The fix in most cases is not a better camera. It's putting the right kind of light on the right spot.**

If your gate camera flags every person walking through at 9 PM but can't match a single one of them to an employee record, this is almost always what's happening.

## Why does face recognition fail at night when the camera clearly sees the person?

Two different jobs get confused. **Detection** — noticing that a human-shaped object is in frame — works fine in the dark because infrared sensors are built for low light. **Identification** — matching that face against a known person — needs much finer detail: skin tone variation, the contrast between eyebrows and skin, the shadow under the nose. Infrared footage compresses all of that into flat grey tones.

So the camera isn't broken. It's doing detection well and identification badly, because those two tasks need different kinds of light.

## Can infrared cameras be used for face recognition?

Only partway. IR floods the scene evenly and reflects off skin in a way that removes the natural contrast a face-matching algorithm relies on. Faces on IR footage tend to look like pale, similar ovals — enough for a human reviewer to confirm "yes, a person walked through," not enough for software to tell two similarly built people apart. This is a real limitation of the physics, not a flaw in any one vendor's algorithm.

## What actually fixes this — a new camera or a light?

Usually a light. A single warm-white fixture placed to illuminate faces at the point people pass — not the whole yard — restores the contrast infrared throws away, and it typically costs a small fraction of a low-light camera upgrade. We've seen sites spend on a "starlight" or ultra-low-light camera before trying a ₹150 fixture that solved the same problem in an evening.

That doesn't mean cameras never need upgrading — a genuinely underpowered sensor in a very dark tunnel entrance may need one. But check the cheaper fix first.

## Where should the light actually go?

Placement matters more than brightness.

- **In front of the face, not behind it.** A light behind the walking person creates a silhouette — the classic problem of a bright doorway making everyone entering it a black shape.
- **Angled down onto the path, not into the lens.** A light aimed at the camera itself causes glare and blooms out the detail you're trying to capture.
- **At head height, roughly matching the camera's mounting height.** A light aimed at the ground lights shoes, not faces.
- **Warm white, not raw IR floodlight.** IR floodlights help detection but do nothing extra for identification, since the camera is already using infrared at night.

A five-minute test after installing: walk through at the time of day you're fixing for and check whether your own face is recognisable in the review footage, not just present in it.

## What won't lighting fix?

Be honest about the limits. Good lighting removes the single biggest cause of night-time misses, but it doesn't fix a camera mounted too high and shooting down at the top of people's heads, someone walking past at an angle rather than facing the camera, or fast-moving crowds during a shift change. Those need camera positioning and enrolment quality fixes, which is a separate problem from lighting.

We build face-recognition attendance software that depends on gates being lit and positioned correctly, so we have a stake in recommending this — but the physics here doesn't change depending on who's selling you a camera. Fix the light first. It's the cheapest test you can run before spending on hardware.

[Ask for a free feasibility check](#dealer)
