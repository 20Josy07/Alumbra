'use client';

import { useState, useEffect, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { performAnalysis } from '@/lib/actions';
import { AnalysisResults } from './analysis-results';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
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
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import type { AnalyzeConversationRiskOutput } from '@/ai/flows/analyze-conversation-risk';
import { Card, CardContent } from './ui/card';

const formSchema = z.object({
  conversation: z
    .string()
    .min(50, 'La conversación debe tener al menos 50 caracteres.')
    .max(5000, 'La conversación debe tener menos de 5000 caracteres.'),
  context: z
    .string()
    .max(500, 'El contexto debe tener menos de 500 caracteres.')
    .optional(),
});

const LOCAL_STORAGE_KEY = 'alumbra-context';

export function AnalysisSection() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<AnalyzeConversationRiskOutput | null>(
    null
  );
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      conversation: '',
      context: '',
    },
  });

  useEffect(() => {
    try {
      const savedContext = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedContext) {
        form.setValue('context', savedContext);
      }
    } catch (error) {
      console.warn('No se pudo acceder al almacenamiento local.');
    }
  }, [form]);

  const contextValue = form.watch('context');

  useEffect(() => {
    try {
      if (contextValue !== undefined) {
        localStorage.setItem(LOCAL_STORAGE_KEY, contextValue);
      }
    } catch (error) {
      console.warn('No se pudo acceder al almacenamiento local.');
    }
  }, [contextValue]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setResult(null);
    startTransition(async () => {
      const { data, error } = await performAnalysis(values);
      if (error) {
        toast({
          variant: 'destructive',
          title: 'Análisis Fallido',
          description: error,
        });
      } else if (data) {
        setResult(data);
      }
    });
  };

  return (
    <section id="analysis-section" className="py-20 md:py-32 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">
            Analiza Tu Conversación
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Pega una conversación a continuación para comenzar. Añade contexto opcional para un análisis más preciso.
          </p>
        </div>
        <Card className="mx-auto mt-12 max-w-3xl shadow-lg">
          <CardContent className="p-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="conversation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg">Texto de la Conversación</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Pega tu conversación aquí..."
                          className="min-h-[200px] text-base"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="context"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg">
                        Contexto Opcional
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ej: Una evaluación de desempeño con un subordinado."
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Proporcionar contexto ayuda a la IA a comprender los matices de la conversación.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={isPending}
                >
                  {isPending && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {isPending ? 'Analizando...' : 'Analizar Conversación'}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <div className="mx-auto mt-12 max-w-3xl">
          {isPending && (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <p className="mt-4 text-lg font-semibold">
                La IA está analizando tu texto...
              </p>
              <p className="text-muted-foreground">Esto puede tardar un momento.</p>
            </div>
          )}
          {result && <AnalysisResults results={result} />}
        </div>
      </div>
    </section>
  );
}
