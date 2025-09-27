'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Send, LogIn } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const formSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres.'),
  title: z.string().min(2, 'El cargo debe tener al menos 2 caracteres.'),
  comment: z
    .string()
    .min(10, 'El comentario debe tener al menos 10 caracteres.'),
});

export function FeedbackForm() {
  const { toast } = useToast();
  const { user, signInWithGoogle } = useAuth();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.displayName || '',
      title: '',
      comment: '',
    },
    values: { // Use values to keep the form in sync with user state
        name: user?.displayName || '',
        title: '',
        comment: '',
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!user) {
        toast({
            variant: 'destructive',
            title: 'No has iniciado sesión',
            description: 'Por favor, inicia sesión para enviar comentarios.',
        });
        return;
    }
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'feedback'), {
        name: user.displayName,
        photoURL: user.photoURL,
        title: values.title,
        comment: values.comment,
        createdAt: serverTimestamp(),
      });

      toast({
        title: '¡Comentario Enviado!',
        description:
          'Gracias por tus comentarios. Los hemos recibido correctamente.',
      });
      form.reset();
    } catch (error) {
      console.error('Error adding document: ', error);
      toast({
        variant: 'destructive',
        title: 'Error al enviar',
        description: 'No se pudo guardar tu comentario. Inténtalo de nuevo.',
      });
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <section id="feedback" className="bg-background py-20 md:py-32">
      <div className="container mx-auto max-w-3xl px-4">
        <Card className="mx-auto shadow-lg">
          <CardHeader>
            <CardTitle>¡Deja tu Comentario!</CardTitle>
          </CardHeader>
          <CardContent>
            {user ? (
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={user.photoURL || ''} alt={user.displayName || ''} />
                      <AvatarFallback>
                        {user.displayName?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid w-full gap-1.5">
                       <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nombre</FormLabel>
                            <FormControl>
                              <Input {...field} readOnly className="font-semibold" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid w-full gap-1.5">
                     <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Cargo</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Ej: Desarrollador"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                 
                  <FormField
                    control={form.control}
                    name="comment"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Comentario</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Cuéntanos qué te parece Alumbra..."
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? 'Enviando...' : 'Enviar Comentario'} <Send className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </Form>
            ) : (
              <div className="text-center">
                <p className="mb-4 text-muted-foreground">Para dejar un comentario, por favor, inicia sesión.</p>
                <Button onClick={signInWithGoogle} size="lg">
                  <LogIn className="mr-2 h-5 w-5" />
                  Iniciar Sesión con Google
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
