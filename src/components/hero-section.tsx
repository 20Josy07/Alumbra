'use client';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function HeroSection() {
  const handleScroll = () => {
    const element = document.getElementById('analysis-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-background py-20 text-center md:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          <h1 className="font-headline text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            Illuminate Your Conversations with AI
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Alumbra uses advanced AI to analyze your conversations, identify
            risks, and provide actionable insights for better communication.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button size="lg" onClick={handleScroll}>
              Analyze Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#how-it-works">Learn More</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
