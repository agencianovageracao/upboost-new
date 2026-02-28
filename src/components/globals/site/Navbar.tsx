'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
  Building,
  HomeIcon,
  Menu,
  MessageCircle,
  PhoneCall,
  ShieldQuestion,
  ShoppingCart,
  X,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const navLinks = [
  { label: 'Início', href: '/#inicio', icon: HomeIcon },
  { label: 'Planos', href: '#planos', icon: ShoppingCart, accent: true },
  { label: 'FAQ', href: '#faq', icon: ShieldQuestion },
  { label: 'Sobre nós', href: '#sobrenos', icon: Building },
];

const WA_HREF =
  'https://api.whatsapp.com/send?phone=+556592952018&text=Ol%C3%A1%F0%9F%98%80!+Gostaria+de+saber+mais+sobre+a+UPBOOST%2C+como+funcionam+os+planos+para+mais+desempenho+na+minha+m%C3%A1quina%3F';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const close = () => setIsOpen(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      {/* ── Unified fixed bar ──────────────────────────────── */}
      <div
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'border-b border-white/5 bg-theme-900/80 backdrop-blur-xl'
            : ''
        }`}
      >
        {/* Desktop */}
        <div className='max-lg:hidden'>
          <div className='container flex items-center justify-between py-5'>
            <Link
              href='/'
              className='flex shrink-0 items-center gap-2.5 transition-opacity hover:opacity-80'
            >
              <Image
                src='/images/brand/logo.svg'
                alt='UpBoost'
                width={36}
                height={28}
                className='shrink-0'
              />
              <span className='font-sora text-2xl font-bold uppercase tracking-tight text-theme-400'>
                Up<span className='font-thin'>Boost</span>
              </span>
            </Link>

            <ul className='flex items-center gap-1'>
              {navLinks.map(({ label, href, accent }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className={`relative px-3.5 py-2 text-sm font-medium transition-colors ${
                      accent
                        ? 'text-theme-400 hover:text-theme-400/80'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    {label}
                    {accent && (
                      <span
                        aria-hidden
                        className='absolute bottom-0.5 left-1/2 h-px w-5 -translate-x-1/2 rounded-full bg-theme-400/60'
                      />
                    )}
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              href={WA_HREF}
              target='_blank'
              rel='noopener noreferrer'
              className='flex shrink-0 items-center gap-2 rounded-xl border border-theme-400/30 bg-theme-400/10 px-5 py-2.5 text-sm font-semibold text-theme-400 transition-all hover:border-theme-400/55 hover:bg-theme-400/15'
            >
              <PhoneCall className='h-3.5 w-3.5' />
              Fale conosco
            </Link>
          </div>
        </div>

        {/* Mobile top bar — always has a base glass bg for readability */}
        <div
          className={`lg:hidden ${!scrolled ? 'border-b border-white/5 bg-theme-900/80 backdrop-blur-md' : ''}`}
        >
          <div className='container flex items-center justify-between py-4'>
            <Link
              href='/'
              onClick={close}
              className='flex items-center gap-2 transition-opacity hover:opacity-80'
            >
              <Image
                src='/images/brand/logo.svg'
                alt='UpBoost'
                width={28}
                height={22}
                className='shrink-0'
              />
              <span className='font-sora text-xl font-bold uppercase tracking-tight text-theme-400'>
                Up<span className='font-thin'>Boost</span>
              </span>
            </Link>

            <button
              onClick={() => setIsOpen(true)}
              className='flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-theme-700/60 text-neutral-300 transition-colors hover:border-white/20 hover:text-white'
              aria-label='Abrir menu'
            >
              <Menu className='h-[18px] w-[18px]' />
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile drawer (sibling of fixed bar, not inside it) ─ */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              key='overlay'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className='fixed inset-0 z-50 bg-theme-900/70 backdrop-blur-sm lg:hidden'
              onClick={close}
            />

            {/* Panel */}
            <motion.aside
              key='drawer'
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{
                type: 'spring',
                stiffness: 380,
                damping: 38,
                mass: 0.8,
              }}
              className='border-white/8 fixed bottom-0 left-0 top-0 z-[60] flex w-[80vw] max-w-xs flex-col border-r bg-theme-900/95 backdrop-blur-2xl lg:hidden'
            >
              {/* Ambient glow */}
              <div
                aria-hidden
                className='pointer-events-none absolute inset-0'
                style={{
                  background:
                    'radial-gradient(ellipse 100% 40% at 50% 0%, rgba(255,211,0,0.05) 0%, transparent 60%)',
                }}
              />

              {/* Header */}
              <div className='relative flex items-center justify-between border-b border-white/5 px-6 py-5'>
                <Link
                  href='/'
                  onClick={close}
                  className='flex items-center gap-2'
                >
                  <Image
                    src='/images/brand/logo.svg'
                    alt='UpBoost'
                    width={28}
                    height={22}
                    className='shrink-0'
                  />
                  <span className='font-sora text-xl font-bold uppercase tracking-tight text-theme-400'>
                    Up<span className='font-thin'>Boost</span>
                  </span>
                </Link>
                <button
                  onClick={close}
                  className='flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-theme-700/60 text-neutral-400 transition-colors hover:text-white'
                  aria-label='Fechar menu'
                >
                  <X className='h-4 w-4' />
                </button>
              </div>

              {/* Links */}
              <nav className='relative flex flex-1 flex-col gap-1 overflow-y-auto px-4 py-6'>
                {navLinks.map(({ label, href, icon: Icon, accent }) => (
                  <Link
                    key={label}
                    href={href}
                    onClick={close}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
                      accent
                        ? 'bg-theme-400/8 hover:bg-theme-400/12 border border-theme-400/20 text-theme-400'
                        : 'text-neutral-400 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <Icon className='h-4 w-4 shrink-0' />
                    {label}
                  </Link>
                ))}
              </nav>

              {/* CTA */}
              <div className='relative border-t border-white/5 p-4'>
                <Link
                  href={WA_HREF}
                  target='_blank'
                  rel='noopener noreferrer'
                  onClick={close}
                  className='flex w-full items-center justify-center gap-2 rounded-xl bg-theme-400 py-3 text-sm font-semibold text-theme-900 transition-colors hover:bg-theme-400/90'
                >
                  <PhoneCall className='h-4 w-4' />
                  Fale conosco
                </Link>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
