import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';
import { Seo } from '@/components/seo';
import { PageHero } from '@/components/page-hero';
import { Section, DisplayHeading } from '@/components/section';
import { Reveal } from '@/components/reveal';
import { EnquiryForm } from '@/components/enquiry-form';
import {
  NAP, addressOneLine, mailHref, mapsDirections, mapsEmbed, telHref, whatsappHref,
} from '@/lib/site';

export default function Contact() {
  const mapQuery = `${addressOneLine}, India`;

  return (
    <>
      <Seo path="/contact"
           title="Contact Ashima Engineering, Santoshpur, Kolkata"
           description="Ashima Engineering, 1 Aurobindo Road, Santoshpur, Kolkata 700075. Phone, WhatsApp, hours and directions." />

      <PageHero image="/images/site/street.jpg" eyebrow="Come and see us"
                heading={<>Tell us what feels<br /><em>like home.</em></>}
                marker="Santoshpur, since 1995">
        <p className="mt-9 max-w-lg text-sm leading-7 text-[hsl(var(--card))]/85">
          The office is on Aurobindo Road in Santoshpur, and has been since 1995.
          If you would rather see a building than an office, say so and we will
          meet you at one.
        </p>
      </PageHero>

      {/* --- 01 / The office ---------------------------------------------- */}
      <Section eyebrow="01 / The office" tone="light">
        <div className="mt-10 grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <Reveal>
            <DisplayHeading className="text-[clamp(2.4rem,4.6vw,4.4rem)] text-[hsl(var(--primary))]"
                            em="see us.">
              Come and
            </DisplayHeading>
            <address className="mt-9 not-italic">
              <span className="block font-display text-2xl text-[hsl(var(--primary))]">Ashima Engineering</span>
              <span className="mt-3 block text-base leading-8 text-[hsl(var(--muted-foreground))]">
                {NAP.street}<br />{NAP.locality}<br />
                {NAP.city} {NAP.postcode}<br />{NAP.region}, India
              </span>
            </address>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href={telHref}
                 className="flex items-center gap-2 bg-[hsl(var(--primary))] px-5 py-3.5 font-ui text-[10px] uppercase tracking-[0.16em] text-[hsl(var(--card))] transition-transform hover:-translate-y-1"
                 data-testid="link-contact-phone">
                <Phone size={14} /> {NAP.phone}
              </a>
              <a href={whatsappHref('Hello, I saw your website.')} rel="noopener" target="_blank"
                 className="flex items-center gap-2 border border-[hsl(var(--primary))]/30 px-5 py-3.5 font-ui text-[10px] uppercase tracking-[0.16em] text-[hsl(var(--primary))] transition-colors hover:border-[hsl(var(--accent))] hover:text-[hsl(var(--accent))]"
                 data-testid="link-contact-whatsapp">
                WhatsApp <ArrowUpRight size={14} />
              </a>
              <a href={mailHref}
                 className="flex items-center gap-2 border border-[hsl(var(--primary))]/30 px-5 py-3.5 font-ui text-[10px] uppercase tracking-[0.16em] text-[hsl(var(--primary))] transition-colors hover:border-[hsl(var(--accent))] hover:text-[hsl(var(--accent))]"
                 data-testid="link-contact-email">
                <Mail size={14} /> Email
              </a>
            </div>
            <p className="mt-7 font-ui text-[10px] uppercase tracking-[0.15em] text-[hsl(var(--muted-foreground))]">
              {NAP.hours}
            </p>
            <p className="gap-note">
              <strong>One thing to confirm.</strong> The Google profile currently
              reads Monday to Saturday, 11am to 8pm, with Sunday closed. Sunday is
              when working homebuyers actually visit sites, so this page says
              &ldquo;Sundays by appointment&rdquo; instead. Change the Google profile
              to match, or change this line.
            </p>
          </Reveal>

          <Reveal delay={1}>
            <div className="aspect-[1.1] overflow-hidden bg-[hsl(var(--muted))]">
              <img src="/images/site/street.jpg" loading="lazy"
                   alt="A quiet tree-lined street in Santoshpur, South Kolkata, with cycle rickshaws at the kerb. Stand-in photograph."
                   className="h-full w-full object-cover" />
            </div>
          </Reveal>
        </div>
      </Section>

      {/* --- 02 / Enquire -------------------------------------------------- */}
      <Section id="enquire" eyebrow="02 / Let us talk" tone="dark">
        <div className="mt-4 grid gap-14 lg:grid-cols-[.78fr_1.22fr] lg:gap-24">
          <Reveal>
            <DisplayHeading className="text-[clamp(2.8rem,5.6vw,6rem)] !leading-[.84] tracking-[-.045em]"
                            em="you are looking for.">
              Tell us what
            </DisplayHeading>
            <p className="mt-10 max-w-sm text-sm leading-7 text-[hsl(var(--card))]/63">
              Tell us what you&rsquo;re looking for and someone will call you back
              within one working day.
            </p>
            <p className="gap-note">
              <strong>Only publish the callback promise if it will be kept.</strong>{' '}
              One working day is worth a great deal on a builder&rsquo;s website, and
              it costs a great deal the first time somebody is left waiting.
            </p>
          </Reveal>
          <Reveal delay={1}>
            <EnquiryForm name="contact-enquiry" onDark />
          </Reveal>
        </div>
      </Section>

      {/* --- 03 / Finding us ---------------------------------------------- */}
      <Section eyebrow="03 / Finding us" tone="card">
        <div className="mt-2 grid gap-9 lg:grid-cols-[.8fr_1.8fr]">
          <div />
          <Reveal>
            <DisplayHeading className="max-w-3xl text-[clamp(2.4rem,4.6vw,4.4rem)] text-[hsl(var(--primary))]"
                            em="us.">
              Finding
            </DisplayHeading>
          </Reveal>
        </div>
        <div className="mt-12">
          <iframe title="Map showing Ashima Engineering, 1 Aurobindo Road, Santoshpur, Kolkata"
                  loading="lazy" width="100%" height={440}
                  className="border border-[hsl(var(--primary))]/20"
                  referrerPolicy="no-referrer-when-downgrade" src={mapsEmbed(mapQuery)} />
          <a href={mapsDirections(mapQuery)} rel="noopener" target="_blank"
             className="mt-5 inline-flex items-center gap-2 border-b border-[hsl(var(--primary))]/35 pb-1.5 font-ui text-[10px] uppercase tracking-[0.16em] text-[hsl(var(--primary))] hover:border-[hsl(var(--accent))] hover:text-[hsl(var(--accent))]">
            <MapPin size={13} /> Directions <ArrowUpRight size={13} />
          </a>
        </div>
      </Section>
    </>
  );
}
