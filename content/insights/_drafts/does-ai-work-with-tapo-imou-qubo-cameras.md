---
title: "Can Tapo, Imou and Qubo cameras work with video analytics?"
metaTitle: "Do Tapo, Imou and Qubo cameras work with AI analytics?"
date: "2026-09-14"
updated: "2026-10-08"
category: "Camera Setup"
excerpt: "Home Wi-Fi cameras can sometimes feed video analytics, but it is decided model by model and firmware by firmware, not by brand. What the makers state, checked on 8 October 2026, and a verification table to fill in for your own cameras."
metaDescription: "Wi-Fi cameras like Tapo, Imou or Qubo work with analytics only if your model and firmware give a usable stream. What makers state, and how to check yours."
readTime: 7
image: "/insights/category/camera-setup.webp"
draft: true
reviewStatus: "Awaiting PGAK engineer review. UNRESOLVED: the live version said PGAK had tested Tapo, Prama and Qubo directly; there is no PGAK evidence record for those tests, so the claim is removed. If PGAK holds dated test records (model, firmware, date, result), they should be added to the capability register first and can then be cited model by model. Tapo statements verified on TP-Link's own support pages on 8 October 2026 (FAQ 4465, last updated 1 July 2026; FAQ 2790, last updated 6 May 2026). No Imou, Qubo or Prama manufacturer documentation on stream support could be verified today; third-party sources conflict, so no brand-level statement is made for them. Removed the Hikvision/Dahua stream-path strings (not verified on a manufacturer page today)."
faqs:
  - q: "Do Tapo cameras work with video analytics software?"
    a: "Some can. TP-Link's own support page (last updated 1 July 2026) says most Tapo cameras, excluding battery-powered models, support RTSP and ONVIF Profile S, with named exceptions. A separate camera account must be created in the Tapo app; it is a different login from your TP-Link ID. Whether a particular camera is usable for a particular detection still has to be tested on that model and firmware."
  - q: "Do Imou and Qubo cameras work with video analytics?"
    a: "It depends on the model and firmware, and we could not verify a manufacturer statement for either brand on 8 October 2026. Check your camera's settings for an RTSP or ONVIF option. If the maker's app is the only way to see the video, third-party analytics cannot read it."
  - q: "Can battery-powered Wi-Fi cameras be used for AI analytics?"
    a: "Usually not. Battery cameras sleep between events to save power, so there is no continuous stream to analyse. TP-Link names a few battery models that can provide RTSP only when hardwired with an always-on mode enabled. Mains-powered cameras are the realistic candidates."
---

**Straight answer: a home Wi-Fi camera such as a Tapo, Imou or Qubo can feed video analytics only if your exact model and firmware provide a stream that third-party software can open — usually RTSP or ONVIF — and if the picture suits the task. That is decided model by model, not brand by brand. TP-Link documents RTSP and ONVIF for most mains-powered Tapo cameras; for Imou and Qubo we could not verify a manufacturer statement today, so check your own unit.**

This question usually comes from a shop owner or a small unit that bought Wi-Fi cameras for a phone app and now wants alerts. It deserves a technical answer, not a sales one — including the cases where the answer is no.

## What does analytics software need from a camera?

A continuous video stream it is authorised to open. The common standards are **RTSP** (the stream itself) and **ONVIF** (a standard way for software to find and control the camera). If your camera offers neither, nothing outside the maker's own app can read its video — not PGAK, not a recorder, not any other software.

Then the stream has to be good enough for the job. A Wi-Fi camera indoors at a shop counter may be fine for "a person behind the counter after closing"; the same camera may be too far or too dark to tell anything useful at a gate. And Wi-Fi itself drops — a stream that stutters produces missed events.

## What do the manufacturers state? (checked 8 October 2026)

| Brand | What the maker's own documentation says | Source and date |
|---|---|---|
| **Tapo (TP-Link)** | Most Tapo cameras, **excluding battery-powered models**, support RTSP and ONVIF Profile S. Stream addresses take the form `rtsp://CAMERA-IP:554/stream1` (high quality) and `/stream2` (low quality). ONVIF service port 2020. Battery models D235, D225 and TD25 support RTSP only when hardwired with "always-on" mode; C410 and C420 do not support RTSP. Only two of Tapo Care, SD-card recording and NVR/NAS/ONVIF software can run at once | [TP-Link FAQ 4465](https://www.tp-link.com/ph/support/faq/4465), last updated 1 July 2026 |
| **Tapo camera account** | A separate login from your TP-Link ID, used for third-party platforms. Created in the Tapo app: camera → Live View → settings → Advanced Settings → Camera Account | [TP-Link FAQ 2790](https://www.tp-link.com/support/faq/2790/), last updated 6 May 2026 |
| **Imou** | Not verified — no Imou support page on stream access found today; third-party sources disagree | — |
| **Qubo** | Not verified — no Qubo support page on stream access found today | — |

Two practical points from the Tapo documentation are easy to miss. First, the **camera account is not your app login** — software asking for credentials needs the camera account. Second, if Tapo Care and SD-card recording are both on, adding a third-party stream may require turning one of them off.

A brand table is a starting point, not a verdict. Makers change firmware, rename features and drop options between models. The verification has to be done on your units.

## The model-and-firmware verification table

Fill this in for each camera you want analysed. It is the record that turns "it should work" into "it was checked". Date every row; a result is valid for that model and firmware, not the brand.

| Camera position | Brand and exact model | Firmware version | Power: mains or battery | RTSP/ONVIF option in settings? | Stream opened? (date, by whom) | Stable over 24 hours? | Task tested and result |
|---|---|---|---|---|---|---|---|
| e.g. Shop counter | | | | | | | |
| e.g. Back door | | | | | | | |
| e.g. Godown | | | | | | | |

How to fill in each column without sharing any passwords:

1. **Model and firmware** — in the maker's app under device information or settings. Write the exact model code, not the product name.
2. **Power** — battery cameras are unlikely candidates; note them and move on.
3. **RTSP/ONVIF option** — look in the camera's advanced settings for RTSP, ONVIF, camera account or stream port (554 is common for RTSP). If none exists anywhere, the camera is app-only.
4. **Stream opened** — leave this to whoever does the assessment, on site and with your permission. Do not send passwords, stream addresses with credentials or remote-access links over WhatsApp, email or a web form.
5. **Stable over 24 hours** — Wi-Fi cameras can drop at night or when the router is busy. A stream that disconnects every few hours will miss events.
6. **Task tested** — the specific detection you want from that camera, tried at the time of day it matters.

## When is a Wi-Fi camera the wrong camera?

- **It is battery-powered** and has no hardwired always-on option.
- **It is app-only**, with no RTSP or ONVIF setting on your model.
- **The Wi-Fi signal is weak** where it is mounted, so the stream drops.
- **The task needs detail it cannot give** — a face at a gate or a number plate. Those need cameras positioned for the purpose; see [how many of your cameras can actually recognise a face](/insights/how-many-of-your-cameras-can-actually-recognize-a-face).

In those cases a wired camera, or a different position, is usually the honest answer. If you are buying new and want the option of analytics later, check the manual of the exact model for RTSP or ONVIF support before buying. The [IP versus analogue guide](/insights/ip-vs-analogue-cameras-india) covers the wider choice.

## Limitations

Even with a working stream, a Wi-Fi camera is a consumer device: wireless links, small sensors and limited night performance all affect detection. Any analytics on it should be judged by a short test on that camera at the hour that matters, not by the box or this article.

## Next step

To compare keeping and integrating existing cameras against replacing them, use the [ONVIF and open integration calculator](/features/guides/onvif-integration#scenario-C24) with your quotes, or the [retrofit versus replacement calculator](/calculators/retrofit-vs-replacement). The [ONVIF integration guide](/features/guides/onvif-integration) explains why "ONVIF" on a box does not guarantee every function, and the [compatibility page](/platform/compatibility) lists what a proper check records.

With PGAK, compatible cameras are confirmed per model, firmware and stream at the assessment, and detection runs on an on-site processing unit. If you want your cameras checked that way, [ask for a site-specific assessment](/free-audit).
