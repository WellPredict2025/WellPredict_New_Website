import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import Logo from '../components/Logo';
import { motionTransition, staggerContainer } from '../lib/motion';
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_TEL } from '../config/contact';

const FOOTER_COLUMNS = [
  {
    title: 'Platform',
    ariaLabel: 'Footer Platform links',
    links: [
      { label: 'How It Works', href: '/how-it-works' },
      { label: 'Evidence Pack', href: '/evidence-pack' },
      { label: 'Privacy', href: '/privacy' },
      { label: 'Security', href: '/security' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'FAQ', href: '/faq' },
    ],
  },
  {
    title: 'Sectors',
    ariaLabel: 'Footer Sector links',
    links: [
      { label: 'Healthcare', href: '/sectors/healthcare' },
      { label: 'Food Manufacturing', href: '/sectors/food' },
      { label: 'Financial Services', href: '/sectors/financial' },
      { label: 'Legal', href: '/sectors/legal' },
      { label: 'Education', href: '/sectors/education' },
      { label: 'Corporate', href: '/sectors/corporate' },
    ],
  },
  {
    title: 'Company',
    ariaLabel: 'Footer Company links',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Our Team', href: '/team' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact', href: '/contact' },
    ],
  },
] as const;

const LEGAL_LINKS = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms', href: '/terms' },
  { label: 'Cookies', href: '/cookies' },
  { label: 'Data Processing', href: '/data-processing' },
] as const;

const TRUST_CHIPS = ['Privacy-gated', 'Team-level', 'Evidence records'] as const;

const COLUMN_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const IN_VIEW = { once: true, amount: 0.12 };

function FooterLink({ to, children, className = 'site-footer-link' }: { to: string; children: React.ReactNode; className?: string }) {
  return (
    <Link to={to} className={className}>
      <span>{children}</span>
      <ChevronRight className="site-footer-link-icon" size={12} aria-hidden="true" />
    </Link>
  );
}

export default function Footer() {
  const shouldReduceMotion = useReducedMotion();
  const transition = motionTransition(shouldReduceMotion, 0.5);

  const Grid = shouldReduceMotion ? 'div' : motion.div;
  const gridProps = shouldReduceMotion
    ? { className: 'site-footer-grid' }
    : {
        className: 'site-footer-grid',
        initial: 'hidden' as const,
        whileInView: 'visible' as const,
        viewport: IN_VIEW,
        variants: staggerContainer,
      };

  const Column = shouldReduceMotion ? 'div' : motion.div;
  const columnProps = shouldReduceMotion
    ? {}
    : {
        variants: COLUMN_VARIANTS,
        transition,
      };

  return (
    <footer id="footer" className="site-footer" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer navigation
      </h2>

      <div className="site-footer__bg" aria-hidden="true">
        <div className="site-footer__grid-pattern" />
        <div className="site-footer__glow site-footer__glow--teal" />
        <div className="site-footer__glow site-footer__glow--sky" />
      </div>

      <div className="footer-main">
        <div className="footer-main__inner">
          <Grid {...gridProps}>
            <Column className="site-footer-brand" {...columnProps}>
              <Logo size="footer" wordmarkColor="#fff" />
              <p className="site-footer-tagline">Governance evidence for regulated organisations</p>
              <div className="site-footer-contact">
                <a href={`mailto:${CONTACT_EMAIL}`} className="site-footer-contact-link contact-link">
                  {CONTACT_EMAIL}
                </a>
                <a href={`tel:${CONTACT_PHONE_TEL}`} className="site-footer-contact-link contact-link">
                  {CONTACT_PHONE}
                </a>
              </div>
              <span className="site-footer-meta">Built in the United Kingdom · 2026</span>
              <div className="site-footer-trust-chips">
                {TRUST_CHIPS.map((chip) => (
                  <span key={chip} className="site-footer-trust-chip">
                    {chip}
                  </span>
                ))}
              </div>
            </Column>

            {FOOTER_COLUMNS.map((col) => (
              <Column key={col.title} {...columnProps}>
                <nav aria-label={col.ariaLabel}>
                  <h3 className="site-footer-heading">{col.title}</h3>
                  <ul className="site-footer-list">
                    {col.links.map((link) => (
                      <li key={link.href}>
                        <FooterLink to={link.href}>{link.label}</FooterLink>
                      </li>
                    ))}
                  </ul>
                </nav>
              </Column>
            ))}
          </Grid>

          <div className="site-footer-bottom">
            <span className="site-footer-copyright">&copy; 2026 WellPredict Ltd. All rights reserved.</span>
            <nav aria-label="Footer legal links">
              <ul className="site-footer-legal-list">
                {LEGAL_LINKS.map((link) => (
                  <li key={link.href}>
                    <FooterLink to={link.href} className="site-footer-legal-link">
                      {link.label}
                    </FooterLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
