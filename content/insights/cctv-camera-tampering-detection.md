---
title: 'CCTV tampering detection: test covered, moved and offline cameras'
date: '2026-08-27'
category: Security Basics
image: /insights/covers/cctv-camera-tampering-detection.webp
updated: '2026-11-01'
excerpt: Separate camera tampering, lost video and recording faults. Specify supported events, delivery tests and a response owner before buying monitoring.
metaTitle: 'CCTV tampering detection: test covered, moved and offline cameras'
metaDescription: Separate camera tampering, lost video and recording faults. Specify supported events, delivery tests and a response owner before buying monitoring.
readTime: 4
faqs:
- q: Is camera tampering the same as a camera going offline?
  a: No. Tampering detection can analyse changes in an available image. Offline monitoring checks whether an expected camera, stream or device is still available. Confirm and test both separately.
- q: Does a tampering alert prove someone interfered with the camera?
  a: No. Treat it as a condition requiring review. Lighting changes, maintenance and other scene changes can affect an alert, depending on the product and configuration.
---

A camera can still appear online while its view is no longer useful. It can also lose video without anyone touching it. If you are buying camera-health monitoring, those are different requirements and should appear as separate tests in the proposal.

Start with the failure you need to notice. “Tell us when CCTV is not working” is too broad to establish what the supplier will monitor, which component sends the message or who investigates it.

## Separate four conditions

Use a simple event list when discussing the scope:

| Condition | Question for the supplier |
| --- | --- |
| Covered or badly changed view | Which image changes are supported by the detector? |
| Camera or stream unavailable | Which component checks availability, and what timeout applies? |
| Recorder not saving usable footage | Is recording health monitored separately from live video? |
| Site cannot communicate externally | How is the missing site detected outside that connection? |

A product that addresses one row does not necessarily address the other three. Ask for the supported model, software version and configuration, then test the proposed combination.

## Define tampering without assuming intent

For example, the Axis F9114 manual describes configured tampering notifications for covered, sprayed or blurred images, including a trigger delay and an event recipient. This is a documented feature of that product, not proof that every camera or analytics package behaves the same way. [See the manufacturer's instructions](https://help.axis.com/en-US/axis-f9114-main-unit).

Your acceptance record should state the relevant conditions and expected message. Use controlled, authorised tests with the installer; do not damage equipment or interrupt a critical live view simply to make a demonstration.

Keep ordinary events in the test as well. Cleaning, a planned camera adjustment and a lighting transition may need a maintenance procedure or a different configuration. An alert identifies something to review; it does not establish sabotage or misconduct.

## Trace the complete notification path

Ask the supplier to draw the route from camera to monitoring component, notification service and recipient. Identify which parts depend on local power, the network and an external connection.

If the device detecting a fault shares the failed connection, it may be unable to send a message through that path. A separate availability check may address that situation, but it must be part of the documented design. The [offline-operation guide](/insights/does-ai-cctv-work-without-internet) separates local recording from remote functions.

Do not accept the fastest demonstration as the promised response time. Record when the test condition started, when it was detected and when the intended recipient received the notification. Include failures and delayed messages in the result.

## Give the recipient a useful next step

The notification should identify the site, camera, observed condition and time without requiring the recipient to guess which channel failed. Agree how the responder confirms the situation, records an outcome and escalates an unresolved fault.

Define planned-maintenance handling and shift cover. A phone number is not a complete response plan if the person is unavailable, leaves the business or no longer manages that site. Record an owner for the contact list and periodic checks.

## Check recording and recovery

After restoring the test condition, confirm that live video, recording and monitoring have recovered. Record whether recovery was automatic or required intervention. Review the actual footage gap rather than assuming that the return of a live image repairs the missing history.

If retaining evidence outside the recorder is a requirement, specify exactly what is copied, when, where and under which access arrangements. Do not assume that a health alert also includes an off-site video backup.

The [camera-offline checklist](/insights/cctv-camera-offline-how-to-know) helps organise the initial equipment review. For AI Alerto by PGAK, describe the faults you want to notice and the person responsible for acting. The proposal should confirm supported events and the test scope before you rely on the monitoring workflow.

## Common questions

### Is camera tampering the same as a camera going offline?

No. Tampering detection can analyse changes in an available image. Offline monitoring checks whether an expected camera, stream or device is still available. Confirm and test both separately.

### Does a tampering alert prove someone interfered with the camera?

No. Treat it as a condition requiring review. Lighting changes, maintenance and other scene changes can affect an alert, depending on the product and configuration.

[Ask for a free feasibility check](#dealer)
