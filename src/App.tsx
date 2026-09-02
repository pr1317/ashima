import { useEffect, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import { useHashLocation } from 'wouter/use-hash-location';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ReviewBanner, SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { NAP, SITE_ORIGIN, AREAS_SERVED } from '@/lib/site';

import Home from '@/pages/home';
import About from '@/pages/about';
import Founder from '@/pages/founder';
import Projects from '@/pages/projects';
import ProjectDetail from '@/pages/project-detail';
import LandOwners from '@/pages/land-owners';
import Institutional from '@/pages/institutional';
import Contact from '@/pages/contact';
import Privacy from '@/pages/privacy';
import Credits from '@/pages/credits';
import ThankYou from '@/pages/thank-you';
import NotFound from '@/pages/not-found';

const queryClient = new QueryClient();

/* Normally the app owns real paths, and public/_redirects serves the shell for
 * any of them. The standalone single-file preview is opened from an arbitrary
 * path with no server to do that, so it routes on the hash instead. */
const routerProps = import.meta.env.VITE_HASH_ROUTER === '1'
  ? { hook: useHashLocation }
  : { base: import.meta.env.BASE_URL.replace(/\/$/, '') };

/* Schema.org. The name, address and phone here must stay identical to the
   Google Business Profile — local search treats any variation as a second,
   competing business. Single source of truth is src/lib/site.ts. */
const organisationSchema = {
  '@context': 'https://schema.org',
  '@type': 'RealEstateAgent',
  name: NAP.name,
  url: SITE_ORIGIN,
  telephone: NAP.phone,
  email: NAP.email,
  foundingDate: NAP.founded,
  address: {
    '@type': 'PostalAddress',
    streetAddress: `${NAP.street}, ${NAP.locality}`,
    addressLocality: NAP.city,
    addressRegion: NAP.region,
    postalCode: NAP.postcode,
    addressCountry: NAP.country,
  },
  geo: { '@type': 'GeoCoordinates', latitude: NAP.lat, longitude: NAP.lng },
  areaServed: AREAS_SERVED.map((n) => ({ '@type': 'Place', name: `${n}, Kolkata` })),
  openingHours: 'Mo-Sa 11:00-20:00',
};

/** New page, top of the page — except when the URL carries a hash, which is
 *  the reader asking for a particular section. */
function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      const target = document.getElementById(hash);
      if (target) { target.scrollIntoView({ behavior: 'smooth' }); return; }
    }
    window.scrollTo(0, 0);
  }, [location]);
  return null;
}

function OrganisationSchema() {
  useEffect(() => {
    const tag = document.createElement('script');
    tag.type = 'application/ld+json';
    tag.textContent = JSON.stringify(organisationSchema);
    document.head.appendChild(tag);
    return () => { tag.remove(); };
  }, []);
  return null;
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function Routes() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/about/founder" component={Founder} />
        <Route path="/projects" component={Projects} />
        <Route path="/projects/:id" component={ProjectDetail} />
        <Route path="/land-owners" component={LandOwners} />
        <Route path="/institutional" component={Institutional} />
        <Route path="/contact" component={Contact} />
        <Route path="/privacy" component={Privacy} />
        <Route path="/credits" component={Credits} />
        <Route path="/thank-you" component={ThankYou} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter {...routerProps}>
          <OrganisationSchema />
          <ScrollToTop />
          <div className="paper-grain">
            <ReviewBanner />
            {/* The positioning context for the header, which is absolute so it
                sits over the dark hero band every page opens on. */}
            <div className="relative">
              <SiteHeader />
              <main id="main">
                <Routes />
              </main>
            </div>
            <SiteFooter />
          </div>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
