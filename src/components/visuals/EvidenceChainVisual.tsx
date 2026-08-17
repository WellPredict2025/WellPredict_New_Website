import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { WORKFLOW_STEPS } from '../../config/site';
import { motionTransition } from '../../lib/motion';

const STATION_MOCKUPS = [
  {
    title: 'Weekly signal collection',
    rows: ['Ward Alpha · 14 responses', 'Anonymous · No individual data', 'Collection window: 48 hours'],
    status: 'Collecting',
    statusColor: '#14B8A6',
  },
  {
    title: 'Operating condition detected',
    rows: ['Ward Alpha · Elevated', 'Privacy gate: Passed', 'Manager notified automatically'],
    status: 'Elevated',
    statusColor: '#F59E0B',
  },
  {
    title: 'Management action logged',
    rows: ['Action: Staffing review', 'Owner: Ward Manager', 'Linked to team signal'],
    status: 'Action recorded',
    statusColor: '#0D9E72',
  },
  {
    title: 'Evidence Pack compiled',
    rows: ['Pack v1.0 · Finalised', '12 sections · Locked', 'Audit trail complete'],
    status: 'Ready',
    statusColor: '#1B6BB0',
  },
];

export default function EvidenceChainVisual() {
  const [active, setActive] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const transition = motionTransition(shouldReduceMotion, 0.4);
  const mockup = STATION_MOCKUPS[active];

  return (
    <div className="evidence-chain">
      <div className="evidence-chain__track" aria-hidden="true">
        <div className="evidence-chain__line" />
        {!shouldReduceMotion && (
          <motion.span
            className="evidence-chain__dot-travel"
            animate={{ left: `${12.5 + active * 25}%` }}
            transition={transition}
          />
        )}
      </div>

      <div className="evidence-chain__stations" role="tablist" aria-label="Evidence workflow steps">
        {WORKFLOW_STEPS.map((step, index) => (
          <button
            key={step.num}
            type="button"
            role="tab"
            aria-selected={active === index}
            aria-controls="evidence-chain-panel"
            id={`chain-tab-${index}`}
            className={`evidence-chain__station${active === index ? ' evidence-chain__station--active' : ''}`}
            onClick={() => setActive(index)}
          >
            <span className="evidence-chain__station-num" style={{ color: step.accent }}>{step.num}</span>
            <span className="evidence-chain__station-title">{step.title}</span>
            <span className="evidence-chain__station-body">{step.body}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          id="evidence-chain-panel"
          role="tabpanel"
          aria-labelledby={`chain-tab-${active}`}
          className="evidence-chain__mockup"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={shouldReduceMotion ? undefined : { opacity: 0, y: -8 }}
          transition={transition}
        >
          <div className="evidence-chain__mockup-header">
            <span className="evidence-chain__mockup-title">{mockup.title}</span>
            <span className="evidence-chain__mockup-status" style={{ color: mockup.statusColor, borderColor: `${mockup.statusColor}44`, background: `${mockup.statusColor}18` }}>
              {mockup.status}
            </span>
          </div>
          <ul className="evidence-chain__mockup-list">
            {mockup.rows.map((row) => (
              <li key={row}>{row}</li>
            ))}
          </ul>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
