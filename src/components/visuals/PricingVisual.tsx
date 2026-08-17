import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { motionTransition } from '../../lib/motion';

interface PricingVisualProps {
  activeIndex?: number;
  onActiveIndexChange?: (index: number) => void;
}

const PLANS = [
  {
    id: 'pilot',
    name: 'Pilot',
    badge: 'Best for first cycle',
    desc: 'One team, four weeks, one evidence cycle.',
    includes: ['Single team setup', 'Privacy gate validation', 'One finalised pack', 'Review session'],
  },
  {
    id: 'organisation',
    name: 'Organisation',
    badge: 'Best for multi-team',
    desc: 'Multiple teams across units with ongoing cycles.',
    includes: ['Multi-team console', 'Sector configuration', 'Ongoing evidence cycles', 'Governance reporting'],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    badge: 'Best for group-wide',
    desc: 'Group deployment with enterprise controls.',
    includes: ['Enterprise security config', 'Custom sector policies', 'Dedicated support', 'Download preview and handover'],
  },
];

const SCALE = [
  { label: '1 team', desc: 'Pilot evidence cycle' },
  { label: 'Multiple teams', desc: 'Unit-level visibility' },
  { label: 'Multiple sites', desc: 'Organisation-wide console' },
  { label: 'Enterprise governance', desc: 'Group policy and controls' },
];

export default function PricingVisual({ activeIndex, onActiveIndexChange }: PricingVisualProps) {
  const [internalMode, setInternalMode] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const transition = motionTransition(shouldReduceMotion, 0.35);
  const mode = activeIndex ?? internalMode;
  const setMode = onActiveIndexChange ?? setInternalMode;
  const plan = PLANS[mode];

  return (
    <div className="pricing-visual">
      <div className="pricing-visual__toggle" role="tablist" aria-label="Pricing tiers">
        {PLANS.map((p, i) => (
          <button
            key={p.id}
            type="button"
            role="tab"
            aria-selected={mode === i}
            className={`pricing-visual__tab${mode === i ? ' pricing-visual__tab--active' : ''}`}
            onClick={() => setMode(i)}
          >
            {p.name}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={plan.id}
          className="pricing-visual__card"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={shouldReduceMotion ? undefined : { opacity: 0, y: -8 }}
          transition={transition}
        >
          <span className="pricing-visual__badge">{plan.badge}</span>
          <h3>{plan.name}</h3>
          <p>{plan.desc}</p>
          <span className="pricing-visual__price">Request pricing</span>
          <ul>{plan.includes.map((item) => <li key={item}>{item}</li>)}</ul>
        </motion.div>
      </AnimatePresence>

      <div className="pricing-visual__scale">
        <span className="pricing-visual__scale-label">What changes as you scale</span>
        <div className="pricing-visual__scale-track">
          {SCALE.map((step, i) => (
            <div key={step.label} className={`pricing-visual__scale-step${i <= mode ? ' pricing-visual__scale-step--active' : ''}`}>
              <span>{step.label}</span>
              <small>{step.desc}</small>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
