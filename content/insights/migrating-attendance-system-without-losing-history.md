---
title: "Switching attendance systems without losing history"
date: "2026-09-04"
category: "Attendance"
excerpt: "Old attendance data rarely moves cleanly to a new system. What actually transfers, what export format to insist on, how long to run both systems in parallel, and the one week of the month to never cut over on."
metaDescription: "Old attendance data rarely moves cleanly. What actually transfers, which export format to insist on, and when never to cut over."
readTime: 5
faqs:
  - q: "How do I migrate to a new attendance system without losing history?"
    a: "Export your existing records in a plain, dated format before you touch anything — CSV with one row per punch, not a summarised monthly report. Run the old and new systems in parallel for at least one full pay cycle so you can compare them directly. Keep the old system's raw exports permanently, even after cutover, because a new vendor will migrate the summary but rarely the underlying punch-level data."
  - q: "What attendance history actually transfers to a new system?"
    a: "Usually the monthly summary — total present days, total absences, total overtime — transfers cleanly because it's just numbers. What rarely transfers is the punch-level detail: individual clock-in and clock-out times, manual-entry flags, and any photo or biometric evidence tied to a specific day. If you might need to dispute or verify an old record later, export that detail yourself before switching."
  - q: "What export format should I ask my current vendor for?"
    a: "Ask for raw CSV or Excel with one row per attendance event — employee ID, date, time, device or camera ID, and entry type. Refuse a PDF-only export or a system that only offers pre-summarised monthly reports; both are useless if you ever need to answer a specific question about a specific day six months later."
  - q: "Why shouldn't I cut over attendance systems at month-end?"
    a: "Month-end is when payroll is calculated from the attendance data, and a partial data set split across two systems makes every calculation a manual reconciliation. Cut over in the first or second week of a month instead, so the entire pay cycle that matters for the next payroll run sits inside one system, not divided across two."
  - q: "How long should I run two attendance systems in parallel?"
    a: "One full pay cycle at minimum — typically a month. Parallel running is the only way to catch a mismatch, like a device miscounting shifts or a rule interpreting weekly-offs differently, before it reaches payroll. Running both costs a bit of double data entry for a few weeks; skipping it costs a disputed payroll run."
---

**Straight answer: export your old attendance data in raw, dated CSV form — one row per punch, not a monthly summary — before you switch anything. Run the old and new systems side by side for at least one full pay cycle to catch mismatches, and never cut over during the week payroll is calculated. Most of what people call "lost history" after a migration is data nobody exported before the old system was switched off.**

If you've ever tried to answer a question about attendance from eight months ago — a disputed termination, an audit, a court notice — and found the old system already decommissioned, you know how this goes wrong. The new vendor's onboarding call never mentioned it, and by the time anyone asked, the old account was closed and the data was gone with it.

## What history actually transfers to a new system?

Less than most people assume. Monthly summaries — total present days, total leave, total overtime — usually move cleanly, because they're just numbers a new vendor can import from a spreadsheet.

What doesn't move is the detail underneath those numbers: the actual clock-in and clock-out time for a specific day, whether an entry was manual or automatic, and any photo or biometric evidence attached to a record. If a dispute or audit ever needs to go back to a specific day, that's the layer you need — and it's the layer vendors rarely migrate, because it's bulky and their import tools aren't built for it.

The fix costs almost nothing: before you switch, export the raw punch-level data yourself and keep it, even if the new system never imports it. A folder of CSV files sitting in cold storage is enough. Nobody needs it live in the new system — they need it to exist somewhere.

## What export format should you insist on?

Ask your current vendor for raw CSV or Excel, one row per attendance event: employee ID, date, time, device or camera identifier, entry type (automatic, manual, corrected). Refuse anything that only offers a PDF summary or a pre-aggregated monthly report — both are unusable if a specific day is ever in question later.

Most systems can produce this export; the sticking point is usually that nobody asks for it until the account is already being closed, at which point some vendors charge for it or simply can't produce it anymore.

## How long should you run both systems together?

At least one full pay cycle — a month, in most companies. Parallel running is the only real test. It's tedious: someone has to enter or check attendance in both systems for a few weeks, and it feels like duplicate work while you're doing it. But it's the only way to catch a mismatch — a device rounding differently, a weekly-off rule interpreted differently, a shift boundary set wrong — before it lands in a live payroll run instead of a test comparison.

We push clients toward this even when it slows down our own onboarding, because a smooth cutover on our side that produces a wrong first payroll on theirs isn't a win for anyone. We build attendance systems, so factor that into how you read this advice — but the parallel-run rule holds regardless of which vendor you're moving to.

## Why does the timing of the cutover matter?

Never cut over in the week payroll is calculated from attendance data. If that week gets split across two systems, every number for that cycle becomes a manual reconciliation between two exports, which is exactly the error-prone, disputed process a new system was supposed to fix.

Cut over in the first or second week of a month instead. That gives you a full pay cycle inside the new system before it has to produce a payroll number anyone relies on, and it gives the parallel-run period above somewhere clean to sit.

## What this doesn't solve

A migration plan doesn't fix a bad current system on its way out — if your old records are already unreliable (missing punches, unverifiable manual entries), migrating them cleanly just carries the unreliability forward. If you suspect the old data itself is wrong, that's worth auditing before cutover, not after.

[Ask for a free feasibility check](#dealer)
