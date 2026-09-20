import type { LucideIcon } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

export interface FeatureItem {
  title: string;
  description: string;
  icon?: LucideIcon;
  accent?: string;
}

interface FeatureGridProps {
  items: FeatureItem[];
  columns?: 2 | 3 | 4;
}

export default function FeatureGrid({ items, columns = 3 }: FeatureGridProps) {
  const columnClass =
    columns === 2 ? 'feature-grid--2' : columns === 4 ? 'feature-grid--4' : 'feature-grid--3';

  return (
    <div className={`feature-grid ${columnClass}`}>
      {items.map((item, index) => {
        const Icon = item.icon;

        return (
          <ScrollReveal key={item.title} direction="up" delay={index * 60}>
            <div className="wp-card feature-grid__card">
              {Icon && (
                <div
                  className="feature-grid__icon"
                  style={
                    item.accent
                      ? {
                          color: item.accent,
                          borderColor: `${item.accent}33`,
                          background: `${item.accent}14`,
                        }
                      : undefined
                  }
                >
                  <Icon size={20} aria-hidden="true" />
                </div>
              )}
              <h3 className="feature-grid__title">{item.title}</h3>
              <p className="feature-grid__desc">{item.description}</p>
            </div>
          </ScrollReveal>
        );
      })}
    </div>
  );
}
