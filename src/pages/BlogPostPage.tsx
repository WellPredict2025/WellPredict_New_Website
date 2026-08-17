import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import CTASection from '../components/CTASection';
import ScrollReveal from '../components/ScrollReveal';

function EvidenceChainDiagram() {
  const nodes = ['Signal', 'Action', 'Outcome', 'Audit trail'];
  return (
    <div className="evidence-chain-diagram" role="img" aria-label="Evidence chain diagram showing signal, action, outcome, and audit trail connected in sequence">
      {nodes.map((node, i) => (
        <span key={node} style={{ display: 'contents' }}>
          {i > 0 && <span className="evidence-chain-diagram__arrow" aria-hidden="true">→</span>}
          <span className={`evidence-chain-diagram__node${i === 0 ? ' evidence-chain-diagram__node--accent' : ''}`}>{node}</span>
        </span>
      ))}
    </div>
  );
}

const SECTIONS = [
  { id: 'introduction', h: 'Introduction', p: 'Governance evidence is the connected record that shows what your teams experienced, what management did about it, and what changed as a result. It is not a spreadsheet. It is not a disconnected folder of documents.' },
  { id: 'governance-gap', h: 'The governance gap', p: 'Most organisations have records everywhere but cannot connect them when asked. Signal, action, and outcome live in separate places.' },
  { id: 'connected-proof', h: 'Connected proof points', p: 'WellPredict links team-level operating conditions, management actions, and follow-up observations into one versioned Evidence Pack.' },
  { id: 'evidence-packs', h: 'Evidence Packs', p: 'Twelve structured sections tell the full story. Once finalised, the pack is locked with a full audit trail.' },
  { id: 'privacy-by-design', h: 'Privacy by design', p: 'Only aggregated team data is visible. Individual responses are never shown. Below threshold, nothing appears.' },
  { id: 'getting-started', h: 'Getting started', p: 'Start with one team and a four-week pilot. Receive a complete evidence cycle and a finalised pack at the end.' },
];

export default function BlogPostPage() {
  return (
    <>
      <PageHero eyebrow="Blog · Foundations" title="What is governance evidence?" subtitle="A plain-language guide for governance leaders in regulated UK organisations." primaryCta={{ label: 'See Evidence Pack', href: '/evidence-pack' }} secondaryCta={{ label: 'How It Works', href: '/how-it-works' }} visualType="evidencePack" />

      <section className="section-padding wp-section" style={{ background: '#fff' }}>
        <div className="wp-container" style={{ maxWidth: 1100, display: 'grid', gridTemplateColumns: '200px 1fr', gap: 48 }}>
          <nav className="hidden md:block legal-layout__nav" aria-label="Article contents">
            <ul className="legal-layout__nav-list">
              {SECTIONS.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`} className="legal-layout__nav-link">{section.h}</a>
                </li>
              ))}
            </ul>
            <p style={{ fontSize: 12, color: '#94A3B8', marginTop: 24 }}>8 min read · Mar 2026</p>
          </nav>

          <article>
            {SECTIONS.map((section, index) => (
              <ScrollReveal key={section.id} direction="left" delay={index * 40}>
                <section id={section.id} style={{ scrollMarginTop: 100 }}>
                  <h2 style={{ fontSize: 24, color: '#0F172A', margin: index === 0 ? 0 : '36px 0 12px' }}>{section.h}</h2>
                  <p style={{ fontSize: 16, color: '#475569', lineHeight: 1.7, margin: 0 }}>{section.p}</p>
                  {section.id === 'governance-gap' && (
                    <>
                      <blockquote className="article-pullquote">When regulators ask what you did, disconnected records are not enough. You need a connected chain of proof.</blockquote>
                      <EvidenceChainDiagram />
                    </>
                  )}
                  {section.id === 'connected-proof' && (
                    <div style={{ display: 'grid', gap: 12, marginTop: 20 }}>
                      <div className="highlight-box highlight-box--signal"><strong>Signal</strong><p>Team-level operating conditions classified weekly.</p></div>
                      <div className="highlight-box highlight-box--action"><strong>Action</strong><p>Management response logged with timestamp and owner.</p></div>
                      <div className="highlight-box highlight-box--outcome"><strong>Outcome</strong><p>Follow-up observations confirm whether conditions improved.</p></div>
                      <div className="highlight-box highlight-box--audit"><strong>Audit trail</strong><p>Append-only event log for the full cycle.</p></div>
                    </div>
                  )}
                </section>
              </ScrollReveal>
            ))}
          </article>
        </div>
      </section>

      <section className="section-padding wp-section" style={{ background: '#F7FBFC' }}>
        <div className="wp-container--narrow">
          <h3 style={{ fontSize: 18, color: '#0F172A', marginBottom: 16 }}>Related reads</h3>
          <div className="feature-grid feature-grid--2">
            <Link to="/blog" className="wp-card no-underline" style={{ padding: '16px 18px', fontSize: 14, fontWeight: 600, color: '#0F172A' }}>How the privacy gate works →<span style={{ display: 'block', fontSize: 12, fontWeight: 400, color: '#94A3B8', marginTop: 4 }}>Coming soon</span></Link>
            <Link to="/evidence-pack" className="wp-card no-underline" style={{ padding: '16px 18px', fontSize: 14, fontWeight: 600, color: '#0F172A' }}>Inside an Evidence Pack →</Link>
          </div>
        </div>
      </section>

      <CTASection title="See governance evidence in action." primaryLabel="Evidence Pack" primaryHref="/evidence-pack" dark={false} />
    </>
  );
}
