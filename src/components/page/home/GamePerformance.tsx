'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useRef, useState } from 'react';

const games = [
  { id: 'cs2',      name: 'Counter-Strike 2',  ext: 'png', fpsOn: 280, fpsOff: 165, latOn: '1ms',  latOff: '22ms', boost: 70 },
  { id: 'valorant', name: 'Valorant',           ext: 'svg', fpsOn: 320, fpsOff: 190, latOn: '1ms',  latOff: '18ms', boost: 68 },
  { id: 'fortnite', name: 'Fortnite',           ext: 'png', fpsOn: 240, fpsOff: 150, latOn: '2ms',  latOff: '25ms', boost: 60 },
  { id: 'warzone',  name: 'Warzone',            ext: 'png', fpsOn: 180, fpsOff: 110, latOn: '2ms',  latOff: '28ms', boost: 64 },
  { id: 'pubg',     name: 'PUBG',               ext: 'png', fpsOn: 160, fpsOff:  95, latOn: '2ms',  latOff: '30ms', boost: 68 },
  { id: 'r6s',      name: 'Rainbow Six Siege',  ext: 'png', fpsOn: 300, fpsOff: 185, latOn: '1ms',  latOff: '20ms', boost: 62 },
];

const MAX_FPS = 380;

export const GamePerformance = () => {
  const [selectedId, setSelectedId] = useState('cs2');
  const [open, setOpen] = useState(false);

  // Comparison slider state
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const game = games.find(g => g.id === selectedId)!;

  const updateSlider = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    setSliderPos(Math.max(2, Math.min(98, x)));
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    isDragging.current = true;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    updateSlider(e.clientX);
  }, [updateSlider]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (isDragging.current) updateSlider(e.clientX);
  }, [updateSlider]);

  const handlePointerUp = useCallback(() => { isDragging.current = false; }, []);

  return (
    <section className='bg-theme-900 py-20'>
      <div className='container'>

        {/* Header */}
        <div className='mb-10 text-center'>
          <h2 className='font-sora text-3xl font-bold max-lg:text-2xl'>
            Performance <span className='text-theme-400'>comprovada</span>
          </h2>
          <p className='mt-2 text-sm text-neutral-400'>
            Arraste a linha para comparar — selecione o jogo para ver as métricas
          </p>
        </div>

        {/* Main card */}
        <div className='flex overflow-hidden rounded-2xl border border-white/5 bg-theme-800 max-lg:flex-col'>

          {/* Left — video comparison slider (16:9) */}
          <div
            ref={containerRef}
            className='relative w-1/2 cursor-ew-resize select-none overflow-hidden max-lg:w-full'
            style={{ aspectRatio: '16 / 9' }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
          >
            {/* Right video — Sem UPBOOST (background) */}
            <video
              className='absolute inset-0 h-full w-full object-cover'
              autoPlay loop muted playsInline preload='metadata'
            >
              <source src='/videos/upboost_off.mp4' type='video/mp4' />
            </video>

            {/* Left video — Com UPBOOST (clipped) */}
            <video
              className='absolute inset-0 h-full w-full object-cover'
              style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
              autoPlay loop muted playsInline preload='metadata'
            >
              <source src='/videos/upboost_on.mp4' type='video/mp4' />
            </video>

            {/* Divider */}
            <div
              className='pointer-events-none absolute bottom-0 top-0 z-10 flex w-0 items-center justify-center'
              style={{ left: `${sliderPos}%` }}
            >
              <div className='h-full w-px bg-white/70' />
              <div className='pointer-events-auto absolute flex h-9 w-9 cursor-ew-resize items-center justify-center rounded-full bg-white shadow-lg shadow-black/40'>
                <ChevronLeft className='-mr-0.5 h-3.5 w-3.5 text-theme-900' />
                <ChevronRight className='-ml-0.5 h-3.5 w-3.5 text-theme-900' />
              </div>
            </div>

            {/* Labels */}
            <div className='absolute left-3 top-3 z-10 rounded-md bg-theme-900/80 px-2.5 py-1 text-xs font-bold text-theme-400 backdrop-blur-sm'>
              Com a UPBOOST
            </div>
            <div className='absolute right-3 top-3 z-10 rounded-md bg-theme-900/80 px-2.5 py-1 text-xs text-neutral-400 backdrop-blur-sm'>
              Sem a UPBOOST
            </div>
          </div>

          {/* Right — metrics */}
          <div className='flex w-1/2 flex-col gap-7 p-8 max-lg:w-full max-sm:p-5'>

            {/* Game selector */}
            <div className='relative'>
              <button
                onClick={() => setOpen(v => !v)}
                className='flex w-full items-center gap-3 rounded-xl border border-white/5 bg-theme-700 p-4 text-left transition-colors hover:bg-theme-600'
              >
                <div className='flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-theme-800'>
                  <Image
                    src={`/images/tinified/${game.id}.${game.ext}`}
                    alt={game.name}
                    width={26}
                    height={26}
                    className='object-contain'
                  />
                </div>
                <div className='flex-1'>
                  <p className='text-sm font-semibold text-white'>{game.name}</p>
                  <p className='text-xs text-neutral-500'>Comparação de performance</p>
                </div>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-neutral-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
                />
              </button>

              <AnimatePresence>
                {open && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.15 }}
                    className='absolute left-0 right-0 top-full z-30 mt-1 overflow-hidden rounded-xl border border-white/5 bg-theme-700 shadow-2xl shadow-black/60'
                  >
                    {games.map(g => (
                      <button
                        key={g.id}
                        onClick={() => { setSelectedId(g.id); setOpen(false); }}
                        className={`flex w-full items-center gap-3 px-4 py-3 text-left text-sm transition-colors hover:bg-theme-600 ${g.id === selectedId ? 'bg-theme-600 text-theme-400' : 'text-neutral-300'}`}
                      >
                        <div className='flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-theme-800'>
                          <Image
                            src={`/images/tinified/${g.id}.${g.ext}`}
                            alt={g.name}
                            width={20}
                            height={20}
                            className='object-contain'
                          />
                        </div>
                        {g.name}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Boost % */}
            <div>
              <AnimatePresence mode='wait'>
                <motion.p
                  key={game.id + '-boost'}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className='font-sora text-5xl font-bold text-theme-400 max-sm:text-4xl'
                >
                  +{game.boost}%
                </motion.p>
              </AnimatePresence>
              <p className='mt-1 text-sm font-semibold text-neutral-300'>Aumento de performance</p>
            </div>

            {/* FPS bars */}
            <div className='flex flex-col gap-5'>
              <div>
                <div className='mb-2 flex items-center justify-between'>
                  <span className='text-xs font-semibold uppercase tracking-wider text-white'>Com a UPBOOST</span>
                  <span className='text-sm font-bold text-theme-400'>{game.fpsOn} FPS</span>
                </div>
                <div className='h-2 w-full overflow-hidden rounded-full bg-theme-700'>
                  <motion.div
                    key={`on-${game.id}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${(game.fpsOn / MAX_FPS) * 100}%` }}
                    transition={{ duration: 0.55, ease: 'easeOut' }}
                    className='h-full rounded-full bg-theme-400'
                  />
                </div>
              </div>

              <div>
                <div className='mb-2 flex items-center justify-between'>
                  <span className='text-xs font-medium uppercase tracking-wider text-neutral-500'>Sem a UPBOOST</span>
                  <span className='text-sm text-neutral-500'>{game.fpsOff} FPS</span>
                </div>
                <div className='h-2 w-full overflow-hidden rounded-full bg-theme-700'>
                  <motion.div
                    key={`off-${game.id}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${(game.fpsOff / MAX_FPS) * 100}%` }}
                    transition={{ duration: 0.55, ease: 'easeOut' }}
                    className='h-full rounded-full bg-theme-600'
                  />
                </div>
              </div>
            </div>

            {/* Latency */}
            <div className='grid grid-cols-2 gap-3'>
              <div className='rounded-xl border border-theme-400/15 bg-theme-700 p-4'>
                <p className='text-xs text-neutral-400'>Latência com UPBOOST</p>
                <p className='mt-1 text-xl font-bold text-theme-400'>{game.latOn}</p>
              </div>
              <div className='rounded-xl border border-white/5 bg-theme-700 p-4'>
                <p className='text-xs text-neutral-400'>Latência sem UPBOOST</p>
                <p className='mt-1 text-xl font-bold text-neutral-500'>{game.latOff}</p>
              </div>
            </div>

            {/* Footnote */}
            <p className='text-xs leading-relaxed text-neutral-600'>
              Testado com Intel i7-13700K (5.2ghz), RTX 4070 (stock), 32gb DDR5 — Resultados podem variar.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
