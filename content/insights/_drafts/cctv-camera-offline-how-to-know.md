---
title: "How do you know when a CCTV camera stops recording?"
metaTitle: "How to know when a CCTV camera stops recording"
date: "2026-09-01"
updated: "2026-10-08"
category: "Camera Setup"
excerpt: "A dead camera, a failed disk and a frozen picture look the same on a busy monitor: like nothing happening. A failure-injection checklist to prove your alerts work, and a way to measure how long a failure takes to reach a person."
metaDescription: "Test CCTV alerts with safe, planned failures: video loss, covered lens, stopped recording, frozen frames. Then time how long each takes to reach someone."
readTime: 9
image: "/insights/covers/cctv-camera-offline-how-to-know.webp"
draft: true
reviewStatus: "Awaiting PGAK engineer review. Merged B080 (camera-health-monitoring-requirements) into this refresh: synthetic-failure checklist and escalation-latency measurement. Camera-feed health is listed as UNVERIFIED for PGAK (no evidence record), so the draft says it 'can be evaluated at your site' and makes no PGAK detection-time claim. Removed from the live version: 'on almost every estate we audit at least one camera is dark' (no evidence) and 'it runs as part of what we build'. Check: generic recorder exception names (video loss, HDD error, HDD full, network disconnected) are described as common, not universal. Owner note: the live article does-ai-cctv-work-without-internet.md states PGAK detection times of about three and two minutes for camera and site health; there is no evidence record for that claim."
faqs:
  - q: "How do I know if a CCTV camera has stopped recording?"
    a: "A live picture does not prove the camera is recording. Check playback, not live view: play back recent footage from every camera on a fixed schedule and confirm the oldest footage is as old as you expect. Then make sure the recorder or monitoring system sends an alert for video loss, disk errors and recording stopping, and test those alerts by causing a planned, harmless failure."
  - q: "Why do camera failures go unnoticed?"
    a: "Nobody watches every feed, a missing or frozen tile among many is easy to overlook, and many recorders log faults quietly unless someone has set up notifications. A cut cable, a failed power adapter, a full or failed disk and a covered lens can all look like a quiet scene until someone needs the footage."
  - q: "How do I test whether CCTV alerts actually work?"
    a: "Run a failure-injection test. Tell the people who need to know, then cause one controlled fault at a time: unplug one camera, cover one lens, stop recording on one channel for a few minutes, disconnect the recorder's network cable. Note the exact time, then record when the system logged it, when a person was told, and when they acknowledged it. Restore everything and confirm recording has resumed."
  - q: "What should happen when a camera goes offline?"
    a: "A named person should be told, with the camera identified by name and location. If they do not acknowledge within a time you have set, someone else should be told. The event should be logged so repeat failures on the same camera stand out, because a camera that drops out every week points to a cable or power fault that one repair visit will not fix."
---

**Straight answer: you know a camera has stopped recording only if something tells you, and you only know that something works if you have tested it. A live picture is not proof of recording. A camera can be live while the disk has failed, the recording schedule is wrong or the picture has frozen. Set up alerts for video loss, disk faults and stopped recording, then cause a few safe, planned failures and time how long each takes to reach a person who acts on it.**

The discovery usually happens the same way. Something goes wrong, someone asks for the footage, and the camera that mattered turns out to have stopped on some date nobody can pin down.

## Why do camera failures go unnoticed?

**Nobody watches every feed.** A monitor wall gets glanced at, not studied. One black or frozen tile among sixteen is easy to miss, and after a few days it looks normal.

**Recorders often fail quietly.** Most DVRs and NVRs have an "exception" or "abnormality" menu covering events like video loss, disk error, disk full and network disconnection. Those events only reach a person if someone has set up email or app notifications, and kept them working when phones and email addresses change.

**Failures are ordinary.** A rodent through a cable, a power adapter failing in humidity, a switch port dying, a pole knocked by a reversing truck, a disk wearing out.

**Some failures look like normal video.** A covered or turned camera still sends a picture, just the wrong one. A frozen stream can show the last image it received. A camera can be live while nothing is written to disk.

## Which failures should your setup catch?

| Failure | Looks like on the monitor | What should catch it |
|---|---|---|
| Camera loses power or cable | Black tile or "no video" | Recorder video-loss event, with a notification |
| IP camera drops off the network | Tile shows "offline" | Recorder or monitoring "camera offline" event |
| Lens covered, sprayed or turned | A picture, but the wrong one | Tamper / scene-change detection, if enabled |
| Stream frozen | A still picture; the on-screen clock may stop | Check the clock advances; a frame-change check |
| Disk failed, full or not recording | Live view still fine | Recorder disk-error / disk-full events; playback checks |
| Recording schedule wrong | Live view still fine | Playback checks only — few systems alert on this |
| Recorder offline or removed | Whole site silent | Remote check that the site still reports in |
| Alert sent, but nobody receives it | Nothing | A second person if the first does not acknowledge |

## A failure-injection checklist

This is how you find out what your system really does, rather than what the brochure says. Do it when you set up alerts, after any major change, and twice a year after that.

**Before you start**

- Tell security, the shift supervisor and anyone who watches the cameras that a test is running, and when.
- Pick a quiet period. Test **one camera at a time** and never leave a position uncovered for longer than the test needs.
- Synchronise one phone's clock to network time. Use it as the stopwatch for every test.
- Have a sheet ready with columns for the times below.

**The tests**

1. **Video loss.** Unplug one camera's power or video cable, at the camera end or the recorder end. *Expect:* a video-loss event logged, and a notification naming the camera.
2. **Network loss (IP cameras).** Unplug one camera's patch lead at the switch. On PoE this also cuts power. *Expect:* a camera-offline event.
3. **Covered lens.** Cover one lens with a cloth for two minutes. *Expect:* a tamper event, if tamper detection is enabled and tuned. Many sites find it is off.
4. **Camera moved.** With permission, turn one adjustable camera away from its view and back. *Expect:* a scene-change event, if available. Check the view is restored exactly afterwards.
5. **Frozen picture.** You cannot easily freeze a stream on purpose. Instead, check every camera's on-screen clock is moving in live view and advancing correctly in playback. Ask any monitoring supplier to show how it detects a stream that is connected but not changing.
6. **Recording stopped.** On one channel, set the schedule to "no recording" for ten minutes, then restore it. *Expect:* honestly, most systems will not alert on this. That is the point of the test: it shows you need a playback check.
7. **Disk fault.** Do not pull a disk from a live recorder. Read the disk status screen (normal, error, unformatted), confirm disk-error and disk-full notifications are switched on, and ask your maintenance provider to demonstrate them on a spare recorder.
8. **Recorder or site offline.** Unplug the recorder's network cable, not its power, for five minutes. *Expect:* any remote monitoring to report the site as silent.
9. **Nobody acknowledges.** Repeat one test with the first contact's phone off. *Expect:* a second named person to be told after the time you have set.

**After every test:** restore the cable, cover or setting, then play back the last few minutes to confirm recording has resumed. Note the gap in the recording; it is now part of your evidence trail.

## How do you measure escalation time?

For each test, record the times on the same clock:

- **T0** — failure caused
- **T1** — recorder or monitoring system logged it
- **T2** — first person received a notification
- **T3** — that person acknowledged it
- **T4** — second person notified, if the first did not acknowledge
- **T5** — fault restored and recording confirmed

**Detection time = T1 − T0. Notification time = T2 − T0. Human response time = T3 − T2.** Run each test on at least three cameras and note the slowest result, not just the typical one.

**Illustrative example — hypothetical figures from an imagined test, not measured results from any product:**

| Test | T0 | T1 logged | T2 notified | T3 acknowledged | T2 − T0 | T3 − T2 |
|---|---|---|---|---|---|---|
| Video loss, camera 07 | 10:00:00 | 10:00:05 | 10:03:20 (email) | 10:41:00 | 3 min 20 s | 37 min 40 s |
| Lens covered, camera 03 | 10:20:00 | not logged (tamper off) | — | — | not detected | — |
| Recording stopped, camera 11 | 10:30:00 | not logged | — | found at playback check | not detected | — |
| Recorder network unplugged | 11:00:00 | — | 11:06:00 (app: device offline) | 11:08:00 | 6 min | 2 min |

Read this kind of table for two things. First, which failures produced **no alert at all**. Those need a setting changed, a different tool or a manual check. Second, where the **time goes**. Here the slowest leg was a person reading an email, not the system. Most fixes are cheap: a different notification route, a named deputy, an acknowledgement rule.

Set your own targets from what the site needs: how long can this camera be blind before it matters? A cash counter and a store-room corridor do not need the same answer.

## The three manual checks that still matter

Alerts do not replace these. They catch what alerts miss.

1. **Count live tiles against your camera register.** A two-minute job that regularly surprises people.
2. **Play back footage, don't just look at live view.** Pick three cameras at random and play back a time from yesterday and from two weeks ago.
3. **Find the oldest footage you have.** If the system should keep 30 days and the oldest clip is from nine days ago, your retention is nine days. The [storage guide](/insights/cctv-storage-how-many-days) shows how to work out why.

## Where monitoring software fits, and where it does not

Automated camera-health monitoring watches for exactly the failures above and can turn "nobody knew" into "someone was told at 10:03". It is only as good as its tests: which failures it detects, how quickly, and who it tells. Camera-feed health monitoring with PGAK **can be evaluated at your site**, using this same checklist. It is not yet in our [published capability register](/platform/capabilities) with evidence, so we make no claim about detection times until it has been measured on your cameras.

No monitoring fixes the cause. Repeated video loss on one camera means a cable, connector or power supply needs repairing, and a covered lens means someone needs to go and look. For deliberate covering, see [tamper detection: they cover the camera first](/insights/cctv-camera-tampering-detection).

## Next step

The [Camera health and recording checks calculator](/platform/capabilities#scenario-C31) compares the staff time manual checks take with the time spent reviewing automated exceptions, using your own camera count. More planning tools are on the [calculators page](/calculators). If you would like the failure-injection test run with you on site, [ask for a site-specific assessment](/free-audit).
