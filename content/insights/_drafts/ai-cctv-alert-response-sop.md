---
title: "What happens after an AI CCTV alert? Build a response SOP"
metaTitle: "CCTV alert response procedure: build a simple SOP"
date: "2026-10-08"
category: "Security Basics"
excerpt: "An alert is only a phone buzzing until someone acknowledges it, checks it and acts. A one-page response procedure with an escalation worksheet, fallback contacts and a way to measure how fast it really works."
metaDescription: "A CCTV alert response procedure: who acknowledges, how they verify, when it escalates to a fallback, and how to measure response times. Worksheet inside."
readTime: 7
draft: true
reviewStatus: "Awaiting PGAK engineer review. Automatic escalation and intrusion alerting are UNVERIFIED for PGAK; the article says whether escalation is automatic or manual is confirmed per site. All times and contacts are hypothetical. 112 is cited as India's single emergency number (Emergency Response Support System) — engineer/owner to confirm it is the number they want readers to use in Punjab. Sibling drafts (person-vehicle-detection-alert-design, virtual-tripwire-vs-motion-detection, two-way-audio-unmanned-gate) are not linked because they are not live yet; add links on promotion."
faqs:
  - q: "What should happen when a CCTV alert comes in at night?"
    a: "Four steps, in order: the first receiver acknowledges it, verifies it from the snapshot, the live view and nearby cameras, decides whether it is false, known or unknown, and then acts as the procedure says — for an unknown person, usually by calling the guard and the supervisor, using lights or announcements if fitted, and calling the police on 112 if there is a credible threat. Every alert is written down."
  - q: "What if the person receiving the alert does not respond?"
    a: "The procedure should name a fallback contact and a time limit. If the first receiver has not acknowledged within the limit, the alert goes to the next person, either automatically if the system supports it or by a phone call from whoever is next on the list. Test the fallback with a staged alert, because it is the part that usually fails."
  - q: "Should a guard go and confront an intruder?"
    a: "No one should be sent alone to confront anyone. The guard's job is to observe from a safe position, keep in phone contact, switch on lights where fitted, and call for help. Pursuit and confrontation risk injury and are not what a CCTV alert is for."
---

**Straight answer: after an AI CCTV alert, four things must happen in a fixed order — someone acknowledges it, checks it, decides what it is, and acts — and if the first person does not respond within a set time, it goes to the next person. Write that down on one page: who receives each type of alert, how they verify it, how long before it escalates, who the fallback contacts are, and what action each outcome calls for. Then measure it with timestamps and staged alerts, because a procedure nobody has tested usually fails at the fallback.**

Most of the effort in alerting goes into detection: zones, classes, schedules. The part after the phone buzzes gets one line, usually "owner gets a notification". At 2 a.m., that line is the whole system.

## The four steps every alert goes through

1. **Acknowledge.** A named person confirms they have seen it. If nobody acknowledges within the time limit, it escalates.
2. **Verify.** Look at the snapshot, open the live view, check the neighbouring cameras, and if there is a guard, call him. The goal is one of three answers: *false* (animal, lights, rain), *known* (a staff member, a planned delivery), or *unknown*.
3. **Act.** The action depends on the answer and the alert type — see the worksheet. For an unknown person after hours, typical actions are: call the guard and supervisor; switch on lights or play an announcement if fitted; call the police on **112** if there is a credible threat. Do not send anyone alone to confront anyone.
4. **Record.** Time received, time acknowledged, time verified, the answer, the action, and who did it. Without this, nothing can be improved.

## Alert types and priorities

Sort your alerts before writing the procedure. A hypothetical factory might have:

| Priority | Alert type | Examples |
|---|---|---|
| **1 — act now** | Unknown person in an armed zone; camera covered or recorder offline at night | Person in the rear yard at 01:30; three cameras go dark together |
| **2 — check soon** | Vehicle at the gate after hours; long stay in a dwell zone | Truck waiting outside the gate at 23:00 |
| **3 — next working day** | Operational and maintenance | One camera offline in daytime; vehicle in the fire lane |

Priority 3 alerts should not go to the night security phone at all. Sending them there teaches the receiver to ignore priority 1.

## The escalation worksheet

Fill one row per alert type. Times below are an **illustrative example**; choose limits that match how quickly someone can actually reach each part of your site.

| Alert type | First receiver | Acknowledge within | Fallback 1 (if no ack) | Fallback 2 | How to verify | Actions allowed | Who may call 112 | Recorded where |
|---|---|---|---|---|---|---|---|---|
| Person in armed zone (P1) | Night guard + supervisor | 3 min | Supervisor's deputy, at 5 min | Owner, at 10 min | Snapshot, live view, adjacent cameras, call guard | Guard observes from safe position; lights on; announcement if fitted; police | Supervisor or guard, any time there is a credible threat | Alert log |
| Cameras covered / recorder offline at night (P1) | Supervisor | 5 min | Owner, at 10 min | — | Check other cameras; call guard to look from a distance | As above; do not approach alone | Supervisor | Alert log + maintenance log |
| Vehicle at gate after hours (P2) | Night guard | 5 min | Supervisor, at 10 min | — | Gate register; speak to driver through the gate | Direct driver; call supervisor if unplanned | Supervisor | Gate register |
| Long stay in dwell zone (P2) | Supervisor | 10 min | — | — | Live view | Ask guard to check from a distance | Supervisor | Alert log |
| Camera offline in daytime (P3) | Maintenance in-charge | Next working day | — | — | Walk to camera | Repair or raise with installer | — | Maintenance log |

Whether escalation to a fallback happens automatically or by a phone call depends on the alerting system; confirm which at assessment. A manual fallback works if it is written down and practised.

## The fallback contacts sheet

Keep it on one page, printed at the gate and in the supervisor's phone.

| Order | Name and role | Phone | Available | Can authorise | Last tested |
|---|---|---|---|---|---|
| 1 | Night supervisor | (number) | 20:00–08:00 | Guard actions, police call | (date) |
| 2 | Deputy supervisor | (number) | Nights when 1 is off | Same | (date) |
| 3 | Owner or plant head | (number) | Any time | Everything | (date) |
| — | Police | 112 | Any time | — | — |
| — | Fire and ambulance | 112 | Any time | — | — |

Two practical points. Phones on silent or "do not disturb" at night are the most common reason an alert goes unseen — the receiver should allow the alert app or contact through. And the contacts sheet goes stale: someone leaves, a number changes. Review it monthly.

## When the alert route itself fails

Plan for the channel breaking, not only for the people:

- **Internet or mobile data down at the site.** Detection may still run locally, but notifications need a network path. Decide what the guard does if alerts stop — see [does AI CCTV work without internet](/insights/does-ai-cctv-work-without-internet).
- **Power cut.** Cameras, recorder, processing unit and router on a UPS, or alerts stop with the lights.
- **Cameras covered or offline.** Treat the loss of several cameras at night as a priority 1 alert in itself; [tampering, obstruction and scene changes](/insights/cctv-camera-tampering-detection) has a test matrix.

## Measuring how well it works

Use the log to work out two times for every alert: **acknowledgement time** (received → acknowledged) and **verification time** (acknowledged → answer known).

**Worked example (illustrative example).** Five priority 1 alerts over a hypothetical fortnight:

| Alert | Received | Acknowledged | Ack time | Verified | Verify time |
|---|---|---|---|---|---|
| 1 | 23:14 | 23:16 | 2 min | 23:19 | 3 min |
| 2 | 01:52 | 02:03 | 11 min | 02:06 | 3 min |
| 3 | 02:40 | 02:41 | 1 min | 02:45 | 4 min |
| 4 | 03:05 | 03:20 | 15 min | 03:24 | 4 min |
| 5 | 04:30 | 04:33 | 3 min | 04:36 | 3 min |

Acknowledgement times sorted: 1, 2, 3, 11, 15 → **median 3 minutes, worst 15**. The median looks fine. The two slow ones were both between 01:00 and 03:30, and in both the fallback never fired, because nobody had told the deputy he was the fallback. The fix is in the worksheet, not the software: a 5-minute fallback, communicated and tested.

**Drill monthly.** Stage one alert at night, unannounced to the receiver but known to the supervisor, and record the same two times. It is the only way to test the fallback without waiting for a real incident.

## Privacy and handling

Keep alert snapshots and clips within the people on the response list. Do not forward them to wider groups, and never share CCTV passwords, stream links or recordings through chat apps or web forms. Workplace recording carries obligations — see [CCTV in the workplace](/insights/cctv-workplace-privacy-india).

## Limitations

- **A procedure cannot guarantee a response.** It makes one more likely and shows you where it breaks.
- **Safety comes first.** No step in this procedure asks anyone to pursue or confront. If in doubt, observe, call for help and record.
- **Too many alerts break any SOP.** If the receiver gets dozens a night, fix the rules first — [reducing false alarms without hiding real incidents](/insights/ai-cctv-false-alarms-how-to-reduce).
- **After an incident**, a different checklist applies: [the day after a theft](/insights/what-to-do-day-after-a-theft).

## Next step

Estimate the time your team spends reviewing alerts now, and with better-targeted rules, using the [Custom text alerts calculator](/features/guides/custom-text-alerts#scenario-C04) and the [false-alarm cost calculator](/calculators/false-alarm-cost). The [plain-language alerts guide](/features/guides/custom-text-alerts) explains how written alert conditions are trialled. If you would like the worksheet drafted for your own site — alert types, receivers and fallbacks — [ask for a site-specific assessment](/free-audit).
