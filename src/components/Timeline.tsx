import ScrollReveal from './ScrollReveal';

interface TimelineItem {
  label: string;
  title: string;
  body: string;
  accent?: string;
}

export default function Timeline({ items, horizontal = false }: { items: TimelineItem[]; horizontal?: boolean }) {
  if (horizontal) {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(items.length, 5)}, 1fr)`, gap: 16 }}>
        {items.map((item, i) => (
          <ScrollReveal key={item.label} direction="up" delay={i * 80}>
            <div className="card flex flex-col" style={{ padding: '22px 18px', gap: 8, height: '100%', borderTop: `3px solid ${item.accent || '#14B8A6'}` }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: item.accent || '#14B8A6', fontWeight: 600 }}>{item.label}</span>
              <h4 style={{ fontSize: 15, fontWeight: 600, color: '#0F172A', margin: 0 }}>{item.title}</h4>
              <p style={{ fontSize: 13, color: '#64748B', margin: 0, lineHeight: 1.55 }}>{item.body}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col" style={{ gap: 0, maxWidth: 640, margin: '0 auto' }}>
      {items.map((item, i) => (
        <ScrollReveal key={item.label} direction="left" delay={i * 60}>
          <div className="flex" style={{ gap: 20, paddingBottom: i < items.length - 1 ? 28 : 0 }}>
            <div className="flex flex-col items-center" style={{ width: 40, flexShrink: 0 }}>
              <span style={{ width: 32, height: 32, borderRadius: '50%', background: item.accent || '#14B8A6', color: '#fff', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {item.label}
              </span>
              {i < items.length - 1 && <div style={{ width: 2, flex: 1, background: '#DCE8EF', marginTop: 8, minHeight: 24 }} className="line-draw" />}
            </div>
            <div style={{ paddingTop: 4 }}>
              <h4 style={{ fontSize: 16, fontWeight: 600, color: '#0F172A', margin: '0 0 6px' }}>{item.title}</h4>
              <p style={{ fontSize: 14, color: '#64748B', margin: 0, lineHeight: 1.6 }}>{item.body}</p>
            </div>
          </div>
        </ScrollReveal>
      ))}
    </div>
  );
}
