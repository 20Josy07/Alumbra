// src/ai/flows/offer-conversation-recommendations.ts
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
    .describe('The complete conversation data to be analyzed.'),
  riskAssessment: z.string().describe('The risk assessment of the conversation.'),
  topicCategories: z.string().describe('The categorized topics of the conversation.'),
  examples: z.string().describe('Examples from the conversation.'),
});
export type OfferConversationRecommendationsInput = z.infer<
  typeof OfferConversationRecommendationsInputSchema
>;

const OfferConversationRecommendationsOutputSchema = z.object({
  recommendations: z
    .string()
    .describe(
      'AI-powered recommendations on how to improve the conversation or mitigate risks.'
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
  prompt: `You are an AI assistant designed to provide recommendations on how to improve conversations and mitigate risks.

  Based on the following conversation data, risk assessment, topic categories, and examples, provide actionable recommendations to the user.

  Conversation Data: {{{conversationData}}}
  Risk Assessment: {{{riskAssessment}}}
  Topic Categories: {{{topicCategories}}}
  Examples: {{{examples}}}

  Recommendations:`,
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
