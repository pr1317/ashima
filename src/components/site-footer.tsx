import { Link } from 'wouter';
import { Logo } from '@/components/logo';
import { NAP, NAV, mailHref, telHref, whatsappHref } from '@/lib/site';

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="on-dark bg-[hsl(var(--primary))] px-6 pb-8 pt-16 text-[hsl(var(--card))] lg:px-12"
            data-testid="site-footer">
      <div className="mx-auto max-w-[1380px] border-t border-[hsl(var(--card))]/20 pt-10">
        <div className="grid gap-10 md:grid-cols-[1.1fr_1fr_1fr]">
          <div>
            <Logo variant="stacked" className="h-24 w-auto text-[hsl(var(--card))]" />
            <div className="mt-4 u-micro text-[hsl(var(--card))]/72">
              Built with care since 1993
            </div>
          </div>

          <div>
            <h2 className="u-eyebrow text-[hsl(var(--secondary))]">Office</h2>
            <address className="mt-4 t-sm not-italic text-[hsl(var(--card))]/85">
              {NAP.street}<br />{NAP.locality}<br />
              {NAP.city} {NAP.postcode}<br />{NAP.region}, India<br /><br />
              <a href={telHref} className="transition-colors hover:text-[hsl(var(--secondary))]" data-testid="link-footer-phone">{NAP.phone}</a><br />
              <a href={whatsappHref('Hello — I saw your website.')} rel="noopener" target="_blank"
                 className="transition-colors hover:text-[hsl(var(--secondary))]" data-testid="link-footer-whatsapp">WhatsApp</a><br />
              <a href={mailHref} className="transition-colors hover:text-[hsl(var(--secondary))]" data-testid="link-footer-email">{NAP.email}</a>
              {/* The opening hours are the thing people come to a footer for,
                  so they are not dimmed with the rest of the block. */}
              <span className="mt-5 block text-[hsl(var(--secondary))]">{NAP.hours}</span>
            </address>
          </div>

          <div>
            <h2 className="u-eyebrow text-[hsl(var(--secondary))]">Pages</h2>
            <ul className="mt-4 space-y-2.5 t-sm text-[hsl(var(--card))]/85">
              {NAV.slice(1).map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="hover:text-[hsl(var(--secondary))]">{n.label}</Link>
                </li>
              ))}
              <li><Link href="/about/founder" className="hover:text-[hsl(var(--secondary))]">Partha Pratim Roy</Link></li>
              <li><Link href="/privacy" className="hover:text-[hsl(var(--secondary))]">Privacy</Link></li>
              <li><Link href="/credits" className="hover:text-[hsl(var(--secondary))]">Image credits</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col justify-between gap-3 u-micro text-[hsl(var(--card))]/58 sm:flex-row">
          <span>&copy; {year} Ashima Engineering. Building in South Kolkata since 1993.</span>
          <span>Set in Cormorant Garamond and Karla. Logo in Ashima Sans, under the SIL OFL 1.1.</span>
        </div>
      </div>
    </footer>
  );
}
