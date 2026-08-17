import { useEffect, useRef } from 'react';
import InteractivePlatformDashboard from '../components/platform-dashboard/InteractivePlatformDashboard';
import { DashboardToastProvider } from '../components/platform-dashboard/DashboardToast';

export default function PlatformDashboard() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el) => el.classList.add('revealed'));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="dashboard" ref={sectionRef} className="section-padding" style={{ background: '#F7FBFC', borderTop: '1px solid #DCE8EF' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div className="flex flex-col items-center" style={{ marginBottom: 48, textAlign: 'center' }}>
          <span className="eyebrow reveal">THE PLATFORM</span>
          <h2 className="reveal reveal-d1" style={{ fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 400, color: '#0F172A', margin: '12px 0 0' }}>
            What your WellPredict governance console looks like.
          </h2>
          <p className="reveal reveal-d2" style={{ fontSize: 15, color: '#64748B', maxWidth: 560, margin: '12px 0 0', lineHeight: 1.65 }}>
            Interactive preview with fictional data. Explore sidebar views, sector tabs, and actions below.
          </p>
        </div>

        <div className="reveal reveal-d2 card" style={{ padding: 0, overflow: 'hidden', borderRadius: 12 }}>
          <DashboardToastProvider>
            <InteractivePlatformDashboard />
          </DashboardToastProvider>
        </div>
      </div>
    </section>
  );
}
