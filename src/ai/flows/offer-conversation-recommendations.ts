'use server';

/**
 * @fileOverview This file defines a Genkit flow for providing recommendations on how to improve a conversation or mitigate risks based on AI analysis.
 *
 * - offerConversationRecommendations - A function that takes conversation data as input and returns AI-powered recommendations.
 * - OfferConversationRecommendationsInput - The input type for the offerConversationRecommendations function.
 * - OfferConversationRecommendationsOutput - The return type for the offerConversationRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const OfferConversationRecommendationsInputSchema = z.object({
  conversationData: z
    .string()
    .describe('Los datos completos de la conversación a analizar.'),
  riskAssessment: z.string().describe('La evaluación de riesgos de la conversación.'),
  topicCategories: z.string().describe('Los temas categorizados de la conversación.'),
  examples: z.string().describe('Ejemplos de la conversación.'),
});
export type OfferConversationRecommendationsInput = z.infer<
  typeof OfferConversationRecommendationsInputSchema
>;

const OfferConversationRecommendationsOutputSchema = z.object({
  recommendations: z
    .string()
    .describe(
      'Recomendaciones impulsadas por IA sobre cómo mejorar la conversación o mitigar riesgos.'
    ),
});
export type OfferConversationRecommendationsOutput = z.infer<
  typeof OfferConversationRecommendationsOutputSchema
>;

export async function offerConversationRecommendations(
  input: OfferConversationRecommendationsInput
): Promise<OfferConversationRecommendationsOutput> {
  return offerConversationRecommendationsFlow(input);
}

const offerConversationRecommendationsPrompt = ai.definePrompt({
  name: 'offerConversationRecommendationsPrompt',
  input: {schema: OfferConversationRecommendationsInputSchema},
  output: {schema: OfferConversationRecommendationsOutputSchema},
  prompt: `Eres un asistente de IA diseñado para proporcionar recomendaciones sobre cómo mejorar las conversaciones y mitigar riesgos.

  Basándote en los siguientes datos de la conversación, evaluación de riesgos, categorías de temas y ejemplos, proporciona recomendaciones accionables al usuario.

  Datos de la Conversación: {{{conversationData}}}
  Evaluación de Riesgos: {{{riskAssessment}}}
  Categorías de Temas: {{{topicCategories}}}
  Ejemplos: {{{examples}}}

  Recomendaciones:`,
});

const offerConversationRecommendationsFlow = ai.defineFlow(
  {
    name: 'offerConversationRecommendationsFlow',
    inputSchema: OfferConversationRecommendationsInputSchema,
    outputSchema: OfferConversationRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await offerConversationRecommendationsPrompt(input);
    return output!;
  }
);
