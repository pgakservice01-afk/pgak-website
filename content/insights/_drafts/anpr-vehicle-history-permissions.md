---
title: "Search vehicle history without exposing everyone's movements"
metaTitle: "Vehicle entry exit log software: who can search it"
date: "2026-10-08"
category: "Compliance"
excerpt: "A searchable vehicle log answers 'which truck left with the material' in seconds. It also records when every employee arrives and leaves. A role-permission matrix, a retention schedule and an export audit trail to keep the first without abusing the second."
metaDescription: "A vehicle entry-exit log records everyone's movements. A role-permission matrix, retention schedule and export audit trail to keep searches proportionate."
readTime: 7
draft: true
reviewStatus: "Awaiting PGAK engineer review and legal review. No legal rule is stated as fact: the DPDP Act, 2023 is named as the governing law for personal data and readers are pointed to /insights/is-ai-cctv-legal-in-india-dpdp-act and a qualified adviser. Retention periods in the schedule are illustrative placeholders, not legal minimums. UNRESOLVED: whether any statutory minimum retention applies to factory gate vehicle registers (for example under labour, excise/GST or factory rules) — not verified, so none is stated. PGAK role-permission, export-logging and retention features are NOT claimed; the article asks readers to have any supplier, PGAK included, demonstrate them. PGAK's published console photograph shows approve/deny cards and per-read diagnostics only."
faqs:
  - q: "Is a vehicle entry log personal data?"
    a: "A number plate can usually be linked to a person — the owner or the employee who drives the vehicle — so treat the log as personal data. The Digital Personal Data Protection Act, 2023 governs how personal data is handled in India; confirm how it applies to your gate records with a qualified adviser."
  - q: "Who should be able to search the vehicle log?"
    a: "Only roles that need history for their job, and only as far back as they need. A guard needs today's arrivals; a security supervisor needs recent history to investigate; very few people need months of records or the ability to export them. Write the roles down and configure the software to match."
  - q: "How long should vehicle entry records be kept?"
    a: "Long enough for the purpose they serve — settling disputes about deliveries, investigating a loss — and then deleted on a schedule. Keep records linked to an open investigation until it closes. Check with an adviser whether any law requires you to keep particular records for a minimum period."
  - q: "What is an export audit trail?"
    a: "A record of every time someone copied data out of the system — who, when, what search, how many records, why, and where it went. Exports are where most misuse happens, because exported data leaves the system's controls. The trail should be kept longer than the vehicle log itself and reviewed regularly."
---

**Straight answer: a searchable vehicle log is worth having because it turns "which truck left with the material" into a search. But it also records when every employee, contractor and visitor arrives and leaves, so decide before go-live who may search it, how far back, who may export it, and how long each kind of record is kept — and make the software log every search and export. A role-permission matrix, a retention schedule and an export audit trail do that job.**

Most gate-log projects start with the investigation the owner wishes they could have done last year. Few start with the question of what else the log reveals: which manager comes in late, which employee visits the site on a Sunday, which supplier's truck stays three hours. The record is the same; what matters is who can look and why.

## Why a vehicle log is sensitive

A number plate can usually be linked to a person — the owner of the vehicle, or the employee who drives it every day. A log of plates with times is therefore a log of people's movements. Treat it as personal data. The Digital Personal Data Protection Act, 2023 governs personal data in India; how it applies to your gate records is a question for a qualified adviser, and [Is AI CCTV legal in India?](/insights/is-ai-cctv-legal-in-india-dpdp-act) sets out the starting points. This article is general information, not legal advice.

The practical rules that follow are good practice whatever the legal detail: collect what you need, limit who sees it, keep it only as long as it serves its purpose, and record who used it.

## The role-permission matrix

Adapt the roles to your site. The principle is that each role gets the narrowest access that lets it do its job.

| Action | Gate guard | Security supervisor | Logistics / stores | HR / admin | Plant head | System administrator |
|---|---|---|---|---|---|---|
| See live arrivals at the gate | Yes | Yes | No | No | No | No |
| Approve or deny an arrival | Yes | Yes | No | No | No | No |
| Search today's log | Yes | Yes | Own vehicles and suppliers | No | Yes | No |
| Search the last few weeks | No | Yes | Own vehicles and suppliers | No | Yes | No |
| Search the full retained history | No | With a recorded reason | No | No | With a recorded reason | No |
| Search by an individual employee's vehicle | No | With a recorded reason | No | Only for a formal, documented process | With a recorded reason | No |
| Correct a misread plate | No | Yes, with the original kept | No | No | No | No |
| Manage allow-lists | No | Yes | Request only | Request only (staff vehicles) | Approve | Configure only |
| Export records | No | With approval | No | No | Approve | No |
| Change retention or delete records | No | No | No | No | Approve | Execute, logged |
| View the search and export log | No | No | No | No | Yes | Yes |

Three points behind the matrix:

- **The system administrator configures; they do not browse.** Technical access to the database should not mean reading people's movements.
- **HR is deliberately limited.** A gate log is not an attendance system. Using it to monitor an individual employee's arrival times should happen only under a documented process the employee knows about, not as a casual search. It should never lead to an automatic late mark or pay deduction.
- **Corrections keep the original.** When a supervisor fixes a misread plate, the system should store both the original read and the correction, with who made it.

## The retention schedule

<!-- UNRESOLVED: confirm whether any statutory minimum retention applies to factory gate vehicle or material-movement registers -->
**Illustrative schedule — periods are placeholders for you to set with your adviser, not legal requirements.**

| Record | Purpose | Example period | At the end |
|---|---|---|---|
| Plate reads with time and direction | Investigations, delivery disputes | A defined number of weeks, set by how long disputes typically take to surface | Delete automatically |
| Snapshots attached to reads | Confirming a disputed read | Same as reads or shorter | Delete automatically |
| Records linked to an open investigation or claim | Evidence | Until the matter closes | Delete, recording the decision |
| Allow-list (registered vehicles) | Recognising regular vehicles | While the person or vehicle is active | Remove when an employee leaves or a vehicle is sold |
| Corrections to reads | Accuracy of the record | Same as the read | Delete with the read |
| Search and export audit trail | Accountability | Longer than the reads themselves | Review, then delete on schedule |

Two practical cautions:

- **Deletion must actually happen.** A retention period nobody enforces is not a retention period. Ask the supplier to show automatic deletion working.
- **Exports escape the schedule.** A spreadsheet emailed to someone is no longer deleted when the log is. Hence the audit trail.

If footage or records may be needed as evidence, [CCTV footage as legal evidence](/insights/cctv-footage-legal-evidence-india) explains what to preserve and how.

## The export audit trail

Every export should create an entry with:

| Field | Example |
|---|---|
| Who exported | User name and role |
| When | Date and time |
| What search | Plate, date range, gate |
| How many records | Count of reads and snapshots |
| Reason | "Delivery dispute, supplier X, invoice Y" |
| Approved by | Name, where approval is required |
| Destination | Handed to police on request; shared with the supplier's manager; internal file |
| Format | Report, clip, spreadsheet |

Review the trail monthly. Look for exports without a reason, repeated searches of one person's vehicle, and exports by roles that should not have them.

And a rule for everyone: never share the log, snapshots or footage on WhatsApp groups or through a web form, and never share recorder or software passwords. Hand over specific records through the named role, with the request recorded.

## What to ask the software supplier

Ask any supplier — PGAK included — to demonstrate each of these in the product, not describe them:

1. Can permissions be set per role, per action, and per time range of history?
2. Is every search logged, not just exports?
3. Does the export log capture the reason and approval?
4. Does automatic deletion run on the schedule you set, and can you see that it ran?
5. When a read is corrected, is the original kept?
6. Can a person's allow-list entry be removed in one step when they leave?

If the answer to any of these is "we can do that manually", factor in who will do it, every week.

## When a lighter approach is enough

A small site with one gate and a handful of people who can search may manage with a short retention period, two roles and a written rule. The matrix matters most where many people have logins, several gates feed one log, or the log is linked to HR or ERP systems.

## Next step

Estimate the time a searchable log saves at the gate with the [ANPR and vehicle logs calculator](/anpr-number-plate-recognition#scenario-C09) or the [ANPR gate time calculator](/calculators/anpr-gate-time). The [ANPR page](/anpr-number-plate-recognition) shows the PGAK gate console, where each read is a card an operator approves or denies, with plates blurred in published images. For CCTV records more generally, see [CCTV in the workplace](/insights/cctv-workplace-privacy-india).

[Ask for a site-specific assessment](/free-audit) to plan the gate, the log and who may use it before anything is installed.

*This article is general information, not legal advice. Confirm your own obligations with a qualified adviser.*
