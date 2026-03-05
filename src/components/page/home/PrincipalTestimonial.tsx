'use client';

import NumberTicker from '@/components/magicui/number-ticker';
import Marquee from '@/components/magicui/marquee';
import { motion } from 'framer-motion';
import { ChevronRight, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { ReviewCard, reviews } from './Testimonials';

const ease = [0.22, 1, 0.36, 1] as const;

const stats = [
  { prefix: '+', value: 200, suffix: ' FPS', label: 'de ganho médio' },
  { prefix: '+', value: 4000, suffix: '', label: 'clientes' },
  { prefix: '-', value: 10, suffix: ' ms', label: 'de input lag' },
  { prefix: '+', value: 10, suffix: ' países', label: 'atendidos' },
];

export const PrincipalTestimonial = () => (
  <section id='sobrenos' className='overflow-hidden bg-theme-900 py-20'>
    <div className='container'>
      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease }}
        className='mb-12 flex flex-col items-center text-center'
      >
        <span className='mb-5 inline-flex items-center gap-2 rounded-full border border-theme-400/20 bg-theme-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-theme-400'>
          <span className='h-1.5 w-1.5 animate-pulse rounded-full bg-theme-400' />
          Prova social
        </span>
        <h2 className='font-sora text-3xl font-bold max-lg:text-2xl'>
          Resultados <span className='text-theme-400'>reais</span>, de clientes{' '}
          <span className='text-theme-400'>reais</span>
        </h2>
        <p className='mt-3 max-w-sm text-sm text-neutral-400'>
          Mais de 12.000 clientes já sentiram a diferença — em FPS, em
          estabilidade e no dia a dia.
        </p>
      </motion.div>

      {/* ── Stats grid ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, ease, delay: 0.1 }}
        className='mb-12 grid grid-cols-4 gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.07] max-sm:grid-cols-2'
      >
        {stats.map(({ prefix, value, suffix, label }, i) => (
          <div
            key={i}
            className='flex flex-col items-center gap-1.5 bg-theme-900 px-6 py-7 max-sm:py-6'
          >
            <div className='flex items-baseline gap-0.5'>
              <span className='font-sora text-3xl font-bold text-white max-sm:text-2xl'>
                {prefix}
              </span>
              <NumberTicker
                className='font-sora text-3xl font-bold text-white max-sm:text-2xl'
                value={value}
              />
              {suffix && (
                <span className='ml-0.5 font-sora text-base font-bold text-theme-400 max-sm:text-sm'>
                  {suffix}
                </span>
              )}
            </div>
            <p className='text-[11px] text-neutral-500'>{label}</p>
          </div>
        ))}
      </motion.div>
    </div>

    {/* ── Marquee — full bleed ── */}
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease, delay: 0.2 }}
      className='container relative mb-12'
    >
      <Marquee className='[--duration:40s] [--gap:14px]'>
        {reviews.map((r, i) => (
          <ReviewCard key={i} {...r} className='w-[300px] max-sm:w-[240px]' />
        ))}
      </Marquee>
      <div className='pointer-events-none absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-theme-900 to-transparent' />
      <div className='pointer-events-none absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-theme-900 to-transparent' />
    </motion.div>

    {/* ── CTAs ── */}
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease, delay: 0.28 }}
      className='container flex flex-wrap justify-center gap-3'
    >
      <Link href='#planos'>
        <motion.button
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.15 }}
          className='inline-flex items-center gap-2 rounded-xl bg-theme-400 px-6 py-3 text-sm font-semibold text-theme-900 transition-colors hover:bg-theme-400/90'
        >
          <ShoppingCart className='h-4 w-4' />
          Ver planos
        </motion.button>
      </Link>
      <Link href='#faq'>
        <motion.button
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.15 }}
          className='inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white/20 hover:bg-white/[0.07]'
        >
          Saiba mais
          <ChevronRight className='h-4 w-4' />
        </motion.button>
      </Link>
    </motion.div>
  </section>
);
