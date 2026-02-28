'use client';

import { House, LineChart, UserCog } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const PanelAsideLinks = () => {
  const pathname = usePathname();

  return (
    <ul className='mt-8 flex w-full flex-col gap-4'>
      <li>
        <Link
          className={`flex w-full items-center gap-2 rounded-lg px-4 py-2 text-lg ${pathname === '/panel' ? 'bg-theme-400 font-bold text-theme-800' : ''}`}
          href='/panel'
        >
          <House />
          Início
        </Link>
      </li>
      <li>
        <Link
          className={`flex w-full items-center gap-2 rounded-lg px-4 py-2 text-lg ${pathname === '/panel/analytics' ? 'bg-theme-400 font-bold text-theme-800' : ''}`}
          href='/panel/analytics'
        >
          <LineChart />
          Estatísticas
        </Link>
      </li>
      <li>
        <Link
          className={`flex w-full items-center gap-2 rounded-lg px-4 py-2 text-lg ${pathname === '/panel/profile' ? 'bg-theme-400 font-bold text-theme-800' : ''}`}
          href='/panel/profile'
        >
          <UserCog />
          Meus dados
        </Link>
      </li>
    </ul>
  );
};
