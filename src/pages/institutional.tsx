import { ArrowUpRight, Building2, Phone } from 'lucide-react';
import { Seo } from '@/components/seo';
import { PageHero } from '@/components/page-hero';
import { Section, DisplayHeading } from '@/components/section';
import { Reveal } from '@/components/reveal';
import { institutional } from '@/lib/content';
import { NAP, telHref } from '@/lib/site';

const capability: [string, string][] = [
  ['Typical project size', 'Residential buildings of eight to twenty-four flats, three to five floors, on plots in South Kolkata.'],
  ['Scale', 'Two to three concurrent projects. Continuous operation since 1993, with the first building handed over in 1995.'],
  ['In house', 'Site supervision, procurement, and day-to-day project management.'],
  ['Subcontracted', 'Specialist trades such as lifts, electrical and plumbing, engaged per project.'],
];

const credentials: [string, string][] = [
  ['Company registration number', 'To be supplied'],
  ['GST', 'To be supplied'],
  ['Trade licence', 'To be supplied'],
  ['Empanelment', 'To be supplied, if any'],
];

export default function Institutional() {
  return (
    <>
      <Seo path="/institutional"
           title="Institutional and government work, Ashima Engineering"
           description="Ashima Engineering has executed contracts and tenders for government and government-associated organisations alongside its residential work in South Kolkata since 1995." />

      <PageHero image="/images/site/formwork.jpg" eyebrow="Institutional"
                heading={<>Institutional and<br /><em>government work.</em></>}
                marker="Contracts &amp; tenders">
        <p className="mt-9 max-w-lg t-sm text-[hsl(var(--card))]/85">
          Alongside residential development, Ashima Engineering has executed
          contracts and tenders for government and government-associated
          organisations, and has worked as a subcontractor to larger construction
          groups including L&amp;T.
        </p>
      </PageHero>

      {/* --- 01 / Client record ------------------------------------------- */}
      <Section eyebrow="01 / Client record" tone="light">
        <div className="mt-2 grid gap-9 lg:grid-cols-[.8fr_1.8fr]">
          <div />
          <Reveal>
            <DisplayHeading className="max-w-3xl d-1 text-[hsl(var(--primary))]"
                            em="record.">
              Client
            </DisplayHeading>
            <p className="mt-8 max-w-2xl t-body text-[hsl(var(--muted-foreground))]">
              The work below is listed as executed and completed. We are happy to
              provide documentation on request.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 overflow-x-auto">
          <table className="dtable min-w-[46rem]" data-testid="table-institutional">
            <thead>
              <tr>
                <th scope="col">Organisation</th>
                <th scope="col">Scope</th>
                <th scope="col">Year</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {institutional.map((c) => (
                <tr key={c.id} data-testid={`row-institutional-${c.id}`}>
                  <th scope="row" className="orgcell">{c.organisation}</th>
                  <td>{c.scope}</td>
                  <td>{c.year}</td>
                  <td>{c.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="gap-note">
          <strong>Years still to come.</strong> The three organisations and the
          scope lines are confirmed. The years are not, and show as a dash until
          they are &mdash; add one per contract, and any further contracts missing
          from this list. No client logos, since Balmer Lawrie and Bicco Lawrie are
          PSU trademarks. They are named in text only.
        </p>
      </Section>

      {/* --- 02 / Capability ---------------------------------------------- */}
      <Section eyebrow="02 / Capability" tone="gold">
        <div className="mt-2 grid gap-9 lg:grid-cols-[.8fr_1.8fr]">
          <div />
          <Reveal>
            <DisplayHeading className="max-w-3xl d-1" em="we bring.">
              What
            </DisplayHeading>
          </Reveal>
        </div>

        <div className="mt-14 border-t border-[hsl(var(--primary))]/25">
          {capability.map(([t, d], i) => (
            <Reveal key={t} delay={(i % 4) as 0 | 1 | 2 | 3}>
              <div className="grid gap-4 border-b border-[hsl(var(--primary))]/25 py-6 md:grid-cols-[16rem_1fr] md:gap-10">
                <h3 className="d-3">{t}</h3>
                <p className="max-w-2xl t-body text-[hsl(var(--primary))]/70">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="gap-note">
          <strong>Draft.</strong> Written for review from what is known of the
          residential work. Correct the figures, and add anything about the
          institutional capability a tender evaluator would want to see, such as
          plant, manpower and the largest contract value executed.
        </p>
      </Section>

      {/* --- 03 / Credentials --------------------------------------------- */}
      <Section eyebrow="03 / Credentials" tone="dark">
        <div className="mt-2 grid gap-9 lg:grid-cols-[.8fr_1.8fr]">
          <div />
          <Reveal>
            <DisplayHeading className="max-w-3xl d-1" em="the firm is real.">
              The numbers that prove
            </DisplayHeading>
          </Reveal>
        </div>

        <div className="mt-12 overflow-x-auto">
          <table className="dtable min-w-[34rem]">
            <tbody>
              {credentials.map(([k, v]) => (
                <tr key={k}><th scope="row">{k}</th><td>{v}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="gap-note">
          <strong>Needed before launch.</strong> A tender evaluator checks this
          table first. These are the numbers that prove the firm is real. Nothing
          can be invented here and nothing has been.
        </p>
      </Section>

      {/* --- 04 / Tender and procurement ---------------------------------- */}
      <Section eyebrow="04 / Tender and procurement" tone="card">
        <div className="mt-10 grid gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <DisplayHeading className="d-1 text-[hsl(var(--primary))]"
                            em="a direct line.">
              A named person,
            </DisplayHeading>
            <p className="mt-8 max-w-md t-body text-[hsl(var(--muted-foreground))]">
              For tender and procurement enquiries — not a general enquiry form.
            </p>
            <a href={telHref}
               className="mt-9 inline-flex items-center gap-3 bg-[hsl(var(--primary))] px-6 py-4 u-label text-[hsl(var(--card))] transition-transform hover:-translate-y-1"
               data-testid="link-tender-phone">
              <Phone size={14} /> {NAP.phone} <ArrowUpRight size={14} />
            </a>
            <p className="mt-5 u-label text-[hsl(var(--muted-foreground))]">
              {NAP.hours}
            </p>
          </Reveal>
          <Reveal delay={1}>
            <div className="flex items-start gap-5 border-l border-[hsl(var(--primary))]/20 pl-7">
              <Building2 size={26} strokeWidth={1.25} className="mt-1 shrink-0 text-[hsl(var(--accent))]" />
              <p className="t-body text-[hsl(var(--muted-foreground))]">
                Contracts for government-associated organisations, including
                Balmer Lawrie and Bicco Lawrie, and subcontracted civil packages
                for larger construction groups.
              </p>
            </div>
            <p className="gap-note">
              <strong>Needed.</strong> The name of whoever handles tender enquiries,
              and a direct line for them. The office number is standing in for now.
            </p>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
