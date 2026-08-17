import { buildFaqJsonLd } from './faqs';

export type RouteSeo = {
  title: string;
  description: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
};

const BASE = 'WellPredict';

export const SITE_META_DESCRIPTION =
  'WellPredict helps regulated organisations convert team-level operating signals, interventions, and outcomes into privacy-safe, audit-ready Evidence Packs.';

export const SEO_ROUTES: Record<string, RouteSeo> = {
  '/': {
    title: `${BASE} · Governance evidence for regulated organisations`,
    description: SITE_META_DESCRIPTION,
  },
  '/how-it-works': {
    title: `How It Works · ${BASE}`,
    description: 'See how WellPredict connects team signals, management actions, and outcomes into review-ready Evidence Packs.',
  },
  '/evidence-pack': {
    title: `Evidence Pack · ${BASE}`,
    description: 'Twelve structured sections that turn scattered governance activity into one review-ready Evidence Pack.',
  },
  '/privacy': {
    title: `Privacy · ${BASE}`,
    description: 'Privacy-gated, team-level evidence design with threshold checks before records are shown.',
  },
  '/security': {
    title: `Security · ${BASE}`,
    description: 'Security architecture designed for controlled access, clear roles, and traceable evidence activity.',
  },
  '/pricing': {
    title: `Pricing · ${BASE}`,
    description: 'Pilot, organisation, and enterprise pathways for governed evidence cycles. Pricing on request.',
  },
  '/faq': {
    title: `FAQ · ${BASE}`,
    description: 'Answers about governance evidence, privacy, sectors, pricing, and how WellPredict works.',
    jsonLd: buildFaqJsonLd(),
  },
  '/contact': {
    title: `Contact · ${BASE}`,
    description: 'Contact WellPredict about pilots, product walkthroughs, and organisation deployments.',
  },
  '/pilot': {
    title: `Request a Pilot · ${BASE}`,
    description: 'Apply for a four-week pilot with one team and compile your first Evidence Pack.',
  },
  '/about': {
    title: `About · ${BASE}`,
    description: 'WellPredict builds governance evidence software for regulated UK organisations.',
  },
  '/team': {
    title: `Our Team · ${BASE}`,
    description: 'Meet the team building WellPredict for regulated organisations.',
  },
  '/careers': {
    title: `Careers · ${BASE}`,
    description: 'Careers at WellPredict. Join a focused team building governance evidence software.',
  },
  '/sectors': {
    title: `Sectors · ${BASE}`,
    description: 'Sector configuration for healthcare, food, financial services, legal, education, and corporate governance.',
  },
  '/sectors/healthcare': {
    title: `Healthcare · ${BASE}`,
    description: 'Governance evidence for healthcare teams preparing for CQC and NHS-style review conversations.',
  },
  '/sectors/food': {
    title: `Food Manufacturing · ${BASE}`,
    description: 'Governance evidence for food production teams aligned with FSA, BRCGS, and HACCP oversight.',
  },
  '/sectors/financial': {
    title: `Financial Services · ${BASE}`,
    description: 'Evidence records for financial services operational oversight and management review.',
  },
  '/sectors/legal': {
    title: `Legal Services · ${BASE}`,
    description: 'Evidence records for legal practice workload governance and professional oversight.',
  },
  '/sectors/education': {
    title: `Education · ${BASE}`,
    description: 'Evidence records for education leadership, teaching, and support teams.',
  },
  '/sectors/corporate': {
    title: `Corporate Governance · ${BASE}`,
    description: 'Department-level governance evidence for internal review and board reporting.',
  },
  '/privacy-policy': {
    title: `Privacy Policy · ${BASE}`,
    description: 'How WellPredict collects, uses, stores, and protects information.',
  },
  '/terms': {
    title: `Terms of Service · ${BASE}`,
    description: 'Terms governing use of the WellPredict website and related services.',
  },
  '/cookies': {
    title: `Cookie Policy · ${BASE}`,
    description: 'How cookies and similar technologies are used on the WellPredict website.',
  },
  '/data-processing': {
    title: `Data Processing · ${BASE}`,
    description: 'Overview of data processing roles, categories, retention, and controls.',
  },
};

export const DEFAULT_SEO = SEO_ROUTES['/'];
