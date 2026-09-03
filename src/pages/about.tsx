import { Link } from 'wouter';
import { ArrowUpRight, Building2, Hammer } from 'lucide-react';
import { Seo } from '@/components/seo';
import { PageHero } from '@/components/page-hero';
import { Section, DisplayHeading } from '@/components/section';
import { Reveal } from '@/components/reveal';

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
  return (
    <>
      <Seo path="/about"
           title="About Ashima Engineering, thirty years in South Kolkata"
           description="Ashima is our founder's mother. The name story, thirty years of building in South Kolkata, and how the firm works." />

      <PageHero image="/images/site/shutters.jpg" eyebrow="About Ashima"
                heading={<>The name is<br /><em>a promise.</em></>}
                marker="Since 1993" />

      {/* --- 01 / The name ------------------------------------------------ */}
      <Section eyebrow="01 / The name" tone="light">
        <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <div />
          <Reveal delay={1}>
            <DisplayHeading className="max-w-4xl d-1 text-[hsl(var(--primary))]">
              Ashima
            </DisplayHeading>
            <div className="mt-10 max-w-2xl space-y-6">
              <p className="t-lead text-[hsl(var(--primary))]">
                Ashima is our founder&rsquo;s mother. It is also close to <em>asīma</em>,
                the Sanskrit word for boundless, for something without edge or limit.
              </p>
              <p className="t-lead text-[hsl(var(--muted-foreground))]">
                A mother doesn&rsquo;t measure what she gives a house. Over thirty years
                of building homes, we have tried to work the same way: no corner cut
                because nobody would see it, no date promised that we couldn&rsquo;t keep.
              </p>
              <p className="t-lead text-[hsl(var(--muted-foreground))]">
                Our first building went up in Santoshpur in 1995. It is called
                Prarthana, after our founder&rsquo;s daughter. We have kept the habit
                since.
              </p>
              <p className="d-3 italic text-[hsl(var(--accent))]">
                The name came first. We have spent three decades trying to deserve it.
              </p>
            </div>
            <p className="gap-note">
              <strong>Consent needed before launch.</strong> The third paragraph
              names a living person. Her explicit consent is required. If she
              declines, cut that paragraph whole. Do not soften it to
              &ldquo;a member of the family&rdquo;, which reads evasive.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* --- 02 / What we do ---------------------------------------------- */}
      <Section eyebrow="02 / What we do" tone="gold">
        <div className="mt-2 grid gap-9 lg:grid-cols-[.8fr_1.8fr]">
          <div />
          <Reveal>
            <DisplayHeading className="max-w-4xl d-1" em="Close to home.">
              Small buildings.
            </DisplayHeading>
            <p className="mt-8 max-w-2xl t-body text-[hsl(var(--primary))]/70">
              Residential development in South Kolkata, largely on joint-venture terms
              with landowners; institutional and government contracts alongside.
            </p>
            <p className="mt-5 max-w-2xl t-body text-[hsl(var(--primary))]/70">
              The buildings are small. Eight flats, twelve, occasionally twenty. Four
              floors and a lift, covered parking at ground level, on plots between
              Santoshpur and Sonarpur. We have never tried to become a company that
              builds towers, and the localities we work in are the ones we can reach in
              twenty minutes.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-[hsl(var(--primary))]/25 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/land-owners" className="flex items-center gap-3 u-label transition-colors hover:text-[hsl(var(--accent))]">
            <Hammer size={14} /> Own land in South Kolkata? <ArrowUpRight size={13} />
          </Link>
          <Link href="/institutional" className="flex items-center gap-3 u-label transition-colors hover:text-[hsl(var(--accent))]">
            <Building2 size={14} /> Institutional &amp; government work <ArrowUpRight size={13} />
          </Link>
        </div>
      </Section>

      {/* --- 03 / Thirty years -------------------------------------------- */}
      <Section eyebrow="03 / Thirty years" tone="dark">
        <div className="mt-2 grid gap-9 lg:grid-cols-[.8fr_1.8fr]">
          <div />
          <Reveal>
            <DisplayHeading className="max-w-4xl d-1" em="years.">
              Thirty
            </DisplayHeading>
          </Reveal>
        </div>

        <div className="mt-14 border-t border-[hsl(var(--card))]/20">
          {history.map(([label, text, draft], i) => (
            <Reveal key={label} delay={(i % 4) as 0 | 1 | 2 | 3}>
              <div className="grid gap-5 border-b border-[hsl(var(--card))]/20 py-8 md:grid-cols-[9rem_1fr] md:gap-10 md:py-10">
                <div className="d-2 italic text-[hsl(var(--secondary))]">{label}</div>
                <div>
                  <p className="max-w-3xl t-body text-[hsl(var(--card))]/85">{text}</p>
                  {draft && (
                    <p className="gap-note">
                      <strong>Draft.</strong> Written for review. Needs Partha Pratim
                      Roy to correct the dates, the localities and how many projects.
                    </p>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* --- 04 / How we work --------------------------------------------- */}
      <Section eyebrow="04 / How we work" tone="light">
        <div className="mt-2 grid gap-9 lg:grid-cols-[.8fr_1.8fr]">
          <div />
          <Reveal>
            <DisplayHeading className="max-w-4xl d-1 text-[hsl(var(--primary))]"
                            em="Solid ground.">
              Plain words.
            </DisplayHeading>
            <p className="mt-8 max-w-xl t-body text-[hsl(var(--muted-foreground))]">
              The promises that make the process feel human — and the parts of
              building we refuse to leave vague.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 border-t border-[hsl(var(--primary))]/15">
          {commitments.map(([number, title, body], i) => (
            <Reveal key={number} delay={(i % 4) as 0 | 1 | 2 | 3}>
              <div className="grid gap-5 border-b border-[hsl(var(--primary))]/15 py-7 md:grid-cols-[80px_1.05fr_1fr] md:items-start md:gap-8 md:py-9">
                <span className="d-3 italic text-[hsl(var(--accent))]"
                      data-testid={`text-commitment-number-${number}`}>{number}</span>
                <h3 className="max-w-md d-3 text-[hsl(var(--primary))]"
                    data-testid={`text-commitment-title-${number}`}>{title}</h3>
                <p className="max-w-md t-sm text-[hsl(var(--muted-foreground))]"
                   data-testid={`text-commitment-body-${number}`}>{body}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="gap-note">
          <strong>Draft.</strong> These four operating commitments were written for
          review. Confirm each one is genuinely what the business does before launch.
        </p>
      </Section>

      {/* --- 05 / The founder --------------------------------------------- */}
      <Section eyebrow="05 / The founder" tone="card">
        <div className="mt-10 grid gap-16 lg:grid-cols-[.88fr_1.12fr] lg:items-center lg:gap-24">
          <Reveal className="relative">
            <div className="relative aspect-[.82] overflow-hidden bg-[hsl(var(--muted))]">
              <img src={PORTRAIT}
                   alt="Partha Pratim Roy, founder of Ashima Engineering, photographed at home in Kolkata"
                   className="absolute inset-0 h-full w-full object-cover object-[50%_62%]" loading="lazy" />
              <div className="absolute inset-0 bg-[linear-gradient(150deg,hsl(24_30%_16%/.12),hsl(128_14%_44%/.3))]" />
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between border-t border-[hsl(var(--card))]/35 pt-4 text-[hsl(var(--card))]">
                <span className="u-micro">Ashima Engineering · Founder</span>
                <span className="d-3 italic">P. P. Roy</span>
              </div>
            </div>
            <div className="absolute -bottom-9 -right-4 hidden bg-[hsl(var(--accent))] p-6 text-[hsl(var(--card))] lg:block">
              <div className="d-1">60<span className="d-2">+</span></div>
              <div className="mt-2 u-micro">projects delivered</div>
            </div>
          </Reveal>

          <Reveal delay={1}>
            <DisplayHeading className="d-page text-[hsl(var(--primary))]"
                            em="Roy.">
              Partha<br />Pratim
            </DisplayHeading>
            <blockquote className="mt-10 border-l-2 border-[hsl(var(--accent))] pl-6">
              <p className="max-w-md d-3 text-[hsl(var(--primary))]">
                A building is honest or it isn&rsquo;t, and you can only tell by looking
                at the parts nobody photographs.
              </p>
              <cite className="mt-4 block u-label not-italic text-[hsl(var(--muted-foreground))]">
                Draft, to be replaced with his own words
              </cite>
            </blockquote>
            <Link href="/about/founder"
                  className="mt-9 inline-flex items-center gap-3 border-b border-[hsl(var(--primary))]/35 pb-2 u-label text-[hsl(var(--primary))] transition-colors hover:border-[hsl(var(--accent))] hover:text-[hsl(var(--accent))]"
                  data-testid="link-founder">
              More about him <ArrowUpRight size={15} />
            </Link>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
