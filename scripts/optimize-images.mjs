import { mkdir, stat } from "node:fs/promises";
import sharp from "sharp";

const sourceDir = "work/source-assets/figma";

const images = [
  {
    source: `${sourceDir}/DSCF6498.jpg`,
    output: "src/imports/couple-hero.webp",
    width: 1400,
    quality: 82,
  },
  {
    source: `${sourceDir}/DSCF6970.jpg`,
    output: "src/imports/lake-hero.webp",
    width: 1600,
    quality: 82,
  },
  {
    source: `${sourceDir}/villa.png`,
    output: "src/imports/villa-hero.webp",
    width: 1300,
    quality: 84,
  },
  {
    source: `${sourceDir}/logo_dw.png`,
    output: "src/imports/logo-dw.webp",
    width: 256,
    quality: 90,
  },
];

const icons = [
  [16, "public/icons/favicon-16.png"],
  [32, "public/icons/favicon-32.png"],
  [180, "public/icons/apple-touch-icon.png"],
  [192, "public/icons/icon-192.png"],
  [512, "public/icons/icon-512.png"],
];

async function formatSize(file) {
  const { size } = await stat(file);
  return `${(size / 1024).toFixed(1)} KB`;
}

await mkdir("src/imports", { recursive: true });
await mkdir("public/icons", { recursive: true });

for (const image of images) {
  await sharp(image.source)
    .resize({ width: image.width, withoutEnlargement: true })
    .webp({ quality: image.quality })
    .toFile(image.output);
  console.log(`Optimized ${image.output} (${await formatSize(image.output)})`);
}

for (const [size, output] of icons) {
  await sharp(`${sourceDir}/logo_dw.png`)
    .resize(size, size, { fit: "contain" })
    .png({ compressionLevel: 9 })
    .toFile(output);
  console.log(`Optimized ${output} (${await formatSize(output)})`);
}
