import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ClipboardPaste, Bot, Search, Lightbulb } from 'lucide-react';

const steps = [
  {
    icon: ClipboardPaste,
    title: '1. Pega la Conversación',
    description: 'Simplemente copia y pega el texto de tu conversación en el campo de análisis.',
  },
  {
    icon: Search,
    title: '2. Añade Contexto (Opcional)',
    description: 'Proporciona un breve contexto opcional para ayudar a nuestra IA a ofrecer un análisis más matizado y preciso.',
  },
  {
    icon: Bot,
    title: '3. Analiza con IA',
    description: 'Nuestra potente IA, impulsada por Gemini, procesa tu texto para identificar temas clave, riesgos y patrones.',
  },
  {
    icon: Lightbulb,
    title: '4. Obtén Información',
    description: 'Recibe un informe detallado con evaluaciones de riesgo, categorías de temas y recomendaciones prácticas.',
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">
            Cómo Funciona
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Obtén información de tus conversaciones en cuatro simples pasos.
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <Card
              key={index}
              className="transform-gpu transition-transform duration-300 hover:-translate-y-2"
            >
              <CardHeader className="items-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <step.icon className="h-8 w-8" />
                </div>
                <CardTitle>{step.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-muted-foreground">
                <p>{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
