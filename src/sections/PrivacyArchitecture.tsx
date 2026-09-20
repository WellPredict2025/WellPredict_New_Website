import { useState } from 'react';
import {
  EyeOff,
  Timer,
  Users,
} from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { fadeLeft, fadeRight, motionTransition, staggerContainer } from '../lib/motion';

const PRINCIPLES = [
  {
    title: 'No individual scores',
    body: 'WellPredict never shows individual team member results.',
  },
  {
    title: 'Threshold checked first',
    body: 'Groups must meet the minimum size before evidence is created.',
  },
  {
    title: 'Grouped evidence only',
    body: 'Managers see team-level records, not personal responses.',
  },
] as const;

const STATS = [
  {
    value: '10',
    label: 'Minimum members',
    detail: 'Before any team-level record is created',
    icon: Users,
  },
  {
    value: '7d',
    label: 'Response deletion window',
    detail: 'Raw responses are removed after the retention period',
    icon: Timer,
  },
  {
    value: '0',
    label: 'Individual scores exposed',
    detail: 'Managers see team-level records only',
    icon: EyeOff,
  },
] as const;

const PRINCIPLE_VARIANTS = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0 },
};

const STAT_VARIANTS = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

type GroupSize = 8 | 14;

function PrivacyGateVisual({
  groupSize,
  onGroupSizeChange,
  active,
}: {
  groupSize: GroupSize;
  onGroupSizeChange: (size: GroupSize) => void;
  active: boolean;
}) {
  const shouldReduceMotion = useReducedMotion();
  const thresholdMet = groupSize >= 10;

  return (
    <div className="privacy-gate-visual" aria-label="Privacy threshold flow">
      <div className="privacy-gate-visual__toolbar">
        <span className="privacy-gate-visual__toolbar-label">Group size</span>
        <div className="privacy-gate-toggle" role="group" aria-label="Group size">
          <button
            type="button"
            className={`privacy-gate-toggle__btn ${groupSize === 8 ? 'is-active' : ''}`}
            aria-pressed={groupSize === 8}
            onClick={() => onGroupSizeChange(8)}
          >
            8 members
          </button>
          <button
            type="button"
            className={`privacy-gate-toggle__btn ${groupSize === 14 ? 'is-active' : ''}`}
            aria-pressed={groupSize === 14}
            onClick={() => onGroupSizeChange(14)}
          >
            14 members
          </button>
        </div>
      </div>

      <p className={`privacy-gate-visual__status ${thresholdMet ? 'is-ready' : 'is-suppressed'}`}>
        {thresholdMet
          ? 'Threshold met, grouped record created'
          : 'Below threshold, nothing is shown'}
      </p>

      <div className="privacy-flow" aria-hidden="true">
        <motion.div
          className="privacy-flow__node privacy-flow__node--neutral"
          initial={{ opacity: 0, y: 16 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={motionTransition(shouldReduceMotion, 0.5)}
        >
          <span className="privacy-flow__node-title">Team submissions</span>
          <span className="privacy-flow__node-meta">Anonymous · weekly</span>
          {!shouldReduceMotion && active && (
            <div className="privacy-flow__dots privacy-flow__dots--source">
              {[0, 1, 2, 3, 4].map((index) => (
                <motion.span
                  key={index}
                  className="privacy-flow__dot"
                  initial={{ opacity: 0, y: 0 }}
                  animate={{
                    opacity: [0, 1, 1, thresholdMet ? 0.35 : 0],
                    y: [0, 18, 36, 52],
                  }}
                  transition={{
                    duration: 2.4,
                    delay: 0.4 + index * 0.12,
                    repeat: Infinity,
                    repeatDelay: 1.1,
                    ease: 'easeInOut',
                  }}
                  style={{ left: `${14 + index * 14}%` }}
                />
              ))}
            </div>
          )}
        </motion.div>

        <motion.div
          className="privacy-flow__connector privacy-flow__connector--down"
          initial={{ scaleY: 0 }}
          animate={active ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ ...motionTransition(shouldReduceMotion, 0.55), delay: shouldReduceMotion ? 0 : 0.15 }}
          style={{ transformOrigin: 'top center' }}
        />

        <motion.div
          className="privacy-flow__node privacy-flow__node--gate"
          initial={{ opacity: 0, y: 16 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ ...motionTransition(shouldReduceMotion, 0.5), delay: shouldReduceMotion ? 0 : 0.2 }}
        >
          <span className="privacy-flow__node-title">Threshold check</span>
          <span className="privacy-flow__node-meta">Minimum 10 members</span>
        </motion.div>

        <div className="privacy-flow__branches">
          <motion.div
            className={`privacy-flow__branch privacy-flow__branch--suppressed ${!thresholdMet ? 'is-active' : 'is-dim'}`}
            animate={{ opacity: !thresholdMet ? 1 : 0.42 }}
            transition={{ duration: 0.35 }}
          >
            <motion.div
              className="privacy-flow__connector privacy-flow__connector--branch"
              initial={{ scaleX: 0 }}
              animate={active ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ ...motionTransition(shouldReduceMotion, 0.45), delay: shouldReduceMotion ? 0 : 0.28 }}
              style={{ transformOrigin: 'left center' }}
            />
            <div className="privacy-flow__node privacy-flow__node--suppressed">
              <span className="privacy-flow__node-kicker">Below threshold</span>
              <span className="privacy-flow__node-title">Suppressed</span>
              <span className="privacy-flow__node-meta">Nothing is shown</span>
            </div>
          </motion.div>

          <motion.div
            className={`privacy-flow__branch privacy-flow__branch--ready ${thresholdMet ? 'is-active' : 'is-dim'}`}
            animate={{ opacity: thresholdMet ? 1 : 0.42 }}
            transition={{ duration: 0.35 }}
          >
            <motion.div
              className="privacy-flow__connector privacy-flow__connector--branch"
              initial={{ scaleX: 0 }}
              animate={active ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ ...motionTransition(shouldReduceMotion, 0.45), delay: shouldReduceMotion ? 0 : 0.28 }}
              style={{ transformOrigin: 'right center' }}
            />
            <div className="privacy-flow__node privacy-flow__node--ready">
              <span className="privacy-flow__node-kicker">Above threshold</span>
              <span className="privacy-flow__node-title">Ready</span>
              <span className="privacy-flow__node-meta">Grouped team totals only</span>
              {thresholdMet && !shouldReduceMotion && active && (
                <motion.span
                  className="privacy-flow__grouped-dot"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: [0.4, 1, 1], scale: [0.8, 1, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 1.2 }}
                />
              )}
            </div>
          </motion.div>
        </div>

        <motion.div
          className="privacy-flow__connector privacy-flow__connector--down"
          initial={{ scaleY: 0 }}
          animate={active && thresholdMet ? { scaleY: 1 } : { scaleY: thresholdMet ? 1 : 0.35, opacity: thresholdMet ? 1 : 0.35 }}
          transition={{ ...motionTransition(shouldReduceMotion, 0.45), delay: shouldReduceMotion ? 0 : 0.38 }}
          style={{ transformOrigin: 'top center' }}
        />

        <motion.div
          className={`privacy-flow__node privacy-flow__node--output ${thresholdMet ? 'is-ready' : 'is-muted'}`}
          initial={{ opacity: 0, y: 16 }}
          animate={active ? { opacity: thresholdMet ? 1 : 0.45, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ ...motionTransition(shouldReduceMotion, 0.5), delay: shouldReduceMotion ? 0 : 0.45 }}
        >
          <span className="privacy-flow__node-title">Evidence pack ready</span>
          <span className="privacy-flow__node-meta">
            {thresholdMet ? 'Privacy-safe grouped record' : 'Not created below threshold'}
          </span>
        </motion.div>
      </div>
    </div>
  );
}

export default function PrivacyArchitecture() {
  const shouldReduceMotion = useReducedMotion();
  const [groupSize, setGroupSize] = useState<GroupSize>(14);
  const [visualActive, setVisualActive] = useState(Boolean(shouldReduceMotion));
  const transition = motionTransition(shouldReduceMotion, 0.55);
  const inView = { once: true, amount: 0.18 };

  return (
    <section
      id="privacy"
      className="privacy-section section-padding"
      aria-labelledby="privacy-heading"
    >
      <div className="privacy-inner">
        <div className="privacy-main">
          <motion.header
            className="privacy-header"
            initial="hidden"
            whileInView="visible"
            viewport={inView}
            variants={fadeLeft}
            transition={transition}
          >
            <span className="eyebrow">PRIVACY</span>
            <h2 id="privacy-heading" className="privacy-title">
              Nobody is watching anyone.
            </h2>
            <p className="privacy-support">
              WellPredict checks privacy thresholds before any team-level evidence is created. Below the threshold, nothing is shown.
            </p>
          </motion.header>

          <motion.div
            className="privacy-principles"
            initial="hidden"
            whileInView="visible"
            viewport={inView}
            variants={staggerContainer}
            transition={{ ...transition, staggerChildren: shouldReduceMotion ? 0 : 0.1 }}
          >
            {PRINCIPLES.map((item, index) => (
              <motion.article
                key={item.title}
                className="privacy-principle"
                variants={PRINCIPLE_VARIANTS}
                transition={transition}
              >
                <span className="privacy-principle__index">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="privacy-principle__title">{item.title}</h3>
                  <p className="privacy-principle__body">{item.body}</p>
                </div>
              </motion.article>
            ))}
          </motion.div>

          <motion.div
            className="privacy-visual-wrap"
            initial="hidden"
            whileInView="visible"
            viewport={inView}
            variants={fadeRight}
            transition={transition}
            onViewportEnter={() => setVisualActive(true)}
          >
            <PrivacyGateVisual
              groupSize={groupSize}
              onGroupSizeChange={setGroupSize}
              active={visualActive || Boolean(shouldReduceMotion)}
            />
          </motion.div>
        </div>

        <motion.div
          className="privacy-stats"
          initial="hidden"
          whileInView="visible"
          viewport={inView}
          variants={staggerContainer}
          transition={{ ...transition, staggerChildren: shouldReduceMotion ? 0 : 0.1 }}
        >
          {STATS.map(({ value, label, detail, icon: Icon }) => (
            <motion.article
              key={label}
              className="privacy-stat"
              variants={STAT_VARIANTS}
              transition={transition}
            >
              <span className="privacy-stat__icon">
                <Icon aria-hidden="true" strokeWidth={1.75} />
              </span>
              <span className="privacy-stat__value">{value}</span>
              <h3 className="privacy-stat__label">{label}</h3>
              <p className="privacy-stat__detail">{detail}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
