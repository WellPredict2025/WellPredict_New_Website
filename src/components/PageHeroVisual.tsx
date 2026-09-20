import DashboardMock from './DashboardMock';
import CareersHeroPanel from './CareersHeroPanel';
import EvidencePackMockup from './EvidencePackMockup';
import LeadershipHeroPanel from './LeadershipHeroPanel';
import PrivacyGateCard from './PrivacyGateCard';
import { SECTORS } from '../config/site';

export type PageHeroVisualType =
  | 'dashboard'
  | 'evidencePack'
  | 'privacyGate'
  | 'security'
  | 'pricing'
  | 'sector'
  | 'team'
  | 'contact'
  | 'legal'
  | 'workflow'
  | 'mission'
  | 'careers'
  | 'press';

interface PageHeroVisualProps {
  type: PageHeroVisualType;
  sectorAccent?: string;
  org?: string;
  sector?: string;
}

function HeroCard({
  children,
  accent = '#14B8A6',
  maxWidth = 420,
}: {
  children: React.ReactNode;
  accent?: string;
  maxWidth?: number;
}) {
  return (
    <div
      className="hero-dashboard-float"
      style={{
        width: '100%',
        maxWidth,
        borderRadius: 16,
        overflow: 'hidden',
        background: 'linear-gradient(155deg, rgba(12, 28, 48, 0.92) 0%, rgba(6, 17, 30, 0.96) 100%)',
        border: '1px solid rgba(255,255,255,0.09)',
        boxShadow: '0 28px 80px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)',
        backdropFilter: 'blur(20px)',
        borderTop: `3px solid ${accent}`,
      }}
    >
      {children}
    </div>
  );
}

const WORKFLOW_STEPS = [
  { num: '01', title: 'Collect', accent: '#14B8A6' },
  { num: '02', title: 'Detect', accent: '#F59E0B' },
  { num: '03', title: 'Act', accent: '#0D9E72' },
  { num: '04', title: 'Compile', accent: '#1B6BB0' },
];

export default function PageHeroVisual({ type, org, sector }: PageHeroVisualProps) {
  let content: React.ReactNode;

  switch (type) {
    case 'dashboard':
      content = <DashboardMock org={org} sector={sector} />;
      break;

    case 'evidencePack':
      content = <EvidencePackMockup />;
      break;

    case 'privacyGate':
      content = <PrivacyGateCard />;
      break;

    case 'security':
      content = (
        <HeroCard accent="#0D9E72" maxWidth={360}>
          <div style={{ padding: '22px 20px' }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Security architecture
            </span>
            <div style={{ fontSize: 24, fontWeight: 600, color: '#fff', marginTop: 10 }}>Controlled access layers</div>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', margin: '10px 0 18px', lineHeight: 1.55 }}>
              Role-based permissions, encrypted sessions, and append-only audit events.
            </p>
            {['Authentication', 'Access control', 'Audit integrity', 'UK hosting'].map((item, i) => (
              <div
                key={item}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 12px',
                  borderRadius: 8,
                  marginBottom: i < 3 ? 8 : 0,
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.75)' }}>{item}</span>
                <span style={{ fontSize: 10, fontWeight: 600, color: '#0D9E72' }}>Designed</span>
              </div>
            ))}
          </div>
        </HeroCard>
      );
      break;

    case 'pricing':
      content = (
        <div className="page-hero-visual-grid page-hero-visual-grid--pricing">
          {[
            { name: 'Pilot', desc: 'One team · Four weeks', accent: '#14B8A6' },
            { name: 'Organisation', desc: 'Multi-team rollout', accent: '#14B8A6' },
            { name: 'Enterprise', desc: 'Group-wide deployment', accent: '#1B6BB0' },
          ].map((plan) => (
            <div
              key={plan.name}
              className="hero-dashboard-float"
              style={{
                padding: '16px 14px',
                borderRadius: 12,
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderTop: `3px solid ${plan.accent}`,
                gridColumn: plan.name === 'Enterprise' ? '1 / -1' : undefined,
              }}
            >
              <div style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>{plan.name}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', marginTop: 4 }}>{plan.desc}</div>
              <div style={{ fontSize: 11, fontWeight: 600, color: plan.accent, marginTop: 10 }}>Request pricing</div>
            </div>
          ))}
        </div>
      );
      break;

    case 'sector':
      content = (
        <div className="page-hero-visual-grid page-hero-visual-grid--sector">
          {SECTORS.map((s) => (
            <div
              key={s.slug}
              className="hero-dashboard-float"
              style={{
                padding: '14px 12px',
                borderRadius: 10,
                background: 'rgba(255,255,255,0.05)',
                border: `1px solid ${s.accent}33`,
                borderTop: `3px solid ${s.accent}`,
              }}
            >
              <span style={{ fontSize: 11, fontWeight: 600, color: s.accent }}>{s.title}</span>
            </div>
          ))}
        </div>
      );
      break;

    case 'team':
      content = <LeadershipHeroPanel />;
      break;

    case 'contact':
      content = (
        <HeroCard accent="#14B8A6" maxWidth={340}>
          <div style={{ padding: '20px 18px' }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Contact preview
            </span>
            {['Full name', 'Organisation', 'Role', 'Email', 'Sector', 'Message'].map((field) => (
              <div key={field} style={{ marginTop: 12 }}>
                <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{field}</div>
                <div style={{ height: field === 'Message' ? 48 : 28, borderRadius: 6, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }} />
              </div>
            ))}
            <div style={{ marginTop: 16, padding: '10px', borderRadius: 8, background: '#14B8A6', textAlign: 'center', fontSize: 12, fontWeight: 600, color: '#fff' }}>
              Send message
            </div>
          </div>
        </HeroCard>
      );
      break;

    case 'legal':
      content = (
        <HeroCard accent="#6366F1" maxWidth={340}>
          <div style={{ padding: '22px 20px' }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Legal document
            </span>
            <div style={{ fontSize: 20, fontWeight: 600, color: '#fff', marginTop: 10 }}>Policy overview</div>
            {['Overview', 'Information collected', 'Retention', 'Your rights', 'Contact'].map((section, i) => (
              <div
                key={section}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '8px 0',
                  borderBottom: i < 4 ? '1px solid rgba(255,255,255,0.06)' : undefined,
                }}
              >
                <span style={{ fontSize: 10, color: '#14B8A6', fontWeight: 700 }}>{String(i + 1).padStart(2, '0')}</span>
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>{section}</span>
              </div>
            ))}
          </div>
        </HeroCard>
      );
      break;

    case 'workflow':
      content = (
        <HeroCard accent="#14B8A6" maxWidth={360}>
          <div style={{ padding: '20px 18px' }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Evidence workflow
            </span>
            <div className="flex flex-col" style={{ gap: 10, marginTop: 16 }}>
              {WORKFLOW_STEPS.map((step) => (
                <div key={step.num} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: step.accent, width: 24 }}>{step.num}</span>
                  <div style={{ flex: 1, height: 8, borderRadius: 999, background: `${step.accent}22`, overflow: 'hidden' }}>
                    <div style={{ width: '100%', height: '100%', background: step.accent, opacity: 0.85, borderRadius: 999 }} />
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#fff', minWidth: 64 }}>{step.title}</span>
                </div>
              ))}
            </div>
          </div>
        </HeroCard>
      );
      break;

    case 'mission':
      content = (
        <HeroCard accent="#14B8A6" maxWidth={360}>
          <div style={{ padding: '22px 20px' }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Product principles
            </span>
            {['Privacy-gated by design', 'Team-level signals only', 'Versioned evidence records', 'Sector-configured language'].map((principle) => (
              <div
                key={principle}
                style={{
                  marginTop: 12,
                  padding: '12px 14px',
                  borderRadius: 8,
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  fontSize: 12,
                  color: 'rgba(255,255,255,0.78)',
                  lineHeight: 1.5,
                }}
              >
                {principle}
              </div>
            ))}
          </div>
        </HeroCard>
      );
      break;

    case 'careers':
      content = <CareersHeroPanel />;
      break;

    case 'press':
      content = (
        <HeroCard accent="#1B6BB0" maxWidth={340}>
          <div style={{ padding: '22px 20px' }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Media kit
            </span>
            {['Brand assets', 'Logo pack', 'Product screenshots', 'Company fact sheet'].map((item) => (
              <div
                key={item}
                style={{
                  marginTop: 10,
                  padding: '10px 12px',
                  borderRadius: 8,
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  fontSize: 12,
                  color: 'rgba(255,255,255,0.7)',
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </HeroCard>
      );
      break;

    default:
      content = null;
  }

  return <div className="page-hero-visual-root">{content}</div>;
}
