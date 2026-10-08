---
title: "Visitor vehicle logs for housing societies"
metaTitle: "Housing society gate management: visitor vehicle logs"
date: "2026-09-19"
updated: "2026-10-08"
category: "Security Basics"
excerpt: "Most society gate registers are a formality nobody checks until something goes wrong. How to log resident and visitor vehicles, approve visitors, handle the exceptions, and stop the log from becoming a record of everyone's movements."
metaDescription: "How a housing society can log visitor vehicles, approve entries and handle exceptions, with a written rule on who sees the log and how long it is kept."
readTime: 7
image: "/insights/covers/housing-society-gate-management.webp"
draft: true
reviewStatus: "Awaiting PGAK engineer review and legal review by a named lawyer (privacy and retention points). The retention periods in the schedule are illustrative placeholders for the committee to set, not legal requirements. The earlier version referred to 'state DPDP guidance'; the DPDP Act, 2023 is central legislation, so that phrase is removed and readers are pointed to /insights/is-ai-cctv-legal-in-india-dpdp-act. No PGAK face-recognition or ANPR deployment at a housing society is claimed. UNRESOLVED: whether any state or municipal rule sets a minimum retention for society visitor registers — not verified, so no figure is stated."
faqs:
  - q: "What CCTV does a housing society gate need?"
    a: "At least one camera that records the driver or rider before the barrier and, if vehicle numbers matter, a separate camera at plate height along each lane. A camera mounted high to cover the whole gate rarely reads plates or shows a usable face. A second view of the exit lane lets you match departures to arrivals."
  - q: "Does a society still need a visitor register if it has CCTV or ANPR?"
    a: "Yes. A camera or plate reader records which vehicle came in and when; it does not record which flat the visitor was going to or who approved the entry. Keep a simple register or app entry for the purpose and the approving resident, and link it to the vehicle record."
  - q: "Who should be allowed to see the society's vehicle log?"
    a: "A small number of named roles set by the committee in writing — for example the security supervisor and one committee office-bearer — with every search recorded with a reason. A resident can ask for the entries about their own flat or vehicle. The guard sees live arrivals, not months of history."
  - q: "How long should a society keep visitor vehicle records?"
    a: "Long enough to settle the disputes you actually get, and no longer. Many committees choose a short period for routine visitor entries and keep specific records longer only when a complaint or police request is open. Set the periods in writing, delete on schedule, and check your obligations with a qualified adviser."
---

**Straight answer: a society gate needs three records that answer different questions — which vehicle came in (a camera or plate reader), who approved it and for which flat (a register or app entry), and who looked at those records later (an access log). Set up a simple approval flow for visitors, decide in advance how exceptions are handled, and agree in writing who may search the log and how long it is kept. Without that last step, a vehicle log becomes a record of every resident's movements that anyone with the recorder password can browse.**

Every residents' welfare association has had the same meeting. A parcel goes missing or a stranger is seen near the parking, someone asks for the gate footage, and it turns out either the camera has been pointing at the barrier's counterweight for months, or the footage exists but nobody agrees who is allowed to look at it.

The problem at most society gates is not a lack of cameras. It is that nobody decided, in advance, what the records are for and who may use them.

## Three records, three questions

**Which vehicle came in, and when.** A camera that captures the driver or rider before the barrier, and — if you want plates logged automatically — a plate camera at about plate height, one per lane, looking along the lane. A camera high on the guard cabin roof sees every car and reads very few plates. [When number-plate recognition works](/insights/anpr-number-plate-recognition-when-it-works) explains the placement.

**Why it came in, and who approved it.** A camera cannot tell you that a car was there for flat 402's plumber. A paper register or app entry records the flat, the purpose and the approving resident. Link it to the vehicle record by time and plate.

**Who looked at the records afterwards.** Every search and every export, by whom and why. This is what protects residents from casual browsing and protects the committee in a dispute.

## Why the paper register fails on its own

It is filled in by whoever is at the gate, in handwriting nobody checks, and records what the visitor claims rather than what happened. "Ramesh, flat 204, 6 pm" is written whether or not it is true. CCTV or a plate log fixes the proof problem but not the intent problem — which is why the two work together.

## The access approval and resident exception flow

This is the flow to agree with the guards and the committee before any system is installed. It works on paper, in an app, or with plate recognition doing the first step.

**Main flow**

1. **Vehicle arrives at the barrier.** The camera records it. If plate recognition is used, the plate is read and checked against the resident vehicle list.
2. **Resident vehicle matched.** The guard's screen shows "resident — flat number". The guard lets it through (or the barrier opens, if the society has chosen and safely installed automation). The entry is logged.
3. **No match — treated as a visitor.** The guard asks which flat, and the resident is contacted by intercom or app.
4. **Resident approves.** Entry is logged with plate, time, flat, approving resident and guard on duty. The visitor gets a parking instruction.
5. **Resident declines or cannot be reached.** The vehicle does not enter. Logged as refused, with time.
6. **Exit.** The exit is logged against the same plate so overstays are visible.

**Exceptions — decide these in advance**

| Situation | Agreed handling | Logged as |
|---|---|---|
| Ambulance, fire or police vehicle | Let through immediately; never wait for approval or a read | Emergency entry, plate if visible |
| Resident in a new, borrowed or hired car | Guard confirms the resident; resident adds the vehicle as temporary if needed | Resident entry, unregistered vehicle |
| Plate unreadable (dirty, damaged, none) | Handled as a visitor; guard notes the number from the vehicle | Manual entry |
| Delivery and cab vehicles | Approval per delivery, or a delivery-only parking zone | Visitor, purpose "delivery" |
| Domestic staff and regular service providers | Registered by the employing flat, reviewed periodically | Registered staff |
| Vehicle sold or resident moves out | Removed from the resident list on notice; the committee checks the list at intervals | List change, by whom |
| Plate matches a resident but the driver is unfamiliar | Guard confirms with the flat before entry | Resident vehicle, confirmed |

The emergency row matters most: no automated system or approval step should ever hold an ambulance at the gate.

**Limited retention and access — illustrative schedule for the committee to adapt**

| Record | Who can see it | Kept for (committee sets the period) | Then |
|---|---|---|---|
| Live arrivals on the gate screen | Guard on duty | Current shift | Moves to the log |
| Visitor vehicle log (plate, time, flat, approver) | Security supervisor; named office-bearer | Short — for example a few weeks | Deleted on schedule |
| Snapshots attached to visitor entries | Security supervisor; named office-bearer | Same as the log or shorter | Deleted on schedule |
| Resident vehicle list | Security supervisor; flat owner for their own entries | While the resident lives there | Removed on exit |
| Records linked to an open complaint or police request | Named office-bearer | Until the matter closes | Deleted, with a note of the decision |
| Search and export log | Committee | Longer than the vehicle log | Reviewed at the committee meeting |

<!-- UNRESOLVED: confirm whether any state, municipal or cooperative-society rule sets a minimum retention for visitor registers before promoting -->
The periods are yours to set. Choose them by asking how long after an incident residents typically complain, not by keeping everything "just in case". The more you keep, the more you have to protect.

## Who should be allowed to search

A gate log captures every resident's comings and goings, which makes it more sensitive than a shop's CCTV. Left undefined, "who can see it" becomes whoever has the recorder password — usually the guard, sometimes a committee member's phone.

A written rule prevents most of the fights before they start:

- name the roles that may search history, not individuals' friends;
- require a reason for each search, recorded with it;
- let residents ask for entries about their own flat or vehicle;
- never share footage or the log over WhatsApp groups; hand over specific clips through the committee, with the request recorded;
- review the search log at committee meetings.

Number plates and visitor details identify people. The Digital Personal Data Protection Act, 2023 governs how personal data is handled; how it applies to a particular society's gate records is a question for a qualified adviser. [Is AI CCTV legal in India?](/insights/is-ai-cctv-legal-in-india-dpdp-act) sets out the starting points, and [CCTV footage as legal evidence](/insights/cctv-footage-legal-evidence-india) explains what to preserve if a matter goes to the police. This article is general information, not legal advice.

## Where plate recognition and face recognition fit

Plate recognition can check arriving vehicles against the resident list so the guard does not have to, and turns the register into something searchable. It needs a controlled lane, a camera at plate height and a test on your own gate; dirty, old and two-line plates will still need the guard. Treat it as a filter that reduces the guard's workload, not something to leave unattended.

Face recognition for residents raises the privacy questions above more sharply, needs consent and enrolment kept current as people move in and out, and should never be the only way in. If a society considers it, it should be evaluated at the gate with residents who have agreed to take part, and with a non-biometric way in for anyone who declines.

Neither replaces the guard. An unfamiliar visitor, a midnight delivery or an argument at the barrier needs a person.

## What the committee can do this week

Walk to the gate and check three things: does a camera show a usable view of the driver before the barrier, is there a written list of who may search the records, and is the visitor register actually being filled in? Fix whichever fails first. Then agree the exception table above with the guards.

## Next step

If you are weighing plate recognition, the [ANPR and vehicle logs calculator](/anpr-number-plate-recognition#scenario-C09) and the [ANPR gate time calculator](/calculators/anpr-gate-time) show how much guard time is at stake against the exceptions they would still handle by hand. The [ANPR page](/anpr-number-plate-recognition) explains what a gate installation involves.

[Ask for a site-specific assessment](/free-audit) to have the gate, lanes and cameras checked before the committee commits to anything.
