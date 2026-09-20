// Optimises the design handoff's images into `public/images/`.
//
// The Claude Design export ships originals: 1–1.5MB PNGs sized for a design
// canvas, not for a page. This converts each one to WebP at the width it is
// actually displayed at on a 2x screen, which is where the page weight goes.
// Re-run it whenever `design/handoff/images/` changes; the output is committed
// so a clone doesn't need `sharp` to build.
//
// `width` below is the DISPLAY width at 2x, not the source width. Sources are
// never upscaled.
import { mkdir, readdir, stat } from "node:fs/promises";
import { resolve } from "node:path";
import sharp from "sharp";

const root = resolve(import.meta.dirname, "..");
const srcDir = resolve(root, "design/handoff/images");
const outDir = resolve(root, "public/images");

// `crop` frames the image here rather than leaving it to `object-fit: cover`.
// All three photographs in the dark section are phone shots in portrait, and
// dropping them into a 4:3 frame throws away two thirds of the file and lands
// the crop wherever the middle happens to be. `top` is the fraction of the
// source height where the window starts, chosen by looking at each photograph:
// the machine and the monogram in the GBT shot, the monitor and the patient in
// the scanner shot, the ceiling screen and the lamp in the whitening shot.
/**
 * @type {{ src: string, out: string, width: number, alpha?: boolean,
 *          trim?: boolean, crop?: { aspect: number, top: number } }[]}
 */
const manifest = [
  // Header/footer monogram, drawn at 34px and 30px.
  { src: "logo-cb.png", out: "logo-cb", width: 72, alpha: true },
  // Hero cutout, already tight to her outline in the export. The panel shrinks
  // with the viewport, so a phone draws her at ~225px and the full file is
  // 1.6x more than even a 2x screen needs.
  { src: "catiana-hero.png", out: "catiana-hero", width: 704, alpha: true, widths: [480] },
  // Right column of "La clínica", 240px tall across roughly half the container.
  { src: "arcade.jpg", out: "arcade", width: 1200 },
  // The three cards in the dark section: ~400px wide at 1280, so 900 at 2x.
  { src: "scan-3d.png", out: "scan-3d", width: 900, crop: { aspect: 4 / 3, top: 0.223 } },
  // 0.46 started below her chin: the tile showed a headless torso beside the
  // machine, on a site whose whole idea is putting a person in front of you.
  // 0.21 keeps her face and the top of the machine; the base falls out.
  { src: "catiana-gbt.jpg", out: "catiana-gbt", width: 900, crop: { aspect: 4 / 3, top: 0.21 } },
  // 0.175 cut the ceiling screen down to an unreadable sliver — and the beach
  // playing on it is the reason the brief calls this one of the three best
  // photographs. 0.05 keeps the screen and the lamp together.
  { src: "whitening.jpg", out: "whitening", width: 900, crop: { aspect: 4 / 3, top: 0.05 } },
  // Contact photo: half the container on desktop, full width on a phone, so
  // it is the one image where one file cannot serve both well.
  {
    src: "storefront-day.jpg",
    out: "storefront-day",
    width: 1200,
    widths: [700],
    crop: { aspect: 4 / 3, top: 0 },
  },
];

async function main() {
  await mkdir(outDir, { recursive: true });

  let before = 0;
  let after = 0;

  for (const item of manifest) {
    const srcPath = resolve(srcDir, item.src);
    const outPath = resolve(outDir, `${item.out}.webp`);

    before += (await stat(srcPath)).size;

    let pipeline = sharp(srcPath);

    if (item.crop) {
      const meta = await sharp(srcPath).metadata();
      // Fit the widest window of the wanted ratio that the source can hold.
      let cropW = meta.width;
      let cropH = Math.round(cropW / item.crop.aspect);
      if (cropH > meta.height) {
        cropH = meta.height;
        cropW = Math.round(cropH * item.crop.aspect);
      }
      const top = Math.min(
        Math.round(item.crop.top * meta.height),
        meta.height - cropH,
      );
      pipeline = pipeline.extract({
        left: Math.round((meta.width - cropW) / 2),
        top,
        width: cropW,
        height: cropH,
      });
    }

    // `widths` emits `<name>-<w>.webp` for a srcset as well as the plain file
    // the `src` attribute points at.
    const variants = [
      { path: outPath, width: item.width },
      ...(item.widths ?? []).map((w) => ({
        path: resolve(outDir, `${item.out}-${w}.webp`),
        width: w,
      })),
    ];

    for (const variant of variants) {
      await pipeline
        .clone()
        .resize({ width: variant.width, withoutEnlargement: true })
        .webp({ quality: item.alpha ? 86 : 78, alphaQuality: 90, effort: 5 })
        .toFile(variant.path);

      const meta = await sharp(variant.path).metadata();
      const size = (await stat(variant.path)).size;
      after += size;
      console.log(
        `${variant.path.split("/").pop()}  ${meta.width}x${meta.height}  ` +
          `${(size / 1024).toFixed(0)}KB`,
      );
    }
  }

  // Favicons. Without a <link rel="icon"> the browser requests /favicon.ico
  // and logs a 404 on every page load, which Lighthouse counts as a
  // best-practices failure.
  const favSrc = resolve(srcDir, "logo-cb.png");
  for (const [name, size] of [
    ["favicon-32.png", 32],
    ["favicon-180.png", 180],
  ]) {
    await sharp(favSrc)
      .resize({ width: size, height: size, fit: "contain", background: "#fbfaf8" })
      .flatten({ background: "#fbfaf8" })
      .png()
      .toFile(resolve(root, "public", name));
    console.log(`${name}  ${size}x${size}`);
  }

  const unused = (await readdir(srcDir)).filter(
    (f) => !manifest.some((m) => m.src === f),
  );

  console.log(
    `\n${manifest.length} image(s): ${(before / 1024 / 1024).toFixed(2)}MB -> ` +
      `${(after / 1024).toFixed(0)}KB`,
  );
  if (unused.length) console.log(`Not used by the site: ${unused.join(", ")}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
