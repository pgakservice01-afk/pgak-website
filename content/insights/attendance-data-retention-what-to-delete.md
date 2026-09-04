---
title: "Attendance data: what to keep, what to delete, when"
date: "2026-09-03"
category: "Compliance"
excerpt: "Attendance retention isn't one number. The statutory register has a legal minimum keep period; the biometric template behind it doesn't, and should usually be deleted on exit. A practical schedule."
metaDescription: "Attendance retention isn't one number. Keep the statutory register; delete the biometric template on exit. A practical schedule."
readTime: 5
faqs:
  - q: "How long should attendance data be retained in India?"
    a: "There isn't a single answer — it depends on which record you mean. The statutory attendance register required under labour law typically has a minimum retention period set by state rules, often several years. The biometric template used to capture that attendance is a different kind of data and should usually be deleted much sooner, typically on the employee's exit."
  - q: "Should biometric templates be deleted when an employee leaves?"
    a: "Yes, in most cases. Once someone leaves, there's no ongoing purpose for their fingerprint or face template, and the DPDP Act requires personal data to be deleted once its purpose is served unless another law specifically requires keeping it. The attendance summary derived from it can be retained separately without keeping the biometric itself."
  - q: "What's the difference between the attendance register and the biometric template?"
    a: "The register is the output — dates, times, present/absent status — used for payroll and statutory compliance, and labour law often requires keeping it for years. The template is the input — a mathematical representation of a fingerprint or face used to identify the person — and has no independent legal retention requirement once matching is no longer needed."
  - q: "Do CCTV attendance photos need to be deleted too?"
    a: "The enrolment photo or template used for matching should follow the same exit-triggered deletion as any other biometric. Raw security footage from cameras is usually governed by a separate, shorter retention window tied to storage capacity and security policy, not attendance rules."
---

**Straight answer: attendance retention is two different clocks, not one. The statutory attendance register — dates, times, present or absent — usually has to be kept for years under labour law. The biometric template that produced it has no such requirement and should generally be deleted once the person leaves, or once their purpose is served.**

Most retention confusion comes from treating "attendance data" as one blob. It isn't. Untangling it into what it actually contains is most of the work.

## What actually has a legal minimum retention period?

The **attendance register** — the record of who was present, absent, late or on leave, by date — is the document labour inspectors and auditors ask for. Retention periods for statutory registers are set at the state level under the relevant Shops and Establishments or Factories rules, and they vary — some states specify a few years, others longer. This is general guidance, not legal advice; check your state's specific rule, or ask a compliance advisor, before setting a retention policy.

The safe pattern: keep the register (or an exported, non-biometric summary of it) for the longest retention period any applicable rule requires, and treat that as your floor, not your default for everything else.

## What doesn't have that same requirement?

The **biometric template** — the fingerprint minutiae or the face vector generated at enrolment — is not the statutory record. It's the mechanism that produced the record. Under the DPDP Act, personal data should be deleted once the purpose it was collected for is complete, unless a specific law says otherwise for that data. No labour law we're aware of requires retaining biometric templates themselves for years after someone leaves — the requirement is on the attendance outcome, not the credential.

Keeping templates indefinitely "just in case" is the opposite of best practice here: it's the highest-risk data (fingerprints and faces can't be reset like a password) sitting around with the weakest justification.

## What should a practical retention schedule look like?

A structure that separates the two clocks cleanly:

- **On exit:** delete the biometric template within a short, defined window (a week or two for processing, not indefinitely).
- **Attendance summary (in/out times, status):** retain for the state-mandated minimum for statutory registers, exported in a form that doesn't require the original biometric to read.
- **Raw enrolment photos**, if separate from the matching template: same exit-triggered deletion as the template.
- **Security camera footage** not tied to attendance matching: keep on its own, usually much shorter, cycle driven by storage capacity, not by attendance rules.

Write this down as a policy with named responsible people and an actual deletion mechanism — not just an intention. A retention policy nobody executes is worse than none, because it creates paper evidence of a rule you didn't follow.

## Why does this matter beyond compliance?

Two very practical reasons. First, storing biometric templates you no longer need is pure downside — it's the exact data a breach would be worst on, held past the point it does anything for you. Second, when a former employee (or a regulator) asks what happened to their data, "we delete templates within two weeks of exit, keep the attendance summary for the statutory period, here's the policy" is a complete, defensible answer. "We're not sure, we've never deleted anything" is not.

We build attendance systems that separate these two data types, so this recommendation isn't disinterested — we think a system that can't tell you which of your data is a register entry and which is a live biometric template is a system that will eventually get someone into trouble. The honest limitation: retention automation only works if enrolment and exit are tracked accurately in the first place. A system with clean deletion rules still fails if HR doesn't mark exits promptly.

[Ask for a free feasibility check](#dealer)
