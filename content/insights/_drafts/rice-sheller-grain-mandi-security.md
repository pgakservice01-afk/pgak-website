---
title: "Grain mandi and rice sheller cameras: count movement and investigate discrepancies"
metaTitle: "Rice mill CCTV: loading bays, dust and sack counts"
date: "2026-09-19"
updated: "2026-10-08"
category: "Security Basics"
excerpt: "In a rice sheller or grain mandi, disputes concentrate at the weighbridge, the gate and the loading bay. A loading-bay camera checklist for dust, overlapping views and truck movement, and a way to settle a bag-count discrepancy with evidence rather than memory."
metaDescription: "Rice mill and mandi CCTV: cover the weighbridge, gate and loading bay, plan for husk dust and trucks, and reconcile bag counts against weight."
readTime: 8
image: "/insights/covers/rice-sheller-grain-mandi-security.webp"
draft: true
reviewStatus: "Awaiting PGAK engineer review. The sack-count recording is described as a limited pilot (19 Dec 2022, 16 s); counting at a specific mill is presented as requiring a site test. No local statistics are given. Bag weights and counts are labelled illustrative."
faqs:
  - q: "Where should cameras go in a rice sheller or grain mandi?"
    a: "Prioritise the weighbridge, the gate and the loading bay, then the stack rows in the yard and godown. The weighbridge camera should show the weight display and the vehicle in the same frame. The loading-bay camera should look along the line bags cross, so counts and disputes can be checked later."
  - q: "Can a camera count sacks at a loading bay?"
    a: "PGAK has a short published recording of sacks being counted across one line at a loading bay, with tracking so the same sack is not counted twice. That is a limited pilot, not an inventory system. Whether it works at your bay depends on the camera position, dust, lighting and how bags are carried, and the count must still be reconciled against your gate pass, tally and weighbridge records."
  - q: "How do dust and husk affect CCTV at a rice mill?"
    a: "Husk and fine dust settle on lenses and housings and soften the image gradually, and at night a camera's built-in infrared lights up airborne dust close to the lens, which can wash out the picture. Use housings rated for dust, mount cameras away from blower outlets, keep a logged cleaning schedule, and consider separate lighting instead of the camera's own infrared."
  - q: "Is face recognition useful for seasonal mandi labour?"
    a: "Usually not. When workers change week to week during arrivals, enrolment takes more effort than it saves. Gate and yard coverage, plus a simple daily headcount by the contractor or munshi, does more for less. Keep any enrolment-based attendance for the permanent crew."
---

**Straight answer: in a rice sheller or grain mandi, put cameras first at the weighbridge, the gate and the loading bay. That is where weight and bag-count disputes arise. Plan the loading-bay camera for dust, for a single authoritative count line, and for trucks that block the view. When a count is disputed, compare four independent records: gate pass, loader tally, weighbridge net weight and camera footage or count. Do not rely on any one of them, the camera included.**

A sheller or mandi in Punjab runs two different years. Most months are manageable, with a fixed crew and steady stock. Then paddy arrives in autumn, or wheat in spring, and the yard fills, new labour appears, and the weighbridge becomes the busiest and most argued-over point on the site. A security plan built for the quiet months does not stretch to that.

## Where do disputes and losses concentrate?

**The weighbridge.** Farmers, arhtiyas, millers and buyers all depend on the same number. A camera should capture the **weight display and the loaded vehicle in the same frame**, with the recorder clock matching the weighbridge slip printer. Then a disputed reading can be checked against the recording rather than against a handwritten slip.

**The gate.** Every vehicle and every authorised or unauthorised bag passes here. At peak arrivals, queues of trucks and tractors create cover. Gate cameras need a view that a parked truck cannot block.

**The loading bay and stack rows.** Bags change hands here. Counts that differ between the gate pass and the destination usually trace back to a loading session nobody can now reconstruct.

**The open yard.** Stacks often have no wall on at least one side, because walls slow loading. Corner cameras covering the approach roads and stack rows, plus good lighting, do more than spreading cameras evenly.

## The loading-bay camera checklist

Work through this before you rely on any loading-bay footage, with or without counting.

### Dust and husk

- [ ] Housing rated for dust ingress, confirmed on the camera's own specification sheet, not the installer's description
- [ ] Camera mounted away from husk blower outlets, aspirators and the downwind side of the polishing section
- [ ] Lens and housing cleaning on a written schedule, with a log line each time, more often in season
- [ ] Night image checked: built-in infrared can light up airborne dust near the lens. If it does, add separate lighting over the bay and turn the camera's infrared down or off
- [ ] Cable entries and junction boxes sealed, since dust gets in the same way monsoon water does (see our [monsoon failure checklist](/insights/cctv-monsoon-failures))

### Overlap and count lines

- [ ] **One authoritative count line per loading point.** Two cameras counting the same bags will double the count. Other cameras may overlap for evidence, but only one counts
- [ ] Count line placed where bags pass **one at a time**, such as the end of a conveyor or a narrow point at the tailgate, not across a wide area where loaders cross in groups
- [ ] Direction defined: loaders walking back empty across the line must not count
- [ ] Camera looking along or steeply down onto the line, so a bag on a shoulder does not hide the next one
- [ ] Recorder clock synchronised with the weighbridge and gate-pass system

### Truck movement

- [ ] View checked with a truck in position: does the truck body, tarpaulin or tailgate hide the line?
- [ ] View checked with a truck reversing in at night: do headlights flare across the scene?
- [ ] Two-bags-at-once and trolley loading tested if your crew does either
- [ ] Wide overview of the bay retained alongside the count view, so a disputed session can be watched in context
- [ ] Recording kept for at least as long as your usual payment or dispatch dispute window. Check the real number of days on the recorder, as our [storage article](/insights/cctv-storage-how-many-days) explains

## What has a camera count actually been shown to do?

PGAK has published one relevant recording. It shows sacks counted across one line at a loading bay, recorded on 19 December 2022 and 16 seconds long. The count rises from four to seven, and tracking numbers stop the same sack being counted twice. It is a **limited pilot** in the [capability register](/platform/capabilities), and the clip is on the [warehouse page](/ai-cctv-for-warehouses). It shows the method working on one scene. It is not an accuracy figure, and it is not an inventory system. Your bag type, line position and lighting need a site test, with the camera count checked against a manual tally.

## Settling a bag-count discrepancy

Compare four independent records. Each has its own weakness.

| Record | Strength | Weakness |
|---|---|---|
| Gate pass / dispatch note | Agreed paperwork | Often written before loading ends |
| Loader or munshi tally | Counted by hand | Fatigue, payment tied to count |
| Weighbridge net weight | Hard to dispute | Bag weight varies with moisture and filling |
| Camera count or footage | Reviewable later | Occlusion, dust, two bags carried at once |

### Illustrative example: one disputed truck

Round, hypothetical figures to show the method.

- Gate pass: **400 bags**. Loader tally: **400 bags**. Camera count at the tailgate line: **396 bags**.
- Weighbridge net weight: **19,900 kg**. Nominal bag weight: **50 kg** (yours may differ). Implied bags: 19,900 ÷ 50 = **398**.

**Step 1: review the camera's weak points first.** Watch the clips where the count paused or loaders bunched. Suppose two moments show a loader carrying two bags at once, each counted as one. The corrected camera count is 396 + 2 = **398**.

**Step 2: compare with weight.** 398 matches the implied figure. But a 2-bag difference at 50 kg is 100 kg, or 0.5% of the load. That is small enough to sit inside normal variation in bag weight. Weight alone cannot settle a 2-bag gap.

**Step 3: decide.** The camera and the weighbridge now agree on about 398. The gate pass and the tally say 400, and both may have been written from the plan, not the load. The practical action is to have the receiving end count on arrival, record the result against the case, and change one process: the tally is signed only after the last bag crosses the line.

**Step 4: keep the record.** Note the truck, the times, the clips reviewed and the outcome. Over a season, the pattern matters more than any single truck. It might be one loading point, one shift or one contractor.

## Seasonal labour: skip enrolment, keep a headcount

When the crew changes week to week, enrolling each worker for recognition takes more effort than it saves. General gate and yard coverage records movement without identifying anyone. A daily headcount by the labour contractor or munshi, checked at the weighbridge, covers attendance for the season. Keep enrolment-based attendance, if you use it at all, for the permanent crew. Our article on [attendance when the workforce triples for a season](/insights/attendance-seasonal-peak-workforce) covers the admin side.

## Where this does not help

- **No lighting at the yard or bay.** Cameras record darkness. Fix lighting first.
- **Paperwork that is never compared.** Four records only help if someone compares them for each disputed truck.
- **Expecting the camera to stop theft at night.** It records. It needs a guard or an owner who acts.

## Next step

The [sack and object counting calculator](/platform/capabilities#scenario-C29) values counting in reconciliation time, not stock. *Illustrative example:* 80 truckloads a month in season × (10 minutes to reconcile by hand − 3 minutes with a camera count) ÷ 60 = 9.3 hours, minus 2 hours of exception review, gives **7.3 hours a month**. Your minutes come from a trial, not from us. Other tools are on the [calculators page](/calculators).

PGAK reuses compatible cameras a site already owns. Detection runs on a processing unit on site, and anything extra is itemised in the quote. Before the next arrival season, [ask for a site-specific assessment](/free-audit) of your weighbridge and loading-bay views.
