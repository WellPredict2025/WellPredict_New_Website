interface DocumentStackMockupProps {
  title?: string;
  subtitle?: string;
  status?: string;
}

export default function DocumentStackMockup({
  title = 'Legal document',
  subtitle = 'WellPredict · Evidence Pack',
  status = 'Draft',
}: DocumentStackMockupProps) {
  return (
    <div className="doc-stack" aria-hidden="true">
      <div className="doc-stack__layer doc-stack__layer--3" />
      <div className="doc-stack__layer doc-stack__layer--2" />
      <div className="doc-stack__layer doc-stack__layer--1">
        <div className="doc-stack__header">
          <span>{subtitle}</span>
          <span className="doc-stack__status">{status}</span>
        </div>
        <h4 className="doc-stack__title">{title}</h4>
        <div className="doc-stack__lines">
          <span style={{ width: '92%' }} />
          <span style={{ width: '78%' }} />
          <span style={{ width: '85%' }} />
          <span style={{ width: '60%' }} />
        </div>
      </div>
    </div>
  );
}
