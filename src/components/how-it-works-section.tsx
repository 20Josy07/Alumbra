'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ClipboardPaste, Bot, Search, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';

const steps = [
  {
    icon: Search,
    title: '1. Proporciona Contexto',
    description:
      'Responde unas breves preguntas para dar contexto a la IA sobre la naturaleza de la conversación.',
  },
  {
    icon: ClipboardPaste,
    title: '2. Pega la Conversación',
    description:
      'Copia y pega el texto de tu conversación en el campo de análisis.',
  },
  {
    icon: Bot,
    title: '3. Analiza con IA',
    description:
      'Nuestra potente IA, impulsada por Gemini, procesa tu texto para identificar temas clave, riesgos y patrones.',
  },
  {
    icon: Lightbulb,
    title: '4. Obtén Información',
    description:
      'Recibe un informe detallado con evaluaciones de riesgo, categorías de temas y recomendaciones prácticas.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

export function HowItWorksSection() {
  return (
    <motion.section
      id="how-it-works"
      className="py-20 md:py-32 bg-transparent"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <motion.h2
            variants={itemVariants}
            className="font-headline text-3xl font-bold tracking-tight md:text-4xl"
          >
            Cómo Funciona
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mt-4 text-lg text-muted-foreground"
          >
            Obtén información de tus conversaciones en cuatro simples pasos.
          </motion.p>
        </div>
        <motion.div
          variants={containerVariants}
          className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4"
        >
          {steps.map((step, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="transform-gpu transition-transform duration-300 hover:-translate-y-2 h-full">
                <CardHeader className="items-center">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: -10 }}
                    className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary"
                  >
                    <step.icon className="h-8 w-8" />
                  </motion.div>
                  <CardTitle>{step.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-muted-foreground">
                  <p>{step.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
