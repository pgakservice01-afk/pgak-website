---
title: "PPE glove detection: what PGAK's demonstration proves"
metaTitle: "PPE glove detection: what a demo proves"
date: "2026-10-08"
category: "Buying Guide"
excerpt: "A 14-second clip of bare hands flagged on a chassis line is a real demonstration. It is not an accuracy figure. Here is what the clip shows, what it cannot show, and the test that would turn it into a measurement on your own line."
metaDescription: "PGAK's glove clip shows bare hands flagged on an existing line camera. It is not a measured accuracy. What it proves, and how to test your own line."
readTime: 6
draft: true
reviewStatus: "Awaiting PGAK engineer review. Check: the recording time 16:57 and the confidence values (0.75, 0.27) are taken from the /features/guides/ppe-detection caption and lib/proof/projects.ts; confirm they match the clip. Also confirm the table row \"the camera angle does not show faces\" — it is not in the evidence record. No legal claim is made."
faqs:
  - q: "Does PGAK's glove video prove the system is accurate?"
    a: "No. It shows that the detection ran on one existing overhead line camera on 1 April 2025 and flagged bare hands with a confidence score beside each box. Accuracy needs a counted test: a known number of gloved and bare-hand observations on your own cameras, with misses and false flags written down."
  - q: "What does the confidence number on the box mean?"
    a: "It is the model's own score for that one detection, shown so a person can judge it. In the clip one bare hand is flagged at 0.75 and another at 0.27. A score is not a probability that the detection is right, and what a given score means on your line is only known after you have tested it there."
  - q: "Can the same setup check helmets, vests or goggles?"
    a: "Not on the strength of this clip. It covers one PPE class, gloves. Which classes apply to your site, and whether your camera views can see them, is agreed at the assessment and then tested class by class before anything is relied on."
---

**Straight answer: PGAK's glove recording proves that bare-hand detection ran on a camera that was already fitted above a vehicle-chassis line, and that it put a box and a confidence score on each bare hand it found. It does not prove how often the system is right, how often it misses, or that it would work on your line. That needs a counted test on your own cameras, and the clip is the reason to run one, not a substitute for it.**

Safety managers are shown a lot of PPE videos. Most look convincing, because a demonstration is chosen to look convincing. The useful skill is reading a clip for what it actually establishes. This article does that for PGAK's own recording, and then sets out the test that would answer the question the clip cannot.

The clip plays on the [PPE detection guide](/features/guides/ppe-detection), and all PGAK's published material, with conditions and limits, is on the [evidence page](/resources/evidence).

## What does the recording actually show?

Everything in this table comes from the conditions published with the clip. Nothing has been added.

| Item | What is on record |
|---|---|
| Date and time | 1 April 2025, 16:57 |
| Length | 14 seconds |
| Camera | An existing overhead line camera. No camera was added for this. |
| Scene | A vehicle-chassis assembly line |
| PPE class | Gloves only, one class |
| What is flagged | Bare hands. The box is drawn on the hand, not the person. |
| Confidence shown | Two workers flagged, at 0.75 and 0.27 |
| Audio and faces | No audio track; the camera angle does not show faces |
| Status in PGAK's capability register | Limited pilot ([capabilities](/platform/capabilities)) |

Three things in that table matter more than the rest.

**The camera was already there.** The detection ran on an overhead view chosen for watching the line, not for PPE. That is the realistic case for most factories. It also means the result says nothing about a camera at a different height, angle or distance.

**The box is on the hand.** A system that boxes the whole person can only tell you a person is present. Boxing the hand means the model is looking at the thing the rule is about. When you assess any PPE product, check what the box is drawn around.

**The low score was left in.** A detection at 0.27 is shown on purpose. That is the kind of detection a supervisor should look at, not one a system should act on by itself. A vendor who hides low-confidence detections is showing you a cleaner picture than the system will give you.

## What does the clip not prove?

This is the heart of the matter. A demonstration and a measurement answer different questions.

| Question | Visible in the demonstration? | What would answer it |
|---|---|---|
| Can the model find a bare hand on an existing line camera? | Yes, on this camera, in this scene | Already shown |
| Does it show its own confidence? | Yes | Already shown |
| How many bare hands does it miss? | No | A counted test: known bare-hand observations, misses written down |
| How many gloved hands does it wrongly flag? | No | The same test, false flags written down |
| Does it work on your line, your gloves, your lighting? | No | The test repeated on your cameras |
| Does it work at night shift lighting? | No | The test repeated under night lighting |
| Does it check helmets, vests, goggles, shoes? | No, gloves only | Each class tested separately |
| Does it know which tasks need gloves? | No | A rule your safety team writes, by zone and task |
| Does a gloved hand mean the right glove, worn correctly? | No | Not a camera question; inspection and issue records |

If someone tells you a clip like this shows "high accuracy", ask them which row of the table they are answering.

## Why is a confidence score not an accuracy figure?

A confidence score belongs to one detection in one frame. It is the model's own score, and two models can score the same hand very differently. Accuracy belongs to a test: it needs a denominator, meaning a known number of real events, and a count of what the system did with them.

A simple way to hold the difference: 0.75 tells you the model was more sure about one hand than about the other. It does not tell you that three out of four such detections are correct. Only counting on your own footage tells you that. PGAK's [evaluation method](/resources/evaluation-method) sets out the same principle: agree the observation, record the conditions, keep a ground-truth log, and report the denominators.

## How do you turn a demonstration into a measurement?

Here is a test protocol you can run on one or two of your own line cameras. It takes planning more than equipment.

1. **Write the rule first.** For example: "On stations 3 to 6, both hands gloved while handling sheet metal." A camera cannot apply a rule nobody has written down, so the zone, the task and the PPE class all go into it.
2. **Pick the cameras and record their conditions.** Height, angle, distance to the hands, lighting by shift. Write them down before testing, not after.
3. **Collect a fixed sample.** Choose set periods across shifts, and have a person mark every hand observation in those periods as gloved or bare. This is your ground truth, and it is done without looking at the system's output.
4. **Run the detection over the same periods.** Note every flag.
5. **Count four numbers.** Bare hands correctly flagged, bare hands missed, gloved hands wrongly flagged, and gloved hands correctly left alone.
6. **Look at the misses, not just the totals.** Were they at one station, one shift, one glove colour? That tells you whether to move a camera or drop a zone.
7. **Decide what the alert is for.** A review queue for a supervisor, a daily summary, or nothing yet.

### Illustrative example

These numbers are invented and round, to show the arithmetic only.

Suppose a person marks 200 hand observations across three shifts, of which 40 are bare hands.

- The system flags 36 hands. Checking them, 30 were really bare and 6 were gloved.
- Bare hands caught: 30 of 40 = 30 ÷ 40 = 75%. So 10 of 40, or 25%, were missed.
- Flags that were wrong: 6 of 36 = 6 ÷ 36 ≈ 17%, about one flag in six.

Whether 25% missed is acceptable is a decision for your safety team, not a number a vendor should choose for you. What matters is that you now have figures for your line, with their denominators, instead of an impression from a clip.

## When is glove detection the wrong tool?

- **When the problem is supply, not habit.** If gloves run out mid-shift, a camera only records the shortage.
- **When the camera cannot see the hands.** A station where hands work inside a fixture or behind a guard will produce misses whatever the software.
- **When gloves are not wanted.** Some tasks, such as work near rotating parts, may call for no gloves at all. Your safety team defines that by task; the rule has to reflect it.
- **When nobody will review the flags.** PPE detection supports supervision. It does not replace it, and it should never drive automatic penalties or pay deductions. A flag is a prompt for a person to look.

## What is the next step?

Work out how much supervisor review time a flagged queue would really save, using your own sample sizes, in the [PPE detection calculator](/features/guides/ppe-detection#scenario-C14). It estimates review effort only and puts no value on injuries. Other estimates are on the [calculators page](/calculators).

If you want to know whether your own line cameras can see hands well enough to test, [ask for a site-specific assessment](/free-audit).
