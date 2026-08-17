import { FileCheck, Lock, ClipboardList, Users } from 'lucide-react';
import PageHero from '../components/PageHero';
import SectionHeader from '../components/SectionHeader';
import ContactForm from '../components/ContactForm';
import EvidencePackMockup from '../components/EvidencePackMockup';
import FeatureGrid from '../components/FeatureGrid';
import WeekTimeline from '../components/visuals/WeekTimeline';
import ScrollReveal from '../components/ScrollReveal';
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_TEL } from '../config/contact';

const DELIVERABLES = [
  { title: 'Evidence Pack', description: 'Versioned, locked, ready to share.', icon: FileCheck, accent: '#14B8A6' },
  { title: 'Privacy Validation', description: 'Confirms the threshold was met.', icon: Lock, accent: '#38BDF8' },
  { title: 'Audit Timeline', description: 'Every action, every timestamp.', icon: ClipboardList, accent: '#0D9488' },
  { title: 'Review Session', description: '60-minute walkthrough with your team.', icon: Users, accent: '#1B6BB0' },
];

const REQUIREMENTS = [
  { title: 'One team', description: 'Single team for the four-week cycle.' },
  { title: 'Minimum group size', description: 'Typically 8+ members to meet privacy threshold.' },
  { title: 'Management action', description: 'Leadership ready to log interventions when conditions change.' },
  { title: 'Review session', description: 'Governance sponsor available for pack walkthrough.' },
];

export default function PilotPage() {
  return (
    <>
      <PageHero
        eyebrow="Pilot programme"
        title="One team. Four weeks. One evidence cycle."
        subtitle="Run a complete governance evidence cycle with one team and receive a finalised Evidence Pack at the end."
        primaryCta={{ label: 'Apply Below', href: '#apply' }}
        secondaryCta={{ label: 'How It Works', href: '/how-it-works' }}
        visualType="workflow"
      />

      <section className="section-padding wp-section" style={{ background: '#fff' }}>
        <div className="wp-container content-split">
          <ScrollReveal direction="left">
            <SectionHeader align="left" eyebrow="Interactive timeline" title="Four weeks. Expand each stage." subtitle="Click a week to see deliverables and activities." />
            <WeekTimeline />
          </ScrollReveal>
          <ScrollReveal direction="right">
            <SectionHeader align="left" title="Deliverables preview" subtitle="What you receive at the end of the pilot." />
            <div style={{ marginTop: 20 }}>
              <EvidencePackMockup compact />
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-padding wp-section" style={{ background: '#F7FBFC' }}>
        <div className="wp-container">
          <SectionHeader title="What the pilot delivers" />
          <FeatureGrid items={DELIVERABLES} columns={4} />
        </div>
      </section>

      <section className="section-padding wp-section" style={{ background: '#fff' }}>
        <div className="wp-container--narrow">
          <SectionHeader title="Requirements checklist" subtitle="What you need before starting." />
          <FeatureGrid items={REQUIREMENTS} columns={2} />
        </div>
      </section>

      <section id="apply" className="section-padding wp-section" style={{ background: 'linear-gradient(135deg, #0B1F33 0%, #12324A 52%, #0B1F33 100%)' }}>
        <div className="wp-container--narrow" style={{ maxWidth: 560 }}>
          <SectionHeader dark title="Apply for a pilot" subtitle="No commitment required. All enquiries confidential." />
          <ScrollReveal direction="up">
            <ContactForm variant="pilot" dark />
            <p className="pilot-form__contact-note">
              Questions before applying? Contact us at{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} className="contact-link contact-link--on-dark">
                {CONTACT_EMAIL}
              </a>{' '}
              or call{' '}
              <a href={`tel:${CONTACT_PHONE_TEL}`} className="contact-link contact-link--on-dark">
                {CONTACT_PHONE}
              </a>
              .
            </p>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
