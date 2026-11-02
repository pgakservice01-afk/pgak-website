---
title: 'Night-shift attendance: reconcile midnight and missed exits'
date: '2026-09-01'
category: Attendance
excerpt: Review overnight attendance using complete timestamps, assigned shifts, missed-exit handling and approved corrections before records reach payroll.
metaTitle: 'Night-shift attendance: reconcile midnight and missed exits'
readTime: 4
image: /insights/covers/night-shift-attendance-tracking.webp
faqs:
- q: Which date should an overnight attendance record use?
  a: Use the date convention agreed for the assigned shift and receiving payroll process. Preserve the actual dated entry and exit events, including their timezone, so a shift crossing midnight can be reconstructed without guessing.
- q: Does a missing exit mean an employee left early?
  a: No. It is an unresolved record that may have several causes. Follow the approved exception process, review available evidence and obtain the responsible approval before changing the attendance outcome.
updated: '2026-11-02'
metaDescription: Review overnight attendance using complete timestamps, assigned shifts, missed-exit handling and approved corrections before records reach payroll.
---

An employee enters before midnight and leaves the following morning. If the report groups events only by calendar date, that ordinary shift can appear as an unmatched arrival on one day and an unexplained exit on the next.

Night-shift attendance needs a clear record convention and an exception review. The aim is to reconstruct the assigned shift from evidence, not to assume that every missing event represents absence or that every paired event proves a full period of work.

## Define the shift before interpreting its events

Record the scheduled start, end, permitted capture window and date convention used by payroll. Include the actual dates and timezone in the source records. Do not remove that information just to make an export look simpler.

Frappe HR's Shift Type documentation, for example, treats an end time earlier than the start time as a shift crossing into the next calendar date. This is one implementation, not a universal convention or a PGAK integration claim. [Read the documented shift behavior](https://docs.frappe.io/hr/shift-type).

Ask your supplier to demonstrate the chosen rule using the same sample in both attendance and payroll. The test should make it clear which shift owns each event and what remains unresolved.

## Keep a complete timeline for an exception

For an overnight problem, gather the assigned roster, original capture events, relevant device or camera identifier and any approved change. Put them in time order before deciding what caused the discrepancy.

Include legitimate breaks, a second entry, a temporary site assignment and an authorized early departure in the test set. These are useful evaluation cases, not assumptions about what your employees do. Agree the expected treatment with the responsible HR and payroll owners.

If the system receives events late after a network interruption, distinguish event time from receipt time. Ask how the late record changes an open exception and how the reviewer sees that a previously prepared export may need attention.

## Handle a missing exit as a question

A missing exit might reflect a capture failure, an alternate authorized route, an incomplete sync or a process exception. Preserve the uncertainty until the evidence is reviewed. Do not silently create an exit from the scheduled end time and present it as an observed event.

Give the supervisor a structured correction route: the employee and shift, the missing information, supporting evidence, requested correction and approving person. Retain the original record alongside the decision so a later reviewer can understand the change.

Set a practical review checkpoint before payroll closes. The exact timing should fit your operation, but the owner and escalation path should be agreed rather than left to whoever discovers the problem at month end.

## Separate camera issues from rule issues

If camera-based attendance is proposed, inspect the actual night capture conditions. A clear daytime sample does not validate the night scene. The [low-light gate guide](/insights/face-recognition-low-light-gate) explains how to assess the camera, illumination and matching conditions without assuming a universal fix.

However, an accurate identity observation can still be assigned to the wrong shift or exported incorrectly. Test the record handling after capture as carefully as the image. Keep an approved fallback for equipment outages or unsuitable capture conditions.

## Reconcile before sending the payroll file

Create a review list of complete shifts, approved exceptions and unresolved cases. Check that a correction is represented once and that rerunning an export does not create another payable record for the same shift.

Ask payroll to review a small controlled sample containing an ordinary overnight shift, a missed exit, an approved correction and a late-arriving event. The [payroll-integration checklist](/insights/biometric-attendance-payroll-integration) covers identifiers and reconciliation responsibilities.

Keep this exception review distinct from the broader [three-shift rollout plan](/insights/attendance-24x7-three-shift-operation). One establishes how the site runs; the other explains how a specific overnight record is resolved.

For an AI Alerto by PGAK assessment, bring the current shift convention and an anonymized example of the discrepancy. A useful next step is a written test of that record path, with a named reviewer and a clear outcome, before any wider replacement is agreed.

## Questions before the assessment

### Which date should an overnight attendance record use?

Use the date convention agreed for the assigned shift and receiving payroll process. Preserve the actual dated entry and exit events, including their timezone, so a shift crossing midnight can be reconstructed without guessing.

### Does a missing exit mean an employee left early?

No. It is an unresolved record that may have several causes. Follow the approved exception process, review available evidence and obtain the responsible approval before changing the attendance outcome.

[Ask for a free feasibility check](#dealer)
