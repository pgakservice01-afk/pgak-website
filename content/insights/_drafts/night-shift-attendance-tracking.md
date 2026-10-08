---
title: "Night-shift attendance across midnight: dates, time zones and proof"
metaTitle: "Night shift attendance: dates, midnight and IST"
date: "2026-09-01"
updated: "2026-10-08"
category: "Attendance"
excerpt: "A night shift crosses a date line, and sometimes a time-zone line inside your software. Worked overnight examples showing which date owns the hours, how IST and UTC storage go wrong, and how to prove who was actually there."
metaDescription: "Worked night-shift examples: which date owns hours after midnight under the OSH Code, how UTC storage misdates IST punches, and how to prove presence."
readTime: 8
image: "/insights/covers/night-shift-attendance-tracking.webp"
draft: true
reviewStatus: "Draft — cites OSH&WC Code, 2020 ss.2(1)(q), 27 and 28; needs review by a named lawyer, then PGAK engineer review. UNRESOLVED: (1) prescribed daily/weekly hours for overtime under rules applicable in Punjab; (2) any Punjab rule on night-shift conditions (including for women workers) — deliberately not covered here. Face-recognition attendance is UNVERIFIED for PGAK. Removed from the live version: the '₹200 lamp' style cost claim, 'coverage is a software question' and the 2%/20% manual-entry illustration presented as typical."
faqs:
  - q: "Which date does a night shift belong to?"
    a: "To the date it started. Section 28 of the Occupational Safety, Health and Working Conditions Code, 2020 says that for a worker whose shift extends beyond midnight, the following day is the twenty-four hours beginning when the shift ends, and the hours worked after midnight are counted in the previous day. Your attendance system should store a shift date for every event, not just the calendar date."
  - q: "Why do night-shift punches sometimes land on the wrong date?"
    a: "Two common causes: the system groups punches by calendar date instead of shift date, and the system stores time in UTC while your shifts run in Indian Standard Time, which is five and a half hours ahead. A 05:20 IST punch is 23:50 UTC on the previous date, so a system that groups by UTC date can file it on the wrong day."
  - q: "How do you know who was actually present on a night shift?"
    a: "Record exits as well as entries at every gate used at night, attach evidence to each event, alert on gate movement during shift hours, and review the night shift's manual entries separately from the day shift's. A single entry at 22:00 proves arrival, not presence at 02:00."
---

**Straight answer: a night shift belongs to the date it started. Under section 28 of the OSH Code, hours worked after midnight count in the previous day, so your system needs a shift date on every event, not just a calendar date. Then check the time zone: if your software stores time in UTC, early-morning IST punches can land on the wrong date. Finally, record exits as well as entries, because night shift is when nobody is watching the record.**

Night-shift attendance goes wrong in two separate ways. The first is arithmetic: dates, midnight and time zones. The second is supervision: there is often nobody around to notice that a record is wrong. This article covers both, with worked examples for the first.

## What does the law say about shifts that cross midnight?

The **Occupational Safety, Health and Working Conditions Code, 2020** (No. 37 of 2020) defines a "day" in section 2(1)(q) as twenty-four hours beginning at midnight. Section 28 then makes an exception for a worker whose shift extends beyond midnight:

- **28(a):** for weekly holidays under section 26, a whole-day holiday means twenty-four consecutive hours beginning when the shift ends;
- **28(b):** the following day for that worker is the twenty-four hours beginning when the shift ends, and the hours worked after midnight are counted in the previous day.

Section 27 provides overtime wages at twice the rate where a worker works beyond the hours prescribed in a day or a week, calculated daily or weekly, whichever is more favourable to the worker, with the worker's consent. The daily and weekly thresholds are prescribed by the appropriate government; confirm the figures that apply to your establishment. <!-- UNRESOLVED: prescribed hours under Punjab rules -->

This is general information, not legal advice. Confirm your own obligations with a qualified adviser.

## Worked overnight examples

All times below are **Indian Standard Time (IST, UTC+05:30)** unless marked UTC. These are illustrative examples with round hypothetical times, not records from any site.

### Example 1: the ordinary night shift

Rostered shift C, 22:00–06:00, starting Thursday 5 March.

| Event | IST | Calendar date | Shift date |
|---|---|---|---|
| Entry, Gate 1 | 21:52 | 5 Mar | 5 Mar |
| Exit, Gate 2 | 06:07 | 6 Mar | 5 Mar |

Hours = 21:52 to 06:07 = **8 hours 15 minutes**, all on shift date 5 March. Of these, 6 hours 7 minutes were after midnight; under section 28(b) they count in 5 March, the previous day. A system that splits by calendar date would show 2 h 8 min on 5 March and 6 h 7 min on 6 March: a phantom short day and a phantom second day.

### Example 2: the same shift stored in UTC

Many cloud systems store time in UTC and convert for display. Subtract 5 hours 30 minutes:

| Event | IST | UTC | UTC date |
|---|---|---|---|
| Entry | 21:52, 5 Mar | 16:22 | 5 Mar |
| Exit | 06:07, 6 Mar | 00:37 | 6 Mar |

Same result if the software converts back to IST before applying shift rules. The danger is in the next example.

### Example 3: the early morning shift filed on the wrong day

Rostered shift A, 06:00–14:00 on Friday 6 March. The worker arrives early.

| Event | IST | UTC | UTC date |
|---|---|---|---|
| Entry | 05:20, 6 Mar | 23:50 | **5 Mar** |
| Exit | 14:04, 6 Mar | 08:34 | 6 Mar |

If any report, export or rule groups events by UTC date, the 05:20 entry is filed on 5 March. The worker shows an orphan punch on 5 March and a missing entry on 6 March, and may be marked absent or late. Every IST time from 00:00 to 05:29 falls on the previous UTC date. Ask your supplier one question: "Are shift rules applied in IST, on shift date?"

### Example 4: the device clock is wrong

Gate 1's device clock has drifted 7 minutes slow. A worker arrives at 22:06 by the correct time; the device records 21:59. A late arrival is recorded as on time. Another device 7 minutes fast creates late marks for people who were on time. Set every device and processing unit to synchronise time automatically, check drift weekly, and make sure no daylight-saving setting is switched on, since India does not use one.

### Example 5: the weekly off after a night shift

Shift C ends 06:00 on Sunday 8 March. Under section 28(a), a whole-day weekly holiday for this worker runs from 06:00 Sunday to 06:00 Monday. A roster that puts the same worker on shift C again at 22:00 on Sunday has not given a whole-day holiday, even though Sunday is marked "off" on a calendar view. Check rotation rosters for this.

### Example 6: overtime across midnight

Shift C, 22:00–06:00 on shift date 5 March. The worker is asked to stay, consents, and leaves at 08:00.

Hours = 22:00 to 08:00 = **10 hours**, all on shift date 5 March. If, for illustration only, the prescribed daily limit were eight hours, the 2 hours beyond it would be overtime on 5 March, compared with the weekly calculation and the more favourable used. Confirm your actual thresholds before configuring this.

### Example 7: no exit at all

Entry at 21:55 on 5 March, no exit recorded. Do not assume eight hours, and do not assume zero. Mark the shift "exit missing — under review", check other gates and any evidence, and ask the worker. No pay decision follows from the missing event alone.

## How do you prove who was there after dark?

The arithmetic above only works if the events are real. Night shift is when supervision is thinnest, so the controls have to work without someone watching.

1. **Record exits at every gate used at night.** An entry at 22:00 proves arrival, not presence at 02:00. Pairing entries with exits is what turns "arrived" into hours.
2. **Attach evidence to each event.** A device log or snapshot lets the morning reviewer check a record instead of reconstructing it from someone's account.
3. **Alert on gate movement during shift hours,** not just after hours, and send it to a person who can act on it.
4. **Review night manual entries separately.** Compare the night shift's manual-entry share with the day shift's. A large gap is worth investigating, but treat it as a question about the process, not an accusation against people.
5. **Check night lighting at the gate.** If you use face recognition, a gate that works at noon may fail under night lighting. See [face recognition at a badly lit gate](/insights/face-recognition-low-light-gate).

Every exception goes to a named reviewer, the worker is told and can explain, and there is an appeal. Night-shift records must never drive automatic pay deductions.

For handover overlaps and three-shift rosters, see [attendance for a 24x7 three-shift operation](/insights/attendance-24x7-three-shift-operation). For roster rules generally, see [rotating shifts and attendance](/insights/shift-management-attendance-india). For overtime disputes, see [the five causes of every overtime dispute](/insights/overtime-disputes-common-causes).

## Limitations

These examples assume a simple roster. Split shifts, shift swaps and people working at two sites need their own rules. A camera or device can only record a passage at a gate; it cannot say whether someone was at their workstation. Face-recognition attendance has no published PGAK evidence record yet, so evaluate it on your own night-time footage before relying on it.

## Next step

Take one night-shift worker and recompute last month by hand from raw events, using shift date and IST. If your hand calculation and the system disagree, you have found where the corrections come from.

To estimate the correction time involved, use the [attendance automation calculator](/features/attendance-automation#scenario-C28) or the [attendance administration time calculator](/calculators/attendance-admin-time). The [attendance automation](/features/attendance-automation) page explains what is checked at a site. If you want an engineer to look at your gates under night conditions, [ask for a site-specific assessment](/free-audit).

## Sources

- The Occupational Safety, Health and Working Conditions Code, 2020 (No. 37 of 2020), Gazette of India Extraordinary, 29 September 2020: [labour.gov.in](https://www.labour.gov.in/static/uploads/2025/07/36fcfa5d8e6b9145e282bf7b950d6c47.pdf) — sections 2(1)(q), 26, 27 and 28. Checked 8 October 2026.
- Ministry of Labour and Employment, *FAQs on Labour Codes* (published January 2026): [labour.gov.in](https://www.labour.gov.in/static/uploads/2026/01/de4758d5bfeffc456d7de97a801891b0.pdf) — Codes in force from 21 November 2025. Checked 8 October 2026.
