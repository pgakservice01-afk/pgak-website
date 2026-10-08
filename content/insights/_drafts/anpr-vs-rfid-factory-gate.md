---
title: "ANPR versus RFID at a factory gate"
metaTitle: "ANPR vs RFID for a factory gate: which fits"
date: "2026-10-08"
category: "Buying Guide"
excerpt: "RFID identifies vehicles you have tagged. ANPR reads the plate of any vehicle that arrives. Which one fits depends on how many of your vehicles are regulars, how readable their plates are, and what happens when the system is down."
metaDescription: "RFID suits an enrolled fleet; ANPR reads visitors' plates too. A decision grid for fleets, visitors, plate readability and outage fallback."
readTime: 6
draft: true
reviewStatus: "Awaiting PGAK engineer review. PGAK's published ANPR evidence is two photographs (pillar mount at about 1.5 m, operator console); no read rate. PGAK has no RFID evidence record and is not presented as an RFID supplier. Statements about RFID behaviour (tag placement, metallised window film) are general and should be checked by an engineer. FASTag is mentioned only as a question to ask, with no claim about whether private gates may read it. Whether ANPR is a native PGAK module or a licensed engine is an open owner decision; wording is true either way."
faqs:
  - q: "What is the difference between ANPR and RFID at a gate?"
    a: "RFID reads a tag fixed to a vehicle you have enrolled; a vehicle without your tag is invisible to it. ANPR reads the number plate from a camera image, so it can log any vehicle that arrives, including visitors and transporters, provided the plate is readable. RFID identifies the tag; ANPR identifies the plate and keeps a picture of the vehicle."
  - q: "Is RFID more reliable than ANPR?"
    a: "For enrolled vehicles with a correctly fitted tag, RFID is not affected by mud on the plate, headlight glare or non-standard lettering. But it only works for tagged vehicles, tags can be damaged, removed or moved to another vehicle, and some windscreen films interfere with reading. ANPR depends on plate condition and camera placement. Neither is more reliable in every situation; it depends on your mix of vehicles."
  - q: "Can a factory use both ANPR and RFID?"
    a: "Yes, and many gates are best served that way: RFID for the company's own fleet and regular staff vehicles, ANPR with a snapshot for visitors and transporters' trucks, and a manual register as the fallback for both. The important part is that both feed one vehicle log."
  - q: "What happens at the gate when the system fails?"
    a: "Either system can stop — a power cut, a failed reader or camera, a network fault. Agree the manual fallback before go-live: the guard writes the register, the barrier has a manual override, and entries made by hand during the outage are added to the log afterwards."
---

**Straight answer: RFID suits vehicles you control — your own fleet, staff cars, regular contractors — because it reads a tag you fitted, regardless of the plate's condition. ANPR suits vehicles you do not control — visitors, transporters' trucks that change every day — because it reads the plate any vehicle already carries and keeps a snapshot. Most factory gates have both kinds of traffic, so the usual answer is RFID for the enrolled fleet, ANPR for everyone else, one shared log, and a manual register for when either fails.**

Buyers often frame this as which technology is "better". The more useful question is which of your vehicles you can enrol in advance, and what you need the record to prove afterwards.

## How each one identifies a vehicle

**RFID** uses a tag fixed to the vehicle — commonly a sticker on the windscreen or a tag on the headlamp — and a reader at the lane. When the tag passes within range, the reader logs its ID, which the system maps to the vehicle you enrolled. It does not look at the plate. A vehicle without your tag is not identified.

**ANPR** uses a camera at about plate height, along the lane, and recognition software that reads the characters on the plate. It logs any vehicle whose plate it can read, enrolled or not, and should keep the snapshot with every read. It depends on the plate being clean, standard and well lit, and the camera being placed for it. [When number-plate recognition works](/insights/anpr-number-plate-recognition-when-it-works) explains the conditions.

## The decision grid

Score your gate against each row. Where most of the weight falls tells you the primary method.

| Question about your gate | Points towards RFID | Points towards ANPR | Notes |
|---|---|---|---|
| What share of daily vehicles are your own or regular? | Most are your fleet, staff or fixed contractors | Most are visitors or transporters that change daily | A transporter's truck you see once cannot carry your tag |
| Can you fit and manage tags? | Yes — someone will issue, record and recover tags | No practical way to tag arriving vehicles | Tags need issuing, replacing and cancelling when a vehicle leaves service |
| How readable are the plates? | Many are muddy, painted, damaged or two-line | Mostly clean, standard plates | Trucks' rear plates are often the hardest |
| Is there a controlled lane where vehicles slow? | Not essential, but helps | Essential | ANPR needs a slow, single lane and a camera at plate height |
| Night conditions | Lighting does not affect the tag | Needs planned lighting for plates | Headlight glare is a common night problem for ANPR |
| Do you need a picture of the vehicle? | Only if a camera is added | Snapshot with every read | Disputes are usually settled by the picture, not the ID |
| Risk of the identifier being moved or faked | Tags can be moved to another vehicle | Plates can be swapped or copied | Neither proves who the driver is |
| Windscreen films | Some metallised or heat-reflective films can block tags | Not affected | Test tag placement on your actual vehicles |
| What happens in an outage? | Manual register and barrier override | Manual register and barrier override | Same requirement for both |

**Reading the grid.** If most rows point to RFID, tag your fleet and add a camera so that every entry has a picture. If most point to ANPR, make sure the gate has a controlled lane and test plate reading on your own vehicles before buying. If the rows split — the usual case — use both.

## Illustrative example: a mixed factory gate

**Illustrative example (hypothetical numbers).** A gate sees 200 vehicle passages a day: 80 by the company's own trucks and staff cars, 120 by suppliers' and transporters' trucks.

- **RFID only:** the 80 enrolled passages are identified by tag. The other 120 still go in the register by hand — the larger share of the work stays manual.
- **ANPR only:** all 200 can be read if the plates are readable. If, in a trial at this gate, many of the company's own older trucks have dirty two-line rear plates, those become manual exceptions every day.
- **Both:** the 80 enrolled passages go by tag, the 120 others by ANPR with snapshots, and the guard handles only the unread plates and the odd untagged company vehicle.

The arithmetic for your gate comes from your own counts: passages per day split into enrolled and not, and, for ANPR, the unread and wrong-read counts from a trial.

## Questions to ask any supplier

1. For RFID: which tag type and where is it fitted? What read range? How are lost tags cancelled? Has tag reading been tested through our vehicles' windscreens?
2. Some suppliers propose reading a tag the vehicle already carries, such as a FASTag. Ask exactly how the tag is linked to the vehicle in their system and on what basis they read it — do not assume it is allowed or reliable for gate access.
3. For ANPR: one camera per lane? Where will it be mounted? Has it been tested on our trucks' plates, by day and night?
4. For both: do both methods write to one vehicle log, with one search? Who can search and export it?
5. What is the manual fallback during an outage, and how are manual entries added to the log afterwards?
6. What does the barrier do on a read failure and on power loss? Who is responsible for barrier safety sensors?

## Outage fallback: plan it once, for both

Whichever you choose, the gate must keep working when the system does not:

- a paper or offline register the guard switches to without asking anyone;
- a manual barrier override, with the key held by a named person;
- manual entries added to the log once the system is back;
- a weekly check that the fallback register exists and the guard knows when to use it.

## When neither is worth it

If your gate sees a few dozen vehicles a day and nobody ever searches the register, a well-kept register and a general camera recording every arrival may be enough. Spend first on a controlled lane and a clear camera view; automation can come later.

## Next step

Estimate the gate time at stake with the [ANPR and vehicle logs calculator](/anpr-number-plate-recognition#scenario-C09), which subtracts the time spent handling unread plates, or the [ANPR gate time calculator](/calculators/anpr-gate-time). The [ANPR page](/anpr-number-plate-recognition) describes what an ANPR installation at a factory gate involves.

[Ask for a site-specific assessment](/free-audit) to have your gate, lanes and vehicle mix looked at before you choose.
