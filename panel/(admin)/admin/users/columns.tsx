'use client';
import { AddPurchaseToUserDialog } from '@/components/page/panel/admin/users/AddPurchaseToUserDialog';
import { DeleteUserDialog } from '@/components/page/panel/admin/users/DeleteUserDialog';
import { NewUserDialog } from '@/components/page/panel/admin/users/NewUserDialog';
import { Button } from '@/components/ui/button';
import type { UserType } from '@/types/user';
import { ColumnDef } from '@tanstack/react-table';
import { ChartBar, Clipboard, Edit, FilePlus, Trash } from 'lucide-react';
import Link from 'next/link';
import copy from 'clipboard-copy';

export const usersColumns: ColumnDef<UserType>[] = [
  {
    accessorKey: 'id',
    header: 'Id',
  },
  {
    accessorKey: 'username',
    header: 'Nome de usuário',
  },
  {
    accessorKey: 'fullName',
    header: 'Nome Completo',
  },
  {
    accessorKey: 'coupon',
    header: 'Cupom',
    cell: ({ row }) => {
      return (
        <span className='w-full'>
          {row.original.coupon
            ? row.original.coupon.toUpperCase()
            : 'Não informado'}
        </span>
      );
    },
  },
  {
    accessorKey: 'role',
    header: 'Cargo',
    cell: ({ row }) => {
      return (
        <span className='w-full'>
          {row.original.role === 'ADMIN' ? 'Administrador' : 'Parceiro'}
        </span>
      );
    },
  },
  {
    accessorKey: 'userLink',
    header: 'Link do Usuário',
    cell: ({ row }) => {
      if (!!row.original.coupon) {
        return (
          <button
            onClick={async () => {
              try {
                await copy(`https://upboost.pro?coupon=${row.original.coupon}`);
              } catch (error) {
                console.error('Failed to copy text to clipboard', error);
              }
            }}
            className='flex w-full cursor-pointer items-center justify-center text-center text-theme-400 opacity-70 transition-all hover:opacity-100'
          >
            <Clipboard />
          </button>
        );
      } else {
        return <span>Sem cupom</span>;
      }
    },
  },
  {
    accessorKey: 'actions',
    header: () => {
      return <span className='block w-full text-center'>Ações</span>;
    },
    cell: ({ row }) => {
      return (
        <div className='flex items-center justify-center gap-3'>
          <NewUserDialog user={row.original}>
            <Button size='icon'>
              <Edit />
            </Button>
          </NewUserDialog>
          {!!row.original.coupon && (
            <AddPurchaseToUserDialog user={row.original}>
              <Button
                className='bg-green-500 text-white hover:bg-green-600'
                size='icon'
              >
                <FilePlus />
              </Button>
            </AddPurchaseToUserDialog>
          )}
          <DeleteUserDialog user={row.original}>
            <Button
              className='bg-theme-100 text-white hover:bg-red-600'
              size='icon'
            >
              <Trash />
            </Button>
          </DeleteUserDialog>
          <Link href={`/panel/admin/users/${row.original.id}`}>
            <Button
              className='bg-blue-500 text-white hover:bg-blue-600'
              size='icon'
            >
              <ChartBar />
            </Button>
          </Link>
        </div>
      );
    },
  },
];
