# ROI calculator: the eleven findings, checked against source

Checked 23 September 2026 against `main` @ `e58b385` (the audit referenced `a3408f4`; it has moved on two commits). Files read: `app/roi-calculator/page.tsx`, `components/sections/RoiCalculator.tsx`, `components/Nav.tsx`, `app/globals.css`, `app/page.tsx`, `lib/analytics.ts`, `lib/fbpixel.ts`, `lib/lead-client.ts`, `lib/leadRegister.ts`.

| # | Finding | Verdict | Evidence in the old code | Fix |
|---|---|---|---|---|
| 1 | Hardcoded attendance/recovery/payroll assumptions presented as the visitor's own result | **Reproduced** | `const A = { lateMinutesPerDay, timeRecovery {careful 0.4, likely 0.65}, proxyPayrollShare {0.004, 0.012}, lossRecovery {0.15, 0.3}, admin.hoursPerCamera 0.4, guardMonthlyCost, guardRecovery {0.5, 0.85} }` — applied to payroll the visitor entered | Rebuilt: every benefit is a line the visitor switches on, labels and values. The engine holds no recovery rate at all |
| 2 | Zero upfront cost, incomplete operating costs | **Reproduced** | `installOneTime: 0`; `monthlyCost = cameras × pricePerCamera` only | Upfront and monthly operating cost are inputs, each with an explicit "Not known" |
| 3 | Benefit/cost multiple labelled "Return", no ROI% | **Reproduced** | `<Stat label="Return" value={multiple}×>`, `multiple = recovered ÷ monthlyCost` | ROI% and benefit/cost ratio are separate, named, defined on screen |
| 4 | Negative result hid the chart and nudged for bigger benefits | **Reproduced** | Chart rendered only in the `r.profitable` branch; `nextLever` = "Try the loss slider. Most sites underestimate what they quietly write off" | Chart and month table always render; the nudge is gone |
| 5 | Meta "Lead" fired on a WhatsApp click | **Reproduced** | `fbTrack("Lead", …)` inside `onSend()` | No Meta event from the calculator at all. A confirmed lead still comes only from the existing deduplicated server-confirmed path |
| 6 | Hypothetical saving used as ad event value | **Reproduced** | `value: Math.max(0, Math.round(r.net))` | Removed |
| 7 | Confidential scenario figures sent to analytics | **Reproduced** | `trackConversion("roi_whatsapp_send", { segment, staff, cameras, monthly_net, mode })` | Only `calculator_id` and `formula_version` are sent, on print |
| 8 | Sliders without numeric entry | **Reproduced** | `Slider` used `type="range"`; only the price box was `type="number"` | Every input is a number field with units; a slider is optional beside it |
| 9 | Hover-dependent chart values | **Reproduced** | month value in a `group-hover:block` tooltip | Values are in a month-by-month table; the chart has an accessible description |
| 10 | Low-contrast token combinations | **Reproduced (measured)** | dark `ink-faint` 4.01:1 on panel; light `ink-faint` 3.82:1; light `accent` text 3.53:1 | Tokens corrected; see STATUS.md |
| 11 | No calculator discovery in navigation | **Reproduced** | `links` in `Nav.tsx` had Solutions, Features, Pricing, Insights, Company | "Calculators" added to primary navigation, hub at `/calculators` |

Nothing was patched blind: each line above was read in the current source before being changed.
