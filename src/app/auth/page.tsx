import { redirect } from 'next/navigation';

export default function AuthRootPage() {
  return redirect('/auth/login');
}
