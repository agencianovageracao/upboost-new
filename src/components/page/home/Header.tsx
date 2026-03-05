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
            Input lag, queda de FPS, stutter no clutch — isso custa rounds. A
            UPBOOST otimiza seu Windows em até 20 minutos e você sente na
            primeira partida.
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

          {/* Social proof — redesigned */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={loaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.6, ease, delay: 0.65 }}
            className='flex flex-wrap items-center justify-center gap-2'
          >
            {/* Rating pill */}
            <div className='flex items-center gap-2 rounded-full border border-white/8 bg-white/[0.03] px-4 py-2'>
              <span className='text-xs font-bold text-theme-400'>★★★★★</span>
              <span className='h-3 w-px bg-white/10' />
              <span className='text-xs text-neutral-500'>
                <NumberTicker className='font-semibold text-neutral-300' value={12000} />
                <span className='text-neutral-500'>+ clientes</span>
              </span>
            </div>

            {/* Divider */}
            <span className='h-4 w-px bg-white/8 max-sm:hidden' />

            {/* Game tags */}
            <div className='flex items-center gap-1.5'>
              {['FiveM', 'CS2', 'Valorant', 'Fortnite', 'Warzone'].map((g) => (
                <span
                  key={g}
                  className='rounded-md border border-white/[0.06] bg-white/[0.03] px-2 py-1 text-[10px] font-medium text-neutral-600'
                >
                  {g}
                </span>
              ))}
              <span className='text-[10px] text-neutral-700'>+</span>
            </div>
          </motion.div>
        </div>
      </header>
    </>
  );
};
