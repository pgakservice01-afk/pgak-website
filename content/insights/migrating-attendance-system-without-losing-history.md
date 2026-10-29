---
title: "Attendance-system migration: protect history and test payroll"
date: "2026-09-04"
updated: "2026-10-29"
category: "Attendance"
excerpt: "Plan attendance migration around exports, employee-ID mapping, reconciliation, retention and rollback. Approve the data before retiring the old system."
metaTitle: "Attendance-system migration: protect history and test payroll"
metaDescription: "Plan attendance migration around exports, employee-ID mapping, reconciliation, retention and rollback. Approve the data before retiring the old system."
readTime: 4
image: "/insights/covers/migrating-attendance-system-without-losing-history.webp"
---

A new attendance system can appear ready while the history, employee mapping or payroll export remains incomplete. Before turning off the old service, establish which records will move, which will stay in an approved archive and how you will verify both.

There is no universal migration capability across vendors. A monthly report, event-level export and biometric template are different data types. Treat each as a separate part of the scope instead of assuming that “import attendance” covers everything.

## Inventory the data before discussing cutover

List employee identifiers, device or camera identifiers, raw attendance events, shift assignments, corrections, approved summaries and any associated evidence. Record the source system, owner, date range and permitted access for each.

Also identify known problems: duplicate employee records, missing timestamps, ambiguous entry types or unexplained adjustments. A successful transfer can preserve an existing error. Keep those issues visible rather than treating the new system as automatic validation.

Do not assume biometric templates can be reused across products. Ask the suppliers to confirm supported formats and whether fresh enrolment is required through the organisation's approved process.

## Obtain and test usable exports

Request a documented export with employee ID, event timestamp and timezone, location or device, event type and relevant correction fields where the source supports them. Keep a data dictionary explaining what each field means.

Machine-readable formats such as CSV can help with comparison and import, but a filename does not prove completeness. Open a sample, check encoding and date interpretation, and compare selected records with the source display. Retain approved reports as well when they are needed to explain a final result.

Agree secure storage, authorised access and a retention schedule with the responsible team. “Keep everything forever” is not a migration plan. Preserve what is required for the agreed purpose and any applicable obligations without copying unnecessary personal data into working files.

## Map employee IDs explicitly

Create a controlled cross-reference between the old identifier and the new one. Keep contractor, location and employment-status changes distinguishable where they matter. Do not match people solely because their names are similar.

Test leading zeros, blank identifiers and reused employee numbers. An event assigned to the wrong person can still appear in a report with a valid-looking total. Include representative exceptions in the test set rather than checking only an easy employee record.

Record who approves the mapping and how corrections will be tracked after import.

## Reconcile more than a grand total

| Layer | Comparison to perform |
| --- | --- |
| Inventory | Required date ranges, employees and sites are accounted for |
| Events | Counts and selected timestamps match the source after documented exclusions |
| Mapping | Each tested event belongs to the intended employee and location |
| Rules | Overnight shifts, breaks and exceptions produce the agreed result |
| Corrections | Original values and approved changes remain explainable |
| Payroll output | Expected fields and sample results match the receiving process |

Use control totals by date and site as well as selected record-level checks. A matching grand total can conceal missing and duplicated rows that cancel each other out.

The [three-shift checklist](/insights/attendance-24x7-three-shift-operation) provides useful midnight and missing-event cases. Include the company's own payroll scenarios rather than assuming a vendor demonstration covers them.

## Choose a controlled transition window

Agree the cutover with HR, IT, payroll and operations. Consider the payroll calendar, roster changes, support availability and the time needed to resolve differences. There is no universally correct week of the month for every organisation.

A parallel comparison across a representative payroll cycle may be appropriate. Define its duration and acceptance criteria for your project; do not create duplicate payable records while testing. Keep one clearly designated authoritative process until the replacement is approved.

Set a rollback decision point, responsibility and method. Verify that the old records remain accessible before retiring a licence, device or account. A backup is useful only if the required information can be retrieved by an authorised person.

## Put migration in the commercial scope

Ask for the fields, periods, exclusions, re-enrolment work, tests and responsibilities in writing. Use the [attendance quote checklist](/insights/biometric-attendance-machine-price-in-india) to distinguish migration work from a device purchase or basic software setup.

For an AI Alerto by PGAK discussion, prepare the current product names, sites, shift patterns and required output format. Start with field definitions or anonymised samples; employee records and biometric data should move only through an agreed technical process.

[Ask for a free feasibility check](#dealer)
