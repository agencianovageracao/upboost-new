'use client';

import { Footer } from '@/components/globals/site/Footer';
import { Navbar } from '@/components/globals/site/Navbar';
import { ConsolePlans } from '@/components/page/home/ConsolePlans';
import { Faq } from '@/components/page/home/Faq';
import { LoadingScreen } from '@/components/globals/site/LoadingScreen';
import { Header } from '@/components/page/home/Header';
import { Plans } from '@/components/page/home/Plans';
import { PrincipalTestimonial } from '@/components/page/home/PrincipalTestimonial';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

import { PageView } from '../lib/fbpixel';
import { Title } from '@/components/globals/site/Title';
import { CallToAction } from '@/components/page/home/CallToAction';
import { FreeAnalysisWidget } from '@/components/globals/site/FreeAnalysisWidget';

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
