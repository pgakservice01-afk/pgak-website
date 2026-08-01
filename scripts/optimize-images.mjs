/**
 * One-shot image optimiser for /public.
 *
 * The source PNGs in this repo are 1.6–5.6 MB each. next/image resizes and
 * re-encodes on request, so visitors were never served those bytes — but they
 * bloat the repo, slow every build, and cost cold-start CPU on first request.
 *
 * This converts them to WebP at a sane max width, writes the new file
 * alongside, and reports the saving. Source PNGs are left on disk; delete them
 * once the .webp references are confirmed working.
 *
 * Run with:  npm run optimize:images
 */
import { readdir, stat, writeFile } from "node:fs/promises";
import { join, extname, dirname, basename } from "node:path";
import sharp from "sharp";

const ROOT = "public";
const MAX_WIDTH = 1600; // nothing on the site renders wider than this
const QUALITY = 82;

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

let savedBytes = 0;
let converted = 0;

for await (const file of walk(ROOT)) {
  const ext = extname(file).toLowerCase();
  if (![".png", ".jpg", ".jpeg"].includes(ext)) continue;

  const before = (await stat(file)).size;
  const out = join(dirname(file), `${basename(file, ext)}.webp`);

  const buf = await sharp(file)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toBuffer();

  await writeFile(out, buf);

  savedBytes += before - buf.length;
  converted += 1;
  const pct = Math.round((1 - buf.length / before) * 100);
  console.log(
    `${file} → ${out}  ${(before / 1e6).toFixed(2)}MB → ${(
      buf.length / 1e6
    ).toFixed(2)}MB  (-${pct}%)`
  );
}

console.log(
  `\n${converted} images converted, ${(savedBytes / 1e6).toFixed(1)} MB saved.`
);

// Social card. Pre-cropped to the 1200×630 that every card renderer crops to
// anyway, so lib/seo.ts can declare real dimensions in og:image:width/height
// instead of guessing.
const OG_SOURCE = "public/hero-landing.webp";
const OG_OUT = "public/og-pgak-ai-cctv.webp";

const og = await sharp(OG_SOURCE)
  .resize(1200, 630, { fit: "cover", position: "centre" })
  .webp({ quality: 85 })
  .toFile(OG_OUT);

console.log(`Social card: ${OG_OUT} ${og.width}×${og.height}`);
