'use server';

/**
 * @fileOverview A conversation risk analysis AI agent.
 *
 * - analyzeConversationRisk - A function that handles the conversation risk analysis process.
 * - AnalyzeConversationRiskInput - The input type for the analyzeConversationRisk function.
 * - AnalyzeConversationRiskOutput - The return type for the analyzeConversationRisk function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeConversationRiskInputSchema = z.object({
  conversation: z
    .string()
    .describe('The conversation text to analyze for potential risks.'),
  context: z
    .string()
    .optional()
    .describe('Optional context about the conversation.'),
});
export type AnalyzeConversationRiskInput = z.infer<typeof AnalyzeConversationRiskInputSchema>;

const AnalyzeConversationRiskOutputSchema = z.object({
  riskAssessment: z
    .string()
    .describe('An overall assessment of the risk level of the conversation.'),
  riskFactors: z
    .array(z.string())
    .describe('Specific risk factors identified in the conversation.'),
  topicCategories: z
    .array(z.string())
    .describe('Categories or topics discussed in the conversation.'),
  examples: z
    .array(z.string())
    .describe('Specific examples from the conversation that highlight the risks.'),
  recommendations: z
    .string()
    .describe('Recommendations for addressing the identified risks.'),
});
export type AnalyzeConversationRiskOutput = z.infer<typeof AnalyzeConversationRiskOutputSchema>;

export async function analyzeConversationRisk(input: AnalyzeConversationRiskInput): Promise<AnalyzeConversationRiskOutput> {
  return analyzeConversationRiskFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeConversationRiskPrompt',
  input: {schema: AnalyzeConversationRiskInputSchema},
  output: {schema: AnalyzeConversationRiskOutputSchema},
  prompt: `You are an AI expert in analyzing conversations for potential risks.

  Analyze the following conversation for potential risks. Consider the context provided, if any.

  Conversation: {{{conversation}}}

  Context: {{{context}}}

  Provide an overall risk assessment, identify specific risk factors, categorize the topics discussed, provide examples from the conversation that highlight the risks, and offer recommendations for addressing the identified risks.

  Format your response as a JSON object with the following keys:
  - riskAssessment: An overall assessment of the risk level of the conversation.
  - riskFactors: Specific risk factors identified in the conversation.
  - topicCategories: Categories or topics discussed in the conversation.
  - examples: Specific examples from the conversation that highlight the risks.
  - recommendations: Recommendations for addressing the identified risks.`,
});

const analyzeConversationRiskFlow = ai.defineFlow(
  {
    name: 'analyzeConversationRiskFlow',
    inputSchema: AnalyzeConversationRiskInputSchema,
    outputSchema: AnalyzeConversationRiskOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
