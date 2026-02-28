'use client';

import { revalidateUsers } from '@/actions/revalidate';
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
import { deleteUser, editUserProfile } from '@/functions/user.client';
import { useToast } from '@/hooks/use-toast';
import type { UserType } from '@/types/user';
import { DialogClose } from '@radix-ui/react-dialog';
import { Trash, X } from 'lucide-react';
import { useCookies } from 'next-client-cookies';

export const DeleteUserDialog = ({
  children,
  user,
}: {
  children: React.ReactNode;
  user: UserType;
}) => {
  const cookie = useCookies();
  const { toast } = useToast();

  const token = cookie.get('auth-token') || '';

  const onDeleteUser = async () => {
    if (!user) return;
    if (!token) return;

    try {
      const response = await deleteUser(user.id, token);

      if (response && typeof response !== 'string') {
        toast({
          title: 'Usuário deletado com sucesso',
          duration: 1000,
          variant: 'success',
        });

        revalidateUsers();
      } else if (typeof response === 'string') {
        toast({
          title: 'Erro ao deletar o usuário',
          description: response,
          duration: 1000,
          variant: 'error',
        });
      } else {
        toast({
          title: 'Erro ao deletar o usuário',
          duration: 1000,
          variant: 'error',
        });
      }
    } catch (error) {
      toast({
        title: 'Erro ao deletar o usuário',
        duration: 1000,
        variant: 'error',
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='avatar-dialog w-full'>
        <DialogHeader>
          <DialogTitle>
            Deseja excluir o usuário <b>{user.fullName}</b>?
          </DialogTitle>
          <DialogDescription>
            Você está prestes a realizar uma ação que não pode ser desfeita. Ao
            prosseguir, todas as informações associadas serão permanentemente
            excluídas e não poderão ser recuperadas.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className='flex items-center justify-end gap-2'>
          <DialogClose asChild>
            <Button className='text-md' variant='panelGhost' size='sm'>
              <X />
              Cancelar
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              onClick={onDeleteUser}
              className='text-md bg-theme-100 text-white hover:bg-red-600'
              size='sm'
            >
              <Trash size={18} />
              Deletar usuário
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
