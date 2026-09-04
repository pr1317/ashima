import { MapPin, MessageCircle, Phone } from 'lucide-react';
import { Seo } from '@/components/seo';
import { PageHero } from '@/components/page-hero';
import { EnquiryForm } from '@/components/enquiry-form';
import { Band, DefList, Head } from '@/components/blocks';
import {
  NAP, addressOneLine, mailHref, mapsDirections, mapsEmbed, telHref, whatsappHref,
} from '@/lib/site';

const WHATSAPP = 'Hello, I saw the Ashima Engineering website and wanted to ask about a flat.';

export default function Contact() {
  return (
    <>
      <Seo path="/contact" title="Contact Ashima Engineering"
           description={`${addressOneLine}. ${NAP.hours} Call ${NAP.phone}.`} />

      <PageHero eyebrow="Contact" heading="Somebody is there most mornings">
        Come to the office, or call. We would rather show you a site than send
        you a brochure.
      </PageHero>

      <Band testid="section-contact">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <DefList rows={[
              ['Office', <>{NAP.street}, {NAP.locality}<br />{NAP.city}, {NAP.region} {NAP.postcode}</>],
              ['Open', NAP.hours],
              ['Phone', <a href={telHref} className="inline-flex min-h-11 items-center underline underline-offset-4" data-testid="link-contact-phone">{NAP.phone}</a>],
              ['Email', <a href={mailHref} className="inline-flex min-h-11 items-center underline underline-offset-4" data-testid="link-contact-email">{NAP.email}</a>],
            ]} />

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a href={telHref} data-testid="link-contact-call"
                 className="inline-flex min-h-13 flex-1 items-center justify-center gap-2 rounded-[var(--radius)] bg-[hsl(var(--accent))] px-6 u-label text-[hsl(var(--accent-foreground))]">
                <Phone size={16} aria-hidden="true" /> Call
              </a>
              <a href={whatsappHref(WHATSAPP)} data-testid="link-contact-whatsapp"
                 className="inline-flex min-h-13 flex-1 items-center justify-center gap-2 rounded-[var(--radius)] border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-6 u-label text-[hsl(var(--primary))]">
                <MessageCircle size={16} aria-hidden="true" /> WhatsApp
              </a>
            </div>

            <div className="mt-6 aspect-[16/10] overflow-hidden rounded-[var(--radius)] border border-[hsl(var(--border))] bg-[hsl(var(--muted))]">
              <iframe title="Map showing the Ashima Engineering office"
                      src={mapsEmbed(addressOneLine)} loading="lazy"
                      className="size-full border-0" referrerPolicy="no-referrer-when-downgrade" />
            </div>
            <a href={mapsDirections(addressOneLine)} target="_blank" rel="noreferrer"
               data-testid="link-contact-directions"
               className="mt-4 inline-flex min-h-11 items-center gap-2 u-label text-[hsl(var(--accent))]">
              <MapPin size={15} aria-hidden="true" /> Directions
            </a>

            <p className="gap-note">
              <strong>Match the Google profile to this.</strong> The hours shown
              above &mdash; {NAP.hours} &mdash; are what the profile should say.
              Sunday is when working homebuyers actually visit sites, so the
              profile should say so too.
            </p>
          </div>

          <div>
            <Head eyebrow="Or write to us"
                  lede="Tell us what you are looking for. We reply within one working day.">
              Tell us what you need
            </Head>
            <div className="mt-7">
              <EnquiryForm name="contact-enquiry" />
            </div>
          </div>
        </div>
      </Band>
    </>
  );
}
