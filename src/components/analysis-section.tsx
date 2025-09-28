'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { performAnalysis } from '@/lib/actions';
import { AnalysisResults } from './analysis-results';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import type { AnalyzeConversationRiskOutput } from '@/ai/flows/analyze-conversation-risk';
import { Card, CardContent } from './ui/card';
import { AnimatePresence, motion } from 'framer-motion';


const formSchema = z.object({
  conversation: z
    .string()
    .min(50, 'La conversación debe tener al menos 50 caracteres.')
    .max(5000, 'La conversación debe tener menos de 5000 caracteres.'),
  context: z
    .string()
    .min(1, 'El contexto es obligatorio.')
    .max(500, 'El contexto debe tener menos de 500 caracteres.'),
  emergencyEmail: z.string().email().optional().or(z.literal('')),
});

interface AnalysisSectionProps {
  context: string;
  emergencyEmail?: string;
}

export function AnalysisSection({ context, emergencyEmail }: AnalysisSectionProps) {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<AnalyzeConversationRiskOutput | null>(
    null
  );
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      conversation: '',
      context: context,
      emergencyEmail: emergencyEmail || '',
    },
  });

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
        if (data.riskAssessment.score >= 7 && values.emergencyEmail) {
          toast({
            title: 'Notificación de Emergencia Enviada',
            description: `Se ha enviado una alerta a ${values.emergencyEmail} debido al alto riesgo detectado.`,
          });
        }
      }
    });
  };

  return (
    <div id="analysis-section" className="w-full">
      <Card className="mx-auto mt-8 max-w-3xl shadow-lg">
        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="conversation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">
                      Paso 2: Pega la Conversación
                    </FormLabel>
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
        <AnimatePresence>
        {isPending && (
          <motion.div 
            className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            >
              <Loader2 className="h-12 w-12 text-primary" />
            </motion.div>
            <p className="mt-4 text-lg font-semibold">
              La IA está analizando tu texto...
            </p>
            <p className="text-muted-foreground">Esto puede tardar un momento.</p>
          </motion.div>
        )}
        </AnimatePresence>
        {result && <AnalysisResults results={result} />}
      </div>
    </div>
  );
}
