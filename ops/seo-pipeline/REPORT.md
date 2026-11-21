# One daily report from two parts

Every Monday–Saturday the pipeline runs in two parts, and the owner gets **one** email covering both.

| Part | Runs | Does |
|---|---|---|
| **cloud** | Claude cloud routine "PGAK daily SEO pipeline", 10:15 IST (`RUNBOOK.md`) | new posts, covers, IndexNow, site health |
| **Mac** | Claude desktop scheduled task on the owner's Mac, 06:00 IST or as soon as the Mac is on after that (`~/pgak-seo-pipeline/MAC_RUNBOOK.md` on the Mac) | Search Console data and index status, Google "Request indexing", Trends / Keyword Planner / AnswerThePublic research, Google Business Profile, Codex cover-library refill |
| **sweep** | Claude cloud routine "PGAK SEO report sweep", 20:30 IST | sends the report if a part did not run |

The parts pass data through **Gmail drafts** in pgak.service01@gmail.com (Gmail connector). The drafts are never sent, hold only the JSON described here, and are deleted once used.

## Names

`D` = today's date in IST as `YYYYMMDD` (e.g. `20261123`). `<Day DD Mon>` = e.g. `Mon 23 Nov`.

| Draft subject (exact) | Written by | Body (plain text, JSON only) |
|---|---|---|
| `PGAKPIPECLOUD <D> pipeline data, deleted automatically` | cloud | cloud part JSON |
| `PGAKPIPEMAC <D> pipeline data, deleted automatically` | Mac | Mac part JSON |
| `PGAKPIPETOPICS <D> pipeline data, deleted automatically` | Mac | topic queue JSON for the cloud's next post run |

Every draft is addressed to pgak.service01@gmail.com, with the JSON in `body` (no `htmlBody`).

Report email: subject `PGAK SEO · <Day DD Mon> · <n> posts live · <a> IndexNow · <b> Google requests · <✅ all OK | ⚠️ needs attention>`; the last line of its body is `Report ID: PGAKSEO<D>`.

Gmail tools: `create_draft`, `list_drafts`, `get_draft`, `delete_draft`, `send_message`, `search_threads` (load them with one ToolSearch call).

**Finding a draft:** `list_drafts` with view `DRAFT_VIEW_FULL` and query `subject:PGAKPIPECLOUD subject:<D>` (or `subject:PGAKPIPEMAC subject:<D>`; for topics of any date `subject:PGAKPIPETOPICS`); keep only drafts whose subject starts with exactly the expected text (`PGAKPIPECLOUD <D> `…); parse `plaintextBody` as JSON. If the query returns nothing, try once more with the plain-text query `PGAKPIPECLOUD <D>` (or `PGAKPIPEMAC <D>`, `PGAKPIPETOPICS`) before concluding there is none. Never list drafts without one of these queries: the mailbox holds the owner's own drafts, which the pipeline must not read.

**Was today's report sent?** `search_threads` query `in:sent PGAKSEO<D>`. Any match means yes.

## Part JSON

Fill in what you have. Use `null` for anything you do not know; never guess a number.

Cloud part:
```json
{"part": "cloud", "date": "2026-11-23", "finished": "10:58 IST",
 "preflight": "OK",
 "posts": [{"title": "…", "url": "https://www.pgak.co.in/insights/…", "state": "public URL verified", "cover": "library:warehouse-loading-bay-dusk"}],
 "posts_by_others_today": 0,
 "indexnow": {"urls": 10, "http": "200"},
 "lighthouse_mobile": {"home": 92, "insights": 95, "newest": 90},
 "broken_links": 0,
 "issues": ["one line each, at most 3"],
 "sources": {"worked": ["autocomplete", "Trends RSS", "WebSearch", "Mac topic queue"], "unavailable": ["… (reason)"]},
 "library_left": 27,
 "attention": ["one line each, with the fix"]}
```
`preflight` is `"OK"` or `"FAIL: <reason>"`. A post's `state` is one of `public URL verified`, `deploy succeeded`, `deploy pending`, `committed`, `dropped: <reason>`; `cover` is `library:<photo id>` or `diagram`.

Mac part:
```json
{"part": "mac", "date": "2026-11-23", "finished": "07:20 IST",
 "preflight": "OK",
 "search_console": {"clicks_7d": 12, "clicks_prev_7d": 9, "impressions_7d": 840, "impressions_prev_7d": 700, "note": "latest day partial", "top_queries": ["cctv attendance system (120 impr, pos 14)"]},
 "index_status": {"inspected": 20, "indexed": 13, "not_indexed": ["/insights/… — Discovered, currently not indexed"], "rich_result_issues": 0},
 "sitemap": {"last_read": "2026-11-22", "errors": 0, "warnings": 0},
 "google_requests": {"done": 10, "urls": ["…"], "skipped": null},
 "research": {"worked": ["Search Console", "Google Trends (browser)"], "unavailable": ["Keyword Planner (not signed in)"]},
 "topics_queued": 5,
 "gbp": "posted an update linking /insights/…",
 "library_refill": "not needed (21 left)",
 "attention": ["one line each, with the fix"]}
```
`google_requests.skipped` is `null` or the reason (e.g. `"Chrome not connected"`). `gbp` is `"posted an update linking …"`, `"not Monday"` or `"unavailable (<reason>)"`. `library_refill` is `"not needed (<n> left)"`, `"added <n> photos (now <m>)"` or `"failed (<reason>)"`.

Topic queue:
```json
{"date": "2026-11-23",
 "topics": [{"title": "…", "keyword": "…", "intent": "guide | checklist | comparison | how-to",
             "why": "Search Console: 140 impressions at position 14 in 28 days, no post targets it; Keyword Planner: 1K–10K a month",
             "sources": ["Search Console", "Keyword Planner"]}]}
```

## Hand-off: at the end of the cloud part and of the Mac part

1. Delete any draft with your own subject for today (`PGAKPIPECLOUD <D>` or `PGAKPIPEMAC <D>`), then create yours.
2. Look for the other part's draft for today, and check whether today's report was sent.
3. Then exactly one of:
   - **Other part's draft found, report not sent** → re-check once that no report has gone out, send the consolidated report (below) built from both JSONs, then delete both part drafts.
   - **Report already sent today** (the sweep sent it without you) → send a short late addendum with only your part: subject `PGAK SEO · <Day DD Mon> · late <cloud|Mac> part · <✅|⚠️>`, the same sections, last line `Report ID: PGAKSEOLATE<D>`. Delete your draft.
   - **Otherwise** → leave your draft. The other part, or the 20:30 sweep, will send the report.
4. If a Gmail call fails, retry once. If your draft cannot be saved, email your part on its own instead (subject `PGAK SEO · <Day DD Mon> · <cloud|Mac> part only · ⚠️`) so nothing is lost.

## Sweep (20:30 IST, Monday–Saturday, cloud)

1. Sunday in IST → end.
2. Today's report already sent → delete any part drafts left for today (normally none) and end.
3. One or both part drafts exist → send the consolidated report from what exists, marked ⚠️. For a missing part, say in its sections:
   - cloud missing: "Cloud run did not report today. Open https://claude.ai/code/routines/trig_01SDs9aEzeUwvCWGWaG8Du4j and look at the latest run."
   - Mac missing: "The Mac part has not run today (Mac off or Claude app closed). It runs as soon as the Mac is on and sends a short late report."
   Then delete the part drafts you used.
4. No drafts and no report → send `PGAK SEO · <Day DD Mon> · ⚠️ nothing ran today` with both lines above and `Report ID: PGAKSEO<D>`.

Never delete `PGAKPIPETOPICS` drafts in the sweep, and never change the repository.

## Consolidated report

Send with `send_message` to pgak.service01@gmail.com, with `htmlBody` and a plain-text `body`. It must be readable in 30 seconds: short bullets, no fluff, nothing the JSON does not say.

Subject numbers: `n` = posts in state `public URL verified`; `a` = `indexnow.urls` if `http` was 200 or 202, else 0; `b` = `google_requests.done`. Use ✅ only if both parts ran, neither has `attention` items, and every post reached `public URL verified` (or no post was due).

Sections, in this order:
1. **Blogs** — each post: linked title → state; cover (photo id or diagram). If none was due: "0 written — 3 already published today by someone else".
2. **Indexing** — IndexNow: a URLs (HTTP …). Google "Request indexing": b done, or skipped (reason). Index status: indexed of inspected, with up to 3 not-indexed examples. Sitemap last read by Google.
3. **Search Console (last 7 days vs the 7 before)** — clicks and impressions with the change; top query; "latest day partial" if noted.
4. **Research** — sources that worked and that were unavailable (both parts, one line); topics queued for the next run.
5. **Site health** — Lighthouse mobile performance home / insights / newest; broken links; top issues.
6. **Google Business Profile** — the `gbp` line.
7. **Cover library** — photos left; refill status.
8. **Needs your attention** — the merged `attention` items, one line each with the fix. Leave the section out if there are none.

Last line: `Report ID: PGAKSEO<D>`.
