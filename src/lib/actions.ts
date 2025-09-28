'use server';
import {
  analyzeConversationRisk,
  type AnalyzeConversationRiskInput,
} from '@/ai/flows/analyze-conversation-risk';
import { z } from 'zod';

const formSchema = z.object({
  conversation: z
    .string()
    .min(50, 'La conversación debe tener al menos 50 caracteres.')
    .max(5000, 'La conversación debe tener menos de 5000 caracteres.'),
  context: z
    .string()
    .max(1000, 'El contexto debe tener menos de 1000 caracteres.')
    .optional(),
  emergencyEmail: z.string().email().optional().or(z.literal('')),
});

export async function performAnalysis(input: AnalyzeConversationRiskInput) {
  const validatedInput = formSchema.safeParse(input);

  if (!validatedInput.success) {
    return {
      data: null,
      error: 'Entrada no válida. Por favor, revisa el texto de tu conversación e inténtalo de nuevo.',
    };
  }

  try {
    const result = await analyzeConversationRisk(validatedInput.data);
    return { data: result, error: null };
  } catch (error) {
    console.error('Error de Análisis:', error);
    return {
      data: null,
      error:
        'No se pudo analizar la conversación. El modelo de IA puede estar sobrecargado. Por favor, inténtalo de nuevo más tarde.',
    };
  }
}
