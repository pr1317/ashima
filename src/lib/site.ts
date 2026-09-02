/** Name, address and phone. These must match the Google Business Profile
 *  character for character — local SEO treats any variation as a different
 *  business. Change them here and nowhere else. */
export const NAP = {
  name: 'Ashima Engineering',
  street: '1 Aurobindo Road',
  locality: 'Santoshpur',
  city: 'Kolkata',
  region: 'West Bengal',
  postcode: '700075',
  country: 'IN',
  /** Confirmed. Must stay identical to the Google Business Profile. */
  phone: '+91 98300 53483',
  phoneIsPlaceholder: false,
  email: 'partha.rgc@gmail.com',
  emailIsPlaceholder: false,
  /** Open every day. Confirmed by the business; must match the Google
   *  Business Profile, which is what most people see first. */
  hours: 'Monday to Saturday, 10.30am to 8pm. Sunday, 11am to 5pm.',
  hoursShort: 'Open every day',
  /** The firm was founded in 1993. The first building, Prarthana in
   *  Santoshpur, was handed over in 1995 — which is where the project
   *  record starts. Do not collapse the two dates into one. */
  founded: '1993',
  firstDelivery: '1995',
  lat: 22.4966,
  lng: 88.3897,
} as const;

export const SITE_ORIGIN = 'https://www.ashimaengineering.in';

export const addressOneLine =
  `${NAP.street}, ${NAP.locality}, ${NAP.city}, ${NAP.region} ${NAP.postcode}`;

export const whatsappHref = (message: string) =>
  `https://wa.me/${NAP.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;

export const telHref = `tel:${NAP.phone.replace(/[^0-9+]/g, '')}`;

export const mailHref = `mailto:${NAP.email}`;

export const LOCALITY_LINE =
  'Santoshpur, Garfa, Jadavpur, Mukundapur, Baruipur, Sonarpur.';

export const AREAS_SERVED = [
  'Santoshpur', 'Garfa', 'Jadavpur', 'Mukundapur', 'Baruipur', 'Sonarpur',
] as const;

/** Review builds show a banner and the unverified-RERA styling. A launch
 *  build sets VITE_ASHIMA_LAUNCH=1 and turns both off — only once every live
 *  project carries a verified WBRERA number. `npm run build:launch` runs
 *  scripts/rera-guard.mjs first, which refuses to build until they do. */
export const IS_LAUNCH = import.meta.env.VITE_ASHIMA_LAUNCH === '1';

export const NAV = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/land-owners', label: 'Land owners' },
  { href: '/institutional', label: 'Institutional' },
  { href: '/contact', label: 'Contact' },
] as const;

export const RERA_PORTAL = 'https://rera.wb.gov.in';

export const mapsEmbed = (query: string) =>
  `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;

export const mapsDirections = (query: string) =>
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(query)}`;
