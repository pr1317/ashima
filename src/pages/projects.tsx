import { useMemo, useState } from 'react';
import { X } from 'lucide-react';
import { Seo } from '@/components/seo';
import { PageHero } from '@/components/page-hero';
import { ProjectCard } from '@/components/project-card';
import { LocalityMap } from '@/components/locality-map';
import { Band, FilterChips, Head, MiniCard, ShowMore, type Chip } from '@/components/blocks';
import { projects } from '@/data/projects';
import { finishedProjects, liveProjects } from '@/lib/content';
import { LOCALITIES } from '@/lib/types';
import { NAP } from '@/lib/site';

/** How many of the handed-over record to show before asking. Four fills two
 *  rows on a phone and one on a desktop, which is enough to show what the
 *  record looks like without making the page endless. */
const FIRST = 8;

/** Buildings per locality, every status counted. Absolute rather than filtered
 *  by status on purpose: the area buttons are how someone finds their own
 *  neighbourhood, and a count that moved every time they changed the status
 *  chip would stop being a fact about the area. */
const COUNTS: Record<string, number> = Object.fromEntries(
  LOCALITIES.map((l) => [l, projects.filter((p) => p.locality === l).length]),
);

export default function Projects() {
  const [area, setArea] = useState('all');
  const [filter, setFilter] = useState('all');

  /* Everything below is scoped to the chosen area first, so the status counts,
     the year span and the empty state all describe what is actually on screen. */
  const inArea = useMemo(
    () => (area === 'all' ? projects : projects.filter((p) => p.locality === area)),
    [area],
  );
  const areaLive = useMemo(
    () => liveProjects.filter((p) => area === 'all' || p.locality === area),
    [area],
  );
  const areaFinished = useMemo(
    () => finishedProjects.filter((p) => area === 'all' || p.locality === area),
    [area],
  );

  const years = areaFinished
    .map((p) => p.yearCompleted)
    .filter((y): y is number => typeof y === 'number');
  const span = years.length ? `${Math.min(...years)}–${Math.max(...years)}` : '';

  const chips: Chip[] = [
    { key: 'all', label: 'All', count: inArea.length },
    { key: 'available', label: 'Open for booking', count: inArea.filter((p) => p.status === 'available').length },
    { key: 'under-construction', label: 'Under construction', count: inArea.filter((p) => p.status === 'under-construction').length },
    { key: 'completed', label: 'Handed over', count: areaFinished.length },
  ];

  const showLive = filter === 'all' || filter === 'available' || filter === 'under-construction';
  const live = filter === 'all' ? areaLive : areaLive.filter((p) => p.status === filter);
  const showRecord = filter === 'all' || filter === 'completed';
  const nothing = (!showLive || live.length === 0) && (!showRecord || areaFinished.length === 0);

  return (
    <>
      <Seo path="/projects" title="Projects — Ashima Engineering"
           description={`Every building Ashima Engineering has put up in South Kolkata since ${NAP.firstDelivery}, by area, and what is open for booking now.`} />

      <PageHero eyebrow={`The record, ${NAP.firstDelivery} to today`}
                heading="Every building we have put up"
                image="/images/projects/record-a.jpg">
        {projects.length} in all: {finishedProjects.length} handed over,{' '}
        {liveProjects.length} open now. Anything being sold shows its WBRERA
        registration number.
      </PageHero>

      {/* --- Pick an area ---------------------------------------------------- */}
      <Band tone="card" testid="section-areas">
        <Head eyebrow={`${LOCALITIES.length} areas`}
              lede="Tap an area on the map, or pick one from the list, to see only the buildings there.">
          Where we build
        </Head>
        <div className="mt-8">
          <LocalityMap counts={COUNTS} value={area} onChange={setArea} />
        </div>
      </Band>

      {/* --- The buildings themselves ---------------------------------------- */}
      <Band testid="section-projects">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
          <FilterChips chips={chips} value={filter} onChange={setFilter} label="Filter projects" />
          {area !== 'all' && (
            <button type="button" onClick={() => setArea('all')} data-testid="button-clear-area"
                    className="inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-full border border-[hsl(var(--accent))] bg-[hsl(var(--accent))]/10 px-4 t-sm text-[hsl(var(--accent))]">
              {area}
              <X size={14} aria-hidden="true" />
              <span className="sr-only">Clear the area filter</span>
            </button>
          )}
        </div>

        {showLive && live.length > 0 && (
          <>
            <p className="mt-8 u-eyebrow text-[hsl(var(--accent))]">Available now</p>
            <div className="mt-5 grid gap-4 lg:grid-cols-2 lg:gap-6">
              {live.map((p) => <ProjectCard key={p.id} project={p} />)}
            </div>
          </>
        )}

        {showRecord && areaFinished.length > 0 && (
          <>
            <div className="mt-12 flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <Head>Handed over</Head>
              <span className="u-micro text-[hsl(var(--muted-foreground))]">
                {areaFinished.length}
                {span && ` · ${span}`}
                {area !== 'all' && ` · ${area}`}
              </span>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-5">
              {areaFinished.slice(0, FIRST).map((p) => <MiniCard key={p.id} project={p} />)}
            </div>

            {areaFinished.length > FIRST && (
              <ShowMore key={area} label={`Show all ${areaFinished.length}`}>
                <div className="mt-3 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-5">
                  {areaFinished.slice(FIRST).map((p) => <MiniCard key={p.id} project={p} />)}
                </div>
              </ShowMore>
            )}
          </>
        )}

        {nothing && (
          <p className="mt-10 t-body text-[hsl(var(--muted-foreground))]"
             data-testid="text-no-results">
            {area === 'all'
              ? 'Nothing in that category yet.'
              : `Nothing in that category in ${area} yet.`}
          </p>
        )}
      </Band>
    </>
  );
}
