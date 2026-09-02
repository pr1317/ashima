/** Every index, count, filter and year grouping on the site derives from the
 *  generated collections — there is no hardcoded list anywhere, which is what
 *  keeps adding a project down to one markdown file. */
import { projects } from '@/data/projects';
import { institutional } from '@/data/institutional';
import { isLive, type Project } from '@/lib/types';

export { projects, institutional };

/** Open for booking first, then under construction. */
export const liveProjects: Project[] = projects
  .filter(isLive)
  .sort((a, b) => Number(b.status === 'available') - Number(a.status === 'available'));

export const finishedProjects: Project[] = projects
  .filter((p) => p.status === 'completed' || p.status === 'sold-out')
  .sort((a, b) => (b.yearCompleted ?? 0) - (a.yearCompleted ?? 0));

/** The homepage strip is the photographic one, so it only carries buildings
 *  we have a photograph of. The full record, photographed or not, is on
 *  /projects. */
export const photographedDeliveries: Project[] = finishedProjects
  .filter((p) => p.images.length > 0)
  .slice(0, 6);

export const projectsByYear: { year: number; projects: Project[] }[] = (() => {
  const map = new Map<number, Project[]>();
  for (const p of finishedProjects) {
    const y = p.yearCompleted ?? 0;
    if (!map.has(y)) map.set(y, []);
    map.get(y)!.push(p);
  }
  return [...map.entries()]
    .sort((a, b) => b[0] - a[0])
    .map(([year, list]) => ({ year, projects: list }));
})();

export const recordLocalities: string[] =
  [...new Set(finishedProjects.map((p) => p.locality))].sort();

export const recordTotals = {
  buildings: finishedProjects.length,
  flats: finishedProjects.reduce((n, p) => n + (p.totalUnits ?? 0), 0),
  localities: recordLocalities.length,
  firstYear: projectsByYear.at(-1)?.year ?? 0,
  lastYear: projectsByYear.at(0)?.year ?? 0,
};

export const getProject = (id: string): Project | undefined =>
  projects.find((p) => p.id === id);

/** Generated stand-in entries carry no copy of their own, so they get a row on
 *  the record rather than a page of their own. */
export const hasOwnPage = (p: Project) =>
  p.images.length > 0 || !p.id.startsWith('sample-');
