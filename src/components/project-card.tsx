import { Link } from 'wouter';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { ReraStrip } from '@/components/rera-strip';
import { STATUS_LABELS, isLive, type Project } from '@/lib/types';

/* The card is an <article>, not a link. It has to be: the RERA strip carries a
   live link to the WBRERA portal, and that may not sit inside another anchor —
   the parser closes the outer <a> and the card falls apart. So the project name
   is the real link and a stretched ::after makes the image clickable, with the
   strip raised above it so its own link stays reachable by mouse and keyboard.

   The card is never wrapped in <Reveal>. A live project's RERA strip may not be
   faded in — see the header comment in rera-strip.tsx. */
export function ProjectCard({
  project: p, priority = false, onDark = false,
}: { project: Project; priority?: boolean; onDark?: boolean }) {
  const live = isLive(p);
  const photo = p.images[0];

  const border = onDark ? 'border-[hsl(var(--card))]/20' : 'border-[hsl(var(--primary))]/15';
  const muted = onDark ? 'text-[hsl(var(--card))]/72' : 'text-[hsl(var(--muted-foreground))]';
  const gold = onDark ? 'text-[hsl(var(--secondary))]' : 'text-[hsl(var(--accent))]';

  return (
    <article className="project-card group relative flex flex-col"
             data-testid={`card-project-${p.id}`}>
      <div className="relative aspect-[1.18] overflow-hidden bg-[hsl(var(--muted))]">
        {photo ? (
          <img src={photo.src} alt={photo.alt}
               className="project-image h-full w-full object-cover"
               loading={priority ? 'eager' : 'lazy'}
               fetchPriority={priority ? 'high' : 'auto'} />
        ) : (
          /* A building finished in 1998 that nobody photographed is still a
             building delivered — it gets a plaster plate carrying its own
             record, not an empty grey box. */
          <div className="flex h-full w-full items-center justify-center bg-[repeating-linear-gradient(135deg,hsl(var(--primary)/.04)_0_2px,transparent_2px_9px)] px-8 text-center">
            <span className="max-w-[26ch] d-4 italic text-[hsl(var(--muted-foreground))]">
              {p.name}, {p.locality}{p.yearCompleted ? `, ${p.yearCompleted}` : ''}. No photograph on file.
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--primary))]/72 via-transparent to-transparent" />
        <span className={`absolute left-5 top-5 flex items-center gap-2 px-3 py-2 u-micro ${
                 live ? 'bg-[hsl(var(--primary))] text-[hsl(var(--secondary))]'
                      : 'bg-[hsl(var(--card))] text-[hsl(var(--primary))]'}`}
              data-testid={`status-project-${p.id}`}>
          <span className="h-1.5 w-1.5 rounded-full bg-current" />{STATUS_LABELS[p.status]}
        </span>
        <span className="absolute bottom-5 right-5 flex h-12 w-12 items-center justify-center rounded-full border border-[hsl(var(--card))]/65 text-[hsl(var(--card))] transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">
          <ArrowUpRight size={18} />
        </span>
      </div>

      <div className={`flex flex-col justify-between gap-5 border-b ${border} py-6 sm:flex-row sm:items-start`}>
        <div>
          <h3 className="d-2">
            <Link href={`/projects/${p.id}`} className="card-link"
                  data-testid={`link-project-${p.id}`}>
              {p.name}
            </Link>
          </h3>
          <div className={`mt-2 flex items-center gap-2 u-label ${gold}`}>
            <MapPin size={12} />{p.locality}
          </div>
        </div>

        {/* Legally required on every live project card — always visible, never
            behind an interaction. See the header comment in rera-strip.tsx. */}
        {live && p.reraNumber ? (
          <ReraStrip reraNumber={p.reraNumber} verified={p.reraVerified}
                     titleSize="var(--card-title-size)" className="sm:max-w-[17rem]" />
        ) : (
          <p className={`max-w-xs t-sm ${muted}`}>{p.summary}</p>
        )}
      </div>

      <p className={`mt-4 flex flex-wrap gap-x-5 gap-y-1 u-label ${muted}`}>
        {p.unitTypes.length > 0 && <span>{p.unitTypes.join(' and ')}</span>}
        {p.carpetAreaMin && p.carpetAreaMax && (
          <span>{p.carpetAreaMin}–{p.carpetAreaMax} sq ft carpet</span>
        )}
        {p.unitsAvailable != null && <span>{p.unitsAvailable} of {p.totalUnits} available</span>}
        {p.possessionDate && <span>Possession {p.possessionDate}</span>}
        {p.yearCompleted && !live && <span>Handed over {p.yearCompleted}</span>}
      </p>
    </article>
  );
}
