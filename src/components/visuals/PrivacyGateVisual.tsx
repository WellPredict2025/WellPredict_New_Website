import { useState } from 'react';
import { Check, Lock } from 'lucide-react';

type MemberCount = 8 | 14;
type PrivacyStateKey = 'blocked' | 'ready';

const PRIVACY_STATES = {
  blocked: {
    memberCount: 8 as const,
    status: 'Suppressed',
    badge: 'Privacy protected',
    description: 'Below privacy threshold. Nothing is shown to managers.',
    footer:
      'Individual dots never surface. The gate blocks all team metrics until the threshold passes.',
    items: [
      ['Threshold', 'Not met'],
      ['Manager view', 'Hidden'],
      ['Individual scores', 'Never shown'],
    ] as const,
  },
  ready: {
    memberCount: 14 as const,
    status: 'Ready',
    badge: 'Team-level only',
    description: 'Threshold passed. Team-level metrics can be shown.',
    footer: 'Managers see team-level records only. Individual scores remain hidden.',
    items: [
      ['Threshold', 'Passed'],
      ['Manager view', 'Team-level'],
      ['Individual scores', 'Hidden'],
    ] as const,
  },
} satisfies Record<PrivacyStateKey, {
  memberCount: MemberCount;
  status: string;
  badge: string;
  description: string;
  footer: string;
  items: readonly (readonly [string, string])[];
}>;

export default function PrivacyGateVisual() {
  const [members, setMembers] = useState<MemberCount>(8);
  const activeState: PrivacyStateKey = members >= 10 ? 'ready' : 'blocked';
  const state = PRIVACY_STATES[activeState];

  return (
    <div className="privacy-gate-visual-page">
      <div className="privacy-gate-visual-page__controls" role="group" aria-label="Team size threshold simulator">
        <button
          type="button"
          className={`privacy-gate-visual-page__btn${members === 8 ? ' privacy-gate-visual-page__btn--active' : ''}`}
          aria-pressed={members === 8}
          onClick={() => setMembers(8)}
        >
          8 members
        </button>
        <button
          type="button"
          className={`privacy-gate-visual-page__btn${members === 14 ? ' privacy-gate-visual-page__btn--active' : ''}`}
          aria-pressed={members === 14}
          onClick={() => setMembers(14)}
        >
          14 members
        </button>
      </div>

      <div
        className={`privacy-gate-card privacy-gate-card--${activeState}`}
        aria-live="polite"
        aria-atomic="true"
      >
        <div className="privacy-gate-card__icon" aria-hidden="true">
          {activeState === 'ready' ? <Check strokeWidth={2.25} /> : <Lock strokeWidth={2.25} />}
        </div>

        <p className="privacy-gate-card__label">Privacy Gate</p>

        <div className="privacy-gate-card__headline">
          <h3>{state.status}</h3>
          <span>{state.badge}</span>
        </div>

        <p className="privacy-gate-card__description">{state.description}</p>

        <div className="privacy-gate-card__items">
          {state.items.map(([label, value]) => (
            <div key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>
      </div>

      <p className="privacy-gate-caption">{state.footer}</p>
    </div>
  );
}
