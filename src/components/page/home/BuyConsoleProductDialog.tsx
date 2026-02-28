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
import { DialogClose } from '@radix-ui/react-dialog';
import { ShoppingCart, X } from 'lucide-react';
import Link from 'next/link';

export const BuyConsoleProductDialog = ({
  children,
  link,
}: {
  children: React.ReactNode;
  link: string;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Compra de pacote controle</DialogTitle>
          <DialogDescription className='text-lg text-theme-400'>
            Ao adquirir um pacote de controle, você assume ter:
          </DialogDescription>
        </DialogHeader>
        <p className='text-neutral-200'>
          Um computador ou notebook com Windows instalado (qualquer modelo
          serve).
        </p>
        <p className='text-neutral-200'>
          Um cabo para conectar o controle ao computador.
        </p>
        <p className='text-sm text-neutral-200'>
          Esses itens são essenciais para que possamos otimizar seu controle com
          a máxima eficiência!
        </p>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant='outline' className='w-full'>
              <X />
              Cancelar
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Link href={link}>
              <Button className='w-full'>
                <ShoppingCart /> Adquirir produto
              </Button>
            </Link>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
