import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Headset, Mail } from 'lucide-react';
import PageHero from '../components/PageHero';
import SectionHeader from '../components/SectionHeader';
import ContactForm from '../components/ContactForm';
import CTASection from '../components/CTASection';
import FAQAccordion from '../components/FAQAccordion';
import ScrollReveal from '../components/ScrollReveal';
import {
  CONTACT_CATEGORIES,
  CONTACT_INTRO,
  CONTACT_PHONE,
  CONTACT_PHONE_TEL,
  CONTACT_ROUTING_NOTE,
} from '../config/contact';

const ROUTES = [
  { id: 'pilot', label: 'Pilot enquiry', helper: 'Apply for a four-week evidence cycle with one team.' },
  { id: 'partnership', label: 'Partnership', helper: 'Discuss integration, reselling, or ecosystem partnerships.' },
  { id: 'sector', label: 'Sector question', helper: 'Ask about sector configuration for healthcare, food, financial, legal, education, or corporate.' },
  { id: 'general', label: 'General enquiry', helper: 'Any other question about WellPredict.' },
];

const SECTOR_ENQUIRIES = [
  { tag: 'Healthcare', title: 'Ward and clinical team evidence', href: '/sectors/healthcare' },
  { tag: 'Food', title: 'Production line governance records', href: '/sectors/food' },
  { tag: 'Corporate', title: 'Department-level internal governance', href: '/sectors/corporate' },
];

const CATEGORY_ICONS = {
  general: Mail,
  sales: Briefcase,
  support: Headset,
} as const;

export default function ContactPage() {
  const [route, setRoute] = useState('pilot');
  const activeRoute = ROUTES.find((r) => r.id === route) ?? ROUTES[0];

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Get in touch."
        subtitle={CONTACT_INTRO}
        primaryCta={{ label: 'Apply for Pilot', href: '/pilot' }}
        secondaryCta={{ label: 'How It Works', href: '/how-it-works' }}
        visualType="contact"
      />

      <section className="section-padding wp-section" style={{ background: '#fff' }}>
        <div className="wp-container">
          <ScrollReveal direction="up">
            <p className="contact-intro">{CONTACT_INTRO}</p>
            <p className="contact-routing-note">{CONTACT_ROUTING_NOTE}</p>
          </ScrollReveal>
          <div className="contact-options-grid">
            {CONTACT_CATEGORIES.map((category, index) => {
              const Icon = CATEGORY_ICONS[category.id];
              return (
                <ScrollReveal key={category.id} direction="up" delay={index * 60}>
                  <article className="wp-card contact-option-card">
                    <span className="contact-option-card__icon" aria-hidden="true">
                      <Icon strokeWidth={1.75} />
                    </span>
                    <h3 className="contact-option-card__title">{category.title}</h3>
                    <p className="contact-option-card__desc">{category.description}</p>
                    <div className="contact-option-card__links">
                      <a href={`mailto:${category.email}`} className="contact-link">
                        {category.email}
                      </a>
                      {'phone' in category && category.phone ? (
                        <a href={`tel:${CONTACT_PHONE_TEL}`} className="contact-link">
                          {CONTACT_PHONE}
                        </a>
                      ) : null}
                    </div>
                  </article>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding wp-section" style={{ background: '#F7FBFC' }}>
        <div className="wp-container content-split">
          <ScrollReveal direction="left">
            <SectionHeader align="left" title="Contact route" subtitle="Select your enquiry type for relevant guidance." />
            <div className="contact-route-selector" role="group" aria-label="Contact route">
              {ROUTES.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  className={`contact-route-btn${route === r.id ? ' contact-route-btn--active' : ''}`}
                  aria-pressed={route === r.id}
                  onClick={() => setRoute(r.id)}
                >
                  <strong>{r.label}</strong>
                </button>
              ))}
            </div>
            <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.6, marginBottom: 24 }}>{activeRoute.helper}</p>

            <div className="response-timeline" aria-label="Response expectation">
              <div className="response-timeline__step">
                <div><strong>Message received</strong><span>Automated confirmation sent</span></div>
              </div>
              <div className="response-timeline__step">
                <div><strong>Reviewed internally</strong><span>Routed to the right team member</span></div>
              </div>
              <div className="response-timeline__step">
                <div><strong>Response within 48 hours</strong><span>On UK working days</span></div>
              </div>
            </div>

            <SectionHeader align="left" title="Sector enquiries" />
            <div className="sector-enquiry-grid">
              {SECTOR_ENQUIRIES.map((sector) => (
                <Link key={sector.href} to={sector.href} className="wp-card sector-enquiry-card">
                  <span className="sector-enquiry-card__tag">{sector.tag}</span>
                  <span className="sector-enquiry-card__title">{sector.title}</span>
                </Link>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <SectionHeader align="left" title="Contact form" subtitle={activeRoute.helper} />
            <ContactForm enquiryRoute={activeRoute.label} sourcePage="/contact" />
          </ScrollReveal>
        </div>
      </section>

      <section className="section-padding wp-section" style={{ background: '#fff' }}>
        <div className="wp-container--narrow">
          <SectionHeader title="Common questions" />
          <FAQAccordion items={[
            { q: 'How long does a pilot take?', a: 'Four weeks with one team, ending in a finalised Evidence Pack.' },
            { q: 'Can we start with one department?', a: 'Yes. Pilots are designed for a single team or department.' },
          ]} />
        </div>
      </section>

      <CTASection title="Ready to start a pilot?" primaryLabel="Apply for Pilot" primaryHref="/pilot" />
    </>
  );
}
