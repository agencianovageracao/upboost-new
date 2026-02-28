'use server';

import { revalidatePath, revalidateTag } from 'next/cache';

export const revalidateStatisticsPage = () => {
  revalidatePath('/panel/analytics');
  revalidatePath('/panel/admin');
  revalidateTag('statistics-date');
  revalidateTag('statistics-date-admin');
};

export const revalidateUsers = () => {
  revalidateTag('users-list');
};
