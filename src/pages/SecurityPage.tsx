import PageHero from '../components/PageHero';
import SectionHeader from '../components/SectionHeader';
import CTASection from '../components/CTASection';
import ScrollReveal from '../components/ScrollReveal';
import RoleMatrix from '../components/visuals/RoleMatrix';

export default function SecurityPage() {
  return (
    <>
      <PageHero
        eyebrow="Security"
        title="Security built into the product architecture."
        subtitle="Designed for controlled access, clear roles, and traceable evidence activity."
        primaryCta={{ label: 'Privacy Overview', href: '/privacy' }}
        secondaryCta={{ label: 'Contact', href: '/contact' }}
        visualType="security"
      />

      <section className="section-padding wp-section" style={{ background: '#fff' }}>
        <div className="wp-container">
          <SectionHeader
            eyebrow="Architecture"
            title="Four layers of controlled access."
            subtitle="Designed for regulated environments. Formal certifications available on request where applicable."
          />
          <ScrollReveal direction="up">
            <RoleMatrix />
          </ScrollReveal>
          <div className="wp-card" style={{ padding: '20px 22px', marginTop: 32, borderLeft: '4px solid #14B8A6' }}>
            <p style={{ fontSize: 14, color: '#475569', margin: 0, lineHeight: 1.65 }}>
              <strong style={{ color: '#0F172A' }}>Designed for controlled access.</strong> WellPredict supports role-based permissions, append-only audit trails, and UK-hosted infrastructure. Security statements describe design intent, not verified certification claims.
            </p>
          </div>
        </div>
      </section>

      <CTASection title="Questions about security?" primaryLabel="Contact Us" primaryHref="/contact" dark={false} />
    </>
  );
}
