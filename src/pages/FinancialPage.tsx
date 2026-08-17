import { SectorPageTemplate } from './HealthcarePage';

export default function FinancialPage() {
  return (
    <SectorPageTemplate
      eyebrow="Financial Services"
      title="Governance evidence for financial services teams"
      subtitle="WellPredict helps financial services teams connect operating conditions, management actions, and outcome reviews into clear records for internal review, operational resilience, and governance conversations."
      regulatorQ="When the FCA asks for reasonable steps evidence, this document is it."
      accent="#8B5CF6"
      org="Financial Services Organisation"
      sectorLabel="Financial Services"
      alignment="Configured for FCA, PRA, SMCR, and operational resilience governance requirements."
      teams={[
        { name: 'Operations Risk', state: 'Normal' },
        { name: 'Client Services', state: 'Watch' },
        { name: 'Controls Team', state: 'Elevated' },
      ]}
      actionExample={{
        team: 'Controls Team',
        action: 'Escalation review completed and operating resilience action plan updated with management sign-off.',
        date: '5 March 2026',
      }}
      evidenceTitle="Evidence pack for financial services"
      ctaLabel="Request a Financial Services Pilot"
      storyVariant="financial"
    />
  );
}
