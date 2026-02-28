import type { APIRequestGeneric } from '@/types/api';
import type { UserType } from '@/types/user';

export const editUserProfile = async (newData: any, token: any) => {
  const request = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users/edit/profile`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        newUserData: newData,
      }),
    }
  );

  const response: APIRequestGeneric<{ user: UserType }> = await request.json();

  if (response.status !== 200 || !response.data) return null;

  return response.data.user;
};

export const deleteUser = async (userId: string, token: string) => {
  const request = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users/delete/${userId}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const response: APIRequestGeneric<{ user: UserType }> = await request.json();

  if (response.status === 403) {
    return response.message;
  }

  if (response.status !== 200 || !response.data) return null;

  return response.data.user;
};

export const addPurchaseToUser = async (coupon: string, token: string) => {
  const request = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/statistics/create`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        coupon: coupon.toLowerCase(),
        type: 'PURCHASE',
      }),
    }
  );

  if (request.status !== 201) return false;

  return true;
};

export const addPurchaseIntentToUser = async (coupon: string) => {
  const request = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/statistics/create`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        coupon: coupon.toLowerCase(),
        type: 'PURCHASE_INTENTION',
      }),
    }
  );

  if (request.status !== 201) return false;

  return true;
};

export const createUser = async (data: any, token: string) => {
  const request = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users/create`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...data,
      }),
    }
  );

  const response: APIRequestGeneric<{ user: UserType }> = await request.json();

  if (response.status === 403) {
    return response.message;
  }

  if (response.status !== 201 || !response.data) return null;

  return response.data.user;
};

export const editUser = async (userId: string, data: any, token: string) => {
  const request = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/edit`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      newData: data,
      userId,
    }),
  });

  const response: APIRequestGeneric<{ user: UserType }> = await request.json();

  return response;
};
