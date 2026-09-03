# Editing the website

The website is edited at **https://ashimaengineering.in/admin**.

You sign in with GitHub. There is nothing to install and nothing to run. You
change something, press **Publish**, and a few minutes later the live site has
changed. If you have used a word processor you can use this.

---

## What you can change

| Section | What is in it |
|---|---|
| **Projects** | Every building. Name, locality, status, flats, photographs, the description, and the WBRERA registration number. |
| **Institutional and government work** | The contracts listed on the Institutional page. |
| **Site details** | Phone, email, opening hours, office address, the year the firm was founded. |
| **Image credits** | Who each borrowed photograph belongs to. |

## What you cannot change here

The wording of the fixed pages — the homepage introduction, About, Land
owners, the Contact page's own text — is part of the site's code. Changing
those still needs a developer. Everything that changes as the business changes
is in the list above.

---

## Adding a project

1. Go to **Projects** and press **New Project**.
2. Fill in at least the name, status, locality and the one-line summary.
3. If the status is **Open for booking** or **Under construction**, the WBRERA
   registration number is required. See the warning below.
4. Add photographs. Every photograph needs a description — see below.
5. Press **Publish**.

The site rebuilds itself. Give it about three minutes, then reload the page.

## Changing the opening hours

**Site details → Contact details and opening hours.**

There are two hours fields and they must agree with each other:

- **Opening hours, in words** is what visitors read.
- **Opening hours for search engines** is the same information written the way
  Google reads it: `Mo-Sa 10:30-20:00` and `Su 11:00-17:00`.

If you change one, change the other. Then update the Google Business Profile to
match, because for most people the Google listing is what they see first.

---

## Two things that matter more than they look

### The registration number is a legal requirement

Any project that is open for booking or under construction is an
*advertisement* in law. Section 11(2) of the Real Estate (Regulation and
Development) Act 2016, together with WBRERA Order No. 492-RERA/L-01/2023, says
an advertisement must carry the project's registration number, and that order
covers websites. Penalties reach 5% of the project cost.

So:

- Copy the number exactly off the WBRERA certificate.
- Never invent one, and never leave a made-up one in place. Publishing a wrong
  number is worse than publishing none.
- Only tick **Registration number checked against the WBRERA portal** once
  somebody has actually looked it up at rera.wb.gov.in and it matched.

Two projects currently carry placeholder numbers ending in `XXXXXX`. They need
replacing with the real ones.

### Photograph descriptions are read aloud

The **Description of the photograph** box is what a blind visitor's screen
reader says out loud, and what shows if the image fails to load. Describe what
is actually in the picture — "Four-storey building with projecting balconies
and a tree at the kerb" — not the project name, which they have already heard.

If a photograph is not one of ours, tick **This is a stand-in**, and add it to
**Image credits**. The licences these photographs are used under require the
credit; leaving it out is a copyright problem, not a tidiness one.

---

## If something goes wrong

**The site did not change after I pressed Publish.**
Give it three minutes. If it still has not, the build may have been stopped —
see below.

**I was told the build stopped.**
The site checks the content before it publishes. If something is wrong — a
photograph that was never uploaded, a number typed into a text box, more flats
unsold than exist — it refuses to publish and tells you which entry and what is
wrong.

Nothing breaks when this happens. **The live site carries on showing the last
version that was correct.** Fix the entry it names, press Publish again, and it
will go out. You can see the message at
app.netlify.com → the site → **Deploys** → the failed deploy.

**I made a mistake and want the old version back.**
Every save is recorded. Ask a developer to restore it — nothing is ever
actually lost.

**I cannot sign in.**
Your GitHub account needs write access to the `pr1317/ashima` repository. Ask
whoever set the site up to add you.

---

## For whoever set the site up

The editor is [Decap CMS](https://decapcms.org). It commits to `main`; Netlify
rebuilds on the commit. There is no database and no server to keep running.

**One-off setup.** The sign-in needs a GitHub OAuth app:

1. GitHub → **Settings → Developer settings → OAuth Apps → New OAuth App**.
   - Homepage URL: `https://ashimaengineering.in`
   - Authorization callback URL: `https://ashimaengineering.in/api/callback`
2. On the Netlify project, **Site configuration → Environment variables**, add:
   - `GITHUB_OAUTH_ID` — the app's Client ID
   - `GITHUB_OAUTH_SECRET` — the app's Client Secret
3. Redeploy.

The two functions in `netlify/functions/` handle the exchange. Netlify Identity
is deliberately not used: it is closed to new sites.

**Giving someone access.** Add them to the repository with write permission.
There is no separate user list.

**How the content is wired.**

```
content/*.md, *.json        what the CMS writes
  → scripts/gen-content.mjs      compiles it to typed modules
  → src/data/*.ts                what the app imports
```

`npm run build` runs that compile first, so the markdown is the source of
truth. The generated modules are committed as well, which keeps `git diff`
honest about what a content change actually did.

- `scripts/lint-content.mjs` — the check that stops a broken save reaching the
  site. Fatal only for things that would ship a visibly broken page.
- `scripts/rera-guard.mjs` — owns the registration-number policy. The
  `enforce` switch is in `src/data/rera-policy.json`; turn it on once the real
  numbers are in and a missing one becomes a hard build failure.
- `scripts/gen-cms-config.mjs` — writes `public/admin/config.yml`, taking the
  locality and status dropdowns from `src/lib/types.ts` so the CMS cannot offer
  a value the app rejects. It also vendors the editor out of `node_modules`, so
  the admin page depends on no CDN.
- `npm test` — the WBRERA display tests, plus a round-trip test proving a
  file written by the CMS survives the pipeline.
