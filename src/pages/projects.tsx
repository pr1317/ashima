import { useMemo, useState } from 'react';
import { Link } from 'wouter';
import { ArrowUpRight } from 'lucide-react';
import { Seo } from '@/components/seo';
import { PageHero } from '@/components/page-hero';
import { Section, DisplayHeading } from '@/components/section';
import { Reveal } from '@/components/reveal';
import { ProjectCard } from '@/components/project-card';
import {
  hasOwnPage, liveProjects, projectsByYear, recordLocalities, recordTotals,
} from '@/lib/content';

export default function Projects() {
  const [locality, setLocality] = useState<string>('all');

  /* Every group, count and filter below derives from the collection — there is
     no hardcoded list anywhere, so adding a markdown file is genuinely all it
     takes for a building to appear here. */
  const groups = useMemo(
    () => projectsByYear
      .map(({ year, projects }) => ({
        year,
        projects: locality === 'all' ? projects : projects.filter((p) => p.locality === locality),
      }))
      .filter((g) => g.projects.length > 0),
    [locality],
  );

  const shown = groups.reduce((n, g) => n + g.projects.length, 0);

  return (
    <>
      <Seo path="/projects"
           title="Projects, every building since 1995 | Ashima Engineering"
           description="The complete record of every residential project Ashima Engineering has delivered in South Kolkata since 1995, by year, with what is open for booking now." />

      <PageHero image="/images/projects/sraboni-b.jpg" eyebrow="Since 1995"
                heading={<>A place to<br /><em>put down roots.</em></>}
                marker="60+ delivered">
        <p className="mt-9 max-w-md t-sm text-[hsl(var(--card))]/85">
          What is open for booking now, and underneath it every building we have
          finished since 1995.
        </p>
      </PageHero>

      {/* --- 01 / Open for booking ---------------------------------------- */}
      <Section id="available" eyebrow="01 / Open for booking" tone="light">
        <div className="mt-2 grid gap-9 lg:grid-cols-[.8fr_1.8fr]">
          <div />
          <Reveal>
            <DisplayHeading className="max-w-3xl d-1 text-[hsl(var(--primary))]"
                            em="booking.">
              Open for
            </DisplayHeading>
          </Reveal>
        </div>

        {liveProjects.length > 0 ? (
          <div className="mt-14 grid gap-7 lg:grid-cols-2">
            {liveProjects.map((p, i) => (
              <ProjectCard key={p.id} project={p} priority={i === 0} />
            ))}
          </div>
        ) : (
          <div className="mt-14 border border-[hsl(var(--primary))]/20 bg-[hsl(var(--card))] p-8">
            <p className="max-w-lg t-body text-[hsl(var(--muted-foreground))]">
              No new project is open for booking right now. Tell us what you're
              looking for and we'll call you when the next one opens.
            </p>
            <Link href="/contact#enquire"
                  className="mt-6 inline-flex items-center gap-2 bg-[hsl(var(--primary))] px-5 py-3.5 u-label text-[hsl(var(--card))]">
              Tell us what you want <ArrowUpRight size={14} />
            </Link>
          </div>
        )}
      </Section>

      {/* --- 02 / The record ---------------------------------------------- */}
      <Section id="record" eyebrow="02 / The record" tone="dark">
        <div className="mt-2 grid gap-9 lg:grid-cols-[.8fr_1.8fr]">
          <div />
          <Reveal>
            <DisplayHeading className="max-w-4xl d-1" em="1995 to today.">
              Every project,
            </DisplayHeading>
            <p className="mt-8 max-w-2xl t-body text-[hsl(var(--card))]/85">
              Sixty-odd buildings across South Kolkata. We do not have photographs of
              all of them, because the early ones were finished before anyone thought to
              take any. They are on the list regardless.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 flex flex-wrap gap-x-10 gap-y-3 border-y border-[hsl(var(--card))]/20 py-5 u-label text-[hsl(var(--secondary))]">
          <span>{recordTotals.buildings} buildings</span>
          <span>{recordTotals.flats} flats</span>
          <span>{recordTotals.localities} localities</span>
          <span>{recordTotals.firstYear}–{recordTotals.lastYear}</span>
        </div>

        <div className="mt-8 flex flex-wrap gap-2" role="group"
             aria-label="Filter the record by locality">
          <button type="button" aria-pressed={locality === 'all'}
                  onClick={() => setLocality('all')}
                  className={`border px-4 py-2.5 u-label transition-colors ${
                    locality === 'all'
                      ? 'border-[hsl(var(--secondary))] bg-[hsl(var(--secondary))] text-[hsl(var(--primary))]'
                      : 'border-[hsl(var(--card))]/25 text-[hsl(var(--card))]/72 hover:border-[hsl(var(--secondary))] hover:text-[hsl(var(--secondary))]'}`}
                  data-testid="button-filter-all">
            All localities
          </button>
          {recordLocalities.map((l) => (
            <button key={l} type="button" aria-pressed={locality === l}
                    onClick={() => setLocality(l)}
                    className={`border px-4 py-2.5 u-label transition-colors ${
                      locality === l
                        ? 'border-[hsl(var(--secondary))] bg-[hsl(var(--secondary))] text-[hsl(var(--primary))]'
                        : 'border-[hsl(var(--card))]/25 text-[hsl(var(--card))]/72 hover:border-[hsl(var(--secondary))] hover:text-[hsl(var(--secondary))]'}`}
                    data-testid={`button-filter-${l.toLowerCase()}`}>
              {l}
            </button>
          ))}
        </div>

        <p className="mt-5 u-label text-[hsl(var(--card))]/58"
           aria-live="polite" data-testid="text-record-count">
          {locality === 'all'
            ? `Showing all ${shown} buildings.`
            : `Showing ${shown} ${shown === 1 ? 'building' : 'buildings'} in ${locality}.`}
        </p>

        <div className="mt-12 border-t border-[hsl(var(--card))]/20">
          {groups.map(({ year, projects }) => (
            <Reveal key={year}>
              <div className="grid gap-4 border-b border-[hsl(var(--card))]/20 py-7 md:grid-cols-[9rem_1fr] md:gap-10">
                <div>
                  <p className="d-2 italic text-[hsl(var(--secondary))]">{year}</p>
                  <p className="mt-2 u-micro text-[hsl(var(--card))]/58">
                    {projects.length} {projects.length === 1 ? 'building' : 'buildings'}
                  </p>
                </div>
                <div>
                  {projects.map((p) => {
                    const inner = (
                      <>
                        <span className="d-3 text-[hsl(var(--card))]">{p.name}</span>
                        <span className="u-label text-[hsl(var(--card))]/58">{p.locality}</span>
                        <span className="text-right u-label text-[hsl(var(--card))]/58">
                          {p.totalUnits ? `${p.totalUnits} flats` : '—'}
                        </span>
                      </>
                    );
                    const shape = 'grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-1 border-b border-[hsl(var(--card))]/10 py-3.5 last:border-b-0 sm:grid-cols-[1fr_9rem_6rem]';
                    return hasOwnPage(p) ? (
                      <Link key={p.id} href={`/projects/${p.id}`}
                            className={`${shape} group transition-all hover:pl-3`}
                            data-testid={`row-project-${p.id}`}>
                        {inner}
                      </Link>
                    ) : (
                      <div key={p.id} className={shape} data-testid={`row-project-${p.id}`}>
                        {inner}
                      </div>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
