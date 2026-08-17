import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import PageHeroVisual, { type PageHeroVisualType } from './PageHeroVisual';
import { fadeLeft, fadeRight, fadeUp, motionTransition, staggerContainer } from '../lib/motion';

interface PageHeroProps {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  visual?: React.ReactNode;
  visualType?: PageHeroVisualType;
  visualOrg?: string;
  visualSector?: string;
  accent?: string;
  compact?: boolean;
}

export default function PageHero({
  eyebrow,
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  visual,
  visualType,
  visualOrg,
  visualSector,
  accent = '#14B8A6',
  compact = false,
}: PageHeroProps) {
  const shouldReduceMotion = useReducedMotion();
  const transition = motionTransition(shouldReduceMotion, 0.85);

  const isExternal = (href: string) =>
    href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:');

  const CtaLink = ({ href, label, primary }: { href: string; label: string; primary?: boolean }) => {
    const className = primary ? 'btn-primary' : 'btn-secondary';
    const style = primary
      ? { textDecoration: 'none' as const }
      : { textDecoration: 'none' as const, background: 'rgba(255,255,255,0.06)', color: '#fff', borderColor: 'rgba(255,255,255,0.12)' };
    if (isExternal(href)) return <a href={href} className={className} style={style}>{label}</a>;
    return <Link to={href} className={className} style={style}>{label}</Link>;
  };

  const heroVisual =
    visual ??
    (visualType ? (
      <PageHeroVisual
        type={visualType}
        sectorAccent={accent}
        org={visualOrg}
        sector={visualSector}
      />
    ) : null);

  return (
    <section
      className="page-hero-section relative overflow-hidden"
      style={{
        paddingTop: compact ? 120 : 140,
        paddingBottom: compact ? 72 : 96,
        background: 'linear-gradient(135deg, #0B1F33 0%, #12324A 52%, #0B1F33 100%)',
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.25,
          backgroundImage:
            'radial-gradient(circle at 15% 25%, rgba(20,184,166,0.2) 0%, transparent 45%), radial-gradient(circle at 85% 75%, rgba(56,189,248,0.12) 0%, transparent 42%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.04,
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
        aria-hidden="true"
      />

      <motion.div
        className={`hero-grid section-padding relative z-10${heroVisual ? '' : ' page-hero-grid-single'}`}
        style={{
          paddingTop: 0,
          paddingBottom: 0,
          minHeight: heroVisual ? undefined : undefined,
        }}
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        transition={transition}
      >
        <motion.div className="hero-copy flex flex-col" style={{ gap: 0 }} variants={fadeLeft} transition={transition}>
          {eyebrow && (
            <motion.span className="eyebrow" style={{ color: accent }} variants={fadeUp} transition={transition}>
              {eyebrow}
            </motion.span>
          )}
          <motion.h1
            variants={fadeLeft}
            transition={{ ...transition, delay: shouldReduceMotion ? 0 : 0.05 }}
            style={{
              fontSize: 'clamp(32px, 4vw, 52px)',
              color: '#fff',
              margin: eyebrow ? '14px 0 0' : 0,
              lineHeight: 1.1,
            }}
          >
            {title}
          </motion.h1>
          {subtitle && (
            <motion.p
              variants={fadeUp}
              transition={{ ...transition, delay: shouldReduceMotion ? 0 : 0.1 }}
              style={{
                fontSize: 17,
                color: 'rgba(255,255,255,0.72)',
                margin: '18px 0 0',
                lineHeight: 1.65,
                maxWidth: 520,
              }}
            >
              {subtitle}
            </motion.p>
          )}
          {(primaryCta || secondaryCta) && (
            <motion.div
              className="flex flex-wrap items-center hero-cta-row"
              style={{ gap: 12, marginTop: 28 }}
              variants={fadeUp}
              transition={{ ...transition, delay: shouldReduceMotion ? 0 : 0.15 }}
            >
              {primaryCta && <CtaLink href={primaryCta.href} label={primaryCta.label} primary />}
              {secondaryCta && <CtaLink href={secondaryCta.href} label={secondaryCta.label} />}
            </motion.div>
          )}
        </motion.div>

        {heroVisual && (
          <div className="hero-visual page-hero-visual">
            <motion.div
              className="hero-dashboard-wrap"
              variants={fadeRight}
              transition={{ ...transition, delay: shouldReduceMotion ? 0 : 0.12 }}
              aria-hidden="true"
            >
              {heroVisual}
            </motion.div>
            <p className="sr-only">
              Decorative product preview illustrating governance evidence workflow.
            </p>
          </div>
        )}
      </motion.div>
    </section>
  );
}
