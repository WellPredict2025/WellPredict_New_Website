export type SectorStoryVariant = 'healthcare' | 'food' | 'financial' | 'legal' | 'education' | 'corporate';

interface SectorStoryVisualProps {
  variant: SectorStoryVariant;
  accent?: string;
}

const STORIES: Record<SectorStoryVariant, { title: string; steps: { label: string; detail: string }[]; questions?: string[] }> = {
  healthcare: {
    title: 'Ward evidence cycle',
    steps: [
      { label: 'Team signal', detail: 'Ward Alpha · Elevated operating conditions' },
      { label: 'Condition flagged', detail: 'Privacy gate passed · 14 members' },
      { label: 'Management action', detail: 'Staffing rebalance logged' },
      { label: 'Review note', detail: 'Follow-up readings improving' },
      { label: 'Evidence pack ready', detail: 'CQC-style review conversation supported' },
    ],
    questions: ['What was happening?', 'What did management do?', 'Did the situation improve?', 'Is the privacy threshold met?'],
  },
  food: {
    title: 'Shift signal to evidence',
    steps: [
      { label: 'Shift pressure signal', detail: 'Line One · Elevated conditions' },
      { label: 'Supervisor action', detail: 'Line review and staffing adjustment' },
      { label: 'Follow-up observation', detail: 'Night Shift Team · Watch state' },
      { label: 'Evidence record', detail: 'Production line pack compiled' },
    ],
  },
  financial: {
    title: 'Reasonable steps style record',
    steps: [
      { label: 'Controls signal', detail: 'Controls Team · Watch conditions' },
      { label: 'Management oversight', detail: 'Operational review logged' },
      { label: 'Follow-up', detail: 'Client Services stabilising' },
      { label: 'Evidence trail', detail: 'Management oversight record ready' },
    ],
  },
  legal: {
    title: 'Practice management evidence',
    steps: [
      { label: 'Team condition', detail: 'Litigation Team · Elevated workload' },
      { label: 'Action record', detail: 'Caseload review scheduled' },
      { label: 'Review note', detail: 'Compliance Team follow-up' },
      { label: 'Audit trail', detail: 'Fee-earner team record finalised' },
    ],
  },
  education: {
    title: 'Leadership evidence cycle',
    steps: [
      { label: 'Staff team condition', detail: 'Year Seven Team · Watch' },
      { label: 'Leadership action', detail: 'Support plan initiated' },
      { label: 'Follow-up review', detail: 'Learning Support Team engaged' },
      { label: 'Evidence pack', detail: 'Leadership review record ready' },
    ],
  },
  corporate: {
    title: 'Board-ready internal review',
    steps: [
      { label: 'Department condition', detail: 'Customer Support · Elevated' },
      { label: 'Management action', detail: 'Workload review logged' },
      { label: 'Outcome review', detail: 'Conditions improving' },
      { label: 'Evidence status', detail: 'Department pack ready' },
    ],
  },
};

export default function SectorStoryVisual({ variant, accent = '#14B8A6' }: SectorStoryVisualProps) {
  const story = STORIES[variant];

  return (
    <div className="sector-story" style={{ '--story-accent': accent } as React.CSSProperties}>
      <h3 className="sector-story__title">{story.title}</h3>
      <ol className="sector-story__steps">
        {story.steps.map((step, i) => (
          <li key={step.label} className="sector-story__step">
            <span className="sector-story__dot" aria-hidden="true">{i + 1}</span>
            <div>
              <strong>{step.label}</strong>
              <p>{step.detail}</p>
            </div>
          </li>
        ))}
      </ol>
      {story.questions && (
        <div className="sector-story__questions">
          <span className="sector-story__questions-label">What the pack answers</span>
          <ul>{story.questions.map((q) => <li key={q}>{q}</li>)}</ul>
        </div>
      )}
    </div>
  );
}
