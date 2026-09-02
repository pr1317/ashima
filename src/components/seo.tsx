/** Per-route document head. A single-page app has one index.html, so the
 *  title, description, canonical and og: tags are written on navigation
 *  rather than rendered per page at build time. */
import { useEffect } from 'react';
import { SITE_ORIGIN } from '@/lib/site';

const setMeta = (selector: string, attr: 'name' | 'property', key: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
};

interface SeoProps {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  noindex?: boolean;
  /** Extra JSON-LD for this route, e.g. a Residence for a live project. */
  schema?: Record<string, unknown> | null;
}

export function Seo({
  title, description, path, ogImage = '/images/projects/hero.jpg',
  noindex = false, schema = null,
}: SeoProps) {
  useEffect(() => {
    document.title = title;
    const canonical = new URL(path, SITE_ORIGIN).href;
    const image = new URL(ogImage, SITE_ORIGIN).href;

    setMeta('meta[name="description"]', 'name', 'description', description);
    setMeta('meta[property="og:title"]', 'property', 'og:title', title);
    setMeta('meta[property="og:description"]', 'property', 'og:description', description);
    setMeta('meta[property="og:url"]', 'property', 'og:url', canonical);
    setMeta('meta[property="og:image"]', 'property', 'og:image', image);
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description);

    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = canonical;

    let robots = document.head.querySelector<HTMLMetaElement>('meta[name="robots"]');
    if (!robots) {
      robots = document.createElement('meta');
      robots.name = 'robots';
      document.head.appendChild(robots);
    }
    robots.content = noindex ? 'noindex, nofollow' : 'index, follow';
  }, [title, description, path, ogImage, noindex]);

  useEffect(() => {
    if (!schema) return;
    const tag = document.createElement('script');
    tag.type = 'application/ld+json';
    tag.dataset.route = 'true';
    tag.textContent = JSON.stringify(schema);
    document.head.appendChild(tag);
    return () => { tag.remove(); };
  }, [schema]);

  return null;
}
