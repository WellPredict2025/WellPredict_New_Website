import PageHero from '../components/PageHero';
import SectionHeader from '../components/SectionHeader';
import EvidencePackMockup from '../components/EvidencePackMockup';
import CTASection from '../components/CTASection';
import ScrollReveal from '../components/ScrollReveal';
import GovernanceStateBadge from '../components/GovernanceStateBadge';
import SectorStoryVisual, { type SectorStoryVariant } from '../components/visuals/SectorStoryVisual';

interface SectorPageProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  regulatorQ: string;
  accent: string;
  org: string;
  sectorLabel: string;
  alignment: string;
  teams: { name: string; state: 'Normal' | 'Watch' | 'Elevated' }[];
  actionExample: { team: string; action: string; date: string };
  evidenceTitle: string;
  ctaLabel: string;
  storyVariant: SectorStoryVariant;
}

export function SectorPageTemplate({
  eyebrow,
  title,
  subtitle,
  regulatorQ,
  accent,
  org,
  sectorLabel,
  alignment,
  teams,
  actionExample,
  evidenceTitle,
  ctaLabel,
  storyVariant,
}: SectorPageProps) {
  return (
    <>
      <PageHero
        eyebrow={eyebrow}
        title={title}
        subtitle={subtitle}
        accent={accent}
        primaryCta={{ label: ctaLabel, href: '/pilot' }}
        secondaryCta={{ label: 'Sector Overview', href: '/sectors' }}
        visualType="dashboard"
        visualOrg={org}
        visualSector={sectorLabel}
      />

      <section className="section-padding wp-section" style={{ background: '#fff' }}>
        <div className="wp-container content-split">
          <ScrollReveal direction="left">
            <SectionHeader eyebrow="Team-level scenario" title={regulatorQ} align="left" />
            <div className="flex flex-col" style={{ gap: 8, marginTop: 24 }}>
              {teams.map((t) => (
                <div key={t.name} className="wp-card flex items-center justify-between" style={{ padding: '12px 16px' }}>
                  <span style={{ fontSize: 14, fontWeight: 500, color: '#0F172A' }}>{t.name}</span>
                  <GovernanceStateBadge state={t.state} />
                </div>
              ))}
            </div>
          </ScrollReveal>
          <ScrollReveal direction="right">
            <SectorStoryVisual variant={storyVariant} accent={accent} />
          </ScrollReveal>
        </div>
      </section>

      <section className="section-padding wp-section" style={{ background: '#F7FBFC' }}>
        <div className="wp-container content-split">
          <ScrollReveal direction="left">
            <SectionHeader align="left" eyebrow="Management action record" title="Actions linked to team signals." subtitle="When operating conditions change, management logs a response with timestamp, owner, and follow-up plan." />
            <div className="wp-card" style={{ padding: '20px 22px', marginTop: 24, borderLeft: `4px solid ${accent}` }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: accent, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{actionExample.team}</div>
              <p style={{ fontSize: 15, color: '#0F172A', margin: '10px 0 8px', lineHeight: 1.6 }}>{actionExample.action}</p>
              <span style={{ fontSize: 12, color: '#64748B' }}>Logged {actionExample.date} · Audit trail reference included</span>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="right">
            <SectionHeader align="left" eyebrow="Evidence pack" title={evidenceTitle} subtitle="Versioned pack with operating conditions, management action, outcome review, and audit trail sections." />
            <div style={{ marginTop: 20 }}>
              <EvidencePackMockup compact />
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-padding wp-section" style={{ background: '#fff' }}>
        <div className="wp-container--narrow" style={{ textAlign: 'center' }}>
          <SectionHeader title="Sector alignment." subtitle={alignment} />
        </div>
      </section>

      <CTASection title="Ready to prove your governance evidence?" primaryLabel={ctaLabel} primaryHref="/pilot" />
    </>
  );
}

export default function HealthcarePage() {
  return (
    <SectorPageTemplate
      eyebrow="Healthcare"
      title="Governance evidence for healthcare teams."
      subtitle="Support CQC-style evidence conversations with team-level operating condition records."
      regulatorQ="When CQC asks what management did when teams were under pressure, this is your answer."
      accent="#1B6BB0"
      org="Healthcare Organisation"
      sectorLabel="Healthcare"
      alignment="Configured for CQC Well-Led, NHS People Promise, and safer staffing governance contexts."
      teams={[
        { name: 'Ward Alpha', state: 'Normal' },
        { name: 'Ward Beta', state: 'Watch' },
        { name: 'Urgent Care Team', state: 'Elevated' },
      ]}
      actionExample={{
        team: 'Urgent Care Team',
        action: 'Temporary staffing rebalance approved and logged with follow-up review scheduled for week four.',
        date: '12 March 2026',
      }}
      evidenceTitle="Evidence pack for healthcare"
      ctaLabel="Request a Healthcare Pilot"
      storyVariant="healthcare"
    />
  );
}
