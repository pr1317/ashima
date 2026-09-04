import { LOCALITIES, type Locality } from '@/lib/types';

/** The area picker on /projects: a schematic map of the eight South Kolkata
 *  localities the firm builds in, and a button for each.
 *
 *  WHY A DRAWING AND NOT A REAL MAP. A tile map would mean an external
 *  dependency, third-party requests on every page load, and a rectangle of
 *  someone else's colours in the middle of the page. What a visitor actually
 *  needs here is orientation — is this near me, is it north or south of
 *  Jadavpur — which a diagram answers better than a street map, and it costs
 *  nothing to load.
 *
 *  IT IS NOT TO SCALE, and the page says so. Baruipur is about fifteen
 *  kilometres south of Kasba while the six localities between them sit within
 *  three, so a true projection would pile six dots on top of each other and
 *  strand one at the bottom. The positions below are hand-placed to hold the
 *  real compass relationships — Jadavpur west of Garfa, Mukundapur east of
 *  Santoshpur, Sonarpur and Baruipur away to the south-east — with the
 *  distances eased so every locality can be read and hit with a thumb.
 *
 *  ACCESSIBILITY. The dots respond to pointer input only: they are not focus
 *  stops and the drawing is hidden from assistive technology. Nothing is lost,
 *  because the row of real buttons underneath sets the same state and carries
 *  the same counts. Two tab stops for every locality, one of them an SVG node
 *  announcing a coordinate, would be worse than one good one. */

interface Node {
  key: Locality;
  x: number;
  y: number;
  /** Which side of the dot the label sits on, so labels never collide. */
  side: 'left' | 'right';
}

/* Wider than the node field so the right-hand labels — Mukundapur, Sonarpur,
   Baruipur — have room to run without touching the frame. */
const VIEW = { w: 360, h: 390 };

const NODES: Node[] = [
  { key: 'Kasba', x: 150, y: 48, side: 'left' },
  { key: 'Haltu', x: 196, y: 96, side: 'right' },
  { key: 'Garfa', x: 150, y: 140, side: 'right' },
  { key: 'Jadavpur', x: 88, y: 162, side: 'left' },
  { key: 'Santoshpur', x: 118, y: 214, side: 'left' },
  { key: 'Mukundapur', x: 222, y: 196, side: 'right' },
  { key: 'Sonarpur', x: 248, y: 286, side: 'right' },
  { key: 'Baruipur', x: 262, y: 354, side: 'right' },
];

/** The Bypass, running down the east side past Mukundapur and on towards
 *  Sonarpur and Baruipur. Drawn because it is how people here describe where
 *  something is. */
const BYPASS = 'M 240 6 C 234 70, 228 140, 222 196 C 218 234, 236 262, 248 286 C 256 310, 260 330, 262 384';
/** The roads inland of it — Santoshpur up through Garfa to Kasba, with
 *  Jadavpur and Haltu joining at Garfa. The other way everything here gets
 *  described. */
const LOCAL = [
  'M 118 214 C 128 190, 140 166, 150 140 C 154 110, 152 76, 150 48',
  'M 88 162 C 108 156, 130 150, 150 140',
  'M 150 140 C 168 126, 184 110, 196 96',
];

/** Dot radius grows with the number of buildings, but gently — the point is to
 *  show where the work is concentrated, not to make Kasba invisible. */
const radius = (n: number) => 5 + Math.sqrt(n) * 2.6;

export interface LocalityMapProps {
  /** Buildings per locality, across every status. */
  counts: Record<string, number>;
  /** The selected locality, or 'all'. */
  value: string;
  onChange: (key: string) => void;
}

export function LocalityMap({ counts, value, onChange }: LocalityMapProps) {
  const total = LOCALITIES.reduce((n, l) => n + (counts[l] ?? 0), 0);

  /* The map column is sized to the drawing itself rather than to half the band,
     so the buttons sit beside it instead of across a gap. */
  return (
    <div className="grid gap-7 lg:grid-cols-[minmax(0,440px)_minmax(0,1fr)] lg:items-center lg:gap-16">
      {/* ---- the drawing ------------------------------------------------- */}
      <div className="relative mx-auto w-full max-w-[440px] overflow-hidden rounded-[var(--radius)] border border-[hsl(var(--border))] bg-[hsl(var(--card))] lg:mx-0">
        <svg viewBox={`0 0 ${VIEW.w} ${VIEW.h}`} aria-hidden="true" focusable="false"
             className="block w-full" data-testid="locality-map">
          <defs>
            <pattern id="lm-grid" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M 32 0 L 0 0 0 32" fill="none"
                    stroke="hsl(var(--border))" strokeWidth="1" opacity=".55" />
            </pattern>
          </defs>

          <rect width={VIEW.w} height={VIEW.h} fill="url(#lm-grid)" />

          <path d={BYPASS} fill="none" stroke="hsl(var(--border))" strokeWidth="7"
                strokeLinecap="round" />
          {LOCAL.map((d) => (
            <path key={d} d={d} fill="none" stroke="hsl(var(--border))" strokeWidth="5"
                  strokeLinecap="round" />
          ))}

          <text x={258} y={26} textAnchor="start" className="lm-road">Bypass</text>

          {NODES.map((n) => {
            const count = counts[n.key] ?? 0;
            const on = value === n.key;
            const r = radius(count);
            const dx = n.side === 'right' ? r + 9 : -(r + 9);
            return (
              <g key={n.key} onClick={() => onChange(on ? 'all' : n.key)}
                 className="cursor-pointer" data-testid={`map-node-${n.key}`}>
                {/* An invisible disc so a thumb has something generous to hit.
                    The floor is set from the narrowest phone: at 320px the map
                    draws 278px wide, so a viewBox unit is 0.77 CSS px and a
                    radius of 29 gives a 44px target — the accessible minimum.
                    It stops short of 30, where the Jadavpur and Santoshpur
                    discs (60 units apart) would start to overlap and steal
                    each other's taps. */}
                <circle cx={n.x} cy={n.y} r={Math.max(r + 16, 29)} fill="transparent" />
                <circle cx={n.x} cy={n.y} r={r + 6} fill="hsl(var(--accent))"
                        opacity={on ? 0.18 : 0} className="lm-halo" />
                <circle cx={n.x} cy={n.y} r={r}
                        fill={on ? 'hsl(var(--accent))' : 'hsl(var(--primary))'}
                        className="lm-dot" />
                <text x={n.x} y={n.y + 3.5} textAnchor="middle" className="lm-count">
                  {count}
                </text>
                <text x={n.x + dx} y={n.y + 4}
                      textAnchor={n.side === 'right' ? 'start' : 'end'}
                      className={on ? 'lm-label lm-label-on' : 'lm-label'}>
                  {n.key}
                </text>
              </g>
            );
          })}

          {/* North, so the drawing reads as a map rather than a chart. */}
          <g transform="translate(30 32)">
            <path d="M 0 12 L 0 -12 M -5 -6 L 0 -12 L 5 -6" fill="none"
                  stroke="hsl(var(--muted-foreground))" strokeWidth="1.5"
                  strokeLinecap="round" strokeLinejoin="round" />
            <text x={0} y={26} textAnchor="middle" className="lm-road">N</text>
          </g>
        </svg>

        <p className="border-t border-[hsl(var(--border))] px-4 py-2.5 u-micro text-[hsl(var(--muted-foreground))]">
          Schematic · not to scale
        </p>
      </div>

      {/* ---- the buttons, which are the real control --------------------- */}
      <div>
        <div role="group" aria-label="Filter projects by area"
             className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-2">
          <AreaButton label="All areas" count={total} on={value === 'all'}
                      testid="area-all" onClick={() => onChange('all')} />
          {NODES.map((n) => (
            <AreaButton key={n.key} label={n.key} count={counts[n.key] ?? 0}
                        on={value === n.key} testid={`area-${n.key}`}
                        onClick={() => onChange(value === n.key ? 'all' : n.key)} />
          ))}
        </div>
        <p className="mt-5 t-sm t-wide text-[hsl(var(--muted-foreground))]">
          Everything is within about eight kilometres of the office in
          Santoshpur, apart from Sonarpur and Baruipur, which are further south
          down the Bypass.
        </p>
      </div>
    </div>
  );
}

function AreaButton({ label, count, on, onClick, testid }: {
  label: string; count: number; on: boolean; onClick: () => void; testid: string;
}) {
  return (
    <button type="button" aria-pressed={on} onClick={onClick} data-testid={testid}
            className={`flex min-h-13 items-center justify-between gap-2 rounded-[var(--radius)] border px-4 text-left transition-colors ${
              on
                ? 'border-[hsl(var(--primary))] bg-[hsl(var(--primary))] text-[hsl(var(--card))]'
                : 'border-[hsl(var(--border))] bg-[hsl(var(--card))] text-[hsl(var(--primary))]'}`}>
      <span className="t-sm t-wide">{label}</span>
      <span className={`u-micro tabular-nums ${
        on ? 'text-[hsl(var(--card))]/65' : 'text-[hsl(var(--muted-foreground))]'}`}>
        {count}
      </span>
    </button>
  );
}
