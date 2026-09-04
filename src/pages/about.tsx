import { Link } from 'wouter';
import { ArrowUpRight } from 'lucide-react';
import { Seo } from '@/components/seo';
import { PageHero } from '@/components/page-hero';
import { Band, FactGrid, Head, Steps } from '@/components/blocks';
import { institutional } from '@/data/institutional';
import { finishedProjects, recordLocalities, recordTotals } from '@/lib/content';
import { NAP } from '@/lib/site';

const PORTRAIT = '/images/people/partha-pratim-roy.jpg';

/* DRAFT. The 2000s and 2010s entries were written to give the timeline its
   shape for review. The 1995 and Today entries are from the copy deck. Every
   figure and date in the two middle entries needs Partha Pratim Roy's
   correction before launch — they are the firm's own history and nobody else
   can supply it. */
const history: [string, string, boolean][] = [
  ['1993',
   'Partha Pratim Roy leaves an earlier business and founds Ashima Engineering, named after his mother.',
   false],
  ['1995',
   'The first building is handed over: Prarthana in Santoshpur, on a plot belonging to a family who decided to develop rather than sell. Eight flats over three floors, named after his daughter. It sets the pattern for everything after it.',
   false],
  ['2000s',
   'Santoshpur and Garfa fill in. The plots that come up are the ones where a family house has grown too large for the people still living in it, and the work becomes almost entirely joint-venture, so the owner keeps flats in the new building instead of selling the land. The firm settles into a size it has kept ever since, two or three buildings a year and none of them large.',
   true],
  ['2010s',
   'The Bypass opens up Mukundapur and the localities further south, and the firm follows the road. Institutional and government work begins alongside the residential building, including contracts for government-associated organisations and subcontracted civil packages for larger construction groups.',
   true],
  ['Today',
   'Sixty-plus delivered projects across Santoshpur, Garfa, Jadavpur, Mukundapur, Baruipur and Sonarpur. Residential development, largely on joint-venture terms with landowners, alongside institutional contracts.',
   false],
];

const commitments: [string, string, string][] = [
  ['01', 'One date for possession, in the agreement',
   'Not a range, not a quarter. If we are going to miss it you will hear it from us before you work it out yourself.'],
  ['02', 'You can visit the site while it is being built',
   'Without an appointment. Bring your own engineer if you want to.'],
  ['03', 'The specification in the agreement is the specification that gets built',
   'If a material has to change because something is unavailable, we tell you what and why before it goes in.'],
  ['04', 'We are still reachable after handover',
   'The office has not moved since 1993 and the buildings are all within a few kilometres of it.'],
];


export default function About() {
  const years = new Date().getFullYear() - Number(NAP.founded);

  return (
    <>
      <Seo path="/about" title="About Ashima Engineering"
           description={`Founded in ${NAP.founded}, first building handed over in ${NAP.firstDelivery}. ${finishedProjects.length} buildings across ${recordTotals.localities} South Kolkata localities.`} />

      <PageHero eyebrow={`Since ${NAP.founded}`}
                heading={`One office in ${NAP.locality}, ${years} years`}
                image="/images/projects/hero.jpg"
                marker={`Founded ${NAP.founded} · first handover ${NAP.firstDelivery}`}>
        Founded in {NAP.founded}. The first building, Prarthana in {NAP.locality},
        was handed over in {NAP.firstDelivery} — which is where the record starts.
      </PageHero>

      {/* --- The record in figures ------------------------------------------ */}
      <Band testid="section-about-figures">
        <FactGrid facts={[
          ['Buildings', String(finishedProjects.length)],
          ['Flats handed over', recordTotals.flats.toLocaleString('en-IN')],
          ['Joint ventures', '30'],
          ['PSU contracts', String(institutional.length)],
          ['Localities', String(recordTotals.localities)],
          ['Years', String(years)],
        ]} />
      </Band>

      {/* --- How it went ----------------------------------------------------- */}
      <Band tone="card" testid="section-history">
        <Head eyebrow="The years" lede="In the order it happened.">How it went</Head>
        <div className="mt-7">
          <Steps steps={history.map(([when, what]) => ({ title: when, body: what }))} />
        </div>
        <p className="gap-note">
          <strong>Two entries still to correct.</strong> The 2000s and 2010s
          entries were written to give the timeline its shape for review. Every
          figure and date in them needs Partha Pratim Roy&rsquo;s correction — they
          are the firm&rsquo;s own history and nobody else can supply it.
        </p>
      </Band>

      {/* --- What we hold to -------------------------------------------------- */}
      <Band testid="section-commitments-about">
        <Head eyebrow="How we work">What we hold to</Head>
        <div className="mt-7 grid gap-3 lg:grid-cols-2 lg:gap-5">
          {commitments.map(([n, t, d]) => (
            <div key={n} className="rounded-[var(--radius)] border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-5 lg:p-6">
              <p className="u-micro tabular-nums text-[hsl(var(--accent))]">{n}</p>
              <h3 className="mt-2.5 d-4 text-[hsl(var(--primary))]">{t}</h3>
              <p className="mt-2 t-sm t-wide text-[hsl(var(--muted-foreground))]">{d}</p>
            </div>
          ))}
        </div>
      </Band>

      {/* --- Where we build ---------------------------------------------------- */}
      <Band tone="deep" testid="section-about-localities">
        <Head onDark eyebrow="Where we build"
              lede="All within about eight kilometres of the office — the reason we can be on a site the same morning you call about a leak.">
          {recordLocalities.join(' · ')}
        </Head>
      </Band>

      {/* --- The founder -------------------------------------------------------- */}
      <Band tone="card" testid="section-founder-link">
        <div className="grid gap-8 lg:grid-cols-[20rem_1fr] lg:gap-14">
          <div className="aspect-[4/5] overflow-hidden rounded-[var(--radius)] border border-[hsl(var(--border))] bg-[hsl(var(--muted))]">
            <img src={PORTRAIT} alt="Partha Pratim Roy, founder of Ashima Engineering"
                 loading="lazy" className="size-full object-cover object-[50%_38%]" />
          </div>
          <div>
            <Head eyebrow="The founder"
                  lede="He founded the firm in 1993 and handed over the first building two years later. He is on site most mornings, and he answers his own phone.">
              Partha Pratim Roy
            </Head>
            <Link href="/about/founder" data-testid="link-founder"
                  className="mt-6 inline-flex min-h-11 items-center gap-2 u-label text-[hsl(var(--accent))]">
              Read about him <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </Band>
    </>
  );
}
