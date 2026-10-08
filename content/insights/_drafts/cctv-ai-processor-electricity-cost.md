---
title: "How much electricity do CCTV and an AI processing unit use?"
metaTitle: "CCTV and AI processor electricity cost: measure it"
date: "2026-10-08"
category: "Buying Guide"
excerpt: "Label wattages overstate some devices and miss others entirely: PoE losses, infrared at night, the UPS's own losses. A measured-wattage worksheet turns your CCTV and an on-site AI processing unit into kWh and rupees, at the rate on your own bill."
metaDescription: "kWh = watts × hours ÷ 1,000; cost = kWh × your bill's rate. A worksheet to measure cameras, PoE switch, recorder, AI processing unit and UPS losses."
readTime: 8
draft: true
reviewStatus: "Awaiting PGAK engineer review. Tariff used is an illustrative ₹8 per kWh, matching the electricity calculator's example; no Punjab or PSPCL tariff is stated (not verified). All wattages are hypothetical. PGAK processing-unit wattage is not published; the draft says only that the hardware is itemised in the quote and tells readers to ask for rated power in writing. Check: advice that plug-in energy meters suit plug-in loads only and hard-wired loads need an electrician with a clamp meter."
faqs:
  - q: "How do I calculate CCTV electricity cost?"
    a: "Measure or find the watts each device draws, multiply by the hours it runs and divide by 1,000 to get kWh, then multiply by the per-unit rate on your electricity bill. For example, a 60 W device running 24 hours a day for 30 days uses 60 × 24 × 30 ÷ 1,000 = 43.2 kWh. At an illustrative ₹8 per kWh that is about ₹346 a month. Use your own bill's rate."
  - q: "How much power does an AI processing unit add?"
    a: "It depends on the unit and how many camera streams it processes, so measure it or take the figure from the supplier's quote. Whatever the figure, the arithmetic is the same: watts × 24 hours × days ÷ 1,000 gives kWh. If the unit runs on a UPS, add a share of the UPS's own losses."
  - q: "Should I use the wattage on the label?"
    a: "Use it only as a ceiling. A label or datasheet usually states maximum draw, while typical draw may be lower by day and higher at night when infrared lights switch on. A plug-in energy meter on the recorder, processing unit and PoE switch gives you the real figure over a full day and night."
  - q: "Which electricity rate should I use?"
    a: "The per-unit rate your extra consumption is actually charged at, taken from your own bill, including per-unit duties and surcharges. Fixed or demand charges do not usually change with a small added load. If your bill has slabs or time-of-day rates, use the rate that applies to the extra units."
---

**Straight answer: electricity cost = watts × hours ÷ 1,000 × the per-unit rate on your bill. A typical CCTV setup — cameras, a PoE switch, a recorder, a router and an on-site AI processing unit — is a modest but continuous load, so the cost adds up over a year. Measure it rather than adding up labels: label wattages are maximums, cameras draw more at night when infrared switches on, a PoE switch has its own losses, and a UPS uses power even when the mains is fine.**

Running cost rarely appears on a CCTV quote. It is small per device, but the system runs every hour of every day for years, so it is worth knowing properly, especially when a processing unit is being added.

## What actually draws power in a CCTV system?

- **Cameras.** Draw rises at night when infrared lights come on, and more if the camera has a heater or a motorised zoom.
- **PoE switch or PoE NVR.** It powers the cameras over the network cable and loses some power in doing so. Measured at its wall plug, it shows camera draw plus its own losses in one figure.
- **Separate camera power supplies.** On analogue or non-PoE systems, adapters or a central power box feed the cameras, and they lose some power too.
- **Recorder (DVR or NVR).** The board plus each hard disk.
- **On-site AI processing unit.** It runs all day because it is watching continuously. Its draw depends on the hardware and how many streams it processes. With PGAK, the processing hardware is confirmed at the assessment and itemised in the quote. Ask any supplier to state its rated power in writing.
- **Router, modem or fibre terminal.**
- **UPS.** It loses some power converting and charging, even when the mains is normal.

## How do you measure, not guess?

1. **Plug-in loads** (recorder, processing unit, PoE switch, router): use a plug-in energy meter between the plug and the socket. Leave it for at least **24 hours**, through a full day and night, and read the kWh. That is better than reading watts at one moment.
2. **Hard-wired loads** (a central camera power box, a hard-wired UPS): ask an electrician to measure with a clamp meter, by day and at night. Do not open distribution boards yourself.
3. **Count PoE losses once.** Measure the PoE switch at its wall plug. That figure already includes the cameras it powers. Do not add the camera datasheet wattages on top.
4. **Find the UPS loss.** If everything runs through one UPS, measure the UPS's input. The difference between that and the sum of the devices on its output is the UPS's own loss.

## The measured-wattage worksheet

| Device | How measured | Day watts | Night watts | Hours day / night | kWh per day |
|---|---|---|---|---|---|
| PoE switch (incl. cameras) | Plug-in meter, 24 h | | | 12 / 12 | |
| Separate camera power supply | Electrician, clamp meter | | | 12 / 12 | |
| Recorder (DVR / NVR) | Plug-in meter, 24 h | | | 24 | |
| AI processing unit | Plug-in meter, or quote | | | 24 | |
| Router / fibre terminal | Plug-in meter | | | 24 | |
| **Sum of devices** | | | | | |
| **UPS input (if all on one UPS)** | Plug-in meter or electrician | | | 24 | |
| **UPS loss = UPS input − sum of devices** | | | | | |

**kWh per day = (day watts × day hours + night watts × night hours) ÷ 1,000.** If you used a plug-in meter for 24 hours, just write down the kWh it shows.

## Illustrative example — hypothetical figures and an illustrative tariff

An imagined small site: 8 IP cameras on a PoE switch, one NVR, one router and one on-site processing unit, all on one UPS. Tariff **₹8 per kWh, illustrative only — use the rate on your own bill.**

| Device | Figures (hypothetical) | Arithmetic | kWh per day |
|---|---|---|---|
| PoE switch with 8 cameras | 60 W by day, 80 W at night (infrared), 12 h each | (60 × 12 + 80 × 12) ÷ 1,000 = (720 + 960) ÷ 1,000 | 1.68 |
| NVR with two disks | 20 W, 24 h | 20 × 24 ÷ 1,000 | 0.48 |
| AI processing unit | 60 W, 24 h | 60 × 24 ÷ 1,000 | 1.44 |
| Router | 10 W, 24 h | 10 × 24 ÷ 1,000 | 0.24 |
| **Sum of devices** | | 1.68 + 0.48 + 1.44 + 0.24 | **3.84** |
| **UPS input, measured** | | | **4.30** |
| UPS loss | | 4.30 − 3.84 | 0.46 (about 12% of the load) |

**Whole system:** 4.30 kWh/day × 30 = **129 kWh a month** → 129 × ₹8 = **₹1,032 a month**. Over a year, 4.30 × 365 = 1,569.5 kWh → about **₹12,556**.

**What the processing unit adds:** 1.44 kWh/day × 30 = **43.2 kWh a month** → 43.2 × ₹8 = **₹345.60**. Because it sits behind the UPS, add its share of the UPS loss: 1.44 × (4.30 ÷ 3.84) ≈ 1.61 kWh/day → 48.4 kWh a month → **about ₹387 a month**.

Keep the two figures apart. The whole-system cost is what CCTV costs you to run. The incremental figure is what adding analytics changes. The [electricity cost calculator](/calculators/electricity-cost) keeps them separate in the same way.

## Which rate should you use?

Take it from **your own electricity bill**, not from an article:

- Use the **per-unit energy rate** plus any per-unit duty or surcharge shown.
- Fixed or demand charges usually do not change with a small added load, so leave them out of the incremental figure.
- If your bill uses **slabs** or **time-of-day** rates, use the rate your extra units fall into.
- If the site runs on a **diesel generator** during outages, those hours cost more per kWh. Work out your generator's cost per unit from fuel use and add those hours separately.

## Ways to reduce it that do not reduce security

- **Retire what you do not use.** An old recorder left running beside a new one, or a monitor nobody looks at, draws power all day.
- **Check the UPS.** An old or oversized UPS can lose more than it needs to. Ask your electrician whether it suits the load.
- **Avoid duplicate processing.** If cameras, the recorder and a separate unit all run their own analytics on the same scenes, decide which one you actually use.
- **Do not cut lighting or switch off cameras at night to save power** without checking that the site is still safe for people and that the cameras can still see. Low-light performance is a site test, not an assumption.

## Limitations

A 24-hour reading is one day. Draw changes with the season (heaters in winter, more infrared hours) and with how busy the processing unit is. Repeat the measurement in summer and in winter if the figure matters to a budget. Plug-in meters are for plug-in loads within their rated current only. Anything hard-wired is for an electrician.

## Next step

The [Edge AI processing calculator](/features/guides/edge-ai#scenario-C05) puts the on-site unit's monthly energy and support against a cloud service's monthly charge, and the [edge AI processing guide](/features/guides/edge-ai) explains what runs where. To keep a site running through outages, see [does AI CCTV work without internet?](/insights/does-ai-cctv-work-without-internet), and for the bigger picture, [the five-year cost of a CCTV system](/insights/cctv-total-cost-of-ownership-5-years). If you would like the rated power of the proposed hardware set out alongside your existing load, [ask for a site-specific assessment](/free-audit).
