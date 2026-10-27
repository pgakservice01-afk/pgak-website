---
title: "How many days does CCTV record? Storage tables for 4, 8 and 16 cameras"
metaTitle: "CCTV Storage Days: 4, 8 & 16 Camera Examples"
date: "2026-09-10"
category: "Camera Setup"
image: "/insights/covers/cctv-storage-how-many-days.webp"
updated: "2026-10-27"
excerpt: "Calculate CCTV recording days from usable disk space and bitrate. Compare 4, 8 and 16 cameras, check your oldest footage and plan storage."
metaDescription: "Calculate CCTV recording days from usable disk space and bitrate. Compare 4, 8 and 16 cameras, check your oldest footage and plan storage."
---

**CCTV has no fixed recording duration. Divide usable storage by the amount all cameras record each day.** At a constant 2 Mbps per camera, eight cameras use about 172.8 GB a day: 2 TB of usable recording space lasts approximately 11.6 days before overhead. A recorder sold with a 2 TB drive can have less than 2 TB available for video.

The practical question is whether you can retrieve the footage your business needs when a dispute, stock discrepancy or incident is reported. Check the oldest playable recording, not only the number on an installation quote.

## How do you calculate CCTV storage in days?

For continuous recording, using decimal units:

**Daily storage in GB = total recording bitrate in Mbps × 10.8.**

**Recording days = usable storage in GB ÷ daily storage in GB.**

The factor 10.8 converts megabits per second into gigabytes over 86,400 seconds. Add the bitrates of the streams actually being recorded. Include audio and other recorded data where applicable. Disk reserves, filesystem overhead and variable bitrate can reduce the result.

Use the [CCTV storage calculator](/calculators/cctv-storage) with your own figures, or see the [storage and bandwidth guide](/resources/storage-bandwidth) for the distinction between recording and remote-viewing bandwidth.

## How long will 1 TB, 2 TB or 4 TB last?

These are **illustrative calculations**, not camera specifications or a retention guarantee. Every camera records continuously at a constant 2 Mbps; storage is usable decimal capacity; audio and overhead are excluded. Values are rounded to one decimal place.

| Cameras | Daily video | 1 TB usable | 2 TB usable | 4 TB usable |
|---|---|---|---|---|
| 4 | 86.4 GB | 11.6 days | 23.1 days | 46.3 days |
| 8 | 172.8 GB | 5.8 days | 11.6 days | 23.1 days |
| 16 | 345.6 GB | 2.9 days | 5.8 days | 11.6 days |

If actual bitrate doubles, these durations halve. If cameras have different settings, calculate each camera's daily use and add the results. Megapixels alone cannot tell you the recording bitrate.

## Why do motion recording and H.265 change the answer?

Motion or event recording can reduce consumption when recording is genuinely inactive between events. A busy shop, rain or movement in the background may trigger much more recording than expected. Check the schedule and pre-event/post-event recording buffers before assuming a quiet room uses almost no storage.

Compression also affects bitrate, but a universal “H.265 saves 50%” promise is not a storage plan. Scene detail, frame rate, noise, image-quality settings and the recorder's implementation matter. Compare representative day and night recordings at usable quality. Axis explains these trade-offs in its [surveillance video compression guide](https://www.axis.com/insights/topics/surveillance-video-compression).

## How can you check the real retention today?

1. Open playback and find the oldest **playable** recording on each important channel.
2. Check for gaps, disk errors, incorrect timestamps and channels with different schedules.
3. Record the usable disk capacity and the actual recording bitrate or measured daily consumption.
4. Export a short authorised sample and confirm it plays outside the recorder.
5. Repeat after adding cameras or changing image settings, and after a representative busy period.

Do not delete footage or reduce evidential image quality simply to make a retention target fit. Preserve relevant recordings when an incident is under review.

## How many days should a business keep?

Set the target around how quickly losses or disputes are discovered, the time needed to review them, and the requirements that apply to your premises. A 15-day or 30-day target is a planning choice, not a universal Indian legal rule. Confirm applicable requirements with the person responsible for your records policy.

**Need a storage recommendation for your shop, warehouse or factory?** Prepare the camera count, usable capacity, current oldest footage and desired retention. [Request a storage and camera assessment](/free-audit). We can then review whether the constraint is capacity, recording configuration or failed recording, before recommending equipment.
