import type { APIRequestGeneric } from '@/types/api';
import type { UserType } from '@/types/user';
import { cookies } from 'next/headers';

export const getServerLocalUser = (): UserType => {
  const cookieStore = cookies();
  const userString = cookieStore.get('auth-user');
  const userToken = cookieStore.get('auth-token');

  const user = userString ? JSON.parse(userString.value) : null;

  return {
    ...user,
    token: userToken?.value,
  };
};

export const getUserProfile = async () => {
  const user = await getServerLocalUser();

  if (!user.token) {
    return null;
  }

  const request = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user.token}`,
    },
    next: {
      tags: ['user-profile'],
    },
  });

  const response: APIRequestGeneric<{ user: UserType }> = await request.json();

  if (response.status !== 200 || !response.data) return null;

  return response.data.user;
};

export const getAllUsers = async () => {
  const user = await getServerLocalUser();

  if (!user.token) {
    return null;
  }

  const request = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users/list?page=1&pageSize=100000`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
      next: {
        tags: ['users-list'],
      },
    }
  );

  const response: any = await request.json();

  console.log('🚀 ~ file: user.ts:65 ~ response:', response);

  if (!response.users) return null;

  return {
    users: response.users,
    total: response.totalRecords,
  };
};

export const listUserIds = async () => {
  const request = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users/static`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: {
        tags: ['users-ids'],
      },
    }
  );

  const response: APIRequestGeneric<{
    users: {
      id: string;
    }[];
  }> = await request.json();

  if (!response.data) return null;

  return {
    users: response.data.users,
  };
};

export const addViewToUser = async (coupon: string) => {
  const request = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/statistics/create`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        coupon: coupon.toLowerCase(),
        type: 'VIEW',
      }),
    }
  );

  if (request.status !== 201) return false;

  return true;
};
