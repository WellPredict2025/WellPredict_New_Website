import { Link2, Shield, FileCheck, Layers, Target, Hammer } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import SectionHeader from '../components/SectionHeader';
import CTASection from '../components/CTASection';
import FeatureGrid from '../components/FeatureGrid';
import ScrollReveal from '../components/ScrollReveal';
import ComparisonPanel from '../components/visuals/ComparisonPanel';

const PRINCIPLES = [
  { title: 'Evidence over assertion', description: 'Connected proof points, not disconnected claims.', icon: FileCheck, accent: '#14B8A6' },
  { title: 'Privacy first', description: 'Team thresholds enforced before any metric is visible.', icon: Shield, accent: '#38BDF8' },
  { title: 'Team-level by design', description: 'Individual visibility is architecturally blocked.', icon: Link2, accent: '#0D9488' },
  { title: 'Review-ready records', description: 'Versioned Evidence Packs for governance conversations.', icon: Layers, accent: '#1B6BB0' },
];

const ORIGIN_STEPS = [
  { label: '01', title: 'Records exist', detail: 'Organisations collect data in spreadsheets, emails, and folders.' },
  { label: '02', title: 'Evidence is disconnected', detail: 'Signal, action, and outcome live in separate places.' },
  { label: '03', title: 'Review asks for proof', detail: 'Governance teams cannot connect the chain when asked.' },
  { label: '04', title: 'WellPredict connects the chain', detail: 'One privacy-gated record from signal to finalised pack.' },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Built to make governance evidence easier to prove."
        subtitle="WellPredict helps regulated organisations move from scattered records to connected evidence."
        primaryCta={{ label: 'Contact Us', href: '/contact' }}
        secondaryCta={{ label: 'How It Works', href: '/how-it-works' }}
        visualType="mission"
      />

      <section className="section-padding wp-section" style={{ background: '#fff' }}>
        <div className="wp-container content-split">
          <ScrollReveal direction="left">
            <SectionHeader align="left" eyebrow="Why WellPredict exists" title="The problem with disconnected evidence." subtitle="Give governance leaders a defensible record when operating conditions change and management responds." />
            <div className="data-lifecycle" style={{ marginTop: 24 }}>
              {ORIGIN_STEPS.map((step) => (
                <div key={step.label} className="data-lifecycle__step">
                  <span className="data-lifecycle__num">{step.label}</span>
                  <div>
                    <strong style={{ display: 'block', fontSize: 15, color: '#0F172A', marginBottom: 4 }}>{step.title}</strong>
                    <p style={{ margin: 0, fontSize: 14, color: '#64748B', lineHeight: 1.6 }}>{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
          <ScrollReveal direction="right">
            <ComparisonPanel
              beforeItems={['Records in email', 'Spreadsheets everywhere', 'Notes in folders', 'No connected chain']}
              afterItems={['Signal linked to action', 'Outcome review connected', 'Versioned Evidence Pack', 'Full audit trail']}
            />
          </ScrollReveal>
        </div>
      </section>

      <section className="section-padding wp-section" style={{ background: '#F7FBFC' }}>
        <div className="wp-container">
          <SectionHeader eyebrow="Product principles" title="How we build WellPredict." />
          <FeatureGrid items={PRINCIPLES} columns={2} />
        </div>
      </section>

      <section className="section-padding wp-section" style={{ background: '#fff' }}>
        <div className="wp-container content-split">
          <ScrollReveal direction="left">
            <SectionHeader align="left" title="Product mission" subtitle="A focused product team based in the United Kingdom building the governance evidence layer for regulated organisations." />
            <FeatureGrid columns={2} items={[
              { title: 'The problem', description: 'Organisations cannot connect signal, action, and outcome when asked to demonstrate reasonable steps.', icon: Target, accent: '#F59E0B' },
              { title: 'Our answer', description: 'A privacy-gated platform that compiles team-level evidence into versioned records.', icon: Hammer, accent: '#14B8A6' },
            ]} />
          </ScrollReveal>
          <ScrollReveal direction="right">
            <div className="wp-card" style={{ padding: '28px 26px', background: 'linear-gradient(135deg, #071827, #0B1F33)', border: '1px solid rgba(20,184,166,0.22)', color: '#E5EEF7' }}>
              <span className="wp-eyebrow" style={{ color: '#5EEAD4' }}>Mission</span>
              <p style={{ fontSize: 18, lineHeight: 1.55, margin: '16px 0 0', fontFamily: 'Instrument Serif, Georgia, serif' }}>
                Connect what teams experienced, what management did, and what changed into one review-ready Evidence Pack.
              </p>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', margin: '16px 0 0' }}>No biographical claims. Product-led mission statement.</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-padding wp-section" style={{ background: '#F7FBFC' }}>
        <div className="wp-container" style={{ textAlign: 'center' }}>
          <SectionHeader title="Meet the team behind WellPredict" subtitle="Learn about our leadership team and how we are building WellPredict." />
          <div className="flex flex-wrap items-center justify-center" style={{ gap: 12 }}>
            <Link to="/team" className="wp-button-primary">Meet the team</Link>
            <Link to="/careers" className="wp-button-secondary">View careers</Link>
          </div>
        </div>
      </section>

      <CTASection title="Want to learn more?" primaryLabel="Get in Touch" primaryHref="/contact" dark={false} />
    </>
  );
}
