import Navbar from '@/components/landing/Navbar';
import HeroSection from '@/components/landing/HeroSection';
import TrustBar from '@/components/landing/TrustBar';
import HowItWorks from '@/components/landing/HowItWorks';
import FeaturesDeepDive from '@/components/landing/FeaturesDeepDive';
import UseCases from '@/components/landing/UseCases';
import StatsBar from '@/components/landing/StatsBar';
import FAQ from '@/components/landing/FAQ';
import CTASection from '@/components/landing/CTASection';
import Footer from '@/components/landing/Footer';

export default function Home() {
  return (
    <div className='overflow-x-hidden'>
      <Navbar />
      <main>
        <HeroSection />
        <TrustBar />
        <HowItWorks />
        <FeaturesDeepDive />
        <UseCases />
        <StatsBar />
        <FAQ />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
