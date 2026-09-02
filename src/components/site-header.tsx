import { useEffect, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { ArrowUpRight, ChevronRight, Menu, X } from 'lucide-react';
import { Logo } from '@/components/logo';
import { IS_LAUNCH, NAV } from '@/lib/site';

/** Sits in normal flow above the header, which is why it is not part of it —
 *  the header is absolute, over the hero. */
export function ReviewBanner() {
  if (IS_LAUNCH) return null;
  return (
    <p className="bg-[hsl(var(--accent))] px-6 py-2 text-center u-label text-[hsl(var(--card))]"
       data-testid="banner-review-build">
      Review build — draft copy, stand-in photographs, unverified sample WBRERA number.{' '}
      <Link href="/credits" className="underline underline-offset-2">Image credits</Link>
    </p>
  );
}

/** Transparent, over the dark hero band every page opens on. */
export function SiteHeader() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => { setOpen(false); }, [location]);
  const current = location.replace(/\/$/, '') || '/';

  return (
    <>
      <a href="#main"
         className="u-label sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-[hsl(var(--primary))] focus:px-4 focus:py-3 focus:text-[hsl(var(--card))]">
        Skip to content
      </a>

      <header className="absolute z-40 w-full text-[hsl(var(--card))]" data-testid="site-header">
        <div className="mx-auto flex max-w-[1380px] items-center justify-between px-6 py-6 lg:px-12">
          <Link href="/" className="group" aria-label="Ashima Engineering, home"
                data-testid="link-logo">
            <Logo variant="horizontal" className="h-11 w-auto text-[hsl(var(--card))] sm:h-12" />
          </Link>

          <nav className="hidden items-center gap-9 lg:flex" aria-label="Main navigation">
            {NAV.slice(1).map((n) => (
              <Link key={n.href} href={n.href}
                    aria-current={current === n.href ? 'page' : undefined}
                    className={`nav-link u-label transition-colors hover:text-[hsl(var(--card))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--secondary))] ${
                      current === n.href ? 'text-[hsl(var(--secondary))]' : 'text-[hsl(var(--card))]/85'}`}
                    data-testid={`link-nav-${n.label.toLowerCase().replaceAll(' ', '-')}`}>
                {n.label}
              </Link>
            ))}
            <Link href="/contact#enquire"
                  className="flex items-center gap-2 border border-[hsl(var(--secondary))] px-4 py-3 u-label text-[hsl(var(--secondary))] transition-colors hover:bg-[hsl(var(--secondary))] hover:text-[hsl(var(--primary))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--secondary))]"
                  data-testid="link-header-enquire">
              Start a conversation <ArrowUpRight size={14} />
            </Link>
          </nav>

          <button type="button"
                  className="flex h-11 w-11 items-center justify-center border border-[hsl(var(--card))]/35 lg:hidden"
                  aria-label={open ? 'Close navigation' : 'Open navigation'}
                  aria-expanded={open} aria-controls="mobile-navigation"
                  onClick={() => setOpen((v) => !v)}
                  data-testid="button-mobile-menu">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {open && (
          <nav id="mobile-navigation"
               className="mx-5 border border-[hsl(var(--card))]/20 bg-[hsl(var(--primary))]/95 p-5 backdrop-blur lg:hidden"
               aria-label="Mobile navigation" data-testid="mobile-navigation">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href}
                    className="flex items-center justify-between border-b border-[hsl(var(--card))]/15 py-4 u-label text-[hsl(var(--card))]"
                    data-testid={`link-mobile-${n.label.toLowerCase().replaceAll(' ', '-')}`}>
                {n.label}<ChevronRight size={15} />
              </Link>
            ))}
            <Link href="/contact#enquire"
                  className="mt-4 flex items-center justify-center gap-2 bg-[hsl(var(--secondary))] px-4 py-3 u-label text-[hsl(var(--primary))]"
                  data-testid="link-mobile-enquire">
              Start a conversation <ArrowUpRight size={14} />
            </Link>
          </nav>
        )}
      </header>
    </>
  );
}
