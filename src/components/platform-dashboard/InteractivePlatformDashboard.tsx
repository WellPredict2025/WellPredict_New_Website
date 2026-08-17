import { useMemo, useState, type CSSProperties } from 'react';
import { cloneSectorData } from './mockData';
import DashboardDrawer from './DashboardDrawer';
import { useDashboardToast } from './DashboardToast';
import {
  SIDEBAR_ITEMS,
  SECTOR_TABS,
  STATE_COLORS,
  VIEW_LABELS,
  type DashboardView,
  type DrawerState,
  type InterventionRecord,
  type PackRecord,
  type PolicySettings,
  type SectorKey,
  type TeamRecord,
} from './types';

function Sparkline({ path }: { path: string }) {
  return (
    <>
      <svg viewBox="0 0 200 50" className="w-full" style={{ height: 50 }} aria-hidden="true">
        <defs>
          <linearGradient id="platformSparkGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#14B8A6" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#14B8A6" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={path} fill="none" stroke="#14B8A6" strokeWidth="2" strokeLinecap="round" />
        <path d={`${path} V50 H0 Z`} fill="url(#platformSparkGrad)" />
      </svg>
      <span className="sr-only">Eight week operating condition trend chart.</span>
    </>
  );
}

const sidebarBtnStyle = (active: boolean): CSSProperties => ({
  padding: '5px 8px',
  borderRadius: 6,
  fontSize: 11,
  fontWeight: active ? 600 : 400,
  color: active ? '#fff' : '#3B5166',
  background: active ? '#0B1F33' : 'transparent',
  cursor: 'pointer',
  border: 'none',
  textAlign: 'left',
  width: '100%',
  transition: 'background 0.2s, color 0.2s',
});

const tabStyle = (active: boolean): CSSProperties => ({
  fontSize: 10,
  fontWeight: active ? 600 : 400,
  color: active ? '#0F172A' : '#94A3B8',
  background: active ? '#F7FBFC' : 'transparent',
  padding: '3px 8px',
  borderRadius: 4,
  cursor: 'pointer',
  border: 'none',
});

const metricCardStyle = (bg: string): CSSProperties => ({
  background: bg,
  borderRadius: 8,
  padding: '10px 12px',
  cursor: 'pointer',
  border: '1px solid transparent',
  transition: 'border-color 0.2s, transform 0.2s',
});

const privacyBadgeColor: Record<string, string> = {
  Passed: '#0D9E72',
  Suppressed: '#C87A20',
  Purged: '#64748B',
};

export default function InteractivePlatformDashboard() {
  const { showToast } = useDashboardToast();
  const [sectorData, setSectorData] = useState(cloneSectorData);
  const [activeSector, setActiveSector] = useState<SectorKey>('healthcare');
  const [activeView, setActiveView] = useState<DashboardView>('condition');
  const [teamFilter, setTeamFilter] = useState<'all' | 'elevated'>('all');
  const [drawer, setDrawer] = useState<DrawerState>(null);

  const sector = sectorData[activeSector];

  const filteredTeams = useMemo(() => {
    if (teamFilter === 'elevated') return sector.teams.filter((t) => t.state === 'Elevated');
    return sector.teams;
  }, [sector.teams, teamFilter]);

  const sidebarGroups = useMemo(() => {
    const groups = ['Evidence', 'Audit', 'Config'];
    return groups.map((group) => ({
      group,
      items: SIDEBAR_ITEMS.filter((item) => item.group === group),
    }));
  }, []);

  const updatePacks = (updater: (packs: PackRecord[]) => PackRecord[]) => {
    setSectorData((prev) => ({
      ...prev,
      [activeSector]: {
        ...prev[activeSector],
        packs: updater(prev[activeSector].packs),
      },
    }));
  };

  const updateInterventions = (updater: (items: InterventionRecord[]) => InterventionRecord[]) => {
    setSectorData((prev) => ({
      ...prev,
      [activeSector]: {
        ...prev[activeSector],
        interventions: updater(prev[activeSector].interventions),
      },
    }));
  };

  const updatePolicy = (policy: PolicySettings) => {
    setSectorData((prev) => ({
      ...prev,
      [activeSector]: { ...prev[activeSector], policy },
    }));
  };

  const handleMetricClick = (label: string) => {
    if (label === 'Teams') {
      setActiveView('condition');
      setTeamFilter('all');
    } else if (label === 'Packs Ready') {
      setActiveView('packs');
    } else if (label === 'Elevated') {
      setActiveView('condition');
      setTeamFilter('elevated');
    } else if (label === 'Privacy Gate') {
      setActiveView('privacy-log');
      showToast('Privacy log opened');
    }
  };

  const handleSectorChange = (key: SectorKey) => {
    setActiveSector(key);
    setTeamFilter('all');
    setDrawer(null);
  };

  const handleSectorTabKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    const nextIndex = event.key === 'ArrowRight'
      ? (index + 1) % SECTOR_TABS.length
      : (index - 1 + SECTOR_TABS.length) % SECTOR_TABS.length;
    handleSectorChange(SECTOR_TABS[nextIndex].key);
  };

  const compilePack = (packId: string) => {
    updatePacks((packs) =>
      packs.map((p) => (p.id === packId ? { ...p, readiness: 'Compiled' } : p)),
    );
  };

  const markReviewed = (interventionId: string) => {
    updateInterventions((items) =>
      items.map((i) => (i.id === interventionId ? { ...i, status: 'Reviewed' } : i)),
    );
  };

  const addFollowUp = (interventionId: string, note: string) => {
    updateInterventions((items) =>
      items.map((i) =>
        i.id === interventionId
          ? { ...i, followUpDate: '2026-06-14', outcome: `${i.outcome} · ${note}` }
          : i,
      ),
    );
  };

  const openTeam = (team: TeamRecord) => setDrawer({ kind: 'team', item: team });
  const openPack = (pack: PackRecord) => setDrawer({ kind: 'pack', item: pack });
  const openIntervention = (item: InterventionRecord) => setDrawer({ kind: 'intervention', item });

  const renderConditionView = () => (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 12 }} className="platform-metric-grid">
        {[
          { label: 'Teams', value: String(sector.metrics.teams), color: '#0F172A', bg: '#F7FBFC' },
          { label: 'Packs Ready', value: String(sector.metrics.packsReady), color: '#1B6BB0', bg: '#EFF6FF' },
          { label: 'Elevated', value: String(sector.metrics.elevated), color: '#B83228', bg: '#FEF2F2' },
          { label: 'Privacy Gate', value: sector.metrics.privacyGate, color: '#0D9E72', bg: '#ECFDF5' },
        ].map((m) => (
          <button
            key={m.label}
            type="button"
            className="platform-metric-card"
            style={metricCardStyle(m.bg)}
            onClick={() => handleMetricClick(m.label)}
          >
            <span style={{ fontSize: 10, color: '#3B5166' }}>{m.label}</span>
            <span style={{ display: 'block', fontFamily: "'JetBrains Mono', monospace", fontSize: 20, fontWeight: 500, color: m.color, marginTop: 2 }}>{m.value}</span>
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 10 }} className="platform-two-col">
        <div style={{ background: '#F8FAFC', borderRadius: 8, padding: '12px 14px' }}>
          <div className="flex items-center justify-between" style={{ marginBottom: 8 }}>
            <span style={{ fontSize: 10, fontWeight: 600, color: '#0F172A' }}>Current States</span>
            {teamFilter === 'elevated' && (
              <button type="button" style={{ fontSize: 9, color: '#14B8A6', background: 'none', border: 'none', cursor: 'pointer' }} onClick={() => setTeamFilter('all')}>
                Show all
              </button>
            )}
          </div>
          <div className="flex flex-col" style={{ gap: 6 }}>
            {filteredTeams.map((w) => (
              <button
                key={w.id}
                type="button"
                className="platform-clickable-row"
                onClick={() => openTeam(w)}
              >
                <div className="flex items-center" style={{ gap: 6 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: STATE_COLORS[w.state] }} />
                  <span style={{ fontSize: 11, color: '#0F172A' }}>{w.name}</span>
                </div>
                <span style={{ fontSize: 9, fontWeight: 600, color: STATE_COLORS[w.state], background: `${STATE_COLORS[w.state]}12`, padding: '2px 6px', borderRadius: 4 }}>{w.state}</span>
              </button>
            ))}
          </div>
        </div>
        <div style={{ background: '#F8FAFC', borderRadius: 8, padding: '12px 14px' }}>
          <span style={{ fontSize: 10, fontWeight: 600, color: '#0F172A' }}>8-Week Trend</span>
          <div style={{ marginTop: 6 }}><Sparkline path={sector.trendPath} /></div>
        </div>
      </div>

      <div style={{ background: '#F8FAFC', borderRadius: 8, padding: '12px 14px' }}>
        <span style={{ fontSize: 10, fontWeight: 600, color: '#0F172A' }}>Recent Interventions</span>
        <div className="flex flex-col" style={{ gap: 6, marginTop: 8 }}>
          {sector.interventions.map((intr) => (
            <button key={intr.id} type="button" className="platform-clickable-row platform-intervention-row" onClick={() => openIntervention(intr)}>
              <div className="flex items-center" style={{ gap: 8 }}>
                <span style={{ fontSize: 12 }}>{intr.status === 'Resolved' || intr.status === 'Reviewed' ? '✓' : intr.status === 'Active' ? '◐' : '●'}</span>
                <span style={{ fontSize: 11, fontWeight: 500, color: '#0F172A' }}>{intr.title}</span>
              </div>
              <span style={{ fontSize: 9, fontWeight: 600, color: intr.status === 'Reviewed' ? '#0D9E72' : intr.status === 'Resolved' ? '#0D9E72' : '#C87A20', background: '#fff', padding: '2px 8px', borderRadius: 4 }}>{intr.status}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );

  const renderPacksView = () => (
    <>
      <div className="platform-packs-summary">
        <span className="platform-packs-summary__pill">12 sections</span>
        <span className="platform-packs-summary__pill">Privacy validated</span>
        <span className="platform-packs-summary__pill">Team-level data only</span>
      </div>
      <div className="platform-card-grid">
      {sector.packs.map((pack) => (
        <div key={pack.id} className="platform-pack-card">
          <div style={{ fontSize: 12, fontWeight: 700, color: '#0F172A', marginBottom: 8 }}>{pack.title}</div>
          <div style={{ fontSize: 10, color: '#64748B', marginBottom: 4 }}>{pack.team}</div>
          <div style={{ fontSize: 10, color: '#64748B', marginBottom: 8 }}>{pack.dateRange}</div>
          <span style={{ display: 'inline-block', fontSize: 9, fontWeight: 700, color: '#1B6BB0', background: '#EFF6FF', padding: '3px 8px', borderRadius: 999, marginBottom: 12 }}>
            {pack.readiness}
          </span>
          <div className="platform-pack-actions">
            <button type="button" className="platform-btn platform-btn-ghost" onClick={() => openPack(pack)}>View Pack</button>
            <button
              type="button"
              className="platform-btn platform-btn-secondary"
              onClick={() => {
                compilePack(pack.id);
                showToast('Evidence pack compiled');
              }}
            >
              Compile Pack
            </button>
            <button type="button" className="platform-btn platform-btn-ghost" onClick={() => showToast('Preview prepared')}>Download Preview</button>
          </div>
        </div>
      ))}
    </div>
    </>
  );

  const renderInterventionsView = () => (
    <div className="platform-table-wrap">
      <table className="platform-table">
        <thead>
          <tr>
            <th>Team</th>
            <th>Trigger</th>
            <th>Action</th>
            <th>Owner</th>
            <th>Status</th>
            <th>Outcome</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sector.interventions.map((intr) => (
            <tr key={intr.id}>
              <td>{intr.team}</td>
              <td>{intr.trigger}</td>
              <td>{intr.action}</td>
              <td>{intr.owner}</td>
              <td>{intr.status}</td>
              <td>{intr.outcome}</td>
              <td>
                <div className="platform-inline-actions">
                  <button type="button" className="platform-btn platform-btn-ghost" onClick={() => openIntervention(intr)}>View Details</button>
                  <button type="button" className="platform-btn platform-btn-ghost" onClick={() => { markReviewed(intr.id); showToast('Intervention reviewed'); }}>Mark Reviewed</button>
                  <button type="button" className="platform-btn platform-btn-ghost" onClick={() => { addFollowUp(intr.id, 'Follow-up scheduled'); showToast('Follow-up added'); }}>Add Follow-up</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="platform-mobile-cards">
        {sector.interventions.map((intr) => (
          <div key={intr.id} className="platform-mobile-card">
            <div style={{ fontWeight: 700, fontSize: 12, marginBottom: 6 }}>{intr.title}</div>
            <div style={{ fontSize: 10, color: '#64748B', marginBottom: 4 }}>{intr.team} · {intr.status}</div>
            <div className="platform-inline-actions" style={{ marginTop: 8 }}>
              <button type="button" className="platform-btn platform-btn-ghost" onClick={() => openIntervention(intr)}>View Details</button>
              <button type="button" className="platform-btn platform-btn-ghost" onClick={() => { markReviewed(intr.id); showToast('Intervention reviewed'); }}>Mark Reviewed</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAuditView = () => (
    <div className="platform-timeline">
      {sector.auditEvents.map((event) => (
        <button key={event.id} type="button" className="platform-timeline-item" onClick={() => setDrawer({ kind: 'audit', item: event })}>
          <div style={{ fontSize: 10, color: '#64748B' }}>{event.timestamp}</div>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#0F172A', marginTop: 4 }}>{event.type}</div>
          <div style={{ fontSize: 11, color: '#475569', marginTop: 4 }}>{event.detail}</div>
          <div style={{ fontSize: 10, color: '#14B8A6', marginTop: 6 }}>{event.actor}</div>
        </button>
      ))}
    </div>
  );

  const renderPrivacyView = () => (
    <>
      <div className="platform-privacy-summary">
        <div className="platform-privacy-summary__stat">
          <span>Individual scores exposed</span>
          <strong>0</strong>
        </div>
        <div className="platform-privacy-summary__stat">
          <span>Privacy threshold</span>
          <strong>{sector.policy.minTeamThreshold} members</strong>
        </div>
        <div className="platform-privacy-summary__stat">
          <span>Data level</span>
          <strong>Team-level only</strong>
        </div>
      </div>
      <p style={{ fontSize: 11, color: '#64748B', margin: '0 0 12px' }}>
        Privacy gate history for {sector.organisation}. Team totals only. No individual data is stored or displayed.
      </p>
      <div className="platform-table-wrap">
        <table className="platform-table">
          <thead>
            <tr>
              <th>Team</th>
              <th>Check</th>
              <th>Team size</th>
              <th>Threshold</th>
              <th>Period</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {sector.privacyLog.map((entry) => (
              <tr key={entry.id}>
                <td>{entry.team}</td>
                <td>{entry.check}</td>
                <td>{entry.teamSize}</td>
                <td>{entry.threshold}</td>
                <td>{entry.period}</td>
                <td>
                  <span style={{ fontSize: 9, fontWeight: 700, color: privacyBadgeColor[entry.badge], background: `${privacyBadgeColor[entry.badge]}14`, padding: '3px 8px', borderRadius: 999 }}>
                    {entry.badge}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );

  const renderPolicyView = () => {
    const policy = sector.policy;
    return (
      <>
        <p style={{ fontSize: 11, color: '#64748B', margin: '0 0 16px' }}>
          {policy.sectorLabel} configuration · {policy.complianceLabel}
        </p>
        <div className="platform-policy-grid">
          {[
            { key: 'minTeamThreshold' as const, label: 'Minimum team threshold', type: 'number' },
            { key: 'reviewPeriodWeeks' as const, label: 'Review period (weeks)', type: 'number' },
            { key: 'evidenceRetentionMonths' as const, label: 'Evidence retention (months)', type: 'number' },
            { key: 'watchThreshold' as const, label: 'Watch threshold', type: 'number' },
            { key: 'elevatedThreshold' as const, label: 'Elevated threshold', type: 'number' },
          ].map((field) => (
            <label key={field.key} className="platform-policy-field">
              <span>{field.label}</span>
              <input
                type="number"
                value={policy[field.key]}
                step={field.key.includes('Threshold') ? 0.1 : 1}
                onChange={(e) => {
                  const value = field.key.includes('Threshold') ? parseFloat(e.target.value) : parseInt(e.target.value, 10);
                  updatePolicy({ ...policy, [field.key]: Number.isNaN(value) ? policy[field.key] : value });
                }}
              />
            </label>
          ))}
        </div>
        <div style={{ marginTop: 16 }}>
          <label className="platform-toggle">
            <input
              type="checkbox"
              checked={policy.reviewPeriodWeeks >= 4}
              onChange={(e) => updatePolicy({ ...policy, reviewPeriodWeeks: e.target.checked ? 4 : 2 })}
            />
            <span>Enable extended review period</span>
          </label>
        </div>
        <button
          type="button"
          className="platform-btn platform-btn-primary"
          style={{ marginTop: 16 }}
          onClick={() => showToast('Settings saved')}
        >
          Save Settings
        </button>
      </>
    );
  };

  const renderMain = () => {
    switch (activeView) {
      case 'condition': return renderConditionView();
      case 'packs': return renderPacksView();
      case 'interventions': return renderInterventionsView();
      case 'audit-trail': return renderAuditView();
      case 'privacy-log': return renderPrivacyView();
      case 'policy-settings': return renderPolicyView();
    }
  };

  const sectorPanelId = (key: SectorKey) => `sector-panel-${key}`;
  const sectorTabId = (key: SectorKey) => `sector-tab-${key}`;

  return (
    <div className="platform-dashboard-shell" style={{ position: 'relative' }}>
      <div className="flex items-center" style={{ background: '#0B1F33', padding: '10px 16px', gap: 10 }}>
        <div className="flex items-center" style={{ gap: 6 }}>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#B83228' }} />
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#C87A20' }} />
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#0D9E72' }} />
        </div>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#4A6880', marginLeft: 6 }}>
          {sector.organisation} · {sector.sectorLabel}
        </span>
      </div>

      <div style={{ display: 'flex', minHeight: 420 }}>
        <nav className="platform-sidebar" aria-label="Dashboard navigation">
          {sidebarGroups.map(({ group, items }) => (
            <div key={group} style={{ marginBottom: 16 }}>
              <span style={{ fontSize: 8, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.1em', padding: '0 8px' }}>{group}</span>
              <div className="flex flex-col" style={{ gap: 1, marginTop: 4 }}>
                {items.map((item) => (
                  <button
                    key={item.view}
                    type="button"
                    style={sidebarBtnStyle(activeView === item.view)}
                    aria-current={activeView === item.view ? 'page' : undefined}
                    onClick={() => {
                      setActiveView(item.view);
                      setDrawer(null);
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="flex-1 platform-main-panel" style={{ padding: '16px 20px' }}>
          <div className="flex items-center justify-between platform-main-header" style={{ marginBottom: 12 }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, color: '#0F172A', margin: 0 }}>{VIEW_LABELS[activeView]}</h3>
            <div className="flex items-center" style={{ gap: 4 }} role="tablist" aria-label="Sector dashboard preview">
              {SECTOR_TABS.map((tab, index) => (
                <button
                  key={tab.key}
                  id={sectorTabId(tab.key)}
                  type="button"
                  role="tab"
                  aria-selected={activeSector === tab.key}
                  aria-controls={sectorPanelId(tab.key)}
                  tabIndex={activeSector === tab.key ? 0 : -1}
                  style={tabStyle(activeSector === tab.key)}
                  onClick={() => handleSectorChange(tab.key)}
                  onKeyDown={(event) => handleSectorTabKeyDown(event, index)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div
            id={sectorPanelId(activeSector)}
            role="tabpanel"
            aria-labelledby={sectorTabId(activeSector)}
            className="platform-view-panel"
          >
            {renderMain()}
          </div>
        </div>
      </div>

      <DashboardDrawer
        drawer={drawer}
        onClose={() => setDrawer(null)}
        onCompilePack={compilePack}
        onMarkReviewed={markReviewed}
        onAddFollowUp={addFollowUp}
        showToast={showToast}
      />
    </div>
  );
}
