import { getAllUsers } from '@/functions/user';
import { usersColumns } from './columns';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { NewUserDialog } from '@/components/page/panel/admin/users/NewUserDialog';
import { DataTable } from '@/components/ui/data-table';

export default async function AdminUsersPage() {
  const users = await getAllUsers();
  console.log('🚀 ~ file: page.tsx:10 ~ users:', users);

  return (
    <div>
      <nav className='mb-10 flex h-fit min-h-[80px] items-center justify-between border-b border-b-neutral-500 py-2'>
        <div>
          <h1 className='text-xl font-medium'>Usuários do sistema!</h1>
          <p className='text-sm text-neutral-300 first-letter:capitalize'>
            {users && users?.total > 10
              ? `Exibindo 10 de ${users.total} resultados`
              : `Exibindo ${users?.total} resultados`}
          </p>
        </div>
        <NewUserDialog>
          <Button size='sm'>
            <Plus />
            Criar novo
          </Button>
        </NewUserDialog>
      </nav>
      <main>
        <DataTable
          columns={usersColumns}
          data={users ? users?.users : []}
          pagination={true}
        />
      </main>
    </div>
  );
}
