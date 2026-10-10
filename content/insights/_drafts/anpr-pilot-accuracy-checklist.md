---
title: "Measure ANPR pilot accuracy using a manual ground-truth log"
metaTitle: "ANPR accuracy testing: a ground-truth log for your pilot"
date: "2026-10-08"
category: "Buying Guide"
excerpt: "A supplier's accuracy figure describes their test, not your gate. A manual ground-truth log — every passage, every exact read, every unread plate, every false match — tells you what a pilot actually achieved."
metaDescription: "Test an ANPR pilot against a hand-kept log of every vehicle: count exact reads, unread plates and false matches, by day and night, before you sign."
readTime: 7
draft: true
reviewStatus: "Awaiting PGAK engineer review. PGAK publishes no ANPR read rate; its ANPR evidence is two installation photographs (pillar mount at about 1.5 m in daylight, operator console). All figures in the worked example are illustrative and labelled as not a PGAK result. Whether ANPR is a native PGAK module or a licensed engine is an open owner decision; wording is true either way. Links to /insights/anpr-number-plate-recognition-when-it-works and says it has a condition-by-condition test sheet: promote the B041 refresh together with this article."
faqs:
  - q: "How do you measure ANPR accuracy?"
    a: "Compare what the system logged with a manual ground-truth log of every vehicle that actually passed, over a pilot long enough to include nights and your busiest hours. Count passages, exact reads, unread plates, wrong reads and false matches separately, and report day and night separately."
  - q: "What is a ground-truth log?"
    a: "A record, kept by a person, of every vehicle that passed the gate during the pilot: time, direction and the plate as read by a human from the vehicle or the stored snapshot. It is the reference the system's reads are checked against. Without it, you only know what the system read, not what it missed."
  - q: "Why is a single accuracy percentage misleading?"
    a: "Because it can be calculated in different ways and hide the failures that matter. A figure based only on plates the system detected leaves out plates it never saw. A daytime-heavy pilot hides night problems. A wrong read that matches the wrong vehicle on an allow-list matters more than a plate left unread. Ask for the counts behind any percentage."
  - q: "How long should an ANPR pilot run?"
    a: "Long enough to cover the conditions the gate actually faces: several nights, your peak hours, the vehicle types you see, and ideally a wet day. A morning demonstration with clean cars at the right angle tells you very little about a monsoon night with muddy trucks."
---

**Straight answer: to measure an ANPR pilot, keep a hand-written ground-truth log of every vehicle that actually passed, then compare it line by line with what the system logged. Count five things separately — passages, exact reads, unread plates, wrong reads and false matches — and report day and night separately. A supplier's single accuracy figure describes their test; this log describes your gate.**

Every ANPR brochure has a number. It is usually calculated on clean plates, at the ideal angle, from a test set chosen by the supplier — and often only on plates the system detected in the first place. None of that tells you what your guard will face at 10 pm with a muddy truck. A pilot measured properly does.

## What to count

Agree these definitions with the supplier in writing before the pilot starts.

| Measure | Definition | Why it matters |
|---|---|---|
| **Passages** | Vehicles that actually passed the gate, from the ground-truth log | The denominator. Never use "plates detected" instead |
| **Exact reads** | System read every character correctly | The useful reads |
| **Unread plates** | Vehicle passed; the system logged no plate | Each one becomes manual work for the guard |
| **Wrong reads** | System logged a plate with one or more wrong characters | Corrupts searches: the vehicle is hidden under the wrong number |
| **False matches** | A wrong read matched a different vehicle on the allow-list or watch list | The most serious: the wrong vehicle is treated as known, or a known vehicle is flagged |
| **Phantom reads** | System logged a plate when no vehicle passed, or logged one vehicle twice | Clutters the log; inflates counts |

False matches are a subset of wrong reads but are counted separately because their consequences are different. If the pilot will drive a barrier, a false match on an allow-list could open it for the wrong vehicle.

## Setting up the ground-truth log

1. **Fix the setup.** Camera position, lens, lighting and software settings are agreed and frozen for the pilot. If they change, start a new pilot period.
2. **Synchronise clocks.** The person keeping the log and the system must use the same time. Check at the start of each shift.
3. **Choose who keeps the log.** Ideally someone other than the guard handling traffic, at least for the busiest hours. Alternatively, the plate can be read afterwards by a person from the stored snapshot or recorded video, as long as every passage is captured.
4. **Record every passage**, in this format:

| Time | Direction | Plate (read by a person) | Vehicle type | Conditions | System read | Outcome |
|---|---|---|---|---|---|---|
| 21:14 | In | (as read) | Truck | Night, dirty rear plate | (as logged) | Wrong read |
| 21:20 | Out | (as read) | Car | Night, headlights | — | Unread |

Outcome is filled in afterwards, when the two logs are compared. Do not write real plates into any document that will be shared outside the team running the pilot.

5. **Cover the conditions.** Days and nights, the peak hour, each vehicle type (two-wheelers, cars, trucks, tractors), and a wet day if one occurs. Tag conditions as you go: night, glare, dirty plate, two-line plate, angled approach, non-standard lettering.
6. **Keep the snapshots** for every unread plate and wrong read. They show why it failed.

## The pilot checklist

**Before**
- [ ] Definitions above agreed in writing
- [ ] Camera position, lens, lighting and settings recorded and frozen
- [ ] Clocks synchronised
- [ ] Ground-truth log format printed or set up
- [ ] Pilot dates cover nights, peak hours and every vehicle type
- [ ] Who sees the plate data during the pilot agreed; no sharing over WhatsApp

**During**
- [ ] Every passage logged, including ones the system missed
- [ ] Conditions tagged
- [ ] Clock check each shift
- [ ] Any change to the setup noted with time (starts a new period)

**After**
- [ ] Logs compared line by line; each passage given one outcome
- [ ] Counts calculated for day and night separately
- [ ] Counts calculated per vehicle type and condition where numbers allow
- [ ] Snapshots of every failure reviewed with the supplier
- [ ] Supplier's proposed fixes recorded; retest planned for the weakest condition
- [ ] Pilot data deleted or retained according to the agreed rule

## Worked example

**Illustrative example (hypothetical numbers — not a PGAK result and not a benchmark).** A one-lane gate is piloted for a week. The ground-truth log records 600 passages: 400 by day and 200 by night.

| | Day | Night |
|---|---|---|
| Passages (ground truth) | 400 | 200 |
| Exact reads | 380 | 150 |
| Unread plates | 12 | 36 |
| Wrong reads | 8 | 14 |
| — of which false matches on the allow-list | 1 | 3 |
| Phantom or duplicate reads (not in passages) | 5 | 9 |

The arithmetic, using passages as the denominator:

- Day exact-read rate: 380 ÷ 400 = 95%. Unread 12 ÷ 400 = 3%. Wrong 8 ÷ 400 = 2%.
- Night exact-read rate: 150 ÷ 200 = 75%. Unread 36 ÷ 200 = 18%. Wrong 14 ÷ 200 = 7%.
- Check: 380 + 12 + 8 = 400; 150 + 36 + 14 = 200.
- Combined, 530 ÷ 600 ≈ 88% — a figure that describes neither the day shift nor the night shift.

What the example tells you:

- **The night is the problem.** Reads drop and wrong reads more than triple as a share. Look at lighting, exposure and headlight glare before going live.
- **Guard workload at night.** 36 unread plus 14 wrong reads is 50 vehicles a week that need handling by hand at night, out of 200.
- **False matches decide automation.** Four false matches on the allow-list in a week is a reason not to let the system open a barrier unattended until it is fixed.
- **A misleading alternative.** Had the supplier divided exact reads by plates *detected* (excluding the 48 unread), the result would be 530 ÷ 552 ≈ 96% — the same pilot, a much better-looking number. That is why the denominator must be passages from the ground-truth log.

## Reading a supplier's accuracy claim

Ask, for any figure offered:

1. What was the denominator — vehicles that passed, or plates detected?
2. Were wrong reads and unread plates counted separately?
3. Day and night separately? Which vehicle types?
4. Whose gate, which camera position, how long?
5. Can we see the snapshots of the failures?

PGAK publishes no ANPR read rate. Its published evidence is two photographs from a gate installation — a camera on an existing pillar at about 1.5 metres in daylight, and the operator console — which show a fitting and a working console, not accuracy. At your gate, the figure has to come from a pilot like this one.

## When a pilot is not worth running

If the gate has no controlled lane — vehicles enter an open yard from several directions without slowing — fix that first; a pilot will only confirm that plates are not readable there. [When number-plate recognition works](/insights/anpr-number-plate-recognition-when-it-works) explains the conditions and has a condition-by-condition test sheet.

## Next step

Feed the pilot's counts into the [ANPR and vehicle logs calculator](/anpr-number-plate-recognition#scenario-C09) — its "exceptions per month" input is exactly the unread and wrong reads your guard will handle — or the [ANPR gate time calculator](/calculators/anpr-gate-time). The [ANPR page](/anpr-number-plate-recognition) explains what an installation involves.

[Ask for a site-specific assessment](/free-audit) to plan a pilot on your own gate.
