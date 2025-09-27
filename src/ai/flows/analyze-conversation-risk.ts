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
    .describe('El texto de la conversación a analizar en busca de posibles riesgos.'),
  context: z
    .string()
    .optional()
    .describe('Contexto opcional sobre la conversación.'),
});
export type AnalyzeConversationRiskInput = z.infer<typeof AnalyzeConversationRiskInputSchema>;

const AnalyzeConversationRiskOutputSchema = z.object({
  riskAssessment: z
    .string()
    .describe('Una evaluación general del nivel de riesgo de la conversación.'),
  riskFactors: z
    .array(z.string())
    .describe('Factores de riesgo específicos identificados en la conversación.'),
  topicCategories: z
    .array(z.string())
    .describe('Categorías o temas discutidos en la conversación.'),
  examples: z
    .array(z.string())
    .describe('Ejemplos específicos de la conversación que resaltan los riesgos.'),
  recommendations: z
    .string()
    .describe('Recomendaciones para abordar los riesgos identificados.'),
});
export type AnalyzeConversationRiskOutput = z.infer<typeof AnalyzeConversationRiskOutputSchema>;

export async function analyzeConversationRisk(input: AnalyzeConversationRiskInput): Promise<AnalyzeConversationRiskOutput> {
  return analyzeConversationRiskFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeConversationRiskPrompt',
  input: {schema: AnalyzeConversationRiskInputSchema},
  output: {schema: AnalyzeConversationRiskOutputSchema},
  prompt: `Eres un experto en IA en analizar conversaciones para detectar posibles riesgos.

  Analiza la siguiente conversación en busca de posibles riesgos. Considera el contexto proporcionado, si lo hay.

  Conversación: {{{conversation}}}

  Contexto: {{{context}}}

  Proporciona una evaluación general del riesgo, identifica factores de riesgo específicos, clasifica los temas discutidos, proporciona ejemplos de la conversación que resalten los riesgos y ofrece recomendaciones para abordar los riesgos identificados.

  Formatea tu respuesta como un objeto JSON con las siguientes claves:
  - riskAssessment: Una evaluación general del nivel de riesgo de la conversación.
  - riskFactors: Factores de riesgo específicos identificados en la conversación.
  - topicCategories: Categorías o temas discutidos en la conversación.
  - examples: Ejemplos específicos de la conversación que resaltan los riesgos.
  - recommendations: Recomendaciones para abordar los riesgos identificados.`,
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
