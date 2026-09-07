---
title: "What actually affects face recognition accuracy"
date: "2026-09-07"
category: "Attendance"
excerpt: "A vendor's 99% accuracy number tells you almost nothing about your gate. Pixel count, camera angle, lighting and motion are what actually decide whether a face is recognised."
readTime: 5
faqs:
  - q: "What affects face recognition accuracy the most?"
    a: "Four things in practice: how many pixels sit between the eyes in the camera frame, the angle of the face to the lens, the lighting at the point of capture, and how much motion blur is in the frame. A face recognition system that is strong on paper still misses people if any one of these is wrong at your actual gate."
  - q: "How many pixels between the eyes does face recognition need?"
    a: "Most face recognition engines want at least 40 to 60 pixels between the eyes to identify a person reliably, and quality drops sharply below that. This is a function of camera resolution, lens choice and distance from the gate, not of the software's advertised accuracy."
  - q: "Does camera angle affect face recognition accuracy?"
    a: "Yes, significantly. A camera looking down at a steep angle, or mounted to the side of where people actually walk, captures a distorted or partial view of the face. Accuracy claims are almost always measured on a face looking near-straight at the lens, which a badly aimed gate camera rarely produces."
  - q: "Can face recognition work in low light or with motion blur?"
    a: "Low light and motion blur are two of the most common reasons recognition fails on site. Poor lighting starves the camera of the detail it needs, and a fast walking pace under a slow shutter speed smears the face across several pixels. Both are usually fixable with a lamp or a shutter-speed setting, not a different algorithm."
  - q: "Is a vendor's stated accuracy percentage reliable?"
    a: "Treat it as a lab number, not a promise for your gate. It was almost certainly measured on well-lit, front-facing, high-resolution images — conditions your actual entrance may not match. What matters is accuracy at your specific camera, angle and lighting, which no brochure number can tell you."
---

**Straight answer: face recognition accuracy depends far more on pixels between the eyes, camera angle, lighting and motion blur than on which software you buy. A system with a strong accuracy claim on paper will still miss people at a badly placed, badly lit, or too-distant camera — and a modest system will perform well when those four things are right.**

Every AI CCTV brochure quotes an accuracy number — 98%, 99.5%, sometimes higher. Then the gate camera gets installed, and it recognises some people every time and misses others every time, no matter what the box said. This is not a software bug. It is what happens when the four things that actually determine accuracy were never checked at installation.

## How many pixels between the eyes does face recognition need?

This is the single biggest factor, and the one most installers skip. Face recognition works by measuring distances between facial landmarks — eyes, nose, jawline — and it needs enough resolution to do that measurement precisely. Most engines want at least 40 to 60 pixels between the eyes to identify a person reliably, and quality drops sharply below that.

That number comes from three things multiplied together: the camera's resolution, the lens's field of view, and the distance from camera to face. A 4-megapixel camera with a wide lens covering a 15-metre gate can easily fall short of 40 pixels between the eyes at the far end of that gate — while the same sensor with a narrower lens, or moved closer, clears it easily. This is arithmetic, not a software setting, which is why swapping the recognition engine rarely fixes a resolution problem.

## Does camera angle affect face recognition accuracy?

Yes, and it is the second most common failure we see on site visits. A camera mounted high and angled steeply downward — a common choice because it deters vandalism — captures the top of the head and very little of the face. A camera aimed across a doorway rather than along the direction people walk catches faces side-on more often than front-on.

Accuracy claims are almost always measured on a face looking near-straight at the lens, which a badly aimed gate camera rarely produces. Moving the camera to face the direction of foot traffic, even by a few degrees, often does more for real-world accuracy than any setting inside the software.

## How does lighting affect face recognition accuracy?

Poor lighting starves the camera of the detail it needs, and this is often the cheapest problem to fix. A dim entrance, strong backlight from a doorway, or a security light that only switches on for motion all degrade the image before the recognition engine ever sees it. We have walked into sites where a single ₹500 lamp fixed a "software" problem that had been open for months.

## Can motion blur break face recognition?

Yes. A fast walking pace under a slow shutter speed smears the face across several pixels, and blur destroys the fine detail the engine measures. This shows up most at busy gates during shift-change rush, exactly when accurate attendance matters most. A faster shutter speed setting on the camera — sometimes at the cost of slightly darker footage, which lighting can compensate for — is usually the fix, not a recognition upgrade.

## Why do vendor accuracy percentages mean less than they sound?

Treat a stated accuracy percentage as a lab number, not a promise for your gate. It was almost certainly measured on well-lit, front-facing, high-resolution images in a controlled test set — conditions your actual entrance may not match at 7am with low winter sun through the gate. What matters is accuracy at your specific camera, angle and lighting, which no brochure number can tell you. Ask any vendor to test on your own camera feed before you sign, not on their demo reel.

## Where this genuinely has limits

Even with all four factors right, face recognition struggles with crowds moving fast through a narrow gate, with faces mostly turned away from the camera, and with very long distances where no lens change makes up the gap. If your site has a wide-open entrance with people streaming through at an angle, expect some manual fallback rather than 100% automated capture — that is a physical constraint, not a vendor shortfall.

PGAK builds face recognition attendance systems, so weigh this recommendation with that in mind — but the fix in most cases is genuinely a camera or lighting change we'd point out for free during a site check, not a system we'd need to sell you.

[Ask for a free feasibility check](#dealer)
