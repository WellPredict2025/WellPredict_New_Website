import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import ScrollReveal from './ScrollReveal';
import { motionTransition, staggerContainer } from '../lib/motion';

type LayerId = 'context' | 'evidence-chain' | 'assurance';

type EvidenceLayer = {
  id: LayerId;
  number: string;
  title: string;
  description: string;
  sectionCount: string;
  rows: {
    num: string;
    name: string;
    status: string;
    chip: string;
  }[];
};

type ChainNodeId = 'context' | 'action' | 'outcome' | 'assurance';

const LAYERS: EvidenceLayer[] = [
  {
    id: 'context',
    number: '01',
    title: 'Context',
    description: 'Team, period, scope, and summary.',
    sectionCount: '4 sections',
    rows: [
      { num: '01', name: 'Cover', status: 'Pack identity set', chip: 'Included' },
      { num: '02', name: 'Executive summary', status: 'Review period defined', chip: 'Included' },
      { num: '03', name: 'Team profile', status: 'Ward context captured', chip: 'Included' },
      { num: '04', name: 'Scope', status: 'Operating scope confirmed', chip: 'Included' },
    ],
  },
  {
    id: 'evidence-chain',
    number: '02',
    title: 'Evidence chain',
    description: 'Signal, action, timeline, and outcome.',
    sectionCount: '4 sections',
    rows: [
      { num: '05', name: 'Pre-action conditions', status: 'Baseline captured', chip: 'Included' },
      { num: '06', name: 'Management action', status: 'Action recorded', chip: 'Included' },
      { num: '07', name: 'Intervention timeline', status: 'Timeline linked', chip: 'Included' },
      { num: '08', name: 'Post-action observations', status: 'Outcome reviewed', chip: 'Included' },
    ],
  },
  {
    id: 'assurance',
    number: '03',
    title: 'Assurance layer',
    description: 'Privacy, validation, audit, and interpretation.',
    sectionCount: '4 sections',
    rows: [
      { num: '09', name: 'Privacy validation', status: 'Threshold confirmed', chip: 'Validated' },
      { num: '10', name: 'Compliance validation', status: 'Controls checked', chip: 'Validated' },
      { num: '11', name: 'Audit trail', status: 'Events sealed', chip: 'Sealed' },
      { num: '12', name: 'Interpretation note', status: 'Reviewer guidance added', chip: 'Included' },
    ],
  },
];

const CHAIN_NODES: { id: ChainNodeId; label: string; layers: LayerId[] }[] = [
  { id: 'context', label: 'Context', layers: ['context'] },
  { id: 'action', label: 'Action', layers: ['evidence-chain'] },
  { id: 'outcome', label: 'Outcome', layers: ['evidence-chain'] },
  { id: 'assurance', label: 'Assurance', layers: ['assurance'] },
];

const CALLOUTS = ['12 connected sections', 'Privacy validated', 'Audit trail sealed'] as const;

const RAIL_VARIANTS = {
  hidden: { opacity: 0, x: -14 },
  visible: { opacity: 1, x: 0 },
};

const DOC_VARIANTS = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

function isChainNodeActive(node: (typeof CHAIN_NODES)[number], activeLayer: LayerId) {
  return node.layers.includes(activeLayer);
}

export default function EvidencePackStudio() {
  const [activeLayer, setActiveLayer] = useState<LayerId>('evidence-chain');
  const shouldReduceMotion = useReducedMotion();
  const transition = motionTransition(shouldReduceMotion, 0.45);
  const layer = LAYERS.find((item) => item.id === activeLayer) ?? LAYERS[1];

  const StudioWrap = shouldReduceMotion ? 'div' : motion.div;
  const studioProps = shouldReduceMotion
    ? { className: 'evidence-studio' }
    : {
        className: 'evidence-studio',
        initial: { opacity: 0, y: 28 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.18 },
        transition,
      };

  const RailWrap = shouldReduceMotion ? 'div' : motion.div;
  const railProps = shouldReduceMotion
    ? { className: 'evidence-studio__rail', role: 'group' as const, 'aria-label': 'Evidence pack layers' }
    : {
        className: 'evidence-studio__rail',
        role: 'group' as const,
        'aria-label': 'Evidence pack layers',
        initial: 'hidden',
        whileInView: 'visible' as const,
        viewport: { once: true, amount: 0.2 },
        variants: staggerContainer,
      };

  const MainWrap = shouldReduceMotion ? 'div' : motion.div;
  const mainProps = shouldReduceMotion
    ? { className: 'evidence-studio__main' }
    : {
        className: 'evidence-studio__main',
        initial: 'hidden',
        whileInView: 'visible' as const,
        viewport: { once: true, amount: 0.2 },
        variants: DOC_VARIANTS,
        transition: { ...transition, delay: shouldReduceMotion ? 0 : 0.1 },
      };

  const ButtonWrap = shouldReduceMotion ? 'div' : motion.div;

  return (
    <section className="evidence-studio-section" aria-labelledby="evidence-studio-title">
      <ScrollReveal direction="up" className="section-header-center">
        <p className="wp-eyebrow">DOCUMENT EXPLORER</p>
        <h2 id="evidence-studio-title" className="evidence-studio-section__title">
          Twelve sections. One connected evidence pack.
        </h2>
        <p className="evidence-studio-section__subtitle">
          Each section connects team context, privacy validation, management action, outcome review, and audit trail into one review-ready record.
        </p>
      </ScrollReveal>

      <StudioWrap {...studioProps}>
        <RailWrap {...railProps}>
          {LAYERS.map((item) => {
            const isActive = activeLayer === item.id;
            return (
              <ButtonWrap
                key={item.id}
                {...(shouldReduceMotion ? {} : { variants: RAIL_VARIANTS, transition })}
              >
                <button
                  type="button"
                  className={`evidence-layer-button${isActive ? ' is-active' : ''}`}
                  aria-pressed={isActive}
                  onClick={() => setActiveLayer(item.id)}
                >
                  <span className="evidence-layer-button__head">
                    <span className="evidence-layer-button__number">{item.number}</span>
                    {isActive ? <span className="evidence-layer-button__active-pill">Active</span> : null}
                  </span>
                  <span className="evidence-layer-button__title">{item.title}</span>
                  <span className="evidence-layer-button__desc">{item.description}</span>
                  <span className="evidence-layer-button__count">{item.sectionCount}</span>
                </button>
              </ButtonWrap>
            );
          })}
        </RailWrap>

        <MainWrap {...mainProps}>
          <div className="evidence-studio__callouts" aria-hidden="true">
            {CALLOUTS.map((callout) => (
              <span key={callout} className="evidence-studio__callout">
                {callout}
              </span>
            ))}
          </div>

          <div className="evidence-pack-preview" aria-label="Evidence pack document preview">
            <div className="evidence-pack-preview__toolbar">
              <span className="evidence-pack-preview__title">Governance Evidence Pack</span>
            </div>

            <div className="evidence-pack-preview__badges">
              <span className="evidence-pack-preview__badge">Evidence Pack</span>
              <span className="evidence-pack-preview__badge evidence-pack-preview__badge--validated">
                Privacy validated
              </span>
              <span className="evidence-pack-preview__badge">Version controlled</span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={layer.id}
                className="evidence-pack-preview__rows"
                initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={shouldReduceMotion ? undefined : { opacity: 0, y: -8 }}
                transition={transition}
              >
                {layer.rows.map((row) => (
                  <div key={row.num} className="evidence-pack-row">
                    <span className="evidence-pack-row__num">{row.num}</span>
                    <div className="evidence-pack-row__content">
                      <span className="evidence-pack-row__name">{row.name}</span>
                      <span className="evidence-pack-row__status">{row.status}</span>
                    </div>
                    <span className={`status-chip status-chip--${row.chip.toLowerCase()}`}>{row.chip}</span>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>

            <div className="evidence-pack-preview__footer">
              <span>v1 · Finalised</span>
              <span>12 sections connected</span>
              <span>Review-ready pack</span>
            </div>
          </div>

          <div className="evidence-chain-strip" aria-label="Evidence connection flow">
            <div className="evidence-chain-strip__track" aria-hidden="true" />
            {CHAIN_NODES.map((node, index) => {
              const isActive = isChainNodeActive(node, activeLayer);
              return (
                <div
                  key={node.id}
                  className={`evidence-chain-strip__node${isActive ? ' is-active' : ''}`}
                >
                  <motion.span
                    className="evidence-chain-strip__dot"
                    animate={
                      shouldReduceMotion
                        ? undefined
                        : {
                            scale: isActive ? 1.08 : 1,
                            boxShadow: isActive
                              ? '0 0 0 4px rgba(20, 184, 166, 0.18)'
                              : '0 0 0 0px rgba(20, 184, 166, 0)',
                          }
                    }
                    transition={transition}
                  />
                  <span className="evidence-chain-strip__label">{node.label}</span>
                  {index < CHAIN_NODES.length - 1 ? (
                    <span className="evidence-chain-strip__arrow" aria-hidden="true">
                      →
                    </span>
                  ) : null}
                </div>
              );
            })}
            <span className="evidence-chain-strip__ready">Review-ready pack</span>
          </div>
        </MainWrap>
      </StudioWrap>
    </section>
  );
}
