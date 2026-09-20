import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Building2,
  Factory,
  GraduationCap,
  HeartPulse,
  Landmark,
  Scale,
  type LucideIcon,
} from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import { SECTOR_IMAGES, type SectorSlug } from '../config/sectorImages';

type SectorShowcase = {
  slug: SectorSlug;
  title: string;
  subtitle: string;
  regulatory: string;
  tags: string[];
  href: string;
  accent: string;
  Icon: LucideIcon;
};

const SECTORS: SectorShowcase[] = [
  {
    slug: 'healthcare',
    title: 'Healthcare',
    subtitle: 'Evidence records for ward, clinical, and care teams.',
    regulatory: 'CQC · NHS governance',
    tags: ['Ward teams', 'CQC-ready records', 'Management action'],
    href: '/sectors/healthcare',
    accent: '#1B6BB0',
    Icon: HeartPulse,
  },
  {
    slug: 'food',
    title: 'Food Manufacturing',
    subtitle: 'Evidence records for production lines and shift teams.',
    regulatory: 'FSA · BRCGS · HACCP',
    tags: ['Shift teams', 'Production line', 'Food safety culture'],
    href: '/sectors/food',
    accent: '#0D9E72',
    Icon: Factory,
  },
  {
    slug: 'financial',
    title: 'Financial Services',
    subtitle: 'Evidence records for operational oversight and regulated teams.',
    regulatory: 'FCA · PRA · SMCR',
    tags: ['Operational resilience', 'Controls teams'],
    href: '/sectors/financial',
    accent: '#8B5CF6',
    Icon: Landmark,
  },
  {
    slug: 'legal',
    title: 'Legal',
    subtitle: 'Evidence records for workload governance and regulated practice teams.',
    regulatory: 'SRA · internal governance',
    tags: ['Fee-earner teams', 'Compliance', 'Review records'],
    href: '/sectors/legal',
    accent: '#6366F1',
    Icon: Scale,
  },
  {
    slug: 'education',
    title: 'Education',
    subtitle: 'Evidence records for leadership, teaching, and support teams.',
    regulatory: 'Ofsted · leadership review',
    tags: ['Teaching teams', 'Leadership action', 'Support teams'],
    href: '/sectors/education',
    accent: '#F59E0B',
    Icon: GraduationCap,
  },
  {
    slug: 'corporate',
    title: 'Corporate Governance',
    subtitle: 'Evidence records for internal governance, board reporting, and operational risk reviews.',
    regulatory: 'INTERNAL GOVERNANCE · BOARD REPORTING · OPERATIONAL RISK',
    tags: ['Department-level', 'Board reporting'],
    href: '/sectors/corporate',
    accent: '#14B8A6',
    Icon: Building2,
  },
];

export default function Sectors() {
  return (
    <section id="sectors" className="sectors-showcase section-padding" aria-labelledby="sectors-heading">
      <div className="sectors-showcase__inner">
        <ScrollReveal direction="up" className="sectors-showcase__header">
          <span className="eyebrow">WHO WE BUILT THIS FOR</span>
          <h2 id="sectors-heading" className="sectors-showcase__title">
            Governance evidence for teams under pressure.
          </h2>
          <p className="sectors-showcase__support">
            WellPredict helps regulated teams turn operating conditions, management action, and outcome review into clear evidence records.
          </p>
        </ScrollReveal>

        <ul className="sectors-showcase__grid">
          {SECTORS.map((sector, index) => {
            const { Icon } = sector;
            const image = SECTOR_IMAGES[sector.slug];
            return (
              <li key={sector.slug}>
                <ScrollReveal delay={80 + index * 70} direction="up">
                  <Link
                    to={sector.href}
                    className="sectors-showcase__card"
                    aria-label={`Explore ${sector.title} sector`}
                  >
                    <span className="sectors-showcase__accent-line" style={{ background: sector.accent }} aria-hidden="true" />

                    <div className="sectors-showcase__media">
                      <img
                        src={image.src}
                        alt={image.alt}
                        width={image.width}
                        height={image.height}
                        className="sectors-showcase__img"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="sectors-showcase__media-overlay" aria-hidden="true" />
                      <span className="sectors-showcase__icon-badge" style={{ color: sector.accent }}>
                        <Icon aria-hidden="true" strokeWidth={1.75} />
                      </span>
                    </div>

                    <div className="sectors-showcase__body">
                      <h3 className="sectors-showcase__card-title">{sector.title}</h3>
                      <p className="sectors-showcase__subtitle">{sector.subtitle}</p>
                      <p className="sectors-showcase__regulatory">{sector.regulatory}</p>
                      <ul className="sectors-showcase__tags" aria-label={`${sector.title} focus areas`}>
                        {sector.tags.map((tag) => (
                          <li key={tag}>{tag}</li>
                        ))}
                      </ul>
                      <span className="sectors-showcase__cta">
                        Explore sector
                        <ArrowRight aria-hidden="true" strokeWidth={2} />
                      </span>
                    </div>
                  </Link>
                </ScrollReveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
