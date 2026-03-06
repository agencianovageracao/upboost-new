'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Cpu, Globe, Monitor, ShoppingCart, Wifi, Zap } from 'lucide-react';
import Link from 'next/link';

const ease = [0.22, 1, 0.36, 1] as const;

// ── Bento card wrapper ─────────────────────────────────────────────────────────

const BentoCard = ({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, ease, delay }}
    className={cn(
      'border-white/8 relative overflow-hidden rounded-3xl border bg-theme-800 p-7',
      className
    )}
  />
);

// ── Inner mock UI components ───────────────────────────────────────────────────

const killedProcesses = [
  { name: 'SysMain.exe',        cpu: '3.2%', ram: '187 MB', status: 'KILLED' },
  { name: 'SearchIndexer.exe',  cpu: '1.8%', ram: '124 MB', status: 'KILLED' },
  { name: 'GameBarPresenceW…',  cpu: '0.9%', ram: '89 MB',  status: 'KILLED' },
];

const fpsItems = [
  { icon: Cpu, label: 'RAM FREED — 4.2 GB', time: 'há 2h' },
  { icon: Zap, label: 'PREFETCH FLUSHED', time: 'há 3h' },
  { icon: Globe, label: 'INTERRUPT AFFINITY SET', time: 'há 5h' },
];

// ── Component ──────────────────────────────────────────────────────────────────

export const CallToAction = () => (
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
          Por que escolher a <span className='text-theme-400'>UPBOOST</span>?
        </h2>
        <p className='mt-2 text-sm text-neutral-400'>
          Tweaks reais no kernel, registro e scheduler. Veja o que executamos no seu sistema.
        </p>
      </motion.div>

      {/* Bento grid */}
      <div className='grid grid-cols-3 gap-4 max-lg:grid-cols-2 max-sm:grid-cols-1'>
        {/* ── Card 1: Otimização — large ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease, delay: 0.05 }}
          className='border-white/8 relative col-span-2 overflow-hidden rounded-3xl border bg-theme-800 p-7 max-sm:col-span-1'
        >
          <p className='text-xs font-semibold uppercase tracking-widest text-theme-400'>
            Sistema
          </p>
          <h3 className='mt-1 font-sora text-2xl font-bold text-white'>
            Otimização a nível de sistema
          </h3>
          <p className='mt-1 text-sm text-neutral-400'>
            Desabilitamos services desnecessários, ajustamos prioridade de CPU e limpamos o pipeline do Windows.
          </p>

          {/* Mock task manager */}
          <div className='mt-6 overflow-hidden rounded-2xl border border-white/6 bg-theme-900'>
            {/* Header row */}
            <div className='grid grid-cols-[1fr_52px_72px_64px] border-b border-white/5 px-4 py-2'>
              <span className='text-[10px] font-bold uppercase tracking-widest text-neutral-600'>Processo</span>
              <span className='text-[10px] font-bold uppercase tracking-widest text-neutral-600'>CPU</span>
              <span className='text-[10px] font-bold uppercase tracking-widest text-neutral-600'>Memória</span>
              <span className='text-[10px] font-bold uppercase tracking-widest text-neutral-600'>Status</span>
            </div>
            {killedProcesses.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, ease, delay: 0.2 + i * 0.1 }}
                className='grid grid-cols-[1fr_52px_72px_64px] items-center border-b border-white/5 px-4 py-2.5 last:border-0'
              >
                <span className='truncate font-mono text-xs text-neutral-300'>{p.name}</span>
                <span className='font-mono text-xs text-red-400'>{p.cpu}</span>
                <span className='font-mono text-xs text-neutral-400'>{p.ram}</span>
                <span className='inline-flex items-center gap-1 text-[10px] font-bold text-theme-400'>
                  <span className='h-1.5 w-1.5 rounded-full bg-theme-400' />
                  {p.status}
                </span>
              </motion.div>
            ))}
            {/* Freed total */}
            <div className='flex items-center justify-between border-t border-white/8 bg-theme-400/5 px-4 py-2.5'>
              <span className='text-[11px] text-neutral-500'>RAM liberada</span>
              <span className='font-mono text-sm font-bold text-theme-400'>+ 400 MB</span>
            </div>
          </div>
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
            Performance
          </p>
          <h3 className='mt-1 font-sora text-2xl font-bold text-white'>
            +FPS no frametime
          </h3>
          <p className='mt-1 text-sm text-neutral-400'>
            GPU scheduling, power plan e driver tweaks para eliminar frametime spikes e stutters.
          </p>

          <div className='mt-6 space-y-0.5'>
            {fpsItems.map(({ icon: Icon, label, time }, i) => (
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
                  <p className='text-[10px] text-neutral-500'>{time}</p>
                  <p className='text-xs font-bold text-white'>{label}</p>
                </div>
                <div className='h-1.5 w-1.5 shrink-0 rounded-full bg-theme-400' />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Card 3: Serviço remoto ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease, delay: 0.15 }}
          className='border-white/8 relative overflow-hidden rounded-3xl border bg-theme-800 p-7'
        >
          <p className='text-xs font-semibold uppercase tracking-widest text-theme-400'>
            Atendimento
          </p>
          <h3 className='mt-1 font-sora text-2xl font-bold text-white'>
            Acesso remoto seguro
          </h3>
          <p className='mt-1 text-sm text-neutral-400'>
            Sessão via AnyDesk com permissão controlada. Você acompanha cada comando em tempo real.
          </p>

          <div className='border-white/6 mt-6 rounded-2xl border bg-theme-900 p-4'>
            <div className='mb-4 flex items-center gap-2'>
              <span className='h-1.5 w-1.5 animate-pulse rounded-full bg-green-400' />
              <span className='text-xs text-neutral-400'>Conexão ativa</span>
            </div>
            <div className='flex items-center justify-between'>
              <div className='flex flex-col items-center gap-1.5'>
                <div className='border-white/8 flex h-10 w-10 items-center justify-center rounded-xl border bg-theme-700'>
                  <Monitor className='h-4 w-4 text-neutral-300' />
                </div>
                <span className='text-[10px] text-neutral-500'>Você</span>
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
            Latência
          </p>
          <h3 className='mt-1 font-sora text-2xl font-bold text-white'>
            Input lag reduzido
          </h3>
          <p className='mt-1 text-sm text-neutral-400'>
            Ajuste de IRQ, DPC latency e polling rate para resposta de periférico abaixo de 1ms.
          </p>

          <div className='mt-6 space-y-5'>
            <div>
              <div className='mb-2 flex items-center justify-between'>
                <span className='text-[10px] font-medium uppercase tracking-wide text-neutral-500'>
                  Antes
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
                  Depois
                </span>
                <span className='text-xs font-bold text-theme-400'>8 ms</span>
              </div>
              <div className='h-2 w-full overflow-hidden rounded-full bg-white/5'>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: '14%' }}
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
          {/* Ambient glow */}
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
              Seu PC roda abaixo do potencial
            </h3>
            <p className='mt-2 text-sm text-neutral-400'>
              +12.000 sistemas otimizados. FPS, latência e estabilidade — tudo ajustado pro seu hardware.
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
              Ver planos
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  </section>
);
