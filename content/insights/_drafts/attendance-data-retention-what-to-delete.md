---
title: "How to delete attendance data without breaking an audit trail"
metaTitle: "Attendance data retention: what to delete and prove"
date: "2026-09-03"
updated: "2026-10-08"
category: "Compliance"
excerpt: "Attendance data is several records with different owners and clocks, not one blob. An inventory of what your system actually holds, the authority behind each retention period, and a deletion workflow that leaves proof without keeping the data."
metaDescription: "Inventory your attendance data, record the authority for each retention period, then delete and verify — without losing the register you must keep."
readTime: 8
image: "/insights/covers/attendance-data-retention-what-to-delete.webp"
draft: true
reviewStatus: "Draft — legal review required. No named lawyer has reviewed this article; the brief requires counsel to review the retention-authority column. Awaiting PGAK engineer review. UNRESOLVED: (1) how rule 8(3) of the DPDP Rules, 2025 (minimum one-year retention of personal data and processing logs for Seventh Schedule purposes, from May 2027) interacts with deleting biometric templates soon after exit — counsel to advise; (2) which register-retention rule applies to a given establishment (central or state rules under the Code on Wages and OSH Code; final Punjab rules not found on 8 Oct 2026); (3) the live version's 'a week or two' deletion window is removed as it had no source; (4) whether any notification has changed DPDP commencement dates since 13 Nov 2025; (5) PGAK system deletion features need engineer confirmation before any product statement is added."
faqs:
  - q: "How long should attendance data be kept in India?"
    a: "There is no single period. The attendance register required under the labour codes is kept for the period in the rules that apply to your establishment — for example, five years after the last entry under rule 51(4) of the Code on Wages (Central) Rules, 2026, where those rules apply. Biometric templates and other data used only to produce the register follow a different logic. Record the authority for each period rather than picking one number."
  - q: "Should biometric templates be deleted when an employee leaves?"
    a: "Usually that is the right design aim, because the template's purpose — matching the person at the gate — ends with employment. From May 2027 section 8(7) of the DPDP Act, 2023 requires erasure when the purpose is no longer served, unless a law requires retention. Rule 8(3) of the DPDP Rules separately sets a one-year minimum for certain processing data and logs, so agree the exact timing with your adviser."
  - q: "How do I prove data was deleted without keeping the data?"
    a: "Keep a deletion record that names the employee code, the data type, the system, the date, who did it and how it was verified — but not the deleted data itself. Verification means checking the device, the server and any backups, not just pressing delete in one screen."
---

**Straight answer: attendance data is several different records with different clocks. The attendance register — dates, in and out times, days worked — must be kept for the period in the labour rules that apply to you. The biometric template that matched the person at the gate, the enrolment photo, device logs and exported spreadsheets each need their own period and their own owner. Write down the authority for each, delete on schedule, verify the deletion on every copy, and keep a record that proves it happened without keeping the data.**

Most retention confusion comes from treating "attendance data" as one thing. Untangling what your system actually holds is most of the work — and most systems hold more copies than anyone remembers.

## What sets the retention period for each record?

- **The register.** Section 50(1) of the Code on Wages, 2019 (in force from 21 November 2025 by S.O. 5322(E)) and section 33(a) of the OSH Code, 2020 (in force from 21 November 2025 by S.O. 5321(E)) require attendance registers. Where the Code on Wages (Central) Rules, 2026 (G.S.R. 343(E), 8 May 2026) apply, rule 51(4) says registers are "preserved for a period of five years after the date of last entry made therein". Many private establishments come under state rules instead; for Punjab we found no final rules under the codes on the Labour Department website on 8 October 2026, and older rules continue to the extent consistent with the codes (OSH Code, section 143(3)). [Which rules apply to you](/insights/attendance-records-law-india).
- **Personal data generally.** From May 2027, section 8(7) of the Digital Personal Data Protection Act, 2023 requires a Data Fiduciary to erase personal data "as soon as it is reasonable to assume that the specified purpose is no longer being served", unless retention is necessary to comply with a law, and to make its Data Processors erase it too.
- **Minimum retention of logs.** Rule 8(3) of the DPDP Rules, 2025 (G.S.R. 846(E), 13 November 2025) requires personal data, traffic data and logs of processing to be retained for **at least one year** from the processing, for the purposes in its Seventh Schedule, and then erased unless another law requires more. Rule 6(1)(e) similarly asks for logs to be kept for a year for security purposes. Both commence in May 2027. How this applies to a biometric template after someone leaves is a question for your adviser. <!-- UNRESOLVED: counsel to advise interaction of DPDP Rules r.8(3) and r.6(1)(e) with deleting templates on exit. -->

That last point is why we no longer suggest a fixed "delete within two weeks of exit" rule, as an earlier version of this article did. The design aim — don't keep a former employee's face or fingerprint template once its purpose is over — still stands. The exact timing needs advice.

## The record inventory (the asset, part 1)

Go through your system with whoever administers it and fill in every row. The "where it lives" column is usually where surprises are.

| Data item | Where it lives (all copies) | Purpose | Retention authority (cite it) | Deletion trigger | Owner |
|---|---|---|---|---|---|
| Attendance register / muster roll (dates, in–out times) | Attendance server; payroll software; monthly PDF or Excel exports; printed copies | Wages, statutory register | Labour rules that apply to you — e.g. Code on Wages (Central) Rules 2026, r.51(4), where applicable | Period ends after last entry | HR |
| Biometric template (face or fingerprint) | Gate devices; attendance server; vendor cloud, if any; backups | Matching at the gate | DPDP Act s.8(7) from May 2027; adviser to confirm effect of DPDP Rules r.8(3) | Exit + full and final settlement, subject to advice | HR + IT |
| Enrolment photos | Enrolment laptop; server; HR shared folder | Creating the template | Same as template | Same as template | HR |
| Event frames or clips behind each mark (some camera systems keep these) | Attendance server; recorder | Resolving disputed marks | Your policy, written down | Once the pay period's disputes are closed | HR |
| Correction and approval logs | Attendance software | Audit trail for edits | Keep with the register they explain | With the register | HR |
| Device and access logs | Devices; server | Security, investigation | DPDP Rules r.6(1)(e), r.8(3) from May 2027 | Not before one year, then per advice | IT |
| Gate CCTV footage not used for attendance | Recorder | Security | Your security policy; no general statutory period found | Overwrite cycle | Security |
| Aadhaar numbers, if collected | HR records | Usually none for attendance | Ask why you hold them | Review now | HR |

## The deletion verification workflow (the asset, part 2)

1. **Trigger.** HR marks the exit in the attendance system on the last working day. Late exit-marking is the most common reason templates live forever.
2. **Hold check.** Before deleting, check for anything that requires retention: a pending dispute, an inspection, a legal notice, an insurance claim. If one exists, record the hold and its reason, and set a review date.
3. **Delete.** Delete the template, enrolment photos and any event frames past their period — on the server *and* on every gate device the template was pushed to.
4. **Verify.** Ask a second person to check: the employee no longer appears in the device's enrolled list; a test at the gate (where practical) no longer matches; the server search returns nothing; any vendor cloud copy is confirmed deleted in writing.
5. **Backups.** Note when the last backup containing the data will expire. Do not restore deleted templates from backup into a live system.
6. **Record the deletion — not the data.** One line in a deletion log: employee code (not name if avoidable), data types deleted, systems checked, date, who deleted, who verified, any hold applied.
7. **Keep the register.** The attendance register stays for its own period. Because it records times, not templates, it does not need the template to be readable.
8. **Quarterly review.** Count enrolled templates against active headcount. If there are more templates than employees, exits are not reaching the system.

**Illustrative example.** A hypothetical site has 400 active employees but 520 enrolled templates on its gate devices. That gap of 120 is the first thing to investigate: each one is either a leaver whose data should have gone, a duplicate enrolment, or a contractor nobody tracks. Working through the 120 with the hold check and workflow above is a one-time clean-up; the quarterly count keeps it from returning.

## Why this matters beyond compliance

Templates you no longer need are pure downside: faces and fingerprints cannot be reset like passwords, and a breach involving former employees helps nobody. And when a former employee asks what happened to their data, "templates are deleted after exit on this schedule, the register is kept for the statutory period, here is the log" is a complete answer.

## Limitations

Retention automation only works if exits are marked accurately and quickly. Some devices do not support remote deletion or do not confirm it; some vendors keep cloud copies you have to ask about. And a deletion log shows that someone *says* data was deleted — the second-person check is what makes it believable.

## Next step

The [attendance automation calculator](/features/attendance-automation#scenario-C28) and the [attendance admin time calculator](/calculators/attendance-admin-time) put numbers on the HR time spent on corrections and exits today. How camera-based attendance handles enrolment and records is on the [attendance automation page](/features/attendance-automation). If you want help mapping where your current attendance data actually lives, [ask for a site-specific assessment](/free-audit).

*This is general information, not legal advice. Retention and deletion duties depend on which rules apply to your establishment and on your facts. Confirm them with a qualified adviser.*

## Sources

- [Notification S.O. 5322(E)](https://egazette.gov.in/WriteReadData/2025/267885.pdf) and [S.O. 5321(E)](https://egazette.gov.in/WriteReadData/2025/267884.pdf) — Ministry of Labour and Employment, 21 November 2025.
- [The OSH Code, 2020](https://egazette.gov.in/WriteReadData/2020/222112.pdf) — Gazette of India, 29 September 2020; sections 33 and 143.
- [Code on Wages (Central) Rules, 2026, G.S.R. 343(E)](https://egazette.gov.in/WriteReadData/2026/272365.pdf) — 8 May 2026; rule 51.
- [The Digital Personal Data Protection Act, 2023](https://www.meity.gov.in/static/uploads/2024/06/2bf1f0e9f04e6fb4f8fef35e82c42aa5.pdf) — Gazette of India, 11 August 2023; section 8(7).
- [Notification G.S.R. 843(E)](https://egazette.gov.in/WriteReadData/2025/267647.pdf) and [DPDP Rules, 2025, G.S.R. 846(E)](https://egazette.gov.in/WriteReadData/2025/267650.pdf) — MeitY, 13 November 2025; rules 6 and 8.
