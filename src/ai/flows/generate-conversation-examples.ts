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
    .describe('El texto de la conversación a analizar.'),
  riskCategories: z
    .array(z.string())
    .describe('Un array de categorías de riesgo identificadas en la conversación.'),
});
export type GenerateConversationExamplesInput = z.infer<
  typeof GenerateConversationExamplesInputSchema
>;

const GenerateConversationExamplesOutputSchema = z.record(
  z.string(),
  z.array(z.string()).describe('Ejemplos de la conversación para cada categoría de riesgo.')
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
  prompt: `Eres un experto en IA en análisis de conversaciones, experto en identificar ejemplos específicos relacionados con diferentes categorías de riesgo.

  Analiza el texto de la conversación proporcionado y extrae 2-3 ejemplos cortos para cada una de las siguientes categorías de riesgo. Solo incluye citas directas del texto.

  Texto de la Conversación:
  {{conversationText}}

  Categorías de Riesgo:
  {{#each riskCategories}}
  - {{this}}
  {{/each}}

  Formatea tu respuesta como un objeto JSON donde cada categoría de riesgo es una clave, y el valor es un array de frases de ejemplo de la conversación.
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
