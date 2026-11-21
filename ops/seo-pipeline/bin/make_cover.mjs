#!/usr/bin/env node
// Original, on-brand PGAK cover rendered from code (no stock, no credits, never fails).
//
//   node bin/make_cover.mjs --slug <slug> --label "Camera Setup" --line "Check PoE power before adding cameras" --motif network
//
// Motifs: gate, warehouse, factory, retail, home, perimeter, network, attendance, office, camera
// Writes repo/public/insights/covers/<slug>.webp (1600x900 WebP).
import { join } from "node:path";
import { statSync } from "node:fs";
import { CONFIG, REPO, loadSharp } from "./lib.mjs";

const a = process.argv.slice(2);
const opt = (k, d = "") => (a.indexOf(`--${k}`) > -1 ? a[a.indexOf(`--${k}`) + 1] : d);
const slug = opt("slug");
const label = opt("label", "PGAK Insights").toUpperCase();
const line = opt("line");
const motif = opt("motif", "camera");
const out = opt("out", join(REPO, "public", "insights", "covers", `${slug}.webp`));
if (!slug || !line) {
  console.error('usage: make_cover.mjs --slug s --label "Category" --line "Short cover line" --motif gate');
  process.exit(2);
}

const W = 1600, H = 900, BLUE = "#3D8BFF", INK = "#CFE0FF";
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function wrap(text, size) {
  const max = Math.floor(700 / (0.56 * size));
  const out = [];
  let cur = "";
  for (const w of text.split(/\s+/)) {
    if ((cur + " " + w).trim().length > max && cur) {
      out.push(cur);
      cur = w;
    } else cur = (cur + " " + w).trim();
  }
  if (cur) out.push(cur);
  return out;
}
let size = 84, lines = wrap(line, size);
for (const s of [84, 76, 68, 60, 54]) {
  size = s;
  lines = wrap(line, s);
  if (lines.length <= 3) break;
}
if (lines.length > 3) {
  console.error(`cover line too long for 3 lines: "${line}" — shorten it (<= ~45 chars)`);
  process.exit(2);
}

// Frame (camera view) on the right
const FX = 880, FY = 150, FW = 620, FH = 600;
const L = (pts, extra = "") => `<polyline points="${pts}" fill="none" stroke="${INK}" stroke-opacity="0.55" stroke-width="3" stroke-linejoin="round" stroke-linecap="round" ${extra}/>`;
const R = (x, y, w, h, extra = "") => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="${INK}" stroke-opacity="0.55" stroke-width="3" ${extra}/>`;
const Z = (pts) => `<polygon points="${pts}" fill="${BLUE}" fill-opacity="0.10" stroke="${BLUE}" stroke-width="3" stroke-dasharray="14 10"/>`;
const T = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${BLUE}" stroke-width="4" stroke-dasharray="18 10"/>`;
const person = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})" fill="none" stroke="${INK}" stroke-opacity="0.7" stroke-width="3"><circle cx="0" cy="-58" r="14"/><path d="M-18 -38 Q0 -46 18 -38 L22 0 L12 0 L10 40 L-10 40 L-12 0 L-22 0 Z"/></g>`;
const cam = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})" fill="none" stroke="${INK}" stroke-opacity="0.75" stroke-width="3"><rect x="-40" y="-18" width="80" height="36" rx="6"/><circle cx="28" cy="0" r="9"/><path d="M-30 18 L-30 40 L-60 40"/></g>`;

const motifs = {
  gate: () =>
    R(150, 180, 40, 340) + R(430, 180, 40, 340) + L("20,520 150,520") + L("470,520 600,520") +
    [0, 1, 2, 3, 4, 5, 6].map((i) => L(`${214 + i * 32},230 ${214 + i * 32},500`)).join("") + L("190,230 430,230") + L("190,500 430,500") +
    L("190,520 90,590") + L("430,520 530,590") + Z("200,532 420,532 492,584 128,584"),
  warehouse: () =>
    [0, 1, 2].map((i) => R(50 + i * 130, 140, 100, 380) + [1, 2, 3].map((j) => L(`${50 + i * 130},${140 + j * 95} ${150 + i * 130},${140 + j * 95}`)).join("")).join("") +
    R(450, 260, 120, 260) + L("450,300 570,300") + L("450,340 570,340") + Z("440,440 590,440 610,560 420,560"),
  factory: () =>
    L("40,520 40,250 140,180 140,250 240,180 240,250 340,180 340,250 440,180 440,520 Z".replace(" Z", " 40,520")) + R(470, 120, 40, 400) +
    R(90, 380, 120, 140) + R(260, 400, 140, 120) + Z("240,370 420,370 430,540 230,540"),
  retail: () =>
    [0, 1, 2].map((i) => R(60 + i * 140, 160, 90, 300) + [1, 2, 3, 4].map((j) => L(`${60 + i * 140},${160 + j * 60} ${150 + i * 140},${160 + j * 60}`)).join("")).join("") +
    R(470, 380, 110, 80) + Z("420,470 600,470 600,560 420,560"),
  home: () =>
    L("110,330 300,170 490,330") + R(140, 330, 320, 210) + R(270, 420, 60, 120) + R(170, 370, 70, 60) + R(360, 370, 70, 60) +
    L("20,540 600,540") + [0, 1, 2, 3, 4].map((i) => L(`${30 + i * 22},540 ${30 + i * 22},490`)).join("") + Z("250,545 350,545 380,590 220,590"),
  perimeter: () =>
    L("20,420 600,300") + L("20,520 600,400") + [0, 1, 2, 3, 4, 5, 6].map((i) => L(`${30 + i * 92},${418 - i * 19} ${30 + i * 92},${518 - i * 19}`)).join("") +
    L("520,120 520,330") + L("520,120 470,140") + T(40, 470, 590, 355),
  network: () =>
    cam(110, 140, 1) + cam(310, 120, 1) + cam(510, 140, 1) + R(220, 380, 180, 70, 'rx="8"') +
    [250, 285, 320, 355].map((x) => `<circle cx="${x}" cy="415" r="7" fill="${BLUE}" fill-opacity="0.8"/>`).join("") +
    L("110,180 110,300 260,380") + L("310,160 310,380") + L("510,180 510,300 360,380") + R(240, 500, 140, 60, 'rx="6"') + L("310,450 310,500"),
  attendance: () =>
    R(200, 140, 220, 400) + L("200,140 300,170 300,540") + person(470, 470, 1.4) + Z("390,330 560,330 560,560 390,560") + cam(110, 150, 0.9),
  office: () =>
    [0, 1].map((r) => [0, 1, 2].map((c) => R(60 + c * 180, 230 + r * 170, 140, 60) + R(95 + c * 180, 170 + r * 170, 70, 50)).join("")).join("") +
    Z("40,380 590,380 590,470 40,470"),
  camera: () =>
    cam(150, 160, 1.6) + `<polygon points="210,190 600,380 600,560 210,230" fill="${BLUE}" fill-opacity="0.08" stroke="${BLUE}" stroke-opacity="0.6" stroke-width="3" stroke-dasharray="14 10"/>`,
};
if (!motifs[motif]) {
  console.error(`unknown motif "${motif}". Use: ${Object.keys(motifs).join(", ")}`);
  process.exit(2);
}

const corner = (x, y, dx, dy) => `<path d="M${x} ${y + dy * 46} L${x} ${y} L${x + dx * 46} ${y}" fill="none" stroke="${BLUE}" stroke-width="6"/>`;
const grid = [];
for (let x = 0; x <= W; x += 80) grid.push(`<line x1="${x}" y1="0" x2="${x}" y2="${H}"/>`);
for (let y = 0; y <= H; y += 80) grid.push(`<line x1="0" y1="${y}" x2="${W}" y2="${y}"/>`);

const headlineY = 330 - (lines.length - 1) * size * 0.25;
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<defs>
  <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#050912"/><stop offset="1" stop-color="#0B1C38"/></linearGradient>
  <radialGradient id="glow" cx="0.75" cy="0.45" r="0.55"><stop offset="0" stop-color="${BLUE}" stop-opacity="0.20"/><stop offset="1" stop-color="${BLUE}" stop-opacity="0"/></radialGradient>
</defs>
<rect width="${W}" height="${H}" fill="url(#bg)"/>
<rect width="${W}" height="${H}" fill="url(#glow)"/>
<g stroke="#FFFFFF" stroke-opacity="0.035" stroke-width="1">${grid.join("")}</g>
<rect x="96" y="150" width="44" height="5" fill="${BLUE}"/>
<text x="156" y="160" font-family="Inter, Helvetica Neue, Helvetica, Arial, DejaVu Sans, sans-serif" font-size="26" font-weight="700" letter-spacing="6" fill="${BLUE}">${esc(label)}</text>
${lines.map((l, i) => `<text x="96" y="${headlineY + i * size * 1.12}" font-family="Inter, Helvetica Neue, Helvetica, Arial, DejaVu Sans, sans-serif" font-size="${size}" font-weight="700" fill="#FFFFFF">${esc(l)}</text>`).join("\n")}
<text x="96" y="806" font-family="Inter, Helvetica Neue, Helvetica, Arial, DejaVu Sans, sans-serif" font-size="22" font-weight="700" letter-spacing="5" fill="#FFFFFF" fill-opacity="0.85">PGAK INSIGHTS</text>
<text x="96" y="840" font-family="Inter, Helvetica Neue, Helvetica, Arial, DejaVu Sans, sans-serif" font-size="20" fill="#8FA3C0">pgak.co.in</text>
<rect x="${FX}" y="${FY}" width="${FW}" height="${FH}" rx="14" fill="#0A1426" fill-opacity="0.55" stroke="${BLUE}" stroke-opacity="0.35" stroke-width="2"/>
${corner(FX - 12, FY - 12, 1, 1)}${corner(FX + FW + 12, FY - 12, -1, 1)}${corner(FX - 12, FY + FH + 12, 1, -1)}${corner(FX + FW + 12, FY + FH + 12, -1, -1)}
<text x="${FX + 24}" y="${FY + 40}" font-family="Menlo, Courier New, DejaVu Sans Mono, Liberation Mono, monospace" font-size="20" fill="#8FA3C0">CAM 01</text>
<g transform="translate(${FX} ${FY})">${motifs[motif]()}</g>
</svg>`;

await loadSharp()(Buffer.from(svg)).webp({ quality: 86 }).toFile(out);
const bytes = statSync(out).size;
console.log(`cover written: ${out} (${W}x${H}, ${bytes} bytes, motif=${motif})`);
if (bytes > CONFIG.cover.max_bytes) {
  console.error("cover exceeds max bytes");
  process.exit(1);
}
