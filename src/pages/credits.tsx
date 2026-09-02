import { Seo } from '@/components/seo';
import { PageHero } from '@/components/page-hero';
import { Section, DisplayHeading } from '@/components/section';
import { Reveal } from '@/components/reveal';
import { imageCredits } from '@/data/image-credits';

export default function Credits() {
  return (
    <>
      <Seo path="/credits"
           title="Image credits, Ashima Engineering"
           description="Attribution for the stand-in photographs currently used on this site." />

      <PageHero image="/images/site/pinkhouse.jpg" eyebrow="Attribution"
                heading={<>Every photograph<br /><em>is a stand-in.</em></>}>
        <p className="mt-9 max-w-lg text-sm leading-7 text-[hsl(var(--card))]/85">
          None of them shows a building by Ashima Engineering. They are freely
          licensed photographs of Kolkata buildings, used so that the layout can
          be judged before the real photography exists.
        </p>
      </PageHero>

      <Section eyebrow="01 / Credits" tone="light">
        <div className="mt-10 grid gap-9 lg:grid-cols-[.8fr_1.8fr]">
          <div />
          <Reveal>
            <p className="max-w-2xl text-base leading-8 text-[hsl(var(--muted-foreground))]">
              Each is credited below under the terms of its licence. When
              Ashima&rsquo;s own photographs replace them, this page goes away.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 overflow-x-auto">
          <table className="dtable min-w-[46rem]" data-testid="table-credits">
            <thead>
              <tr>
                <th scope="col">Used for</th><th scope="col">Photograph</th>
                <th scope="col">By</th><th scope="col">Licence</th>
              </tr>
            </thead>
            <tbody>
              {imageCredits.map((c) => (
                <tr key={c.file + c.purpose}>
                  <th scope="row" className="orgcell">{c.purpose}</th>
                  <td>
                    <a className="underline underline-offset-2 hover:text-[hsl(var(--accent))]"
                       href={c.source} rel="noopener" target="_blank">{c.title}</a>
                  </td>
                  <td>{c.author}</td>
                  <td>{c.licence}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="gap-note">
          <strong>Replace these.</strong> Hire a photographer for half a day and
          shoot six to eight of the best buildings in early morning light, keeping
          the verticals straight, plus a couple of interiors if any are accessible.
          Phone photographs can carry the rest. This is the single change that would
          improve the site most.
        </p>
      </Section>
    </>
  );
}
