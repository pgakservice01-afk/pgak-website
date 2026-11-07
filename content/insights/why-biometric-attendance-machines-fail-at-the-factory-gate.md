---
title: 'Factory-gate attendance failures: diagnose before replacing'
date: '2026-07-22'
updated: '2026-11-07'
category: Attendance
excerpt: Find whether factory-gate attendance problems come from capture, arrival flow, employee mapping or record review before choosing a replacement.
metaTitle: 'Factory-Gate Attendance Failures: What to Check'
metaDescription: Diagnose factory-gate attendance failures with a shift log, reader checks and reviewed records before choosing a replacement or camera attendance.
readTime: 5
image: /insights/attendance.webp
imageCaption: Illustration of an attendance checkpoint, not a PGAK installation or a performance test.
faqs:
- q: Does a queue prove that the fingerprint reader must be replaced?
  a: No. Measure the arrival pattern, successful first attempts, retries and time spent resolving exceptions. Reader placement, enrolment, the number of entry points and the review process may require different changes.
- q: Will an existing CCTV camera solve missed attendance automatically?
  a: No. Confirm the camera and stream, representative face capture, employee enrolment, record mapping and the supported fallback. Any required interaction, additional equipment and export must be established for the proposed setup.
- q: Does a recorded gate entry prove a full shift was worked?
  a: No. A gate observation is one input to attendance review. Approved shift rules, exits, leave and corrections must be reconciled by the responsible attendance or payroll owner.
---

A queue at the factory gate and a missing attendance record can have different causes. Before replacing a fingerprint reader, establish where the process fails: the arrival route, the capture attempt, the employee match or the record that reaches the attendance owner.

The useful starting point is a short, authorized observation of a representative shift change. Keep the current approved attendance process available while investigating. Record what happened and the correction needed; a sales demonstration at a quiet gate will not explain a busy morning by itself.

## Separate four problems in the gate log

Use a log that follows an arrival through to its reviewed record. The categories below are a diagnostic worksheet, not measurements from a PGAK customer.

| What you observe | What to check next | Evidence to keep |
| --- | --- | --- |
| A line forms, but most first attempts succeed | Arrival concentration, available entry points and time spent at each step | Arrival count by interval, waiting time and any required interaction |
| The same people repeatedly retry | Enrolment, finger placement, device condition and the manufacturer's instructions | Attempt count, approved employee reference and technician's finding |
| Capture appears successful, but no usable record arrives | Device time, transfer status, employee mapping and the receiving system | Event reference, expected destination, observed receipt time and error |
| A record arrives but the shift or payable treatment is disputed | Roster, shift rules, missing exits, leave and correction approval | Original event, proposed correction, reviewer and final disposition |

Do not combine these into a single “machine failed” count. An additional reader may address capacity, while an employee-ID mismatch needs a different repair. Changing the capture method without tracing the record can leave the original problem unresolved.

## Check the existing reader before writing it off

Ask the maintainer to inspect the selected model against its manual. Review mounting, permitted operating conditions, cleaning, enrolment and the approved alternative when a person cannot use the normal method. Avoid a universal claim that factory work makes fingerprint readers unsuitable.

For example, Suprema's FaceStation F2 guidance identifies finger placement, initial enrolment and finger condition as factors to check when authentication is difficult. Those are instructions for that product, not evidence about every reader or a reason to apply an unapproved cleaning method to another model. [Read the manufacturer's guidance](https://docs.supremainc.com/en/device/facestation_f2/getting-started).

After a repair or enrolment correction, repeat the observation under comparable conditions. Note whether retries changed, whether the record reached its destination and whether another step still caused delay. Keep unresolved cases visible instead of recording the ticket as complete merely because the device powers on.

## Evaluate camera attendance against the actual route

A CCTV view that is useful for security recording may not be suitable for identifying enrolled employees. Record the camera and recorder models, authorized stream support, view, lighting and the intended approach. The [compatibility guide](/platform/compatibility) explains why a brand name or readable stream alone does not settle suitability.

Test the real arrival pattern, including crowding, turning faces and required protective equipment. Record any pause, interaction or additional capture point needed. NIST's face-image quality work examines factors such as pose, illumination and resolution; it does not certify a proposed PGAK installation. [See the NIST quality evaluation](https://pages.nist.gov/frvt/html/frvt_quality.html).

Masks and other face coverings need their own test conditions. NIST's masked-face research recommends measuring the selected algorithm on operational images with actual masks. Its published research results should not be transferred into a percentage claim for your factory. [Read NIST's masked-face study explanation](https://www.nist.gov/news-events/news/2020/12/face-recognition-software-shows-improvement-recognizing-masked-faces).

Keep required PPE in place and agree a suitable location or alternative process where capture is unsuitable. A camera does not establish liveness protection, a complete visitor headcount or uninterrupted employee presence simply because a face appears in the picture.

## Follow each trial event to a reviewed record

Use an authorized reference log to distinguish a missed capture, wrong identity, duplicate record and wrong shift assignment. Include successful events in the denominator as well as failures. If a condition was not tested, mark it untested rather than assigning it a success rate.

Ask the attendance owner to follow representative examples into the receiving record. Include a missed exit and an overnight shift if those occur at the site. Confirm who can correct a record, what evidence they need and how the original event remains traceable. A gate entry alone does not prove that someone worked a complete shift or determine payable hours.

Request the actual proposed export and reconcile it with the required employee identifiers and review rules. Automatic payroll integration, a specific snapshot format or a guaranteed fallback must be confirmed in the written scope and demonstrated where applicable. The [payroll handoff guide](/insights/biometric-attendance-payroll-integration) covers that separate decision.

## Decide what to repair, retain or trial

Write a decision for each observed problem: repair the existing arrangement, change the arrival process, trial another capture method, or retain an approved alternative for unresolved cases. Assign the evidence review to a known site owner and agree acceptance conditions before the trial. The [pilot worksheet](/resources/evaluation-method) provides a way to record conditions and limitations.

For AI Alerto by PGAK, camera attendance is a site assessment: suitable views, authorized enrolment, employee mapping, exceptions and the required output need confirmation. There is no general throughput, accuracy, payroll or maintenance guarantee in this guide. Compare the full workflow using the [face-versus-fingerprint guide](/insights/face-recognition-attendance-vs-biometric-machine) once the failure has been diagnosed.

[Request a gate-attendance assessment](/free-audit) with your city, gate count, shift pattern, device models if known and the specific failure to investigate. Keep passwords, unrestricted camera access and employee footage out of the enquiry form; agree a permissioned technical review separately. Installers seeking a partnership can use the separate [partner route](/partners).

## Questions before changing the system

### Does a queue prove that the fingerprint reader must be replaced?

No. Measure the arrival pattern, successful first attempts, retries and time spent resolving exceptions. Reader placement, enrolment, the number of entry points and the review process may require different changes.

### Will an existing CCTV camera solve missed attendance automatically?

No. Confirm the camera and stream, representative face capture, employee enrolment, record mapping and the supported fallback. Any required interaction, additional equipment and export must be established for the proposed setup.

### Does a recorded gate entry prove a full shift was worked?

No. A gate observation is one input to attendance review. Approved shift rules, exits, leave and corrections must be reconciled by the responsible attendance or payroll owner.
