import { useMemo, useState } from 'react';
import PageHero from '../components/PageHero';
import CTASection from '../components/CTASection';
import ScrollReveal from '../components/ScrollReveal';
import { GLOSSARY_TERMS } from '../config/site';

const CATEGORIES = ['All', 'Evidence', 'Privacy', 'Governance', 'Platform', 'Sectors'] as const;
type Category = (typeof CATEGORIES)[number];

const TERM_CATEGORIES: Record<string, Category> = {
  'Evidence Pack': 'Evidence',
  'Privacy Gate': 'Privacy',
  'Team-level Signal': 'Platform',
  Threshold: 'Privacy',
  'Management Action': 'Governance',
  'Intervention Record': 'Governance',
  'Audit Trail': 'Platform',
  'Versioned Evidence': 'Evidence',
  'Regulatory Assurance': 'Governance',
  'Operating Conditions': 'Platform',
  'Governance State': 'Governance',
  Normal: 'Platform',
  Watch: 'Platform',
  Elevated: 'Platform',
  'Packs Ready': 'Evidence',
};

const CORE_TERMS = new Set(['Evidence Pack', 'Privacy Gate', 'Team-level Signal', 'Management Action']);

export default function GlossaryPage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<Category>('All');
  const letters = [...new Set(GLOSSARY_TERMS.map((term) => term.term[0].toUpperCase()))].sort();

  const filteredTerms = useMemo(() => {
    return GLOSSARY_TERMS.filter((entry) => {
      const cat = TERM_CATEGORIES[entry.term] ?? 'Platform';
      const matchesCategory = category === 'All' || cat === category;
      const normalized = query.trim().toLowerCase();
      const matchesQuery = !normalized || entry.term.toLowerCase().includes(normalized) || entry.def.toLowerCase().includes(normalized);
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  return (
    <>
      <PageHero eyebrow="Glossary" title="The language of governance evidence." subtitle="Plain definitions for terms used across WellPredict." primaryCta={{ label: 'How It Works', href: '/how-it-works' }} secondaryCta={{ label: 'FAQ', href: '/faq' }} visualType="legal" />

      <section className="section-padding wp-section" style={{ background: '#fff' }}>
        <div className="wp-container--narrow">
          <label htmlFor="glossary-search" className="sr-only">Search glossary terms</label>
          <input id="glossary-search" type="search" className="glossary-search" placeholder="Search terms..." value={query} onChange={(e) => setQuery(e.target.value)} />

          <div className="faq-tabs" role="tablist" aria-label="Glossary categories" style={{ marginBottom: 24 }}>
            {CATEGORIES.map((cat) => (
              <button key={cat} type="button" role="tab" aria-selected={category === cat} className={`faq-tab${category === cat ? ' faq-tab--active' : ''}`} onClick={() => setCategory(cat)}>{cat}</button>
            ))}
          </div>

          {!query && category === 'All' && (
            <nav className="glossary-letter-nav" aria-label="Alphabetical navigation">
              {letters.map((letter) => (
                <a key={letter} href={`#letter-${letter}`} className="glossary-letter-link">{letter}</a>
              ))}
            </nav>
          )}

          {filteredTerms.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#64748B' }}>No terms match your search.</p>
          ) : (
            filteredTerms.map((entry, index) => (
              <ScrollReveal key={entry.term} direction="up" delay={index * 15}>
                <article id={`letter-${entry.term[0].toUpperCase()}`} className="wp-card glossary-term-card">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                    <h3 style={{ margin: 0 }}>{entry.term}</h3>
                    {CORE_TERMS.has(entry.term) && (
                      <span className="profile-card__badge" style={{ color: '#14B8A6', borderColor: 'rgba(20,184,166,0.3)' }}>Core concept</span>
                    )}
                  </div>
                  <p>{entry.def}</p>
                  <p style={{ fontSize: 12, color: '#94A3B8', margin: '12px 0 0', fontStyle: 'italic' }}>Used in Evidence Packs and governance review conversations.</p>
                </article>
              </ScrollReveal>
            ))
          )}
        </div>
      </section>

      <CTASection title="Need a term explained in context?" primaryLabel="Evidence Pack" primaryHref="/evidence-pack" secondaryLabel="Contact" secondaryHref="/contact" dark={false} />
    </>
  );
}
