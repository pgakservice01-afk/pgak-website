---
title: "One attendance view for multiple factories"
metaTitle: "Multi-location attendance management: one view"
date: "2026-09-01"
updated: "2026-10-08"
category: "Attendance"
excerpt: "Three sites usually means three exports and a spreadsheet that merges them badly. A reconciliation design for capturing attendance locally, controlling it centrally, and surviving the day a site's internet goes down."
metaDescription: "Multi-site attendance: capture locally, keep one employee master and clear roles, and plan for outages so nobody is marked absent by a lost connection."
readTime: 8
image: "/insights/covers/multi-location-attendance-management.webp"
draft: true
reviewStatus: "Awaiting PGAK engineer review; the short section on state and central rules cites MoLE's Additional FAQs on Labour Codes (16 March 2026) and needs a lawyer's check. UNRESOLVED: which holiday, weekly-off and register rules apply to each site depends on the appropriate government and state rules — not stated as fact. No PGAK multi-site attendance capability is claimed; face-recognition attendance is UNVERIFIED for PGAK. Removed from the live version: 'adding a site is a software exercise' and the '#dealer' CTA anchor."
faqs:
  - q: "How do you manage attendance across several sites?"
    a: "Capture events locally at each site, hold one employee master centrally, apply per-site rule sets for shifts, holidays and weekly offs, give site managers and head office clearly separated roles, and produce one payroll export with control totals per site. The hard part is not the sites; it is the merge."
  - q: "What happens to attendance when a site loses internet?"
    a: "A well-designed system keeps capturing locally, stores events with sequence numbers, and sends them when the connection returns. Head office should see the site as 'in outage', not see its workers as absent. Payroll is not finalised for that site until its events are complete."
  - q: "Can one system cover sites in different states?"
    a: "It should, as long as each site has its own rule set. Holiday calendars, weekly offs and some rules can differ between establishments depending on which government's rules apply, so a single global rule set will be wrong somewhere. Confirm the rules for each site with your adviser."
---

**Straight answer: multi-site attendance rarely fails at the sites. It fails at the merge: several exports in different shapes, combined by one person in a spreadsheet. The design that works captures attendance locally at each site, keeps one employee master and per-site rules centrally, separates who can do what, and treats a lost internet connection as an outage to reconcile, not as a day of absences.**

If head office spends the first week of every month consolidating attendance, the problem is the design, not the number of sites.

## What goes wrong with one system per site?

- **Employees exist more than once.** A transfer between sites creates a second record and splits the history.
- **Rules drift.** Each site interprets grace, half days and overtime slightly differently. Each is defensible; none match.
- **Exports differ.** Different formats, cut-off dates and meanings of "present".
- **Outages look like absences.** A site loses internet for a morning and its workers appear absent at head office.
- **Nobody sees patterns early.** Head office learns about a problem at one site weeks after it starts.

## The reconciliation design

The brief for this article asked for three parts: local capture, central roles, and connectivity failure. Here is each.

### 1. Local capture

| Design choice | Why |
|---|---|
| Each site captures attendance events on site, on a device or an on-site processing unit | Capture continues when the internet does not |
| Every event carries site ID, device or camera ID, a sequence number, the time in IST and a shift date | Head office can tell if anything is missing, and night shifts land on the right date |
| Device and processing-unit clocks synchronise automatically, with weekly drift checks | A few minutes of drift creates or hides late marks |
| Events are stored locally until head office confirms receipt | Nothing is lost during an outage |
| Local storage is sized for the longest outage you plan for | Ask the supplier how many hours or days of events the site can hold |

### 2. Central roles

| Role | Can see | Can change | Cannot |
|---|---|---|---|
| Site supervisor | Own site, own teams | Log exceptions with reason | Approve own exceptions; change rules |
| Site HR / reviewer | Own site | Review exceptions, correct records with reason | Change another site's data |
| Central HR | All sites | Employee master, transfers, rule sets | Edit raw events |
| Payroll | All sites, export only | Reject records back to source | Edit attendance |
| Auditor | All sites, read only | Nothing | — |

One person, one identity, one employee code. A transfer moves the site assignment from a date; the history follows the person.

### 3. Connectivity failure

1. **Detect.** Each site sends a heartbeat. If it stops, the site is marked "in outage" at head office, with the time.
2. **Do not judge.** While a site is in outage, no one at that site is marked absent or late centrally.
3. **Catch up.** When the connection returns, buffered events are sent in sequence. Head office checks that sequence numbers have no gaps.
4. **Recompute.** Attendance for the affected shift dates is recalculated from the complete events.
5. **Log.** The outage, its duration and the catch-up are recorded with the period's payroll file.
6. **Cut-off.** Payroll for a site is not finalised until its event sequence is complete or a named person has signed off the gap with a reason.

### Illustrative example

Illustrative example, round hypothetical numbers: three sites, A, B and C.

- Site B loses internet from 05:00 to 11:00 on 6 March.
- At 08:00, head office shows Site B as "in outage since 05:00". Its 120 rostered morning staff are not shown as absent.
- At 11:00, Site B reconnects and sends 236 buffered events numbered 10,401 to 10,636.
- Expected count from the sequence: 10,636 − 10,401 + 1 = **236**. Received: 236. No gap.
- Attendance for shift date 6 March at Site B is recomputed. Three people still have no entry; they go to Site B's reviewer as normal exceptions.

If the count had been 230, the six missing events would be traced on the site's device or processing unit before payroll closes, not assumed.

## Which rules can differ between sites?

Holiday calendars, weekly offs, shift patterns and some statutory rules can differ between establishments. The Ministry of Labour and Employment's *Additional FAQs on Labour Codes* (as on 16 March 2026) says central rules apply where the Central Government is the appropriate government and state rules where the State Government is (question 27). Answering a question about leave, it also says the Occupational Safety, Health and Working Conditions Code prevails over inconsistent state law, but an employee is entitled to state-law benefits that are more favourable (question 25).

So each site needs its own rule set, and someone must confirm which rules apply to each establishment. <!-- UNRESOLVED: rules applicable per site/state --> This is general information, not legal advice. Confirm your own obligations with a qualified adviser.

## Daily and monthly checks

| Check | When | Who |
|---|---|---|
| Every site has sent a heartbeat in the last hour | Continuous | Central HR dashboard |
| Event sequence has no gaps, per site | Daily | Central HR |
| Exceptions older than the review window | Daily | Site reviewer |
| Headcount per site = employee master assignments | Weekly | Central HR |
| Control totals per site match the payroll export | Before each payroll run | Payroll |

The payroll side is covered in [connecting attendance to payroll](/insights/biometric-attendance-payroll-integration), including the field mapping and control totals.

## Where do cameras fit?

If your sites already have CCTV, two separate uses are worth keeping apart.

**Remote viewing** lets a manager check a gate or a muster at another site without travelling. It replaces looking, not attending: someone local still has to act. The [remote CCTV monitoring](/remote-cctv-monitoring) page covers this, and the [multi-site travel calculator](/calculators/multi-site-travel) estimates visits that a remote check could replace.

**Camera-based attendance** at each site's gate is a different question. It depends on whether each gate camera sees faces at a usable size, and detection runs on a processing unit on site, which suits the local-capture design above. Face-recognition attendance has no published PGAK evidence record yet, so evaluate it at one site first. See [does AI CCTV work without internet](/insights/does-ai-cctv-work-without-internet) for what an on-site setup does during an outage.

## Limitations

A central view does not fix bad local rules or poor enrolment at a site. It makes them visible sooner. Small sites with a few staff may be better served by a simple local process that feeds the central master than by full instrumentation. And if your sites are run by different legal entities, check whether one system and one export are appropriate at all.

## Next step

Ask whoever compiles head-office attendance how long it takes each month, and what they do when two sites disagree about a transferred employee. The length of that answer is the size of the problem.

To estimate travel that remote checks could replace, use the [remote and multi-site viewing calculator](/remote-cctv-monitoring#scenario-C27). If you want an engineer to review capture and connectivity at your sites, [ask for a site-specific assessment](/free-audit).

## Sources

- Ministry of Labour and Employment, *Additional FAQs on Labour Codes* (as on 16 March 2026): [labour.gov.in](https://www.labour.gov.in/static/uploads/2026/03/a4ccf4c6d97c4f1f36a6d83f8c64213d.pdf) — questions 25 and 27. Checked 8 October 2026.
