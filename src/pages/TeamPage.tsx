import PageHero from '../components/PageHero';
import SectionHeader from '../components/SectionHeader';
import CTASection from '../components/CTASection';
import ScrollReveal from '../components/ScrollReveal';

const TEAM = [
  {
    name: 'Shreeraj Hatipkar',
    role: 'Founder & Product Lead',
    initials: 'SH',
    bio: [
      'Shreeraj founded WellPredict after seeing how difficult it is for regulated organisations to evidence what was happening before an issue became visible. Policies, reports and dashboards exist, but the link between operating conditions, management action and follow-up evidence is often still built manually.',
      'He leads WellPredict\'s product direction, sector positioning and governance evidence model. His background spans HR operations, compliance documentation, workforce data, frontline operations and computer science, giving him a practical view of how regulated teams work and where existing systems leave evidence gaps.',
    ],
  },
  {
    name: 'Zia Ul Din',
    role: 'Head of Engineering',
    initials: 'ZU',
    bio: [
      'Zia supports the technical development of WellPredict, helping turn the product vision into a secure and scalable platform. His work focuses on the engineering foundations behind the Governance Evidence Engine, including privacy controls, audit trails, evidence generation and system reliability.',
      'He brings the technical oversight needed to move WellPredict from prototype to pilot-ready infrastructure, with a focus on stability, data integrity and deployment quality for regulated-sector customers.',
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
              WellPredict is led by its founders and supported by specialist product, engineering, and governance input as the platform develops.
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

      <section className="section-padding wp-section" style={{ background: '#fff' }}>
        <div className="wp-container--narrow">
          <SectionHeader title="What guides us" subtitle="Principles that shape how we build and deliver WellPredict." />
          <ScrollReveal direction="up">
            <ul style={{ margin: 0, paddingLeft: 20, fontSize: 15, color: '#475569', lineHeight: 1.9 }}>
              {GUIDES_US.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </section>

      <CTASection title="Interested in joining us?" primaryLabel="View Careers" primaryHref="/careers" secondaryLabel="Book a Product Walkthrough" secondaryHref="/contact" dark={false} />
    </>
  );
}
