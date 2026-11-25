---
title: "CCTV Readiness Audit Checklist: Is Your System Ready for Alerts?"
metaTitle: "CCTV Readiness Audit Checklist for Existing Cameras"
date: '2026-11-20'
updated: '2026-11-23'
category: Camera Setup
excerpt: Review each camera requirement with its evidence, untested conditions and accepted next action before expanding a video-analytics proposal.
metaDescription: Review CCTV readiness with separate records for observed, untested and unresolved conditions. Clarify camera suitability and accepted alert ownership.
readTime: 7
faqs:
- q: Can existing CCTV cameras be used for video analytics?
  a: Suitability depends on the exact camera or recorder, available stream, view, lighting and intended task. Check the proposed configuration and representative
    conditions before treating a channel as suitable for rollout.
- q: Does an untested night view mean the camera has failed?
  a: No. Record the night condition as not tested. A demonstrated failure needs an agreed requirement and an observed result that did not meet it; missing evidence
    is a different state.
- q: Is naming an alert recipient enough to complete a readiness review?
  a: No. Confirm that the person accepts the relevant action and operating hours. Where notification is included, actual receipt and human acknowledgement are separate
    observations.
---


## Start with the event you need to notice

A CCTV audit is not a camera-counting exercise. It begins with an operational question.

Examples include:

- Is a vehicle entering a restricted gate after hours?
- Does a warehouse aisle need an alert when someone enters?
- Is a production zone visible enough to review a safety-related event?
- Can a shop team find a specific incident without searching hours of footage?

Choose one or two priority events first. This makes the audit practical and prevents a vague project such as “put AI on every camera.”

## 1. Check the camera view

Stand where the event happens and view the feed. Ask:

- Can the relevant person, vehicle or zone be seen clearly?
- Is the camera too high, too far away or pointing through glare?
- Is a gate, entrance or aisle partly blocked by stock, signage or a parked vehicle?
- Does the field of view change when a shutter, door or vehicle moves?

Analytics cannot repair a view that does not contain the event clearly. Repositioning or adding a camera may be more useful than changing software.

## 2. Check day, night and difficult light

A camera that works at noon can struggle at dusk, under a bright gate light or when headlights point towards it.

Review representative conditions:

- Daylight
- Low light
- Backlight at entrances
- Rain or dust where relevant
- Busy periods with people and vehicles moving through the scene

Do not make a decision from one ideal screenshot. Test the view when the real event is likely to happen.

## 3. Confirm the video and recording path

For each priority camera, check:

- It is recording and can be played back
- Storage retention is sufficient for investigation
- The approved stream can be accessed reliably
- Network equipment and recorder health are known
- Backup power protects the parts of the chain that must keep recording

For a related outage check, see [PGAK's CCTV power-backup checklist](/insights/cctv-power-backup-checklist).

## 4. Define the response before the alert

An alert without an owner becomes noise. Write down:

- The exact event
- The person or team receiving it
- The time they should review it
- The action they may take
- What happens after hours
- How false alerts will be reviewed and tuned

A small pilot with a clear response route is more valuable than broad notifications to everyone.

## 5. Check privacy and access controls

Confirm that only appropriate people can view live feeds, playback and exports. Camera placements should match a genuine purpose, and the site should have clear guidance for access and retention.

See [who should view CCTV footage at work](/insights/who-can-view-cctv-footage-at-work) for a practical access-policy checklist.

## 6. Run a limited pilot

A good pilot uses a few high-value views: for example, a vehicle gate, dispatch point or restricted aisle. Test normal, busy and low-light conditions. Review useful alerts, missed events and false alerts with the people who use the system.

Expand only when the site understands what the workflow delivers and where it has limits.

## Keep readiness evidence separate from missing checks

Use one row for each requirement and relevant condition. A camera can have usable daytime playback while its nighttime view remains unreviewed. A single overall tick would hide that difference.

The following are proposed review labels, not product status codes or a certification standard:

| State | What the record means | Next decision |
| --- | --- | --- |
| Observed for the stated condition | The agreed check was performed and its requirement met; retain the evidence and limits | Decide whether another condition or dependency still needs review |
| Not tested | The condition matters, but the check was not performed | Agree who will review it and when the relevant condition is available |
| Unresolved | A check was attempted, but the evidence is missing, ambiguous or insufficient for the decision | Identify the missing evidence rather than assigning a pass or fault |
| Did not meet the requirement | An observed result failed the criterion agreed for that check | Agree a bounded investigation, change or exclusion and the retest needed |

If a requirement is outside the proposed scope, write the reason separately. Do not mark it successful to make the sheet complete. Keep the camera/channel, proposed task, configuration reference, condition, observation date and evidence reference beside the state. Add the person who has actually accepted the next action and the next checkpoint; a suggested name is not an accepted assignment.

For detailed live-view, playback, export and receipt checks, use the [existing recording and alert-receipt guide](/insights/cctv-camera-offline-how-to-know). This readiness record points to that evidence rather than repeating the repair procedure.

### A hypothetical readiness decision

Suppose an authorised reviewer opens playback from one agreed daytime interval. The night view has not been examined. An alert contact has been proposed, but has not accepted the review role. This is an illustrative example, not a customer site or PGAK test result.

Record daytime playback as observed for that interval, nighttime suitability as not tested, and alert ownership as unresolved. The record does not establish that the camera is faulty, that all recording periods are available or that after-hours response is covered. A sensible next decision is to complete the missing night review and ownership acknowledgement before relying on those parts of the proposal. Any narrower evaluation must keep its limits and the site's existing security process explicit.

Do not average these rows into a percentage of the site that is ready. A missing critical dependency can matter more than several completed checks. The responsible technical and operational reviewers should decide which evidence is needed for the stated task.

## Verify the proposed configuration before expanding

Keep a configured setting separate from a demonstrated result. A storage setting does not itself prove playback of the required interval. As a product-specific example, the [AXIS Camera Station Pro manual](https://help.axis.com/en-us/axis-camera-station-pro) treats live viewing, recording playback and export as separate operations. Follow the instructions for the installed equipment; this is not evidence that PGAK supports every format or recorder.

Where a proposal relies on ONVIF conformance, check the exact product and firmware/software version against the [official ONVIF product database](https://www.onvif.org/conformant-products/). Brand membership or a similar model does not establish that record. Conformance is one input to review; the intended analytics task and representative view still need assessment.

Use the [pilot evaluation method](/resources/evaluation-method) for an agreed event definition, representative conditions, independent reference and acceptance criteria. Do not interrupt operational cameras, network or power merely to complete a checklist. Any justified interruption test needs an authorised technical owner, a configuration-specific procedure, agreed business impact and restoration checks first.

## Review your site with PGAK

PGAK helps businesses assess suitable existing CCTV camera views and design practical video-analytics workflows around real operational events. Suitability depends on the camera, scene, lighting, connectivity and response process; it should be assessed before rollout.

Explore [AI CCTV for warehouses](/ai-cctv-for-warehouses) or [request a scoped AI Alerto by PGAK assessment](/free-audit) with the site context and the decision you need to make. Keep passwords and identifiable footage out of the enquiry form; agree a permitted review process separately. Installer and dealer enquiries belong in the [partner route](/partners).

## Common questions

### Can existing CCTV cameras be used for video analytics?

Suitability depends on the exact camera or recorder, available stream, view, lighting and intended task. Check the proposed configuration and representative conditions before treating a channel as suitable for rollout.

### Does an untested night view mean the camera has failed?

No. Record the night condition as not tested. A demonstrated failure needs an agreed requirement and an observed result that did not meet it; missing evidence is a different state.

### Is naming an alert recipient enough to complete a readiness review?

No. Confirm that the person accepts the relevant action and operating hours. Where notification is included, actual receipt and human acknowledgement are separate observations.
