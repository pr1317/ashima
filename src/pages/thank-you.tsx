import { Link } from 'wouter';
import { ArrowUpRight, CheckCircle2, Phone } from 'lucide-react';
import { Seo } from '@/components/seo';
import { Section, DisplayHeading } from '@/components/section';
import { NAP, telHref } from '@/lib/site';

export default function ThankYou() {
  return (
    <>
      <Seo path="/thank-you" noindex
           title="Thank you, Ashima Engineering"
           description="Your enquiry has reached us." />

      <section className="on-dark relative flex min-h-[70vh] items-center overflow-hidden bg-[hsl(var(--primary))] pt-32 text-[hsl(var(--card))]">
        <div className="absolute -right-20 top-24 h-72 w-72 rounded-full border border-[hsl(var(--secondary))]/25" />
        <div className="absolute -right-10 top-36 h-52 w-52 rounded-full border border-[hsl(var(--secondary))]/15" />
        <div className="relative z-10 mx-auto w-full max-w-[1380px] px-6 py-20 lg:px-12">
          <CheckCircle2 size={44} strokeWidth={1.2} className="text-[hsl(var(--secondary))]" aria-hidden="true" />
          <h1 className="mt-9 font-display d-page">
            We have<br /><em>your note.</em>
          </h1>
          <p className="mt-10 max-w-md t-sm text-[hsl(var(--card))]/85">
            Your enquiry has reached us. Someone will call you back within one working
            day. If it is urgent, the office number is {NAP.phone}.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/projects"
                  className="flex items-center gap-2 bg-[hsl(var(--secondary))] px-5 py-3.5 u-label text-[hsl(var(--primary))] transition-transform hover:-translate-y-1">
              See what&rsquo;s available <ArrowUpRight size={14} />
            </Link>
            <a href={telHref}
               className="flex items-center gap-2 border border-[hsl(var(--card))]/35 px-5 py-3.5 u-label text-[hsl(var(--card))] transition-colors hover:border-[hsl(var(--secondary))] hover:text-[hsl(var(--secondary))]">
              <Phone size={14} /> Call instead
            </a>
          </div>
        </div>
      </section>

      <Section tone="light" tight>
        <DisplayHeading className="d-3 text-[hsl(var(--primary))]">
          While you wait
        </DisplayHeading>
        <p className="mt-5 max-w-xl t-body text-[hsl(var(--muted-foreground))]">
          The record of every building we have finished since 1995 is on the
          projects page, by year and by locality.
        </p>
      </Section>
    </>
  );
}
