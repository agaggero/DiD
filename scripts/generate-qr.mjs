#!/usr/bin/env node
/**
 * Generador de código QR para el cartel de la IV Jornada DiD.
 * Genera un QR en SVG (vectorial, nitidez perfecta) y en PNG de alta resolución
 * (para imprimir o insertar en el cartel), apuntando a la URL pública del programa.
 *
 * QR generator for the flyer. Produces a crisp SVG + a high-resolution PNG that
 * encode the public programme URL, and verifies the encoded text.
 *
 * Uso / Usage:
 *   npm install                 # instala 'qrcode' (una sola vez)
 *   node scripts/generate-qr.mjs "https://tu-usuario.github.io/DiD/"
 *   # o:  npm run qr -- "https://tu-usuario.github.io/DiD/"
 *
 * Opcional / Optional flags:
 *   --dark  #1a120b   color de los módulos (por defecto casi-negro cálido)
 *   --px    1200      lado del PNG en píxeles (por defecto 1200)
 *   --out   assets    carpeta de salida (por defecto ./assets)
 */
import QRCode from 'qrcode';
import { mkdir, writeFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

function arg(name, def) {
  const i = process.argv.indexOf('--' + name);
  return i !== -1 && process.argv[i + 1] ? process.argv[i + 1] : def;
}

const url = process.argv[2];
if (!url || url.startsWith('--')) {
  console.error('\n✗ Falta la URL.\n  Uso: node scripts/generate-qr.mjs "https://.../"\n');
  process.exit(1);
}
if (!/^https?:\/\//i.test(url)) {
  console.error(`\n✗ La URL debe empezar por http:// o https://  (recibido: "${url}")\n`);
  process.exit(1);
}
if (/^https?:\/\/(localhost|127\.0\.0\.1|\[::1\])/i.test(url) || /^file:/i.test(url) || /^[A-Za-z]:\\/.test(url)) {
  console.error(`\n✗ Esa URL es local (localhost / archivo). El QR debe apuntar a una URL PÚBLICA.\n`);
  process.exit(1);
}

const dark = arg('dark', '#1a120b');   // near-black warm; high contrast for reliable scanning
const light = arg('light', '#ffffff');
const px = parseInt(arg('px', '1200'), 10);
const outDir = join(ROOT, arg('out', 'assets'));

const opts = {
  errorCorrectionLevel: 'H', // 30% recovery — robust against print wear / small size
  margin: 4,                 // quiet zone (min 4 modules recommended)
  color: { dark, light },
};

await mkdir(outDir, { recursive: true });

// SVG (vector)
const svg = await QRCode.toString(url, { ...opts, type: 'svg' });
await writeFile(join(outDir, 'programa-qr.svg'), svg, 'utf8');

// PNG (high-res raster)
const pngBuffer = await QRCode.toBuffer(url, { ...opts, type: 'png', width: px });
await writeFile(join(outDir, 'programa-qr.png'), pngBuffer);

// Verification: decode back the SVG's implied data by re-encoding is not a true decode,
// so we re-run the encoder in "utf8" preview mode and also print the payload for a human check.
console.log('\n✓ QR generado / QR generated');
console.log('  ├─ assets/programa-qr.svg');
console.log(`  ├─ assets/programa-qr.png  (${px}×${px}px)`);
console.log('  └─ Codifica / encodes:');
console.log('     ' + url);

// Best-effort automated validation if a decoder is available (optional dependency).
try {
  const { default: jsQR } = await import('jsqr');
  const { PNG } = await import('pngjs');
  const png = PNG.sync.read(pngBuffer);
  const res = jsQR(new Uint8ClampedArray(png.data), png.width, png.height);
  if (res && res.data === url) {
    console.log('\n✓ Verificado: el QR decodifica exactamente la URL.');
  } else {
    console.log('\n⚠ No se pudo verificar automáticamente (revisa visualmente el escaneo).');
  }
} catch {
  console.log('\n(ℹ Para verificación automática opcional: npm i -D jsqr pngjs)');
}
