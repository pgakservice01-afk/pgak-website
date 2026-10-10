---
title: "Hospital video analytics: prioritise queues, access and privacy"
metaTitle: "Hospital CCTV and access control: plan zone by zone"
date: "2026-10-08"
category: "Buying Guide"
excerpt: "A hospital is the hardest building to put cameras in well: open all hours, full of people with a strong claim to privacy, and with a few rooms only a handful should enter. Plan zone by zone, start with queues and restricted access, and keep cameras out of care."
metaDescription: "Plan hospital CCTV zone by zone: OPD and pharmacy queues, restricted stores, and where cameras must not go. No clinical monitoring claims."
readTime: 9
draft: true
reviewStatus: "Awaiting PGAK engineer review. Draft until a named lawyer has reviewed the legal section. Legal points cite the DPDP Act, 2023 and DPDP Rules, 2025 (G.S.R. 846(E)), read from MeitY copies on 8 Oct 2026. UNRESOLVED: (1) whether security CCTV in paediatric or neonatal areas falls within the Fourth Schedule Part A item 1 exemption for clinical establishments; (2) commencement of section 9 of the Act; (3) any hospital accreditation or state health-department rules on CCTV, not verified. No clinical monitoring, fall or aggression detection is claimed. Queue and access analytics have no PGAK evidence record. Owner to note the conflict: /hospital-security currently describes person-on-floor and aggression flagging, which this article does not support."
faqs:
  - q: "Where should a hospital not place CCTV cameras?"
    a: "Not in consultation and treatment rooms, examination areas, patient bays where people may be exposed, toilets, bathrooms or changing rooms. Security value sits in entrances, corridors, waiting and billing areas, pharmacy counters and stores, record rooms and parking. Where a corridor camera can see into a care area through an open door or window, mask that part of the view."
  - q: "Can video analytics monitor patients in a hospital?"
    a: "Not in the sense of clinical monitoring. Security video analytics is not a medical device and should not be relied on to detect falls, distress, deterioration or a patient leaving a ward. Clinical observation stays with clinical staff and approved equipment. What analytics can be evaluated for is operational: queue length at counters, and entry to restricted non-clinical areas."
  - q: "What should a hospital measure first: queues or security?"
    a: "Usually restricted access to stores and records, because the loss is concrete and the camera job is simple: who entered which door, when. Queues come next, and for OPD registration the hospital's own token or appointment system is often a better measure of waiting time than a camera. A camera adds the length of the physical queue and crowding at the counter."
---

**Straight answer: plan hospital video analytics one zone at a time, and set privacy before analytics in every zone. The best first uses are operational. Measure queue length at OPD registration, billing and the pharmacy counter. Record who enters non-clinical restricted areas such as the pharmacy store, record room and biomedical store. Keep cameras out of consultation, examination and treatment spaces, toilets and changing areas. Do not rely on security analytics for anything clinical: falls, distress, deterioration or patient movement remain the job of clinical staff and approved equipment.**

Hospitals run around the clock, admit large numbers of people nobody has met, and contain rooms only a few should enter. That makes them a reasonable place for video analytics, and a risky one. A camera in the wrong place breaches a patient's privacy. A promise the analytics cannot keep invites staff to rely on it.

## What should analytics be used for in a hospital?

Three questions, in order:

1. **Restricted access.** Who entered the pharmacy store, record room, biomedical store or server room, and when? A camera at the door, paired with access control or a key log, gives a reviewable record. Unrecognised entry can be flagged for review and evaluated at your site. That is detection of an event for a person to check, not proof of misconduct.
2. **Queues.** How long is the line at registration, billing and the pharmacy counter, and when does it build? This informs counter staffing.
3. **Entrances and parking.** Recording for incident review at entrances, emergency drop-off and the car park.

What it is not for: clinical observation, patient monitoring, fall detection, or judging aggression or distress. The hospital's clinical governance should say so in writing, so nobody assumes a camera is watching a patient.

## The zone-by-zone privacy and patient-flow planning matrix

Fill this in with your administrator, nursing head and security lead. "Evidence status" reflects PGAK's [capability register](/platform/capabilities). Anything marked "evaluate at site" has no PGAK evidence record yet.

| Zone | Flow or security question | Camera? | Analytics to consider (evidence status) | Privacy controls | Who acts |
|---|---|---|---|---|---|
| Main entrance and drop-off | Who came in after hours; vehicle obstructions | Yes | Recording; number plates at a controlled lane (photographs of a fitted gate camera only) | Signage; fixed retention | Security desk |
| OPD registration and billing | How long is the queue; when to open a counter | Yes, on the counter and queue area | Queue length (evaluate at site); token-system data first | Angle away from screens and documents; no audio | Front-office supervisor |
| OPD waiting areas | Crowding, seating, incidents | Yes, overview only | Occupancy count (evaluate at site) | No zoom on faces; no audio | Front-office supervisor |
| Consultation, examination, treatment rooms | — | **No** | None | — | — |
| Wards and patient bays | — | **No** inside; corridor only | None in care areas | Mask any view into bays through doors or glass | Nursing in-charge |
| Ward and ICU corridors, unit entrances | Who entered a restricted unit | At the unit door only | Entry recording; unrecognised-entry flag (evaluate at site) | View of the door only, not the unit interior | Unit in-charge, security |
| Neonatal and paediatric unit entrances | Who entered; safe discharge | At the door only | Entry recording | No children's face templates; strict retention | Unit in-charge |
| Pharmacy counter | Queue length, walk-aways | Yes | Queue length (evaluate at site) | Angle away from prescriptions | Pharmacy manager |
| Pharmacy store, controlled-drug store | Who entered, when | Yes, at the door and inside the store | Entry recording; unrecognised-entry flag (evaluate at site) | Access limited to named staff | Pharmacy manager |
| Medical records room | Who entered | Yes, at the door | Entry recording | Angle away from open files | Records officer |
| Biomedical and general stores | Who entered; what left | Yes | Entry recording | — | Stores officer |
| Emergency / casualty entrance | Incident review | Yes, entrance and waiting area | Recording only | Not inside resuscitation or treatment bays | Security desk |
| Toilets, bathrooms, changing rooms | — | **Never** | None | — | — |
| Mortuary | Who entered | At the door only | Entry recording | No view of the interior | Administration |
| Parking and perimeter | Vehicle incidents; after-hours presence | Yes | Perimeter events (evaluate at site) | — | Security desk |

Three rules apply in every row. **No audio** unless you have taken specific advice. **Fixed retention**, written down per zone. **Named access**, with every export logged. Our [workplace CCTV privacy article](/insights/cctv-workplace-privacy-india) covers staff areas, which need the same care as patient areas.

## Valuing shorter queues without overstating them

Hospital queues are mostly about patient experience and staff deployment. A rupee value is rarely the right measure. The one place a retail-style calculation fits is the **hospital pharmacy counter**, where a patient who walks away may buy elsewhere.

### Illustrative example: pharmacy counter, weekday peak

Round, hypothetical inputs to show the arithmetic:

- Observed over five weekday 2-hour peaks: **250** people joined the queue and **15** left without buying, or 6%.
- Walk-aways per peak: 15 ÷ 5 = **3**
- Share who did not return to buy (your assumption, to test by asking): **50%**
- Contribution margin per prescription filled, after the cost of medicines and direct costs: **₹80**

Lost contribution per peak: 3 × 50% × ₹80 = **₹120**. Over 26 working days: ₹120 × 26 = **₹3,120 per month**.

A second counter for those two hours at a loaded cost of ₹250 an hour costs 2 × ₹250 × 26 = **₹13,000 per month**.

On money alone, the second counter does not pay. That is a useful result. It means the decision is about patients waiting while unwell, which is a judgement for hospital management, not a payback figure. Do not use bill value instead of margin to make the numbers look better.

For OPD registration, start with the time between a token being issued and the patient being called. Your appointment or token system already records it, without a camera. A camera adds the physical length of the line and crowding at the counter, which tokens miss when people queue before taking one. The [queue analytics guide](/features/guides/queue-analytics) lists the tests to run.

## What the data protection law says

*General information, not legal advice.*

**The Digital Personal Data Protection Act, 2023** (Act No. 22 of 2023, Gazette of India Extraordinary, 11 August 2023) applies to digital personal data. On a plain reading, that includes digital recordings in which people can be identified. <!-- UNRESOLVED: confirm with counsel how the Act applies to CCTV recordings; no official guidance or judgment checked. --> Section 8(5) requires reasonable security safeguards. Section 8(7) requires erasure once the purpose is no longer served, unless a law requires retention. For children, meaning anyone under eighteen, section 9 requires verifiable parental consent before processing (9(1)). It also prohibits processing likely to harm a child's well-being (9(2)) and tracking or behavioural monitoring of children (9(3)).

**The Digital Personal Data Protection Rules, 2025** (G.S.R. 846(E), 13 November 2025), in Rule 12 and Part A of the Fourth Schedule, lift sections 9(1) and 9(3) for a clinical establishment only where processing is "restricted to provision of health services to the child … to the extent necessary for the protection of her health". Security recording at a paediatric or neonatal unit is not obviously the provision of health services. Treat cameras in those areas as needing specific advice, and keep them to unit doors. <!-- UNRESOLVED: whether security CCTV in paediatric/neonatal areas falls within Fourth Schedule Part A item 1. --> Rule 1(4) brings Rules 10 and 12 into force eighteen months after publication, which we read as 13 May 2027. <!-- UNRESOLVED: commencement of section 9 of the Act itself not checked. -->

Accreditation bodies and state health departments may set their own expectations on CCTV. We have not verified them for this article. <!-- UNRESOLVED: hospital accreditation and Punjab health-department rules on CCTV. -->

## Limitations, and when not to buy

- **Clinical safety is out of scope.** No security camera replaces nurse observation, call bells or approved patient-monitoring equipment.
- **Access control first.** If the pharmacy store has a key that has been copied, a lock or card reader is the control. The camera is the record.
- **Token data first** for OPD waiting time.
- **Staffing stays.** Do not reduce security or front-office staff on the strength of analytics.

## Next step

The [queue analytics calculator](/features/guides/queue-analytics#scenario-C12) and the [retail contribution calculator](/calculators/retail-contribution) both work on contribution margin and report a scenario, not a forecast. Use them for the pharmacy counter, not for clinical areas. Our [pharmacy security article](/insights/pharmacy-medical-store-security) covers scheduled-drug storage in more detail, and the [hospital security page](/hospital-security) covers the wider estate.

PGAK reuses compatible cameras a hospital already owns. Processing runs on a unit on the premises, and anything extra is itemised in the quote. Fill in the matrix, then [ask for a site-specific assessment](/free-audit).

## Sources

- [The Digital Personal Data Protection Act, 2023](https://www.meity.gov.in/static/uploads/2024/06/2bf1f0e9f04e6fb4f8fef35e82c42aa5.pdf). Act No. 22 of 2023, Gazette of India Extraordinary, 11 August 2023, as hosted by MeitY. Sections 2(f), 8 and 9. Read 8 October 2026.
- [The Digital Personal Data Protection Rules, 2025](https://www.meity.gov.in/static/uploads/2025/11/53450e6e5dc0bfa85ebd78686cadad39.pdf). G.S.R. 846(E), Gazette of India Extraordinary, 13 November 2025, as hosted by MeitY. Rules 1 and 12 and the Fourth Schedule. Read 8 October 2026.

*This article is general information, not legal advice. Confirm your hospital's obligations with a qualified adviser.*
