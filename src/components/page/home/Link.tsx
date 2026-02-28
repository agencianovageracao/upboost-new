'use client';

import { useToast } from '@/hooks/use-toast';
import copy from 'clipboard-copy';
import { Copy } from 'lucide-react';

export const LinkTest = ({ coupon }: { coupon: string }) => {
  const { toast } = useToast();
  return (
    <button
      className='flex items-center gap-2 text-theme-400'
      onClick={async () => {
        try {
          await copy(`https://upboost.pro?coupon=${coupon}`);
          toast({
            variant: 'success',
            title: 'Link copiado com sucesso!',
            description: 'Você pode compartilhar esse link com os amigos!',
            duration: 1000,
          });
        } catch (error) {
          console.error('Failed to copy text to clipboard', error);
        }
      }}
    >
      <Copy /> Copiar meu link
    </button>
  );
};
