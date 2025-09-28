import { config } from 'dotenv';
config();

import '@/ai/flows/analyze-conversation-risk.ts';
import '@/ai/flows/offer-conversation-recommendations.ts';
import '@/ai/flows/categorize-conversation-topics.ts';
import '@/ai/flows/generate-conversation-examples.ts';
import '@/ai/flows/send-notification-email-flow.ts';
