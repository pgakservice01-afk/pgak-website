---
title: "AI CCTV and privacy in India: questions your deployment must answer"
metaTitle: "Is AI CCTV legal in India? DPDP questions to answer"
date: "2026-08-30"
updated: "2026-10-08"
category: "Compliance"
excerpt: "Workplace CCTV is common in India, and AI does not change that by itself. What changes is how much identifiable personal data you hold. A dated, source-by-source checklist to take to your own lawyer before go-live."
metaDescription: "AI CCTV is not banned in India, but face data brings DPDP Act duties, most from May 2027. A dated checklist of questions to settle with counsel first."
readTime: 9
image: "/insights/covers/is-ai-cctv-legal-in-india-dpdp-act.webp"
draft: true
reviewStatus: "Draft — legal review required. No named lawyer has reviewed this article. Awaiting PGAK engineer review. UNRESOLVED: (1) whether any notification after G.S.R. 843(E) and G.S.R. 846(E) (13 Nov 2025) has changed DPDP commencement dates — a January 2026 proposal to shorten the timeline was reported and a 'DPDP (Removal of Difficulties) Order, 2026' was reported as gazetted on 7 Oct 2026; neither official text was located today; (2) the official text of the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011 could not be opened on meity.gov.in today, so the article does not summarise them; (3) no primary source was found for any specific legal rule on audio recording by workplace CCTV — the article treats audio only as a question for counsel; (4) whether section 7(i) legitimate use covers face-based attendance or security identification of employees is a question for counsel, not stated as fact."
faqs:
  - q: "Is AI CCTV legal in India?"
    a: "No Indian law we found bans workplace CCTV or AI analysis of it. What AI can change is the amount of identifiable personal data you hold. The Digital Personal Data Protection Act, 2023 governs digital personal data, but most of its duties on businesses commence in May 2027 under notification G.S.R. 843(E) of 13 November 2025. Whether a particular deployment is lawful depends on its facts, so settle it with your own lawyer before go-live."
  - q: "Do I need employee consent for face recognition attendance?"
    a: "Not necessarily, and not necessarily not. The DPDP Act allows processing either with consent or for listed 'legitimate uses', and section 7(i) lists purposes of employment and safeguarding the employer from loss or liability. Whether your attendance or security use fits that clause, or needs consent, is a question to put to counsel with your facts. Do not accept a flat yes or a flat no from a camera vendor."
  - q: "Does person detection carry the same obligations as face recognition?"
    a: "Usually far fewer in practice. Detecting that a person is in a zone, or counting people, does not need a face database. Recognition matches faces against enrolled people and returns a name, which is exactly the kind of identifiable personal data the DPDP Act is about. If your goal can be met by detection alone, you collect much less."
---

**Straight answer: we found no Indian law that bans workplace CCTV or AI analysis of its video. What AI can change is how much *identifiable* personal data you hold. That brings in the Digital Personal Data Protection Act, 2023, but most of its duties on businesses do not commence until May 2027. The practical question is not "is it legal?" but "can we answer, in writing, the questions a lawyer or the Data Protection Board would ask?" The checklist below lists those questions with the official source behind each.**

We get this question most often from factory and warehouse owners who want face-based attendance and have heard two incompatible answers: from one vendor that it is completely fine, and from an HR adviser that it is illegal. Neither is a safe answer, because both skip the facts that decide it.

## Where does the law stand on 8 October 2026?

Read the dates carefully, because many summaries online describe duties as if they already apply.

- **The Act.** The Digital Personal Data Protection Act, 2023 (Act 22 of 2023) was published in the Gazette of India on 11 August 2023.
- **Commencement.** MeitY notification G.S.R. 843(E) of 13 November 2025 brought only some provisions into force on that date — mainly definitions and the provisions setting up the Data Protection Board. The duties that matter to an employer — grounds for processing (section 4), notice (section 5), consent (section 6), legitimate uses (section 7), general obligations including security and erasure (section 8), children (section 9) and the rights of individuals (sections 11 to 14) — come into force **eighteen months from publication, which is May 2027**.
- **The Rules.** The Digital Personal Data Protection Rules, 2025 (G.S.R. 846(E), 13 November 2025) follow the same pattern: the rules on notice, security safeguards, breach intimation and retention commence eighteen months after publication.
- **The older regime.** Section 44(2) of the DPDP Act will omit section 43A of the Information Technology Act, 2000, but section 44(2) is itself in the May 2027 batch. Until then, the IT Act regime and its 2011 rules on sensitive personal data may still apply to companies. <!-- UNRESOLVED: official text of the IT (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011 could not be opened on meity.gov.in on 8 Oct 2026; counsel to confirm what they require of biometric attendance today. -->

A proposal to shorten the eighteen-month timeline was reported in January 2026. We found no notification making that change as of today. <!-- UNRESOLVED: re-check egazette.gov.in for amendments to G.S.R. 843(E)/846(E) and for the reported DPDP (Removal of Difficulties) Order, 2026 before publishing. -->

So for most businesses, May 2027 is a design deadline, not a reason to wait. A system bought now will still be running then.

## Detection or identification: which are you actually buying?

This distinction settles most of the conversation:

| | What the system does | Is anyone identified? |
|---|---|---|
| **Detection** | Registers that *a person* is in a restricted zone, crossed a line, or that a camera went dark | No |
| **Counting** | Registers how many people passed a point | No |
| **Recognition** | Matches a face against enrolled people and returns a name | **Yes** |

The DPDP Act defines personal data as "any data about an individual who is identifiable by or in relation to such data" (section 2(t)). A face template linked to "employee 4471" clearly is. A wide shot of a yard may still show identifiable people, so ordinary recording is not automatically outside the Act — but a system that only detects and counts creates far less identity data than one that names people.

"Tell me if someone is in the yard at 2am" does not need to know who they are. If your goal is perimeter security, you may not need a face database at all.

## What does the Act say about consent and employers?

Section 4 allows processing for a lawful purpose either with consent or "for certain legitimate uses". Section 7(i) lists processing "for the purposes of employment or those related to safeguarding the employer from loss or liability, such as prevention of corporate espionage, maintenance of confidentiality of trade secrets, intellectual property, classified information or provision of any service or benefit sought by a Data Principal who is an employee."

Whether face-based attendance, or identifying staff in restricted areas, sits inside that clause is exactly the kind of question to put to your own counsel. Two oversimplifications to reject from anyone selling cameras: "you must have signed consent from every employee" and "employers are exempt". The Act says neither in those words.

Where consent is the basis, section 6(1) requires it to be "free, specific, informed, unconditional and unambiguous", and section 5 requires a notice describing the personal data and purpose. Where processing relies on legitimate use, other duties in section 8 — accuracy, security safeguards, erasure when the purpose is served — still apply from May 2027.

## The legal review checklist (the asset)

Fill in the "Your answer" column yourself, then take the whole table to a qualified adviser. Nothing here should go live until someone qualified has signed the last column. Sources are listed with their dates so the reviewer can check whether anything has changed since.

| # | Question your deployment must answer | Official source (date) | Your answer | Counsel sign-off |
|---|---|---|---|---|
| 1 | For each camera, what is it for? Detection, counting or recognition? | DPDP Act 2023, s.4 lawful purpose (Gazette, 11 Aug 2023) | | |
| 2 | Which ground do you rely on for each purpose: consent (s.6) or a legitimate use (s.7, e.g. 7(i))? | DPDP Act 2023, ss.4, 6, 7 | | |
| 3 | When do your duties start, and what applies until then? | G.S.R. 843(E), 13 Nov 2025; DPDP Act s.44(2) | | |
| 4 | If consent: what does the notice say, in which languages, and how does someone withdraw as easily as they consented? | DPDP Act s.5, s.6(4); DPDP Rules 2025, r.3 (G.S.R. 846(E), 13 Nov 2025) | | |
| 5 | Who is enrolled in any face database, and how was each person told? | DPDP Act s.5, s.7 | | |
| 6 | Where is video processed — on site, or does it leave the building? Who are your Data Processors, and is there a contract? | DPDP Act s.8(2); Rules r.6(1)(f) | | |
| 7 | Who can view, export and delete footage, and are those actions logged? | DPDP Rules 2025, r.6(1)(b), (c) | | |
| 8 | How long is each data type kept (footage, event clips, face templates, logs), and what deletes it? | DPDP Act s.8(7); Rules r.8 | | |
| 9 | If face data is used to decide something about a person (attendance, access), how is accuracy checked and errors corrected? | DPDP Act s.8(3), s.12 | | |
| 10 | Who answers questions and grievances, and how fast? | DPDP Act s.8(9), (10), s.13; Rules r.9, r.14 | | |
| 11 | What happens if footage or templates leak? | DPDP Act s.8(6); Rules r.7 | | |
| 12 | Are any cameras covering washrooms, changing areas or similar private spaces? (They should not.) | Bharatiya Nyaya Sanhita, 2023, s.77 (Gazette, 25 Dec 2023) | | |
| 13 | Is audio recorded? If yes, on what advice? | No specific source found — ask counsel | | |
| 14 | Are any children (under 18) likely to be recorded or enrolled? | DPDP Act s.9; Rules r.10 | | |

On row 12: section 77 of the Bharatiya Nyaya Sanhita, 2023 makes it an offence to watch or capture the image of a woman engaged in a private act where she would expect not to be observed, and its explanation includes using a lavatory. Keeping cameras out of washrooms and changing areas is not optional, whatever is being stolen.

On row 13: we did not find a primary source setting a specific rule for audio on workplace CCTV, so we do not state one. Most deployments leave audio off; if you want it on, take specific advice first.

## What should you ask any AI CCTV vendor?

1. **Where is the video processed?** If frames leave your building for analysis, more parties handle personal data. Processing on site keeps that smaller — [why that also matters for reliability](/insights/does-ai-cctv-work-without-internet).
2. **What exactly is stored, and for how long?** Ask separately about face templates, event records, clips and logs.
3. **Who can see it?** Ask to see the permission screen, not a promise.
4. **Can we run detection without recognition?** If not, you may be buying more data collection than you need.
5. **What happens when an employee leaves?** If there is no deletion process, there is no retention policy.

A vendor who has thought about this will answer quickly and in writing.

## Limitations of this article

This is a checklist of questions, not answers. It cannot tell you which legal basis fits your site, and it does not cover sector rules (banks, hospitals, schools) or state-specific requirements, which we have not reviewed. If your goal can be met without identifying anyone — and for many perimeter and theft problems it can — the simplest compliance step is not to collect face data at all.

## Next step

If you are weighing masking or blurring as part of the answer to row 7, the [privacy masking calculator](/features/guides/privacy-masking#scenario-C18) sizes the redaction workload from your own export numbers, and the [calculators page](/calculators) has the storage and investigation tools that usually come up alongside. To work through which features your site actually needs — including whether you need recognition at all — [ask for a site-specific assessment](/free-audit).

*This is general information, not legal advice. Data protection duties depend on your facts and on notifications that can change. Confirm your own obligations with a qualified adviser before you rely on any of it.*

## Sources

- [The Digital Personal Data Protection Act, 2023](https://www.meity.gov.in/static/uploads/2024/06/2bf1f0e9f04e6fb4f8fef35e82c42aa5.pdf) — Gazette of India, 11 August 2023; sections 2(t), 4, 5, 6, 7, 8, 9, 11–14 and 44(2) referred to above.
- [Notification G.S.R. 843(E)](https://egazette.gov.in/WriteReadData/2025/267647.pdf) — MeitY, 13 November 2025: commencement dates for the DPDP Act.
- [The Digital Personal Data Protection Rules, 2025, G.S.R. 846(E)](https://egazette.gov.in/WriteReadData/2025/267650.pdf) — MeitY, 13 November 2025.
- The Bharatiya Nyaya Sanhita, 2023 (Act 45 of 2023), section 77 — Gazette of India, 25 December 2023.
