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
    .min(50, 'Conversation must be at least 50 characters long.')
    .max(5000, 'Conversation must be less than 5000 characters.'),
  context: z
    .string()
    .max(500, 'Context must be less than 500 characters.')
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
      console.warn('Could not access local storage.');
    }
  }, [form]);

  const contextValue = form.watch('context');

  useEffect(() => {
    try {
      if (contextValue !== undefined) {
        localStorage.setItem(LOCAL_STORAGE_KEY, contextValue);
      }
    } catch (error) {
      console.warn('Could not access local storage.');
    }
  }, [contextValue]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setResult(null);
    startTransition(async () => {
      const { data, error } = await performAnalysis(values);
      if (error) {
        toast({
          variant: 'destructive',
          title: 'Analysis Failed',
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
            Analyze Your Conversation
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Paste a conversation below to get started. Add optional context for a more accurate analysis.
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
                      <FormLabel className="text-lg">Conversation Text</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Paste your conversation here..."
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
                        Optional Context
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., A performance review with a direct report."
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Providing context helps the AI understand the nuances of the conversation.
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
                  {isPending ? 'Analyzing...' : 'Analyze Conversation'}
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
                AI is analyzing your text...
              </p>
              <p className="text-muted-foreground">This may take a moment.</p>
            </div>
          )}
          {result && <AnalysisResults results={result} />}
        </div>
      </div>
    </section>
  );
}
