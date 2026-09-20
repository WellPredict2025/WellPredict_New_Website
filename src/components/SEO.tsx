import { useEffect } from 'react';
import { DEFAULT_SEO } from '../config/seoRoutes';
import { OG_IMAGE_URL, SITE_URL } from '../config/siteUrl';

type SEOProps = {
  title?: string;
  description?: string;
  canonicalPath?: string;
  ogImage?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  noIndex?: boolean;
};

const DEFAULT_TITLE = DEFAULT_SEO.title;
const DEFAULT_DESCRIPTION = DEFAULT_SEO.description;

function upsertMeta(attribute: 'name' | 'property', key: string, content: string) {
  const selector = `meta[${attribute}="${key}"]`;
  let element = document.querySelector(selector) as HTMLMetaElement | null;
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.content = content;
}

function upsertLink(rel: string, href: string) {
  const selector = `link[rel="${rel}"]`;
  let element = document.querySelector(selector) as HTMLLinkElement | null;
  if (!element) {
    element = document.createElement('link');
    element.rel = rel;
    document.head.appendChild(element);
  }
  element.href = href;
}

function upsertJsonLd(id: string, data: Record<string, unknown> | Record<string, unknown>[]) {
  const existing = document.getElementById(id);
  existing?.remove();

  const script = document.createElement('script');
  script.id = id;
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
}

export default function SEO({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  canonicalPath = '/',
  ogImage = OG_IMAGE_URL,
  jsonLd,
  noIndex = false,
}: SEOProps) {
  useEffect(() => {
    const canonicalUrl = `${SITE_URL}${canonicalPath === '/' ? '' : canonicalPath}`;

    document.title = title;
    upsertMeta('name', 'description', description);
    upsertMeta('name', 'robots', noIndex ? 'noindex, nofollow' : 'index, follow');
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:type', 'website');
    upsertMeta('property', 'og:url', canonicalUrl);
    upsertMeta('property', 'og:image', ogImage);
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', ogImage);
    upsertLink('canonical', canonicalUrl);

    if (jsonLd) {
      upsertJsonLd('page-json-ld', jsonLd);
    } else {
      document.getElementById('page-json-ld')?.remove();
    }
  }, [title, description, canonicalPath, ogImage, jsonLd, noIndex]);

  return null;
}
