import PageHero from '../components/PageHero';
import LegalLayout from '../components/LegalLayout';
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_TEL } from '../config/contact';

const SECTIONS = [
  {
    id: 'who-we-are',
    title: 'Who we are',
    content: (
      <p>
        WellPredict Ltd is a United Kingdom company building governance evidence software for regulated teams. This Privacy Policy applies to visitors to our website and to organisations evaluating or using our services.
      </p>
    ),
  },
  {
    id: 'information-we-collect',
    title: 'Information we collect',
    content: (
      <>
        <p>We may collect the following types of information:</p>
        <ul>
          <li>Contact details you submit through enquiry, pilot, or contact forms.</li>
          <li>Organisation and role information provided during sales or pilot conversations.</li>
          <li>Anonymous team-level platform data configured by customer organisations, where applicable.</li>
          <li>Standard website usage data such as pages visited, browser type, and approximate location derived from IP address.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'legal-basis',
    title: 'Legal basis',
    content: (
      <p>
        Where UK GDPR applies, we process personal data on one or more lawful bases depending on context. These may include consent (for example, where you submit an enquiry form), legitimate interests (for example, responding to business enquiries and improving our website), and contractual necessity (for example, delivering services under agreement). We aim to identify the appropriate basis before processing and to limit processing to what is necessary.
      </p>
    ),
  },
  {
    id: 'how-we-use-information',
    title: 'How we use information',
    content: (
      <>
        <p>We use information to:</p>
        <ul>
          <li>Respond to enquiries and pilot applications.</li>
          <li>Deliver, support, and improve the WellPredict platform.</li>
          <li>Communicate about product updates, pilots, and service-related matters.</li>
          <li>Maintain security, prevent misuse, and meet legal obligations.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'how-long-we-keep-information',
    title: 'Retention',
    content: (
      <>
        <p>
          Retention periods depend on the type of information and why we hold it. Contact and enquiry records are kept for as long as needed to manage the relationship, respond to follow-up questions, and meet reasonable business or legal requirements.
        </p>
        <p>
          Platform data retention is configured per customer agreement and product policy. When information is no longer required, we delete or anonymise it in line with our internal retention practices.
        </p>
      </>
    ),
  },
  {
    id: 'international-transfers',
    title: 'International transfers',
    content: (
      <p>
        WellPredict is based in the United Kingdom. If we transfer personal data outside the UK, we do so only where appropriate safeguards are in place, such as adequacy regulations, standard contractual clauses, or another lawful transfer mechanism under UK data protection law.
      </p>
    ),
  },
  {
    id: 'automated-decision-making',
    title: 'Automated decision-making',
    content: (
      <p>
        WellPredict is designed to support governance evidence at team level. We do not use website enquiry data to make solely automated decisions that produce legal or similarly significant effects about individuals. Where customer organisations configure platform analytics, any automated processing is governed by their policies and agreements with us.
      </p>
    ),
  },
  {
    id: 'how-we-protect-information',
    title: 'How we protect information',
    content: (
      <p>
        We apply access controls, encryption in transit, and operational safeguards designed to protect information against unauthorised access, alteration, or disclosure. No online service can guarantee absolute security, but we work to maintain appropriate protections for the data we handle.
      </p>
    ),
  },
  {
    id: 'your-rights',
    title: 'Data subject rights',
    content: (
      <>
        <p>
          Under UK GDPR, you may have rights to access, rectify, erase, restrict, or object to processing of your personal data, and to data portability where applicable.
        </p>
        <p>
          To exercise these rights, contact{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="contact-link">{CONTACT_EMAIL}</a>. We may need to verify your identity before responding.
        </p>
      </>
    ),
  },
  {
    id: 'contact-us',
    title: 'Contact us',
    content: (
      <p>
        WellPredict Ltd, United Kingdom. Email:{' '}
        <a href={`mailto:${CONTACT_EMAIL}`} className="contact-link">{CONTACT_EMAIL}</a>
        {' · '}
        Phone: <a href={`tel:${CONTACT_PHONE_TEL}`} className="contact-link">{CONTACT_PHONE}</a>
      </p>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        subtitle="This Privacy Policy explains how WellPredict collects, uses, stores, and protects information when you use our website or contact us about our services."
        visualType="legal"
      />
      <LegalLayout
        showCounselBanner={false}
        sections={SECTIONS}
        documentInfo={[
          { label: 'Last updated', value: '7 June 2026' },
          { label: 'Applies to', value: 'WellPredict website and platform services' },
          {
            label: 'Contact',
            value: (
              <a href={`mailto:${CONTACT_EMAIL}`} className="contact-link">{CONTACT_EMAIL}</a>
            ),
          },
        ]}
      />
    </>
  );
}
