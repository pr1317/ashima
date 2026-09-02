/* Writes dist/sitemap.xml after a build. A single-page app has no per-route
 * HTML for a crawler to discover, so every route is listed explicitly:
 * the fixed pages, plus one entry per project that has a page of its own. */
import fs from 'node:fs';
import path from 'node:path';

const ORIGIN = 'https://www.ashimaengineering.in';
const DIST = 'dist';

const source = fs.readFileSync('src/data/projects.ts', 'utf8');
const projects = JSON.parse(
  source.match(/export const projects: Project\[\] = (\[[\s\S]*\]);\s*$/)[1],
);

const routes = [
  ['/', '1.0'],
  ['/projects', '0.9'],
  ['/about', '0.8'],
  ['/about/founder', '0.6'],
  ['/land-owners', '0.8'],
  ['/institutional', '0.7'],
  ['/contact', '0.8'],
  ['/privacy', '0.3'],
  ['/credits', '0.3'],
];

for (const p of projects) {
  // Matches hasOwnPage() in src/lib/content.ts: generated stand-in entries get
  // a row on the record rather than a page of their own.
  if (p.images.length === 0 && p.id.startsWith('sample-')) continue;
  const live = p.status === 'available' || p.status === 'under-construction';
  routes.push([`/projects/${p.id}`, live ? '0.9' : '0.5']);
}

const today = new Date().toISOString().slice(0, 10);
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(([loc, priority]) => `  <url>
    <loc>${ORIGIN}${loc}</loc>
    <lastmod>${today}</lastmod>
    <priority>${priority}</priority>
  </url>`).join('\n')}
</urlset>
`;

fs.mkdirSync(DIST, { recursive: true });
fs.writeFileSync(path.join(DIST, 'sitemap.xml'), xml);
fs.writeFileSync(
  path.join(DIST, 'robots.txt'),
  `User-agent: *\nAllow: /\n\nSitemap: ${ORIGIN}/sitemap.xml\n`,
);
console.log(`sitemap: ${routes.length} URLs`);
