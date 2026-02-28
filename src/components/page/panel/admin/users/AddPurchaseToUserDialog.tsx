'use client';
import { revalidateStatisticsPage } from '@/actions/revalidate';
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
import { addPurchaseToUser } from '@/functions/user.client';
import { useToast } from '@/hooks/use-toast';
import type { UserType } from '@/types/user';
import { DialogClose } from '@radix-ui/react-dialog';
import { FilePlus, X } from 'lucide-react';
import { useCookies } from 'next-client-cookies';

export const AddPurchaseToUserDialog = ({
  children,
  user,
}: {
  children: React.ReactNode;
  user: UserType;
}) => {
  const cookie = useCookies();
  const { toast } = useToast();

  const token = cookie.get('auth-token') || '';

  const onAddPurchaseToUser = async () => {
    if (!user) return;
    if (!token) return;

    try {
      const response = await addPurchaseToUser(
        !!user.coupon ? user.coupon : '',
        token
      );

      if (response) {
        toast({
          title: 'Compra adicionada ao usuário com sucesso',
          duration: 1000,
          variant: 'success',
        });
        revalidateStatisticsPage();
      } else {
        toast({
          title: 'Erro ao adicionar compra ao usuário',
          description: response,
          duration: 1000,
          variant: 'error',
        });
      }
    } catch (error) {
      toast({
        title: 'Erro ao adicionar compra ao usuário',
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
            Deseja adicionar uma compra para o usuário <b>{user.fullName}</b>?
          </DialogTitle>
          <DialogDescription>
            Você está prestes a realizar uma ação que não pode ser desfeita. Ao
            prosseguir, uma compra será adicionada ao cadastro do usuário.
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
              onClick={onAddPurchaseToUser}
              className='text-md bg-green-500 text-white hover:bg-green-600'
              size='sm'
            >
              <FilePlus size={18} />
              Adicionar compra
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
