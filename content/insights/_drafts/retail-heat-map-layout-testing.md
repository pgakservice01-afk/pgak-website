---
title: "Retail heat maps: turn movement data into a testable change"
metaTitle: "Retail heat map analytics: test a layout change properly"
date: "2026-10-08"
category: "Buying Guide"
excerpt: "A heat map shows where people walk and stand. It does not show what they buy. Use it to choose one layout change, then test that change against transactions, a comparison and a list of confounders."
metaDescription: "Retail heat maps suggest layout ideas but do not prove sales. Test one change against transactions, a comparison and a confounder log."
readTime: 8
draft: true
reviewStatus: "Awaiting PGAK engineer review. Heat-map analytics has no PGAK evidence record; the article says it can be evaluated per site. All numbers are labelled illustrative; no uplift is promised."
faqs:
  - q: "What does a retail heat map actually measure?"
    a: "Where people were detected in the camera's view, and for how long, added up over a period. It shows traffic and dwell. It does not show whether someone looked at a product, liked it or bought it, and fixtures, mirrors and crowding can distort it."
  - q: "How do I know whether a layout change increased sales?"
    a: "Change one thing, measure a transaction figure for that category per 100 visitors for several weeks before and after, and compare it with a category or branch you did not change. Record festivals, promotions, stock-outs and price changes in both periods. If the remaining difference is smaller than the normal week-to-week swing, the test is inconclusive and needs longer or a reversal."
  - q: "Should I value a layout change on sales or margin?"
    a: "On contribution margin: what each extra transaction adds after the cost of goods and other costs that rise with each sale. Using the sales value overstates what the change is worth."
---

**Straight answer: a heat map tells you where people walk and stand. It does not tell you what they buy. Its job is to suggest a change worth testing, such as a cold corner or a display nobody reaches. To know what the change is worth, move one thing and measure transactions for that category per 100 visitors, before and after. Compare against something you did not change, and write down every festival, promotion and stock-out in both periods. Value the difference you can attribute at contribution margin. If it is smaller than an ordinary week's swing, you have not proved anything yet.**

Heat maps are persuasive pictures. A red patch by the entrance and a blue patch at the back look like a diagnosis. Often they are just a description of how people move: in through the door, round the nearest fixtures, out. The useful question is narrower: *if we change this one thing, does anything we sell change with it?*

## What does a heat map actually measure?

A heat map adds up where people were detected in a camera view, and for how long. That gives you two useful signals:

- **Traffic.** Which parts of the floor people pass through, and which they never reach.
- **Dwell.** Where people stop. That could be a display, a mirror, a queue, or a pillar where someone waits for a friend.

What it does not measure: interest, intent or purchase. A long dwell by the trial rooms may be people waiting, not people choosing. A busy aisle may be a shortcut to the billing counter.

Camera position shapes the picture. An overhead or fisheye view gives the most even coverage. An angled wall camera sees the near floor in detail and the far floor barely at all, so the back of the shop looks colder than it is. Tall fixtures hide whatever is behind them. Before reading a heat map, mark on a floor plan what each camera can and cannot see.

Heat maps do not need to know who anyone is. They work on aggregated positions, which keeps the privacy footprint light.

## From picture to hypothesis

Turn what you see into one specific, testable statement:

- "Moving the premium shirts from the back wall to the table by the entrance will increase shirt transactions per 100 visitors."
- "Removing the promotional stand that blocks the left aisle will increase transactions in the home-goods section."

One change, one category, one measure. If you change three things at once, you will not know which one mattered.

## The controlled layout comparison

### What you need

- **A visitor count** for each week, from a people counter you have checked against a manual tally (see our [people counting article](/insights/people-counting-footfall-cctv)).
- **Transactions containing the test category**, from your billing system. Units sold works too. Do not use heat-map dwell as the result.
- **A control.** This is a category in the same shop that you are not changing, ideally in a similar price band, or the same category in a branch where nothing changes.
- **At least four weeks before and four weeks after**, with the same weekdays included.

### The confounder log

Record these for both periods, for the test and the control alike:

| Confounder | Example | Why it matters |
|---|---|---|
| Festival or season | Lohri, Baisakhi, Diwali, wedding season | Changes who visits and what they buy |
| Promotion or price change | 20% off the test category | Moves sales on its own |
| Stock-out or new stock | Sizes missing for a week | Caps transactions regardless of layout |
| Staffing | New salesperson on the floor | Changes conversion independently |
| Local events | Road works, a nearby shop opening | Changes footfall mix |
| Weather | Heavy rain, a heatwave | Changes who walks in |
| Counter changes | Camera moved, door changed | Breaks the visitor count |

If a confounder hits only one period, or only the test category, note it. You may need to extend the test.

### Illustrative example: moving a display in an apparel store

Round, hypothetical numbers to show the method. They are not a result from any store or product.

**Baseline, four weeks (2,000 visitors a week):**

| Week | Category X transactions | Per 100 visitors |
|---|---|---|
| 1 | 95 | 4.75 |
| 2 | 108 | 5.40 |
| 3 | 92 | 4.60 |
| 4 | 105 | 5.25 |
| **Total** | **400 of 8,000 visitors** | **5.00** |

**After the move, four weeks (2,100 visitors a week):**

| Week | Category X transactions | Per 100 visitors |
|---|---|---|
| 5 | 112 | 5.33 |
| 6 | 120 | 5.71 |
| 7 | 110 | 5.24 |
| 8 | 120 | 5.71 |
| **Total** | **462 of 8,400 visitors** | **5.50** |

**Control category Y**, not moved: 320 transactions in the baseline (4.00 per 100) and 353 after (4.20 per 100). So the store as a whole improved by 4.20 ÷ 4.00 = 1.05, or 5%, for reasons that had nothing to do with the display.

**Step 1: expected rate without the move.** 5.00 × 1.05 = 5.25 per 100 visitors.

**Step 2: difference you can attribute.** 5.50 − 5.25 = 0.25 per 100 visitors. That is half the raw before-and-after gain of 0.50.

**Step 3: extra transactions.** 0.25 × 8,400 ÷ 100 = 21 transactions over four weeks.

**Step 4: value at contribution margin.** Assume each category X transaction adds ₹200 after the cost of goods and other direct costs. That is 21 × ₹200 = **₹4,200 over four weeks**. Subtract the one-off cost of the move: fixture, labour, any lost sales while it was done.

**Step 5: is it real?** In the baseline, the weekly rate ranged from 4.60 to 5.40. That is a swing of 0.80 per 100 visitors between weeks with no change at all. The attributable difference of 0.25 is well inside that swing. **This test is inconclusive.** The display may have helped, or the four weeks may have been lucky. The honest next step is either:

- **extend** both periods to eight weeks, or
- **reverse the change** for four weeks. If the rate falls back towards the control's path, that is much stronger evidence than any single before-and-after.

A heat map would have shown more people at the new display position. That is very likely whenever a display moves to the entrance. It would not have told you any of the above.

## When are heat maps not worth it?

- **Small floors** where the owner sees every customer. Walk the floor at busy times and note where people stop.
- **No transaction data by category.** Without it, you can measure movement but never value.
- **No one to make and test changes.** A heat map reviewed once and filed is an expense, not an insight.
- **Frequent confounders.** A shop that runs back-to-back promotions may never get a clean comparison. Test during the quietest month instead.

## Next step

The [heat map and queue calculator](/features/guides/queue-analytics#scenario-C12) uses the same structure as this test: visitors × change in conversion × contribution margin per sale × the share of the change you attribute to the layout. Use the share from your control comparison, not a guess. The [retail contribution calculator](/calculators/retail-contribution) adds your extra costs. Both report a scenario, not a forecast. The [queue analytics guide](/features/guides/queue-analytics) covers camera views for waiting and dwell areas.

Heat-map analytics can be evaluated on compatible cameras you already own. Processing runs on a unit on site, and anything extra is itemised in the quote. If you have the transaction data and a change in mind, [ask for a site-specific assessment](/free-audit) of whether your camera views can support the test.
