import { SectorPageTemplate } from './HealthcarePage';

export default function EducationPage() {
  return (
    <SectorPageTemplate
      eyebrow="Education"
      title="Evidence records for education providers."
      subtitle="Support leadership visibility with team-level operating condition and action records."
      regulatorQ="When Ofsted asks about leadership response to team pressure, this is it."
      accent="#F59E0B"
      org="Education Organisation"
      sectorLabel="Education"
      alignment="Configured for Ofsted leadership and management evaluation frameworks."
      teams={[
        { name: 'Year Seven Team', state: 'Normal' },
        { name: 'Learning Support Team', state: 'Watch' },
        { name: 'Safeguarding Team', state: 'Elevated' },
        { name: 'Teaching Team', state: 'Normal' },
      ]}
      actionExample={{
        team: 'Learning Support Team',
        action: 'Leadership action plan logged with resource allocation review and scheduled outcome check.',
        date: '14 March 2026',
      }}
      evidenceTitle="Evidence pack for education"
      ctaLabel="Request an Education Pilot"
      storyVariant="education"
    />
  );
}
