---
title: "Who should access footage? Design roles before deployment"
metaTitle: "CCTV access control policy: who can view and export"
date: "2026-10-08"
category: "Compliance"
excerpt: "Most CCTV systems in Indian businesses run on one shared admin password. A role matrix for viewing, export, administration and deletion, and a short test to prove each role can do only what it should."
metaDescription: "A CCTV role matrix for viewing, playback, export, admin and deletion, with an access test protocol and the official security rules it supports."
readTime: 7
draft: true
reviewStatus: "Draft — legal review required. No named lawyer has reviewed this article. Awaiting PGAK engineer review. UNRESOLVED: (1) whether DPDP Rules 2025 rule 6 (security safeguards, from May 2027) applies to a given site's CCTV depends on its legal basis and facts — counsel to confirm; (2) the role matrix is a recommended starting design, not a legal requirement; (3) whether any notification has changed DPDP commencement dates since 13 Nov 2025; (4) role and audit-log features vary by recorder and software — PGAK's own role and log features need engineer confirmation before any product statement is added."
faqs:
  - q: "Who should be able to export CCTV footage?"
    a: "Very few people — usually a security manager and one deputy, each with their own login. Export is the point where footage leaves your control, so it should be limited, logged, and separate from live viewing, which guards and supervisors may need."
  - q: "Should anyone be able to delete CCTV recordings?"
    a: "Day-to-day users should not. Recordings normally overwrite on their own schedule. The ability to delete, format disks or change retention should sit with one administrator, be logged, and ideally need a second person's agreement for anything outside routine maintenance."
  - q: "Is there a law that says who may view CCTV footage in India?"
    a: "We found no rule naming roles for CCTV viewing. From May 2027, the Digital Personal Data Protection Rules, 2025 require reasonable security safeguards including access control and logs for personal data, and the 2024 security requirements for CCTV cameras under BIS registration include role-based access control. How these apply to your site is a question for your adviser."
---

**Straight answer: decide who can view live video, who can play back, who can export, who can change settings and who can delete — before the system goes live — and give every person their own login. Most problems with footage (leaks, missing clips, disputes over who exported what) trace back to one shared admin password. The role matrix below is a starting design; test it by logging in as each role and trying to do what that role should not.**

In many Indian businesses the CCTV password is written on the recorder, known to the installer, the owner, two supervisors and a former guard. Nobody can say who exported last month's clip, or who changed retention from 30 days to 7. Roles fix that, and they cost almost nothing to set up on most recorders.

## What do official sources say about access?

There is no Indian rule we found that names CCTV roles. Three official documents are relevant:

- **Security requirements for CCTV cameras.** The annexure to MeitY's S.O. 1652(E) (Gazette of India, 9 April 2024), which added security Essential Requirements for CCTV cameras to the Compulsory Registration Order, lists "Access Control by Authentication, Role-Based Access Control (RBAC) and regularly review and update access permissions to reflect personnel changes", and "Strong Password Policies". These bind manufacturers of registered cameras, not you — but they tell you what compliant equipment is meant to support.
- **DPDP Rules, 2025, rule 6** (G.S.R. 846(E), 13 November 2025) lists minimum security safeguards for personal data, including "appropriate measures to control access to the computer resources" and "visibility on the accessing of such personal data, through appropriate logs, monitoring and review". Rule 6(1)(e) asks for those logs to be kept for a year unless another law requires otherwise. Rule 6 commences eighteen months after publication — May 2027.
- **Evidence.** Section 57 of the Bharatiya Sakshya Adhiniyam, 2023 treats an electronic record "produced from proper custody" as primary evidence "unless it is disputed". Named logins and export logs are how you show custody. [Preserving footage as evidence](/insights/cctv-footage-legal-evidence-india).

## The role matrix (the asset)

Adapt the roles to your site. "Yes" means the role needs it; "No" means it should be blocked in the system, not just discouraged.

| Permission | Owner / director | Security manager | Guard / control-room operator | Shift supervisor | HR | IT / system admin | Installer or AMC vendor |
|---|---|---|---|---|---|---|---|
| Live view | Yes | Yes | Yes (assigned cameras) | Yes (own area) | No | Only to test | Only during visits |
| Playback | Yes | Yes | Last few hours, assigned cameras | Own area | Only on a written request, with security manager | No | No |
| Export / download | No (request it) | Yes, logged | No | No | No | No | No |
| Change retention, recording or motion settings | No | No | No | No | No | Yes, logged | Only during a logged visit |
| Delete recordings / format disks | No | No | No | No | No | Yes, with second approval | No |
| Add or remove user accounts | No | No | No | No | No | Yes | No |
| Remote access from outside the site | Yes, own phone | Yes | No | No | No | Yes | Time-limited, then removed |
| Face database or enrolment (if any) | No | No | No | No | Enrol and remove only | Technical support only | No |
| Analytics rules (zones, schedules) | No | Approves changes | No | No | No | Yes | During a logged visit |

Three principles behind it:

1. **Separate seeing from taking.** Many people may need to *see* video; very few need to *take* it away.
2. **Separate operating from administering.** The person who reviews incidents should not be the person who can delete them.
3. **No permanent vendor access.** Installers and AMC vendors get an account for a visit, then it is disabled. Never share recorder passwords, stream addresses or footage with anyone over WhatsApp or a web form.

## The access test protocol

Run this at handover and then every quarter. It takes about an hour.

1. **List every account** on every recorder and in any analytics software. Note who it belongs to. Disable any you cannot attribute.
2. **Check for shared or default logins** — "admin" used by several people, or a password unchanged since installation. Replace them with named accounts.
3. **Log in as a guard account** and try to export a clip, change retention and delete a recording. All three should fail.
4. **Log in as HR** (if HR has any access) and try live view of a gate camera. It should fail unless you decided otherwise.
5. **Export a clip as the security manager**, then check the recorder's log shows the account, time and camera. If it does not, your system cannot prove who exported what — note it as a gap.
6. **Check remote access.** Which accounts can log in from outside? Remove any that do not need it.
7. **Check leavers.** Compare the account list with your staff list. Anyone who has left should already be disabled.
8. **Record the result** — date, who ran the test, what failed, what was fixed — and keep it with your CCTV documents.

## Worked example (illustrative example)

A hypothetical site has 3 recorders and 1 shared admin login used by 8 people. After applying the matrix it has 11 named accounts: 1 system admin, 2 security (manager and deputy, export enabled), 6 guards (live view and short playback on assigned cameras), 1 HR (enrolment only) and 1 vendor account disabled except during visits. Export is now possible from 2 accounts instead of 8, and delete from 1 instead of 8. The arithmetic is simple; the protection is that each export now carries a name.

## Limitations

Not every recorder supports fine-grained roles or keeps useful logs. Older DVRs may only offer "admin" and "user". If yours cannot separate export from viewing, or keeps no export log, that is a real limitation to weigh when you next replace equipment. Roles also do not stop someone filming a monitor with a phone — supervision and clear rules still matter.

## Next step

If footage sometimes needs to be shared outside the security team, masking bystanders is part of access design — the [privacy masking calculator](/features/guides/privacy-masking#scenario-C18) sizes that work, and the [calculators page](/calculators) has related tools. PGAK can review what your recorders and any analytics software support for roles and logs as part of [a site-specific assessment](/free-audit).

*This is general information, not legal advice. Your security and data-protection obligations depend on your facts. Confirm them with a qualified adviser.*

## Sources

- [S.O. 1652(E)](https://www.crsbis.in/BIS/app_srv/tdc/gl/docs/CCTV_CRO_Notification.pdf) — MeitY, Gazette of India, 9 April 2024: Essential Requirements for Security of CCTV (annexure).
- [The Digital Personal Data Protection Rules, 2025, G.S.R. 846(E)](https://egazette.gov.in/WriteReadData/2025/267650.pdf) — MeitY, 13 November 2025; rule 1 (commencement) and rule 6.
- The Bharatiya Sakshya Adhiniyam, 2023 (Act 47 of 2023), section 57 — Gazette of India, 25 December 2023.
