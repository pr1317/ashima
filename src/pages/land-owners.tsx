import { MessageCircle, Phone } from 'lucide-react';
import { Seo } from '@/components/seo';
import { PageHero } from '@/components/page-hero';
import { EnquiryForm } from '@/components/enquiry-form';
import { Band, Head, Panel, Steps, TickList } from '@/components/blocks';
import { NAP, telHref, whatsappHref } from '@/lib/site';

const WHATSAPP =
  'Hello, I own a plot in South Kolkata and wanted to talk about developing it.';

/* Three of these four are confirmed by the business. The possession-date one
   is not: it says the consequence of missing the date is written into the
   agreement beside it, and what that consequence is has not been confirmed.
   It is a promise about money to a landowner, so it must not go live as it
   stands. The note under the list says so on the page. */
const commitments: [string, string][] = [
  ["The owner's share is defined in writing before anything is signed.",
   'Which flats, on which floors, with which parking, named in the agreement rather than described in a conversation. You should be able to point at a drawing and say those ones are mine.'],
  ['A possession date in the agreement, not an estimate.',
   'One date, written into the development agreement, with what happens if we miss it written in beside it.'],
  ['Nothing is demolished before the plan is sanctioned.',
   'Your house stands until the sanctioned plan is in hand. No developer should ask you to clear a plot on the strength of an application.'],
  ['You can see the site whenever you want, without an appointment.',
   'It is your land. Come and look at the reinforcement before the slab is cast. Bring your own engineer if you would rather.'],
];

const steps: [string, string, string][] = [
  ['01', 'First conversation', 'You tell us where the plot is and roughly what is on it. Nothing is needed in writing. This is usually half an hour.'],
  ['02', 'Title and documents', 'We check the deed, the mutation and the tax receipts. If something is unclear we tell you what it is, whether or not we go ahead.'],
  ['03', 'Measurement and feasibility', 'The plot is measured, and we work out what can be built on it under the current rules. How many floors, how many flats, how much parking.'],
  ['04', 'Terms and share', 'What you get and what we get, discussed openly, with the numbers behind it shown to you. This is the conversation most owners have been badly served on before.'],
  ['05', 'Development agreement', 'Registered. Your share, the possession date and the specifications are all in it.'],
  ['06', 'Sanction and approvals', 'Plans go to the corporation or the municipality. Nothing is demolished until sanction is in hand.'],
  ['07', 'Construction', 'Typically 20 months from the start of work. You can visit whenever you like.'],
  ['08', 'Handover of your share', 'You take possession of your flats. The completion certificate and the papers follow.'],
];

const documents: [string, string][] = [
  ['The deed', 'The registered title document for the plot.'],
  ['Mutation', 'Records showing the property is mutated into the current owner’s name.'],
  ['Tax receipts', 'Recent municipal or corporation tax receipts.'],
  ['Plot dimensions', 'A survey plan if you have one. If not, we will measure it.'],
];

export default function LandOwners() {
  return (
    <>
      <Seo path="/land-owners"
           title="Own land in South Kolkata? | Ashima Engineering"
           description={`Thirty joint ventures completed in South Kolkata since ${NAP.founded}. What the owner gets, in writing, before anything is signed.`} />

      <PageHero eyebrow="Joint ventures · 30 completed"
                heading="You own the land. Here is exactly what you get."
                image="/images/projects/prarthana-a.jpg">
        Thirty joint ventures completed, every one settled on the terms agreed
        at the start.
      </PageHero>

      {/* --- What we commit to -------------------------------------------- */}
      <Band testid="section-commitments">
        <Head eyebrow="In writing, first">Four things in writing</Head>
        <div className="mt-7 grid gap-3 lg:grid-cols-2 lg:gap-5">
          {commitments.map(([t, d]) => (
            <Panel key={t}>
              <h3 className="d-4 text-[hsl(var(--primary))]">{t}</h3>
              <p className="mt-2.5 t-sm t-wide text-[hsl(var(--muted-foreground))]">{d}</p>
            </Panel>
          ))}
        </div>
        <p className="gap-note">
          <strong>One of four still to confirm.</strong> The commitments on the
          owner&rsquo;s share, on demolition waiting for sanction, and on visiting the
          site unannounced are confirmed. The possession-date commitment says the
          consequence of missing the date is written into the agreement beside it
          &mdash; what that consequence is has not been confirmed, so that clause
          should not go live as it stands.
        </p>
      </Band>

      {/* --- The process --------------------------------------------------- */}
      <Band tone="card" testid="section-process">
        <Head eyebrow="Start to finish" lede="This is the order it happens in.">
          How it goes
        </Head>
        <div className="mt-7">
          <Steps steps={steps.map(([, title, body]) => ({ title, body }))} />
        </div>
      </Band>

      {/* --- What to bring -------------------------------------------------- */}
      <Band testid="section-documents">
        <Head eyebrow="Before the first meeting">What to bring</Head>
        <div className="mt-6 max-w-[62ch]">
          <TickList items={documents.map(([t, d]) => (
            <span key={t}>
              <b className="font-medium text-[hsl(var(--primary))]">{t}</b>
              {' \u2014 '}
              <span className="text-[hsl(var(--muted-foreground))]">{d}</span>
            </span>
          ))} />
        </div>
      </Band>

      {/* --- Talk to us ----------------------------------------------------- */}
      <Band tone="deep" testid="section-land-contact">
        <div className="grid gap-9 lg:grid-cols-2 lg:gap-16">
          <div>
            <Head onDark eyebrow="No obligation"
                  lede={`Tell us where the plot is. Nothing is needed in writing, and the first conversation is usually half an hour. ${NAP.hours}`}>
              Talk about your plot
            </Head>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a href={whatsappHref(WHATSAPP)} data-testid="link-land-whatsapp"
                 className="inline-flex min-h-13 items-center justify-center gap-2 rounded-[var(--radius)] bg-[hsl(var(--secondary))] px-7 u-label text-[hsl(var(--primary))]">
                <MessageCircle size={16} aria-hidden="true" /> WhatsApp us
              </a>
              <a href={telHref} data-testid="link-land-phone"
                 className="inline-flex min-h-13 items-center justify-center gap-2 rounded-[var(--radius)] border border-[hsl(var(--card))]/40 px-7 u-label text-[hsl(var(--card))]">
                <Phone size={16} aria-hidden="true" /> {NAP.phone}
              </a>
            </div>
          </div>
          <EnquiryForm name="contact-enquiry" onDark />
        </div>
      </Band>
    </>
  );
}
