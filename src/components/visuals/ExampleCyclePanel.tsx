interface ExampleCyclePanelProps {
  organisation?: string;
  team?: string;
  signal?: string;
  action?: string;
  outcome?: string;
  pack?: string;
}

export default function ExampleCyclePanel({
  organisation = 'Healthcare Organisation',
  team = 'Ward Alpha',
  signal = 'Elevated',
  action = 'Staffing review',
  outcome = 'Pressure reducing',
  pack = 'Ready',
}: ExampleCyclePanelProps) {
  const rows = [
    { label: 'Team', value: team },
    { label: 'Signal', value: signal, accent: '#F59E0B' },
    { label: 'Action', value: action, accent: '#0D9E72' },
    { label: 'Outcome', value: outcome, accent: '#14B8A6' },
    { label: 'Pack', value: pack, accent: '#1B6BB0' },
  ];

  return (
    <div className="example-cycle-panel" aria-label="Evidence cycle">
      <span className="example-cycle-panel__eyebrow">Evidence cycle</span>
      <h3 className="example-cycle-panel__title">{organisation}</h3>
      <div className="example-cycle-panel__rows">
        {rows.map((row, i) => (
          <div key={row.label} className="example-cycle-panel__row">
            <span className="example-cycle-panel__label">{row.label}</span>
            <span className="example-cycle-panel__value" style={row.accent ? { color: row.accent } : undefined}>
              {row.value}
            </span>
            {i < rows.length - 1 && <span className="example-cycle-panel__connector" aria-hidden="true" />}
          </div>
        ))}
      </div>
    </div>
  );
}
