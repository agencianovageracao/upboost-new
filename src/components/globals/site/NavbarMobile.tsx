'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
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
import { useState } from 'react';

export const NavbarMobile = () => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [isNavbarClosing, setIsNavbarClosing] = useState(false);

  const toggleNav = () => {
    if (isNavbarOpen) {
      setIsNavbarClosing(true);
      setTimeout(() => {
        setIsNavbarClosing(false);
        setIsNavbarOpen(false);
      }, 200);
    } else {
      setIsNavbarOpen(true);
    }
  };

  return (
    <>
      {isNavbarOpen && (
        <div
          onClick={toggleNav}
          className='fixed bottom-0 left-0 right-0 top-0 z-[1500] h-screen w-screen bg-theme-900/60 text-theme-900'
        >
          <aside
            className={cn(
              'fixed bottom-0 left-0 top-0 w-[85vw] animate-nav-open rounded-bl-xl rounded-tr-xl bg-theme-400 p-8 lg:hidden',
              isNavbarClosing ? 'animate-nav-close' : ''
            )}
          >
            <div className='flex items-center justify-between'>
              <Image
                src='/images/brand/logo-dark.svg'
                alt='Logo da UpBoost'
                width={71.44}
                height={55}
              />
              <button className='text-theme-900' onClick={toggleNav}>
                <X size={48} />
              </button>
            </div>
            <div>
              <ul className='mt-20 flex flex-col gap-4'>
                <li>
                  <Link
                    className='flex w-full items-center justify-center gap-3 rounded-lg bg-theme-700 px-8 py-4 text-center text-lg font-bold text-white'
                    href='#inicio'
                  >
                    <HomeIcon />
                    Início
                  </Link>
                </li>
                <li>
                  <Link
                    className='flex w-full items-center justify-center gap-3 rounded-lg bg-theme-700 px-8 py-4 text-center text-lg font-bold text-white'
                    href='#faq'
                  >
                    <ShieldQuestion />
                    F.A.Q
                  </Link>
                </li>
                <li>
                  <Link
                    className='flex w-full items-center justify-center gap-3 rounded-lg bg-theme-700 px-8 py-4 text-center text-lg font-bold text-white'
                    href='#planos'
                  >
                    <ShoppingCart />
                    Planos
                  </Link>
                </li>
                <li>
                  <Link
                    className='flex w-full items-center justify-center gap-3 rounded-lg bg-theme-700 px-8 py-4 text-center text-lg font-bold text-white'
                    href='#sobrenos'
                  >
                    <Building />
                    Sobre nós
                  </Link>
                </li>
                <li>
                  <Link
                    className='flex w-full items-center justify-center gap-3 rounded-lg bg-theme-700 px-8 py-4 text-center text-lg font-bold text-white'
                    href='#pq'
                  >
                    <MessageCircle />
                    Por que
                  </Link>
                </li>
              </ul>
            </div>
            <Link href='https://wa.me/556592952018' target='_blank'>
              <Button variant='secondary' className='mt-20 w-full'>
                <PhoneCall />
                Fale conosco
              </Button>
            </Link>
          </aside>
        </div>
      )}
      <nav className='absolute top-0 z-[40] w-screen py-10 lg:hidden'>
        <div className='container flex items-center justify-between'>
          <div className='basis-1/6'>
            <Image
              src='/images/brand/logo.svg'
              alt='Logo da UpBoost'
              width={71.44}
              height={55}
            />
          </div>
          <div className='basis-4/6' />
          <div className='flex basis-1/6 items-center justify-end gap-5'>
            <Button onClick={toggleNav} size='icon'>
              <Menu size={32} />
            </Button>
          </div>
        </div>
      </nav>
    </>
  );
};
