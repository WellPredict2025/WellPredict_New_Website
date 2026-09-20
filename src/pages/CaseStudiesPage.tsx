import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import SectionHeader from '../components/SectionHeader';
import CTASection from '../components/CTASection';
import EvidencePackMockup from '../components/EvidencePackMockup';
import ScrollReveal from '../components/ScrollReveal';

const STUDIES = [
  { slug: 'healthcare-demo', title: 'Healthcare team evidence cycle', sector: 'Healthcare', org: 'Healthcare Organisation', outcome: 'Connected ward-level evidence record in four weeks.', stat: '4 wk cycle' },
  { slug: 'food-demo', title: 'Food manufacturing shift governance', sector: 'Food', org: 'Food Manufacturing Organisation', outcome: 'Shift-level operating conditions linked to production actions.', stat: 'Sector scenario' },
  { slug: 'financial-demo', title: 'Financial services operational resilience', sector: 'Financial', org: 'Financial Services Organisation', outcome: 'Controls team visibility with management oversight record.', stat: 'Sector scenario' },
];

const SECTORS = ['All', 'Healthcare', 'Food', 'Financial'];

export default function CaseStudiesPage() {
  const [activeSector, setActiveSector] = useState('All');

  const filteredStudies = useMemo(
    () => (activeSector === 'All' ? STUDIES : STUDIES.filter((study) => study.sector === activeSector)),
    [activeSector],
  );

  return (
    <>
      <PageHero eyebrow="Case studies" title="Evidence cycles in action." subtitle="Anonymised sector scenarios showing how organisations produce governed evidence records." primaryCta={{ label: 'Apply for Pilot', href: '/pilot' }} secondaryCta={{ label: 'How It Works', href: '/how-it-works' }} visualType="evidencePack" />

      <section className="section-padding wp-section" style={{ background: '#F7FBFC' }}>
        <div className="wp-container">
          <SectionHeader title="Sector scenarios" subtitle="Fictional scenarios for illustration. Not real customer outcomes." />

          <div className="faq-tabs" role="tablist" aria-label="Sector filters" style={{ marginBottom: 32 }}>
            {SECTORS.map((sector) => (
              <button key={sector} type="button" role="tab" aria-selected={activeSector === sector} className={`faq-tab${activeSector === sector ? ' faq-tab--active' : ''}`} onClick={() => setActiveSector(sector)}>{sector}</button>
            ))}
          </div>

          <div className="flex flex-col" style={{ gap: 16, marginBottom: 48 }}>
            {filteredStudies.map((study, index) => (
              <ScrollReveal key={study.slug} direction="up" delay={index * 60}>
                <Link to={study.slug === 'healthcare-demo' ? '/case-studies/healthcare-demo' : '/case-studies'} className="wp-card no-underline flex items-center justify-between flex-wrap" style={{ padding: '22px 24px', gap: 12 }}>
                  <div>
                    <span className="wp-eyebrow" style={{ fontSize: 10 }}>{study.sector} · {study.stat}</span>
                    <h3 style={{ fontSize: 18, color: '#0F172A', margin: '6px 0 4px' }}>{study.title}</h3>
                    <span style={{ fontSize: 13, color: '#64748B', display: 'block' }}>{study.org}</span>
                    <span style={{ fontSize: 13, color: '#475569', display: 'block', marginTop: 6 }}>{study.outcome}</span>
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#14B8A6' }}>Read case study →</span>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          <div className="content-split">
            <ScrollReveal direction="left">
              <SectionHeader align="left" title="What a case study includes" subtitle="Challenge, approach, evidence cycle, outcome, and redacted pack preview." />
              <ul style={{ fontSize: 14, color: '#64748B', lineHeight: 1.8, paddingLeft: 20 }}>
                <li>Organisation and team labels</li>
                <li>Timeline from signal to finalised pack</li>
                <li>Management action and outcome review</li>
                <li>Redacted Evidence Pack preview</li>
              </ul>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <SectionHeader align="left" title="Redacted pack preview" subtitle="Evidence Pack preview." />
              <EvidencePackMockup compact />
            </ScrollReveal>
          </div>
        </div>
      </section>

      <CTASection title="Run your own evidence cycle." primaryLabel="Apply for Pilot" primaryHref="/pilot" />
    </>
  );
}
