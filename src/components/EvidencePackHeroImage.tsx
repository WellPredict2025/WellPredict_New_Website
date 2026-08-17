export default function EvidencePackHeroImage() {
  return (
    <div className="evidence-hero-preview" aria-hidden="true">
      <div className="evidence-hero-preview__top">
        <span>Governance Evidence Pack</span>
        <span>v1</span>
      </div>

      <div className="evidence-hero-preview__body">
        <div className="evidence-hero-preview__intro">
          <p>Review-ready record</p>
          <h3>Evidence Pack Summary</h3>
        </div>

        <div className="evidence-hero-preview__status">
          <span>12 sections</span>
          <span>Privacy validated</span>
          <span>Audit trail sealed</span>
        </div>

        <div className="evidence-hero-preview__table">
          <div>
            <span>Team context</span>
            <strong>Ready</strong>
          </div>
          <div>
            <span>Action logged</span>
            <strong>Complete</strong>
          </div>
          <div>
            <span>Outcome reviewed</span>
            <strong>Complete</strong>
          </div>
          <div>
            <span>Record sealed</span>
            <strong>Ready</strong>
          </div>
        </div>

        <div className="evidence-hero-preview__footer">Ready for internal review</div>
      </div>
    </div>
  );
}
