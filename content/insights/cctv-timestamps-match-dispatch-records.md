---
title: 'CCTV timestamps: match recordings to dispatch records'
metaTitle: 'CCTV timestamps: match recordings to dispatch records'
date: '2026-11-13'
updated: '2026-11-13'
category: Warehouse Security
excerpt: 'Build a clear time record before comparing CCTV, loading events and dispatch entries. Keep original timestamps and unresolved differences visible.'
metaDescription: 'Check camera clocks, time zones and event meaning before matching CCTV with dispatch records. Use a practical reconciliation worksheet for the review.'
readTime: 5
image: /insights/category/warehouse-security.webp
imageCaption: 'Warehouse reference image; not a PGAK installation or timestamp accuracy test.'
faqs:
- q: 'Does the time shown on a CCTV image prove when a dispatch entry was made?'
  a: 'No. Identify the source and meaning of each timestamp. A camera observation, server receipt, dispatch entry and approval can describe different moments.'
- q: 'Will correcting the camera clock repair earlier recordings?'
  a: 'Do not assume it will. Preserve the original recordings and time information. Document observed differences and keep any review adjustment separate from the source.'
- q: 'Does matching timestamps prove the correct goods were dispatched?'
  a: 'No. Time can help locate a sequence. Quantity, product identity, order matching and dispatch authorization need their own evidence.'
---

A dispatch entry says 14:05, while the nearest loading clip shows 14:02. That difference needs an explanation before anyone decides the wrong movement was recorded. The camera clock may differ, the entry may have been made later, or the records may refer to different events.

The first task is to make the comparison understandable. Identify what each time represents, preserve the source records and document any uncertainty. Buying another camera or changing an overlay does not settle those questions by itself.

## Identify the moment behind each timestamp

Use plain descriptions before trying to match fields from different systems.

| Record | What to establish |
| --- | --- |
| Time visible in the image | Which device or software produced the overlay, and which date and time zone it uses |
| Recording timeline | Whether the player uses capture time, server receipt time or another documented reference |
| Counting or alert record | The event definition, timestamp source and whether later processing affects the displayed time |
| Dispatch entry | Whether the time means loading, data entry, order completion or approval |
| Review note | When the person reviewed the evidence and what decision they made |

These moments can be different even when every system is working as designed. Ask the supplier or system owner to explain unknown fields rather than giving all of them the label “event time”.

Axis documents a specific example in its [Camera Station troubleshooting guide](https://help.axis.com/en-us/axis-camera-station-troubleshooting-guide): when a device and server are out of sync, a recording can be timestamped by server receipt instead of device recording time. This describes that product's behavior, not a rule for every recorder or AI Alerto configuration.

## Record the clock relationship before a change

Have an authorized person note the camera or recorder reference, displayed date and time, configured time zone, comparison reference and moment of the check. Include whether a synchronization service is configured and whether the installed product reports it as working. An enabled setting alone should not be recorded as a successful test.

Axis's [device documentation](https://help.axis.com/en-us/axis-m1137) distinguishes automatic synchronization, manually chosen time servers, a one-time clock setting and the time zone. The relevant choices vary by product. Ask the responsible technician to review the actual model and version; do not apply another manufacturer's menu instructions blindly.

Record current observations before changing settings. A difference observed today does not establish the difference last week. A restart, clock correction or configuration change between those dates may require separate investigation. Keep unverified historical periods marked as unresolved.

## Use a worksheet that preserves both times

The following is a proposed review format, not an automated integration or a completed customer test.

| Field | What the reviewer records |
| --- | --- |
| Review reference | A stable reference for this comparison |
| Source records | Camera/channel, clip reference and dispatch or batch reference |
| Original time | The full date, time, time zone and meaning from each source |
| Clock check | When the relationship was checked, the comparison reference and observed difference |
| Review adjustment | Any proposed conversion, its reason and the period for which it is supported |
| Matching evidence | Observable movement and other references supporting the proposed match |
| Uncertainty | Missing footage, ambiguous event, unknown time zone or unverified historical offset |
| Decision | Matched for the stated purpose, needs more evidence, or not matched; reviewer and review time |

For an illustrative calculation, suppose a recorder is observed to run three minutes behind a documented comparison clock during the same review interval. A displayed 14:02 corresponds to 14:05 on that reference for the checked relationship. Keep both values. Do not replace the original timestamp or apply the adjustment to every historical clip without evidence that it remained valid.

If a dispatch entry was typed after loading, its entry time may still differ from the loading time after the clocks are reconciled. Record that difference in meaning instead of forcing the times to agree.

## Match the sequence, not just the nearest time

Start with an interval broad enough to include the known uncertainty. Review the relevant approach, movement and departure where available. Use camera/channel references and permitted batch or dispatch identifiers to reduce ambiguity. A nearby timestamp alone does not prove two records describe the same goods.

Keep unavailable intervals visible. No clip, no count or an unreadable record should remain an evidence gap, not become a zero or a successful match. Ask the reviewer to record alternatives when more than one movement could fit.

Quantity, product identity and release authority are separate decisions. The [counting-versus-SKU guide](/insights/cctv-counting-vs-sku-verification) explains those boundaries. A useful time match helps find the relevant sequence; it does not establish what was inside a carton or whether the dispatch was approved.

## Check the exported result and the next controlled observation

Use the installed system's documented export method and permitted access. Open the resulting file with its supported player, check the camera and selected interval, and record how the player displays time. Keep the original export separate from an annotated working copy.

For routine handover or a planned pilot, agree a safe observation with the site's responsible team. Compare the same permitted event across the recording and relevant business record. Note any timing uncertainty, missing field or manual step. Repeat the check after an authorized configuration change before relying on the revised workflow.

Use the [camera-health guide](/insights/cctv-camera-offline-how-to-know) when live view or playback itself is unavailable, and the [evaluation worksheet](/resources/evaluation-method) to define the test and acceptance decision. A clock review is one part of that assessment, not a substitute for checking the view or the proposed analytics.

## Prepare the assessment brief

Bring the camera and recorder details where known, one operational question, the names of the records being compared and a description of the observed mismatch. Share recordings only through an agreed channel with the required permission. Publicly posting identifiable footage is not needed to describe the problem.

AI Alerto by PGAK can begin with a scoped review of the requirement and available evidence. Existing-camera suitability, timestamp behavior and any connection to dispatch software must be verified for the proposed setup. This guide establishes no automatic synchronization, matching or product-identification capability.

## Common questions

### Does the time shown on a CCTV image prove when a dispatch entry was made?

No. Identify the source and meaning of each timestamp. A camera observation, server receipt, dispatch entry and approval can describe different moments.

### Will correcting the camera clock repair earlier recordings?

Do not assume it will. Preserve the original recordings and time information. Document observed differences and keep any review adjustment separate from the source.

### Does matching timestamps prove the correct goods were dispatched?

No. Time can help locate a sequence. Quantity, product identity, order matching and dispatch authorization need their own evidence.

[Request a site-specific CCTV assessment](/free-audit)

Installers evaluating a customer project can use the separate [partner enquiry path](/partners) and describe the proposed scope and unresolved checks.
