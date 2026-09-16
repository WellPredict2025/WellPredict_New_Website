import PageHero from '../components/PageHero';
import SectionHeader from '../components/SectionHeader';
import CTASection from '../components/CTASection';
import ScrollReveal from '../components/ScrollReveal';

const TEAM = [
  {
    name: 'Shreeraj Hatipkar',
    role: 'Founder & CEO',
    initials: 'SH',
    bio: [
      'Shreeraj leads product vision and commercial strategy. With experience across workforce operations, compliance and technology, he founded WellPredict to help organisations spot operational risk early and prove they acted on it.',
    ],
  },
  {
    name: 'Zia Ul Din',
    role: 'Head of Engineering',
    initials: 'ZU',
    bio: [
      "Zia leads WellPredict's engineering, turning the product architecture into a secure, scalable platform. He oversees privacy controls, audit trails, data integrity and deployment, taking the platform from pilots to enterprise-ready infrastructure.",
    ],
  },
  {
    name: 'Muhammad Ammar',
    role: 'Software Engineer',
    initials: 'MA',
    bio: [
      "Muhammad builds WellPredict's core product features, including workflows, APIs, databases and access controls. He works across React, Next.js, Node.js, TypeScript, PostgreSQL and AWS to deliver reliable, production-ready functionality.",
    ],
  },
];

const GUIDES_US = [
  'Bridge operational data and workforce sustainability',
  'Privacy-aware, enterprise-grade engineering',
  'Evidence-led product decisions',
  'Plain language for governance and leadership teams',
];

export default function TeamPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Our Team"
        subtitle="A focused leadership team building governance evidence software for regulated organisations."
        primaryCta={{ label: 'Book a Product Walkthrough', href: '/contact' }}
        secondaryCta={{ label: 'Careers', href: '/careers' }}
        visualType="team"
      />

      <section className="section-padding wp-section wp-section--compact" style={{ background: '#fff' }}>
        <div className="wp-container--narrow">
          <ScrollReveal direction="up">
            <p className="page-intro-copy">
              WellPredict is led by a focused product and engineering team building governance evidence software for regulated organisations.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-padding wp-section" style={{ background: '#F7FBFC' }}>
        <div className="wp-container">
          <SectionHeader
            title="Leadership"
            subtitle="The team shaping WellPredict's product, technology and sector direction."
          />
          <div className="team-page__leadership-grid">
            {TEAM.map((member, index) => (
              <ScrollReveal
                key={member.name}
                direction="up"
                delay={index * 80}
                className="team-page__leadership-grid__item"
              >
                <article className="wp-card profile-card">
                  <div className="profile-card__avatar" aria-hidden="true">{member.initials}</div>
                  <div className="profile-card__body">
                    <span className="profile-card__role">{member.role}</span>
                    <h3 className="profile-card__name">{member.name}</h3>
                    <div className="profile-card__bio">
                      {member.bio.map((paragraph) => (
                        <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding wp-section team-page__guides" style={{ background: '#fff' }}>
        <div className="team-page__guides-inner">
          <SectionHeader
            title="What guides us"
            subtitle="Principles that shape how we build and deliver WellPredict."
          />
          <ScrollReveal direction="up">
            <ul className="team-page__guides-list">
              {GUIDES_US.map((item) => (
                <li key={item} className="team-page__guides-item">
                  {item}
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </section>

      <CTASection title="Interested in joining us?" primaryLabel="View Careers" primaryHref="/careers" secondaryLabel="Book a Product Walkthrough" secondaryHref="/contact" dark={false} />
    </>
  );
}
