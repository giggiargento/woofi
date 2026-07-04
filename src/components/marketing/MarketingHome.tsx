import { MarketingShell } from './MarketingShell';
import { HeroSection } from './sections/HeroSection';
import { ServicesSection } from './sections/ServicesSection';
import { AboutSection } from './sections/AboutSection';
import { PlanSection } from './sections/PlanSection';
import { CtaBannerSection } from './sections/CtaBannerSection';

export function MarketingHome() {
  return (
    <MarketingShell>
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <PlanSection />
      <CtaBannerSection />
    </MarketingShell>
  );
}
