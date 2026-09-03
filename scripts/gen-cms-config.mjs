/* Writes public/admin/config.yml, the file that describes the editing screens
   to Decap CMS. Generated rather than hand-written for one reason: the
   locality and status dropdowns have to offer exactly what src/lib/types.ts
   allows. Hand-maintained, they drift — someone adds a locality to the app
   and the CMS keeps offering the old list, or the CMS offers one the app
   rejects and the editor's save fails the build with no way to tell why.

   Run by `npm run content`, and the result is committed like the other
   generated files, so the admin screen works from a plain checkout. */
import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';
import { LOCALITIES, STATUSES, STATUS_LABELS } from './content-schema.mjs';

const REPO = 'pr1317/ashima';
const BRANCH = 'main';

/* The registration number as WBRERA issues it, e.g. WBRERA/P/SOU/2024/001234.
   The pattern is deliberately loose about the middle segments and strict
   about the shape, so it catches a number typed into the wrong box without
   rejecting a legitimate one from a district this list has not seen. The
   trailing group also accepts the XXXXXX placeholders that are in the files
   today; scripts/rera-guard.mjs is what refuses to let those go live. */
const RERA_PATTERN = '^WBRERA/[A-Z]+/[A-Z]+/[0-9]{4}/[0-9X]{4,}$';

const project = {
  name: 'projects',
  label: 'Projects',
  label_singular: 'Project',
  description:
    'Every building, finished or being built. Anything open for booking or '
    + 'under construction must show its WBRERA registration number by law.',
  folder: 'content/projects',
  create: true,
  slug: '{{slug}}',
  preview_path: 'projects/{{slug}}',
  summary: '{{name}} — {{locality}} ({{status}})',
  sortable_fields: ['name', 'locality', 'status', 'yearCompleted'],
  view_groups: [{ label: 'Status', field: 'status' }],
  fields: [
    { name: 'name', label: 'Project name', widget: 'string' },
    {
      name: 'status', label: 'Status', widget: 'select',
      options: STATUSES.map((value) => ({ label: STATUS_LABELS[value] ?? value, value })),
      hint: 'Open for booking and Under construction are advertisements in law, and must carry a registration number.',
    },
    {
      name: 'locality', label: 'Locality', widget: 'select', options: [...LOCALITIES],
      hint: 'If the area you need is not listed, ask a developer to add it — the site filters and maps rely on this list.',
    },
    { name: 'summary', label: 'One-line summary', widget: 'string',
      hint: 'The sentence on the project card. Around ten words.' },

    {
      name: 'reraNumber', label: 'WBRERA registration number', widget: 'string',
      required: false, pattern: [RERA_PATTERN, 'Should look like WBRERA/P/SOU/2024/001234'],
      hint: 'Required for anything open for booking or under construction. Copy it exactly from the WBRERA certificate.',
    },
    {
      name: 'reraVerified', label: 'Registration number checked against the WBRERA portal',
      widget: 'boolean', default: false, required: false,
      hint: 'Only tick this once someone has looked the number up at rera.wb.gov.in and it matches.',
    },

    { name: 'possessionDate', label: 'Possession', widget: 'string', required: false,
      hint: 'As you would say it: "December 2026". Leave blank for finished buildings.' },
    { name: 'yearCompleted', label: 'Year handed over', widget: 'number', required: false,
      value_type: 'int', min: 1990, max: 2100 },

    { name: 'unitTypes', label: 'Flat types', widget: 'list', required: false,
      hint: 'One per line, for example 2 BHK.' },
    { name: 'totalUnits', label: 'Flats in total', widget: 'number', required: false, value_type: 'int', min: 0 },
    { name: 'unitsAvailable', label: 'Flats still unsold', widget: 'number', required: false, value_type: 'int', min: 0 },
    { name: 'floors', label: 'Floors', widget: 'number', required: false, value_type: 'int', min: 0 },
    { name: 'carpetAreaMin', label: 'Smallest carpet area (sq ft)', widget: 'number', required: false, value_type: 'int', min: 0 },
    { name: 'carpetAreaMax', label: 'Largest carpet area (sq ft)', widget: 'number', required: false, value_type: 'int', min: 0 },

    { name: 'address', label: 'Address', widget: 'string', required: false },
    { name: 'lat', label: 'Latitude', widget: 'number', required: false, value_type: 'float',
      hint: 'From Google Maps: right-click the site and the two numbers are at the top. Fill both or neither.' },
    { name: 'lng', label: 'Longitude', widget: 'number', required: false, value_type: 'float' },
    { name: 'nearby', label: 'What is nearby', widget: 'text', required: false },

    { name: 'amenities', label: 'Amenities', widget: 'list', required: false,
      hint: 'One per line: Lift, Covered parking, and so on.' },
    {
      name: 'specifications', label: 'Specifications', widget: 'list', required: false,
      label_singular: 'Specification', summary: '{{fields.label}}',
      hint: 'The table on the project page. Each row is a heading and its description.',
      fields: [
        { name: 'label', label: 'Heading', widget: 'string', hint: 'For example: Flooring' },
        { name: 'value', label: 'Description', widget: 'text' },
      ],
    },

    {
      name: 'images', label: 'Photographs', widget: 'list', required: false,
      label_singular: 'Photograph', summary: '{{fields.alt}}',
      fields: [
        { name: 'src', label: 'File', widget: 'image' },
        {
          name: 'alt', label: 'Description of the photograph', widget: 'string',
          hint: 'Read aloud to people who cannot see the image, so describe what is in it. Not the project name.',
        },
        {
          name: 'standIn', label: 'This is a stand-in, not our building', widget: 'boolean',
          default: false, required: false,
          hint: 'Tick while a borrowed photograph is standing in. It must then be credited in Image credits.',
        },
      ],
    },

    { name: 'featured', label: 'Show on the homepage', widget: 'boolean', default: false, required: false },
    {
      name: 'copyIsDraft', label: 'Wording is still a draft', widget: 'boolean', default: true, required: false,
      hint: 'Leave ticked until the wording below is what the business actually wants to say.',
    },
    {
      name: 'body', label: 'Description', widget: 'markdown', required: false,
      hint: 'A few paragraphs about the building. Plain sentences read best here.',
    },
  ],
};

const institutional = {
  name: 'institutional',
  label: 'Institutional and government work',
  label_singular: 'Contract',
  folder: 'content/institutional',
  create: true,
  slug: '{{slug}}',
  summary: '{{organisation}} — {{year}}',
  fields: [
    { name: 'organisation', label: 'Organisation', widget: 'string' },
    { name: 'scope', label: 'Scope of work', widget: 'text' },
    { name: 'year', label: 'Year', widget: 'string', hint: 'A year, or a range such as 2011–2014.' },
    { name: 'status', label: 'Status', widget: 'string', hint: 'For example: Completed, or Ongoing.' },
    { name: 'order', label: 'Position in the list', widget: 'number', value_type: 'int', default: 0,
      hint: 'Lower numbers appear first.' },
    { name: 'copyIsDraft', label: 'Wording is still a draft', widget: 'boolean', default: true, required: false },
    { name: 'body', label: 'Notes', widget: 'markdown', required: false },
  ],
};

const settings = {
  name: 'settings',
  label: 'Site details',
  files: [
    {
      name: 'contact',
      label: 'Contact details and opening hours',
      file: 'content/settings.json',
      description:
        'These appear in the footer, on the contact page, and in the '
        + 'information Google reads. They must match the Google Business '
        + 'Profile exactly — even a different space counts as a different '
        + 'business for local search.',
      fields: [
        { name: 'phone', label: 'Phone', widget: 'string', hint: 'Written as it should be read: +91 98300 53483' },
        { name: 'email', label: 'Email', widget: 'string' },
        {
          name: 'hours', label: 'Opening hours, in words', widget: 'string',
          hint: 'This is what visitors read. For example: Monday to Saturday, 10.30am to 8pm. Sunday, 11am to 5pm.',
        },
        { name: 'hoursShort', label: 'Opening hours, short form', widget: 'string',
          hint: 'A few words for tight spaces, such as "Open every day".' },
        {
          name: 'openingHoursSchema', label: 'Opening hours for search engines', widget: 'list',
          hint: 'The same hours in the notation Google reads: Mo-Sa 10:30-20:00 and Su 11:00-17:00. '
              + 'If you change the hours above, change these to match.',
        },
        { name: 'street', label: 'Street', widget: 'string' },
        { name: 'locality', label: 'Locality', widget: 'string' },
        { name: 'city', label: 'City', widget: 'string' },
        { name: 'region', label: 'State', widget: 'string' },
        { name: 'postcode', label: 'PIN code', widget: 'string' },
        { name: 'lat', label: 'Office latitude', widget: 'number', value_type: 'float' },
        { name: 'lng', label: 'Office longitude', widget: 'number', value_type: 'float' },
        { name: 'founded', label: 'Year the firm was founded', widget: 'string' },
        { name: 'firstDelivery', label: 'Year the first building was handed over', widget: 'string' },
      ],
    },
  ],
};

const credits = {
  name: 'credits',
  label: 'Image credits',
  files: [
    {
      name: 'list',
      label: 'Image credits',
      file: 'content/image-credits.json',
      description:
        'Every borrowed photograph on the site, and who it belongs to. The '
        + 'licences these are used under require the credit, so an entry has '
        + 'to stay here for as long as the photograph is in use.',
      fields: [
        {
          name: 'credits', label: 'Credits', widget: 'list', label_singular: 'Credit',
          summary: '{{fields.purpose}} — {{fields.author}}',
          fields: [
            { name: 'file', label: 'File path', widget: 'string', hint: 'For example /images/projects/hero.jpg' },
            { name: 'purpose', label: 'Where it is used', widget: 'string' },
            { name: 'title', label: 'Title of the photograph', widget: 'string' },
            { name: 'author', label: 'Photographer', widget: 'string' },
            { name: 'licence', label: 'Licence', widget: 'string', hint: 'For example CC BY-SA 4.0' },
            { name: 'source', label: 'Link to the original', widget: 'string' },
          ],
        },
      ],
    },
  ],
};

const config = {
  backend: {
    name: 'github',
    repo: REPO,
    branch: BRANCH,
    base_url: 'https://ashimaengineering.in',
    auth_endpoint: 'api/auth',
    commit_messages: {
      create: 'Add {{collection}} "{{slug}}" via the CMS',
      update: 'Update {{collection}} "{{slug}}" via the CMS',
      delete: 'Remove {{collection}} "{{slug}}" via the CMS',
      uploadMedia: 'Upload {{path}} via the CMS',
      deleteMedia: 'Delete {{path}} via the CMS',
    },
  },
  /* No publish_mode key, which means saving commits straight to main and the
     site rebuilds. The alternative, editorial_workflow, puts each save behind
     a pull request — right for a newsroom, wrong here: it leaves a lone
     editor with drafts stuck in a state they have no way to see or clear.
     The safety net instead is scripts/lint-content.mjs, which refuses to
     build a broken save and leaves the previous version live. */
  media_folder: 'public/images/uploads',
  public_folder: '/images/uploads',
  site_url: 'https://ashimaengineering.in',
  display_url: 'https://ashimaengineering.in',
  locale: 'en',
  collections: [project, institutional, settings, credits],
};

/* The editing software itself is copied out of node_modules rather than
   pulled from a CDN at runtime. It is the thing that writes to the
   repository, so it should be the version in package-lock.json and nothing
   else, and it should keep working on a connection that blocks public CDNs.
   Source maps are skipped — they are five times the weight of the code and
   nobody debugs the CMS from the admin page. */
const vendorFrom = path.join('node_modules', 'decap-cms', 'dist');
const vendorTo = path.join('public', 'admin', 'vendor');
fs.rmSync(vendorTo, { recursive: true, force: true });
fs.mkdirSync(vendorTo, { recursive: true });
let copied = 0;
for (const file of fs.readdirSync(vendorFrom)) {
  if (!file.endsWith('.js')) continue;
  fs.copyFileSync(path.join(vendorFrom, file), path.join(vendorTo, file));
  copied++;
}
if (!fs.existsSync(path.join(vendorTo, 'decap-cms.js'))) {
  console.error('cms config: decap-cms.js is missing from node_modules. Run npm install.');
  process.exit(1);
}

const out = path.join('public', 'admin', 'config.yml');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(
  out,
  '# GENERATED by scripts/gen-cms-config.mjs. Edit that file, not this one.\n'
  + '# The locality and status lists come from src/lib/types.ts.\n\n'
  + yaml.dump(config, { lineWidth: 100, noRefs: true }),
);
console.log(`cms config: ${config.collections.length} collections, ${LOCALITIES.length} localities, ${STATUSES.length} statuses, ${copied} vendored files`);
