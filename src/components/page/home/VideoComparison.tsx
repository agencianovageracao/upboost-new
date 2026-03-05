'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCallback, useRef, useState } from 'react';

// Callback ref: chamado sincronamente quando o elemento é montado no DOM.
// Resolve o bug do React onde o atributo `muted` não é aplicado corretamente
// no Safari iOS, que bloqueia autoplay sem ele.
function setupVideo(el: HTMLVideoElement | null) {
  if (!el) return;
  el.muted = true;
  el.defaultMuted = true;
  el.setAttribute('playsinline', '');
  el.setAttribute('webkit-playsinline', ''); // Safari iOS legado
  if (el.readyState >= 2) {
    el.play().catch(() => {});
  } else {
    el.addEventListener('canplay', () => el.play().catch(() => {}), { once: true });
  }
}

export const VideoComparison = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const updateSlider = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    setSliderPosition(Math.max(2, Math.min(98, x)));
  }, []);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      isDragging.current = true;
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
      updateSlider(e.clientX);
    },
    [updateSlider],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (isDragging.current) updateSlider(e.clientX);
    },
    [updateSlider],
  );

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  return (
    <section className='container my-16 max-lg:my-10'>
      <h2 className='mb-2 text-center font-sora text-3xl font-bold max-lg:text-2xl max-sm:text-xl'>
        Veja a <span className='text-theme-400'>diferença</span>
      </h2>
      <p className='mb-8 text-center text-sm text-neutral-400'>
        Arraste a linha para comparar com e sem a UPBOOST
      </p>

      <div
        ref={containerRef}
        className='relative w-full cursor-ew-resize select-none overflow-hidden rounded-xl'
        style={{ aspectRatio: '16 / 9' }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        {/* Right side — Sem a UPBOOST (background layer) */}
        <video
          ref={setupVideo}
          className='absolute inset-0 h-full w-full object-cover'
          autoPlay
          loop
          muted
          playsInline
          preload='auto'
        >
          <source src='/videos/upboost_off.mp4' type='video/mp4' />
        </video>

        {/* Left side — Com a UPBOOST
            clip-path aplicado num wrapper <div> em vez de no <video> diretamente,
            pois clip-path em elementos <video> tem bugs no Safari iOS */}
        <div
          className='absolute inset-0'
          style={{
            clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
            WebkitClipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
          }}
        >
          <video
            ref={setupVideo}
            className='absolute inset-0 h-full w-full object-cover'
            autoPlay
            loop
            muted
            playsInline
            preload='auto'
          >
            <source src='/videos/upboost_on.mp4' type='video/mp4' />
          </video>
        </div>

        {/* Divider line + handle */}
        <div
          className='pointer-events-none absolute bottom-0 top-0 z-20 flex w-0 items-center justify-center'
          style={{ left: `${sliderPosition}%` }}
        >
          <div className='h-full w-0.5 bg-white/80' />
          <div className='pointer-events-auto absolute flex h-10 w-10 cursor-ew-resize items-center justify-center rounded-full bg-white shadow-lg shadow-black/40'>
            <ChevronLeft className='-mr-0.5 h-4 w-4 text-theme-800' />
            <ChevronRight className='-ml-0.5 h-4 w-4 text-theme-800' />
          </div>
        </div>

        {/* Label — left */}
        <div className='absolute left-4 top-4 z-10 rounded-lg bg-theme-900/80 px-3 py-1.5 text-sm font-bold text-theme-400 backdrop-blur-sm'>
          Com a UPBOOST
        </div>

        {/* Label — right */}
        <div className='absolute right-4 top-4 z-10 rounded-lg bg-theme-900/80 px-3 py-1.5 text-sm text-neutral-300 backdrop-blur-sm'>
          Sem a UPBOOST
        </div>

        {/* Stats — left */}
        <div className='absolute bottom-4 left-4 z-10 rounded-lg bg-theme-900/80 px-3 py-2 backdrop-blur-sm'>
          <p className='text-xs text-neutral-300'>Latência Estimada</p>
          <p className='font-bold text-theme-400'>0-2ms</p>
          <p className='mt-1 text-xs text-neutral-300'>FPS</p>
          <p className='font-bold text-theme-400'>133 fps</p>
        </div>

        {/* Stats — right */}
        <div className='absolute bottom-4 right-4 z-10 rounded-lg bg-theme-900/80 px-3 py-2 text-right backdrop-blur-sm'>
          <p className='text-xs text-neutral-300'>Latência Estimada</p>
          <p className='font-bold text-red-300'>18-20ms</p>
          <p className='mt-1 text-xs text-neutral-300'>FPS</p>
          <p className='font-bold text-red-300'>69 fps</p>
        </div>
      </div>
    </section>
  );
};
