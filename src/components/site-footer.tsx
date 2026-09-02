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
            <div className="mt-4 font-ui text-[9.5px] uppercase tracking-[0.19em] text-[hsl(var(--card))]/55">
              Built with care since 1995
            </div>
          </div>

          <div>
            <h2 className="font-ui text-[10px] uppercase tracking-[0.19em] text-[hsl(var(--secondary))]">Office</h2>
            <address className="mt-4 text-sm not-italic leading-7 text-[hsl(var(--card))]/70">
              {NAP.street}<br />{NAP.locality}<br />
              {NAP.city} {NAP.postcode}<br />{NAP.region}, India<br /><br />
              <a href={telHref} className="hover:text-[hsl(var(--secondary))]" data-testid="link-footer-phone">{NAP.phone}</a><br />
              <a href={whatsappHref('Hello — I saw your website.')} rel="noopener" target="_blank"
                 className="hover:text-[hsl(var(--secondary))]" data-testid="link-footer-whatsapp">WhatsApp</a><br />
              <a href={mailHref} className="hover:text-[hsl(var(--secondary))]" data-testid="link-footer-email">{NAP.email}</a><br /><br />
              {NAP.hours}
            </address>
          </div>

          <div>
            <h2 className="font-ui text-[10px] uppercase tracking-[0.19em] text-[hsl(var(--secondary))]">Pages</h2>
            <ul className="mt-4 space-y-2.5 text-sm text-[hsl(var(--card))]/70">
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

        <div className="mt-14 flex flex-col justify-between gap-3 font-ui text-[9.5px] uppercase tracking-[0.12em] text-[hsl(var(--card))]/35 sm:flex-row">
          <span>&copy; {year} Ashima Engineering. Building in South Kolkata since 1995.</span>
          <span>Set in Cormorant Garamond and Karla. Logo in Ashima Sans, under the SIL OFL 1.1.</span>
        </div>
      </div>
    </footer>
  );
}
