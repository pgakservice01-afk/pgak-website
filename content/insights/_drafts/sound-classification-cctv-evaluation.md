---
title: "Sound classification in CCTV: microphone and privacy requirements"
metaTitle: "Sound classification CCTV: mic and privacy checks"
date: "2026-10-08"
category: "Compliance"
excerpt: "Audio analytics can classify selected sounds, such as glass breaking, and attach them to video review. Before switching on a microphone, settle what it may capture, who is told, and which normal site noises it will confuse."
metaDescription: "Audio analytics can flag sounds like breaking glass, but a microphone raises privacy questions video does not. A commissioning and noise checklist."
readTime: 7
draft: true
reviewStatus: "Awaiting PGAK engineer review. Legal points require review by a named lawyer before publication. UNRESOLVED: the legal position on capturing or analysing workplace audio in India (including under the Digital Personal Data Protection Act, 2023 and its rules, and any law on recording conversations) has not been verified from an official primary source today; the body therefore states no legal rule and refers readers to qualified advice. PGAK has no evidence record for sound classification; it is written as a capability to be evaluated per site."
faqs:
  - q: "Does a camera with a built-in microphone give me sound classification?"
    a: "No. Capturing audio and recognising a sound category are separate capabilities. The microphone, the analytics software and the specific sound classes all have to be confirmed, and then tested against the normal noise of your site."
  - q: "Do I have to record audio to classify sounds?"
    a: "Not necessarily. Some systems analyse sound and keep only the event, such as 'glass break detected at 02:14', without storing the audio. Whether a product works that way is something to confirm in writing, because analysing without recording is a much smaller privacy footprint."
  - q: "Is it legal to put microphones on CCTV at work?"
    a: "Audio is treated more strictly than video, and covert recording of conversations carries risks that ordinary video does not. Most workplace deployments leave audio off. If you are considering it, take specific legal advice for your site before switching a microphone on, rather than treating it as a camera setting."
---

**Straight answer: sound classification listens for selected sound types, such as glass breaking, and attaches an event to the matching video so someone can review it. Before using it, settle three things: whether the microphone records audio or only analyses it, who is told and how, and which normal noises on your site it will confuse with the sounds you care about. Audio is treated more strictly than video, so take specific advice before any microphone goes live.**

A camera cannot see round a corner, but a microphone may hear a window break there. That is the appeal. The catch is that a microphone also picks up conversations, phone calls and arguments that a camera never captures, and a factory or warehouse is full of sounds that resemble the ones you want to detect.

PGAK has no published evidence for sound classification. Where it appears in a proposal, it is evaluated per site. The [sound classification guide](/features/guides/sound-classification) explains the capability.

## What are the decision variables?

**Record or analyse only.** A system that stores audio creates recordings of people's voices. One that analyses sound and keeps only an event label keeps far less. Ask which, and get it in writing.

**Sound classes.** Which sounds the model recognises, named one by one. Glass breaking is commonly offered; others vary by product. "Abnormal sounds" is not a class list.

**Microphone placement.** Near the thing you care about, away from constant noise sources, and away from where people talk privately.

**Background noise.** Compressors, presses, grinders, forklifts, generators, rain on a tin roof. The model has to work against your noise, not a quiet demonstration room.

**Where people expect privacy.** Washrooms, changing rooms, rest rooms, prayer spaces and medical rooms are places for no microphone at all.

## What does the law say?

Audio is treated more strictly than video, and covert recording of conversations carries risks that ordinary video surveillance does not. Most workplace deployments deliberately leave audio off. This article does not set out the law on capturing or analysing sound at work. <!-- UNRESOLVED: legal position on workplace audio capture and analysis in India, including under the DPDP Act 2023 and its rules, not verified from an official primary source. --> If you are considering it, take specific legal advice before switching a microphone on. [Is AI CCTV legal in India?](/insights/is-ai-cctv-legal-in-india-dpdp-act) and [CCTV in the workplace](/insights/cctv-workplace-privacy-india) cover the wider context.

## The consent-aware commissioning checklist

Use this before any microphone is enabled. It is the original asset of this article. It sets out good practice; it does not decide what the law requires at your site.

**Purpose and scope**

- [ ] The purpose is written in one sentence, for example: "Detect glass breaking in the finished-goods store outside working hours."
- [ ] The sound classes used are listed by name. Nothing else is enabled.
- [ ] Each microphone position is listed with what it is near and why.
- [ ] No microphone is placed in or near washrooms, changing rooms, rest areas, prayer spaces or medical rooms.
- [ ] Specific legal advice has been taken on whether and how audio may be used at this site.

**Recording and retention**

- [ ] The supplier states in writing whether audio is stored, or only analysed with an event label kept.
- [ ] If audio is stored: how long, where, encrypted or not, and who deletes it.
- [ ] Analysis is limited to the hours in the purpose, for example outside working hours only, if that is what the purpose needs.
- [ ] Audio is not sent off site unless the purpose requires it and that has been advised on.

**People and notice**

- [ ] Staff, contractors and, where relevant, visitors are told in plain language that sound is being analysed in named areas, and why.
- [ ] Worker representatives or the safety committee, if you have one, have been consulted before switch-on.
- [ ] Signs at the monitored areas mention audio as well as video, where advised. See [CCTV signage](/insights/cctv-signage-requirements-india) for the video side.
- [ ] There is a named person people can ask about it.

**Access and use**

- [ ] Only named roles can access audio events or recordings, and access is logged.
- [ ] Audio is not used to monitor conversations, attendance or productivity.
- [ ] Audio events never trigger automatic disciplinary action.

## The noise-confusion evaluation

Every sound class has sound-alikes on an industrial site. Test them deliberately at each microphone position, during normal work and outside working hours. Use safe, staged sources only: a supplier's approved test sound or a controlled recording, never real breakage in occupied areas.

| Target sound | Site sounds likely to be confused with it | How to stage the confuser | Result: alert? |
|---|---|---|---|
| Glass breaking | Metal sheets dropped, bottles in a scrap bin, cutlery in a canteen, a tool dropped on concrete | Drop an offcut sheet; empty a scrap bin | |
| Glass breaking | Shrink-wrap or packing tape torn quickly | Normal packing activity near the microphone | |
| Raised voices or shouting (if offered) | Workers calling across a noisy floor, a radio, a mobile on speaker | Normal shift change | |
| Alarm or siren (if offered) | Reversing beepers, machine buzzers, shift hooters | Run a forklift in reverse past the microphone | |
| Any class | Rain on a tin roof, a generator start, compressor blow-down | Wait for a rainy day; start the DG set | |

Log every alert with its clip and the actual cause. Also stage the real target sound with the supplier's approved method, a set number of times, to know how many it catches.

### Illustrative example

These numbers are invented and round, to show the arithmetic only.

A glass-break class is tested at 2 microphone positions over 1 week (7 days).

- Approved test sounds played: 20. Alerts: 17. Missed: 20 − 17 = 3, all at the position nearest the compressor.
- False alerts in normal work: 28 over 7 days at 2 positions = 28 ÷ (7 × 2) = 2 per position per day. Most were scrap metal dropped into a bin at shift end.

That suggests analysing only outside working hours at the store, which removes most false alerts and most of the privacy concern at the same stroke, and moving the second microphone away from the compressor.

## When is audio the wrong tool?

- **When the purpose is about people's conversations.** That is not a sound-classification use and should not be attempted.
- **When a contact or vibration sensor would do.** A door contact or a glass-break sensor on the window is simpler and captures no voices.
- **When the site is loud all day.** Restrict analysis to quiet hours, or do without.
- **When nobody has taken advice.** Leave the microphone off until someone has.

## What is the next step?

The [sound classification calculator](/features/guides/sound-classification#scenario-C17) estimates verification time for audio events, minus tuning hours, from your own event counts. More estimates are on the [calculators page](/calculators).

To check what your existing cameras can and cannot capture, including whether they have audio at all, [ask for a site-specific assessment](/free-audit).

*This article is general information, not legal advice. Confirm your own obligations on audio capture and personal data with a qualified adviser.*
