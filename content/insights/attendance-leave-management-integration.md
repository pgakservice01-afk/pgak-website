---
title: "Leave, holidays and attendance: keeping one calendar"
date: "2026-09-02"
category: "Attendance"
excerpt: "An employee takes approved leave, and the attendance report still shows an unpaid absence. The fix isn't stricter approvals — it's one calendar instead of two."
metaDescription: "An employee takes approved leave, and the attendance report still shows an unpaid absence."
readTime: 5
faqs:
  - q: "What is attendance and leave management?"
    a: "Attendance and leave management is the practice of tracking who is present, absent, or on approved leave from a single calendar, so an approved leave day and a physical entry log never contradict each other. When the two run as separate systems reconciled by hand, mismatches between them become a routine payroll problem."
  - q: "Why does my attendance system show an employee absent when their leave was approved?"
    a: "Because most companies run leave approval and attendance capture as two different systems that don't talk to each other. The leave system marks the day 'approved leave', the attendance system only knows a card wasn't swiped or a face wasn't seen, and unless someone manually cross-references both, the attendance report defaults to 'absent, unpaid'."
  - q: "How should holidays and weekly-offs be handled in attendance software?"
    a: "Holidays and weekly-offs should sit on the same calendar the attendance system reads from, per site or per shift group, not as a separate list HR keeps in a spreadsheet. If a site works a holiday for production reasons, that single day needs to be overridden on the calendar itself, not patched in the payroll sheet afterward."
  - q: "Who should be allowed to edit the leave calendar?"
    a: "A small, named set of people — usually HR and one site head per location — with every edit logged and timestamped. Wide edit access is how holiday lists and leave balances drift out of sync across sites in the first place."
---

**A calendar entry marked "leave approved" and an attendance log marked "absent, unpaid" for the same person, same day, are the same event described by two systems that don't talk to each other. Fixing it means giving attendance capture and leave approval one shared calendar, not tighter reconciliation.**

Here's the pattern almost every HR team we talk to recognises immediately. An employee applies for leave. A manager approves it in the leave portal, or on WhatsApp, or with a signature on a paper form. Two weeks later, payroll runs, and the attendance report shows that person absent — no leave code, no note, just a gap in the punch log. Someone now has to manually check every gap against the leave register before salaries go out.

Multiply that by forty employees a month across three sites, and it's not an edge case. It's most of a payroll cycle spent reconciling two records of the same thing.

## Why does attendance show absent when leave was approved?

Because the attendance system and the leave system are usually built by different teams, sold by different vendors, and updated on different schedules. The attendance device only knows what it directly observed: a card wasn't swiped, a face wasn't seen at the gate. It has no way of knowing *why* — whether that's an unauthorised absence or a pre-approved holiday — unless someone tells it.

Most companies solve this with a person, not a system: someone exports both reports at month-end and manually matches names against dates. It works, until volume or headcount grows past what one person can carefully cross-check every month, and then it starts producing quiet payroll errors — someone docked a day's pay for leave they took with permission.

## What does "one calendar" actually mean?

It means leave approval writes directly to the same calendar attendance reads from, so an approved leave day appears in the attendance report as "leave", not as a blank. The employee doesn't need to also inform the gate system. The manager's approval *is* the update.

In practice this needs three things to line up:
- A single source of truth for leave balances and approvals, not a spreadsheet plus a portal plus a WhatsApp thread.
- An attendance system that can read leave status from that source, ideally the same day it's approved.
- One rule for what happens when they disagree — for example, a physical entry on a day marked "leave" should flag for review, not silently override either record.

## How do holidays and weekly-offs fit into this?

The same way individual leave does. A holiday list that lives in a spreadsheet separate from the attendance system will drift — someone updates one copy after a state holiday gets confirmed and forgets the other. Holidays and weekly-offs should sit on the calendar the attendance system itself reads, per site, since a Punjab site and a site in another state won't share the same list of state holidays.

The case that trips people up is the exception: a site that works through a declared holiday for production reasons. That single day needs to be overridden on the calendar directly — not patched into the payroll sheet after the fact, which is how "we worked that holiday last year too, right?" arguments start in March.

## What should you check before merging the two systems?

Start with one number: how many attendance-versus-leave mismatches did last month produce, and how many hours did someone spend resolving them by hand. If that number is small, you may not need to change anything. If it's a recurring chunk of a payroll cycle, it's worth asking your attendance vendor directly whether leave approvals can write into the same calendar the attendance report reads from — not as a nightly batch import, but as the same record.

We build attendance systems, so we have a stake in recommending this — weigh that accordingly. The honest limitation is that a shared calendar only removes disputes it can see: if leave is still sometimes approved verbally and never logged anywhere, no software integration fixes that. The system can only be as reliable as the approval process feeding it.

[Ask for a free feasibility check](#dealer)
