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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Send, LogIn, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { motion } from 'framer-motion';

const formSchema = z.object({
  title: z.string().min(2, 'El cargo debe tener al menos 2 caracteres.'),
  comment: z
    .string()
    .min(10, 'El comentario debe tener al menos 10 caracteres.'),
});

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut'
    },
  },
};

export function FeedbackForm() {
  const { toast } = useToast();
  const { user, signInWithGoogle, logout } = useAuth();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      comment: '',
    },
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
        uid: user.uid,
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
    <motion.section
      id="feedback"
      className="bg-transparent py-20 md:py-32"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <div className="container mx-auto max-w-3xl px-4">
        <Card className="mx-auto shadow-lg">
          <CardHeader>
            <CardTitle>¡Deja tu Comentario!</CardTitle>
            {user && (
                 <CardDescription>
                    Has iniciado sesión como {user.displayName}.
                </CardDescription>
            )}
          </CardHeader>
          <CardContent>
            {user ? (
              <>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                    <div className="flex items-start gap-4">
                        <Avatar>
                        <AvatarImage src={user.photoURL || ''} alt={user.displayName || ''} />
                        <AvatarFallback>
                            {user.displayName?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                        </Avatar>
                        <div className="w-full grid gap-4">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Cargo o Rol</FormLabel>
                                <FormControl>
                                <Input
                                    placeholder="Ej: Desarrollador, Manager, etc."
                                    {...field}
                                />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
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
                        </div>
                    </div>
                  
                  <div className="flex flex-col-reverse sm:flex-row gap-2 items-center">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={logout}
                            className="w-full"
                        >
                            <LogOut className="mr-2 h-4 w-4" />
                            Cerrar sesión
                        </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className='w-full'>
                        <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                            {isSubmitting ? 'Enviando...' : 'Enviar Comentario'} <Send className="ml-2 h-4 w-4" />
                        </Button>
                    </motion.div>
                  </div>
                </form>
              </Form>
              </>
            ) : (
              <div className="text-center">
                <p className="mb-4 text-muted-foreground">Para dejar un comentario, por favor, inicia sesión.</p>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button onClick={signInWithGoogle} size="lg">
                        <LogIn className="mr-2 h-5 w-5" />
                        Iniciar Sesión con Google
                    </Button>
                </motion.div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </motion.section>
  );
}
