import { useEffect, useRef, useState } from 'react';
import { institutional } from '@/data/institutional';
import { finishedProjects, recordTotals } from '@/lib/content';
import { NAP } from '@/lib/site';

/** The three things the business is judged on — buildings delivered, joint
 *  ventures settled, contracts executed for public sector undertakings — given
 *  the weight they deserve, immediately under the hero.
 *
 *  They used to be scattered through the page as prose. A buyer deciding
 *  whether to trust a builder wants the record in one place and near the top;
 *  a tender evaluator wants the third column without reading the other two.
 *
 *  The figures count up when the band comes into view. It is the one piece of
 *  motion here that carries meaning rather than decoration — it puts the eye on
 *  the numbers, which is the whole point of the band. Anyone who has asked for
 *  reduced motion gets the final values immediately, and those values are in
 *  the DOM from first render either way, so they never depend on JavaScript. */

/** Confirmed by the business. Not derivable from the project record, which does
 *  not yet mark which projects were joint ventures. */
const JOINT_VENTURES = 30;

function Figure({ to, pad = 0, label }: { to: number; pad?: number; label: string }) {
  const [n, setN] = useState(to);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const io = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const step = (now: number) => {
        const k = Math.min(1, (now - t0) / 1100);
        setN(Math.round(to * (1 - Math.pow(1 - k, 3))));
        if (k < 1) requestAnimationFrame(step);
      };
      setN(0);
      requestAnimationFrame(step);
    }, { threshold: 0.45 });
    io.observe(el);
    return () => io.disconnect();
  }, [to]);

  return (
    <div ref={ref}
         className="border-r border-[hsl(var(--border))] px-1 py-1 text-center last:border-r-0"
         data-testid={`figure-${label.toLowerCase().split(' ')[0]}`}>
      <div className="d-1 tabular-nums leading-none text-[hsl(var(--primary))]">
        {String(n).padStart(pad, '0')}
      </div>
      <p className="mx-auto mt-3 max-w-[12ch] u-micro text-[hsl(var(--muted-foreground))]">
        {label}
      </p>
    </div>
  );
}

export function CredentialBand() {
  const years = new Date().getFullYear() - Number(NAP.founded);
  return (
    <section className="border-y border-[hsl(var(--border))] bg-[hsl(var(--card))] py-10 lg:py-16"
             data-testid="section-credentials">
      <div className="mx-auto max-w-[1380px] px-5 lg:px-12">
        <div className="grid grid-cols-3">
          <Figure to={finishedProjects.length} label="Buildings delivered" />
          <Figure to={JOINT_VENTURES} label="Joint ventures completed" />
          <Figure to={institutional.length} pad={2} label="PSU & institutional contracts" />
        </div>
        <p className="mt-7 text-center t-sm text-[hsl(var(--muted-foreground))]">
          {years} years of it, from one office in {NAP.locality} —{' '}
          {recordTotals.flats.toLocaleString('en-IN')} flats across{' '}
          {recordTotals.localities} localities.
        </p>
      </div>
    </section>
  );
}
