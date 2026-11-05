---
title: 'Rotating-shift attendance: connect the roster to the record'
date: '2026-09-01'
category: Attendance
excerpt: Check roster versions, overnight shifts, swaps and missing events before approving attendance. Keep raw timestamps and review decisions traceable.
metaDescription: Check roster versions, overnight shifts, swaps and missing events before approving attendance. Keep raw timestamps and review decisions traceable.
metaTitle: 'Rotating-shift attendance: connect the roster to the record'
readTime: 4
image: /insights/covers/shift-management-attendance-india.webp
faqs:
- q: Does a night shift have to use its starting date in every system?
  a: No universal reporting convention should be assumed. Confirm the chosen system's shift-date rules, preserve the actual timestamps and test how the same work sequence appears in attendance and downstream exports.
- q: Does an exit after shift end automatically count as overtime?
  a: No. An exit event records an observation, not a decision about authorized work or payable time. Refer the case to the approved attendance and payroll review process.
updated: '2026-11-05'
---

A worker swaps a morning shift for a night shift. The gate records an entry, but the attendance report still expects the old roster. A new camera will not resolve that disagreement. The useful starting point is to connect each attendance event to the correct employee, site and approved schedule, while keeping the original timestamp available.

For a rotating workforce, assess the whole route from roster assignment to the report HR approves. A successful recognition event is one input. It does not decide whether time was worked, whether an exception is justified or how payment should be calculated.

## Write down the shift model before configuring it

Ask the roster owner to describe the schedules actually used: ordinary shifts, overnight work, split duties, weekly rotations and temporary transfers. Include the time zone and the point at which the schedule becomes effective. An employee name alone is insufficient where names repeat or workers move between sites.

For each schedule, record the planned start and end, any approved breaks, the attendance window and the treatment of events outside that window. Do not choose a grace period or overtime threshold simply because the software has a convenient default. The responsible HR and payroll owners should approve the applicable rules before configuration.

[Zoho People's shift API documentation](https://www.zoho.com/people/api/attendance-shift-details.html) provides a product-specific example: shift details include employee assignment, start/end times and holiday or weekend settings. This illustrates the information to check; it does not establish an integration with AI Alerto.

## Test overnight work as one work sequence

Consider an illustrative shift beginning at 22:00 and ending at 06:00 the next day. Preserve both actual timestamps. Then confirm how the selected system labels the shift, pairs events and presents the result in downstream exports. Different systems can use different reporting conventions; consistency and an understandable mapping matter more than assuming one convention is universal.

Test an early arrival, departure after midnight, a missing exit and a return after a break. Check whether a duplicate observation at another camera creates a second attendance event. An event-pairing rule should not quietly substitute scheduled departure for a missing actual record.

Use the [night-shift attendance guide](/insights/night-shift-attendance-tracking) for the overnight capture assessment. Keep this roster review focused on assignment and exception handling rather than repeating a camera-placement exercise.

## Make swaps and corrections visible

A useful swap record identifies the employee, old schedule, replacement schedule, effective date, requester and approver. Keep the previous version so someone reviewing last month's attendance can understand what changed. A verbal swap can still be recorded afterwards through an approved process; it should not be silently backdated as though it was always in the system.

Separate correction of a mistaken event from approval of a different work schedule. The two actions may involve different people. Record the reason and supporting reference without giving every supervisor unrestricted access to all employees' images or records.

Also define a cutoff for the report sent to payroll and a route for later corrections. A revised roster must not disappear into a new spreadsheet version with no indication of which previously approved records it affects.

## Run an acceptance review that HR can repeat

Choose representative cases from the intended rollout, including a rotation, a swap and an unresolved event. Have the roster owner and attendance reviewer independently explain the expected result. Compare that expectation with the raw event view, attendance summary and export. Investigate disagreement instead of treating whichever screen looks cleaner as correct.

Record unresolved cases, review time and whether the exported employee IDs match the receiving system. These observations are more useful than promising that a particular sensor removes every dispute. For the wider handoff, use the [attendance and payroll integration checklist](/insights/biometric-attendance-payroll-integration).

## Common questions

### Does a night shift have to use its starting date in every system?

No universal reporting convention should be assumed. Confirm the chosen system's shift-date rules, preserve the actual timestamps and test how the same work sequence appears in attendance and downstream exports.

### Does an exit after shift end automatically count as overtime?

No. An exit event records an observation, not a decision about authorized work or payable time. Refer the case to the approved attendance and payroll review process.

Bring one sample roster, a shift-change scenario and the required export format to an AI Alerto by PGAK assessment. The review can establish what the proposed capture and integration workflow would need to support before a rollout is agreed.

[Ask for a free feasibility check](#dealer)
