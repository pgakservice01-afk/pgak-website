---
title: "Design a late-mark policy your attendance system can support"
metaTitle: "Late-mark policy design: grace, review and payroll"
date: "2026-09-06"
updated: "2026-10-08"
category: "Attendance"
excerpt: "Most late-mark disputes come from a policy nobody wrote down, or from a machine timestamp being treated as a payroll decision. Sample policy wording that keeps the recorded arrival, the attendance status and any pay decision separate."
metaDescription: "Write a late-mark policy that separates the recorded arrival from authorised payroll decisions, with sample wording, a grace rule and a review step."
readTime: 8
image: "/insights/covers/late-mark-policy-design.webp"
draft: true
reviewStatus: "Draft — cites the Code on Wages, 2019 and the OSH&WC Code, 2020 on deductions, fines and notice of working periods; needs review by a named lawyer, then PGAK engineer review. UNRESOLVED: (1) Punjab rules on fines and on the form of the notice of periods of work; (2) whether a late-mark consequence counts as an absence deduction under s.20 or a fine under s.19 in a given policy; (3) interaction with certified standing orders. Removed from the live version: the 'five to fifteen minutes' industry claim and the recommendation of a fixed deduction from the third late mark."
faqs:
  - q: "What is a fair grace period for late marks?"
    a: "There is no single correct number. Choose one that reflects your real constraint, such as line start time or handover, measure it from the rostered shift start rather than a fixed clock time, write it down and apply it the same way to everyone. An unpublished grace period causes more disputes than a strict published one."
  - q: "Should the attendance system deduct pay for late marks automatically?"
    a: "No. The system should record the arrival and apply the published grace rule to classify it. Any pay consequence is a separate decision taken by a named person after review, and only through a mechanism the Code on Wages, 2019 allows, such as a proportionate absence deduction or a fine under a notified list with a chance to show cause."
  - q: "What happens when the device or network causes a false late mark?"
    a: "The policy needs a named exception path: a supervisor who logs the failure, a short window for the employee to raise it, and a correction that appears on the record before payroll is run. Without it, every device failure becomes a dispute."
---

**Straight answer: a late-mark policy people accept keeps three things separate: the recorded arrival (a fact from the system), the attendance status (the published grace rule applied to that fact), and any pay or disciplinary consequence (a decision by a named person, after review). Most disputes come from blurring them, usually by letting a device timestamp become a deduction with nobody in between. Write all three down before anyone is judged against them.**

Every plant has a late-mark rule. Very few have it written somewhere a worker can read before they are judged against it. It lives in a supervisor's head and only becomes visible when someone is marked late and disagrees.

## What should a late-mark policy decide?

Five decisions, each written down:

1. **The reference time.** The rostered shift start for that person on that day, not a fixed 9:00. For rotating shifts a fixed clock time marks people late on principle. See [rotating shifts and attendance](/insights/shift-management-attendance-india).
2. **The grace period.** Pick a number that reflects your constraint, such as line start or handover. There is no universally correct figure.
3. **Which record counts.** The first recognised entry at any gate on the roster, or a specific gate? What if there are several entries?
4. **The exception path.** Who logs device failures, power cuts, gate queues and approved errands, and by when.
5. **What happens next.** What a pattern of late marks leads to, who decides, and how the employee is heard.

The **Occupational Safety, Health and Working Conditions Code, 2020**, section 31(1), requires a notice of periods of work to be displayed and correctly maintained in every establishment, showing for every day the periods during which workers may be required to work. Your shift timings are already a published document; the grace rule belongs beside them.

## The three layers: arrival, status and decision

| Layer | What it is | Who or what produces it | Can it change pay on its own? |
|---|---|---|---|
| **1. Recorded arrival** | A timestamp, gate and any snapshot or device log | The attendance system | No |
| **2. Attendance status** | On time, within grace, or late, by applying the published rule to the roster | The system, using rules you configured | No |
| **3. Authorised decision** | Whether anything follows, such as a conversation, a note or a lawful pay consequence | A named person, after review and after hearing the employee | Only through a lawful mechanism, decided by a person |

The system is good at layers 1 and 2. It should never perform layer 3.

## Sample policy wording

Adapt this with your adviser; it is a starting point, not a legal template.

> **1. Shift start.** Your shift start is the time on the published roster for that day, as displayed on the notice of periods of work.
>
> **2. Grace.** Arrival up to [number] minutes after shift start is recorded as "within grace" and has no consequence.
>
> **3. Recording.** Your arrival is the first time you are recorded at any site entrance on that day's roster. You can see your own records on [where].
>
> **4. Exceptions.** If a device, network or power failure, a queue at the gate, or work you were asked to do makes your record wrong, tell [named role] before the end of your shift or within [number] working days. The correction will appear on your record before payroll is prepared.
>
> **5. Review.** A late mark is reviewed by [named role]. No late mark, by itself, reduces your pay.
>
> **6. Pattern.** If you are recorded late more than [number] times in a month, [named role] will talk with you to understand why. Any further step follows the disciplinary procedure in your standing orders, and you will be told in writing and given a chance to respond.
>
> **7. Appeal.** You can ask [more senior role] to review any decision under this policy. Your record shows "under review" until the appeal is decided.
>
> **8. Start date.** This policy applies from [date]. It is not applied to any earlier period.

## Worked example: four arrivals, one rule

Illustrative example, round hypothetical inputs: shift starts 08:00, published grace 10 minutes.

| Employee | Recorded arrival | Status (layer 2) | Exception raised? | Reviewer's finding (layer 3) | Pay effect |
|---|---|---|---|---|---|
| A | 07:56 | On time | — | — | None |
| B | 08:08 | Within grace | — | — | None |
| C | 08:22 | Late (22 min) | "Queue at gate 1, reader failing" | Device log shows repeated failures 08:02–08:20; corrected to within grace | None |
| D | 08:40 | Late (40 min) | None | Third late mark this month; conversation booked | None decided by the system; any step follows the disciplinary procedure |

Notice what the system did: it recorded and classified. Everything after that was a person, with evidence and a reason.

## What does the law say about pay consequences?

The **Code on Wages, 2019** (India Code text as on 21 November 2025) is the reference here:

- **Section 18(1):** no deductions from wages except those authorised by the Code.
- **Section 19:** a fine may be imposed only for acts and omissions specified in a notice approved in advance by the appropriate government or prescribed authority and displayed on the premises; only after the employee has had an opportunity to show cause; and total fines in a wage period cannot exceed three per cent of the wages payable for it. Fines and their use must be recorded in a register.
- **Section 20:** a deduction for absence must not be larger, as a share of wages, than the period of absence is as a share of the period the person was required to work.

Whether a particular late-mark consequence is a fine, an absence deduction, or something else entirely, and what your standing orders say, needs advice for your establishment. <!-- UNRESOLVED: s.19 vs s.20 characterisation of late-mark consequences; Punjab rules; standing orders --> The safe operating rule is the one in the sample wording: no late mark reduces pay by itself, and any consequence is a documented human decision.

This is general information, not legal advice. Confirm your own obligations with a qualified adviser.

## What should the attendance system support?

Before you rely on any system, including one we might offer, check that it can:

- apply grace from the **rostered** start, per person per day;
- show the employee their own record;
- attach evidence (device log, snapshot or gate) to each arrival;
- record an exception with a reason and approver, and keep the original;
- mark a record "under review" without changing pay;
- export the status and the decision as separate fields to payroll.

If it cannot separate status from decision in the export, payroll will treat every late mark as a decision. See [connecting attendance to payroll](/insights/biometric-attendance-payroll-integration).

Face recognition on a gate camera can supply a snapshot with each arrival, which helps the reviewer in the worked example above. It has no published PGAK evidence record yet, so evaluate it on your own gate first, and remember that evidence settles what happened, not what the consequence should be.

## Limitations

A good policy will not fix late arrivals caused by a bus timetable, a shift start that clashes with school hours, or a queue at your own gate. Look at when late marks cluster. If they cluster at one gate or one shift, the fix may be a second entrance, a changed start time or a faster gate, not a stricter rule. And never apply a new policy backwards to a month people did not know the rules for.

## Next step

Write the five decisions down, display them beside the notice of periods of work, and run one month with exceptions logged before any consequence applies.

To estimate the administration time in reviewing late marks, use the [attendance automation calculator](/features/attendance-automation#scenario-C28) or the [attendance administration time calculator](/calculators/attendance-admin-time). The [attendance automation](/features/attendance-automation) page explains what is checked at a site. If you would like help setting up the gate side, [ask for a site-specific assessment](/free-audit).

## Sources

- The Code on Wages, 2019 (No. 29 of 2019), India Code text as on 21 November 2025: [indiacode.nic.in](https://www.indiacode.nic.in/indiacode/bitstream/123456789/15793/1/aA2019-29.pdf) — sections 18, 19 and 20. Checked 8 October 2026.
- The Occupational Safety, Health and Working Conditions Code, 2020 (No. 37 of 2020), Gazette of India Extraordinary, 29 September 2020: [labour.gov.in](https://www.labour.gov.in/static/uploads/2025/07/36fcfa5d8e6b9145e282bf7b950d6c47.pdf) — section 31, notice of periods of work. Checked 8 October 2026.
- Ministry of Labour and Employment, *FAQs on Labour Codes* (published January 2026): [labour.gov.in](https://www.labour.gov.in/static/uploads/2026/01/de4758d5bfeffc456d7de97a801891b0.pdf) — Codes in force from 21 November 2025; old rules continue during transition where in line with the Codes. Checked 8 October 2026.
