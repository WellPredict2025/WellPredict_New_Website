import { buildFaqJsonLd } from './faqs';
import seoMeta from './seo-meta.json';

export type RouteSeo = {
  title: string;
  description: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
};

export const SITE_META_DESCRIPTION = seoMeta['/'].description;

export const SEO_ROUTES: Record<string, RouteSeo> = Object.fromEntries(
  Object.entries(seoMeta).map(([path, meta]) => [
    path,
    {
      title: meta.title,
      description: meta.description,
      ...(path === '/faq' ? { jsonLd: buildFaqJsonLd() } : {}),
    },
  ]),
);

export const DEFAULT_SEO = SEO_ROUTES['/'];
