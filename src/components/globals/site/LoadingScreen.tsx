'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const hints = [
  'Otimizando performance do sistema...',
  'Calibrando parâmetros de rede...',
  'Carregando módulos de boost...',
  'Sincronizando configurações...',
];

const corners = [
  'top-6 left-6 border-l-2 border-t-2',
  'top-6 right-6 border-r-2 border-t-2',
  'bottom-6 left-6 border-l-2 border-b-2',
  'bottom-6 right-6 border-r-2 border-b-2',
];

export const LoadingScreen = ({ onDone }: { onDone: () => void }) => {
  const [done, setDone] = useState(false);
  const [hintIndex, setHintIndex] = useState(0);

  useEffect(() => {
    const hintTimer = setInterval(
      () => setHintIndex(i => (i + 1) % hints.length),
      750,
    );
    const doneTimer = setTimeout(() => {
      clearInterval(hintTimer);
      onDone();   // notify parent — hero starts entering while screen fades
      setDone(true);
    }, 3000);

    return () => {
      clearInterval(hintTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key='loading'
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          className='fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden'
          style={{ background: '#07090f' }}
        >
          {/* Subtle gold grid */}
          <div
            aria-hidden
            className='pointer-events-none absolute inset-0'
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,211,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,211,0,0.04) 1px, transparent 1px)',
              backgroundSize: '64px 64px',
            }}
          />

          {/* Radial vignette */}
          <div
            aria-hidden
            className='pointer-events-none absolute inset-0'
            style={{
              background:
                'radial-gradient(ellipse 75% 75% at 50% 50%, transparent 35%, #07090f 100%)',
            }}
          />

          {/* HUD corner brackets */}
          {corners.map((cls, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.08, duration: 0.35 }}
              className={`absolute h-7 w-7 border-theme-400/35 ${cls}`}
            />
          ))}

          {/* Horizontal scan line */}
          <motion.div
            className='pointer-events-none absolute left-0 right-0 h-px bg-theme-400/10'
            initial={{ top: '0%' }}
            animate={{ top: '100%' }}
            transition={{ duration: 2.8, ease: 'linear' }}
          />

          {/* Center — logo + name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className='relative z-10 flex flex-col items-center gap-7'
          >
            {/* Logo with glow */}
            <div className='relative flex items-center justify-center'>
              <div
                className='absolute h-24 w-24 rounded-full blur-3xl'
                style={{ background: 'rgba(255,211,0,0.18)' }}
              />
              <Image
                src='/images/brand/logo.svg'
                alt='UpBoost'
                width={68}
                height={52}
                className='relative drop-shadow-lg'
              />
            </div>

            {/* Name */}
            <div className='text-center'>
              <h1 className='font-sora text-4xl font-bold uppercase tracking-[0.45em] text-white'>
                Up<span className='text-theme-400'>Boost</span>
              </h1>
              <p className='mt-2 text-[10px] uppercase tracking-[0.35em] text-neutral-600'>
                Performance real. Resultados comprovados.
              </p>
            </div>
          </motion.div>

          {/* Bottom HUD */}
          <div className='absolute bottom-10 left-1/2 flex w-full max-w-xs -translate-x-1/2 flex-col items-center gap-3'>
            {/* Hint */}
            <AnimatePresence mode='wait'>
              <motion.p
                key={hintIndex}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
                className='text-center text-[10px] uppercase tracking-widest text-neutral-600'
              >
                {hints[hintIndex]}
              </motion.p>
            </AnimatePresence>

            {/* Progress bar */}
            <div className='h-[2px] w-full overflow-hidden rounded-full bg-white/5'>
              <motion.div
                className='h-full rounded-full bg-theme-400'
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>

            {/* Percentage */}
            <ProgressCounter durationMs={2500} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* Counts 0→100 in sync with the progress bar */
const ProgressCounter = ({ durationMs }: { durationMs: number }) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const start = performance.now();
    let frame: number;

    const tick = (now: number) => {
      const t = Math.min((now - start) / durationMs, 1);
      // Same easing as the bar: [0.16, 1, 0.3, 1] ≈ fast-then-slow
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setValue(Math.round(eased * 100));
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [durationMs]);

  return (
    <span className='font-mono text-[11px] tabular-nums text-theme-400/70'>
      {String(value).padStart(3, '0')}%
    </span>
  );
};
