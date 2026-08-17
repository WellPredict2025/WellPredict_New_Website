import { type MouseEvent } from 'react';
import {
  Clock,
  Eye,
  GitBranch,
  Languages,
  LayoutList,
  Lock,
  ShieldCheck,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import { fadeUp, fadeRight, motionTransition, staggerContainer } from '../lib/motion';

const FEATURES = [
  {
    icon: ShieldCheck,
    label: 'Tamper-proof seal',
    sub: 'Locked and ready for review',
  },
  {
    icon: LayoutList,
    label: '12 clear sections',
    sub: 'Structured for quick inspection',
  },
  {
    icon: GitBranch,
    label: 'Version controlled',
    sub: 'Tracked from draft to final',
  },
  {
    icon: Languages,
    label: "In your sector's language",
    sub: 'Built for sector-specific review',
  },
  {
    icon: Clock,
    label: 'Full timeline',
    sub: 'From signal to outcome',
  },
  {
    icon: Eye,
    label: 'Privacy validated',
    sub: 'Threshold and privacy checked',
  },
] as const;

const PACK_ROWS = [
  { label: 'What the team experienced', value: 'High pressure · 3 weeks', tone: 'warn' },
  { label: 'Privacy check', value: 'Threshold met', tone: 'ok' },
  { label: 'Pressure level', value: 'Elevated · flagged', tone: 'warn' },
  { label: 'Management action', value: 'Response logged', tone: 'ok' },
  { label: 'Result after action', value: 'Pressure reducing', tone: 'watch' },
  { label: 'Document status', value: 'Sealed', tone: 'info' },
  { label: 'Version', value: 'v1 · Final', tone: 'neutral' },
  { label: 'Data retention', value: 'Compliant', tone: 'ok' },
] as const;

const TILE_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

function scrollToPilot(e: MouseEvent<HTMLAnchorElement>) {
  e.preventDefault();
  document.querySelector('#cta-contact')?.scrollIntoView({ behavior: 'smooth' });
}

function DeliverableMockup() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="deliverable-showcase-inner" aria-hidden="true">
      <div className="deliverable-pack-glow" />
      <div className="deliverable-pack-shadow" />

      <motion.div
        className="deliverable-pack-float"
        initial={shouldReduceMotion ? false : 'hidden'}
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeRight}
        transition={motionTransition(shouldReduceMotion, 0.5)}
      >
        <motion.div
          className="deliverable-pack"
          animate={shouldReduceMotion ? undefined : { y: [0, -8, 0] }}
          transition={
            shouldReduceMotion
              ? undefined
              : { duration: 5.5, repeat: Infinity, ease: 'easeInOut' }
          }
        >
          <div className="deliverable-pack__header">
            <div>
              <p className="deliverable-pack__kicker">WellPredict</p>
              <p className="deliverable-pack__title">Governance Evidence Pack</p>
            </div>
            <span className="deliverable-pack__version">v1 · FINALISED</span>
          </div>

          <div className="deliverable-pack__body">
            {PACK_ROWS.map((row) => (
              <div key={row.label} className="deliverable-pack__row">
                <span className="deliverable-pack__row-label">{row.label}</span>
                <span className={`deliverable-pack__badge deliverable-pack__badge--${row.tone}`}>
                  {row.value}
                </span>
              </div>
            ))}
          </div>

          <div className="deliverable-pack__footer">
            <span className="deliverable-pack__seal">
              <Lock aria-hidden="true" strokeWidth={2} />
              Tamper-proof seal applied
            </span>
            <span className="deliverable-pack__footer-meta">Review-ready · v1 locked</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function EvidencePack() {
  const shouldReduceMotion = useReducedMotion();
  const transition = motionTransition(shouldReduceMotion, 0.55);
  const inView = { once: true, amount: 0.18 };

  return (
    <section
      id="evidence-pack"
      className="deliverable-section section-padding"
      aria-labelledby="deliverable-heading"
    >
      <div className="deliverable-bg" aria-hidden="true">
        <div className="deliverable-bg__image" />
        <div className="deliverable-bg__grid" />
        <div className="deliverable-bg__vignette" />
      </div>

      <div className="deliverable-inner">
        <div className="deliverable-grid">
          <motion.header
            className="deliverable-header"
            initial="hidden"
            whileInView="visible"
            viewport={inView}
            variants={fadeUp}
            transition={transition}
          >
            <span className="eyebrow deliverable-eyebrow">THE DELIVERABLE</span>
            <h2 id="deliverable-heading" className="deliverable-title">
              <span className="deliverable-title__line">The document your regulator </span>
              <span className="deliverable-title__highlight">actually wants to see.</span>
            </h2>
          </motion.header>

          <motion.p
            className="deliverable-support"
            initial="hidden"
            whileInView="visible"
            viewport={inView}
            variants={fadeUp}
            transition={{ ...transition, delay: shouldReduceMotion ? 0 : 0.08 }}
          >
            What happened, what was done, and what changed, connected into one clear record for review.
          </motion.p>

          <div className="deliverable-showcase">
            <DeliverableMockup />
          </div>

          <motion.div
            className="deliverable-features"
            initial="hidden"
            whileInView="visible"
            viewport={inView}
            variants={staggerContainer}
            transition={{ ...transition, staggerChildren: shouldReduceMotion ? 0 : 0.08 }}
          >
            {FEATURES.map(({ icon: Icon, label, sub }) => (
              <motion.article
                key={label}
                className="deliverable-feature"
                variants={TILE_VARIANTS}
                transition={transition}
              >
                <span className="deliverable-feature__icon">
                  <Icon aria-hidden="true" strokeWidth={1.75} />
                </span>
                <div className="deliverable-feature__copy">
                  <h3 className="deliverable-feature__label">{label}</h3>
                  <p className="deliverable-feature__sub">{sub}</p>
                </div>
              </motion.article>
            ))}
          </motion.div>

          <motion.div
            className="deliverable-actions"
            initial="hidden"
            whileInView="visible"
            viewport={inView}
            variants={fadeUp}
            transition={{ ...transition, delay: shouldReduceMotion ? 0 : 0.2 }}
          >
            <a href="#cta-contact" onClick={scrollToPilot} className="btn-primary deliverable-cta">
              Start a Pilot
            </a>
            <Link to="/evidence-pack" className="deliverable-secondary-link">
              Explore evidence pack
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
