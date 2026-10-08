---
title: "Warehouse CCTV camera count: start with tasks and coverage"
metaTitle: "How many CCTV cameras does a warehouse need?"
date: "2026-09-01"
updated: "2026-10-08"
category: "Camera Setup"
excerpt: "Camera count is the last number you work out, not the first. List the tasks each position must support, such as detect, observe, recognise a face or read a plate, check the pixel density each needs, and the count follows. A dimensioned example shows the arithmetic."
metaDescription: "Warehouse CCTV camera requirements come from tasks: detect, observe, recognise, read a plate. A dimensioned layout shows how the count follows."
readTime: 9
image: "/insights/category/camera-setup-2.webp"
draft: true
reviewStatus: "Awaiting PGAK engineer review. Removed the earlier '8 to 20 cameras' range and the claim about estates audited, neither of which had a source. Pixel-density thresholds are the published rules of thumb already used in camera-resolution-vs-distance; plate reading uses the identification threshold as a working assumption, with the ANPR supplier's own minimum governing. Perimeter events have no PGAK evidence record. The layout is labelled illustrative."
faqs:
  - q: "How many CCTV cameras does a warehouse need?"
    a: "There is no reliable per-square-metre rule. List the positions that must be covered, such as each loading dock, each pedestrian entrance, receiving and despatch, high-value aisles, the vehicle gate, the yard and the perimeter, and decide what each must show: presence, activity, a recognisable face or a readable plate. Each task needs a minimum pixel density at a known distance, which fixes how wide each camera's view can be, and the count follows from that."
  - q: "What pixel density does each CCTV task need?"
    a: "Commonly used rules of thumb, from standards such as EN 62676-4, are about 25 pixels per metre to detect a person, about 60 to observe activity, about 125 to recognise someone you know and 250 or more to identify a stranger. Plate reading depends on the ANPR product; ask for its minimum and test at your gate. These are guides, not guarantees, because lighting and angle matter as much."
  - q: "Do more cameras mean better warehouse security?"
    a: "Not by themselves. Extra cameras add cost, storage and footage that nobody reviews. A smaller set placed for specific tasks, with someone responsible for acting on what they show, usually does more than a larger set recording to a disk nobody opens."
---

**Straight answer: do not start with a camera count. Start with the tasks each position must support: detecting a person in the yard, watching goods change hands at a dock, recognising a face at the staff entrance, reading a plate at the gate. Each task needs a minimum pixel density where the subject stands. That fixes how wide each camera's view can be, and the count follows. In the dimensioned example below, a 60 m × 40 m single-unit warehouse comes to 16 cameras. Changing one assumption at a time moves it to anywhere between 15 and 23.**

Installers quote in camera counts because counts are easy to price. But two warehouses with the same floor area can need very different numbers of cameras, depending on docks, entrances, the yard and where value sits. A count you cannot trace back to tasks is a count you cannot compare between quotes.

## Which positions need a camera?

Work down this list for your site:

1. **Each loading dock.** Goods change hands here. You need to see both the vehicle and the person moving stock.
2. **Each pedestrian entrance.** Staff, contractors and drivers. If you use camera-based attendance, the camera must sit at face height at a choke point.
3. **Receiving.** The position most often skipped. Shortages that start at intake get blamed on despatch.
4. **Despatch.** Where responsibility for what left the building is settled.
5. **High-value aisles.** Not every aisle, just the ones where value concentrates.
6. **The vehicle gate.** Vehicles in and out. Plate reading only if you will use it.
7. **The yard.** Presence and movement, especially after hours.
8. **The perimeter.** Along each wall not already covered by the yard view.
9. **Office and server area.** Small, cheap, often regretted when skipped.

## What does each task need?

Pixel density means the camera's horizontal pixel count divided by the width of its view at the subject's distance. It decides what you can see there. These are commonly used rules of thumb, explained in our [resolution and distance article](/insights/camera-resolution-vs-distance):

| Task | Approx. pixels per metre | Typical position |
|---|---|---|
| Detect that a person is there | 25 | Yard, perimeter |
| Observe what they are doing | 60 | Dock overview, yard near the building |
| Recognise someone you know | 125 | Docks, aisles, desks |
| Identify a stranger | 250+ | Entrances, gate |
| Read a number plate | Product-specific; we use 250+ here as a working assumption | Gate lane |

These are guides. Light, angle, motion and compression change real results. For plates, the ANPR supplier's own minimum and a test at your gate govern. Our [ANPR article](/insights/anpr-number-plate-recognition-when-it-works) explains why a controlled lane matters more than resolution.

**The two formulas:**

- View width at distance D = 2 × D × tan(lens angle ÷ 2). For a common 80° lens, tan 40° ≈ 0.839, so **view width ≈ 1.68 × D**.
- **Pixels per metre = horizontal pixels ÷ view width.** A 4 MP camera here has 2,688 horizontal pixels; a 2 MP camera has 1,920.

## Dimensioned layout example

*Illustrative example, with round and hypothetical dimensions. It is not a recommendation for any real site.*

**The site:** a single-storey building, 60 m × 40 m. Four loading docks on the 60 m front wall, each door 3 m wide, door centres 8 m apart. A 60 m × 25 m yard in front of the docks. An 8 m vehicle gate with a 3.5 m lane at the barrier. One staff entrance. Receiving and despatch desks. Three high-value aisles, each 30 m long. An office with the server rack.

| # | Position | Task | Camera and view | Arithmetic | Density | Cameras |
|---|---|---|---|---|---|---|
| 1 | Staff entrance | Identify | 2 MP, 3 m view at the face point | 1,920 ÷ 3 | 640 px/m | 1 |
| 2 | Docks 1–2 and 3–4, from inside | Recognise | 4 MP, one view across two docks: 8 m + 3 m = 11 m wide | 2,688 ÷ 11 | 244 px/m | 2 |
| 3 | Yard, from the two front corners | Detect → observe | 4 MP, 80° lens, each covering out to 30 m: 1.68 × 30 ≈ 50 m wide | 2,688 ÷ 50 | 54 px/m at 30 m | 2 |
| 4 | Gate lane at the barrier | Read plates | 2 MP, 3.5 m lane view | 1,920 ÷ 3.5 | 549 px/m | 1 |
| 5 | Gate overview | Identify vehicle, observe driver | 4 MP, 8 m gate width | 2,688 ÷ 8 | 336 px/m | 1 |
| 6 | Receiving and despatch desks | Recognise; see hands and paperwork | 2 MP, 4 m view each | 1,920 ÷ 4 | 480 px/m | 2 |
| 7 | High-value aisles, from one end | Recognise at the far end | 4 MP, varifocal set to about 30°: 2 × 30 × tan 15° ≈ 16 m wide at 30 m | 2,688 ÷ 16 | 168 px/m at 30 m | 3 |
| 8 | Rear wall (60 m), from a corner | Detect | 4 MP, 80°: 1.68 × 60 ≈ 101 m wide at the far end | 2,688 ÷ 101 | 27 px/m at 60 m | 1 |
| 9 | Side walls (40 m each), from corners | Detect | 4 MP, 80°: 1.68 × 40 ≈ 67 m wide at the far end | 2,688 ÷ 67 | 40 px/m at 40 m | 2 |
| 10 | Office / server door | Recognise | 2 MP, 3 m view | 1,920 ÷ 3 | 640 px/m | 1 |
| | **Total** | | | | | **16** |

**What the arithmetic shows:**

- **The aisles need a narrow lens.** With the same 4 MP camera on an 80° lens, the far end of a 30 m aisle would be 1.68 × 30 ≈ 50 m wide in the view. That gives 2,688 ÷ 50 ≈ 54 px/m, too little to recognise anyone. Narrowing the lens, not buying more megapixels, fixes it.
- **The rear wall is only just at detection level.** 27 px/m at 60 m is barely enough to detect a person. If you need to see what someone is doing at the far end, put a second camera at the opposite corner so each covers about 30 m (54 px/m). That is **+1 camera**.
- **The yard cameras detect, they do not identify.** No one will be recognised at 30 m from a wide view. That job belongs to the gate and entrance cameras, which people must pass through.

**How the count moves:**

| Change | Effect | New total |
|---|---|---|
| Stacked pallets block the shared dock view, so one camera per dock | +2 | 18 |
| No plate reading needed at the gate | −1 | 15 |
| All 10 aisles hold high-value stock | +7 | 23 |
| Observe level needed along the rear wall | +1 | 17 |

That is the point. The total is a consequence of tasks and dimensions, and it can be checked line by line. Ask any installer for a table like this, not a single number.

## What else decides whether the cameras are useful?

**Storage.** Every camera adds to what the recorder writes per day. Check that retention still meets your needs after the count is final; our [storage article](/insights/cctv-storage-how-many-days) shows the calculation.

**Lighting.** The densities above assume enough light. Bay lighting at night and headlights at the gate change everything. Test at night before signing off.

**Someone who acts.** Sixteen cameras recording to a disk nobody reviews are documentation. Decide who looks at what, and when. If you want after-hours alerts from the yard and perimeter views, perimeter-event analytics can be evaluated at your site, but they have no PGAK evidence record yet. Our [factory camera count article](/insights/how-many-cctv-cameras-does-a-factory-need) and [camera placement for AI detection](/insights/where-to-place-cctv-cameras-for-ai-detection) cover the same principles for other sites.

## When is a smaller estate the right answer?

- A small store with one roller shutter and one door may need three or four cameras, placed well.
- If no one will review footage or respond to alerts, more cameras add cost without adding security. Fix the response first.
- Before buying new cameras, check whether existing ones can be re-aimed or given a narrower lens. Often that is enough.

## Next step

If alert review is the cost you expect, the [intrusion alerts calculator](/features/intrusion-alerts#scenario-C07) works in hours. *Illustrative example:* 150 routine events a month × (4 minutes to review today − 1.5 minutes in a pilot) ÷ 60 = 6.25 hours, minus 2 hours of verification, gives **4.25 hours a month**. The [false alarm cost calculator](/calculators/false-alarm-cost) puts the same review time in rupees. See also the [intrusion alerts page](/features/intrusion-alerts) and [what to look for in a warehouse AI camera](/insights/best-ai-cctv-camera-for-warehouses-india).

PGAK reuses compatible cameras a warehouse already owns. Detection runs on a processing unit on site, and camera suitability, streams and network are confirmed at the assessment. Bring your position table and [ask for a site-specific assessment](/free-audit).
