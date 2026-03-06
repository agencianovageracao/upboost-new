'use client';

import { ShinyDefaultButton } from '@/components/globals/site/ShinyDefaultButton';
import NumberTicker from '@/components/magicui/number-ticker';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const floatingLogos = [
  {
    item: 'cs2',
    ext: 'png',
    pos: 'top-[22%]    left-[14%]',
    rotate: -7,
    card: 86,
    logo: 52,
    delay: 0,
  },
  {
    item: 'fivem',
    ext: 'png',
    pos: 'top-[52%]    left-[11%]',
    rotate: -12,
    card: 78,
    logo: 46,
    delay: 1.3,
  },
  {
    item: 'fortnite',
    ext: 'png',
    pos: 'bottom-[8%]  left-[13%]',
    rotate: -5,
    card: 74,
    logo: 44,
    delay: 0.4,
  },
  {
    item: 'valorant',
    ext: 'svg',
    pos: 'top-[24%]    right-[13%]',
    rotate: 4,
    card: 80,
    logo: 48,
    delay: 0.7,
  },
  {
    item: 'warzone',
    ext: 'png',
    pos: 'top-[54%]    right-[11%]',
    rotate: 9,
    card: 76,
    logo: 44,
    delay: 1.9,
  },
  {
    item: 'gta',
    ext: 'webp',
    pos: 'bottom-[6%]  right-[14%]',
    rotate: 8,
    card: 86,
    logo: 52,
    delay: 1.1,
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

export const Header = ({ loaded }: { loaded: boolean }) => {
  return (
    <>
      <header className='relative bg-theme-900' style={{ paddingTop: 95 }}>
        {/* Subtle center glow */}
        <div
          aria-hidden
          className='pointer-events-none absolute inset-0'
          style={{
            background:
              'radial-gradient(ellipse 65% 120% at 50% 38%, rgba(255,211,0,0.05) 0%, transparent 65%)',
          }}
        />

        {/* ── Floating logo cards ── */}
        {floatingLogos.map(({ item, ext, pos, rotate, card, logo, delay }) => (
          /* outer div: absolute position + entrance animation */
          <motion.div
            key={item}
            aria-hidden
            className={`absolute hidden xl:block ${pos}`}
            initial={{ opacity: 0, scale: 0.75, y: 18 }}
            animate={
              loaded
                ? { opacity: 1, scale: 1, y: 0 }
                : { opacity: 0, scale: 0.75, y: 18 }
            }
            transition={{ duration: 0.6, ease, delay: 0.55 + delay * 0.32 }}
          >
            {/* inner div: continuous float loop (independent of entrance) */}
            <motion.div
              className='flex items-center justify-center rounded-2xl border border-white/10 bg-theme-700 shadow-lg shadow-black/50'
              style={{ width: card, height: card, rotate }}
              animate={{ y: [0, -14, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay,
              }}
            >
              <Image
                src={`/images/tinified/${item}.${ext}`}
                alt={item}
                width={logo}
                height={logo}
                className='pointer-events-none select-none object-contain'
                style={{ rotate: -rotate as any }}
              />
            </motion.div>
          </motion.div>
        ))}

        {/* ── Hero content ── */}
        <div className='container relative z-10 flex flex-col items-center justify-center gap-5 py-20 text-center'>
          {/* Badge */}
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            animate={loaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
            transition={{ duration: 0.55, ease, delay: 0.08 }}
            className='inline-flex items-center gap-2 rounded-full border border-theme-400/20 bg-theme-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-theme-400'
          >
            <span className='h-1.5 w-1.5 animate-pulse rounded-full bg-theme-400' />
            ⚡ +12.000 PCs otimizados
          </motion.span>

          {/* H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={loaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
            transition={{ duration: 0.65, ease, delay: 0.22 }}
            className='max-w-[680px] font-sora text-6xl font-bold leading-[1.1] tracking-tight max-xl:text-5xl max-lg:text-4xl max-sm:text-[2rem]'
          >
            Pare de perder{' '}
            <br className='hidden sm:block' />
            por culpa do{' '}
            <span className='text-theme-400'>seu PC.</span>
          </motion.h1>

          {/* Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={loaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
            transition={{ duration: 0.6, ease, delay: 0.37 }}
            className='max-w-[460px] text-sm leading-relaxed text-neutral-400 max-lg:text-xs'
          >
            Input lag, queda de FPS, stutter no clutch: isso custa rounds. A
            UPBOOST otimiza seu Windows em até 20 minutos e você sente a
            diferença na primeira partida.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={loaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.55, ease, delay: 0.5 }}
            className='mt-1'
          >
            <Link href='#planos'>
              <ShinyDefaultButton
                text='Ver planos'
                icon={<ShoppingCart />}
              />
            </Link>
          </motion.div>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={loaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.6, ease, delay: 0.65 }}
            className='flex items-center gap-2.5 rounded-full border border-white/8 bg-white/[0.03] py-2 pl-2 pr-5'
          >
            {/* Avatars */}
            <div className='flex items-center'>
              {['influencer1.jpg', 'influencer2.png', 'influencer3.jpg', 'influencer4.jpg'].map((file, i) => (
                <div
                  key={file}
                  className='relative h-8 w-8 overflow-hidden rounded-full border-2 border-theme-900'
                  style={{ marginLeft: i === 0 ? 0 : -8 }}
                >
                  <Image
                    src={`/images/influencers/${file}`}
                    alt={`Influencer ${i + 1}`}
                    fill
                    className='object-cover'
                  />
                </div>
              ))}
            </div>

            <div className='flex flex-col'>
              <span className='text-[11px] font-bold leading-none text-theme-400'>★★★★★</span>
              <span className='mt-0.5 text-xs leading-none text-neutral-400'>
                <NumberTicker className='font-semibold text-white' value={12000} />+ clientes
              </span>
            </div>
          </motion.div>
        </div>
      </header>
    </>
  );
};
