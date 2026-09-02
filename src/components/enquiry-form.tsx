/* Netlify Forms. Because this is a single-page app, Netlify's build-time
 * parser cannot see a form React renders at runtime — so a static copy of
 * every form name below is declared in index.html for detection, and the
 * submission itself is posted as urlencoded data to the site root.
 *
 * The honeypot is the only spam measure; it needs no cookie banner, which is
 * why there is no reCAPTCHA here. */
import { useState, type FormEvent } from 'react';
import { useLocation } from 'wouter';
import { Send } from 'lucide-react';
import { Link } from 'wouter';

export const FORM_NAMES = ['home-enquiry', 'contact-enquiry', 'project-enquiry'] as const;
export type FormName = (typeof FORM_NAMES)[number];

interface EnquiryFormProps {
  name?: FormName;
  subject?: string;
  compact?: boolean;
  /** Dark ground — the fields invert. */
  onDark?: boolean;
}

export function EnquiryForm({
  name = 'contact-enquiry', subject = '', compact = false, onDark = false,
}: EnquiryFormProps) {
  const [, navigate] = useLocation();
  const [state, setState] = useState<'idle' | 'sending' | 'error'>('idle');

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    // Honeypot: a bot fills every field it finds, a person never sees this one.
    if (data.get('company-website')) { navigate('/thank-you'); return; }
    setState('sending');
    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data as unknown as Record<string, string>).toString(),
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      navigate('/thank-you');
    } catch {
      setState('error');
    }
  };

  return (
    <form className="grid max-w-xl gap-6" name={name} method="POST"
          data-netlify="true" data-netlify-honeypot="company-website"
          onSubmit={onSubmit} id="enquire" data-testid={`form-${name}`}>
      <input type="hidden" name="form-name" value={name} />
      {subject && <input type="hidden" name="about" value={subject} />}
      <p className="hp">
        <label>Leave this field empty
          <input name="company-website" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="field">
          <label htmlFor={`${name}-n`}>Your name</label>
          <input id={`${name}-n`} name="name" type="text" required autoComplete="name"
                 placeholder="What should we call you?"
                 data-testid={`input-${name}-name`} />
        </div>
        <div className="field">
          <label htmlFor={`${name}-p`}>Phone</label>
          <input id={`${name}-p`} name="phone" type="tel" required autoComplete="tel"
                 inputMode="tel" pattern="[0-9+ ()-]{8,}" placeholder="+91"
                 data-testid={`input-${name}-phone`} />
        </div>
      </div>

      {!compact && (
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="field">
            <label htmlFor={`${name}-e`}>Email <span className="normal-case tracking-normal">(optional)</span></label>
            <input id={`${name}-e`} name="email" type="email" autoComplete="email"
                   placeholder="you@example.com" data-testid={`input-${name}-email`} />
          </div>
          <div className="field">
            <label htmlFor={`${name}-i`}>What is this about?</label>
            <select id={`${name}-i`} name="interest" defaultValue="buying"
                    data-testid={`select-${name}-interest`}>
              <option value="buying">Buying a flat</option>
              <option value="land">I own land in South Kolkata</option>
              <option value="institutional">Institutional or tender enquiry</option>
              <option value="other">Something else</option>
            </select>
          </div>
        </div>
      )}

      <div className="field">
        <label htmlFor={`${name}-m`}>What are you looking for?</label>
        <textarea id={`${name}-m`} name="message" rows={4}
                  placeholder={subject ? `About ${subject}` : 'Locality, number of bedrooms, roughly when.'}
                  data-testid={`textarea-${name}-message`} />
      </div>

      <button type="submit" disabled={state === 'sending'}
              className={`group mt-2 flex w-full items-center justify-between px-5 py-4 u-label transition-transform hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--secondary))] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-60 ${
                onDark
                  ? 'bg-[hsl(var(--secondary))] text-[hsl(var(--primary))] focus-visible:ring-offset-[hsl(var(--primary))]'
                  : 'bg-[hsl(var(--primary))] text-[hsl(var(--card))] focus-visible:ring-offset-[hsl(var(--background))]'}`}
              data-testid={`button-submit-${name}`}>
        {state === 'sending' ? 'Sending…' : 'Send your enquiry'}
        <Send size={16} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
      </button>

      {state === 'error' && (
        <p className={`t-sm font-semibold ${onDark ? 'text-[hsl(var(--secondary))]' : 'text-[hsl(var(--accent))]'}`}
           role="alert" data-testid="text-form-error">
          That did not go through. Please call us instead — the number is in the
          footer of every page.
        </p>
      )}

      <p className={`t-fine max-w-sm ${onDark ? 'text-[hsl(var(--card))]/72' : 'text-[hsl(var(--muted-foreground))]'}`}>
        We use what you send here to call you back and nothing else. See the{' '}
        <Link href="/privacy" className="underline underline-offset-2 hover:text-[hsl(var(--accent))]">
          privacy notice
        </Link>.
      </p>
    </form>
  );
}
