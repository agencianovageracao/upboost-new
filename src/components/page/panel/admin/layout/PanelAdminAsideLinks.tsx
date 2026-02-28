'use client';

import { ChartBar, House, UserCog } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const PanelAdminAsideLinks = () => {
  const pathname = usePathname();

  return (
    <ul className='mt-8 flex w-full flex-col gap-4'>
      <li>
        <Link
          className={`flex w-full items-center gap-2 rounded-lg px-4 py-2 text-lg ${pathname === '/panel/admin' ? 'bg-theme-400 font-bold text-theme-800' : ''}`}
          href='/panel/admin'
        >
          <House />
          Início
        </Link>
      </li>
      <li>
        <Link
          className={`flex w-full items-center gap-2 rounded-lg px-4 py-2 text-lg ${pathname.startsWith('/panel/admin/users') ? 'bg-theme-400 font-bold text-theme-800' : ''}`}
          href='/panel/admin/users'
        >
          <UserCog />
          Usuários
        </Link>
      </li>
      <li>
        <Link
          className={`flex w-full items-center gap-2 rounded-lg px-4 py-2 text-lg ${pathname.startsWith('/panel/admin/statistics') ? 'bg-theme-400 font-bold text-theme-800' : ''}`}
          href='/panel/admin/statistics'
        >
          <ChartBar />
          Estastísticas Mensais
        </Link>
      </li>
    </ul>
  );
};
