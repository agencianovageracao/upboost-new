'use client';

import { Button } from '@/components/ui/button';
import { Instagram, PhoneCall, SquareArrowOutUpRight } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export const Footer = () => {
  return (
    <footer>
      <div className='relative bg-theme-800'>
        {/* Grid background pattern */}
        <div className='absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px]'></div>

        {/* Decorative top border */}
        <motion.div
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          className='absolute left-1/2 top-0 h-px -translate-x-1/2 bg-gradient-to-r from-transparent via-theme-400/20 to-transparent'
        />

        <div className='relative p-16'>
          <div className='container'>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-16'>
              {/* Logo and Company Info Section */}
              <div className='space-y-8'>
                <svg
                  width='218'
                  height='168'
                  viewBox='0 0 218 168'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                  className='w-40'
                >
                  <path
                    d='M0 0H44.3717V145.655C44.3717 157.908 34.4387 167.841 22.1858 167.841V167.841C9.93294 167.841 0 157.908 0 145.655V0Z'
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

                <div>
                  <h1 className='text-2xl font-bold mb-4 text-theme-400'>UpBoost</h1>
                  <p className='text-sm leading-relaxed text-zinc-300/90 mb-8'>
                    Nós podemos fazer mágica! Transformamos jogos com desempenho
                    lento em experiências épicas, tornando cada frame memorável. O
                    poder da otimização está aqui!
                  </p>
                </div>

                <div className='space-y-4'>
                  <h2 className='font-medium text-zinc-300'>
                    Fale conosco via e-mail{' '}
                    <Link className='font-bold text-theme-400 hover:underline transition-all' href='mailto:support@upboost.pro'>
                      support@upboost.pro
                    </Link>
                  </h2>
                  <div className='text-sm space-y-2 text-zinc-400'>
                    <p><span className='font-semibold text-zinc-300'>CNPJ:</span> 57.482.889/0001-08</p>
                    <p><span className='font-semibold text-zinc-300'>Endereço:</span> R. Comendador Henrique, Dom Aquino - Cuiabá, MT, 78015-050</p>
                  </div>
                </div>
              </div>

              {/* Middle Column Spacer */}
              <div />

              {/* Links and Contact Section */}
              <div className='space-y-8'>
                <div>
                  <h1 className='text-2xl font-bold mb-6 text-theme-400'>Links Úteis</h1>
                  <ul className='space-y-3'>
                    <li>
                      <Link href='#inicio' className='text-lg text-zinc-300 hover:text-theme-400 transition-all hover:translate-x-1 inline-block'>
                        Início
                      </Link>
                    </li>
                    <li>
                      <Link href='#faq' className='text-lg text-zinc-300 hover:text-theme-400 transition-all hover:translate-x-1 inline-block'>
                        F.A.Q
                      </Link>
                    </li>
                    <li>
                      <Link href='#planos' className='text-lg text-zinc-300 hover:text-theme-400 transition-all hover:translate-x-1 inline-block'>
                        Planos
                      </Link>
                    </li>
                  </ul>
                </div>

                <Link
                  target='_blank'
                  href='https://api.whatsapp.com/send?phone=+556592952018&text=Olá😀!+Gostaria+de+saber+mais+sobre+a+UPBOOST%2C+como+funcionam+os+planos+para+mais+desempenho+na+minha+máquina%3F'
                >
                  <Button variant='secondary' className='w-full mt-4 md:w-auto gap-2 hover:scale-105 transition-transform bg-theme-400 text-zinc-900 hover:bg-theme-400/90'>
                    <PhoneCall className='w-4 h-4' />
                    Fale conosco
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className='bg-theme-900/80 backdrop-blur-sm py-6 px-5 border-t border-theme-400/10'>
        <div className='container flex flex-col md:flex-row items-center justify-between gap-6'>
          <div className='text-center md:text-left'>
            <h1 className='mb-2 text-zinc-300'>Todos os direitos reservados &copy; UpBoost 2024.</h1>
            <p className='text-xs text-zinc-400 space-x-1'>
              Ao adquirir qualquer pacote da upboost você concorda com nossos
              {[
                ['Termos de uso', '/termos-de-uso'],
                ['Política de Privacidade', '/politica-de-privacidade'],
                ['Aviso Legal', '/aviso-legal'],
                ['Política de Reembolso', '/politica-de-reembolso']
              ].map(([text, href], index) => (
                <>
                  {index > 0 && ' e '}
                  <Link
                    key={href}
                    className='font-bold text-theme-400 hover:underline'
                    href={href}
                  >
                    {text}
                  </Link>
                </>
              ))}
              .
            </p>
          </div>

          <div className='flex items-center gap-3'>
            {[
              { href: 'https://linktr.ee/upboostpro', icon: <SquareArrowOutUpRight className='w-5 h-5' /> },
              { href: 'https://www.instagram.com/upboost_', icon: <Instagram className='w-5 h-5' /> },
              {
                href: 'https://www.tiktok.com/@upboost_',
                icon: <svg xmlns='http://www.w3.org/2000/svg' fill='currentColor' width='20' height='20' viewBox='0 0 512 512'>
                  <path d='M412.19,118.66a109.27,109.27,0,0,1-9.45-5.5,132.87,132.87,0,0,1-24.27-20.62c-18.1-20.71-24.86-41.72-27.35-56.43h.1C349.14,23.9,350,16,350.13,16H267.69V334.78c0,4.28,0,8.51-.18,12.69,0,.52-.05,1-.08,1.56,0,.23,0,.47-.05.71,0,.06,0,.12,0,.18a70,70,0,0,1-35.22,55.56,68.8,68.8,0,0,1-34.11,9c-38.41,0-69.54-31.32-69.54-70s31.13-70,69.54-70a68.9,68.9,0,0,1,21.41,3.39l.1-83.94a153.14,153.14,0,0,0-118,34.52,161.79,161.79,0,0,0-35.3,43.53c-3.48,6-16.61,30.11-18.2,69.24-1,22.21,5.67,45.22,8.85,54.73v.2c2,5.6,9.75,24.71,22.38,40.82A167.53,167.53,0,0,0,115,470.66v-.2l.2.2C155.11,497.78,199.36,496,199.36,496c7.66-.31,33.32,0,62.46-13.81,32.32-15.31,50.72-38.12,50.72-38.12a158.46,158.46,0,0,0,27.64-45.93c7.46-19.61,9.95-43.13,9.95-52.53V176.49c1,.6,14.32,9.41,14.32,9.41s19.19,12.3,49.13,20.31c21.48,5.7,50.42,6.9,50.42,6.9V131.27C453.86,132.37,433.27,129.17,412.19,118.66Z' />
                </svg>
              }
            ].map(({ href, icon }) => (
              <Link key={href} target='_blank' href={href}>
                <Button
                  size='icon'
                  className='hover:scale-110 transition-transform bg-theme-400/10 hover:bg-theme-400/20 text-zinc-300'
                >
                  {icon}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
