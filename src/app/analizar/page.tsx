
'use client';

import { useState } from 'react';
import { ContextForm } from '@/components/context-form';
import { AnalysisSection } from '@/components/analysis-section';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AnalizarPage() {
  const [context, setContext] = useState<string | null>(null);

  const handleContextSubmit = (submittedContext: string) => {
    setContext(submittedContext);
  };

  const handleReset = () => {
    setContext(null);
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-16 md:py-24">
      <header className="text-center relative">
        {!context && (
           <Button asChild variant="outline" size="sm" className="absolute left-0 top-0">
             <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver
             </Link>
           </Button>
        )}
        <h1 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">
          Analizador de Conversación
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Descifra la dinámica de tus interacciones.
        </p>
      </header>

      <div className="mt-12">
        {!context ? (
          <ContextForm onSubmit={handleContextSubmit} />
        ) : (
          <div>
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-lg">Contexto Proporcionado:</h3>
                <p className="text-muted-foreground italic">"{context}"</p>
              </div>
              <Button variant="outline" size="sm" onClick={handleReset}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Cambiar Contexto
              </Button>
            </div>
            <AnalysisSection context={context} />
          </div>
        )}
      </div>
    </div>
  );
}
