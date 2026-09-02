/* Packs the built site into one self-contained HTML file — every image, font,
 * stylesheet and script inlined — so it can be opened or shared without a
 * server. Used for review previews; the real site is served from dist/.
 *
 * Two things cannot survive the trip and are expected to be inert in the
 * standalone file: the Google Maps embeds, and posting the enquiry forms,
 * both of which need a real host.
 *
 *   node scripts/standalone.mjs [out.html]
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import sharp from 'sharp';

const OUT = process.argv[2] ?? 'dist-standalone/ashima-preview.html';
const DIST = 'dist';
const MAX_WIDTH = 1400;
const QUALITY = 72;

if (!fs.existsSync(DIST)) {
  console.error('Run `npm run build` first — dist/ not found.');
  process.exit(1);
}

const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
  e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]);

/* ---- images: re-encode down to something a single file can carry ---- */
const images = walk('public/images').filter((f) => /\.(jpe?g|png)$/i.test(f));
const dataUris = new Map();
let before = 0;
let after = 0;

for (const file of images) {
  const web = '/' + path.relative('public', file).split(path.sep).join('/');
  const raw = fs.readFileSync(file);
  before += raw.length;
  // WebP, because base64 inflates by a third and the whole file has to fit in
  // one document.
  const out = await sharp(raw)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toBuffer();
  after += out.length;
  dataUris.set(web, `data:image/webp;base64,${out.toString('base64')}`);
}

/* ---- fonts: the logo wordmark's face ---- */
for (const file of walk('public/fonts').filter((f) => f.endsWith('.woff2'))) {
  const web = '/' + path.relative('public', file).split(path.sep).join('/');
  dataUris.set(web, `data:font/woff2;base64,${fs.readFileSync(file).toString('base64')}`);
}

/* ---- rewrite every reference ----------------------------------------------
   The bundle names the same photograph several times over (65 project entries
   share six stand-ins), so substituting the data URI at each mention would
   carry the same megabyte a dozen times. Instead each URI is emitted once into
   a lookup, and the script's own string literals become lookups into it.
   Longest path first, so no path that prefixes another is eaten. -------- */
const paths = [...dataUris.keys()].sort((a, b) => b.length - a.length);

const assets = fs.readdirSync(path.join(DIST, 'assets'));

// CSS mentions the fonts once each, so a direct substitution is honest there.
const css = paths.reduce(
  (acc, p) => acc.split(p).join(dataUris.get(p)),
  assets.filter((f) => f.endsWith('.css'))
    .map((f) => fs.readFileSync(path.join(DIST, 'assets', f), 'utf8')).join('\n'),
);

let js = assets.filter((f) => f.endsWith('.js'))
  .map((f) => fs.readFileSync(path.join(DIST, 'assets', f), 'utf8')).join('\n');

const used = new Set();

// A path can also sit inside a longer string, as `url('/images/x.jpg')` in an
// inline background. Substitute those first and in place: rewriting them as a
// lookup would splice an expression into the middle of a string literal and
// break it. There are only a handful, so the repetition costs little.
for (const p of paths) {
  for (const quote of ['"', "'", '']) {
    const wrapped = `url(${quote}${p}${quote})`;
    if (!js.includes(wrapped)) continue;
    js = js.split(wrapped).join(`url(${dataUris.get(p)})`);
  }
}

// Everything else is a standalone string literal, and becomes a lookup so each
// photograph is carried once however many entries name it.
for (const p of paths) {
  for (const quote of ['"', "'"]) {
    const literal = quote + p + quote;
    if (!js.includes(literal)) continue;
    used.add(p);
    js = js.split(literal).join(`__ASSET[${JSON.stringify(p)}]`);
  }
}

const table = `const __ASSET = ${JSON.stringify(
  Object.fromEntries([...used].map((p) => [p, dataUris.get(p)])),
)};\n`;
js = table + js;

// The substitutions above splice into minified source, so prove the result
// still parses rather than shipping a file that fails silently in the browser.
{
  const probe = path.join(os.tmpdir(), `ashima-standalone-${process.pid}.mjs`);
  fs.writeFileSync(probe, js);
  try {
    execFileSync(process.execPath, ['--check', probe], { stdio: 'pipe' });
  } catch {
    fs.rmSync(probe, { force: true });
    console.error('Inlining produced invalid JavaScript. A path was probably');
    console.error('substituted inside a larger string literal. Nothing written.');
    process.exit(1);
  }
  fs.rmSync(probe, { force: true });
}

const favicon = fs.readFileSync('public/favicon.svg', 'utf8');
const faviconUri = `data:image/svg+xml;base64,${Buffer.from(favicon).toString('base64')}`;

/* The document body only — a host may supply its own <html>/<head> wrapper. */
const html = `<title>Ashima Engineering</title>
<meta name="description" content="Residential developer in South Kolkata since 1995. Sixty-plus buildings delivered in Santoshpur, Garfa, Jadavpur, Mukundapur, Baruipur and Sonarpur." />
<meta name="format-detection" content="telephone=no" />
<link rel="icon" type="image/svg+xml" href="${faviconUri}" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400;1,500&family=Karla:wght@400;500;600;700&display=swap" />
<style>
${css}
</style>
<div id="root"></div>
<script type="module">
${js.split('</script').join('<\\/script')}
</script>
`;

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, html);

const mb = (n) => (n / 1048576).toFixed(2) + ' MiB';
console.log(`images  ${mb(before)} -> ${mb(after)} (${images.length} files, max ${MAX_WIDTH}px q${QUALITY})`);
console.log(`inlined ${used.size} of ${paths.length} assets into the script lookup`);
console.log(`written ${OUT}  ${mb(fs.statSync(OUT).size)}`);
