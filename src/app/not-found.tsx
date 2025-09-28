'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';

const Custom404Image = () => {
  return (
    <Image
      src="https://i.postimg.cc/x1BMBn1d/undraw_construction_workers_z99i-removebg-preview.png"
      alt="Page not found"
      width={500}
      height={300}
      className="max-w-sm md:max-w-md"
    />
  );
};


export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center px-4">
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
