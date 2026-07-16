import sharp from 'sharp';
import { readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const dir = join(process.cwd(), 'public', 'images');
const files = readdirSync(dir);

const sizeOf = (p) => statSync(p).size;

let totalBefore = 0;
let totalAfter = 0;

for (const file of files) {
  const path = join(dir, file);
  const before = sizeOf(path);
  totalBefore += before;

  const isBadgeOrIcon = /^(badge-|icon-|logo-)/.test(file);
  const buf = await sharp(path).rotate().toBuffer();
  let out;

  if (file.endsWith('.png')) {
    const maxWidth = isBadgeOrIcon ? 320 : 2000;
    out = await sharp(buf)
      .resize({ width: maxWidth, withoutEnlargement: true })
      .png({ quality: 80, compressionLevel: 9, palette: true })
      .toBuffer();
  } else if (file.endsWith('.jpg') || file.endsWith('.jpeg')) {
    out = await sharp(buf)
      .resize({ width: 2000, withoutEnlargement: true })
      .jpeg({ quality: 78, mozjpeg: true, progressive: true })
      .toBuffer();
  } else {
    continue;
  }

  if (out.length < before) {
    await sharp(out).toFile(path + '.tmp');
    const fs = await import('node:fs');
    fs.renameSync(path + '.tmp', path);
    totalAfter += out.length;
    console.log(`${file}: ${(before / 1024).toFixed(0)}KB -> ${(out.length / 1024).toFixed(0)}KB`);
  } else {
    totalAfter += before;
    console.log(`${file}: kept original (${(before / 1024).toFixed(0)}KB, already smaller)`);
  }
}

console.log(`\nTotale: ${(totalBefore / 1024 / 1024).toFixed(2)}MB -> ${(totalAfter / 1024 / 1024).toFixed(2)}MB`);
