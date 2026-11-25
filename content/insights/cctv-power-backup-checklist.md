---
title: "CCTV Power Backup Checklist: What Must Stay On During a Power Cut?"
metaTitle: "CCTV Power Backup Checklist: Cameras, NVR & Router"
date: "2026-11-20"
category: "Camera Setup"
excerpt: "A CCTV camera is only one part of the recording chain. Use this practical power-backup checklist for cameras, PoE switches, NVRs and remote access."
metaDescription: "Will CCTV record during a power cut? Learn which devices need backup power—camera, PoE switch, NVR and router—and how to test your CCTV setup."
readTime: 4
faqs:
  - q: "Will CCTV record during a power cut?"
    a: "It can, but only when the camera and the equipment needed to carry and store its video—including the network or PoE switch and recorder—remain powered. Remote viewing may also require the router and internet connection to stay available."
---

## The camera is not the whole system

A power cut can leave a camera physically in place yet stop recording. That is why “does the camera have backup?” is not the only useful question.

For an IP CCTV setup, video normally travels through a chain:

**camera → PoE injector or switch → network → NVR/server → storage**

If you want to check the feed remotely, a router and internet connection may also be involved. One unpowered link can stop recording or make it impossible to reach the system.

This matters at warehouse gates, factory perimeters, shop entrances and homes where an incident may happen precisely when normal power is unavailable.

## The CCTV power-backup checklist

### 1. Camera power

A camera needs a working power source. PoE cameras usually receive it from a PoE switch or injector; analogue cameras may use a central power supply. Check which device actually powers each important camera.

### 2. PoE switch or injector

A camera with a backup battery is not enough if the switch serving it has no power. Put the relevant PoE switch or injector in the test plan, especially where several cameras share one switch.

### 3. NVR or recording server

The recorder must remain on to keep writing footage to storage. Check the NVR, server or approved recording device—not only its monitor.

### 4. Storage health

Backup power cannot save footage if the recorder has stopped recording, storage is full, or a disk is failing. Review storage status and realistic retention before relying on the system in an outage.

### 5. Router and internet, if remote viewing matters

Local recording may continue even when the internet is down, depending on the setup. But a mobile app, remote monitoring centre or off-site viewer usually needs the router and upstream connection. Treat remote access as a separate test.

## Test the full chain, not a single device

A practical test is simple:

1. Note the current time.
2. Confirm the important camera is recording normally.
3. Isolate mains power safely under supervision, or test each UPS-supported circuit as designed.
4. Check the live feed and recorder status.
5. Restore normal power.
6. Play back the time window that covered the test.

Do not assume a live screen proves the clip was saved. Playback confirms whether the camera, switch, recorder and storage continued to work together.

## Choose a realistic backup duration

There is no universal runtime. First decide the purpose:

- A short UPS runtime can bridge brief interruptions and allow clean shutdown.
- A longer runtime may be needed at a remote gate, site with unreliable supply or location that expects an incident response during an outage.
- Generators and larger backup systems need their own start-up and maintenance checks.

Calculate from the actual load of the cameras, switch, NVR, screen if required, and router. An installer or electrical professional can help size equipment safely.

## Where AI video analytics fits

AI video analytics can help a team notice defined events from compatible existing cameras, such as activity at a restricted gate. It depends on usable video input. If the power path is broken, analytics cannot analyse a feed that is no longer available.

Before introducing alerts, make the recording and backup chain dependable. Then assess priority views through [PGAK's video analytics solutions](/video-analytics-software) or [warehouse CCTV guidance](/ai-cctv-for-warehouses).

## Keep the plan documented

Record which circuits support which cameras, switches and recorders. Add an owner for quarterly testing and storage-health checks. A documented power map is more useful than discovering a blind spot during an incident.

[Ask for a free feasibility check](#dealer).