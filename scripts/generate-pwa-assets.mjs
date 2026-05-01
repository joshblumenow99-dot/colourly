// Generates PWA icons and iOS apple-touch-startup-image splashes for Colourly.
//
// Run from the project root:
//   node scripts/generate-pwa-assets.mjs
//
// Outputs to public/icons/ and public/splash/. Source-of-truth for the
// brand (palette + sepia background) lives in this file — keep in sync
// with the CSS variables in public/index.html.

import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, '..');
const ICON_DIR = join(ROOT, 'public', 'icons');
const SPLASH_DIR = join(ROOT, 'public', 'splash');

// Brand — must match the CSS variables in public/index.html.
const BG = '#f5f1e8';        // --bg (sepia)
const INK = '#15110c';       // --ink
const INK_DIM = '#a59b8e';   // --ink-dim
const PALETTE = [
  '#d94e3c', // --c-1
  '#ed8a36', // --c-2
  '#e8bd2a', // --c-3
  '#4ea36a', // --c-4
  '#3b7eb6', // --c-5
  '#8a5cb0', // --c-6
  '#36a4a4', // --c-7
  '#d56ba1'  // --c-8
];

// 2 rows × 4 cols of dots in the 8 palette colours, centred. Reads as
// a balanced "swatch grid" at any size.
function dotGridSVG(size, opts = {}) {
  const { padScale = 0.18, dotScale = 1.0 } = opts;
  const pad = size * padScale;
  const gridW = size - pad * 2;
  const gridH = gridW * 0.5;             // 2:1 since 2 rows × 4 cols
  const cellW = gridW / 4;
  const cellH = gridH / 2;
  const r = Math.min(cellW, cellH) * 0.36 * dotScale;
  const startX = pad + cellW / 2;
  const startY = (size - gridH) / 2 + cellH / 2;
  let dots = '';
  for (let i = 0; i < 8; i++) {
    const col = i % 4;
    const row = Math.floor(i / 4);
    const cx = startX + col * cellW;
    const cy = startY + row * cellH;
    dots += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${PALETTE[i]}"/>`;
  }
  return dots;
}

// Plain icon — full sepia background to viewport edge.
function iconSVG(size) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
    <rect width="${size}" height="${size}" fill="${BG}"/>
    ${dotGridSVG(size)}
  </svg>`;
}

// Maskable icon — Android renders this inside circles/squircles and
// crops to a "safe area" (~80% of the canvas). Background covers the
// full square; content sits inside the safe radius.
function maskableIconSVG(size) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
    <rect width="${size}" height="${size}" fill="${BG}"/>
    ${dotGridSVG(size, { padScale: 0.26 })}
  </svg>`;
}

// Splash — sepia background, dot grid centred, COLOURLY wordmark below
// (rendered as 8 coloured letterboxes, no system font dependency).
function splashSVG(width, height) {
  const cx = width / 2;
  const cy = height / 2;
  // Dot grid sits on top of the wordmark, both centred vertically.
  const dotPad = Math.min(width, height) * 0.22;
  const gridW = Math.min(width * 0.72, 720);
  const gridH = gridW * 0.5;
  const cellW = gridW / 4;
  const cellH = gridH / 2;
  const r = Math.min(cellW, cellH) * 0.32;
  const gridLeft = cx - gridW / 2 + cellW / 2;
  const gridTop = cy - gridH / 2 - height * 0.04 + cellH / 2;
  let dots = '';
  for (let i = 0; i < 8; i++) {
    const col = i % 4;
    const row = Math.floor(i / 4);
    const dx = gridLeft + col * cellW;
    const dy = gridTop + row * cellH;
    dots += `<circle cx="${dx}" cy="${dy}" r="${r}" fill="${PALETTE[i]}"/>`;
  }
  // 8-letter wordmark below the grid, each letter rendered as a small
  // rounded coloured pill to avoid font availability concerns.
  const letterW = (gridW * 0.78) / 8;
  const letterH = letterW * 1.4;
  const wordmarkY = gridTop + gridH * 0.5 + height * 0.06;
  const wordmarkLeft = cx - (letterW * 8 + 6 * 7) / 2;
  let letters = '';
  for (let i = 0; i < 8; i++) {
    const lx = wordmarkLeft + i * (letterW + 6);
    letters += `<rect x="${lx}" y="${wordmarkY}" width="${letterW}" height="${letterH}" rx="${letterW * 0.18}" fill="${PALETTE[i]}" opacity="0.92"/>`;
  }
  // Tiny tagline at the bottom — also pure shape (3 dim dots) so we don't
  // depend on any font. Placement: ~10% from the bottom edge.
  const taglineY = height * 0.9;
  const taglineDots = [-1, 0, 1].map(d =>
    `<circle cx="${cx + d * 14}" cy="${taglineY}" r="3" fill="${INK_DIM}" opacity="0.6"/>`
  ).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <rect width="${width}" height="${height}" fill="${BG}"/>
    ${dots}
    ${letters}
    ${taglineDots}
  </svg>`;
}

async function renderPNG(svg, outPath) {
  await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(outPath);
}

// iOS apple-touch-startup-image device matrix — the 8 sizes Apple's
// device matrix expects for portrait splash screens.
const SPLASH_SIZES = [
  { w: 1290, h: 2796, name: 'iphone-16-pro-max' },
  { w: 1179, h: 2556, name: 'iphone-16-pro' },
  { w: 1284, h: 2778, name: 'iphone-14-plus' },
  { w: 1170, h: 2532, name: 'iphone-14' },
  { w: 1125, h: 2436, name: 'iphone-x' },
  { w: 1242, h: 2688, name: 'iphone-xs-max' },
  { w: 828,  h: 1792, name: 'iphone-xr' },
  { w: 750,  h: 1334, name: 'iphone-se' }
];

async function main() {
  await mkdir(ICON_DIR, { recursive: true });
  await mkdir(SPLASH_DIR, { recursive: true });

  await renderPNG(iconSVG(192), join(ICON_DIR, 'icon-192.png'));
  await renderPNG(iconSVG(512), join(ICON_DIR, 'icon-512.png'));
  await renderPNG(iconSVG(180), join(ICON_DIR, 'apple-touch-icon-180.png'));
  await renderPNG(maskableIconSVG(512), join(ICON_DIR, 'icon-512-maskable.png'));
  console.log('icons → public/icons/');

  for (const s of SPLASH_SIZES) {
    const out = join(SPLASH_DIR, `apple-splash-${s.w}x${s.h}.png`);
    await renderPNG(splashSVG(s.w, s.h), out);
    console.log(`splash ${s.w}x${s.h} (${s.name}) → ${out}`);
  }
}

main().catch(err => { console.error(err); process.exit(1); });
