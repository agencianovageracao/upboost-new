'use client';

import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type RecentStatisticType = {
  id: string;
  type: 'VIEW' | 'PURCHASE';
  createdAt: Date;
};

export const recentStatisticsColumns: ColumnDef<RecentStatisticType>[] = [
  {
    accessorKey: 'id',
    header: 'Id',
  },
  {
    accessorKey: 'type',
    header: 'Tipo',
    cell: ({ row }) => {
      return (
        <span className='w-full'>
          {row.original.type === 'VIEW'
            ? 'Visualização'
            : row.original.type === 'PURCHASE'
              ? 'Compra'
              : 'Tentativa de compra'}
        </span>
      );
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Data de registro',
    cell: ({ row }) => {
      return (
        <span className='w-full'>
          {format(row.original.createdAt, "dd/MM/yyyy 'às' HH:mm:ss")}
        </span>
      );
    },
  },
];
