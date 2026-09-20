import { useEffect, useState, type ReactNode } from 'react';
import ScrollReveal from './ScrollReveal';

export interface LegalSectionItem {
  id: string;
  title: string;
  content: ReactNode;
}

interface LegalLayoutProps {
  sections: LegalSectionItem[];
  showCounselBanner?: boolean;
  documentInfo?: { label: string; value: ReactNode }[];
}

export default function LegalLayout({ sections, showCounselBanner = false, documentInfo }: LegalLayoutProps) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? '');

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(id);
        },
        { rootMargin: '-20% 0px -60% 0px', threshold: 0 },
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((observer) => observer.disconnect());
  }, [sections]);

  return (
    <section className="section-padding wp-section" style={{ background: '#fff' }}>
      <div className="wp-container legal-layout">
        {showCounselBanner && (
          <p className="legal-counsel-banner" role="note">
            This page should be reviewed by legal counsel before production use.
          </p>
        )}

        {documentInfo && (
          <div className="legal-doc-info">
            {documentInfo.map((item) => (
              <div key={item.label} className="legal-doc-info__card">
                <span>{item.label}</span>
                <p>{item.value}</p>
              </div>
            ))}
          </div>
        )}

        <div className="legal-layout__grid">
          <nav className="legal-layout__nav hidden md:block" aria-label="Page sections">
            <ul className="legal-layout__nav-list">
              {sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className={`legal-layout__nav-link${activeId === section.id ? ' legal-layout__nav-link--active' : ''}`}
                  >
                    {section.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="legal-layout__content">
            {sections.map((section, index) => (
              <ScrollReveal key={section.id} direction="up" delay={index * 30}>
                <section id={section.id} className="legal-layout__section" aria-labelledby={`${section.id}-heading`}>
                  <h2 id={`${section.id}-heading`} className="legal-layout__section-title">
                    {section.title}
                  </h2>
                  <div className="legal-layout__section-body">{section.content}</div>
                </section>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
