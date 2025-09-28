
'use client';

import { Button } from '@/components/ui/button';
import { ScanText, BrainCircuit, Lightbulb } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-transparent text-center">
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
            <div
              key={i}
              className={`absolute rounded-full ${size} ${color} animate-float`}
              style={{ top, left, animationDelay: delay }}
            />
          );
        })}
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {/* Título con shiny effect */}
        <h1 className="text-7xl md:text-8xl lg:text-[11rem] font-bold mb-8 tracking-tight">
          <span
            className="relative inline bg-gradient-to-r from-[#aa5af1] to-[#f4d15a] bg-[length:200%_100%] bg-clip-text text-transparent animate-gradient"
            style={{ '--shimmer-width': '200%' } as React.CSSProperties}
          >
            Alumbra
          </span>
        </h1>

        {/* Botones de funciones */}
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          <Button
            variant="outline"
            className="rounded-full border-[#f8d851]/50 bg-white/10 text-[#f8d851] hover:bg-white/20 backdrop-blur-sm group gap-2"
          >
            <ScanText className="w-5 h-5 text-[#f8d851] group-hover:scale-110 transition-transform duration-300" />
            Analiza
          </Button>
          <Button
            variant="outline"
            className="rounded-full border-[#f8d851]/50 bg-white/10 text-[#f8d851] hover:bg-white/20 backdrop-blur-sm group gap-2"
          >
            <BrainCircuit className="w-5 h-5 text-[#f8d851] group-hover:scale-110 transition-transform duration-300" />
            Identifica
          </Button>
          <Button
            variant="outline"
            className="rounded-full border-[#f8d851]/50 bg-white/10 text-[#f8d851] hover:bg-white/20 backdrop-blur-sm group gap-2"
          >
            <Lightbulb className="w-5 h-5 text-[#f8d851] group-hover:scale-110 transition-transform duration-300" />
            Comprende
          </Button>
        </div>

        {/* Descripción */}
        <p className="text-lg text-white/70 max-w-2xl leading-relaxed">
          Analiza tus conversaciones con IA y detecta abuso psicológico en segundos. Protege tu bienestar emocional con claridad y privacidad.
        </p>
      </div>
    </section>
  );
}
