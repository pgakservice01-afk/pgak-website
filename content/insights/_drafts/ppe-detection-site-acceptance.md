---
title: "PPE detection at a factory: define what counts as a violation"
metaTitle: "PPE detection: define a violation before you buy"
date: "2026-10-08"
category: "Compliance"
excerpt: "A camera cannot enforce a PPE rule nobody has written down. Before accepting any PPE detection system, define the zone, the task, the PPE class and what the camera must be able to see. An acceptance matrix you can use."
metaDescription: "Before accepting PPE detection, define violations by zone, task and PPE class, and test occlusion on your own cameras. An acceptance matrix for factories."
readTime: 8
draft: true
reviewStatus: "Awaiting PGAK engineer review. Legal points require review by a named lawyer before publication. Verified today from an official source: PIB press release, Ministry of Labour & Employment, 'Government Makes the Four Labour Codes effective to Simplify and Streamline Labour Laws', 21 November 2025 (Codes effective from 21 November 2025; existing Acts' provisions, rules and standards continue during transition); PIB backgrounder 'India's Labour Reforms: Simplification, Security, and Sustainable Growth', 21 November 2025 (OSH Code consolidates 13 Acts including the Factories Act, 1948). UNRESOLVED: the specific PPE duties under the OSH Code and any central or Punjab rules notified since 21 November 2025 have not been verified; whether Punjab rules under the Code are now in force is not verified. PGAK evidence covers gloves only (limited pilot)."
faqs:
  - q: "Why do I need to define a PPE violation before installing detection?"
    a: "Because a camera can only check a written rule. 'Helmets in the yard' is not testable; 'hard hat on head for anyone inside the marked crane zone during crane operation' is. Write the rule by zone, task and PPE class, then test whether your cameras can see it."
  - q: "Which PPE can a camera detect?"
    a: "Only the classes a given model has been trained and tested for, in views where the item is visible. PGAK's published recording covers one class, gloves, on an existing line camera. Helmets, vests, goggles, masks and shoes each need their own test on your cameras."
  - q: "Can PPE detection be used to fine or penalise workers?"
    a: "It should not drive automatic penalties or pay deductions. Detections can be wrong, and a flag is a prompt for a supervisor to look. Any action is a human decision under your normal procedures, with the clip checked first."
---

**Straight answer: before a factory accepts any PPE detection system, it should write down what counts as a violation, zone by zone and task by task, for each PPE class, and then test whether its own cameras can see it. Without that, nobody can say whether the system is working, because there is nothing to test it against. The acceptance matrix below is a practical way to do it.**

Most disappointing PPE projects fail at the definition, not the software. A vendor shows helmets detected in a demonstration yard; the factory switches it on across the shop floor; alerts arrive for people who are in the canteen corridor, in an office, or bending under a conveyor where the camera cannot see their heads. Within a fortnight the alerts are muted. The fix is to decide in advance what a violation is and where the camera is expected to judge it.

## What does the law say about PPE, and what does this article not cover?

The Government of India made the four Labour Codes, including the Occupational Safety, Health and Working Conditions Code, 2020, effective from 21 November 2025 (Press Information Bureau, Ministry of Labour & Employment, "Government Makes the Four Labour Codes effective to Simplify and Streamline Labour Laws", 21 November 2025). The same release states that during the transition, the relevant provisions of the existing labour Acts and their rules, regulations, notifications and standards continue to remain in force. A PIB backgrounder of the same date lists the Factories Act, 1948 among the 13 central Acts whose provisions the OSH Code consolidates.

What PPE an employer must provide, for which work, and how, depends on the Code, the rules made under it and your state's rules. This article does not set those out. <!-- UNRESOLVED: specific PPE provisions under the OSH Code 2020 and any central or Punjab rules notified after 21 November 2025 not verified from an official source. --> Your safety officer or adviser sets the PPE requirements; this article is about turning those requirements into something a camera can be tested against.

## The four things a violation definition needs

**1. Zone.** A marked area on the camera's image, matching a real area on the floor: the press line, the crane bay, the welding booth, the loading dock.

**2. Task or condition.** When the rule applies: during crane operation, while handling sheet metal, inside the booth while the arc is struck, at all times on the dock. Rules that apply "always" are rare and produce noise.

**3. PPE class.** One class per rule: hard hat, high-visibility vest, gloves, eye protection, face shield, safety shoes. Each class is a separate detection to test.

**4. Visibility.** Can the camera actually see that body part, in that zone, during that task? A hard hat seen from directly above is easy; safety shoes behind a workbench are not visible at all.

## The acceptance matrix

Fill in one row per rule. Leave the "acceptance figure" for your safety team to set; do not let a vendor set it for you. This matrix is the original asset of this article.

| Zone | Task or condition | PPE class | Camera, and is the item visible? | Occlusion risks | Test events | Your acceptance figure |
|---|---|---|---|---|---|---|
| Press line, stations 1–4 | Handling sheet metal | Gloves | Cam 07 overhead; hands visible from above | Hands inside die area; another worker's arm | 50 bare, 50 gloved | |
| Crane bay | Crane in operation | Hard hat | Cam 12 and 13; visible from two angles | Crane load; people under mezzanine | 50 without, 50 with | |
| Welding booth | Arc struck | Face shield | Cam 21; partly, shield may be flipped up | Booth curtain; smoke | 30 each | |
| Loading dock | Always | Hi-vis vest | Cam 03; visible by day | Night lighting; vest under a jacket | 50 each, day and night | |
| Paint shop | Spraying | Respirator | No suitable view | — | Not testable | Keep the manual check |

Add a result column when you run the test, and record pass or fail per row.

The last row matters. Some rules cannot be checked by an existing camera, and the honest answer is to keep checking them by hand.

### Occlusion checklist for each row

- [ ] Another worker standing between camera and subject
- [ ] Machine guards, fixtures, racks or the work piece itself
- [ ] Hands inside an enclosure or below a work surface
- [ ] Head coverings such as turbans, patkas, scarves or hoods, and winter jackets over a vest. Test the model on them, and make sure the written rule says how each is treated.
- [ ] Glare from windows, welding or reflective surfaces
- [ ] Night shift lighting
- [ ] Workers facing away from the camera

## How to run the acceptance test

1. **Agree the matrix** with the safety officer, the production head and, where you have one, worker representatives. The PIB backgrounder of 21 November 2025 notes that under the OSH Code, establishments with 500 or more workers will form safety committees with employer and worker representation; if you have one, it is the natural place to agree the rules.
2. **Record ground truth.** For each row, a person marks real events in set periods, without looking at the system's output.
3. **Run the detection** over the same periods.
4. **Count four numbers per row**: violations caught, violations missed, compliant workers wrongly flagged, compliant workers correctly left alone.
5. **Accept or reject per row**, not for the whole system. A system can pass on gloves at the press line and fail on vests at the dock at night.

### Illustrative example

These numbers are invented and round, to show the arithmetic only.

For the crane bay row, the reference log marks 50 hard-hat-off events and 50 hard-hat-on events.

- Detected hard-hat-off: 42. Missed: 50 − 42 = 8, so 8 ÷ 50 = 16% missed.
- Hard-hat-on wrongly flagged: 5 of 50 = 10%.
- The safety team had set its acceptance figure for this row at no more than 10% missed and 10% wrongly flagged. Misses at 16% fail; the row is not accepted.
- Reviewing the eight misses shows six were under the mezzanine. Removing that area from the zone, or adding a view of it, is the next step, and the row is retested.

Writing the acceptance figure down before the test is what makes the result mean something.

## What PGAK has shown, and what it has not

PGAK's published PPE recording covers one class: gloves. It shows bare hands flagged on an existing overhead camera on a vehicle-chassis line, recorded 1 April 2025, with confidence scores of 0.75 and 0.27 on screen. It is a demonstration, not an accuracy measurement. It plays on the [PPE detection guide](/features/guides/ppe-detection), and the [evidence page](/resources/evidence) lists its conditions. Other PPE classes can be evaluated at your site; none is claimed here.

## Limits that do not go away

- **Detection is not compliance.** A camera checks visible conditions. Whether the equipment is the right grade, fits, or is worn correctly needs inspection.
- **No automatic punishment.** Flags can be wrong. They should never drive automatic penalties, pay deductions or access denial. A supervisor reviews the clip and acts under normal procedures.
- **Supervision stays.** PPE detection supports supervisors; it does not replace them or reduce the supervision your safety obligations require.
- **Privacy.** Shop-floor footage of identifiable workers is personal data. Who can view flagged clips, and for how long they are kept, should be decided up front. See [CCTV in the workplace](/insights/cctv-workplace-privacy-india).

## What is the next step?

The [PPE detection calculator](/features/guides/ppe-detection#scenario-C14) estimates supervisor review time from your own sample sizes, minus the validation hours the system adds. It estimates review effort only and puts no value on injuries. More estimates are on the [calculators page](/calculators).

To check which rows of your matrix your existing cameras can actually see, [ask for a site-specific assessment](/free-audit).

*This article is general information, not legal advice. Confirm your own obligations under the labour codes and applicable state rules with a qualified adviser.*
