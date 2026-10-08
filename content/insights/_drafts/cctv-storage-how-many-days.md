---
title: "How many days can your CCTV store? Work it out from bitrate and disk size"
metaTitle: "How many days can CCTV store? Bitrate × disk size"
date: "2026-09-10"
updated: "2026-10-08"
category: "Camera Setup"
excerpt: "The retention figure from the installation quote usually shrinks as cameras get added and nobody redoes the sum. Worked examples for 4, 8 and 16 cameras show how to find your real number."
metaDescription: "Retention in days = usable disk ÷ what all cameras write per day. Worked decimal-TB examples for 4, 8 and 16 cameras, with bitrate and schedule stated."
readTime: 7
image: "/insights/covers/cctv-storage-how-many-days.webp"
draft: true
reviewStatus: "Awaiting PGAK engineer review. Check: the 90% usable-capacity assumption used in the worked examples (recorders differ; the calculator lets the reader set it); the statement that recorders display capacity in binary units (true of many, not all). No PGAK claims beyond the verified list."
faqs:
  - q: "How do you calculate CCTV storage in days?"
    a: "Add up the bitrate of every camera in Mbps, multiply by 10.8 to get decimal gigabytes per day for continuous recording, then divide the recorder's usable storage in gigabytes by that daily figure. Eight cameras at 2 Mbps each make 16 Mbps, about 172.8 GB a day; on 3,600 GB of usable space that is about 20 days. Use the bitrate your recorder reports, not a figure guessed from megapixels."
  - q: "Why does CCTV retention shrink over time?"
    a: "Storage is bought once, but cameras are added later and resolutions get raised. Each change adds to what is written per day while the disk stays the same size, so retention falls without anyone touching a retention setting. Adding four cameras to an eight-camera system that kept about 20 days takes it to about 14."
  - q: "Does H.265 halve CCTV storage?"
    a: "Not reliably. H.265 often writes less than H.264 for a similar picture, but the saving depends on the camera, the scene, night-time noise and the bitrate settings. Under constant bitrate it saves nothing at all, because the camera writes the bitrate you set. Measure both on your own cameras before planning disks around a saving."
  - q: "How many days of CCTV footage should a business keep?"
    a: "Long enough to cover the delay between an incident and someone asking for the footage — a dispute, a stock reconciliation, a reported loss. Many small businesses aim for somewhere between 15 and 30 days for that reason. Whether a law, licence, insurer or client contract sets a minimum for your premises is a separate question to confirm with your adviser."
---

**Straight answer: retention in days = the recorder's usable storage ÷ what all your cameras write per day. For continuous recording, decimal gigabytes per day ≈ 10.8 × the combined bitrate of every camera in Mbps. Eight cameras at 2 Mbps each write about 172.8 GB a day, so 3,600 GB of usable space holds about 20 days. The figure in your installation quote was true for the cameras and settings of that day; it is not true after cameras are added or settings change.**

Ask an owner how many days of footage the system keeps and the answer is usually the number from the installation quote. Ask when it was last checked and the answer is usually never. You only find out the real figure on the day you need footage from three weeks ago.

## What two numbers do you need?

**Usable storage.** The disks in the recorder, in decimal gigabytes (1 TB = 1,000 GB), less whatever the recorder cannot use for footage. Two things eat into the label figure:

- Many recorders show capacity in binary units, so a disk sold as 4 TB (4,000,000,000,000 bytes) appears as about 3.6 "TB" on screen. Nothing is missing; it is a different unit.
- Some space goes to the file system and to anything the recorder reserves. In the examples below we assume **90% of the decimal label capacity is usable for footage**. Read your recorder's own figure and use that instead. If disks are mirrored (RAID), usable space falls further — the storage calculator keeps that as a separate input.

**What every camera writes per day.** This is the figure that moves. For continuous recording:

> decimal GB per day = Mbps × 86,400 seconds ÷ 8 bits per byte ÷ 1,000 ≈ **10.8 × Mbps**

For a camera recording only part of the day on a schedule, use **0.45 × Mbps × hours recorded**. (0.45 × 24 = 10.8, so it is the same rule.)

Read the bitrate from the recorder — most show it per channel in the stream or channel-status screen — over a busy period and a night period. Do not guess it from megapixels or the codec. The same camera at the same resolution can write very different amounts depending on the scene, the frame rate, night-time noise and whether bitrate is constant or variable.

## Worked examples: 4, 8 and 16 cameras

**Illustrative example — inputs are round, hypothetical figures, not a recommendation.** Assumptions: every camera averages **2 Mbps**, recording is **continuous, 24 hours a day**, and **90% of the disk label capacity is usable**.

| Cameras | Combined bitrate | Written per day | Usable space for 30 days | Disk label size needed (÷ 0.9) | Retention on the disk shown |
|---|---|---|---|---|---|
| 4 | 4 × 2 = 8 Mbps | 10.8 × 8 = 86.4 GB | 86.4 × 30 = 2,592 GB (2.59 TB) | 2.88 TB | 2 TB disk: 1,800 ÷ 86.4 ≈ 20 days |
| 8 | 8 × 2 = 16 Mbps | 10.8 × 16 = 172.8 GB | 172.8 × 30 = 5,184 GB (5.18 TB) | 5.76 TB | 4 TB disk: 3,600 ÷ 172.8 ≈ 20 days |
| 16 | 16 × 2 = 32 Mbps | 10.8 × 32 = 345.6 GB | 345.6 × 30 = 10,368 GB (10.37 TB) | 11.52 TB | 8 TB of disks: 7,200 ÷ 345.6 ≈ 20 days |

Each row keeps about 20 days for the same reason: the disk grew in step with the camera count. The usual problem is the opposite. Cameras get added and the disk stays the same.

### What happens to the 8-camera site when things change

Same 4 TB disk (3,600 GB usable), same assumptions unless stated.

| Change | Daily write | Retention |
|---|---|---|
| As installed: 8 cameras at 2 Mbps, 24 hours | 172.8 GB | 3,600 ÷ 172.8 ≈ **20.8 days** |
| Four cameras added, nothing else changed: 12 × 2 = 24 Mbps | 10.8 × 24 = 259.2 GB | 3,600 ÷ 259.2 ≈ **13.9 days** |
| Bitrate raised to 4 Mbps on all 8 (e.g. higher resolution): 32 Mbps | 10.8 × 32 = 345.6 GB | 3,600 ÷ 345.6 ≈ **10.4 days** |
| 4 outdoor cameras 24 hours; 4 indoor cameras scheduled 10 hours (09:00–19:00) | 86.4 + (0.45 × 8 × 10) = 86.4 + 36 = 122.4 GB | 3,600 ÷ 122.4 ≈ **29.4 days** |

The last row is the cheapest fix most sites never consider. An office or store room that is locked at night may not need 24-hour recording. That is a decision for the owner, though. If anything can happen in a room at night, record it at night.

### Motion-only recording

Motion recording stretches retention, but by how much depends on how much of the day each camera writes. A busy loading bay may write most of the day; an empty store room very little. Measure it. Note the free space, or the oldest recording date, now and again a week later, then work back to GB per day. Do not plan disks around an assumed percentage.

## Does H.265 halve storage?

Sometimes it saves a lot, sometimes little, and under constant bitrate (CBR) it saves nothing, because the camera writes the bitrate you set whatever the codec. The saving depends on the scene, the night-time noise and the bitrate mode. If you are counting on H.265 to rescue retention, record a day in each codec on the same cameras and compare. Proprietary "smart" codec modes are a separate test, because some decoders and analytics software handle them differently.

## Does adding AI analytics change how much you store?

With on-site processing, generally not by much. The processing unit reads the live stream from the cameras or recorder and the recorder carries on recording as before. Event records and short alert clips add something, and how much depends on the system and how many events it raises. The [edge AI processing guide](/features/guides/edge-ai) explains where that processing happens. Two things to confirm at an assessment: whether pulling extra streams from the recorder affects its own recording, and where event clips are kept and for how long.

Cloud recording is different. Every camera then sends continuous video off site, which is a bandwidth and monthly-cost question, not a disk question.

## How many days should you keep?

There is no single right number. As a practical benchmark, many small businesses aim for 15 to 30 days, because that covers the usual delay between an incident and someone asking to see it: a customer dispute, a monthly stock count, a loss reported late. Sites whose reconciliations run monthly or quarterly need more. Whether a law, licence condition, insurer or client contract sets a minimum for your premises is a separate question. Confirm it with your adviser rather than with a blog post, this one included.

## What should you check today?

1. Open the recorder's storage or HDD screen. Note the disk capacity, its status and, if shown, the estimated retention.
2. Play back the **oldest** footage on three cameras: one busy, one quiet, one outdoors at night. The oldest date you can play is your real retention. It beats any estimate.
3. Note each camera's current bitrate and put the figures through the arithmetic above, or straight into the [CCTV storage calculator](/calculators/cctv-storage).
4. If the number is short, compare the two fixes: add disk capacity, or review whether every camera needs its current resolution, frame rate and 24-hour schedule. Often you need some of both.

## Where this arithmetic stops being enough

The formula gives an average. Recorders handle peaks, overwrite and disk faults in their own ways. A failing disk can also cut retention to zero without changing any of the numbers above, which is why the playback check matters more than the calculation. If a camera has quietly stopped recording, the [guide to knowing when a camera stops recording](/insights/cctv-camera-offline-how-to-know) covers how to test for it.

## Next step

If you are weighing on-site processing against a cloud service, the [Edge AI processing calculator](/features/guides/edge-ai#scenario-C05) compares their monthly and up-front costs. The [storage and bandwidth worksheet](/resources/storage-bandwidth) shows the same formula with its assumptions stated. If you would like someone to read the figures from your own recorder and camera settings, [ask for a site-specific assessment](/free-audit).
