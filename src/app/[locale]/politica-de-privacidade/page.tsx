import { Footer } from '@/components/globals/site/Footer';
import { Navbar } from '@/components/globals/site/Navbar';
import { getLocale } from 'next-intl/server';

export async function generateMetadata() {
  const locale = await getLocale();
  return {
    title: locale === 'en' ? 'Privacy Policy — UpBoost' : 'Política de Privacidade — UpBoost',
  };
}

export default async function PrivacyPolicy() {
  const locale = await getLocale();
  const en = locale === 'en';

  return (
    <>
      <header className='bg-theme-900 pt-24 pb-16'>
        <Navbar />
        <div className='container flex flex-col items-center justify-center text-center'>
          <h1 className='font-sora text-4xl font-bold text-theme-400 max-sm:text-3xl'>
            {en ? 'Privacy Policy' : 'Política de Privacidade'}
          </h1>
          <p className='mt-2 text-sm text-neutral-500'>
            UpBoost › {en ? 'Privacy Policy' : 'Política de Privacidade'}
          </p>
        </div>
      </header>

      <main className='bg-theme-800'>
        <div className='pointer-events-none h-px bg-gradient-to-r from-transparent via-white/10 to-transparent' />
        <div className='container max-w-3xl py-16 flex flex-col gap-10'>

          <section className='rounded-2xl border border-white/[0.07] bg-theme-900/60 px-8 py-6 max-sm:px-5'>
            <p className='text-sm leading-relaxed text-neutral-400'>
              {en ? (
                <>
                  <strong className='text-white'>UpBoost</strong> values the privacy and security of
                  its users' and clients' information. All collected information is handled responsibly
                  and used only for legitimate purposes related to service delivery.
                </>
              ) : (
                <>
                  A <strong className='text-white'>UpBoost</strong> valoriza a privacidade e a
                  segurança das informações de seus usuários e clientes. Todas as informações coletadas
                  são tratadas com responsabilidade e utilizadas apenas para finalidades legítimas
                  relacionadas à prestação dos serviços.
                </>
              )}
            </p>
          </section>

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
              ? 'By hiring any UpBoost service, you declare to be aware of and in agreement with this Privacy Policy.'
              : 'Ao contratar qualquer serviço da UpBoost, você declara estar ciente e de acordo com esta Política de Privacidade.'}
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

const sectionsEn: { title: string; content: React.ReactNode }[] = [
  {
    title: 'Personal Data Collected',
    content: (
      <>
        <p>
          For the contracting and execution of services, some personal data voluntarily provided by the
          client may be collected, including:
        </p>
        <ul className='ml-5 flex list-disc flex-col gap-1 text-neutral-500'>
          <li>Full name</li>
          <li>Email address</li>
          <li>Phone number</li>
          <li>Instagram username (when provided)</li>
          <li>CPF (Brazilian tax ID)</li>
        </ul>
        <p>This information is used exclusively for:</p>
        <ul className='ml-5 flex list-disc flex-col gap-1 text-neutral-500'>
          <li>Client identification</li>
          <li>Formalization of the service contract</li>
          <li>Communication during the session</li>
          <li>Technical support organization</li>
          <li>Compliance with legal or regulatory obligations</li>
        </ul>
      </>
    ),
  },
  {
    title: 'Technical Computer Data',
    content: (
      <>
        <p>
          During service execution, technical data from the computer may also be analyzed, such as:
        </p>
        <ul className='ml-5 flex list-disc flex-col gap-1 text-neutral-500'>
          <li>Operating system version</li>
          <li>Hardware specifications</li>
          <li>System performance metrics</li>
        </ul>
        <p>
          This information is used exclusively for diagnosing and executing system optimization, and is
          not used for any other purpose.
        </p>
      </>
    ),
  },
  {
    title: 'Data Sharing',
    content: (
      <>
        <p>
          UpBoost does not sell, rent, or share personal data with third parties, except when necessary for:
        </p>
        <ul className='ml-5 flex list-disc flex-col gap-1 text-neutral-500'>
          <li>Compliance with legal obligations</li>
          <li>Requests from competent authorities</li>
          <li>Protection of the company's or client's rights</li>
        </ul>
      </>
    ),
  },
  {
    title: 'Legal Basis and Compliance',
    content: (
      <p>
        Data is processed in accordance with the{' '}
        <strong className='text-white'>Brazilian General Data Protection Law (LGPD)</strong>, respecting
        the principles of security, transparency, necessity, and purpose limitation.
      </p>
    ),
  },
  {
    title: 'Information Security',
    content: (
      <p>
        UpBoost adopts reasonable technical and administrative measures to protect data against
        unauthorized access, loss, alteration, or improper disclosure.
      </p>
    ),
  },
];
