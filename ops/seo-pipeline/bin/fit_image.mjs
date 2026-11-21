#!/usr/bin/env node
// Turn a downloaded AI-generated photo into a PGAK cover: 1600x900 WebP,
// navy brand gradient + small uppercase label, <= 300 KB.
//
//   node bin/fit_image.mjs --in /path/photo.png --slug <slug> --label "Warehouse Security"
import { join } from "node:path";
import { statSync, existsSync } from "node:fs";
import { CONFIG, REPO, loadSharp } from "./lib.mjs";

const a = process.argv.slice(2);
const opt = (k, d = "") => (a.indexOf(`--${k}`) > -1 ? a[a.indexOf(`--${k}`) + 1] : d);
const input = opt("in");
const slug = opt("slug");
const label = opt("label", "PGAK Insights").toUpperCase();
const out = opt("out", join(REPO, "public", "insights", "covers", `${slug}.webp`));
if (!input || !slug || !existsSync(input)) {
  console.error("usage: fit_image.mjs --in photo.png --slug s --label Category");
  process.exit(2);
}
const sharp = loadSharp();
const W = CONFIG.cover.width, H = CONFIG.cover.height;
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const overlay = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#050912" stop-opacity="0.82"/><stop offset="0.55" stop-color="#050912" stop-opacity="0.25"/><stop offset="1" stop-color="#050912" stop-opacity="0"/></linearGradient>
<linearGradient id="b" x1="0" y1="0" x2="0" y2="1"><stop offset="0.65" stop-color="#050912" stop-opacity="0"/><stop offset="1" stop-color="#050912" stop-opacity="0.7"/></linearGradient></defs>
<rect width="${W}" height="${H}" fill="url(#g)"/><rect width="${W}" height="${H}" fill="url(#b)"/>
<rect x="72" y="760" width="40" height="5" fill="#3D8BFF"/>
<text x="126" y="770" font-family="Inter, Helvetica Neue, Helvetica, Arial, DejaVu Sans, sans-serif" font-size="24" font-weight="700" letter-spacing="6" fill="#3D8BFF">${esc(label)}</text>
<text x="72" y="830" font-family="Inter, Helvetica Neue, Helvetica, Arial, DejaVu Sans, sans-serif" font-size="22" font-weight="700" letter-spacing="5" fill="#FFFFFF" fill-opacity="0.9">PGAK INSIGHTS</text>
</svg>`;

const meta = await sharp(input).metadata();
if ((meta.width || 0) < 1000) {
  console.error(`source image is only ${meta.width}px wide; need >= 1000px`);
  process.exit(1);
}
const base = await sharp(input).rotate().resize(W, H, { fit: "cover", position: "attention" }).toBuffer();
let q = 82, bytes = Infinity;
while (q >= 50) {
  await sharp(base).composite([{ input: Buffer.from(overlay) }]).webp({ quality: q }).toFile(out);
  bytes = statSync(out).size;
  if (bytes <= CONFIG.cover.max_bytes) break;
  q -= 8;
}
console.log(`cover written: ${out} (${W}x${H}, ${bytes} bytes, q=${q})`);
if (bytes > CONFIG.cover.max_bytes) process.exit(1);
