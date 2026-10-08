---
title: "Tailgating at access-controlled doors: what video can detect"
metaTitle: "Tailgating detection system: what video can and can't do"
date: "2026-10-08"
category: "Security Basics"
excerpt: "A camera can count people through a door. The access-control system knows how many were authorised. Tailgating detection is the comparison between the two — and it needs a trial at your door, an exception list and a person reviewing every flag."
metaDescription: "Tailgating detection compares people counted through a door with authorised entries. A paired-entry trial, accessibility exceptions and human review."
readTime: 6
draft: true
reviewStatus: "Awaiting PGAK engineer review. Tailgating detection has no PGAK evidence record; it is described as something that can be evaluated at a site, not as a PGAK capability with results. No accuracy figure is stated. Integration with any particular access-control brand is not claimed. Trial numbers are illustrative."
faqs:
  - q: "What is tailgating at an access-controlled door?"
    a: "Tailgating is when a second person passes through a door on someone else's card, fingerprint or face, without presenting their own credential. It is often harmless — a colleague holding the door — but it means the access log no longer shows who is inside."
  - q: "Can CCTV detect tailgating?"
    a: "A suitably placed camera can count how many people pass through a door in each opening. Detecting tailgating means comparing that count with the number of authorised entries the access-control system recorded for the same opening. A count higher than the authorised entries is flagged for a person to review; the camera alone cannot tell whether the second person was allowed in."
  - q: "Does tailgating detection stop someone getting in?"
    a: "No. Detection identifies an event after it happens. Physically preventing tailgating needs suitable access hardware, such as a turnstile or interlocked doors, and a response process. Video detection is usually used to find out how often it happens and at which doors."
  - q: "How should people with disabilities be handled?"
    a: "Plan for them before the trial. A wheelchair user with a companion, a person with an assistance animal or a carer accompanying someone will produce a higher count than the credentials presented. Record these as approved exceptions so the person is never treated as a violation, and make sure the door itself remains usable."
---

**Straight answer: video can count how many people pass through a door each time it opens; the access-control system knows how many credentials were presented. Tailgating detection is the comparison between those two numbers, and a mismatch is a flag for a person to review — not proof that someone broke in. Run a paired-entry trial at your own door before trusting it, write down the accessibility exceptions in advance, and keep a human in the loop for every flag.**

Tailgating is the most ordinary security gap there is. Someone badges in, a colleague walks through behind them, and the access log now says one person entered when two did. Most of the time it is courtesy. Occasionally it is how an outsider gets into a stores room or a server room.

## What the camera counts and what the access system knows

**The camera's job** is counting: how many people crossed the threshold, in which direction, during each door opening. It needs a view that separates people walking close together — usually overhead or steeply angled at the door, not a wide corridor shot. [Where to place cameras for AI detection](/insights/where-to-place-cctv-cameras-for-ai-detection) explains why placement decides this.

**The access-control system's job** is authorisation: which credentials were presented and accepted, and when.

**Tailgating detection** lines the two up. If the access system recorded one accepted card at 09:02:14 and the camera counted two people entering within that opening, the event is flagged. Counting movement and checking permission are different tasks; the comparison needs both, at matching timestamps. Without access-control events, video can only say "two people went through close together".

## What makes it hard

- **People walking very close together**, or one carrying a child or a large box, may be counted as one.
- **Door held open** during deliveries or shift change produces a run of entries against a single swipe.
- **Exits mixed with entries** confuse the count if the camera cannot tell direction reliably.
- **Clock drift** between the camera system and the access controller breaks the pairing. Check both clocks before anything else.
- **Legitimate group entry** — a supervisor escorting visitors — is tailgating by definition but allowed by policy.

## The paired-entry trial

Run this at each door you care about, with volunteers who know what is being tested. It tells you what the system flags correctly, what it misses and what it flags wrongly.

**Before the trial**

- Synchronise the camera and access-control clocks.
- Agree the time window that counts as "one opening".
- Write down the approved exceptions (below).
- Tell staff a trial is running, and why.

**Scripted passes — repeat each several times, by day and at the lighting conditions of a night shift if the door is used then**

| # | Scenario | Credentials presented | People through | Expected outcome |
|---|---|---|---|---|
| 1 | One person, own credential | 1 | 1 | No flag |
| 2 | Two people, each presents a credential | 2 | 2 | No flag |
| 3 | Two people, one credential (classic tailgate) | 1 | 2 | Flag |
| 4 | Two people walking very close, one credential | 1 | 2 | Flag — tests close separation |
| 5 | One person carrying a large box, own credential | 1 | 1 | No flag — tests false count |
| 6 | Door held open, three people, one credential | 1 | 3 | Flag |
| 7 | Person enters, another exits in the same opening | 1 | 1 in, 1 out | No flag — tests direction |
| 8 | Wheelchair user with companion, one credential | 1 | 2 | Approved exception — must not be flagged as a violation |
| 9 | Escorted visitor with supervisor | 1 | 2 | Approved exception if logged by the supervisor |
| 10 | Trolley or delivery cart pushed through | 1 | 1 | No flag — tests object versus person |

**Record for each pass**: time, scenario number, what the access system logged, what the camera counted, whether a flag was raised, and what the reviewer concluded.

**Illustrative example (hypothetical numbers).** Scenario 3 is run 20 times at a stores-room door: 17 are flagged, 3 are not. Scenario 5 is run 20 times: 2 are wrongly flagged. Report those counts as they are — "17 of 20 classic tailgates flagged; 2 of 20 single people with boxes wrongly flagged" — rather than as one blended accuracy figure. The misses tell you what the system cannot see; the wrong flags tell you how much reviewer time it will cost.

## Accessibility exceptions are design, not an afterthought

A door system that treats a wheelchair user and their companion as a violation is a badly designed system. Before the trial:

- list the situations where more people pass than credentials presented, by design — wheelchair users with companions, people with assistance animals, carers, escorted visitors;
- give them an agreed way to be logged as approved, such as the companion presenting their own credential or a supervisor note;
- make sure flags in these cases go to a reviewer as "check", never as an automatic warning to the individual;
- keep the door physically usable: detection must not lead to anyone narrowing a door or adding a barrier that blocks accessible entry.

## Human review, every time

Every flag goes to a person who looks at the clip and the access event together. Possible conclusions: approved exception, courtesy tailgate (a reminder to staff), counting error, or a genuine concern to follow up. Flags should never trigger an automatic penalty, a warning to an individual or a pay consequence. Video counts are evidence for a reviewer, not a verdict.

Review the flags weekly at first. The useful output is often a pattern — one door at shift change, one team that holds the door for each other — that a conversation or a turnstile can fix.

## When video detection is the wrong answer

If you need to physically prevent tailgating — a cash room, a hazardous area — you need access hardware designed for it, such as a turnstile or an interlocked pair of doors, plus a response process. Video detection will only tell you afterwards. If you have no electronic access control at all, start there: without credential events, there is nothing to compare the count with. And if the door is a busy general entrance with constant group movement, the review workload may outweigh the value.

## Next step

Estimate the review time involved with the [tailgating detection calculator](/features/guides/tailgating#scenario-C13), which subtracts exception-handling hours. The [tailgating guide](/features/guides/tailgating) covers the basics, and all calculators are on the [calculators page](/calculators). For counting people more generally, see [people counting with CCTV](/insights/people-counting-footfall-cctv).

Tailgating detection can be evaluated at your site with your doors, cameras and access system. [Ask for a site-specific assessment](/free-audit) to find out whether your door views and access events can be paired.
