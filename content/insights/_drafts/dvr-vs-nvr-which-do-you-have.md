---
title: "DVR or NVR: identify your recorder before you upgrade"
metaTitle: "DVR vs NVR: identify your recorder before upgrading"
date: "2026-09-10"
updated: "2026-10-08"
category: "Camera Setup"
excerpt: "Most owners can't say whether their recorder is a DVR, an NVR or a hybrid, and it matters the day you want to add analytics. A connector checklist and the stream and export questions to ask before anyone quotes."
metaDescription: "A DVR records coax cameras, an NVR records IP cameras, a hybrid does both. A connector checklist and stream questions to answer before any upgrade."
readTime: 7
image: "/insights/category/camera-setup.webp"
draft: true
reviewStatus: "Awaiting PGAK engineer review. Check: connector descriptions (BNC on DVRs, PoE RJ45 on PoE NVRs) and the ONVIF profile summary (S = streaming, G = recording, T = advanced streaming incl. H.265) against current ONVIF documentation. Removed from the live version: the unsupported claim that most DVRs from the last five to six years output RTSP, and the incorrect 'RCA sockets' description of DVR inputs."
faqs:
  - q: "What is the difference between a DVR and an NVR?"
    a: "A DVR takes video from analogue or HD-analogue cameras over coaxial cable and digitises it inside the recorder. An NVR receives video that IP cameras have already digitised and sends over network cable. A hybrid recorder (often sold as an XVR or HVR) accepts both. The cameras you own decide which recorder you need."
  - q: "How can I tell if I have a DVR or an NVR?"
    a: "Look at the back of the recorder. A row of round BNC connectors, the twist-lock type, means camera inputs on coaxial cable, so it is a DVR or a hybrid. A row of network ports, often marked PoE, means an NVR that powers IP cameras directly. If there is only one network port and no BNC connectors, it is an NVR whose cameras connect through a separate switch. The model number on the label settles it."
  - q: "Can AI video analytics work with a DVR?"
    a: "Sometimes. Analytics needs a live stream it can read, either from the cameras or from the recorder. Many current DVRs and NVRs list RTSP or ONVIF support, but whether yours provides a stable, usable stream depends on its model and firmware, and that has to be tested. If it cannot, adding IP cameras only where analytics matters is usually cheaper than replacing everything."
  - q: "Should I replace my DVR with an NVR?"
    a: "Not automatically. If your analogue cameras give a usable picture at the distances you need and the DVR provides a stream, replacing everything mainly buys a newer label. Replacement earns its cost when you need detail the cameras cannot deliver, you are rewiring anyway, or the recorder cannot provide a usable stream and the positions that matter are many."
---

**Straight answer: a DVR records analogue or HD-analogue cameras on coaxial cable; an NVR records IP cameras on network cable; a hybrid recorder takes both. The back panel tells you which: round twist-lock BNC connectors mean coax camera inputs, and a row of network ports usually means an NVR. Before you add analytics, the recorder's name matters less than two questions: can it give out a stable live stream, and can you export footage in a form other people can play?**

Most owners do not know which box the installer fitted five years ago, and there was no reason to until now. The two look alike and do the same basic job. The difference shows up when you want to add analytics, change cameras or hand footage to someone outside the business.

## How do you identify your recorder? A connector checklist

Do this with the recorder powered on and nothing unplugged. You are only looking.

| What you see | What it means | What to note down |
|---|---|---|
| A row of **round twist-lock (BNC) connectors**, one per camera, at the back | Coaxial camera inputs. A **DVR**, or a hybrid. | Number of BNC inputs (4, 8, 16…) |
| BNC inputs **and** a label or model name with XVR, HVR or "hybrid" | A **hybrid** that also accepts some IP cameras | How many IP channels it allows |
| A row of **RJ45 network ports**, often marked PoE, one per camera | A **PoE NVR**: IP cameras plug straight in and get power from it | Number of PoE ports and total PoE budget, from the label or datasheet |
| **One** network port, no BNC inputs | An **NVR** whose cameras connect through a separate network switch | Where the switch is, and how many cameras are on it |
| One network port **plus** BNC inputs | Still a DVR: the network port is for remote viewing, not cameras | — |
| Round coax cable at the camera end, often with a thin power cable beside it | Analogue or HD-analogue camera (HD-TVI, AHD or HD-CVI) | Camera model from the label on the camera |
| A single network cable at the camera end | IP camera, usually powered over that cable | Camera model and whether it is PoE |
| A small box at the camera turning coax into a network cable, or the reverse | A **converter or encoder** is in the chain | Its model, because it can limit the stream |

Then open the recorder's **System Information** (or "Device Info") screen and write down the **model number, firmware version and channel count**. Model and firmware matter more than brand. Two recorders from the same brand can behave differently, and a brand name does not tell you whether analytics will work.

## Does the difference matter for adding analytics?

Analytics software works on a live video stream. It does not matter whether that stream started as analogue or IP. What matters is whether something on your network will give a clean, stable stream to a processing unit, and at what quality.

Most NVRs and IP cameras are built to stream over the network. Many DVRs also list RTSP or ONVIF support, but in practice a DVR's stream can be limited: lower resolution, fewer simultaneous connections, or a stream that drops when someone is playing back footage at the same time. Some recorders only allow access through the manufacturer's own app or cloud service. A firmware update will not change that.

So the honest first step is not "replace the DVR". It is "find out what this exact model and firmware can provide", and that means testing it, not reading the box. On [our compatibility page](/platform/compatibility) we explain why a brand or an ONVIF label is not proof of compatibility.

## The stream and export questions to answer before any upgrade

Ask these of your installer, or work through them yourself in the recorder's menus. Write the answers down. They are what any analytics or upgrade supplier, PGAK included, will need at an assessment.

**Stream access**

1. **Does the recorder list RTSP and/or ONVIF in its network settings?** If ONVIF, which profile? Profile S covers basic streaming. Profile T adds things like H.265 support. Profile G covers recording and playback. A recorder listing a profile is a starting point, not proof.
2. **For each camera, what are the main stream and sub-stream settings?** Note the codec (H.264, H.265, or a "+" smart codec), resolution, frame rate and bitrate. Analytics may use either stream, and the sub-stream is often far lower in resolution.
3. **How many simultaneous stream connections can the recorder serve** without its own recording or remote viewing suffering? The datasheet sometimes states an outgoing bandwidth limit. If not, it has to be tested.
4. **Can you make a separate user account with view-only rights** for stream access, rather than sharing the admin login? You should, whoever is connecting.
5. **Is the recorder on the local network,** or reachable only through a manufacturer's cloud or peer-to-peer app? A processing unit on site needs local network access.
6. **Is the recorder's clock set automatically (NTP) and correct?** Wrong timestamps cause trouble for both evidence and alerts.

**Export**

7. **What format does an exported clip come out in?** Standard MP4 or AVI that plays on any computer, or a proprietary file that needs the manufacturer's player?
8. **Does the export keep the camera name, date and time,** and can you export a specific time window from several cameras at once?
9. **How long does exporting one hour of one camera take,** to a USB drive and over the network? Find out now, not on the day police or an insurer ask for it.

**Upgrade headroom**

10. **On a hybrid, how many IP channels are allowed,** and at what maximum resolution?
11. **On a PoE NVR, what is the total PoE power budget,** and how much is in use? Cameras with infrared draw more at night.
12. **Where does firmware come from?** Only from the manufacturer's official site or your installer. Note the current version before anyone changes it.

**One rule throughout:** do not send the recorder's password, its stream addresses or footage to anyone over WhatsApp, email or a web form, including to us. Stream access is set up and tested on site with a dedicated account you control.

## What if your DVR cannot provide a usable stream?

You have three realistic paths:

- **Replace the recorder and cameras.** It makes sense when the cameras are also at the end of their life, or you need detail they cannot deliver.
- **Add IP cameras only at the positions that need analytics:** the main gate, the cash counter, the loading bay. Leave the analogue system recording everything else. It is usually cheaper. The trade-off is two systems to look after.
- **Add an encoder** that turns specific analogue feeds into IP streams. It is worth testing, but encoder support for each HD-analogue standard varies by model, and image quality is capped by the original camera.

The [retrofit versus replacement calculator](/calculators/retrofit-vs-replacement) puts those options side by side over the years you expect to keep the system. If you are still unsure what is on the walls, [IP or analogue: what an AI retrofit needs](/insights/ip-vs-analogue-cameras-india) covers the camera side.

## Where this checklist does not help

It cannot tell you whether a camera's picture is good enough for the job: whether a face or a number plate is legible at the distance it needs to be. That is a separate test at the actual position, covered in [camera resolution versus distance](/insights/camera-resolution-vs-distance). A perfect stream of a badly placed camera is still a badly placed camera.

## Next step

The [ONVIF and open integration calculator](/features/guides/onvif-integration#scenario-C24) compares the up-front cost of replacing the system with integrating what you have, and the [ONVIF integration guide](/features/guides/onvif-integration) explains what open integration can and cannot promise. If you would like the recorder and streams checked on site, with the model and firmware recorded, [ask for a site-specific assessment](/free-audit).
