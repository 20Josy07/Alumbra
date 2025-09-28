
import { BenefitsSection } from '@/components/benefits-section';
import { FeedbackForm } from '@/components/feedback-form';
import { HeroSection } from '@/components/hero-section';
import { HowItWorksSection } from '@/components/how-it-works-section';
import { InteractiveDemoSection } from '@/components/interactive-demo-section';
import { TestimonialsSection } from '@/components/testimonials-section';

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <div className="bg-gradient-to-b from-[#30193e] to-[#0b011d]">
        <HowItWorksSection />
        <BenefitsSection />
        <InteractiveDemoSection />
        <TestimonialsSection />
        <FeedbackForm />
      </div>
    </div>
  );
}
