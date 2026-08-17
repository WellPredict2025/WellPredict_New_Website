import { useEffect, useRef } from 'react';

const MODULES = [
  { icon: '🔒', title: 'Privacy-Gated Aggregation', sub: 'Below threshold = suppressed', color: '#0D9E72' },
  { icon: '⚡', title: 'Deterministic Policy Engine', sub: 'Same input. Same output. Always.', color: '#14B8A6' },
  { icon: '🔗', title: 'Intervention-to-Outcome Link', sub: 'Closed evidence chain', color: '#1B6BB0' },
  { icon: '📦', title: 'Evidence Object Compiler', sub: 'One click. One pack. Done.', color: '#C87A20' },
  { icon: '🔐', title: 'Immutable Audit Trail', sub: 'Hashed. Timestamped. Permanent.', color: '#B83228' },
  { icon: '🏭', title: 'Sector Policy Configurations', sub: 'HACCP · CQC · SMCR ready', color: '#8B5CF6' },
];

export default function PlatformModules() {
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.querySelectorAll('.reveal').forEach((el) => el.classList.add('revealed')); observer.unobserve(entry.target); } });
    }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="platform-modules" ref={sectionRef} className="section-padding" style={{ background: '#F7FBFC', borderTop: '1px solid #DCE8EF' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div className="flex flex-col items-center" style={{ marginBottom: 48, textAlign: 'center' }}>
          <span className="eyebrow reveal">Platform</span>
          <h2 className="reveal reveal-d1" style={{ fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 400, color: '#0F172A', margin: '12px 0 0' }}>
            Six mechanisms. Zero noise.
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {MODULES.map((mod, i) => (
            <div key={mod.title} className={`card top-border-reveal reveal reveal-d${i + 1} flex flex-col`} style={{ padding: '28px 24px', gap: 10 }}>
              <span style={{ fontSize: 24 }}>{mod.icon}</span>
              <h4 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14, fontWeight: 600, color: '#0F172A', margin: 0 }}>{mod.title}</h4>
              <span style={{ fontSize: 12, color: '#94A3B8', lineHeight: 1.4 }}>{mod.sub}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`@media (max-width: 900px) { #platform-modules > div > div:last-child { grid-template-columns: 1fr 1fr !important; } } @media (max-width: 600px) { #platform-modules > div > div:last-child { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}
