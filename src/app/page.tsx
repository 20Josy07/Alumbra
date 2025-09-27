import { AnalysisSection } from '@/components/analysis-section';
import { HeroSection } from '@/components/hero-section';
import { HowItWorksSection } from '@/components/how-it-works-section';
import { TestimonialsSection } from '@/components/testimonials-section';

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <HowItWorksSection />
      <AnalysisSection />
      <TestimonialsSection />
    </div>
  );
}
