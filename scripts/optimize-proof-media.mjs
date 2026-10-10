/**
 * Right-sizes the images the homepage actually ships (2026-10-08 audit:
 * PageSpeed mobile flagged ~896 KiB of avoidable image bytes, mostly client
 * logos served at up to 1528 px for a 64 px slot and 1280–1920 px video
 * posters in a three-column grid).
 *
 * Writes new files beside the originals and never overwrites a source, so the
 * change is reversible by pointing the references back. Aspect ratios are
 * preserved; nothing is cropped.
 *
 * Run with:  node scripts/optimize-proof-media.mjs
 */
import { stat } from "node:fs/promises";
import sharp from "sharp";

const jobs = [
  // Logos render at 64 px tall on desktop, 44 px on phones: 128 px covers 2x.
  ...[
    "dilkash-logo.png",
    "dobuild-logo.png",
    "hagerstone-logo.png",
    "krishna-gases-logo.png",
    "lumani-logo.png",
    "thangamman-logo.png",
    "uvtechno-logo.png",
    "winda-logo.webp",
  ].map((f) => ({
    src: `public/proof/clients/${f}`,
    out: `public/proof/clients/${f.replace(/\.(png|webp)$/, "")}-128h.webp`,
    resize: { height: 128, withoutEnlargement: true },
    quality: 88,
  })),
  // Video posters: a grid cell is ~360 px wide on desktop and ~343 px on a
  // phone; 960 px wide is 2.6x either, and the poster is only a still.
  ...["dock-count-poster", "ppe-gloves-poster", "hot-work-poster"].map((f) => ({
    src: `public/proof/${f}.webp`,
    out: `public/proof/${f}-960.webp`,
    resize: { width: 960, withoutEnlargement: true },
    quality: 78,
  })),
  { src: "public/proof/anpr-camera-mount.webp", out: "public/proof/anpr-camera-mount-800.webp", resize: { width: 800 }, quality: 78 },
  // Hero: a 1280 w step between 960 and 1920 for 2–3x phones.
  { src: "public/hero/security-mix-1920.webp", out: "public/hero/security-mix-1280.webp", resize: { width: 1280 }, quality: 72 },
];

let before = 0;
let after = 0;
for (const j of jobs) {
  const a = (await stat(j.src)).size;
  const info = await sharp(j.src).resize(j.resize).webp({ quality: j.quality, effort: 6 }).toFile(j.out);
  const b = (await stat(j.out)).size;
  before += a;
  after += b;
  console.log(`${j.out}  ${info.width}x${info.height}  ${(a / 1024).toFixed(0)} KiB -> ${(b / 1024).toFixed(1)} KiB`);
}
console.log(`total ${(before / 1024).toFixed(0)} KiB -> ${(after / 1024).toFixed(0)} KiB`);
