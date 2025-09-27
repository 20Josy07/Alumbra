import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ClipboardPaste, Bot, Search, Lightbulb } from 'lucide-react';

const steps = [
  {
    icon: ClipboardPaste,
    title: '1. Paste Conversation',
    description: 'Simply copy and paste the text from your conversation into the analysis field.',
  },
  {
    icon: Search,
    title: '2. Add Context (Optional)',
    description: 'Provide a brief, optional context to help our AI deliver a more nuanced and accurate analysis.',
  },
  {
    icon: Bot,
    title: '3. Analyze with AI',
    description: 'Our powerful AI, powered by Gemini, processes your text to identify key themes, risks, and patterns.',
  },
  {
    icon: Lightbulb,
    title: '4. Get Insights',
    description: 'Receive a detailed report with risk assessments, topic categories, and actionable recommendations.',
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Get conversation insights in four simple steps.
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <Card
              key={index}
              className="transform-gpu transition-transform duration-300 hover:-translate-y-2"
            >
              <CardHeader className="items-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <step.icon className="h-8 w-8" />
                </div>
                <CardTitle>{step.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-muted-foreground">
                <p>{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
