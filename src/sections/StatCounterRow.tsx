import { motion, useReducedMotion } from 'motion/react';
import { fadeUp, motionTransition } from '../lib/motion';

const STATS = [
  { value: 3, suffix: '', label: 'Questions per week' },
  { value: 10, suffix: '+', label: 'Team members minimum' },
  { value: 1, suffix: '', label: 'Click to compile' },
  { value: 12, suffix: '', label: 'Sections in every Evidence Pack' },
];

function StatItem({ stat }: { stat: (typeof STATS)[number] }) {
  return (
    <div className="flex flex-col items-center" style={{ gap: 6 }}>
      <span
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 'clamp(48px, 6vw, 80px)',
          fontWeight: 500,
          color: '#fff',
          lineHeight: 1,
        }}
      >
        {stat.value}
        {stat.suffix}
      </span>
      <span style={{ fontSize: 12, color: '#4A6880', fontWeight: 500, letterSpacing: '0.02em' }}>
        {stat.label}
      </span>
    </div>
  );
}

export default function StatCounterRow() {
  const shouldReduceMotion = useReducedMotion();
  const transition = motionTransition(shouldReduceMotion, 0.45);

  return (
    <section id="stat-counter" style={{ background: '#0B1F33', padding: '64px 80px' }}>
      <motion.div
        initial={shouldReduceMotion ? false : 'hidden'}
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
        transition={transition}
        style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 40 }}
      >
        {STATS.map((stat) => (
          <StatItem key={stat.label} stat={stat} />
        ))}
      </motion.div>

      <style>{`@media (max-width: 900px) { #stat-counter { padding: 40px 24px !important; } #stat-counter > div { grid-template-columns: 1fr 1fr !important; gap: 32px !important; } } @media (max-width: 520px) { #stat-counter > div { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}
