'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating conversation examples related to identified risk categories.
 *
 * It includes:
 * - `generateConversationExamples`: An async function that takes conversation text as input and returns examples for each risk category.
 * - `GenerateConversationExamplesInput`: The input type for the generateConversationExamples function.
 * - `GenerateConversationExamplesOutput`: The output type for the generateConversationExamples function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateConversationExamplesInputSchema = z.object({
  conversationText: z
    .string()
    .describe('The text of the conversation to analyze.'),
  riskCategories: z
    .array(z.string())
    .describe('An array of risk categories identified in the conversation.'),
});
export type GenerateConversationExamplesInput = z.infer<
  typeof GenerateConversationExamplesInputSchema
>;

const GenerateConversationExamplesOutputSchema = z.record(
  z.string(),
  z.array(z.string()).describe('Examples from the conversation for each risk category.')
);
export type GenerateConversationExamplesOutput = z.infer<
  typeof GenerateConversationExamplesOutputSchema
>;

export async function generateConversationExamples(
  input: GenerateConversationExamplesInput
): Promise<GenerateConversationExamplesOutput> {
  return generateConversationExamplesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateConversationExamplesPrompt',
  input: {schema: GenerateConversationExamplesInputSchema},
  output: {schema: GenerateConversationExamplesOutputSchema},
  prompt: `You are an AI expert in conversation analysis, skilled at identifying specific examples related to different risk categories.

  Analyze the provided conversation text and extract 2-3 short examples for each of the following risk categories. Only include direct quotes from the text.

  Conversation Text:
  {{conversationText}}

  Risk Categories:
  {{#each riskCategories}}
  - {{this}}
  {{/each}}

  Format your response as a JSON object where each risk category is a key, and the value is an array of example sentences from the conversation.
  `,
});

const generateConversationExamplesFlow = ai.defineFlow(
  {
    name: 'generateConversationExamplesFlow',
    inputSchema: GenerateConversationExamplesInputSchema,
    outputSchema: GenerateConversationExamplesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
