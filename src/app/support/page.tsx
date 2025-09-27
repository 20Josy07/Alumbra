import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Soporte y Preguntas Frecuentes',
};

const faqs = [
  {
    question: '¿Están mis datos seguros y privados?',
    answer:
      "Absolutamente. Priorizamos tu privacidad. Las conversaciones son procesadas por nuestra IA y no se almacenan en nuestros servidores. El análisis es una transacción sin estado. Para más detalles, por favor consulta nuestra Política de Privacidad.",
  },
  {
    question: '¿Qué tan preciso es el análisis de la IA?',
    answer:
      'Nuestra IA utiliza modelos avanzados como Gemini de Google para proporcionar un análisis de alta calidad. Sin embargo, es importante recordar que es una herramienta de orientación. La interpretación de los matices puede variar, y el resultado de la IA debe considerarse un punto de partida para tu propia reflexión.',
  },
  {
    question: '¿Qué tipo de conversaciones puedo analizar?',
    answer:
      'Puedes analizar cualquier conversación basada en texto. Es particularmente útil para entornos profesionales como evaluaciones de desempeño, negociaciones con clientes, reuniones de equipo o incluso discusiones personales donde la claridad de la comunicación es clave.',
  },
  {
    question: '¿Por qué hay un límite de caracteres?',
    answer:
      'El límite de caracteres garantiza un rendimiento receptivo y gestiona los costos computacionales del análisis de IA. Para conversaciones muy largas, recomendamos analizarlas en secciones más pequeñas y coherentes.',
  },
  {
    question: '¿Para qué sirve el campo "Contexto Opcional"?',
    answer:
      'Proporcionar contexto (p. ej., "Esto es una negociación salarial" o "Una discusión entre un terapeuta y un cliente") ayuda a la IA a comprender el entorno específico y los matices potenciales, lo que conduce a un análisis más preciso y relevante.',
  },
  {
    question: '¿Para quién es Alumbra?',
    answer:
      'Alumbra es para cualquiera que busque mejorar sus habilidades de comunicación. Esto incluye a gerentes, profesionales de RRHH, equipos de ventas, agentes de soporte al cliente, terapeutas e individuos que desean obtener una visión más profunda de sus interacciones personales.',
  },
];

export default function SupportPage() {
  return (
    <div className="bg-background py-16 md:py-24">
      <div className="container mx-auto max-w-3xl px-4">
        <header className="text-center">
          <h1 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">
            Soporte y Preguntas Frecuentes
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            ¿Tienes preguntas? Estamos aquí para ayudar.
          </p>
        </header>

        <div className="mt-12">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-lg hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold">¿Aún tienes preguntas?</h2>
          <p className="mt-2 text-muted-foreground">
            Contacta a nuestro equipo de soporte y estaremos encantados de ayudarte.
          </p>
          <a
            href="mailto:support@alumbra.example.com"
            className="mt-4 inline-block text-lg font-medium text-primary hover:underline"
          >
            support@alumbra.example.com
          </a>
        </div>
      </div>
    </div>
  );
}
