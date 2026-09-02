/* Guards the WBRERA display rules against future edits. Run after a build:
     npm run build && npm test

   These check the things the order actually specifies — that the number is
   present, that it is not hidden behind an interaction, and that its size is
   still derived from the project-name size rather than hard-coded.

   The first two groups read the source and always run. The third renders the
   built site in a real browser, because "never hidden at any breakpoint" is
   not a claim you can check by reading CSS. It needs Playwright:
     npm i -D playwright && npx playwright install chromium
   Without it that group is skipped with a notice rather than silently passing.
   ========================================================================= */
import fs from 'node:fs';
import { createServer } from 'node:http';
import path from 'node:path';

const fail = [];
const pass = [];
const skip = [];
const t = (name, ok, detail = '') => (ok ? pass : fail).push(name + (detail ? ` — ${detail}` : ''));

// ---- 1. The size rule is still derived, not frozen -------------------------
const css = fs.readFileSync('src/styles/ashima.css', 'utf8');
const rera = css.match(/\.rera\s*\{[^}]*\}/s)?.[0] ?? '';
t('.rera exists in ashima.css', Boolean(rera));
t('.rera size is derived from --rera-title', /calc\(\s*var\(--rera-title\)\s*\/\s*3\s*\)/.test(rera));
t('.rera keeps a legibility floor', /max\(/.test(rera));
t('.rera floor names a property that is actually defined',
  /var\(--rera-floor\)/.test(rera) && /--rera-floor:\s*[\d.]+/.test(css));
// Only the strip itself matters here. `.rera-pop` is the explainer popover,
// which is supposed to start closed — so match `.rera` only when it is not
// followed by a name character or hyphen.
t('.rera is not hidden at any breakpoint',
  ![...css.matchAll(/\.rera(?![\w-])[^{]*\{([^}]*)\}/gs)]
    .some((m) => /display:\s*none|visibility:\s*hidden/.test(m[1])));
t('.rera is not rotated', !/\.rera(?![\w-])[^{]*\{[^}]*transform:\s*rotate/s.test(css));
t('.rera is not faded',
  ![...css.matchAll(/\.rera(?![\w-])[^{]*\{([^}]*)\}/gs)]
    .some((m) => /opacity:\s*0?\.[0-8]/.test(m[1])));

// ---- 2. The component still sets --rera-title and cites the order ---------
const comp = fs.readFileSync('src/components/rera-strip.tsx', 'utf8');
t('ReraStrip sets --rera-title inline', /'--rera-title':\s*titleSize/.test(comp));
t('ReraStrip cites the legal basis', /492-RERA\/L-01\/2023/.test(comp));
t('ReraStrip renders the portal address', /www\.rera\.wb\.gov\.in/.test(comp));
const sources = ['src/components', 'src/pages'].flatMap((dir) =>
  fs.readdirSync(dir, { withFileTypes: true })
    .filter((e) => e.isFile() && e.name.endsWith('.tsx'))
    .map((e) => path.join(dir, e.name)));
// A faded strip is a hidden strip. Nothing that renders one may sit inside the
// scroll-reveal wrapper, which starts at opacity 0.
t('ReraStrip is never wrapped in Reveal',
  !sources.some((f) => /<Reveal[^>]*>[\s\S]{0,800}<ReraStrip/.test(fs.readFileSync(f, 'utf8'))));
const card = fs.readFileSync('src/components/project-card.tsx', 'utf8');
t('ProjectCard renders a strip, guarded on the project being live',
  /<ReraStrip/.test(card) && /live && p\.reraNumber/.test(card));
t('ProjectCard passes a CSS expression, not a frozen size',
  /titleSize="var\(--/.test(card));
t('Project page passes a CSS expression, not a frozen size',
  /titleSize="var\(--/.test(fs.readFileSync('src/pages/project-detail.tsx', 'utf8')));

// ---- 3. The rendered DOM, at three widths ---------------------------------
const projects = JSON.parse(
  fs.readFileSync('src/data/projects.ts', 'utf8')
    .match(/export const projects: Project\[\] = (\[[\s\S]*\]);\s*$/)[1],
);
const live = projects.filter((p) => p.status === 'available' || p.status === 'under-construction');

let chromium = null;
try { ({ chromium } = await import('playwright')); } catch { /* optional */ }

if (!fs.existsSync('dist')) {
  skip.push('rendered DOM checks — dist/ not found, run `npm run build` first');
} else if (!chromium) {
  skip.push('rendered DOM checks — playwright not installed (npm i -D playwright && npx playwright install chromium)');
} else {
  const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
                  '.svg': 'image/svg+xml', '.jpg': 'image/jpeg', '.woff2': 'font/woff2',
                  '.xml': 'application/xml', '.txt': 'text/plain' };
  const server = createServer((req, res) => {
    const url = decodeURIComponent((req.url ?? '/').split('?')[0]);
    let file = path.join('dist', url);
    if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) file = path.join('dist', 'index.html');
    res.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] ?? 'application/octet-stream' });
    res.end(fs.readFileSync(file));
  });
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  const origin = `http://127.0.0.1:${server.address().port}`;

  const browser = await chromium.launch();
  // 360 is a small Android handset, which is most of this audience.
  for (const width of [360, 768, 1400]) {
    const ctx = await browser.newContext({ viewport: { width, height: 900 } });

    for (const route of ['/', '/projects']) {
      const page = await ctx.newPage();
      await page.goto(origin + route, { waitUntil: 'networkidle' });
      const strips = await page.locator('[data-testid="rera-strip"]').count();
      t(`${width}px ${route}: one strip per live project card`,
        strips === live.length, `found ${strips}, expected ${live.length}`);
      await page.close();
    }

    for (const p of live) {
      const page = await ctx.newPage();
      await page.goto(`${origin}/projects/${p.id}`, { waitUntil: 'networkidle' });
      const strip = page.locator('[data-testid="rera-strip"]').first();

      t(`${width}px ${p.id}: strip is visible`, await strip.isVisible());
      t(`${width}px ${p.id}: number is the registered one`,
        (await page.locator('[data-testid="rera-number"]').first().innerText()).trim() === p.reraNumber);

      const style = await strip.evaluate((el) => {
        const cs = getComputedStyle(el);
        const title = getComputedStyle(document.querySelector('h1'));
        // Resolve the legibility floor to pixels the same way the browser does.
        // This must name the same custom property the .rera rule uses; if it
        // names a property that does not exist the probe silently reports the
        // inherited size and the check stops meaning anything.
        const probe = document.createElement('span');
        probe.style.cssText = 'position:absolute;visibility:hidden;font-size:var(--rera-floor)';
        document.body.appendChild(probe);
        const floor = parseFloat(getComputedStyle(probe).fontSize);
        probe.remove();
        return {
          opacity: Number(cs.opacity), display: cs.display, visibility: cs.visibility,
          transform: cs.transform, size: parseFloat(cs.fontSize),
          titleSize: parseFloat(title.fontSize), floor,
        };
      });
      t(`${width}px ${p.id}: not faded`, style.opacity === 1, `opacity ${style.opacity}`);
      t(`${width}px ${p.id}: not hidden`,
        style.display !== 'none' && style.visibility !== 'hidden');
      t(`${width}px ${p.id}: not rotated`,
        style.transform === 'none' || style.transform === 'matrix(1, 0, 0, 1, 0, 0)',
        style.transform);
      // The rule is max(--step--2, title / 3). Check the strip really is that,
      // not merely "big enough" — a frozen size would pass a floor-only test.
      const expected = Math.max(style.floor, style.titleSize / 3);
      t(`${width}px ${p.id}: size is one third of the title`,
        Math.abs(style.size - expected) < 1,
        `strip ${style.size.toFixed(1)}px, expected ${expected.toFixed(1)}px ` +
        `(title ${style.titleSize.toFixed(1)}px, floor ${style.floor.toFixed(1)}px)`);

      // The number must not need an interaction to appear. The explainer may.
      t(`${width}px ${p.id}: number needs no interaction`,
        await strip.evaluate((el) => !el.closest('details, [hidden], [aria-hidden="true"]')));
      await page.close();
    }
    await ctx.close();
  }
  await browser.close();
  server.close();
}

console.log(`\n  WBRERA display tests\n  ${'-'.repeat(58)}`);
pass.forEach((p) => console.log('  ok    ' + p));
skip.forEach((s) => console.log('  skip  ' + s));
fail.forEach((f) => console.log('  FAIL  ' + f));
console.log(`  ${'-'.repeat(58)}\n  ${pass.length} passed, ${fail.length} failed, ${skip.length} skipped\n`);
process.exit(fail.length ? 1 : 0);
