interface ComparisonPanelProps {
  beforeTitle?: string;
  afterTitle?: string;
  beforeItems: string[];
  afterItems: string[];
}

export default function ComparisonPanel({
  beforeTitle = 'Before WellPredict',
  afterTitle = 'After WellPredict',
  beforeItems,
  afterItems,
}: ComparisonPanelProps) {
  return (
    <div className="comparison-panel">
      <div className="comparison-panel__col comparison-panel__col--before">
        <div className="comparison-panel__header">
          <span className="comparison-panel__icon comparison-panel__icon--before" aria-hidden="true">📁</span>
          <h3>{beforeTitle}</h3>
        </div>
        <ul>
          {beforeItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div className="comparison-panel__visual comparison-panel__visual--scattered" aria-hidden="true">
          {['Email', 'Sheet', 'Notes', 'Folder'].map((label) => (
            <span key={label} className="comparison-panel__chip comparison-panel__chip--muted">{label}</span>
          ))}
        </div>
      </div>

      <div className="comparison-panel__arrow" aria-hidden="true">→</div>

      <div className="comparison-panel__col comparison-panel__col--after">
        <div className="comparison-panel__header">
          <span className="comparison-panel__icon comparison-panel__icon--after" aria-hidden="true">📄</span>
          <h3>{afterTitle}</h3>
        </div>
        <ul>
          {afterItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div className="comparison-panel__visual comparison-panel__visual--connected" aria-hidden="true">
          <span className="comparison-panel__pack">Evidence Pack v1.0</span>
          <div className="comparison-panel__chain">
            {['Signal', 'Action', 'Outcome', 'Audit'].map((step) => (
              <span key={step}>{step}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
