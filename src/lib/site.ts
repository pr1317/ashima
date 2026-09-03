import { settings } from '@/data/settings';

/** Name, address and phone. These must match the Google Business Profile
 *  character for character — local SEO treats any variation as a different
 *  business, and a phone number that differs by a space is a different
 *  number as far as the listing is concerned.
 *
 *  The changeable half now comes from content/settings.json, which the CMS
 *  writes, so an editor can correct the opening hours without a developer.
 *  What stays here is what is not an editorial decision: the legal name, the
 *  country code, and the two placeholder flags, which describe whether the
 *  contact details are real rather than what they say. */
export const NAP = {
  name: 'Ashima Engineering',
  street: settings.street,
  locality: settings.locality,
  city: settings.city,
  region: settings.region,
  postcode: settings.postcode,
  country: 'IN',
  phone: settings.phone,
  phoneIsPlaceholder: false,
  email: settings.email,
  emailIsPlaceholder: false,
  hours: settings.hours,
  hoursShort: settings.hoursShort,
  openingHoursSchema: settings.openingHoursSchema,
  /** The firm was founded in 1993. The first building, Prarthana in
   *  Santoshpur, was handed over in 1995 — which is where the project
   *  record starts. Do not collapse the two dates into one. */
  founded: settings.founded,
  firstDelivery: settings.firstDelivery,
  lat: settings.lat,
  lng: settings.lng,
} as const;

/** The apex, with no www — this is the host Netlify actually serves and the
 *  one the domain is set to. It has to match exactly: it is the base for every
 *  canonical tag, the sitemap and the schema.org record, so a www here would
 *  point search engines at an address the site does not answer on. */
export const SITE_ORIGIN = 'https://ashimaengineering.in';

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
