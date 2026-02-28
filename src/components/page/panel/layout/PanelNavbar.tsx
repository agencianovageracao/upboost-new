'use client';

import type { UserType } from '@/types/user';
import { format, setDefaultOptions } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { usePathname } from 'next/navigation';

setDefaultOptions({
  locale: ptBR,
});
export const PanelNavbar = ({ user }: { user: UserType }) => {
  const pathname = usePathname();

  if (pathname === '/panel') {
    return (
      <nav className='mb-10 flex h-fit min-h-[80px] items-start border-b border-b-neutral-500 py-2'>
        <div>
          <h1 className='text-xl font-medium'>Olá, {user.fullName}!</h1>
          <p className='text-sm text-neutral-300 first-letter:capitalize'>
            {format(new Date(), "eeee, dd 'de' MMMM 'de' yyyy")}
          </p>
        </div>
      </nav>
    );
  }

  return '';
};
