import { Title } from '@/components/globals/site/Title';
import { BuyConsoleProductDialog } from './BuyConsoleProductDialog';
import { Button } from '@/components/ui/button';
import { AlertCircle, ShoppingCart, Star } from 'lucide-react';

export const ConsolePlans = () => {
  return (
    <section className='mb-[150px]'>
      <Title title='Nossos planos de Controle' center>
        <p className='text-lg'>
          Deixe seu controle com 0 <b>delay</b> ou reembolsamos seu{' '}
          <b>dinheiro de volta</b>
        </p>
      </Title>
      <div className='container'>
        <img
          className='mt-4 w-full rounded-lg'
          src='/images/assets/arte-site.png'
          alt='Imagem promocional do site'
        />
        <div className='mt-5 flex items-center justify-center gap-5 max-lg:flex-col'>
          <div className='w-full max-w-[380px] rounded-xl bg-theme-800 p-5 transition-all hover:scale-105 hover:ring-1 hover:ring-theme-400'>
            <h1 className='text-center text-2xl font-bold text-theme-400'>
              Pacote Único
            </h1>
            <p className='text-md mt-1 text-center text-neutral-100'>
              Reduza o input lag e delay do seu controle com a UpBoost em uma
              única sessão! Serviço remoto e seguro para uma jogabilidade mais
              fluida e precisa no controle.
            </p>
            <div className='my-5 text-center'>
              <h1 className='text-center text-4xl font-bold text-theme-400'>
                R$ 35,90
              </h1>
              <span className='-mt-1 block text-sm font-normal text-neutral-300'>
                /pago uma vez
              </span>
            </div>
            <BuyConsoleProductDialog link='https://pay.kirvano.com/8d3f6ae0-6d98-4f1a-bea6-fb383e5f2c77'>
              <Button className='mt-3 w-full'>
                <ShoppingCart />
                Comprar agora
              </Button>
            </BuyConsoleProductDialog>
          </div>
          <div className='relative w-full max-w-[380px] overflow-hidden rounded-xl bg-theme-800 p-5 transition-all hover:scale-105 hover:ring-1 hover:ring-theme-400'>
            <div className='absolute -left-10 -top-10 flex h-20 w-20 items-end justify-end rounded-full bg-theme-400 p-3 text-theme-900'>
              <Star />
            </div>
            <h1 className='text-center text-2xl font-bold text-theme-400'>
              Pacote Mensal
            </h1>
            <p className='text-md mt-1 text-center text-neutral-100'>
              Reduza o input lag e delay do seu controle com a UpBoost em uma
              assinatura MENSAL! <b className='text-theme-400'>Refaça</b> a
              otimização semanalmente e garanta uma jogabilidade mais fluida e
              precisa no seu controle com total segurança.
            </p>
            <div className='my-5 text-center'>
              <h1 className='text-center text-4xl font-bold text-theme-400'>
                R$ 45,90
              </h1>
              <span className='-mt-1 block text-sm font-normal text-neutral-300'>
                /mês
              </span>
            </div>
            <BuyConsoleProductDialog link='https://pay.kirvano.com/d5d85180-526d-4a40-a06f-326ef17fb978'>
              <Button className='mt-3 w-full'>
                <ShoppingCart />
                Comprar agora
              </Button>
            </BuyConsoleProductDialog>
          </div>
        </div>

        <div className='mt-10 flex items-center justify-center'>
          <div className='flex w-full max-w-[60%] items-center gap-5 rounded-xl border-2 border-theme-400 p-10 max-lg:max-w-full'>
            <h1 className='text-theme-400 max-md:hidden'>
              <AlertCircle size={48} />
            </h1>
            <div>
              <h1 className='text-xl font-bold text-theme-400 max-lg:text-lg'>
                Para garantir um atendimento eficiente, certifique-se de ter:
              </h1>
              <p className='mt-2 text-neutral-100 max-lg:text-sm'>
                Um computador ou notebook com Windows instalado (qualquer modelo
                serve). Um cabo para conectar o controle ao computador. Esses
                itens são essenciais para que possamos otimizar seu controle com
                a máxima eficiência!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
