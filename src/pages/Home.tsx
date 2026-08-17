import Hero from '../sections/Hero';
import ProofBar from '../sections/ProofBar';
import Problem from '../sections/Problem';
import StatCounterRow from '../sections/StatCounterRow';
import HowItWorks from '../sections/HowItWorks';
import EvidencePack from '../sections/EvidencePack';
import Sectors from '../sections/Sectors';
import PrivacyArchitecture from '../sections/PrivacyArchitecture';
import PlatformDashboard from '../sections/PlatformDashboard';
import TrustProof from '../sections/TrustProof';
import CTAContact from '../sections/CTAContact';

export default function Home() {
  return (
    <main>
      <Hero />
      <ProofBar />
      <Problem />
      <TrustProof />
      <StatCounterRow />
      <HowItWorks />
      <EvidencePack />
      <Sectors />
      <PrivacyArchitecture />
      <PlatformDashboard />
      <CTAContact />
    </main>
  );
}
