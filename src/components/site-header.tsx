import { useEffect, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, Phone, X } from 'lucide-react';
import { Logo } from '@/components/logo';
import { IS_LAUNCH, NAV, NAP, telHref } from '@/lib/site';

/** Sits in normal flow above the header rather than inside it: the header is
 *  sticky, and a banner that scrolled away with it would be missed. */
export function ReviewBanner() {
  if (IS_LAUNCH) return null;
  return (
    <p className="bg-[hsl(var(--primary))] px-5 py-2 text-center u-micro text-[hsl(var(--card))]"
       data-testid="banner-review-build">
      Review build — draft copy, stand-in photographs, unverified sample WBRERA number.{' '}
      <Link href="/credits" className="underline underline-offset-2">Image credits</Link>
    </p>
  );
}

/** The header sits on its own light ground and stays put, rather than floating
 *  transparent over a dark hero. Two reasons that changed: on a phone the hero
 *  is most of the first screen, so a transparent header has to survive whatever
 *  the photograph happens to be doing behind it; and a builder's site is used
 *  to get to a phone number, which should never scroll out of reach. */
export function SiteHeader() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  const [stuck, setStuck] = useState(false);

  useEffect(() => { setOpen(false); }, [location]);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* The drawer is the whole screen on a phone, so the page behind it must not
     scroll under it. */
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const current = location.replace(/\/$/, '') || '/';

  return (
    <>
      <a href="#main"
         className="u-label sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-[hsl(var(--primary))] focus:px-4 focus:py-3 focus:text-[hsl(var(--card))]">
        Skip to content
      </a>

      <header data-testid="site-header"
              className={`sticky top-0 z-40 bg-[hsl(var(--card))] transition-shadow ${
                stuck ? 'border-b border-[hsl(var(--border))] shadow-[0_1px_18px_-12px_hsl(var(--primary)/.5)]'
                      : 'border-b border-transparent'}`}>
        <div className="mx-auto flex max-w-[1380px] items-center justify-between gap-4 px-5 py-3 lg:px-12 lg:py-4">
          <Link href="/" aria-label="Ashima Engineering, home" data-testid="link-logo"
                className="inline-flex min-h-11 items-center">
            <Logo variant="horizontal" className="h-9 w-auto text-[hsl(var(--primary))] lg:h-11" />
          </Link>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Main navigation">
            {NAV.slice(1).map((n) => (
              <Link key={n.href} href={n.href}
                    aria-current={current === n.href ? 'page' : undefined}
                    className={`inline-flex min-h-11 items-center u-label transition-colors hover:text-[hsl(var(--accent))] ${
                      current === n.href
                        ? 'text-[hsl(var(--accent))]'
                        : 'text-[hsl(var(--primary))]'}`}
                    data-testid={`link-nav-${n.label.toLowerCase().replaceAll(' ', '-')}`}>
                {n.label}
              </Link>
            ))}
            <a href={telHref}
               className="inline-flex min-h-11 items-center gap-2 rounded-[var(--radius)] bg-[hsl(var(--accent))] px-5 u-label text-[hsl(var(--accent-foreground))]"
               data-testid="link-header-phone">
              <Phone size={15} aria-hidden="true" /> {NAP.phone}
            </a>
          </nav>

          <button type="button" onClick={() => setOpen(true)}
                  aria-label="Open menu" aria-expanded={open}
                  className="flex size-11 items-center justify-center text-[hsl(var(--primary))] lg:hidden"
                  data-testid="button-menu-open">
            <Menu size={22} aria-hidden="true" />
          </button>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-[hsl(var(--primary))] text-[hsl(var(--card))] lg:hidden"
             data-testid="nav-drawer">
          <div className="flex items-center justify-between px-5 py-3">
            <Logo variant="horizontal" className="h-9 w-auto text-[hsl(var(--card))]" />
            <button type="button" onClick={() => setOpen(false)} aria-label="Close menu"
                    className="flex size-11 items-center justify-center"
                    data-testid="button-menu-close">
              <X size={22} aria-hidden="true" />
            </button>
          </div>

          <nav className="flex flex-1 flex-col justify-center gap-1 px-5" aria-label="Main navigation">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href}
                    aria-current={current === n.href ? 'page' : undefined}
                    className={`d-2 py-3 ${current === n.href
                      ? 'text-[hsl(var(--secondary))]' : 'text-[hsl(var(--card))]'}`}
                    data-testid={`link-drawer-${n.label.toLowerCase().replaceAll(' ', '-')}`}>
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="px-5 pb-8">
            <a href={telHref}
               className="flex min-h-14 items-center justify-center gap-2 rounded-[var(--radius)] bg-[hsl(var(--secondary))] u-label text-[hsl(var(--primary))]">
              <Phone size={16} aria-hidden="true" /> {NAP.phone}
            </a>
            <p className="mt-3 text-center t-fine text-[hsl(var(--card))]/70">{NAP.hours}</p>
          </div>
        </div>
      )}
    </>
  );
}
