export default function ProofBar() {
  const items = [
    { icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1l2 2.5h2.5a1 1 0 0 1 1 1v8a2 2 0 0 1-2 2H4.5a2 2 0 0 1-2-2v-8a1 1 0 0 1 1-1H6L8 1Z" stroke="#fff" strokeWidth="1.2"/><path d="M5.5 8l2 2 3.5-3.5" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>, label: '100% Team-level' },
    { icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="3" y="7" width="10" height="7" rx="1.5" stroke="#fff" strokeWidth="1.2"/><path d="M5 7V4.5a3 3 0 0 1 6 0V7" stroke="#fff" strokeWidth="1.2"/><circle cx="8" cy="10.5" r="1" fill="#fff"/></svg>, label: 'Zero individual data' },
    { icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 8h3l2-5 3 10 2-5h2" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>, label: 'UK data residency' },
    { icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 6l2.5 3L8 5.5l2.5 3.5L13 5" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><rect x="2" y="2" width="12" height="12" rx="2" stroke="#fff" strokeWidth="1.2"/></svg>, label: 'SHA-256 verified' },
  ];

  return (
    <section id="proof-bar" style={{ background: '#0B1F33', padding: '18px 80px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 40, flexWrap: 'wrap' }}>
        {items.map((item) => (
          <div key={item.label} className="flex items-center" style={{ gap: 8 }}>
            <span style={{ opacity: 0.6 }}>{item.icon}</span>
            <span style={{ fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,0.65)', letterSpacing: '0.02em' }}>{item.label}</span>
          </div>
        ))}
      </div>

      <style>{`@media (max-width: 900px) { #proof-bar { padding: 14px 24px !important; } #proof-bar > div { gap: 20px !important; } }`}</style>
    </section>
  );
}
