import { Link } from 'wouter';
import { ArrowUpRight, Phone } from 'lucide-react';
import { Seo } from '@/components/seo';
import { PageHero } from '@/components/page-hero';
import { Section, DisplayHeading } from '@/components/section';
import { Reveal } from '@/components/reveal';
import { NAP, telHref, whatsappHref } from '@/lib/site';

const WHATSAPP =
  'Hello, I own a plot in South Kolkata and wanted to talk about developing it.';

/* DRAFT. These four commitments were written as structurally plausible
   examples of what a joint-venture developer can commit to. They are NOT yet
   the business's commitments. Partha Pratim Roy must confirm, amend or replace
   each one before this page goes live — a commitment published here and not
   honoured is worse than no page at all. */
const commitments: [string, string][] = [
  ["The owner's share is defined in writing before anything is signed.",
   'Which flats, on which floors, with which parking, named in the agreement rather than described in a conversation. You should be able to point at a drawing and say those ones are mine.'],
  ['A possession date in the agreement, not an estimate.',
   'One date, written into the development agreement, with what happens if we miss it written in beside it.'],
  ['Nothing is demolished before the plan is sanctioned.',
   'Your house stands until the sanctioned plan is in hand. No developer should ask you to clear a plot on the strength of an application.'],
  ['You can see the site whenever you want, without an appointment.',
   'It is your land. Come and look at the reinforcement before the slab is cast. Bring your own engineer if you would rather.'],
];

const steps: [string, string, string][] = [
  ['01', 'First conversation', 'You tell us where the plot is and roughly what is on it. Nothing is needed in writing. This is usually half an hour.'],
  ['02', 'Title and documents', 'We check the deed, the mutation and the tax receipts. If something is unclear we tell you what it is, whether or not we go ahead.'],
  ['03', 'Measurement and feasibility', 'The plot is measured, and we work out what can be built on it under the current rules. How many floors, how many flats, how much parking.'],
  ['04', 'Terms and share', 'What you get and what we get, discussed openly, with the numbers behind it shown to you. This is the conversation most owners have been badly served on before.'],
  ['05', 'Development agreement', 'Registered. Your share, the possession date and the specifications are all in it.'],
  ['06', 'Sanction and approvals', 'Plans go to the corporation or the municipality. Nothing is demolished until sanction is in hand.'],
  ['07', 'Construction', 'Typically [XX] months from the start of work. You can visit whenever you like.'],
  ['08', 'Handover of your share', 'You take possession of your flats. The completion certificate and the papers follow.'],
];

const documents: [string, string][] = [
  ['The deed', 'The registered title document for the plot.'],
  ['Mutation', 'Records showing the property is mutated into the current owner’s name.'],
  ['Tax receipts', 'Recent municipal or corporation tax receipts.'],
  ['Plot dimensions', 'A survey plan if you have one. If not, we will measure it.'],
];

export default function LandOwners() {
  return (
    <>
      <Seo path="/land-owners"
           title="Own land in South Kolkata? | Ashima Engineering"
           description="Joint-venture redevelopment for landowners in Santoshpur, Garfa, Jadavpur, Mukundapur, Baruipur and Sonarpur. How it works, what we commit to, and what we would need to see." />

      <PageHero image="/images/site/oldhouse.jpg" eyebrow="Land owners"
                heading={<>Own land here?<br /><em>Let&rsquo;s talk about</em><br />what it could become.</>}
                marker="Joint-venture development">
        <div className="mt-9 max-w-xl">
          <p className="text-sm leading-7 text-[hsl(var(--card))]/85">
            A joint venture means you keep your land and we build on it. You are
            paid in flats in the finished building rather than a lump sum, and
            the split is agreed in writing before anything is signed.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={telHref}
               className="flex items-center gap-2 bg-[hsl(var(--secondary))] px-5 py-3.5 font-ui text-[10px] uppercase tracking-[0.16em] text-[hsl(var(--primary))] transition-transform hover:-translate-y-1">
              <Phone size={14} /> Call {NAP.phone}
            </a>
            <a href={whatsappHref(WHATSAPP)} rel="noopener" target="_blank"
               className="flex items-center gap-2 border border-[hsl(var(--card))]/35 px-5 py-3.5 font-ui text-[10px] uppercase tracking-[0.16em] text-[hsl(var(--card))] transition-colors hover:border-[hsl(var(--secondary))] hover:text-[hsl(var(--secondary))]">
              WhatsApp <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </PageHero>

      {/* --- 01 / Why it comes up ----------------------------------------- */}
      <Section eyebrow="01 / Why it comes up" tone="light">
        <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <div />
          <Reveal delay={1}>
            <p className="max-w-2xl text-xl leading-relaxed text-[hsl(var(--primary))] lg:text-2xl lg:leading-relaxed">
              Most of what we have built since 1995 started as somebody&rsquo;s old house
              on a plot in one of these localities.
            </p>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[hsl(var(--muted-foreground))]">
              If you have been approached by developers before and it did not go
              well, that is a common enough story around here. It is worth one
              conversation.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* --- 02 / How it works -------------------------------------------- */}
      <Section eyebrow="02 / How it works" tone="dark">
        <div className="mt-2 grid gap-9 lg:grid-cols-[.8fr_1.8fr]">
          <div />
          <Reveal>
            <DisplayHeading className="max-w-3xl text-[clamp(2.6rem,5.2vw,5.4rem)]" em="a sequence.">
              It genuinely is
            </DisplayHeading>
            <p className="mt-8 max-w-xl text-base leading-7 text-[hsl(var(--card))]/85">
              This is the order it happens in.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 border-t border-[hsl(var(--card))]/20">
          {steps.map(([n, t, d], i) => (
            <Reveal key={n} delay={(i % 4) as 0 | 1 | 2 | 3}>
              <div className="grid gap-4 border-b border-[hsl(var(--card))]/20 py-6 md:grid-cols-[70px_1fr_1.15fr] md:items-start md:gap-8">
                <span className="font-display text-3xl italic text-[hsl(var(--secondary))]">{n}</span>
                <h3 className="max-w-xs font-display text-2xl leading-tight">{t}</h3>
                <p className="max-w-lg text-sm leading-7 text-[hsl(var(--card))]/68">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="gap-note">
          <strong>To confirm before launch:</strong> the construction duration in
          step 07 is written as <b>[XX] months</b>. Replace it with the figure the
          business actually works to.
        </p>
      </Section>

      {/* --- 03 / What we commit to --------------------------------------- */}
      <Section eyebrow="03 / What we commit to" tone="gold">
        <div className="mt-2 grid gap-9 lg:grid-cols-[.8fr_1.8fr]">
          <div />
          <Reveal>
            <DisplayHeading className="max-w-3xl text-[clamp(2.6rem,5.2vw,5.4rem)]" em="all of them checkable.">
              Four things,
            </DisplayHeading>
            <p className="mt-8 max-w-xl text-base leading-7 text-[hsl(var(--primary))]/70">
              If a developer will not put these in writing, that tells you something.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-x-14 border-t border-[hsl(var(--primary))]/25 md:grid-cols-2">
          {commitments.map(([t, d], i) => (
            <Reveal key={t} delay={(i % 4) as 0 | 1 | 2 | 3}
                    className="border-b border-[hsl(var(--primary))]/25 py-7">
              <b className="block font-display text-2xl leading-tight">{t}</b>
              <span className="mt-3 block text-sm leading-7 text-[hsl(var(--primary))]/70">{d}</span>
            </Reveal>
          ))}
        </div>
        <p className="gap-note">
          <strong>Draft, not yet approved.</strong> These four commitments were
          written as plausible examples of what a joint-venture developer can
          undertake. They are not yet Ashima Engineering&rsquo;s commitments. Partha
          Pratim Roy needs to confirm, amend or replace each one before this page
          goes live.
        </p>
      </Section>

      {/* --- 04 / Why us -------------------------------------------------- */}
      <Section eyebrow="04 / Why us" tone="card">
        <div className="mt-10 grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
          <Reveal>
            <DisplayHeading className="text-[clamp(2.6rem,5vw,5rem)] text-[hsl(var(--primary))]"
                            em="within a few kilometres.">
              Sixty-odd buildings,
            </DisplayHeading>
            <p className="mt-9 max-w-lg text-base leading-8 text-[hsl(var(--muted-foreground))]">
              Thirty years, all of them within a few kilometres of here. We are
              not a group that turned up in Santoshpur last year because the land
              got expensive. The office has been on Aurobindo Road the whole time,
              and the same person has run it since 1995.
            </p>
            <p className="mt-5 max-w-lg text-base leading-8 text-[hsl(var(--muted-foreground))]">
              Past landowners will speak to you. Ask, and we will put you in touch
              with people whose buildings went up ten and twenty years ago, so you
              can hear how it went once the work was finished and everyone had
              moved in.
            </p>
            <Link href="/projects"
                  className="mt-9 inline-flex items-center gap-3 border-b border-[hsl(var(--primary))]/35 pb-2 font-ui text-[10px] uppercase tracking-[0.18em] text-[hsl(var(--primary))] transition-colors hover:border-[hsl(var(--accent))] hover:text-[hsl(var(--accent))]">
              See every building since 1995 <ArrowUpRight size={15} />
            </Link>
          </Reveal>
          <Reveal delay={1}>
            <div className="aspect-[1.15] overflow-hidden bg-[hsl(var(--muted))]">
              <img src="/images/site/formwork.jpg" loading="lazy"
                   alt="Steel reinforcement and timber formwork in place on a concrete slab before casting. Stand-in photograph."
                   className="h-full w-full object-cover" />
            </div>
          </Reveal>
        </div>
      </Section>

      {/* --- 05 / What we would need to see -------------------------------- */}
      <Section eyebrow="05 / What we would need to see" tone="light">
        <div className="mt-2 grid gap-9 lg:grid-cols-[.8fr_1.8fr]">
          <div />
          <Reveal>
            <DisplayHeading className="max-w-3xl text-[clamp(2.4rem,4.8vw,4.8rem)] text-[hsl(var(--primary))]"
                            em="Not for a first conversation.">
              Eventually.
            </DisplayHeading>
          </Reveal>
        </div>

        <div className="mt-14 border-t border-[hsl(var(--primary))]/15">
          {documents.map(([t, d], i) => (
            <Reveal key={t} delay={(i % 4) as 0 | 1 | 2 | 3}>
              <div className="grid gap-3 border-b border-[hsl(var(--primary))]/15 py-5 md:grid-cols-[16rem_1fr] md:gap-10">
                <h3 className="font-display text-2xl leading-none text-[hsl(var(--primary))]">{t}</h3>
                <p className="max-w-2xl text-sm leading-7 text-[hsl(var(--muted-foreground))]">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="on-dark mt-14 bg-[hsl(var(--primary))] p-9 text-[hsl(var(--card))] lg:p-12">
          <DisplayHeading as="h2" className="max-w-2xl text-[clamp(2rem,3.6vw,3.4rem)]"
                          em="needs none of it.">
            A first conversation
          </DisplayHeading>
          <p className="mt-7 max-w-xl text-base leading-8 text-[hsl(var(--card))]/85">
            Call and describe the plot. If it is not worth doing we will say so on
            the phone rather than send somebody to look at it.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href={telHref}
               className="flex items-center gap-2 bg-[hsl(var(--secondary))] px-5 py-3.5 font-ui text-[10px] uppercase tracking-[0.16em] text-[hsl(var(--primary))] transition-transform hover:-translate-y-1">
              <Phone size={14} /> {NAP.phone}
            </a>
            <a href={whatsappHref(WHATSAPP)} rel="noopener" target="_blank"
               className="flex items-center gap-2 border border-[hsl(var(--card))]/35 px-5 py-3.5 font-ui text-[10px] uppercase tracking-[0.16em] text-[hsl(var(--card))] transition-colors hover:border-[hsl(var(--secondary))] hover:text-[hsl(var(--secondary))]">
              WhatsApp <ArrowUpRight size={14} />
            </a>
          </div>
          <p className="mt-6 font-ui text-[10px] uppercase tracking-[0.14em] text-[hsl(var(--card))]/50">
            {NAP.hours}
          </p>
        </Reveal>
      </Section>
    </>
  );
}
