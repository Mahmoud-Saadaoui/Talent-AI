import HeroSection from '../components/HeroSection';
import ProfileSelection from '../components/ProfileSelection';
import FeaturesSection from '../components/FeaturesSection';
import HowItWorksSection from '../components/HowItWorksSection';
import StatsSection from '../components/StatsSection';
import TestimonialsSection from '../components/TestimonialsSection';
import CompaniesSection from '../components/CompaniesSection';
import CtaSection from '../components/CtaSection';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <div className="w-full">
      <HeroSection />
      <ProfileSelection />
      <FeaturesSection />
      <HowItWorksSection />
      <StatsSection />
      <TestimonialsSection />
      <CompaniesSection />
      <CtaSection />
      <Footer />
    </div>
  );
};

export default HomePage;
