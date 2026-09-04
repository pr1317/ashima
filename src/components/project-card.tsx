import { Link } from 'wouter';
import { ReraStrip } from '@/components/rera-strip';
import { STATUS_LABELS, isLive, type Project } from '@/lib/types';

/* The card is an <article>, not a link. It has to be: the RERA strip carries a
   live link to the WBRERA portal, and that may not sit inside another anchor —
   the parser closes the outer <a> and the card falls apart. So the project name
   is the real link and a stretched ::after makes the whole card clickable, with
   the strip raised above it so its own link stays reachable by mouse and
   keyboard.

   The card is never wrapped in <Reveal>. A live project's RERA strip may not be
   faded in — see the header comment in rera-strip.tsx. */
export function ProjectCard({
  project: p, priority = false, onDark = false,
}: { project: Project; priority?: boolean; onDark?: boolean }) {
  const live = isLive(p);
  const photo = p.images[0];

  const surface = onDark
    ? 'border-[hsl(var(--card))]/20 bg-[hsl(var(--card))]/[.04]'
    : 'border-[hsl(var(--border))] bg-[hsl(var(--card))]';
  const title = onDark ? 'text-[hsl(var(--card))]' : 'text-[hsl(var(--primary))]';
  const muted = onDark ? 'text-[hsl(var(--card))]/70' : 'text-[hsl(var(--muted-foreground))]';

  /* One grey line, the way a listing reads: where, what, how big. */
  const spec = [
    p.locality,
    p.unitTypes.length ? p.unitTypes.join(' & ') : null,
    p.carpetAreaMin && p.carpetAreaMax ? `${p.carpetAreaMin}–${p.carpetAreaMax} sq ft` : null,
  ].filter(Boolean).join(' · ');

  const second = p.possessionDate
    ? `Possession ${p.possessionDate}`
    : p.yearCompleted ? `Handed over ${p.yearCompleted}` : null;

  return (
    <article data-testid={`card-project-${p.id}`}
             className={`project-card group relative flex flex-col overflow-hidden rounded-[var(--radius)] border ${surface}`}>
      <div className="aspect-[4/3] overflow-hidden bg-[hsl(var(--muted))]">
        {photo && (
          <img src={photo.src} alt={photo.alt}
               loading={priority ? 'eager' : 'lazy'}
               fetchPriority={priority ? 'high' : undefined}
               className="project-image size-full object-cover" />
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2.5 p-4 lg:p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className={`d-3 ${title}`}>
            <Link href={`/projects/${p.id}`}
                  className="after:absolute after:inset-0 after:content-['']"
                  data-testid={`link-project-${p.id}`}>
              {p.name}
            </Link>
          </h3>
          <span data-testid={`tag-status-${p.id}`}
                className={`shrink-0 whitespace-nowrap rounded-full px-2.5 py-1 u-micro ${
                  p.status === 'available'
                    ? 'bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))]'
                    : onDark
                      ? 'bg-[hsl(var(--card))]/15 text-[hsl(var(--card))]'
                      : 'bg-[hsl(var(--muted))] text-[hsl(var(--primary))]'}`}>
            {p.status === 'available' && p.unitsAvailable
              ? `${p.unitsAvailable} unsold`
              : STATUS_LABELS[p.status]}
          </span>
        </div>

        <p className={`t-sm t-wide ${muted}`}>
          {spec}
          {second && <><br />{second}</>}
        </p>

        {live && p.reraNumber && (
          /* Raised above the stretched link so the portal address stays
             clickable, and pushed to the foot of the card so every card in a
             row lines its strip up with the others. */
          <div className="relative z-10 mt-auto pt-1">
            <ReraStrip reraNumber={p.reraNumber} verified={p.reraVerified}
                       titleSize="var(--card-title-size)" />
          </div>
        )}
      </div>
    </article>
  );
}
