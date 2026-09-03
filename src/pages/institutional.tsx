import { Seo } from '@/components/seo';
import { PageHero } from '@/components/page-hero';
import { Band, DefList, Head } from '@/components/blocks';
import { institutional } from '@/data/institutional';
import { NAP, telHref } from '@/lib/site';

const capability: [string, string][] = [
  ['Typical project size', 'Residential buildings of eight to twenty-four flats, three to five floors, on plots in South Kolkata.'],
  ['Scale', 'Two to three concurrent projects. Continuous operation since 1993, with the first building handed over in 1995.'],
  ['In house', 'Site supervision, procurement, and day-to-day project management.'],
  ['Subcontracted', 'Specialist trades such as lifts, electrical and plumbing, engaged per project.'],
];

/* PAN is deliberately absent: the business has decided not to publish it.
   The rest are still to come, and a tender evaluator reads this block first. */
const credentials: [string, string][] = [
  ['Company registration number', 'To be supplied'],
  ['GST', 'To be supplied'],
  ['Trade licence', 'To be supplied'],
  ['Empanelment', 'To be supplied, if any'],
];

export default function Institutional() {
  return (
    <>
      <Seo path="/institutional" title="Institutional and government work | Ashima Engineering"
           description={`Ashima Engineering has executed contracts and tenders for government and government-associated organisations alongside its residential work in South Kolkata since ${NAP.firstDelivery}.`} />

      <PageHero eyebrow="Institutional"
                heading="Work executed under government contract"
                image="/images/projects/barnali-a.jpg">
        Alongside residential development, Ashima Engineering has executed
        contracts and tenders for government and government-associated
        organisations since {NAP.firstDelivery}.
      </PageHero>

      {/* --- Client record -------------------------------------------------- */}
      <Band testid="section-clients">
        <Head eyebrow="Client record"
              lede="The work below is listed as executed and completed. We are happy to put a tender evaluator in touch with the relevant office.">
          Who we have worked for
        </Head>

        <div className="mt-7 border-t border-[hsl(var(--border))]">
          {institutional.map((c) => (
            <div key={c.id} data-testid={`row-client-${c.id}`}
                 className="grid gap-1 border-b border-[hsl(var(--border))] py-4 lg:grid-cols-[1fr_16rem_9rem] lg:items-baseline lg:gap-6">
              <h3 className="d-4 text-[hsl(var(--primary))]">{c.organisation}</h3>
              <p className="t-sm t-wide text-[hsl(var(--muted-foreground))]">{c.scope}</p>
              <p className="u-micro text-[hsl(var(--accent))] lg:text-right">
                {c.status}{c.year && c.year !== '—' ? ` · ${c.year}` : ''}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-4 t-fine text-[hsl(var(--muted-foreground))]">
          Named in text only — no client logos, since Balmer Lawrie and Bicco
          Lawrie are PSU trademarks.
        </p>

        <p className="gap-note">
          <strong>Years still to come.</strong> The three organisations and the
          scope lines are confirmed. The years are not, and show as a dash until
          they are &mdash; add one per contract, and any further contracts missing
          from this list.
        </p>
      </Band>

      {/* --- Capability ----------------------------------------------------- */}
      <Band tone="card" testid="section-capability">
        <Head eyebrow="Capability">What we are set up to do</Head>
        <div className="mt-6 max-w-[70ch]">
          <DefList rows={capability} />
        </div>
        <p className="gap-note">
          <strong>Draft.</strong> Written for review from what is known of the
          residential work. Correct the figures, and add anything about the
          institutional capability a tender evaluator would want to see, such as
          plant, manpower and the largest contract value executed.
        </p>
      </Band>

      {/* --- Credentials ---------------------------------------------------- */}
      <Band tone="deep" testid="section-credentials-inst">
        <Head onDark eyebrow="Credentials"
              lede="A tender evaluator checks this block first. Empty rows here cost work.">
          Registration and compliance
        </Head>
        <div className="mt-6 max-w-[70ch]">
          <DefList onDark rows={credentials.map(([k, v]) => [
            k,
            <span key={k} className="text-[hsl(var(--secondary))]">{v}</span>,
          ])} />
        </div>
        <p className="mt-8 t-body text-[hsl(var(--card))]/70">
          Tender enquiries reach the office on{' '}
          <a href={telHref} className="text-[hsl(var(--secondary))] underline underline-offset-4"
             data-testid="link-inst-phone">{NAP.phone}</a>.
        </p>
        <p className="gap-note">
          <strong>Needed.</strong> The name of whoever handles tender enquiries,
          and a direct line for them. The office number is standing in for now.
        </p>
      </Band>
    </>
  );
}
