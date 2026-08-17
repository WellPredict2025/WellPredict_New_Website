interface LogoProps {
  size?: 'nav' | 'navMobile' | 'footer';
  showWordmark?: boolean;
  wordmarkColor?: string;
}

const LOGO_HEIGHTS = {
  nav: 40,
  navMobile: 36,
  footer: 44,
} as const;

export default function Logo({ size = 'nav', showWordmark = true, wordmarkColor = '#0F172A' }: LogoProps) {
  const iconHeight = LOGO_HEIGHTS[size];
  const isFooter = size === 'footer';

  return (
    <span className={`flex items-center nav-brand${isFooter ? ' footer-brand' : ''}`}>
      <img
        src="/logo.png"
        alt="WellPredict"
        width={160}
        height={iconHeight}
        className={isFooter ? 'footer-logo' : 'nav-logo'}
        style={{ height: iconHeight, width: 'auto', display: 'block', flexShrink: 0 }}
      />
      {showWordmark && (
        <span className={isFooter ? 'footer-brand-text' : 'nav-brand-text'} style={{ color: wordmarkColor }}>
          WellPredict
        </span>
      )}
    </span>
  );
}
