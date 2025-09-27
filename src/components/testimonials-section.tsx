'use client';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Quote } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const testimonials = [
  {
    name: 'Sarah L.',
    title: 'Project Manager',
    quote:
      "Alumbra helped me navigate a difficult performance review. The recommendations were spot-on and allowed me to approach the conversation with more confidence and clarity.",
    avatar: PlaceHolderImages.find(p => p.id === 'avatar1')?.imageUrl,
    fallback: 'SL',
  },
  {
    name: 'David C.',
    title: 'Startup Founder',
    quote:
      "As a founder, I'm constantly in high-stakes conversations. This tool is invaluable for debriefing investor pitches and team meetings. It's like having a communications coach on demand.",
    avatar: PlaceHolderImages.find(p => p.id === 'avatar2')?.imageUrl,
    fallback: 'DC',
  },
  {
    name: 'Maria G.',
    title: 'HR Business Partner',
    quote:
      'We use Alumbra to train our managers on effective communication. The ability to analyze real (anonymized) conversations and see concrete examples is a game-changer.',
    avatar: PlaceHolderImages.find(p => p.id === 'avatar3')?.imageUrl,
    fallback: 'MG',
  },
];

export function TestimonialsSection() {
  return (
    <section className="bg-secondary/50 py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">
            Trusted by Professionals
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            See how Alumbra is making a difference in professional communication.
          </p>
        </div>
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="mx-auto mt-12 w-full max-w-4xl"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem
                key={index}
                className="md:basis-1/2 lg:basis-1/2"
              >
                <div className="p-4">
                  <Card className="h-full">
                    <CardContent className="flex h-full flex-col justify-between p-6">
                      <Quote className="h-8 w-8 text-accent" />
                      <p className="my-4 flex-grow text-base text-muted-foreground">
                        {testimonial.quote}
                      </p>
                      <div className="flex items-center">
                        <Avatar className="h-12 w-12">
                           <AvatarImage src={testimonial.avatar} alt={testimonial.name} data-ai-hint="person face" />
                          <AvatarFallback>{testimonial.fallback}</AvatarFallback>
                        </Avatar>
                        <div className="ml-4">
                          <p className="font-semibold text-foreground">
                            {testimonial.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {testimonial.title}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="ml-12" />
          <CarouselNext className="mr-12" />
        </Carousel>
      </div>
    </section>
  );
}
