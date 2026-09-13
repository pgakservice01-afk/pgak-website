---
title: "Number plate recognition: when it works and when it does not"
date: "2026-09-13"
category: "Security Basics"
excerpt: "ANPR reads number plates reliably in a narrower set of conditions than most brochures admit. What actually makes it work, and where it quietly fails."
readTime: 5
faqs:
  - q: "What is ANPR (automatic number plate recognition)?"
    a: "ANPR is software that reads the characters on a vehicle's number plate from a camera image and turns them into text a computer can log, search or match against a list. It needs a plate that is sharp, roughly level, and large enough in the frame — everything after that depends on getting those three things right."
  - q: "Does ANPR work reliably on Indian number plates?"
    a: "It works well at gates built for it — a fixed lane, correct camera height and angle, and good lighting. It struggles with the plate variation common in India: non-standard fonts, stickers, dirt, bent plates and multiple state formats. A camera aimed at general traffic rather than a controlled lane will read far fewer plates correctly than a vendor demo suggests."
  - q: "Why does ANPR fail at some gates and not others?"
    a: "The four most common causes are a plate angle beyond about 30 degrees from straight-on, low light without a dedicated IR or white-light illuminator, vehicle speed that blurs the plate, and physical plate condition — mud, tint film, or a font that isn't the standard reflective one. Fix the angle and lighting first; they explain most failures."
  - q: "Where should an ANPR camera be positioned?"
    a: "At a controlled point where vehicles slow down or stop — a boom barrier, a narrow gate, a toll-style lane — with the camera mounted to face the plate nearly head-on, at plate height, with its own lighting rather than relying on the site's general lighting. Open, multi-lane approaches with free-flowing traffic are the hardest place to make it work."
  - q: "Can ANPR replace a security guard at the gate?"
    a: "No. ANPR logs and matches plates; it does not decide who to let in, inspect a vehicle, or handle a person on foot. It is a record-keeping and alerting tool that supports whoever is making the entry decision, not a replacement for them."
---

**Straight answer: ANPR reads number plates reliably only at a controlled point — a barrier or narrow lane, camera mounted at plate height and close to head-on, with dedicated lighting. Move it to open traffic, an angled view, or a badly lit approach, and accuracy drops fast. The gap between a vendor's demo and your actual gate is almost always in these physical setup details, not the software.**

Number plate recognition gets sold as a single capability: point a camera at traffic, get a searchable log of every vehicle. The reality is narrower. ANPR is genuinely useful, but only inside a specific set of physical conditions, and most disappointment with it traces back to a gate that was never going to work.

## What is ANPR and how does it actually work?

ANPR software finds a plate-shaped rectangle in a video frame, then reads the characters on it using pattern recognition trained on plate fonts. It needs enough resolution on the plate itself — not the vehicle, the plate — to separate similar characters like 0 and O, or 8 and B. Everything downstream depends on that first step: a sharp, level, well-lit plate image.

## Why do Indian number plates trip up ANPR more than the textbook case?

India adds variation that ANPR systems built abroad don't always expect: multiple state-format layouts, non-standard fonts on older or resized plates, decorative borders, dealer stickers covering a character, and plates that are dented, faded or coated in road dust. None of this makes ANPR impossible — it makes camera placement and lighting matter more, because there's less margin for a marginal read.

## Where does ANPR reliably work today?

At a controlled choke point: a boom barrier, a narrow factory gate, a single-lane toll-style approach. Vehicles slow down or stop, the camera has one predictable angle to cover, and a dedicated illuminator (IR or white light, matched to the plate's reflective coating) removes the guesswork that ambient lighting introduces. This is the setup gate-access logging and blacklist alerts are built around, and it's the one place we'd recommend spending on ANPR specifically.

## Where does it fail, and why do vendor demos hide this?

Open yards, multi-lane entries, and general perimeter cameras repurposed for plate reading are the common failure cases. A camera 15 metres back covering a wide gate captures plates at too shallow an angle and too small in frame. Add motion blur from a vehicle that doesn't slow down, and a read that looked clean in a demo video — filmed at the ideal distance and angle — becomes unreliable in the field. If a vendor demos ANPR on a wide-angle security camera rather than a dedicated lane camera, ask to see it running on your actual gate before you buy.

## Should you add ANPR to your gate?

If you have (or can build) a controlled single-lane entry point, ANPR is worth it for logging and blacklist matching — it turns "who came in today" from a guesswork question into a searchable record. If your site is an open compound with vehicles entering from multiple directions at speed, the honest answer is that plate reading won't be reliable there, and the money is better spent on a general entry camera and a barrier first. We build AI CCTV systems including ANPR where the site supports it, so weigh that recommendation with our commercial interest in mind — we'd rather tell you a gate isn't suited to it than sell a camera that reads plates poorly.

The one constraint worth naming honestly: ANPR is a logging and alerting layer, not a decision-maker. It tells you which plate arrived and when; a person still decides whether that vehicle should be let in. Any pitch that skips this — promising the camera itself will "control access" — is overselling what the technology does.

[Ask for a free feasibility check](#dealer)
