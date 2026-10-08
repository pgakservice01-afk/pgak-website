---
title: "Use CCTV footage as evidence: preserve the original and audit trail"
metaTitle: "CCTV footage as evidence in India: export and custody"
date: "2026-09-14"
updated: "2026-10-08"
category: "Compliance"
excerpt: "Indian evidence law now spells out how electronic records such as CCTV footage are proved, including a certificate with hash values. What to do in the first hours after an incident so the footage you keep can be relied on."
metaDescription: "How CCTV footage is proved under the Bharatiya Sakshya Adhiniyam, 2023, and an export and chain-of-custody checklist with hash values for site owners."
readTime: 7
image: "/insights/covers/cctv-footage-legal-evidence-india.webp"
draft: true
reviewStatus: "Draft — legal review required. No named lawyer has reviewed this article. Awaiting PGAK engineer review. UNRESOLVED: (1) BSA text was read from the Gazette of India copy (25 Dec 2023); India Code returned errors on 8 Oct 2026, so the India Code link is to its record page; (2) the number of the MHA notification bringing the BSA into force on 1 July 2024 was not confirmed from the Gazette; (3) who qualifies as the 'expert' who signs Part B of the section 63(4) certificate, and when a certificate is needed if the original device is produced, are questions of law and court practice — not answered here; (4) Supreme Court case law on certificates (including decisions on the former section 65B) was not reviewed from official sources and is not cited."
faqs:
  - q: "Can CCTV footage be used as evidence in India?"
    a: "Yes, electronic records can be evidence. Section 61 of the Bharatiya Sakshya Adhiniyam, 2023 says an electronic record is not to be denied admissibility merely because it is electronic, subject to section 63. Whether particular footage is admitted and believed depends on how it was kept and proved, which is decided by the court in each case."
  - q: "Does CCTV footage need a certificate?"
    a: "Section 63(4) of the Bharatiya Sakshya Adhiniyam, 2023 requires a certificate to be submitted with an electronic record each time it is submitted for admission under that section. The form is in the Schedule to the Act: Part A is filled by the party and Part B by an expert, and both record the hash value of the record. Ask your lawyer how it applies to your case."
  - q: "What is a hash value and why does it matter?"
    a: "A hash is a short fingerprint calculated from a file, such as a SHA-256 value. If even one byte of the file changes, the hash changes. Recording the hash of an exported clip at the time of export lets anyone later check that the copy has not been altered. The certificate in the Schedule to the Act asks for it."
  - q: "What breaks the chain of custody for CCTV footage?"
    a: "Anything that leaves no record of who handled the footage: forwarding clips on WhatsApp, screen-recording playback on a phone, trimming or re-encoding before saving, or handing the recorder to someone without noting it. A copy nobody can account for is easy to dispute."
---

**Straight answer: CCTV footage can be evidence in India, but the law now spells out how an electronic record is proved. Under section 63 of the Bharatiya Sakshya Adhiniyam, 2023, a certificate in the form set out in the Act's Schedule is submitted with the record, signed by the person in charge of the device and by an expert, and stating the record's hash value. What a site owner controls is everything before that: an unaltered export from the recorder, a hash recorded at the time, a clock that was right, and a written log of who touched the copy. Do those on the day of the incident.**

A theft or dispute lands on your desk and the first reaction is relief: "we have it on camera". Footage existing and footage being usable are different things. The gap between them is usually a few careless minutes on the first day.

## What does the law say?

The Bharatiya Sakshya Adhiniyam, 2023 (Act 47 of 2023, Gazette of India, 25 December 2023) replaced the Indian Evidence Act, 1872 and came into force on 1 July 2024. <!-- UNRESOLVED: confirm MHA commencement notification number (dated 23 Feb 2024) from the Gazette. --> The provisions that matter for CCTV:

- **Section 61:** nothing in the Act denies admissibility of an electronic or digital record on the ground that it is electronic; subject to section 63, it has the same legal effect as other documents.
- **Section 62:** contents of electronic records may be proved under section 63.
- **Section 63(1)–(2):** a computer output — information "printed on paper, stored, recorded or copied in optical or magnetic media or semiconductor memory" — is deemed a document and admissible without producing the original, if conditions are met. They include that the device was used regularly for the activity, was operating properly (or any fault did not affect the record), and the record reproduces information fed in during ordinary use.
- **Section 63(4):** a certificate identifying the record and how it was produced, giving particulars of the device, and dealing with those conditions, "shall be submitted along with the electronic record at each instance where it is being submitted for admission". It is signed by "a person in charge of the computer or communication device or the management of the relevant activities (whichever is appropriate) and an expert".
- **The Schedule:** the certificate form. **Part A** (filled by the party) and **Part B** (filled by the expert) each list the source device — the form specifically offers "DVR" as an option — its make, model and serial number, and "the HASH value/s of the electronic/digital record/s", with the algorithm (SHA1, SHA256, MD5 or other) and a hash report attached.
- **Section 57, Explanations 4 to 7:** treat records stored in multiple files or storage spaces as primary evidence, and say a record "produced from proper custody" is primary evidence "unless it is disputed". Explanation 6 covers a video recording that is stored and simultaneously transmitted: each stored recording is primary evidence.

How a court applies these — who counts as the expert, and when the original recorder itself is produced — is for your lawyer. <!-- UNRESOLVED: expert qualification and interaction of s.57 Explanation 5 with s.63(4). --> What the Schedule makes clear is that the device details and hash values matter, and you can capture both on day one.

## The export and chain-of-custody checklist (the asset)

Print this and keep it with the recorder. It does not replace legal advice; it preserves what your lawyer will need.

**Within the first hour**

1. **Stop the overwrite.** Note the recorder's retention. If the incident is near the end of it, export first and investigate later. Do not wait for the police to ask. [What to do the day after a theft](/insights/what-to-do-day-after-a-theft).
2. **Check the clock.** Photograph the recorder screen showing its current date and time next to a phone showing network time. Write down the difference. Do not correct the clock until the export is done.
3. **Note the device.** Make, model, serial number of the DVR or NVR and the camera channel(s). These are the fields in Part A of the certificate.

**The export**

4. **Use the recorder's own export.** Export the original stream in the recorder's native format, covering a margin before and after the incident. Do not screen-record playback, trim, convert or compress the file.
5. **Write it to fresh media** (a new USB drive or disc). Label it with date, time range, channel and your initials.
6. **Calculate the hash immediately**, on the computer you copy it to:
   - Windows: `certutil -hashfile clipname.mp4 SHA256`
   - macOS: `shasum -a 256 clipname.mp4`
   Copy the long result into the log below. Print or save it as a hash report.
7. **Keep the original export untouched.** Make working copies for viewing; hash each working copy and check it matches.

**The custody log**

8. Keep one row per handling:

| Date and time | Who | Action (export / copy / view / hand over) | File name | SHA-256 | Storage location | Signature |
|---|---|---|---|---|---|---|
| | | | | | | |

9. **Hand over in person, with a receipt.** When police, an insurer or a lawyer takes a copy, write it in the log and ask for a written acknowledgement. Never send footage over WhatsApp or other chat apps; forwarding re-compresses the video and leaves no custody trail.
10. **Restrict access.** Only named people may export. If everyone shares the admin login, the log cannot say who did what. Give each person their own account, with export limited to a few roles, before the next incident.

**Afterwards**

11. **Preserve the recorder's own logs** — export or photograph the event and user logs around the incident.
12. **Tell your lawyer early** about the certificate. Have the device details, hash report and custody log ready for Parts A and B.

## A worked example (illustrative example)

A 40-minute clip of a loading bay is exported at 18:20 on the day of a missing consignment. The recorder clock runs 3 minutes 10 seconds fast against network time, photographed and noted. The export is written to a new USB drive; its SHA-256 is recorded in the log at 18:31. Two working copies are made and both hashes match. On day three a copy is handed to the police with a signed receipt and a log entry. If anyone later questions whether the clip was edited, the hash recorded at 18:31 can be recalculated from the original drive and compared.

## Where this does not help

Paperwork does not make weak footage strong. If the camera was too far away to identify anyone, or the picture was too dark, no amount of careful custody adds detail that was never recorded. That is a camera placement and resolution problem to solve before the incident — [resolution and distance](/insights/camera-resolution-vs-distance).

## Next step

Finding the right minutes quickly is what makes an early export possible. The [event summaries calculator](/features/guides/event-summaries#scenario-C03) and the [investigation time calculator](/calculators/investigation-time) estimate how long footage review takes on your site today, and how event summaries can be evaluated against that. If you want your recorders' clocks, export settings and access accounts checked before you need them, [ask for a site-specific assessment](/free-audit).

*This is general information, not legal advice. Whether footage is admitted and relied on is decided by the court in each case. Speak to a qualified lawyer about any actual incident.*

## Sources

- The Bharatiya Sakshya Adhiniyam, 2023 (Act 47 of 2023) — Gazette of India, 25 December 2023; sections 57, 61, 62, 63 and the Schedule. Record page on [India Code](https://www.indiacode.nic.in/handle/123456789/20063).
