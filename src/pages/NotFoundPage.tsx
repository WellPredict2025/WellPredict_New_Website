import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import ScrollReveal from '../components/ScrollReveal';

const QUICK_LINKS = [
  { label: 'Homepage', href: '/' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Pilot', href: '/pilot' },
  { label: 'Contact', href: '/contact' },
];

export default function NotFoundPage() {
  return (
    <>
      <PageHero
        eyebrow="404"
        title="Page not found."
        subtitle="The page you are looking for does not exist or has been moved."
        primaryCta={{ label: 'Back to Home', href: '/' }}
        secondaryCta={{ label: 'Contact', href: '/contact' }}
        visualType="dashboard"
        visualOrg="Organisation"
        visualSector="Healthcare"
      />
      <section className="section-padding wp-section" style={{ background: '#F7FBFC', textAlign: 'center' }}>
        <ScrollReveal direction="up">
          <div className="not-found-visual" aria-hidden="true">
            <span style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Record status
            </span>
            <p style={{ fontSize: 18, fontWeight: 600, color: '#fff', margin: '12px 0 8px' }}>Evidence record not found</p>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', margin: 0, lineHeight: 1.6 }}>
              The requested page could not be located in the governance index.
            </p>
            <div style={{ marginTop: 16, padding: '10px 12px', borderRadius: 8, background: 'rgba(239, 68, 68, 0.12)', border: '1px solid rgba(239, 68, 68, 0.25)', fontSize: 11, color: '#FCA5A5' }}>
              Error 404 · Route unavailable
            </div>
          </div>
        </ScrollReveal>
        <p style={{ fontSize: 15, color: '#64748B', marginBottom: 24 }}>
          Try one of these destinations instead.
        </p>
        <div className="flex flex-wrap justify-center" style={{ gap: 12 }}>
          {QUICK_LINKS.map((link) => (
            <Link key={link.href} to={link.href} className="wp-button-secondary">
              {link.label}
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
