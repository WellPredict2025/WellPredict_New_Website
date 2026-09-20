import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SiteLayout from './layout/SiteLayout';

const Home = lazy(() => import('./pages/Home'));
const HowItWorksPage = lazy(() => import('./pages/HowItWorksPage'));
const EvidencePackPage = lazy(() => import('./pages/EvidencePackPage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const SectorsPage = lazy(() => import('./pages/SectorsPage'));
const HealthcarePage = lazy(() => import('./pages/HealthcarePage'));
const FoodPage = lazy(() => import('./pages/FoodPage'));
const FinancialPage = lazy(() => import('./pages/FinancialPage'));
const LegalPage = lazy(() => import('./pages/LegalPage'));
const EducationPage = lazy(() => import('./pages/EducationPage'));
const CorporatePage = lazy(() => import('./pages/CorporatePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const TeamPage = lazy(() => import('./pages/TeamPage'));
const CareersPage = lazy(() => import('./pages/CareersPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const PilotPage = lazy(() => import('./pages/PilotPage'));
const PricingPage = lazy(() => import('./pages/PricingPage'));
const FAQPage = lazy(() => import('./pages/FAQPage'));
const SecurityPage = lazy(() => import('./pages/SecurityPage'));
const DataProcessingPage = lazy(() => import('./pages/DataProcessingPage'));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'));
const TermsPage = lazy(() => import('./pages/TermsPage'));
const CookiesPage = lazy(() => import('./pages/CookiesPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

export default function App() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<Home />} />
          <Route path="how-it-works" element={<HowItWorksPage />} />
          <Route path="evidence-pack" element={<EvidencePackPage />} />
          <Route path="privacy" element={<PrivacyPage />} />
          <Route path="sectors" element={<SectorsPage />} />
          <Route path="sectors/healthcare" element={<HealthcarePage />} />
          <Route path="sectors/food" element={<FoodPage />} />
          <Route path="sectors/financial" element={<FinancialPage />} />
          <Route path="sectors/legal" element={<LegalPage />} />
          <Route path="sectors/education" element={<EducationPage />} />
          <Route path="sectors/corporate" element={<CorporatePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="team" element={<TeamPage />} />
          <Route path="company/team" element={<Navigate to="/team" replace />} />
          <Route path="careers" element={<CareersPage />} />
          <Route path="press" element={<Navigate to="/contact" replace />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="pilot" element={<PilotPage />} />
          <Route path="pricing" element={<PricingPage />} />
          <Route path="blog" element={<Navigate to="/how-it-works" replace />} />
          <Route path="blog/*" element={<Navigate to="/how-it-works" replace />} />
          <Route path="case-studies" element={<Navigate to="/evidence-pack" replace />} />
          <Route path="case-studies/*" element={<Navigate to="/evidence-pack" replace />} />
          <Route path="glossary" element={<Navigate to="/faq" replace />} />
          <Route path="faq" element={<FAQPage />} />
          <Route path="security" element={<SecurityPage />} />
          <Route path="data-processing" element={<DataProcessingPage />} />
          <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="terms" element={<TermsPage />} />
          <Route path="cookies" element={<CookiesPage />} />
          <Route path="cookie-policy" element={<Navigate to="/cookies" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
