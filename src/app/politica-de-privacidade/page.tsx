import { Footer } from '@/components/globals/site/Footer';
import { Navbar } from '@/components/globals/site/Navbar';

export const metadata = {
  title: 'Política de Privacidade — UpBoost',
};

export default function PrivacyPolicy() {
  return (
    <>
      <header className='bg-theme-900 pt-24 pb-16'>
        <Navbar />
        <div className='container flex flex-col items-center justify-center text-center'>
          <h1 className='font-sora text-4xl font-bold text-theme-400 max-sm:text-3xl'>
            Política de Privacidade
          </h1>
          <p className='mt-2 text-sm text-neutral-500'>UpBoost › Política de Privacidade</p>
        </div>
      </header>

      <main className='bg-theme-800'>
        <div className='pointer-events-none h-px bg-gradient-to-r from-transparent via-white/10 to-transparent' />
        <div className='container max-w-3xl py-16 flex flex-col gap-10'>

          <section className='rounded-2xl border border-white/[0.07] bg-theme-900/60 px-8 py-6 max-sm:px-5'>
            <p className='text-sm leading-relaxed text-neutral-400'>
              A <strong className='text-white'>UpBoost</strong> valoriza a privacidade e a segurança
              das informações de seus usuários e clientes. Todas as informações coletadas são tratadas
              com responsabilidade e utilizadas apenas para finalidades legítimas relacionadas à
              prestação dos serviços.
            </p>
          </section>

          {sections.map(({ title, content }, i) => (
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
            Ao contratar qualquer serviço da UpBoost, você declara estar ciente e de acordo com esta
            Política de Privacidade.
          </p>
        </div>
        <div className='pointer-events-none h-px bg-gradient-to-r from-transparent via-white/10 to-transparent' />
      </main>

      <Footer />
    </>
  );
}

const sections: { title: string; content: React.ReactNode }[] = [
  {
    title: 'Dados Pessoais Coletados',
    content: (
      <>
        <p>
          Para a contratação e execução dos serviços, podem ser coletados alguns dados pessoais
          fornecidos voluntariamente pelo cliente, incluindo:
        </p>
        <ul className='ml-5 flex list-disc flex-col gap-1 text-neutral-500'>
          <li>Nome completo</li>
          <li>Endereço de e-mail</li>
          <li>Número de telefone</li>
          <li>Usuário do Instagram (quando informado)</li>
          <li>CPF</li>
        </ul>
        <p>Essas informações são utilizadas exclusivamente para:</p>
        <ul className='ml-5 flex list-disc flex-col gap-1 text-neutral-500'>
          <li>Identificação do cliente</li>
          <li>Formalização do contrato de prestação de serviço</li>
          <li>Comunicação durante o atendimento</li>
          <li>Organização do suporte técnico</li>
          <li>Cumprimento de obrigações legais ou regulatórias</li>
        </ul>
      </>
    ),
  },
  {
    title: 'Dados Técnicos do Computador',
    content: (
      <>
        <p>
          Durante a execução do serviço também podem ser analisados dados técnicos do computador, como:
        </p>
        <ul className='ml-5 flex list-disc flex-col gap-1 text-neutral-500'>
          <li>Versão do sistema operacional</li>
          <li>Especificações de hardware</li>
          <li>Métricas de desempenho do sistema</li>
        </ul>
        <p>
          Essas informações são utilizadas exclusivamente para diagnóstico e execução da otimização
          do sistema, não sendo utilizadas para outras finalidades.
        </p>
      </>
    ),
  },
  {
    title: 'Compartilhamento de Dados',
    content: (
      <>
        <p>
          A UpBoost não comercializa, aluga ou compartilha dados pessoais com terceiros, exceto quando
          necessário para:
        </p>
        <ul className='ml-5 flex list-disc flex-col gap-1 text-neutral-500'>
          <li>Cumprimento de obrigações legais</li>
          <li>Requisições de autoridades competentes</li>
          <li>Proteção dos direitos da empresa ou do próprio cliente</li>
        </ul>
      </>
    ),
  },
  {
    title: 'Base Legal e Conformidade',
    content: (
      <p>
        Os dados são tratados de acordo com a{' '}
        <strong className='text-white'>Lei Geral de Proteção de Dados Pessoais (LGPD)</strong>,
        respeitando os princípios de segurança, transparência, necessidade e finalidade.
      </p>
    ),
  },
  {
    title: 'Segurança das Informações',
    content: (
      <p>
        A UpBoost adota medidas técnicas e administrativas razoáveis para proteger os dados contra
        acesso não autorizado, perda, alteração ou divulgação indevida.
      </p>
    ),
  },
];
