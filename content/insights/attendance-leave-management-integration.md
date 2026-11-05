---
title: 'Attendance and leave integration: reconcile before payroll'
date: '2026-09-02'
category: Attendance
excerpt: Connect approved leave, site calendars and attendance events with clear ownership, sync checks and corrections before approving the payroll handoff.
metaDescription: Connect approved leave, site calendars and attendance events with clear ownership, sync checks and corrections before approving the payroll handoff.
readTime: 4
image: /insights/covers/attendance-leave-management-integration.webp
faqs:
- q: Must leave and attendance use the same database?
  a: No. They need agreed source records, reliable mappings and a tested reconciliation process. A supported integration or controlled exchange can be suitable if its timing, failures and corrections are managed.
- q: Should an entry on an approved leave day cancel the leave?
  a: Not automatically. Keep both observations and route the discrepancy to the authorized reviewer. A physical entry does not explain the purpose or duration of the visit by itself.
updated: '2026-11-05'
metaTitle: 'Attendance and leave integration: reconcile before payroll'
---

An approved leave request and an attendance report can describe the same day differently. The first records permission; the second may only show that no entry was captured. Before anyone changes a salary calculation, check the approval, employee mapping and date range. A missing camera event does not establish an unauthorized absence.

Attendance and leave management work best when there is an agreed explanation for each status and an owner for mismatches. This does not require pretending that every company can replace its HRMS or that all systems share one database.

## Decide which record controls which fact

Name the system that holds the employee identity, the approved roster, leave requests, site holidays and attendance events. One platform may hold several of these, but the responsibilities still need to be clear. Record whether a leave request is pending, approved, cancelled or changed; importing only a date and employee name loses that distinction.

Use a stable employee identifier across the handoff. Names can change, be abbreviated or belong to more than one person. Map site and employment changes with effective dates so a transfer does not move earlier records into the wrong calendar.

Keep the raw entry observations separate from the reviewed attendance status. A site visit during an approved leave day should create a question for the responsible reviewer. It should not automatically cancel the leave request or create a second paid day.

## Choose a connection your team can operate

An authorized API, scheduled file exchange or controlled manual import may be appropriate, depending on the systems and scale. The important questions are what fields move, when they move, who checks failures and how corrections are replayed. A nightly transfer is not inherently defective if it fits the agreed reporting window and is monitored.

Ask the supplier to demonstrate the actual connection rather than a generic integration logo. Use test records with approved, pending and cancelled leave, a partial-day request and an employee transfer. Confirm supported date formats, time zones and status values before sending live personal data.

[Zoho People's attendance reports](https://help.zoho.com/portal/en/kb/people/administrator-guide/reports/articles/attendance-reports) distinguish attendance, leave and shift-related views. That product example helps frame a demonstration request; it is not proof that a PGAK installation can write to that service.

## Test the mismatches you expect to encounter

Create a small acceptance checklist with expected outcomes agreed by HR:

- An approved leave request reaches the attendance reviewer before report approval.
- A cancelled request changes the review status without deleting the earlier approval history.
- A missing entry remains unresolved until the authorized person checks it.
- A site-specific holiday uses the correct calendar for the employee and date.
- A corrected record is identifiable in a later export rather than silently duplicated.

For each test, inspect the source record, transfer result and receiving report. An import marked successful may still contain the wrong employee mapping or a status the receiving system does not understand. Keep a rejected-row list and a named person responsible for clearing it.

## Define the payroll handoff and its cutoff

The attendance reviewer should know which period is being approved and which unresolved items remain. Record the version sent to payroll, its approval date and any exclusions. If a late leave approval changes the result, send a correction with a reference to the original handoff.

Do not let the camera software decide wage treatment from missing observations. Establish the applicable rules with the company's responsible HR and payroll advisers, then test that the system represents those decisions correctly. The [payroll integration checklist](/insights/biometric-attendance-payroll-integration) covers the technical handoff in more detail.

Review a sample after every material calendar or integration change. Check whether failures were detected, how long mismatches took to resolve and whether any unresolved item reached an approved export. These are practical measures of process quality, not a guarantee of error-free payroll.

## Common questions

### Must leave and attendance use the same database?

No. They need agreed source records, reliable mappings and a tested reconciliation process. A supported integration or controlled exchange can be suitable if its timing, failures and corrections are managed.

### Should an entry on an approved leave day cancel the leave?

Not automatically. Keep both observations and route the discrepancy to the authorized reviewer. A physical entry does not explain the purpose or duration of the visit by itself.

For an AI Alerto by PGAK assessment, bring the required attendance output and the name of the HRMS or payroll system. Confirm the proposed connection and review responsibilities before relying on it operationally.

[Ask for a free feasibility check](#dealer)
