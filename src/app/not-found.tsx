'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

/**
 * Tu Imagen SVG Personalizada
 *
 * Pega tu código SVG dentro del return de este componente.
 * He dejado un SVG de ejemplo como marcador de posición.
 */
const Custom404Image = () => {
  return (
    <svg
        className="h-64 w-64 text-primary drop-shadow-[0_0_15px_rgba(170,90,241,0.5)]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="hsl(var(--primary))" opacity="0.1" />
        <path d="M15.5 8.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z" />
        <path d="M8.5 8.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z" />
        <path d="M12 14c-2.33 0-4.32 1.45-5.12 3.5h10.24c-.8-2.05-2.79-3.5-5.12-3.5z" />
    </svg>
  );
};


export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-10rem)] flex-col items-center justify-center text-center bg-background px-4">
      <Custom404Image />
      <h1 className="mt-8 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
        ¡Ups! Página no encontrada
      </h1>
      <p className="mt-4 max-w-md text-lg text-muted-foreground">
        Parece que te has perdido en el cosmos. La página que buscas no existe o ha sido movida a otra galaxia.
      </p>
      <Button asChild className="mt-8">
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver a la Página de Inicio
        </Link>
      </Button>
    </div>
  );
}