---
title: "How much bandwidth does remote CCTV viewing use?"
metaTitle: "Remote CCTV bandwidth: how to calculate what you need"
date: "2026-10-08"
category: "Camera Setup"
excerpt: "Remote viewing, playback, alert clips and cloud recording each use your site's upload in very different amounts. A concurrent-stream calculation shows what your connection must carry at the busiest moment, and what it adds up to in a month."
metaDescription: "Remote CCTV uses your site's upload: streams × bitrate at the busiest moment. Worked figures for sub-stream viewing, playback, alert clips and cloud."
readTime: 8
draft: true
reviewStatus: "Awaiting PGAK engineer review. All bitrates are illustrative and labelled as such. Check: the statement that many apps use the sub-stream for multi-camera views and switch to the main stream for single-camera view (common, not universal); the advice against port-forwarding recorders. No PGAK bandwidth figures are claimed."
faqs:
  - q: "How much internet speed do I need to view CCTV remotely?"
    a: "Add up the bitrate of every stream that will leave the site at the same time. Four cameras viewed on a phone using 0.5 Mbps sub-streams need about 2 Mbps of upload at your site while they are open. Sixteen cameras on 4 Mbps main streams would need 64 Mbps. Read your own bitrates from the recorder, then add headroom of around 30% for other traffic."
  - q: "Is it upload or download speed that matters for CCTV?"
    a: "At the camera site it is upload, because the video leaves the site. The person watching needs enough download on their phone or office connection. Many speed tests and plans quote download first, so check the upload figure, measured from the recorder's network at the busiest time of day."
  - q: "How much data does remote CCTV use in a month?"
    a: "It depends on how long streams are open. Four 0.5 Mbps sub-streams watched for 30 minutes a day use about 0.45 GB a day, or 13.5 GB a month. Uploading sixteen cameras continuously at 2 Mbps each to a cloud service uses about 345.6 GB a day, over 10 TB a month. Viewing is small; continuous upload is not."
  - q: "Why does my CCTV app buffer when I view many cameras?"
    a: "Usually because the streams together need more upload than the site has spare, or the app has switched to main streams. Use the sub-stream for multi-camera views, open fewer cameras at once, and check whether someone else is using the connection heavily at the same time."
---

**Straight answer: remote CCTV uses your site's upload, and the amount at any moment is simply the number of streams leaving the site × each stream's bitrate. Watching four cameras on a phone at 0.5 Mbps each needs about 2 Mbps of upload; opening sixteen cameras on their 4 Mbps main streams needs 64 Mbps. Over a month, occasional viewing and alert clips add up to tens of gigabytes. Continuous upload to a cloud service runs to terabytes. Size the link for the busiest moment, not the average.**

When a CCTV app buffers, the usual assumption is that the internet is slow. Often it is simply being asked to carry more than it can at that moment, because of how many cameras are open, which stream they use and what else is on the line.

## What uses bandwidth when you view CCTV remotely?

Four kinds of traffic leave a site, and they behave very differently.

**Live viewing.** Each camera you open sends a stream to your phone or computer for as long as it is open. Most cameras offer a **main stream** (full resolution, for recording) and a **sub-stream** (lower resolution, for grids and phones). Many apps use the sub-stream for multi-camera views and switch to the main stream when you expand one camera. That switch can multiply the load several times over.

**Playback and downloads.** Reviewing or downloading recorded footage remotely sends recorded video, usually at main-stream bitrate.

**Alert clips and snapshots.** If a system sends short clips or images when it detects something, each one is a small burst.

**Continuous upload.** Cloud recording or cloud-based analytics sends every camera's video off site all the time. This is the one that dominates the bill.

With on-site processing, analysis happens at the site and only events and clips need to leave it. [Does AI CCTV work without internet?](/insights/does-ai-cctv-work-without-internet) explains why that matters when the link drops.

## The concurrent-stream calculation

Two formulas cover everything:

> **Upload needed at a moment (Mbps) = Σ (streams open × bitrate of each)**
>
> **Data used (GB) = Mbps × seconds ÷ 8 ÷ 1,000**, which for a day of continuous use is **10.8 × Mbps**, and for a given number of hours is **0.45 × Mbps × hours**

Then size the link for the busiest moment plus headroom. The [bandwidth and cloud cost calculator](/calculators/bandwidth-and-cloud-cost) applies headroom to the link size only, never to the data total, and that is the right way round. Headroom is spare capacity, not traffic.

### Illustrative example — one 16-camera site

All figures are round and hypothetical. Read the real bitrates for your cameras from the recorder's stream settings. Assumptions: main stream **4 Mbps**, sub-stream **0.5 Mbps**, recording-grade clip bitrate **2 Mbps**.

| Activity | Streams × bitrate | Upload while running | Data used |
|---|---|---|---|
| Owner watches 4 cameras on a phone, sub-stream, 30 min a day | 4 × 0.5 | **2 Mbps** | 2 × 1,800 s ÷ 8 ÷ 1,000 = 0.45 GB/day → **13.5 GB/month** |
| Someone opens all 16 cameras, sub-stream grid | 16 × 0.5 | **8 Mbps** | — |
| Someone opens all 16 on main streams | 16 × 4 | **64 Mbps** | — |
| Downloading a 10-minute clip from one camera | 1 × 4 | **4 Mbps** (or whatever is spare) | 4 × 600 ÷ 8 = **300 MB** |
| 40 alert clips a day, 15 seconds each | 1 × 2, in bursts | **2 Mbps** per clip | 40 × 15 × 2 ÷ 8 = 150 MB/day → **4.5 GB/month** |
| Continuous cloud upload of all 16 at 2 Mbps | 16 × 2 | **32 Mbps**, all day | 10.8 × 32 = 345.6 GB/day → **≈ 10.4 TB/month** |

### Sizing the link for the busiest moment

Say the realistic busiest moment is two people each watching four cameras on sub-streams while an alert clip is being sent:

- Viewing: 2 people × 4 cameras × 0.5 Mbps = **4 Mbps**
- Alert clip: **2 Mbps**
- Total: **6 Mbps**
- With 30% headroom: 6 × 1.3 = **7.8 Mbps of upload**, on top of whatever else the site uses at that time (billing, email, video calls).

If anyone at that moment expands a camera to its main stream, add 3.5 Mbps (4 − 0.5) for each. If the site also uploads continuously to a cloud service, add that 32 Mbps on top. That one line changes the size of connection you need.

## How do you find your own numbers?

1. **Bitrates.** In the recorder's or camera's stream settings, note the main-stream and sub-stream bitrate for each camera. Where bitrate is variable, sample the live readout at a busy time and at night; infrared night scenes are often higher.
2. **Upload available.** Run a speed test from a computer on the same network as the recorder, at the busiest time of day, and note the **upload** figure. Repeat on a couple of days.
3. **Who views, how and when.** List the people who view remotely, how many cameras they open and whether they use grids or full screen.
4. **Continuous uploads.** Ask whether any camera or service sends video off site continuously. Cloud-connected cameras sometimes do this without anyone remembering they were set up that way.

Put the figures into the formula, or into the bandwidth calculator, and compare the busiest-moment total with the measured upload.

## What reduces the load without losing what you need?

- **Use sub-streams for grids and phones.** Set the sub-stream to a resolution and bitrate that is legible on a phone, and keep the main stream for recording.
- **Open fewer cameras at once.** Watch the cameras that matter, not a sixteen-tile wall on a 6-inch screen.
- **Download clips at quiet times,** or review them on the local network if you are on site.
- **Prefer event clips to continuous upload** where the purpose is to be told when something happens, rather than to keep a full off-site copy.
- **Keep an off-site copy only of what needs one.** If insurance or policy requires an off-site record, it may not need every camera at full bitrate.

## Limitations and safety

These are averages. Variable-bitrate cameras spike when a scene gets busy, and mobile networks vary through the day. A link that tests fine at noon may struggle in the evening. Measure at the time you actually view.

Bandwidth is also not the only remote-viewing issue. Do **not** open the recorder to the internet by forwarding ports on the router. Use the manufacturer's official app, a VPN set up by someone you trust, or a supplier's secured remote-access method. Change default passwords, and do not share recorder logins or stream addresses over WhatsApp or by email.

## When remote viewing is not the right answer

If the goal is to *respond* to something at night, watching streams on a phone does not do that. It needs someone to be told and someone local who can act. And if the site's upload genuinely cannot carry the viewing you need, fixing what is viewed and when is usually cheaper than a bigger connection.

## Next step

If remote viewing is meant to replace trips to the site, the [Remote and multi-site viewing calculator](/remote-cctv-monitoring#scenario-C27) weighs the visits saved against the remote review time added, and the [multi-site travel calculator](/calculators/multi-site-travel) does the same on its own. [Remote CCTV monitoring](/remote-cctv-monitoring) covers how remote monitoring is set up. If you would like your bitrates and upload measured on site and the busiest-moment figure worked out for you, [ask for a site-specific assessment](/free-audit).
