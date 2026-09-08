---
title: "Aadhaar based attendance and AEBAS, explained plainly"
date: "2026-09-01"
updated: "2026-09-08"
category: "Attendance"
excerpt: "AEBAS is the government's Aadhaar-linked attendance system, and it is compulsory for some employers and unavailable to others. Here is who it actually applies to, and what private employers can use instead."
metaTitle: "Aadhaar Based Attendance and AEBAS, Explained"
metaDescription: "AEBAS is the government's Aadhaar-linked attendance system. Who is actually required to use it, why private employers cannot, and what they use instead."
readTime: 9
faqs:
  - q: "What is AEBAS?"
    a: "AEBAS stands for Aadhaar Enabled Biometric Attendance System. It is the Government of India's attendance platform, in which an employee enters their Aadhaar number or employee ID at a terminal and authenticates with a fingerprint or iris scan against the UIDAI database. It is used across central and many state government offices."
  - q: "Can a private company use Aadhaar based attendance?"
    a: "Generally no, not in the AEBAS sense. Aadhaar authentication against the UIDAI database is restricted to entities permitted under the Aadhaar Act, which does not extend to an ordinary private employer wanting to track staff attendance. Private employers use their own biometric or face recognition systems instead, holding their own enrolment data."
  - q: "Who is required to use AEBAS?"
    a: "AEBAS was rolled out for central government departments and their attached and subordinate offices, along with autonomous bodies, and several state governments have adopted it for their own departments. Whether it is mandatory for a particular office is decided by that department's own orders, not by a single national rule, so a government employee should check their department's circular rather than assume."
  - q: "Why can't a private employer authenticate an employee's Aadhaar?"
    a: "Section 57 of the Aadhaar Act once allowed private bodies to seek Aadhaar authentication under a contract. The Supreme Court struck that down in its September 2018 Aadhaar judgment. The 2019 amendment to the Act created a narrow replacement route, but it requires UIDAI to approve the entity and requires the purpose to be backed by a law of Parliament or notified by the Central Government. Marking staff attendance is neither."
  - q: "Is it legal to store an employee's Aadhaar number in an attendance system?"
    a: "Storing an Aadhaar number as a reference field is a different thing from authenticating against UIDAI, and it is not what AEBAS does. It is also not risk-free: an Aadhaar number is personal data under the Digital Personal Data Protection Act, 2023, and collecting one you do not actually need creates an obligation without giving you an attendance benefit. Most employers are better off using their own employee code."
  - q: "What can a private employer use instead of AEBAS?"
    a: "A self-contained attendance system where the employer enrols staff themselves. That is either a conventional fingerprint or card reader, or face recognition running on the entrance cameras the site already has. In both cases the biometric template belongs to the employer and is governed by the DPDP Act, with no connection to UIDAI."
---

**Straight answer: AEBAS is the government's own Aadhaar-linked attendance system, and if you are a private employer you almost certainly cannot use it. The question worth asking is not "how do we get on AEBAS" but "what gives us an attendance record we can actually defend on payroll day".**

Search "aadhaar attendance" in India and you get a confusing mix: a government portal, a pile of biometric machine listings, and vendors implying they can plug your factory into Aadhaar. Most of that is noise. Here is the plain version.

## What is AEBAS, exactly?

AEBAS — the Aadhaar Enabled Biometric Attendance System — is a Government of India platform. An employee walks up to a terminal, enters their Aadhaar number or an employee ID mapped to it, and puts a finger on the reader. The scan is matched against the UIDAI database, and the attendance record is written centrally.

It was rolled out to bring visibility to government office attendance, and dashboards for participating departments are public. If you work in a central government office, you have almost certainly used it.

The important part for everyone else: **it is a government system, for government use.** It is not a product you procure.

## Who is actually required to use AEBAS?

This is where most confusion starts, because there is no single national rule that says "all of X must use AEBAS".

The system was introduced for central government departments together with their attached and subordinate offices, and extended to autonomous bodies. A number of state governments have since adopted it for their own departments and boards. Whether it applies to any particular office comes down to that department's own orders.

Two practical consequences follow. If you are a government employee wondering whether your office is covered, the answer sits in your department's circular, not on a vendor's website. And if you are a private employer, none of it applies to you at all — which is the part vendors are least likely to volunteer.

## Why your factory cannot simply "use Aadhaar attendance"

Aadhaar authentication is not an open API. The Aadhaar Act restricts which entities may authenticate against the UIDAI database and for what purposes. An ordinary private employer wanting to know whether Sunil reached the gate at 8:40am is not one of those permitted purposes.

This matters because vendors do blur it. If a supplier tells you their machine does "Aadhaar based attendance" for your private business, the honest reading is usually one of two things:

- The machine can *store* an Aadhaar number as an employee reference field, which is just a text label and involves no authentication at all.
- They are describing a deployment for a government or government-adjacent client, which does not transfer to you.

Neither gives you anything Aadhaar-derived. You are getting a normal fingerprint reader with an Aadhaar-shaped sticker on it.

## What changed in 2018 and 2019?

Most articles on this topic stop at "private companies can't use Aadhaar" without saying why, which makes it sound like an arbitrary rule that a clever vendor might route around. The history matters, because it tells you how firmly the door is shut.

**Before 2018.** Section 57 of the Aadhaar Act, 2016 allowed the State, a body corporate or a person to use Aadhaar to establish identity, pursuant to a law or to *any contract to this effect*. That contract clause is what a wave of private Aadhaar-based services was built on.

**September 2018.** The Supreme Court, deciding the batch of petitions led by Justice K.S. Puttaswamy, struck down Section 57 to the extent that it permitted private entities to seek Aadhaar authentication on the strength of a contract. The reasoning was proportionality: a private commercial purpose did not justify access to a national identity database.

**2019.** The Aadhaar and Other Laws (Amendment) Act rebuilt a narrower route. An entity may now perform authentication only if UIDAI is satisfied that it meets prescribed privacy and security standards, *and* the purpose is either backed by a law made by Parliament or notified by the Central Government in the interest of the State.

Read that last condition against your own situation. An employer marking staff attendance has no parliamentary law requiring Aadhaar authentication, and staff attendance has not been notified as a State-interest purpose. That is the whole answer: the route exists, and you are not on it.

It is also worth knowing that unauthorised authentication is an offence under the Act, not merely a compliance irregularity. A vendor offering to "arrange" Aadhaar attendance for a private site is offering you their risk as well as their product.

This is a summary written for buyers, not legal advice, and the position can change with new notifications. If a specific deployment turns on it, have your own counsel confirm the current rules.

## What about just storing the Aadhaar number?

Some systems sidestep authentication and simply keep the Aadhaar number in the employee record. This is legal in the narrow sense that you are not touching UIDAI, but it is rarely a good idea.

An Aadhaar number is personal data under the Digital Personal Data Protection Act, 2023. Holding one creates notice, security and retention duties. In exchange, it does nothing for attendance: the number is a label, and the matching is still being done by an ordinary fingerprint or face system. You have taken on an obligation and received no capability.

Your own employee code does the same job with none of the exposure. If you already hold Aadhaar numbers because HR collected them at onboarding, that is a separate question about your existing records, and worth reviewing on its own terms.

## What you actually need instead

Strip away the Aadhaar framing and the real requirement is simple. You need an attendance record that is:

- **Hard to fake.** The register can be fudged and fingerprints get shared more often than vendors admit.
- **Complete.** It has to capture the side gate, not just the main door.
- **Fast at shift change.** Two hundred people arriving in ten minutes cannot queue at one reader.
- **Defensible.** When someone disputes a half-day on payroll day, you need something better than a spreadsheet cell.

None of that requires Aadhaar. It requires that you enrol your own people and hold your own record.

## The two honest options

**A conventional biometric or card reader.** Cheap, familiar, and fine for an office floor of thirty. It struggles where the workforce is large and the hands are working hands — [worn fingerprint ridges genuinely do fail to read](/insights/fingerprint-attendance-system-why-it-fails), and one reader is one chokepoint.

**Face recognition on the cameras you already own.** No terminal, no touching, no queue. People are recognised as they walk in, and every camera at every entrance can mark attendance rather than just the one door a machine was bolted to. Each record stores the frame it came from, which is what makes a disputed mark resolvable.

The second option is what we build, so treat that as a disclosed interest rather than a neutral verdict. The reason it suits Indian sites is unglamorous: it does not add a queue, and it works on hands that fingerprint readers reject. It is also not universally better — if your entrance is a dark corridor or your headcount is twenty, a reader on the wall is the cheaper and simpler answer, and we will tell you so.

If you are weighing the two, the [side-by-side comparison](/insights/face-recognition-attendance-vs-biometric-machine) goes through the trade-offs properly.

## The compliance bit nobody should skip

Whichever route you take, a face or fingerprint is personal data under the Digital Personal Data Protection Act. That means telling employees what is being collected, why, and how long you keep it — and keeping retention to what payroll genuinely needs.

This is not onerous, but it is not optional either, and it is far easier to write the notice at rollout than to retrofit it after someone objects. The [DPDP walkthrough](/insights/is-ai-cctv-legal-in-india-dpdp-act) covers what a workable notice contains, and [what the law expects you to keep](/insights/attendance-records-law-india) covers retention on the payroll side.

## Where this leaves you

If you are a government department, AEBAS is your answer and it is already provided.

If you are a private employer, forget Aadhaar. Ask instead which system gives you a complete, quick, photo-backed record on the gates you actually have — and whether you need to buy hardware to get it.

[Ask for a free feasibility check](#dealer)

## Sources

- [Aadhaar Enabled Biometric Attendance System](https://attendance.gov.in/) — the official AEBAS portal for government departments.
- [Unique Identification Authority of India](https://uidai.gov.in/) — the authority governing permitted uses of Aadhaar authentication.
- [The Aadhaar Act, 2016, as amended](https://uidai.gov.in/images/Aadhaar_Act_2016_as_amended.pdf) — the consolidated text, including the Section 4 authentication conditions introduced in 2019, hosted by UIDAI.
- [The Digital Personal Data Protection Act, 2023](https://www.meity.gov.in/static/uploads/2024/06/2bf1f0e9f04e6fb4f8fef35e82c42aa5.pdf) — the Gazette text behind the notice and retention duties described above, hosted by MeitY.
