import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldCheck, Zap, Lightbulb, HeartHandshake } from 'lucide-react';

const benefits = [
  {
    icon: Zap,
    title: 'Claridad Objetiva',
    description:
      'Obtén una perspectiva imparcial de tus conversaciones para comprender las dinámicas ocultas y los patrones de comunicación.',
  },
  {
    icon: ShieldCheck,
    title: 'Detección de Riesgos',
    description:
      'Identifica señales tempranas de manipulación, gaslighting y otras tácticas de comunicación tóxicas para proteger tu bienestar.',
  },
  {
    icon: HeartHandshake,
    title: 'Privacidad Garantizada',
    description:
      'Analiza tus textos de forma 100% segura. No almacenamos tus conversaciones, asegurando tu total confidencialidad.',
  },
  {
    icon: Lightbulb,
    title: 'Empoderamiento Personal',
    description:
      'Recibe información clara y recomendaciones prácticas para tomar decisiones informadas y fortalecer tus relaciones.',
  },
];

export function BenefitsSection() {
  return (
    <section id="benefits" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">
            Beneficios Clave
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Descubre cómo Alumbra puede transformar tu manera de comunicarte.
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => (
            <Card
              key={index}
              className="transform-gpu transition-transform duration-300 hover:-translate-y-2 border-primary/20 bg-card"
            >
              <CardHeader className="items-center text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <benefit.icon className="h-8 w-8" />
                </div>
                <CardTitle>{benefit.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-muted-foreground">
                <p>{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
