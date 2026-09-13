---
title: "Loitering detection: what it catches that motion does not"
date: "2026-09-13"
category: "Security Basics"
excerpt: "Motion detection fires on anything that moves. Loitering detection adds a dimension motion can't see — how long someone stays. Where that difference earns its place, and where it just adds noise."
readTime: 5
faqs:
  - q: "What is loitering detection in CCTV?"
    a: "Loitering detection is a video analytics feature that measures how long a person or vehicle stays in a defined zone, and raises an alert once that dwell time crosses a threshold you set — for example, someone standing near a cash counter or a parked vehicle for more than two minutes. It is built on top of the same person-tracking that motion detection uses, with a timer added."
  - q: "How is loitering detection different from motion detection?"
    a: "Motion detection alerts on any movement in frame — a person walking past counts the same as a person walking past ten times. Loitering detection tracks an individual across frames and only alerts once they've remained in a zone longer than the threshold, which filters out normal passing traffic and flags dwelling instead."
  - q: "Where does loitering detection work best?"
    a: "Places where normal behaviour is brief and lingering is the anomaly: an ATM after hours, a back-gate blind spot, a parked-vehicle zone, or a counter area outside business hours. The clearer the line between 'passing through' and 'staying', the better the feature performs."
  - q: "Can loitering detection cause false alarms?"
    a: "Yes, in any zone where lingering is normal — a bus stop, a smoking area, a queue, a reception bench. In those spots almost everyone crosses the dwell threshold, so the alert stops meaning anything and gets ignored, which defeats the purpose of having it."
  - q: "Do all cameras need loitering detection turned on?"
    a: "No. It's a zone-specific tool, not a blanket setting. Turning it on everywhere floods the same person who reviews alerts with noise from spots where dwelling is normal, and a flooded reviewer stops checking any of it."
---

**Straight answer: loitering detection tracks how long a person stays in a zone and alerts once that crosses a threshold you set — something plain motion detection cannot do, because motion detection treats every movement the same regardless of duration. It earns its place in zones where lingering is genuinely unusual, and becomes noise in zones where lingering is normal.**

Most CCTV alerts on movement. A leaf blowing past the lens and a person casing your gate for ten minutes generate the same kind of trigger: something moved. Loitering detection adds the one dimension motion detection is blind to — time.

## What does loitering detection actually measure?

It follows an individual person or vehicle across frames inside a zone you've drawn on the camera view, and starts a clock the moment they enter. Cross a dwell-time threshold — thirty seconds, two minutes, whatever you set for that zone — and it raises an alert. Leave the zone before the threshold, no alert. The tracking underneath is the same technology motion and person-detection use; loitering detection is that tracking with a stopwatch attached.

## How is this different from ordinary motion detection?

Motion detection answers one question: did something move in this frame? It has no memory of what happened a minute ago, so it can't distinguish a person walking straight through from a person standing still, and it certainly can't distinguish someone here for five seconds from someone here for five minutes. Loitering detection needs that memory — it has to keep tracking the same person across time — which is exactly why it can measure dwell and motion detection can't.

## Where does it genuinely earn its place?

Anywhere the normal case is brief and the exception is a person staying. An ATM lobby after closing time — nobody should be standing there for two minutes. A back gate or a gap in the perimeter fence — nobody has a reason to linger. A cash counter or safe area outside business hours. A parked vehicle left unattended near a loading bay longer than a delivery should take. In all of these, "someone stayed" is close to a direct signal of "something is being checked out or planned," and the alert is worth acting on.

## Where does it just add noise?

Anywhere dwelling is the normal behaviour. A reception area, a bus stop, a smoking corner, a queue at a counter during business hours — put a loitering zone there and nearly everyone crossing the frame will trip the threshold, because staying put is exactly what they're supposed to do. Once that happens, whoever reviews alerts starts ignoring the loitering feed altogether, and you've spent effort building an alert nobody trusts. This is the honest limitation of the feature: it only works where the site's own behaviour pattern gives it a clean line between normal and abnormal.

## Should you turn it on everywhere?

No — treat it as a per-zone decision, not a site-wide setting. Walk your own site and ask, for each camera, "is there a normal reason to stand here for two minutes?" If the answer is no, that's a good loitering zone. If the answer is yes, loitering detection there will only generate alerts your team learns to swipe away, which is worse than not having it at all, because it trains people to ignore the same alert type at a camera where it might have mattered.

We build this into our AI CCTV systems as one of several detection layers, so factor that in when weighing the recommendation. The honest caveat stands regardless of who supplies it: loitering detection is only as good as the zones you define and the thresholds you set for them — it is not a feature you switch on once and forget.

[Ask for a free feasibility check](#dealer)
