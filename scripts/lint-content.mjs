/* ============================================================================
   Content lint. Runs on every build, straight after the markdown is compiled.

   This exists because the content is now edited through a CMS by someone who
   is not a developer and will never see a TypeScript error. The type
   definitions in src/lib/types.ts describe what the app expects, but nothing
   was checking that the markdown actually matched them — a status typed as
   "avilable" or an image path pointing at a file nobody uploaded would sail
   through the build and break the page in the reader's browser instead.

   What counts as fatal here is narrow on purpose: only the things that would
   ship a broken page. Failing the build is the safe outcome, not the harsh
   one — Netlify keeps the previous deploy live when a build fails, so the
   worst case is that the site stays as it was and the editor sees why.

   Everything to do with WBRERA registration numbers is left to
   scripts/rera-guard.mjs, which owns that policy and the enforce switch.
   ========================================================================= */
import fs from 'node:fs';
import path from 'node:path';
import { LOCALITIES, STATUSES } from './content-schema.mjs';

const errors = [];
const warnings = [];
// Counted rather than listed. Every file is draft today, so one note per
// file would be 67 lines of identical text with the occasional real warning
// hidden in the middle of it.
const drafts = [];
const fail = (where, msg) => errors.push(`${where}: ${msg}`);
const warn = (where, msg) => warnings.push(`${where}: ${msg}`);

const readGenerated = (file, decl) => {
  const source = fs.readFileSync(path.join('src/data', file), 'utf8');
  const m = source.match(new RegExp(`${decl} = (\\[[\\s\\S]*\\]);\\s*$`));
  if (!m) {
    console.error(`Content lint: could not read src/data/${file}. Run npm run content.`);
    process.exit(1);
  }
  return JSON.parse(m[1]);
};

/* ---- projects ---------------------------------------------------------- */
const projects = readGenerated('projects.ts', 'export const projects: Project\\[\\]');

for (const p of projects) {
  const at = `content/projects/${p.id}.md`;

  if (!p.name || !String(p.name).trim()) fail(at, 'needs a name.');
  if (!p.summary || !String(p.summary).trim()) {
    fail(at, 'needs a one-line summary — it is the text on the project card.');
  }

  if (!STATUSES.includes(p.status)) {
    fail(at, `status is "${p.status}". It must be one of: ${STATUSES.join(', ')}.`);
  }
  if (!LOCALITIES.includes(p.locality)) {
    fail(at, `locality is "${p.locality}". It must be one of: ${LOCALITIES.join(', ')}.`);
  }

  // A half-filled coordinate pair puts the map pin in the Gulf of Guinea.
  const hasLat = p.lat !== null && p.lat !== undefined;
  const hasLng = p.lng !== null && p.lng !== undefined;
  if (hasLat !== hasLng) fail(at, 'has one of lat/lng but not the other. Give both or neither.');
  if (hasLat && (typeof p.lat !== 'number' || typeof p.lng !== 'number')) {
    fail(at, 'lat and lng must be plain numbers, with no quotes around them.');
  }

  for (const field of ['totalUnits', 'unitsAvailable', 'floors', 'carpetAreaMin', 'carpetAreaMax', 'yearCompleted']) {
    const v = p[field];
    if (v !== null && typeof v !== 'number') {
      fail(at, `${field} must be a number, not "${v}".`);
    }
  }
  if (typeof p.totalUnits === 'number' && typeof p.unitsAvailable === 'number'
      && p.unitsAvailable > p.totalUnits) {
    fail(at, `unitsAvailable (${p.unitsAvailable}) is more than totalUnits (${p.totalUnits}).`);
  }
  if (typeof p.carpetAreaMin === 'number' && typeof p.carpetAreaMax === 'number'
      && p.carpetAreaMin > p.carpetAreaMax) {
    fail(at, 'carpetAreaMin is larger than carpetAreaMax.');
  }

  p.images.forEach((img, n) => {
    const which = `image ${n + 1}`;
    if (!img.src) return fail(at, `${which} has no file.`);
    if (!img.alt || !String(img.alt).trim()) {
      fail(at, `${which} has no alt text. Describe the photograph for readers using a screen reader.`);
    }
    if (img.src.startsWith('/') && !fs.existsSync(path.join('public', img.src))) {
      fail(at, `${which} points at ${img.src}, which is not in the repository. Re-upload it.`);
    }
  });

  if (p.status === 'available' && !p.images.length) {
    warn(at, 'is open for booking but has no photographs.');
  }
  if (p.copyIsDraft) drafts.push(at);
}

/* ---- institutional ----------------------------------------------------- */
const institutional = readGenerated('institutional.ts', 'export const institutional: InstitutionalClient\\[\\]');
for (const c of institutional) {
  const at = `content/institutional/${c.id}.md`;
  for (const field of ['organisation', 'scope', 'year', 'status']) {
    if (!c[field] || !String(c[field]).trim()) fail(at, `needs ${field}.`);
  }
  if (typeof c.order !== 'number') fail(at, 'order must be a number — it sets the position in the list.');
  if (c.copyIsDraft) drafts.push(at);
}

/* ---- settings ---------------------------------------------------------- */
const settings = JSON.parse(fs.readFileSync('content/settings.json', 'utf8'));
const at = 'content/settings.json';
for (const field of ['phone', 'email', 'hours', 'hoursShort', 'street', 'locality',
                     'city', 'region', 'postcode', 'founded', 'firstDelivery']) {
  if (!settings[field] || !String(settings[field]).trim()) fail(at, `needs ${field}.`);
}
if (typeof settings.lat !== 'number' || typeof settings.lng !== 'number') {
  fail(at, 'lat and lng must be numbers.');
}
if (settings.email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(settings.email)) {
  fail(at, `email "${settings.email}" does not look like an email address.`);
}
// The phone number is printed as typed and also stripped down for the tel:
// and WhatsApp links, so it has to survive both readings.
if (settings.phone && settings.phone.replace(/[^0-9]/g, '').length < 10) {
  fail(at, `phone "${settings.phone}" has fewer than ten digits.`);
}
if (!Array.isArray(settings.openingHoursSchema) || !settings.openingHoursSchema.length) {
  fail(at, 'openingHoursSchema must be a list, and must agree with the hours sentence.');
}

/* ---- image credits ----------------------------------------------------- */
const creditsFile = JSON.parse(fs.readFileSync('content/image-credits.json', 'utf8'));
const credits = Array.isArray(creditsFile) ? creditsFile : (creditsFile.credits ?? []);
if (!Array.isArray(credits)) fail('content/image-credits.json', 'the credits entry must be a list.');
else credits.forEach((c, n) => {
  for (const field of ['file', 'purpose', 'title', 'author', 'licence', 'source']) {
    if (!c[field]) fail('content/image-credits.json', `entry ${n + 1} needs ${field}.`);
  }
});

// Every stand-in photograph has to be creditable, because the licences
// these are used under require attribution.
const credited = new Set(credits.map((c) => c.file));
for (const p of projects) {
  for (const img of p.images) {
    if (img.standIn && !credited.has(img.src)) {
      warn(`content/projects/${p.id}.md`, `${img.src} is a stand-in with no entry in image-credits.json.`);
    }
  }
}

/* ---- report ------------------------------------------------------------ */
if (drafts.length) {
  console.warn('');
  console.warn(`  ${drafts.length} entries still carry copy written for review rather than`);
  console.warn('  supplied by the business (copyIsDraft). Clear the flag as the real');
  console.warn('  wording goes in.');
}

if (warnings.length) {
  console.warn('');
  console.warn(`  Content notes (${warnings.length}), not blocking the build:`);
  warnings.forEach((w) => console.warn('   - ' + w));
  console.warn('');
}

if (!errors.length) {
  console.log(`Content lint: ${projects.length} projects and ${institutional.length} institutional entries are well formed.`);
  process.exit(0);
}

console.error('');
console.error(`  BUILD STOPPED. ${errors.length} problem${errors.length > 1 ? 's' : ''} in the content:`);
console.error('');
errors.forEach((e) => console.error('   * ' + e));
console.error('');
console.error('  Nothing has changed on the live site — it is still showing the last');
console.error('  version that built cleanly. Fix the entries above in the CMS and save');
console.error('  again, and the site will publish itself.');
console.error('');
process.exit(1);
