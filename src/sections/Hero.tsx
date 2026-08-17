import { Link } from 'react-router-dom';
import { Clock3, FileCheck2, ShieldCheck } from 'lucide-react';
import HeroBackgroundVideo from '../components/HeroBackgroundVideo';
import { getHeroDashboardContent } from '../config/heroDashboardContent';

const CHART_POINTS = [
  { x: 32, y: 58, label: 'Normal', color: '#10B981' },
  { x: 108, y: 44, label: 'Watch', color: '#F59E0B' },
  { x: 184, y: 38, label: 'Watch', color: '#F59E0B' },
  { x: 260, y: 22, label: 'Elevated', color: '#EF4444' },
];

const METRICS = [
  { label: 'Normal', value: 18, helper: 'Stable this week', color: '#10B981', bg: 'rgba(16,185,129,0.08)' },
  { label: 'Watch', value: 3, helper: 'Needs follow up', color: '#F59E0B', bg: 'rgba(245,158,11,0.08)' },
  { label: 'Elevated', value: 2, helper: 'Action logged', color: '#EF4444', bg: 'rgba(239,68,68,0.08)' },
  { label: 'Packs ready', value: 7, helper: 'Ready to share', color: '#14B8A6', bg: 'rgba(20,184,166,0.08)' },
];

const HERO_DASHBOARD = getHeroDashboardContent('food');

function ConditionChart() {
  const linePath = CHART_POINTS.reduce((path, point, i) => {
    if (i === 0) return `M ${point.x} ${point.y}`;
    const prev = CHART_POINTS[i - 1];
    const cx = (prev.x + point.x) / 2;
    return `${path} Q ${cx} ${prev.y}, ${point.x} ${point.y}`;
  }, '');

  const areaPath = `${linePath} L 260 72 L 32 72 Z`;

  return (
    <div style={{ marginTop: 14 }}>
      <svg viewBox="0 0 292 80" className="w-full" style={{ height: 72, display: 'block' }}>
        <defs>
          <linearGradient id="heroChartFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#14B8A6" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#14B8A6" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="heroChartStroke" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="45%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#EF4444" />
          </linearGradient>
        </defs>
        {[20, 36, 52].map((y) => (
          <line key={y} x1="24" y1={y} x2="268" y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
        ))}
        <path d={areaPath} fill="url(#heroChartFill)" />
        <path d={linePath} fill="none" stroke="url(#heroChartStroke)" strokeWidth="2.5" strokeLinecap="round" className="dash-draw" />
        {CHART_POINTS.map((point) => (
          <g key={`${point.x}-${point.label}`}>
            <circle cx={point.x} cy={point.y} r="5" fill={point.color} opacity="0.95" />
            <circle cx={point.x} cy={point.y} r="8" fill={point.color} opacity="0.15" />
            <text x={point.x} y="76" textAnchor="middle" fill="rgba(255,255,255,0.38)" fontSize="8" fontWeight="500">
              {point.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

function MiniStatCard({
  title,
  primary,
  secondary,
  accent,
}: {
  title: string;
  primary: string;
  secondary: string;
  accent: string;
}) {
  return (
    <div
      style={{
        padding: '10px 12px',
        borderRadius: 10,
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.06)',
        flex: 1,
        minWidth: 0,
      }}
    >
      <span style={{ fontSize: 9, fontWeight: 600, color: 'rgba(255,255,255,0.42)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
        {title}
      </span>
      <div style={{ fontSize: 15, fontWeight: 700, color: accent, marginTop: 4, lineHeight: 1.2 }}>{primary}</div>
      <div style={{ fontSize: 9, color: 'rgba(226, 238, 247, 0.72)', marginTop: 2 }}>{secondary}</div>
    </div>
  );
}

function MetricTile({
  label,
  value,
  helper,
  color,
  bg,
}: {
  label: string;
  value: number;
  helper: string;
  color: string;
  bg: string;
}) {
  return (
    <div
      style={{
        padding: '12px 10px',
        borderRadius: 10,
        background: bg,
        border: `1px solid ${color}22`,
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        minWidth: 0,
      }}
    >
      <span style={{ fontSize: 9, fontWeight: 600, color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        {label}
      </span>
      <span className="hero-dashboard__metric-value" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 22, fontWeight: 600, color, lineHeight: 1 }}>
        {value}
      </span>
      <span style={{ fontSize: 8, color: 'rgba(226, 238, 247, 0.72)', lineHeight: 1.3 }}>{helper}</span>
    </div>
  );
}

function HeroDashboard() {
  return (
    <div
      className="hero-dashboard-float"
      style={{
        width: '100%',
        maxWidth: 480,
        borderRadius: 16,
        overflow: 'hidden',
        background: 'linear-gradient(155deg, rgba(18, 50, 74, 0.92) 0%, rgba(11, 31, 51, 0.96) 100%)',
        border: '1px solid rgba(255,255,255,0.09)',
        boxShadow: '0 28px 80px rgba(0,0,0,0.45), 0 0 0 1px rgba(20,184,166,0.06), inset 0 1px 0 rgba(255,255,255,0.06)',
        backdropFilter: 'blur(20px)',
      }}
    >
      {/* App bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 10,
          padding: '10px 14px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          background: 'rgba(0,0,0,0.18)',
        }}
      >
        <div className="flex items-center" style={{ gap: 8, minWidth: 0 }}>
          <div className="flex items-center" style={{ gap: 5, flexShrink: 0 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#EF4444' }} />
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#F59E0B' }} />
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981' }} />
          </div>
          <div className="flex flex-col" style={{ minWidth: 0 }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.9)' }}>{HERO_DASHBOARD.organisation}</span>
            <span style={{ fontSize: 9, color: 'rgba(226, 238, 247, 0.72)' }}>{HERO_DASHBOARD.sector}</span>
          </div>
        </div>
        <div className="flex items-center" style={{ gap: 8, flexShrink: 0 }}>
          <span
            className="hero-elevated-pulse"
            style={{
              fontSize: 9,
              fontWeight: 700,
              color: '#fff',
              background: 'rgba(239,68,68,0.85)',
              padding: '3px 8px',
              borderRadius: 999,
              letterSpacing: '0.04em',
            }}
          >
            Elevated
          </span>
          <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.32)', fontFamily: "'JetBrains Mono', monospace" }}>
            Updated 09:42
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="hero-dashboard__body" style={{ padding: '16px 14px 14px' }}>
        <div style={{ marginBottom: 2 }}>
          <p className="mockup-title" style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.92)', margin: 0, lineHeight: 1.3 }}>
            Team Condition Overview
          </p>
          <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.42)', margin: '4px 0 0', lineHeight: 1.4 }}>
            {HERO_DASHBOARD.subtitle}
          </p>
        </div>

        <ConditionChart />

        {/* Mini cards */}
        <div className="hero-dashboard__mini-row flex" style={{ gap: 8, marginTop: 12 }}>
          <MiniStatCard
            title={HERO_DASHBOARD.privacyGate.title}
            primary={HERO_DASHBOARD.privacyGate.primary}
            secondary={HERO_DASHBOARD.privacyGate.secondary}
            accent="#10B981"
          />
          <MiniStatCard
            title={HERO_DASHBOARD.evidencePacks.title}
            primary={HERO_DASHBOARD.evidencePacks.primary}
            secondary={HERO_DASHBOARD.evidencePacks.secondary}
            accent="#14B8A6"
          />
          <MiniStatCard
            title={HERO_DASHBOARD.monitored.title}
            primary={HERO_DASHBOARD.monitored.primary}
            secondary={HERO_DASHBOARD.monitored.secondary}
            accent="#94A3B8"
          />
        </div>

        {/* Metric tiles */}
        <div className="hero-dashboard__metrics" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginTop: 12 }}>
          {METRICS.map((m) => (
            <MetricTile key={m.label} {...m} />
          ))}
        </div>

        {/* Live teams */}
        <div
          className="hero-dashboard__teams"
          style={{
            marginTop: 12,
            padding: '10px 12px',
            borderRadius: 10,
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.05)',
          }}
        >
          <span style={{ fontSize: 9, fontWeight: 600, color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            {HERO_DASHBOARD.liveTeamsTitle}
          </span>
          <div className="flex flex-col" style={{ marginTop: 8 }}>
            {HERO_DASHBOARD.teams.map((team, i) => (
              <div
                key={team.name}
                className="flex items-center justify-between"
                style={{
                  padding: '7px 0',
                  borderTop: i > 0 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                }}
              >
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.78)', fontWeight: 500 }}>{team.name}</span>
                <span
                  style={{
                    fontSize: 9,
                    fontWeight: 600,
                    color: team.color,
                    background: `${team.color}18`,
                    padding: '2px 8px',
                    borderRadius: 999,
                  }}
                >
                  {team.state}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section id="hero" className="relative w-full overflow-hidden" style={{ minHeight: '100vh', paddingTop: 120 }}>
      <div className="hero-bg-video-wrap" aria-hidden="true">
        <HeroBackgroundVideo />
      </div>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(11,31,51,0.88) 0%, rgba(18,50,74,0.72) 50%, rgba(11,31,51,0.9) 100%)', zIndex: 2 }} />
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 3, opacity: 0.28, backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(20,184,166,0.18) 0%, transparent 42%), radial-gradient(circle at 80% 70%, rgba(56,189,248,0.14) 0%, transparent 40%)' }} />

      <div className="relative z-10 section-padding hero-grid" style={{ minHeight: 'calc(100vh - 120px)' }}>
        {/* Left */}
        <div className="hero-copy flex flex-col" style={{ gap: 24 }}>
          <div className="flex items-center" style={{ gap: 10 }}>
            <span className="pulse-dot" style={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: '#14B8A6', display: 'inline-block' }} />
            <span className="eyebrow" style={{ color: '#14B8A6' }}>WellPredict</span>
          </div>

          <h1 style={{ fontSize: 'clamp(38px, 5vw, 64px)', fontWeight: 400, lineHeight: 1.08, color: '#fff', margin: 0, textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}>
            <span>Your regulator will ask.</span>{' '}
            <em style={{ color: '#14B8A6', fontStyle: 'italic' }}>Do you have the proof?</em>
          </h1>

          <p style={{ fontSize: 16, lineHeight: 1.6, color: 'rgba(255,255,255,0.6)', margin: 0, maxWidth: 420 }}>
            WellPredict helps regulated teams turn operating conditions, management actions, and outcome reviews into clear evidence records before inspection or internal review.
          </p>

          {/* Stat Chips */}
          <div className="flex flex-wrap items-center" style={{ gap: 10 }}>
            {[
              { icon: Clock3, text: '30 seconds per week' },
              { icon: ShieldCheck, text: 'Zero individual data' },
              { icon: FileCheck2, text: 'One click to compile' },
            ].map(({ icon: Icon, text }) => (
              <span key={text} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '7px 14px', borderRadius: 999, fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,0.8)', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(4px)' }}>
                <Icon size={14} strokeWidth={2} aria-hidden="true" style={{ color: '#5EEAD4', flexShrink: 0 }} />
                {text}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="hero-actions flex flex-wrap items-center" style={{ gap: 12, marginTop: 4 }}>
            <Link to="/pilot" className="btn-primary" style={{ textDecoration: 'none' }}>Start a Pilot</Link>
            <Link to="/how-it-works" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 28px', background: 'rgba(255,255,255,0.06)', color: '#fff', fontSize: 14, fontWeight: 600, borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)', textDecoration: 'none', backdropFilter: 'blur(4px)' }}>How it works</Link>
          </div>
        </div>

        {/* Dashboard visual */}
        <div className="hero-visual" aria-hidden="true">
          <div className="hero-dashboard-wrap">
            <HeroDashboard />
          </div>
        </div>
      </div>
    </section>
  );
}
