'use client';

import { useCookies } from 'next-client-cookies';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LogoutPage() {
  const cookies = useCookies();
  const router = useRouter();

  useEffect(() => {
    cookies.remove('auth-token');
    cookies.remove('auth-user');
    router.push('/auth/login');
  }, []);
}
