import { MessageCircle, Phone } from 'lucide-react';
import { NAP, telHref, whatsappHref } from '@/lib/site';

/** Fixed to the bottom of the screen on phones only.
 *
 *  Most people reach this site on a phone, and what they want from a builder is
 *  to talk to somebody — not to read to the end of a page and hope there is a
 *  number there. The bar keeps both ways of doing that one thumb away from
 *  wherever they have got to.
 *
 *  It is hidden from lg upwards, where the header already carries the number,
 *  and the footer reserves space for it so the last line of the page is never
 *  trapped underneath. */
export function CallBar() {
  return (
    <div data-testid="call-bar"
         className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-px border-t border-[hsl(var(--border))] bg-[hsl(var(--border))] pb-[env(safe-area-inset-bottom)] lg:hidden">
      <a href={telHref} data-testid="link-callbar-phone"
         className="flex min-h-14 items-center justify-center gap-2 bg-[hsl(var(--card))] u-label text-[hsl(var(--primary))]">
        <Phone size={16} aria-hidden="true" /> Call
      </a>
      <a href={whatsappHref(`Hello, I saw the Ashima Engineering website and wanted to ask about a flat.`)}
         data-testid="link-callbar-whatsapp"
         className="flex min-h-14 items-center justify-center gap-2 bg-[hsl(var(--accent))] u-label text-[hsl(var(--accent-foreground))]">
        <MessageCircle size={16} aria-hidden="true" /> WhatsApp
      </a>
      <span className="sr-only">Call {NAP.phone}</span>
    </div>
  );
}
