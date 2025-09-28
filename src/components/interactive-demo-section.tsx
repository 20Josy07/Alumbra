'use client';

import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BrainCircuit, Lightbulb, Tags } from 'lucide-react';
import React from 'react';

export function InteractiveDemoSection() {
  const [progress, setProgress] = React.useState(0);

  // Fake progress animation on view
  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(70), 500);
    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.section
      id="interactive-demo"
      className="py-20 md:py-32 bg-background text-white"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="container mx-auto px-4 text-center">
        <motion.h2
          variants={itemVariants}
          className="font-headline text-3xl font-bold tracking-tight md:text-4xl"
        >
          Ejemplo Interactivo
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="mt-4 text-lg text-muted-foreground"
        >
          Mira cómo Alumbra transforma una conversación en un análisis claro.
        </motion.p>
        <div className="mt-12 flex flex-col items-center justify-center gap-4 md:flex-row md:gap-8">
          {/* Input Card */}
          <motion.div variants={itemVariants} className="w-full max-w-sm">
            <Card className="bg-card text-card-foreground p-4 border-primary/20 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
              <CardHeader className="p-2">
                <CardTitle className="text-lg font-semibold text-center">
                  Input: Conversación
                </CardTitle>
              </CardHeader>
              <CardContent className="p-2 text-sm text-left bg-background/50 rounded-md">
                <p className="text-muted-foreground">
                  "No sé por qué te pones así, siempre exageras todo. Si de
                  verdad me quisieras, no saldrías con tus amigos esta noche."
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Analysis Icon */}
          <motion.div
            variants={itemVariants}
            className="my-4 text-primary md:my-0"
          >
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                ease: 'easeInOut',
                repeat: Infinity,
              }}
            >
              <BrainCircuit size={48} />
            </motion.div>
          </motion.div>

          {/* Output Card */}
          <motion.div variants={itemVariants} className="w-full max-w-sm">
            <Card className="bg-card text-card-foreground p-4 border-primary/20 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
              <CardHeader className="p-2">
                <CardTitle className="text-lg font-semibold text-center">
                  Output: Análisis Alumbra
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 p-2">
                <div className="text-left">
                  <p className="text-sm font-bold text-yellow-400">
                    Riesgo: 7/10 - Medio
                  </p>
                  <Progress
                    value={progress}
                    className="mt-1 h-2"
                    indicatorClassName="bg-yellow-500"
                  />
                </div>
                <div className="text-left">
                  <p className="mb-2 text-sm font-semibold text-card-foreground">
                    Categorías Detectadas:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">
                      <Tags className="mr-1.5 h-3 w-3" />
                      Gaslighting
                    </Badge>
                    <Badge variant="secondary">
                      <Tags className="mr-1.5 h-3 w-3" />
                      Manipulación
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center text-left text-sm text-muted-foreground">
                  <Lightbulb className="mr-2 h-4 w-4 shrink-0 text-primary" />
                  <span>Recomendaciones generadas...</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
