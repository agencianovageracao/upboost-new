'use client';

import NumberTicker from '@/components/magicui/number-ticker';
import Marquee from '@/components/magicui/marquee';
import { motion } from 'framer-motion';
import { ChevronRight, ShoppingCart, Zap } from 'lucide-react';
import Link from 'next/link';
import { ReviewCard } from './Testimonials';
import { useTranslations } from 'next-intl';

const ease = [0.22, 1, 0.36, 1] as const;

const WA_HREF =
  'https://wa.me/556592952018?text=Ol%C3%A1%2C%20quero%20fazer%20a%20an%C3%A1lise%20gratuita%20do%20meu%20PC%21%20Vou%20mandar%20minhas%20configura%C3%A7%C3%B5es%20agora.';

export const PrincipalTestimonial = () => {
  const t = useTranslations('Testimonial');
  const localizedReviews = t.raw('reviews') as { name: string; body: string }[];

  const stats = [
    { prefix: '+', value: 200, suffix: ' FPS', label: t('stat_fps_label') },
    { prefix: '+', value: 12000, suffix: '', label: t('stat_clients_label') },
    { prefix: '', value: 1, suffix: ' ms', label: t('stat_latency_label') },
    { prefix: '+', value: 10, suffix: ' países', label: t('stat_countries_label') },
  ];

  return (
    <>
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
            {t('badge')}
          </span>
          <h2 className='font-sora text-3xl font-bold max-lg:text-2xl'>
            {t('title_1')} <span className='text-theme-400'>{t('title_accent_1')}</span>
            {t('title_2')}{' '}
            <span className='text-theme-400'>{t('title_accent_2')}</span>
          </h2>
          <p className='mt-3 max-w-sm text-sm text-neutral-400'>
            {t('subtitle')}
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
          {localizedReviews.map((r, i) => (
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
            {t('see_plans')}
          </motion.button>
        </Link>
        <Link href='#faq'>
          <motion.button
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className='inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white/20 hover:bg-white/[0.07]'
          >
            {t('learn_more')}
            <ChevronRight className='h-4 w-4' />
          </motion.button>
        </Link>
      </motion.div>

    </section>

    {/* ── Análise Gratuita ── */}
    <section className='relative overflow-hidden bg-theme-800 py-20'>

      <div className='pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent' />

      <div
        aria-hidden
        className='pointer-events-none absolute inset-0'
        style={{
          background:
            'radial-gradient(ellipse 60% 70% at 75% 50%, rgba(255,211,0,0.05) 0%, transparent 65%)',
        }}
      />

      <div className='container relative z-10'>
        <div className='grid grid-cols-2 items-center gap-16 max-lg:grid-cols-1 max-lg:gap-10'>

          {/* ── Coluna esquerda: texto + CTA ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className='flex flex-col gap-6'
          >
            <span className='inline-flex w-fit items-center gap-2 rounded-full border border-theme-400/20 bg-theme-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-theme-400'>
              <Zap className='h-3 w-3' />
              {t('free_badge')}
            </span>

            <div>
              <h2 className='font-sora text-4xl font-bold leading-tight max-lg:text-3xl'>
                {t('free_title')}<br />
                <span className='text-theme-400'>{t('free_title_accent')}</span> {t('free_title_2')}
              </h2>
              <p className='mt-4 text-sm leading-relaxed text-neutral-400'>
                {t('free_body')}
              </p>
            </div>

            <div className='flex flex-col gap-3'>
              <motion.a
                href={WA_HREF}
                target='_blank'
                rel='noopener noreferrer'
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.15 }}
                className='inline-flex w-fit items-center gap-2.5 rounded-xl bg-theme-400 px-7 py-3.5 text-sm font-semibold text-theme-900 shadow-lg shadow-theme-400/15 transition-colors hover:bg-theme-400/90'
              >
                <svg className='h-4 w-4 shrink-0' viewBox='0 0 24 24' fill='currentColor'>
                  <path d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z' />
                </svg>
                {t('free_cta')}
              </motion.a>
              <p className='text-xs text-neutral-600'>{t('free_note')}</p>
            </div>
          </motion.div>

          {/* ── Coluna direita: mock de análise ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease, delay: 0.1 }}
            className='relative'
          >
            <div className='pointer-events-none absolute -inset-4 rounded-3xl bg-theme-400/5 blur-2xl' />

            <div className='relative overflow-hidden rounded-2xl border border-white/8 bg-theme-900 shadow-2xl shadow-black/50'>

              {/* Barra de título */}
              <div className='flex items-center gap-2 border-b border-white/6 bg-theme-700/40 px-4 py-3'>
                <div className='h-2.5 w-2.5 rounded-full bg-red-500/70' />
                <div className='h-2.5 w-2.5 rounded-full bg-yellow-500/70' />
                <div className='h-2.5 w-2.5 rounded-full bg-green-500/70' />
                <span className='ml-2 font-mono text-[10px] text-neutral-600'>{t('terminal_header')}</span>
              </div>

              <div className='p-5 font-mono text-xs'>

                <p className='mb-4 text-neutral-600'>
                  <span className='text-theme-400'>$</span> {t('terminal_cmd')}
                </p>

                {[
                  { label: 'CPU', value: 'Intel Core i5-10400F' },
                  { label: 'GPU', value: 'GTX 1060 6GB' },
                  { label: 'RAM', value: '16 GB DDR4 2666 MHz' },
                ].map(({ label, value }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, ease, delay: 0.25 + i * 0.08 }}
                    className='mb-1.5 flex items-center gap-2'
                  >
                    <span className='w-8 text-neutral-600'>{label}</span>
                    <span className='text-neutral-500'>→</span>
                    <span className='text-neutral-300'>{value}</span>
                  </motion.div>
                ))}

                <div className='my-4 h-px bg-white/5' />

                {[
                  { issueKey: 'issue_1', detailKey: 'issue_1_detail', color: 'text-red-400' },
                  { issueKey: 'issue_2', detailKey: 'issue_2_detail', color: 'text-orange-400' },
                  { issueKey: 'issue_3', detailKey: 'issue_3_detail', color: 'text-orange-400' },
                  { issueKey: 'issue_4', detailKey: 'issue_4_detail', color: 'text-yellow-400' },
                ].map(({ issueKey, detailKey, color }, i) => (
                  <motion.div
                    key={issueKey}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, ease, delay: 0.5 + i * 0.08 }}
                    className='mb-1.5 flex items-start gap-2'
                  >
                    <span className={`shrink-0 ${color}`}>✗</span>
                    <span className='text-neutral-400'>
                      {t(issueKey as any)}{' '}
                      <span className='text-neutral-600'>({t(detailKey as any)})</span>
                    </span>
                  </motion.div>
                ))}

                <div className='my-4 h-px bg-white/5' />

                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                  className='flex items-center justify-between rounded-lg border border-theme-400/20 bg-theme-400/5 px-3 py-2.5'
                >
                  <span className='text-theme-400'>{t('problems_found')}</span>
                  <span className='text-neutral-600'>{t('solution_available')}</span>
                </motion.div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      <div className='pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent' />
    </section>
    </>
  );
};
