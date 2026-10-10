# Sales handoff: qualification, ownership and follow-up drafts (10 Oct 2026)

**Status: draft for the owner.** Nothing here is published, automated or sent. No message goes to any customer without the owner's authorisation for that message.

## 1. Lead stages (tracked separately)

| Stage | Who records it | Where | Proof it happened |
|---|---|---|---|
| Accepted | System | `/api/leads` response; GA4 `lead_accepted` | Reference id |
| Stored | System | Durable intake, when configured | Row exists |
| ERP-delivered | System | ERP | ERP record id |
| Notified | System | Alert channel | Message received by the named owner |
| **Assigned** | Sales | ERP owner field | Named person |
| **Contacted** | Sales | ERP activity | First human attempt, with time |
| **Qualified / rejected** | Sales | ERP | Rule below plus rejection reason |
| Proposal | Sales | ERP | Scope sent |
| Won / lost | Sales | ERP | Reason lost |

**These do not count as leads received by sales:** button clicks, WhatsApp opens, calculator results, scope-builder prints and compatibility checks. They are intent signals.

## 2. Ownership and response target

| Item | Proposal | Needs |
|---|---|---|
| Named owner for genuine enquiries | **[Owner to name]** | The owner |
| Backup owner (leave, travel) | **[Owner to name]** | The owner |
| Internal response target | First human attempt within **one business hour** when staffed (Mon–Sat, 10:00–19:00 IST: confirm the hours) | The owner must confirm it is feasible |
| Escalation | No first attempt within 4 business hours → the backup owner is alerted. No contact within 1 business day → the owner reviews it. | The owner |
| Public promise | **None** until the owner confirms the internal target is met for 4 consecutive weeks. The site promises no response time and no 24/7 human support. | — |

## 3. Qualification rules

**Qualified** needs all four:
1. **Reachable real buyer:** the phone or email answers, and the person is the decision-maker or works for one.
2. **Relevant site or task:** a task PGAK supports (see `lib/feature-truth.ts` status), at a site with cameras or a plan for them.
3. **Supported service location:** inside the area PGAK can actually service; the owner confirms the list.
4. **Plausible project need:** a real problem with an owner on the buyer's side.

**Ask, but do not use as a barrier to first contact:** timing, number of cameras or sites, budget range.

**Rejection reasons (pick one):**
- unreachable
- job seeker
- vendor or reseller pitch
- student or research
- outside the service area
- unsupported task
- price-only, no site
- duplicate
- test or spam

Recording the reason separates low-quality traffic from a broken form.

## 4. Follow-up templates (drafts only)

Placeholders are in `{braces}`. Each template is sent by a person after reading the enquiry. None is automated.

**T1. Acknowledge the use case and send the relevant demo** (first contact)

> Hello {name}, this is {owner} from PGAK Innovations, Ludhiana. Thank you for asking about {use case} at your {site type}.
> The nearest thing we have recorded working is {demo title}: {demo link}. That page says when and where it was recorded and what it does not prove.
> Could I ask two quick questions about your cameras so we can tell you honestly whether this would work at your site?

**T2. Clarify the cameras and site** (if the enquiry lacks detail)

> To check fit without a visit, it helps to have:
> (1) a photo of the recorder's label: make and model, not its login screen;
> (2) roughly how many cameras there are, and which ones cover {area};
> (3) one still image from the camera that matters most.
> Please do not send passwords, IP addresses or stream links. We check those on site. You can also run the self-check first: https://www.pgak.co.in/platform/compatibility#check

**T3. Propose the assessment**

> Based on what you've shared, the next step is an assessment of your site. We confirm which cameras can be used for {use case}, list what would need fixing first, and give you a written scope.
> {Owner to confirm: what the assessment includes, whether it is charged, and how long it takes.}
> Would {day} or {day} suit?

**T4. Summarise the scope and next decision** (after the assessment)

> Summary of what we found at {site}:
> - Cameras usable as they are: {n}. Needing work: {n} ({what}).
> - Proposed scope: {tasks}. One-time: {hardware, installation}. Recurring, if any: {licence, support}. Quoted separately: {items}.
> - What is still unknown until a pilot: {e.g. night performance at gate 2}.
> - Suggested pilot acceptance criteria: {link to the scorecard}.
> The decision for you is {go to pilot / fix X first / not suitable}. When could we discuss it?

## 5. Weekly review (owner, 15 minutes)

| Count this week | Source |
|---|---|
| Accepted / ERP-delivered | `/api/leads` health + ERP |
| Assigned within target / contacted | ERP activity |
| Qualified / rejected (by reason) | ERP |
| Proposals / won / lost (by reason) | ERP |
| Median time to first human attempt | ERP timestamps |

**No cross-system funnel without a join key.** The lead `ref` is the key between the site, GA4 (`lead_accepted`) and the ERP. It holds no personal data.
