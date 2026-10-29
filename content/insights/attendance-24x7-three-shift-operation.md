---
title: "Three-shift attendance: test midnight, exits and handovers"
date: "2026-09-05"
updated: "2026-10-29"
category: "Attendance"
excerpt: "Test attendance across midnight, shift changes and missing exits. Keep raw events, shift attribution and payroll rules distinct before approving a system."
metaTitle: "Three-shift attendance: test midnight, exits and handovers"
metaDescription: "Test attendance across midnight, shift changes and missing exits. Keep raw events, shift attribution and payroll rules distinct before approving a system."
readTime: 4
image: "/insights/covers/attendance-24x7-three-shift-operation.webp"
---

A night-shift worker enters before midnight and leaves the following morning. The event timestamps correctly fall on two calendar dates. The attendance system must then apply the agreed shift and payroll rules without losing either original event.

A 24-hour operation needs those rules to be explicit. The problem is not that a timestamp changes date at midnight; it is an incorrect or untested interpretation of the events afterwards.

## Keep timestamps and shift attribution separate

Consider an illustrative shift beginning at 22:00 on 29 October and ending at 06:00 on 30 October. That is eight elapsed hours before considering breaks, corrections or paid-time rules. It is not automatically eight payable hours.

Preserve both real event timestamps and their timezone. Give the work period an identifiable shift or assignment record. HR and payroll should approve which business date the report uses and how that choice affects other rules.

Some organisations attribute an overnight shift to its start date. Do not treat that as a universal rule for every report or payroll arrangement. Ask the supplier to demonstrate the configuration your organisation actually requires.

## Test complete and incomplete event pairs

A valid entry and exit help establish the captured period, but they do not prove continuous work throughout it. Breaks, other authorised movements, missing events and corrections may require further interpretation.

An entry without an exit should become a reviewable exception. Do not silently substitute the scheduled finish or calculate an unlimited period since the last event. Record who corrected it, why and which evidence was used.

Likewise, decide how the system handles a repeated entry, an exit without an entry and a delayed device upload. Keep original events available for authorised review after a correction.

## Agree what handover means

List the approved overlap between shifts, if one exists, and how attendance capture relates to that period. Two employees being on site together can be normal; it is not inherently a duplicate or error.

Separate a person's presence from an approved extra assignment or overtime decision. A later departure alone should not automatically settle how time is paid. Ask payroll to sign off the expected result for the relevant cases.

Document changes to the roster and the point from which they take effect. A correction made after a report is approved should have a visible review trail.

## Use a sample-case acceptance table

| Test case | Result to agree before the demonstration |
| --- | --- |
| Entry before midnight, exit next morning | Both timestamps retained; correct assigned shift and report date |
| Early arrival during handover | Agreed treatment without an unexplained extra shift |
| Missing exit | Exception routed for review, with no invented event |
| Duplicate or delayed event | Clear handling without double-counting time |
| Roster change | Correct assignment from the approved effective point |
| Authorised correction | Original event, reason and approval traceable |

Use anonymised sample data first. Include representative real operating conditions in a permissioned pilot before using the result for payroll.

## Verify capture separately on every relevant shift

If the project involves camera-based attendance, test the actual night view, movement, permitted face visibility and enrolment arrangement. Daylight success is not evidence of night performance. Equally, a failure should be investigated rather than automatically blamed on lighting.

Use the [camera compatibility checklist](/platform/compatibility) for model, stream and scene requirements. Keep an agreed fallback for a person whose record is missing or disputed.

The capture and reporting products may have different scopes. For example, Suprema describes its [BioStar Air T&A report](https://support.supremainc.com/en/support/solutions/articles/24000099074-reports-t-a-report) as an hours-on-site report and directs more complex requirements to appropriate attendance software. Confirm the scope of the product being proposed to you.

## Approve the export before changing the process

Compare the resulting attendance report and payroll input with the expected sample-case results. Check employee IDs, shift assignment and corrections, and retain unresolved differences for review. The [migration checklist](/insights/migrating-attendance-system-without-losing-history) helps plan a controlled changeover.

For an AI Alerto by PGAK feasibility discussion, prepare your shift pattern, gates, current capture method and a description of the difficult cases. Confirm supported functions through a technical demonstration; do not submit employee biometric data in the initial enquiry.

[Ask for a free feasibility check](#dealer)
