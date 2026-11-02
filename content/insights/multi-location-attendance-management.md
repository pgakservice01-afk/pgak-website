---
title: 'Multi-location attendance: keep site rules and records aligned'
date: '2026-09-01'
category: Attendance
excerpt: Plan multi-site attendance around stable employee IDs, local shift rules, permissions, delayed records and a reconciled central payroll handoff.
metaDescription: Plan multi-site attendance around stable employee IDs, local shift rules, permissions, delayed records and a reconciled central payroll handoff.
readTime: 4
image: /insights/covers/multi-location-attendance-management.webp
faqs:
- q: Do all branches need the same attendance device?
  a: Not necessarily. What matters is a supported way to identify employees and sites, interpret events consistently and reconcile approved outputs. Test each device and integration combination instead of assuming interchangeability.
- q: Can head office apply one rule to every location?
  a: Only where that rule is appropriate and approved for every location. Record site-specific shifts, calendars and exceptions separately, and have the responsible HR and payroll owners approve how they affect the consolidated output.
updated: '2026-11-02'
metaTitle: 'Multi-location attendance: keep site rules and records aligned'
---

Head office receives three attendance files, but the same employee appears under different codes and a transfer is counted at two branches. The problem is no longer simply collecting check-ins. It is keeping identity, site context and approved interpretation aligned.

A multi-location project should define a common record contract while preserving the rules each site actually needs. This can involve one platform or several supported systems. The important test is whether the resulting records can be reconciled and operated reliably.

## Establish the employee and site identifiers

Choose the authoritative employee record and document how each device or local system refers to it. Retain a site identifier with the event. Do not rely on a person's name or a spreadsheet tab name to explain where the record originated.

Test a transfer between sites and a temporary assignment. Decide who approves the effective date and how overlapping or unexpected events are reviewed. A person moving location should not automatically become a new employee in the consolidated dataset.

Keep the mapping history available to the responsible team. If an identifier changes, old records should remain interpretable without rewriting their original context.

## Give local rules a named owner

List the shifts, calendars, capture windows and exception routes applicable to each site. Identify which settings are shared and which require local approval. Avoid allowing several administrators to change a common rule without a visible record of its effect.

Frappe HR's Auto Attendance documentation illustrates that attendance processing uses shift assignments and associated settings. [See that product's documented workflow](https://docs.frappe.io/hr/auto-attendance). Your proposed system may work differently; ask the supplier to demonstrate the actual arrangement rather than relying on a generic feature label.

Use sample cases from each location. Include a local holiday, an overnight shift and an approved temporary assignment. Have the responsible HR and payroll owners confirm the expected treatment without assuming one rule fits every branch.

## Distinguish event time from arrival time

A delayed record from a branch should retain the time of the original event and the site that produced it. The central team also needs to know when it arrived and whether the relevant reporting period has already been reviewed.

Ask how an interrupted connection is detected, who is notified and what happens when records arrive later. Demonstrate recovery with a controlled test. Do not assume that a dashboard showing the branch as online proves that all expected attendance records have synchronized.

Check duplicate handling when a transfer is retried. A successful recovery should not silently create a second copy of the same event or overwrite an approved correction.

## Test permissions with real roles

Define what a local supervisor can review, what a regional manager can see and what the payroll owner can approve. Test those permissions with the intended accounts, including an attempt to access another site's records when that access is not required.

Keep system administration distinct from routine attendance approval where the operation requires it. Record who grants and removes access when a supervisor transfers or leaves. A shared administrator password makes that responsibility difficult to demonstrate.

## Reconcile one site before expanding

Choose a bounded first site with an accountable local owner and usable reference records. Trace its events through local exceptions to the central output. Then add a second site with a different operating condition to test whether the common format is actually robust.

Use the [attendance-to-payroll guide](/insights/biometric-attendance-payroll-integration) to define the receiving fields and acceptance evidence. Keep unresolved site records visible rather than hiding them inside a consolidated total.

The rollout checklist should identify source records, approved outputs, missing mappings, unresolved exceptions and delayed batches. Have both the local owner and central owner accept the handoff. Record what would cause the rollout to pause or require a revised integration.

## Write support into the operating plan

Assign a contact for device faults, network issues, rule questions and import failures. State how the local team continues the approved attendance process while an issue is investigated. A central dashboard does not remove the need for local responsibility.

For an AI Alerto by PGAK assessment, bring the site list, current devices, employee-ID approach and sample outputs with private data removed. The useful proposal specifies supported connections, local rule ownership and a staged reconciliation plan, rather than promising effortless consolidation before those details are known.

## Questions before the assessment

### Do all branches need the same attendance device?

Not necessarily. What matters is a supported way to identify employees and sites, interpret events consistently and reconcile approved outputs. Test each device and integration combination instead of assuming interchangeability.

### Can head office apply one rule to every location?

Only where that rule is appropriate and approved for every location. Record site-specific shifts, calendars and exceptions separately, and have the responsible HR and payroll owners approve how they affect the consolidated output.

[Ask for a free feasibility check](#dealer)
