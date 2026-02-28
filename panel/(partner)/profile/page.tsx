import { AvatarImageDialog } from '@/components/page/panel/profile/AvatarImageDialog';
import { AvatarFallback } from '@/components/ui/avatar';
import { getServerLocalUser } from '@/functions/user';
import { Avatar } from '@radix-ui/react-avatar';
import { Camera } from 'lucide-react';

export default async function ProfilePanelPage() {
  const user = await getServerLocalUser();

  return (
    <>
      <nav className='mb-10 flex h-fit min-h-[80px] items-start border-b border-b-neutral-500 py-2'>
        <div className='flex w-full items-center justify-between'>
          <div>
            <h1 className='text-xl font-medium'>Perfil do usuário!</h1>
            <p className='text-sm text-neutral-300 first-letter:capitalize'>
              Exibindo perfil do usuário {user.username}
            </p>
          </div>
        </div>
      </nav>
      <main className='flex flex-col items-center justify-center gap-10 text-center'>
        <div className='group relative max-w-[250px] basis-1/3 transition-all'>
          <AvatarImageDialog user={user}>
            <div className='absolute bottom-0 left-0 right-0 top-0 flex cursor-pointer items-center justify-center rounded-full bg-theme-700/50 opacity-0 transition-all group-hover:opacity-100'>
              <Camera size={72} />
            </div>
          </AvatarImageDialog>

          <Avatar>
            {user.avatarUrl ? (
              <img
                alt='Imagem de perfil'
                className='aspect-square rounded-full'
                src={`https://i.imgur.com/${user.avatarUrl}`}
              />
            ) : (
              <AvatarFallback className='h-[250px] w-[250px] text-8xl'>
                {user.fullName
                  .split(' ')
                  .slice(0, 2)
                  .map((palavra: string) => palavra.charAt(0))
                  .join('')}
              </AvatarFallback>
            )}
          </Avatar>
        </div>
        <h1>Alterar minha imagem de perfil</h1>
      </main>
    </>
  );
}
