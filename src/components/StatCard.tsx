import ScrollReveal from './ScrollReveal';

interface StatCardProps {
  value: string;
  label: string;
  sublabel?: string;
  accent?: string;
  delay?: number;
}

export default function StatCard({
  value,
  label,
  sublabel,
  accent = '#14B8A6',
  delay = 0,
}: StatCardProps) {
  return (
    <ScrollReveal direction="up" delay={delay}>
      <div className="wp-card stat-card">
        <span className="stat-card__value" style={{ color: accent }}>
          {value}
        </span>
        <span className="stat-card__label">{label}</span>
        {sublabel && <span className="stat-card__sublabel">{sublabel}</span>}
      </div>
    </ScrollReveal>
  );
}
