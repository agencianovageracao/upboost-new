import type { APIRequestGeneric } from '@/types/api';
import { getServerLocalUser } from './user';
import type { RecentStatisticType } from '../../panel/(partner)/columns';
import type { presetStatisticDateType } from '@/types/statistics';
import type { FormattedStatisticsType } from '../../panel/(partner)/page';
import { differenceInHours, format } from 'date-fns';

export type GetDailyStatisticsDataResponse = {
  intervalStart: Date;
  purchaseCount: number;
  viewCount: number;
  purchaseIntentCount: number;
};

export const getLastStatistics = async (tokenPassed?: string) => {
  const user = await getServerLocalUser();
  let token = '';

  if (tokenPassed) {
    token = tokenPassed;
  } else {
    token = user?.token ?? '';
  }

  const request = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/statistics/recent`,
    {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
      next: {
        revalidate: 120,
      },
    }
  );
  const response: APIRequestGeneric<RecentStatisticType[]> =
    await request.json();

  if (!!response.data) {
    return response.data;
  }

  return [];
};

export const getStatisticsByDateRange = async (
  preset: presetStatisticDateType,
  tokenPassed?: string
) => {
  const user = await getServerLocalUser();
  let token = '';

  if (tokenPassed) {
    token = tokenPassed;
  } else {
    token = user?.token ?? '';
  }

  const request = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/statistics/user/${user.id}?startDate=${new Date(preset.startDate).getTime()}&endDate=${new Date(preset.endDate).getTime()}`,
    {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
      next: {
        tags: ['statistics-date'],
      },
    }
  );

  const response: APIRequestGeneric<GetDailyStatisticsDataResponse[]> =
    await request.json();

  const formattedViewStatistics: FormattedStatisticsType[] = [];
  const formattedPurchaseStatistics: FormattedStatisticsType[] = [];
  const formattedPurchaseIntentStatistics: FormattedStatisticsType[] = [];

  const diff = differenceInHours(preset.endDate, preset.startDate);

  response.data?.forEach((item) => {
    if (item.viewCount > 0) {
      formattedViewStatistics.push({
        ...item,
        intervalStart: format(
          item.intervalStart,
          diff <= 24 ? 'HH:mm' : 'dd/MM/yyyy'
        ),
      });
    }

    if (item.purchaseCount > 0) {
      formattedPurchaseStatistics.push({
        ...item,
        intervalStart: format(
          item.intervalStart,
          diff <= 24 ? 'HH:mm' : 'dd/MM/yyyy'
        ),
      });
    }

    if (item.purchaseIntentCount > 0) {
      formattedPurchaseIntentStatistics.push({
        ...item,
        intervalStart: format(
          item.intervalStart,
          diff <= 24 ? 'HH:mm' : 'dd/MM/yyyy'
        ),
      });
    }
  });

  return {
    formattedViewStatistics,
    formattedPurchaseStatistics,
    formattedPurchaseIntentStatistics,
  };
};

export const getStatisticsByDateRangeByAdmin = async (
  preset: presetStatisticDateType,
  userId: string
) => {
  const user = await getServerLocalUser();

  const request = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/statistics/user/${userId}?startDate=${new Date(preset.startDate).getTime()}&endDate=${new Date(preset.endDate).getTime()}`,
    {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
      method: 'GET',
      next: {
        tags: ['statistics-date-admin'],
      },
    }
  );

  const response: APIRequestGeneric<GetDailyStatisticsDataResponse[]> =
    await request.json();

  const formattedViewStatistics: FormattedStatisticsType[] = [];
  const formattedPurchaseStatistics: FormattedStatisticsType[] = [];
  const formattedPurchaseIntentStatistics: FormattedStatisticsType[] = [];

  const diff = differenceInHours(preset.endDate, preset.startDate);

  response.data?.forEach((item) => {
    if (item.viewCount > 0) {
      formattedViewStatistics.push({
        ...item,
        intervalStart: format(
          item.intervalStart,
          diff <= 24 ? 'HH:mm' : 'dd/MM/yyyy'
        ),
      });
    }

    if (item.purchaseCount > 0) {
      formattedPurchaseStatistics.push({
        ...item,
        intervalStart: format(
          item.intervalStart,
          diff <= 24 ? 'HH:mm' : 'dd/MM/yyyy'
        ),
      });
    }

    if (item.purchaseIntentCount > 0) {
      formattedPurchaseIntentStatistics.push({
        ...item,
        intervalStart: format(
          item.intervalStart,
          diff <= 24 ? 'HH:mm' : 'dd/MM/yyyy'
        ),
      });
    }
  });

  return {
    formattedViewStatistics,
    formattedPurchaseStatistics,
    formattedPurchaseIntentStatistics,
  };
};

export const getAdminStatistics = async (
  preset: presetStatisticDateType,
  tokenPassed?: string,
  userId?: string
) => {
  const user = await getServerLocalUser();

  const url = !!userId
    ? `${process.env.NEXT_PUBLIC_API_URL}/statistics/user/${user.id}?startDate=${new Date(preset.startDate).getTime()}&endDate=${new Date(preset.endDate).getTime()}`
    : `${process.env.NEXT_PUBLIC_API_URL}/statistics/admin?startDate=${new Date(preset.startDate).getTime()}&endDate=${new Date(preset.endDate).getTime()}`;

  const request = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${user.token}`,
    },
    method: 'GET',
    next: {
      tags: ['statistics-date-admin'],
    },
  });

  const response: APIRequestGeneric<GetDailyStatisticsDataResponse[]> =
    await request.json();

  const formattedViewStatistics: FormattedStatisticsType[] = [];
  const formattedPurchaseStatistics: FormattedStatisticsType[] = [];
  const formattedPurchaseIntentStatistics: FormattedStatisticsType[] = [];

  const diff = differenceInHours(preset.endDate, preset.startDate);

  response.data?.forEach((item) => {
    if (item.viewCount > 0) {
      formattedViewStatistics.push({
        ...item,
        intervalStart: format(
          item.intervalStart,
          diff <= 24 ? 'HH:mm' : 'dd/MM/yyyy'
        ),
      });
    }

    if (item.purchaseCount > 0) {
      formattedPurchaseStatistics.push({
        ...item,
        intervalStart: format(
          item.intervalStart,
          diff <= 24 ? 'HH:mm' : 'dd/MM/yyyy'
        ),
      });
    }

    if (item.purchaseIntentCount > 0) {
      formattedPurchaseIntentStatistics.push({
        ...item,
        intervalStart: format(
          item.intervalStart,
          diff <= 24 ? 'HH:mm' : 'dd/MM/yyyy'
        ),
      });
    }
  });

  return {
    formattedViewStatistics,
    formattedPurchaseStatistics,
    formattedPurchaseIntentStatistics,
  };
};
