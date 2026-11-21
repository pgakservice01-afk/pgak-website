#!/usr/bin/env node
// Choose a pre-generated Codex photo from the cover library for today's article.
//
//   node ops/seo-pipeline/bin/pick_cover.mjs --keywords "warehouse loading dispatch counting"
//
// Lists the best-matching UNUSED library images (score = tag/scene words shared with the
// keywords). An image is unused while its file exists in library/images/. After using
// one, `git rm` it so no photo is ever used twice. Prints LIBRARY_REMAINING=<n>.
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { PIPELINE_DIR, CONFIG } from "./lib.mjs";

const a = process.argv.slice(2);
const kw = a.indexOf("--keywords") > -1 ? a[a.indexOf("--keywords") + 1] : "";
const manifest = JSON.parse(readFileSync(join(PIPELINE_DIR, "library", "manifest.json"), "utf8"));
const avail = manifest.filter((m) => existsSync(join(PIPELINE_DIR, "library", "images", `${m.id}.webp`)));
const words = (s) =>
  new Set(String(s).toLowerCase().replace(/[^a-z0-9 ]+/g, " ").split(/\s+/).filter((w) => w.length > 2)
    .map((w) => w.replace(/(?<=[a-z]{3})s$/, "")));
const K = words(kw);
const scored = avail
  .map((m) => {
    const T = words(m.tags.join(" "));
    const S = words(m.scene);
    let score = 0;
    for (const w of K) score += (T.has(w) ? 2 : 0) + (S.has(w) ? 1 : 0);
    return { id: m.id, score, tags: m.tags.join(", "), scene: m.scene, file: `ops/seo-pipeline/library/images/${m.id}.webp` };
  })
  .sort((x, y) => y.score - x.score);
console.log(JSON.stringify({ keywords: kw, candidates: scored.slice(0, 5) }, null, 1));
console.log(`LIBRARY_REMAINING=${avail.length}`);
if (avail.length <= CONFIG.library_low_warning) console.log(`LIBRARY_LOW: only ${avail.length} unused Codex photos left — say so in the report`);
