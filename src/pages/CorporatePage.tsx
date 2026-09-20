import PageHero from '../components/PageHero';
import SectionHeader from '../components/SectionHeader';
import EvidencePackMockup from '../components/EvidencePackMockup';
import CTASection from '../components/CTASection';
import ScrollReveal from '../components/ScrollReveal';
import GovernanceStateBadge from '../components/GovernanceStateBadge';
import SectorStoryVisual from '../components/visuals/SectorStoryVisual';

const TEAMS = [
  { name: 'Operations', state: 'Normal' as const },
  { name: 'Compliance', state: 'Watch' as const },
  { name: 'Customer Support', state: 'Elevated' as const },
  { name: 'Finance Team', state: 'Normal' as const },
  { name: 'People Operations', state: 'Normal' as const },
];

const USE_CASES = [
  'Internal governance review',
  'Board reporting support',
  'Operational risk oversight',
  'Department workload visibility',
  'Audit preparation',
];

export default function CorporatePage() {
  return (
    <>
      <PageHero
        eyebrow="Corporate Governance"
        title="Evidence records for corporate governance teams."
        subtitle="WellPredict helps corporate teams connect operating conditions, management actions, and outcome reviews into clear records for internal governance and board-level review."
        accent="#14B8A6"
        primaryCta={{ label: 'Request Corporate Pilot', href: '/pilot' }}
        secondaryCta={{ label: 'Sector Overview', href: '/sectors' }}
        visualType="dashboard"
        visualOrg="Corporate Governance Team"
        visualSector="Corporate Governance"
      />

      <section className="section-padding wp-section" style={{ background: '#fff' }}>
        <div className="wp-container content-split">
          <ScrollReveal direction="left">
            <SectionHeader
              eyebrow="Department-level visibility"
              title="Understand operating conditions across business functions."
              subtitle="Corporate governance teams can review team-level operating conditions at department level without individual tracking."
              align="left"
            />
            <div className="flex flex-col" style={{ gap: 8, marginTop: 24 }}>
              {TEAMS.map((team) => (
                <ScrollReveal key={team.name} direction="up">
                  <div className="wp-card flex items-center justify-between" style={{ padding: '12px 16px' }}>
                    <span style={{ fontSize: 14, fontWeight: 500, color: '#0F172A' }}>{team.name}</span>
                    <GovernanceStateBadge state={team.state} />
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </ScrollReveal>
          <ScrollReveal direction="right">
            <SectorStoryVisual variant="corporate" accent="#14B8A6" />
          </ScrollReveal>
        </div>
      </section>

      <section className="section-padding" style={{ background: '#ECFEFF' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'start' }}>
          <ScrollReveal direction="left">
            <SectionHeader
              align="left"
              eyebrow="Management action record"
              title="Record what management did when conditions changed."
              subtitle="When a team moves to Watch or Elevated, managers log the action, owner, and follow-up plan in one connected record."
            />
            <div className="card" style={{ padding: '20px 22px', marginTop: 24, borderLeft: '4px solid #14B8A6' }}>
              <div style={{ display: 'grid', gap: 10 }}>
                {[
                  { label: 'Team', value: 'Customer Support' },
                  { label: 'Condition', value: 'Elevated' },
                  { label: 'Action', value: 'Workload review' },
                  { label: 'Follow-up', value: 'Scheduled' },
                  { label: 'Evidence status', value: 'Ready' },
                ].map((row) => (
                  <div key={row.label} className="flex items-center justify-between" style={{ gap: 12 }}>
                    <span style={{ fontSize: 12, color: '#64748B' }}>{row.label}</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#0F172A' }}>{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="right">
            <SectionHeader
              align="left"
              eyebrow="Evidence pack"
              title="Evidence pack for corporate governance"
              subtitle="Team condition, privacy gate validation, management action, outcome review, and audit trail in one versioned record."
            />
            <div style={{ marginTop: 20 }}>
              <EvidencePackMockup compact />
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-padding" style={{ background: '#fff' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <SectionHeader
            title="Use cases"
            subtitle="Where corporate governance evidence supports internal review, board reporting, and operational risk conversations."
          />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginTop: 32 }}>
            {USE_CASES.map((item, i) => (
              <ScrollReveal key={item} direction="up" delay={i * 50}>
                <div className="card" style={{ padding: '18px 20px', fontSize: 14, fontWeight: 600, color: '#0F172A' }}>
                  {item}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Start with one corporate team."
        subtitle="Run a focused evidence cycle before scaling across departments."
        primaryLabel="Request Corporate Pilot"
        primaryHref="/pilot"
        secondaryLabel="Contact Us"
        secondaryHref="/contact"
      />
    </>
  );
}
