'use client';

import { Footer } from '@/components/globals/site/Footer';
import { Navbar } from '@/components/globals/site/Navbar';
import { ConsolePlans } from '@/components/page/home/ConsolePlans';
import { Faq } from '@/components/page/home/Faq';
import { LoadingScreen } from '@/components/globals/site/LoadingScreen';
import { Header } from '@/components/page/home/Header';
import { Plans } from '@/components/page/home/Plans';
import { GamePerformance } from '@/components/page/home/GamePerformance';
import { PrincipalTestimonial } from '@/components/page/home/PrincipalTestimonial';
import { useEffect, useState } from 'react';

import { PageView } from '../lib/fbpixel';
import { Title } from '@/components/globals/site/Title';
import { CallToAction } from '@/components/page/home/CallToAction';
import { VideoComparison } from '@/components/page/home/VideoComparison';

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
      <VideoComparison />
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
    </>
  );
}
