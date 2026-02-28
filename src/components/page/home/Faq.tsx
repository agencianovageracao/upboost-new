'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useState } from 'react';

const ease = [0.22, 1, 0.36, 1] as const;

const items = [
  {
    title: 'Como é realizado o processo de otimização do Windows?',
    response:
      'A otimização é realizada através de um aplicativo remoto, utilizando o AnyDesk.',
  },
  {
    title: 'Como posso confiar na empresa Upboost?',
    response:
      'Contamos com mais de 4000 feedbacks positivos em nosso perfil nos destaques de clientes.',
  },
  {
    title: 'É necessário pagar mensalmente?',
    response:
      'O pagamento é feito apenas uma vez. A otimização será removida apenas se você formatar a máquina.',
  },
  {
    title: 'Preciso comprar um pacote para cada jogo que eu jogo?',
    response:
      'Não, os pacotes otimizam o Windows como um todo, beneficiando todos os seus jogos, trabalhos e a agilidade geral da máquina.',
  },
  {
    title: 'A Upboost funciona em consoles?',
    response:
      'A mais recente inovação da Upboost para consoles chegou! Reduza até 5ms de delay no seu controle e eleve sua performance nos jogos!',
  },
  {
    title: 'Quanto tempo demora o processo de otimização?',
    response:
      'O processo de otimização leva cerca de 10 a 20 minutos dependendo do pacote escolhido.',
  },
];

export const Faq = () => {
  const [open, setOpen] = useState<number | null>(null);

  const toggle = (i: number) => setOpen(prev => (prev === i ? null : i));

  return (
    <section className='bg-theme-900 py-20'>
      <div className='container'>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className='mb-12 text-center'
        >
          <h2 className='font-sora text-3xl font-bold max-lg:text-2xl'>
            Perguntas <span className='text-theme-400'>frequentes</span>
          </h2>
          <p className='mt-2 text-sm text-neutral-400'>
            Perguntas que nossos clientes geralmente fazem
          </p>
        </motion.div>

        {/* Items */}
        <div className='mx-auto flex max-w-2xl flex-col gap-3'>
          {items.map((item, i) => {
            const isOpen = open === i;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease, delay: i * 0.055 }}
              >
                <motion.div
                  className='group relative overflow-hidden rounded-2xl border bg-white/[0.03] backdrop-blur-sm'
                  animate={{
                    borderColor: isOpen
                      ? 'rgba(255,211,0,0.2)'
                      : 'rgba(255,255,255,0.07)',
                  }}
                  whileHover={{
                    borderColor: isOpen
                      ? 'rgba(255,211,0,0.25)'
                      : 'rgba(255,255,255,0.12)',
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Ambient glow */}
                  <motion.div
                    aria-hidden
                    className='pointer-events-none absolute inset-0'
                    animate={{ opacity: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.4 }}
                    style={{
                      background:
                        'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(255,211,0,0.05) 0%, transparent 70%)',
                    }}
                  />

                  {/* Trigger */}
                  <button
                    onClick={() => toggle(i)}
                    className='relative z-10 flex w-full items-center justify-between gap-4 px-6 py-5 text-left'
                  >
                    <span
                      className={`font-sora text-sm font-semibold leading-snug transition-colors duration-200 ${
                        isOpen ? 'text-white' : 'text-neutral-300'
                      }`}
                    >
                      {item.title}
                    </span>

                    <motion.div
                      className='flex h-7 w-7 shrink-0 items-center justify-center rounded-full border bg-theme-700'
                      animate={{
                        rotate: isOpen ? 45 : 0,
                        borderColor: isOpen
                          ? 'rgba(255,211,0,0.35)'
                          : 'rgba(255,255,255,0.09)',
                        color: isOpen ? '#FFD300' : '#71717a',
                      }}
                      transition={{ duration: 0.25, ease }}
                    >
                      <Plus className='h-3.5 w-3.5' />
                    </motion.div>
                  </button>

                  {/* Content */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key='content'
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease }}
                        className='overflow-hidden'
                      >
                        <div className='relative z-10 border-t border-white/5 px-6 py-5'>
                          <p className='text-sm leading-relaxed text-neutral-400'>
                            {item.response}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
