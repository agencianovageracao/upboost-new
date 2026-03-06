'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { X, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';

const WA_HREF =
  'https://wa.me/556592952018?text=Ol%C3%A1%2C%20quero%20fazer%20a%20an%C3%A1lise%20gratuita%20do%20meu%20PC%21%20Vou%20mandar%20minhas%20configura%C3%A7%C3%B5es%20agora.';

export const FreeAnalysisWidget = () => {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!dismissed) setVisible(true);
    }, 10000);
    return () => clearTimeout(timer);
  }, [dismissed]);

  const dismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setVisible(false);
    setDismissed(true);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 340, damping: 30 }}
          className='fixed bottom-5 right-5 z-50 w-[300px] max-w-[calc(100vw-2.5rem)]'
        >
          <a
            href={WA_HREF}
            target='_blank'
            rel='noopener noreferrer'
            className='group relative flex flex-col gap-3 overflow-hidden rounded-2xl border border-white/10 bg-theme-800/95 p-5 shadow-2xl shadow-black/60 backdrop-blur-xl transition-colors hover:border-theme-400/30'
          >
            {/* Glow */}
            <div
              aria-hidden
              className='pointer-events-none absolute inset-0'
              style={{
                background:
                  'radial-gradient(ellipse 80% 60% at 0% 100%, rgba(255,211,0,0.07) 0%, transparent 65%)',
              }}
            />

            {/* Close */}
            <button
              onClick={dismiss}
              className='absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full border border-white/10 bg-theme-700/60 text-neutral-500 transition-colors hover:border-white/20 hover:text-white'
              aria-label='Fechar'
            >
              <X className='h-3 w-3' />
            </button>

            {/* Header */}
            <div className='flex items-center gap-2.5'>
              <div className='flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-theme-400/15 border border-theme-400/20'>
                <Zap className='h-4 w-4 text-theme-400' />
              </div>
              <div>
                <p className='text-[10px] font-bold uppercase tracking-widest text-theme-400'>
                  Grátis
                </p>
                <p className='text-sm font-bold leading-tight text-white'>
                  Análise gratuita do seu PC
                </p>
              </div>
            </div>

            {/* Body */}
            <p className='text-xs leading-relaxed text-neutral-400'>
              Manda suas configurações e a gente analisa com base em{' '}
              <span className='font-semibold text-neutral-300'>+12.000 clientes</span>{' '}
              e diz exatamente o que tá travando sua performance.
            </p>

            {/* CTA */}
            <div className='flex items-center justify-between rounded-xl bg-theme-400/10 border border-theme-400/20 px-3.5 py-2.5 transition-colors group-hover:bg-theme-400/15'>
              <span className='text-xs font-bold text-theme-400'>Analisar agora no WhatsApp</span>
              <svg className='h-4 w-4 shrink-0 text-theme-400' viewBox='0 0 24 24' fill='currentColor'>
                <path d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z' />
              </svg>
            </div>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
