'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Check, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

const games = [
  {
    id: 'fortnite',
    name: 'Fortnite',
    logo: '/images/tinified/fortnite.png',
    fpsOn: 240,
    fpsOff: 150,
    latOn: '2ms',
    latOff: '25ms',
    boost: 60,
    videoOn: '/videos/games/fortnite/fortnite-depois.mp4',
    videoOff: '/videos/games/fortnite/fortnite-antes.mp4',
  },
  {
    id: 'fivem',
    name: 'FiveM / GTA V',
    logo: '/images/tinified/fivem.png',
    fpsOn: 160,
    fpsOff: 95,
    latOn: '2ms',
    latOff: '30ms',
    boost: 68,
    videoOn: '/videos/games/fivem/fivem-depois.mp4',
    videoOff: '/videos/games/fivem/fivem-antes.mp4',
  },
  {
    id: 'bf6',
    name: 'Battlefield 6',
    logo: null,
    fpsOn: 130,
    fpsOff: 78,
    latOn: '3ms',
    latOff: '32ms',
    boost: 67,
    videoOn: '/videos/games/bf6/bf6-depois.mp4',
    videoOff: '/videos/games/bf6/bf6-antes.mp4',
  },
  {
    id: 'valorant',
    name: 'Valorant',
    logo: '/images/tinified/valorant.png',
    invertLogo: true,
    fpsOn: 320,
    fpsOff: 190,
    latOn: '1ms',
    latOff: '18ms',
    boost: 68,
    videoOn: '/videos/games/valorant/valorant-depois.mp4',
    videoOff: '/videos/games/valorant/valorant-antes.mp4',
  },
];

const MAX_FPS = 380;

export const GamePerformance = () => {
  const [selectedId, setSelectedId] = useState('fivem');
  const [open, setOpen] = useState(false);
  const [sliderPos, setSliderPos] = useState(50);

  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const [dragging, setDragging] = useState(false);
  const videoOnRef = useRef<HTMLVideoElement | null>(null);
  const videoOffRef = useRef<HTMLVideoElement | null>(null);

  // Refs para manipulação direta do DOM durante drag (sem re-renders)
  const clipRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const labelLeftRef = useRef<HTMLDivElement>(null);
  const labelRightRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(50);

  const game = games.find((g) => g.id === selectedId)!;

  const play = useCallback((el: HTMLVideoElement | null) => {
    if (!el) return;
    el.play().catch(() => {
      // Safari iOS pode rejeitar play() antes do vídeo estar pronto
      const onReady = () => el.play().catch(() => {});
      el.addEventListener('canplay', onReady, { once: true });
    });
  }, []);

  const setup = useCallback(
    (
      el: HTMLVideoElement,
      ref: React.MutableRefObject<HTMLVideoElement | null>
    ) => {
      ref.current = el;
      el.muted = true;
      el.defaultMuted = true;
      el.setAttribute('muted', '');
      el.setAttribute('playsinline', '');
      el.setAttribute('webkit-playsinline', '');
      // Não chamar el.load() — isso cancela o autoPlay nativo no Safari iOS
      el.play().catch(() => {
        el.addEventListener('canplay', () => el.play().catch(() => {}), {
          once: true,
        });
      });
    },
    []
  );

  const setupOff = useCallback(
    (el: HTMLVideoElement | null) => {
      if (!el) {
        videoOffRef.current = null;
        return;
      }
      setup(el, videoOffRef);
    },
    [setup]
  );

  const setupOn = useCallback(
    (el: HTMLVideoElement | null) => {
      if (!el) {
        videoOnRef.current = null;
        return;
      }
      setup(el, videoOnRef);
    },
    [setup]
  );

  // Pausa quando sai da viewport, retoma quando volta
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          play(videoOnRef.current);
          play(videoOffRef.current);
        } else {
          videoOnRef.current?.pause();
          videoOffRef.current?.pause();
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [play]);

  // Fallback: Safari iOS pode bloquear autoplay até a primeira interação
  useEffect(() => {
    const playAll = () => {
      play(videoOnRef.current);
      play(videoOffRef.current);
    };
    document.addEventListener('touchstart', playAll, { once: true });
    return () => document.removeEventListener('touchstart', playAll);
  }, [play]);

  // Atualiza DOM diretamente sem re-render — essencial pra fluidez no mobile
  const applyPos = useCallback((pos: number) => {
    posRef.current = pos;
    const clip = `inset(0 ${100 - pos}% 0 0)`;
    if (clipRef.current) {
      clipRef.current.style.clipPath = clip;
      (clipRef.current.style as CSSStyleDeclaration & { webkitClipPath: string }).webkitClipPath = clip;
    }
    if (dividerRef.current) dividerRef.current.style.left = `${pos}%`;
    if (labelLeftRef.current)
      labelLeftRef.current.style.right = `${100 - pos}%`;
    if (labelRightRef.current) labelRightRef.current.style.left = `${pos}%`;
  }, []);

  const calcPos = useCallback((clientX: number) => {
    if (!containerRef.current) return posRef.current;
    const rect = containerRef.current.getBoundingClientRect();
    return Math.max(
      2,
      Math.min(98, ((clientX - rect.left) / rect.width) * 100)
    );
  }, []);

  // Touch events nativos — mais confiáveis que pointer events no iOS
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let startX = 0;
    let moved = false;

    const onTouchStart = (e: TouchEvent) => {
      isDragging.current = true;
      moved = false;
      startX = e.touches[0].clientX;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging.current) return;
      const touch = e.touches[0];
      if (!moved) {
        if (Math.abs(touch.clientX - startX) < 4) return;
        moved = true;
        setDragging(true);
      }
      e.preventDefault(); // Bloqueia scroll durante o arrasto
      applyPos(calcPos(touch.clientX));
    };

    const onTouchEnd = () => {
      if (moved) setSliderPos(posRef.current);
      isDragging.current = false;
      moved = false;
      setDragging(false);
    };

    container.addEventListener('touchstart', onTouchStart, { passive: true });
    container.addEventListener('touchmove', onTouchMove, { passive: false });
    container.addEventListener('touchend', onTouchEnd);
    container.addEventListener('touchcancel', onTouchEnd);

    return () => {
      container.removeEventListener('touchstart', onTouchStart);
      container.removeEventListener('touchmove', onTouchMove);
      container.removeEventListener('touchend', onTouchEnd);
      container.removeEventListener('touchcancel', onTouchEnd);
    };
  }, [applyPos, calcPos]);

  // Mouse events para desktop (pointer events)
  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (e.pointerType === 'touch') return; // Touch é tratado acima
      isDragging.current = true;
      setDragging(true);
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
      const pos = calcPos(e.clientX);
      applyPos(pos);
    },
    [applyPos, calcPos]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (e.pointerType === 'touch' || !isDragging.current) return;
      applyPos(calcPos(e.clientX));
    },
    [applyPos, calcPos]
  );

  const stopDrag = useCallback((e: React.PointerEvent) => {
    if (e.pointerType === 'touch') return;
    if (isDragging.current) setSliderPos(posRef.current);
    isDragging.current = false;
    setDragging(false);
  }, []);

  // Fecha o dropdown ao clicar fora
  const selectRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  return (
    <section ref={sectionRef} className='my-20 bg-theme-900'>
      <div className='container'>
        {/* Header */}
        <div className='mb-8 text-center'>
          <h2 className='font-sora text-3xl font-bold max-lg:text-2xl'>
            Performance <span className='text-theme-400'>comprovada</span>
          </h2>
          <p className='mt-2 text-sm text-neutral-400'>
            Selecione o jogo e arraste a linha para comparar
          </p>
        </div>

        {/* Grid 3:2 — vídeo | select + cards */}
        <div className='grid grid-cols-5 gap-4 max-md:grid-cols-1'>
          {/* Coluna esquerda — Vídeo (3 partes) */}
          <div className='col-span-3 max-md:col-span-1'>
            <div
              ref={containerRef}
              className='relative w-full cursor-ew-resize select-none overflow-hidden rounded-2xl'
              style={{ aspectRatio: '16 / 9', touchAction: 'pan-y' }}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={stopDrag}
              onPointerLeave={stopDrag}
              onPointerCancel={stopDrag}
            >
              {/* Sem UPBOOST */}
              <video
                key={`${game.id}-off`}
                ref={setupOff}
                className='absolute inset-0 h-full w-full object-cover'
                autoPlay
                loop
                muted
                playsInline
                preload='auto'
              >
                <source src={game.videoOff} type='video/mp4' />
              </video>

              {/* Com UPBOOST — clip-path no wrapper div, não no <video> (bug Safari iOS) */}
              <div
                ref={clipRef}
                className='absolute inset-0'
                style={{
                  clipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
                  WebkitClipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
                }}
              >
                <video
                  key={`${game.id}-on`}
                  ref={setupOn}
                  className='absolute inset-0 h-full w-full object-cover'
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload='auto'
                >
                  <source src={game.videoOn} type='video/mp4' />
                </video>
              </div>

              {/* Divider */}
              <div
                ref={dividerRef}
                className='pointer-events-none absolute bottom-0 top-0 z-10 flex w-0 items-center justify-center'
                style={{ left: `${sliderPos}%` }}
              >
                <div className='h-full w-0.5 bg-white/80 shadow-[0_0_8px_rgba(255,255,255,0.3)]' />
                <div
                  className={`pointer-events-auto absolute flex h-10 w-10 cursor-ew-resize items-center justify-center rounded-full border-2 border-white bg-theme-900/80 shadow-[0_0_16px_rgba(255,211,0,0.3)] backdrop-blur-sm transition-transform duration-150 md:h-12 md:w-12 ${
                    dragging
                      ? 'scale-110 shadow-[0_0_24px_rgba(255,211,0,0.5)]'
                      : ''
                  }`}
                >
                  <ChevronLeft className='-mr-0.5 h-3.5 w-3.5 text-white md:h-4 md:w-4' />
                  <ChevronRight className='-ml-0.5 h-3.5 w-3.5 text-white md:h-4 md:w-4' />
                </div>
                {/* Área de toque expandida no mobile */}
                <div className='pointer-events-auto absolute h-full w-12 cursor-ew-resize md:hidden' />
              </div>

              {/* Labels — sumem quando o slider passa por cima */}
              <div
                ref={labelLeftRef}
                className='pointer-events-none absolute inset-y-0 left-0 z-10 overflow-hidden'
                style={{ right: `${100 - sliderPos}%` }}
              >
                <div className='absolute left-2 top-2 flex items-center gap-1.5 rounded-lg border border-theme-400/20 bg-theme-900/80 px-2 py-1 backdrop-blur-sm md:left-3 md:top-3 md:px-2.5'>
                  <div className='h-1.5 w-1.5 rounded-full bg-theme-400' />
                  <span className='whitespace-nowrap text-[10px] font-bold text-theme-400 md:text-xs'>
                    Com UPBOOST
                  </span>
                </div>
              </div>
              <div
                ref={labelRightRef}
                className='pointer-events-none absolute inset-y-0 right-0 z-10 overflow-hidden'
                style={{ left: `${sliderPos}%` }}
              >
                <div className='absolute right-2 top-2 flex items-center gap-1.5 rounded-lg border border-white/10 bg-theme-900/80 px-2 py-1 backdrop-blur-sm md:right-3 md:top-3 md:px-2.5'>
                  <div className='h-1.5 w-1.5 rounded-full bg-neutral-500' />
                  <span className='whitespace-nowrap text-[10px] text-neutral-400 md:text-xs'>
                    Sem UPBOOST
                  </span>
                </div>
              </div>
            </div>

            {/* Footnote */}
            <p className='mt-3 text-xs text-neutral-700 max-md:text-center'>
              Testado com Intel i7-13700K (5.2ghz), RTX 4070 (stock), 32gb DDR5
              — Resultados podem variar.
            </p>
          </div>

          {/* Coluna direita — Select + Cards (2 partes) */}
          <div className='col-span-2 flex flex-col gap-3 max-md:col-span-1'>
            {/* Game select */}
            <div ref={selectRef} className='relative w-full'>
              <button
                onClick={() => setOpen((v) => !v)}
                className='border-white/8 hover:border-white/12 flex w-full items-center gap-3 rounded-2xl border bg-theme-800 px-4 py-3.5 text-left shadow-lg shadow-black/30 transition-colors'
              >
                <div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-theme-700'>
                  {game.logo ? (
                    <Image
                      src={game.logo}
                      alt={game.name}
                      width={22}
                      height={22}
                      className={`object-contain ${'invertLogo' in game && game.invertLogo ? 'invert' : ''}`}
                    />
                  ) : (
                    <span className='text-[10px] font-bold text-neutral-300'>
                      BF6
                    </span>
                  )}
                </div>
                <span className='flex-1 text-sm font-semibold text-white'>
                  {game.name}
                </span>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-neutral-500 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
                />
              </button>

              <AnimatePresence>
                {open && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.97 }}
                    transition={{ duration: 0.15, ease: 'easeOut' }}
                    className='border-white/8 absolute left-0 right-0 top-full z-40 mt-2 overflow-hidden rounded-2xl border bg-theme-800 shadow-2xl shadow-black/60'
                  >
                    {games.map((g, i) => {
                      const active = g.id === selectedId;
                      return (
                        <button
                          key={g.id}
                          onClick={() => {
                            setSelectedId(g.id);
                            setOpen(false);
                          }}
                          className={`flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors ${
                            i > 0 ? 'border-t border-white/5' : ''
                          } ${active ? 'bg-theme-700' : 'hover:bg-theme-700/50'}`}
                        >
                          <div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-theme-700'>
                            {g.logo ? (
                              <Image
                                src={g.logo}
                                alt={g.name}
                                width={22}
                                height={22}
                                className={`object-contain ${'invertLogo' in g && g.invertLogo ? 'invert' : ''}`}
                              />
                            ) : (
                              <span className='text-[10px] font-bold text-neutral-300'>
                                BF6
                              </span>
                            )}
                          </div>
                          <span
                            className={`flex-1 text-sm font-medium ${active ? 'text-white' : 'text-neutral-400'}`}
                          >
                            {g.name}
                          </span>
                          {active && (
                            <Check className='h-3.5 w-3.5 shrink-0 text-theme-400' />
                          )}
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Cards informativos — empilhados verticalmente */}
            {/* Boost */}
            <div className='flex flex-1 flex-col justify-center rounded-xl border border-white/5 bg-theme-800 px-5 py-4'>
              <p className='mb-1 text-[11px] uppercase tracking-wider text-neutral-500'>
                Performance
              </p>
              <AnimatePresence mode='wait'>
                <motion.p
                  key={game.id + '-boost'}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className='font-sora text-3xl font-bold text-theme-400'
                >
                  +{game.boost}%
                </motion.p>
              </AnimatePresence>
              <p className='mt-0.5 text-xs text-neutral-500'>
                aumento médio de FPS
              </p>
            </div>

            {/* FPS bars */}
            <div className='flex flex-1 flex-col justify-center rounded-xl border border-white/5 bg-theme-800 px-5 py-4'>
              <p className='mb-3 text-[11px] uppercase tracking-wider text-neutral-500'>
                Frames por segundo
              </p>
              <div className='flex flex-col gap-3'>
                <div>
                  <div className='mb-1.5 flex items-center justify-between'>
                    <span className='text-xs font-semibold text-white'>
                      Com UPBOOST
                    </span>
                    <span className='text-xs font-bold text-theme-400'>
                      {game.fpsOn} FPS
                    </span>
                  </div>
                  <div className='h-1.5 w-full overflow-hidden rounded-full bg-theme-700'>
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
                  <div className='mb-1.5 flex items-center justify-between'>
                    <span className='text-xs text-neutral-500'>
                      Sem UPBOOST
                    </span>
                    <span className='text-xs text-neutral-500'>
                      {game.fpsOff} FPS
                    </span>
                  </div>
                  <div className='h-1.5 w-full overflow-hidden rounded-full bg-theme-700'>
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
            </div>

            {/* Latency */}
            <div className='flex flex-1 flex-col justify-center rounded-xl border border-white/5 bg-theme-800 px-5 py-4'>
              <p className='mb-3 text-[11px] uppercase tracking-wider text-neutral-500'>
                Latência
              </p>
              <div className='flex items-end justify-between'>
                <div>
                  <p className='text-[11px] text-neutral-500'>Com UPBOOST</p>
                  <p className='font-sora text-2xl font-bold text-theme-400'>
                    {game.latOn}
                  </p>
                </div>
                <div className='mb-1 text-xs text-neutral-700'>vs</div>
                <div className='text-right'>
                  <p className='text-[11px] text-neutral-500'>Sem UPBOOST</p>
                  <p className='font-sora text-2xl font-bold text-neutral-600'>
                    {game.latOff}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
