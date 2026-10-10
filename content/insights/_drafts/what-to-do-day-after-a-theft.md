---
title: "What to do the day after a theft: a footage recovery checklist"
metaTitle: "After a theft: how to recover and save CCTV footage"
date: "2026-09-15"
updated: "2026-10-08"
category: "Security Basics"
excerpt: "Recorders overwrite on a schedule, and thefts are often noticed after that schedule has started running. The steps to preserve the recording, export it properly and keep a record of who handled it — and what no checklist can promise."
metaDescription: "After a theft, preserve CCTV footage before it is overwritten: export steps, timestamp check, a file fingerprint and an export log. No forensic guarantees."
readTime: 8
image: "/insights/category/security-basics.webp"
draft: true
reviewStatus: "Awaiting PGAK engineer review. Legal points (certificate for electronic evidence, police procedure, insurance terms) are deliberately not stated as rules and are delegated to /insights/cctv-footage-legal-evidence-india and the reader's adviser. Removed from the previous version: the unverified anecdote of a Ludhiana shop owner, and the advice to file the FIR only after exporting. Engineer to confirm the hash commands and the note on recorder 'lock' functions."
faqs:
  - q: "What should I do first after discovering a theft caught on CCTV?"
    a: "If anyone may still be on the premises or the theft is in progress, call the police on 112 first. Otherwise, within the first hour, find out how much time you have before the recorder overwrites the relevant footage, note the recorder's clock against real time, and export every camera that might show the event using the recorder's own export function. Report the theft to the police without waiting for the export to be perfect."
  - q: "How quickly does CCTV footage get overwritten?"
    a: "It depends on the disk size, the number of cameras and their settings. Some sites keep a month, many keep much less. The recorder's playback screen shows the date of the oldest recording still on the disk; that tells you how much time is left before the moment of the theft is overwritten."
  - q: "Can I just record my CCTV screen with my phone as evidence?"
    a: "Only as a last resort if the recorder cannot export. A phone recording of a screen loses detail and the original file information, and it is easier to challenge. Use the recorder's own export function to a USB drive whenever you can, and keep the exported file unedited."
  - q: "Can deleted or overwritten CCTV footage be recovered?"
    a: "Do not count on it. Once a recorder has written new footage over the old, the old recording is generally gone. That is why the first step is to find out how much time you have and export immediately, rather than plan to recover footage later."
---

**Straight answer: the day after a theft, preserve the recording before you do anything that can wait. Find out how long you have before the recorder overwrites the relevant hours, note its clock against real time, and export every camera that might show the event using the recorder's own export function — then report to the police, and keep a written log of who handles the file. This protects the footage you have; it cannot recover footage already overwritten, and it does not guarantee the footage will be accepted as evidence.**

Most recorders overwrite their oldest footage once the disk is full. The clock started when the theft happened, not when you discovered it. A theft noticed at the weekly stock count may already be close to the edge of what the recorder still holds. So the order of work matters.

## First: is anyone still in danger?

If the theft may be in progress, someone may still be on the premises, or anyone is hurt, call the police on **112** before anything in this article. Footage can wait a few minutes; people cannot. Avoid handling doors, locks or objects the thief may have touched until the police have seen them.

## The preservation checklist (first hour)

Print this and keep it beside the recorder. It assumes you have physical access to a working DVR or NVR.

### 1. Find out how much time you have

- [ ] Open playback on the recorder and find the **oldest recording** still on the disk. Note its date and time.
- [ ] Work out how far that is from the theft. If the oldest recording is two days before the theft, you have roughly two days before the theft starts being overwritten — less if more cameras or motion are recording than usual.
- [ ] If the recorder itself is missing or damaged, check whether anything was saved elsewhere: a phone app with cloud clips, a second recorder, a neighbour's camera. Note it, and tell the police.

### 2. Record the recorder's clock error

- [ ] Photograph the recorder's on-screen time next to your phone's clock, in one picture.
- [ ] Write down the difference: "Recorder 7 minutes behind real time at 9:42 am on [date]."

Recorder clocks drift, especially after power cuts. You do not need to correct the clock now — changing it can confuse the record. You need the difference written down, so every timestamp in the footage can be translated to real time later.

### 3. Choose a wide time window and every relevant camera

- [ ] Start the window at the last moment you know everything was fine (closing time, the last stock count) and end it when the theft was discovered.
- [ ] List every camera on the route: the entry point, the area where the goods were, corridors, the exit, the gate, the street-facing camera.

A second angle often settles what the first leaves unclear. If you have many cameras and a long window, searching across all of them is slow; the [cross-camera search calculator](/features/guides/cross-camera-search#scenario-C02) and the [investigation time calculator](/calculators/investigation-time) estimate how long that search takes with your own numbers.

### 4. Export properly

- [ ] Use the recorder's **own export or backup function**, not a phone recording of the screen.
- [ ] Export to a new or freshly formatted USB drive or external disk.
- [ ] Export the full window you chose, in the recorder's original format. If it offers to include its own player software, include it.
- [ ] Make a second copy on a different drive. Keep one sealed and untouched.
- [ ] Do not trim, convert, compress or "enhance" the exported files. If you want a short clip to view or share with the police, make it from the second copy and label it as a working copy.

A phone video of the screen is a last resort if the recorder cannot export at all. It loses detail and the original file information.

### 5. Protect the footage on the recorder, if it allows

- [ ] Some recorders let you **lock** or **protect** a recording segment so it is not overwritten. If yours does, lock the window you exported.
- [ ] Do not switch off overwriting across the whole recorder without understanding the effect: on many recorders that simply stops new recording once the disk is full.

### 6. Fingerprint the exported files

A file fingerprint (a "hash") is a short code calculated from the file's contents. If the file changes by even one byte, the code changes. Recording it at export time lets you show later that the file you hand over is the same file you exported.

- [ ] On a Windows computer, open Command Prompt and run: `certutil -hashfile "filename" SHA256`
- [ ] On a Mac, open Terminal and run: `shasum -a 256 "filename"`
- [ ] Write the code into the export log below, for each file.

This is a good-practice step, not a forensic certification. It shows the file has not changed since you recorded the code; it says nothing about what happened before export.

### 7. Start the export log

| Field | Entry |
|---|---|
| Date and time of export (real time) | |
| Person who exported | |
| Recorder make, model and serial number | |
| Recorder clock difference from real time | |
| Cameras exported | |
| Time window exported (recorder time) | |
| File names | |
| SHA-256 code for each file | |
| Drive used for the sealed copy, and where it is kept | |
| Drive used for the working copy | |

Then add a line each time a copy is made, viewed or handed over:

| Date and time | Who | What they received or did | Why | Signature |
|---|---|---|---|---|
| | | | | |

## Then: report it, and keep the footage tight

### Report to the police without waiting

Do not delay reporting because the export is not finished. Report the theft, tell the police that footage exists and has been preserved, and ask how they want to receive it. Note the complaint or FIR number. What certificate or form must accompany electronic evidence is a legal question; our guide on [whether CCTV footage is admissible in India](/insights/cctv-footage-legal-evidence-india) explains the principles, and a lawyer can advise on your case.

### Tell your insurer

Check your policy for any time limit on notifying a theft, and for the documents it asks for. Insurers commonly ask for the police complaint number. Have the export log and a short list of what was taken ready before you call.

### Keep the footage out of group chats

Hand copies only to the people who need them, and record each hand-over in the log. Do not send the footage — or recorder passwords — over WhatsApp or other messaging groups, and do not post images of a suspect on social media. A clip that has passed through several phones is harder to rely on, and naming someone publicly before an investigation can cause harm that is difficult to undo. If you suspect a member of staff, footage on its own is not proof; let the police and your adviser handle it.

## What this checklist cannot do

It cannot bring back footage that has already been overwritten. Once a recorder writes new video over old, the old recording is generally gone; do not count on recovery services to change that.

It cannot make a blurry picture sharp. If the camera was too far away, facing the light or poorly lit, exporting it carefully preserves a blurry picture. "Enhancing" it later does not add detail that was never recorded.

It cannot guarantee the footage will be accepted as evidence or by an insurer. Careful export, a clock record, a file fingerprint and a handling log make it more reliable; whether it is accepted depends on the authorities and on your case.

## After the urgent steps: what let it happen?

Once the footage is safe and the theft is reported, look at what the recording shows about how it happened: a blind spot, a door left open, a gap at shift change, a camera that had been dark for weeks. Two common findings are worth checking now rather than after the next theft. First, how many days your recorder really keeps — our guide to [how many days of footage you are really keeping](/insights/cctv-storage-how-many-days) shows how to check. Second, whether any camera had silently stopped recording — see [would you know if a camera has been offline for weeks](/insights/cctv-camera-offline-how-to-know).

If you would like your cameras and recorder checked for retention, blind spots and coverage of the route a thief would use, [ask for a site-specific assessment](/free-audit).
