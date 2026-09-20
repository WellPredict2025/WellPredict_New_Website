export default function PrivacyGateCard() {
  return (
    <div
      style={{
        maxWidth: 380,
        marginLeft: 'auto',
        padding: '20px',
        borderRadius: 14,
        background: 'linear-gradient(155deg, rgba(12, 28, 48, 0.92) 0%, rgba(6, 17, 30, 0.96) 100%)',
        border: '1px solid rgba(255,255,255,0.09)',
        boxShadow: '0 20px 60px rgba(0,0,0,0.35)',
      }}
    >
      <div style={{ fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>Privacy gate</div>
      {[
        { label: 'Team member submissions', sub: 'Anonymous · Weekly', ok: true },
        { label: 'Privacy check', sub: 'Threshold: 10 members', ok: true },
        { label: 'Team totals only', sub: 'Nothing individual shown', ok: true },
      ].map((step, i) => (
        <div key={step.label}>
          <div className="flex items-center justify-between" style={{ padding: '10px 0' }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,0.85)' }}>{step.label}</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.38)', marginTop: 2 }}>{step.sub}</div>
            </div>
            <span style={{ fontSize: 10, fontWeight: 700, color: '#0D9E72', background: 'rgba(16,185,129,0.15)', padding: '3px 8px', borderRadius: 6 }}>{step.ok ? 'READY' : 'HOLD'}</span>
          </div>
          {i < 2 && <div style={{ height: 1, background: 'rgba(255,255,255,0.06)' }} />}
        </div>
      ))}
      <div style={{ marginTop: 12, padding: '10px 12px', borderRadius: 8, background: 'rgba(20,184,166,0.08)', border: '1px solid rgba(20,184,166,0.15)', textAlign: 'center' }}>
        <span style={{ fontSize: 11, fontWeight: 600, color: '#14B8A6' }}>Evidence Pack ready · Privacy validated</span>
      </div>
    </div>
  );
}
