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
import { Quote, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';

type Testimonial = {
  name: string;
  title: string;
  comment: string;
  photoURL: string;
};

export function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const feedbackCol = collection(db, 'feedback');
        const q = query(feedbackCol, orderBy('createdAt', 'desc'), limit(10));
        const querySnapshot = await getDocs(q);
        const fetchedTestimonials = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            name: data.name,
            title: data.title,
            comment: data.comment,
            photoURL: data.photoURL,
          };
        });
        setTestimonials(fetchedTestimonials);
      } catch (error) {
        console.error("Error fetching testimonials: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <section className="bg-secondary/50 py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">
            Lo que Nuestros Usuarios Dicen
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Descubre cómo Alumbra está marcando la diferencia en la comunicación.
          </p>
        </div>
        {loading ? (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
        ) : testimonials.length === 0 ? (
            <div className="text-center mt-12 text-muted-foreground">
                <p>Aún no hay comentarios. ¡Sé el primero en dejar uno!</p>
            </div>
        ) : (
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
                          "{testimonial.comment}"
                        </p>
                        <div className="flex items-center">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={testimonial.photoURL} alt={testimonial.name} />
                            <AvatarFallback>{testimonial.name?.charAt(0).toUpperCase()}</AvatarFallback>
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
        )}
      </div>
    </section>
  );
}
