import { Footer } from '@/components/globals/site/Footer';
import { Navbar } from '@/components/globals/site/Navbar';
import { getLocale } from 'next-intl/server';

export async function generateMetadata() {
  const locale = await getLocale();
  return {
    title: locale === 'en' ? 'Terms of Service — UpBoost' : 'Termos de Uso — UpBoost',
  };
}

export default async function TermsOfService() {
  const locale = await getLocale();
  const en = locale === 'en';

  return (
    <>
      <header className='bg-theme-900 pt-24 pb-16'>
        <Navbar />
        <div className='container flex flex-col items-center justify-center text-center'>
          <h1 className='font-sora text-4xl font-bold text-theme-400 max-sm:text-3xl'>
            {en ? 'Terms of Service' : 'Termos de Uso'}
          </h1>
          <p className='mt-2 text-sm text-neutral-500'>
            UpBoost › {en ? 'Terms of Service' : 'Termos de Uso'}
          </p>
        </div>
      </header>

      <main className='bg-theme-800'>
        <div className='pointer-events-none h-px bg-gradient-to-r from-transparent via-white/10 to-transparent' />
        <div className='container max-w-3xl py-16 flex flex-col gap-10'>

          <section className='rounded-2xl border border-white/[0.07] bg-theme-900/60 px-8 py-6 max-sm:px-5'>
            <h2 className='mb-2 text-xs font-semibold uppercase tracking-widest text-theme-400'>
              {en ? 'Company Identification' : 'Identificação da Empresa'}
            </h2>
            <p className='text-sm leading-relaxed text-neutral-400'>
              {en ? (
                <>
                  <strong className='text-white'>UpBoost</strong>, registered under CNPJ{' '}
                  <span className='font-mono text-neutral-300'>57.482.889/0001-08</span>, is responsible
                  for providing the system optimization services described in this document. By hiring
                  any UpBoost service, the client declares to be aware of and in agreement with the terms
                  below, which govern the use of the services offered by the company.
                </>
              ) : (
                <>
                  A <strong className='text-white'>UpBoost</strong>, inscrita no CNPJ{' '}
                  <span className='font-mono text-neutral-300'>57.482.889/0001-08</span>, é responsável
                  pela prestação dos serviços de otimização de sistemas descritos neste documento. Ao
                  contratar qualquer serviço da UpBoost, o cliente declara estar ciente e de acordo com
                  os termos descritos abaixo, que regulam a utilização dos serviços oferecidos pela empresa.
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
              ? 'By purchasing any UpBoost plan, you fully accept these Terms of Service.'
              : 'Ao adquirir qualquer pacote da UpBoost, você aceita integralmente os presentes Termos de Uso.'}
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
          A UpBoost presta serviços de otimização de sistemas Windows, realizados de forma remota,
          com o objetivo de melhorar a eficiência do sistema operacional e o desempenho geral do computador.
        </p>
        <p>As otimizações podem incluir, mas não se limitam a:</p>
        <ul className='ml-5 flex list-disc flex-col gap-1 text-neutral-500'>
          <li>Ajustes de desempenho do sistema</li>
          <li>Otimização de serviços internos do Windows</li>
          <li>Ajustes de registros do sistema</li>
          <li>Redução de processos desnecessários</li>
          <li>Ajustes relacionados à estabilidade, temperatura e fluidez do sistema</li>
        </ul>
        <p>
          O serviço é digital e personalizado, sendo executado diretamente no dispositivo do cliente.
          Não são enviados softwares proprietários, licenças ou arquivos físicos.
        </p>
      </>
    ),
  },
  {
    title: 'Execução Remota e Segurança',
    content: (
      <>
        <p>Todos os atendimentos da UpBoost são realizados 100% de forma remota, mediante autorização do cliente.</p>
        <p>Durante a execução do serviço:</p>
        <ul className='ml-5 flex list-disc flex-col gap-1 text-neutral-500'>
          <li>O cliente pode acompanhar todo o processo em tempo real</li>
          <li>Os atendimentos podem ser gravados e armazenados em nuvem para fins de segurança, auditoria e suporte técnico</li>
          <li>Nenhuma ação é realizada sem consentimento do cliente</li>
        </ul>
        <p>
          A UpBoost segue procedimentos padronizados baseados no funcionamento do sistema Windows e boas práticas de otimização.
        </p>
      </>
    ),
  },
  {
    title: 'Autorização de Acesso Remoto',
    content: (
      <>
        <p>
          Para a execução do serviço contratado, poderá ser necessário acesso remoto ao dispositivo do cliente.
          Ao iniciar o atendimento, o cliente autoriza expressamente o acesso remoto ao seu computador,
          exclusivamente para a realização dos procedimentos técnicos relacionados ao serviço contratado.
        </p>
        <p>
          A UpBoost compromete-se a utilizar esse acesso apenas durante o período necessário para execução do
          serviço, não realizando acessos posteriores sem nova autorização do cliente.
        </p>
      </>
    ),
  },
  {
    title: 'Limitações Técnicas do Serviço',
    content: (
      <>
        <p>Os resultados da otimização podem variar de acordo com fatores como:</p>
        <ul className='ml-5 flex list-disc flex-col gap-1 text-neutral-500'>
          <li>Configuração de hardware</li>
          <li>Estado atual do sistema operacional</li>
          <li>Presença de softwares de terceiros</li>
          <li>Limitações físicas do equipamento</li>
        </ul>
        <p>
          A UpBoost não garante números específicos de FPS ou desempenho, pois cada computador possui
          características próprias. Entretanto, a empresa busca sempre aplicar as melhores práticas de
          otimização disponíveis para o sistema do cliente.
        </p>
      </>
    ),
  },
  {
    title: 'Resultados Ilustrativos de Desempenho',
    content: (
      <p>
        Quaisquer exemplos de desempenho, comparações de FPS, benchmarks ou demonstrações apresentados
        pela UpBoost em seu site, redes sociais ou materiais promocionais têm caráter meramente ilustrativo.
        Esses exemplos representam resultados obtidos em sistemas específicos e não constituem garantia de
        desempenho idêntico em outros equipamentos. O desempenho final depende de diversos fatores, incluindo
        configuração de hardware, estado do sistema operacional, softwares instalados e condições específicas de uso.
      </p>
    ),
  },
  {
    title: 'Sistemas Corrompidos ou Instáveis',
    content: (
      <>
        <p>
          Caso o sistema operacional apresente corrupção de arquivos, instabilidade crítica ou modificações
          profundas anteriores, a aplicação completa das otimizações pode ser limitada.
        </p>
        <p>
          Nesses casos, poderá ser recomendada a formatação do sistema. Após a formatação, a UpBoost poderá
          refazer a otimização sem custos adicionais, dentro das condições previamente acordadas.
        </p>
      </>
    ),
  },
  {
    title: 'Alterações Posteriores no Sistema',
    content: (
      <>
        <p>Caso, após o atendimento, o cliente:</p>
        <ul className='ml-5 flex list-disc flex-col gap-1 text-neutral-500'>
          <li>Aplique otimizações de terceiros</li>
          <li>Utilize scripts externos</li>
          <li>Altere manualmente registros ou serviços do sistema</li>
          <li>Instale softwares que modifiquem o funcionamento do sistema</li>
        </ul>
        <p>
          Se essas alterações comprometerem ou reverterem a otimização aplicada, a UpBoost não se responsabiliza
          pelos resultados obtidos posteriormente. Caso seja constatado que as otimizações foram modificadas por
          intervenções externas, o suporte técnico poderá ser encerrado.
        </p>
      </>
    ),
  },
  {
    title: 'Suporte Pós-Atendimento',
    content: (
      <>
        <p>
          A UpBoost oferece suporte técnico por até 7 dias após a realização do serviço, destinado a verificação
          da otimização aplicada, ajustes complementares e esclarecimento de dúvidas.
        </p>
        <p>O suporte não cobre problemas decorrentes de:</p>
        <ul className='ml-5 flex list-disc flex-col gap-1 text-neutral-500'>
          <li>Falhas de hardware</li>
          <li>Vírus ou malwares</li>
          <li>Modificações externas no sistema</li>
        </ul>
      </>
    ),
  },
  {
    title: 'Política de Cancelamento ou Reagendamento',
    content: (
      <>
        <p>
          Os atendimentos da UpBoost são realizados mediante agendamento prévio. Caso o cliente não esteja
          disponível no horário combinado, poderá ser necessário realizar reagendamento conforme disponibilidade
          da equipe técnica.
        </p>
        <p>
          A UpBoost reserva-se o direito de reorganizar horários de atendimento em situações de atraso,
          indisponibilidade ou dificuldades técnicas que impeçam a execução do serviço no momento previamente agendado.
        </p>
      </>
    ),
  },
  {
    title: 'Uso Indevido do Serviço',
    content: (
      <>
        <p>A UpBoost reserva-se o direito de recusar ou encerrar atendimentos em situações que envolvam:</p>
        <ul className='ml-5 flex list-disc flex-col gap-1 text-neutral-500'>
          <li>Comportamento abusivo ou desrespeitoso</li>
          <li>Tentativa de fraude ou manipulação do serviço</li>
          <li>Uso indevido dos canais de atendimento</li>
          <li>Solicitações que violem leis ou normas aplicáveis</li>
        </ul>
        <p>
          Nesses casos, o atendimento poderá ser interrompido para preservação da segurança da equipe e da
          integridade do serviço prestado.
        </p>
      </>
    ),
  },
  {
    title: 'Aceitação Eletrônica dos Termos',
    content: (
      <>
        <p>
          Ao contratar qualquer serviço da UpBoost por meio do site, plataformas digitais ou canais oficiais
          de atendimento, o cliente declara que leu, compreendeu e concorda integralmente com os Termos de Uso,
          Política de Reembolso e demais condições descritas neste documento.
        </p>
        <p>O aceite pode ocorrer por meio de:</p>
        <ul className='ml-5 flex list-disc flex-col gap-1 text-neutral-500'>
          <li>Confirmação no site</li>
          <li>Mensagem em canais oficiais de atendimento</li>
          <li>Confirmação verbal registrada durante o atendimento</li>
        </ul>
        <p>
          Esse aceite eletrônico possui validade jurídica equivalente a um contrato formal, conforme as práticas
          aplicáveis a serviços digitais na República Federativa do Brasil.
        </p>
      </>
    ),
  },
];

const sectionsEn: { title: string; content: React.ReactNode }[] = [
  {
    title: 'Nature of the Service',
    content: (
      <>
        <p>
          UpBoost provides Windows system optimization services, performed remotely, with the goal of
          improving operating system efficiency and overall computer performance.
        </p>
        <p>Optimizations may include, but are not limited to:</p>
        <ul className='ml-5 flex list-disc flex-col gap-1 text-neutral-500'>
          <li>System performance adjustments</li>
          <li>Windows internal services optimization</li>
          <li>System registry adjustments</li>
          <li>Reduction of unnecessary background processes</li>
          <li>Adjustments related to system stability, temperature, and smoothness</li>
        </ul>
        <p>
          The service is digital and personalized, executed directly on the client's device.
          No proprietary software, licenses, or physical files are delivered.
        </p>
      </>
    ),
  },
  {
    title: 'Remote Execution and Security',
    content: (
      <>
        <p>All UpBoost sessions are performed 100% remotely, with explicit client authorization.</p>
        <p>During service execution:</p>
        <ul className='ml-5 flex list-disc flex-col gap-1 text-neutral-500'>
          <li>The client can follow the entire process in real time</li>
          <li>Sessions may be recorded and stored in the cloud for security, auditing, and technical support purposes</li>
          <li>No action is performed without the client's consent</li>
        </ul>
        <p>
          UpBoost follows standardized procedures based on Windows system behavior and optimization best practices.
        </p>
      </>
    ),
  },
  {
    title: 'Remote Access Authorization',
    content: (
      <>
        <p>
          Remote access to the client's device may be required to perform the contracted service.
          By starting the session, the client expressly authorizes remote access to their computer,
          exclusively for the technical procedures related to the contracted service.
        </p>
        <p>
          UpBoost commits to using this access only for the duration necessary to perform the service,
          and will not access the device again without new client authorization.
        </p>
      </>
    ),
  },
  {
    title: 'Technical Limitations of the Service',
    content: (
      <>
        <p>Optimization results may vary depending on factors such as:</p>
        <ul className='ml-5 flex list-disc flex-col gap-1 text-neutral-500'>
          <li>Hardware configuration</li>
          <li>Current state of the operating system</li>
          <li>Presence of third-party software</li>
          <li>Physical limitations of the equipment</li>
        </ul>
        <p>
          UpBoost does not guarantee specific FPS figures or performance numbers, as each computer has
          its own characteristics. However, the company always strives to apply the best available
          optimization practices for the client's system.
        </p>
      </>
    ),
  },
  {
    title: 'Illustrative Performance Results',
    content: (
      <p>
        Any performance examples, FPS comparisons, benchmarks, or demonstrations presented by UpBoost
        on its website, social media, or promotional materials are for illustrative purposes only.
        These examples represent results obtained on specific systems and do not constitute a guarantee
        of identical performance on other hardware. Final performance depends on various factors,
        including hardware configuration, operating system state, installed software, and specific
        conditions of use.
      </p>
    ),
  },
  {
    title: 'Corrupted or Unstable Systems',
    content: (
      <>
        <p>
          If the operating system presents file corruption, critical instability, or prior deep
          modifications, the full application of optimizations may be limited.
        </p>
        <p>
          In such cases, a system format may be recommended. After formatting, UpBoost may redo the
          optimization at no additional cost, within the previously agreed conditions.
        </p>
      </>
    ),
  },
  {
    title: 'Post-Service System Changes',
    content: (
      <>
        <p>If, after the service, the client:</p>
        <ul className='ml-5 flex list-disc flex-col gap-1 text-neutral-500'>
          <li>Applies third-party optimizations</li>
          <li>Uses external scripts</li>
          <li>Manually modifies system registries or services</li>
          <li>Installs software that alters system behavior</li>
        </ul>
        <p>
          If these changes compromise or revert the applied optimization, UpBoost is not responsible
          for subsequent results. If it is found that the optimizations were modified by external
          interventions, technical support may be discontinued.
        </p>
      </>
    ),
  },
  {
    title: 'Post-Service Support',
    content: (
      <>
        <p>
          UpBoost provides technical support for up to 7 days after the service, covering verification
          of the applied optimization, complementary adjustments, and clarification of questions.
        </p>
        <p>Support does not cover issues arising from:</p>
        <ul className='ml-5 flex list-disc flex-col gap-1 text-neutral-500'>
          <li>Hardware failures</li>
          <li>Viruses or malware</li>
          <li>External system modifications</li>
        </ul>
      </>
    ),
  },
  {
    title: 'Cancellation or Rescheduling Policy',
    content: (
      <>
        <p>
          UpBoost sessions are scheduled in advance. If the client is not available at the agreed time,
          rescheduling may be required according to the technical team's availability.
        </p>
        <p>
          UpBoost reserves the right to reorganize service times in situations of delay, unavailability,
          or technical difficulties that prevent service execution at the previously scheduled time.
        </p>
      </>
    ),
  },
  {
    title: 'Improper Use of the Service',
    content: (
      <>
        <p>UpBoost reserves the right to refuse or terminate sessions involving:</p>
        <ul className='ml-5 flex list-disc flex-col gap-1 text-neutral-500'>
          <li>Abusive or disrespectful behavior</li>
          <li>Attempted fraud or service manipulation</li>
          <li>Misuse of support channels</li>
          <li>Requests that violate applicable laws or regulations</li>
        </ul>
        <p>
          In such cases, the session may be interrupted to preserve team safety and service integrity.
        </p>
      </>
    ),
  },
  {
    title: 'Electronic Acceptance of Terms',
    content: (
      <>
        <p>
          By hiring any UpBoost service through the website, digital platforms, or official support channels,
          the client declares to have read, understood, and fully agreed to the Terms of Service, Refund Policy,
          and other conditions described in this document.
        </p>
        <p>Acceptance may occur through:</p>
        <ul className='ml-5 flex list-disc flex-col gap-1 text-neutral-500'>
          <li>Confirmation on the website</li>
          <li>Message through official support channels</li>
          <li>Verbal confirmation recorded during the session</li>
        </ul>
        <p>
          This electronic acceptance has the same legal validity as a formal contract, in accordance
          with practices applicable to digital services in the Federative Republic of Brazil.
        </p>
      </>
    ),
  },
];
