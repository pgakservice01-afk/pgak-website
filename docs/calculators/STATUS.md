# Calculators — status record (23 September 2026)

Branch `feat/calculator-platform`, cut from `main` @ `e58b385`. **Not deployed**: this needs your approval.

Labels: **Implemented** · **Tested locally** · **Production verified** · **Blocked** · **Awaiting approval**

## The twelve

| # | Calculator | Route | Capability | Status |
|---|---|---|---|---|
| 1 | ROI, payback, break-even budget | `/roi-calculator` (URL preserved) | verified | Implemented · Tested locally |
| 2 | Retrofit vs replacement TCO | `/calculators/retrofit-vs-replacement` | assessment-required | Implemented · Tested locally |
| 3 | Storage and retention | `/calculators/cctv-storage` | educational | Implemented · Tested locally |
| 4 | Bandwidth and cloud/edge cost | `/calculators/bandwidth-and-cloud-cost` | assessment-required | Implemented · Tested locally |
| 5 | Inventory / shrinkage reduction | — | assessment-required | Specified in `lib/calc/registry.ts`, **not published** |
| 6 | Investigation time released | — | verified | Specified, not published |
| 7 | Attendance administration | — | verified | Specified, not published |
| 8 | False-alarm handling cost | — | verified | Specified, not published |
| 9 | Multi-site travel avoided | — | verified | Specified, not published |
| 10 | ANPR gate processing | — | verified | Specified, not published |
| 11 | Retail conversion contribution | — | educational | Specified, not published |
| 12 | Electricity running cost | — | educational | Specified, not published |

Batch one is 1–4 plus the hub and navigation entry, as briefed. The remaining eight have registry records (question, inputs, method, limits, capability, related page, CTA) and **no placeholder pages** — the hub lists them as "in progress".

## Engine

`lib/calc/engine.ts`, formula version **1.0.0**, pure functions, no React. Rules it enforces:

- **Unknown is not zero.** A `null` cost makes ROI and the benefit/cost ratio `null`, never a flattering number.
- **Four benefit kinds**: cash, contribution, capacity, scenario. Only cash enters net cash flow; capacity becomes cash only when the visitor states a mechanism.
- **Ids de-duplicate**: the same benefit or cost cannot be counted twice.
- **Division guarded**: zero total cost returns `null`, not infinity.
- **Adverse results are returned in full**, including the whole cumulative series.

Monthly net cash = cash benefits − incremental operating costs.
Cumulative = −upfront + cumulative net cash.
ROI% = 100 × horizon net benefit ÷ total horizon cost.
Benefit/cost = horizon benefits ÷ total horizon cost.

## Tests — 16, all passing (`npm run test:calc`)

Your three fixtures, verified in the engine **and** in the running app:

| Fixture | Expected | Engine | App (browser) |
|---|---|---|---|
| ₹30,000 upfront, ₹10,000 benefit, ₹4,000 opex, 12 months | net ₹42,000, ROI 53.846%, payback month 5 | ✓ (53.85 to 2 dp) | ✓ net ₹6,000/mo, ROI 53.85%, Month 5, ₹42,000 |
| 16 cameras × 2 Mbps × 24 h × 30 days | 10.368 TB; 12.96 TB at 80% usable, before RAID | ✓ | ✓ |
| 20 investigations, 90 → 30 min, ₹500/h | 20 hours, ₹10,000 capacity, **not** cash | ✓ | ✓ (cash only with a stated mechanism) |

Also covered: unknown costs, zero values, adverse results, equal TCO options, invalid percentages, large inputs, Indian formatting, duplicate ids, headroom excluded from transferred data, and formula version on every result.

## Accessibility — axe-core 4.10.2, run in-browser

| Page | Violations |
|---|---|
| `/roi-calculator` | 1 → **0** |
| `/calculators/cctv-storage` | 0 |
| `/calculators` | 0 |

The one violation was WCAG 2.2 **2.5.8 target size**: the range thumb was 18 px. Sliders are now 24 px and remain optional beside a numeric field.

**Contrast, measured not rounded** (`app/globals.css`):

| Token | Before | After |
|---|---|---|
| dark `ink-faint` on panel | 4.01:1 ✗ | 5.28:1 ✓ |
| light `ink-faint` on panel | 3.82:1 ✗ | 6.20:1 ✓ |
| light `accent` as text | 3.53:1 ✗ | new `accent-text` token, 7.25:1 ✓ |

## Rollback

Revert the PR. The only URL change is `/ai-surveillance-system` → `/video-analytics-software` (permanent), which reverting restores.
