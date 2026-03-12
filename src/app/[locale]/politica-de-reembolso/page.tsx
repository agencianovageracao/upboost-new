import { Footer } from '@/components/globals/site/Footer';
import { Navbar } from '@/components/globals/site/Navbar';
import { getLocale } from 'next-intl/server';

export async function generateMetadata() {
  const locale = await getLocale();
  return {
    title: locale === 'en' ? 'Refund Policy — UpBoost' : 'Política de Reembolso — UpBoost',
  };
}

export default async function RefundPolicy() {
  const locale = await getLocale();
  const en = locale === 'en';

  return (
    <>
      <header className='bg-theme-900 pt-24 pb-16'>
        <Navbar />
        <div className='container flex flex-col items-center justify-center text-center'>
          <h1 className='font-sora text-4xl font-bold text-theme-400 max-sm:text-3xl'>
            {en ? 'Refund Policy' : 'Política de Reembolso'}
          </h1>
          <p className='mt-2 text-sm text-neutral-500'>
            UpBoost › {en ? 'Refund Policy' : 'Política de Reembolso'}
          </p>
        </div>
      </header>

      <main className='bg-theme-800'>
        <div className='pointer-events-none h-px bg-gradient-to-r from-transparent via-white/10 to-transparent' />
        <div className='container max-w-3xl py-16 flex flex-col gap-10'>

          {(en ? sectionsEn : sectionsPt).map(({ title, content }, i) => (
            <section key={i} className='flex flex-col gap-3'>
              <h2 className='font-sora text-base font-semibold text-theme-400'>
                <span className='mr-2 text-neutral-600'>{i + 1}.</span>
                {title}
              </h2>
              <div className='flex flex-col gap-2 text-sm leading-relaxed text-neutral-400'>
                {content}
              </div>
            </section>
          ))}

          <p className='border-t border-white/5 pt-8 text-xs text-neutral-600'>
            {en
              ? 'By purchasing any UpBoost plan, you fully accept this Refund Policy.'
              : 'Ao adquirir qualquer pacote da UpBoost, você aceita integralmente esta Política de Reembolso.'}
          </p>
        </div>
        <div className='pointer-events-none h-px bg-gradient-to-r from-transparent via-white/10 to-transparent' />
      </main>

      <Footer />
    </>
  );
}

const sectionsPt: { title: string; content: React.ReactNode }[] = [
  {
    title: 'Natureza do Serviço',
    content: (
      <>
        <p>
          Os serviços oferecidos pela UpBoost são serviços digitais personalizados, realizados
          diretamente no computador do cliente por meio de acesso remoto.
        </p>
        <p>
          Uma vez executada a otimização, as alterações permanecem aplicadas no sistema do cliente,
          caracterizando a entrega completa do serviço contratado.
        </p>
      </>
    ),
  },
  {
    title: 'Política Geral de Reembolso',
    content: (
      <p>
        Devido à natureza do serviço prestado, não são aceitos pedidos de reembolso após a execução
        da otimização, podendo haver exceções, que devem ser pré-acordadas.
      </p>
    ),
  },
  {
    title: 'Sistemas Já Otimizados',
    content: (
      <p>
        Caso seja identificado que o sistema do cliente já se encontrava previamente otimizado, o
        serviço ainda será considerado executado.
      </p>
    ),
  },
  {
    title: 'Exceções',
    content: (
      <p>
        Em situações específicas e comprovadas, a UpBoost poderá analisar exceções individualmente.
      </p>
    ),
  },
  {
    title: 'Direito de Arrependimento',
    content: (
      <p>
        De acordo com o Código de Defesa do Consumidor, o cliente pode solicitar cancelamento em até{' '}
        <strong className='text-white'>7 dias corridos</strong> após a compra, desde que o serviço
        ainda não tenha sido iniciado.
      </p>
    ),
  },
];

const sectionsEn: { title: string; content: React.ReactNode }[] = [
  {
    title: 'Nature of the Service',
    content: (
      <>
        <p>
          The services offered by UpBoost are personalized digital services, performed directly on the
          client's computer via remote access.
        </p>
        <p>
          Once the optimization is executed, the changes remain applied to the client's system,
          characterizing the complete delivery of the contracted service.
        </p>
      </>
    ),
  },
  {
    title: 'General Refund Policy',
    content: (
      <p>
        Due to the nature of the service provided, refund requests are not accepted after the optimization
        has been performed. Exceptions may exist but must be agreed upon in advance.
      </p>
    ),
  },
  {
    title: 'Already Optimized Systems',
    content: (
      <p>
        If it is identified that the client's system was already previously optimized, the service will
        still be considered as having been fully executed.
      </p>
    ),
  },
  {
    title: 'Exceptions',
    content: (
      <p>
        In specific and proven circumstances, UpBoost may individually review exceptions on a case-by-case basis.
      </p>
    ),
  },
  {
    title: 'Right of Withdrawal',
    content: (
      <p>
        In accordance with the Brazilian Consumer Protection Code, the client may request cancellation
        within <strong className='text-white'>7 calendar days</strong> of purchase, provided the service
        has not yet been started.
      </p>
    ),
  },
];
