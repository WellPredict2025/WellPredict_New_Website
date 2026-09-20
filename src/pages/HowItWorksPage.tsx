import PageHero from '../components/PageHero';
import SectionHeader from '../components/SectionHeader';
import CTASection from '../components/CTASection';
import ScrollReveal from '../components/ScrollReveal';
import EvidenceChainVisual from '../components/visuals/EvidenceChainVisual';
import ComparisonPanel from '../components/visuals/ComparisonPanel';
import ExampleCyclePanel from '../components/visuals/ExampleCyclePanel';

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        eyebrow="Platform"
        title="From team signal to defensible evidence."
        subtitle="WellPredict connects team-level signals, management action, and outcome review into a clear evidence record."
        primaryCta={{ label: 'Start a Pilot', href: '/pilot' }}
        secondaryCta={{ label: 'View Evidence Pack', href: '/evidence-pack' }}
        visualType="workflow"
      />

      <section className="section-padding wp-section" style={{ background: '#fff' }}>
        <div className="wp-container">
          <SectionHeader eyebrow="Interactive walkthrough" title="Four stations. One evidence chain." subtitle="Select each step to see how the product state changes from collection to compilation." />
          <ScrollReveal direction="up">
            <EvidenceChainVisual />
          </ScrollReveal>
        </div>
      </section>

      <section className="section-padding wp-section" style={{ background: '#F7FBFC', borderTop: '1px solid #DCE8EF' }}>
        <div className="wp-container content-split">
          <ScrollReveal direction="left">
            <SectionHeader
              align="left"
              eyebrow="Evidence cycle"
              title="A complete evidence cycle in four weeks."
              subtitle="Healthcare Organisation runs weekly team signals across clinical teams. When conditions move to Elevated, management logs an action. Follow-up readings confirm improvement."
            />
            <ExampleCyclePanel />
          </ScrollReveal>
          <ScrollReveal direction="right">
            <ComparisonPanel
              beforeItems={['Records in email threads', 'Spreadsheets in folders', 'Action notes disconnected', 'No versioned record']}
              afterItems={['Team signal linked to action', 'Timestamped audit trail', 'Outcome review connected', 'Evidence Pack v1.0 locked']}
            />
          </ScrollReveal>
        </div>
      </section>

      <CTASection title="Ready to run your first evidence cycle?" subtitle="One team. Four weeks. One defensible record." primaryLabel="Apply for Pilot" primaryHref="/pilot" secondaryLabel="Talk to us" secondaryHref="/contact" />
    </>
  );
}
