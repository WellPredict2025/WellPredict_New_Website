import PageHero from '../components/PageHero';
import SectionHeader from '../components/SectionHeader';
import SectorCard from '../components/SectorCard';
import CTASection from '../components/CTASection';
import ScrollReveal from '../components/ScrollReveal';
import SectorPreviewPanel from '../components/visuals/SectorPreviewPanel';
import { SECTORS } from '../config/site';

const OVERVIEWS = [
  { slug: 'healthcare', q: 'When CQC asks what management did when teams were under pressure, this is your answer.' },
  { slug: 'food', q: 'When the FSA asks about your food safety culture, this is what you show them.' },
  { slug: 'financial', q: 'When the FCA asks for reasonable steps evidence, this document is it.' },
  { slug: 'legal', q: 'When the SRA asks about workload governance, this is your defensible record.' },
  { slug: 'education', q: 'When Ofsted asks about leadership response to team pressure, this is it.' },
  { slug: 'corporate', q: 'Evidence records for department-level operating conditions, management action, and internal governance review.' },
];

export default function SectorsPage() {
  return (
    <>
      <PageHero
        eyebrow="Sectors"
        title="One platform, six governance settings."
        subtitle="WellPredict adapts evidence language for healthcare, food manufacturing, financial services, legal, education, and corporate teams."
        primaryCta={{ label: 'Apply for Pilot', href: '/pilot' }}
        secondaryCta={{ label: 'How It Works', href: '/how-it-works' }}
        visualType="sector"
      />

      <section className="section-padding wp-section" style={{ background: '#fff' }}>
        <div className="wp-container">
          <SectionHeader eyebrow="Interactive preview" title="Select a sector to explore configuration." subtitle="Each sector adapts regulator context, teams, and evidence pack language." />
          <ScrollReveal direction="up">
            <SectorPreviewPanel />
          </ScrollReveal>
        </div>
      </section>

      <section className="section-padding wp-section" style={{ background: '#F7FBFC' }}>
        <div className="wp-container">
          <SectionHeader title="Built for the questions your regulator actually asks." />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            {SECTORS.map((s, i) => {
              const overview = OVERVIEWS.find((o) => o.slug === s.slug);
              return (
                <SectorCard
                  key={s.slug}
                  title={s.title}
                  body={overview?.q || ''}
                  href={s.href}
                  accent={s.accent}
                  regulators={s.regulators}
                  ctaLabel={s.slug === 'corporate' ? 'Explore Corporate →' : undefined}
                  delay={i * 60}
                />
              );
            })}
          </div>
        </div>
      </section>

      <CTASection title="Not sure which sector fits?" subtitle="Talk to us about your governance context." primaryLabel="Contact Us" primaryHref="/contact" />
    </>
  );
}
