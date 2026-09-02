import type { ReactNode } from 'react';
import { Reveal } from '@/components/reveal';

type Tone = 'light' | 'card' | 'dark' | 'gold' | 'terracotta';

const GROUNDS: Record<Tone, string> = {
  light: 'bg-[hsl(var(--background))]',
  card: 'bg-[hsl(var(--card))]',
  dark: 'on-dark bg-[hsl(var(--primary))] text-[hsl(var(--card))]',
  gold: 'bg-[hsl(var(--secondary))] text-[hsl(var(--primary))]',
  terracotta: 'on-dark bg-[hsl(var(--accent))] text-[hsl(var(--card))]',
};

/** The eyebrow rule and label take the ground's accent: brass on the dark and
 *  terracotta grounds, terracotta on the light ones. */
const EYEBROWS: Record<Tone, string> = {
  light: 'text-[hsl(var(--accent))]',
  card: 'text-[hsl(var(--accent))]',
  dark: 'text-[hsl(var(--secondary))]',
  gold: 'text-[hsl(var(--primary))]',
  terracotta: 'text-[hsl(var(--card))]/85',
};

const RULES: Record<Tone, string> = {
  light: 'bg-[hsl(var(--accent))]',
  card: 'bg-[hsl(var(--accent))]',
  dark: 'bg-[hsl(var(--secondary))]',
  gold: 'bg-[hsl(var(--primary))]',
  terracotta: 'bg-[hsl(var(--secondary))]',
};

interface SectionProps {
  children: ReactNode;
  /** The numbered label, e.g. "01 / The name". */
  eyebrow?: string;
  id?: string;
  tone?: Tone;
  className?: string;
  /** Tight vertical rhythm, for a section that continues the one above it. */
  tight?: boolean;
}

export function Section({
  children, eyebrow, id, tone = 'light', className = '', tight = false,
}: SectionProps) {
  return (
    <section id={id}
             className={`${GROUNDS[tone]} ${tight ? 'py-16 lg:py-20' : 'py-24 lg:py-32'} ${className}`}
             data-testid={id ? `section-${id}` : undefined}>
      <div className="mx-auto w-full max-w-[1380px] px-6 lg:px-12">
        {eyebrow && (
          <Reveal>
            <div className={`u-eyebrow ${EYEBROWS[tone]}`}>
              <span className={`mb-4 block h-px w-12 ${RULES[tone]}`} />
              {eyebrow}
            </div>
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}

/** A heading in the display face, with the italic emphasis the design leans on.
 *  Pass the emphasised words as `em`. */
export function DisplayHeading({
  children, em, after, className = '', as: Tag = 'h2',
}: {
  children?: ReactNode; em?: ReactNode; after?: ReactNode;
  className?: string; as?: 'h1' | 'h2' | 'h3';
}) {
  return (
    <Tag className={`font-display ${className}`}>
      {children}
      {em && <><br /><em>{em}</em></>}
      {after && <><br />{after}</>}
    </Tag>
  );
}
