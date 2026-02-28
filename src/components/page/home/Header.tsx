'use client';

import { ShinyDefaultButton } from '@/components/globals/site/ShinyDefaultButton';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const floatingLogos = [
  { item: 'cs2',      ext: 'png',  pos: 'top-[22%]    left-[14%]', rotate: -7,  card: 86, logo: 52, delay: 0   },
  { item: 'fivem',    ext: 'png',  pos: 'top-[52%]    left-[11%]', rotate: -12, card: 78, logo: 46, delay: 1.3 },
  { item: 'fortnite', ext: 'png',  pos: 'bottom-[8%]  left-[13%]', rotate: -5,  card: 74, logo: 44, delay: 0.4 },
  { item: 'valorant', ext: 'svg',  pos: 'top-[24%]    right-[13%]',rotate:  4,  card: 80, logo: 48, delay: 0.7 },
  { item: 'warzone',  ext: 'png',  pos: 'top-[54%]    right-[11%]',rotate:  9,  card: 76, logo: 44, delay: 1.9 },
  { item: 'gta',      ext: 'webp', pos: 'bottom-[6%]  right-[14%]',rotate:  8,  card: 86, logo: 52, delay: 1.1 },
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
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay }}
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
            Seu PC pode mais. A gente mostra.
          </motion.span>

          {/* H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={loaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
            transition={{ duration: 0.65, ease, delay: 0.22 }}
            className='max-w-[680px] font-sora text-6xl font-bold leading-[1.1] tracking-tight max-xl:text-5xl max-lg:text-4xl max-sm:text-[2rem]'
          >
            O <span className='text-theme-400'>Boost</span> que você precisa{' '}
            <br className='hidden sm:block' />
            está <span className='text-theme-400'>aqui</span>!
          </motion.h1>

          {/* Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={loaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
            transition={{ duration: 0.6, ease, delay: 0.37 }}
            className='max-w-[460px] text-sm leading-relaxed text-neutral-400 max-lg:text-xs'
          >
            Otimizamos seu PC para garantir a melhor performance em jogos e
            produtividade. Deixe para trás lag, gargalos e quedas de FPS —
            experimente uma experiência fluida como deve ser.
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
                text='Conheça nossos planos'
                icon={<ShoppingCart />}
              />
            </Link>
          </motion.div>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={loaded ? { opacity: 0.6 } : { opacity: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.65 }}
            className='flex items-center gap-3'
          >
            <div className='flex -space-x-2.5'>
              {['bg-blue-700', 'bg-violet-700', 'bg-sky-700'].map((bg, i) => (
                <div key={i} className={`h-7 w-7 rounded-full ring-2 ring-theme-900 ${bg}`} />
              ))}
            </div>
            <div className='text-left'>
              <div className='text-sm leading-none text-theme-400'>★★★★★</div>
              <p className='mt-1 text-xs text-neutral-500'>
                Mais de <span className='text-neutral-400'>300 clientes</span> satisfeitos
              </p>
            </div>
          </motion.div>
        </div>
      </header>
    </>
  );
};
