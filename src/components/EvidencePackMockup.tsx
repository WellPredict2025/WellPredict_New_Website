export default function EvidencePackMockup({ compact = false }: { compact?: boolean }) {
  const rows = compact
    ? [
        { l: 'Team conditions', v: 'Elevated', c: '#EF4444' },
        { l: 'Management action', v: 'Logged', c: '#0D9E72' },
        { l: 'Privacy check', v: 'Pass', c: '#0D9E72' },
        { l: 'Document status', v: 'Sealed', c: '#14B8A6' },
      ]
    : [
        { l: 'What the team experienced', v: 'High pressure · 3 weeks', c: '#C62828' },
        { l: 'Privacy check', v: 'Threshold met', c: '#0D9E72' },
        { l: 'Management action', v: 'Response logged', c: '#0D9E72' },
        { l: 'Result after action', v: 'Pressure reducing', c: '#F59E0B' },
        { l: 'Document status', v: 'Sealed v1', c: '#14B8A6' },
      ];

  return (
    <div style={{ background: '#fff', borderRadius: 14, overflow: 'hidden', boxShadow: '0 24px 64px rgba(0,0,0,0.35)', maxWidth: compact ? 360 : 440, marginLeft: 'auto' }}>
      <div style={{ background: '#0F172A', padding: compact ? '12px 16px' : '14px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: compact ? 11 : 13, fontWeight: 600, color: '#fff' }}>Governance Evidence Pack</span>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#94A3B8' }}>v1 · Final</span>
      </div>
      {rows.map((r, i) => (
        <div key={r.l} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: compact ? '10px 16px' : '11px 20px', borderBottom: i < rows.length - 1 ? '1px solid #F1F5F9' : 'none' }}>
          <span style={{ fontSize: compact ? 11 : 12, color: '#475569' }}>{r.l}</span>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 500, color: r.c, background: `${r.c}10`, padding: '2px 8px', borderRadius: 4 }}>{r.v}</span>
        </div>
      ))}
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 16px', background: '#F8FAFC', borderTop: '1px solid #DCE8EF' }}>
        <span style={{ fontSize: 10, fontWeight: 600, color: '#0D9E72' }}>Tamper-proof seal applied</span>
        <span style={{ fontSize: 9, color: '#94A3B8' }}>v1 · Locked</span>
      </div>
    </div>
  );
}
