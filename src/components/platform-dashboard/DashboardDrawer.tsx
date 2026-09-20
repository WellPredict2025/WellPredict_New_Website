import { useEffect, useRef } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import type { DrawerState } from './types';
import { STATE_COLORS } from './types';
import { motionTransition } from '../../lib/motion';

type DashboardDrawerProps = {
  drawer: DrawerState;
  onClose: () => void;
  onCompilePack?: (packId: string) => void;
  onMarkReviewed?: (interventionId: string) => void;
  onAddFollowUp?: (interventionId: string, note: string) => void;
  showToast: (message: string) => void;
};

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, padding: '10px 0', borderBottom: '1px solid #DCE8EF' }}>
      <span style={{ fontSize: 11, color: '#64748B' }}>{label}</span>
      <span style={{ fontSize: 11, fontWeight: 600, color: '#0F172A', textAlign: 'right' }}>{value}</span>
    </div>
  );
}

export default function DashboardDrawer({
  drawer,
  onClose,
  onCompilePack,
  onMarkReviewed,
  onAddFollowUp,
  showToast,
}: DashboardDrawerProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const transition = motionTransition(shouldReduceMotion, 0.3);

  useEffect(() => {
    if (!drawer) return;
    closeButtonRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [drawer, onClose]);

  const title =
    drawer?.kind === 'team' ? drawer.item.name
      : drawer?.kind === 'pack' ? drawer.item.title
        : drawer?.kind === 'intervention' ? drawer.item.title
          : drawer?.item.type ?? 'Details';

  return (
    <AnimatePresence>
      {drawer && (
        <>
          <motion.button
            type="button"
            className="platform-drawer-backdrop"
            aria-label="Close details"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transition}
            onClick={onClose}
          />
          <motion.aside
            className="platform-drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="platform-drawer-title"
            initial={{ x: shouldReduceMotion ? 0 : '100%', opacity: shouldReduceMotion ? 1 : 0.98 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: shouldReduceMotion ? 0 : '100%', opacity: shouldReduceMotion ? 1 : 0.98 }}
            transition={transition}
          >
            <div className="platform-drawer-header">
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, color: '#14B8A6', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  {drawer.kind} details
                </div>
                <h4 id="platform-drawer-title" style={{ margin: '6px 0 0', fontSize: 16, fontWeight: 700, color: '#0F172A' }}>{title}</h4>
              </div>
              <button ref={closeButtonRef} type="button" className="platform-drawer-close" onClick={onClose} aria-label="Close drawer">
                <span aria-hidden="true">×</span>
              </button>
            </div>

            <div className="platform-drawer-body">
              {drawer.kind === 'team' && (
                <>
                  <span style={{ display: 'inline-block', fontSize: 10, fontWeight: 700, color: STATE_COLORS[drawer.item.state], background: `${STATE_COLORS[drawer.item.state]}14`, padding: '4px 10px', borderRadius: 999, marginBottom: 12 }}>
                    {drawer.item.state}
                  </span>
                  <DetailRow label="Participation" value={`${drawer.item.participation}%`} />
                  <DetailRow label="Privacy gate" value={drawer.item.privacyGate} />
                  <DetailRow label="Latest management action" value={drawer.item.latestAction} />
                  <DetailRow label="Evidence pack readiness" value={drawer.item.packReadiness} />
                </>
              )}

              {drawer.kind === 'pack' && (
                <>
                  <span style={{ display: 'inline-block', fontSize: 10, fontWeight: 700, color: '#1B6BB0', background: '#EFF6FF', padding: '4px 10px', borderRadius: 999, marginBottom: 12 }}>
                    {drawer.item.readiness}
                  </span>
                  <DetailRow label="Team" value={drawer.item.team} />
                  <DetailRow label="Sector" value={drawer.item.sector} />
                  <DetailRow label="Date range" value={drawer.item.dateRange} />
                  <div className="platform-drawer-actions">
                    <button type="button" className="platform-btn platform-btn-primary" onClick={() => showToast('Preview prepared')}>Download Preview</button>
                    {drawer.item.readiness !== 'Compiled' && drawer.item.readiness !== 'Reviewed' && (
                      <button
                        type="button"
                        className="platform-btn platform-btn-secondary"
                        onClick={() => {
                          onCompilePack?.(drawer.item.id);
                          showToast('Evidence pack compiled');
                          onClose();
                        }}
                      >
                        Compile Pack
                      </button>
                    )}
                  </div>
                </>
              )}

              {drawer.kind === 'intervention' && (
                <>
                  <span style={{ display: 'inline-block', fontSize: 10, fontWeight: 700, color: drawer.item.status === 'Reviewed' ? '#0D9E72' : drawer.item.status === 'Resolved' ? '#0D9E72' : '#C87A20', background: '#F7FBFC', padding: '4px 10px', borderRadius: 999, marginBottom: 12 }}>
                    {drawer.item.status}
                  </span>
                  <DetailRow label="Team" value={drawer.item.team} />
                  <DetailRow label="Trigger condition" value={drawer.item.trigger} />
                  <DetailRow label="Management action" value={drawer.item.action} />
                  <DetailRow label="Owner role" value={drawer.item.owner} />
                  <DetailRow label="Outcome" value={drawer.item.outcome} />
                  <DetailRow label="Follow-up date" value={drawer.item.followUpDate ?? 'Not set'} />
                  <DetailRow label="Linked evidence pack" value={drawer.item.linkedPack ?? 'None linked'} />
                  <div className="platform-drawer-actions">
                    {drawer.item.status !== 'Reviewed' && (
                      <button
                        type="button"
                        className="platform-btn platform-btn-primary"
                        onClick={() => {
                          onMarkReviewed?.(drawer.item.id);
                          showToast('Intervention reviewed');
                          onClose();
                        }}
                      >
                        Mark Reviewed
                      </button>
                    )}
                    <button
                      type="button"
                      className="platform-btn platform-btn-secondary"
                      onClick={() => {
                        onAddFollowUp?.(drawer.item.id, 'Follow-up note added');
                        showToast('Follow-up added');
                      }}
                    >
                      Add Follow-up
                    </button>
                  </div>
                </>
              )}

              {drawer.kind === 'audit' && (
                <>
                  <DetailRow label="Timestamp" value={drawer.item.timestamp} />
                  <DetailRow label="Actor role" value={drawer.item.actor} />
                  <DetailRow label="Event type" value={drawer.item.type} />
                  <DetailRow label="Detail" value={drawer.item.detail} />
                </>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
