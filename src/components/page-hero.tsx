import { useEffect, useRef, type ReactNode } from 'react';
import { Reveal } from '@/components/reveal';

/** The dark band every page opens on: a photograph under a shutter-green wash,
 *  drifting slightly as you scroll, with the display heading sitting on it.
 *  The site header is transparent and sits over this, which is why every route
 *  has one. */
interface PageHeroProps {
  eyebrow: string;
  heading: ReactNode;
  children?: ReactNode;
  image: string;
  /** Decorative — the photograph is a wash behind the type, never information. */
  imageAlt?: string;
  /** The full-height opening on the homepage, versus the shorter inner-page band. */
  size?: 'full' | 'inner';
  /** Shown small in the bottom-right corner on wide screens. */
  marker?: string;
  id?: string;
}

export function PageHero({
  eyebrow, heading, children, image, size = 'inner', marker, id = 'top',
}: PageHeroProps) {
  const imageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      if (imageRef.current) {
        imageRef.current.style.transform =
          `translate3d(0, ${Math.min(window.scrollY * 0.12, 72)}px, 0) scale(1.04)`;
      }
    };
    const onScroll = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const full = size === 'full';
  return (
    <section id={id}
             className={`on-dark relative flex items-end overflow-hidden bg-[hsl(var(--primary))] text-[hsl(var(--card))] ${
               full ? 'min-h-[720px] lg:min-h-[800px]' : 'min-h-[440px] lg:min-h-[520px]'}`}
             data-testid="section-hero">
      <div className="absolute inset-0 bg-[linear-gradient(90deg,hsl(154_28%_10%/.86)_0%,hsl(154_28%_12%/.62)_43%,hsl(154_28%_12%/.12)_100%),linear-gradient(0deg,hsl(154_28%_10%/.84),transparent_60%)]" />
      {/* Keeps the nav legible where the photograph runs light. */}
      <div className="absolute inset-x-0 top-0 h-48 bg-[linear-gradient(180deg,hsl(154_28%_8%/.85),transparent)]" />
      {/* An inner-page band is short, so its type sits high up where the
          bottom-up gradient has not reached. This evens the ground out. */}
      {!full && <div className="absolute inset-0 bg-[hsl(154_28%_10%/.55)]" />}
      <div ref={imageRef}
           className="absolute inset-0 bg-cover bg-center opacity-80 mix-blend-luminosity will-change-transform"
           style={{ backgroundImage: `url('${image}')` }} aria-hidden="true" />

      <div className={`absolute h-72 w-72 rounded-full border border-[hsl(var(--secondary))]/25 ${
        full ? '-right-20 top-32 lg:right-24 lg:top-40' : '-right-24 top-20 lg:right-16'}`} />
      <div className={`absolute h-52 w-52 rounded-full border border-[hsl(var(--secondary))]/15 ${
        full ? '-right-10 top-44 lg:right-36' : '-right-12 top-32 lg:right-28'}`} />

      <div className={`relative z-10 mx-auto w-full max-w-[1380px] px-6 lg:px-12 ${
        full ? 'pb-12 pt-48 lg:pb-20' : 'pb-14 pt-40 lg:pb-16'}`}>
        <div className="max-w-3xl">
          <Reveal className="reveal-delay-1">
            <div className="hero-eyebrow hero-gold mb-7 inline-flex items-center gap-3 font-ui text-[10.5px] uppercase tracking-[0.22em]">
              <span className="h-px w-10 bg-[hsl(var(--secondary))]" />
              {eyebrow}
            </div>
          </Reveal>
          <Reveal className="reveal-delay-2">
            <h1 className={`font-display tracking-[-.045em] ${
              full ? 'text-[clamp(4rem,9vw,8.5rem)] leading-[.83]'
                   : 'text-[length:var(--page-title-size)] leading-[.86]'}`}>
              {heading}
            </h1>
          </Reveal>
          {children && <Reveal className="reveal-delay-3">{children}</Reveal>}
        </div>
      </div>

      {marker && (
        <div className="absolute bottom-7 right-6 hidden items-center gap-3 font-ui text-[9px] uppercase tracking-[0.18em] text-[hsl(var(--card))]/55 lg:right-12 lg:flex">
          <span className="h-px w-14 bg-[hsl(var(--card))]/35" /> {marker}
        </div>
      )}
    </section>
  );
}
