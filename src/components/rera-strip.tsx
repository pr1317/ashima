/* ============================================================================
   WBRERA COMPLIANCE STRIP — LEGALLY REQUIRED. DO NOT REMOVE OR HIDE.
   ----------------------------------------------------------------------------
   Legal basis: Section 11(2) of the Real Estate (Regulation and Development)
   Act 2016, read with WBRERA Order No. 492-RERA/L-01/2023 dated 07.03.2024.
   Every advertisement or publicity material for a registered project — the
   order expressly covers websites and social media — must carry the project's
   WBRERA registration number and the authority's website address.
   Non-compliance attracts a penalty of up to 5% of the estimated cost of the
   project, and the West Bengal Housing department surveys for it.

   Consequently, and against the ordinary instincts of a designer:
     * this element is never placed behind a hover, a tooltip, a popover, or a
       scroll-triggered reveal. Hover does not exist on touch, and touch is
       most of this audience. Nothing that renders it may be wrapped in
       <Reveal>.
     * it is never hidden at any breakpoint.
     * its font size is locked to one third of the project-name size in the
       same context, via the --rera-title custom property set below. If a
       heading scale changes later, this ratio follows it automatically. Do
       not replace it with a fixed size.
     * it is never rotated, faded, or overlapped.

   If you are here to make this smaller or quieter: don't. Talk to whoever
   files the RERA paperwork first.
   ========================================================================= */
import { useEffect, useId, useRef, useState } from 'react';
import { IS_LAUNCH, RERA_PORTAL } from '@/lib/site';

interface ReraStripProps {
  reraNumber: string;
  verified?: boolean;
  /** The CSS size of the project name in this context — pass the same
   *  expression the heading uses, not a literal, so the one-third ratio keeps
   *  tracking when the type scale moves. The strip renders at one third of it,
   *  floored at --step--2 for legibility. */
  titleSize?: string;
  explainer?: boolean;
  className?: string;
}

export function ReraStrip({
  reraNumber,
  verified = false,
  titleSize = 'var(--step-1)',
  explainer = false,
  className = '',
}: ReraStripProps) {
  return (
    <div className={`rera-wrap ${className}`}>
      <p className={`rera${verified ? '' : ' unverified'}`}
         style={{ '--rera-title': titleSize } as React.CSSProperties}
         data-testid="rera-strip">
        <span className="rera-label">WBRERA registration</span>
        <span className="rera-no" data-testid="rera-number">{reraNumber}</span>
        <a href={RERA_PORTAL} rel="noopener" target="_blank">www.rera.wb.gov.in</a>
        {!verified && !IS_LAUNCH && (
          <span className="rera-warn">
            Sample number, not yet verified against the WBRERA portal.
          </span>
        )}
      </p>
      {explainer && <ReraExplainer />}
    </div>
  );
}

/* The popover belongs HERE — on the explanation of what the number means —
   and never on the number itself, which must stay in plain sight. See the
   header comment above. */
function ReraExplainer() {
  const id = useId();
  const [open, setOpen] = useState(false);
  const popRef = useRef<HTMLDivElement | null>(null);
  const btnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    const onClick = (e: MouseEvent) => {
      const t = e.target as Node;
      if (!popRef.current?.contains(t) && !btnRef.current?.contains(t)) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('click', onClick);
    };
  }, [open]);

  return (
    <>
      <button ref={btnRef} type="button" className="rera-explainer"
              aria-expanded={open} aria-controls={id}
              onClick={() => setOpen((v) => !v)}
              data-testid="button-rera-explainer">
        What is this number?
      </button>
      <div ref={popRef} className="rera-pop" id={id} hidden={!open} role="dialog"
           aria-label="About WBRERA registration">
        <p>
          Every residential project sold in West Bengal has to be registered with
          the West Bengal Real Estate Regulatory Authority before it can be
          advertised. Registration means the promoter has filed the land title,
          the sanctioned plans, the completion timeline and the funding
          arrangement with the authority.
        </p>
        <p>
          You can type this number into the WBRERA portal and read the same
          documents we filed, including the date we have committed to for
          possession. Do that before you pay a booking amount, with any builder.
        </p>
        <p>
          <a href={RERA_PORTAL} rel="noopener" target="_blank">
            Check this project on rera.wb.gov.in
          </a>
        </p>
      </div>
    </>
  );
}
