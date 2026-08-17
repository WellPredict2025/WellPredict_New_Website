import PageHero from '../components/PageHero';
import LegalLayout from '../components/LegalLayout';
import DocumentStackMockup from '../components/visuals/DocumentStackMockup';
import { CONTACT_EMAIL } from '../config/contact';
import { resetCookieConsent } from '../lib/cookieConsent';

const COOKIES = [
  { name: 'session', purpose: 'Maintains secure website session state', type: 'Essential', duration: 'Session' },
  { name: 'wellpredict_cookie_consent', purpose: 'Stores your cookie preference choice', type: 'Preference', duration: '1 year' },
  { name: 'analytics', purpose: 'Helps us understand website usage when enabled', type: 'Analytics', duration: '2 years' },
];

const CATEGORIES = [
  {
    title: 'Essential cookies',
    desc: 'Required for core website functionality including security, navigation, and basic operation. These cannot be switched off.',
    color: '#14B8A6',
  },
  {
    title: 'Analytics cookies',
    desc: 'Help us understand how visitors use the website so we can improve content, navigation, and performance. Used only with your permission.',
    color: '#F59E0B',
  },
  {
    title: 'Preference cookies',
    desc: 'Remember choices such as cookie preferences so we do not ask again on every visit.',
    color: '#64748B',
  },
];

function handleResetPreferences() {
  resetCookieConsent();
}

export default function CookiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Cookie Policy"
        subtitle="How cookies and similar technologies are used on the WellPredict website."
        visualType="legal"
      />
      <LegalLayout
        showCounselBanner={false}
        documentInfo={[
          { label: 'Last updated', value: '7 June 2026' },
          { label: 'Applies to', value: 'WellPredict website' },
          {
            label: 'Contact',
            value: <a href={`mailto:${CONTACT_EMAIL}`} className="contact-link">{CONTACT_EMAIL}</a>,
          },
        ]}
        sections={[
          {
            id: 'what-cookies-are',
            title: 'What cookies are',
            content: (
              <div className="content-split" style={{ alignItems: 'center' }}>
                <p>
                  Cookies are small text files stored on your device. WellPredict uses essential cookies to operate
                  the website and optional cookies only when you give permission.
                </p>
                <DocumentStackMockup title="Cookie Policy" subtitle="WellPredict · Legal" status="Published" />
              </div>
            ),
          },
          {
            id: 'cookie-categories',
            title: 'Cookie categories',
            content: (
              <div className="feature-grid feature-grid--3">
                {CATEGORIES.map((cat) => (
                  <div key={cat.title} className="wp-card feature-grid__card" style={{ borderTop: `3px solid ${cat.color}` }}>
                    <h4 className="feature-grid__title">{cat.title}</h4>
                    <p className="feature-grid__desc">{cat.desc}</p>
                  </div>
                ))}
              </div>
            ),
          },
          {
            id: 'cookie-table',
            title: 'Cookie table',
            content: (
              <div className="cookie-table-wrap wp-card" style={{ padding: 0, overflow: 'hidden' }}>
                <table className="cookie-table">
                  <thead>
                    <tr>
                      <th>Cookie</th>
                      <th>Purpose</th>
                      <th>Type</th>
                      <th>Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    {COOKIES.map((cookie) => (
                      <tr key={cookie.name}>
                        <td>{cookie.name}</td>
                        <td style={{ color: '#64748B' }}>{cookie.purpose}</td>
                        <td>{cookie.type}</td>
                        <td>{cookie.duration}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ),
          },
          {
            id: 'changing-preferences',
            title: 'Changing your cookie preferences',
            content: (
              <div className="wp-card" style={{ padding: '20px 22px' }}>
                <p style={{ margin: '0 0 16px', lineHeight: 1.65 }}>
                  You can clear your browser storage or use the cookie preferences option when available to update
                  your choice. When you reset preferences below, the cookie banner will appear again so you can make
                  a new selection.
                </p>
                <button
                  type="button"
                  className="btn-secondary"
                  style={{ fontSize: 13, minHeight: 44 }}
                  onClick={handleResetPreferences}
                >
                  Reset cookie preferences
                </button>
              </div>
            ),
          },
        ]}
      />
    </>
  );
}
