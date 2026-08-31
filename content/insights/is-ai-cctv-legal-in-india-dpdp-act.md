---
title: "Is AI CCTV legal in India? Consent and the DPDP Act"
date: "2026-08-30"
category: "Compliance"
excerpt: "CCTV in a workplace is lawful in India. Face recognition on employees is where it gets specific — and where most vendor answers are wrong in both directions. A practical read of what the DPDP Act asks of you."
readTime: 8
faqs:
  - q: "Is CCTV legal in workplaces in India?"
    a: "Yes. Indian employers routinely and lawfully operate CCTV in entries and exits, production and loading areas, parking, cash counters, stores and server rooms. The recognised limits are that cameras must not cover places where people have a reasonable expectation of privacy — washrooms and changing rooms in particular — and that covert audio recording is treated far more strictly than video. The Digital Personal Data Protection Act, 2023 does not ban workplace CCTV; it governs how the resulting personal data is handled."
  - q: "Do I need employee consent for face recognition attendance in India?"
    a: "You need, at minimum, clear notice of what is collected and why, and a defined and proportionate purpose. Whether signed consent is strictly required depends on which basis you rely on under the DPDP Act, 2023 — the Act contains a legitimate-uses provision covering employment purposes that many summaries overlook. The safe operating posture, and the one we build for, is enrolled-only and consent-based: nobody is in the face database unless they were enrolled deliberately and told why. Confirm your specific basis with your own legal counsel."
  - q: "Can AI CCTV recognise people who are not employees?"
    a: "It should not identify them. A well-configured system holds face templates only for people who were deliberately enrolled — typically staff and contractors who were told. Everyone else is handled as an unidentified person: the system can register that a person is present, or that someone unknown is in a restricted area at an odd hour, without ever attaching a name. That distinction between detecting a person and identifying a person is the centre of the whole compliance question."
  - q: "Is audio recording on CCTV legal in India?"
    a: "Audio is treated much more strictly than video, and covert recording of conversations carries risks that ordinary video surveillance does not. Most workplace deployments deliberately leave audio off. If you are considering recording sound, take specific legal advice first rather than treating it as a camera setting."
---

**Straight answer: workplace CCTV is lawful in India, and AI analysis of that video does not make it unlawful. What changes with AI is that some of it becomes personal data about identifiable people — which brings the Digital Personal Data Protection Act, 2023 into play. In practice the line that matters is the one between *detecting a person* and *identifying a person*. The first is ordinary security. The second needs notice, a defined purpose and a defensible basis.**

*This is a practitioner's summary of how the question comes up in deployments, not legal advice. Data protection obligations turn on your specific facts, and the rules under the DPDP Act have been phasing in — take your own counsel before you rely on any of it.*

We get asked this most often by factory and warehouse owners who want face-based attendance and have been told two incompatible things: by one vendor that it is completely fine, and by their HR advisor that it is illegal. Neither is right.

## What the law actually starts from

Two separate things are going on when a camera watches a workplace.

**Video of a space** is long-established practice. Indian employers operate CCTV over entries and exits, shop floors, loading bays, parking, cash counters, stores and server rooms without difficulty. The well-recognised limits are about place and about audio: cameras do not belong anywhere people reasonably expect privacy — washrooms, changing rooms, rest areas of that kind — and recording *sound* is treated far more strictly than recording pictures. Most deployments simply leave audio off, and that is the sensible default.

**Personal data about identifiable individuals** is the part the DPDP Act, 2023 speaks to. A face template that says "this is employee 4471" is personal data in a way that a wide shot of a yard is not. Once you hold it, you have obligations about why you collected it, what you do with it, how long you keep it and who else sees it.

The Act's underlying logic is not exotic. Collect for a stated purpose. Tell people. Don't collect more than the purpose needs. Don't keep it forever. Keep it secure.

## The distinction that decides most of it

Almost every compliance conversation we have resolves once this is on the table:

| | What the system does | Is anyone identified? |
|---|---|---|
| **Detection** | Registers that *a person* is in a restricted zone, crossed a boundary, is loitering, or that a camera went dark | No |
| **Counting** | Registers how many people passed a point | No |
| **Recognition** | Matches a face against a database of enrolled people and returns a name | **Yes** |

The overwhelming majority of what people want from AI CCTV sits in the first two rows. "Tell me if someone is in the yard at 2am" does not require knowing who they are — and a system that answers it without identifying anybody carries far less obligation than one that does.

This is worth knowing before you buy, because it means you can often get the outcome you actually want with a much lighter footprint. If the goal is perimeter security, you do not need a face database at all.

## Where face recognition genuinely comes in

Two use cases usually justify it: attendance, and knowing whether a person in a sensitive area is a person who belongs there.

For attendance, the honest framing is that you are replacing a biometric punch machine that already held employee biometrics — the fingerprint reader at the gate was collecting personal data too. The change is the collection method, not the fact of collection. That tends to reframe the conversation usefully with a works committee or a union.

The posture we build for, and would recommend to anyone regardless of vendor:

- **Enrolled-only.** A face template exists only for someone who was deliberately enrolled. There is no ambient identification of the general public, no scraping of everyone who walks past.
- **Told, in writing, in a language people read.** What is collected, why, who sees it, how long it is kept. A notice on the gate and a line in the joining formalities, not a clause buried in an English-language contract nobody was given a copy of.
- **Purpose-limited.** Attendance data used for attendance and payroll. Not quietly repurposed into productivity surveillance, because that is a different purpose and needs its own justification.
- **Retention that ends.** Face templates deleted when someone leaves. This is the step most often skipped and the easiest to get wrong.
- **Access controlled.** HR sees attendance. The whole office does not.

On consent specifically, there is a nuance that most generic articles miss: the DPDP Act does not treat consent as the only lawful basis. It sets out certain legitimate uses, including purposes connected to employment and to safeguarding an employer from loss or liability. Whether your particular deployment sits inside that provision or needs express consent is exactly the kind of question to put to your own counsel with your own facts — but do not accept a flat "you must have signed consent from every employee" or a flat "employers are exempt" from a vendor. Both are oversimplifications, and the person selling you cameras is not your lawyer.

## What you should ask any AI CCTV vendor

Five questions. The answers tell you a lot, quite quickly.

1. **Where is the video processed?** If frames leave your building to be analysed elsewhere, more parties touch personal data and your obligations widen. Processing on your own premises keeps the footprint small — [we go into why that also matters for reliability](/insights/does-ai-cctv-work-without-internet).
2. **What exactly is stored, and for how long?** "Video" is not an answer. Ask specifically about face templates, event records and clips, each with a retention period.
3. **Who can see it?** Ask to see the actual permission model, not a promise.
4. **Can we run detection without recognition?** If the answer is no, you are being sold more data collection than you may need.
5. **What happens when an employee leaves?** If there is no deletion process, there is no retention policy — there is just a database growing forever.

A vendor who has done this in Indian workplaces will have crisp answers. One who hasn't will tell you it is all perfectly legal and move on.

## The practical checklist

If you are deploying this quarter, this is the short version of getting your house in order:

- Write down, for each camera, what it is for. This is your purpose record and it takes an hour.
- Put up visible notice where cameras operate, in the languages your workforce actually reads.
- Keep cameras out of washrooms, changing areas and rest spaces. No exceptions, no matter what someone is stealing.
- Leave audio off unless you have taken specific advice.
- Decide retention periods before go-live, not after.
- Separate attendance access from security access.
- Have the whole thing looked at by your own legal counsel before enrolment starts, not after the first dispute.

None of this is onerous, and most of it is documentation you should have anyway. The businesses that get into trouble are rarely the ones that thought about it and got a detail wrong — they are the ones that never wrote anything down.

## The short version

AI CCTV is legal in India. Face recognition on your own workforce is legal too, on a defensible basis and with the transparency the DPDP Act is built around. What is not defensible is collecting identity data nobody was told about, for a purpose nobody defined, kept forever, visible to anyone.

If you want to talk through what your site actually needs — including whether you need face recognition at all, which for a lot of perimeter and theft problems you don't — [tell us what you're trying to prevent](/#dealer) and we'll be straight about the lightest thing that solves it.

*Again: practitioner's summary, not legal advice. Your counsel gets the final word.*
