import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { fadeUp, motionTransition, staggerContainer } from '../lib/motion';

export type PricingPlanId = 'pilot' | 'organisation' | 'multi-site' | 'enterprise';

export type PricingPlan = {
  id: PricingPlanId;
  label: string;
  eyebrow: string;
  title: string;
  description: string;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
};

const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'pilot',
    label: 'Pilot',
    eyebrow: 'Best for first cycle',
    title: 'Pilot',
    description: 'One team, four weeks, one evidence cycle.',
    features: [
      'Single team setup',
      'Privacy gate validation',
      'One finalised pack',
      'Review session',
    ],
    ctaLabel: 'Apply for Pilot',
    ctaHref: '/pilot',
  },
  {
    id: 'organisation',
    label: 'Organisation',
    eyebrow: 'Best for growing teams',
    title: 'Organisation',
    description: 'Multiple teams across one operating unit.',
    features: [
      'Unit-level visibility',
      'Shared evidence dashboard',
      'Team comparison view',
      'Manager review workflow',
    ],
    ctaLabel: 'Request Pricing',
    ctaHref: '/contact',
  },
  {
    id: 'multi-site',
    label: 'Multi-site',
    eyebrow: 'Best for distributed operations',
    title: 'Multi-site',
    description: 'Consistent evidence across multiple locations.',
    features: [
      'Site-level reporting',
      'Cross-site governance view',
      'Evidence pack library',
      'Audit-ready summaries',
    ],
    ctaLabel: 'Request Pricing',
    ctaHref: '/contact',
  },
  {
    id: 'enterprise',
    label: 'Enterprise',
    eyebrow: 'Best for group governance',
    title: 'Enterprise',
    description: 'Group-wide governance evidence.',
    features: [
      'Central governance console',
      'Configurable access roles',
      'Enterprise reporting',
      'Policy and control alignment',
    ],
    ctaLabel: 'Contact Sales',
    ctaHref: '/contact',
  },
];

const SCALE_MAP = [
  { id: 'pilot' as const, label: '1 team' },
  { id: 'organisation' as const, label: 'Multiple teams' },
  { id: 'multi-site' as const, label: 'Multiple sites' },
  { id: 'enterprise' as const, label: 'Enterprise governance' },
];

const STEP_VARIANTS = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

export default function PricingPathway() {
  const [activePlanId, setActivePlanId] = useState<PricingPlanId>('pilot');
  const shouldReduceMotion = useReducedMotion();
  const transition = motionTransition(shouldReduceMotion, 0.45);
  const activeIndex = PRICING_PLANS.findIndex((plan) => plan.id === activePlanId);
  const activePlan = PRICING_PLANS[activeIndex] ?? PRICING_PLANS[0];
  const inView = { once: true, amount: 0.14 };

  return (
    <section className="pricing-pathway-section" aria-labelledby="pricing-pathway-title">
      <div className="wp-container">
        <motion.header
          className="pricing-pathway-header"
          initial="hidden"
          whileInView="visible"
          viewport={inView}
          variants={fadeUp}
          transition={transition}
        >
          <p className="wp-eyebrow">PRICING PATHWAY</p>
          <h2 id="pricing-pathway-title">Start with a pilot. Scale when the evidence is working.</h2>
          <p className="pricing-pathway-header__support">
            Begin with one team and one evidence cycle, then expand across units, sites, and governance functions.
          </p>
        </motion.header>

        <div className="pricing-pathway-layout">
          <motion.div
            className="pricing-pathway-timeline"
            role="tablist"
            aria-label="Pricing pathway stages"
            initial="hidden"
            whileInView="visible"
            viewport={inView}
            variants={staggerContainer}
          >
            <div className="pricing-pathway-timeline__line" aria-hidden="true">
              <motion.span
                className="pricing-pathway-timeline__line-fill"
                animate={{ scaleY: shouldReduceMotion ? 1 : (activeIndex + 0.5) / PRICING_PLANS.length }}
                transition={transition}
              />
            </div>

            {PRICING_PLANS.map((plan, index) => {
              const isActive = plan.id === activePlanId;
              return (
                <motion.button
                  key={plan.id}
                  type="button"
                  role="tab"
                  id={`pricing-tab-${plan.id}`}
                  aria-selected={isActive}
                  aria-controls="pricing-selected-panel"
                  aria-pressed={isActive}
                  className={`pricing-pathway-step${isActive ? ' is-active' : ''}`}
                  variants={STEP_VARIANTS}
                  transition={transition}
                  onClick={() => setActivePlanId(plan.id)}
                >
                  <span className="pricing-pathway-step__index" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="pricing-pathway-step__body">
                    <span className="pricing-pathway-step__label">{plan.label}</span>
                    <span className="pricing-pathway-step__desc">{plan.description}</span>
                  </span>
                  <span className="pricing-pathway-step__marker" aria-hidden="true" />
                </motion.button>
              );
            })}
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.article
              key={activePlan.id}
              id="pricing-selected-panel"
              role="tabpanel"
              aria-labelledby={`pricing-tab-${activePlan.id}`}
              className="pricing-selected-panel"
              initial={shouldReduceMotion ? false : { opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, x: -12 }}
              transition={transition}
            >
              <span className="pricing-selected-panel__eyebrow">{activePlan.eyebrow}</span>
              <h3 className="pricing-selected-panel__title">{activePlan.title}</h3>
              <p className="pricing-selected-panel__desc">{activePlan.description}</p>

              <div className="pricing-scale-map" aria-label="Scale progression">
                {SCALE_MAP.map((stage) => {
                  const stageIndex = PRICING_PLANS.findIndex((plan) => plan.id === stage.id);
                  const isStageActive = stageIndex <= activeIndex;
                  const isCurrent = stage.id === activePlanId;
                  return (
                    <div
                      key={stage.id}
                      className={`pricing-scale-map__item${isStageActive ? ' is-reached' : ''}${isCurrent ? ' is-current' : ''}`}
                    >
                      <span className="pricing-scale-map__dot" aria-hidden="true" />
                      <span className="pricing-scale-map__label">{stage.label}</span>
                    </div>
                  );
                })}
              </div>

              <h4 className="pricing-selected-panel__features-heading">What is included</h4>
              <ul className="pricing-selected-panel__features">
                {activePlan.features.map((feature) => (
                  <li key={feature}>
                    <Check size={16} strokeWidth={2.25} aria-hidden="true" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link to={activePlan.ctaHref} className="btn-primary pricing-selected-panel__cta">
                {activePlan.ctaLabel}
              </Link>

              <p className="pricing-selected-panel__note">
                Pricing is tailored to team count, scope, and deployment model.
              </p>
            </motion.article>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
