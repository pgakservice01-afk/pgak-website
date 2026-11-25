---
title: "CCTV Video Loss: Common Causes and How to Trace Each One"
metaTitle: "CCTV Video Loss: Common Causes and How to Trace Them"
date: "2026-11-25"
category: "Camera Setup"
excerpt: "Your recorder shows 'video loss' on one or more cameras. Work through power, cable, network, camera and recorder in order, and find the cause without guessing."
metaDescription: "CCTV video loss on the recorder? Trace it step by step: power, cable, connector, network, camera and recorder port, and know when to call an installer."
readTime: 5
image: "/insights/covers/cctv-video-loss-causes-how-to-trace.webp"
faqs:
  - q: "What does video loss mean on a CCTV recorder?"
    a: "It means the recorder is not receiving a usable picture from that channel. The cause can be the camera, its power, the cable or network between them, or the recorder input. The message points to a missing signal, not to one specific fault."
  - q: "Why does CCTV show video loss only at night?"
    a: "Night-only loss can be associated with changes in power demand, lighting or configuration; the message alone does not confirm the cause. Ask a competent installer to check the exact camera and supply under the relevant night conditions, following the device manual. Do not take electrical measurements yourself or replace the camera solely from this symptom."
  - q: "Can I fix CCTV video loss myself?"
    a: "You can note the affected cameras, times, error messages and recent changes, and review accessible status screens without altering the installation. Leave connection swaps, electrical tests, opening equipment and work at height to a competent installer using the device instructions and an agreed interruption and recovery plan."
---

## One camera shows a black screen with 'video loss'

You open the recorder and one tile says video loss. Or the picture comes and goes, mostly at night. The recorder is telling you one thing: it is not getting a usable signal from that channel.

It does not tell you why. The cause sits somewhere between the camera and the recorder, and the fastest way to find it is to check each link in order. This guide walks through that order, so you do not replace a working camera.

## Step 1: Note the pattern before you touch anything

Write down three facts first.

- Is it one camera or several?
- Is it always, or only at certain times, such as night or after rain?
- Did it begin after a change, such as new cabling, a power cut or a firmware update?

These patterns help narrow the investigation; they do not identify the faulty part. A single lost view can involve its camera, power, connection, settings or recorder channel. Several lost views suggest checking shared dependencies. A night-only fault is a reason to check the equipment under its actual night load and settings.

## Step 2: Check the camera's power

A camera with no power or weak power sends no usable picture. Look at the adapter or the power source feeding that camera. Is it switched on? Is the plug firm? Do you see a small light at the camera, if it has one?

If the camera is powered over the network cable, the switch or injector is the power source. A switch can run out of power budget when more cameras are added. [How to plan a PoE switch power budget](/insights/poe-switch-cctv-camera-power-budget) explains how to add up the load.

Long cable runs also lose voltage on the way. That can show up only at night, when the infrared lights switch on and draw more current.

## Step 3: Check the cable and connectors

A loose or corroded connector is a very common cause of intermittent loss. Look at both ends of the cable. On an analogue system, check the BNC connectors and the power joint. On an IP system, check the plug on the network cable.

Signs to look for:

- green or white powder inside a connector
- a plug that wiggles
- a cable that has been pinched, cut or chewed
- a joint left open to rain

Do not pull cable through a wet outdoor box while power is on. Ask an installer for anything outdoors or at height. [CCTV monsoon failures](/insights/cctv-monsoon-failures) lists damp-related damage worth looking for.

## Step 4: On an IP system, check the network

A network camera can lose video even when it has power. Common network causes are:

- two devices with the same IP address
- a switch port that has failed or been moved
- a link that is overloaded when many cameras stream at once
- a recently changed password the recorder does not know

Ask whoever manages your network whether anything changed on the day the loss began. If your recorder shows the camera as offline rather than as video loss, [how to know a CCTV camera is offline](/insights/cctv-camera-offline-how-to-know) is a useful companion.

## Step 5: Separate the camera from the recorder

A competent installer can plan a controlled comparison using compatible equipment. Agree the interruption and restoration plan with the system owner first. Follow the exact device manuals for connections, supported signal types and any required shutdown or power isolation; do not move connections on a live system by guesswork.

Change one supported variable at a time and record the camera, power source, cable or network path, channel and settings used. A fault that moves with a test setup helps narrow the investigation, but it does not by itself prove which component failed. A fault that remains at a channel can also involve its configuration or compatibility. If several views fail, investigate shared dependencies and logs rather than assuming the hard drive caused the missing live picture.

Restore the agreed configuration and confirm live view and recording after the test. Keep the observations for the installer; no saving or repair outcome is guaranteed.

## Step 6: Check the recorder itself

A recorder that is hot, dusty or running with a failing hard disk can behave oddly. Check that its fans are turning and its vents are clear. [Whether you have a DVR or an NVR](/insights/dvr-vs-nvr-which-do-you-have) changes which signal types it accepts, so confirm the camera type matches the recorder's input.

If the recorder is not recording at all, treat that as urgent. Call your installer and do not format the disk yourself.

## When to stop and call an installer

Call a trained installer before connection swaps, opening equipment, work at height or electrical testing, and whenever the cause remains uncertain. Give them your notes: which cameras, what times and what changed. Those observations help plan the diagnosis and any parts needed.

## How a maintenance routine reduces repeat faults

Many video-loss calls trace back to slow wear: loose joints, dust and old power supplies. A short routine, such as the one in [the CCTV maintenance checklist for business](/insights/cctv-maintenance-checklist-for-business), helps you catch those before a camera goes dark. For a site where a lost feed matters, [a power backup plan](/insights/cctv-power-backup-checklist) also helps.

If you run many cameras and want to know when a feed stops without checking tiles by eye, the feasibility check can look at how that could work on your setup. It is a conversation about your cameras, not a promise of a specific result.

## Frequently asked questions

### What does video loss mean on a CCTV recorder?

It means the recorder is not receiving a usable picture from that channel. The cause can be the camera, its power, the cable or network between them, or the recorder input. The message points to a missing signal, not to one specific fault.

### Why does CCTV show video loss only at night?

Night-only loss can be associated with changes in power demand, lighting or configuration; the message alone does not confirm the cause. Ask a competent installer to check the exact camera and supply under the relevant night conditions, following the device manual. Do not take electrical measurements yourself or replace the camera solely from this symptom.

### Can I fix CCTV video loss myself?

You can note the affected cameras, times, error messages and recent changes, and review accessible status screens without altering the installation. Leave connection swaps, electrical tests, opening equipment and work at height to a competent installer using the device instructions and an agreed interruption and recovery plan.

[Ask for a free feasibility check](#dealer).
