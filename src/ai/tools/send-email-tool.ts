'use server';

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const SendEmailSchema = z.object({
    to: z.string().email(),
    subject: z.string(),
    text: z.string(),
});

export const sendEmailTool = ai.defineTool(
    {
        name: 'sendEmail',
        description: 'Sends an email to a specified recipient using a Make.com webhook.',
        inputSchema: SendEmailSchema,
        outputSchema: z.void(),
    },
    async (input) => {
        const webhookUrl = 'https://hook.us2.make.com/avb48q3eeobydo91dcod0af66sxwyjvs';

        try {
            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    to: input.to,
                    subject: input.subject,
                    text: input.text,
                }),
            });

            if (!response.ok) {
                const errorBody = await response.text();
                throw new Error(`Webhook request failed with status ${response.status}: ${errorBody}`);
            }

            console.log('Successfully sent email data to Make.com webhook.');

        } catch (error) {
            console.error('Failed to send email via webhook:', error);
            // Depending on requirements, you might want to throw an error here
            // to let the calling flow know that the email failed to send.
            throw new Error(`Failed to send email: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
);
