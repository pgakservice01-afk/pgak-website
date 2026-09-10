---
title: "How many days of CCTV footage are you really keeping?"
date: "2026-09-10"
category: "Camera Setup"
excerpt: "The retention figure quoted at installation almost always shrinks — quietly, as cameras get added and nobody redoes the math. A simple calculation to find your real number today."
metaDescription: "How to calculate real CCTV storage retention in days, and why stated retention silently shrinks as cameras are added to a system."
readTime: 5
faqs:
  - q: "How do you calculate CCTV storage days?"
    a: "Divide your recorder's total storage capacity in gigabytes by the total daily storage used across all cameras. Daily use per camera depends on resolution, frame rate, compression and how much motion the scene has, so the only reliable way to know it is to check the recorder's own storage statistics rather than estimate from a spec sheet."
  - q: "Why does CCTV retention shrink over time?"
    a: "Storage is fixed at installation, but cameras usually get added afterward — a new gate, a new aisle, a new floor — without anyone adding storage to match. Every additional camera divides the same disk among more feeds, so retention falls silently unless someone recalculates it."
  - q: "What affects how much storage a camera uses per day?"
    a: "Four things: resolution (more pixels means more data), frame rate (more frames per second means more data), compression standard (H.265 uses roughly half the storage of H.264 for the same picture), and scene activity, because most recorders only write footage when motion is detected, so a quiet back office uses far less than a busy loading bay."
  - q: "How many days of CCTV footage should a business keep?"
    a: "There is no single correct number — it depends on how quickly a business would need to review a past incident, and this varies by state and by the rules that apply to a given premises. Fifteen to thirty days is a common practical target for a small business; verify against your own sector's requirements rather than assuming a default is enough."
---

**Straight answer: your real CCTV storage in days equals your recorder's total storage capacity divided by how much all your cameras record per day combined — not the number quoted when the system was installed. That number falls every time a camera is added unless storage is added alongside it, and most businesses never redo the calculation, so the retention they believe they have and the retention they actually have quietly drift apart.**

Ask an owner how many days of footage their CCTV keeps, and the answer is usually the number from the installation quote — 30 days, sometimes 60. Ask when that was calculated, and the honest answer is usually never since. That gap is where trouble hides, because the day you actually need footage is the day you find out the real number.

## How do you calculate CCTV storage days?

The arithmetic is simple once you have the two numbers that matter.

**Total storage** is the capacity of the hard disks in your recorder, in gigabytes or terabytes. This is fixed unless someone physically adds a disk.

**Daily storage used** is the sum, across every camera, of what each one writes per day. This is the number that changes — every time a camera is added, a resolution is bumped up, or a camera starts pointing at a busier scene than before.

Retention in days = total storage ÷ daily storage used.

Most recorders show both figures somewhere in their storage or disk management menu, sometimes stated directly as an estimated number of retention days. That estimate is worth checking against reality occasionally, because it is itself calculated from recent activity and shifts as the scene in front of a camera changes.

## Why does stated retention shrink as cameras are added?

This is the trap. Storage is bought once, sized for the camera count on day one. Cameras get added over the following year for reasons that have nothing to do with storage planning — a new bay opened, a blind spot got flagged, a manager asked for one more angle at the till.

Each new camera takes its slice of the same fixed disk. Ten cameras sharing a 4TB disk each get roughly 400GB. Add five more cameras to the same disk and each one's share drops by a third — and so does your retention, even though nobody touched a setting.

Nobody notices until the day a claim needs footage from three weeks ago and the recorder has already overwritten it.

## What changes how much a single camera uses per day?

Four variables, and they compound.

**Resolution.** A higher-megapixel camera captures more detail per frame, which means more data per frame. Doubling resolution roughly doubles storage use, other things equal.

**Frame rate.** Most sites do not need 25 or 30 frames per second for a static gate or aisle view — 10 to 15 fps is often visually indistinguishable for review purposes and uses proportionally less storage.

**Compression standard.** H.265 compression typically needs roughly half the storage of the older H.264 standard for a comparable picture. Many recorders still ship set to H.264 by default because it is the older, safer compatibility choice.

**Scene activity.** Most systems record on motion rather than continuously. A loading bay with constant movement fills storage far faster than a store room that is empty for most of the day, even at identical settings.

## How many days should you actually keep?

There is no universal right answer, and we would rather say that plainly than invent one. What footage you are required to keep, and for how long, varies by state and by the kind of premises you run — verify your specific obligation with a compliance advisor rather than relying on a blog post, this one included, for anything resembling legal advice.

As a practical benchmark, most small businesses target somewhere between 15 and 30 days, because that covers the typical delay between an incident happening and someone asking to review it — a customer dispute, a reconciliation, a reported loss. Sites with longer internal reporting cycles, or specific regulatory retention duties, need to plan for more.

## What is a quick way to check your real number today?

Open your recorder's storage or disk information screen and read off the estimated retention days it reports right now, not the figure from the installation paperwork. If it is lower than what you assumed, the fix is either adding storage to match your current camera count, or reviewing whether every camera needs its current resolution and frame rate — the cheaper fix, and often the one that gets skipped.

We help site owners run this check as part of an audit, and we will say plainly that adding storage capacity is sometimes the honest recommendation even though it is not the more interesting one to sell.

[Ask for a free feasibility check](#dealer)
