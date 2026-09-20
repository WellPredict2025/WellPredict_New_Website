import { useEffect, useState } from 'react';
import Logo from '../components/Logo';

const NAV_LINKS = [
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Who it is for', href: '#sectors' },
  { label: 'Privacy', href: '#privacy' },
  { label: 'Dashboard', href: '#dashboard' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between"
        style={{
          height: 72,
          padding: '0 80px',
          backgroundColor: scrolled ? 'rgba(246, 248, 251, 0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px) saturate(180%)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(226, 232, 240, 0.6)' : '1px solid transparent',
          transition: 'background-color 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease',
        }}
      >
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => handleClick(e, '#hero')}
          className="no-underline"
        >
          <Logo size="nav" wordmarkColor={scrolled ? '#0F172A' : '#fff'} />
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center" style={{ gap: 36 }}>
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className="nav-link"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <a
          href="#cta-contact"
          onClick={(e) => handleClick(e, '#cta-contact')}
          className="btn-primary hidden md:inline-flex"
          style={{ padding: '10px 22px', fontSize: 13 }}
        >
          Start a Pilot
        </a>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col justify-center items-center gap-1.5"
          style={{ width: 40, height: 40, background: 'none', border: 'none', cursor: 'pointer' }}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span
            style={{
              width: 22,
              height: 1.5,
              backgroundColor: '#0F172A',
              borderRadius: 1,
              transition: 'transform 0.3s ease, opacity 0.3s ease',
              transform: mobileOpen ? 'rotate(45deg) translateY(4.5px)' : 'none',
            }}
          />
          <span
            style={{
              width: 22,
              height: 1.5,
              backgroundColor: '#0F172A',
              borderRadius: 1,
              transition: 'opacity 0.3s ease',
              opacity: mobileOpen ? 0 : 1,
            }}
          />
          <span
            style={{
              width: 22,
              height: 1.5,
              backgroundColor: '#0F172A',
              borderRadius: 1,
              transition: 'transform 0.3s ease, opacity 0.3s ease',
              transform: mobileOpen ? 'rotate(-45deg) translateY(-4.5px)' : 'none',
            }}
          />
        </button>
      </nav>

      {/* Mobile Overlay */}
      <div
        className="fixed inset-0 z-40 md:hidden flex flex-col items-center justify-center"
        style={{
          backgroundColor: 'rgba(246, 248, 251, 0.98)',
          backdropFilter: 'blur(20px)',
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? 'auto' : 'none',
          transition: 'opacity 0.3s ease',
        }}
      >
        <div className="flex flex-col items-center" style={{ gap: 32 }}>
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 24,
                fontWeight: 500,
                color: '#0F172A',
                textDecoration: 'none',
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#cta-contact"
            onClick={(e) => handleClick(e, '#cta-contact')}
            className="btn-primary"
            style={{ marginTop: 16 }}
          >
            Start a Pilot
          </a>
        </div>
      </div>
    </>
  );
}
