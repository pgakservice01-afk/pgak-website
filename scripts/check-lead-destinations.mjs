/**
 * Does production actually deliver a lead to every destination it should?
 *
 * Why this exists: the Google Sheet register and the two alert emails shipped
 * on 2026-09-23, and LEAD_REGISTER_URL / LEAD_REGISTER_SECRET were never set in
 * Vercel Production. Every enquiry since took the "register not configured"
 * branch in silence. `GET /api/leads` reported `"register": false` the whole
 * time — the information was there, and nobody had a reason to look at it.
 *
 * A missing environment variable is invisible precisely because nothing breaks:
 * the form still says thank you, the ERP still accepts, and the sheet the owner
 * checks on Monday is simply empty. This turns that into a failing check.
 *
 * Usage:
 *   node scripts/check-lead-destinations.mjs                  # production
 *   node scripts/check-lead-destinations.mjs http://localhost:3000
 *
 * Exit codes: 0 all expected destinations live, 1 one or more off, 2 unreachable.
 */

const BASE = (process.argv[2] ?? "https://www.pgak.co.in").replace(/\/$/, "");

/**
 * What must be true for a lead to reach a human.
 *
 * `register` covers the Google Sheet AND both alert emails — they are one
 * destination in the code, so one flag answers for all three.
 */
const EXPECTED = [
  ["erp", "ERP relay (the CRM the sales team works from)"],
  ["register", "Google Sheet register + alert emails to director@ and mittaladitya18@"],
  ["notify", "Owner alert when a validated lead fails to reach the CRM"],
];

const res = await fetch(`${BASE}/api/leads`, {
  headers: { accept: "application/json" },
}).catch((e) => {
  console.error(`UNREACHABLE  ${BASE}/api/leads — ${e.message}`);
  process.exit(2);
});

if (!res.ok) {
  console.error(`UNREACHABLE  ${BASE}/api/leads returned HTTP ${res.status}`);
  process.exit(2);
}

const health = await res.json();
const off = EXPECTED.filter(([key]) => health[key] !== true);

console.log(`Lead destinations — ${BASE}  (env: ${health.env ?? "unknown"}, mode: ${health.mode ?? "unknown"})`);
for (const [key, label] of EXPECTED) {
  console.log(`  ${health[key] === true ? "live   " : "OFF    "} ${key.padEnd(9)} ${label}`);
}

if (off.length === 0) {
  console.log("\nAll expected destinations are live.");
  process.exit(0);
}

console.error(`\n${off.length} destination(s) are off. Leads are still being accepted, which is why this is easy to miss.`);
for (const [key] of off) {
  if (key === "register") {
    console.error(
      "  register: set LEAD_REGISTER_URL and LEAD_REGISTER_SECRET in Vercel → Project → Settings → Environment Variables (Production), then redeploy. Nothing reaches the sheet or either inbox until you do.",
    );
  } else if (key === "erp") {
    console.error("  erp: set ERP_LEADS_ENDPOINT and ERP_WEBHOOK_SECRET in Vercel (Production), then redeploy.");
  } else {
    console.error(`  ${key}: see app/api/leads/route.ts for the variables this flag reads.`);
  }
}
process.exit(1);
