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
import {googleAI} from '@genkit-ai/googleai';
import { sendNotificationEmailFlow } from './send-notification-email-flow';

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
  input: {schema: AnalyzeConversationRiskInputSchema},
  output: {schema: AnalyzeConversationRiskOutputSchema},
  prompt: `Eres un psicólogo experto en dinámicas de comunicación y análisis del discurso, con la tarea de evaluar una conversación en busca de posibles riesgos de manipulación, abuso emocional o dinámicas tóxicas. Tu análisis debe ser exhaustivo, basado en evidencia y presentado de manera seria, profesional y empática. No hagas suposiciones; basa cada conclusión en el texto proporcionado.

  **Conversación a Analizar:**
  \`\`\`
  {{{conversation}}}
  \`\`\`

  **Contexto Adicional Proporcionado por el Usuario:**
  \`\`\`
  {{{context}}}
  \`\`\`

  **Instrucciones Detalladas:**

  1.  **Análisis Exhaustivo del Texto:**
      *   Lee la conversación y el contexto cuidadosamente varias veces para comprender la dinámica, el tono y los patrones de interacción.
      *   Identifica patrones de comunicación como la invalidación, el gaslighting, la culpa, el control, la crítica constante o la falta de reciprocidad.
      *   Presta atención a la dinámica de poder y cómo se manifiesta en el lenguaje.

  2.  **Evaluación de Riesgo Precisa (Puntuación y Justificación):**
      *   Asigna una puntuación de riesgo del 1 (muy bajo) al 10 (muy alto).
      *   Tu justificación debe ser el núcleo de tu análisis. No te limites a decir "el riesgo es alto por manipulación". Explica **por qué** y **cómo**, citando fragmentos específicos del texto. Por ejemplo: "La puntuación es 8, indicando un riesgo alto. Esto se basa en repetidos instances de invalidación, como cuando la Persona A dice 'estás exagerando' después de que la Persona B expresara sus sentimientos (línea 15), lo que minimiza la experiencia emocional del otro."

  3.  **Identificación de Factores de Riesgo Específicos:**
      *   En lugar de términos genéricos, usa descriptores concretos. Por ejemplo, en lugar de "Mala comunicación", usa "Comunicación pasivo-agresiva" o "Invalidación de sentimientos".
      *   Cada factor de riesgo debe ser directamente observable en el texto.

  4.  **Extracción de Ejemplos Textuales:**
      *   Selecciona citas directas y potentes que ilustren claramente los factores de riesgo que has identificado. Estos ejemplos son la evidencia que respalda tu análisis. No los parafrasees.

  5.  **Redacción de Recomendaciones Claras y Humanas:**
      *   Ofrece consejos prácticos y accionables.
      *   Utiliza un lenguaje claro, directo y empático. Evita la jerga psicológica. El objetivo es que la persona se sienta comprendida y empoderada, no juzgada.
      *   Estructura las recomendaciones con una breve introducción, seguida de una lista numerada de pasos o consejos. Por ejemplo: "Es crucial reconocer que... Aquí hay algunas recomendaciones:\n1. **Establece límites claros:** ...\n2. **Practica la comunicación asertiva:** ...".

  **Formato de Salida:**
  Tu respuesta final debe ser un objeto JSON que se adhiera estrictamente a la estructura definida. Asegúrate de que cada campo esté completo y refleje la seriedad y profundidad de tu análisis.`,
});

const analyzeConversationRiskFlow = ai.defineFlow(
  {
    name: 'analyzeConversationRiskFlow',
    inputSchema: AnalyzeConversationRiskInputSchema,
    outputSchema: AnalyzeConversationRiskOutputSchema,
    config: {
      model: googleAI.model('gemini-2.5-pro'),
    }
  },
  async (input) => {
    const { output } = await prompt(input);
    if (output) {
      if (output.riskAssessment.score >= 7 && input.emergencyEmail) {
        // Do not wait for the email to be sent to return the analysis
        sendNotificationEmailFlow({
          email: input.emergencyEmail,
          riskScore: output.riskAssessment.score,
        }).catch(console.error);
      }
    }
    return output!;
  }
);
