# Ashima Engineering

Marketing and credibility website for a residential property developer in
South Kolkata, founded in 1993, with its first building handed over in 1995.

It is also, legally, a real estate advertisement under Indian law. Read the
WBRERA section below before changing anything on a project page.

Non-technical content instructions are in **[CONTENT.md](CONTENT.md)**.

## Stack

React 19 and TypeScript on Vite, built as a static single-page app with
[wouter](https://github.com/molefrog/wouter) for routing. The look is carried
by Tailwind v4 utilities in the components, over the design tokens in
`src/index.css` — shutter green, brass and terracotta on a plaster ground.
`src/styles/ashima.css` holds only what a utility cannot express: the WBRERA
size rule, form fields, tables and the editorial notes. Hosting is Netlify
static; the forms are Netlify Forms with a honeypot. No backend, no database,
no CMS.

Content is markdown in `content/`, compiled into typed data modules under
`src/data/` by `scripts/gen-content.mjs` (`npm run content`). Those modules are
committed, so a build needs nothing but this repository.

Because a single-page app serves one `index.html`, two things are handled
explicitly that a multi-page site gets for free: per-route `<title>`, meta and
canonical tags are written by `src/components/seo.tsx`, and `scripts/sitemap.mjs`
writes `dist/sitemap.xml` after every build.

## Running it

```bash
npm install
npm run dev            # http://localhost:5173
```

| Command | What it does |
|---|---|
| `npm run dev` | Development server with live reload. |
| `npm run build` | Review build — keeps the draft banner and sample RERA numbers. |
| `npm run build:launch` | Production build. Refuses to run while any live project has an unverified RERA number. |
| `npm test` | WBRERA display tests. Run after a build. |
| `npm run check:rera` | The launch guard on its own, without building. |
| `npm run typecheck` | TypeScript, no emit. |
| `npm run content` | Recompiles `src/data/` from the markdown in `content/`. |

Node 20 or newer.

## WBRERA compliance — read this

Under Section 11(2) of the Real Estate (Regulation and Development) Act 2016,
and WBRERA Order No. 492-RERA/L-01/2023 dated 07.03.2024, every advertisement
for a registered project — websites included — must display the project's
WBRERA registration number and the authority's website address. Penalties
reach 5% of estimated project cost and the West Bengal Housing department
surveys for compliance.

**Enforcement is currently switched off.** The switch is `enforce` in
`src/data/rera-policy.json`. While it is false the site builds regardless, and
unverified numbers are reported but do not stop anything. Set it to true once
the real numbers are in the project files.

1. **`scripts/rera-guard.mjs`** fails `npm run build:launch` when a project with
   status `available` or `under-construction` has no number, has one still
   flagged `reraVerified: false`, or has one that still contains `XXXX`. This is
   what stops a sample number reaching the live site.
2. **`scripts/test-rera.mjs`** checks the display rules themselves, and runs
   regardless of the switch. That the strip is on every live project card and
   page, that it is not hidden, rotated or faded, and that its font size is
   still worked out from the project-name size rather than hard-coded.

`src/components/rera-strip.tsx` carries the full legal note. The size rule is
`max(var(--rera-floor), calc(var(--rera-title) / 3))` — one third of the
project name in the same context, with a floor for legibility. Pass the same
CSS expression the heading uses, never a literal:
`titleSize="var(--page-title-size)"`, not `titleSize="3.4rem"`. A literal
freezes the ratio, and the test will catch it.

On a dark ground the strip sits on a near-opaque panel rather than a tint. It
is usually over a photograph, and the number has to be plainly legible against
whatever is behind it.

The strip is also never wrapped in `<Reveal>`. That wrapper starts at opacity 0,
and a faded strip is a hidden one. The test checks for this too.

The popover explaining what the number means lives in the same file but is a
separate component. That is where an interaction belongs. Never on the number
itself: hover does not exist on touch, and touch is most of this audience.

### Running the full test

`npm test` always runs the source checks. The part that renders the built site
in a real browser at 360, 768 and 1400 pixels — the only way to check "never
hidden at any breakpoint" honestly — needs Playwright, which is not a
dependency of this project:

```bash
npm run build
npm i -D playwright && npx playwright install chromium
npm test
```

Without it that group is reported as skipped rather than silently passing.

## Design

Palette from South Kolkata domestic architecture: lime plaster as the ground,
the deep green of timber window shutters, brass, and red-oxide floors as the
accent. Sections alternate between those grounds — plaster, deep green, brass,
terracotta — and each carries a numbered eyebrow (`01 / The name`).

Cormorant Garamond carries the display headings, set large with tight leading
and an italic phrase doing the emphasis. Karla carries body text and, in wide
uppercase tracking at 9–11px, every piece of interface text. Ashima Sans, a
Lato derivative under SIL OFL 1.1, is loaded for the logo wordmark alone — it is
the face the mark is drawn to. Its licence file must stay with the woff2 files
in `public/fonts/`.

Every route opens on a dark band: a photograph under a shutter-green wash,
drifting slightly on scroll, with the heading over it
(`src/components/page-hero.tsx`). The site header is transparent and sits on
that band, which is why every page has one.

The logo in `src/components/logo.tsx` is the shutter-louvre pediment over the
A of the wordmark, on a plinth of three courses, drawn in `currentColor` so it
takes the colour of whatever it sits on. The wordmark width is pinned with
`textLength` and `lengthAdjust="spacing"`, which is what keeps the text from
growing wider than the base of the mark whatever font has loaded. Do not remove
those attributes.

Motion is authored to fail open. `src/components/reveal.tsx` measures in a
layout effect and only *closes* elements that are still below the fold, so if
the effect never runs, if `IntersectionObserver` is missing, or if anything
throws, the page is simply already finished. A six-second timer sweeps up any
straggler.

## Structure

```
content/            THE CONTENT — projects/, institutional/, testimonials/
public/
  images/           photographs, served as-is
  fonts/            Ashima Sans, subset, with its OFL licence
src/
  components/       logo, page-hero, section, project-card, rera-strip,
                    reveal, seo, enquiry-form, site-header, site-footer
  data/             GENERATED from content/ — do not edit by hand
  lib/site.ts       name, address, phone — single source of truth
  lib/content.ts    every index, count, filter and year grouping
  lib/types.ts
  pages/            one file per route
  styles/ashima.css the RERA strip, forms, tables, editorial notes
  index.css         design tokens and the shared utilities
scripts/            gen-content, rera-guard, test-rera, sitemap
```

Adding a project means one markdown file in `content/projects/` and
`npm run content`. Every index, count, filter and year grouping derives from
the generated collection — there is no hardcoded list anywhere.

## Pages

`/` · `/about` · `/about/founder` · `/projects` · `/projects/:id` ·
`/land-owners` · `/institutional` · `/contact` · `/privacy` · `/credits` ·
`/thank-you`

`public/_redirects` serves the app shell with a 200 for any path that is not a
real file, which is what keeps `/projects/sraboni-court` a real URL.

## Before launch

The site currently contains draft copy, stand-in photographs and sample RERA
numbers. The passages needing a decision are marked on the pages themselves, in
the oxide-bordered notes. `npm run check:rera` reports the registration numbers
still outstanding. The review banner disappears in a launch build.
