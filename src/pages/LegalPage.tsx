import { SectorPageTemplate } from './HealthcarePage';

export default function LegalPage() {
  return (
    <SectorPageTemplate
      eyebrow="Legal"
      title="Governance evidence for legal services teams."
      subtitle="Connect workload governance, action records, and review evidence for regulated practice environments."
      regulatorQ="When the SRA asks about workload governance and management response, this is your defensible record."
      accent="#6366F1"
      org="Legal Services Organisation"
      sectorLabel="Legal Services"
      alignment="Aligned with SRA Code of Conduct expectations for effective management and supervision."
      teams={[
        { name: 'Litigation Team', state: 'Normal' },
        { name: 'Client Intake Team', state: 'Watch' },
        { name: 'Compliance Team', state: 'Elevated' },
      ]}
      actionExample={{
        team: 'Compliance Team',
        action: 'Workload review initiated and partner supervision record updated with follow-up checkpoint.',
        date: '10 March 2026',
      }}
      evidenceTitle="Evidence pack for legal services"
      ctaLabel="Request a Legal Services Pilot"
      storyVariant="legal"
    />
  );
}
