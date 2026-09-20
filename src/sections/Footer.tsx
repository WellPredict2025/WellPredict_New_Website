import Logo from '../components/Logo';

export default function Footer() {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      id="footer"
      style={{
        background: '#0B1F33',
        padding: '64px 80px 32px',
        color: '#94A3B8',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1.5fr 1fr 1fr 1fr',
          gap: 40,
        }}
      >
        {/* Column 1: Logo + Tagline + Legal */}
        <div className="flex flex-col" style={{ gap: 16 }}>
          <Logo size="footer" wordmarkColor="#fff" />
          <p style={{ fontSize: 13, lineHeight: 1.65, color: '#64748B', margin: 0 }}>
            Governance evidence for regulated organisations
          </p>
          <div className="flex flex-col" style={{ gap: 4, marginTop: 8 }}>
            <span style={{ fontSize: 10, lineHeight: 1.5, color: '#475569' }}>
              Built in the United Kingdom · 2026
            </span>
            <span style={{ fontSize: 10, lineHeight: 1.5, color: '#475569' }}>
              Not a clinical tool · Not individual monitoring
            </span>
          </div>
        </div>

        {/* Column 2: Platform */}
        <div className="flex flex-col" style={{ gap: 12 }}>
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: '#94A3B8',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}
          >
            Platform
          </span>
          {[
            { label: 'How It Works', href: '#how-it-works' },
            { label: 'Evidence Pack', href: '#evidence-pack' },
            { label: 'Privacy Architecture', href: '#privacy' },
            { label: 'Dashboard', href: '#dashboard' },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              style={{
                fontSize: 13,
                color: '#64748B',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#14B8A6'; }}
              onMouseLeave={(e) => { (e.target as HTMLElement).style.color = '#64748B'; }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Column 3: Sectors */}
        <div className="flex flex-col" style={{ gap: 12 }}>
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: '#94A3B8',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}
          >
            Sectors
          </span>
          {[
            { label: 'NHS & CQC Governance', href: '#sectors' },
            { label: 'SMCR & Operational Resilience', href: '#sectors' },
            { label: 'Start a Pilot', href: '#cta-contact' },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              style={{
                fontSize: 13,
                color: '#64748B',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#14B8A6'; }}
              onMouseLeave={(e) => { (e.target as HTMLElement).style.color = '#64748B'; }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Column 4: Contact */}
        <div className="flex flex-col" style={{ gap: 12 }}>
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: '#94A3B8',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}
          >
            Contact
          </span>
          <a
            href="mailto:hello@wellpredict.co.uk"
            style={{
              fontSize: 13,
              color: '#14B8A6',
              textDecoration: 'none',
            }}
          >
            hello@wellpredict.co.uk
          </a>
          <a
            href="tel:+447867054372"
            style={{
              fontSize: 13,
              color: '#14B8A6',
              textDecoration: 'none',
            }}
          >
            +44 7867 054372
          </a>
          <span style={{ fontSize: 13, color: '#64748B' }}>
            United Kingdom
          </span>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        style={{
          maxWidth: 1200,
          margin: '40px auto 0',
          paddingTop: 20,
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <span style={{ fontSize: 11, color: '#475569' }}>
          &copy; 2026 WellPredict Ltd. All rights reserved.
        </span>
        <span style={{ fontSize: 10, color: '#475569', maxWidth: 500, textAlign: 'right' }}>
          Not a clinical tool · Not individual monitoring
        </span>
      </div>

      <style>{`
        @media (max-width: 900px) {
          footer {
            padding: 48px 24px 24px !important;
          }
          footer > div:first-child {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 600px) {
          footer > div:first-child {
            grid-template-columns: 1fr !important;
          }
          footer > div:last-child {
            flex-direction: column;
            gap: 8px;
            text-align: center;
          }
          footer > div:last-child > span:last-child {
            text-align: center;
            max-width: 100%;
          }
        }
      `}</style>
    </footer>
  );
}
