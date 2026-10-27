---
title: "ANPR at a factory gate: camera angle, lighting and failed number-plate reads"
metaTitle: "ANPR at Factory Gates: Setup & Accuracy Checklist"
date: "2026-09-13"
category: "Security Basics"
image: "/insights/covers/anpr-number-plate-recognition-when-it-works.webp"
updated: "2026-10-27"
excerpt: "Plan ANPR for a factory gate: test plate detail, angle, lighting, speed and failed reads. Use a measured pilot before automating vehicle access."
metaDescription: "Plan ANPR for a factory gate: test plate detail, angle, lighting, speed and failed reads. Use a measured pilot before automating vehicle access."
---

**ANPR—automatic number plate recognition—turns a visible vehicle plate into searchable text. At a factory gate, success depends on a readable image, supported plate formats and a controlled workflow for failed or uncertain reads.** A wide security view is not automatically a usable plate-reading view.

Start with the business task: entry logging, matching an expected vehicle, finding a previous visit or supporting an access decision. Those tasks have different consequences when the plate is wrong.

## What does the camera need to see?

The plate needs enough detail, suitable focus and exposure, manageable perspective and sufficiently little motion blur. “4K camera” alone tells you none of those at the point where a vehicle passes.

The camera does not universally need to be at plate height. Mounting height, distance and angle work together. Follow the chosen camera and recognition software's installation guidance, then validate the actual lane. Axis's [license-plate capture white paper](https://whitepapers.axis.com/en-us/license-plate-capture) explains the interaction between angle, speed, shutter and lighting; its values are product guidance, not a PGAK performance guarantee.

## What should you record during the site survey?

| Item | What to check |
|---|---|
| Lane and direction | Vehicle path, stopping point, entry/exit separation and competing lanes |
| View | Capture distance, angle, plate size in pixels and obstruction |
| Image settings | Focus, exposure, shutter, gain and the exact stream used by analytics |
| Lighting | Day/night changes, headlights, reflection and IR behaviour |
| Traffic | Speed, tailgating, vehicle classes and the busiest period |
| Workflow | Who resolves no-reads, mismatches, duplicates and exceptions |

Use full-size frames at the intended capture point, not only an overview thumbnail. Daylight results do not establish night performance.

## Why do number-plate reads fail?

Blur, glare, dirt, damaged or obscured plates, unsuitable fonts, occlusion and insufficient detail can all cause a missed or incorrect read. A plate that a human cannot read from the saved frame is an image-capture problem before it is an AI problem.

Keep wrong reads separate from no-reads. A no-read should enter an exception process. A confidently wrong read can be more consequential when it matches an allow-list entry, so assess the downstream decision as well as the text recognition.

## How should you measure an ANPR pilot?

Agree the test lanes, time periods and eligible vehicle passes in advance. Use an authorised reference log and count all passes within the agreed scope, including failures.

**Illustrative example:** 100 eligible vehicle passes produce 88 correct plate strings, seven no-reads and five wrong strings. The end-to-end exact-read rate is **88%**. Reporting only 88 correct out of 93 recognised strings would exclude the seven missed reads and answer a different question.

Record results by day/night, lane and representative vehicle conditions. Track duplicates, time-to-log and human correction workload. Averages can hide a failing night lane. Do not reuse this example as a PGAK or customer result.

## Can ANPR automatically open a barrier?

Some systems support access-control integration, but recognition alone is not a complete access or safety system. Confirm the controller, permissions, safety interlocks, fail-safe behaviour, audit trail and manual override with the responsible integrator. Test an uncertain plate, a system outage and an unauthorised vehicle before enabling automation.

A plate identifies a vehicle registration string, not the driver or the contents of a vehicle. Keep visitor, guard and emergency procedures appropriate to the site.

## What should you ask PGAK before buying?

Request a documented compatibility review, lane-specific test plan and explicit treatment of failed reads. Check the [ANPR service page](/anpr-number-plate-recognition), [camera compatibility guide](/platform/compatibility) and [supplier pilot scorecard](/insights/compare-ai-video-analytics-suppliers-india).

[Request a factory-gate ANPR assessment](/free-audit) with lane count, vehicle types, approximate speeds, day/night operating hours and the desired logging or access workflow. Equipment and scope should follow the survey and representative test.
