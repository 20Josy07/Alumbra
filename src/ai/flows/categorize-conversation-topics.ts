// categorize-conversation-topics.ts
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
    .describe('The text of the conversation to categorize.'),
});
export type CategorizeConversationTopicsInput = z.infer<
  typeof CategorizeConversationTopicsInputSchema
>;

const CategorizeConversationTopicsOutputSchema = z.object({
  topics: z
    .array(z.string())
    .describe('A list of topics discussed in the conversation.'),
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
  prompt: `You are an AI expert in conversation analysis. Please read the following conversation text and categorize the topics discussed. Return a list of topics.

Conversation Text: {{{conversationText}}}`,
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
