import { useState, type ReactNode } from 'react';
import { Link } from 'wouter';
import { Check } from 'lucide-react';
import type { Project } from '@/lib/types';

/** The repeated pieces the inner pages are built from. They live together so a
 *  fact grid on the project page and a fact grid on the about page cannot drift
 *  apart, which is what happens when each page assembles its own. */

/* -- filter chips ------------------------------------------------------- */
export interface Chip { key: string; label: string; count?: number }

export function FilterChips({ chips, value, onChange, label }: {
  chips: Chip[]; value: string; onChange: (k: string) => void; label: string;
}) {
  return (
    <div role="group" aria-label={label}
         className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1.5 lg:mx-0 lg:flex-wrap lg:px-0">
      {chips.map((c) => {
        const on = c.key === value;
        return (
          <button key={c.key} type="button" aria-pressed={on}
                  onClick={() => onChange(c.key)}
                  data-testid={`chip-${c.key}`}
                  className={`inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-full border px-4 t-sm transition-colors ${
                    on
                      ? 'border-[hsl(var(--primary))] bg-[hsl(var(--primary))] text-[hsl(var(--card))]'
                      : 'border-[hsl(var(--border))] bg-[hsl(var(--card))] text-[hsl(var(--primary))]'}`}>
            {c.label}
            {c.count !== undefined && (
              <span className={on ? 'text-[hsl(var(--card))]/60' : 'text-[hsl(var(--muted-foreground))]'}>
                {c.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

/* -- the small square card used for the handed-over record -------------- */
export function MiniCard({ project }: { project: Project }) {
  const shot = project.images[0];
  return (
    <Link href={`/projects/${project.id}`} data-testid={`card-mini-${project.id}`}
          className="block overflow-hidden rounded-[var(--radius)] border border-[hsl(var(--border))] bg-[hsl(var(--card))]">
      <div className="aspect-square overflow-hidden bg-[hsl(var(--muted))]">
        {shot && <img src={shot.src} alt="" loading="lazy" className="size-full object-cover" />}
      </div>
      <div className="p-3.5">
        <h3 className="d-4 text-[hsl(var(--primary))]">{project.name}</h3>
        <p className="mt-1 u-micro text-[hsl(var(--muted-foreground))]">
          {project.locality}
          {project.yearCompleted ? ` · ${project.yearCompleted}` : ''}
          {project.totalUnits ? ` · ${project.totalUnits} flats` : ''}
        </p>
      </div>
    </Link>
  );
}

/* -- key/value grid ----------------------------------------------------- */
export function FactGrid({ facts }: { facts: [string, ReactNode][] }) {
  return (
    <dl className="grid grid-cols-2 gap-px border border-[hsl(var(--border))] bg-[hsl(var(--border))] lg:grid-cols-3"
        data-testid="fact-grid">
      {facts.map(([k, v]) => (
        <div key={k} className="bg-[hsl(var(--card))] px-4 py-3.5">
          <dt className="u-micro text-[hsl(var(--muted-foreground))]">{k}</dt>
          <dd className="mt-1 t-body text-[hsl(var(--primary))]">{v}</dd>
        </div>
      ))}
    </dl>
  );
}

/* -- definition rows ---------------------------------------------------- */
export function DefList({ rows, onDark = false }: {
  rows: [string, ReactNode][]; onDark?: boolean;
}) {
  const line = onDark ? 'border-[hsl(var(--card))]/20' : 'border-[hsl(var(--border))]';
  return (
    <dl className={`border-t ${line}`} data-testid="def-list">
      {rows.map(([k, v]) => (
        <div key={k} className={`border-b py-4 ${line}`}>
          <dt className={`u-micro ${onDark ? 'text-[hsl(var(--secondary))]' : 'text-[hsl(var(--accent))]'}`}>{k}</dt>
          <dd className={`mt-1.5 t-body t-wide ${onDark ? 'text-[hsl(var(--card))]/85' : 'text-[hsl(var(--primary))]'}`}>{v}</dd>
        </div>
      ))}
    </dl>
  );
}

/* -- ticked list -------------------------------------------------------- */
export function TickList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="grid gap-2.5" data-testid="tick-list">
      {items.map((it, i) => (
        <li key={i} className="grid grid-cols-[1rem_1fr] gap-3 t-body">
          <Check size={16} aria-hidden="true" className="mt-1.5 text-[hsl(var(--accent))]" />
          <span className="t-wide">{it}</span>
        </li>
      ))}
    </ul>
  );
}

/* -- numbered process --------------------------------------------------- */
export function Steps({ steps, onDark = false }: {
  steps: { title: string; body: string }[]; onDark?: boolean;
}) {
  const line = onDark ? 'border-[hsl(var(--card))]/20' : 'border-[hsl(var(--border))]';
  return (
    <ol className={`border-t ${line}`} data-testid="steps">
      {steps.map((s, i) => (
        <li key={s.title}
            className={`grid grid-cols-[2.25rem_1fr] gap-x-4 border-b py-5 lg:grid-cols-[4rem_16rem_1fr] lg:gap-x-8 ${line}`}>
          <span className={`u-micro pt-1 tabular-nums ${onDark ? 'text-[hsl(var(--secondary))]' : 'text-[hsl(var(--accent))]'}`}>
            {String(i + 1).padStart(2, '0')}
          </span>
          {/* Both of these sit in column 2 on a phone. Without saying so they
              wrap onto a second row and land back under the number, which
              renders the body one word per line. */}
          <h3 className={`col-start-2 d-4 ${onDark ? 'text-[hsl(var(--card))]' : 'text-[hsl(var(--primary))]'}`}>
            {s.title}
          </h3>
          <p className={`col-start-2 mt-1.5 t-sm t-wide lg:col-start-3 lg:mt-1 ${
                onDark ? 'text-[hsl(var(--card))]/70' : 'text-[hsl(var(--muted-foreground))]'}`}>
            {s.body}
          </p>
        </li>
      ))}
    </ol>
  );
}

/* -- bordered panel ----------------------------------------------------- */
export function Panel({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-[var(--radius)] border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-5 lg:p-6 ${className}`}>
      {children}
    </div>
  );
}

/** A section heading with its eyebrow, used the same way on every inner page. */
export function Head({ eyebrow, children, lede, onDark = false }: {
  eyebrow?: string; children: ReactNode; lede?: ReactNode; onDark?: boolean;
}) {
  return (
    <>
      {eyebrow && (
        <p className={`u-eyebrow ${onDark ? 'text-[hsl(var(--secondary))]' : 'text-[hsl(var(--accent))]'}`}>
          {eyebrow}
        </p>
      )}
      <h2 className={`mt-3 d-2 ${onDark ? 'text-[hsl(var(--card))]' : 'text-[hsl(var(--primary))]'}`}>
        {children}
      </h2>
      {lede && (
        <p className={`mt-4 t-body ${onDark ? 'text-[hsl(var(--card))]/70' : 'text-[hsl(var(--muted-foreground))]'}`}>
          {lede}
        </p>
      )}
    </>
  );
}

/** Shared section shell: the inner pages all use the same rhythm and gutter. */
export function Band({ id, tone = 'ground', children, testid }: {
  id?: string; tone?: 'ground' | 'card' | 'deep'; children: ReactNode; testid?: string;
}) {
  const bg = tone === 'card'
    ? 'border-y border-[hsl(var(--border))] bg-[hsl(var(--card))]'
    : tone === 'deep'
      ? 'on-dark bg-[hsl(var(--primary))] text-[hsl(var(--card))]'
      : '';
  return (
    <section id={id} data-testid={testid} className={`py-12 lg:py-20 ${bg}`}>
      <div className="mx-auto max-w-[1380px] px-5 lg:px-12">{children}</div>
    </section>
  );
}

/** Small controlled disclosure used where the mockup shows a "show all" row. */
export function ShowMore({ children, label }: { children: ReactNode; label: string }) {
  const [open, setOpen] = useState(false);
  if (open) return <>{children}</>;
  return (
    <button type="button" onClick={() => setOpen(true)} data-testid="button-show-more"
            className="mt-5 flex min-h-13 w-full items-center justify-center rounded-[var(--radius)] border border-[hsl(var(--border))] bg-[hsl(var(--card))] u-label text-[hsl(var(--primary))]">
      {label}
    </button>
  );
}
