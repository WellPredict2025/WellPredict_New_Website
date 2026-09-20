import { useState } from 'react';
import { SECTORS } from '../../config/site';
import DashboardMock from '../DashboardMock';

const SECTOR_DETAILS: Record<string, { teams: string[]; packLanguage: string; context: string }> = {
  healthcare: { teams: ['Ward Alpha', 'Ward Beta', 'Urgent Care Team'], packLanguage: 'CQC Well-Led evidence conversation', context: 'Ward-level operating conditions and safer staffing governance' },
  food: { teams: ['Line One', 'Packing Team', 'Quality Team'], packLanguage: 'Production line evidence record', context: 'Shift-level conditions and HACCP-style oversight' },
  financial: { teams: ['Operations Risk', 'Client Services', 'Controls Team'], packLanguage: 'Operational resilience record', context: 'Controls team visibility and management oversight' },
  legal: { teams: ['Litigation Team', 'Client Intake Team', 'Compliance Team'], packLanguage: 'Practice management evidence', context: 'Workload governance and compliance action records' },
  education: { teams: ['Year Seven Team', 'Safeguarding Team', 'Learning Support Team'], packLanguage: 'Leadership evidence cycle', context: 'Teaching team visibility and leadership action records' },
  corporate: { teams: ['Operations', 'Customer Support', 'Compliance', 'Finance Team'], packLanguage: 'Board-ready internal review', context: 'Department-level governance and management action' },
};

export default function SectorPreviewPanel() {
  const [activeSlug, setActiveSlug] = useState<string>(SECTORS[0].slug);

  return (
    <div className="sector-preview">
      <div className="sector-preview__selector" role="tablist" aria-label="Sector selector">
        {SECTORS.map((s) => (
          <button
            key={s.slug}
            type="button"
            role="tab"
            id={`sectors-tab-${s.slug}`}
            aria-selected={activeSlug === s.slug}
            aria-controls={`sectors-panel-${s.slug}`}
            tabIndex={activeSlug === s.slug ? 0 : -1}
            className={`sector-preview__tab${activeSlug === s.slug ? ' sector-preview__tab--active' : ''}`}
            style={{ '--sector-accent': s.accent } as React.CSSProperties}
            onClick={() => setActiveSlug(s.slug)}
          >
            {s.title}
          </button>
        ))}
      </div>

      {SECTORS.map((s) => {
        const panelDetails = SECTOR_DETAILS[s.slug];
        const isActive = activeSlug === s.slug;
        return (
          <div
            key={s.slug}
            id={`sectors-panel-${s.slug}`}
            role="tabpanel"
            aria-labelledby={`sectors-tab-${s.slug}`}
            hidden={!isActive}
            className="sector-preview__panel"
          >
            {isActive ? (
              <div className="sector-preview__content">
                <div className="sector-preview__copy">
                  <span className="sector-preview__org">{s.org}</span>
                  <h3 style={{ color: s.accent }}>{s.title}</h3>
                  <p className="sector-preview__regulators">{s.regulators}</p>
                  <p className="sector-preview__context">{panelDetails.context}</p>
                  <div className="sector-preview__teams">
                    <span className="sector-preview__label">Teams</span>
                    <ul>{panelDetails.teams.map((t) => <li key={t}>{t}</li>)}</ul>
                  </div>
                  <div className="sector-preview__pack">
                    <span className="sector-preview__label">Evidence pack language</span>
                    <p>{panelDetails.packLanguage}</p>
                  </div>
                </div>
                <div className="sector-preview__mockup" aria-hidden="true">
                  <DashboardMock org={s.org} sector={s.title} />
                </div>
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
