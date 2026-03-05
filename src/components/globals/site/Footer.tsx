'use client';

import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import {
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  ShoppingCart,
} from 'lucide-react';
import Link from 'next/link';
import { useRef } from 'react';

const ease = [0.22, 1, 0.36, 1] as const;

const navLinks = [
  { label: 'Início', href: '#inicio' },
  { label: 'Planos', href: '#planos' },
  { label: 'Sobre nós', href: '#sobrenos' },
  { label: 'FAQ', href: '#faq' },
];

const legalLinks = [
  { label: 'Termos de uso', href: '/termos-de-uso' },
  { label: 'Privacidade', href: '/politica-de-privacidade' },
  { label: 'Aviso Legal', href: '/aviso-legal' },
  { label: 'Reembolso', href: '/politica-de-reembolso' },
];

const statPills = ['+200 FPS de ganho', '+12.000 clientes', '+10 países'];

// ── Logo ───────────────────────────────────────────────────────────────────────

const Logo = () => (
  <svg
    width='218'
    height='168'
    viewBox='0 0 218 168'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    className='w-12'
  >
    <path
      d='M0 0H44.3717V145.655C44.3717 157.908 34.4387 167.841 22.1858 167.841C9.93294 167.841 0 157.908 0 145.655V0Z'
      fill='#FFD300'
    />
    <path
      d='M86.8141 0H131.186V148.549C131.186 159.203 122.548 167.841 111.894 167.841H86.8141V0Z'
      fill='#FFD300'
    />
    <path
      d='M173.628 0H218V84.885C218 95.5397 209.363 104.177 198.708 104.177H173.628V0Z'
      fill='#FFD300'
    />
  </svg>
);

// ── Social button with cursor glow ─────────────────────────────────────────────

const SocialButton = ({
  href,
  children,
  label,
}: {
  href: string;
  children: React.ReactNode;
  label: string;
}) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const mouseX = useMotionValue(-999);
  const mouseY = useMotionValue(-999);
  const glow = useMotionTemplate`radial-gradient(60px circle at ${mouseX}px ${mouseY}px, rgba(255,211,0,0.18), transparent 80%)`;

  return (
    <motion.a
      ref={ref}
      href={href}
      target='_blank'
      rel='noopener noreferrer'
      aria-label={label}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (r) {
          mouseX.set(e.clientX - r.left);
          mouseY.set(e.clientY - r.top);
        }
      }}
      onMouseLeave={() => {
        mouseX.set(-999);
        mouseY.set(-999);
      }}
      whileHover={{ scale: 1.1, borderColor: 'rgba(255,211,0,0.35)' }}
      whileTap={{ scale: 0.93 }}
      transition={{ duration: 0.18 }}
      className='border-white/8 relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl border bg-white/[0.04] text-neutral-400 backdrop-blur-sm transition-colors hover:text-white'
    >
      <motion.div
        aria-hidden
        className='pointer-events-none absolute inset-0'
        style={{ background: glow }}
      />
      <span className='relative z-10'>{children}</span>
    </motion.a>
  );
};

// ── Component ──────────────────────────────────────────────────────────────────

export const Footer = () => (
  <footer className='relative overflow-hidden bg-theme-900'>
    {/* Animated top line */}
    <motion.div
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.4, ease }}
      className='h-px w-full origin-center bg-gradient-to-r from-transparent via-theme-400/40 to-transparent'
    />

    {/* Ambient glow */}
    <div
      aria-hidden
      className='pointer-events-none absolute inset-x-0 top-0 h-80'
      style={{
        background:
          'radial-gradient(ellipse 55% 100% at 50% 0%, rgba(255,211,0,0.055) 0%, transparent 100%)',
      }}
    />

    {/* Main grid */}
    <div className='container relative z-10 py-20'>
      <div className='grid grid-cols-3 items-start gap-16 max-lg:grid-cols-1 max-lg:gap-12'>
        {/* ── Col 1: Brand ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease }}
          className='flex flex-col gap-6'
        >
          <div className='flex items-center gap-3'>
            <Logo />
            <span className='font-sora text-2xl font-bold uppercase tracking-tight text-theme-400'>
              Up<span className='font-thin'>Boost</span>
            </span>
          </div>

          <p className='max-w-[210px] text-sm leading-relaxed text-neutral-500'>
            Transformamos desempenho fraco em experiência épica — frame a frame.
          </p>

          {/* Stat pills */}
          <div className='flex flex-col gap-2'>
            {statPills.map((s, i) => (
              <motion.span
                key={s}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease, delay: 0.1 + i * 0.08 }}
                className='border-white/8 inline-flex w-fit items-center gap-2 rounded-full border bg-white/[0.03] px-3 py-1 text-xs text-neutral-400'
              >
                <span className='h-1 w-1 rounded-full bg-theme-400' />
                {s}
              </motion.span>
            ))}
          </div>

          <div className='flex items-start gap-2 text-xs text-neutral-600'>
            <MapPin className='mt-0.5 h-3 w-3 shrink-0' />
            <span>Dom Aquino — Cuiabá, MT</span>
          </div>
        </motion.div>

        {/* ── Col 2: Nav + Contato ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease, delay: 0.1 }}
          className='flex flex-col gap-10'
        >
          <div>
            <p className='mb-4 text-[10px] font-semibold uppercase tracking-widest text-neutral-600'>
              Navegação
            </p>
            <ul className='flex flex-col gap-3'>
              {navLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className='group inline-flex items-center text-sm text-neutral-400 transition-colors hover:text-white'
                  >
                    <motion.span
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.18 }}
                    >
                      {label}
                    </motion.span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className='mb-4 text-[10px] font-semibold uppercase tracking-widest text-neutral-600'>
              Contato
            </p>
            <div className='flex flex-col gap-3'>
              <Link
                href='mailto:support@upboost.pro'
                className='group inline-flex items-center gap-2.5 text-sm text-neutral-400 transition-colors hover:text-white'
              >
                <Mail className='h-3.5 w-3.5 shrink-0 text-neutral-600 transition-colors group-hover:text-theme-400' />
                support@upboost.pro
              </Link>
              <Link
                href='https://api.whatsapp.com/send?phone=+556592952018&text=Olá😀!+Gostaria+de+saber+mais+sobre+a+UPBOOST'
                target='_blank'
                rel='noopener noreferrer'
                className='group inline-flex items-center gap-2.5 text-sm text-neutral-400 transition-colors hover:text-white'
              >
                <MessageCircle className='h-3.5 w-3.5 shrink-0 text-neutral-600 transition-colors group-hover:text-theme-400' />
                WhatsApp
              </Link>
            </div>
          </div>
        </motion.div>

        {/* ── Col 3: CTA card + social ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease, delay: 0.2 }}
          className='flex flex-col gap-6'
        >
          {/* CTA card */}
          <div className='border-white/8 relative overflow-hidden rounded-2xl border bg-theme-800 p-6'>
            <div
              aria-hidden
              className='pointer-events-none absolute inset-0'
              style={{
                background:
                  'radial-gradient(ellipse 85% 55% at 50% 0%, rgba(255,211,0,0.07) 0%, transparent 70%)',
              }}
            />
            <div className='relative z-10 mb-1 flex h-8 w-8 items-center justify-center rounded-lg border border-theme-400/20 bg-theme-400/10'>
              <ShoppingCart className='h-3.5 w-3.5 text-theme-400' />
            </div>
            <h3 className='relative z-10 mt-3 font-sora text-base font-bold text-white'>
              Pronto para turbinar seu PC?
            </h3>
            <p className='relative z-10 mt-1 text-xs text-neutral-500'>
              Mais de 12.000 clientes já jogam no próximo nível.
            </p>
            <Link href='#planos' className='relative z-10 mt-5 block'>
              <motion.button
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.15 }}
                className='flex w-full items-center justify-center gap-2 rounded-xl bg-theme-400 py-2.5 text-sm font-semibold text-theme-900 transition-colors hover:bg-theme-400/90'
              >
                Ver planos
              </motion.button>
            </Link>
          </div>

          {/* Social */}
          <div>
            <p className='mb-3 text-[10px] font-semibold uppercase tracking-widest text-neutral-600'>
              Redes sociais
            </p>
            <div className='flex gap-2'>
              <SocialButton
                href='https://www.instagram.com/upboost_'
                label='Instagram'
              >
                <Instagram className='h-4 w-4' />
              </SocialButton>

              <SocialButton
                href='https://www.tiktok.com/@upboost_'
                label='TikTok'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='currentColor'
                  width='15'
                  height='15'
                  viewBox='0 0 512 512'
                >
                  <path d='M412.19,118.66a109.27,109.27,0,0,1-9.45-5.5,132.87,132.87,0,0,1-24.27-20.62c-18.1-20.71-24.86-41.72-27.35-56.43h.1C349.14,23.9,350,16,350.13,16H267.69V334.78c0,4.28,0,8.51-.18,12.69,0,.52-.05,1-.08,1.56,0,.23,0,.47-.05.71,0,.06,0,.12,0,.18a70,70,0,0,1-35.22,55.56,68.8,68.8,0,0,1-34.11,9c-38.41,0-69.54-31.32-69.54-70s31.13-70,69.54-70a68.9,68.9,0,0,1,21.41,3.39l.1-83.94a153.14,153.14,0,0,0-118,34.52,161.79,161.79,0,0,0-35.3,43.53c-3.48,6-16.61,30.11-18.2,69.24-1,22.21,5.67,45.22,8.85,54.73v.2c2,5.6,9.75,24.71,22.38,40.82A167.53,167.53,0,0,0,115,470.66v-.2l.2.2C155.11,497.78,199.36,496,199.36,496c7.66-.31,33.32,0,62.46-13.81,32.32-15.31,50.72-38.12,50.72-38.12a158.46,158.46,0,0,0,27.64-45.93c7.46-19.61,9.95-43.13,9.95-52.53V176.49c1,.6,14.32,9.41,14.32,9.41s19.19,12.3,49.13,20.31c21.48,5.7,50.42,6.9,50.42,6.9V131.27C453.86,132.37,433.27,129.17,412.19,118.66Z' />
                </svg>
              </SocialButton>

              <SocialButton
                href='https://linktr.ee/upboostpro'
                label='Linktree'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='currentColor'
                  width='15'
                  height='15'
                  viewBox='0 0 24 24'
                >
                  <path d='m13.511 5.853 4.005-4.117 2.317 2.395-4.2 4.005h5.893v3.27h-5.893l4.2 4.004-2.317 2.395-5.56-5.57-5.558 5.57-2.317-2.395 4.2-4.004H2.375v-3.27h5.893L4.072 4.13l2.317-2.395 4.005 4.117V0h3.117zm-3.117 12.015h3.117V24h-3.117z' />
                </svg>
              </SocialButton>
            </div>
          </div>
        </motion.div>
      </div>
    </div>

    {/* ── Bottom bar ── */}
    <div className='border-t border-white/[0.05]'>
      <div className='container flex flex-wrap items-center justify-between gap-3 py-5'>
        <p className='text-xs text-neutral-600'>
          © UpBoost {new Date().getFullYear()} — Todos os direitos reservados.
        </p>
        <div className='flex flex-wrap items-center gap-x-5 gap-y-1.5'>
          {legalLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className='text-xs text-neutral-600 transition-colors hover:text-neutral-400'
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  </footer>
);
