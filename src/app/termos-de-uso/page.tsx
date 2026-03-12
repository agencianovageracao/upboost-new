import { Footer } from '@/components/globals/site/Footer';
import { Navbar } from '@/components/globals/site/Navbar';

export const metadata = {
  title: 'Termos de Uso — UpBoost',
};

export default function TermsOfService() {
  return (
    <>
      <header className='bg-theme-900 pt-24 pb-16'>
        <Navbar />
        <div className='container flex flex-col items-center justify-center text-center'>
          <h1 className='font-sora text-4xl font-bold text-theme-400 max-sm:text-3xl'>
            Termos de Uso
          </h1>
          <p className='mt-2 text-sm text-neutral-500'>UpBoost › Termos de Uso</p>
        </div>
      </header>

      <main className='bg-theme-800'>
        <div className='pointer-events-none h-px bg-gradient-to-r from-transparent via-white/10 to-transparent' />
        <div className='container max-w-3xl py-16 flex flex-col gap-10'>

          <section className='rounded-2xl border border-white/[0.07] bg-theme-900/60 px-8 py-6 max-sm:px-5'>
            <h2 className='mb-2 text-xs font-semibold uppercase tracking-widest text-theme-400'>Identificação da Empresa</h2>
            <p className='text-sm leading-relaxed text-neutral-400'>
              A <strong className='text-white'>UpBoost</strong>, inscrita no CNPJ{' '}
              <span className='font-mono text-neutral-300'>57.482.889/0001-08</span>, é responsável
              pela prestação dos serviços de otimização de sistemas descritos neste documento.
              Ao contratar qualquer serviço da UpBoost, o cliente declara estar ciente e de acordo
              com os termos descritos abaixo, que regulam a utilização dos serviços oferecidos pela empresa.
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
            Ao adquirir qualquer pacote da UpBoost, você aceita integralmente os presentes Termos de Uso.
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
        <p>Caso o sistema operacional apresente corrupção de arquivos, instabilidade crítica ou modificações profundas anteriores,
          a aplicação completa das otimizações pode ser limitada.</p>
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
