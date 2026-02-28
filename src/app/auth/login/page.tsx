'use client';

import { Lock, LogIn, User } from 'lucide-react';
import Image from 'next/image';
import { useCookies } from 'next-client-cookies';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';
import { authLoginFunction } from '@/functions/auth';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const authLoginFormSchema = z.object({
  username: z
    .string({
      required_error: 'O campo usuário é obrigatório',
      invalid_type_error: 'O campo usuário é obrigatório',
    })
    .min(3, 'O campo usuário precisa ter pelo menos 4 caracteres'),
  password: z
    .string({
      required_error: 'O campo senha é obrigatório',
      invalid_type_error: 'O campo senha é obrigatório',
    })
    .min(8, 'O campo senha precisa ter pelo menos 8 caracteres'),
});

export default function AuthLoginPage() {
  const cookies = useCookies();
  const { toast } = useToast();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof authLoginFormSchema>>({
    resolver: zodResolver(authLoginFormSchema),
    defaultValues: {
      username: '',
    },
  });

  const onSubmitLoginForm = async (
    values: z.infer<typeof authLoginFormSchema>
  ) => {
    setIsLoading(true);

    const response = await authLoginFunction(values.username, values.password);

    if (response.status !== 200) {
      toast({
        title: 'Erro ao realizar o login',
        description: response.message,
        duration: 1000,
        variant: 'error',
      });
      setIsLoading(false);
    } else {
      if (!!response.data) {
        cookies.set('auth-token', response.data.token);
        cookies.set('auth-user', JSON.stringify(response.data.user));

        toast({
          title: response.message,
          description: 'Estamos te redirecionando...',
          duration: 1000,
          variant: 'success',
        });

        router.push('/panel');
      }

      setIsLoading(false);
    }
  };

  return (
    <section className='flex h-screen w-screen items-center justify-center'>
      <div className='container flex flex-col items-center justify-center'>
        <Image
          src='/images/brand/logo.svg'
          alt='Logo da UpBoost'
          width={89}
          height={55}
        />
        <div className='mt-10 w-full max-w-[450px] rounded-lg bg-theme-800 p-10'>
          <h1 className='text-xl font-bold text-theme-400'>
            Seja bem vindo de volta
          </h1>
          <p className='text-sm text-neutral-300'>
            É bom te ver de volta por aqui, faça login na sua conta.
          </p>
          <Form {...form}>
            <form
              className='mt-5 flex flex-col gap-4'
              onSubmit={form.handleSubmit(onSubmitLoginForm)}
            >
              <FormField
                control={form.control}
                name='username'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='flex items-center gap-1 text-neutral-300'>
                      Nome de usuário
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Seu nome de usuário'
                        icon={<User />}
                        iconColor='neutral-400'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='flex items-center gap-1 text-neutral-300'>
                      Senha
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Sua senha'
                        icon={<Lock />}
                        type='password'
                        iconColor='neutral-400'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button loading={isLoading} className='mt-4'>
                <LogIn />
                Entrar
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}
