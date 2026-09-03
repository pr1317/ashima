/* The lists of allowed localities and statuses, read out of src/lib/types.ts.

   These are needed in three places: the app, the content lint, and the
   dropdowns the CMS shows an editor. Keeping three copies in step by hand is
   the sort of thing nobody notices has gone wrong until an editor picks a
   locality the app has never heard of and the page renders blank. So
   src/lib/types.ts stays the one place they are written down, and this reads
   them back out. It throws rather than guessing if the shape of that file
   changes, because a silently empty list here would turn the lint into a
   check that passes everything. */
import fs from 'node:fs';

const source = fs.readFileSync('src/lib/types.ts', 'utf8');

const between = (start, end, what) => {
  const from = source.indexOf(start);
  if (from === -1) throw new Error(`content-schema: no ${what} in src/lib/types.ts`);
  const to = source.indexOf(end, from + start.length);
  if (to === -1) throw new Error(`content-schema: ${what} is not closed in src/lib/types.ts`);
  return source.slice(from + start.length, to);
};

const quoted = (text) => [...text.matchAll(/'([^']+)'/g)].map((m) => m[1]);

export const LOCALITIES = quoted(between('export const LOCALITIES = [', ']', 'LOCALITIES'));
export const STATUSES = quoted(between("export type Status =", ';', 'Status'));

/** The human wording for each status, taken from the same file so the CMS
 *  dropdown reads the way the site does. */
export const STATUS_LABELS = Object.fromEntries(
  [...between('export const STATUS_LABELS: Record<Status, string> = {', '};', 'STATUS_LABELS')
    .matchAll(/'?([a-z-]+)'?:\s*'([^']+)'/g)].map((m) => [m[1], m[2]]),
);

if (!LOCALITIES.length) throw new Error('content-schema: LOCALITIES came back empty');
if (!STATUSES.length) throw new Error('content-schema: STATUSES came back empty');
