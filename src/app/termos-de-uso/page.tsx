import { Footer } from '@/components/globals/site/Footer';
import { Navbar } from '@/components/globals/site/Navbar';

export default function TermsOfService() {
  return (
    <>
      <header className='bg-theme-800 py-10'>
        <Navbar />
        <div className='flex flex-col items-center justify-center py-20 text-center'>
          <h1 className='text-3xl font-bold text-theme-400'>Termos de Uso</h1>
          <p className='text-lg text-neutral-200'>
            {'UpBoost > Termos de Uso'}
          </p>
        </div>
      </header>
      <main className='container flex flex-col gap-3 py-20'>
        <h1 className='text-2xl font-bold text-theme-400'>
          Termos de Uso - UpBoost
        </h1>

        <p>
          Ao aceitar os termos abaixo, você concorda com os seguintes pontos
          referentes aos serviços de otimização de PCs oferecidos pela UpBoost.
        </p>

        <h1 className='text-lg text-theme-400'>Serviços Prestados</h1>
        <p className='text-sm text-neutral-200'>
          A UpBoost oferece serviços de otimização de PCs remotamente,
          incluindo, mas não se limitando a:
        </p>
        <ul className='ml-6 list-disc text-sm text-neutral-200'>
          <li>
            Melhoria de desempenho, como aumento de FPS e redução de input lag.
          </li>
          <li>
            Ajustes para controle de temperatura e limpeza de arquivos do
            sistema.
          </li>
          <li>Otimização de serviços e registros do Windows.</li>
        </ul>

        <h1 className='text-lg text-theme-400'>Execução Remota e Segurança</h1>
        <p className='text-sm text-neutral-200'>
          Todos os serviços são realizados de forma remota e completamente
          segura. As otimizações seguem padrões do Windows e são aplicáveis a
          todos os usuários, exceto em casos de corrupção do sistema, que pode
          exigir a formatação do PC para nova otimização. Todos os atendimentos
          são gravados e armazenados em nuvem para garantir a segurança do
          técnico e do cliente.
        </p>

        <h1 className='text-lg text-theme-400'>
          Limitações de Responsabilidade
        </h1>
        <p className='text-sm text-neutral-200'>
          A UpBoost se compromete a não realizar nenhuma ação que possa
          prejudicar o sistema do cliente ou causar qualquer tipo de dano. Todos
          os procedimentos são programados de maneira correta e segura. A
          UpBoost não se responsabiliza por problemas que possam surgir devido a
          falhas de hardware, mau uso do sistema pelo usuário ou quaisquer
          questões que não estejam diretamente relacionadas ao serviço de
          otimização realizado.
        </p>

        <h1 className='text-lg text-theme-400'>Garantia de Satisfação</h1>
        <p className='text-sm text-neutral-200'>
          Caso o sistema do cliente esteja corrompido, a UpBoost se compromete a
          refazer o processo de otimização após a formatação do sistema.
        </p>

        <h1 className='text-lg text-theme-400'>
          Política de Reembolso e Condições Especiais
        </h1>
        <p className='text-sm text-neutral-200'>
          Não aceitamos pedidos de reembolso, pois o serviço de otimização, uma
          vez realizado, permanece na máquina do cliente. A otimização só será
          desfeita caso o usuário opte por formatar a máquina. Em casos onde o
          sistema Windows do cliente já estava otimizado, a UpBoost não
          concederá reembolso, pois o serviço foi devidamente executado na
          máquina, mesmo que os ganhos de desempenho sejam limitados.
        </p>
        <p className='text-sm text-neutral-200'>
          Caso o cliente precise formatar o sistema em até 30 dias após a
          otimização inicial, a UpBoost poderá oferecer uma reexecução do
          serviço por metade do valor original.
        </p>

        <h1 className='text-lg text-theme-400'>
          Serviço Realizado em Sistemas Já Otimizados
        </h1>
        <p className='text-sm text-neutral-200'>
          Caso o sistema Windows do usuário já esteja otimizado, a equipe da
          UpBoost não concederá reembolso, pois o serviço foi devidamente
          executado na máquina, mesmo que os ganhos de desempenho sejam
          limitados.
        </p>

        <h1 className='text-lg text-theme-400'>Aceitação</h1>
        <p className='text-sm text-neutral-200'>
          Ao adquirir qualquer pacote da UpBoost, você aceita os Termos de Uso e
          a Política de Privacidade.
        </p>
      </main>
      <Footer />
    </>
  );
}
