'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import type { UserType } from '@/types/user';
import { DialogClose } from '@radix-ui/react-dialog';
import { Pencil, Plus, X } from 'lucide-react';
import { useCookies } from 'next-client-cookies';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from '@/components/ui/select';
import { createUser, editUser } from '@/functions/user.client';
import { revalidateUsers } from '@/actions/revalidate';

export const NewUserDialog = ({
  children,
  user,
}: {
  children: React.ReactNode;
  user?: UserType;
}) => {
  const cookie = useCookies();
  const { toast } = useToast();

  const token = cookie.get('auth-token') || '';

  const formCreateSchema = z.object({
    username: z.string().min(3, 'O mínimo de caracteres é 3'),
    fullName: z.string().min(3, 'O mínimo de caracteres é 3'),
    coupon: z.string().min(3, 'O mínimo de caracteres é 3').optional(),
    password: z.string().min(8, 'O mínimo de caracteres é 8'),
    role: z.enum(['PARTNER', 'ADMIN']).optional(),
  });

  const formEditSchema = z.object({
    username: z.string().min(3, 'O mínimo de caracteres é 3'),
    fullName: z.string().min(3, 'O mínimo de caracteres é 3'),
    coupon: z.string().min(3, 'O mínimo de caracteres é 3').optional(),
    role: z.enum(['PARTNER', 'ADMIN']).optional(),
  });

  const form = useForm<z.infer<typeof formCreateSchema>>({
    resolver: !!user
      ? zodResolver(formEditSchema)
      : zodResolver(formCreateSchema),
    defaultValues: {
      username: !!user ? user.username : '',
      fullName: !!user ? user.fullName : '',
      coupon: !!user ? user.coupon : '',
      password: '',
      role: !!user ? user.role : 'PARTNER',
    },
  });

  const handleSubmitForm = async (data: z.infer<typeof formCreateSchema>) => {
    if (!!data.password) {
      try {
        const userCreated = await createUser(
          { ...data, coupon: data.coupon?.toLowerCase() },
          token
        );

        if (!!userCreated) {
          toast({
            title: 'Usuário criado com sucesso',
            duration: 1000,
            variant: 'success',
          });

          document.getElementById('closeNewUserDialog')?.click();
          form.reset();
          revalidateUsers();
        } else {
          toast({
            title: 'Erro ao criar o usuário',
            duration: 1000,
            variant: 'error',
          });
        }
      } catch (error) {
        console.error('error:', error);

        toast({
          title: 'Erro ao criar o usuário',
          duration: 1000,
          variant: 'error',
        });
      }
    } else {
      if (!!user) {
        try {
          const userEdited = await editUser(
            user.id,
            { ...data, coupon: data.coupon?.toLowerCase() },
            token
          );

          if (!!userEdited && userEdited.status === 200) {
            toast({
              title: 'Usuário editado com sucesso',
              duration: 1000,
              variant: 'success',
            });

            document.getElementById('closeNewUserDialog')?.click();
            form.reset();
            revalidateUsers();
          } else {
            toast({
              title: 'Erro ao editar o usuário',
              duration: 1000,
              variant: 'error',
            });
          }
        } catch (error) {
          console.error('error:', error);

          toast({
            title: 'Erro ao editar o usuário',
            duration: 1000,
            variant: 'error',
          });
        }
      }
    }
  };

  return (
    <Dialog
      onOpenChange={(e) => {
        if (!e) {
          form.reset();
        }
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='max-h-screen overflow-y-scroll lg:min-w-[1400px]'>
        <DialogHeader>
          <DialogTitle>
            {!!user
              ? `Editando o usuário ${user.fullName}`
              : 'Criando novo usuário'}
          </DialogTitle>
          <DialogDescription>
            Libere o acesso de um parceiro ao sistema
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            className='space-y-4'
            onSubmit={form.handleSubmit(handleSubmitForm)}
          >
            <div className='flex items-center gap-5'>
              <FormField
                control={form.control}
                name='username'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>Nome de usuário</FormLabel>
                    <FormControl>
                      <Input placeholder='johndoe' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='role'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>Cargo</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className='bg-theme-700'>
                          <SelectValue placeholder='Selecione o cargo do usuário' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className='-mt-1'>
                        <SelectItem value='PARTNER'>Parceiro</SelectItem>
                        <SelectItem value='ADMIN'>Administrador</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='flex items-center gap-5'>
              <FormField
                control={form.control}
                name='fullName'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>Nome completo</FormLabel>
                    <FormControl>
                      <Input placeholder='John Doe' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='flex items-center gap-5'>
              <FormField
                control={form.control}
                name='coupon'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>Cupom do usuário</FormLabel>
                    <FormControl>
                      <Input placeholder='JOHNDOE' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {!user && (
                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem className='w-full'>
                      <FormLabel>Senha</FormLabel>
                      <FormControl>
                        <Input
                          type='password'
                          placeholder='*********************'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
            <DialogFooter className='flex items-center justify-end gap-2'>
              <DialogClose asChild>
                <Button
                  id='closeNewUserDialog'
                  className='text-md'
                  variant='panelGhost'
                  size='sm'
                >
                  <X />
                  Cancelar
                </Button>
              </DialogClose>
              <Button className='text-md' size='sm'>
                {!!user ? (
                  <>
                    <Pencil size={18} />
                    Editar usuário
                  </>
                ) : (
                  <>
                    <Plus size={18} />
                    Adicionar usuário
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
