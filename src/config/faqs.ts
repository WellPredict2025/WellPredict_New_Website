export const FAQS = {
  General: [
    {
      q: 'What is WellPredict?',
      a: 'A governance evidence platform that connects team-level operating conditions, management actions, and outcomes into versioned Evidence Packs.',
    },
    {
      q: 'Who is WellPredict for?',
      a: 'Governance leaders in regulated UK organisations including healthcare, food manufacturing, financial services, legal, education, and corporate teams.',
    },
    {
      q: 'How does a pilot work?',
      a: 'A pilot typically starts with one team over four weeks. You configure the team, collect weekly signals, log management actions, and compile an Evidence Pack for internal review.',
    },
  ],
  Privacy: [
    {
      q: 'Can managers see individual scores?',
      a: 'No. Only aggregated team-level metrics are visible after the privacy threshold is met.',
    },
    {
      q: 'What happens if the privacy threshold is not met?',
      a: 'Nothing is shown. The system returns insufficient data until the minimum team size requirement is met.',
    },
    {
      q: 'How long are responses kept?',
      a: 'Raw responses are deleted after seven days. Governance records follow your organisation retention policy and contractual terms.',
    },
  ],
  'Evidence packs': [
    {
      q: 'What is inside an Evidence Pack?',
      a: 'Twelve sections covering team conditions, management actions, outcomes, privacy validation, and audit trail.',
    },
    {
      q: 'How many sections are included?',
      a: 'Every Evidence Pack includes twelve structured sections designed for internal and regulatory review conversations.',
    },
    {
      q: 'Can packs be used for internal review?',
      a: 'Yes. Evidence Packs are designed to support leadership, governance, and inspection-style review conversations with a connected record.',
    },
  ],
  Sectors: [
    {
      q: 'Which sectors does WellPredict support?',
      a: 'Healthcare, food manufacturing, financial services, legal, education, and corporate governance teams.',
    },
    {
      q: 'Can the language be adapted by sector?',
      a: 'Yes. Evidence structure, terminology, and review framing can be configured per sector.',
    },
    {
      q: 'Does Corporate Governance use the same framework?',
      a: 'Corporate Governance uses the same evidence chain, with language adapted for department-level visibility and internal board reporting.',
    },
  ],
  Pricing: [
    {
      q: 'Is pricing public?',
      a: 'No. Pricing is provided on request based on team count, sector scope, deployment model, and support requirements.',
    },
    {
      q: 'What affects pricing?',
      a: 'Team count, number of operating units or sites, sector configuration, reporting needs, and support level all influence pricing.',
    },
    {
      q: 'Can we start with one team?',
      a: 'Yes. Most organisations begin with a single-team pilot before expanding across units or sites.',
    },
  ],
  Technical: [
    {
      q: 'Does WellPredict support role-based access?',
      a: 'Yes. The platform is designed to support role-based permissions for administrators, managers, and review users.',
    },
    {
      q: 'Can it work across multiple teams?',
      a: 'Yes. Organisation and multi-site configurations support visibility across multiple teams with team-level privacy controls.',
    },
    {
      q: 'What security controls are supported?',
      a: 'WellPredict is designed to support access controls, audit trails, encryption in transit, and UK-hosted infrastructure. Formal security documentation is available on request.',
    },
  ],
} as const;

export type FAQCategory = keyof typeof FAQS;

export const FAQ_CATEGORIES = Object.keys(FAQS) as FAQCategory[];

export function buildFaqJsonLd() {
  const mainEntity = FAQ_CATEGORIES.flatMap((category) =>
    FAQS[category].map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  );

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity,
  };
}
