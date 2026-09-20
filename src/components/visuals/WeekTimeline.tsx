import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { motionTransition } from '../../lib/motion';

const WEEKS = [
  {
    label: 'Week 1',
    title: 'Setup and onboarding',
    body: 'Configure your team, privacy threshold, and sector language. First anonymous signals collected.',
    deliverables: ['Team configured', 'First signal window', 'Privacy gate validated'],
    accent: '#14B8A6',
  },
  {
    label: 'Week 2',
    title: 'Signal collection and detection',
    body: 'Operating conditions classified. Elevated or Watch states trigger manager notification.',
    deliverables: ['Condition classified', 'Manager notified', 'Participation tracked'],
    accent: '#F59E0B',
  },
  {
    label: 'Week 3',
    title: 'Action and review',
    body: 'Management logs intervention. Follow-up observations recorded against the original signal.',
    deliverables: ['Action logged', 'Follow-up recorded', 'Audit trail growing'],
    accent: '#0D9E72',
  },
  {
    label: 'Week 4',
    title: 'Evidence pack compilation',
    body: 'Twelve sections compiled, reviewed together, and finalised as a locked versioned record.',
    deliverables: ['Pack compiled', 'Review session', 'v1.0 finalised'],
    accent: '#1B6BB0',
  },
];

export default function WeekTimeline() {
  const [open, setOpen] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const transition = motionTransition(shouldReduceMotion, 0.35);

  return (
    <div className="week-timeline">
      {WEEKS.map((week, index) => {
        const isOpen = open === index;
        return (
          <div key={week.label} className={`week-timeline__item${isOpen ? ' week-timeline__item--open' : ''}`}>
            <button
              type="button"
              className="week-timeline__trigger"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? -1 : index)}
            >
              <span className="week-timeline__badge" style={{ background: `${week.accent}22`, color: week.accent, borderColor: `${week.accent}44` }}>
                {week.label}
              </span>
              <span className="week-timeline__title">{week.title}</span>
              <span className="week-timeline__chevron" aria-hidden="true">{isOpen ? '−' : '+'}</span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  className="week-timeline__panel"
                  initial={shouldReduceMotion ? false : { height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={shouldReduceMotion ? undefined : { height: 0, opacity: 0 }}
                  transition={transition}
                >
                  <p>{week.body}</p>
                  <ul>
                    {week.deliverables.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
