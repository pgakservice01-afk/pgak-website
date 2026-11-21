---
title: "PoE Switch for CCTV: How to Check Camera Power Before You Add More"
metaTitle: "PoE Switch for CCTV: Camera Power Budget Guide | PGAK"
date: "2026-11-21"
category: "Camera Setup"
excerpt: "Before adding IP cameras or analytics, check the PoE switch’s ports, power budget, uplink and backup plan. A simple guide for existing CCTV sites."
metaDescription: "PoE switch for CCTV guide: understand ports, power budget, uplinks, backup power and practical checks before adding IP cameras to an existing system."
readTime: 5
faqs:
  - q: "Can any PoE switch power CCTV cameras?"
    a: "No. The switch must support the required PoE standard and have enough total power budget for the connected cameras, including any peak draw such as infrared illumination or PTZ movement."
  - q: "What is a PoE power budget?"
    a: "A PoE power budget is the total electrical power a switch can supply across all its PoE ports. The combined demand of the cameras must stay within that budget with sensible headroom."
---

## A spare port does not always mean a spare camera can be added

For an IP CCTV system, a PoE switch can carry both data and power to the cameras. That makes installations cleaner, but it creates a planning mistake: someone sees an empty port and assumes it can power another camera.

The real question is whether the port, the switch's total power budget, the cable run and the network uplink can support the camera you want to add. This guide helps you prepare the right facts before an installer changes the system.

## First, identify what is already there

Open the cabinet or check the installed documentation and note:

- switch make and model;
- total number of ports and PoE-capable ports;
- how many ports are already used;
- whether there is a separate uplink to the recorder or network;
- the switch's stated PoE power budget;
- which cameras depend on this switch.

Do not rely only on a label saying “PoE.” It does not tell you the available power or whether every port supplies it.

## What the PoE budget means

Each connected camera draws power from the switch. A small fixed camera may draw modestly in normal conditions, while infrared illumination, heaters, PTZ movement or other features can increase demand.

A switch has a maximum total amount it can provide across its ports. When the combined draw approaches or exceeds that budget, a camera may fail to start, restart intermittently or lose features. Exact requirements should come from the camera and switch documentation, not a generic estimate.

Leave headroom. A system that is stable in daylight may behave differently at night when infrared turns on.

## The practical checks before adding a camera

### 1. Confirm the camera's required PoE standard

Camera documentation should state its power method and required standard. Match it with the switch capability. If the information is unclear, have the installer verify compatibility before connecting it.

### 2. Check the total budget—not only the empty port

Add the planned camera’s maximum stated draw to the current load. If the existing load is unknown, do not guess; check the switch interface or ask the service provider to measure and document it.

### 3. Check cable condition and distance

A long or damaged cable can create intermittent power and data problems. The route should be assessed for physical damage, water exposure and the actual cable specification.

### 4. Check the uplink and recorder path

A camera needs more than power. Make sure the switch has a functioning path to the NVR, VMS or approved recording destination. A powered camera with no usable network path will not create a useful recording.

### 5. Include the switch in the backup-power plan

If the cameras, recorder and router have backup power but the PoE switch does not, the cameras may still go down in an outage. Map the full chain using the [CCTV power backup checklist](/insights/cctv-power-backup-checklist).

## When an AI upgrade is being considered

AI video analytics uses the video a camera can reliably deliver. Before adding an alert rule, confirm the feed is stable, the image is usable at the relevant point, and the switch can support the existing estate consistently.

That is why a compatibility review should include the camera view, recording path and network—not only the camera model. PGAK can assess a compatible existing setup through its [AI surveillance system](/ai-surveillance-system) rather than assuming a full camera replacement is needed.

## Keep a cabinet record

A simple cabinet record should show the switch model, ports, camera names, uplink, power source, UPS circuit and last change date. It reduces fault-finding time and prevents unplanned changes from creating a gap in recording.

[Ask for a free feasibility check](#dealer).
