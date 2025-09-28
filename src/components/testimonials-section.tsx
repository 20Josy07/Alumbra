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
import { motion } from 'framer-motion';

type Testimonial = {
  name: string;
  title: string;
  comment: string;
  photoURL: string;
};

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
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
    <motion.section
      id="testimonials"
      className="bg-transparent py-20 md:py-32"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <motion.h2
            variants={itemVariants}
            className="font-headline text-3xl font-bold tracking-tight md:text-4xl"
          >
            Lo que Nuestros Usuarios Dicen
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mt-4 text-lg text-muted-foreground"
          >
            Descubre cómo Alumbra está marcando la diferencia en la comunicación.
          </motion.p>
        </div>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
        ) : testimonials.length === 0 ? (
          <motion.div
            variants={itemVariants}
            className="text-center mt-12 text-muted-foreground"
          >
            <p>Aún no hay comentarios. ¡Sé el primero en dejar uno!</p>
          </motion.div>
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
                  <motion.div className="p-4 h-full" variants={itemVariants}>
                    <Card className="h-full flex flex-col transform-gpu transition-transform duration-300 hover:scale-105">
                      <CardContent className="flex flex-1 flex-col justify-between p-6">
                        <Quote className="h-8 w-8 text-accent-foreground" />
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
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="ml-12" />
            <CarouselNext className="mr-12" />
          </Carousel>
        )}
      </div>
    </motion.section>
  );
}
