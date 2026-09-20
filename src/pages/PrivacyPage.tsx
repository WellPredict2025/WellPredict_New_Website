import PageHero from '../components/PageHero';
import SectionHeader from '../components/SectionHeader';
import StatCounter from '../components/StatCounter';
import CTASection from '../components/CTASection';
import ScrollReveal from '../components/ScrollReveal';
import PrivacyGateVisual from '../components/visuals/PrivacyGateVisual';

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Privacy"
        title="Privacy-gated by design."
        subtitle="WellPredict works with grouped team-level data and avoids individual tracking."
        primaryCta={{ label: 'View Security', href: '/security' }}
        secondaryCta={{ label: 'Privacy Policy', href: '/privacy-policy' }}
        visualType="privacyGate"
      />

      <section className="section-padding wp-section" style={{ background: '#fff' }}>
        <div className="wp-container">
          <SectionHeader eyebrow="Threshold simulator" title="See the privacy gate in action." subtitle="Try 8 members versus 14 members to understand suppression versus readiness." />
          <ScrollReveal direction="up">
            <PrivacyGateVisual />
          </ScrollReveal>
        </div>
      </section>

      <section className="section-padding wp-section" style={{ background: '#F7FBFC' }}>
        <div className="wp-container">
          <div className="before-after-grid">
            <ScrollReveal direction="left">
              <div className="visibility-panel visibility-panel--hidden">
                <h4>What managers never see</h4>
                <ul>
                  <li>No individual scores</li>
                  <li>No individual response view</li>
                  <li>No personal ranking or comparison</li>
                  <li>Nothing below team threshold</li>
                </ul>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <div className="visibility-panel visibility-panel--visible">
                <h4>What managers do see</h4>
                <ul>
                  <li>Team-level operating condition state</li>
                  <li>Participation count after threshold</li>
                  <li>Evidence pack readiness status</li>
                  <li>Management action and audit trail</li>
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="section-padding wp-section" style={{ background: '#0B1F33' }}>
        <div className="wp-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 40 }}>
          <StatCounter value={10} suffix="+" label="Minimum team members" color="#14B8A6" />
          <StatCounter value={7} label="Days until raw data deleted" color="#14B8A6" />
          <StatCounter value={0} label="Individual scores exposed" color="#EF4444" />
        </div>
      </section>

      <section className="section-padding wp-section" style={{ background: '#fff' }}>
        <div className="wp-container--narrow" style={{ textAlign: 'center' }}>
          <p style={{ fontSize: 14, color: '#64748B', margin: 0 }}>All data hosted in the United Kingdom. Raw responses deleted after seven days.</p>
        </div>
      </section>

      <CTASection title="Want the full security picture?" primaryLabel="Security Overview" primaryHref="/security" secondaryLabel="Contact" secondaryHref="/contact" />
    </>
  );
}
