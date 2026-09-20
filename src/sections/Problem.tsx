import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { fadeUp, motionTransition, staggerContainer } from '../lib/motion';

const PANEL_VARIANTS = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const CHECKLIST_CONTAINER = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.35 },
  },
};

const CHECKLIST_ROW = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0 },
};

function SignalRecordVisual() {
  return (
    <div className="gap-panel-visual" aria-hidden="true">
      <div className="gap-mini-card">
        <div className="gap-mini-row">
          <span className="gap-mini-label">Team condition</span>
          <span className="gap-mini-badge gap-mini-badge--elevated">Elevated</span>
        </div>
        <div className="gap-mini-row">
          <span className="gap-mini-label">Source</span>
          <span className="gap-mini-value">Team-level signal</span>
        </div>
        <div className="gap-mini-row">
          <span className="gap-mini-label">Status</span>
          <span className="gap-mini-badge gap-mini-badge--muted">Unlinked</span>
        </div>
        <div className="gap-mini-chart">
          <span style={{ height: '38%' }} />
          <span style={{ height: '52%' }} />
          <span style={{ height: '74%' }} />
          <span className="is-peak" style={{ height: '100%' }} />
          <span style={{ height: '68%' }} />
        </div>
      </div>
    </div>
  );
}

function ActionRecordVisual({ active }: { active: boolean }) {
  const items = ['Email', 'Spreadsheet', 'Notes', 'Folder'];

  return (
    <div className="gap-panel-visual" aria-hidden="true">
      <div className="gap-record-stack">
        {items.map((item, index) => (
          <motion.span
            key={item}
            className="gap-record-chip"
            initial={{ opacity: 0, y: 10, rotate: index % 2 === 0 ? -2 : 2 }}
            animate={active ? { opacity: 1, y: 0, rotate: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.15 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            {item}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

function ProofGapVisual({ active }: { active: boolean }) {
  const rows = [
    { label: 'Signal', status: 'missing link', tone: 'warn' },
    { label: 'Action', status: 'partial', tone: 'partial' },
    { label: 'Outcome', status: 'missing', tone: 'warn' },
    { label: 'Evidence status', status: 'incomplete', tone: 'danger' },
  ];

  return (
    <motion.div
      className="gap-panel-visual"
      aria-hidden="true"
      variants={CHECKLIST_CONTAINER}
      initial="hidden"
      animate={active ? 'visible' : 'hidden'}
    >
      <div className="gap-checklist">
        {rows.map((row) => (
          <motion.div key={row.label} className="gap-checklist-row" variants={CHECKLIST_ROW}>
            <span>{row.label}</span>
            <span className={`gap-checklist-status gap-checklist-status--${row.tone}`}>{row.status}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function ChainConnectorPartial({
  active,
  reducedMotion,
}: {
  active: boolean;
  reducedMotion: boolean;
}) {
  return (
    <div className="gap-chain-connector gap-chain-connector--partial" aria-hidden="true">
      <motion.div
        className="gap-chain-connector__line gap-chain-connector__line--horizontal"
        initial={{ scaleX: 0 }}
        animate={active ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: reducedMotion ? 0 : 0.75, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: 'left center' }}
      />
      <motion.div
        className="gap-chain-connector__line gap-chain-connector__line--vertical"
        initial={{ scaleY: 0 }}
        animate={active ? { scaleY: 1 } : { scaleY: 0 }}
        transition={{ duration: reducedMotion ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: 'top center' }}
      />
      {!reducedMotion && (
        <div className="gap-chain-dots">
          {[0, 1, 2].map((index) => (
            <motion.span
              key={index}
              className="gap-chain-dot"
              initial={{ opacity: 0, left: '4%' }}
              animate={
                active
                  ? {
                      opacity: [0, 1, 1, 0],
                      left: ['4%', '42%', '88%', '88%'],
                    }
                  : { opacity: 0, left: '4%' }
              }
              transition={{
                duration: 2.2,
                delay: 0.9 + index * 0.28,
                repeat: Infinity,
                repeatDelay: 1.4,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function ChainConnectorBroken({
  active,
  reducedMotion,
}: {
  active: boolean;
  reducedMotion: boolean;
}) {
  return (
    <div className="gap-chain-connector gap-chain-connector--broken" aria-hidden="true">
      <motion.div
        className="gap-chain-connector__line gap-chain-connector__line--horizontal gap-chain-connector__line--broken"
        initial={{ scaleX: 0, opacity: 0.5 }}
        animate={
          active
            ? reducedMotion
              ? { scaleX: 0.58, opacity: 0.85 }
              : { scaleX: [0, 0.58, 0.58], opacity: [0.5, 0.85, 0.55, 0.85] }
            : { scaleX: 0, opacity: 0.5 }
        }
        transition={
          reducedMotion
            ? { duration: 0 }
            : {
                scaleX: { duration: 0.55, delay: 0.55, ease: [0.22, 1, 0.36, 1] },
                opacity: { duration: 2.2, delay: 1.1, repeat: Infinity, ease: 'easeInOut' },
              }
        }
        style={{ transformOrigin: 'left center' }}
      />
      <motion.div
        className="gap-chain-connector__line gap-chain-connector__line--vertical gap-chain-connector__line--broken"
        initial={{ scaleY: 0, opacity: 0.5 }}
        animate={
          active
            ? reducedMotion
              ? { scaleY: 0.55, opacity: 0.85 }
              : { scaleY: [0, 0.55, 0.55], opacity: [0.5, 0.85, 0.55, 0.85] }
            : { scaleY: 0, opacity: 0.5 }
        }
        transition={
          reducedMotion
            ? { duration: 0 }
            : {
                scaleY: { duration: 0.55, delay: 0.4, ease: [0.22, 1, 0.36, 1] },
                opacity: { duration: 2.2, delay: 0.9, repeat: Infinity, ease: 'easeInOut' },
              }
        }
        style={{ transformOrigin: 'top center' }}
      />
      <span className="gap-chain-connector__break-mark">×</span>
    </div>
  );
}

export default function Problem() {
  const shouldReduceMotion = useReducedMotion();
  const [chainActive, setChainActive] = useState(Boolean(shouldReduceMotion));
  const transition = motionTransition(shouldReduceMotion, 0.55);
  const inView = { once: true, amount: 0.18 };
  const visualActive = chainActive || Boolean(shouldReduceMotion);

  return (
    <section
      id="problem"
      className="governance-gap-section section-padding"
      aria-labelledby="governance-gap-title"
    >
      <div className="governance-gap-inner">
        <motion.header
          className="governance-gap-header"
          initial="hidden"
          whileInView="visible"
          viewport={inView}
          variants={fadeUp}
          transition={transition}
        >
          <span className="eyebrow">THE GOVERNANCE GAP</span>
          <h2 id="governance-gap-title" className="governance-gap-title">
            You have records. You cannot connect them.
          </h2>
          <p className="governance-gap-support">
            Pressure signals, action records, and outcome notes often exist. The problem is proving they belong to the same story.
          </p>
        </motion.header>

        <motion.div
          className="gap-chain"
          aria-label="Broken evidence chain visual"
          onViewportEnter={() => setChainActive(true)}
          viewport={inView}
          initial="hidden"
          whileInView="visible"
          variants={staggerContainer}
          transition={{ ...transition, staggerChildren: shouldReduceMotion ? 0 : 0.14 }}
        >
          <motion.article className="gap-panel gap-panel-signal" variants={PANEL_VARIANTS} transition={transition}>
            <p className="gap-panel-kicker">Signal record</p>
            <h3 className="gap-panel-title">Pressure happened</h3>
            <SignalRecordVisual />
            <p className="gap-panel-detail">Recorded, but not connected to the next decision.</p>
          </motion.article>

          <ChainConnectorPartial active={chainActive} reducedMotion={Boolean(shouldReduceMotion)} />

          <motion.article className="gap-panel gap-panel-action" variants={PANEL_VARIANTS} transition={transition}>
            <p className="gap-panel-kicker">Action record</p>
            <h3 className="gap-panel-title">Management acted</h3>
            <ActionRecordVisual active={visualActive} />
            <p className="gap-panel-detail">The action exists, but it is spread across separate places.</p>
          </motion.article>

          <ChainConnectorBroken active={chainActive} reducedMotion={Boolean(shouldReduceMotion)} />

          <motion.article className="gap-panel gap-panel-proof" variants={PANEL_VARIANTS} transition={transition}>
            <p className="gap-panel-kicker gap-panel-kicker--warn">Proof gap</p>
            <h3 className="gap-panel-title">Cannot prove the chain</h3>
            <ProofGapVisual active={visualActive} />
            <p className="gap-panel-detail">When asked for proof, the chain is not defensible.</p>
          </motion.article>
        </motion.div>
      </div>
    </section>
  );
}
