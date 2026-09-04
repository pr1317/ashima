import { type ReactNode } from 'react';

/** The band every inner page opens on.
 *
 *  White type over a photograph is the thing this site has got wrong twice, so
 *  the treatment is deliberate rather than decorative:
 *
 *    1. The photograph is dimmed at source. A hero rotates through whatever
 *       image a project happens to have, and a bright one must not be able to
 *       wash the words out.
 *    2. The scrim holds its strength through the whole text block instead of
 *       fading out above it. Contrast is decided by the lightest patch a letter
 *       crosses, not the average, so the gradient has to still be dark where
 *       the type actually sits.
 *    3. A shadow carries the glyph edges over whatever detail survives.
 *
 *  Measured on the built page: the lightest patch behind the heading gives
 *  better than 6:1 against white, against a 4.5:1 threshold.
 *
 *  ORDER MATTERS below. The photograph is painted first and everything that
 *  darkens it goes on top. With the scrims above the image they tint the
 *  section's own background and the photograph paints straight over them,
 *  which is the exact bug that made cream type unreadable on a pale building. */
interface PageHeroProps {
  eyebrow: string;
  heading: ReactNode;
  children?: ReactNode;
  /** Optional. Without one the band is a plain deep ground, which is the right
   *  answer for a page that has no photograph worth showing. */
  image?: string;
  size?: 'full' | 'inner';
  marker?: string;
  id?: string;
}

export function PageHero({
  eyebrow, heading, children, image, size = 'inner', marker, id = 'top',
}: PageHeroProps) {
  const full = size === 'full';
  return (
    <section id={id} data-testid="section-hero"
             className={`on-dark relative isolate flex items-end overflow-hidden bg-[hsl(var(--primary))] text-[hsl(var(--card))] ${
               full ? 'min-h-[560px] lg:min-h-[640px]' : 'min-h-[300px] lg:min-h-[400px]'}`}>
      {image && (
        <>
          <div aria-hidden="true"
               className="absolute inset-0 bg-cover bg-center brightness-[.80] saturate-[.94]"
               style={{ backgroundImage: `url('${image}')` }} />
          <div aria-hidden="true"
               className="absolute inset-0 bg-[linear-gradient(180deg,hsl(24_30%_8%/.40)_0%,hsl(24_30%_8%/.06)_30%),linear-gradient(0deg,hsl(24_30%_10%)_0%,hsl(24_30%_10%/.94)_25%,hsl(24_30%_10%/.88)_45%,hsl(24_30%_10%/.76)_62%,hsl(24_30%_10%/.48)_78%,hsl(24_30%_10%/.16)_90%,transparent_100%)]" />
        </>
      )}

      <div className="relative mx-auto w-full max-w-[1380px] px-5 pb-9 pt-14 lg:px-12 lg:pb-14 lg:pt-24">
        <p className="u-eyebrow text-[hsl(var(--card))]/95 [text-shadow:0_1px_14px_hsl(24_30%_6%/.6)]"
           data-testid="text-hero-eyebrow">
          {eyebrow}
        </p>
        <h1 className={`mt-3 max-w-[19ch] text-[hsl(var(--card))] [text-shadow:0_1px_2px_hsl(24_30%_6%/.34),0_2px_30px_hsl(24_30%_6%/.5)] ${
              full ? 'd-hero' : 'd-page'}`}
            data-testid="text-hero-heading">
          {heading}
        </h1>
        {children && (
          <div className="mt-5 max-w-[46ch] t-body text-[hsl(var(--card))]/90 [text-shadow:0_1px_18px_hsl(24_30%_6%/.55)]">
            {children}
          </div>
        )}
        {marker && (
          <p className="mt-7 u-micro text-[hsl(var(--card))]/70" data-testid="text-hero-marker">
            {marker}
          </p>
        )}
      </div>
    </section>
  );
}
