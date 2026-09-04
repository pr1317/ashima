import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { recordTotals } from '@/lib/content';
import { NAP } from '@/lib/site';

/** The homepage opening.
 *
 *  Three photographs crossfade behind the words. The scrim is built the same
 *  way as the inner-page hero and for the same reason: white type over a
 *  photograph is the thing this site has got wrong twice, so the photograph is
 *  dimmed at source, the gradient stays strong through the whole text block
 *  rather than fading out above it, and a shadow carries the glyph edges over
 *  whatever detail survives. Measured on the built page, the lightest patch
 *  behind the heading gives better than 6:1 against white.
 *
 *  The crossfade is CSS, and it stops entirely for anyone who has asked for
 *  reduced motion — they get the first photograph, held still. */
const SHOTS = [
  { src: '/images/projects/hero.jpg', alt: '' },
  { src: '/images/projects/prarthana-a.jpg', alt: '' },
  { src: '/images/projects/sraboni-b.jpg', alt: '' },
];

export function HeroHome() {
  const [still, setStill] = useState(false);
  useEffect(() => {
    setStill(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  return (
    <>
      <section id="top" data-testid="section-hero"
               className="on-dark relative isolate flex min-h-[560px] items-end overflow-hidden bg-[hsl(var(--primary))] text-[hsl(var(--card))] lg:min-h-[76vh]">
        <div className="absolute inset-0" aria-hidden="true">
          {(still ? SHOTS.slice(0, 1) : SHOTS).map((s, i) => (
            <img key={s.src} src={s.src} alt={s.alt} aria-hidden="true"
                 className={`absolute inset-0 size-full object-cover brightness-[.80] saturate-[.94] ${
                   still ? '' : 'hero-fade'}`}
                 style={still ? undefined : { animationDelay: `${i * 7}s` }} />
          ))}
        </div>
        <div aria-hidden="true"
             className="absolute inset-0 bg-[linear-gradient(180deg,hsl(24_30%_8%/.40)_0%,hsl(24_30%_8%/.06)_30%),linear-gradient(0deg,hsl(24_30%_10%)_0%,hsl(24_30%_10%/.94)_25%,hsl(24_30%_10%/.88)_45%,hsl(24_30%_10%/.76)_62%,hsl(24_30%_10%/.48)_78%,hsl(24_30%_10%/.16)_90%,transparent_100%)]" />

        <div className="relative mx-auto w-full max-w-[1380px] px-5 pb-10 pt-20 lg:px-12 lg:pb-16">
          <p className="u-eyebrow text-[hsl(var(--card))]/95 [text-shadow:0_1px_14px_hsl(24_30%_6%/.6)]">
            South Kolkata · Since {NAP.founded}
          </p>
          <h1 className="mt-4 max-w-[15ch] d-hero text-[hsl(var(--card))] [text-shadow:0_1px_2px_hsl(24_30%_6%/.34),0_2px_30px_hsl(24_30%_6%/.5)]"
              data-testid="text-hero-heading">
            Sixty-five buildings. The families are still in them.
          </h1>
          <p className="mt-5 max-w-[34ch] t-body text-[hsl(var(--card))]/90 [text-shadow:0_1px_18px_hsl(24_30%_6%/.55)]">
            Four-storey buildings in Santoshpur, Garfa and Mukundapur. No podium,
            no clubhouse — a lift that reaches every floor and a handover date we keep.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/projects"
                  className="inline-flex min-h-13 items-center justify-center rounded-[var(--radius)] bg-[hsl(var(--accent))] px-7 u-label text-[hsl(var(--accent-foreground))]"
                  data-testid="link-hero-available">
              See what is available
            </Link>
            <Link href="/about"
                  className="inline-flex min-h-13 items-center justify-center rounded-[var(--radius)] border border-[hsl(var(--card))]/55 px-7 u-label text-[hsl(var(--card))]"
                  data-testid="link-hero-record">
              The record since {NAP.firstDelivery}
            </Link>
          </div>
        </div>
      </section>

      {/* The one-line summary of the record, on the deep ground so it reads as
          part of the opening rather than as the start of the page proper. It is
          centred and given room because on a phone it is the first hard number
          a visitor meets, and it has to land at a glance rather than reward
          reading. Both figures come from the project record — they used to be
          typed in here, and the flat count had drifted away from the same
          figure printed a screen further down. */}
      <p className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 bg-[hsl(var(--primary))] px-5 py-5 text-center hero-meta text-[hsl(var(--card))]/70 min-[380px]:gap-x-8 lg:gap-x-14 lg:px-12 lg:py-6"
         data-testid="text-hero-meta">
        <span><b className="font-medium text-[hsl(var(--card))]">{recordTotals.flats.toLocaleString('en-IN')}</b> flats</span>
        <span><b className="font-medium text-[hsl(var(--card))]">{recordTotals.localities}</b> localities</span>
        <span>Since <b className="font-medium text-[hsl(var(--card))]">{NAP.firstDelivery}</b></span>
      </p>
    </>
  );
}
