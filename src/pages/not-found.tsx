import { Link } from 'wouter';
import { ArrowUpRight } from 'lucide-react';
import { Seo } from '@/components/seo';

export default function NotFound() {
  return (
    <>
      <Seo path="/404" noindex title="Page not found, Ashima Engineering"
           description="That page is not here." />

      <section className="on-dark flex min-h-[60vh] items-center bg-[hsl(var(--primary))] py-16 text-[hsl(var(--card))]"
               data-testid="section-not-found">
        <div className="mx-auto w-full max-w-[1380px] px-5 lg:px-12">
          <p className="u-eyebrow text-[hsl(var(--secondary))]">404</p>
          <h1 className="mt-4 max-w-[16ch] d-page text-[hsl(var(--card))]">
            That page has moved on.
          </h1>
          <p className="mt-5 max-w-[42ch] t-body text-[hsl(var(--card))]/80">
            The two people usually end up looking for are the buildings, and a
            way to reach us.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/projects" data-testid="link-404-projects"
                  className="inline-flex min-h-13 items-center justify-center gap-2 rounded-[var(--radius)] bg-[hsl(var(--secondary))] px-7 u-label text-[hsl(var(--primary))]">
              The projects <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
            <Link href="/contact" data-testid="link-404-contact"
                  className="inline-flex min-h-13 items-center justify-center gap-2 rounded-[var(--radius)] border border-[hsl(var(--card))]/40 px-7 u-label text-[hsl(var(--card))]">
              Contact
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
