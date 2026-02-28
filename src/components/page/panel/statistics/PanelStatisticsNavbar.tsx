'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { presetStatisticDateType } from '@/types/statistics';
import { format } from 'date-fns';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const PanelStatisticsNavbar = ({
  selectedDate,
  presets,
  fromAdmin,
}: {
  selectedDate: string;
  presets: presetStatisticDateType[];
  fromAdmin?: boolean;
}) => {
  const router = useRouter();
  const [selectedDateLabel, setSelectedDateLabel] = useState<string>('Hoje');

  useEffect(() => {
    const selectedDateLabel =
      presets.find((preset) => preset.id === selectedDate)?.label || 'Hoje';
    setSelectedDateLabel(selectedDateLabel);
  }, [presets, selectedDate]);

  return (
    <nav className='mb-10 flex h-fit min-h-[80px] items-start border-b border-b-neutral-500 py-2'>
      <div className='flex w-full items-center justify-between'>
        <div className='flex items-center gap-5'>
          {fromAdmin && (
            <button
              className='text-neutral-300'
              onClick={() => router.push('/panel/admin/users')}
            >
              <ChevronLeft size={48} />
            </button>
          )}
          <div>
            <h1 className='text-xl font-medium'>Estatísticas do usuário!</h1>
            <p className='text-sm text-neutral-300 first-letter:capitalize'>
              Exibindo resultados para {selectedDateLabel.toLowerCase()}
            </p>
          </div>
        </div>
        <Select
          defaultValue={selectedDate}
          onValueChange={(value) => {
            document.getElementById(value)?.click();
          }}
        >
          <SelectTrigger className='max-w-[350px]'>
            <SelectValue placeholder='Select' />
          </SelectTrigger>
          <SelectContent position='popper'>
            {presets.map((preset) => {
              return (
                <SelectItem key={preset.id} value={preset.id}>
                  <span>{preset.label}</span>
                  {selectedDate !== preset.id && (
                    <div className='text-[10px] text-neutral-300'>
                      {format(preset.startDate, 'dd/MM HH:mm')} -{' '}
                      {format(preset.endDate, 'dd/MM HH:mm')}
                    </div>
                  )}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>
      <div className='hidden'>
        {presets.map((preset) => {
          return (
            <Link
              key={preset.id}
              href={`?${new URLSearchParams({
                date: preset.id,
              })}`}
              id={preset.id}
              className={`text-sm text-neutral-400 transition-all hover:text-neutral-500 ${
                preset.id === selectedDate ? 'font-semibold' : ''
              }`}
            >
              {preset.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
