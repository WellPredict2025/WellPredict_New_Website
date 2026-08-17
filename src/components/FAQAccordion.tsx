import { useState } from 'react';
import ScrollReveal from './ScrollReveal';

interface FAQItem {
  q: string;
  a: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  category?: string;
}

export default function FAQAccordion({ items, category }: FAQAccordionProps) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="flex flex-col" style={{ gap: 8 }}>
      {category && (
        <h3 style={{ fontSize: 14, fontWeight: 700, color: '#14B8A6', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 8px' }}>
          {category}
        </h3>
      )}
      {items.map((item, i) => (
        <ScrollReveal key={item.q} direction="up" delay={i * 40}>
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <button
              type="button"
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
              style={{ width: '100%', padding: '16px 20px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, textAlign: 'left' }}
            >
              <span style={{ fontSize: 15, fontWeight: 600, color: '#0F172A' }}>{item.q}</span>
              <span style={{ fontSize: 18, color: '#94A3B8', flexShrink: 0 }}>{open === i ? '−' : '+'}</span>
            </button>
            {open === i && (
              <div style={{ padding: '0 20px 16px', borderTop: '1px solid #F1F5F9' }}>
                <p style={{ fontSize: 14, color: '#64748B', margin: '12px 0 0', lineHeight: 1.65 }}>{item.a}</p>
              </div>
            )}
          </div>
        </ScrollReveal>
      ))}
    </div>
  );
}
