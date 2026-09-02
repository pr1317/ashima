import { ArrowUpRight, Phone } from 'lucide-react';
import { Seo } from '@/components/seo';
import { PageHero } from '@/components/page-hero';
import { Section, DisplayHeading } from '@/components/section';
import { Reveal } from '@/components/reveal';
import { NAP, telHref } from '@/lib/site';

const PORTRAIT = '/images/people/partha-pratim-roy.jpg';

export default function Founder() {
  return (
    <>
      <Seo path="/about/founder"
           title="Partha Pratim Roy, Ashima Engineering"
           description="Partha Pratim Roy founded Ashima Engineering in 1993 and has built more than sixty residential projects in South Kolkata since."
           ogImage={PORTRAIT} />

      <PageHero image={PORTRAIT} eyebrow="The founder"
                heading={<>Partha Pratim<br /><em>Roy.</em></>}
                marker="Founder, since 1993">
        <p className="mt-9 max-w-md t-sm text-[hsl(var(--card))]/85">
          Founder. Ashima Engineering, since 1993.
        </p>
      </PageHero>

      <Section eyebrow="01 / His own account" tone="light">
        <div className="mt-10 grid gap-16 lg:grid-cols-[.8fr_1.2fr] lg:gap-24">
          <Reveal>
            <div className="relative aspect-[.82] overflow-hidden bg-[hsl(var(--muted))]">
              <img src={PORTRAIT}
                   alt="Partha Pratim Roy, founder of Ashima Engineering, photographed at home in Kolkata"
                   className="absolute inset-0 h-full w-full object-cover object-[50%_62%]"
                   loading="eager" fetchPriority="high" />
              <div className="absolute inset-0 bg-[linear-gradient(150deg,hsl(154_28%_16%/.1),hsl(13_44%_49%/.26))]" />
            </div>
          </Reveal>

          <Reveal delay={1}>
            <div className="max-w-2xl space-y-6">
              <p className="t-lead text-[hsl(var(--primary))]">
                Partha Pratim Roy read <b>[SUBJECT]</b> at the University of Calcutta.
              </p>
              <p className="t-body text-[hsl(var(--muted-foreground))]">
                He came to construction sideways. His first business was
                gourmet catering, and he still talks about what it taught him. Something
                made to fit one family is not the same as something made to be sold.
              </p>
              <p className="t-body text-[hsl(var(--muted-foreground))]">
                He founded Ashima Engineering in 1993. Two years later he
                finished his first building, in Santoshpur, and named it
                Prarthana after his daughter. The company already carried his
                mother&rsquo;s name. That is still how it works here.
              </p>
              <p className="t-body text-[hsl(var(--muted-foreground))]">
                Since then Ashima has delivered more than sixty residential projects
                across South Kolkata. It has worked as a subcontractor to larger
                groups including L&amp;T, and taken contracts for
                government-associated organisations including Balmer Lawrie and
                Bicco Lawrie. He will tell you the discipline learned on that work
                is what he brings back to a twelve-flat building in Garfa.
              </p>
              <p className="d-3 italic text-[hsl(var(--accent))]">
                He is on site most mornings. He answers his own phone.
              </p>
            </div>

            <p className="gap-note">
              <strong>Still to confirm.</strong> The degree subject is marked in the
              text above and needs filling in. Also worth confirming that
              &ldquo;subcontractor to L&amp;T&rdquo; is accurately put, and that
              naming them this way is fine by everyone.
            </p>
            <p className="gap-note">
              <strong>The last two lines must be true.</strong> If he does not
              answer his own phone, cut them. They are the most persuasive sentences
              on this page and the most damaging if a buyer finds them false.
            </p>
          </Reveal>
        </div>
      </Section>

      <Section eyebrow="02 / In his words" tone="dark">
        <div className="mt-6 grid gap-9 lg:grid-cols-[.8fr_1.8fr]">
          <div />
          <Reveal>
            <blockquote className="max-w-3xl">
              <span className="d-1 italic text-[hsl(var(--secondary))]">&ldquo;</span>
              <p className="mt-2 d-2 leading-[1.06]">
                A building is honest or it isn&rsquo;t, and you can only tell by looking at
                the parts nobody photographs.
              </p>
              <cite className="mt-7 block u-label not-italic text-[hsl(var(--card))]/58">
                Draft, written for review
              </cite>
            </blockquote>
            <p className="gap-note">
              <strong>Do not publish this quotation.</strong> It was written to hold the
              space and show what the section looks like. One sentence from Partha
              Pratim Roy, in his own words, on what matters in building a home. Recorded
              from him, not written for him.
            </p>
          </Reveal>
        </div>
      </Section>

      <Section eyebrow="03 / Reaching him" tone="card">
        <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <Reveal>
            <DisplayHeading className="d-1 text-[hsl(var(--primary))]"
                            em="takes calls">
              If he
            </DisplayHeading>
            <p className="mt-8 max-w-md t-body text-[hsl(var(--muted-foreground))]">
              The office number reaches him during working hours.
            </p>
            <a href={telHref}
               className="mt-9 inline-flex items-center gap-3 bg-[hsl(var(--primary))] px-6 py-4 u-label text-[hsl(var(--card))] transition-transform hover:-translate-y-1"
               data-testid="link-founder-phone">
              <Phone size={14} /> {NAP.phone} <ArrowUpRight size={14} />
            </a>
            <p className="mt-5 u-label text-[hsl(var(--muted-foreground))]">
              {NAP.hours}
            </p>
          </Reveal>
          <Reveal delay={1}>
            <p className="gap-note !mt-0">
              <strong>Optional, and only with her consent:</strong> a photograph of
              Ashima, or of the two of them together, with a one-line caption. It would
              be the most memorable thing on the site. Do not add it without her
              explicit agreement.
            </p>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
