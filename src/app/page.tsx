'use client';

import { Footer } from '@/components/globals/site/Footer';
import { NavbarMobile } from '@/components/globals/site/NavbarMobile';
import { ConsolePlans } from '@/components/page/home/ConsolePlans';
import { Faq } from '@/components/page/home/Faq';
import { LoadingScreen } from '@/components/globals/site/LoadingScreen';
import { Header } from '@/components/page/home/Header';
import { Plans } from '@/components/page/home/Plans';
import { GamePerformance } from '@/components/page/home/GamePerformance';
import { PrincipalTestimonial } from '@/components/page/home/PrincipalTestimonial';
import { Testimonials } from '@/components/page/home/Testimonials';
import { useEffect, useState } from 'react';

import { PageView } from '../lib/fbpixel';
import { Title } from '@/components/globals/site/Title';
import { CallToAction } from '@/components/page/home/CallToAction';

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    PageView();
  }, []);

  return (
    <>
      <LoadingScreen onDone={() => setLoaded(true)} />
      <NavbarMobile />
      <div id='inicio'>
        <Header loaded={loaded} />
      </div>
      <GamePerformance />
      <main>
        <div id='planos'>
          <Plans />
          <ConsolePlans />
        </div>
        <div id='faq'>
          <Faq />
        </div>
        <PrincipalTestimonial />
        <CallToAction />
      </main>
      <Footer />
    </>
  );
}
