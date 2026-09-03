/* Proves that a file written the way the CMS writes it comes out of
   scripts/gen-content.mjs as the shape the app expects.

   This is the seam that would otherwise break quietly. The markdown in
   content/ was written by hand, in a tidy style; the CMS emits real YAML from
   a serialiser, which folds long prose across lines, quotes differently,
   writes lists as blocks rather than inline, sends blank number fields as
   empty strings, and cannot express an open-ended map so it sends
   specifications as a list of rows instead. Every one of those is valid YAML
   that the old hand-rolled parser would have mangled, and a mangled field
   does not throw — it just quietly reaches the page as nothing.

   Run by npm test. It works in a temporary directory and never touches
   content/ or src/data.
*/
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import yaml from 'js-yaml';
import { execFileSync } from 'node:child_process';

let pass = 0, fail = 0;
const t = (name, ok, detail = '') => {
  console.log(`  ${ok ? 'ok  ' : 'FAIL'}  ${name}${detail ? ' — ' + detail : ''}`);
  ok ? pass++ : fail++;
};

const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'cms-roundtrip-'));
const out = fs.mkdtempSync(path.join(os.tmpdir(), 'cms-out-'));
fs.mkdirSync(path.join(dir, 'projects'), { recursive: true });
fs.mkdirSync(path.join(dir, 'institutional'), { recursive: true });

/* What the CMS sends for a project the editor filled in, including the two
   fields they left blank. Serialised with the default flow settings a YAML
   emitter uses, so long strings wrap and lists are written as blocks. */
const fromCms = {
  name: 'Test Court',
  status: 'available',
  locality: 'Mukundapur',
  summary: 'Eight flats in Mukundapur, two and three bedroom, possession 2027.',
  reraNumber: 'WBRERA/P/SOU/2026/001234',
  reraVerified: true,
  possessionDate: 'March 2027',
  yearCompleted: '',            // left blank in the editor
  unitTypes: ['2 BHK', '3 BHK'],
  totalUnits: 8,
  unitsAvailable: 3,
  floors: 4,
  carpetAreaMin: 700,
  carpetAreaMax: 1150,
  address: 'Mukundapur, Kolkata, West Bengal 700099',
  lat: 22.5031,
  lng: 88.3985,
  nearby:
    'Ruby General Hospital and the Eastern Metropolitan Bypass are within two '
    + 'kilometres, the Mukundapur bus stand is a five-minute walk, and the local '
    + 'markets are on Mukundapur Main Road with the nearest schools in Santoshpur.',
  amenities: ['Lift', 'Covered parking', 'Standby generator for common areas'],
  specifications: [
    { label: 'Structure', value: 'RCC framed structure on a raft foundation.' },
    { label: 'Doors and windows', value: 'Seasoned hardwood frames with flush doors.' },
  ],
  images: [
    { src: '/images/projects/sraboni-a.jpg', alt: 'A four-storey building seen from the road.', standIn: true },
  ],
  featured: false,
  copyIsDraft: false,
};

const body = 'Eight flats over four floors.\n\nCome and see the site before you decide.';
fs.writeFileSync(
  path.join(dir, 'projects', 'test-court.md'),
  `---\n${yaml.dump(fromCms, { lineWidth: 80 })}---\n\n${body}\n`,
);

fs.writeFileSync(
  path.join(dir, 'institutional', 'test-org.md'),
  `---\n${yaml.dump({ organisation: 'Test Ltd', scope: 'Civil works', year: '2011', status: 'Completed', order: 1, copyIsDraft: false })}---\n\nNotes.\n`,
);
fs.writeFileSync(path.join(dir, 'image-credits.json'), JSON.stringify({ credits: [] }, null, 2));
fs.writeFileSync(path.join(dir, 'settings.json'), fs.readFileSync('content/settings.json'));

/* The generator is pointed at a temporary output directory, so the real
   generated modules are never written to and cannot be left holding this
   test's data if something here fails. */
execFileSync(process.execPath, ['scripts/gen-content.mjs', dir, out], { stdio: 'pipe' });
const generated = fs.readFileSync(path.join(out, 'projects.ts'), 'utf8');

const projects = JSON.parse(generated.match(/= (\[[\s\S]*\]);\s*$/)[1]);
const p = projects.find((x) => x.id === 'test-court');

t('a CMS-written file is read at all', !!p);
if (p) {
  t('the folded paragraph survives as one line',
    typeof p.nearby === 'string' && p.nearby.includes('Ruby General Hospital') && !p.nearby.includes('\n'),
    p.nearby ? `${p.nearby.length} chars` : String(p.nearby));

  t('specifications become a map, not a list',
    p.specifications && !Array.isArray(p.specifications)
      && p.specifications.Structure === 'RCC framed structure on a raft foundation.',
    JSON.stringify(p.specifications));

  t('a specification heading with spaces keeps its wording',
    !!(p.specifications && p.specifications['Doors and windows']));

  t('a number left blank becomes null, not an empty string',
    p.yearCompleted === null, JSON.stringify(p.yearCompleted));

  t('block lists are read as arrays',
    Array.isArray(p.unitTypes) && p.unitTypes.length === 2 && p.unitTypes[0] === '2 BHK',
    JSON.stringify(p.unitTypes));

  t('amenities survive', Array.isArray(p.amenities) && p.amenities.length === 3);

  t('images keep src, alt and the stand-in flag',
    p.images.length === 1 && p.images[0].alt.startsWith('A four-storey')
      && p.images[0].standIn === true);

  t('numbers stay numbers', typeof p.totalUnits === 'number' && typeof p.lat === 'number');

  t('the registration number is untouched',
    p.reraNumber === 'WBRERA/P/SOU/2026/001234', p.reraNumber);

  t('booleans survive', p.reraVerified === true && p.featured === false && p.copyIsDraft === false);

  t('the body is split into paragraphs',
    Array.isArray(p.body) && p.body.length === 2 && p.body[1].startsWith('Come and see'),
    JSON.stringify(p.body));
}

fs.rmSync(dir, { recursive: true, force: true });
fs.rmSync(out, { recursive: true, force: true });

console.log('  ' + '-'.repeat(58));
console.log(`  ${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
