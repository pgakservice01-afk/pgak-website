---
title: "Privacy masking: calculate redaction workload and verify exports"
metaTitle: "CCTV privacy masking: redaction time and export tests"
date: "2026-10-08"
category: "Compliance"
excerpt: "Blurring faces before a clip leaves the building takes real staff time, and a mask that shows on screen is not always a mask in the exported file. How to size the workload and test that masking actually holds."
metaDescription: "Work out CCTV redaction hours from your own exports, then test that masks stay in exported files and unmasked originals stay restricted."
readTime: 6
draft: true
reviewStatus: "Awaiting PGAK engineer review. No PGAK evidence record exists for privacy masking; written as a buyer evaluation guide only. Workload figures are hypothetical. The article deliberately states no legal rule on when masking is required; it defers to existing privacy articles and an adviser. If a lawyer later wants a specific DPDP point added, that needs a primary-source citation."
faqs:
  - q: "Does face masking make a CCTV recording anonymous?"
    a: "Not necessarily. Clothing, a name on a uniform, a vehicle number plate, a voice on the audio track or simply the location and time can still identify someone. Masking is one control among several, alongside limiting who can see the original."
  - q: "Where should privacy masking happen — in the camera, during viewing, or on export?"
    a: "It depends on the purpose. Masking set in the camera blanks an area permanently in the recording, so the detail cannot be recovered even for an investigation. Masking during viewing keeps an unmasked original that a few authorised people can still see. Masking on export protects a copy you share. Ask the supplier which of these it does, because each behaves differently."
  - q: "How do I check that an exported clip is really masked?"
    a: "Open the exported file on a different computer in an ordinary video player and step through it frame by frame, especially where people enter or leave the frame, turn sideways or are far away. Try a second player and a converted copy. If the mask disappears in any of them, it was not part of the picture."
---

**Straight answer: privacy masking blurs or blanks faces or areas in CCTV footage, either in the camera, during viewing, or when a clip is exported. Before buying it, answer two questions with your own numbers. First, how much staff time does redaction take — exports per month × minutes of footage × labour per minute of video. Second, does the mask actually stay in the file that leaves your building, while the unmasked original stays with the few people who need it? Test the second before trusting the first.**

Masking usually comes up when a clip has to go to someone outside the core team — an insurer, a customer, a contractor, other employees — and the people in the background have nothing to do with the incident.

## Where can masking happen?

Three places, with different consequences:

| Where | How it works | What it means |
|---|---|---|
| In the camera (static privacy zone) | A fixed area is blanked before recording | Permanent. The blanked area cannot be recovered, even for a serious investigation. Suits areas you should never record, such as a neighbour's window. |
| During viewing (dynamic masking) | Detected faces are blurred on screen; the recording underneath is unmasked | Original remains available to authorised roles. Who those roles are is the real control. |
| On export (redaction) | A copy is produced with faces or areas blurred | Protects the shared copy. Whether the mask is burned into the picture depends on the export path — test it. |

The [privacy masking guide](/features/guides/privacy-masking) puts the core question in one line: ask whether masking happens before recording, only during viewing, or only on exported clips.

Whether a particular disclosure needs masking at all is a question about your obligations, not about the software; the [workplace privacy article](/insights/cctv-workplace-privacy-india) and the [DPDP article](/insights/is-ai-cctv-legal-in-india-dpdp-act) set out the questions, and your own adviser should confirm the answer. This article is about whether the masking works.

## Part 1: size the redaction workload

First measure your own labour ratio — minutes of staff time per minute of footage. Take one busy 2-minute clip and time someone redacting it by hand in whatever tool you use today. Then, if you are trialling assisted masking, time the same clip with the tool, including checking every frame and fixing missed faces.

labour ratio = staff minutes spent ÷ minutes of footage

Then:

redaction hours per month = exports × footage minutes per export × labour ratio ÷ 60

**Illustrative example** (hypothetical numbers): 6 exports a month, each 20 minutes of footage.

- Manual: a measured 3 staff minutes per video minute → 6 × 20 × 3 ÷ 60 = 6 hours a month.
- Assisted with review: a measured 1 staff minute per video minute → 6 × 20 × 1 ÷ 60 = 2 hours a month.
- Hours released = 6 × 20 × (3 − 1) ÷ 60 = 4 hours a month.

Note what the assisted ratio contains: checking. Automatic masks miss faces — side profiles, people at the edge of frame, small faces at distance — so every exported clip still needs a person to step through it. A ratio measured without that review is not the real one.

If you export once a quarter, the honest answer may be to redact by hand and skip the feature.

## Part 2: the export test

Run this on the actual system, with a clip that has several people moving through it, by day and by night. Record the date, software version, camera and clip used.

| # | Test | How | Pass when |
|---|---|---|---|
| 1 | Mask present in the file | Export a masked clip; open it on a different computer in an ordinary player; step frame by frame | Every face that should be masked is masked in every frame |
| 2 | Mask burned in, not a layer | Open the same file in a second player; check whether the export is a proprietary format with a separate mask layer | The mask is part of the picture in every player |
| 3 | Survives conversion | Convert the export to another common format and reopen | Mask still present |
| 4 | Stills too | Export a snapshot from the same moment | Snapshot is masked |
| 5 | Hard cases | Check entries and exits, side profiles, people partly hidden, small faces far away, motion blur, infrared night footage | Misses are counted; each is fixed before release |
| 6 | Other identifiers | Look for names on uniforms, ID cards, vehicle plates, screens and documents in view | Masked where the purpose requires it, or a deliberate decision recorded |
| 7 | Audio | If audio is recorded, listen for names and voices | Audio removed or handled separately — masking video does nothing to sound |
| 8 | File name and metadata | Check the export's file name and properties | No employee names or IDs carried along |
| 9 | Original access | Log in as an ordinary operator; try to view and export unmasked footage | Only named roles can see or export the original |
| 10 | Audit trail | Unmask or export an original with an authorised account; check the log | User, time and clip are recorded |
| 11 | Sharing route | Check how exports actually leave the site | An approved route, not chat apps or personal phones |

A system that passes 1 to 4 but fails 9 has masked the copy and left the original wide open, which defeats the purpose.

## The original still matters

A masked copy is for sharing. If the incident becomes a police complaint or a claim, the intact original — exported with the recorder's own function and a record of who handled it — is what you may need. Keep it, restricted, alongside the masked copy. The [CCTV evidence article](/insights/cctv-footage-legal-evidence-india) covers export and custody.

## Where masking falls short

- **It does not anonymise.** Clothing, location, time and context can still identify someone.
- **Static zones are permanent.** Blank a doorway in the camera and you will never see who used it, even when you need to.
- **Automatic masks miss.** A human review of every exported clip stays in the process.
- **It is not a substitute for collecting less.** Pointing a camera away from places it should not see is better than masking them afterwards.

## Next step

Put your own measured ratios into the [privacy masking calculator](/features/guides/privacy-masking#scenario-C18); the [calculators page](/calculators) has the storage and investigation tools that usually come up alongside.

Privacy masking is an industry capability that PGAK can evaluate at your site; whether it would be supplied as PGAK software, a licensed module or an integration, and where in the chain it would apply, is confirmed per site, with anything extra itemised in the quote. To run the export test on your own system, [ask for a site-specific assessment](/free-audit).

This is general information, not legal advice. Confirm your own obligations on recording, sharing and masking footage with a qualified adviser.
