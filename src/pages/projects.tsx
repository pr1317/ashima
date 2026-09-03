import { useMemo, useState } from 'react';
import { Seo } from '@/components/seo';
import { PageHero } from '@/components/page-hero';
import { ProjectCard } from '@/components/project-card';
import { Band, FilterChips, Head, MiniCard, ShowMore, type Chip } from '@/components/blocks';
import { projects } from '@/data/projects';
import { finishedProjects, liveProjects } from '@/lib/content';
import { NAP } from '@/lib/site';

/** How many of the handed-over record to show before asking. Four fills two
 *  rows on a phone and one on a desktop, which is enough to show what the
 *  record looks like without making the page endless. */
const FIRST = 8;

export default function Projects() {
  const [filter, setFilter] = useState('all');

  const years = finishedProjects
    .map((p) => p.yearCompleted)
    .filter((y): y is number => typeof y === 'number');
  const span = years.length ? `${Math.min(...years)}–${Math.max(...years)}` : '';

  const chips: Chip[] = [
    { key: 'all', label: 'All', count: projects.length },
    { key: 'available', label: 'Open for booking', count: projects.filter((p) => p.status === 'available').length },
    { key: 'under-construction', label: 'Under construction', count: projects.filter((p) => p.status === 'under-construction').length },
    { key: 'completed', label: 'Handed over', count: finishedProjects.length },
  ];

  const showLive = filter === 'all' || filter === 'available' || filter === 'under-construction';
  const live = useMemo(
    () => (filter === 'all' ? liveProjects : liveProjects.filter((p) => p.status === filter)),
    [filter],
  );
  const showRecord = filter === 'all' || filter === 'completed';

  return (
    <>
      <Seo path="/projects" title="Projects — Ashima Engineering"
           description={`Every building Ashima Engineering has put up in South Kolkata since ${NAP.firstDelivery}, and what is open for booking now.`} />

      <PageHero eyebrow={`The record, ${NAP.firstDelivery} to today`}
                heading="Every building we have put up"
                image="/images/projects/record-a.jpg">
        {projects.length} in all: {finishedProjects.length} handed over,{' '}
        {liveProjects.length} open now. Anything being sold shows its WBRERA
        registration number.
      </PageHero>

      <Band testid="section-projects">
        <FilterChips chips={chips} value={filter} onChange={setFilter} label="Filter projects" />

        {showLive && live.length > 0 && (
          <>
            <p className="mt-8 u-eyebrow text-[hsl(var(--accent))]">Available now</p>
            <div className="mt-5 grid gap-4 lg:grid-cols-2 lg:gap-6">
              {live.map((p) => <ProjectCard key={p.id} project={p} />)}
            </div>
          </>
        )}

        {showRecord && (
          <>
            <div className="mt-12 flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <Head>Handed over</Head>
              <span className="u-micro text-[hsl(var(--muted-foreground))]">
                {finishedProjects.length} · {span}
              </span>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-5">
              {finishedProjects.slice(0, FIRST).map((p) => <MiniCard key={p.id} project={p} />)}
            </div>

            {finishedProjects.length > FIRST && (
              <ShowMore label={`Show all ${finishedProjects.length}`}>
                <div className="mt-3 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-5">
                  {finishedProjects.slice(FIRST).map((p) => <MiniCard key={p.id} project={p} />)}
                </div>
              </ShowMore>
            )}
          </>
        )}

        {!showLive && !showRecord && (
          <p className="mt-10 t-body text-[hsl(var(--muted-foreground))]">
            Nothing in that category yet.
          </p>
        )}
      </Band>
    </>
  );
}
