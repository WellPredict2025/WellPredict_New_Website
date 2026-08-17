import { useEffect, useRef } from 'react';

const STEPS = [
  { num: 1, label: 'Site', sub: 'Location' },
  { num: 2, label: 'Line', sub: 'Production' },
  { num: 3, label: 'Shift', sub: 'Time window' },
  { num: 4, label: 'Operating Window', sub: 'Collection period' },
  { num: 5, label: 'HOCS', sub: 'Classified state' },
  { num: 6, label: 'Corrective Action', sub: 'Logged' },
  { num: 7, label: 'Evidence Pack', sub: 'Immutable' },
];

const TERMINAL = [
  { k: 'site_id', v: 'SITE-042 · Manchester', c: '#DCE8EF' },
  { k: 'line', v: 'LINE-03 · Packing', c: '#DCE8EF' },
  { k: 'shift', v: 'SHIFT-02 · 14:00-22:00', c: '#DCE8EF' },
  { k: 'threshold_met', v: 'true', c: '#0D9E72' },
  { k: 'hocs_state', v: 'ELEVATED', c: '#B83228' },
  { k: 'corrective_action', v: 'Logged · REF-2291', c: '#1B6BB0' },
  { k: 'evidence_pack', v: 'COMPILED · v1 · FINAL', c: '#8B5CF6' },
];

export default function HumanHACCP() {
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.querySelectorAll('.reveal').forEach((el) => el.classList.add('revealed')); observer.unobserve(entry.target); } });
    }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="human-haccp" ref={sectionRef} className="section-padding" style={{ background: '#F7FBFC', borderTop: '1px solid #DCE8EF' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, maxWidth: 1200, margin: '0 auto' }}>
        {/* Left */}
        <div className="flex flex-col" style={{ gap: 24 }}>
          <span className="eyebrow reveal">Human HACCP</span>
          <h2 className="reveal reveal-d1" style={{ fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 400, color: '#0F172A', margin: 0 }}>
            The missing control point.
          </h2>
          <p className="reveal reveal-d2" style={{ color: '#3B5166', fontSize: 14, lineHeight: 1.6, margin: 0 }}>
            Human operating capacity as a formal CCP. Site → Line → Shift → Evidence.
          </p>

          <div className="flex flex-col reveal reveal-d3" style={{ gap: 0, marginTop: 4 }}>
            {STEPS.map((step, i) => (
              <div key={step.num} className="flex items-start" style={{ gap: 12 }}>
                <div className="flex flex-col items-center" style={{ gap: 0, width: 28, flexShrink: 0 }}>
                  <div className="flex items-center justify-center" style={{ width: 28, height: 28, borderRadius: '50%', background: '#0F172A', color: '#fff', fontSize: 11, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace" }}>{step.num}</div>
                  {i < STEPS.length - 1 && <div style={{ width: 1, height: 24, background: '#DCE8EF' }} />}
                </div>
                <div className="flex flex-col" style={{ gap: 0, paddingTop: 5, paddingBottom: i < STEPS.length - 1 ? 8 : 0 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#0F172A' }}>{step.label}</span>
                  <span style={{ fontSize: 11, color: '#94A3B8' }}>{step.sub}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Terminal */}
        <div className="reveal reveal-d2">
          <div style={{ background: '#0F172A', borderRadius: 16, overflow: 'hidden', boxShadow: '0 16px 48px rgba(0,0,0,0.12)' }}>
            <div className="flex items-center" style={{ padding: '12px 18px', gap: 8, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="flex items-center" style={{ gap: 6 }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#B83228' }} />
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#C87A20' }} />
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#0D9E72' }} />
              </div>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#4A6880', marginLeft: 6 }}>Human HACCP · Evidence Record</span>
            </div>
            <div className="flex flex-col" style={{ padding: '16px 20px', gap: 2 }}>
              {TERMINAL.map((line) => (
                <div key={line.k} className="flex" style={{ gap: 14, fontSize: 11, lineHeight: 2.2 }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", color: '#3B5166', minWidth: 110, flexShrink: 0 }}>{line.k}</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", color: line.c, fontWeight: line.c !== '#DCE8EF' ? 500 : 400 }}>{line.v}</span>
                </div>
              ))}
            </div>
            <div style={{ padding: '0 16px 16px' }}>
              <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 8, padding: '12px 14px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div className="flex items-center justify-between" style={{ marginBottom: 6 }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#4A6880' }}>Linked Batch: B-4472</span>
                  <div className="flex items-center" style={{ gap: 6 }}>
                    <span className="status-pulse" style={{ width: 6, height: 6, borderRadius: '50%', background: '#0D9E72', display: 'inline-block' }} />
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#0D9E72' }}>Linked</span>
                  </div>
                </div>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#0D9E72' }}>Evidence pack finalised and linked</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`@media (max-width: 900px) { #human-haccp > div { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}
