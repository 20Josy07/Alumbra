'use client';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function HeroSection() {

  const handleScrollToHowItWorks = () => {
    const element = document.getElementById('how-it-works');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-background py-20 text-center md:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          <h1 className="font-headline text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            Ilumina Tus Conversaciones con IA
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Alumbra utiliza IA avanzada para analizar tus conversaciones, identificar
            riesgos y proporcionar información práctica para una mejor comunicación.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button size="lg" asChild>
              <Link href="/analizar">
                Analizar Ahora <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" onClick={handleScrollToHowItWorks}>
              Aprender Más
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
