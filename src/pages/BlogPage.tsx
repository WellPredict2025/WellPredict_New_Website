import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import SectionHeader from '../components/SectionHeader';
import CTASection from '../components/CTASection';
import ScrollReveal from '../components/ScrollReveal';

const POSTS = [
  { slug: 'demo-governance-evidence', title: 'What is governance evidence?', cat: 'Foundations', date: 'Mar 2026', excerpt: 'A plain-language guide to connected proof points for regulated organisations.' },
  { slug: 'privacy-gate-explained', title: 'How the privacy gate works', cat: 'Privacy', date: 'Feb 2026', excerpt: 'Why team thresholds matter and what managers never see.' },
  { slug: 'evidence-pack-anatomy', title: 'Inside an Evidence Pack', cat: 'Product', date: 'Feb 2026', excerpt: 'Twelve sections that tell the full governance story.' },
  { slug: 'team-signals-guide', title: 'Team-level signals explained', cat: 'Foundations', date: 'Jan 2026', excerpt: 'Operating conditions without individual tracking.' },
  { slug: 'management-action-records', title: 'Why management action records matter', cat: 'Governance', date: 'Jan 2026', excerpt: 'Connecting what leadership did to what teams experienced.' },
  { slug: 'sector-configuration', title: 'Sector configuration overview', cat: 'Sectors', date: 'Dec 2025', excerpt: 'How WellPredict speaks your regulator language.' },
];

const CATEGORIES = ['All', ...new Set(POSTS.map((post) => post.cat))];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredPosts = useMemo(
    () => (activeCategory === 'All' ? POSTS : POSTS.filter((post) => post.cat === activeCategory)),
    [activeCategory],
  );

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Governance evidence, explained clearly."
        subtitle="Plain-language articles for governance leaders, compliance teams, and operational managers."
        primaryCta={{ label: 'Featured Article', href: '/blog/demo-governance-evidence' }}
        secondaryCta={{ label: 'Evidence Pack', href: '/evidence-pack' }}
        visualType="press"
      />

      <section className="section-padding wp-section" style={{ background: '#fff' }}>
        <div className="wp-container">
          <ScrollReveal direction="up">
            <Link
              to="/blog/demo-governance-evidence"
              className="no-underline block"
              style={{
                padding: '32px 28px',
                marginBottom: 32,
                borderRadius: 16,
                background: 'linear-gradient(135deg, #0B1F33, #0C2239)',
                border: '1px solid rgba(20, 184, 166, 0.22)',
                boxShadow: '0 20px 60px rgba(15, 23, 42, 0.12)',
              }}
            >
              <span className="wp-eyebrow">Featured</span>
              <h2 style={{ fontSize: 28, color: '#fff', margin: '12px 0 8px' }}>What is governance evidence?</h2>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', margin: 0 }}>
                The foundation every governance leader should understand.
              </p>
            </Link>
          </ScrollReveal>

          <div className="blog-filter-bar" role="tablist" aria-label="Blog categories">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={activeCategory === category}
                className={`blog-filter-btn${activeCategory === category ? ' blog-filter-btn--active' : ''}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="feature-grid feature-grid--3">
            {filteredPosts.map((post, index) => (
              <ScrollReveal key={post.slug} direction="up" delay={index * 50}>
                <Link
                  to={post.slug === 'demo-governance-evidence' ? '/blog/demo-governance-evidence' : '/blog'}
                  className="wp-card no-underline flex flex-col"
                  style={{ padding: '22px 20px', gap: 8, height: '100%' }}
                >
                  <span className="wp-eyebrow" style={{ fontSize: 10 }}>{post.cat}</span>
                  <h3 style={{ fontSize: 16, color: '#0F172A', margin: 0, lineHeight: 1.3 }}>{post.title}</h3>
                  <p style={{ fontSize: 13, color: '#64748B', margin: 0, flex: 1 }}>{post.excerpt}</p>
                  <span style={{ fontSize: 11, color: '#94A3B8' }}>{post.date}</span>
                  {post.slug !== 'demo-governance-evidence' && (
                    <span style={{ fontSize: 11, color: '#94A3B8', fontStyle: 'italic' }}>Article coming soon</span>
                  )}
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding wp-section" style={{ background: '#F7FBFC', textAlign: 'center' }}>
        <SectionHeader title="Stay informed" subtitle="Newsletter placeholder. Connect your email provider when ready." />
        <Link to="/contact" className="wp-button-primary" style={{ marginTop: 8 }}>
          Contact for updates
        </Link>
      </section>

      <CTASection title="See governance evidence in practice." primaryLabel="Evidence Pack" primaryHref="/evidence-pack" dark={false} />
    </>
  );
}
