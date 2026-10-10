---
title: "Connect attendance to payroll without exporting errors"
metaTitle: "Biometric attendance to payroll: field mapping guide"
date: "2026-09-01"
updated: "2026-10-08"
category: "Attendance"
excerpt: "Most attendance errors are introduced between the device and the payslip, by a spreadsheet. A field mapping sheet, the control totals to check before every payroll run, and what to do with records payroll rejects."
metaDescription: "Map attendance fields to payroll, check control totals before each run, and handle rejected records without silent fixes. A practical sheet for HR teams."
readTime: 8
image: "/insights/category/attendance-2.webp"
draft: true
reviewStatus: "Draft — cites the OSH&WC Code, 2020 (overtime s.27, midnight shifts s.28, registers s.33) and the Code on Wages, 2019 (payment time limits s.17, deductions s.18) plus MoLE FAQs; needs review by a named lawyer, then PGAK engineer review. UNRESOLVED: (1) the daily and weekly hours after which overtime applies under the rules applicable to Punjab establishments (the Code leaves them to be prescribed; MoLE's FAQ of 16 March 2026 describes 8 hours a day and 48 a week); (2) register forms and retention periods under Punjab rules. No PGAK payroll integration is claimed; integration is evaluated per site. Removed from the live version: the '#dealer' CTA anchor."
faqs:
  - q: "Why do attendance and payroll totals disagree?"
    a: "Usually because a person retyped or reshaped the data between the two systems, or because the two systems apply different rules for grace, half days, overtime or night shifts. A field mapping sheet and a set of control totals checked before every payroll run make the differences visible instead of silent."
  - q: "What should a payroll export from an attendance system contain?"
    a: "Per employee per wage period: employee code matched to the payroll master, days present, absences, approved leave, weekly offs and holidays, regular hours, overtime hours, late-mark status, and any records still under review, each as a separate field. It should also include control totals so payroll can check nothing was lost."
  - q: "What should happen to records payroll rejects?"
    a: "They should go to a named queue with a reason, never be dropped or fixed silently. Each one is corrected at the source in the attendance system, with a note of who changed what, and then re-exported. Undisputed wages should still be paid on time."
---

**Straight answer: the costly errors in attendance are rarely scanning errors. They happen between the device and the payslip, when raw punches are exported to a spreadsheet and someone rebuilds hours by hand. Fix it with three things: a field mapping sheet that says exactly how each attendance field becomes a payroll field, a set of control totals that must agree before payroll runs, and a queue for rejected records that are corrected at source rather than in the spreadsheet.**

Ask an HR manager where the month-end pain is and they rarely say "the machine misread a finger". They say the export, the spreadsheet, the missed punches and the arguments.

## What does the device actually give you?

A device or camera produces events: an identity, a timestamp, a gate and perhaps a direction. That is raw material, not attendance. Between an event and a payslip sit decisions:

- Which shift was this person rostered on?
- Which date does a night shift belong to?
- Does 08:12 fall inside the grace period?
- Is a four-hour day a half day?
- When does overtime begin, and at what rate?
- Which of three punches that morning is the real one?

If the system does not encode those decisions, a person applies them from memory, differently each month.

## Which rules must be settled before you map anything?

**Shift date.** For a shift that crosses midnight, the **Occupational Safety, Health and Working Conditions Code, 2020**, section 28(b), says the following day for that worker is the twenty-four hours beginning when the shift ends, and the hours worked after midnight are counted in the previous day. Your mapping should carry a shift date, not just a calendar date. See [night-shift attendance across midnight](/insights/night-shift-attendance-tracking).

**Overtime.** Section 27 of the same Code provides wages at twice the rate for overtime where a worker works more than the hours prescribed by the appropriate government in a day or a week, calculated daily or weekly, whichever is more favourable to the worker, and subject to the worker's consent. The Ministry of Labour and Employment's *Additional FAQs on Labour Codes* (as on 16 March 2026) describes the threshold as more than eight hours in a day or forty-eight in a week. Confirm the hours prescribed for your establishment. <!-- UNRESOLVED: prescribed daily/weekly hours under rules applicable in Punjab -->

**Registers.** Section 33 requires registers, electronically or otherwise, covering among other things hours of work, overtime, attendance and wages paid. Section 50(1) of the **Code on Wages, 2019** requires a register of persons employed, muster roll and wages. Your export is part of how those registers are kept, so it has to be complete.

**Grace, half days and leave.** These are your policy, not law. Write them down once; see [designing a late-mark policy](/insights/late-mark-policy-design) and [leave, holidays and attendance](/insights/attendance-leave-management-integration).

## The field mapping sheet

Fill in one row per payroll field. If any column is blank, that is where next month's error will come from.

| Payroll field | Attendance source field | Rule applied | Validation before export | If validation fails |
|---|---|---|---|---|
| Employee code | Attendance ID | Look up in employee master | Exists, active, one match only | Reject: "unknown or inactive employee" |
| Wage period | Shift date | Shift date, not calendar date, for shifts crossing midnight | Within the period | Reject: "outside period" |
| Days present | Paired entry and exit events per shift date | Present if paired and above the half-day threshold | Not more than rostered days plus approved extra shifts | Reject: "more days than roster" |
| Half days | Hours per shift date | Below the full-day threshold, above the absence threshold | Thresholds read from one config | Flag for review |
| Absent | Roster day with no event and no approved leave | Absent only after exception window closes | Not on a holiday or weekly off | Hold as "under review" |
| Approved leave | Leave system | Leave overrides absence for the same date | Leave type valid; balance not negative | Reject: "leave not approved" |
| Weekly off / holiday | Roster and holiday calendar | Per person's roster, not a fixed Sunday | Calendar loaded for the site | Reject: "no calendar for site" |
| Regular hours | Paired events | Capped at the normal hours for the day | Not negative; no unpaired events | Flag: "missing exit" |
| Overtime hours | Paired events and roster | Daily and weekly calculation; the more favourable one used | OT only with recorded consent and approver | Hold: "OT not approved" |
| Late-mark status | Arrival and grace rule | Status only; never a deduction | Separate from any decision field | — |
| Decision / adjustment | Reviewer's decision log | Only decisions with a named decider and reason | Reason present; decider ≠ reviewer | Reject: "no decision record" |
| Under-review flag | Exception log | Records still in appeal | Count matches exception log | — |

### Control totals to check before every payroll run

Both systems must agree on these, per site and in total:

1. **Headcount** in the export = active employees in the payroll master for the period, minus documented exits and joins.
2. **Shift-dates present + absent + leave + weekly off + holiday** = calendar days × employees, for each employee.
3. **Total regular hours** in payroll = total regular hours in attendance.
4. **Total overtime hours** in payroll = total approved overtime hours in attendance.
5. **Rejected records** + accepted records = records exported.
6. **Under-review records** = open items in the exception log.

### Illustrative reconciliation

Illustrative example, round hypothetical numbers, for a site of 100 employees and a 30-day month:

- Expected employee-days: 100 × 30 = **3,000**.
- Export shows 2,400 present + 60 absent + 90 leave + 420 weekly off + 20 holiday = **2,990**.
- Gap: 3,000 − 2,990 = **10 employee-days**.
- The rejected-record queue explains 8: four days for an employee missing from the payroll master, and four night-shift dates outside the period because they were dated by calendar.
- The remaining 2 are unexplained and must be found before payroll runs.

The point of the arithmetic is not the size of the gap. It is that every employee-day is accounted for, and nobody "fixed" a cell to make the totals match.

## How should rejected records be handled?

- **Never drop or overwrite.** A rejected record goes to a named queue with its reason.
- **Correct at source.** Fix the employee master, the roster or the attendance event in the attendance system, then re-export. A fix made only in the spreadsheet will recur next month.
- **Log the fix.** Who changed what, when and why; the original stays visible.
- **Pay undisputed wages on time.** The Code on Wages, section 17(1)(iv), requires monthly wages to be paid before the end of the seventh day of the following month. A disputed overtime line is not a reason to hold everything else.
- **No deductions from a flag.** Section 18(1) of the Code on Wages prohibits deductions other than those the Code authorises. A record marked "under review" pays as present unless a named person has decided otherwise through a lawful mechanism.

This is general information, not legal advice. Confirm your own obligations with a qualified adviser.

## Two questions to ask any supplier

**"Show me the payroll export file."** Not the dashboard. The actual file, with hours already split into regular and overtime, shift dates, and control totals. If the answer is a CSV of punch times, you are buying a sensor and keeping the spreadsheet.

**"How does a rejected or disputed record get corrected?"** If the answer involves someone remembering, you have found where next year's errors will come from. The [twelve questions to ask before buying any attendance system](/insights/what-to-check-before-buying-attendance-system) go further.

If you are changing systems, read [switching attendance systems without losing history](/insights/migrating-attendance-system-without-losing-history) before you cut over.

## Limitations

A clean export does not make the underlying rules correct. If the grace rule, overtime threshold or shift date rule is wrong, the export will be consistently wrong. Recompute one employee's month by hand from raw events once a quarter and compare it with payroll. And a camera or device can only supply events: whether camera-based attendance suits your gates is assessed on your own footage, and PGAK has no published evidence record for face-recognition attendance yet.

## Next step

Take last month: compare total payable hours as the attendance system computed them with what payroll actually paid. If they differ, the gap is in the manual step between them.

To estimate the correction time involved, use the [attendance automation calculator](/features/attendance-automation#scenario-C28) or the [attendance administration time calculator](/calculators/attendance-admin-time). The [attendance automation](/features/attendance-automation) page explains what is assessed before anything is quoted. For help reviewing your own gate-to-payroll flow, [ask for a site-specific assessment](/free-audit).

## Sources

- The Occupational Safety, Health and Working Conditions Code, 2020 (No. 37 of 2020), Gazette of India Extraordinary, 29 September 2020: [labour.gov.in](https://www.labour.gov.in/static/uploads/2025/07/36fcfa5d8e6b9145e282bf7b950d6c47.pdf) — sections 27, 28 and 33. Checked 8 October 2026.
- The Code on Wages, 2019 (No. 29 of 2019), India Code text as on 21 November 2025: [indiacode.nic.in](https://www.indiacode.nic.in/indiacode/bitstream/123456789/15793/1/aA2019-29.pdf) — sections 17, 18 and 50. Checked 8 October 2026.
- Ministry of Labour and Employment, *Additional FAQs on Labour Codes* (as on 16 March 2026): [labour.gov.in](https://www.labour.gov.in/static/uploads/2026/03/a4ccf4c6d97c4f1f36a6d83f8c64213d.pdf) — question 24, overtime. Checked 8 October 2026.
