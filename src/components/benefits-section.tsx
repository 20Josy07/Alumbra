'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldCheck, Zap, Lightbulb, HeartHandshake } from 'lucide-react';
import { motion } from 'framer-motion';

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

export function BenefitsSection() {
  return (
    <motion.section
      id="benefits"
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
            Beneficios Clave
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mt-4 text-lg text-muted-foreground"
          >
            Descubre cómo Alumbra puede transformar tu manera de comunicarte.
          </motion.p>
        </div>
        <motion.div
          variants={containerVariants}
          className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4"
        >
          {benefits.map((benefit, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card
                className="transform-gpu transition-transform duration-300 hover:-translate-y-2 border-primary/20 bg-card h-full"
              >
                <CardHeader className="items-center text-center">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary"
                  >
                    <benefit.icon className="h-8 w-8" />
                  </motion.div>
                  <CardTitle>{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-muted-foreground">
                  <p>{benefit.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
