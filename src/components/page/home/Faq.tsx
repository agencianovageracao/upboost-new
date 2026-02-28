'use client';

import { Title } from '@/components/globals/site/Title';
import * as Accordion from '@radix-ui/react-accordion';
import { Plus } from 'lucide-react';

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
  return (
    <section className='mb-[150px]'>
      <Title
        title='F.A.Q'
        description='Perguntas que nossos clientes geralmente fazem'
        center
      />
      <div className='container'>
        <Accordion.Root
          className='AccordionRoot mt-10 grid w-full grid-cols-2 justify-between gap-8 max-lg:grid-cols-1'
          type='multiple'
        >
          {items.map((item, index) => {
            return (
              <Accordion.Item
                data-state='closed'
                className='h-fit overflow-hidden rounded'
                value={`item-${index}`}
                key={index}
              >
                <Accordion.AccordionTrigger className='faq-trigger flex w-full items-center gap-4 rounded border-2 border-theme-800 bg-theme-800 p-5'>
                  <div className='chevron flex h-full min-h-14 min-w-14 items-center justify-center rounded bg-theme-400 text-theme-900'>
                    <div className='icon'>
                      <Plus size={32} />
                    </div>
                  </div>
                  <h1 className='text-left font-sora text-2xl text-white max-lg:text-base'>
                    {item.title}
                  </h1>
                </Accordion.AccordionTrigger>
                <Accordion.AccordionContent className='faq-content border-4 border-theme-800'>
                  <div className='p-5'>
                    <p className='text-lg max-lg:text-sm'>{item.response}</p>
                  </div>
                </Accordion.AccordionContent>
              </Accordion.Item>
            );
          })}
        </Accordion.Root>
      </div>
    </section>
  );
};
