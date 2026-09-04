import { Link, useRoute } from 'wouter';
import { ArrowLeft, MapPin } from 'lucide-react';
import { Seo } from '@/components/seo';
import { PageHero } from '@/components/page-hero';
import { ReraStrip } from '@/components/rera-strip';
import { EnquiryForm } from '@/components/enquiry-form';
import { Band, DefList, FactGrid, Head, Panel, TickList } from '@/components/blocks';
import { projects } from '@/data/projects';
import NotFound from '@/pages/not-found';
import { STATUS_LABELS, isLive } from '@/lib/types';
import { NAP, mapsDirections, mapsEmbed } from '@/lib/site';

export default function ProjectDetail() {
  const [, params] = useRoute('/projects/:id');
  const p = projects.find((x) => x.id === params?.id);
  if (!p) return <NotFound />;

  const live = isLive(p);
  const where = p.address ?? `${p.name}, ${p.locality}, Kolkata`;

  const facts: [string, string][] = [];
  if (p.unitTypes.length) facts.push(['Flat types', p.unitTypes.join(' and ')]);
  if (p.carpetAreaMin && p.carpetAreaMax) {
    facts.push(['Carpet area', `${p.carpetAreaMin}–${p.carpetAreaMax} sq ft`]);
  }
  if (p.unitsAvailable !== null && p.totalUnits !== null) {
    facts.push(['Still unsold', `${p.unitsAvailable} of ${p.totalUnits}`]);
  } else if (p.totalUnits !== null) {
    facts.push(['Flats', String(p.totalUnits)]);
  }
  if (p.floors !== null) facts.push(['Floors', String(p.floors)]);
  if (p.possessionDate) facts.push(['Possession', p.possessionDate]);
  if (p.yearCompleted) facts.push(['Handed over', String(p.yearCompleted)]);

  return (
    <>
      <Seo path={`/projects/${p.id}`} title={`${p.name}, ${p.locality} — Ashima Engineering`}
           description={p.summary} ogImage={p.images[0]?.src} />

      <PageHero eyebrow={`${STATUS_LABELS[p.status]} · ${p.locality}`}
                heading={p.name}
                image={p.images[0]?.src ?? '/images/projects/hero.jpg'}>
        {p.summary}
      </PageHero>

      {/* The registration number sits with the project name rather than in a
          footer. Section 11(2) of the Real Estate (Regulation and Development)
          Act 2016 and WBRERA Order No. 492-RERA/L-01/2023 require it on every
          advertisement, and a number a reader has to go looking for is not
          being displayed. */}
      {live && p.reraNumber && (
        <div className="mx-auto max-w-[1380px] px-5 pt-6 lg:px-12">
          <ReraStrip reraNumber={p.reraNumber} verified={p.reraVerified}
                     titleSize="var(--page-title-size)" />
        </div>
      )}

      <Band testid="section-project">
        {facts.length > 0 && <FactGrid facts={facts} />}

        {p.body.length > 0 && (
          <div className="prose-ashima mt-9 max-w-[62ch]">
            {p.body.map((para, i) => (
              <p key={i} className={i === 0 ? 't-lead' : 't-body'}>{para}</p>
            ))}
          </div>
        )}

        {p.specifications && (
          <div className="mt-12">
            <Head>Specifications</Head>
            <div className="mt-5">
              <DefList rows={Object.entries(p.specifications)} />
            </div>
          </div>
        )}

        {p.amenities.length > 0 && (
          <div className="mt-12">
            <Head>Amenities</Head>
            <div className="mt-5">
              <TickList items={p.amenities} />
            </div>
          </div>
        )}

        {p.nearby && (
          <div className="mt-12">
            <Head>What is nearby</Head>
            <p className="mt-4 max-w-[62ch] t-body text-[hsl(var(--muted-foreground))]">{p.nearby}</p>
          </div>
        )}

        <Panel className="mt-12">
          <p className="u-micro text-[hsl(var(--muted-foreground))]">Address</p>
          <p className="mt-1.5 t-body text-[hsl(var(--primary))]">{where}</p>
          {p.lat !== null && p.lng !== null && (
            <div className="mt-4 aspect-[16/9] overflow-hidden rounded-[var(--radius)] border border-[hsl(var(--border))] bg-[hsl(var(--muted))]">
              <iframe title={`Map showing ${p.name}`} src={mapsEmbed(where)} loading="lazy"
                      className="size-full border-0" referrerPolicy="no-referrer-when-downgrade" />
            </div>
          )}
          <a href={mapsDirections(where)} target="_blank" rel="noreferrer"
             data-testid="link-directions"
             className="mt-4 inline-flex min-h-11 items-center gap-2 u-label text-[hsl(var(--accent))]">
            <MapPin size={15} aria-hidden="true" /> Directions
          </a>
        </Panel>

        <Link href="/projects" data-testid="link-back-projects"
              className="mt-10 inline-flex min-h-11 items-center gap-2 u-label text-[hsl(var(--accent))]">
          <ArrowLeft size={15} aria-hidden="true" /> All projects
        </Link>
      </Band>

      <Band id="enquire" tone="card" testid="section-enquire">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <Head eyebrow="Come and see it"
                  lede={`Somebody is on site most mornings. ${NAP.hours}`}>
              Book a site visit
            </Head>
          </div>
          <EnquiryForm name="project-enquiry" />
        </div>
      </Band>
    </>
  );
}
