import { useEffect, useRef } from 'react';

const REASONS = [
  { num: '01', text: 'Fragments become a chain.' },
  { num: '02', text: 'Privacy-gated by design.' },
  { num: '03', text: 'Pre-event, not post-incident.' },
  { num: '04', text: 'Immutable. Versioned. Proven.' },
  { num: '05', text: 'Architecture, not a PDF.' },
  { num: '06', text: 'Built specifically for UK regulated sectors.' },
];

export default function WhyWellPredict() {
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.querySelectorAll('.reveal').forEach((el) => el.classList.add('revealed')); observer.unobserve(entry.target); } });
    }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="why" ref={sectionRef} className="section-padding" style={{ background: '#F7FBFC', borderTop: '1px solid #DCE8EF' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div className="flex flex-col items-center" style={{ marginBottom: 48, textAlign: 'center' }}>
          <span className="eyebrow reveal">Why WellPredict</span>
          <h2 className="reveal reveal-d1" style={{ fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 400, color: '#0F172A', margin: '12px 0 0' }}>
            Not another dashboard.
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {REASONS.map((r, i) => (
            <div key={r.num} className={`card reveal reveal-d${i + 1} flex flex-col`} style={{ padding: '28px 24px', gap: 10 }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 32, color: '#DCE8EF', lineHeight: 1 }}>{r.num}</span>
              <p style={{ fontSize: 15, lineHeight: 1.5, color: '#0F172A', margin: 0, fontWeight: 500 }}>{r.text}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`@media (max-width: 900px) { #why > div > div:last-child { grid-template-columns: 1fr 1fr !important; } } @media (max-width: 600px) { #why > div > div:last-child { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}
