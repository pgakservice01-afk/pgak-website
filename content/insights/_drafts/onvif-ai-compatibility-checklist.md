---
title: "ONVIF does not mean every AI function is compatible"
metaTitle: "ONVIF camera compatibility: a per-model checklist"
date: "2026-10-08"
category: "Buying Guide"
excerpt: "“ONVIF supported” on a box tells you very little about whether a camera will stream reliably to analytics, pass its events, take PTZ commands or keep working after a firmware update. A per-model checklist does."
metaDescription: "ONVIF is a set of profiles, each covering different functions. Check profile, firmware, stream, events and credentials per camera model before buying AI."
readTime: 8
draft: true
reviewStatus: "Awaiting PGAK engineer review. ONVIF profile descriptions, the Profile S deprecation (last conformance submissions 31 March 2027, username-token authentication as the reason, Profile T as the recommended successor, existing conformant products remain interoperable), Profile Q deprecation (1 April 2022), Profile V release-candidate status and the firmware-specific nature of conformance were checked on onvif.org on 8 October 2026. Engineer to confirm the statement that on some devices the ONVIF account is configured separately from the web login, and that PGAK's processing unit reads streams by RTSP/ONVIF media as described."
faqs:
  - q: "Does ONVIF support mean every AI function will work with my camera?"
    a: "No. ONVIF is a family of profiles, each covering different functions — streaming, recording, analytics metadata, access control. A camera can conform to one and not another, and only registered products are ONVIF conformant, for the specific firmware version listed. Check the profiles and firmware for your exact model, then test the functions you need."
  - q: "ONVIF Profile S is being phased out. Do I need to replace my Profile S cameras?"
    a: "Not because of that alone. ONVIF says existing Profile S conformant products remain interoperable with other Profile S products; what ends is new conformance submissions after 31 March 2027. The reason given is that Profile S mandates username-token authentication, which ONVIF no longer considers adequate, so check whether your cameras' firmware offers a stronger method and plan new purchases around Profile T."
  - q: "Which ONVIF profile does a camera need for AI video analytics?"
    a: "If the analytics run on a separate processing unit, the camera mainly needs to deliver a stable video stream at a suitable resolution — the streaming profiles, S or T. Profile M matters when you want the camera's own analytics events and metadata used by another system. PTZ control, audio and on-camera recording are separate functions to check individually."
---

**Straight answer: ONVIF is not one thing a camera either has or lacks. It is a family of profiles — S and T for streaming, G for recording on the device, M for analytics metadata and events, and others for access control — and a camera may conform to some and not others, for one firmware version and not the next. For AI analytics on existing cameras, what matters is whether each model, at its current firmware, delivers a stable stream, passes the events and controls you need, and accepts a properly limited account. Check that per model, then test the oldest models first.**

Most established sites have a mix: a few cameras from 2018, more added after an incident, a recorder from whoever was cheapest that year. Open interfaces such as ONVIF are what make a mixed estate usable by new software. The word on the box is where the checking starts, not where it ends.

## What is ONVIF, exactly?

ONVIF is an industry forum that publishes interface specifications for security products, grouped into **profiles**. Each profile defines a set of functions that a conformant device and a conformant client (such as video management or analytics software) both support.

Two points from onvif.org, checked on 8 October 2026, change how you should read a datasheet:

- Only products registered as conformant to a profile count as ONVIF conformant. “ONVIF compatible” or “supports ONVIF” in a brochure is not the same claim.
- Conformance is tied to a specific firmware or software version. The [conformant products database](https://www.onvif.org/conformant-products/) lists the version; if your camera runs a different one, its conformance is not established.

## Which profile covers what?

Summarised from the profile pages on [onvif.org](https://www.onvif.org/profiles/), checked 8 October 2026:

| Profile | What it is for | Notes for AI on existing cameras |
|---|---|---|
| S | Basic video streaming and configuration; covers PTZ control, audio in, multicast and relay outputs where the device supports them | Deprecation in process: last date for new conformance submissions is 31 March 2027 |
| T | Advanced video streaming: H.264 and H.265, imaging settings, motion alarm and tampering events, metadata streaming, bi-directional audio; HTTPS streaming, PTZ configuration and others where supported | ONVIF's recommended successor to Profile S |
| G | Edge storage and retrieval: configuring, requesting and controlling recording on the device | Relevant if footage sits on a camera's own storage |
| M | Analytics: metadata configuration and streaming, generic object classification, event interfaces for object counting, face and number-plate recognition, events over MQTT, rule configuration | Relevant if you want the camera's own analytics events used elsewhere |
| A, C, D | Access control functions | Relevant to door and reader integration, not video streams |
| V | Cloud-based video surveillance (video surveillance as a service) | Release candidate |
| Q | — | Deprecated as of 1 April 2022 |

### Why Profile S is being phased out

According to ONVIF's Profile S deprecation Q&A, the profile mandates username-token authentication, which ONVIF no longer considers consistent with current cybersecurity recommendations. ONVIF recommends Profile T, which contains almost all of Profile S's features, and states that existing Profile S conformant products remain interoperable with each other. For a buyer, that means: no need to rip out Profile S cameras on this account, but check what authentication your firmware offers, and favour Profile T in new purchases.

## Why ONVIF alone does not settle AI compatibility

- **The stream is what analytics use.** When analytics run on a separate on-site processing unit, the camera must deliver a stream — usually over RTSP — at a resolution and frame rate that put enough pixels on the subject. Sub-streams are often too small for detection; main streams may strain the network. The [existing cameras article](/insights/add-ai-to-existing-cctv-cameras) explains the pixels question.
- **Recorders change the picture.** If streams are taken from a DVR or NVR rather than the camera, the recorder's own interface and settings apply. See [DVR or NVR: which do you have](/insights/dvr-vs-nvr-which-do-you-have).
- **Events are a separate question.** A camera that streams over ONVIF may not pass its own motion, tamper or analytics events the same way. Profile T covers motion and tamper events; Profile M covers analytics events and metadata.
- **PTZ, audio and recording are separate again.** Each is a function to check on its own.
- **Some functions only exist in the manufacturer's own interface.** That can be fine, but the proposal should name it, because it ties you to that manufacturer's software support.
- **Firmware changes things.** An update can add, remove or break functions.

A brand name settles none of this. The model, the firmware and the stream do — which is why PGAK's [compatibility page](/platform/compatibility) treats each tested configuration separately.

## The per-model checklist

Fill one copy in for each camera **model** on site (not each camera). Start with the two or three oldest models, where surprises usually are.

### A. Identity

| Item | Record |
|---|---|
| Manufacturer and exact model number | |
| Hardware version | |
| Firmware version (from the device, not the invoice) | |
| Connected directly to the network, or only through a DVR/NVR? | |
| Number of cameras of this model on site | |

### B. Conformance

| Check | How | Record |
|---|---|---|
| Listed in the ONVIF conformant products database? | Search by manufacturer and model on onvif.org | Yes / No |
| Profiles listed | From the database entry | S / T / G / M / other |
| Firmware version listed matches yours? | Compare with section A | Yes / No |

### C. Functions needed, mapped to what to check

| Function you want | What to confirm | Tested? | Result |
|---|---|---|---|
| Video stream for analytics on the processing unit | Stream available (S or T media, or RTSP); resolution, codec, frame rate and bitrate of main and sub-stream | | |
| H.265 stream | Profile T or vendor documentation | | |
| Motion or tamper events from the camera | Profile T events received by a test client | | |
| Camera's own analytics events or metadata | Profile M or a named vendor interface | | |
| PTZ control for tracking | PTZ supported for this model; commands obeyed in a test | | |
| Audio in or two-way audio | Supported on this model; test both directions | | |
| Recording on the camera's own storage | Profile G or vendor interface | | |
| Clock sync | Time server set; clock correct after a power cut | | |

### D. Stream stability

| Check | Pass when |
|---|---|
| Stream runs for 24 hours under normal network load | No drops, or drops logged and recovered |
| Power-cycle the camera | Stream returns without manual action |
| Restart the recorder (if streams come via it) | Stream returns without manual action |
| Night mode switch | Stream continues through the change |

### E. Credentials and access

| Check | Pass when |
|---|---|
| A dedicated account is created for the integration, on site, by whoever administers the cameras | Not the admin account; not shared with people |
| Lowest permission level that still allows the needed functions | Recorded, and tested at that level |
| Default passwords changed on every device | Confirmed |
| Authentication method in use | Record it; prefer the stronger method the firmware offers |
| Where the ONVIF account is configured | On some devices it is separate from the web login — check yours |
| How credentials are handled | Entered on site; never sent by WhatsApp, email or a web form |
| Unused services | Disabled after testing |

### F. Sign-off

| Item | Record |
|---|---|
| Date tested | |
| Tested by | |
| Client or software used for the test | |
| Functions confirmed working | |
| Functions not available, and the fallback | |

## How does this feed the reuse-or-replace decision?

Once the checklist shows which models work for which functions, the money question is straightforward: compare the cost of integrating what works (plus replacing what does not) with replacing everything.

**Illustrative example** (hypothetical quotes): replacement project capital ₹2,00,000; integration project capital ₹80,000; the integration option costs ₹1,000 a month more to run; comparison over 36 months.

term difference = replacement capital − integration capital − months × extra monthly cost = ₹2,00,000 − ₹80,000 − 36 × ₹1,000 = ₹84,000 in favour of integration on these inputs

Both capital figures are quotes you supply. The [reuse or replace article](/insights/reuse-existing-cctv-or-replace) covers the non-financial tests, and the [retrofit vs replacement calculator](/calculators/retrofit-vs-replacement) runs the comparison in more detail.

## When ONVIF is beside the point

- **Consumer Wi-Fi cameras.** Many do not offer ONVIF at all; some offer an RTSP stream. See [Tapo, Imou, Qubo and Prama](/insights/does-ai-work-with-tapo-imou-qubo-cameras).
- **Analogue cameras on a DVR.** The camera has no network interface; the DVR's stream is what counts.
- **The picture is unsuitable.** A perfectly conformant camera pointing at the wrong place, or too far away, is still the wrong camera.

## Next step

Run the comparison in the [ONVIF and open integration calculator](/features/guides/onvif-integration#scenario-C24), and read the [ONVIF feature guide](/features/guides/onvif-integration) for the short version.

ONVIF integration is an industry capability that PGAK can evaluate at your site. PGAK reuses compatible cameras a site already owns, and detection runs on an on-site processing unit; camera suitability, stream access, processing hardware and network are confirmed at the assessment, per model and firmware, and anything extra is itemised in the quote. To have this checklist filled in for your own estate, [ask for a site-specific assessment](/free-audit).
