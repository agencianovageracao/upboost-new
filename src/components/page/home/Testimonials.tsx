'use client';

import { cn } from '@/lib/utils';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { useRef } from 'react';

export const reviews = [
  {
    name: '@danielrocha',
    body: 'Trabalho sensacional, senti menos input e muito mais estabilidade. Meu PC já não é dos melhores e você fez milagre mano.',
  },
  {
    name: '@gvzin',
    body: '360 FPS. Cai pra 330, não desce. Eu jurei que isso não ia funcionar. Tô a 215 FPS no Warzone agora.',
  },
  {
    name: '@varelaxlz_',
    body: 'No criativo rodava 144 e agora tô 240. Na partida meu FPS dropava muito e agora tá muito mais cravado.',
  },
  {
    name: '@gbtns',
    body: '180 FPS cravados. Ficou top demais. O do meu irmão também, um i3 8100 + GTX 1050, 144 FPS cravado.',
  },
  {
    name: '@felps.gma',
    body: 'Jogo melhorou 100%. Sem input, 200 FPS cravado. Parabéns.',
  },
  {
    name: '@l3ocampos',
    body: 'Eu não tava botando fé que ia funcionar. Acabou as quedas de FPS total.',
  },
];

export const ReviewCard = ({ name, body, className }: { name: string; body: string; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(-999);
  const mouseY = useMotionValue(-999);
  const glow = useMotionTemplate`radial-gradient(130px circle at ${mouseX}px ${mouseY}px, rgba(255,211,0,0.07), transparent 80%)`;
  const initial = name.replace('@', '')[0]?.toUpperCase() ?? '?';

  return (
    <motion.div
      ref={ref}
      onMouseMove={e => {
        const r = ref.current?.getBoundingClientRect();
        if (r) { mouseX.set(e.clientX - r.left); mouseY.set(e.clientY - r.top); }
      }}
      onMouseLeave={() => { mouseX.set(-999); mouseY.set(-999); }}
      whileHover={{ borderColor: 'rgba(255,211,0,0.18)', y: -2 }}
      transition={{ duration: 0.2 }}
      className={cn(
        'relative cursor-default overflow-hidden rounded-2xl border border-white/8 bg-theme-800 p-4 flex flex-col gap-3',
        className
      )}
    >
      <motion.div aria-hidden className='pointer-events-none absolute inset-0' style={{ background: glow }} />

      {/* Header */}
      <div className='relative z-10 flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <div className='flex h-7 w-7 items-center justify-center rounded-full border border-theme-400/25 bg-theme-400/10'>
            <span className='font-sora text-[10px] font-bold text-theme-400'>{initial}</span>
          </div>
          <span className='font-sora text-xs font-semibold text-white'>{name}</span>
        </div>
        <span className='text-[10px] text-theme-400'>★★★★★</span>
      </div>

      {/* Quote */}
      <p className='relative z-10 text-[11px] leading-relaxed text-neutral-400'>&ldquo;{body}&rdquo;</p>
    </motion.div>
  );
};
