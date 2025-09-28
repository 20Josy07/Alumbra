
'use server';

/**
 * @fileOverview A conversation risk analysis AI agent.
 *
 * - analyzeConversationRisk - A function that handles the conversation risk analysis process.
 * - AnalyzeConversationRiskInput - The input type for the analyzeConversationRisk function.
 * - AnalyzeConversationRiskOutput - The return type for the analyzeConversationRisk function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';

const AnalyzeConversationRiskInputSchema = z.object({
  conversation: z
    .string()
    .describe('El texto de la conversación a analizar en busca de posibles riesgos.'),
  context: z
    .string()
    .optional()
    .describe('Contexto opcional sobre la conversación.'),
  emergencyEmail: z.string().optional().describe('Correo electrónico de contacto de emergencia para notificar en caso de riesgo alto.'),
});
export type AnalyzeConversationRiskInput = z.infer<typeof AnalyzeConversationRiskInputSchema>;

const AnalyzeConversationRiskOutputSchema = z.object({
  riskAssessment: z.object({
    score: z
      .number()
      .describe('Una puntuación numérica del 1 al 10 que representa el nivel de riesgo, basada en un análisis riguroso.'),
    justification: z
      .string()
      .describe('Una justificación detallada y específica de la puntuación de riesgo, citando evidencia del texto.'),
  }),
  riskFactors: z
    .array(z.string())
    .describe('Factores de riesgo concretos y observables identificados en la conversación.'),
  topicCategories: z
    .array(z.string())
    .describe('Categorías o temas principales discutidos en la conversación, identificados objetivamente.'),
  examples: z
    .array(z.string())
    .describe('Citas directas y textuales de la conversación que ejemplifican los riesgos identificados.'),
  recommendations: z
    .string()
    .describe('Recomendaciones prácticas y empáticas, presentadas en un lenguaje claro y comprensible. Debe ser una introducción seguida de una lista numerada.'),
});
export type AnalyzeConversationRiskOutput = z.infer<typeof AnalyzeConversationRiskOutputSchema>;

export async function analyzeConversationRisk(input: AnalyzeConversationRiskInput): Promise<AnalyzeConversationRiskOutput> {
  return analyzeConversationRiskFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeConversationRiskPrompt',
  input: { schema: AnalyzeConversationRiskInputSchema },
  output: { schema: AnalyzeConversationRiskOutputSchema },
  prompt: `Eres un psicólogo experto en análisis del discurso, con la tarea de evaluar una conversación para detectar riesgos de manipulación, abuso emocional o dinámicas tóxicas. Tu análisis debe ser profesional, empático y basado estrictamente en la evidencia del texto.

  **Conversación:**
  \`\`\`
  {{{conversation}}}
  \`\`\`

  **Contexto Adicional:**
  \`\`\`
  {{{context}}}
  \`\`\`

  **Tu Misión:**

  1.  **Evalúa el Riesgo:** Asigna una puntuación de 1 (bajo) a 10 (alto) y justifica tu decisión con ejemplos claros del texto. Explica el **porqué** y el **cómo** de tu puntuación.
  2.  **Identifica Factores Clave:** Enumera los factores de riesgo observables, como "Invalidación de sentimientos" o "Comunicación pasivo-agresiva".
  3.  **Extrae Ejemplos Directos:** Cita fragmentos textuales que respalden tu análisis. Esta es tu evidencia.
  4.  **Ofrece Recomendaciones Humanas:** Redacta consejos prácticos en un lenguaje claro y directo. Estructura la respuesta como una introducción seguida de una lista numerada.

  Procesa la solicitud y genera una respuesta en formato JSON que cumpla con el esquema de salida definido.`,
});

const analyzeConversationRiskFlow = ai.defineFlow(
  {
    name: 'analyzeConversationRiskFlow',
    inputSchema: AnalyzeConversationRiskInputSchema,
    outputSchema: AnalyzeConversationRiskOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  },
  {
    model: googleAI.model('gemini-2.5-flash'),
  }
);
