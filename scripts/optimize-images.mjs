// Стиснення зображень у public/ "на місці" зі збереженням шляхів (.jpg лишається .jpg).
// Зменшує вагу оригіналів; next/image далі віддає webp/avif-похідні швидше.
//
// Використання:
//   node scripts/optimize-images.mjs --dry           # лише показати потенційну економію
//   node scripts/optimize-images.mjs                 # стиснути (з бекапом у .image-backup/)
//   node scripts/optimize-images.mjs --no-backup     # стиснути без бекапу
//   MAX_WIDTH=2000 QUALITY=78 node scripts/optimize-images.mjs
//
import { readdir, stat, mkdir, copyFile, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const PUBLIC_DIR = path.join(ROOT, "public");
const BACKUP_DIR = path.join(ROOT, ".image-backup");

const DRY = process.argv.includes("--dry");
const NO_BACKUP = process.argv.includes("--no-backup");
const MAX_WIDTH = Number(process.env.MAX_WIDTH ?? 2400);
const QUALITY = Number(process.env.QUALITY ?? 80);

const exts = new Set([".jpg", ".jpeg", ".png"]);

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else if (exts.has(path.extname(entry.name).toLowerCase())) out.push(full);
  }
  return out;
}

function kb(bytes) {
  return (bytes / 1024).toFixed(0);
}

async function processFile(file) {
  const ext = path.extname(file).toLowerCase();
  const before = (await stat(file)).size;
  const input = await readFile(file);

  let pipeline = sharp(input, { failOn: "none" }).rotate();
  const meta = await pipeline.metadata();
  if (meta.width && meta.width > MAX_WIDTH) {
    pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
  }

  if (ext === ".png") {
    pipeline = pipeline.png({ compressionLevel: 9, palette: true });
  } else {
    pipeline = pipeline.jpeg({ quality: QUALITY, mozjpeg: true });
  }

  const output = await pipeline.toBuffer();
  const after = output.length;
  const saved = before - after;

  if (saved <= 1024) {
    return { file, before, after: before, saved: 0, skipped: true };
  }

  if (!DRY) {
    if (!NO_BACKUP) {
      const rel = path.relative(PUBLIC_DIR, file);
      const dest = path.join(BACKUP_DIR, rel);
      if (!existsSync(dest)) {
        await mkdir(path.dirname(dest), { recursive: true });
        await copyFile(file, dest);
      }
    }
    await writeFile(file, output);
  }

  return { file, before, after, saved, skipped: false };
}

async function main() {
  if (!existsSync(PUBLIC_DIR)) {
    console.error("public/ not found");
    process.exit(1);
  }
  const files = await walk(PUBLIC_DIR);
  console.log(
    `${DRY ? "[DRY-RUN] " : ""}Файлів: ${files.length} · MAX_WIDTH=${MAX_WIDTH} · QUALITY=${QUALITY} · backup=${!NO_BACKUP && !DRY}`,
  );

  let totalBefore = 0;
  let totalAfter = 0;
  let changed = 0;

  for (const file of files) {
    try {
      const r = await processFile(file);
      totalBefore += r.before;
      totalAfter += r.after;
      if (!r.skipped) {
        changed++;
        const rel = path.relative(ROOT, file);
        console.log(`  ${kb(r.before)}KB → ${kb(r.after)}KB  (-${kb(r.saved)}KB)  ${rel}`);
      }
    } catch (e) {
      console.warn(`  ! пропуск ${path.relative(ROOT, file)}: ${e.message}`);
    }
  }

  console.log("—".repeat(40));
  console.log(
    `Оброблено зі стисненням: ${changed}/${files.length}\n` +
      `Сумарно: ${kb(totalBefore)}KB → ${kb(totalAfter)}KB  (економія ${kb(totalBefore - totalAfter)}KB)`,
  );
  if (DRY) console.log("DRY-RUN: файли не змінено.");
  else if (!NO_BACKUP) console.log("Оригінали збережено в .image-backup/");
}

main();
