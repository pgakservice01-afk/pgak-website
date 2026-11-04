---
title: 'Face enrolment: choose the right process, not a photo count'
date: '2026-09-08'
category: Attendance
excerpt: Plan face-attendance enrolment with system-specific capture requirements, correct employee mapping, authorized images and a practical validation test.
readTime: 4
image: /insights/category/attendance.webp
faqs:
- q: How many photos are needed for face-attendance enrolment?
  a: Use the requirements of the specific system and version being installed. Some workflows accept different numbers or types of samples. There is no universal four-to-six-photo rule, and additional images are useful only where the supported process calls for them.
- q: Should I add more photos whenever an employee is not recognized?
  a: 'First investigate the failed stage: capture quality, identity mapping, enrolment, matching or later attendance processing. Follow the supported correction procedure and test it. Extra photographs do not automatically fix every kind of failure.'
updated: "2026-11-04"
metaTitle: 'Face enrolment: choose the right process, not a photo count'
metaDescription: Plan face-attendance enrolment with system-specific capture requirements, correct employee mapping, authorized images and a practical validation test.
---

An employee has been enrolled, but the attendance system still fails to produce the expected record. The first response is often to ask for more photographs. Before doing that, establish what the selected system requires and which part of the process actually failed.

Enrolment is more than uploading a face image. It connects a person, an authorized capture process and an employee identity that later records depend on. A useful setup should make that connection understandable and testable.

## Start with the supported procedure

Ask the supplier for the requirements of the exact product and version. Confirm how samples are captured, which quality checks apply and whether the system supports one or multiple enrolment images. Record any required interaction during capture.

Do not apply a universal photo count, angle recipe or image format from an unrelated product. More files can add work without adding useful information if the implementation does not use them as expected. Any recommendation to add or replace samples needs a supported reason.

Microsoft's [Face enrolment guidance](https://learn.microsoft.com/en-us/azure/ai-services/face/enrollment-overview) illustrates how a particular service connects face data with a person record and a responsible enrolment experience. It is an example for that service, not proof of PGAK integration or a procedure for every attendance system.

## Confirm the employee identity before capture

Check the employee reference against the organization's authoritative record. Resolve duplicate names, transfers and rejoining cases before creating a second identity merely because a new enrolment attempt is needed.

Record who approves the association between the person and the employee reference. After setup, verify that a sample event reaches the intended employee record. A technically successful face match linked to the wrong personnel record is still an unsuccessful attendance setup.

Avoid including unnecessary personal details in installer worksheets or open support messages. Share only what the authorized process needs through the agreed channel.

## Explain what is being collected and why

Before enrolment, establish the applicable notice and permission process with the responsible organizational owner. Explain the purpose, what data the implementation stores, who can access it and how questions or corrections are handled. Do not promise deletion behaviour that has not been checked in the actual system.

Microsoft's guidance distinguishes enrolment photographs from derived face data and emphasizes understandable choices and data-handling commitments. Use those as questions for your supplier; the organization's applicable requirements still need their own assessment.

Do not collect enrolment images from social profiles, unrelated footage or informal personal-message archives as a shortcut. Use the approved capture and verification process for the intended attendance purpose.

## Validate under ordinary operating conditions

Once enrolment is accepted, run an authorized test at the intended capture point using the normal route and relevant shift conditions. Include permitted headwear and required PPE as they are actually worn. Required protection must not be removed to improve the demonstration.

Follow the result from capture through identity matching into the attendance record. Note whether a failed case involved an unusable view, no match, a wrong mapping or a later processing issue. The [face-accuracy guide](/insights/face-recognition-accuracy-what-affects-it) helps keep these stages distinct.

Keep the number of reviewed cases and untested conditions visible. A single successful check is a useful setup step, not proof that future records will be error-free.

## Make corrections traceable

If re-enrolment or another sample is proposed, record the diagnosed problem, approved action and validation result. Follow the product's procedure rather than deleting a person record and hoping their attendance history remains connected.

Check how changes affect active identities, historical records and access to old samples. Ask the appropriate owners to agree the retention and removal process, including when an employee leaves or a service changes. Keep a record of unresolved vendor behaviour rather than making an unsupported assurance.

Maintain an approved attendance exception path while a problem is being investigated. The [attendance-to-payroll guide](/insights/biometric-attendance-payroll-integration) helps define the later review and correction responsibilities.

For an AI Alerto by PGAK assessment, bring the product details, employee-reference approach and an anonymized description of the failure. The useful deliverable is a supported enrolment and validation process with clear ownership, not a fixed number of photographs offered as a universal cure.

## Questions before the assessment

### How many photos are needed for face-attendance enrolment?

Use the requirements of the specific system and version being installed. Some workflows accept different numbers or types of samples. There is no universal four-to-six-photo rule, and additional images are useful only where the supported process calls for them.

### Should I add more photos whenever an employee is not recognized?

First investigate the failed stage: capture quality, identity mapping, enrolment, matching or later attendance processing. Follow the supported correction procedure and test it. Extra photographs do not automatically fix every kind of failure.

[Ask for a free feasibility check](#dealer)
