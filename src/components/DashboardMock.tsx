import { getHeroDashboardContent, sectorToDashboardKey } from '../config/heroDashboardContent';

function metricsForSector(sectorKey: ReturnType<typeof sectorToDashboardKey>) {
  if (sectorKey === 'corporate') {
    return [
      { l: 'Normal', v: 14, c: '#10B981' },
      { l: 'Watch', v: 2, c: '#F59E0B' },
      { l: 'Elevated', v: 2, c: '#EF4444' },
      { l: 'Packs', v: 6, c: '#14B8A6' },
    ];
  }

  return [
    { l: 'Normal', v: 18, c: '#10B981' },
    { l: 'Watch', v: 3, c: '#F59E0B' },
    { l: 'Elevated', v: 2, c: '#EF4444' },
    { l: 'Packs', v: 7, c: '#14B8A6' },
  ];
}

export default function DashboardMock({
  org,
  sector = 'Healthcare',
}: {
  org?: string;
  sector?: string;
}) {
  const content = getHeroDashboardContent(sector);
  const sectorKey = sectorToDashboardKey(sector);
  const metrics = metricsForSector(sectorKey);
  const organisation = org ?? content.organisation;
  const sectorLabel = content.sector;

  return (
    <div
      className="hero-dashboard-float"
      style={{
        width: '100%',
        maxWidth: 420,
        borderRadius: 16,
        overflow: 'hidden',
        background: 'linear-gradient(155deg, rgba(12, 28, 48, 0.92) 0%, rgba(6, 17, 30, 0.96) 100%)',
        border: '1px solid rgba(255,255,255,0.09)',
        boxShadow: '0 28px 80px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)',
        backdropFilter: 'blur(20px)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(0,0,0,0.18)' }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.9)' }}>{organisation}</div>
          <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.38)' }}>{sectorLabel}</div>
        </div>
        <span className="hero-elevated-pulse" style={{ fontSize: 9, fontWeight: 700, color: '#fff', background: 'rgba(239,68,68,0.85)', padding: '3px 8px', borderRadius: 999 }}>Elevated</span>
      </div>
      <div style={{ padding: '14px' }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.85)', marginBottom: 4 }}>Team Condition Overview</div>
        <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.38)', marginBottom: 12 }}>{content.subtitle}</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6 }}>
          {metrics.map((m) => (
            <div key={m.l} style={{ padding: '8px 6px', borderRadius: 8, background: `${m.c}10`, border: `1px solid ${m.c}22`, textAlign: 'center' }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 16, fontWeight: 600, color: m.c }}>{m.v}</div>
              <div style={{ fontSize: 7, color: 'rgba(255,255,255,0.4)', marginTop: 2, textTransform: 'uppercase' }}>{m.l}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 12, padding: '10px', borderRadius: 10, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ fontSize: 8, fontWeight: 600, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>{content.liveTeamsTitle}</div>
          {content.teams.map((t, i) => (
            <div key={t.name} className="flex items-center justify-between" style={{ padding: '5px 0', borderTop: i ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
              <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.75)' }}>{t.name}</span>
              <span style={{ fontSize: 8, fontWeight: 600, color: t.color, background: `${t.color}18`, padding: '2px 6px', borderRadius: 999 }}>{t.state}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
