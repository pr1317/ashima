/* Compiles the markdown in content/ into the typed data modules the app reads:
 *   npm run content
 * This runs as the first step of every build, so the markdown is the single
 * source of truth: edit a file under content/, push, and the site rebuilds
 * from it. The generated files under src/data are committed too, which keeps
 * `git diff` honest about what a content change actually did.
 *
 * Frontmatter is parsed with js-yaml on the YAML 1.2 core schema rather than
 * by hand. The hand-rolled parser this replaces understood only the subset of
 * YAML the hand-written files happened to use, which stopped being a safe
 * assumption once the CMS started writing these files: a real YAML emitter
 * folds long strings into block scalars and quotes differently, and the old
 * parser would have read that as garbage without complaining. The core schema
 * is deliberate — it resolves null, booleans and numbers and leaves every
 * other scalar a string, so a bare date stays the text the editor typed
 * instead of turning into a Date, and a locality of "no" stays "no". */
import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';

/* Both paths can be overridden on the command line — `node
   scripts/gen-content.mjs <content dir> <output dir>` — so a test can compile
   a fixture without the real generated modules going anywhere near it. */
const SRC = process.argv[2] ?? 'content';
const OUT = path.resolve(process.argv[3] ?? 'src/data');

function parseFrontmatter(text, file) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) throw new Error(`${file}: no frontmatter`);
  const [, head, body] = m;
  let data;
  try {
    data = yaml.load(head, { schema: yaml.CORE_SCHEMA, filename: file }) ?? {};
  } catch (err) {
    throw new Error(`${file}: frontmatter is not valid YAML — ${err.message}`);
  }
  if (typeof data !== 'object' || Array.isArray(data)) {
    throw new Error(`${file}: frontmatter must be a set of key: value fields`);
  }
  return { data, body: (body ?? '').trim() };
}

/** Specifications are a table of headings and text. Hand-written files carry
 *  them as a nested map, which reads well in an editor. The CMS cannot write
 *  an open-ended map, so it writes a list of {label, value} rows instead and
 *  this folds that form back into the same map. Both shapes are supported on
 *  purpose: neither the files nor the CMS has to be converted to match the
 *  other. Anything else — including the empty list a stripped-out block
 *  leaves behind — becomes null, which is what "this project has no
 *  specifications table" means downstream. */
const toSpecifications = (value) => {
  if (!value) return null;
  if (Array.isArray(value)) {
    const out = {};
    for (const row of value) {
      if (!row || typeof row !== 'object') continue;
      const label = String(row.label ?? '').trim();
      const text = String(row.value ?? '').trim();
      if (label && text) out[label] = text;
    }
    return Object.keys(out).length ? out : null;
  }
  return typeof value === 'object' ? value : null;
};

/** The CMS writes every list field, so an untouched one arrives as null
 *  rather than being absent. Both mean "empty" here. */
const list = (value) => (Array.isArray(value) ? value : []);

/** A number field the editor left blank comes back as an empty string, not
 *  as a missing key. Left alone that empty string would flow all the way
 *  into the typed data as `floors: ""`, so it is turned into null here — the
 *  same thing an absent field means. A value that is genuinely not a number
 *  is left exactly as typed, so the content lint can name it in the error
 *  instead of quietly rounding it away. */
const num = (value) => (value === null || value === undefined || value === '' ? null : value);

/** Likewise for optional text: blank and absent are the same thing. */
const str = (value) => {
  if (value === null || value === undefined) return null;
  const t = String(value).trim();
  return t === '' ? null : value;
};

const read = (dir) =>
  fs.readdirSync(path.join(SRC, dir))
    .filter((f) => f.endsWith('.md'))
    .sort()
    .map((f) => {
      const file = path.join(SRC, dir, f);
      const { data, body } = parseFrontmatter(fs.readFileSync(file, 'utf8'), file);
      return { id: f.replace(/\.md$/, ''), ...data, body };
    });

const projects = read('projects').map((p) => ({
  id: p.id,
  name: p.name,
  locality: p.locality,
  status: p.status,
  reraNumber: str(p.reraNumber),
  reraVerified: p.reraVerified ?? false,
  yearCompleted: num(p.yearCompleted),
  possessionDate: str(p.possessionDate),
  unitTypes: list(p.unitTypes),
  carpetAreaMin: num(p.carpetAreaMin),
  carpetAreaMax: num(p.carpetAreaMax),
  totalUnits: num(p.totalUnits),
  unitsAvailable: num(p.unitsAvailable),
  floors: num(p.floors),
  address: str(p.address),
  lat: num(p.lat),
  lng: num(p.lng),
  specifications: toSpecifications(p.specifications),
  amenities: list(p.amenities),
  nearby: str(p.nearby),
  images: list(p.images).map((i) => ({
    src: i.src, alt: i.alt, standIn: i.standIn ?? false,
  })),
  featured: p.featured ?? false,
  summary: p.summary ?? '',
  copyIsDraft: p.copyIsDraft ?? true,
  body: p.body.split(/\n\s*\n/).map((s) => s.replace(/\s*\n\s*/g, ' ').trim()).filter(Boolean),
}));

const institutional = read('institutional')
  .map(({ id, organisation, scope, year, status, order, copyIsDraft }) =>
    ({ id, organisation, scope, year, status, order: order ?? 0, copyIsDraft: copyIsDraft ?? true }))
  .sort((a, b) => a.order - b.order);

/* The credits file is an object with a `credits` list inside it rather than
 * a bare list, because the CMS cannot present a top-level JSON array as an
 * editable collection. The older bare-list form is still read, so a file
 * written before that change does not become a build failure. */
const creditsFile = JSON.parse(fs.readFileSync(path.join(SRC, 'image-credits.json'), 'utf8'));
const credits = Array.isArray(creditsFile) ? creditsFile : list(creditsFile.credits);

const settings = JSON.parse(fs.readFileSync(path.join(SRC, 'settings.json'), 'utf8'));

const banner = `/* GENERATED by scripts/gen-content.mjs from the markdown content\n * collections. Edit the markdown and re-run the script; do not edit here. */\n\n`;

fs.mkdirSync(OUT, { recursive: true });
fs.writeFileSync(
  path.join(OUT, 'projects.ts'),
  banner +
    `import type { Project } from '@/lib/types';\n\n` +
    `export const projects: Project[] = ${JSON.stringify(projects, null, 2)};\n`,
);
fs.writeFileSync(
  path.join(OUT, 'institutional.ts'),
  banner +
    `import type { InstitutionalClient } from '@/lib/types';\n\n` +
    `export const institutional: InstitutionalClient[] = ${JSON.stringify(institutional, null, 2)};\n`,
);
fs.writeFileSync(
  path.join(OUT, 'image-credits.ts'),
  banner +
    `import type { ImageCredit } from '@/lib/types';\n\n` +
    `export const imageCredits: ImageCredit[] = ${JSON.stringify(credits, null, 2)};\n`,
);
fs.writeFileSync(
  path.join(OUT, 'settings.ts'),
  banner +
    `import type { SiteSettings } from '@/lib/types';\n\n` +
    `export const settings: SiteSettings = ${JSON.stringify(settings, null, 2)};\n`,
);

console.log(`projects: ${projects.length}  institutional: ${institutional.length}  credits: ${credits.length}`);
const live = projects.filter((p) => p.status === 'available' || p.status === 'under-construction');
console.log(`live: ${live.map((p) => `${p.name} [${p.reraNumber}]`).join(', ')}`);
