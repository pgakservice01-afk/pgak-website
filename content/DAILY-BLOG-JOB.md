# Daily blog job — operating rules

A scheduled cloud agent runs every day at 12:00 IST and publishes **two** posts to
`content/insights/`. This file is the contract it works to. Edit this file to
change how the job behaves.

## Source of truth

`content/topic-queue.json` — a finite, hand-curated list of topics derived from
the Sep-2026 Google Keyword Planner pull (1,538 keywords, India + Punjab).
Each entry has `slug`, `title`, `primaryKeyword`, `angle`, `category`, `status`.

**The queue is deliberately finite.** When it is empty the job must STOP and say
so, not invent topics. Two posts a day exhausts genuinely distinct search intents
very quickly, and near-duplicate pages cannibalise the rankings of the pages we
already have. Refilling the queue is a human decision that should follow a fresh
keyword pull.

## Hard rules for every post

1. **Never write a topic whose `slug` already exists** in `content/insights/`.
2. Follow `BLOGGING.md` exactly — frontmatter shape, PGAK voice, 600–900 words.
3. **No PGAK pricing anywhere.** Market ranges for other products are fine; our
   own rate is quoted on a call or WhatsApp only. This is a standing rule.
4. **No invented numbers, statistics, case studies or customer names.** If a
   figure cannot be stated honestly, describe the mechanism instead.
5. Disclose the commercial interest when recommending our own approach.
6. Every post ends with `[Ask for a free feasibility check](#dealer)`.
7. `faqs` frontmatter should answer the literal query, and the same answer must
   also appear in the body text.

## What the job must do each run

- Pick the first two `pending` topics from the queue.
- Write both posts, set `status` to `"published"` with a `publishedOn` date.
- Run `npm run build` and only commit if it passes.
- Commit both posts plus the updated queue, push to `main`.
- Run `npm run indexnow -- /insights/<slug-1> /insights/<slug-2>`.
- If fewer than two topics remain pending, publish what remains and state
  clearly in the final summary that the queue is exhausted.
