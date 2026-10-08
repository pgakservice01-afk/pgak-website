---
title: "H.264 or H.265: measure the storage difference on your own cameras"
metaTitle: "H.264 vs H.265 CCTV storage: test it at your site"
date: "2026-10-08"
category: "Camera Setup"
excerpt: "H.265 is often sold as 'half the storage'. On your cameras it may save a lot, a little or nothing, depending on the scene, night-time noise and bitrate mode. A controlled recording test settles it in four days."
metaDescription: "H.265 savings vary by scene and bitrate mode, and are zero under constant bitrate. A four-day protocol to measure the storage difference on your cameras."
readTime: 8
draft: true
reviewStatus: "Awaiting PGAK engineer review. Worked figures are hypothetical and labelled illustrative. Check: the statement that under CBR switching codec does not change storage (true by definition of CBR, with minor container overhead); that proprietary 'smart codec' modes can affect third-party decoding (stated as 'test it', no product named); that H.265 decoding needs more processing than H.264 (stated generally, no figures)."
faqs:
  - q: "Does H.265 use half the storage of H.264?"
    a: "Sometimes it saves a lot, sometimes little. The saving depends on the scene, how noisy the picture is at night, the quality setting and the bitrate mode. Under constant bitrate it saves nothing, because the camera writes the bitrate you set whichever codec is used. Measure it on your own cameras before buying disks around an assumed saving."
  - q: "How do I test H.264 against H.265 on my CCTV?"
    a: "Use the same cameras, resolution, frame rate, keyframe interval and variable-bitrate quality setting, and change only the codec. Record a full day in each, in the order H.264, H.265, H.265, H.264, so day-to-day differences in activity average out. Measure what each camera wrote per day, and compare picture detail at the same spot in each recording."
  - q: "Should I switch my CCTV to H.265?"
    a: "Switch if your test shows a worthwhile storage saving with no loss of the detail you need, and if everything that reads the video — recorder, playback software, remote app, analytics — decodes H.265 reliably. If any of those struggle, the storage saved is not worth broken playback or analytics."
---

**Straight answer: H.265 often writes less than H.264 for a similar picture, but how much less depends on your cameras, scenes and settings. The "half the storage" figure is not a rule. Under constant bitrate it saves nothing, because the camera writes whatever bitrate you set. The only figure worth planning disks around is one you measured: same cameras, same settings, only the codec changed, a full day in each, recorded in an A-B-B-A order.**

The codec decision usually gets made from a brochure. It is cheap to make it from your own recorder instead, and the result often surprises people in both directions.

## Why does the saving vary so much?

A codec is a way of compressing video. H.265 (also called HEVC) uses more advanced methods than H.264 and can describe the same picture in fewer bits. How many fewer depends on several things.

- **The bitrate mode.** Under **constant bitrate (CBR)** the camera writes the bitrate you set, whichever codec is used. Switching to H.265 then gives the same storage and, at best, a better picture. A storage saving only appears under **variable bitrate (VBR)**, where the camera writes what the picture needs up to a ceiling.
- **The scene.** A busy gate, trees moving in the wind and rain all compress differently from an empty corridor.
- **Night-time noise.** Infrared night pictures carry grainy noise that is hard to compress in any codec. Savings at night are often smaller than by day.
- **The quality setting.** A higher VBR quality level writes more in both codecs.
- **Smart codec modes.** Many cameras offer proprietary "+" modes that lower bitrate further in static scenes. They are a separate condition to test, because some playback software, recorders or analytics may handle them differently.

## The controlled recording test protocol

This takes four days and changes one setting on a few cameras. Agree it with whoever maintains the system, and note the original settings so you can restore them.

### 1. Choose the test cameras

Pick **three** that represent your estate:

- one **busy scene** (a gate, loading bay or billing counter),
- one **quiet scene** (a store room or corridor),
- one **outdoor camera that switches to infrared at night**.

### 2. Fix everything except the codec

Write these down for each camera and keep them identical for the whole test:

| Setting | Keep fixed at |
|---|---|
| Resolution | e.g. 2560 × 1440 |
| Frame rate | e.g. 15 fps |
| Bitrate mode | **VBR**, with the same quality level and the same maximum |
| Keyframe (I-frame) interval | the same number |
| Smart codec ("+" modes) | **off** for the main test |
| Recording schedule | continuous, 24 hours |
| Camera position, zoom, focus | unchanged |

### 3. Record in A-B-B-A order

- **Day 1:** H.264
- **Day 2:** H.265
- **Day 3:** H.265
- **Day 4:** H.264

Pick four days with similar activity, for example four working weekdays. The A-B-B-A order stops a busy Monday or a rainy Thursday from tilting the result towards one codec. Average the two days for each codec.

### 4. Measure what each camera wrote

Use whichever of these your recorder supports, and use the same method throughout:

- **Export one fixed hour** (say 11:00–12:00 and 23:00–00:00) from each camera each day and note the file sizes. This is the most robust method.
- **Read the per-channel bitrate** in the recorder's status screen several times a day and average it.
- If the recorder reports per-channel storage directly, use that.

Convert between the two with the storage rule: **GB per day ≈ 10.8 × average Mbps**, so **average Mbps ≈ GB per day ÷ 10.8**. For one hour, **GB ≈ 0.45 × Mbps**.

### 5. Compare the picture, not just the size

For each camera and codec, pause at the same kind of moment — a person at the gate, a vehicle plate, a face at the counter, by day and by night — and compare whether the detail you need is still legible. A saving that blurs the plate you need is not a saving.

### 6. Check everything that reads the video

With H.265 on, confirm that playback on the recorder, exported clips on an ordinary computer, the remote-viewing app and any analytics all work smoothly. H.265 takes more processing to decode, so a processing unit or a viewing computer may handle fewer H.265 streams than H.264 streams.

### Results worksheet

| Camera | Scene | Codec | GB day 1 | GB day 2 | Average GB/day | Average Mbps (÷ 10.8) | Detail legible? | Playback / analytics OK? |
|---|---|---|---|---|---|---|---|---|
| | | H.264 | | | | | | |
| | | H.265 | | | | | | |

## Illustrative example — hypothetical figures, not a measurement

| Camera | H.264 average | H.265 average | Saving |
|---|---|---|---|
| A — busy gate | 30 GB/day (30 ÷ 10.8 ≈ 2.78 Mbps) | 18 GB/day (≈ 1.67 Mbps) | (30 − 18) ÷ 30 = **40%** |
| B — quiet store room | 6 GB/day (≈ 0.56 Mbps) | 4.5 GB/day (≈ 0.42 Mbps) | 1.5 ÷ 6 = **25%** |
| C — outdoor, infrared at night | 24 GB/day (≈ 2.22 Mbps) | 20 GB/day (≈ 1.85 Mbps) | 4 ÷ 24 ≈ **17%** |

Three cameras, three different savings, none of them half. Now the effect on retention. Suppose 8 cameras behaved like camera A, on a recorder with **3,600 GB usable** (a 4 TB disk, assuming 90% usable):

- H.264: 8 × 30 = 240 GB/day → 3,600 ÷ 240 = **15 days**
- H.265: 8 × 18 = 144 GB/day → 3,600 ÷ 144 = **25 days**

If they behaved like camera C instead (8 × 24 = 192 GB/day against 8 × 20 = 160 GB/day), retention would move from 18.75 to 22.5 days. That is a much smaller change. This is why you measure before deciding whether a codec change or a bigger disk is the fix. [How many days can your CCTV store?](/insights/cctv-storage-how-many-days) walks through the full retention arithmetic.

## What else to know before switching

- **Smart codec modes** can lower bitrate further on quiet scenes. Test them as a third condition, and check exports and analytics with them on.
- **Older recorders and viewing software** may not decode H.265, or may decode it slowly.
- **Analytics** reads the decoded picture. Ask any analytics supplier to confirm, on your cameras, which codecs and modes their processing unit decodes and how many streams it handles in each. With PGAK this is confirmed at the assessment, and any extra processing hardware is itemised in the quote.

## When not to bother

If retention is already comfortably above what you need, or if your cameras run on constant bitrate and you are happy with the picture, the test can wait. And if one camera is filling the disk because it faces a tree in the wind, re-aiming that camera may achieve more than any codec change.

## Next step

If codec choice is part of a wider decision about where video is processed, the [Edge AI processing calculator](/features/guides/edge-ai#scenario-C05) compares on-site processing with a cloud service over the same term, and the [edge AI processing guide](/features/guides/edge-ai) explains the difference. If continuous upload is on the table, the [bandwidth and cloud cost calculator](/calculators/bandwidth-and-cloud-cost) shows what it would carry and cost each month. To have the test set up and read on your own recorder, [ask for a site-specific assessment](/free-audit).
