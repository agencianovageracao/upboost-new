export type UserType = {
  id: string;
  username: string;
  fullName: string;
  avatarUrl?: string;
  role: 'PARTNER' | 'ADMIN';
  token: string;
  coupon?: string;
};
