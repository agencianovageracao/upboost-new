'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
  Building,
  HomeIcon,
  Menu,
  PhoneCall,
  ShieldQuestion,
  ShoppingCart,
  X,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useState, useTransition } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';

// ── Language Switcher ──────────────────────────────────────────────────────────

const locales = [
  { code: 'pt', label: 'PT', flag: '/images/flags/brazil.png' },
  { code: 'en', label: 'EN', flag: '/images/flags/united-states.png' },
] as const;

const LocaleSwitcher = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  const current = locales.find((l) => l.code === locale) ?? locales[0];

  const select = (code: string) => {
    setOpen(false);
    if (code === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: code as 'pt' | 'en' });
    });
  };

  return (
    <div className='relative'>
      <button
        onClick={() => setOpen((v) => !v)}
        disabled={isPending}
        className='flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1.5 text-xs font-semibold text-neutral-300 transition-all hover:border-white/20 hover:text-white disabled:opacity-50'
        aria-label='Switch language'
        aria-expanded={open}
      >
        <Image src={current.flag} alt={current.label} width={18} height={18} className='rounded-sm object-cover' />
        <span>{current.label}</span>
        <svg className={`h-3 w-3 text-neutral-600 transition-transform ${open ? 'rotate-180' : ''}`} viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.5'><path d='m6 9 6 6 6-6'/></svg>
      </button>

      <AnimatePresence>
        {open && (
          <>
            <div className='fixed inset-0 z-10' onClick={() => setOpen(false)} />
            <motion.ul
              initial={{ opacity: 0, y: -4, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.97 }}
              transition={{ duration: 0.15 }}
              className='absolute right-0 top-full z-20 mt-1.5 min-w-[110px] overflow-hidden rounded-xl border border-white/10 bg-theme-800 shadow-xl shadow-black/40'
            >
              {locales.map(({ code, label, flag }) => (
                <li key={code}>
                  <button
                    onClick={() => select(code)}
                    className={`flex w-full items-center gap-2.5 px-3 py-2.5 text-xs font-semibold transition-colors hover:bg-white/5 ${
                      code === locale ? 'text-theme-400' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <Image src={flag} alt={label} width={18} height={18} className='rounded-sm object-cover' />
                    {label}
                    {code === locale && <span className='ml-auto h-1.5 w-1.5 rounded-full bg-theme-400' />}
                  </button>
                </li>
              ))}
            </motion.ul>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────

const WA_HREF =
  'https://api.whatsapp.com/send?phone=+556592952018&text=Ol%C3%A1%F0%9F%98%80!+Gostaria+de+saber+mais+sobre+a+UPBOOST%2C+como+funcionam+os+planos+para+mais+desempenho+na+minha+m%C3%A1quina%3F';

export const Navbar = () => {
  const t = useTranslations('Navbar');
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const close = () => setIsOpen(false);

  const navLinks = [
    { label: t('home'), href: '/#inicio', icon: HomeIcon },
    { label: t('plans'), href: '#planos', icon: ShoppingCart, accent: true },
    { label: t('faq'), href: '#faq', icon: ShieldQuestion },
    { label: t('about'), href: '#sobrenos', icon: Building },
  ];

  const scrollTo = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const hash = href.includes('#') ? href.split('#')[1] : null;
    if (!hash) return;
    const el = document.getElementById(hash);
    if (!el) return;
    e.preventDefault();
    close();
    const top = el.getBoundingClientRect().top + window.scrollY - 100;
    window.scrollTo({ top, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
                    onClick={(e) => scrollTo(e, href)}
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

            <div className='flex items-center gap-3'>
              <LocaleSwitcher />
              <Link
                href={WA_HREF}
                target='_blank'
                rel='noopener noreferrer'
                className='flex shrink-0 items-center gap-2 rounded-xl border border-theme-400/30 bg-theme-400/10 px-5 py-2.5 text-sm font-semibold text-theme-400 transition-all hover:border-theme-400/55 hover:bg-theme-400/15'
              >
                <PhoneCall className='h-3.5 w-3.5' />
                {t('cta')}
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile top bar */}
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
              aria-label={t('openMenu')}
            >
              <Menu className='h-[18px] w-[18px]' />
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile drawer ─────────────────────────────────── */}
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
                  aria-label={t('closeMenu')}
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
                    onClick={(e) => scrollTo(e, href)}
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
              <div className='relative flex flex-col gap-2 border-t border-white/5 p-4'>
                <Link
                  href={WA_HREF}
                  target='_blank'
                  rel='noopener noreferrer'
                  onClick={close}
                  className='flex w-full items-center justify-center gap-2 rounded-xl bg-theme-400 py-3 text-sm font-semibold text-theme-900 transition-colors hover:bg-theme-400/90'
                >
                  <PhoneCall className='h-4 w-4' />
                  {t('cta')}
                </Link>
                <div className='flex justify-center'>
                  <LocaleSwitcher />
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
