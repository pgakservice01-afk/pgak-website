---
title: "Check CCTV live view, playback and alert receipt"
date: "2026-09-01"
updated: "2026-11-14"
category: "Camera Setup"
excerpt: "Use separate results and a repair handover record to check CCTV pictures, recordings and messages before closing a fault."
metaTitle: "Check CCTV live view, playback and alert receipt"
metaDescription: "Check CCTV live view, recordings and notification receipt separately. Use a repair handover card with evidence, open faults and a named next action."
readTime: 6
image: "/insights/covers/cctv-camera-offline-how-to-know.webp"
imageCaption: "Camera reference image; not a PGAK installation or fault-recovery test."
faqs:
- q: "Does a working CCTV live view prove that recording works?"
  a: "No. Check playback of an identified recorded interval separately. A live picture does not demonstrate that the required recording exists or can be exported."
- q: "Does receiving a fault alert mean the CCTV repair is complete?"
  a: "No. Receipt demonstrates one part of the agreed message path. Recheck the affected camera and recording functions, retain unresolved results and confirm who owns the next action."
- q: "Should a camera be disconnected to test an offline alert?"
  a: "Only through an authorised test plan with the responsible site team, suitable coverage and an agreed restoration check. First confirm the exact equipment supports the intended event and notification."
---

A camera appears in the app again after a repair. Before marking the fault closed, check what has actually returned: the current picture, the required recording, or a message to the person responsible for the site. These are separate results.

This guide provides a buyer-owned check and handover record. It does not certify an installation or establish that AI Alerto automatically monitors every camera, detects every outage or delivers a particular fault alert. Those functions need confirmation for the proposed equipment and configuration.

## Identify the channel and the required function

Start with the expected camera list. Give each location a useful name, its recorder channel and its normal operating schedule. Record cameras intentionally out of service, including the reason and review date. A failed channel should not disappear from the list simply to make the dashboard look complete.

For the fault being reviewed, note the first observation, the last known usable interval and the business function affected. “Rear loading-door recording unavailable” is more useful than “CCTV not working”. A repair on one channel does not establish that the other channels were checked.

Keep the date, time zone and displayed clock source with each observation. If an event cannot be located at the expected time, establish the clock relationship before deciding that the recording is missing. The [CCTV timestamp guide](/insights/cctv-timestamps-match-dispatch-records) explains how to compare recording and operational times without inventing an offset.

## Record five results separately

| Function | Evidence to record | What it does not establish |
| --- | --- | --- |
| Current picture | Expected channel, view and ordinary movement observed at a stated time | That earlier footage was recorded |
| Recent recording | Playback of a named interval and, where required, a usable export | That every channel or the full day is available |
| Older recording | The specific older interval required by the site's retention plan | A guaranteed retention period from disk size alone |
| Analytics, if included | The agreed event and usable output under the test conditions | That an untested event or scene will work |
| Notification, if included | The identifiable event, intended recipient and actual receipt | Human acknowledgement or successful repair |

Write the observation first, then use **Pass**, **Fail**, **Not tested** or **Not applicable** for each agreed check. Pass means the stated check was met in the observed conditions; Fail means it was tested and the requirement was not met. Not tested means the function matters but evidence is missing: it is neither a pass nor a demonstrated failure. Not applicable needs a scope reason, such as no analytics service being included. These are proposed review labels, not a product status standard.

Ask an authorised operator to play the relevant recording through the equipment's supported interface. A drive listed in a menu or a thumbnail on a timeline is not the playback result. If export is required, open the exported file using the agreed player and check that it contains the intended channel and interval.

As a manufacturer-specific example, the [AXIS Camera Station Pro manual](https://help.axis.com/en-us/axis-camera-station-pro) documents live viewing, playback and export as separate operations. Follow the documentation for the installed system; its menus and supported formats do not establish compatibility with a different recorder or PGAK configuration.

## Use a repair handover card

Keep the following record with the service ticket. Use evidence references that authorised reviewers can open, rather than copying private footage into a public form.

| Handover field | Entry required |
| --- | --- |
| Scope | Site, camera/channel, affected function and agreed check |
| Before intervention | Symptom, observation time and available evidence |
| Intervention | What the authorised technician changed, and when |
| After intervention | Separate result for each relevant function in the table above |
| Remaining uncertainty | Untested intervals, other channels, unavailable exports or unresolved messages |
| Ownership | Person who accepted the next action, checkpoint and escalation route |
| Closure decision | Restored for the checked scope, partly restored, or unresolved |

Keep the original fault observation when recording a correction. If a repaired camera resumes recording, that does not prove a previous missing interval has been recovered. State the restored function and any historical gap separately.

An assigned name is not the same as accepted responsibility. Confirm that the person knows which action remains and when it will be reviewed. Do not silently close the record because a technician attended or a message was sent.

## Two illustrative closure decisions

**Example A: picture restored, recording unresolved.** In a hypothetical handover, the rear-door live view shows ordinary activity after an intervention. The operator cannot play the agreed earlier interval. Export is not tested because the recording is unavailable. The appropriate record is “current picture observed; required recording unresolved”, with a named investigation and checkpoint. It is not “all CCTV restored”.

**Example B: message received, review still open.** In another hypothetical handover, the recipient receives the agreed test notification and recent playback works. No acknowledgement from the responsible reviewer has been recorded, and older retention footage has not been checked. Record the successful observations and the two remaining actions. Do not convert notification receipt into proof of human response or retention.

These examples illustrate decisions only. They are not customer incidents, PGAK test results or claimed recovery times.

## Test fault messages through an agreed plan

First ask which recording, storage, connection or device events the exact system supports and how an event reaches its recipient. A local event log, an external message and a human acknowledgement are different stages.

The Axis manual describes system-error triggers and separately configured actions, including email. This is a product-specific example of why event detection and delivery need separate review; it is not a claim that any installed CCTV system or AI Alerto has that setup.

Where a controlled interruption is justified, agree the affected equipment, maintenance window, temporary coverage and restoration checks with the responsible site team. Do not interrupt critical coverage casually. Have an authorised competent person carry out changes; keep the ordinary security process in place.

Record the event, notification receipt and acknowledgement times only where observed. Leave missing times unknown. Agree response expectations for the actual service; this guide provides no universal notification or repair deadline.

## Use unresolved results to define the next purchase

If several channels fail together, record shared equipment as an investigation clue, not a confirmed cause. If live video works but the required export fails, define the recording/export requirement before buying additional analytics. If messages arrive but remain unattended, resolve ownership alongside the technical work.

For storage questions, use the [retention planning guide](/insights/cctv-storage-how-many-days). For recurring faults and service scope, use the [CCTV maintenance contract guide](/insights/cctv-amc-what-should-it-include). Keep repair, recording and any proposed analytics responsibilities explicit in the written scope.

## Common questions

### Does a working CCTV live view prove that recording works?

No. Check playback of an identified recorded interval separately. A live picture does not demonstrate that the required recording exists or can be exported.

### Does receiving a fault alert mean the CCTV repair is complete?

No. Receipt demonstrates one part of the agreed message path. Recheck the affected camera and recording functions, retain unresolved results and confirm who owns the next action.

### Should a camera be disconnected to test an offline alert?

Only through an authorised test plan with the responsible site team, suitable coverage and an agreed restoration check. First confirm the exact equipment supports the intended event and notification.

[Request a scoped AI Alerto by PGAK assessment](/free-audit) with the site type, camera count and whether the issue concerns live view, recordings or alerts. Ask which checks can be supported and what evidence is needed. Keep passwords and identifiable footage out of the enquiry form; agree a permitted review process separately.

Installers and dealers can use the separate [partner enquiry route](/partners).
