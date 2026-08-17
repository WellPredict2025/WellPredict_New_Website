import PageHero from '../components/PageHero';
import LegalLayout from '../components/LegalLayout';
import { CONTACT_EMAIL } from '../config/contact';

const SECTIONS = [
  {
    id: 'overview',
    title: 'Overview',
    content: (
      <p>
        This page summarises how WellPredict processes data when delivering governance evidence services to customer
        organisations. It is intended as a plain-English overview. Contractual terms, including Data Processing
        Agreements, apply where services are provided.
      </p>
    ),
  },
  {
    id: 'roles',
    title: 'Roles',
    content: (
      <div className="content-split">
        <p>
          The customer organisation is typically the data controller for workforce and governance information processed
          through WellPredict. WellPredict acts as a data processor when handling team-level signals, management action
          records, and Evidence Pack content on the customer&apos;s behalf.
        </p>
        <div className="wp-card" style={{ padding: '20px 22px', textAlign: 'center' }} aria-label="Controller and processor diagram">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
            <span className="wp-card" style={{ padding: '12px 16px', fontSize: 13, fontWeight: 600 }}>Customer · Controller</span>
            <span style={{ color: '#14B8A6' }}>→</span>
            <span className="wp-card" style={{ padding: '12px 16px', fontSize: 13, fontWeight: 600, borderColor: 'rgba(20,184,166,0.35)' }}>WellPredict · Processor</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'data-categories',
    title: 'Data categories',
    content: (
      <ul>
        <li>Anonymous weekly team responses collected through the platform.</li>
        <li>Aggregated team-level operating condition metrics after privacy threshold checks.</li>
        <li>Management action records, follow-up notes, and outcome review entries.</li>
        <li>Audit trail events and versioned Evidence Pack content.</li>
        <li>Account, configuration, and support information required to operate the service.</li>
      </ul>
    ),
  },
  {
    id: 'processing-purposes',
    title: 'Processing purposes',
    content: (
      <p>
        Data is processed to deliver privacy-gated governance evidence services, including team-level signal collection,
        operating condition classification, management action logging, Evidence Pack compilation, access control, and
        service support.
      </p>
    ),
  },
  {
    id: 'retention',
    title: 'Retention',
    content: (
      <p>
        Raw responses are deleted after seven days unless a shorter period is configured. Governance records and
        Evidence Packs are retained according to customer policy, product configuration, and contractual terms.
      </p>
    ),
  },
  {
    id: 'security-measures',
    title: 'Security measures',
    content: (
      <p>
        WellPredict is designed to support access controls, encryption in transit, operational monitoring, and
        append-only audit trails. Specific security documentation is available on request as part of customer onboarding.
      </p>
    ),
  },
  {
    id: 'subprocessors',
    title: 'Subprocessors',
    content: (
      <p>
        WellPredict will maintain subprocessor information as part of customer onboarding and contractual documentation.
        Subprocessors will be listed when applicable and communicated to customers in line with agreement requirements.
      </p>
    ),
  },
  {
    id: 'international-transfers',
    title: 'International transfers',
    content: (
      <p>
        WellPredict is designed for United Kingdom hosting and UK customer deployments. Where international processing
        becomes relevant, transfer mechanisms and documentation will be addressed in contractual arrangements.
      </p>
    ),
  },
  {
    id: 'contact',
    title: 'Contact',
    content: (
      <p>
        For data processing enquiries, contact{' '}
        <a href={`mailto:${CONTACT_EMAIL}`} className="contact-link">{CONTACT_EMAIL}</a>.
        Data Processing Agreements are available on request.
      </p>
    ),
  },
];

export default function DataProcessingPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Data Processing"
        subtitle="A plain-English overview of data processing roles, categories, retention, and controls."
        visualType="legal"
      />
      <LegalLayout
        showCounselBanner={false}
        documentInfo={[
          { label: 'Last updated', value: '7 June 2026' },
          { label: 'Applies to', value: 'WellPredict platform processing on customer behalf' },
          { label: 'DPA', value: 'Available on request' },
          {
            label: 'Contact',
            value: <a href={`mailto:${CONTACT_EMAIL}`} className="contact-link">{CONTACT_EMAIL}</a>,
          },
        ]}
        sections={SECTIONS}
      />
    </>
  );
}
