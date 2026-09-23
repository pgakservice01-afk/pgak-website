#!/usr/bin/env node
/**
 * Fetches the official geographic sources behind the district registry and
 * writes dated raw snapshots with provenance and checksums.
 *
 *   node scripts/geo/fetch-sources.mjs            # fetch and write snapshots
 *   node scripts/geo/fetch-sources.mjs --check    # re-fetch and diff, write nothing
 *
 * ── What this can and cannot reach ──────────────────────────────────────────
 * The authoritative district master is the Local Government Directory (LGD).
 * Its citizen district view (`globalviewdistrictforcitizen.do`) is behind a
 * CAPTCHA — verified 2026-09-23, the form carries a `captchaAnswer` field —
 * and a CAPTCHA is not something this script may answer. So LGD is used here
 * only for the part it serves without one: the state/UT code list, which is
 * authoritative and complete (36 entries, matching 28 states + 8 UTs).
 *
 * For districts this script fetches igod.gov.in, NIC's Integrated Government
 * Online Directory. That is an OFFICIAL source and it is the one the brief
 * names for locating district websites — but it is a directory of district
 * WEBSITES, not the administrative register. It carries no LGD district code,
 * no state field, and no effective dates. It is therefore recorded here as a
 * CROSS-CHECK source, never as the master. `districtSource: "igod-crosscheck"`
 * in the snapshot says so, and lib/geo/registry.ts refuses to mark any
 * district publishable on a cross-check source alone.
 *
 * Getting the real master needs one of two owner actions, both recorded in
 * docs/districts/AUDIT.md:
 *   1. a data.gov.in API key for the LGD districts resource, or
 *   2. a manual LGD export (the CAPTCHA is trivial for a human).
 * `ingest-lgd.mjs` is written and waiting for either file.
 */

import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const SNAPSHOT_DIR = path.join(ROOT, "data", "geo", "snapshots");

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Safari/537.36";

const LGD_HOME = "https://lgdirectory.gov.in/";
const LGD_DISTRICT_VIEW = "https://lgdirectory.gov.in/globalviewdistrictforcitizen.do";
const IGOD_DISTRICTS = "https://igod.gov.in/districts";
const IGOD_MORE = "https://igod.gov.in/districts/list_more";

/** igod serves 60 rows per request; the first page is server-rendered. */
const PAGE_SIZE = 60;
/** Hard stop so a change in igod's paging cannot spin this forever. */
const MAX_PAGES = 40;

const checkOnly = process.argv.includes("--check");

function sha256(text) {
  return createHash("sha256").update(text, "utf8").digest("hex");
}

async function get(url, extraHeaders = {}) {
  const res = await fetch(url, {
    headers: { "User-Agent": UA, ...extraHeaders },
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${url}`);
  return res.text();
}

function decode(s) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .trim();
}

/**
 * State/UT codes from LGD. These come from the district view's state selector,
 * which renders before the CAPTCHA gate, so no CAPTCHA is answered or evaded.
 * The "All States" pseudo-option (code 0) is dropped.
 */
async function fetchLgdStates() {
  const home = await get(LGD_HOME);
  const token = home.match(/OWASP_CSRFTOKEN=([A-Z0-9-]+)/)?.[1];
  if (!token) throw new Error("LGD: no CSRF token on the home page");

  const html = await get(`${LGD_DISTRICT_VIEW}?OWASP_CSRFTOKEN=${token}`, {
    Referer: LGD_HOME,
  });

  const captchaGated = /captchaAnswer/i.test(html);

  const states = [...html.matchAll(/<option[^>]*value="(\d+)"[^>]*>([^<]+)<\/option>/g)]
    .map(([, code, name]) => ({ lgdStateCode: Number(code), name: decode(name) }))
    .filter((s) => s.lgdStateCode > 0)
    .sort((a, b) => a.lgdStateCode - b.lgdStateCode);

  if (states.length < 30) {
    throw new Error(`LGD: only ${states.length} states parsed — markup changed?`);
  }

  return { states, captchaGated, rawLength: html.length, checksum: sha256(html) };
}

function parseIgodRows(html) {
  return [...html.matchAll(/<li><a href="([^"]+)" class="search-title"[^>]*>([^<]+)<span/g)].map(
    ([, website, name]) => ({ name: decode(name), website: website.trim() })
  );
}

/**
 * Every igod district page, followed to exhaustion. Stops when a request
 * returns no rows — never at a remembered national count, because assuming
 * the total is exactly how a partial download gets called complete.
 */
async function fetchIgodDistricts() {
  const first = await get(IGOD_DISTRICTS);
  const rows = parseIgodRows(first);
  if (rows.length === 0) throw new Error("igod: no rows on the first page — markup changed?");

  const seen = new Map(rows.map((r) => [`${r.name}|${r.website}`, r]));
  let start = rows.length;
  let pages = 1;
  let exhausted = false;

  while (pages < MAX_PAGES) {
    const chunk = await get(`${IGOD_MORE}/${start}/${PAGE_SIZE}`, {
      "X-Requested-With": "XMLHttpRequest",
      Referer: IGOD_DISTRICTS,
    });
    const next = parseIgodRows(chunk);
    pages += 1;
    if (next.length === 0) {
      exhausted = true;
      break;
    }
    for (const r of next) seen.set(`${r.name}|${r.website}`, r);
    start += next.length;
  }

  const districts = [...seen.values()].sort((a, b) => a.name.localeCompare(b.name));
  return { districts, pages, exhausted, rowsRead: start };
}

async function main() {
  const retrievedAt = new Date().toISOString();

  process.stdout.write("LGD states…      ");
  const lgd = await fetchLgdStates();
  console.log(`${lgd.states.length} states/UTs (captchaGated=${lgd.captchaGated})`);

  process.stdout.write("igod districts…  ");
  const igod = await fetchIgodDistricts();
  console.log(
    `${igod.districts.length} unique names over ${igod.pages} requests (exhausted=${igod.exhausted})`
  );

  if (!igod.exhausted) {
    throw new Error(
      `igod: hit MAX_PAGES (${MAX_PAGES}) before the list ran out — this snapshot would be partial, refusing to write it`
    );
  }

  const snapshot = {
    retrievedAt,
    // The snapshot is a record of sources, not an authority claim. Anything
    // reading it must respect these two fields.
    stateSource: "lgd-authoritative",
    districtSource: "igod-crosscheck",
    sources: {
      states: {
        url: LGD_DISTRICT_VIEW,
        publisher: "Local Government Directory (LGD), Ministry of Panchayati Raj, Government of India",
        licence: "Government Open Data Licence – India (GODL)",
        note: "State/UT selector only. The district listing behind this endpoint is CAPTCHA-gated and was not retrieved.",
        captchaGated: lgd.captchaGated,
        checksum: lgd.checksum,
        count: lgd.states.length,
      },
      districts: {
        url: IGOD_DISTRICTS,
        publisher: "Integrated Government Online Directory (igod), NIC, Government of India",
        licence: "Government Open Data Licence – India (GODL)",
        note:
          "Directory of district WEBSITES. Carries no LGD district code, no state field and no effective dates. Cross-check only — not the administrative master.",
        requests: igod.pages,
        rowsRead: igod.rowsRead,
        exhausted: igod.exhausted,
        count: igod.districts.length,
      },
    },
    states: lgd.states,
    districts: igod.districts,
  };

  const body = `${JSON.stringify(snapshot, null, 2)}\n`;
  const checksum = sha256(body);
  const dated = path.join(SNAPSHOT_DIR, `${retrievedAt.slice(0, 10)}-geo-sources.json`);
  const latest = path.join(SNAPSHOT_DIR, "latest.json");

  if (checkOnly) {
    let prev = null;
    try {
      prev = JSON.parse(await readFile(latest, "utf8"));
    } catch {
      console.log("\n--check: no existing snapshot to compare against.");
      return;
    }
    const before = new Set(prev.districts.map((d) => d.name));
    const after = new Set(snapshot.districts.map((d) => d.name));
    const added = [...after].filter((n) => !before.has(n));
    const removed = [...before].filter((n) => !after.has(n));
    console.log(`\n--check against ${prev.retrievedAt}`);
    console.log(`  states:    ${prev.states.length} → ${snapshot.states.length}`);
    console.log(`  districts: ${prev.districts.length} → ${snapshot.districts.length}`);
    console.log(`  added:     ${added.length}${added.length ? ` — ${added.join(", ")}` : ""}`);
    console.log(`  removed:   ${removed.length}${removed.length ? ` — ${removed.join(", ")}` : ""}`);
    process.exitCode = added.length || removed.length ? 1 : 0;
    return;
  }

  await mkdir(SNAPSHOT_DIR, { recursive: true });
  await writeFile(dated, body);
  await writeFile(latest, body);
  console.log(`\nwrote ${path.relative(ROOT, dated)}`);
  console.log(`      ${path.relative(ROOT, latest)}`);
  console.log(`sha256 ${checksum}`);
}

main().catch((err) => {
  console.error(`\nfetch-sources failed: ${err.message}`);
  process.exitCode = 1;
});
