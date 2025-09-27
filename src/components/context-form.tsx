
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Link from 'next/link';
import { Checkbox } from './ui/checkbox';

const formSchema = z.object({
  relationship: z.string().optional(),
  selfDoubt: z.string().optional(),
  control: z.string().optional(),
  unableToLeave: z.string().optional(),
  wantsEvaluation: z.string().optional(),
  privacyPolicy: z.boolean().refine((val) => val === true, {
    message: 'Debes aceptar la política de privacidad para continuar.',
  }),
});

type ContextFormProps = {
  onSubmit: (context: string) => void;
};

const questions = [
  {
    name: 'relationship',
    label: '1. ¿Esta conversación es con una pareja, amigo/a, familiar, colega o grupo?',
    options: ['Pareja', 'Amistad', 'Familiar', 'Laboral', 'Grupo'],
  },
  {
    name: 'selfDoubt',
    label: '2. ¿Sientes que esta persona (o personas en la conversación) te hace dudar de ti mismo/a o te hace sentir mal contigo mismo/a?',
    options: ['Sí', 'No'],
  },
  {
    name: 'control',
    label: '3. ¿Has sentido que esta persona (o personas) te controla o te limita?',
    options: ['Sí', 'No'],
  },
  {
    name: 'unableToLeave',
    label: '4. Si aplica (pareja, amistad, familiar), ¿alguna vez has querido cortar la relación, pero te sentiste culpable o incapaz?',
    options: ['Sí', 'No / No aplica'],
  },
  {
    name: 'wantsEvaluation',
    label: '5. ¿Te gustaría recibir una evaluación sobre si la dinámica de esta conversación podría ser emocionalmente dañina?',
    options: ['Sí', 'No'],
  },
] as const;

export function ContextForm({ onSubmit }: ContextFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      privacyPolicy: false,
    },
  });

  const handleFormSubmit = (values: z.infer<typeof formSchema>) => {
    let contextString = 'Contexto proporcionado por el usuario:\n';
    if(values.relationship) contextString += `Tipo de relación: ${values.relationship}\n`;
    if(values.selfDoubt) contextString += `La persona le hace dudar de sí mismo/a: ${values.selfDoubt}\n`;
    if(values.control) contextString += `La persona le controla o limita: ${values.control}\n`;
    if(values.unableToLeave) contextString += `Ha querido cortar la relación pero se sintió incapaz: ${values.unableToLeave}\n`;
    if(values.wantsEvaluation) contextString += `Desea evaluación sobre posible daño emocional: ${values.wantsEvaluation}\n`;
    
    if (contextString === 'Contexto proporcionado por el usuario:\n') {
      contextString = 'El usuario ha decidido no proporcionar contexto.';
    }

    onSubmit(contextString);
  };
  
  const handleSkip = () => {
    if (!form.getValues('privacyPolicy')) {
      form.setError('privacyPolicy', {
        type: 'manual',
        message: 'Debes aceptar la política de privacidad para continuar, incluso si omites el cuestionario.',
      });
      return;
    }
    onSubmit('El usuario ha decidido no proporcionar contexto.');
  }

  return (
    <Card className="mx-auto max-w-3xl shadow-lg">
      <Form {...form}>
        <CardHeader>
          <CardTitle>Paso 1: Contexto de la Conversación (Opcional)</CardTitle>
          <FormDescription>
            Proporcionar un contexto claro ayuda a la IA a realizar un análisis más preciso. Puedes omitir este paso si lo prefieres.
          </FormDescription>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          <form
            onSubmit={form.handleSubmit(handleFormSubmit)}
            className="space-y-8"
          >
            {questions.map((q) => (
              <FormField
                key={q.name}
                control={form.control}
                name={q.name}
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>{q.label}</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        {q.options.map((option) => (
                          <FormItem key={option} className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value={option} />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {option}
                            </FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
             <FormField
              control={form.control}
              name="privacyPolicy"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      He leído y acepto la Política de Privacidad y la Política de Seguridad.
                    </FormLabel>
                    <FormDescription>
                      Para continuar, debes aceptar nuestros términos.{' '}
                      <Link href="/privacy" className="underline">
                        Leer políticas
                      </Link>
                    </FormDescription>
                     <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <div className="flex flex-col sm:flex-row gap-2">
               <Button type="submit" size="lg" className="w-full">
                Siguiente
              </Button>
              <Button type="button" size="lg" variant="outline" className="w-full" onClick={handleSkip}>
                Omitir
              </Button>
            </div>
          </form>
        </CardContent>
      </Form>
    </Card>
  );
}
