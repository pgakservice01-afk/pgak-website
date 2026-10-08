---
title: "Factory CCTV handover checklist: what to test before you sign off"
metaTitle: "Factory CCTV handover checklist: test before sign-off"
date: "2026-10-08"
category: "Camera Setup"
excerpt: "Handover day is the last time the installer has a reason to fix things quickly. A printable checklist for permissions, retention, evidence export and tested response routes — to work through before you sign."
metaDescription: "A printable factory CCTV handover checklist: passwords and permissions, real retention, a test export, night checks and tested alert and outage routes."
readTime: 8
draft: true
reviewStatus: "Awaiting PGAK engineer review. No PGAK capability claims beyond the verified list. Engineer to confirm the outage-test steps are safe to run on typical recorders without data loss."
faqs:
  - q: "What should I check before signing off a factory CCTV installation?"
    a: "Check that you hold the admin password and every account is named; that each camera records at the agreed settings and the recorder's real retention matches the contract; that a test clip can be exported and played on another computer; that the picture is usable at night; and that every alert reaches the named phone, including what happens when a camera, the internet or the power fails."
  - q: "How do I test CCTV retention at handover when the disk is not full yet?"
    a: "Read the recorder's own storage figures — total capacity and the space used per day by all cameras at the final settings — and divide one by the other. Then check again once the disk first fills: the oldest recording date on the playback screen shows the real retention. Agree in the contract that the installer adjusts storage or settings if it falls short."
  - q: "Should I hold back part of the payment until handover is complete?"
    a: "It is common to agree in the contract that a final instalment is paid after acceptance, with a written snag list and dates for each fix. Whatever you agree, put the acceptance tests in writing before the installation starts, so both sides know what 'complete' means."
---

**Straight answer: before you sign off a factory CCTV installation, test it — do not just look at it. Confirm you hold every password and that accounts are named; that each camera records at the agreed settings and the real retention matches the contract; that a clip can be exported and played elsewhere; that the picture works at night; and that each alert reaches the right phone, including when a camera, the internet or the power fails. Handover day is the last time the installer has a strong reason to fix things quickly.**

Most problems with factory CCTV are visible on handover day to anyone who looks for them: a camera recording at the wrong settings, a recorder whose admin password stayed with the technician, a gate camera that shows nothing after dark. They are cheap to fix then and expensive later.

This checklist is for acceptance and handover. Choosing what to buy and where cameras should go are earlier steps; our guide on [how many cameras a factory needs](/insights/how-many-cctv-cameras-does-a-factory-need) covers the plan, and our explainer on [cabling corners installers cut](/insights/cctv-cabling-corner-cutting) covers what to watch for during the installation itself.

## Before handover day: agree what "done" means

Ideally, the acceptance tests below are attached to the purchase order before installation starts. If they were not, share this checklist with the installer a few days before handover, so they arrive prepared. Ask for:

- The final camera list with locations.
- The agreed resolution, frame rate and recording mode for each camera.
- The retention target in days.
- The list of alert rules, if any, with who receives each one.

## The printable handover checklist

Work through it with the installer present, the person who will own the system on your side, and — for the night section — after dark.

### 1. Documents you should receive

- [ ] Camera schedule: each camera's location, purpose, model, firmware version and IP address.
- [ ] Simple drawing of cable routes, the recorder location and network switches.
- [ ] Invoices listing each item, with serial numbers for the recorder, disks and cameras.
- [ ] Warranty registered in the factory's name, not the installer's.
- [ ] The recording settings for each camera, in writing.
- [ ] Contact numbers for support, and the response time agreed, in hours.

### 2. Permissions and passwords

- [ ] The recorder admin password is changed from the installer's and given to the factory owner in writing, in a sealed envelope or a password manager.
- [ ] Every camera's default password has been changed.
- [ ] Each person who needs access has their own named login with only the rights they need (view only, playback, export).
- [ ] The installer's own account is removed, or limited and time-bound if they will provide support.
- [ ] How remote viewing works is written down: which app, which accounts, which phones.
- [ ] Nobody has sent passwords, stream addresses or screenshots of login screens over WhatsApp or messaging groups. If they have, change the passwords.

### 3. Recording and retention

- [ ] Every camera appears on the recorder and is recording. Play back the last hour for each one.
- [ ] Resolution, frame rate and recording mode match what was agreed, camera by camera.
- [ ] The recorder clock is correct and set to synchronise automatically; cameras show the same time.
- [ ] Disk health shows normal in the recorder's storage menu.
- [ ] Retention: read total capacity and daily usage from the recorder and divide. Does it meet the target? Our guide on [how many days of footage you are really keeping](/insights/cctv-storage-how-many-days) explains the calculation.
- [ ] Agree a date to re-check retention after the disk first fills, and what the installer will do if it falls short.
- [ ] The recorder, network switch and router are on a UPS. Note how long it holds.

### 4. Evidence: a test export

- [ ] Choose one camera and a five-minute window from earlier that day.
- [ ] Export it using the recorder's export function to a USB drive, in the recorder's original format, with its player if offered.
- [ ] Play the exported clip on a different computer. Check that the timestamp is visible and correct.
- [ ] Write down who in the factory is allowed to export footage, and where exports are logged.

If nobody on your side can do this unaided by the end of handover, training is not complete. Our [day-after-a-theft checklist](/insights/what-to-do-day-after-a-theft) covers what to do with an export when it matters.

### 5. Night check

- [ ] After dark, view every outdoor camera live. Can you tell a person from a shadow?
- [ ] At the gate: can you recognise someone you know walking in? Read a number plate, if that was in scope?
- [ ] Along the boundary: is any section completely dark, or flared by a light shining into the lens?
- [ ] Do infrared lights reflect off a nearby wall, glass or the housing, washing out the picture?

Snags found here usually mean a light, an angle or a different camera — note them on the snag list.

### 6. Alerts and response routes

Test every alert rule the system was sold with, end to end. For each:

- [ ] Someone triggers the event deliberately (for example, walks across the rear-wall zone after hours).
- [ ] Note the time of the event and the time the alert arrives on the named phone.
- [ ] Check the alert shows what is needed to decide: camera, time, a snapshot or clip.
- [ ] The person who receives it says what they would do, and who they would call.
- [ ] If the first person does not respond, who is next, and how do they find out?
- [ ] Check that the zone and schedule match what was agreed: no alerts during working hours if that was the intent.

For a boundary or yard rule, also note how many false alerts arrive during a normal evening — animals, headlights, swaying trees. Our page on [intrusion alerts](/features/intrusion-alerts) explains what drives them, and the [intrusion and line-crossing calculator](/features/intrusion-alerts#scenario-C07) estimates review time with your own figures.

### 7. Failure tests

Agree these with the installer first, and do them with them present.

- [ ] **One camera unplugged.** Does anyone get told? How would you notice otherwise?
- [ ] **Internet disconnected.** Does recording continue? What happens to alerts and remote viewing? When the connection returns, does everything recover without someone restarting it?
- [ ] **Power cut to the recorder (UPS removed briefly, if safe).** Does the recorder restart on its own and resume recording on every camera? Is the clock still correct?
- [ ] Write down, for each test, what recovered automatically and what needed a person.

A system that goes silent when the internet drops is common. What matters is that you know, and that someone is responsible for noticing. Our article on [knowing when a camera has gone offline](/insights/cctv-camera-offline-how-to-know) covers routine checks.

### 8. Privacy and notices

- [ ] No camera views toilets, changing rooms or other places where people expect privacy.
- [ ] Notices are displayed where cameras are in use. See [what a CCTV notice should say](/insights/cctv-signage-requirements-india).
- [ ] Any privacy masking that was agreed is set and visible in recordings.

### 9. Sign-off

- [ ] Snag list written, each item with a fix date and an owner.
- [ ] Date set to re-check retention and the snag fixes.
- [ ] Acceptance signed by the factory's named owner, with the snag list attached.

## What this checklist does not prove

A clean handover shows the system works on that day under those conditions. It does not show how an alert rule performs over months of real activity, rain, dust and changing light. If you bought analytics, measure that over the following weeks; our [pilot evaluation worksheet](/resources/evaluation-method) and the [false-alarm cost calculator](/calculators/false-alarm-cost) help. It also does not replace maintenance: lenses get dirty, cables get cut, disks fail. A written maintenance arrangement covers that; see [what a CCTV AMC should include](/insights/cctv-amc-what-should-it-include).

If you would like an independent check of a system before you sign off — or of one already handed over — [ask for a site-specific assessment](/free-audit).
