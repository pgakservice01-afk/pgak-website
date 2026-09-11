---
title: "CCTV cabling: where installers cut corners"
date: "2026-09-11"
category: "Buying Guide"
excerpt: "Cameras rarely die in year one. Cabling does — a wrong cable grade, an outdoor joint with no conduit, a PoE budget nobody calculated. What to check before you sign off an installation."
readTime: 6
faqs:
  - q: "What cable should be used for CCTV installation?"
    a: "IP cameras need outdoor-rated CAT6 (or CAT5e at a push) carrying both data and power over PoE. Analogue cameras need coaxial cable rated for the resolution in use, plus a separate power run. Indoor-grade cable used outdoors is the single most common wrong choice — it cracks and lets in moisture within a year or two."
  - q: "Does CCTV cabling need conduit?"
    a: "Yes, for any run outdoors, on a roof, or exposed to sun. UV breaks down unprotected cable jacket in one or two seasons, and open cable is an easy target for rodents and monkeys. Conduit costs more upfront and is the first thing cut from a tight quote."
  - q: "Why do CCTV cameras fail after a year even though the hardware is fine?"
    a: "Most 'camera failures' in year two are cabling failures. A joint with no waterproof gel corrodes after a monsoon, a badly terminated connector adds resistance that fails intermittently, or the cable itself has degraded from UV exposure. Swapping the camera fixes nothing because the camera was never the problem."
  - q: "What is a PoE budget and why does it matter for CCTV?"
    a: "It is the total wattage a PoE switch can deliver across all connected cameras. Each camera draws more when its IR illuminator or heater is running, typically at night or in winter. A switch sized for daytime draw silently drops or reboots cameras once several run their heaters together — which is exactly when you need footage most."
  - q: "Can AI analytics be added to a badly cabled system?"
    a: "Not reliably. Analytics depends on a stable, unbroken video stream. A camera that drops out for a few seconds an hour will generate false alerts or miss events entirely, no matter how good the software is. Cabling has to be fixed before analytics is worth adding."
---

**Straight answer: most CCTV cabling problems don't show up on day one — they show up eighteen months later, as cameras that go dark after rain, drop out at night, or reboot in winter. The usual causes are indoor-grade cable used outdoors, joints with no conduit or waterproofing, and a PoE switch sized for daytime power draw instead of peak draw. None of this is visible in a working demo; all of it is checkable before you sign off.**

A camera that stops working gets blamed on the camera. Almost every time we've traced a "faulty camera" complaint back to its root cause, the camera was fine. The cable feeding it wasn't.

This matters because cabling is invisible once it's in the wall or up the pole. You can test a camera in the shop. You cannot test how a cable run behaves after a full monsoon, and by the time you find out, the installer who cut the corner is long gone.

## Why does a camera that worked fine for a year suddenly go dark?

Because the cable degraded, not the camera. Indoor-rated cable exposed to sun for a year develops cracks in the jacket. Water gets in at the crack, or at an unsealed connector, and the signal fails — sometimes completely, sometimes only when it's raining, which makes it maddening to diagnose. Swap the camera and the fault often follows the cable to the next one.

## What cable grade should actually be used?

For IP cameras, that means outdoor-rated CAT6 (CAT5e is acceptable for shorter runs) carrying both data and power over PoE. For analogue cameras, it means coaxial cable rated for the resolution you're running, with a separate power cable — cheap combination cables sold for analogue setups often can't carry enough current for the camera's IR at night. The grade should be specified on the quote by name, not just "cable included."

## Does the cabling really need conduit?

For anything outdoors, yes. Two things go wrong without it: UV exposure breaks down unprotected cable jacket within one or two Indian summers, and open cable is an open invitation to rodents and monkeys, both of which are a real and common cause of outages on rooftop and boundary-wall runs. Conduit is also the easiest line item to quietly drop when a quote needs to look cheaper, because it doesn't show in a demo and nobody checks it until something fails.

## Why do outdoor joints fail specifically?

Every joint outdoors is a moisture entry point unless it's sealed. A proper installation uses waterproof gel-filled connectors or heat-shrink seals at every junction box, and routes the cable so water can't pool at the joint. A joint taped with ordinary electrical tape looks fine on installation day and corrodes quietly through the next monsoon — which is exactly when the failures start turning up.

## What is a PoE budget, and why does it catch people out?

A PoE switch has a fixed total wattage it can deliver across every port. Each camera's IR illuminator or heater pulls more power at night or in winter than it does at midday. A switch sized to daytime draw runs fine for months, then starts dropping or rebooting cameras the first cold night several run heaters at once — usually discovered when footage from an incident is missing, not before. Ask any installer for the PoE budget calculation in writing, not just "the switch supports enough cameras."

## Where does this stop being worth fixing yourself?

Cabling faults hide well: a run that fails once a week is easy to miss until you're specifically looking for it. If you're auditing an existing site, the fastest check is simple — pull up footage from three random days in the last two months and see if any camera has a gap. A pattern of short, unexplained gaps almost always traces back to cable, joints, or power, not the camera itself.

We build AI software that runs on the cameras a site already has, and that software is only as reliable as the video feed underneath it — so we have a direct interest in cabling being solid before analytics goes on top, which is worth knowing when weighing this advice. Even a well-cabled system still has limits: cabling can't fix a camera pointed at the wrong angle or placed too far from what it needs to see. That's a separate problem, and worth checking before you rewire anything.

[Ask for a free feasibility check](#dealer)
