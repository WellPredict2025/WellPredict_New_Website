import { useMemo, useState } from 'react';
import PageHero from '../components/PageHero';
import FAQAccordion from '../components/FAQAccordion';
import CTASection from '../components/CTASection';
import { FAQS, FAQ_CATEGORIES, type FAQCategory } from '../config/faqs';

const POPULAR = [
  { q: 'What is WellPredict?', a: FAQS.General[0].a },
  { q: 'Can managers see individual scores?', a: FAQS.Privacy[0].a },
  { q: 'Can we start with one team?', a: FAQS.Pricing[2].a },
];

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState<FAQCategory>('General');
  const [query, setQuery] = useState('');

  const filteredItems = useMemo(() => {
    const items = [...FAQS[activeCategory]];
    if (!query.trim()) return items;
    const q = query.toLowerCase();
    return items.filter((item) => item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q));
  }, [activeCategory, query]);

  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Frequently asked questions."
        subtitle="Clear answers about governance evidence, privacy, and how WellPredict works."
        primaryCta={{ label: 'Apply for Pilot', href: '/pilot' }}
        secondaryCta={{ label: 'Contact', href: '/contact' }}
        visualType="legal"
      />

      <section className="section-padding wp-section" style={{ background: '#F7FBFC' }}>
        <div className="wp-container--narrow">
          <div className="wp-card" style={{ padding: '20px 22px', marginBottom: 32, borderLeft: '4px solid #14B8A6' }}>
            <span className="wp-eyebrow" style={{ fontSize: 10 }}>Popular questions</span>
            <div style={{ display: 'grid', gap: 12, marginTop: 12 }}>
              {POPULAR.map((item) => (
                <div key={item.q}>
                  <strong style={{ fontSize: 14, color: '#0F172A' }}>{item.q}</strong>
                  <p style={{ fontSize: 13, color: '#64748B', margin: '4px 0 0' }}>{item.a}</p>
                </div>
              ))}
            </div>
          </div>

          <label htmlFor="faq-search" className="sr-only">Search FAQ</label>
          <input
            id="faq-search"
            type="search"
            className="glossary-search"
            placeholder="Search questions..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <div className="faq-tabs" role="tablist" aria-label="FAQ categories">
            {FAQ_CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={activeCategory === category}
                className={`faq-tab${activeCategory === category ? ' faq-tab--active' : ''}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <FAQAccordion
            category={activeCategory}
            items={
              filteredItems.length
                ? filteredItems
                : [{ q: 'No matches', a: 'Try a different search term or category.' }]
            }
          />
        </div>
      </section>

      <CTASection
        title="Still have questions?"
        subtitle="Speak to the WellPredict team about pilots, privacy, or sector configuration."
        primaryLabel="Contact Us"
        primaryHref="/contact"
        secondaryLabel="View Evidence Pack"
        secondaryHref="/evidence-pack"
        dark={false}
      />
    </>
  );
}
