import PageHero from '../components/PageHero';
import SectionHeader from '../components/SectionHeader';
import CTASection from '../components/CTASection';
import ScrollReveal from '../components/ScrollReveal';
import EvidencePackStudio from '../components/EvidencePackStudio';
import EvidencePackHeroImage from '../components/EvidencePackHeroImage';

export default function EvidencePackPage() {
  return (
    <>
      <PageHero
        eyebrow="Evidence Pack"
        title="Turn scattered actions into one review-ready pack."
        subtitle="WellPredict brings team context, privacy validation, management action, outcome review, and audit trail into a structured record for internal review."
        primaryCta={{ label: 'Book a Product Walkthrough', href: '/pilot' }}
        secondaryCta={{ label: 'See How It Works', href: '/how-it-works' }}
        visual={<EvidencePackHeroImage />}
      />

      <EvidencePackStudio />

      <section className="section-padding wp-section" style={{ background: '#F7FBFC' }}>
        <div className="wp-container content-split">
          <ScrollReveal direction="left">
            <SectionHeader align="left" title="Versioned record" subtitle="Every pack is numbered, timestamped, and locked once finalised. Previous versions remain in the audit trail." />
            <div className="wp-card" style={{ padding: '20px 22px', marginTop: 16 }}>
              <p style={{ fontSize: 14, color: '#64748B', margin: 0, lineHeight: 1.65 }}>
                Draft → Review → Final → Superseded (if updated). Each state is traceable with timestamps and actor references.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="right">
            <SectionHeader align="left" title="Review workflow" subtitle="Share packs with governance reviewers. Privacy validation confirms threshold before any data appears." />
            <div className="wp-card" style={{ padding: '20px 22px', marginTop: 16 }}>
              <p style={{ fontSize: 14, color: '#64748B', margin: 0, lineHeight: 1.65 }}>
                Download preview and handover options designed for internal governance conversations and review preparation.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <CTASection title="See what your first pack could look like." primaryLabel="Book a Product Walkthrough" primaryHref="/pilot" />
    </>
  );
}
