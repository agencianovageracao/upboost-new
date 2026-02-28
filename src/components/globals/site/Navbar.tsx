import { PhoneCall } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const navLinks = [
  { label: 'Início',    href: '/#inicio'  },
  { label: 'Planos',    href: '#planos',   accent: true },
  { label: 'FAQ',       href: '#faq'      },
  { label: 'Sobre nós', href: '#sobrenos' },
  { label: 'Por que nós', href: '#pq'     },
];

const WA_HREF =
  'https://api.whatsapp.com/send?phone=+556592952018&text=Ol%C3%A1%F0%9F%98%80!+Gostaria+de+saber+mais+sobre+a+UPBOOST%2C+como+funcionam+os+planos+para+mais+desempenho+na+minha+m%C3%A1quina%3F';

export const Navbar = () => {
  return (
    <nav className='max-lg:hidden'>
      <div className='container flex items-center justify-between'>

        {/* ── Wordmark ── */}
        <Link href='/' className='flex shrink-0 items-center gap-2.5 transition-opacity hover:opacity-80'>
          <Image
            src='/images/brand/logo.svg'
            alt='UpBoost'
            width={36}
            height={28}
            className='shrink-0'
          />
          <span className='font-sora text-lg font-bold uppercase tracking-tight text-white'>
            Up<span className='text-theme-400'>Boost</span>
          </span>
        </Link>

        {/* ── Nav links ── */}
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

        {/* ── CTA ── */}
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
    </nav>
  );
};
