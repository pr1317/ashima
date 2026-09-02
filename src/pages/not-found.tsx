import { Link } from 'wouter';
import { ArrowUpRight } from 'lucide-react';
import { Seo } from '@/components/seo';

export default function NotFound() {
  return (
    <>
      <Seo path="/404" noindex
           title="Page not found, Ashima Engineering"
           description="That page does not exist." />

      <section className="on-dark relative flex min-h-[80vh] items-center overflow-hidden bg-[hsl(var(--primary))] pt-32 text-[hsl(var(--card))]">
        <div className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-luminosity"
             style={{ backgroundImage: "url('/images/projects/hero.jpg')" }} aria-hidden="true" />
        <div className="absolute inset-0 bg-[hsl(154_28%_10%/.35)]" />
        <div className="absolute -right-20 top-24 h-72 w-72 rounded-full border border-[hsl(var(--secondary))]/25" />
        <div className="relative z-10 mx-auto w-full max-w-[1380px] px-6 py-20 lg:px-12">
          <div className="hero-eyebrow hero-gold mb-7 inline-flex items-center gap-3 u-eyebrow">
            <span className="h-px w-10 bg-[hsl(var(--secondary))]" />
            404
          </div>
          <h1 className="font-display d-page">
            That page<br /><em>isn&rsquo;t here.</em>
          </h1>
          <p className="mt-10 max-w-md t-sm text-[hsl(var(--card))]/85">
            The link may be old, or the project may have been handed over and moved
            into the record.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/projects"
                  className="flex items-center gap-2 bg-[hsl(var(--secondary))] px-5 py-3.5 u-label text-[hsl(var(--primary))] transition-transform hover:-translate-y-1">
              Every project since 1995 <ArrowUpRight size={14} />
            </Link>
            <Link href="/"
                  className="flex items-center gap-2 border border-[hsl(var(--card))]/35 px-5 py-3.5 u-label text-[hsl(var(--card))] transition-colors hover:border-[hsl(var(--secondary))] hover:text-[hsl(var(--secondary))]">
              Home
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
