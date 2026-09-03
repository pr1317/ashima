# Adding and changing content

> **There is now an editor at https://ashimaengineering.in/admin, and it is
> the easier way to do everything on this page. See
> [EDITING.md](EDITING.md).** This file describes the same content as files on
> disk — useful when you are working in the repository, reviewing what the
> editor wrote, or adding many entries at once.

This is written for whoever looks after the Ashima Engineering website, not
for a programmer. If you can edit a text file and put photographs in a folder,
you can run this site.

Everything below happens inside this folder.

---

## The one rule that matters

**A project that is open for booking or under construction needs its WBRERA
registration number.** Under Section 11(2) of the Real Estate (Regulation and
Development) Act 2016 and WBRERA Order No. 492-RERA/L-01/2023, advertising a
registered project without showing its number can cost up to 5% of the
project's estimated cost.

The site can be made to refuse to build without one. That check is currently
switched off so the site can be worked on before the numbers arrive. When you
have them, open `src/data/rera-policy.json` and change `"enforce": false` to
`"enforce": true`. From then on, a live project with a missing or unverified
number stops the build, which is where you want it before the site goes
public.

---

## Adding a project

Two steps. Nothing else.

### 1. Put the photographs in

Photographs live in `public/images/projects/`. Give them names that mean
something — `sraboni-court-front.jpg`, not `IMG_4471.jpg`. Save them about
1600 pixels wide and reasonably compressed; they are served as they are.

### 2. Make one text file

Create a file in `content/projects/`. Name it after the project in small
letters with hyphens instead of spaces — `sraboni-court.md`. That file name
becomes the web address: `ashimaengineering.in/projects/sraboni-court`.

Copy this and change the values:

```
---
name: Sraboni Court
locality: Mukundapur
status: available
reraNumber: "WBRERA/P/SOU/2024/001234"
reraVerified: true
possessionDate: "December 2026"
totalUnits: 14
unitsAvailable: 5
floors: 4
unitTypes: ["2 BHK", "3 BHK"]
carpetAreaMin: 685
carpetAreaMax: 1120
address: "Mukundapur, Kolkata, West Bengal 700099"
images:
  - src: /images/projects/sraboni-court-front.jpg
    alt: "Four-storey building with balconies on Mukundapur Main Road"
summary: "Fourteen flats in Mukundapur. Possession December 2026."
---

Write a paragraph or two about the building here, in ordinary sentences.
```

Save it, then run `npm run content` once so the site picks the file up. That
is the whole job. The project now appears on the homepage, in the projects
list, in the year it belongs to on the record, in the locality filter, and on
its own page. Nothing else needs changing, because nothing anywhere is a
hand-written list.

---

## What each line means

| Line | What to put |
|---|---|
| `name` | The project name as it goes on the building. |
| `locality` | One of: Santoshpur, Garfa, Jadavpur, Mukundapur, Baruipur, Sonarpur, Kasba, Haltu. Anything else stops the build. |
| `status` | `available`, `under-construction`, `completed` or `sold-out`. |
| `reraNumber` | Required for `available` and `under-construction`. Exactly as registered. |
| `reraVerified` | `true` only once your RERA consultant has confirmed the number. |
| `yearCompleted` | Required for `completed` — it decides which year the project sits under on the record. |
| `possessionDate` | Free text: `"December 2026"`. |
| `totalUnits`, `unitsAvailable`, `floors` | Numbers, no quotes. |
| `unitTypes` | In square brackets: `["2 BHK", "3 BHK"]`. |
| `carpetAreaMin`, `carpetAreaMax` | Square feet, numbers. |
| `address`, `lat`, `lng` | For the map. `lat` and `lng` are optional. |
| `images` | Each needs `src` and `alt`. See below. |
| `featured` | `true` puts it forward on the homepage. |
| `summary` | One or two sentences, used in search results and on cards. |

Anything you do not have, leave out. A project with only a name, a locality, a
year and a unit count is perfectly valid and will look right — that is how the
record page is designed to work.

---

## About `alt` text

Every photograph needs a line describing what is in it. This is what a blind
visitor hears and what Google reads. Describe the building:

> `alt: "Four-storey residential building with projecting balconies on a
> tree-lined Santoshpur street"`

Not `alt: "building"` and not `alt: "Sraboni Court photo"`.

---

## A project with no photograph

Leave `images` out entirely. The page and the card will show a plaster panel
carrying the project's name, locality and year instead of an empty grey box.
This is intentional: a building finished in 1998 that nobody photographed is
still a building delivered, and the site is built so those entries do not look
like something is missing.

**Do not put a photograph of a different building in the gap.** The whole
argument of this website is that everything on it is true.

---

## Changing the phone number, address or hours

All in one file: `src/lib/site.ts`. Change it there and it updates in the
footer, on the contact page, in every "call us" button, in the WhatsApp links
and in the invisible business listing that Google reads.

**The name, address and phone must match your Google Business Profile exactly
— every comma and space.** Google treats a variation as a second, competing
business.

---

## Adding a Google review to the homepage

There is a place on the homepage for what owners say, but it is deliberately
not built yet — it stays out until there are three real reviews to put in it.
When you have them, copy them from your Google Business Profile into
`content/testimonials/`, one file each:

```
---
firstName: Sunita
context: Garfa, 2019
quote: "The date they gave us for possession was the date we moved in."
sourceUrl: https://g.page/r/your-review-link
---
```

**Do not write these yourself.** A made-up testimonial is the one thing on a
builder's website that a buyer can catch you out on, and if they catch that
they stop believing everything else.

---

## Adding an institutional client

One file in `content/institutional/`:

```
---
organisation: Balmer Lawrie & Co. Ltd
scope: Civil works and building maintenance under contract
year: "2018–2019"
status: Completed
order: 1
copyIsDraft: false
---
```

`order` decides where it sits in the table. No logos — those are trademarks.

---

## Changing the founder's photograph

Replace `public/images/people/partha-pratim-roy.jpg` with the new photograph,
keeping the same file name. A portrait shape works best — roughly three units
wide to four tall. It appears on both the founder page and the About page
automatically.

## Seeing your changes

Open a terminal in this folder.

```bash
npm run content     # only after editing anything in content/
npm run dev
```

Then open <http://localhost:5173>. Page edits update as you save; content
edits need `npm run content` again. Press Ctrl-C to stop.

Everything still needing a decision is marked on the pages themselves, in the
notes with a terracotta bar down the left-hand side. They disappear when you
delete the paragraph that carries them.

To see which registration numbers are still outstanding:

```bash
npm run check:rera
```

---

## Publishing

```bash
npm run build:launch
```

This refuses to run while any live project still has an unverified RERA
number. Once it succeeds, the finished site is in the `dist` folder, and
Netlify publishes it automatically when changes are saved to the repository.

Use `npm run build` instead to produce a review copy that keeps the review
banner and the sample numbers.
