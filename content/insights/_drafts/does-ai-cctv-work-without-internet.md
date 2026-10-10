---
title: "Does AI CCTV work without internet?"
metaTitle: "Does AI CCTV work without internet? An outage test"
date: "2026-08-29"
updated: "2026-10-08"
category: "Security Basics"
excerpt: "It depends where the analysis runs. With on-site processing, recording and detection can carry on while alerts and remote viewing wait for the link. An outage test to find out exactly what your system keeps doing."
metaDescription: "With on-site processing, AI CCTV can keep recording and detecting offline; alerts and remote view need the link. Run this outage test before you buy."
readTime: 7
image: "/insights/category/security-basics-2.webp"
draft: true
reviewStatus: "Awaiting PGAK engineer review. UNRESOLVED: PGAK has no published outage-test record — whether events detected during an internet outage are queued and delivered later, and for how long, must be confirmed by an engineer before the article states it for PGAK; the body currently frames it as something to test. Removed from the live version: PGAK camera-offline alerts 'after about three minutes' and site check-in alerts 'after about two' (camera-feed health is unverified), and the 'less than a couple of ceiling fans' power claim."
faqs:
  - q: "Does AI CCTV work without internet?"
    a: "It depends on where the analysis runs. If detection runs on a camera or a processing unit at your site, recording and detection do not need the internet; what needs it is sending alerts to phones, remote viewing and any cloud storage. If video is sent to a cloud service to be analysed, detection stops when the link does. Ask each supplier which design they are selling, then test it."
  - q: "What happens to AI CCTV during a power cut?"
    a: "Without backup power, everything stops: cameras, recorder, processing unit and network equipment. Putting all of them on the same UPS or inverter circuit is the usual fix. Size it from the actual wattage on each device's label and the backup time you need, and include the router and switch, because without them alerts cannot leave the site even when the internet is up."
  - q: "How much internet does AI CCTV need?"
    a: "It depends on the design. With on-site processing, mainly events and short clips leave the site, plus any remote viewing. With cloud processing, video from every analysed camera has to be uploaded continuously. Use the camera bitrates from your recorder to work out the upload needed, rather than relying on a rule of thumb."
---

**Straight answer: it depends on where the analysis runs. If detection runs at your site — on the camera or on an on-site processing unit — recording and detection do not depend on the internet; what stops is alerts reaching phones, remote viewing and anything stored in the cloud. If the system sends video to a remote server to be analysed, detection stops when the link does. Either way, the only reliable answer for your site comes from an outage test, done before you sign.**

In Punjab and across India, links go down — fibre is cut during roadwork, industrial-estate connections are patchy, and power cuts take the router with them. A system's behaviour on those days is part of what you are buying.

## Where does the analysis run?

**On the camera.** Some cameras run detection themselves. Useful, but limited to what that camera's maker supports.

**On an on-site processing unit.** A device at your premises reads streams from the recorder or cameras and runs detection there. This is how PGAK works: **detection runs on an on-site processing unit**. Video does not need to leave the building to be analysed; events and clips go out over your connection.

**On a remote server (cloud).** Video is uploaded continuously and analysed elsewhere. Simpler at the site, but upload bandwidth becomes a running cost and detection depends on the link.

| | On-site processing | Cloud processing |
|---|---|---|
| Internet drops | Detection can continue on site; alerts wait for the link | Detection stops |
| Upload needed | Mainly events, clips and remote viewing | Continuous video for every analysed camera |
| Power cut without backup | Everything stops | Everything stops |

The [edge AI guide](/features/guides/edge-ai) sets out the trade-offs in more detail.

## What should keep working, and what should not?

Ask every supplier to fill in the right-hand column **in writing** before the test. Then run the test and compare.

| Function | Needs internet? (on-site processing) | What the supplier says happens during an outage | What you observed |
|---|---|---|---|
| Recording to DVR/NVR | No | | |
| Live view on a monitor at the site | No, if the monitor is connected locally | | |
| Detection on the processing unit | No | | |
| Alerts to phones or messaging apps | Yes | | |
| Events detected during the outage — delivered later, or lost? | Depends on the system | | |
| Remote viewing from outside the site | Yes | | |
| Cloud backup or cloud search | Yes | | |
| Clock accuracy on recorder and unit (needed for evidence timelines) | Usually synced over the network; check drift after the outage | | |

The row that matters most is the fifth. Whether events detected during an outage are kept and sent when the link returns — and how many, and for how long — differs between systems and has to be tested, not assumed. PGAK has not yet published an outage-test record; ask for this test in any pilot, PGAK's included.

## The outage test protocol

Run it during a pilot, at a quiet time, with the site owner's permission and a person standing by. Synchronise a phone clock with the recorder first.

**Test 1 — internet outage (30 minutes).**
1. Note the time and disconnect the internet at the router's WAN cable (leave the router and switch powered).
2. At minute 5 and minute 20, walk through a monitored zone so the system should detect you. Note each time.
3. Confirm the recorder is still recording and the local monitor still shows video.
4. At minute 30, reconnect. Note when — or whether — the two events arrive on the phone, and whether they are labelled with the time they happened.
5. **Pass:** recording uninterrupted; both events detected; behaviour on reconnect matches what the supplier wrote beforehand.

**Test 2 — power cut on backup (15 minutes).**
1. Switch off mains to the circuit feeding the cameras, recorder, processing unit, router and switch, leaving the UPS or inverter to carry them.
2. Walk through a zone at minute 5. Confirm the alert arrives.
3. **Pass:** nothing restarts; the alert arrives as normal. If anything reboots, that device is not on backup.

**Test 3 — processing unit restart.**
1. Restart the processing unit (supplier present).
2. Time how long until detection resumes, and whether you were told it was down.
3. **Pass:** detection resumes without anyone reconfiguring it; the time is written down.

**Test 4 — one camera disconnected.**
1. Unplug one camera's cable without warning.
2. Note whether, how and when anyone is told.
3. **Pass:** matches what the supplier wrote beforehand — including "we do not alert on this", which is an honest answer and better than finding out later.

Record every result with the date, the software version and the camera models. The [pilot worksheet](/resources/evaluation-method) has a format for logging availability and recovery, and the [deployment page](/platform/deployment) lists the interruption tests a pilot should include.

## Power is the bigger risk

Internet gets the attention; power takes sites down more often. Cameras, the recorder, the processing unit, the switch and the router all need power, and losing any one breaks the chain.

Put all of them on the same UPS or inverter circuit. Size the backup from the wattage printed on each device's label or power adapter, added together, and the number of hours of backup you need. The [electricity cost calculator](/calculators/electricity-cost) uses the same watts-and-hours arithmetic to show what the system adds to the power bill.

## Limitations

- **A late alert is not prevention.** If the reason for buying is knowing within minutes, the internet connection is part of the security system. A second connection or mobile-data failover on the router can be worth more than another camera.
- **On-site processing has its own failure point** — the processing unit. Ask who replaces it, and how fast, if it fails.
- **Cloud processing is not wrong** for every site. Where the link is reliable and few cameras need analysis, it can be simpler. The point is to know which you are buying.

## Next step

If one quote processes on site and another in the cloud, put both into the [edge AI processing calculator](/features/guides/edge-ai#scenario-C05) to compare monthly and capital costs over your term, and size continuous upload with the [bandwidth and cloud cost calculator](/calculators/bandwidth-and-cloud-cost). For how you would find out that a camera has stopped, see [how to know if a CCTV camera is offline](/insights/cctv-camera-offline-how-to-know).

If you want your connection, power backup and camera streams checked together, [ask for a site-specific assessment](/free-audit).
