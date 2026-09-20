export const THEME = {
  navy: '#0B1F33',
  navyLight: '#12324A',
  teal: '#14B8A6',
  tealBright: '#14B8A6',
  pageBg: '#F7FBFC',
  text: '#0F172A',
  muted: '#475569',
  accentLight: '#CCFBF1',
  accentBlue: '#38BDF8',
  sectionSoft: '#ECFEFF',
  sectionAlt: '#F0F9FF',
  border: '#DCE8EF',
} as const;

export const NAV_GROUPS = {
  platform: {
    label: 'Platform',
    links: [
      { label: 'How It Works', href: '/how-it-works' },
      { label: 'Evidence Pack', href: '/evidence-pack' },
      { label: 'Privacy', href: '/privacy' },
      { label: 'Security', href: '/security' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'FAQ', href: '/faq' },
    ],
  },
  sectors: {
    label: 'Sectors',
    links: [
      { label: 'Healthcare', href: '/sectors/healthcare' },
      { label: 'Food Manufacturing', href: '/sectors/food' },
      { label: 'Financial Services', href: '/sectors/financial' },
      { label: 'Legal', href: '/sectors/legal' },
      { label: 'Education', href: '/sectors/education' },
      { label: 'Corporate Governance', href: '/sectors/corporate' },
    ],
  },
  company: {
    label: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Our Team', href: '/team' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact', href: '/contact' },
    ],
  },
} as const;

export const SECTORS = [
  { slug: 'healthcare', title: 'Healthcare', accent: '#1B6BB0', href: '/sectors/healthcare', org: 'Healthcare Organisation', regulators: 'CQC Well-Led · NHS People Promise' },
  { slug: 'food', title: 'Food Manufacturing', accent: '#0D9E72', href: '/sectors/food', org: 'Food Manufacturing Organisation', regulators: 'FSA · BRCGS · HACCP' },
  { slug: 'financial', title: 'Financial Services', accent: '#8B5CF6', href: '/sectors/financial', org: 'Financial Services Organisation', regulators: 'FCA · SM&CR · Operational Resilience' },
  { slug: 'legal', title: 'Legal Services', accent: '#6366F1', href: '/sectors/legal', org: 'Legal Services Organisation', regulators: 'SRA · Code of Conduct' },
  { slug: 'education', title: 'Education', accent: '#F59E0B', href: '/sectors/education', org: 'Education Organisation', regulators: 'Ofsted · Leadership' },
  { slug: 'corporate', title: 'Corporate Governance', accent: '#14B8A6', href: '/sectors/corporate', org: 'Corporate Governance Team', regulators: 'Internal governance · Board reporting · Operational risk' },
] as const;

export const EVIDENCE_PACK_SECTIONS = [
  'Cover',
  'Executive summary',
  'Team profile',
  'Scope',
  'Pre-action conditions',
  'Management action',
  'Intervention timeline',
  'Post-action observations',
  'Privacy validation',
  'Compliance validation',
  'Audit trail',
  'Interpretation note',
] as const;

export const WORKFLOW_STEPS = [
  { num: '01', title: 'Collect', body: 'Anonymous team-level signals collected weekly. Thirty seconds per person. No individual data stored.', accent: '#14B8A6' },
  { num: '02', title: 'Detect', body: 'Operating conditions classified automatically across Normal, Watch, and Elevated states.', accent: '#F59E0B' },
  { num: '03', title: 'Act', body: 'Management actions logged in under two minutes and linked to the team signal.', accent: '#0D9E72' },
  { num: '04', title: 'Compile', body: 'One click produces a versioned, locked Evidence Pack ready for review.', accent: '#1B6BB0' },
] as const;

export const GLOSSARY_TERMS = [
  { term: 'Evidence Pack', def: 'A versioned governance document linking team signals, management actions, and outcomes in one defensible record.' },
  { term: 'Privacy Gate', def: 'A threshold check that suppresses all team metrics until enough members have responded.' },
  { term: 'Team-level Signal', def: 'An aggregated operating condition reading for a team. Never tied to an individual.' },
  { term: 'Threshold', def: 'The minimum team size required before any metric becomes visible to managers.' },
  { term: 'Management Action', def: 'A logged record of what leadership did in response to a team-level signal.' },
  { term: 'Intervention Record', def: 'The structured entry connecting an action to its trigger signal and follow-up outcome.' },
  { term: 'Audit Trail', def: 'A timestamped log of every event in an evidence cycle, append-only by design.' },
  { term: 'Versioned Evidence', def: 'Evidence Packs that are numbered, locked, and immutable once finalised.' },
  { term: 'Regulatory Assurance', def: 'The ability to demonstrate reasonable steps with connected proof points.' },
  { term: 'Operating Conditions', def: 'The classified state of a team based on aggregated weekly signals.' },
  { term: 'Governance State', def: 'The overall condition classification applied to a team or unit.' },
  { term: 'Normal', def: 'Operating conditions within expected range. No action required.' },
  { term: 'Watch', def: 'Early signal that conditions may need attention. Monitoring recommended.' },
  { term: 'Elevated', def: 'Conditions flagged for management action and evidence logging.' },
  { term: 'Packs Ready', def: 'Evidence Packs that have passed privacy validation and are ready to share.' },
] as const;
