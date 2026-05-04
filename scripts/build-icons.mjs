// Generates favicons and the inline header logo from the source brand mark.
// Run: node scripts/build-icons.mjs
//
// Outputs:
//   app/icon.png         — 512x512, rounded, used as favicon by Next.js
//   app/apple-icon.png   — 180x180, rounded, used as iOS touch icon
//   public/logo-icon.png — 900x900, rounded, used inline in the header Logo
//
// The source image is the full 2048x2048 brand image with the icon glyph
// in the upper portion and "CS Web Studio" wordmark below. We extract just
// the icon glyph so it reads at favicon sizes.

import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const SRC = resolve(ROOT, "public/logo-full.png"); // committed source

// The current source is already a clean square crop of the icon glyph,
// so we use the full image. If a future source has a wordmark or padding
// to crop out, set explicit bounds here.
const CROP = null; // null = use full image

function roundedSvg(size, radius) {
  return Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
       <rect x="0" y="0" width="${size}" height="${size}" rx="${radius}" ry="${radius}" fill="white"/>
     </svg>`,
  );
}

async function buildOne({ size, radius, out }) {
  let pipe = sharp(SRC);
  if (CROP) pipe = pipe.extract(CROP);
  const buf = await pipe
    .resize(size, size, { fit: "cover" })
    .flatten({ background: "#ffffff" })
    .png()
    .toBuffer();

  if (radius > 0) {
    await sharp(buf)
      .composite([{ input: roundedSvg(size, radius), blend: "dest-in" }])
      .png({ compressionLevel: 9 })
      .toFile(resolve(ROOT, out));
  } else {
    await sharp(buf).png({ compressionLevel: 9 }).toFile(resolve(ROOT, out));
  }
}

// Favicons: rounded-corner masks baked in (browsers render PNG as-is)
await buildOne({ size: 512, radius: 96, out: "app/icon.png" });
await buildOne({ size: 180, radius: 36, out: "app/apple-icon.png" });
// Inline header logo: square. The Logo component clips it with its own
// rounded container so it does not need baked-in rounding.
await buildOne({ size: 900, radius: 0, out: "public/logo-icon.png" });

console.log("icons built");
