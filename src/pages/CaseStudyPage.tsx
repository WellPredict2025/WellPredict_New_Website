import PageHero from '../components/PageHero';
import SectionHeader from '../components/SectionHeader';
import EvidencePackMockup from '../components/EvidencePackMockup';
import Timeline from '../components/Timeline';
import CTASection from '../components/CTASection';
import StatCard from '../components/StatCard';
import ScrollReveal from '../components/ScrollReveal';

export default function CaseStudyPage() {
  return (
    <>
      <PageHero
        eyebrow="Case study · Healthcare scenario"
        title="How a healthcare team produced a governed evidence cycle."
        subtitle="This is a fictional healthcare scenario. Not a real customer outcome."
        accent="#1B6BB0"
        primaryCta={{ label: 'Apply for Pilot', href: '/pilot' }}
        secondaryCta={{ label: 'All Case Studies', href: '/case-studies' }}
        visualType="evidencePack"
      />

      <section className="section-padding wp-section" style={{ background: '#fff' }}>
        <div className="wp-container--narrow">
          <p className="wp-card" style={{ padding: '14px 18px', marginBottom: 32, fontSize: 13, color: '#64748B', background: '#FFFBEB', borderColor: 'rgba(245, 158, 11, 0.2)' }}>
            This is a sector scenario using fictional data. Ward Alpha and Ward Beta are fictional teams. Not a real customer outcome.
          </p>
          <ScrollReveal direction="up">
            <SectionHeader align="left" eyebrow="Challenge" title="Elevated conditions without a connected record." subtitle="Ward Beta showed elevated operating conditions for three weeks. Leadership needed to demonstrate what management did and whether it worked." />
          </ScrollReveal>
          <ScrollReveal direction="up">
            <SectionHeader align="left" eyebrow="Approach" title="Four-week evidence cycle with privacy gate validation." subtitle="Weekly anonymous team signals. Privacy gate validated at 14 members. Management logged a staffing rebalance action. Follow-up readings tracked improvement." />
          </ScrollReveal>
        </div>
      </section>

      <section className="section-padding wp-section" style={{ background: '#F7FBFC' }}>
        <div className="wp-container">
          <SectionHeader title="Evidence cycle timeline" />
          <Timeline
            items={[
              { label: 'W1', title: 'Elevated detected', body: 'Ward Beta conditions flagged automatically.', accent: '#EF4444' },
              { label: 'W2', title: 'Action logged', body: 'Staffing rebalance recorded with timestamp.', accent: '#F59E0B' },
              { label: 'W3', title: 'Conditions improving', body: 'Follow-up readings show Watch state.', accent: '#0D9E72' },
              { label: 'W4', title: 'Pack finalised', body: 'Evidence Pack v1 locked and ready.', accent: '#14B8A6' },
            ]}
          />
          <div className="feature-grid feature-grid--3" style={{ marginTop: 48 }}>
            <StatCard value="14" label="Team members" sublabel="Privacy threshold met" accent="#1B6BB0" />
            <StatCard value="4" label="Week cycle" sublabel="Signal to finalised pack" delay={60} accent="#14B8A6" />
            <StatCard value="v1.0" label="Evidence Pack" sublabel="Locked and versioned" delay={120} accent="#0D9488" />
          </div>
        </div>
      </section>

      <section className="section-padding wp-section" style={{ background: '#fff' }}>
        <div className="wp-container content-split">
          <ScrollReveal direction="left">
            <SectionHeader align="left" title="Outcome" subtitle="A single defensible record connecting team conditions, management action, and outcome. Ready for governance review." />
            <div className="wp-card" style={{ padding: '20px 22px', marginTop: 20, borderLeft: '4px solid #1B6BB0' }}>
              <p style={{ fontSize: 14, color: '#475569', margin: 0, lineHeight: 1.65 }}>
                The redacted pack preview below shows how signal, action, and outcome appear in one connected document for CQC-style review conversations.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="right">
            <EvidencePackMockup compact />
          </ScrollReveal>
        </div>
      </section>

      <CTASection title="Run a pilot cycle with your team." primaryLabel="Request Healthcare Pilot" primaryHref="/pilot" secondaryLabel="Contact" secondaryHref="/contact" />
    </>
  );
}
