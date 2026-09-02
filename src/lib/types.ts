/** Shapes mirroring the Zod schemas in the content collections. The data
 *  modules under src/data are generated from the markdown by
 *  scripts/gen-content.mjs and are typed against these. */

export const LOCALITIES = [
  'Santoshpur', 'Garfa', 'Jadavpur', 'Mukundapur',
  'Baruipur', 'Sonarpur', 'Kasba', 'Haltu',
] as const;

export type Locality = (typeof LOCALITIES)[number];

export type Status = 'available' | 'under-construction' | 'completed' | 'sold-out';

/** A project is "live" — legally an advertisement for a registered project —
 *  when it is open for booking or being built. Live projects must display
 *  their WBRERA number; see src/components/rera-strip.tsx. */
export const LIVE_STATUSES: readonly Status[] = ['available', 'under-construction'];

export const STATUS_LABELS: Record<Status, string> = {
  available: 'Open for booking',
  'under-construction': 'Under construction',
  completed: 'Handed over',
  'sold-out': 'Sold out',
};

export interface ProjectImage {
  src: string;
  alt: string;
  /** true while this is a stand-in photograph awaiting the real one. */
  standIn: boolean;
}

export interface Project {
  id: string;
  name: string;
  locality: Locality;
  status: Status;
  reraNumber: string | null;
  /** Set true only once the number has been checked against the WBRERA portal. */
  reraVerified: boolean;
  yearCompleted: number | null;
  possessionDate: string | null;
  unitTypes: string[];
  carpetAreaMin: number | null;
  carpetAreaMax: number | null;
  totalUnits: number | null;
  unitsAvailable: number | null;
  floors: number | null;
  address: string | null;
  lat: number | null;
  lng: number | null;
  specifications: Record<string, string> | null;
  amenities: string[];
  nearby: string | null;
  images: ProjectImage[];
  featured: boolean;
  summary: string;
  /** Draft copy written for review, not supplied by the business. */
  copyIsDraft: boolean;
  /** The markdown body, split into paragraphs. */
  body: string[];
}

export interface InstitutionalClient {
  id: string;
  organisation: string;
  scope: string;
  year: string;
  status: string;
  order: number;
  copyIsDraft: boolean;
}

export interface ImageCredit {
  file: string;
  purpose: string;
  title: string;
  author: string;
  licence: string;
  source: string;
}

export const isLive = (p: Project) => LIVE_STATUSES.includes(p.status);
