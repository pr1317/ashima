import { Link } from 'wouter';
import { ArrowUpRight, CheckCircle2, Phone } from 'lucide-react';
import { Seo } from '@/components/seo';
import { NAP, telHref } from '@/lib/site';

export default function ThankYou() {
  return (
    <>
      <Seo path="/thank-you" noindex title="Thank you, Ashima Engineering"
           description="Your enquiry has reached us." />

      <section className="on-dark flex min-h-[60vh] items-center bg-[hsl(var(--primary))] py-16 text-[hsl(var(--card))]"
               data-testid="section-thank-you">
        <div className="mx-auto w-full max-w-[1380px] px-5 lg:px-12">
          <CheckCircle2 size={40} strokeWidth={1.2} aria-hidden="true"
                        className="text-[hsl(var(--secondary))]" />
          <h1 className="mt-7 max-w-[16ch] d-page text-[hsl(var(--card))]">
            Thank you — we have it.
          </h1>
          <p className="mt-5 max-w-[46ch] t-body text-[hsl(var(--card))]/80">
            We reply within one working day. If it is urgent, call the office —
            somebody is usually there. {NAP.hours}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={telHref} data-testid="link-thanks-phone"
               className="inline-flex min-h-13 items-center justify-center gap-2 rounded-[var(--radius)] bg-[hsl(var(--secondary))] px-7 u-label text-[hsl(var(--primary))]">
              <Phone size={16} aria-hidden="true" /> {NAP.phone}
            </a>
            <Link href="/projects" data-testid="link-thanks-projects"
                  className="inline-flex min-h-13 items-center justify-center gap-2 rounded-[var(--radius)] border border-[hsl(var(--card))]/40 px-7 u-label text-[hsl(var(--card))]">
              See the projects <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
