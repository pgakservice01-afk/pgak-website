---
title: "Search CCTV by description: evaluate natural-language footage search"
metaTitle: "Natural language video search: how to test it"
date: "2026-10-08"
category: "Buying Guide"
excerpt: "Typing “white van near the gate” instead of scrubbing four cameras sounds like a clear win. Whether it is one on your site depends on what the search misses — and you only find that out with a list of right answers made before you search."
metaDescription: "Test natural-language CCTV search on your own footage: build a ground-truth list first, run everyday queries, count misses and checking time."
readTime: 8
draft: true
reviewStatus: "Awaiting PGAK engineer review. No PGAK evidence record exists for natural-language search; the article is written as a buyer evaluation guide only. Engineer to confirm that the supply wording (PGAK software, licensed module or integration, confirmed per site) matches what PGAK can actually offer."
faqs:
  - q: "Can I search all my old CCTV recordings by description?"
    a: "Only if the platform has indexed those recordings. Ask which cameras are indexed, from what date, whether recordings made before installation can be imported, and how long the index is kept. Footage that the recorder has already overwritten cannot be searched by anything."
  - q: "Does natural-language CCTV search work at night?"
    a: "Test it separately. Many cameras switch to infrared at night and record in black and white, so a search for a red jacket or a blue truck has no colour to match. Shape, vehicle type and location may still work. Run your night queries as their own set and score them on their own."
  - q: "How do I know if the search missed something?"
    a: "Only by comparing it with a list of right answers made before the search was run. Someone watches a fixed stretch of footage and logs every occurrence of the things you will search for; the search is then scored against that list. Without it you can see wrong results, but never the right ones it failed to return."
---

**Straight answer: natural-language search lets an operator type a description — “white pickup at the main gate”, “person carrying a carton near bay 2” — and get back candidate clips instead of scrubbing through each camera. Whether it saves time on your site depends on two things you can measure before buying: how many of the real occurrences it actually returns, and how long your staff spend checking what it does return. Measure both on your own footage, against a list of right answers written down before anyone runs a search.**

A demonstration always finds the thing being demonstrated. The useful question is what happens with your cameras, your lighting and the way your supervisors actually describe things — and above all, what the search silently leaves out.

## What does natural-language search actually do?

The software analyses recorded video in advance and builds an index — a searchable record of what appeared where and when: people, vehicles, objects, sometimes colours and actions. When someone types a description, the system compares it with that index and returns the clips it rates as closest.

Three consequences follow, and each one is a question for the supplier:

- **It can only search what was indexed.** Ask which cameras are indexed, from what date, and whether footage recorded before installation can be imported. The [feature guide](/features/guides/natural-language-search) covers this in brief.
- **It can only find what the camera captured.** A person three pixels tall at the far end of a yard cannot be described usefully by any software. If the recording is too poor to identify a van by eye, the search will not do better.
- **Every result is a candidate.** A convincing match can still be the wrong vehicle. Someone has to open the clip and check it, and that checking time belongs in your calculation.

Where the indexing runs matters too. Indexing on an on-site processing unit keeps video on your premises but needs processing capacity for every indexed camera; indexing in the cloud needs upload bandwidth your site may not have. Either way, which cameras and how many is confirmed per site, not assumed.

## What has to be in place before a fair test?

- **Permission to use the footage.** Use recordings you are entitled to review for this purpose, and keep the test footage under the same access rules as any other recording.
- **Correct recorder clocks.** If a camera's clock has drifted, your list of right answers and the search results will disagree about times. Check the clock on every test camera first.
- **Retention long enough to cover the test window.** If you are not sure how many days your recorder really keeps, the [storage article](/insights/cctv-storage-how-many-days) shows how to check.
- **A small, honest sample of cameras.** Four to six cameras that cover places you actually investigate — the gate, the dispatch area, a store room — not the clearest camera on site.

## The ground-truth retrieval benchmark

This is the test. Preparing it can take one person most of a working day, and it tells you more than any brochure.

### Step 1: fix the test window

Choose one or two days of recording from your four to six test cameras. Include at least one night. Write down the cameras, the start and end times, and the recorder clock check.

### Step 2: write the right answers first

Before the search tool is used at all, someone who has not seen its results watches the window and logs every occurrence of the things you plan to search for. One line per occurrence:

| # | Camera | Start time | End time | What appears (in plain words) | Day / night |
|---|---|---|---|---|---|
| 1 | Gate 1 | 09:42 | 09:44 | White pickup enters, two people in cab | Day |
| 2 | Bay 2 | 10:15 | 10:16 | Person in red jacket carries one carton | Day |
| 3 | Gate 1 | 22:05 | 22:06 | Motorcycle, one rider, leaves | Night (IR) |

This list is the ground truth. It is slow to build, and it is the only thing that lets you count misses.

### Step 3: write queries the way your staff talk

Write 10 to 15 queries. Mix the types below, and phrase them as your supervisors would — including the words they really use. If your team would naturally type in Hindi or Punjabi, or use local names for vehicles, include those queries and ask the supplier in writing which languages and terms are supported.

| Query type | Example | What it tests |
|---|---|---|
| Object plus colour | “red jacket near bay 2” | Attribute matching; fails under IR at night |
| Vehicle type | “pickup at gate 1” | Vehicle classes on your site |
| Local term | “tempo at the gate” | Whether everyday vocabulary is understood |
| Action | “person carrying a carton” | Actions, not just objects |
| Location and time | “anyone at the store room door after 9 pm” | Zone and time filtering |
| Compound | “two people and a white van at dispatch” | Several conditions at once |
| Negative | “motorcycle inside the warehouse” (none occurred) | Whether it says “nothing found” or offers near misses |

### Step 4: run each query and score the top 20

For each query, look at the first 20 results — or fewer, if fewer come back. Mark each result as a match or not against the ground truth, and list every ground-truth occurrence that did not appear.

| Query | Ground-truth occurrences | Correct in top 20 | Missed (list #) | Wrong results in top 20 | Minutes to first correct result | Why missed |
|---|---|---|---|---|---|---|
| | | | | | | |

Two figures come out of each row:

- **Found share** = correct results ÷ ground-truth occurrences. This is what tells you how often an investigation will still end in a manual search.
- **Checking load** = wrong results your operator had to open and reject before finishing.

**Illustrative example** (hypothetical numbers): for “red jacket near bay 2” the ground truth lists 5 occurrences. The top 20 results contain 3 of them and 17 wrong clips. Found share = 3 ÷ 5 = 60%. The operator opened 20 clips to find 3. The two misses were both at night, under infrared — a colour query with no colour to match.

### Step 5: sort the misses by cause

Misses are more useful than hits, because they tell you what to fix or what not to rely on. Typical causes to record:

- subject too small or too far away in the frame;
- night or infrared footage with no colour;
- partly hidden behind a vehicle, rack or another person;
- vocabulary the system did not understand;
- camera or time period not in the index.

The first two are camera problems and no software fixes them. The last two are supplier questions with yes-or-no answers.

## How do you turn the result into staff time?

Use the found share honestly. When the search misses, the investigation does not stop — someone falls back to manual scrubbing. So the realistic time per case is:

assisted minutes per case = search time + checking time + (1 − found share) × manual search time

**Illustrative example** (hypothetical numbers): 10 investigations a month; a manual search takes 60 minutes; the assisted search takes 10 minutes plus 10 minutes of checking; the benchmark found share is 0.6.

- Assisted time per case = 10 + 10 + (1 − 0.6) × 60 = 10 + 10 + 24 = 44 minutes
- Saving per case = 60 − 44 = 16 minutes
- Saving per month = 10 × 16 = 160 minutes ≈ 2.7 hours

Had you ignored the misses, the same inputs would suggest 10 × (60 − 10 − 10) = 400 minutes, about 6.7 hours — more than double. That gap is the reason for the benchmark. When you use the calculator below, enter the assisted minutes with the fallback already included.

Those hours are staff capacity, not cash, unless overtime stops or a post goes unfilled. The [investigation time calculator](/calculators/investigation-time) keeps the two apart.

## Where natural-language search is the wrong buy

- **You investigate rarely.** Two incidents a month at 30 minutes each is one hour; fixing retention and clocks may matter more. The [day-after-a-theft checklist](/insights/what-to-do-day-after-a-theft) covers what to do first.
- **Your cameras cannot show detail.** If a person at the gate cannot be described by eye from the recording, start with camera placement — see [where to place cameras for AI detection](/insights/where-to-place-cctv-cameras-for-ai-detection).
- **Searching people by description becomes routine monitoring of staff.** A search tool used on employees is processing their personal data. Limit who can search, log every search, and keep it tied to a stated purpose; the [DPDP article](/insights/is-ai-cctv-legal-in-india-dpdp-act) sets out the questions to ask. A search result is a lead for review, never by itself grounds for action against a person.

## Next step

Put your own benchmark figures into the [natural-language search calculator](/features/guides/natural-language-search#scenario-C01). For a fuller pilot worksheet that applies to any analytics, see the [evaluation method](/resources/evaluation-method).

Natural-language search is an industry capability that PGAK can evaluate at your site; whether it would be supplied as PGAK software, a licensed module or an integration, and which cameras it can index, is confirmed per site, with anything extra itemised in the quote. If you would like it scored on your own recordings rather than a demonstration clip, [ask for a site-specific assessment](/free-audit).
