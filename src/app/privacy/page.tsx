import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacidad y Seguridad',
};

export default function PrivacyPage() {
  return (
    <div className="bg-background py-16 md:py-24">
      <div className="container mx-auto max-w-4xl px-4">
        <header className="text-center">
          <h1 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">
            Privacidad y Seguridad
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Tu confianza es nuestra máxima prioridad. Así es como manejamos tus datos.
          </p>
        </header>

        <Card className="mt-12">
          <CardContent className="prose prose-lg max-w-none p-8 dark:prose-invert prose-headings:font-headline">
            <h2>Nuestro Compromiso con tu Privacidad</h2>
            <p>
              Alumbra está diseñado con la privacidad como principio fundamental. Entendemos la naturaleza sensible de las conversaciones que analizas y estamos comprometidos a proteger tus datos y tu anonimato.
            </p>

            <h3>Datos que Proporcionas</h3>
            <p>
              <strong>Texto y Contexto de la Conversación:</strong> El texto de la conversación y cualquier contexto que proporciones se envían a nuestro servidor seguro para el análisis de IA. No almacenamos esta información después de que se completa el análisis y se te devuelven los resultados. Cada análisis es una transacción sin estado.
            </p>

            <h3>Datos que Recopilamos</h3>
            <p>
              <strong>Análisis de Uso:</strong> Podemos recopilar datos de uso anónimos para ayudarnos a mejorar nuestro servicio. Esto incluye información como la frecuencia de uso de las funciones y las métricas de rendimiento. Estos datos se agregan y no se pueden utilizar para identificarte a ti ni el contenido de tus análisis.
            </p>

            <h3>Cómo Usamos Tus Datos</h3>
            <ul>
              <li>
                <strong>Para Prestar el Servicio:</strong> El texto de tu conversación se utiliza únicamente para generar el análisis impulsado por IA que solicitas.
              </li>
              <li>
                <strong>Para Mejorar el Servicio:</strong> Los datos anónimos y agregados nos ayudan a comprender cómo se utiliza nuestro servicio, identificar áreas de mejora y garantizar la fiabilidad.
              </li>
            </ul>

            <h3>Seguridad de los Datos</h3>
            <p>
              Toda la comunicación entre tu navegador y nuestros servidores está encriptada utilizando TLS (Transport Layer Security) estándar de la industria. Empleamos las mejores prácticas en seguridad en la nube para proteger nuestra infraestructura.
            </p>

            <h2>Tu Control</h2>
            <p>
              Tienes control total sobre los datos que envías. Como no almacenamos tus conversaciones, no hay datos que puedas solicitar o eliminar. El contexto opcional que proporcionas se almacena solo en el almacenamiento local de tu navegador y puedes borrarlo en cualquier momento limpiando los datos de tu navegador.
            </p>

            <h3>Cambios en Esta Política</h3>
            <p>
              Podemos actualizar esta Política de Privacidad de vez en cuando. Te notificaremos cualquier cambio significativo publicando la nueva política en esta página.
            </p>

            <h3>Contáctanos</h3>
            <p>
              Si tienes alguna pregunta sobre esta Política de Privacidad, por favor contáctanos en{' '}
              <a href="mailto:privacy@alumbra.example.com">
                privacy@alumbra.example.com
              </a>
              .
            </p>
            <p className="text-sm text-muted-foreground">
              Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
