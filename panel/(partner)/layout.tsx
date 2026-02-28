import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, LogOut, User } from 'lucide-react';
import Link from 'next/link';
import { getServerLocalUser } from '@/functions/user';
import { PanelNavbar } from '@/components/page/panel/layout/PanelNavbar';
import { PanelAsideLinks } from '@/components/page/panel/layout/PanelAsideLinks';
import { LinkTest } from '@/components/page/home/Link';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = getServerLocalUser();

  return (
    <main className='flex h-screen'>
      <aside className='w-full basis-1/5 p-8'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className='flex w-full items-center justify-between'>
              <div className='flex items-center gap-4'>
                <Avatar>
                  {!!user.avatarUrl ? (
                    <img
                      alt='Imagem de perfil'
                      src={`https://i.imgur.com/${user.avatarUrl}`}
                    />
                  ) : (
                    <AvatarFallback>
                      {user.fullName
                        .split(' ')
                        .slice(0, 2)
                        .map((palavra: string) => palavra.charAt(0))
                        .join('')}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div className=''>
                  <h1 className='text-lg font-bold'>{user.fullName}</h1>
                  <p className='text-sm font-light text-neutral-300'>
                    @{user.username}
                  </p>
                </div>
                <ChevronDown size={14} />
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='ml-4 mt-3 w-[300px] p-5'>
            <div className='flex flex-col gap-4'>
              {user.role === 'ADMIN' && (
                <Link className='flex items-center gap-2' href='/panel/admin'>
                  <User /> Área do administrador
                </Link>
              )}
              {user.coupon && <LinkTest coupon={user.coupon} />}
              <Link
                className='flex items-center gap-2 text-red-400'
                href='/logout'
              >
                <LogOut /> Sair
              </Link>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className='mt-8 h-[1px] w-full bg-neutral-500' />
        <PanelAsideLinks />
      </aside>
      <section className='m-4 basis-4/5 overflow-y-scroll rounded-lg bg-theme-800 p-4'>
        <PanelNavbar user={user} />
        <div>{children}</div>
      </section>
    </main>
  );
}
