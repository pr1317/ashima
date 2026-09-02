import { Link } from 'wouter';
import { ArrowDown, ArrowUpRight, Building2, Hammer, MapPin, Mail, Phone } from 'lucide-react';
import { Seo } from '@/components/seo';
import { PageHero } from '@/components/page-hero';
import { Section, DisplayHeading } from '@/components/section';
import { Reveal } from '@/components/reveal';
import { ProjectCard } from '@/components/project-card';
import { EnquiryForm } from '@/components/enquiry-form';
import { liveProjects, photographedDeliveries } from '@/lib/content';
import {
  AREAS_SERVED, LOCALITY_LINE, NAP, addressOneLine, mailHref, telHref, whatsappHref,
} from '@/lib/site';

export default function Home() {
  return (
    <>
      <Seo path="/"
           title="Ashima Engineering, homes in South Kolkata since 1995"
           description="Residential developer in South Kolkata, founded 1993. Sixty-plus buildings delivered in Santoshpur, Garfa, Jadavpur, Mukundapur, Baruipur and Sonarpur since 1995." />

      <PageHero size="full" image="/images/projects/hero.jpg"
                eyebrow="Homes with a local address"
                marker="South Kolkata · West Bengal"
                heading={<>Homes in<br /><em>South Kolkata,</em><br />since 1995.</>}>
        <div className="mt-10 flex max-w-xl flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <p className="on-photo max-w-sm t-sm text-[hsl(var(--card))]">{LOCALITY_LINE}</p>
          <a href="#available" className="hero-gold on-photo group flex shrink-0 items-center gap-4 u-label"
             data-testid="link-hero-explore">
            See what's available
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[hsl(var(--secondary))] transition-transform duration-300 group-hover:translate-y-1">
              <ArrowDown size={16} />
            </span>
          </a>
        </div>
        <div className="mt-9 flex flex-wrap gap-3">
          <a href={whatsappHref('Hello, I saw your website and wanted to ask about a flat.')}
             rel="noopener" target="_blank"
             className="on-photo flex items-center gap-2 border border-[hsl(var(--card))]/55 bg-[hsl(154_28%_10%/.45)] px-4 py-3 u-label text-[hsl(var(--card))] transition-colors hover:border-[hsl(var(--secondary))] hover:bg-[hsl(154_28%_10%/.7)] hover:text-[hsl(var(--secondary))]"
             data-testid="link-hero-whatsapp">
            WhatsApp us <ArrowUpRight size={14} />
          </a>
        </div>
      </PageHero>

      {/* The record strip: three claims, each checkable elsewhere on the site. */}
      <div className="border-b border-[hsl(var(--primary))]/15 bg-[hsl(var(--card))]">
        <div className="mx-auto flex max-w-[1380px] flex-wrap gap-x-12 gap-y-3 px-6 py-6 u-label text-[hsl(var(--primary))] lg:px-12"
             data-testid="strip-record">
          <span className="flex items-center gap-2.5">
            <span className="h-1.5 w-1.5 bg-[hsl(var(--accent))]" />Established 1993
          </span>
          <span className="flex items-center gap-2.5">
            <span className="h-1.5 w-1.5 bg-[hsl(var(--accent))]" />60+ projects delivered
          </span>
          <span className="flex items-center gap-2.5">
            <span className="h-1.5 w-1.5 bg-[hsl(var(--accent))]" />Government and PSU contracts
          </span>
        </div>
      </div>

      {/* --- 01 / The name ------------------------------------------------ */}
      <Section eyebrow="01 / The name" tone="light">
        <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <div />
          <Reveal delay={1}>
            <DisplayHeading className="max-w-4xl d-1 text-[hsl(var(--primary))]"
                            em="a promise.">
              The name is
            </DisplayHeading>
            <div className="prose-ashima mt-10 max-w-2xl">
              <p className="!text-[hsl(var(--primary))] t-lead">
                Ashima is our founder&rsquo;s mother. Our first building is named
                after his daughter. Thirty years on, we are still putting the
                family&rsquo;s names on the front of the buildings we hand over.
              </p>
            </div>
            <Link href="/about"
                  className="mt-9 inline-flex items-center gap-3 border-b border-[hsl(var(--primary))]/35 pb-2 u-label text-[hsl(var(--primary))] transition-colors hover:border-[hsl(var(--accent))] hover:text-[hsl(var(--accent))]"
                  data-testid="link-name-story">
              Read the whole of it <ArrowUpRight size={15} />
            </Link>
          </Reveal>
        </div>
      </Section>

      {/* --- 02 / Open for booking ---------------------------------------- */}
      <Section id="available" tone="dark">
        <Reveal>
          <div className="flex flex-col justify-between gap-8 border-b border-[hsl(var(--card))]/20 pb-10 md:flex-row md:items-end">
            <div>
              <div className="mb-5 u-eyebrow text-[hsl(var(--secondary))]">
                02 / Open for booking
              </div>
              <DisplayHeading className="d-1"
                              em="put down roots.">
                A place to
              </DisplayHeading>
            </div>
            <p className="max-w-xs t-sm text-[hsl(var(--card))]/72">
              Not a catalogue. Just what is open now, and underneath it every
              building we have finished since 1995.
            </p>
          </div>
        </Reveal>

        {liveProjects.length > 0 ? (
          <div className="mt-12 grid gap-7 lg:grid-cols-2">
            {liveProjects.map((p, i) => (
              <ProjectCard key={p.id} project={p} priority={i === 0} onDark />
            ))}
          </div>
        ) : (
          <div className="mt-12 border border-[hsl(var(--card))]/25 p-8">
            <DisplayHeading className="d-2">Nothing open just now</DisplayHeading>
            <p className="mt-4 max-w-lg t-sm text-[hsl(var(--card))]/72">
              No new project is open for booking right now. Tell us what you're
              looking for and we'll call you when the next one opens.
            </p>
            <Link href="/contact#enquire"
                  className="mt-6 inline-flex items-center gap-2 bg-[hsl(var(--secondary))] px-5 py-3.5 u-label text-[hsl(var(--primary))]">
              Tell us what you want <ArrowUpRight size={14} />
            </Link>
          </div>
        )}
      </Section>

      {/* --- 03 / What we do ---------------------------------------------- */}
      <Section eyebrow="03 / What we do" tone="gold">
        <div className="mt-2 grid gap-9 lg:grid-cols-[.8fr_1.8fr]">
          <div />
          <Reveal>
            <DisplayHeading className="max-w-4xl d-1" em="Close to home.">
              Small buildings.
            </DisplayHeading>
            <p className="mt-8 max-w-2xl t-body text-[hsl(var(--primary))]/70">
              Residential development in South Kolkata, largely on joint-venture
              terms with landowners; institutional and government contracts
              alongside.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-8 border-t border-[hsl(var(--primary))]/25 pt-8 md:grid-cols-[1.15fr_.85fr] md:gap-16">
          <Reveal>
            <div className="flex gap-5">
              <Building2 size={27} strokeWidth={1.25} className="mt-1 shrink-0" />
              <div>
                <DisplayHeading as="h3" className="d-2">The shape of our work</DisplayHeading>
                <p className="mt-5 max-w-2xl t-body text-[hsl(var(--primary))]/70">
                  The buildings are small. Eight flats, twelve, occasionally
                  twenty. Four floors and a lift, covered parking at ground
                  level, on plots between Santoshpur and Sonarpur.
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={1}>
            <div className="border-l border-[hsl(var(--primary))]/25 pl-6">
              <div className="flex items-center gap-3 u-label">
                <MapPin size={14} />A twenty-minute radius
              </div>
              <p className="mt-5 t-body text-[hsl(var(--primary))]/70">
                We have never tried to become a company that builds towers. We
                work in the localities we can reach in twenty minutes.
              </p>
              <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 d-4 italic">
                {AREAS_SERVED.map((place) => <span key={place}>{place}</span>)}
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-[hsl(var(--primary))]/25 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/land-owners" className="flex items-center gap-3 u-label transition-colors hover:text-[hsl(var(--accent))]"
                data-testid="link-door-land-owners">
            <Hammer size={14} /> Landowner partnerships <ArrowUpRight size={13} />
          </Link>
          <Link href="/institutional" className="flex items-center gap-3 u-label transition-colors hover:text-[hsl(var(--accent))]"
                data-testid="link-door-institutional">
            <Building2 size={14} /> Institutional &amp; government work <ArrowUpRight size={13} />
          </Link>
        </div>
      </Section>

      {/* --- 04 / Handed over --------------------------------------------- */}
      <Section eyebrow="04 / Handed over" tone="card">
        <div className="mt-2 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <DisplayHeading className="d-1 text-[hsl(var(--primary))]" em="memory.">
            A long
          </DisplayHeading>
          <p className="max-w-sm t-sm text-[hsl(var(--muted-foreground))]">
            The places have changed. The scale has not. Sixty-odd buildings
            across South Kolkata, from the first eight-flat building to today.
          </p>
        </div>

        <div className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {photographedDeliveries.map((p, i) => (
            <Reveal key={p.id} delay={(i % 3) as 0 | 1 | 2}>
              <Link href={`/projects/${p.id}`} className="group block"
                    data-testid={`link-delivered-${p.id}`}>
                <div className="relative aspect-[1.18] overflow-hidden bg-[hsl(var(--muted))]">
                  <img src={p.images[0].src} alt={p.images[0].alt}
                       className="project-image h-full w-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--primary))]/70 via-transparent to-transparent" />
                </div>
                <div className="flex items-start justify-between gap-4 border-b border-[hsl(var(--primary))]/15 py-5">
                  <div>
                    <p className="flex items-center gap-2 u-label text-[hsl(var(--accent))]">
                      <MapPin size={11} />{p.locality} · {p.yearCompleted}
                    </p>
                    <h3 className="mt-2 d-3 text-[hsl(var(--primary))]">{p.name}</h3>
                  </div>
                  <ArrowUpRight size={18} className="mt-1 shrink-0 text-[hsl(var(--primary))]/55 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Link href="/projects"
              className="mt-10 inline-flex items-center gap-3 border-b border-[hsl(var(--primary))]/35 pb-2 u-label text-[hsl(var(--primary))] transition-colors hover:border-[hsl(var(--accent))] hover:text-[hsl(var(--accent))]"
              data-testid="link-all-projects">
          All 60+ projects since 1995 <ArrowUpRight size={15} />
        </Link>
      </Section>

      {/* --- 05 / Neighbourhoods ------------------------------------------ */}
      <section className="relative overflow-hidden bg-[hsl(var(--accent))] py-20 text-[hsl(var(--card))] lg:py-28"
               data-testid="section-neighbourhoods">
        <div className="absolute -right-28 -top-28 h-80 w-80 rounded-full border border-[hsl(var(--card))]/20" />
        <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full border border-[hsl(var(--card))]/20" />
        <div className="relative mx-auto grid max-w-[1380px] gap-10 px-6 lg:grid-cols-[.85fr_1.15fr] lg:px-12">
          <Reveal>
            <div className="u-eyebrow text-[hsl(var(--card))]/72">
              <span className="mb-4 block h-px w-12 bg-[hsl(var(--secondary))]" />
              05 / Around here
            </div>
            <DisplayHeading className="mt-7 max-w-xl d-1"
                            em="life already is.">
              We build where
            </DisplayHeading>
          </Reveal>
          <Reveal delay={1} className="lg:pt-10">
            <p className="max-w-lg t-lead text-[hsl(var(--card))]/85">
              From the tram lines and lake air of Jadavpur to the quieter edges
              of Mukundapur, these are places we understand from the inside.
            </p>
            <div className="mt-12 flex max-w-2xl flex-wrap gap-x-7 gap-y-4 border-t border-[hsl(var(--card))]/30 pt-7">
              {AREAS_SERVED.map((n) => (
                <span key={n} className="d-3 italic text-[hsl(var(--card))]">{n}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* --- 06 / Come and see us ----------------------------------------- */}
      <Section id="contact" eyebrow="06 / Come and see us" tone="dark">
        <div className="mt-4 grid gap-14 lg:grid-cols-[.78fr_1.22fr] lg:gap-24">
          <Reveal>
            <DisplayHeading className="d-page"
                            em="see us.">
              Come and
            </DisplayHeading>
            <p className="mt-10 max-w-sm t-sm text-[hsl(var(--card))]/72">
              The office is on Aurobindo Road in Santoshpur. If you would rather
              see a building than an office, say so and we will meet you at one.
            </p>
            {/* The address itself reads as text, not as an interface label —
                only the two actions carry the label treatment. */}
            <address className="mt-8 space-y-4 not-italic text-[hsl(var(--card))]/85">
              <span className="t-sm block">{addressOneLine}</span>
              <a href={telHref} className="u-label flex items-center gap-2 transition-colors hover:text-[hsl(var(--secondary))]"
                 data-testid="link-phone">
                <Phone size={14} className="text-[hsl(var(--secondary))]" /> {NAP.phone}
              </a>
              <a href={mailHref} className="t-sm flex items-center gap-2 transition-colors hover:text-[hsl(var(--secondary))]"
                 data-testid="link-email">
                <Mail size={14} className="text-[hsl(var(--secondary))]" /> {NAP.email}
              </a>
              <span className="t-sm block text-[hsl(var(--secondary))]">{NAP.hours}</span>
            </address>
          </Reveal>
          <Reveal delay={1}>
            <p className="mb-8 border-t border-[hsl(var(--card))]/25 pt-6 u-label text-[hsl(var(--card))]/58">
              Tell us what you&rsquo;re looking for and someone will call you back
              within one working day.
            </p>
            <EnquiryForm name="home-enquiry" compact onDark />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
