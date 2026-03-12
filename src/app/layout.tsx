import { CookiesProvider } from 'next-client-cookies/server';

// Root layout — minimal shell required by Next.js.
// All HTML structure is provided by src/app/[locale]/layout.tsx.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <CookiesProvider>{children}</CookiesProvider>;
}
