'use server';
import {
  analyzeConversationRisk,
  type AnalyzeConversationRiskInput,
} from '@/ai/flows/analyze-conversation-risk';
import { z } from 'zod';

const formSchema = z.object({
  conversation: z
    .string()
    .min(50, 'Conversation must be at least 50 characters long.')
    .max(5000, 'Conversation must be less than 5000 characters.'),
  context: z
    .string()
    .max(500, 'Context must be less than 500 characters.')
    .optional(),
});

export async function performAnalysis(input: AnalyzeConversationRiskInput) {
  const validatedInput = formSchema.safeParse(input);

  if (!validatedInput.success) {
    return {
      data: null,
      error: 'Invalid input. Please check your conversation text and try again.',
    };
  }

  try {
    const result = await analyzeConversationRisk(validatedInput.data);
    return { data: result, error: null };
  } catch (error) {
    console.error('Analysis Error:', error);
    return {
      data: null,
      error:
        'Failed to analyze conversation. The AI model may be overloaded. Please try again later.',
    };
  }
}
