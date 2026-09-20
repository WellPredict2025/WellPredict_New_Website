import { Link } from 'react-router-dom';
import ScrollReveal from './ScrollReveal';

interface SectorCardProps {
  title: string;
  body: string;
  href: string;
  accent: string;
  regulators?: string;
  ctaLabel?: string;
  delay?: number;
}

export default function SectorCard({ title, body, href, accent, regulators, ctaLabel = 'Learn more →', delay = 0 }: SectorCardProps) {
  return (
    <ScrollReveal delay={delay} direction="up">
      <Link to={href} className="card flex flex-col no-underline" style={{ padding: 0, overflow: 'hidden', height: '100%' }}>
        <div style={{ height: 4, background: accent }} />
        <div className="flex flex-col" style={{ padding: '24px 22px', gap: 10, flex: 1 }}>
          <h3 style={{ fontSize: 18, color: '#0F172A', margin: 0 }}>{title}</h3>
          <p style={{ fontSize: 14, color: '#475569', margin: 0, lineHeight: 1.6, flex: 1 }}>{body}</p>
          {regulators && <span style={{ fontSize: 11, color: '#7B93A8', fontWeight: 500 }}>{regulators}</span>}
          <span style={{ fontSize: 13, fontWeight: 600, color: accent, marginTop: 4 }}>{ctaLabel}</span>
        </div>
      </Link>
    </ScrollReveal>
  );
}
