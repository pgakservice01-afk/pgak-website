---
title: "CCTV monsoon failures: how to prevent moisture and power damage"
metaTitle: "CCTV monsoon failures: a moisture and power checklist"
date: "2026-09-12"
updated: "2026-10-08"
category: "Camera Setup"
excerpt: "Monsoon rarely kills the camera body. It finds the open cable entry, the taped joint, the poor earth and the UPS nobody tested. A before, during and after inspection checklist that relies on checks, not on 'weatherproof' labels."
metaDescription: "Monsoon CCTV faults usually start at cable entries, joints, earthing and power, not the camera. A before, during and after checklist with pass/fail checks."
readTime: 8
image: "/insights/category/camera-setup-2.webp"
draft: true
reviewStatus: "Awaiting PGAK engineer review. Removed from the live version: 'outdoor cameras sold in India are built to handle rain', 'surges more frequent in monsoon than any other season', 'prevents almost all of it', the 'every June and July we get the same call' anecdote and the 'sites that do this rarely fail' claim — none are evidenced. Check: the IP-code explanation (IEC 60529: IP66 = dust-tight and powerful water jets; IP67 = temporary immersion) is stated generally; surge protection advice is framed as 'ask a qualified electrician'."
faqs:
  - q: "What CCTV problems does the monsoon cause?"
    a: "The common ones are water getting in through cable entries, open junction boxes and taped joints; condensation fogging the inside of dome housings; corrosion at outdoor connectors; and power faults during storms, from outages that outlast the UPS to surges that damage power supplies, switches or recorders. The camera body is often not where the fault starts."
  - q: "Is an IP66 or IP67 camera waterproof?"
    a: "An IP rating describes how the camera housing performed in a specific standard test: IP66 against dust and powerful water jets, IP67 against temporary immersion. It says nothing about the cable entry, junction box or connector the installer made on your wall, which is where water usually gets in. Check the rating on the model's datasheet, then check the installation."
  - q: "Why do CCTV domes fog up in the rain?"
    a: "Humid air gets inside the housing through a damaged seal or a poorly closed cable entry, and condenses on the inside of the glass when the temperature drops during rain. A dome that fogs repeatedly has a sealing problem, not a camera defect. Fix the seal and, where the housing allows, replace the desiccant."
  - q: "What should a pre-monsoon CCTV check include?"
    a: "Confirm each outdoor camera's rating from its datasheet; inspect every cable entry, gland, junction box and connector; look for moisture inside domes; have an electrician check earthing and surge protection; test the UPS under the real load for the length of a typical outage; and play back recordings to confirm every camera records. Repeat the recording check after every major storm."
---

**Straight answer: monsoon rarely breaks the camera itself. It finds the weak points around it: a cable entry left open, a joint wrapped in tape, a junction box under an eave that rain still reaches, an earth that was never tested, and a UPS nobody has timed. An inspection before the season, a quick check after each big storm and a review afterwards catch most of these. They depend on checks, not on the word "weatherproof" on a box.**

When a camera goes dark in July or shows nothing but a white blur, the camera usually gets the blame. Often the cause was a joint or a seal around it that had been letting moisture in for months.

## Where does monsoon damage actually start?

**Cable entries and junction boxes.** A cable gland left finger-tight, a box with its knock-out left open, or a box skipped because "it's under the eave". Wind-driven rain reaches places that look sheltered, and water can run along a cable into the housing.

**Taped joints and exposed connectors.** BNC, RJ45 and power connectors wrapped in ordinary tape corrode over a humid season. The picture often degrades slowly, so it gets blamed on an ageing camera.

**Domes that fog.** If a housing's seal is damaged, humid air keeps getting in and condenses on the inside of the glass every time the temperature drops.

**Power.** Storms bring outages and voltage disturbances. An outage longer than the UPS lasts means a gap in recording. A surge on a long outdoor cable run, or a poor earth, can damage power supplies, switches, cameras or the recorder.

**Pooling water.** Cable runs with a low point near a connector let water sit against the joint for days.

## What does an IP rating tell you, and what doesn't it?

An IP (ingress protection) code describes how the housing performed in a standard test. IP66 means dust-tight and protected against powerful water jets; IP67 adds protection against temporary immersion. Two cautions:

- **Read it from the model's datasheet,** not from the box or the quote, for each outdoor camera. An indoor-rated camera mounted outside is a replacement job, not a sealing job.
- **The rating covers the housing as tested,** not the cable entry, junction box or connectors made on your wall. Most water gets in there.

## The inspection and maintenance checklist

Electrical work — opening powered boxes, testing earthing, fitting surge protection, anything on a ladder near live cables — is for a qualified electrician with power isolated. Never open a powered junction box in the rain. Everything else here can be done by a careful site person or your maintenance provider.

### Before the monsoon (May–June)

| Item | How to check | A pass looks like | If it fails |
|---|---|---|---|
| Outdoor rating | Look up each outdoor camera's model on its datasheet | An outdoor IP rating suited to the position | Plan to replace or relocate; resealing will not fix it |
| Cable entries and glands | Inspect at every camera and box | Gland tight, seal intact, no gaps around the cable | Reseal or replace the gland |
| Junction boxes | Open (power isolated) and inspect | Dry inside, gasket supple, lid closes fully, unused openings sealed | Dry out, replace the gasket, seal openings |
| Connectors | Inspect outdoor BNC, RJ45 and power joints | Inside a sealed box or proper weatherproof enclosure; no green or white corrosion | Re-terminate and enclose properly; no tape-only joints |
| Drip loops and routing | Look along each outdoor run | Cable dips below the entry point so water drips off; no low point at a joint | Re-route or add a drip loop |
| Conduit ends | Inspect where conduit meets boxes | Sealed or fitted with proper adaptors | Seal |
| Dome housings | Look inside in dry weather | No mist, droplets or water marks | Fix the seal; replace desiccant if the housing uses one |
| Earthing | Electrician tests at the recorder, switch cabinet and poles | Earth resistance within the electrician's acceptance limit | Electrician to correct before the rains |
| Surge protection | Electrician reviews long outdoor runs and the recorder supply | Protection where the electrician judges it necessary | Electrician to fit |
| UPS runtime | Switch off mains to the CCTV circuit and time it, with cameras, switch, recorder and any processing unit on it | Runs for at least your typical outage length | Replace batteries or resize |
| Recorder location | Inspect the room or rack | No leak path above it, ventilation clear, off the floor | Move or protect it |
| Recording | Play back yesterday and the oldest footage on every camera | All cameras recorded, timestamps correct | Fix before the season, not during it |
| Spares | Check what is on hand | At least one spare power supply and connectors for outdoor positions | Order now |

### During the monsoon — after every major storm

1. Count live tiles against your camera register.
2. Play back the storm period on outdoor cameras. Check for gaps, a white or fogged picture, or rain glare at night.
3. Check the recorder's disk status and clock.
4. Look for new mist inside domes.
5. Note any camera that drops out during rain and comes back. That pattern almost always points to a joint or power fault, not the camera.

### After the monsoon (September–October)

1. Reopen any box or gland that showed trouble and inspect for corrosion.
2. Clean lenses and housings. Spider webs and insects near infrared lights cause glare and false motion at night.
3. Record what failed, where and why, in a simple log. Next year's pre-monsoon check starts from that list.
4. Re-time the UPS. Batteries weaken over the season.

## Is this a one-time fix?

No. Seals and gaskets harden with heat and sunlight, and joints that held last year may not hold this year. Treat it as an annual job, scheduled before the rains. If you have a maintenance contract, it should include this checklist and the recording evidence; see [what a CCTV AMC should include](/insights/cctv-amc-what-should-it-include).

## How does monsoon affect AI alerts?

Rain, droplets on the lens, insects and infrared glare can all make a scene look busy to motion-based alerts and to analytics. If alerts become noisy in the rains, the first step is to clean and correct the camera, then retune the zones and rules. That tuning can be evaluated at your site. No software rescues a camera whose dome is fogged. For more on noisy alerts, see [why CCTV alerts get muted, and how to earn them back](/insights/ai-cctv-false-alarms-how-to-reduce).

## Where this checklist does not help

It cannot make an indoor-rated camera suitable for outdoor use, and it does not replace an electrician's judgement on earthing and surge protection. If cabling was poorly done in the first place, resealing joints only buys time. [Where installers cut corners on cabling](/insights/cctv-cabling-corner-cutting) covers what a sound installation looks like. To catch a camera that fails mid-storm, see [how to know when a CCTV camera stops recording](/insights/cctv-camera-offline-how-to-know).

## Next step

The [Camera health and recording checks calculator](/platform/capabilities#scenario-C31) estimates the staff time manual post-storm checks take across your cameras. Other planning tools are on the [calculators page](/calculators). If you would like the outdoor positions, power and recording reviewed before next season, [ask for a site-specific assessment](/free-audit).
