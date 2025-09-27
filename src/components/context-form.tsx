
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from './ui/textarea';

const formSchema = z.object({
  context: z
    .string()
    .min(10, 'Por favor, proporciona un contexto más detallado (mínimo 10 caracteres).')
    .max(500, 'El contexto debe tener menos de 500 caracteres.'),
});

type ContextFormProps = {
  onSubmit: (context: string) => void;
};

export function ContextForm({ onSubmit }: ContextFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      context: '',
    },
  });

  const handleFormSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit(values.context);
  };

  return (
    <Card className="mx-auto max-w-3xl shadow-lg">
      <CardContent className="p-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleFormSubmit)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="context"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">
                    Paso 1: Describe el Contexto de la Conversación
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Ej: 'Esta es una negociación salarial con mi jefe.' o 'Una discusión con un cliente sobre un proyecto retrasado.'"
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Proporcionar un contexto claro es crucial para que la IA comprenda los matices y realice un análisis preciso.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" size="lg" className="w-full">
              Siguiente
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
