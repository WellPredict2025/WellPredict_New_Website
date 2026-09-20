import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import { fadeUp, motionTransition } from '../lib/motion';

const IN_VIEW = { once: true, amount: 0.2 };

export default function FooterCTA() {
  const shouldReduceMotion = useReducedMotion();
  const transition = motionTransition(shouldReduceMotion, 0.55);

  const Panel = shouldReduceMotion ? 'div' : motion.div;
  const panelProps = shouldReduceMotion
    ? { className: 'footer-cta-panel' }
    : {
        className: 'footer-cta-panel',
        initial: 'hidden' as const,
        whileInView: 'visible' as const,
        viewport: IN_VIEW,
        variants: fadeUp,
        transition,
      };

  return (
    <section className="footer-cta-section" aria-labelledby="footer-cta-title">
      <div className="footer-cta-section__inner">
        <Panel {...panelProps}>
          <div className="footer-cta-panel__copy">
            <p className="footer-cta-eyebrow">NEXT STEP</p>
            <h2 id="footer-cta-title" className="footer-cta-panel__title">
              Ready to build a defensible evidence record?
            </h2>
            <p className="footer-cta-panel__body">
              Start with one team, one evidence cycle, and a clear review-ready pack.
            </p>
          </div>
          <div className="footer-cta-actions">
            <Link to="/pilot" className="footer-btn-primary">
              Request Pilot
            </Link>
            <Link to="/contact" className="footer-btn-secondary">
              Contact
            </Link>
          </div>
        </Panel>
      </div>
    </section>
  );
}
