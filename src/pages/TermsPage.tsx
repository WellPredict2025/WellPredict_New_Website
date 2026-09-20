import PageHero from '../components/PageHero';
import LegalLayout from '../components/LegalLayout';
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_TEL } from '../config/contact';

const SECTIONS = [
  {
    id: 'who-we-are',
    title: 'Who we are',
    content: (
      <p>
        WellPredict Ltd is a United Kingdom company. We provide governance evidence software and related services for regulated organisations. These Terms of Service apply to your use of the WellPredict website and any services made available through it.
      </p>
    ),
  },
  {
    id: 'use-of-website',
    title: 'Use of the website',
    content: (
      <>
        <p>You may use this website for lawful purposes related to learning about WellPredict, requesting information, or contacting us about our services.</p>
        <p>You must not attempt to disrupt the website, gain unauthorised access to systems, scrape content in a way that impairs service, or use the website for unlawful or misleading purposes.</p>
      </>
    ),
  },
  {
    id: 'product-information',
    title: 'Product information',
    content: (
      <p>
        Information on this website describes WellPredict at a high level. Product capabilities, sector configuration, and service scope may vary by agreement. Nothing on this website constitutes a binding offer unless confirmed in writing.
      </p>
    ),
  },
  {
    id: 'pilot-and-service-enquiries',
    title: 'Pilot and service enquiries',
    content: (
      <p>
        Pilot applications and service enquiries are subject to review and acceptance. Separate terms may apply to pilots, subscriptions, or customer agreements. Where those terms conflict with this page, the customer agreement will prevail.
      </p>
    ),
  },
  {
    id: 'intellectual-property',
    title: 'Intellectual property',
    content: (
      <p>
        The WellPredict name, branding, website content, product materials, and underlying software are owned by WellPredict Ltd or its licensors. You may not copy, modify, distribute, or reverse engineer our materials except as permitted by law or with our prior written consent.
      </p>
    ),
  },
  {
    id: 'acceptable-use',
    title: 'Acceptable use',
    content: (
      <p>
        WellPredict is designed for privacy-gated, team-level governance evidence. You must not use the platform or related services for individual monitoring, surveillance, or purposes inconsistent with that design and applicable law.
      </p>
    ),
  },
  {
    id: 'availability',
    title: 'Availability',
    content: (
      <p>
        We aim to keep the website and services reasonably available. Planned maintenance, updates, or circumstances outside our control may affect access. We will communicate material planned downtime where practical.
      </p>
    ),
  },
  {
    id: 'liability',
    title: 'Liability',
    content: (
      <>
        <p>
          To the fullest extent permitted by law, WellPredict Ltd is not liable for indirect, incidental, or consequential loss arising from use of this website. Nothing in these terms excludes liability that cannot be excluded under applicable law.
        </p>
        <p>
          Website content is provided for general information. You should obtain professional advice where needed before making decisions based on information presented here.
        </p>
      </>
    ),
  },
  {
    id: 'changes-to-terms',
    title: 'Changes to these terms',
    content: (
      <p>
        We may update these Terms of Service from time to time. When we make changes, we will update the date shown at the top of this page. Continued use of the website after changes are published constitutes acceptance of the updated terms.
      </p>
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

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of Service"
        subtitle="These Terms of Service explain the rules for using the WellPredict website and any services made available through it. By using the website or contacting us about WellPredict, you agree to these terms."
        visualType="legal"
      />
      <LegalLayout
        showCounselBanner={false}
        sections={SECTIONS}
        documentInfo={[
          { label: 'Last updated', value: '7 June 2026' },
          { label: 'Applies to', value: 'Use of the WellPredict website and related enquiries' },
          {
            label: 'Contact',
            value: <a href={`mailto:${CONTACT_EMAIL}`} className="contact-link">{CONTACT_EMAIL}</a>,
          },
        ]}
      />
    </>
  );
}
