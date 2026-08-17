import ContactForm from '../components/ContactForm';
import {
  Briefcase,
  Code2,
  Heart,
  Layers,
  Lightbulb,
  Scale,
  Shield,
  Sparkles,
  Users,
} from 'lucide-react';
import PageHero from '../components/PageHero';
import SectionHeader from '../components/SectionHeader';
import FeatureGrid from '../components/FeatureGrid';
import ScrollReveal from '../components/ScrollReveal';


const WHY_JOIN = [
  { title: 'Mission-driven work', description: 'Build infrastructure for healthier workplaces with measurable impact.', icon: Heart, accent: '#14B8A6' },
  { title: 'Careful growth', description: 'We expand deliberately, prioritising integrity and excellence.', icon: Shield, accent: '#38BDF8' },
  { title: 'Small, focused team', description: 'High ownership across product, engineering, and customer delivery.', icon: Users, accent: '#0D9488' },
  { title: 'Operational impact', description: 'Connect operational data to workforce sustainability at scale.', icon: Sparkles, accent: '#1B6BB0' },
];

const HOW_WE_WORK = [
  'Privacy-aware design from the ground up',
  'Evidence-led product thinking',
  'Customer discovery with governance and HR leaders',
  'Secure, enterprise-grade implementation',
];

const INTEREST_AREAS = [
  {
    title: 'Product & design',
    description:
      'For people interested in shaping clear, ethical, and useful product experiences for managers and regulated teams.',
    icon: Layers,
    accent: '#14B8A6',
  },
  {
    title: 'Engineering',
    description:
      'For builders who care about secure systems, privacy-aware architecture, and reliable product delivery.',
    icon: Code2,
    accent: '#38BDF8',
  },
  {
    title: 'Governance & research',
    description:
      'For people with experience in workplace wellbeing, compliance, employment practice, or organisational risk.',
    icon: Scale,
    accent: '#8B5CF6',
  },
  {
    title: 'Operations & partnerships',
    description:
      'For people who can help WellPredict work with pilot organisations, sector partners, and early customers.',
    icon: Briefcase,
    accent: '#0D9488',
  },
];

const VALUES = [
  {
    title: 'Responsible by default',
    description: 'We build around privacy, clarity, and careful claims.',
    icon: Shield,
    accent: '#14B8A6',
  },
  {
    title: 'Useful before clever',
    description: 'We prioritise tools that help teams make better decisions without adding unnecessary admin.',
    icon: Lightbulb,
    accent: '#1B6BB0',
  },
  {
    title: 'Built for trust',
    description: 'We care about evidence, reliability, and long-term credibility in regulated environments.',
    icon: Scale,
    accent: '#0D9488',
  },
];

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Build technology that prevents burnout"
        subtitle="We're a small, mission-driven team building the infrastructure for healthier workplaces. We're growing carefully, hiring people who care as much about doing the right thing as about doing excellent work."
        primaryCta={{ label: 'Register interest', href: '#careers-register' }}
        secondaryCta={{ label: 'Our Team', href: '/team' }}
        visualType="careers"
      />

      <section className="section-padding wp-section" style={{ background: '#F7FBFC' }}>
        <div className="wp-container">
          <SectionHeader title="Why join WellPredict" />
          <FeatureGrid items={WHY_JOIN} columns={2} />
        </div>
      </section>

      <section className="section-padding wp-section" style={{ background: '#fff' }}>
        <div className="wp-container--narrow">
          <SectionHeader title="How we work" subtitle="How we build, collaborate, and make decisions." />
          <ScrollReveal direction="up">
            <ul className="careers-principles-list">
              {HOW_WE_WORK.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-padding wp-section" style={{ background: '#F7FBFC' }}>
        <div className="wp-container">
          <SectionHeader
            title="Future opportunities"
            subtitle="We are not advertising specific roles right now, but we are always interested in hearing from thoughtful people who care about workforce wellbeing, responsible data, and regulated-sector software."
          />
          <div className="careers-interest-grid">
            {INTEREST_AREAS.map((area, index) => {
              const Icon = area.icon;
              return (
                <ScrollReveal key={area.title} direction="up" delay={index * 50}>
                  <article className="careers-interest-card wp-card">
                    <span className="careers-interest-card__icon" style={{ color: area.accent }}>
                      <Icon strokeWidth={1.75} aria-hidden="true" />
                    </span>
                    <h3 className="careers-interest-card__title">{area.title}</h3>
                    <p className="careers-interest-card__description">{area.description}</p>
                  </article>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding wp-section" style={{ background: '#fff' }}>
        <div className="wp-container">
          <SectionHeader title="What we look for" subtitle="Principles that guide how we work and who we want to hear from." />
          <FeatureGrid items={VALUES} columns={3} />
        </div>
      </section>

      <section id="careers-register" className="section-padding wp-section" style={{ background: '#F7FBFC' }}>
        <div className="wp-container--narrow">
          <ScrollReveal direction="up">
            <div className="careers-register-panel wp-card">
              <h2 className="careers-register-panel__title">Interested in the mission?</h2>
              <p className="careers-register-panel__copy">
                Send us a short note about your background, what you are interested in, and how you think you could contribute to WellPredict.
              </p>
              <ContactForm variant="careers" sourcePage="/careers" />
              <p className="careers-register-panel__note" style={{ marginTop: 16 }}>
                We may not be able to respond to every speculative enquiry, but we review genuine messages carefully.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
