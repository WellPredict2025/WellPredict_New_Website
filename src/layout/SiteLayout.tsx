import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navigation from './Navigation';
import Footer from './Footer';
import FooterCTA from '../sections/FooterCTA';
import ScrollProgress from './ScrollProgress';
import CookieConsent from '../components/CookieConsent';
import SEO from '../components/SEO';
import { SEO_ROUTES } from '../config/seoRoutes';

export default function SiteLayout() {
  const { pathname } = useLocation();
  const isKnownRoute = pathname in SEO_ROUTES;
  const seo = isKnownRoute
    ? SEO_ROUTES[pathname]
    : {
        title: 'Page Not Found · WellPredict',
        description: 'The page you are looking for could not be found.',
      };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div style={{ background: '#F7FBFC', minHeight: '100vh', overflowX: 'hidden' }}>
      <SEO
        title={seo.title}
        description={seo.description}
        canonicalPath={isKnownRoute ? pathname : '/'}
        jsonLd={'jsonLd' in seo ? seo.jsonLd : undefined}
        noIndex={!isKnownRoute}
      />
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <ScrollProgress />
      <Navigation />
      <main id="main-content" tabIndex={-1}>
        <Outlet />
      </main>
      <FooterCTA />
      <Footer />
      <CookieConsent />
    </div>
  );
}
