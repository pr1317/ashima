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
      {/* ORDER MATTERS. The photograph goes down first and everything that
          darkens it goes on top. With the washes above the image they tint the
          section's own background and the photograph paints straight over
          them, which is what made cream type unreadable on a pale building. */}
      <div ref={imageRef}
           className={`absolute inset-0 bg-cover bg-center mix-blend-luminosity will-change-transform ${
             full ? 'opacity-[.62]' : 'opacity-80'}`}
           style={{ backgroundImage: `url('${image}')` }} aria-hidden="true" />

      <div className="absolute inset-0 bg-[linear-gradient(90deg,hsl(154_28%_10%/.86)_0%,hsl(154_28%_12%/.62)_43%,hsl(154_28%_12%/.12)_100%),linear-gradient(0deg,hsl(154_28%_10%/.84),transparent_60%)]" />

      {/* A flat wash under the type. The horizontal gradient is built for a
          wide viewport — on a phone the whole band is its dark end, so the
          photograph shows through at full brightness. Hence a heavier wash on
          small screens, lighter on large. */}
      <div className={`absolute inset-0 ${
        full ? 'bg-[hsl(154_28%_10%/.42)] lg:bg-[hsl(154_28%_10%/.2)]'
             : 'bg-[hsl(154_28%_10%/.5)] lg:bg-[hsl(154_28%_10%/.34)]'}`} />

      {/* Keeps the nav legible where the photograph runs light. */}
      <div className="absolute inset-x-0 top-0 h-48 bg-[linear-gradient(180deg,hsl(154_28%_8%/.8),transparent)]" />

      <div className={`absolute h-72 w-72 rounded-full border border-[hsl(var(--secondary))]/25 ${
        full ? '-right-20 top-32 lg:right-24 lg:top-40' : '-right-24 top-20 lg:right-16'}`} />
      <div className={`absolute h-52 w-52 rounded-full border border-[hsl(var(--secondary))]/15 ${
        full ? '-right-10 top-44 lg:right-36' : '-right-12 top-32 lg:right-28'}`} />

      <div className={`relative z-10 mx-auto w-full max-w-[1380px] px-6 lg:px-12 ${
        full ? 'pb-12 pt-48 lg:pb-20' : 'pb-14 pt-40 lg:pb-16'}`}>
        <div className="max-w-3xl">
          <Reveal className="reveal-delay-1">
            <div className="hero-eyebrow hero-gold mb-7 inline-flex items-center gap-3 u-eyebrow">
              <span className="h-px w-10 bg-[hsl(var(--secondary))]" />
              {eyebrow}
            </div>
          </Reveal>
          <Reveal className="reveal-delay-2">
            <h1 className={`font-display ${
              full ? 'd-hero'
                   : 'text-[length:var(--page-title-size)]'}`}>
              {heading}
            </h1>
          </Reveal>
          {children && <Reveal className="reveal-delay-3">{children}</Reveal>}
        </div>
      </div>

      {marker && (
        <div className="absolute bottom-7 right-6 hidden items-center gap-3 u-micro text-[hsl(var(--card))]/58 lg:right-12 lg:flex">
          <span className="h-px w-14 bg-[hsl(var(--card))]/35" /> {marker}
        </div>
      )}
    </section>
  );
}
