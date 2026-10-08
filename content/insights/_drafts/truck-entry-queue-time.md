---
title: "How to reduce truck queues at a factory entrance"
metaTitle: "Truck queue at the factory gate: find the bottleneck"
date: "2026-10-08"
category: "Security Basics"
excerpt: "A queue of trucks outside the gate is an arithmetic problem: more trucks arrive in the peak hour than the slowest step can clear. A worksheet to find that step before you buy anything, ANPR included."
metaDescription: "Truck queues form when peak arrivals exceed the slowest gate step. A worksheet for arrival rate, service time and bottleneck, with a worked example."
readTime: 6
draft: true
reviewStatus: "Awaiting PGAK engineer review. All numbers are illustrative and labelled. No claim is made about PGAK reducing queue time; no measured gate-time saving exists. Whether ANPR is a native PGAK module or a licensed engine is an open owner decision; wording is true either way."
faqs:
  - q: "Why do trucks queue outside a factory gate?"
    a: "Because in the busiest hour more trucks arrive than the slowest step at the gate can clear. That step might be the guard's register, the document check, a vehicle inspection, the weighbridge or a full yard. Find the slowest step and the peak hour first; speeding up any other step does not shorten the queue."
  - q: "Will ANPR reduce truck waiting time at the gate?"
    a: "Only if writing down the vehicle number is a meaningful part of the slowest step. ANPR replaces manual logging of the plate; it does not check invoices, inspect loads, weigh the truck or free up a dock. If the weighbridge or document check is the bottleneck, ANPR will make the register better but will not shorten the queue."
  - q: "What is the cheapest way to shorten a truck queue?"
    a: "Often it is spreading arrivals rather than speeding up the gate: agreeing arrival slots with regular transporters so they do not all arrive in the first hour of the shift. A second document desk during the peak, or doing paperwork checks while the truck waits inside rather than at the barrier, can also help without any new system."
---

**Straight answer: a truck queue forms when, in the busiest hour, more trucks arrive than the slowest step at your gate can clear. Measure the arrival rate in the peak hour and the time each step takes, and the bottleneck shows itself. Fix that step — or spread the arrivals — and the queue shortens. Fix any other step, including the register with number-plate recognition, and it will not.**

A line of trucks on the road outside the gate is visible, irritating and usually blamed on the guard. It is rarely his fault. It is the result of two numbers: how many trucks arrive in the busiest hour, and how many the slowest part of the entry process can handle in that hour.

## The two numbers that decide the queue

**Arrival rate** — trucks arriving per hour, in the busiest hour, not the daily average. Twenty trucks a day spread over ten hours is two an hour; twenty trucks that all turn up between 9 and 10 am is a queue.

**Service time** — how long each step at the gate takes per truck, timed with a watch on real trucks:

- logging the vehicle and driver in the register;
- checking documents (invoice, delivery challan, gate pass);
- inspecting the vehicle or seal;
- weighing on the weighbridge, if inbound weighing is done at entry;
- waiting for a dock or a parking slot inside.

Each step has a **capacity**: 60 ÷ minutes per truck × number of people or machines doing it in parallel. The step with the lowest capacity is the bottleneck. If arrivals in the peak hour exceed that capacity, the queue grows by the difference every hour the peak lasts.

## The worksheet

Time ten or more trucks at each step during the peak, take the typical value, and fill in the table.

| Step | Minutes per truck (measured) | Parallel servers (guards, desks, weighbridges, docks) | Capacity per hour = 60 ÷ minutes × servers | Peak-hour arrivals | Shortfall = arrivals − capacity |
|---|---|---|---|---|---|
| Register / vehicle log | | | | | |
| Document check | | | | | |
| Vehicle or seal inspection | | | | | |
| Weighbridge (entry) | | | | | |
| Dock or yard slot | | | | | |

If two steps are done by the same guard one after the other, add their minutes and treat them as one step.

**Peak-hour checks before you trust the numbers:**

1. **Is the peak real or a habit?** Check the register for a week: do arrivals bunch at the shift start, after lunch, or when a particular transporter's convoy arrives?
2. **Is the slowest step the same every day?** A step that is quick on most days but slow when one supervisor is away is a staffing problem, not a process problem.
3. **Is the queue really at the gate?** If trucks enter quickly but then wait inside for a dock, the visible queue is a yard problem moved outside.
4. **What do exceptions cost?** One truck with missing paperwork that blocks the lane for twenty minutes can create a queue on its own. Is there a place to pull it aside?

## Illustrative example: fixing one step moves the bottleneck

**Illustrative example (hypothetical numbers).** Between 9 and 10 am, 20 trucks arrive at a single-lane gate.

| Step | Minutes per truck | Servers | Capacity per hour |
|---|---|---|---|
| Register + document check (one guard) | 5 | 1 | 60 ÷ 5 × 1 = 12 |
| Weighbridge | 4 | 1 | 60 ÷ 4 × 1 = 15 |

The bottleneck is the guard's combined register and document check: 12 per hour against 20 arrivals. After one hour the shortfall is 20 − 12 = 8 trucks waiting. The last of them waits roughly 8 × 5 = 40 minutes before the guard reaches it.

Now suppose number-plate recognition writes the vehicle log automatically and cuts the guard's combined time from 5 minutes to 3.5 minutes (only the logging part changes; the document check is still done by hand):

- Guard capacity: 60 ÷ 3.5 ≈ 17 per hour. Shortfall: 20 − 17 = 3.
- Weighbridge capacity is 15 per hour, so the weighbridge is now the bottleneck, with a shortfall of 20 − 15 = 5.

The queue shrinks from 8 to about 5 trucks after the peak hour — and any further work on the gate log achieves nothing until the weighbridge or the arrival pattern changes. If the transporters agree to spread their arrivals so that no more than 14 come in any one hour, both steps keep up without any new equipment.

**A caution on "just enough" capacity.** Trucks do not arrive at even intervals. Even when capacity is slightly above the average arrival rate, bunched arrivals produce queues. Aim for clear headroom at the bottleneck during the peak, not a match.

## The levers, in rough order of cost

1. **Spread arrivals.** Agree arrival slots with regular transporters; stagger dispatch and receipt times.
2. **Move work off the lane.** Let trucks enter a holding area and do the document check there, so the lane clears faster. This only works if there is space inside.
3. **Add a server at the peak.** A second guard or document desk for one hour a day may cost less than any system.
4. **Pre-collect information.** Ask transporters to share vehicle and document details before arrival so the guard checks rather than writes.
5. **Automate the log.** ANPR replaces handwriting the plate and builds a searchable record. Its effect on the queue depends on how much of the bottleneck step is logging.
6. **Add physical capacity.** A second lane or weighbridge — the most expensive option, and worth it only if the arithmetic says so.

## When ANPR is the wrong first purchase

If the slowest step is the weighbridge, the document check or the dock, ANPR will give you a better record but not a shorter queue. Buy it for the record — searching "which truck left with the material" — and judge it on that. If you want both, the gate must have a controlled lane where trucks slow down and a camera at plate height; truck plates are often dirty, painted or two-line, so test on your own trucks by day and night first. [When number-plate recognition works](/insights/anpr-number-plate-recognition-when-it-works) has a test protocol.

## Next step

Put your own peak-hour numbers into the [ANPR and vehicle logs calculator](/anpr-number-plate-recognition#scenario-C09), which subtracts the time a guard spends handling unread plates, or the [ANPR gate time calculator](/calculators/anpr-gate-time), which keeps theoretical gate capacity separate from real queue throughput. What ANPR does at a factory gate is covered on the [ANPR page](/anpr-number-plate-recognition).

If you would like the gate timed and the bottleneck identified on site, [ask for a site-specific assessment](/free-audit).
