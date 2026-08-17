import { Code2, Compass, ShieldCheck } from 'lucide-react';

const capabilityItems = [
  {
    index: '01',
    title: 'Product strategy',
    support: 'Privacy-first design, regulated sector focus, and practical workflow thinking.',
    Icon: Compass,
  },
  {
    index: '02',
    title: 'Platform delivery',
    support: 'Secure architecture, reliable implementation, and scalable product execution.',
    Icon: Code2,
  },
  {
    index: '03',
    title: 'Governance expertise',
    support: 'Built to support review-ready records, auditability, and operational clarity.',
    Icon: ShieldCheck,
  },
] as const;

const teamHighlights = ['UK-based', 'Remote-first', 'Built for regulated organisations'] as const;

export default function LeadershipHeroPanel() {
  return (
    <div className="leadership-hero-panel" aria-hidden="true">
      <div className="leadership-hero-panel__header">
        <span className="leadership-hero-panel__eyebrow">WellPredict</span>
        <p className="leadership-hero-panel__title">How WellPredict is built</p>
      </div>

      <div className="leadership-hero-panel__profiles">
        {capabilityItems.map(({ index, title, support, Icon }) => (
          <div key={index} className="leadership-hero-panel__profile">
            <span className="leadership-hero-panel__avatar">
              <Icon strokeWidth={1.75} aria-hidden="true" />
            </span>
            <div>
              <p className="leadership-hero-panel__role-title">{title}</p>
              <p className="leadership-hero-panel__support">{support}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="leadership-hero-panel__chips">
        {teamHighlights.map((chip) => (
          <span key={chip} className="leadership-hero-panel__chip">
            {chip}
          </span>
        ))}
      </div>
    </div>
  );
}
