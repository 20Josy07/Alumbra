'use server';

/**
 * @fileOverview This file defines a Genkit flow for categorizing conversation topics using AI.
 *
 * - categorizeConversationTopics - An async function that takes conversation text as input and returns a list of topics.
 * - CategorizeConversationTopicsInput - The input type for the categorizeConversationTopics function.
 * - CategorizeConversationTopicsOutput - The return type for the categorizeConversationTopics function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CategorizeConversationTopicsInputSchema = z.object({
  conversationText: z
    .string()
    .describe('El texto de la conversación a categorizar.'),
});
export type CategorizeConversationTopicsInput = z.infer<
  typeof CategorizeConversationTopicsInputSchema
>;

const CategorizeConversationTopicsOutputSchema = z.object({
  topics: z
    .array(z.string())
    .describe('Una lista de temas discutidos en la conversación.'),
});
export type CategorizeConversationTopicsOutput = z.infer<
  typeof CategorizeConversationTopicsOutputSchema
>;

export async function categorizeConversationTopics(
  input: CategorizeConversationTopicsInput
): Promise<CategorizeConversationTopicsOutput> {
  return categorizeConversationTopicsFlow(input);
}

const categorizeConversationTopicsPrompt = ai.definePrompt({
  name: 'categorizeConversationTopicsPrompt',
  input: {schema: CategorizeConversationTopicsInputSchema},
  output: {schema: CategorizeConversationTopicsOutputSchema},
  prompt: `Eres un experto en IA en análisis de conversaciones. Por favor, lee el siguiente texto de conversación y categoriza los temas discutidos. Devuelve una lista de temas.

Texto de la Conversación: {{{conversationText}}}`,
});

const categorizeConversationTopicsFlow = ai.defineFlow(
  {
    name: 'categorizeConversationTopicsFlow',
    inputSchema: CategorizeConversationTopicsInputSchema,
    outputSchema: CategorizeConversationTopicsOutputSchema,
  },
  async input => {
    const {output} = await categorizeConversationTopicsPrompt(input);
    return output!;
  }
);
