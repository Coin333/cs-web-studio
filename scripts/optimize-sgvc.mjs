// One-shot script: optimize three SGVC screenshots into WebP files.
// Run: node scripts/optimize-sgvc.mjs
import sharp from "sharp";
import { homedir } from "node:os";
import { resolve } from "node:path";

const DESK = resolve(homedir(), "Desktop");
const OUT = resolve(process.cwd(), "public/work/sgvc");

const FILES = [
  { src: "homepage.png", out: "homepage.webp" },
  { src: "club-grid.png", out: "club-grid.webp" },
  { src: "rsvp-funnel.png", out: "rsvp-funnel.webp" },
];

for (const f of FILES) {
  await sharp(resolve(DESK, f.src))
    .resize(1600, null, { withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(resolve(OUT, f.out));
  console.log(`wrote ${f.out}`);
}
