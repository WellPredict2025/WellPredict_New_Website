import { Link } from 'react-router-dom';
import ScrollReveal from './ScrollReveal';

interface CTASectionProps {
  title: string;
  subtitle?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  dark?: boolean;
}

export default function CTASection({
  title,
  subtitle,
  primaryLabel = 'Request Pilot',
  primaryHref = '/pilot',
  secondaryLabel,
  secondaryHref,
  dark = true,
}: CTASectionProps) {
  return (
    <section className="section-padding" style={{ background: dark ? 'linear-gradient(135deg, #0B1F33 0%, #12324A 52%, #0B1F33 100%)' : '#F7FBFC', borderTop: dark ? 'none' : '1px solid #DCE8EF' }}>
      <ScrollReveal direction="up" className="flex flex-col items-center text-center" style={{ maxWidth: 560, margin: '0 auto', gap: 16 }}>
        <h2 style={{ fontSize: 'clamp(26px, 3vw, 36px)', color: dark ? '#fff' : '#0F172A', margin: 0 }}>{title}</h2>
        {subtitle && <p style={{ fontSize: 16, color: dark ? '#94A3B8' : '#475569', margin: 0, lineHeight: 1.65 }}>{subtitle}</p>}
        <div className="flex flex-wrap items-center justify-center" style={{ gap: 12, marginTop: 8 }}>
          <Link to={primaryHref} className="btn-primary" style={{ textDecoration: 'none' }}>{primaryLabel}</Link>
          {secondaryLabel && secondaryHref && (
            <Link to={secondaryHref} className="btn-secondary" style={{ textDecoration: 'none' }}>{secondaryLabel}</Link>
          )}
        </div>
      </ScrollReveal>
    </section>
  );
}
