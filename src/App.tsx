import { type ReactNode, useEffect, useRef, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  ArrowDown,
  ArrowUpRight,
  Building2,
  CheckCircle2,
  ChevronRight,
  Hammer,
  Mail,
  MapPin,
  Menu,
  Phone,
  Send,
  Trees,
  X,
} from 'lucide-react';
import { ErrorBoundary } from '@/components/error-boundary';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();

const enquirySchema = z.object({
  name: z.string().trim().min(2, 'Please tell us your name'),
  phone: z.string().trim().min(8, 'Please enter a valid phone number'),
  email: z.string().trim().email('Please enter a valid email').or(z.literal('')),
  project: z.string().min(1, 'Please choose a project'),
  message: z.string().trim().min(8, 'A little more detail would help us prepare'),
});

type EnquiryValues = z.infer<typeof enquirySchema>;

const projects = [
  {
    id: 'sraboni-court',
    name: 'Sraboni Court',
    location: 'Mukundapur',
    status: 'Open for booking',
    detail: 'A quiet collection of 2 & 3 BHK homes, shaped around light, breeze and an everyday courtyard.',
    image: '/sraboni-court.jpg',
    tone: 'light',
  },
  {
    id: 'barnali-apartments',
    name: 'Barnali Apartments',
    location: 'Garfa',
    status: 'Under construction',
    detail: 'Thoughtful family apartments with generous windows and the familiar green of South Kolkata outside.',
    image: '/barnali-apartments.jpg',
    tone: 'dark',
  },
];

const neighbourhoods = ['Santoshpur', 'Garfa', 'Jadavpur', 'Mukundapur', 'Baruipur', 'Sonarpur'];

function useReveal() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.14 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, className: `reveal${visible ? ' is-visible' : ''}` };
}

function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const reveal = useReveal();
  return <div ref={reveal.ref} className={`${reveal.className} ${className}`}>{children}</div>;
}

function AshimaLogo({ footer = false }: { footer?: boolean }) {
  return (
    <div className={`logo-lockup ${footer ? 'logo-lockup-footer' : ''}`} aria-label="Ashima Engineering">
      <svg className="logo-mark text-[hsl(var(--secondary))]" viewBox="0 0 76 68" fill="none" role="img" aria-hidden="true">
        <path d="M38 4 5 27h66L38 4Z" fill="currentColor" />
        <path d="M9 31h58M19 31 11 61h54L57 31M29 31l-5 30M47 31l5 30M6 64h64" stroke="currentColor" strokeWidth="4" strokeLinecap="square" strokeLinejoin="miter" />
      </svg>
      <span className="logo-type">
        {!footer && <span className="hero-gold logo-since font-ui">Since 1995</span>}
        <span className="logo-name font-ui">Ashima</span>
        <span className="logo-subtitle font-ui">Engineering</span>
      </span>
    </div>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [
    { label: 'Our homes', href: '#homes' },
    { label: 'About Ashima', href: '#about-name' },
    { label: 'How we work', href: '#about-commitments' },
    { label: 'Founder', href: '#about-founder' },
  ];

  return (
    <header className="absolute top-0 z-40 w-full text-[hsl(var(--card))]" data-testid="site-header">
      <div className="mx-auto flex max-w-[1380px] items-center justify-between px-6 py-6 lg:px-12">
        <a href="#top" className="group" data-testid="link-logo">
          <AshimaLogo />
        </a>

        <nav className="hidden items-center gap-9 md:flex" aria-label="Main navigation">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="nav-link font-ui text-[10px] uppercase tracking-[0.17em] text-[hsl(var(--card))]/80 hover:text-[hsl(var(--card))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--secondary))]" data-testid={`link-nav-${link.label.toLowerCase().replaceAll(' ', '-')}`}>
              {link.label}
            </a>
          ))}
          <a href="#enquiry" className="flex items-center gap-2 border border-[hsl(var(--secondary))] px-4 py-3 font-ui text-[10px] uppercase tracking-[0.16em] text-[hsl(var(--secondary))] transition-colors hover:bg-[hsl(var(--secondary))] hover:text-[hsl(var(--primary))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--secondary))]" data-testid="link-header-enquiry">
            Start a conversation <ArrowUpRight size={14} />
          </a>
        </nav>

        <button type="button" className="flex h-11 w-11 items-center justify-center border border-[hsl(var(--card))]/35 md:hidden" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} onClick={() => setMenuOpen((open) => !open)} data-testid="button-mobile-menu">
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {menuOpen && (
        <nav className="mx-5 border border-[hsl(var(--card))]/20 bg-[hsl(var(--primary))]/95 p-5 backdrop-blur md:hidden" aria-label="Mobile navigation" data-testid="mobile-navigation">
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="flex items-center justify-between border-b border-[hsl(var(--card))]/15 py-4 font-ui text-[11px] uppercase tracking-[0.15em] text-[hsl(var(--card))]" data-testid={`link-mobile-${link.label.toLowerCase().replaceAll(' ', '-')}`}>
              {link.label}<ChevronRight size={15} />
            </a>
          ))}
          <a href="#enquiry" onClick={() => setMenuOpen(false)} className="mt-4 flex items-center gap-2 bg-[hsl(var(--secondary))] px-4 py-3 font-ui text-[10px] uppercase tracking-[0.14em] text-[hsl(var(--primary))]" data-testid="link-mobile-enquiry">
            Start a conversation <ArrowUpRight size={14} />
          </a>
        </nav>
      )}
    </header>
  );
}

function Hero() {
  const heroImageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let frame = 0;
    const updateParallax = () => {
      frame = 0;
      if (heroImageRef.current) {
        heroImageRef.current.style.transform = `translate3d(0, ${Math.min(window.scrollY * 0.12, 72)}px, 0) scale(1.04)`;
      }
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateParallax);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section id="top" className="relative flex min-h-[720px] items-end overflow-hidden bg-[hsl(var(--primary))] text-[hsl(var(--card))] lg:min-h-[800px]" data-testid="section-hero">
      <div className="absolute inset-0 bg-[linear-gradient(90deg,hsl(154_28%_10%/.86)_0%,hsl(154_28%_12%/.62)_43%,hsl(154_28%_12%/.12)_100%),linear-gradient(0deg,hsl(154_28%_10%/.84),transparent_60%)]" />
      <div ref={heroImageRef} className="absolute inset-0 bg-cover bg-center opacity-80 mix-blend-luminosity will-change-transform" style={{ backgroundImage: "url('/ashima-hero.jpg')" }} aria-hidden="true" />
      <div className="absolute -right-20 top-32 h-72 w-72 rounded-full border border-[hsl(var(--secondary))]/25 lg:right-24 lg:top-40" />
      <div className="absolute -right-10 top-44 h-52 w-52 rounded-full border border-[hsl(var(--secondary))]/15 lg:right-36" />
      <div className="relative z-10 mx-auto w-full max-w-[1380px] px-6 pb-12 pt-48 lg:px-12 lg:pb-20">
        <div className="max-w-3xl">
          <Reveal className="reveal-delay-1">
            <div className="hero-eyebrow hero-gold mb-7 inline-flex items-center gap-3 font-ui text-[10.5px] uppercase tracking-[0.22em]">
              <span className="h-px w-10 bg-[hsl(var(--secondary))]" />
              Homes with a local address
            </div>
          </Reveal>
          <Reveal className="reveal-delay-2">
            <h1 className="font-display text-[clamp(4rem,9vw,8.5rem)] leading-[.83] tracking-[-.045em]">
              Built for<br /><em>your kind</em><br />of living.
            </h1>
          </Reveal>
          <Reveal className="reveal-delay-3">
            <div className="mt-10 flex max-w-xl flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
              <p className="max-w-sm text-sm leading-7 text-[hsl(var(--card))]/72">
                For three decades, we have built in the neighbourhoods we know by heart. Smaller homes. Longer conversations. A little more care in every corner.
              </p>
              <a href="#homes" className="hero-gold group flex shrink-0 items-center gap-4 font-ui text-[10px] uppercase tracking-[0.18em]" data-testid="link-hero-explore">
                Explore our homes
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[hsl(var(--secondary))] transition-transform duration-300 group-hover:translate-y-1"><ArrowDown size={16} /></span>
              </a>
            </div>
          </Reveal>
        </div>
      </div>
      <div className="absolute bottom-7 right-6 hidden items-center gap-3 font-ui text-[9px] uppercase tracking-[0.18em] text-[hsl(var(--card))]/55 lg:right-12 lg:flex">
        <span className="h-px w-14 bg-[hsl(var(--card))]/35" /> South Kolkata · West Bengal
      </div>
    </section>
  );
}

function Introduction() {
  return (
    <section id="about-name" className="bg-[hsl(var(--background))] py-24 lg:py-36" data-testid="section-about-name">
      <div className="mx-auto grid max-w-[1380px] gap-12 px-6 lg:grid-cols-[1fr_1.6fr] lg:gap-20 lg:px-12">
        <Reveal>
          <div className="font-ui text-[10px] uppercase tracking-[0.2em] text-[hsl(var(--accent))]">
            <span className="mb-4 block h-px w-12 bg-[hsl(var(--accent))]" />01 / The name
          </div>
        </Reveal>
        <Reveal className="reveal-delay-1">
          <h2 className="max-w-4xl font-display text-[clamp(3rem,6.4vw,7.4rem)] leading-[.88] tracking-[-.04em] text-[hsl(var(--primary))]">
            The name is<br /><span className="text-[hsl(var(--accent))]">a promise.</span>
          </h2>
          <div className="mt-10 max-w-2xl space-y-5 text-lg leading-8 text-[hsl(var(--muted-foreground))] lg:text-xl lg:leading-9">
            <p>Ashima is our founder’s mother. It is also close to <em>asīma</em>, the Sanskrit word for boundless — for something without edge or limit.</p>
            <p>Over thirty years of building homes, we have tried to work the same way: no corners cut because nobody would see it, no promises made that we cannot keep.</p>
            <p>Our first building went up in Santoshpur in 1995. It is called Prarthana, after our founder’s daughter. We have kept the habit since.</p>
          </div>
          <a href="#about-work" className="mt-9 inline-flex items-center gap-3 border-b border-[hsl(var(--primary))]/35 pb-2 font-ui text-[10px] uppercase tracking-[0.18em] text-[hsl(var(--primary))] transition-colors hover:border-[hsl(var(--accent))] hover:text-[hsl(var(--accent))]" data-testid="link-introduction-story">
            What we do <ArrowUpRight size={15} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

function Homes() {
  return (
    <section id="homes" className="bg-[hsl(var(--primary))] py-24 text-[hsl(var(--card))] lg:py-32" data-testid="section-homes">
      <div className="mx-auto max-w-[1380px] px-6 lg:px-12">
        <Reveal>
          <div className="flex flex-col justify-between gap-8 border-b border-[hsl(var(--card))]/20 pb-10 md:flex-row md:items-end">
            <div>
              <div className="mb-5 font-ui text-[10px] uppercase tracking-[0.2em] text-[hsl(var(--secondary))]">Current homes / In progress</div>
              <h2 className="font-display text-6xl leading-none tracking-[-.035em] md:text-8xl">A place to<br /><em>put down roots.</em></h2>
            </div>
            <p className="max-w-xs text-sm leading-6 text-[hsl(var(--card))]/62">Not a catalogue. Just two current chapters in our long South Kolkata story.</p>
          </div>
        </Reveal>
        <div className="mt-12 grid gap-7 lg:grid-cols-2">
          {projects.map((project, index) => (
            <Reveal key={project.id} className={index === 1 ? 'reveal-delay-1' : ''}>
              <article className="project-card group" data-testid={`card-project-${project.id}`}>
                <div className="relative aspect-[1.18] overflow-hidden bg-[hsl(var(--secondary))]/20">
                  <img src={project.image} alt={`${project.name} in ${project.location}`} className="project-image h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--primary))]/72 via-transparent to-transparent" />
                  <span className={`absolute left-5 top-5 flex items-center gap-2 px-3 py-2 font-ui text-[9px] uppercase tracking-[0.13em] ${project.tone === 'dark' ? 'bg-[hsl(var(--primary))] text-[hsl(var(--secondary))]' : 'bg-[hsl(var(--card))] text-[hsl(var(--primary))]'}`} data-testid={`status-project-${project.id}`}>
                    <span className="h-1.5 w-1.5 rounded-full bg-current" />{project.status}
                  </span>
                  <span className="absolute bottom-5 right-5 flex h-12 w-12 items-center justify-center rounded-full border border-[hsl(var(--card))]/65 text-[hsl(var(--card))] transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"><ArrowUpRight size={18} /></span>
                </div>
                <div className="flex flex-col justify-between gap-5 border-b border-[hsl(var(--card))]/20 py-6 sm:flex-row sm:items-start">
                  <div>
                    <h3 className="font-display text-4xl tracking-tight">{project.name}</h3>
                    <div className="mt-2 flex items-center gap-2 font-ui text-[10px] uppercase tracking-[0.15em] text-[hsl(var(--secondary))]"><MapPin size={12} />{project.location}</div>
                  </div>
                  <p className="max-w-xs text-sm leading-6 text-[hsl(var(--card))]/60">{project.detail}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Principles() {
  return (
    <section id="about-work" className="bg-[hsl(var(--secondary))] py-24 text-[hsl(var(--primary))] lg:py-32" data-testid="section-about-work">
      <div className="mx-auto max-w-[1380px] px-6 lg:px-12">
        <Reveal>
          <div className="grid gap-9 lg:grid-cols-[.8fr_1.8fr]">
            <div className="font-ui text-[10px] uppercase tracking-[0.2em]"><span className="mb-4 block h-px w-12 bg-[hsl(var(--primary))]" />02 / What we do</div>
            <div>
              <h2 className="max-w-4xl font-display text-[clamp(3rem,6vw,6.5rem)] leading-[.88] tracking-[-.04em]">Small buildings.<br /><em>Close to home.</em></h2>
              <p className="mt-8 max-w-2xl text-base leading-7 text-[hsl(var(--primary))]/70">Residential development in South Kolkata, largely on joint-venture terms with landowners; institutional and government contracts alongside.</p>
            </div>
          </div>
        </Reveal>
        <div className="mt-20 grid gap-8 border-t border-[hsl(var(--primary))]/25 pt-8 md:grid-cols-[1.15fr_.85fr] md:gap-16">
          <Reveal>
            <div className="flex gap-5">
              <Building2 size={27} strokeWidth={1.25} className="mt-1 shrink-0" />
              <div>
                <h3 className="font-display text-4xl leading-none">The shape of our work</h3>
                <p className="mt-5 max-w-2xl text-base leading-7 text-[hsl(var(--primary))]/70">The buildings are small. Eight flats, twelve, occasionally twenty. Four floors and a lift, covered parking at ground level, on plots between Santoshpur and Sonarpur.</p>
              </div>
            </div>
          </Reveal>
          <Reveal className="reveal-delay-1">
            <div className="border-l border-[hsl(var(--primary))]/25 pl-6">
              <div className="flex items-center gap-3 font-ui text-[10px] uppercase tracking-[0.16em]"><MapPin size={14} />A twenty-minute radius</div>
              <p className="mt-5 text-base leading-7 text-[hsl(var(--primary))]/70">We have never tried to become a company that builds towers. We work in the localities we can reach in twenty minutes.</p>
              <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 font-display text-xl italic">{neighbourhoods.map((place) => <span key={place}>{place}</span>)}</div>
            </div>
          </Reveal>
        </div>
        <div className="mt-14 flex flex-col gap-4 border-t border-[hsl(var(--primary))]/25 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3 font-ui text-[10px] uppercase tracking-[0.15em]"><Hammer size={14} /> Landowner partnerships</div>
          <div className="flex items-center gap-3 font-ui text-[10px] uppercase tracking-[0.15em]"><Building2 size={14} /> Institutional &amp; government work</div>
        </div>
      </div>
    </section>
  );
}

function HowWeWork() {
  const commitments = [
    ['01', 'One date for possession, in the agreement', 'Not a range, not a quarter. If we are going to miss it, you will hear it from us before you work it out yourself.'],
    ['02', 'Visit the site while it is being built', 'Without an appointment. Bring your own engineer if you want to.'],
    ['03', 'The agreement is what gets built', 'If a material has to change because something is unavailable, we tell you what and why before it goes in.'],
    ['04', 'We are still reachable after handover', 'The office has not moved since 1995 and the buildings are all within a few kilometres of it.'],
  ];
  return (
    <section id="about-commitments" className="bg-[hsl(var(--background))] py-24 lg:py-32" data-testid="section-about-commitments">
      <div className="mx-auto max-w-[1380px] px-6 lg:px-12">
        <Reveal>
          <div className="grid gap-9 lg:grid-cols-[.8fr_1.8fr]">
            <div className="font-ui text-[10px] uppercase tracking-[0.2em] text-[hsl(var(--accent))]"><span className="mb-4 block h-px w-12 bg-[hsl(var(--accent))]" />05 / How we work</div>
            <div>
              <h2 className="max-w-4xl font-display text-[clamp(3rem,6vw,6.5rem)] leading-[.88] tracking-[-.04em] text-[hsl(var(--primary))]">Plain words.<br /><em>Solid ground.</em></h2>
              <p className="mt-8 max-w-xl text-base leading-7 text-[hsl(var(--muted-foreground))]">The promises that make the process feel human — and the parts of building we refuse to leave vague.</p>
            </div>
          </div>
        </Reveal>
        <div className="mt-16 border-t border-[hsl(var(--border))]">
          {commitments.map(([number, title, body], index) => (
            <Reveal key={number} className={index > 0 ? `reveal-delay-${Math.min(index, 3)}` : ''}>
              <div className="grid gap-5 border-b border-[hsl(var(--border))] py-7 md:grid-cols-[80px_1.05fr_1fr] md:items-start md:gap-8 md:py-9">
                <span className="font-display text-3xl italic text-[hsl(var(--accent))]" data-testid={`text-commitment-number-${number}`}>{number}</span>
                <h3 className="max-w-md font-display text-3xl leading-[.95] text-[hsl(var(--primary))]" data-testid={`text-commitment-title-${number}`}>{title}</h3>
                <p className="max-w-md text-sm leading-6 text-[hsl(var(--muted-foreground))]" data-testid={`text-commitment-body-${number}`}>{body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Story() {
  return (
    <section id="about-founder" className="overflow-hidden bg-[hsl(var(--background))] py-24 lg:py-36" data-testid="section-about-founder">
      <div className="mx-auto grid max-w-[1380px] gap-16 px-6 lg:grid-cols-[.88fr_1.12fr] lg:items-center lg:gap-24 lg:px-12">
        <Reveal className="relative">
          <div className="relative aspect-[.82] overflow-hidden bg-[hsl(var(--muted))]">
            <img src="https://ashimaengineering.in/_astro/partha-pratim-roy.huUTR3jS_lEptY.jpg" alt="Partha Pratim Roy, founder of Ashima Engineering, at home in Kolkata" className="absolute inset-0 h-full w-full object-cover object-center grayscale-[.1]" />
            <div className="absolute inset-0 bg-[linear-gradient(150deg,hsl(154_28%_16%/.12),hsl(13_44%_49%/.3))]" />
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between border-t border-[hsl(var(--card))]/35 pt-4 text-[hsl(var(--card))]">
              <span className="font-ui text-[9px] uppercase tracking-[0.18em]">Ashima Engineering · Founder</span>
              <span className="font-display text-3xl italic">P. P. Roy</span>
            </div>
          </div>
          <div className="absolute -bottom-9 -right-4 hidden bg-[hsl(var(--accent))] p-6 text-[hsl(var(--card))] lg:block">
            <div className="font-display text-6xl leading-none">60<span className="text-4xl">+</span></div>
            <div className="mt-2 font-ui text-[9px] uppercase tracking-[0.15em]">homes delivered</div>
          </div>
        </Reveal>
        <Reveal className="reveal-delay-1">
          <div className="font-ui text-[10px] uppercase tracking-[0.2em] text-[hsl(var(--accent))]"><span className="mb-4 block h-px w-12 bg-[hsl(var(--accent))]" />06 / The founder</div>
          <h2 className="mt-8 font-display text-[clamp(3.2rem,6vw,6.8rem)] leading-[.87] tracking-[-.04em] text-[hsl(var(--primary))]">Partha<br />Pratim<br /><em>Roy.</em></h2>
          <div className="mt-10 max-w-xl space-y-5 text-base leading-7 text-[hsl(var(--muted-foreground))]">
            <p>He left an earlier business in 1995 and built Prarthana in Santoshpur, a small residential building on a plot belonging to a family who decided to develop rather than sell.</p>
            <p>Thirty years later, the office is still close to home — and the work is still personal.</p>
          </div>
          <div className="mt-10 border-t border-[hsl(var(--border))] pt-6">
            <div className="font-ui text-[10px] uppercase tracking-[0.16em] text-[hsl(var(--accent))]">Founder perspective · placeholder quote</div>
            <div className="mt-4 flex items-start gap-5">
              <span className="font-display text-4xl italic text-[hsl(var(--accent))]">“</span>
              <p className="max-w-sm font-display text-2xl leading-tight text-[hsl(var(--primary))]">A building is honest or it isn’t. You can tell by looking at the parts nobody photographs.</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Work() {
  const milestones = [
    ['1995', 'The first home', 'Partha Pratim Roy leaves an earlier business and builds Prarthana in Santoshpur, a small residential building on a plot belonging to a family who decided to develop rather than sell. Eight flats over three floors. It sets the pattern for everything after it.'],
    ['2000s', 'The local pattern', 'Santoshpur and Garfa fill in. The plots that come up are the ones where a family house has grown too large for the people still living in it. The work becomes almost entirely joint-venture, so the owner keeps flats in the new building instead of selling the land.'],
    ['2010s', 'Further south', 'The Bypass opens up Mukundapur and the localities further south, and the firm follows the road. Institutional and government work begins alongside residential building.'],
    ['Today', 'Still close to home', 'Sixty-plus delivered projects across Santoshpur, Garfa, Jadavpur, Mukundapur, Baruipur and Sonarpur. Residential development, largely on joint-venture terms with landowners, alongside institutional contracts.'],
  ];
  return (
    <section id="about-timeline" className="bg-[hsl(var(--card))] py-24 lg:py-32" data-testid="section-about-timeline">
      <div className="mx-auto max-w-[1380px] px-6 lg:px-12">
        <Reveal>
          <div className="grid gap-9 lg:grid-cols-[.8fr_1.8fr]">
            <div>
              <div className="mb-5 font-ui text-[10px] uppercase tracking-[0.2em] text-[hsl(var(--accent))]">04 / Thirty years</div>
              <h2 className="font-display text-[clamp(3rem,5.7vw,6.4rem)] leading-[.87] text-[hsl(var(--primary))]">A long<br /><em>memory.</em></h2>
            </div>
            <p className="max-w-xl text-base leading-7 text-[hsl(var(--muted-foreground))]">The places have changed. The scale has not. Here is the shape of Ashima Engineering, from the first eight-flat building to sixty-plus delivered projects.</p>
          </div>
        </Reveal>
        <div className="mt-16 border-t border-[hsl(var(--border))]">
          {milestones.map(([year, title, body], index) => (
            <Reveal key={year} className={`reveal-delay-${Math.min(index, 3)}`}>
              <article className="grid gap-5 border-b border-[hsl(var(--border))] py-8 md:grid-cols-[130px_1fr] md:gap-8 md:py-10" data-testid={`timeline-item-${year.replaceAll(' ', '-').toLowerCase()}`}>
                <div className="font-display text-4xl italic text-[hsl(var(--accent))]">{year}</div>
                <div>
                  <h3 className="font-display text-3xl leading-none text-[hsl(var(--primary))]">{title}</h3>
                  <p className="mt-4 max-w-3xl text-sm leading-6 text-[hsl(var(--muted-foreground))]">{body}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-9">
          <div className="flex items-center gap-3 font-ui text-[10px] uppercase tracking-[0.15em] text-[hsl(var(--primary))]/65"><Building2 size={14} className="text-[hsl(var(--accent))]" />Alongside residential homes: institutional work for Balmer Lawrie and Bicco Lawrie</div>
        </Reveal>
      </div>
    </section>
  );
}

function Neighbourhoods() {
  return (
    <section className="relative overflow-hidden bg-[hsl(var(--accent))] py-20 text-[hsl(var(--card))] lg:py-28" data-testid="section-neighbourhoods">
      <div className="absolute -right-28 -top-28 h-80 w-80 rounded-full border border-[hsl(var(--card))]/20" />
      <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full border border-[hsl(var(--card))]/20" />
      <div className="relative mx-auto grid max-w-[1380px] gap-10 px-6 lg:grid-cols-[.85fr_1.15fr] lg:px-12">
        <Reveal>
          <div className="font-ui text-[10px] uppercase tracking-[0.2em] text-[hsl(var(--card))]/75"><span className="mb-4 block h-px w-12 bg-[hsl(var(--secondary))]" />Neighbourhoods / Around here</div>
          <h2 className="mt-7 max-w-xl font-display text-[clamp(3rem,6vw,6.7rem)] leading-[.86] tracking-[-.04em]">We build where<br /><em>life already is.</em></h2>
        </Reveal>
        <Reveal className="reveal-delay-1 lg:pt-10">
          <p className="max-w-lg text-lg leading-8 text-[hsl(var(--card))]/78">From the tram lines and lake air of Jadavpur to the quieter edges of Mukundapur, these are places we understand from the inside.</p>
          <div className="mt-12 flex max-w-2xl flex-wrap gap-x-7 gap-y-4 border-t border-[hsl(var(--card))]/30 pt-7">
            {neighbourhoods.map((neighbourhood) => <span key={neighbourhood} className="font-display text-2xl italic text-[hsl(var(--card))]">{neighbourhood}</span>)}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Enquiry() {
  const [submitted, setSubmitted] = useState(false);
  const form = useForm<EnquiryValues>({
    resolver: zodResolver(enquirySchema),
    defaultValues: { name: '', phone: '', email: '', project: '', message: '' },
  });

  const onSubmit = (values: EnquiryValues) => {
    void values;
    setSubmitted(true);
    form.reset();
  };

  return (
    <section id="enquiry" className="bg-[hsl(var(--primary))] py-24 text-[hsl(var(--card))] lg:py-32" data-testid="section-enquiry">
      <div className="mx-auto grid max-w-[1380px] gap-14 px-6 lg:grid-cols-[.78fr_1.22fr] lg:gap-24 lg:px-12">
        <Reveal>
          <div className="font-ui text-[10px] uppercase tracking-[0.2em] text-[hsl(var(--secondary))]"><span className="mb-4 block h-px w-12 bg-[hsl(var(--secondary))]" />08 / Let us talk</div>
          <h2 className="mt-8 font-display text-[clamp(3.7rem,7vw,7.7rem)] leading-[.82] tracking-[-.05em]">Tell us<br /><em>what feels<br />like home.</em></h2>
          <p className="mt-10 max-w-sm text-sm leading-7 text-[hsl(var(--card))]/63">A question, a site visit, a conversation about a future home — start wherever feels natural. We will get back to you within one working day.</p>
          <div className="mt-10 space-y-4 font-ui text-[10px] uppercase tracking-[0.14em] text-[hsl(var(--card))]/70">
            <a href="tel:+913324570034" className="flex items-center gap-3 hover:text-[hsl(var(--secondary))]" data-testid="link-phone"><Phone size={14} className="text-[hsl(var(--secondary))]" /> +91 33 2457 0034</a>
            <a href="mailto:hello@ashimaengineering.in" className="flex items-center gap-3 hover:text-[hsl(var(--secondary))]" data-testid="link-email"><Mail size={14} className="text-[hsl(var(--secondary))]" /> hello@ashimaengineering.in</a>
          </div>
        </Reveal>
        <Reveal className="reveal-delay-1">
          {submitted ? (
            <div className="flex min-h-[480px] flex-col items-center justify-center border border-[hsl(var(--secondary))]/55 bg-[hsl(var(--card))]/[.04] px-7 text-center" data-testid="status-enquiry-success">
              <CheckCircle2 size={44} strokeWidth={1.2} className="text-[hsl(var(--secondary))]" />
              <h3 className="mt-7 font-display text-5xl">We have your note.</h3>
              <p className="mt-4 max-w-sm text-sm leading-6 text-[hsl(var(--card))]/65">Thank you for reaching out. Someone from our family will be in touch within one working day.</p>
              <button type="button" onClick={() => setSubmitted(false)} className="mt-8 border-b border-[hsl(var(--secondary))] pb-2 font-ui text-[10px] uppercase tracking-[0.17em] text-[hsl(var(--secondary))]" data-testid="button-send-another-enquiry">Send another enquiry</button>
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 border-t border-[hsl(var(--card))]/25 pt-2" data-testid="form-enquiry">
                <div className="grid gap-6 sm:grid-cols-2">
                  <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-ui text-[10px] uppercase tracking-[0.15em] text-[hsl(var(--card))]/65">Your name</FormLabel>
                      <FormControl><input {...field} className="mt-2 h-12 w-full border-0 border-b border-[hsl(var(--card))]/30 bg-transparent px-0 text-base text-[hsl(var(--card))] outline-none transition-colors placeholder:text-[hsl(var(--card))]/30 focus:border-[hsl(var(--secondary))] focus:ring-0" placeholder="What should we call you?" data-testid="input-enquiry-name" /></FormControl>
                      <FormMessage className="mt-2 text-xs text-[hsl(var(--secondary))]" />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="phone" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-ui text-[10px] uppercase tracking-[0.15em] text-[hsl(var(--card))]/65">Phone number</FormLabel>
                      <FormControl><input {...field} type="tel" className="mt-2 h-12 w-full border-0 border-b border-[hsl(var(--card))]/30 bg-transparent px-0 text-base text-[hsl(var(--card))] outline-none transition-colors placeholder:text-[hsl(var(--card))]/30 focus:border-[hsl(var(--secondary))] focus:ring-0" placeholder="+91" data-testid="input-enquiry-phone" /></FormControl>
                      <FormMessage className="mt-2 text-xs text-[hsl(var(--secondary))]" />
                    </FormItem>
                  )} />
                </div>
                <div className="grid gap-6 sm:grid-cols-2">
                  <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-ui text-[10px] uppercase tracking-[0.15em] text-[hsl(var(--card))]/65">Email <span className="normal-case tracking-normal">(optional)</span></FormLabel>
                      <FormControl><input {...field} type="email" className="mt-2 h-12 w-full border-0 border-b border-[hsl(var(--card))]/30 bg-transparent px-0 text-base text-[hsl(var(--card))] outline-none transition-colors placeholder:text-[hsl(var(--card))]/30 focus:border-[hsl(var(--secondary))] focus:ring-0" placeholder="you@example.com" data-testid="input-enquiry-email" /></FormControl>
                      <FormMessage className="mt-2 text-xs text-[hsl(var(--secondary))]" />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="project" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-ui text-[10px] uppercase tracking-[0.15em] text-[hsl(var(--card))]/65">I am enquiring about</FormLabel>
                      <FormControl><select {...field} className="mt-2 h-12 w-full appearance-none border-0 border-b border-[hsl(var(--card))]/30 bg-transparent px-0 text-base text-[hsl(var(--card))] outline-none focus:border-[hsl(var(--secondary))] focus:ring-0" data-testid="select-enquiry-project"><option value="" className="text-[hsl(var(--primary))]">Choose a project</option><option value="Sraboni Court" className="text-[hsl(var(--primary))]">Sraboni Court</option><option value="Barnali Apartments" className="text-[hsl(var(--primary))]">Barnali Apartments</option><option value="Something else" className="text-[hsl(var(--primary))]">Something else</option></select></FormControl>
                      <FormMessage className="mt-2 text-xs text-[hsl(var(--secondary))]" />
                    </FormItem>
                  )} />
                </div>
                <FormField control={form.control} name="message" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-ui text-[10px] uppercase tracking-[0.15em] text-[hsl(var(--card))]/65">A few words</FormLabel>
                    <FormControl><textarea {...field} rows={3} className="mt-2 w-full resize-none border-0 border-b border-[hsl(var(--card))]/30 bg-transparent px-0 py-3 text-base text-[hsl(var(--card))] outline-none transition-colors placeholder:text-[hsl(var(--card))]/30 focus:border-[hsl(var(--secondary))] focus:ring-0" placeholder="What can we help you find?" data-testid="textarea-enquiry-message" /></FormControl>
                    <FormMessage className="mt-2 text-xs text-[hsl(var(--secondary))]" />
                  </FormItem>
                )} />
                <button type="submit" disabled={form.formState.isSubmitting} className="group mt-4 flex w-full items-center justify-between bg-[hsl(var(--secondary))] px-5 py-4 font-ui text-[10px] uppercase tracking-[0.18em] text-[hsl(var(--primary))] transition-transform hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--secondary))] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--primary))] disabled:cursor-not-allowed disabled:opacity-60" data-testid="button-submit-enquiry">
                  Send your enquiry <Send size={17} className="transition-transform group-hover:translate-x-1" />
                </button>
              </form>
            </Form>
          )}
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[hsl(var(--primary))] px-6 pb-8 text-[hsl(var(--card))] lg:px-12" data-testid="site-footer">
      <div className="mx-auto max-w-[1380px] border-t border-[hsl(var(--card))]/20 pt-8">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <AshimaLogo footer />
            <div className="mt-3 font-ui text-[9.5px] uppercase tracking-[0.19em] text-[hsl(var(--card))]/55">Built with care since 1995</div>
          </div>
          <div className="flex flex-wrap gap-x-7 gap-y-3 font-ui text-[9.5px] uppercase tracking-[0.16em] text-[hsl(var(--card))]/60">
            <a href="#top" className="hover:text-[hsl(var(--secondary))]" data-testid="link-footer-top">Back to top</a>
            <a href="#homes" className="hover:text-[hsl(var(--secondary))]" data-testid="link-footer-homes">Homes</a>
            <a href="#enquiry" className="hover:text-[hsl(var(--secondary))]" data-testid="link-footer-contact">Contact</a>
          </div>
        </div>
        <div className="mt-12 flex flex-col justify-between gap-3 font-ui text-[9.5px] uppercase tracking-[0.12em] text-[hsl(var(--card))]/35 sm:flex-row">
          <span>South Kolkata, West Bengal</span><span>© {new Date().getFullYear()} Ashima Engineering</span>
        </div>
      </div>
    </footer>
  );
}

function Home() {
  return (
    <main className="paper-grain bg-[hsl(var(--background))]" data-testid="page-home">
      <Header />
      <Hero />
      <Introduction />
      <Principles />
      <Homes />
      <Work />
      <HowWeWork />
      <Story />
      <Neighbourhoods />
      <Enquiry />
      <Footer />
    </main>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;