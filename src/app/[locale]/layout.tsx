import type { Metadata } from 'next';
import { Montserrat, Sora } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import '../globals.css';

import { ptBR, enUS } from 'date-fns/locale';
import { setDefaultOptions } from 'date-fns';

import { TawkTo } from '@/components/globals/site/TawkTo';
import { SmoothScroll } from '@/components/globals/site/SmoothScroll';

import { CookiesProvider } from 'next-client-cookies/server';
import { Toaster } from '@/components/ui/toaster';
import Script from 'next/script';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
});

const sora = Sora({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sora',
});

const BASE_URL = 'https://upboost.pro';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (locale === 'en') {
    return {
      metadataBase: new URL(BASE_URL),
      title: {
        default: 'UPBOOST — PC Optimization for Gamers | +FPS, Less Input Lag',
        template: '%s | UPBOOST',
      },
      description:
        'Remotely optimize your PC in under 20 minutes. Proven FPS increase, input lag reduction, and lower DPC latency for Fortnite, FiveM, CS2, Valorant and more. +12,000 clients served.',
      keywords: [
        'PC optimization',
        'increase FPS',
        'reduce input lag',
        'optimize Windows for gaming',
        'improve PC performance',
        'remote optimization',
        'DPC latency',
        'registry tweak',
        'upboost',
        'FPS boost',
        'Fortnite optimization',
        'FiveM optimization',
        'CS2 optimization',
        'Valorant optimization',
      ],
      authors: [{ name: 'UPBOOST', url: BASE_URL }],
      creator: 'UPBOOST',
      publisher: 'UPBOOST',
      category: 'technology',
      alternates: {
        canonical: `${BASE_URL}/en`,
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
      openGraph: {
        type: 'website',
        locale: 'en_US',
        url: `${BASE_URL}/en`,
        siteName: 'UPBOOST',
        title: 'UPBOOST — PC Optimization for Gamers | +FPS, Less Input Lag',
        description:
          'Remotely optimize your PC in under 20 minutes. Guaranteed +FPS, less input lag, zero DPC latency. +12,000 clients served worldwide.',
        images: [
          {
            url: '/images/assets/og-image.jpg',
            width: 1200,
            height: 630,
            alt: 'UPBOOST — PC Optimization for Gamers',
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: 'UPBOOST — +FPS, Less Input Lag, PC Optimized in 20 min',
        description:
          'Remote PC optimization for gamers. +12,000 clients. Guaranteed FPS in your first match.',
        images: ['/images/assets/og-image.jpg'],
        creator: '@upboost_',
        site: '@upboost_',
      },
      verification: {
        other: {
          'facebook-domain-verification': 'w3all7wufpaerij65zuy0rd8mpehxx',
        },
      },
    };
  }

  return {
    metadataBase: new URL(BASE_URL),
    title: {
      default: 'UPBOOST — Otimização de PC para Gamers | +FPS, Menos Input Lag',
      template: '%s | UPBOOST',
    },
    description:
      'Otimize seu PC remotamente em até 20 minutos. Aumento comprovado de FPS, redução de input lag e DPC latency para Fortnite, FiveM, CS2, Valorant e mais. +12.000 clientes atendidos.',
    keywords: [
      'otimização de PC',
      'aumentar FPS',
      'reduzir input lag',
      'otimizar Windows para jogos',
      'melhorar desempenho PC',
      'otimização remota',
      'DPC latency',
      'registry tweak',
      'upboost',
      'FPS boost',
      'otimização Fortnite',
      'otimização FiveM',
      'otimização CS2',
      'otimização Valorant',
      'aumentar frames por segundo',
      'tirar lag do PC',
    ],
    authors: [{ name: 'UPBOOST', url: BASE_URL }],
    creator: 'UPBOOST',
    publisher: 'UPBOOST',
    category: 'technology',
    alternates: {
      canonical: BASE_URL,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale: 'pt_BR',
      url: BASE_URL,
      siteName: 'UPBOOST',
      title: 'UPBOOST — Otimização de PC para Gamers | +FPS, Menos Input Lag',
      description:
        'Otimize seu PC remotamente em até 20 minutos. +FPS garantido, menos input lag, DPC latency zerado. +12.000 clientes atendidos em todo o Brasil.',
      images: [
        {
          url: '/images/assets/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'UPBOOST — Otimização de PC para Gamers',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'UPBOOST — +FPS, Menos Input Lag, PC Otimizado em 20 min',
      description:
        'Otimização remota de PC para gamers. +12.000 clientes. FPS garantido na primeira partida.',
      images: ['/images/assets/og-image.jpg'],
      creator: '@upboost_',
      site: '@upboost_',
    },
    verification: {
      other: {
        'facebook-domain-verification': 'w3all7wufpaerij65zuy0rd8mpehxx',
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setDefaultOptions({ locale: locale === 'en' ? enUS : ptBR });

  const messages = await getMessages();

  return (
    <CookiesProvider>
      <html lang={locale === 'en' ? 'en' : 'pt-br'}>
        <Script id='fb-pixel' strategy='afterInteractive'>
          {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '772105574925428');
              fbq('track', 'PageView');
            `}
        </Script>
        <head>
          <link
            rel='apple-touch-icon'
            sizes='180x180'
            href='/images/favicon/apple-touch-icon.png'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='32x32'
            href='/images/favicon/favicon-32x32.png'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='16x16'
            href='/images/favicon/favicon-16x16.png'
          />
          <link rel='manifest' href='/images/favicon/site.webmanifest' />
          <link
            rel='mask-icon'
            href='/images/favicon/safari-pinned-tab.svg'
            color='#ffd300'
          />
          <meta name='msapplication-TileColor' content='#0c1019' />
          <meta name='theme-color' content='#0c1019' />
        </head>
        <body className={`${montserrat.className} ${sora.variable}`}>
          <NextIntlClientProvider messages={messages}>
            <SmoothScroll>{children}</SmoothScroll>
            <Toaster />
          </NextIntlClientProvider>
          <noscript>
            <img
              height='1'
              width='1'
              style={{ display: 'none' }}
              alt={'facebook pixel no script image'}
              src='https://www.facebook.com/tr?id=1002246091049642&ev=PageView&noscript=1'
            />
          </noscript>
        </body>
        <Analytics />
        <TawkTo />
      </html>
    </CookiesProvider>
  );
}
