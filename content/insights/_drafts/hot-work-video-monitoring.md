---
title: "Hot-work monitoring with video: how to build a supervised pilot"
metaTitle: "Hot-work monitoring with CCTV: a supervised pilot"
date: "2026-10-08"
category: "Camera Setup"
excerpt: "A camera can flag grinding or welding happening near flammable material. It cannot tell whether a permit was issued, how far the sparks travel, or whether a fire has started. How to pilot it with people in charge."
metaDescription: "Video can flag hot work beside flammable material. It cannot check permits or detect fire. How to run a supervised pilot with clear escalation steps."
readTime: 7
draft: true
reviewStatus: "Awaiting PGAK engineer review. The clip is PGAK's own test setup; camera model, working distance and confidence are still pending and are stated as pending. Check that the escalation template does not conflict with any customer's existing permit-to-work procedure wording. No legal or regulatory claim is made; whether hot-work permits are legally required at a given site is deliberately not stated."
faqs:
  - q: "Can a camera tell whether a hot-work permit was issued?"
    a: "No. A camera can flag that hot work is happening and that flammable material is in the same view. It has no way to know whether a permit exists, whether the area was cleared, or whether a fire watch is posted. A person has to check the permit when an alert arrives."
  - q: "Is hot-work detection a form of fire detection?"
    a: "No. It detects an activity and a material class appearing together. It does not detect smoke or flame, does not measure distance between the sparks and the material, and is not a fire detection or suppression system. Your fire alarms, extinguishers and fire watch stay exactly as they are."
  - q: "Has PGAK shown hot-work detection at a customer site?"
    a: "No. PGAK's published recording is from its own test setup, recorded 18 February 2025. The camera model, working distance and confidence figures are still pending. A customer-site test, with those details recorded, is what moves it beyond a demonstration."
---

**Straight answer: video analytics can flag hot work, such as grinding or welding, happening in the same camera view as flammable material, and send that to a person to check. It cannot see a permit, measure how far sparks reach, or detect a fire. A sensible pilot keeps your permit system, fire watch and supervision exactly as they are, and tests whether an alert reaches the right person fast enough to be useful.**

Hot-work permits exist because a grinder throwing sparks is ordinary, drums of solvent on a pallet are ordinary, and the two together are not. Supervisors cannot be beside every job. The question a video pilot can answer is narrow: when hot work starts near flammable material in a camera's view, does a responsible person get told, and do they act?

## What does PGAK's hot-work recording show?

The clip plays on the [industrial CCTV page](/industrial-cctv) and is listed with its conditions on the [evidence page](/resources/evidence).

| Item | What is on record |
|---|---|
| Where | PGAK's own test setup. Not a customer site. |
| Date and time | Burned-in overlay: 18 February 2025, 15:24:40, Camera 01 |
| Length | 11 seconds |
| View | One fixed, elevated camera, daylight |
| What happens | A man in a hard hat runs an angle grinder along a pipe; sparks carry several metres across the floor |
| Detections | One box labelled hot work around the grinding; a second labelled flammable material around three drums on a pallet, two carrying flammable hazard diamonds |
| Pending | Camera model, working distance and detection confidence are not yet recorded and are not estimated |
| Status | Limited pilot in PGAK's [capability register](/platform/capabilities) |

Neither detection matters on its own. Plants run grinders all day, and drums sit on pallets all day. What a safety officer wants to know is that both are in the same frame at the same moment.

What the clip does not show: how the detection behaves on your cameras, at night, at longer distances, with welding rather than grinding, with material the model has not been shown, or with the flammable store only partly in view. Those are what a pilot is for.

## What can a camera know, and what can it not?

This is the boundary every pilot has to be built around.

| Question | Can video answer it? | Who answers it instead |
|---|---|---|
| Is hot work happening in this view? | Yes, within the classes and views tested | — |
| Is flammable material visible in the same view? | Yes, for material types it has been shown | — |
| Was a permit issued for this job? | No | The permit issuer, from the permit register |
| Was the area cleared or the material covered? | No, not reliably | The permit issuer's pre-job check |
| How far is the work from the material? | No, it does not measure distance | The person on site |
| Is a fire watch posted? | No | The supervisor |
| Has a fire started? | No | Fire alarms, fire watch, people |
| Is hot work happening outside the camera's view? | No | Permits and supervision |

If a proposal blurs any row from "No" into "Yes", ask to see it tested.

## How to run a supervised pilot

### 1. Choose the places

Pick two or three locations where hot work and flammable material genuinely meet: a maintenance bay near a solvent store, a fabrication area beside a paint line. Check that an existing camera sees both the work area and the material. [Where to place cameras for AI detection](/insights/where-to-place-cctv-cameras-for-ai-detection) explains why a wide yard view is usually too far away.

### 2. Name the people

Before anything is switched on, write down who receives the alert on each shift, who can stop the job, and who closes the record. An alert without a named person is a notification nobody owns.

### 3. Set the escalation steps

This is the original asset of the pilot: a short, fixed sequence that keeps a person in charge.

| Step | Who | Action | Record |
|---|---|---|---|
| 1. Alert received | Shift supervisor | Opens the clip and confirms whether hot work and flammable material are both really present | Time alert received; time opened; true or false alert |
| 2. Permit check | Shift supervisor or permit issuer | Checks the permit register for this location and time | Permit number, or "no permit found" |
| 3. If no permit, or conditions do not match the permit | Supervisor | Goes to the location, or calls someone already there, and stops the work under your existing procedure | Time someone reached the job; outcome |
| 4. If permit is in order | Supervisor | Confirms the precautions on the permit are visibly in place; no further action | Note of what was checked |
| 5. Close-out | Safety officer | Reviews the day's alerts, true and false, and any gaps found | Daily review sheet |

The camera never stops a job. A person does, under the procedure you already have.

### 4. Keep everything else unchanged

The pilot runs alongside your permit system, fire watch, extinguishers, alarms and supervision. It does not reduce any of them, and nothing about it should be described to staff as a replacement.

### 5. Log what happens

For each alert, keep the times above. Also stage a few known hot-work jobs in view, with a permit, so you know the system had a real event to find. After the pilot, count:

- known hot-work jobs in view, and how many produced an alert;
- alerts that turned out to be false (a welding reflection, a lit work lamp);
- the time from alert to a person looking, and from alert to a person on site.

### Illustrative example

These numbers are invented and round, to show the arithmetic only.

Over a four-week pilot, the maintenance team logs 20 permitted hot-work jobs in view of the two pilot cameras.

- Jobs that produced an alert: 16 of 20 = 16 ÷ 20 = 80%. Four were missed; the clips show three of them were at the edge of the frame.
- Total alerts: 25. True: 16. False: 9. So 9 ÷ 25 = 36% of alerts were false.
- Median time from alert to supervisor opening the clip: 4 minutes on day shift, 15 minutes at night.

That result does not tell you the system "works". It tells you the camera position needs moving, the false alerts need tuning, and the night-shift alert route is too slow to matter. Each of those is fixable or a reason to stop, and you know which.

## When is video hot-work monitoring the wrong answer?

- **When the permit system itself is weak.** If permits are signed after the job, fix that first; a camera will only record the gap.
- **When hot work moves around the site.** Portable jobs in changing locations will mostly be outside fixed camera views.
- **When nobody can respond in time.** If the nearest supervisor is ten minutes away, the alert becomes an after-the-event record.
- **When the material is not visible.** Solvent in a closed cabinet or behind a wall is not something a camera can relate to the work.

## What is the next step?

The [hot-work monitoring calculator](/platform/capabilities#scenario-C30) estimates how many minutes of permit review a flagged queue might save, minus the follow-up time it adds. It estimates review effort only; it puts no value on injuries and does not suggest fewer supervisors. More estimates are on the [calculators page](/calculators).

To check whether your existing plant cameras see both the work and the material, [ask for a site-specific assessment](/free-audit).
