import { Seo } from '@/components/seo';
import { PageHero } from '@/components/page-hero';
import { Section, DisplayHeading } from '@/components/section';
import { Reveal } from '@/components/reveal';
import { NAP, addressOneLine } from '@/lib/site';

const notice: [string, string][] = [
  ['What we collect',
   'Only what you type into a form on this site: your name, your phone number, your email address if you give one, and whatever you write in the message field.'],
  ['What we do with it',
   'We call you back about the enquiry you sent. That is all. We do not sell it, share it with other builders or brokers, or add you to a mailing list.'],
  ['Where it goes',
   'Form submissions are handled by Netlify, who host this site, and are forwarded to our office email. The map on the contact and project pages is embedded from Google Maps, which will see your IP address when the map loads.'],
  ['Cookies',
   'This site sets no cookies of its own and uses no advertising or cross-site tracking.'],
  ['Keeping and deleting it',
   'We keep enquiries while they are live and for a reasonable period afterwards. Ask us to delete yours and we will.'],
];

export default function Privacy() {
  return (
    <>
      <Seo path="/privacy"
           title="Privacy notice, Ashima Engineering"
           description="What Ashima Engineering does with the information you send through this website." />

      <PageHero image="/images/site/staircase.jpg" eyebrow="Privacy"
                heading={<>Privacy<br /><em>notice.</em></>} />

      <Section eyebrow="01 / What we do with what you send" tone="light">
        <div className="mt-12 border-t border-[hsl(var(--primary))]/15">
          {notice.map(([t, d], i) => (
            <Reveal key={t} delay={(i % 4) as 0 | 1 | 2 | 3}>
              <div className="grid gap-3 border-b border-[hsl(var(--primary))]/15 py-7 md:grid-cols-[18rem_1fr] md:gap-10">
                <h2 className="d-3 text-[hsl(var(--primary))]">{t}</h2>
                <p className="max-w-2xl t-body text-[hsl(var(--muted-foreground))]">{d}</p>
              </div>
            </Reveal>
          ))}
          <Reveal>
            <div className="grid gap-3 border-b border-[hsl(var(--primary))]/15 py-7 md:grid-cols-[18rem_1fr] md:gap-10">
              <h2 className="d-3 text-[hsl(var(--primary))]">
                Asking us anything about this
              </h2>
              <p className="max-w-2xl t-body text-[hsl(var(--muted-foreground))]">
                Write to us at {NAP.email}, or come to the office at {addressOneLine}.
              </p>
            </div>
          </Reveal>
        </div>

        <p className="gap-note">
          <strong>Review before launch.</strong> This notice describes what the
          site as built actually does. Have someone confirm it matches how
          enquiries are handled in the office, and add a retention period if you
          have one. If analytics are added later, this page must be updated.
        </p>
      </Section>
    </>
  );
}
