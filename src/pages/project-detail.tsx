import { Link, useRoute } from 'wouter';
import { ArrowUpRight, MapPin, Phone } from 'lucide-react';
import { Seo } from '@/components/seo';
import { Section, DisplayHeading } from '@/components/section';
import { Reveal } from '@/components/reveal';
import { ReraStrip } from '@/components/rera-strip';
import { EnquiryForm } from '@/components/enquiry-form';
import NotFound from '@/pages/not-found';
import { getProject } from '@/lib/content';
import { STATUS_LABELS, isLive } from '@/lib/types';
import { NAP, mapsDirections, mapsEmbed, telHref, whatsappHref } from '@/lib/site';

export default function ProjectDetail() {
  const [, params] = useRoute('/projects/:id');
  const p = params?.id ? getProject(params.id) : undefined;

  if (!p) return <NotFound />;

  const live = isLive(p);
  const specs = p.specifications ? Object.entries(p.specifications) : [];
  const mapQuery = p.address ?? `${p.name}, ${p.locality}, Kolkata`;
  const lead = p.images[0];

  const facts: [string, string][] = [
    ['Status', STATUS_LABELS[p.status]],
    ['Locality', p.locality],
    ...(p.unitTypes.length ? ([['Unit types', p.unitTypes.join(', ')]] as [string, string][]) : []),
    ...(p.carpetAreaMin && p.carpetAreaMax
      ? ([['Carpet area', `${p.carpetAreaMin}–${p.carpetAreaMax} sq ft`]] as [string, string][]) : []),
    ...(p.totalUnits ? ([['Total flats', String(p.totalUnits)]] as [string, string][]) : []),
    ...(p.unitsAvailable != null ? ([['Still available', String(p.unitsAvailable)]] as [string, string][]) : []),
    ...(p.floors ? ([['Floors', String(p.floors)]] as [string, string][]) : []),
    ...(p.possessionDate ? ([['Possession', p.possessionDate]] as [string, string][]) : []),
    ...(p.yearCompleted ? ([['Handed over', String(p.yearCompleted)]] as [string, string][]) : []),
    ...(p.address ? ([['Address', p.address]] as [string, string][]) : []),
  ];

  /* Per-project structured data. Only live projects get it: marking a building
     handed over in 2004 as an offer would be misleading to a search engine as
     well as to a reader. */
  const schema = live
    ? {
        '@context': 'https://schema.org',
        '@type': 'Residence',
        name: p.name,
        description: p.summary,
        ...(p.totalUnits ? { numberOfRooms: p.totalUnits } : {}),
        address: {
          '@type': 'PostalAddress',
          streetAddress: p.address ?? p.locality,
          addressLocality: 'Kolkata',
          addressRegion: 'West Bengal',
          addressCountry: 'IN',
        },
        ...(p.lat && p.lng
          ? { geo: { '@type': 'GeoCoordinates', latitude: p.lat, longitude: p.lng } } : {}),
        ...(p.carpetAreaMin
          ? { floorSize: { '@type': 'QuantitativeValue', minValue: p.carpetAreaMin, maxValue: p.carpetAreaMax, unitCode: 'FTK' } } : {}),
      }
    : null;

  return (
    <>
      <Seo path={`/projects/${p.id}`}
           title={`${p.name}, ${p.locality} | Ashima Engineering`}
           description={p.summary || `${p.name}, a residential building by Ashima Engineering in ${p.locality}, South Kolkata.`}
           ogImage={lead?.src ?? '/images/projects/hero.jpg'}
           schema={schema} />

      {/* The hero. The WBRERA strip sits in it, in plain sight, never faded in
          — which is why nothing here is wrapped in <Reveal>. */}
      <section className="on-dark relative flex min-h-[560px] items-end overflow-hidden bg-[hsl(var(--primary))] text-[hsl(var(--card))] lg:min-h-[620px]"
               data-testid="section-hero">
        {/* The photograph first, then everything that darkens it — see the
            note in src/components/page-hero.tsx. */}
        {lead && (
          <div className="absolute inset-0 bg-cover bg-center opacity-80 mix-blend-luminosity"
               style={{ backgroundImage: `url('${lead.src}')` }} aria-hidden="true" />
        )}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,hsl(24_30%_10%/.9)_0%,hsl(24_30%_12%/.68)_46%,hsl(24_30%_12%/.2)_100%),linear-gradient(0deg,hsl(24_30%_10%/.86),transparent_62%)]" />
        <div className="absolute inset-0 bg-[hsl(24_30%_10%/.46)] lg:bg-[hsl(24_30%_10%/.28)]" />
        {/* Keeps the nav legible where the photograph runs light. */}
        <div className="absolute inset-x-0 top-0 h-48 bg-[linear-gradient(180deg,hsl(24_30%_8%/.8),transparent)]" />
        <div className="absolute -right-20 top-28 h-72 w-72 rounded-full border border-[hsl(var(--secondary))]/20 lg:right-20" />

        <div className="relative z-10 mx-auto w-full max-w-[1380px] px-6 pb-14 pt-40 lg:px-12 lg:pb-16">
          <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <div className="hero-eyebrow hero-gold mb-7 inline-flex items-center gap-3 u-eyebrow">
                <span className="h-px w-10 bg-[hsl(var(--secondary))]" />
                <Link href="/projects" className="hover:underline">Projects</Link>
                <span aria-hidden="true">·</span>{STATUS_LABELS[p.status]}
              </div>
              <h1 className="font-display text-[length:var(--page-title-size)]">
                {p.name}
              </h1>
              <p className="mt-6 flex items-center gap-2 u-label text-[hsl(var(--secondary))]">
                <MapPin size={13} />{p.locality}, South Kolkata
              </p>
            </div>

            {/* Legally required, always visible. See rera-strip.tsx. */}
            {live && p.reraNumber && (
              <div className="w-full shrink-0 lg:max-w-[26rem]">
                <ReraStrip reraNumber={p.reraNumber} verified={p.reraVerified}
                           titleSize="var(--page-title-size)" explainer />
              </div>
            )}
          </div>
        </div>
      </section>

      {p.images.length > 1 && (
        <div className="bg-[hsl(var(--card))] py-6">
          <div className="mx-auto grid max-w-[1380px] gap-4 px-6 sm:grid-cols-2 lg:grid-cols-3 lg:px-12">
            {p.images.slice(1).map((img) => (
              <div key={img.src} className="aspect-[1.3] overflow-hidden bg-[hsl(var(--muted))]">
                <img src={img.src} alt={img.alt} loading="lazy"
                     className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      )}

      <Section eyebrow="01 / The building" tone="light">
        <div className="mt-10 grid gap-14 lg:grid-cols-[1.35fr_.65fr] lg:gap-20">
          <div>
            <Reveal>
              <div className="prose-ashima max-w-2xl">
                {p.body.map((para, i) => (
                  <p key={i} className={i === 0 ? 't-lead !text-[hsl(var(--primary))]' : ''}>
                    {para}
                  </p>
                ))}
              </div>
            </Reveal>

            {specs.length > 0 && (
              <Reveal className="mt-16">
                <DisplayHeading as="h2" className="d-2 text-[hsl(var(--primary))]">Specifications</DisplayHeading>
                <dl className="mt-8 border-t border-[hsl(var(--primary))]/15">
                  {specs.map(([k, v]) => (
                    <div key={k} className="grid gap-2 border-b border-[hsl(var(--primary))]/15 py-4 md:grid-cols-[13rem_1fr] md:gap-8">
                      <dt className="u-label text-[hsl(var(--accent))]">{k}</dt>
                      <dd className="max-w-2xl t-sm text-[hsl(var(--muted-foreground))]">{v}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            )}

            {p.amenities.length > 0 && (
              <Reveal className="mt-16">
                <DisplayHeading as="h2" className="d-2 text-[hsl(var(--primary))]">What the building has</DisplayHeading>
                <ul className="mt-8 flex flex-wrap gap-3">
                  {p.amenities.map((a) => (
                    <li key={a} className="border border-[hsl(var(--primary))]/20 px-4 py-2.5 u-label text-[hsl(var(--primary))]">
                      {a}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}

            {p.nearby && (
              <Reveal className="mt-16">
                <DisplayHeading as="h2" className="d-2 text-[hsl(var(--primary))]">What is nearby</DisplayHeading>
                <p className="mt-6 max-w-2xl t-body text-[hsl(var(--muted-foreground))]">{p.nearby}</p>
              </Reveal>
            )}

            {p.address && (
              <div className="mt-12">
                <iframe title={`Map showing ${p.name}, ${p.locality}`} loading="lazy"
                        width="100%" height={380}
                        className="border border-[hsl(var(--primary))]/20"
                        referrerPolicy="no-referrer-when-downgrade" src={mapsEmbed(mapQuery)} />
                <a href={mapsDirections(mapQuery)} rel="noopener" target="_blank"
                   className="mt-4 inline-flex items-center gap-2 border-b border-[hsl(var(--primary))]/35 pb-1.5 u-label text-[hsl(var(--primary))] hover:border-[hsl(var(--accent))] hover:text-[hsl(var(--accent))]">
                  Directions <ArrowUpRight size={13} />
                </a>
              </div>
            )}
          </div>

          <aside>
            <div className="border border-[hsl(var(--primary))]/20 bg-[hsl(var(--card))] p-7">
              <h2 className="u-label text-[hsl(var(--accent))]">The facts</h2>
              <dl className="mt-5">
                {facts.map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-5 border-b border-[hsl(var(--primary))]/12 py-3 last:border-b-0">
                    <dt className="u-label text-[hsl(var(--muted-foreground))]">{k}</dt>
                    <dd className="text-right t-sm text-[hsl(var(--primary))]">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {live && (
              <div className="on-dark mt-6 bg-[hsl(var(--primary))] p-7 text-[hsl(var(--card))]">
                <DisplayHeading as="h2" className="d-3">Ask about {p.name}</DisplayHeading>
                <p className="mt-4 t-sm text-[hsl(var(--card))]/72">
                  Call, send a message, or use the form. Someone will call you back
                  within one working day.
                </p>
                <a href={telHref}
                   className="mt-6 flex items-center justify-between gap-3 bg-[hsl(var(--secondary))] px-4 py-3.5 u-label text-[hsl(var(--primary))] transition-transform hover:-translate-y-1">
                  <span className="flex items-center gap-2"><Phone size={14} />{NAP.phone}</span>
                </a>
                <a href={whatsappHref(`Hello, I am interested in ${p.name} at ${p.locality}.`)}
                   rel="noopener" target="_blank"
                   className="mt-3 flex items-center justify-between gap-3 border border-[hsl(var(--card))]/35 px-4 py-3.5 u-label text-[hsl(var(--card))] transition-colors hover:border-[hsl(var(--secondary))] hover:text-[hsl(var(--secondary))]">
                  WhatsApp <ArrowUpRight size={14} />
                </a>
              </div>
            )}
          </aside>
        </div>
      </Section>

      {live && (
        <Section id="enquire" eyebrow="02 / Let us talk" tone="dark">
          <div className="mt-4 grid gap-14 lg:grid-cols-[.78fr_1.22fr] lg:gap-24">
            <Reveal>
              <DisplayHeading className="d-1"
                              em={p.name}>
                Enquire about
              </DisplayHeading>
              <p className="mt-10 max-w-sm t-sm text-[hsl(var(--card))]/72">
                A question, a site visit, a conversation about a future home —
                start wherever feels natural. We will get back to you within one
                working day.
              </p>
            </Reveal>
            <Reveal delay={1}>
              <EnquiryForm name="project-enquiry" subject={p.name} onDark />
            </Reveal>
          </div>
        </Section>
      )}
    </>
  );
}
