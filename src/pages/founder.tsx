import { Phone } from 'lucide-react';
import { Seo } from '@/components/seo';
import { Band, Head } from '@/components/blocks';
import { NAP, telHref } from '@/lib/site';

const PORTRAIT = '/images/people/partha-pratim-roy.jpg';

export default function Founder() {
  return (
    <>
      <Seo path="/about/founder" title="Partha Pratim Roy, Ashima Engineering"
           description={`Partha Pratim Roy founded Ashima Engineering in ${NAP.founded} and has built more than sixty residential projects in South Kolkata since.`}
           ogImage={PORTRAIT} />

      {/* No photographic hero band here, unlike every other inner page: the
          portrait is the page, and putting it behind the title as a wash would
          waste the one image that is actually of somebody. */}
      <Band testid="section-founder">
        <div className="grid gap-9 lg:grid-cols-[22rem_1fr] lg:gap-16">
          <div>
            <div className="aspect-[4/5] overflow-hidden rounded-[var(--radius)] border border-[hsl(var(--border))] bg-[hsl(var(--muted))]">
              <img src={PORTRAIT} loading="eager"
                   alt="Partha Pratim Roy, founder of Ashima Engineering, photographed at home in Kolkata"
                   className="size-full object-cover object-[50%_38%]" />
            </div>
            <a href={telHref} data-testid="link-founder-phone"
               className="mt-5 inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-[var(--radius)] border border-[hsl(var(--border))] bg-[hsl(var(--card))] u-label text-[hsl(var(--primary))]">
              <Phone size={16} aria-hidden="true" /> {NAP.phone}
            </a>
            <p className="mt-3 t-fine text-[hsl(var(--muted-foreground))]">
              The office number reaches him during working hours. {NAP.hours}
            </p>
          </div>

          <div>
            <p className="u-eyebrow text-[hsl(var(--accent))]">
              Founder, since {NAP.founded}
            </p>
            <h1 className="mt-3 d-page text-[hsl(var(--primary))]">Partha Pratim Roy</h1>

            <div className="prose-ashima mt-8 max-w-[62ch]">
              <p className="t-lead">
                Partha Pratim Roy read Science at the University of Calcutta.
              </p>
              <p className="t-body">
                He came to construction sideways. His first business was gourmet
                catering, and he still talks about what it taught him. Something
                made to fit one family is not the same as something made to be sold.
              </p>
              <p className="t-body">
                He founded Ashima Engineering in {NAP.founded}. Two years later he
                finished his first building, in {NAP.locality}, and named it Prarthana
                after his daughter. The company already carried his mother&rsquo;s name.
                That is still how it works here.
              </p>
              <p className="t-body">
                Since then Ashima has delivered more than sixty residential projects
                across South Kolkata. It has worked as a subcontractor to larger
                groups including L&amp;T, and taken contracts for government-associated
                organisations including Balmer Lawrie and Bicco Lawrie. He will tell
                you the discipline learned on that work is what he brings back to a
                twelve-flat building in Garfa.
              </p>
            </div>

            <p className="mt-9 max-w-[30ch] d-3 text-[hsl(var(--accent))]">
              He is on site most mornings. He answers his own phone.
            </p>
          </div>
        </div>
      </Band>

      <Band tone="card" testid="section-founder-words">
        <Head eyebrow="In his words"
              lede="One sentence from him, recorded rather than written for him, on what matters in building a home.">
          Still to record
        </Head>
        <p className="gap-note">
          <strong>Do not publish a stand-in quotation.</strong> This section stays
          empty until there is a real sentence from Partha Pratim Roy. A written
          one would be the least true thing on the site, on the page where that
          costs most.
        </p>
      </Band>
    </>
  );
}
