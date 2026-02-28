'use client';

import { Title } from '@/components/globals/site/Title';
import NumberTicker from '@/components/magicui/number-ticker';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Testimonials } from './Testimonials';
import Marquee from '@/components/magicui/marquee';
import Link from 'next/link';

export const PrincipalTestimonial = () => {
  const reviews = [
    {
      name: '@danielrocha',
      body: 'Po mano trabalho sensacional, joguei uma aqui de valorant senti menos input e muito mais estabilidade meu Pc já não é aqueles do melhores posso dizer q vc milagre mano valeu',
    },
    {
      name: '@gvzin',
      body: '360 fps. Cai pra 330 fps, não desce, eu jurei q isso não ia funcionar, tô a 215 fps no warzone, obrigado mano.',
    },
    {
      name: '@varelaxlz_',
      body: 'Muito bom mano. Tô rodando liso pra caramba, no criativo rodava 144 e agr tô 240. Na partida meu fps dropava muito e agora tá muito mais cravado.',
    },
    {
      name: '@gbtns',
      body: 'Caraa, 180 FPS cravados, ficou top demais, o do meu irmão também um i3 8100 GTX 1050 144 fps cravado.',
    },
    {
      name: '@felps.gma',
      body: 'Tá aí irmão, parabéns. Jogo melhorou 100%, sem input, 200 fps cravado',
    },
    {
      name: '@l3ocampos',
      body: 'Eu não tava botando fé que ia funcionar não kkkkkk. Acabou as quedas de fps total.',
    },
  ];

  const [titleRef, titleInView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const [contentRef, contentInView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const [videoRef, videoInView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  return (
    <div
      className='relative max-h-[750px] overflow-hidden bg-gradient-to-b from-theme-800 to-theme-800/95 max-lg:max-h-[100%]'
      id='sobrenos'
    >
      {/* Subtle grid background */}
      <div className='absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px]'></div>

      {/* Decorative elements */}
      <motion.div
        initial={{ width: '0%' }}
        animate={{ width: '100%' }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
        className='absolute left-1/2 top-0 h-px -translate-x-1/2 bg-gradient-to-r from-transparent via-theme-400/20 to-transparent'
      ></motion.div>

      <div className='container relative py-20 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between gap-16 max-xl:flex-col lg:gap-20'>
          {/* Content Section */}
          <div className='max-w-[800px] space-y-12'>
            {/* Title and Subtitle */}
            <div ref={titleRef} className='space-y-6'>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{
                  opacity: titleInView ? 1 : 0,
                  x: titleInView ? 0 : -50,
                }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className='space-y-2'
              >
                <span className='text-sm font-medium uppercase tracking-wider text-white'>
                  Alcance o próximo nível do seu computador
                </span>
                <h1 className='text-5xl font-bold tracking-tight text-theme-400 sm:text-6xl'>
                  Com a UPBOOST
                </h1>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{
                  opacity: titleInView ? 1 : 0,
                  x: titleInView ? 0 : -50,
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className='flex items-center gap-4'
              >
                <div className='h-px w-12 bg-theme-400/30'></div>
                <p className='text-xl font-light text-zinc-300'>
                  Elevando o desempenho do{' '}
                  <b className='text-theme-400'>seu pc</b> ao nível dos
                  profissionais
                </p>
              </motion.div>
            </div>

            <div ref={contentRef} className='space-y-8'>
              {/* Stats Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{
                  opacity: contentInView ? 1 : 0,
                  scale: contentInView ? 1 : 0.9,
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.3,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className='group relative'
              >
                <div className='absolute -inset-px rounded-xl bg-gradient-to-r from-theme-400/30 to-transparent blur-sm transition-all duration-500 group-hover:blur-md'></div>
                <div className='relative rounded-xl border border-theme-400/10 bg-zinc-800/50 p-8 backdrop-blur-sm'>
                  <div className='flex items-baseline gap-1'>
                    <span className='text-6xl font-bold tracking-tight text-theme-400 sm:text-7xl'>
                      +
                    </span>
                    <NumberTicker
                      className='text-6xl font-bold tracking-tight text-theme-400 sm:text-7xl'
                      value={200}
                    />
                    <span className='text-6xl font-bold tracking-tight text-theme-400 sm:text-7xl'>
                      FPS
                    </span>
                  </div>
                  <p className='mt-3 text-lg text-zinc-300'>
                    Aumente sua performance com nossa otimização especializada
                  </p>
                </div>
              </motion.div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: contentInView ? 1 : 0,
                  y: contentInView ? 0 : 20,
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.4,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className='text-lg leading-relaxed text-zinc-300/90'
              >
                Especialistas em otimização de PCs para gamers e profissionais
                que buscam o máximo desempenho em seus sistemas. Nosso objetivo
                é garantir mais FPS, menos input lag e uma experiência de jogo
                fluida.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: contentInView ? 1 : 0,
                  y: contentInView ? 0 : 20,
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className='flex flex-wrap gap-4 pt-4'
              >
                <Link href='#planos'>
                  <button className='group relative rounded-xl bg-theme-400 px-8 py-4 font-semibold text-zinc-900 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-theme-400/20'>
                    <span className='relative z-10'>Faça quiz agora</span>
                    <div className='absolute inset-0 rounded-xl bg-white/20 opacity-0 transition-opacity group-hover:opacity-100'></div>
                  </button>
                </Link>
                <Link href='#faq'>
                  <button className='group rounded-xl border border-zinc-700 px-8 py-4 font-semibold text-zinc-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-theme-400 hover:text-theme-400'>
                    Saiba Mais
                  </button>
                </Link>
              </motion.div>
            </div>
          </div>

          <div className='absolute right-0 top-0 flex max-xl:hidden'>
            <Testimonials />
          </div>
          <div className='hidden max-xl:block'>
            <Marquee className='items-center [--duration:20s] [--gap:20px]'>
              {reviews.map((review, index) => {
                return (
                  <div
                    className='flex max-w-[250px] flex-col justify-center rounded-lg bg-theme-800 p-5 text-left shadow-sm shadow-theme-400/20'
                    key={index}
                  >
                    <h1 className='font-sora text-2xl font-bold text-theme-400'>
                      {review.name}
                    </h1>
                    <p className='mt-2 text-sm'>&ldquo;{review.body}&rdquo;</p>
                  </div>
                );
              })}
            </Marquee>
          </div>
        </div>
      </div>
    </div>
  );
};
