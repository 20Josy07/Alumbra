'use client';

import { Button } from '@/components/ui/button';
import { ScanText, BrainCircuit, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

export function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen px-4 overflow-hidden text-center bg-transparent">
      {/* Fondo radial suave */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-transparent to-transparent" />

      {/* Partículas flotantes */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => {
          const top = `${Math.random() * 95}%`;
          const left = `${Math.random() * 95}%`;
          const size = Math.random() > 0.7 ? 'w-2 h-2' : 'w-1 h-1';
          const delay = `${(i * 0.5).toFixed(1)}s`;
          const color = Math.random() > 0.5 ? 'bg-[#f8d851]' : 'bg-[#a856f6]';
          return (
            <motion.div
              key={i}
              className={`absolute rounded-full ${size} ${color}`}
              style={{ top, left }}
              animate={{
                y: [0, -10, 0],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: Math.random() * 3 + 3,
                repeat: Infinity,
                repeatType: 'loop',
                ease: 'easeInOut',
                delay: i * 0.2,
              }}
            />
          );
        })}
      </div>

      {/* Contenido principal */}
      <motion.div
        className="relative z-10 flex flex-col items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          variants={itemVariants}
          className="text-7xl md:text-8xl lg:text-[11rem] font-bold mb-8 tracking-tight"
        >
          <span
            className="relative inline bg-gradient-to-r from-[#aa5af1] to-[#f4d15a] bg-[length:200%_100%] bg-clip-text text-transparent animate-gradient"
            style={{ '--shimmer-width': '200%' } as React.CSSProperties}
          >
            Alumbra
          </span>
        </motion.h1>

        <motion.div
          variants={itemVariants}
          className="flex flex-wrap gap-4 mb-8 justify-center"
        >
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              variant="outline"
              className="rounded-full border-[#f8d851]/50 bg-white/10 text-[#f8d851] hover:bg-white/20 backdrop-blur-sm group gap-2"
            >
              <ScanText className="w-5 h-5 text-[#f8d851] group-hover:scale-110 transition-transform duration-300" />
              Analiza
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              variant="outline"
              className="rounded-full border-[#f8d851]/50 bg-white/10 text-[#f8d851] hover:bg-white/20 backdrop-blur-sm group gap-2"
            >
              <BrainCircuit className="w-5 h-5 text-[#f8d851] group-hover:scale-110 transition-transform duration-300" />
              Identifica
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              variant="outline"
              className="rounded-full border-[#f8d851]/50 bg-white/10 text-[#f8d851] hover:bg-white/20 backdrop-blur-sm group gap-2"
            >
              <Lightbulb className="w-5 h-5 text-[#f8d851] group-hover:scale-110 transition-transform duration-300" />
              Comprende
            </Button>
          </motion.div>
        </motion.div>
        <motion.p
          variants={itemVariants}
          className="text-lg text-white/70 max-w-2xl leading-relaxed mb-8"
        >
          Analiza tus conversaciones con IA y detecta abuso psicológico en segundos. Protege tu bienestar emocional con claridad y privacidad.
        </motion.p>
        <motion.div variants={itemVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button asChild size="lg" className="rounded-full">
            <Link href="/analizar">
              Empieza a Analizar Gratis
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
