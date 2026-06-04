import Navbar from '@/components/landing/Navbar';
import HeroSection from '@/components/landing/HeroSection';
import HowItWorks from '@/components/landing/HowItWorks';
import FeaturesDeepDive from '@/components/landing/FeaturesDeepDive';
import UseCases from '@/components/landing/UseCases';
import FAQ from '@/components/landing/FAQ';
import CTASection from '@/components/landing/CTASection';
import Footer from '@/components/landing/Footer';

export default function Home() {
  return (
    <div className='overflow-x-hidden'>
      <Navbar />
      <main>
        <HeroSection />
        <HowItWorks />
        <FeaturesDeepDive />
        <UseCases />
        <FAQ />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
