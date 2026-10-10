# Allowable cost per lead and a paid-search draft (10 Oct 2026)

**Status: hypothesis and draft only.**
- No campaign, budget, audience or conversion upload is created or authorised by this file.
- Paid search comes after lead delivery is proven (`01-lead-states.md` §7) and after the sales handoff has a named owner (`12-sales-handoff.md` §2).

## 1. The ceiling

```
allowable cost per QUALIFIED lead
  = contribution per won project × qualified-lead-to-win rate × acquisition allocation
```

**Brief's example only, not PGAK data:**
- INR 60,000 contribution × 20% win rate × 25% allocation
- = **INR 3,000 per qualified lead**

Cost per **enquiry** is a separate number:

```
allowable cost per enquiry = allowable cost per qualified lead × qualified fraction of enquiries
```

For example, if 40% of paid enquiries qualify: 3,000 × 0.4 = INR 1,200 per enquiry. Do not mix the two numbers.

| Input | Value | Source needed |
|---|---|---|
| Contribution per won project (after hardware, installation and support cost) | **[owner]** | Last 10 won projects |
| Qualified-to-won rate | **[owner]** | ERP stages (`12-sales-handoff.md`) |
| Acquisition allocation | **[owner]** | Business decision |
| Qualified fraction of enquiries | **[measured]** | 4+ weeks of qualification records |

## 2. Draft campaign plan (for later review)

| Element | Draft |
|---|---|
| Queries | Narrow commercial matches only: "ANPR camera for factory gate", "AI CCTV for warehouse", "video analytics software India", "AI CCTV Ludhiana", "upgrade existing CCTV with AI". Keyword Planner ranges (India, Sep 2025–Aug 2026) are broad estimates, not forecasts. |
| Geography | Only where PGAK can service: Punjab first, then the owner-confirmed list. No national broad match. |
| Landing pages | The existing canonical routes in `09-route-component-map.md`. No ad-only pages. |
| Negative intent | jobs, salary, course, training, free download, PDF, login, government portal, DIY, "how to install" (review the search-term report weekly) |
| Do **not** exclude | Attendance questions in general: some are real buyers |
| Optimise for | Qualified leads imported from the ERP, once the `ref` join exists. Not raw form fills, not WhatsApp clicks. |
| First test | Small, fixed budget, one geography and one task (gate/ANPR or warehouse), 4 full weeks, judged against §1 |

**Ads cannot fix organic visibility.** The 10 Oct AI-visibility run found the site absent from Bing entirely. Bing Webmaster Tools comes before any paid spend, because it also gates ChatGPT search and Copilot.
