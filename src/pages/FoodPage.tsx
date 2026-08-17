import { SectorPageTemplate } from './HealthcarePage';
import SectionHeader from '../components/SectionHeader';
import ScrollReveal from '../components/ScrollReveal';

export default function FoodPage() {
  return (
    <>
      <SectorPageTemplate
        eyebrow="Food Manufacturing"
        title="Governance evidence for production teams."
        subtitle="Designed for food manufacturing teams preparing evidence for FSA, BRCGS, HACCP, and internal governance reviews."
        regulatorQ="When the FSA asks about your food safety culture, this is what you show them."
        accent="#0D9E72"
        org="Food Manufacturing Organisation"
        sectorLabel="Food Manufacturing"
        alignment="Supports evidence conversations for FSA, BRCGS, HACCP, and internal food safety governance reviews."
        teams={[
          { name: 'Line One', state: 'Normal' },
          { name: 'Packing Team', state: 'Watch' },
          { name: 'Production Team', state: 'Elevated' },
          { name: 'Night Shift Team', state: 'Normal' },
        ]}
        actionExample={{
          team: 'Production Team',
          action: 'Supervisor rotation adjusted and additional pre-shift briefing logged for elevated operating conditions.',
          date: '8 March 2026',
        }}
        evidenceTitle="Evidence pack for food manufacturing"
        ctaLabel="Request a Food Manufacturing Pilot"
        storyVariant="food"
      />

      <section className="section-padding wp-section" style={{ background: '#fff' }}>
        <div className="wp-container content-split">
          <ScrollReveal direction="left">
            <SectionHeader
              align="left"
              eyebrow="Food safety governance"
              title="Built for food safety governance conversations"
              subtitle="Food manufacturing teams often need to show how production pressures, management action, and follow-up records connect across shifts."
            />
            <div className="wp-card" style={{ padding: '22px 24px', marginTop: 20 }}>
              <p style={{ margin: 0, fontSize: 15, lineHeight: 1.65, color: '#475569' }}>
                WellPredict helps structure this evidence for FSA, BRCGS, HACCP, and internal review contexts. It supports evidence conversations — it does not replace certification or compliance obligations.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="right">
            <div className="wp-card" style={{ padding: '22px 24px' }}>
              <p style={{ margin: '0 0 12px', fontSize: 12, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#0f766e' }}>
                Typical review focus
              </p>
              <ul style={{ margin: 0, paddingLeft: 18, color: '#334155', lineHeight: 1.7, fontSize: 14 }}>
                <li>Shift-level operating conditions</li>
                <li>Management action across production lines</li>
                <li>Follow-up records after elevated conditions</li>
                <li>Structured evidence for BRCGS and HACCP conversations</li>
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
