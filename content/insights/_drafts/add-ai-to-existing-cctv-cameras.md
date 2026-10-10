---
title: "Add AI to existing CCTV: the compatibility checks that decide feasibility"
metaTitle: "Add AI to existing CCTV: 5 compatibility checks"
date: "2026-08-31"
updated: "2026-10-08"
category: "Buying Guide"
excerpt: "Whether analytics can use the cameras you already own is decided by five checks — stream, resolution on target, angle, network and processing capacity — not by the brand on the box. An annotated checklist you can run before any supplier visits."
metaDescription: "Existing CCTV can sometimes take AI analytics. Five checks decide it: stream access, pixels on target, angle, network and processing capacity."
readTime: 8
image: "/insights/covers/add-ai-to-existing-cctv-cameras.webp"
draft: true
reviewStatus: "Awaiting PGAK engineer review. Removed from the live version: 'almost every site we assess can reuse most of its estate', the 'typical reuse rate' column, the claim that most recorders sold in the last decade provide RTSP, and the implication that camera covering/blinding detection is available (camera-feed health is unverified in the capability register). The checklist thresholds are framed as questions to test, not as published PGAK specifications; an engineer should confirm the wording of the processor and network rows."
faqs:
  - q: "Can you add AI to existing CCTV cameras?"
    a: "Sometimes, and it has to be checked camera by camera. Analytics software reads a video stream from the camera or recorder, so the camera does not have to be sold as an AI camera. Whether a given camera is usable depends on whether an authorised stream can be read from that model and firmware, whether enough pixels land on the subject, whether the angle suits the task, and whether the network and processing hardware can carry the streams. A brand name alone does not settle any of these."
  - q: "Does AI analytics work with Hikvision, CP Plus and Dahua recorders?"
    a: "The brand does not establish compatibility. Two recorders with the same logo can behave differently depending on model, firmware, stream settings and network set-up. The check has to be done on your actual recorder and cameras, for the specific detection you want, before it is described as compatible."
  - q: "Do I need to buy new cameras to add AI?"
    a: "Not necessarily, but some positions may need a camera moved or added. Tasks that need to read something small, such as a face or a number plate, are the usual reasons, because they need the subject close, well lit and at a suitable angle. Any proposed new camera should come with a one-line reason for that specific position."
  - q: "What extra hardware is needed to add AI to existing CCTV?"
    a: "Detection has to run on something. With PGAK it runs on an on-site processing unit, sized to the number of streams and the analytics chosen. Network equipment or power backup may also be needed. Anything extra should be itemised in the quote after the assessment, not assumed to be zero."
---

**Straight answer: you can sometimes add AI analytics to cameras you already own, because the software reads the video stream rather than needing an "AI camera". Whether it works at your site is decided by five checks — can an authorised stream be read, do enough pixels land on the subject, is the angle right for the task, can the network carry the streams, and is there processing capacity to analyse them. The brand on the box decides none of these on its own.**

This question is usually asked defensively, by someone whose first quote proposed replacing every camera. Sometimes replacement is right. More often the honest answer is mixed: some cameras suit some tasks, a few positions need attention, and one or two cameras may not be usable at all. The checklist below is how to find out which.

## How does AI run on cameras that are not AI cameras?

Cameras send video to a DVR or NVR. Most of these can also hand the video out as a stream, commonly over RTSP and sometimes discovered through ONVIF. Analytics software subscribes to that stream and looks for the events you defined — a person in a zone after hours, a vehicle at a gate, an object crossing a line.

That software has to run on hardware. With PGAK, **detection runs on an on-site processing unit** at your premises. Camera suitability, stream access, processing hardware and network are confirmed at the assessment, and anything extra is itemised in the quote. The [compatibility page](/platform/compatibility) lists the information an assessment records.

## The five-point compatibility checklist

Run this per camera, or at least for the cameras that matter most. Each line has a short note on why it matters and how to check it without sharing any passwords.

| # | Check | Pass looks like | Why it decides feasibility | How you can check it yourself |
|---|---|---|---|---|
| 1 | **Stream** | An authorised RTSP or ONVIF stream can be opened for this channel, on this model and firmware | No stream, no analysis. Some cameras only talk to their maker's cloud app | Look in the recorder or camera settings for RTSP, ONVIF or stream port settings. Note the model and firmware version from the device information page |
| 2 | **Resolution on target** | The subject (person, vehicle, object) covers enough of the frame at the distance where the event happens | Megapixels on the box matter less than pixels on the subject | Pause recorded footage of a real person at the spot that matters. Is the person a clear shape or a few blurred pixels? |
| 3 | **Angle and light** | The view suits the task: side-on for a line, frontal and near eye level for faces, tight to the lane for plates; usable at night | A good camera pointed at the wrong place is unusable for that task | Review the camera's night footage at the hour that worries you, not daylight footage |
| 4 | **Network** | The recorder and processing unit are on a network with spare capacity for the extra streams, and the streams stay stable | Dropped or stuttering streams produce missed events | Note whether remote viewing freezes at busy times; note the switch and how the recorder is connected |
| 5 | **Processor** | Processing capacity is sized for the number of streams, their settings and the analytics chosen | One device cannot analyse unlimited streams; adding cameras later can exceed it | This one is for the supplier: ask how many streams the proposed device is sized for, at which resolution and frame rate |

Write down three things for each camera before anyone visits: **what you want it to notice** (a specific event, not "security"), **its model and firmware**, and **whether its night footage is usable**. That list is most of an assessment.

Two cautions while you do this. First, do not send passwords, RTSP addresses with credentials, or remote-access links to anyone over WhatsApp or a web form — agree a permissioned review process with named people instead. Second, "ONVIF" printed on a box is a starting point, not a result. A device can stream video over ONVIF and still not pass events or audio the same way, which the [ONVIF integration guide](/features/guides/onvif-integration) explains.

## Which tasks are fussy and which are not?

Different detections ask very different things of the picture. This is general industry guidance, not a PGAK test result; each task has to be tested on your own cameras.

| What you want detected | What the camera usually needs | Typical outcome on an existing estate |
|---|---|---|
| A person entering a zone after hours | The zone in view, person large enough to classify, usable night image | Often workable with existing positions; night image is the usual limit |
| Crossing a boundary line | The whole line in frame, ideally side-on | Often workable; some cameras need re-aiming |
| Counting objects or people across a line | A clear, uncluttered crossing point | Depends heavily on angle and crowding |
| Face matching | Near face height, close, frontal, lit from the front | Often needs a camera moved or added at the entry point |
| Number plates | Plate-height camera, tight angle to the lane, suitable shutter and lighting | Usually needs a dedicated camera |

The two fussy tasks are the ones that read something small and specific. For face tasks, read [how many of your cameras can actually recognise a face](/insights/how-many-of-your-cameras-can-actually-recognize-a-face); for placement generally, [where to place CCTV cameras for AI detection](/insights/where-to-place-cctv-cameras-for-ai-detection).

## What genuinely justifies a new camera?

- **A blind spot that matters.** No software can analyse an area nothing points at.
- **A face or plate task** at a position where no existing camera has the right height, distance and light.
- **A camera that fails the stream check** — for example a cloud-only model with no stream — or one that is physically failing.

Outside those, ask the supplier: *which of my existing cameras will you reuse, and for each one you will not, why not?* A supplier who has looked at the site can answer camera by camera.

## Limitations, and when not to retrofit

Retrofitting is not always the cheaper or better answer. If most cameras fail the angle or night check, if the recorder is unsupported and cannot provide stable streams, or if the site needs a full recabling anyway, a replacement project may cost less over five years. And if the real problem is coverage or lighting, fix that first — no analytics will.

Analytics also does not respond to anything. Someone has to receive the alert and act, which belongs in the plan before the purchase.

## Next step

To compare an integration project with a replacement project in rupees over a term you choose, use the [ONVIF and open integration calculator](/features/guides/onvif-integration#scenario-C24) with the two quotes you hold, or the standalone [retrofit versus replacement calculator](/calculators/retrofit-vs-replacement). For the five-year view, see [reuse or replace CCTV](/insights/reuse-existing-cctv-or-replace).

If you want the five checks run on your actual cameras, [ask for a site-specific assessment](/free-audit) — including which cameras we would not use, and why.
