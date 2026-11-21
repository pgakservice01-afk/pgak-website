---
title: 'CCTV goods counting vs SKU verification: choose the right dispatch check'
metaTitle: 'CCTV goods counting vs SKU verification'
date: '2026-11-12'
updated: '2026-11-21'
category: Warehouse Security
excerpt: 'Separate goods counts from product identity and dispatch approval. Use an event-level example to see why matching totals can still hide counting errors.'
metaDescription: 'Compare CCTV goods counts, product identity and dispatch approval. See how matching totals can hide errors and what to record before a counting assessment.'
readTime: 7
image: /insights/category/warehouse-security.webp
imageCaption: "Warehouse reference image; not a PGAK installation or counting performance test."
faqs:
- q: 'Does an accurate carton count prove the correct products were dispatched?'
  a: 'No. A count addresses the defined movements or visible items. Confirming product identity and matching an order require their own evidence and process.'
- q: 'Can existing CCTV read every product label?'
  a: 'Do not assume it can. Label visibility, image detail, motion and the proposed reading method need testing on the actual view. Unreadable labels must remain unresolved.'
- q: 'Do matching camera and dispatch totals prove every movement was counted correctly?'
  a: 'No. One missed movement and one extra count can cancel. Review corresponding events where the evidence permits, keep ambiguous intervals unresolved and separate count validation from product identity and dispatch approval.'
- q: 'Can an AI Alerto assessment confirm counting suitability from a camera brand?'
  a: 'No. PGAK needs the task definition, actual view, camera and recorder details, operating conditions and proposed review process. Suitability and any integration require separate verification.'
---

A dispatch check can fail even when the total is correct. The right number of packages may contain the wrong product, belong to a different order or include an item that was moved out and brought back. Before evaluating CCTV counting, decide which of those questions the business needs to answer.

A useful brief separates quantity, identity and authorization. Each needs a defined source of evidence. Combining them under a request such as “verify dispatch with AI” can hide the most important part of the job.

## Separate four decisions

| Decision | Question to settle | Evidence to request |
| --- | --- | --- |
| Passage count | How many eligible goods crossed a defined boundary in a stated direction? | A count definition and comparison with an independent record |
| Product identity | Which product or internal stock code does the package represent? | A supported identifier-reading or identification method and unresolved-case handling |
| Order match | Do those identified goods match this dispatch instruction? | The order reference, authorized quantities and a tested record-matching process |
| Dispatch approval | Who may release the goods or resolve a discrepancy? | The responsible person's decision and a retained review record |

These are proposed requirements, not a claim that one camera or one software product provides all four. An existing recording may help investigate a movement without establishing the product identity or approving it.

## Define what one count means

Write down the unit: an individual package, a pallet, a bundle or another observable item. Avoid using “piece” if the dispatch team and supplier mean different things by it. Decide whether the number represents crossings during a period or goods visible in an area at a particular moment.

Specify the boundary and direction. Record how returns, rejected goods, repeated crossings and a partially completed movement should be handled. A package leaving and coming back must not silently become two successfully dispatched units.

For mixed goods, give each proposed unit a separate definition. A strapped bundle crossing once is one bundle movement; it does not establish how many individual items are inside. Likewise, a package passage does not establish its weight or contents. If an operation needs those answers, retain the appropriate independent product or weighing record and assess any proposed connection separately. These are distinctions to write into the brief, not a list of object classes a particular camera can recognize.

Ask which object categories the proposed counting product supports. Axis's [Object Analytics documentation](https://help.axis.com/en-us/axis-object-analytics) describes particular supported classes and scenarios. Its people and vehicle counting features do not establish carton, sack or product identification capability in another system. Treat a demonstration for one object type as evidence for that demonstrated scope only.

For entrance passages rather than goods, use the separate [people-counting guide](/insights/people-counting-footfall-cctv). A visitor-counting specification should not be reused as a dispatch specification without checking the differences.

## Give identity its own evidence

An internal stock-keeping unit, or SKU, is the code your operation uses to distinguish a stock item. Write down the authoritative product record and the exact field the proposed system must read or match. Do not infer product identity from similar-looking outer packaging.

Where GS1 identifiers are used, distinguish their purposes. GS1 explains that a [GTIN identifies a trade item](https://support.gs1.org/support/solutions/articles/43000734404-what-is-the-global-trade-item-number-gtin-). Its [SSCC identifies a logistics unit](https://support.gs1.org/support/solutions/articles/43000734330-what-is-an-sscc-and-how-is-it-allocated-and-structured-), such as a case, pallet or parcel. The operational mapping between those identifiers, the internal stock record and the dispatch order must be established; they are not interchangeable fields.

If barcode reading, text reading or another identification method is proposed, evaluate it separately from counting. Include unreadable, partly hidden and incorrectly oriented labels in the agreed test. Require an unresolved result when the identifier cannot be supported by the evidence. A confident-looking guessed code is not a useful exception record.

## Check what the installed view can support

Use the ordinary loading position and working conditions. Check whether the required item and any required label remain visible when people, other goods or handling equipment occupy the view. Review the actual recording or export, not only a still image prepared for a demonstration.

The supplier should document the camera, lens or view, stream settings, processing arrangement and configuration under evaluation. Existing CCTV compatibility is a technical review; a camera brand, high resolution or available video stream does not by itself establish the result. Use PGAK's [compatibility checklist](/platform/compatibility) to prepare the known details and mark unknowns.

Do not alter a loading process or introduce staged movements without the site's responsible team agreeing how to do so safely. The objective is to assess the real requirement, including conditions that remain untested.

## Reconcile records before relying on the number

Agree the independent reference and the observation window before comparing outputs. Keep the reference quantity, video count, identity results and order match in separate fields. Record unavailable periods separately from a genuine zero count.

When figures disagree, retain the original records and document the investigation. A corrected total should show who made the correction and why. A matching overall total alone is insufficient: one extra count and one missed count can cancel in the total while both underlying events remain wrong.

## A worked example: equal totals, two hidden errors

The following is a hypothetical review exercise, not a PGAK installation, customer result or software test. Assume an independent reviewer has confirmed five eligible outward package movements. Assume the proposed counting output has enough detail to compare individual events with that reference.

| Reference movement | Independently confirmed eligible movement | Reported counts associated with it | What the comparison reveals |
| --- | --- | --- | --- |
| A | 1 | 1 | One corresponding count |
| B | 1 | 0 | One eligible movement missed |
| C | 1 | 2 | One extra count associated with the same movement |
| D | 1 | 1 | One corresponding count |
| E | 1 | 1 | One corresponding count |
| **Total** | **5** | **5** | **The totals match, but one miss and one extra count remain** |

The total alone would hide both errors. The useful review retains the original reference and reported output, identifies B and C, and records the evidence used to classify each discrepancy. Do not write “all movements correct” simply because both totals are five. This small invented example does not establish an accuracy percentage or an acceptable error rate for a real process.

An event-level comparison is only possible when the available records support it. Ask whether the proposed configuration exposes usable event times or references and whether they can be related to the authorized recording. A product that supplies only an aggregate total may require a different evaluation method. Do not assume every recorder or counting product creates this table automatically. Use the [CCTV timestamp guide](/insights/cctv-timestamps-match-dispatch-records) to record known clock differences before matching events.

Keep three other situations outside that simple five-event example:

- **A return or repeated crossing:** preserve direction and the agreed eligibility rule. A return does not automatically cancel an authorized dispatch or prove stock was received back.
- **An obscured or disputed reference:** mark it unresolved until the responsible reviewer can support a decision. Do not force it into the reference merely to make totals agree.
- **A missing recording or reporting interval:** mark the interval unavailable. A displayed zero during that gap is not evidence that no goods moved.

Retain who reviewed a discrepancy, what was changed and which original record supports the correction. The authorized business owner decides its effect on the dispatch record; a camera total does not replace that decision.

Use the [pilot worksheet](/resources/evaluation-method) to agree scope, evidence and acceptance criteria. Add dispatch-specific fields for the order reference, direction, returns and unresolved identities. The person responsible for the business record should decide how exceptions affect dispatch; the presence of an automated number should not silently change that authority.

## Prepare a bounded assessment

Bring one priority question, a description of the goods and route, the existing camera and recorder details where known, and the record used to authorize dispatch. State whether the immediate need is a count, an identifier match or investigation support. Those distinctions help avoid buying an attractive demonstration that answers a different question.

AI Alerto by PGAK can assess the requirement and the available view. Counting suitability, product identification and any connection to business software must each be confirmed for the proposed setup. No particular accuracy, universal camera compatibility or automatic order reconciliation is established by this guide.

## Common questions

### Does an accurate carton count prove the correct products were dispatched?

No. A count addresses the defined movements or visible items. Confirming product identity and matching an order require their own evidence and process.

### Can existing CCTV read every product label?

Do not assume it can. Label visibility, image detail, motion and the proposed reading method need testing on the actual view. Unreadable labels must remain unresolved.

### Do matching camera and dispatch totals prove every movement was counted correctly?

No. One missed movement and one extra count can cancel. Review corresponding events where the evidence permits, keep ambiguous intervals unresolved and separate count validation from product identity and dispatch approval.

### Can an AI Alerto assessment confirm counting suitability from a camera brand?

No. PGAK needs the task definition, actual view, camera and recorder details, operating conditions and proposed review process. Suitability and any integration require separate verification.

[Request a site-specific assessment](/free-audit)

Installers assessing a customer project can use the separate [partner enquiry path](/partners) and describe the proposed scope without assuming a supported integration.
