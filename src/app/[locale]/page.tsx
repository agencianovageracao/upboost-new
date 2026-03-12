'use client';

import { Footer } from '@/components/globals/site/Footer';
import { Navbar } from '@/components/globals/site/Navbar';
import { Faq } from '@/components/page/home/Faq';
import { LoadingScreen } from '@/components/globals/site/LoadingScreen';
import { Header } from '@/components/page/home/Header';
import { Plans } from '@/components/page/home/Plans';
import { PrincipalTestimonial } from '@/components/page/home/PrincipalTestimonial';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Script from 'next/script';

import { PageView } from '../../lib/fbpixel';
import { Title } from '@/components/globals/site/Title';
import { CallToAction } from '@/components/page/home/CallToAction';
import { FreeAnalysisWidget } from '@/components/globals/site/FreeAnalysisWidget';

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://upboost.pro/#organization',
      name: 'UPBOOST',
      url: 'https://upboost.pro',
      logo: {
        '@type': 'ImageObject',
        url: 'https://upboost.pro/images/brand/logo.svg',
      },
      sameAs: [
        'https://www.instagram.com/upboost_',
        'https://www.tiktok.com/@upboost_',
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        availableLanguage: 'Portuguese',
        url: 'https://wa.me/556592952018',
      },
    },
    {
      '@type': 'WebSite',
      '@id': 'https://upboost.pro/#website',
      url: 'https://upboost.pro',
      name: 'UPBOOST',
      publisher: { '@id': 'https://upboost.pro/#organization' },
      inLanguage: 'pt-BR',
    },
    {
      '@type': 'WebPage',
      '@id': 'https://upboost.pro/#webpage',
      url: 'https://upboost.pro',
      name: 'UPBOOST — Otimização de PC para Gamers | +FPS, Menos Input Lag',
      description:
        'Otimize seu PC remotamente em até 20 minutos. Aumento comprovado de FPS, redução de input lag e DPC latency. +12.000 clientes atendidos.',
      isPartOf: { '@id': 'https://upboost.pro/#website' },
      about: { '@id': 'https://upboost.pro/#organization' },
      inLanguage: 'pt-BR',
    },
    {
      '@type': 'Service',
      '@id': 'https://upboost.pro/#service',
      name: 'Otimização de PC Remota para Gamers',
      provider: { '@id': 'https://upboost.pro/#organization' },
      description:
        'Serviço de otimização remota de Windows para gamers. Aumentamos FPS, reduzimos input lag e DPC latency em até 20 minutos via AnyDesk.',
      serviceType: 'PC Optimization',
      areaServed: { '@type': 'Country', name: 'Brazil' },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Planos de Otimização',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Pacote Básico',
              description: 'Otimização básica do Windows para jogos',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Pacote Pro Plus',
              description:
                'Otimização profissional completa com tweaks avançados de kernel e registro',
            },
          },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Como é realizado o processo de otimização do Windows?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A otimização é realizada através de um aplicativo remoto, utilizando o AnyDesk. Você acompanha cada etapa em tempo real.',
          },
        },
        {
          '@type': 'Question',
          name: 'É necessário pagar mensalmente?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'O pagamento é feito apenas uma vez. A otimização será removida apenas se você formatar a máquina.',
          },
        },
        {
          '@type': 'Question',
          name: 'Quanto tempo demora o processo de otimização?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'O processo de otimização leva entre 20 e 30 minutos dependendo do plano escolhido e das configurações do PC.',
          },
        },
        {
          '@type': 'Question',
          name: 'Preciso comprar um pacote para cada jogo que eu jogo?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Não, os pacotes otimizam o Windows como um todo, beneficiando todos os seus jogos, trabalhos e a agilidade geral da máquina.',
          },
        },
      ],
    },
  ],
};

// ssr: false — Safari iOS decide bloquear autoplay ao parsear o HTML inicial.
// Como o React não inclui o atributo `muted` no SSR (bug conhecido), o Safari
// vê <video autoplay> sem muted e bloqueia. Com ssr: false, os elementos <video>
// só existem no DOM após o JS rodar, quando muted já está setado corretamente.
const GamePerformance = dynamic(
  () =>
    import('@/components/page/home/GamePerformance').then((m) => ({
      default: m.GamePerformance,
    })),
  { ssr: false }
);
const VideoComparison = dynamic(
  () =>
    import('@/components/page/home/VideoComparison').then((m) => ({
      default: m.VideoComparison,
    })),
  { ssr: false }
);

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    PageView();
  }, []);

  return (
    <>
      <Script
        id='json-ld'
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LoadingScreen onDone={() => setLoaded(true)} />
      <Navbar />
      <div id='inicio'>
        <Header loaded={loaded} />
      </div>
      <GamePerformance />
      <main>
        <CallToAction />
        <div id='planos'>
          <Plans />
        </div>
        <PrincipalTestimonial />
        <div id='faq'>
          <Faq />
        </div>
      </main>
      <Footer />
      <FreeAnalysisWidget />
    </>
  );
}
