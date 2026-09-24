# Feature collection release — 24 September 2026

Branch `feat/feature-collection`, cut from `931ce89`. Built and tested locally.
**Not deployed.**

---

## 1. Audit first: what already existed

The site was not empty here, and most of this release is upgrading rather than
adding.

| Collection | Where | Count |
| --- | --- | --- |
| Capability pages | `lib/capabilities.ts` → `/features/[capability]` | 6 |
| Feature guides | `lib/feature-explorer.ts` + `lib/feature-guides.ts` → `/features/guides/[slug]` | 20 → **24** |
| Solution pages | `lib/solutions.ts` | 23 |

**14 of the 18 requested features already had a canonical route.** Only four did
not. Creating eighteen new pages would have split the authority of pages that
already answer these questions, so four were created and fourteen were mapped.

New routes in this release:

- `/features/guides/weapon-detection`
- `/features/guides/abandoned-object`
- `/features/guides/two-way-audio`
- `/features/guides/onvif-integration`

Nothing was deleted, redirected or de-indexed.

## 2. One source of truth

`lib/featureRegistry.ts` holds the 18 with id, canonical route, featured flag,
buyer task, buyer problem, benefit, **supply mode**, compatibility note,
keyword cluster, evidence references and image. Homepage cards, grouping and
every displayed count derive from it.

**Counts that were hardcoded and are now derived:** `/features` said "20" in its
title, meta description, body copy and CTA; each guide footer said "All 20 AI
CCTV features". With 24 guides those were about to be wrong. They now read from
`EXPLORER_FEATURES.length`.

### Supply mode — why it is a field

"PGAK supplies all 18" is a statement about what can be bought, not about who
built it. Describing a licensed third-party module as PGAK's own software is a
claim a buyer can check and find false, so each entry records one of:
`pgak-software`, `supplied-hardware`, `licensed-module`, `integration`.

For the features where the specific model is settled in the proposal rather
than on a web page, the registry exports one constant:

> PGAK can supply and integrate a suitable solution; model and site
> requirements are confirmed in the proposal.

No accuracy figures, certifications, integrations, reference customers or pilot
results were invented anywhere in this release.

## 3. Keyword evidence — every volume source is unavailable

| Source | Status | Detail |
| --- | --- | --- |
| Google Search Console | **UNAVAILABLE** | No API access from this environment. Access request is item 2 of `docs/seo/2026-09-24/CONVERSION_SPRINT.md`. |
| Google Keyword Planner | **UNAVAILABLE** | No Google Ads account access. |
| Google Trends | **UNAVAILABLE** | No access. |
| Semrush | **UNAVAILABLE** | Subscription active, but the account has no API units remaining. `https://www.semrush.com/mcp-access` |

So **no search volume, difficulty, CTR or position figure appears anywhere in
this release.** The registry carries one primary and 3–5 supporting phrases per
feature, and they are labelled for what they are: seed keywords taken from the
brief and refined against the page's actual content. They are not evidence that
anyone searches them, and nothing here should be read as a ranking forecast.

The moment GSC access arrives, the first job is to check these 18 clusters
against real impressions and replace the seeds that do not survive contact.

## 4. Images — the blocker, precisely

**Attempted:** ChatGPT (chatgpt.com, signed in as director@…, Pro) through the
authorised Chrome connection.

**Result:** connectivity confirmed — the session is signed in and the composer
accepts prompts. Two image prompts were submitted 15 minutes apart. **Neither
produced any assistant response at all**, before or after a page reload. Note
that Chrome also blocks the extension from screenshotting `chatgpt.com`, so the
session was driven and read through the DOM.

This is a blocker for that step, not a reason to fake the assets. Nothing was
generated, and nothing is claimed to have been.

### Image state

13 of 18 use an existing original illustration that genuinely depicts that
feature. **5 are pending** and render without a figure rather than borrowing a
neighbouring feature's photo:

| Feature | Why pending |
| --- | --- |
| F01 False-alarm reduction | `object-classification.webp` depicts F02's scene. Using it twice would repeat a card image and caption it wrongly on one. |
| F11 Weapon detection | New feature, no asset |
| F14 Abandoned / removed object | New feature, no asset |
| F17 Two-way audio | New feature, no asset |
| F18 ONVIF / open integration | New feature, no asset |

`featuresAwaitingImage()` returns this list, so it cannot drift out of date.

The guide template and the explorer card both render without an image when
`image` is null — no placeholder, no "coming soon" block, no stand-in photo.

## 5. Accuracy rules applied to the new copy

- **Weapon detection** — states plainly that concealed items are undetectable
  and that it is not a screening system; every alert requires human review.
- **Fire/smoke** — kept as "not a substitute for required fire protection".
- **Two-way audio** — separates live speaking from recording audio, and notes
  recording carries obligations beyond video.
- **ONVIF** — separates stream support from analytics-event interoperability,
  and commits to naming profiles and API functions per device in the proposal
  rather than on the page.
- **PPE** — human safety supervision remains required.
- **Face recognition** — a match is a lead for a person to check, not proof.

A feature with no published manufacturer reference now renders no reference
link at all, rather than an empty one.

## 6. Tests

- `npx tsc --noEmit` — clean
- `npm run build` — compiled successfully
- `npm test` — 110/110 across 7 suites
- Local `next start`: all four new guides return 200; `/features` and every
  guide footer show **24**; the homepage chooser shows **18 solutions**
- `#intelligence-films` anchor and its section are unchanged and still present
- Homepage rendered and inspected at desktop width

## 7. Not done in this release

- No images generated (§4)
- No keyword volumes (§3)
- The 18 destination pages were **not individually rewritten** — the four new
  guides are new copy; the other 14 keep their existing content, which already
  answers problem, audience, requirements, limits and next steps
- No production lead test for the new `?feature=` parameter
- Not deployed

## 8. Rollback

`git revert` the commit. One new registry, one new component, four data
additions, and count/guard fixes in three existing files. No route deletions,
no redirects, no schema changes.
