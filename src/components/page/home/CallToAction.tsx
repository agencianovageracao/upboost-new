'use client';

import NumberTicker from '@/components/magicui/number-ticker';
import { motion } from 'framer-motion';
import {
  Cpu,
  Globe,
  Monitor,
  ShoppingCart,
  TrendingUp,
  Wifi,
  Zap,
} from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

const ease = [0.22, 1, 0.36, 1] as const;

const gameResults = [
  { name: 'Fortnite', before: 250, after: 550, boost: 63 },
  { name: 'Valorant', before: 200, after: 590, boost: 76 },
  { name: 'Warzone', before: 46, after: 180, boost: 98 },
  { name: 'R6 Siege', before: 66, after: 240, boost: 94 },
];

export const CallToAction = () => {
  const t = useTranslations('CallToAction');

  const fpsItems = [
    { icon: Zap, label: t('fps_item_1_label'), category: t('fps_item_1_cat') },
    { icon: Cpu, label: t('fps_item_2_label'), category: t('fps_item_2_cat') },
    { icon: Globe, label: t('fps_item_3_label'), category: t('fps_item_3_cat') },
    { icon: Zap, label: t('fps_item_4_label'), category: t('fps_item_4_cat') },
    { icon: Zap, label: t('fps_item_5_label'), category: t('fps_item_5_cat') },
  ];

  return (
    <section className='bg-theme-900 py-20'>
      <div className='container'>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className='mb-10 text-center'
        >
          <h2 className='font-sora text-3xl font-bold max-lg:text-2xl'>
            {t('title_1')} <span className='text-theme-400'>{t('title_accent')}</span>?
          </h2>
          <p className='mt-2 text-sm text-neutral-400'>
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className='grid grid-cols-3 gap-4 max-lg:grid-cols-2 max-sm:grid-cols-1'>
          {/* ── Card 1: Resultados por jogo — large ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease, delay: 0.05 }}
            className='border-white/8 relative col-span-2 overflow-hidden rounded-3xl border bg-theme-800 p-7 max-sm:col-span-1'
          >
            <div
              aria-hidden
              className='pointer-events-none absolute inset-0'
              style={{
                background:
                  'radial-gradient(ellipse 55% 60% at 100% 0%, rgba(255,211,0,0.05) 0%, transparent 55%)',
              }}
            />

            <div className='relative z-10 mb-5 flex items-start justify-between gap-4'>
              <div>
                <p className='text-xs font-semibold uppercase tracking-widest text-theme-400'>
                  {t('card1_label')}
                </p>
                <h3 className='mt-1 font-sora text-2xl font-bold text-white'>
                  {t('card1_title')}
                </h3>
              </div>
              <div className='border-white/8 flex shrink-0 items-center gap-1.5 rounded-full border bg-theme-900/60 px-3 py-1.5'>
                <TrendingUp className='h-3 w-3 text-theme-400' />
                <span className='text-[11px] font-semibold text-neutral-400'>
                  +FPS - INPUT LAG
                </span>
              </div>
            </div>

            <div className='relative z-10 grid grid-cols-2 gap-3 max-sm:grid-cols-1'>
              {gameResults.map(({ name, before, after, boost }, i) => (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, ease, delay: 0.18 + i * 0.09 }}
                  whileHover={{
                    scale: 1.02,
                    borderColor: 'rgba(255,211,0,0.18)',
                  }}
                  className='group relative cursor-default overflow-hidden rounded-2xl border border-white/5 bg-theme-900 p-4 transition-colors max-sm:p-3'
                >
                  <div
                    aria-hidden
                    className='pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100'
                    style={{
                      background:
                        'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,211,0,0.05) 0%, transparent 70%)',
                    }}
                  />

                  <div className='relative z-10 mb-4 flex items-center justify-between max-sm:mb-3'>
                    <span className='text-sm font-semibold text-white'>
                      {name}
                    </span>
                    <motion.span
                      animate={{ opacity: [0.75, 1, 0.75] }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        delay: i * 0.6,
                      }}
                      className='rounded-full border border-theme-400/25 bg-theme-400/10 px-2.5 py-0.5 text-[10px] font-bold text-theme-400'
                    >
                      +{boost}%
                    </motion.span>
                  </div>

                  <div className='relative z-10 flex items-end justify-between gap-3 max-sm:items-center'>
                    <div>
                      <p className='font-mono text-2xl font-bold leading-none text-neutral-700 line-through decoration-neutral-700/60'>
                        {before}
                      </p>
                      <p className='mt-0.5 text-[9px] uppercase tracking-widest text-neutral-700'>
                        {t('before')}
                      </p>
                    </div>

                    <div className='text-right'>
                      <div className='flex items-baseline justify-end gap-1'>
                        <NumberTicker
                          className='font-sora text-4xl font-bold leading-none text-theme-400'
                          value={after}
                        />
                        <span className='mb-0.5 text-xs text-neutral-500'>
                          FPS
                        </span>
                      </div>
                      <p className='mt-0.5 text-[9px] uppercase tracking-widest text-neutral-500'>
                        {t('after')}
                      </p>
                    </div>
                  </div>

                  <div className='relative z-10 mt-4 flex flex-col gap-1.5 max-sm:hidden'>
                    <div className='flex items-center gap-2'>
                      <span className='w-8 text-[9px] text-neutral-700'>
                        {t('before_short')}
                      </span>
                      <div className='h-1 flex-1 overflow-hidden rounded-full bg-theme-800'>
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${(before / after) * 100}%` }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.65,
                            ease,
                            delay: 0.35 + i * 0.09,
                          }}
                          className='h-full rounded-full bg-neutral-700'
                        />
                      </div>
                    </div>
                    <div className='flex items-center gap-2'>
                      <span className='w-8 text-[9px] text-theme-400/60'>
                        {t('after_short')}
                      </span>
                      <div className='h-1 flex-1 overflow-hidden rounded-full bg-theme-800'>
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: '100%' }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.65,
                            ease,
                            delay: 0.5 + i * 0.09,
                          }}
                          className='h-full rounded-full bg-theme-400'
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <p className='relative z-10 mt-4 text-[11px] text-neutral-700'>
              {t('card1_disclaimer')}
            </p>
          </motion.div>

          {/* ── Card 2: FPS ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease, delay: 0.1 }}
            className='border-white/8 relative overflow-hidden rounded-3xl border bg-theme-800 p-7'
          >
            <p className='text-xs font-semibold uppercase tracking-widest text-theme-400'>
              {t('card2_label')}
            </p>
            <h3 className='mt-1 font-sora text-2xl font-bold text-white'>
              {t('card2_title')}
            </h3>
            <p className='mt-1 text-sm text-neutral-400'>
              {t('card2_body')}
            </p>

            <div className='mt-6 space-y-0.5'>
              {fpsItems.map(({ icon: Icon, label, category }, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.25 + i * 0.08 }}
                  className='flex items-center gap-3 border-b border-white/5 py-3 last:border-0'
                >
                  <div className='flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-theme-400/10'>
                    <Icon className='h-3.5 w-3.5 text-theme-400' />
                  </div>
                  <div className='min-w-0 flex-1'>
                    <p className='text-[10px] text-neutral-500'>{category}</p>
                    <p className='text-xs font-bold text-white'>{label}</p>
                  </div>
                  <div className='h-1.5 w-1.5 shrink-0 rounded-full bg-theme-400' />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── Card 3: Acesso remoto ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease, delay: 0.15 }}
            className='border-white/8 relative overflow-hidden rounded-3xl border bg-theme-800 p-7'
          >
            <p className='text-xs font-semibold uppercase tracking-widest text-theme-400'>
              {t('card3_label')}
            </p>
            <h3 className='mt-1 font-sora text-2xl font-bold text-white'>
              {t('card3_title')}
            </h3>
            <p className='mt-1 text-sm text-neutral-400'>
              {t('card3_body')}
            </p>

            <div className='border-white/6 mt-6 rounded-2xl border bg-theme-900 p-4'>
              <div className='mb-4 flex items-center gap-2'>
                <span className='h-1.5 w-1.5 animate-pulse rounded-full bg-green-400' />
                <span className='text-xs text-neutral-400'>{t('connection_active')}</span>
              </div>
              <div className='flex items-center justify-between'>
                <div className='flex flex-col items-center gap-1.5'>
                  <div className='border-white/8 flex h-10 w-10 items-center justify-center rounded-xl border bg-theme-700'>
                    <Monitor className='h-4 w-4 text-neutral-300' />
                  </div>
                  <span className='text-[10px] text-neutral-500'>{t('you')}</span>
                </div>
                <div className='mx-3 flex flex-1 items-center gap-1'>
                  <div className='h-px flex-1 bg-theme-400/25' />
                  <Wifi className='h-3.5 w-3.5 text-theme-400' />
                  <div className='h-px flex-1 bg-theme-400/25' />
                </div>
                <div className='flex flex-col items-center gap-1.5'>
                  <div className='flex h-10 w-10 items-center justify-center rounded-xl border border-theme-400/25 bg-theme-400/10'>
                    <Zap className='h-4 w-4 text-theme-400' />
                  </div>
                  <span className='text-[10px] font-bold text-theme-400'>
                    UPBOOST
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Card 4: Input lag ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease, delay: 0.2 }}
            className='border-white/8 relative overflow-hidden rounded-3xl border bg-theme-800 p-7'
          >
            <p className='text-xs font-semibold uppercase tracking-widest text-theme-400'>
              {t('card4_label')}
            </p>
            <h3 className='mt-1 font-sora text-2xl font-bold text-white'>
              {t('card4_title')}
            </h3>
            <p className='mt-1 text-sm text-neutral-400'>
              {t('card4_body')}
            </p>

            <div className='mt-6 space-y-5'>
              <div>
                <div className='mb-2 flex items-center justify-between'>
                  <span className='text-[10px] font-medium uppercase tracking-wide text-neutral-500'>
                    {t('before_long')}
                  </span>
                  <span className='text-xs font-bold text-red-400'>45 ms</span>
                </div>
                <div className='h-2 w-full overflow-hidden rounded-full bg-white/5'>
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '78%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, ease, delay: 0.35 }}
                    className='h-full rounded-full bg-red-400/50'
                  />
                </div>
              </div>
              <div>
                <div className='mb-2 flex items-center justify-between'>
                  <span className='text-[10px] font-medium uppercase tracking-wide text-neutral-500'>
                    {t('after_long')}
                  </span>
                  <span className='text-xs font-bold text-theme-400'>0 ms</span>
                </div>
                <div className='h-2 w-full overflow-hidden rounded-full bg-white/5'>
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '1%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, ease, delay: 0.55 }}
                    className='h-full rounded-full bg-theme-400'
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Card 5: CTA ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease, delay: 0.25 }}
            className='border-white/8 relative flex flex-col justify-between overflow-hidden rounded-3xl border bg-theme-700 p-7'
          >
            <div
              aria-hidden
              className='pointer-events-none absolute inset-0'
              style={{
                background:
                  'radial-gradient(ellipse 90% 55% at 50% 0%, rgba(255,211,0,0.07) 0%, transparent 70%)',
              }}
            />
            <div className='relative z-10'>
              <div className='mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-theme-400/25 bg-theme-400/10'>
                <ShoppingCart className='h-4 w-4 text-theme-400' />
              </div>
              <h3 className='font-sora text-2xl font-bold text-white'>
                {t('card5_title')}
              </h3>
              <p className='mt-2 text-sm text-neutral-400'>
                {t('card5_body')}
              </p>
            </div>
            <Link href='#planos' className='relative z-10 mt-8 block'>
              <motion.button
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.15 }}
                className='flex w-full items-center justify-center gap-2 rounded-xl bg-theme-400 py-3 text-sm font-semibold text-theme-900 transition-colors hover:bg-theme-400/90'
              >
                <ShoppingCart className='h-4 w-4' />
                {t('card5_cta')}
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
