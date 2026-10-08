---
title: "IP or analogue CCTV: what an AI retrofit actually needs"
metaTitle: "IP vs analogue CCTV: what an AI retrofit needs"
date: "2026-09-11"
updated: "2026-10-08"
category: "Buying Guide"
excerpt: "Analytics reads a video stream, not a camera label. Three ways an existing IP or analogue system can feed a processing unit, what each needs, and where each one breaks."
metaDescription: "IP and analogue both can feed AI analytics if a usable stream reaches the processing unit. Three retrofit topologies, what each needs and where each fails."
readTime: 7
image: "/insights/category/buying-guide-3.webp"
draft: true
reviewStatus: "Awaiting PGAK engineer review. Check: encoder support for HD-TVI/AHD/HD-CVI varies by model (stated generally, no models named); whether passively splitting an HD-analogue signal is ever advised (the draft advises against assuming it); camera simultaneous-stream limits stated generally. Removed from the live version: the claim that IP cabling 'cuts the cabling run in half'."
faqs:
  - q: "What is the difference between IP and analogue CCTV cameras?"
    a: "An IP camera turns the picture into a digital stream inside the camera and sends it over network cable, usually with power on the same cable (PoE). An analogue or HD-analogue camera sends its signal over coaxial cable to a DVR, which does the digitising, with power usually on a separate cable. IP generally offers more resolution options and simpler expansion; analogue is often cheaper per camera and can reuse coax that is already in the walls."
  - q: "Can analogue cameras run AI analytics?"
    a: "They can if a usable stream reaches the processing unit, either from the DVR's network stream or through an encoder that turns a coax feed into an IP stream. Whether your DVR's stream is stable and detailed enough is a test, not an assumption. Analogue image quality also sets a ceiling no software can lift."
  - q: "Should I upgrade my analogue CCTV to IP before adding AI?"
    a: "Only where the picture at a specific position is not good enough for the job, or the recorder cannot provide a usable stream. For many sites, upgrading the few positions that need analytics and leaving the rest of the analogue estate in place costs less than replacing everything."
  - q: "Which is cheaper in India, IP or analogue?"
    a: "Camera for camera, analogue hardware is often cheaper, and reusing sound coax avoids rewiring. On a new site, IP can come out close or cheaper overall because one cable carries both video and power. The total depends on cable runs, labour and how many cameras you will add later, so compare itemised quotes for your layout rather than a rule of thumb."
---

**Straight answer: for an AI retrofit the question is not "IP or analogue" but "how does a clean, stable video stream reach the processing unit?" There are three common routes: straight from IP cameras, through an encoder that turns analogue feeds into IP streams, or from the recorder's own stream output. Each works on some sites and fails on others. IP gives the most direct route and the most resolution headroom, but a sound analogue system with a recorder that gives a usable stream is not locked out.**

Quotes in the market tend to push IP as the upgrade. Sometimes that is right. Often a site needs better cameras at three positions, not a new system at forty.

## What is the real difference between IP and analogue?

An **IP camera** encodes the picture inside the camera and sends a digital stream over network cable (usually Cat6), often with power on the same cable (Power over Ethernet, PoE). An **analogue or HD-analogue camera** (HD-TVI, AHD or HD-CVI) sends its signal over coaxial cable to a **DVR**, which does the digitising, and usually needs a separate power run.

From that one difference come the rest:

- **Resolution.** HD-analogue cameras now offer several megapixels, but IP models offer more resolutions and lens options, and the stream is digital from the start.
- **Cabling.** Coax already in the walls can often be reused. A new IP run carries video and power on one cable, but PoE needs a properly calculated switch power budget (see [where installers cut corners on cabling](/insights/cctv-cabling-corner-cutting)).
- **Streams.** An IP camera usually offers its own main stream and sub-stream directly. An analogue camera has no network stream of its own; anything on the network comes from the DVR or an encoder.

## How can video reach a processing unit? Three topologies

PGAK runs detection on an on-site processing unit, and other on-site analytics products work the same way: the unit has to subscribe to a live stream. Here are the three ways that happens. The camera model, firmware, stream, network and processing hardware are confirmed at an assessment for whichever route fits your site.

### Topology A — direct from IP cameras

```
IP camera ──Cat6──► PoE switch ──► NVR (records)
                        │
                        └────────► processing unit
                                   (reads camera stream)
```

The processing unit reads each camera's stream directly, and the NVR records as before.

- **Needs:** IP cameras that allow an extra stream connection; a network path from the switch to the processing unit; a view-only account on each camera.
- **Strengths:** the best picture available from each camera; the recorder is not in the way; you can choose the main stream or the sub-stream for each camera.
- **Where it breaks:** cameras limit how many simultaneous stream connections they allow; the switch or uplink can be overloaded; cameras on a separate network segment need routing set up properly.

### Topology B — analogue camera through an encoder

```
Analogue camera ──coax──► encoder ──Cat6──► switch
                                              │
                          processing unit ◄───┘
```

An encoder turns a coax feed into an IP stream for chosen positions.

- **Needs:** an encoder that supports your camera's analogue standard and resolution, and a plan for recording that camera, because the feed now goes into the encoder instead of the DVR.
- **Strengths:** keeps an existing camera and its cable at one important position; no new camera mount or cable run.
- **Where it breaks:** encoder support for HD-TVI, AHD and HD-CVI varies by model. The picture is capped by the original camera. Splitting one coax feed to both the DVR and an encoder is not reliable with HD-analogue signals, so do not assume it will work.

### Topology C — from the recorder's stream output

```
Cameras (IP or analogue) ──► DVR / NVR (records)
                                  │ network stream
                                  ▼
                            processing unit
```

The recorder passes on each channel's stream, often over RTSP or ONVIF.

- **Needs:** a recorder whose model and firmware give a stable stream per channel; enough outgoing capacity on the recorder; a view-only account.
- **Strengths:** no change at the cameras; works with analogue and IP cameras alike; the quickest to test.
- **Where it breaks:** some recorders offer only a reduced-resolution stream, or only through the manufacturer's app. The recorder becomes a single point of failure for both recording and analytics. Heavy playback or remote viewing can starve the outgoing streams.

### Comparing the three

| | A: direct IP | B: encoder | C: recorder stream |
|---|---|---|---|
| Changes at the camera | None if IP already | Encoder per position | None |
| Picture quality ceiling | The IP camera | The analogue camera | Whatever the recorder passes on |
| Main dependency | Camera stream limits | Encoder compatibility | Recorder model and firmware |
| If the recorder fails | Analytics continues | Depends on design | Analytics stops too |
| First thing to test | Extra stream accepted? | Encoder supports the standard? | Stable stream at the resolution needed? |

Many sites end up with a mix: Topology C for most cameras, and one or two new IP cameras (Topology A) at the gate or loading bay where detail matters most.

## Which one costs less?

Camera for camera, analogue hardware is often cheaper, and reusing sound coax avoids the biggest cost in any rewiring job: labour. On a new site, IP can come out close or cheaper overall because one cable carries both power and video. There is no honest rule of thumb. Compare itemised quotes for your actual cable runs, and include the cameras you expect to add over the next few years. The [retrofit versus replacement calculator](/calculators/retrofit-vs-replacement) lays the options side by side over the same period.

## When does upgrading from analogue to IP make sense?

- **A position needs detail the current camera cannot give,** such as a face at a gate or a plate at the weighbridge. Upgrade that position. Check the arithmetic first in [camera resolution versus distance](/insights/camera-resolution-vs-distance).
- **The recorder cannot provide a usable stream** and many positions need analytics.
- **You are rewiring anyway,** or building a new site.

Outside those, replacing a working analogue system mostly buys a newer label.

## What are the honest limitations on each side?

IP is less forgiving of cabling mistakes. A badly terminated Cat6 run or an under-sized PoE switch causes dropouts that come and go, which are harder to trace than a fuzzy analogue picture. Analogue eventually runs out of resolution and channels on a site that keeps growing. Neither fixes bad placement, missing light at night or a recorder nobody maintains. And no route works until someone has confirmed the exact model and firmware. As our [compatibility page](/platform/compatibility) puts it, a brand name or an ONVIF label is not evidence.

To find out what your recorder is before choosing a route, start with [DVR or NVR: identify your recorder](/insights/dvr-vs-nvr-which-do-you-have).

## Next step

The [ONVIF and open integration calculator](/features/guides/onvif-integration#scenario-C24) compares replacement capital with an integration project over a term you choose, and the [ONVIF integration guide](/features/guides/onvif-integration) explains what open standards do and do not guarantee. If you would like the three routes tested against your own cameras and recorder, [ask for a site-specific assessment](/free-audit).
