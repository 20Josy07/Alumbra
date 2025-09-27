import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Support & FAQ',
};

const faqs = [
  {
    question: 'Is my data safe and private?',
    answer:
      "Absolutely. We prioritize your privacy. Conversations are processed by our AI and are not stored on our servers. The analysis is a stateless transaction. For more details, please see our Privacy Policy.",
  },
  {
    question: 'How accurate is the AI analysis?',
    answer:
      'Our AI uses advanced models like Google\'s Gemini to provide high-quality analysis. However, it\'s important to remember that it is a tool for guidance. The interpretation of nuance can vary, and the AI\'s output should be considered a starting point for your own reflection.',
  },
  {
    question: 'What kind of conversations can I analyze?',
    answer:
      'You can analyze any text-based conversation. It\'s particularly useful for professional settings like performance reviews, client negotiations, team meetings, or even personal discussions where communication clarity is key.',
  },
  {
    question: 'Why is there a character limit?',
    answer:
      'The character limit ensures responsive performance and manages the computational costs of the AI analysis. For very long conversations, we recommend analyzing them in smaller, coherent sections.',
  },
  {
    question: 'What is the "Optional Context" field for?',
    answer:
      'Providing context (e.g., "This is a salary negotiation" or "A discussion between a therapist and a client") helps the AI understand the specific setting and potential nuances, leading to a more accurate and relevant analysis.',
  },
  {
    question: 'Who is Alumbra for?',
    answer:
      'Alumbra is for anyone looking to improve their communication skills. This includes managers, HR professionals, sales teams, customer support agents, therapists, and individuals who want to gain deeper insight into their personal interactions.',
  },
];

export default function SupportPage() {
  return (
    <div className="bg-background py-16 md:py-24">
      <div className="container mx-auto max-w-3xl px-4">
        <header className="text-center">
          <h1 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">
            Support & FAQ
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Have questions? We're here to help.
          </p>
        </header>

        <div className="mt-12">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-lg hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold">Still have questions?</h2>
          <p className="mt-2 text-muted-foreground">
            Contact our support team and we'll be happy to assist you.
          </p>
          <a
            href="mailto:support@alumbra.example.com"
            className="mt-4 inline-block text-lg font-medium text-primary hover:underline"
          >
            support@alumbra.example.com
          </a>
        </div>
      </div>
    </div>
  );
}
