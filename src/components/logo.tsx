/** The Ashima mark: a shutter-louvre pediment over the A of the wordmark, on
 *  a plinth of three courses. Drawn as a vector in currentColor so it takes
 *  the colour of whatever it sits on — plaster ground in the header,
 *  shutter-green in the footer — rather than fighting it as a fixed-colour
 *  raster would.
 *
 *  The wordmark width is pinned with textLength + lengthAdjust="spacing".
 *  That is what holds the constraint that the text is never wider than the
 *  base of the mark, regardless of which font has loaded, or whether the
 *  webfont has loaded at all. Do not remove those attributes. */

const Pediment = () => (
  <>
    <path d="M54 0 3 35h51z" opacity=".78" />
    <path d="M54 0v35h51z" />
    <rect x="1.5" y="36.5" width="105" height="6.5" />
    <rect x="50.2" y="43" width="7.6" height="48.7" />
    <path d="M34.4 43h7.6L17.2 91.7H9.6z" />
    <path d="M66 43h7.6l24.8 48.7h-7.6z" />
    <rect x="9" y="68.6" width="90" height="5.3" />
    <rect x="1.5" y="91.7" width="29" height="8.3" />
    <rect x="39.5" y="91.7" width="29" height="8.3" />
    <rect x="77.5" y="91.7" width="29" height="8.3" />
  </>
);

interface LogoProps {
  variant?: 'stacked' | 'horizontal' | 'mark';
  className?: string;
}

export function Logo({ variant = 'stacked', className = '' }: LogoProps) {
  if (variant === 'mark') {
    return (
      <svg className={className} viewBox="0 0 108 100" role="img"
           aria-label="Ashima Engineering" focusable="false">
        <g fill="currentColor"><Pediment /></g>
      </svg>
    );
  }

  if (variant === 'horizontal') {
    return (
      <svg className={className} viewBox="0 0 246 76" role="img"
           aria-label="Ashima Engineering" focusable="false">
        <g fill="currentColor" transform="translate(0,7) scale(0.62)"><Pediment /></g>
        <rect x="79" y="12" width="1" height="52" fill="currentColor" opacity=".28" />
        <text x="93" y="40" textLength="150" lengthAdjust="spacing"
              fontSize="30" fontWeight="500" fill="currentColor"
              className="logo-word">ASHIMA</text>
        <text x="93" y="64" textLength="150" lengthAdjust="spacing"
              fontSize="17" fontWeight="400" fill="currentColor"
              className="logo-word">ENGINEERING</text>
      </svg>
    );
  }

  return (
    <svg className={className} viewBox="0 0 108 149" role="img"
         aria-label="Ashima Engineering" focusable="false">
      <g fill="currentColor"><Pediment /></g>
      <text x="54" y="128" textAnchor="middle" textLength="100" lengthAdjust="spacing"
            fontSize="22" fontWeight="500" fill="currentColor"
            className="logo-word">ASHIMA</text>
      <text x="54" y="146" textAnchor="middle" textLength="97" lengthAdjust="spacing"
            fontSize="11.5" fontWeight="400" fill="currentColor"
            className="logo-word">ENGINEERING</text>
    </svg>
  );
}
