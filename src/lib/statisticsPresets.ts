import {
  endOfDay,
  endOfMonth,
  endOfWeek,
  endOfYesterday,
  startOfDay,
  startOfMonth,
  startOfWeek,
  startOfYesterday,
  subMonths,
  subWeeks,
} from 'date-fns';

import { createSearchParamsCache, parseAsString } from 'nuqs/server';

export const presets = [
  {
    label: 'Hoje',
    id: 'today',
    lastPresetId: 'yesterday',
    startDate: startOfDay(new Date()),
    endDate: endOfDay(new Date()),
  },
  {
    label: 'Ontem',
    id: 'yesterday',
    startDate: startOfYesterday(),
    endDate: endOfYesterday(),
  },
  {
    label: 'Esta Semana',
    id: 'thisWeek',
    lastPresetId: 'lastWeek',
    startDate: startOfWeek(new Date()),
    endDate: endOfWeek(new Date()),
  },
  {
    label: 'Semana Passada',
    id: 'lastWeek',
    startDate: startOfWeek(subWeeks(new Date(), 1)),
    endDate: endOfWeek(subWeeks(new Date(), 1)),
  },
  {
    label: 'Este Mês',
    id: 'thisMonth',
    lastPresetId: 'lastMonth',
    startDate: startOfMonth(new Date()),
    endDate: endOfMonth(new Date()),
  },
  {
    label: 'Mês Passado',
    id: 'lastMonth',
    startDate: startOfMonth(subMonths(new Date(), 1)),
    endDate: endOfMonth(subMonths(new Date(), 1)),
  },
];

export const searchParamsCache = createSearchParamsCache({
  date: parseAsString.withDefault('today'),
});
