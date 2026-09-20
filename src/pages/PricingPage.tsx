import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import SectionHeader from '../components/SectionHeader';
import FAQAccordion from '../components/FAQAccordion';
import CTASection from '../components/CTASection';
import PricingPathway from '../components/PricingPathway';
import { CONTACT_EMAIL } from '../config/contact';

const COMPARE_ROWS = [
  { feature: 'Team setup', pilot: true, organisation: true, enterprise: true },
  { feature: 'Evidence Pack', pilot: true, organisation: true, enterprise: true },
  { feature: 'Privacy validation', pilot: true, organisation: true, enterprise: true },
  { feature: 'Audit timeline', pilot: true, organisation: true, enterprise: true },
  { feature: 'Sector configuration', pilot: true, organisation: true, enterprise: true },
  { feature: 'Review session', pilot: true, organisation: true, enterprise: true },
  { feature: 'Multi-team dashboard', pilot: false, organisation: true, enterprise: true },
  { feature: 'Governance reporting', pilot: false, organisation: true, enterprise: true },
  { feature: 'Support level', pilot: 'Pilot', organisation: 'Standard', enterprise: 'Priority' },
];

function CompareCell({ value }: { value: boolean | string }) {
  if (typeof value === 'string') {
    return <span className="role-matrix__cell role-matrix__cell--yes">{value}</span>;
  }
  return (
    <span className={`role-matrix__cell${value ? ' role-matrix__cell--yes' : ' role-matrix__cell--no'}`}>
      {value ? '✓' : '—'}
    </span>
  );
}

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="Simple pricing for governed evidence cycles."
        subtitle="Start with one team, then scale across units, sites, or regulated functions."
        primaryCta={{ label: 'Book a Product Walkthrough', href: '/contact' }}
        secondaryCta={{ label: 'Apply for Pilot', href: '/pilot' }}
        visualType="pricing"
      />

      <section className="section-padding wp-section" style={{ background: '#fff' }}>
        <div className="wp-container--narrow">
          <SectionHeader
            align="center"
            title="Pricing depends on your scope"
            subtitle="Pricing depends on team count, sector scope, deployment model, and support requirements. We provide a tailored quote after understanding your governance context."
          />
        </div>
      </section>

      <PricingPathway />

      <section className="section-padding wp-section" style={{ background: '#fff' }}>
        <div className="wp-container">
          <SectionHeader title="Feature comparison" subtitle="Capability across Pilot, Organisation, and Enterprise pathways." />
          <div className="role-matrix__table-wrap">
            <table className="role-matrix__table">
              <thead>
                <tr>
                  <th scope="col">Feature</th>
                  <th scope="col">Pilot</th>
                  <th scope="col">Organisation</th>
                  <th scope="col">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE_ROWS.map((row) => (
                  <tr key={row.feature}>
                    <th scope="row" style={{ textAlign: 'left' }}>{row.feature}</th>
                    <td><CompareCell value={row.pilot} /></td>
                    <td><CompareCell value={row.organisation} /></td>
                    <td><CompareCell value={row.enterprise} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ marginTop: 32, textAlign: 'center' }}>
            <Link to="/contact" className="btn-primary" style={{ textDecoration: 'none' }}>
              Book a Product Walkthrough
            </Link>
          </div>
        </div>
      </section>

      <section className="section-padding wp-section" style={{ background: '#F7FBFC' }}>
        <div className="wp-container--narrow">
          <SectionHeader title="Pricing FAQ" />
          <FAQAccordion
            items={[
              { q: 'Is pricing public?', a: 'No. Pricing is provided on request based on team count, sector scope, deployment model, and support requirements.' },
              { q: 'What affects pricing?', a: 'Team count, number of operating units or sites, sector configuration, reporting needs, and support level all influence pricing.' },
              { q: 'Can we start with one team?', a: 'Yes. Most organisations begin with a single-team pilot before expanding across units or sites.' },
            ]}
          />
          <div className="wp-card pricing-enquiry-card">
            <h3 className="pricing-enquiry-card__title">Pricing enquiries</h3>
            <p className="pricing-enquiry-card__desc">New deployments, pilots, and organisation pricing.</p>
            <a href={`mailto:${CONTACT_EMAIL}`} className="contact-link">{CONTACT_EMAIL}</a>
          </div>
        </div>
      </section>

      <CTASection title="Ready to start?" primaryLabel="Book a Product Walkthrough" primaryHref="/contact" secondaryLabel="Apply for Pilot" secondaryHref="/pilot" />
    </>
  );
}
