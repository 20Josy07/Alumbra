'use server';
/**
 * @fileOverview A flow for sending a high-risk notification email.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { sendEmailTool } from '../tools/send-email-tool';

const SendNotificationEmailInputSchema = z.object({
  email: z.string().email().describe('The email address of the recipient.'),
  riskScore: z.number().describe('The risk score from the analysis.'),
});

export type SendNotificationEmailInput = z.infer<typeof SendNotificationEmailInputSchema>;

export const sendNotificationEmailFlow = ai.defineFlow(
  {
    name: 'sendNotificationEmailFlow',
    inputSchema: SendNotificationEmailInputSchema,
    outputSchema: z.void(),
  },
  async (input) => {
    const { email, riskScore } = input;

    await sendEmailTool({
      to: email,
      subject: `Alerta de Alumbra: Se ha detectado una conversación de alto riesgo`,
      text: `Hola,

Este es un mensaje automático de Alumbra para informarte que un usuario que te ha designado como contacto de emergencia ha analizado una conversación que ha sido marcada con un nivel de riesgo de ${riskScore} sobre 10.

Esto podría indicar la presencia de dinámicas de comunicación potencialmente dañinas o abusivas.

Te recomendamos que te pongas en contacto con esta persona para ofrecerle tu apoyo.

Atentamente,
El equipo de Alumbra`,
    });
  }
);
