import sharp from "sharp";
import { mkdir, readdir, stat } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
const generatorTime = (await stat(fileURLToPath(import.meta.url))).mtimeMs;
async function fresh(source, outputs) {
  const sourceTime = Math.max(generatorTime, (await stat(source)).mtimeMs);
  return (
    await Promise.all(
      outputs.map((file) =>
        stat(file)
          .then((s) => s.mtimeMs >= sourceTime)
          .catch(() => false),
      ),
    )
  ).every(Boolean);
}
const root = resolve("public/images/gallery");
const output = resolve(root, "previews");
await mkdir(output, { recursive: true });
for (const file of await readdir(root)) {
  if (!/^outreach-\d+\.webp$/.test(file)) continue;
  const source = resolve(root, file);
  const webp = [480, 960];
  const avif = [480, 768, 1200];
  const paths = [
    ...webp.map((w) => resolve(output, file.replace(".webp", `-${w}.webp`))),
    ...avif.map((w) => resolve(output, file.replace(".webp", `-${w}.avif`))),
  ];
  if (await fresh(source, paths)) continue;
  for (const width of webp)
    await sharp(source)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 72 })
      .toFile(resolve(output, file.replace(".webp", `-${width}.webp`)));
  for (const width of avif)
    await sharp(source)
      .resize({ width, withoutEnlargement: true })
      .avif({ quality: 45, effort: 3 })
      .toFile(resolve(output, file.replace(".webp", `-${width}.avif`)));
}
const teamRoot = resolve("public/images/team");
const teamOutput = resolve(teamRoot, "previews");
await mkdir(teamOutput, { recursive: true });
for (const file of await readdir(teamRoot)) {
  if (!file.endsWith(".jpg")) continue;
  const source = resolve(teamRoot, file);
  const small = resolve(teamOutput, file.replace(".jpg", "-480.webp"));
  const full = resolve(teamOutput, file.replace(".jpg", "-full.webp"));
  if (await fresh(source, [small, full])) continue;
  await sharp(source)
    .resize({ width: 480, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(small);
  await sharp(source).webp({ quality: 80 }).toFile(full);
}
console.log(
  "Responsive AVIF/WebP documentary images and WebP portraits generated; originals preserved.",
);
