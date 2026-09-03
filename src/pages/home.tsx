import { Link } from 'wouter';
import { ArrowUpRight, MessageCircle, Phone } from 'lucide-react';
import { Seo } from '@/components/seo';
import { HeroHome } from '@/components/hero-home';
import { CredentialBand } from '@/components/credential-band';
import { ProjectCard } from '@/components/project-card';
import { EnquiryForm } from '@/components/enquiry-form';
import { institutional } from '@/data/institutional';
import { liveProjects, recordLocalities } from '@/lib/content';
import { NAP, addressOneLine, telHref, whatsappHref } from '@/lib/site';

/** The three people who arrive on this site want different things, and until
 *  now the page made all three read the same wall of prose. Each gets a row. */
const STREAMS = [
  {
    q: 'You want a flat',
    a: 'Two buildings are open right now, both two and three bedroom. We will show you the site, the sanction plan and the registration number before you pay anything.',
    href: '/projects', cta: 'See available flats',
  },
  {
    q: 'You own land',
    a: 'Thirty joint ventures completed, every one settled on the terms agreed at the start. What you get, when you get it, and what happens if we are late — in writing, first.',
    href: '/land-owners', cta: 'How a joint venture works',
  },
  {
    q: 'You are tendering work',
    a: 'Civil works and building maintenance under PSU contract, and subcontract work for larger contractors.',
    href: '/institutional', cta: 'Institutional work',
  },
];

export default function Home() {
  return (
    <>
      <Seo path="/" title="Ashima Engineering — flats in South Kolkata since 1993"
           description={`Sixty-five buildings in South Kolkata since ${NAP.founded}. Two open for booking now, each showing its WBRERA registration number.`} />

      <HeroHome />
      <CredentialBand />

      {/* --- Open for booking --------------------------------------------- */}
      <section id="available" className="py-14 lg:py-24" data-testid="section-available">
        <div className="mx-auto max-w-[1380px] px-5 lg:px-12">
          <p className="u-eyebrow text-[hsl(var(--accent))]">Available now</p>
          <h2 className="mt-3 d-2 text-[hsl(var(--primary))]">
            {liveProjects.length === 1 ? 'One building' : 'Two buildings'} open for booking
          </h2>
          <p className="mt-4 max-w-[52ch] t-body text-[hsl(var(--muted-foreground))]">
            Everything else has been handed over. Somebody is on site most mornings —
            come and see it before you decide anything.
          </p>

          {/* A rail on a phone, so the second building is visibly there rather
              than a scroll away; a plain grid once there is room for both. */}
          <div className="mt-8 -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 lg:mx-0 lg:grid lg:grid-cols-2 lg:gap-6 lg:overflow-visible lg:px-0">
            {liveProjects.map((p) => (
              <div key={p.id} className="w-[84%] shrink-0 snap-start lg:w-auto">
                <ProjectCard project={p} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Which one are you? ------------------------------------------- */}
      <section className="border-y border-[hsl(var(--border))] bg-[hsl(var(--card))] py-14 lg:py-24"
               data-testid="section-streams">
        <div className="mx-auto max-w-[1380px] px-5 lg:px-12">
          <p className="u-eyebrow text-[hsl(var(--accent))]">Three kinds of work</p>
          <h2 className="mt-3 d-2 text-[hsl(var(--primary))]">Which one are you?</h2>

          <div className="mt-8 border-t border-[hsl(var(--border))]">
            {STREAMS.map((s, i) => (
              <details key={s.q} open={i === 0}
                       className="group border-b border-[hsl(var(--border))]"
                       data-testid={`stream-${i}`}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-5 [&::-webkit-details-marker]:hidden">
                  <h3 className="d-3 text-[hsl(var(--primary))]">{s.q}</h3>
                  <span aria-hidden="true"
                        className="relative size-4 shrink-0 before:absolute before:left-0 before:top-[7px] before:h-px before:w-4 before:bg-[hsl(var(--accent))] after:absolute after:left-[7px] after:top-0 after:h-4 after:w-px after:bg-[hsl(var(--accent))] after:transition-transform group-open:after:rotate-90" />
                </summary>
                <div className="pb-6">
                  <p className="max-w-[62ch] t-body text-[hsl(var(--muted-foreground))]">{s.a}</p>
                  <Link href={s.href} className="mt-4 inline-flex items-center gap-1.5 u-label text-[hsl(var(--accent))]"
                        data-testid={`link-stream-${i}`}>
                    {s.cta} <ArrowUpRight size={14} aria-hidden="true" />
                  </Link>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* --- Where we build ----------------------------------------------- */}
      <section className="py-14 lg:py-24" data-testid="section-localities">
        <div className="mx-auto max-w-[1380px] px-5 lg:px-12">
          <p className="u-eyebrow text-[hsl(var(--accent))]">Where we build</p>
          <h2 className="mt-3 max-w-[18ch] d-2 text-[hsl(var(--primary))]">
            Start with the neighbourhood
          </h2>
          <p className="mt-4 max-w-[52ch] t-body text-[hsl(var(--muted-foreground))]">
            {recordLocalities.length} localities, all within about eight kilometres of the
            office. It is the reason we can be on a site the same morning you call about a leak.
          </p>
          <ul className="mt-7 flex flex-wrap gap-2.5">
            {recordLocalities.map((l) => (
              <li key={l}>
                <Link href="/projects"
                      className="inline-flex min-h-11 items-center rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-5 t-sm text-[hsl(var(--primary))]"
                      data-testid={`link-locality-${l.toLowerCase()}`}>
                  {l}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* --- Institutional ------------------------------------------------ */}
      <section className="on-dark bg-[hsl(var(--primary))] py-14 text-[hsl(var(--card))] lg:py-24"
               data-testid="section-institutional">
        <div className="mx-auto max-w-[1380px] px-5 lg:px-12">
          <p className="u-eyebrow text-[hsl(var(--secondary))]">PSU tenders &amp; institutional</p>
          <h2 className="mt-3 max-w-[20ch] d-2 text-[hsl(var(--card))]">
            Work done under government contract
          </h2>
          <div className="mt-8 border-t border-[hsl(var(--card))]/20">
            {institutional.map((c) => (
              <div key={c.id}
                   className="flex flex-wrap items-baseline justify-between gap-x-5 gap-y-1 border-b border-[hsl(var(--card))]/20 py-4"
                   data-testid={`row-institutional-${c.id}`}>
                <span className="d-4 text-[hsl(var(--card))]">{c.organisation}</span>
                <span className="u-micro text-[hsl(var(--secondary))]">{c.status}</span>
              </div>
            ))}
          </div>
          <Link href="/institutional" className="mt-6 inline-flex items-center gap-1.5 u-label text-[hsl(var(--secondary))]"
                data-testid="link-institutional">
            The full institutional record <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* --- Come and see the site ---------------------------------------- */}
      <section id="contact" className="border-b border-[hsl(var(--border))] bg-[hsl(var(--card))] py-14 lg:py-24"
               data-testid="section-contact">
        <div className="mx-auto grid max-w-[1380px] gap-10 px-5 lg:grid-cols-2 lg:gap-16 lg:px-12">
          <div>
            <p className="u-eyebrow text-[hsl(var(--accent))]">Come and see the site</p>
            <h2 className="mt-3 max-w-[18ch] d-2 text-[hsl(var(--primary))]">
              Somebody is there most mornings
            </h2>
            <p className="mt-4 max-w-[46ch] t-body text-[hsl(var(--muted-foreground))]">
              {addressOneLine}. {NAP.hours}
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a href={telHref}
                 className="inline-flex min-h-13 items-center justify-center gap-2 rounded-[var(--radius)] bg-[hsl(var(--accent))] px-7 u-label text-[hsl(var(--accent-foreground))]"
                 data-testid="link-contact-phone">
                <Phone size={16} aria-hidden="true" /> {NAP.phone}
              </a>
              <a href={whatsappHref('Hello, I saw the Ashima Engineering website and wanted to ask about a flat.')}
                 className="inline-flex min-h-13 items-center justify-center gap-2 rounded-[var(--radius)] border border-[hsl(var(--border))] px-7 u-label text-[hsl(var(--primary))]"
                 data-testid="link-contact-whatsapp">
                <MessageCircle size={16} aria-hidden="true" /> WhatsApp
              </a>
            </div>
          </div>
          <EnquiryForm name="home-enquiry" />
        </div>
      </section>
    </>
  );
}
