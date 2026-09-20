import ScrollReveal from './ScrollReveal';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  dark?: boolean;
}

export default function SectionHeader({ eyebrow, title, subtitle, align = 'center', dark = false }: SectionHeaderProps) {
  return (
    <ScrollReveal
      direction="up"
      className={align === 'center' ? 'section-header-center' : 'section-header-left'}
    >
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 style={{ fontSize: 'clamp(28px, 3vw, 40px)', color: dark ? '#fff' : '#0F172A', margin: eyebrow ? '12px 0 0' : 0, lineHeight: 1.15 }}>
        {title}
      </h2>
      {subtitle && (
        <p style={{ fontSize: 16, color: dark ? '#94A3B8' : '#475569', margin: '14px 0 0', lineHeight: 1.65 }}>
          {subtitle}
        </p>
      )}
    </ScrollReveal>
  );
}
