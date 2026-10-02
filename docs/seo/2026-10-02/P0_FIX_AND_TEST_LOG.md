# P0 — lead delivery and security: findings and verification

Verified 2026-10-02 against **production** (`https://www.pgak.co.in`, `sc-domain:pgak.co.in`).
Nothing below is inferred from a preview deployment, a branch, or an earlier report.

## P0.1 — Lead delivery

### The live state, read from production today

`GET https://www.pgak.co.in/api/leads` (booleans only; no secret values are exposed by
this endpoint or reproduced here):

| Field | Value | Meaning |
|---|---|---|
| `erp` | `true` | ERP relay configured |
| `notify` / `newLeadAlerts` | `true` | Telegram alerting configured |
| `mode` | `"erp only"` | the only durable destination is the ERP |
| **`register`** | **`false`** | **master sheet + both internal emails are NOT running** |
| `registerDetail.urlSet` | `false` | `LEAD_REGISTER_URL` absent in Production |
| `registerDetail.secretSet` | `false` | `LEAD_REGISTER_SECRET` absent in Production |
| **`durableIntake`** | **`false`** | no durable intake store; ERP is a single point of failure |
| `env` | `"production"` | this is the live environment, not preview |

The endpoint's own `nextAction` says: set both variables in Vercel (Production) **and
redeploy** — environment variables do not apply to an existing deployment.

### What this means, stated precisely

An enquiry submitted today reaches the **ERP** and fires a **Telegram alert**. It does
**not** produce a row in *PGAK — Master Leads*, and it does **not** send the internal
notification to `director@securedengineers.com` or `mittaladitya18@gmail.com`.

This has been the case since the register shipped on 2026-09-23 — nine days. It explains
the handoff's observation that the sheet holds three TEST rows dated 23 September and no
customer records: the sheet is not broken, it is **never written to**.

It is **not** correct to conclude that leads are being lost outright. The ERP path is
configured and reports healthy. What is lost is the sheet record, the internal email
notification, and the owner/status tracking that depends on them.

### Code state — already fixed, already on main

The Apps Script defect (the duplicate branch answering a hardcoded
`'already sent'` for both recipients without reading the row, so a failed send could
never be recovered) is **already merged to `main`**:

- `integrations/pgak-leads-appsscript.gs` on `main` contains `mailSettled_` and reads
  per-recipient cells;
- `npm run test:appsscript` — **7 tests, 7 pass, 0 fail** on `main` today.

Branch `fix/lead-register-recovery` is therefore **superseded**: `git diff main
origin/fix/lead-register-recovery -- integrations/pgak-leads-appsscript.gs` is empty. It
is 1 commit ahead, 78 behind, and no pull request was ever opened for it. It should be
deleted, not merged. This is the second stale branch found this week with that exact
shape — the first was `feat/ai-citability`, closed as superseded in #67.

### Acceptance gate — NOT PASSED, and why

| Destination | State | Evidence |
|---|---|---|
| ERP | configured | `erp: true`, `mode: "erp only"` |
| Telegram alert | configured | `newLeadAlerts: true` |
| Master sheet row | **NOT RUNNING** | `register: false`, `urlSet: false` |
| `director@securedengineers.com` | **NOT RUNNING** | depends on register |
| `mittaladitya18@gmail.com` | **NOT RUNNING** | depends on register |
| Durable intake store | **NOT CONFIGURED** | `durableIntake: false` |

**No end-to-end TEST submission was performed.** Submitting one would write to the live
ERP and ping the owner's Telegram, and with `register: false` already proven by the
endpoint it would not establish anything new about the two broken destinations. It is
worth doing **after** the variables are set, as the acceptance test for the fix — not
before it as a demonstration of a failure already evidenced.

### BLOCKED — exact missing permission

| Blocker | Affected task | Owner |
|---|---|---|
| No Vercel API token / `vercel` CLI auth in this environment | Setting `LEAD_REGISTER_URL` and `LEAD_REGISTER_SECRET` in the Production environment of project `pgak-website`, then redeploying | Owner |
| Same | Reading Vercel runtime logs (`ai-crawl`, `LEAD_REGISTER_SKIPPED`) | Owner |

Until those two variables are set **and a redeploy follows**, every destination that
depends on the register stays NOT VERIFIED. No code change can substitute for them.

## P0.2 — Security and residual spam exposure

### Google's own verdicts, read today

| Panel | Result |
|---|---|
| Search Console → **Manual actions** | **No issues detected** |
| Search Console → **Security issues** | **No issues detected** |

There is no penalty and no evidence of an active compromise. The handoff's caution
against assuming one was correct.

### Residual index pollution — correctly handled already

Legacy WordPress spam (casino/gambling paths in several languages, `/items/` product
URLs) remains **in Google's index** but is already serving the right removal signal:

| Sample URL | Chain | Final |
|---|---|---|
| `pgak.co.in/best-litecoin-casinos/` | 308 → www | **410 Gone** |
| `pgak.co.in/items/A132370202/` | 308 → www | **410 Gone** |
| `pgak.co.in/career-page/` | 308 → www → 301 | **200** `/about` |
| `pgak.co.in/category/news/` | 308 → www → 301 | **200** `/insights` |
| `http://www.pgak.co.in/` | 308 | **200** `https://www.pgak.co.in/` |

This is the correct split: unwanted content returns 410, legitimate historical URLs are
redirected to the real equivalent rather than dumped on the homepage.

### Supporting checks

- `sitemap.xml`: **206 URLs, 0 spam/legacy entries, 0 non-www or http entries.**
- `robots.txt` does **not** disallow the spam paths, so Googlebot can observe the 410.
  (Blocking them would have frozen them in the index — the brief's warning applies and
  the current file already avoids the trap.)
- Canonical on a money page resolves to the www host: `https://www.pgak.co.in/pricing`.

### Verdict

**P0.2 — FIXED AND VERIFIED** at the response and sitemap layer. The remaining work is
Google's recrawl, which is time, not a task. No disavow, no deletion of valid content,
and no penalty claim is warranted.

## Status summary

| Item | Status |
|---|---|
| Apps Script recovery fix | **FIXED AND VERIFIED** (on main, 7/7 tests) |
| Spam / legacy URL handling | **FIXED AND VERIFIED** (410 + 301 split, clean sitemap) |
| Manual actions / security | **VERIFIED CLEAN** (Google: no issues detected) |
| Master sheet + 2 internal emails | **BLOCKED** — Vercel Production variables absent |
| Durable intake store | **BLOCKED** — not configured |
| End-to-end TEST submission | **PLANNED** — run as the acceptance test after the unblock |
| `fix/lead-register-recovery` | **SUPERSEDED** — delete, do not merge |
