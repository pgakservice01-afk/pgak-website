---
title: "Use CCTV people counting to understand store footfall"
metaTitle: "CCTV people counting: check your footfall number first"
date: "2026-09-14"
updated: "2026-10-08"
category: "Security Basics"
excerpt: "A footfall count from an entrance camera is only as useful as your check of it. A one-afternoon doorway exercise tells you how far to trust the number, and what to divide your bills by."
metaDescription: "CCTV people counting can track store footfall. Check it against a manual tally for staff, re-entries and groups before you trust the number."
readTime: 7
image: "/insights/category/security-basics-2.webp"
draft: true
reviewStatus: "Awaiting PGAK engineer review. People counting has no PGAK evidence record; the article says it can be evaluated per site and makes no accuracy claim. All numbers are labelled illustrative."
faqs:
  - q: "Can CCTV cameras count footfall without new cameras?"
    a: "Often, if an existing camera has a clear, mostly overhead or steeply angled view of the entrance so that people walking close together stay separate in the frame. Whether a particular camera is suitable depends on its model, firmware, stream and position, not its brand, and the counting itself runs on processing hardware that has to be confirmed for your site. A camera mounted low or far back often needs repositioning before it can count."
  - q: "How accurate is CCTV people counting?"
    a: "Nobody can tell you for your doorway without measuring it. Run a ground-truth check: count crossings by hand in a few 30-minute windows at different times of day, note staff, re-entries and groups, and compare with the system's count for the same windows. The size of the gap, and whether it changes with the hour, tells you how far to trust the number."
  - q: "Should conversion be bills divided by footfall?"
    a: "Only after you decide what footfall means. Raw door crossings include staff and people coming back in; families shopping together produce one bill between several people. Dividing bills by customer visits, or by shopping parties, can change the conversion rate more than the counting error does, so pick one definition and keep it."
---

**Straight answer: an existing entrance camera can often count footfall if its view of the doorway keeps people separate. The counting itself runs on a processing unit added on site. Before you use the number, check it against a manual tally in a few 30-minute windows. Note staff, re-entries and groups as you go. The size and pattern of the gap tell you whether the count is fit for trends, for hourly staffing or for neither.**

Every shop owner has a sense of how busy yesterday was. The count's job is to put a number on that, so this month can be set against last month and footfall against bills. That only works if you know what the number includes and how far it drifts. Software can't tell you either. A person with a clicker and a sheet of paper can, in one afternoon.

## Can your existing camera count, or only record?

People counting is analytics on an ordinary video stream. The camera matters less than its position. It needs a view in which people crossing the doorway do not overlap. A camera looking straight down over the door, or steeply across it, usually works. A camera high on a far wall, looking down an aisle towards the entrance, usually does not. By the time people are big enough to count, they are bunched together.

The question is rarely "do we need new cameras". It is "was this camera placed to count, or only to record?" A recording camera often needs to be moved, not replaced. Suitability depends on the model, firmware and stream, not the brand on the box. The [people counting guide](/features/guides/people-counting) covers what to decide before choosing a view.

## What does a footfall number actually include?

Before measuring accuracy, decide what you want to count. A line across the door counts **crossings**. Your business probably cares about something else:

- **Staff.** Every trip to the stockroom across the counting line is a crossing. At opening and closing, staff can be a large share of the total.
- **Re-entries.** A customer who steps out to take a call and comes back is two entries and one visit.
- **Groups.** A family of four is four people and, usually, one bill. For conversion, the buying unit is often the group, not the person.
- **Prams, trolleys and children.** Systems handle these differently. Some count a pram as a person. Some miss a child walking close to a parent.

None of this is a fault in the software. It is a definition you have to choose. The doorway exercise below measures both questions at once: how close the count is, and how much of it is footfall in the sense you mean.

## The doorway ground-truth exercise

You need one person, a clicker or tally sheet, and access to the system's counts for the same periods.

1. **Pick four 30-minute windows** that cover different conditions. Use opening, a midday lull, the evening peak and the last half-hour before closing. If your entrance is backlit in the afternoon, include an afternoon window.
2. **Stand where you can see the counting line**, not inside it. The person tallying must not cross it.
3. **Tally every entry crossing**, then mark each one: staff, re-entry (same person seen leaving earlier in the window), or a customer arriving alone or in a group. Record group size.
4. **Write down the system's entry count** for exactly the same window, with clocks synchronised. Check that the recorder clock and your watch agree before you start.
5. **Note anything unusual**: a delivery through the front door, a school group, rain bringing people under the awning.

### Illustrative example: one weekday at a mid-size apparel store

These are round, hypothetical numbers to show the arithmetic. They are not a measurement of any product.

| Window | Manual entries | Staff | Re-entries | Customers in groups (groups) | System count | Gap |
|---|---|---|---|---|---|---|
| 10:00–10:30 | 42 | 6 | 2 | 12 (5) | 39 | −7.1% |
| 13:00–13:30 | 65 | 4 | 3 | 24 (10) | 58 | −10.8% |
| 18:00–18:30 | 118 | 2 | 5 | 50 (21) | 103 | −12.7% |
| 20:30–21:00 | 30 | 8 | 1 | 6 (3) | 31 | +3.3% |
| **Total** | **255** | **20** | **11** | **92 (39)** | **231** | **−9.4%** |

The gap is (system − manual) ÷ manual. For the evening peak that is (103 − 118) ÷ 118 = −12.7%.

**What it shows.** The system undercounted most when the door was busiest. That is the window where groups walk through together. It slightly overcounted at closing, when staff traffic dominated. The error is not constant. So comparing 6 pm with 1 pm on the system count would overstate how quiet the afternoon is compared with the evening. Comparing this Tuesday's 6 pm with last Tuesday's 6 pm is safer, because the same conditions apply to both.

**Turning crossings into visits.** Customer visits = 255 − 20 staff − 11 re-entries = 224. Assume staff and re-entries were not in groups. Then 224 − 92 = 132 customers arrived alone. Add the 39 groups and you get **171 shopping parties**.

**Why the definition matters more than the error.** Suppose those four windows produced 60 bills:

| Denominator | Count | Conversion (60 bills ÷ count) |
|---|---|---|
| Raw system count | 231 | 26.0% |
| Customer visits (manual) | 224 | 26.8% |
| Shopping parties (manual) | 171 | 35.1% |

The counting error moves conversion by less than one percentage point here. The choice of definition moves it by nine. Pick one definition, write it down, and never mix them in the same report.

### What to do with the result

- **If the gap is small and stable across windows**, use the count for daily and weekly trends, and for same-hour comparisons.
- **If the gap changes a lot with the hour**, as in the example, do not use the raw count to decide hourly staffing. Either fix the view (often a steeper angle over the busiest part of the door) or compare like hours only.
- **If staff are a large share at certain hours**, move the counting line so stockroom trips do not cross it, or record staff crossings separately. Identifying individual staff is not needed for this.
- **Repeat the exercise** after a camera is moved, the door or awning changes, or the season changes what people carry. A count checked in May tells you little about December.

## Where does people counting fall short?

**More than one entrance.** If only the front door is counted while customers also use a side or basement entrance, the number is partial. Every public entrance needs a counted view, or the report should say which doors it covers.

**Legal or contractual headcounts.** A count like this is a management figure. It is not a certified occupancy figure for a lease dispute or a fire-safety limit.

**A number nobody uses.** A count that feeds a dashboard nobody opens costs money and changes nothing. Decide before buying which decision the number will change. Staffing hours, opening times and conversion follow-up are the usual ones.

**Very small shops.** If one person can see the whole floor and the door from the counter, a manual tally twice a week may tell you as much.

Counting does not need to know who anyone is. It registers that *a person* crossed a line, which is a much lighter data footprint than identification. Our [note on AI CCTV and the DPDP Act](/insights/is-ai-cctv-legal-in-india-dpdp-act) explains that distinction.

## Next step

If manual counting rounds take up staff time today, the [people counting calculator](/features/guides/people-counting#scenario-C11) turns your rounds per day and minutes per round into hours per month. It includes the verification time this exercise costs. If you want to put a value on a conversion change, use the [retail contribution calculator](/calculators/retail-contribution). It works on contribution margin per sale, not on bill value, and it reports a scenario, not a forecast.

PGAK adds analytics to compatible cameras a site already owns, so weigh our view with that interest in mind. Whether your entrance camera, stream and network can support counting is confirmed on site, and any extra hardware is itemised in the quote. [Ask for a site-specific assessment](/free-audit) if you want the doorway checked before you decide.
