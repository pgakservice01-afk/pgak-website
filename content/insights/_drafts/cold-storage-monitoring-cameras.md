---
title: "Cold-storage CCTV: handle condensation, outages and restricted access"
metaTitle: "Cold storage CCTV: condensation, outages and access"
date: "2026-09-18"
updated: "2026-10-08"
category: "Security Basics"
excerpt: "Cold-store cameras fail for physical reasons: fogged lenses at the chamber door, equipment that stops in a power cut, and nobody checking afterwards. A compatibility checklist built from the datasheet, and a maintenance routine that catches the failures before you need the footage."
metaDescription: "Cold storage CCTV fails at the door: condensation, cold cabling and power cuts. Check each camera's datasheet and keep a maintenance log."
readTime: 8
image: "/insights/covers/cold-storage-monitoring-cameras.webp"
draft: true
reviewStatus: "Awaiting PGAK engineer review. Removed earlier claims that PGAK supplies door-dwell alerts and WhatsApp alerts; camera-feed health is listed as unverified (no PGAK evidence record). No specific camera model or rating is named; readers are told to verify from their own datasheets."
faqs:
  - q: "Why do CCTV cameras fog up in cold storage?"
    a: "Warm, humid air meets a cold lens or housing and condenses on it, the same way glasses fog when you walk out of an air-conditioned room. It is worst at chamber doors and docks, where the camera sits between warm and cold air. Many datasheets limit humidity to non-condensing conditions, so a camera placed where condensation forms is outside its rating, and needs a housing with a heater or a different position."
  - q: "What should I check on a camera datasheet for a cold store?"
    a: "The operating temperature range at both ends, the humidity rating and whether it says non-condensing, the ingress rating, whether there is a housing heater and how it is powered, any separate cold-start temperature, and the temperature rating of the cable and connectors. Compare each against the coldest chamber and the warmest dock, not an average."
  - q: "Is a door sensor better than a camera for cold-room doors?"
    a: "For knowing a door has been open too long, yes: a magnetic door sensor is cheaper, works in the dark and does not fog. A camera adds the part a sensor cannot give you, which is who opened the door, what was moved and what was blocking it. Many sites need both."
  - q: "What happens to cold-store CCTV during a power cut?"
    a: "Unless the recorder, the cameras, the network switch and any processing unit are on backup power, recording stops. When power returns, some cameras may not come back, or the recorder clock may be wrong. Check every camera after each outage, and test the backup on a schedule rather than discovering its limits during a long cut."
---

**Straight answer: cold-storage CCTV usually fails for physical reasons, not software ones. Lenses fog at chamber doors where warm air meets cold equipment. Cabling and connectors suffer in continuous cold. And recording stops in a power cut unless every part of the chain is on backup. Check each camera's datasheet against your coldest chamber and warmest dock, mount cameras at doorways rather than deep inside chambers, and log a routine of checks after every outage. Use a door sensor to know a door is open too long, and a camera to see who opened it and what moved.**

A cold store's losses are often quiet ones: a door left open during a slow unload, a chamber accessed by someone who should not be there, a camera that stopped recording three power cuts ago. Cameras help with the second and third only if they survive the environment and someone checks them.

## Why do cameras struggle in a cold store?

**Condensation.** Fog forms when warm, humid air meets a cold surface. In a cold store, the worst place is the doorway and the dock. The camera sits in a draught that switches between warm and cold every time the door opens. A housing that fogs for twenty minutes after each opening misses exactly the moments you wanted to see.

**Cold.** Continuous low temperatures stiffen cable jackets and connectors and can affect how a camera starts after power returns. Some datasheets give a separate cold-start figure, and it may differ from the operating range.

**Ice.** Housings near evaporator fans or door curtains can ice over.

**Outages.** Compressors are on a protected supply because the stock depends on it. CCTV often is not. When the power goes, recording stops. When it returns, a camera may not come back or the recorder clock may be wrong.

The fix in every case is the right hardware in the right place, checked on a schedule. Analytics cannot repair a fogged lens.

## The environmental compatibility checklist

Fill this from **each camera's own datasheet** and the cable manufacturer's specification, not from an installer's verbal assurance. Compare against your measured extremes: the coldest chamber set-point and the warmest the dock gets in a Punjab summer.

| Check | Where to find it | What to compare it with | Pass? |
|---|---|---|---|
| Operating temperature range, low end | Camera datasheet, "environment" | Coldest location the camera will sit in | |
| Operating temperature range, high end | Camera datasheet | Warmest dock or anteroom in summer | |
| Cold-start temperature (if stated) | Camera datasheet | Coldest location after a power cut | |
| Humidity rating, and whether "non-condensing" | Camera datasheet | Is the position one where condensation forms? | |
| Ingress rating | Camera or housing datasheet | Washdown, dripping, ice melt at the door | |
| Housing heater or blower | Housing datasheet | Is it fitted, and does the power supply support it? | |
| Power for the heater | Datasheet power section | PoE budget of the switch, or separate supply | |
| Cable jacket temperature rating | Cable specification | Coldest run, including inside chambers | |
| Connector and junction box rating | Component specification | Same as above, plus sealing at entries | |
| Recorder and switch operating range | Recorder / switch datasheet | Where they will actually be installed | |
| Infrared range in fog or mist | Datasheet, then a night test | Door area at night with door cycling | |

Where a line does not pass, change the position, the housing or the camera. Do not hope. A camera at the **doorway looking outward**, or in the anteroom looking at the chamber door, avoids most of the problem. A camera deep inside a chamber faces the worst of it.

## Outages: plan the chain, then test it

Recording needs the whole chain powered: cameras, switch, recorder and, if analytics are used, the processing unit. A UPS sized for the recorder alone leaves the cameras dark.

- List every device in the chain and put each one on backup, or accept and write down which views go dark in a cut.
- Know how long the backup lasts, and test it on a schedule, not during a long outage.
- After each outage: confirm every camera is recording, the recorder clock is right, and the disks are writing.
- Keep the chamber temperature monitoring separate from CCTV. A camera is not a temperature record.

Knowing quickly that a camera has gone dark is its own problem. Our article on [knowing when a camera is offline](/insights/cctv-camera-offline-how-to-know) covers manual and automated checks. Automated camera-feed health has no PGAK evidence record yet. It can be evaluated at your site, with disconnect and reconnect tests.

## Restricted access: who went into which chamber

Chamber access is usually controlled by a key or a register, and both can be bypassed. A camera at each chamber door, mounted outside the cold, gives you a record of **who** entered and **when**. Pair it with the register and with stock movements. For high-value chambers, a proper access-control system on the door is the control. The camera is the record behind it.

Do not rely on a camera to tell you whether someone is still inside a chamber. That is a job for the room's own safety devices and a check-in, check-out routine.

## Doors left open: sensor first, camera second

For "tell me when a door has been open too long", a **magnetic door sensor** with a timer is cheaper, works in darkness and does not fog. Start there. A camera adds what the sensor cannot: who opened the door, what was being moved, and whether a pallet was propping it open. The useful analysis is often simple. Compare spikes in the chamber temperature log with door-open records and footage. If spikes line up with shift changes or loading windows, the fix is a procedure, not more hardware.

## The maintenance routine

| Interval | Check | Why |
|---|---|---|
| Daily (or each shift) | Glance at every door camera view at the coldest hour | Fog and ice show up first here |
| Weekly | Clean lenses and housings; clear ice; check door-camera views at night | Stops a slow decline nobody notices |
| After every power cut | Every camera recording; recorder clock right; disks writing | The most common silent failure |
| Monthly | Cable entries and junction boxes sealed; heater working | Moisture enters at joints |
| Monthly | Real retention on the recorder, compared with what you need (see our [storage article](/insights/cctv-storage-how-many-days)) | Retention shrinks as cameras are added |
| Quarterly | Timed backup-power test | Know how long recording survives a cut |
| Before summer and monsoon | Full review against the compatibility checklist | Peak heat and humidity at docks |

Log each check with a date and a name. The log is what tells you a camera was working on the day you need its footage.

## Where cameras are not the answer

- **Open or shut only:** a door sensor does it better.
- **Temperature evidence:** use the refrigeration system's own logger.
- **Chambers without a network path or backup power:** fix the infrastructure first, or accept that those views will have gaps.

## Next step

The [camera health calculator](/platform/capabilities#scenario-C31) turns manual checks into hours. *Illustrative example:* 16 cameras × 30 checks a month × 0.5 minutes ÷ 60 = 4 hours, minus 1 hour of exception review, gives **3 hours a month**. Other tools are on the [calculators page](/calculators), and the [capability register](/platform/capabilities) shows what has and has not been demonstrated.

PGAK reuses compatible cameras a site already owns. Detection runs on a processing unit on site, and camera suitability, power and network are confirmed at the assessment. Bring the filled checklist and [ask for a site-specific assessment](/free-audit).
