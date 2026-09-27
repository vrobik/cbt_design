/**
 * Generează favicon-urile și imaginea implicită Open Graph din logo-ul oficial CBT.
 * Rulează o singură dată (sau când se schimbă logo-ul):  npm run icons
 *
 * Ieșire:
 *   public/favicon.ico, public/icon-192.png, public/icon-512.png,
 *   public/icon-maskable-512.png, public/apple-touch-icon.png
 *   src/assets/brand/og-default.png  (1200×630, pentru distribuire pe rețele sociale)
 */
import sharp from 'sharp';
import { writeFile } from 'node:fs/promises';

const MARK = 'src/assets/brand/mark-color.png';
const LOGO_ALB = 'src/assets/brand/logo-white.png';
const NEGRU = '#101010';

// Mozaicul din colțul logo-ului (albastru / galben / „T” / roșu) — semnul CBT.
const mozaic = await sharp(MARK).extract({ left: 230, top: 0, width: 166, height: 166 }).png().toBuffer();

async function icon(size, padding, bg = '#ffffff') {
  const inner = Math.round(size * (1 - padding * 2));
  const img = await sharp(mozaic).resize(inner, inner, { kernel: 'lanczos3' }).toBuffer();
  return sharp({ create: { width: size, height: size, channels: 4, background: bg } })
    .composite([{ input: img, gravity: 'center' }])
    .png()
    .toBuffer();
}

await writeFile('public/icon-192.png', await icon(192, 0.08));
await writeFile('public/icon-512.png', await icon(512, 0.08));
await writeFile('public/icon-maskable-512.png', await icon(512, 0.2));
await writeFile('public/apple-touch-icon.png', await icon(180, 0.1));

// favicon.ico cu PNG-uri încorporate (16, 32, 48) — format acceptat de toate browserele.
const marimi = [16, 32, 48];
const pngs = await Promise.all(marimi.map((s) => icon(s, 0.04)));
const header = Buffer.alloc(6 + 16 * pngs.length);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(pngs.length, 4);
let offset = header.length;
pngs.forEach((png, i) => {
  const o = 6 + i * 16;
  header.writeUInt8(marimi[i], o);
  header.writeUInt8(marimi[i], o + 1);
  header.writeUInt8(0, o + 2);
  header.writeUInt8(0, o + 3);
  header.writeUInt16LE(1, o + 4);
  header.writeUInt16LE(32, o + 6);
  header.writeUInt32LE(png.length, o + 8);
  header.writeUInt32LE(offset, o + 12);
  offset += png.length;
});
await writeFile('public/favicon.ico', Buffer.concat([header, ...pngs]));

// Imaginea Open Graph implicită: fundal negru, logo alb, mozaic decorativ ca în hero.
const W = 1200;
const H = 630;
const logo = await sharp(LOGO_ALB).resize({ height: 300 }).toBuffer();
const sq = 44;
const gap = 8;
const grid = [
  'b.yy.r',
  '.b.yr.',
  'bby.rr',
  '.b.r.r',
];
const culori = { b: '#2F448A', y: '#F9F04D', r: '#CF242A' };
const rects = grid
  .flatMap((row, y) =>
    [...row].map((c, x) =>
      c === '.' ? '' : `<rect x="${x * (sq + gap)}" y="${y * (sq + gap)}" width="${sq}" height="${sq}" fill="${culori[c]}"/>`,
    ),
  )
  .join('');
const gw = 6 * (sq + gap) - gap;
const gh = 4 * (sq + gap) - gap;
const mozaicSvg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${gw}" height="${gh}">${rects}</svg>`);

await sharp({ create: { width: W, height: H, channels: 4, background: NEGRU } })
  .composite([
    { input: logo, left: 96, top: Math.round((H - 300) / 2) - 6 },
    { input: mozaicSvg, left: W - gw - 72, top: Math.round((H - gh) / 2) },
  ])
  .png()
  .toFile('src/assets/brand/og-default.png');

console.log('Iconițe și imagine OG generate.');
