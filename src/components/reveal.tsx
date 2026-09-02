/** Scroll motion, authored to FAIL OPEN. The finished state is the default,
 *  and the layout effect only *closes* elements that are still below the fold
 *  so they can open as you reach them. If the effect never runs, if
 *  IntersectionObserver is missing, or if anything throws, the content is
 *  simply already there.
 *
 *  Nothing carrying a WBRERA strip may be wrapped in this — see the header
 *  comment in rera-strip.tsx. */
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** 0, 1, 2 or 3 — a tenth of a second each. */
  delay?: 0 | 1 | 2 | 3;
  as?: 'div' | 'section' | 'article' | 'li';
}

export function Reveal({ children, className = '', delay = 0, as: Tag = 'div' }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [closed, setClosed] = useState(false);
  const [open, setOpen] = useState(false);

  // Runs before paint, so an element that starts below the fold is closed
  // without a flash of the finished state.
  useLayoutEffect(() => {
    try {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      if (!('IntersectionObserver' in window)) return;
      const node = ref.current;
      if (!node) return;
      if (node.getBoundingClientRect().top > window.innerHeight * 0.9) setClosed(true);
    } catch {
      /* fail open */
    }
  }, []);

  useEffect(() => {
    if (!closed) return;
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setOpen(true); }),
      { rootMargin: '0px 0px -12% 0px' },
    );
    io.observe(node);
    // Sweeps up any straggler the observer never fires for.
    const timer = window.setTimeout(() => setOpen(true), 6000);
    return () => { io.disconnect(); window.clearTimeout(timer); };
  }, [closed]);

  const state = !closed || open ? 'reveal is-visible' : 'reveal';
  const delayClass = delay ? ` reveal-delay-${delay}` : '';

  return (
    <Tag ref={ref as never} className={`${state}${delayClass} ${className}`.trim()}>
      {children}
    </Tag>
  );
}
