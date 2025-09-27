import { FeedbackForm } from '@/components/feedback-form';
import { HeroSection } from '@/components/hero-section';
import { HowItWorksSection } from '@/components/how-it-works-section';
import { TestimonialsSection } from '@/components/testimonials-section';

export default function Home() {
  return (
    <div className="flex flex-col pt-16">
      <HeroSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <FeedbackForm />
    </div>
  );
}
