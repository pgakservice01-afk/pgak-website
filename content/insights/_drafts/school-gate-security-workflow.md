---
title: "School gate security: design a supervised visitor workflow"
metaTitle: "School gate security system: a supervised visitor workflow"
date: "2026-10-08"
category: "Compliance"
excerpt: "A school gate is secured by a workflow that a guard runs: who may enter, who may collect which child, and what happens when someone is not on the list. Cameras record that workflow. They should not be used to identify children."
metaDescription: "Design a school gate workflow for visitors and authorised pickup, with cameras that record rather than identify children. Requirements table."
readTime: 9
draft: true
reviewStatus: "Awaiting PGAK engineer review. Draft until a named lawyer has reviewed it. Legal points cite the DPDP Act, 2023 (Gazette, 11 Aug 2023) and DPDP Rules, 2025 (G.S.R. 846(E), 13 Nov 2025), read from MeitY copies on 8 Oct 2026. UNRESOLVED: (1) whether section 9 of the Act is in force today; commencement notification not checked. (2) Whether school gate CCTV, and any face templates of children, fall inside the Fourth Schedule Part A item 3 safety exemption. (3) Board (CBSE, PSEB, CISCE) and Punjab state requirements on school CCTV and retention; not verified. (4) Owner to note the conflict: /school-security currently promotes student face recognition, which this article advises against."
faqs:
  - q: "What should a school gate security system include?"
    a: "A written workflow before any technology: a single supervised entry point during school hours, a visitor process with purpose, identity check, badge and sign-out, a register of adults authorised to collect each child, and a rule for what the guard does when someone is not on that register. Cameras then record the gate so the workflow can be checked later."
  - q: "Should a school use face recognition on students?"
    a: "We advise against it. The task at the gate is to verify the adult collecting a child, not to identify the child. Face templates of children add sensitive data the job does not need, and the Digital Personal Data Protection Act, 2023 sets specific restrictions on processing children's personal data. Recording the gate on CCTV, with a fixed retention period and restricted access, meets the security need with far less data."
  - q: "Does a school need parents' consent for gate CCTV under the DPDP Act?"
    a: "Section 9(1) of the DPDP Act, 2023 requires verifiable parental consent before processing a child's personal data, but the DPDP Rules, 2025 exempt educational institutions from that requirement where processing is restricted to tracking and behavioural monitoring in the interests of the safety of enrolled children, among other conditions. Whether a particular gate setup falls within that exemption, and from when, should be confirmed with a qualified adviser. This is general information, not legal advice."
---

**Straight answer: a school gate is secured by a workflow, not a camera. The workflow needs one supervised entry point in school hours and a visitor routine: purpose, identity check, badge, escort, sign-out. It needs a register of adults authorised to collect each child, and a fixed rule for when someone is not on it. Cameras record that workflow so it can be reviewed. They do not need to identify children, and we advise against face recognition of students. The job at the gate is to verify the adult, and the law sets particular limits on children's data.**

*General information, not legal advice. Points below cite the Act and Rules as published. Confirm your school's obligations with a qualified adviser.*

Ask a principal what worries them about the gate, and the answer is usually dismissal. Two hundred adults arrive at once, the guard knows most of them by sight, and one unfamiliar face is easy to miss. Technology can help at the edges. The core is a short list of rules everyone at the gate follows, every day.

## What is the gate actually for?

Four moments matter, each with a different risk:

| Time | Who is at the gate | Main risk | What the workflow must do |
|---|---|---|---|
| Drop-off | Parents, buses, staff | Crowding, unchecked entry | Keep adults outside the child-only zone |
| School hours | Visitors, vendors, staff | An adult inside without purpose | Visitor routine, escort, sign-out |
| Dismissal / pickup | Parents, drivers, relatives | A child released to the wrong adult | Authorised-pickup check |
| After hours | Nobody, or security only | Intrusion, theft | Locked gate, patrols, recording |

Design the workflow for dismissal first. It is the hardest and the one with the highest stakes.

## Visitor identity, authorised pickup and child-data minimisation: the requirements

Use this as a checklist when writing your gate policy and when evaluating any vendor. Each line says what is needed and the least data that does the job.

### A. Visitor identity (school hours)

| Requirement | Minimum data | Do not collect |
|---|---|---|
| Purpose of visit and person visited, confirmed by phone with that person | Name, purpose, host, time in/out | — |
| Identity seen by the guard | ID type and the last four characters | A photocopy or photo of the ID card |
| Visible badge, returned at exit | Badge number against the entry line | — |
| Escort beyond the reception area | Escort's name | — |
| Sign-out with time | Time out | — |
| Register kept for a fixed period, then destroyed | Retention period written in policy | Indefinite storage |

### B. Authorised pickup (dismissal)

| Requirement | Minimum data | Notes |
|---|---|---|
| Register of authorised adults per child, supplied by the parent in writing | Adult's name, relation, phone, a photo the parent provides | Adult data, given by the parent for this purpose |
| Pickup card or code issued to each authorised adult | Card number linked to the child's name and class | Lost cards cancelled the same day |
| Unknown or unlisted adult: child is not released until a registered parent is reached by phone | Call time, number called, outcome | The guard decides; no software overrides this |
| Changes (new driver, relative) only in writing from a registered parent | Dated note | No changes accepted by phone call to the guard alone |
| Exceptions logged and reviewed weekly | Date, child, adult, who approved | Shows where the process is under strain |

### C. Child-data minimisation

| Data item | Needed? | Minimise how | Who sees it |
|---|---|---|---|
| Child's name and class on the pickup register | Yes | Only what the guard needs to match card to child | Gate staff, front office |
| CCTV recording of the gate area | Yes, for review | Fixed retention; no audio unless advised; no cameras in toilets or changing areas | Named staff only; logged exports |
| Child's photo on the pickup register | Usually no | The guard matches the *adult*; class teachers already know the children | — |
| Child's face template (face recognition) | **No** | Not recommended at the gate or anywhere else for this purpose | — |
| Child's arrival and departure times | Only if the school has a defined use | Use the class register, not a camera system | Class teacher |
| Vehicle numbers of buses and parent cars | Optional | Only if a vehicle rule exists to enforce | Transport in-charge |

## Why not face recognition on students?

The gate's question at dismissal is: *is this adult allowed to take this child?* The answer depends on the adult's identity and on the parent's written authorisation. It does not depend on recognising the child. Teachers and guards already know the children.

Adding face templates of children creates a sensitive dataset the gate does not need. That dataset must be secured, kept accurate as faces change with age, and deleted on time. It also brings the school closer to the restrictions the law places on children's data, set out below. Recording the gate on CCTV, with a fixed retention period and restricted access, gives you the evidence to check an incident with much less data.

Cameras can still help with the adult side. A view at face height on the visitor desk records who signed in. A view of the pickup point records the handover, so a disputed release can be checked. Tailgating at a staff or side entrance, where one person badges in and two walk through, can be flagged for review and evaluated at your site. The [tailgating guide](/features/guides/tailgating) explains that detection only flags an event. Stopping someone takes a person and the right door hardware.

## What the law says about children's data

**The Digital Personal Data Protection Act, 2023** (Act No. 22 of 2023, published in the Gazette of India Extraordinary on 11 August 2023):

- Section 2(f) defines a "child" as someone who has not completed eighteen years of age.
- Section 9(1) requires a data fiduciary to obtain the verifiable consent of a parent or lawful guardian before processing any personal data of a child.
- Section 9(2) prohibits processing that is likely to cause any detrimental effect on a child's well-being.
- Section 9(3) prohibits tracking or behavioural monitoring of children, and targeted advertising directed at them.
- Section 8(5) requires reasonable security safeguards. Section 8(7) requires personal data to be erased once the specified purpose is no longer being served, unless a law requires it to be kept.

**The Digital Personal Data Protection Rules, 2025** (G.S.R. 846(E), notified by the Ministry of Electronics and Information Technology on 13 November 2025):

- Rule 12, with Part A of the Fourth Schedule, lifts sections 9(1) and 9(3) for an **educational institution**, where processing is restricted to tracking and behavioural monitoring "for the educational activities of such institution" or "in the interests of safety of children enrolled". Similar exemptions apply to crèches, and to transport operators engaged by schools for tracking a child's location during travel.
- Rule 1(4) brings Rules 3, 5 to 16, 22 and 23, which include Rules 10 and 12, into force eighteen months after publication. We read that as 13 May 2027. <!-- UNRESOLVED: confirm the commencement date of section 9 of the Act itself; the commencement notification for Act sections was not checked. -->

Three practical readings follow, each to be confirmed with your adviser:

1. The exemption lifts **consent and the tracking prohibition only**. It does not lift section 9(2) on detrimental effect, or the security and erasure duties in section 8.
2. It applies to processing **restricted to** educational activities or children's safety. A gate recording kept for safety review sits more comfortably inside it than a face database reused for attendance, marketing or anything else. <!-- UNRESOLVED: whether gate CCTV and any face templates of children fall within Fourth Schedule Part A item 3. -->
3. It covers enrolled children. Visitors, parents and staff are adults whose data falls under the Act's general rules.

Separately, your affiliating board or the state may set its own rules on cameras in schools, including where they go and how long footage is kept. Check the current text of your board's affiliation bye-laws and circulars. We have not verified them for this article. <!-- UNRESOLVED: CBSE / PSEB / CISCE and Punjab requirements on school CCTV and retention. -->

For signage and general workplace principles, see our articles on [CCTV signage](/insights/cctv-signage-requirements-india) and [AI CCTV and the DPDP Act](/insights/is-ai-cctv-legal-in-india-dpdp-act).

## Limitations, and when to spend nothing

- **Most gate failures are staffing and process failures.** A second staff member at dismissal and a written pickup rule may do more than any system. Do not reduce gate staff on the strength of cameras.
- **Small schools** where every parent is known by name may need only the register and a recorded gate camera.
- **Analytics need someone to act.** An alert about an unknown adult at the gate is only useful if a named person goes to check, every time.

## Next step

Write the workflow first, using the tables above. If you are weighing review time at a staff entrance, the [tailgating calculator](/features/guides/tailgating#scenario-C13) works in hours. *Illustrative example:* 120 flagged entries a month × (4 minutes to review today − 1.5 minutes with a flagged clip) ÷ 60 = 5 hours, minus 1 hour of exception handling, gives **4 hours a month**. Other tools are on the [calculators page](/calculators). Our [school security page](/school-security) covers campus coverage more broadly.

PGAK reuses compatible cameras a school already owns. Processing runs on a unit on the school premises, and anything extra is itemised in the quote. [Ask for a site-specific assessment](/free-audit) once your gate policy is written, so the cameras are set up to support it.

## Sources

- [The Digital Personal Data Protection Act, 2023](https://www.meity.gov.in/static/uploads/2024/06/2bf1f0e9f04e6fb4f8fef35e82c42aa5.pdf). Act No. 22 of 2023, Gazette of India Extraordinary, 11 August 2023, as hosted by MeitY. Sections 2(f), 8 and 9. Read 8 October 2026.
- [The Digital Personal Data Protection Rules, 2025](https://www.meity.gov.in/static/uploads/2025/11/53450e6e5dc0bfa85ebd78686cadad39.pdf). G.S.R. 846(E), Gazette of India Extraordinary, 13 November 2025, as hosted by MeitY. Rules 1, 10 and 12 and the Fourth Schedule. Read 8 October 2026.

*This article is general information, not legal advice. Confirm your school's obligations with a qualified adviser.*
