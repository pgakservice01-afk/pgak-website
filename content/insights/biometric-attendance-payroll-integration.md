---
title: 'Attendance-to-payroll integration: reconcile before exporting'
date: '2026-09-01'
category: Attendance
excerpt: Connect attendance to payroll with stable employee IDs, clear event and approval fields, controlled retries and a sample reconciliation before acceptance.
metaDescription: Connect attendance to payroll with stable employee IDs, clear event and approval fields, controlled retries and a sample reconciliation before acceptance.
metaTitle: 'Attendance-to-payroll integration: reconcile before exporting'
readTime: 4
image: /insights/category/attendance-2.webp
faqs:
- q: What should an attendance-to-payroll interface contain?
  a: Agree the fields with the receiving payroll owner. Common review needs include a stable employee ID, the relevant date or shift, approved attendance status and references to corrections. Raw events and calculated payable treatment should remain distinguishable.
- q: Should a failed payroll import simply be sent again?
  a: Only after checking how duplicates and partial imports are handled. Preserve the original batch or receipt reference, identify accepted and rejected records, and reconcile the result before retrying.
updated: '2026-11-02'
---

The attendance dashboard can be correct while the payroll import is wrong. A changed employee code, an unclear shift date or a correction sent twice can create a discrepancy even when the original check-in was captured successfully.

Treat the connection as a documented handoff between two processes. The attendance system supplies evidence and reviewed outcomes within its agreed scope. The receiving payroll process applies the approved payable treatment. Decide where each calculation belongs before building the interface.

## Separate events from approved outcomes

A device event records an observation at a time. A shift summary groups relevant records according to a rule. An approved attendance outcome may incorporate leave or a reviewed exception. These should not become interchangeable just because they appear in one export.

Ask the supplier to identify which layer it sends. If raw events are transferred, name the system and owner that interpret them. If a reviewed summary is sent, ask how the underlying evidence and later corrections remain traceable.

Frappe HR's integration documentation illustrates one approach: device logs populate Employee Checkin records, then attendance processing uses the employee's shift setup. [Read the primary integration example](https://docs.frappe.io/hr/integrating-frappe-hr-with-biometric-attendance-devices). That example does not establish compatibility with PGAK or your payroll product.

## Agree a field map with payroll

Use a sample file to settle the actual fields, formats and permitted values. At minimum, ask the receiving owner to review:

- The stable employee identifier and how it relates to device identifiers.
- The actual event timestamp, timezone and assigned shift where relevant.
- The distinction between observed events, approved attendance and unresolved cases.
- The reference for a correction and the person who approved it.
- The export batch or record key used to detect repeats.

Do not use a name alone as the matching rule. Check how transfers, rejoining employees and changed device IDs are handled. An unknown employee should become a visible exception, not a guessed match to a similar name.

## Choose a transfer method you can operate

A controlled file import can be appropriate when ownership, timing and reconciliation are clear. An API can reduce manual transfer steps, but it still needs a supported interface, permissions, monitoring and error handling.

Ask for the exact product versions and supported fields. Confirm which team maintains the connection when a vendor changes its format. A statement that both products have APIs does not demonstrate that the proposed integration has been built or tested.

Keep credentials out of shared spreadsheets and enquiry forms. Technical access should be arranged through the authorized implementation process with only the permissions needed for the agreed task.

## Make retries and corrections observable

Demonstrate a partially rejected file or a temporary receiving-system failure. Ask which records were accepted, which failed and how the operator knows. Repeating the whole batch without a duplicate check can create another problem while appearing to fix the first.

Then change one approved attendance record after an initial export. The receiving process should distinguish that amendment from a new shift or a second payment instruction. Retain the original evidence and a reference to the approved change.

## Reconcile a controlled sample before rollout

Select fictional or appropriately authorized examples covering an ordinary shift, a missing exit, an overnight shift, approved leave and a corrected employee mapping. Agree the expected results before running the test.

Compare record counts, employee identifiers, unresolved cases and the totals relevant to payroll. Do not accept a matching grand total if individual records are wrong. Record the discrepancy, responsible owner and resolution evidence for each exception.

The [night-shift guide](/insights/night-shift-attendance-tracking) covers midnight and missing exits. For a wider purchase, use the [attendance buying checklist](/insights/what-to-check-before-buying-attendance-system) to keep integration and support responsibilities in the proposal.

An AI Alerto by PGAK review should start with the current export structure, the receiving system and one anonymized discrepancy. Confirm the proposed integration scope in writing. Successful capture is valuable, but acceptance should follow the record through to a reconciled receiving result.

## Questions before the assessment

### What should an attendance-to-payroll interface contain?

Agree the fields with the receiving payroll owner. Common review needs include a stable employee ID, the relevant date or shift, approved attendance status and references to corrections. Raw events and calculated payable treatment should remain distinguishable.

### Should a failed payroll import simply be sent again?

Only after checking how duplicates and partial imports are handled. Preserve the original batch or receipt reference, identify accepted and rejected records, and reconcile the result before retrying.

[Ask for a free feasibility check](#dealer)
