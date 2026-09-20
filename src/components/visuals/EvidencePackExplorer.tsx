import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { EVIDENCE_PACK_SECTIONS } from '../../config/site';
import { motionTransition } from '../../lib/motion';

const SECTION_COPY: Record<string, string> = {
  Cover: 'Pack metadata, organisation, team, and review period.',
  'Executive summary': 'One-page overview of conditions, action, and outcome for governance reviewers.',
  'Team profile': 'Team size, participation rate, and privacy gate validation status.',
  Scope: 'Evidence cycle dates, sector configuration, and review context.',
  'Pre-action conditions': 'Operating condition readings before management intervention.',
  'Management action': 'Logged response with owner, timestamp, and linked trigger signal.',
  'Intervention timeline': 'Chronological record of actions and follow-up observations.',
  'Post-action observations': 'Follow-up team-level readings after management action.',
  'Privacy validation': 'Confirmation that threshold was met before any data appeared.',
  'Compliance validation': 'Sector-specific governance checks applied to the pack.',
  'Audit trail': 'Append-only event log for the full evidence cycle.',
  'Interpretation note': 'Plain-language summary for review conversations.',
};

const VERSIONS = [
  { label: 'Draft', status: 'In progress', color: '#94A3B8' },
  { label: 'Review', status: 'Under review', color: '#F59E0B' },
  { label: 'Final', status: 'Locked v1.0', color: '#14B8A6' },
  { label: 'Superseded', status: 'If updated', color: '#64748B' },
];

const ANATOMY = [
  { label: 'Team condition', color: '#F59E0B' },
  { label: 'Privacy validation', color: '#14B8A6' },
  { label: 'Management action', color: '#0D9E72' },
  { label: 'Outcome review', color: '#1B6BB0' },
  { label: 'Audit trail', color: '#64748B' },
];

export default function EvidencePackExplorer() {
  const [active, setActive] = useState(0);
  const [version, setVersion] = useState(2);
  const shouldReduceMotion = useReducedMotion();
  const transition = motionTransition(shouldReduceMotion, 0.35);
  const section = EVIDENCE_PACK_SECTIONS[active];

  return (
    <div className="pack-explorer">
      <div className="pack-explorer__layout">
        <nav className="pack-explorer__nav" aria-label="Evidence Pack sections">
          {EVIDENCE_PACK_SECTIONS.map((s, i) => (
            <button
              key={s}
              type="button"
              className={`pack-explorer__nav-btn${active === i ? ' pack-explorer__nav-btn--active' : ''}`}
              aria-current={active === i ? 'true' : undefined}
              onClick={() => setActive(i)}
            >
              <span className="pack-explorer__nav-num">{String(i + 1).padStart(2, '0')}</span>
              {s}
            </button>
          ))}
        </nav>

        <AnimatePresence mode="wait">
          <motion.div
            key={section}
            className="pack-explorer__preview"
            initial={shouldReduceMotion ? false : { opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0, x: -8 }}
            transition={transition}
          >
            <div className="pack-explorer__doc-stack" aria-hidden="true">
              <div className="pack-explorer__doc-layer pack-explorer__doc-layer--3" />
              <div className="pack-explorer__doc-layer pack-explorer__doc-layer--2" />
              <div className="pack-explorer__doc-layer pack-explorer__doc-layer--1">
                <div className="pack-explorer__doc-header">
                  <span>Evidence Pack</span>
                  <span className="pack-explorer__doc-badge">Evidence Pack</span>
                </div>
                <h3 className="pack-explorer__doc-title">{section}</h3>
                <p className="pack-explorer__doc-body">{SECTION_COPY[section] ?? 'Section content compiled from the evidence cycle.'}</p>
                <div className="pack-explorer__doc-rows">
                  {[1, 2, 3].map((row) => (
                    <motion.div
                      key={row}
                      className="pack-explorer__doc-row"
                      initial={shouldReduceMotion ? false : { opacity: 0, width: '40%' }}
                      animate={{ opacity: 1, width: `${55 + row * 12}%` }}
                      transition={{ ...transition, delay: shouldReduceMotion ? 0 : row * 0.08 }}
                    />
                  ))}
                </div>
                <div className="pack-explorer__doc-seal">
                  <span>Status: Finalised</span>
                  <span>Privacy: Validated</span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="pack-explorer__meta">
        <div className="pack-explorer__versions">
          <span className="pack-explorer__meta-label">Version chain</span>
          <div className="pack-explorer__version-track" role="list" aria-label="Pack version states">
            {VERSIONS.map((v, i) => (
              <button
                key={v.label}
                type="button"
                role="listitem"
                className={`pack-explorer__version${version === i ? ' pack-explorer__version--active' : ''}`}
                onClick={() => setVersion(i)}
                style={{ '--version-color': v.color } as React.CSSProperties}
              >
                <span>{v.label}</span>
                <small>{v.status}</small>
              </button>
            ))}
          </div>
        </div>

        <div className="pack-explorer__anatomy">
          <span className="pack-explorer__meta-label">Pack anatomy</span>
          <div className="pack-explorer__anatomy-layers" aria-hidden="true">
            {ANATOMY.map((layer, i) => (
              <motion.div
                key={layer.label}
                className="pack-explorer__anatomy-layer"
                style={{ background: `${layer.color}22`, borderColor: `${layer.color}55`, zIndex: ANATOMY.length - i }}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: i * -6 }}
                viewport={{ once: true }}
                transition={{ ...transition, delay: shouldReduceMotion ? 0 : i * 0.06 }}
              >
                {layer.label}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
