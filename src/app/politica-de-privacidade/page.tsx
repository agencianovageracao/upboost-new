import { Footer } from '@/components/globals/site/Footer';
import { Navbar } from '@/components/globals/site/Navbar';

export default function PrivacyPolicy() {
  return (
    <>
      <header className='bg-theme-800 py-10'>
        <Navbar />
        <div className='flex flex-col items-center justify-center py-20 text-center'>
          <h1 className='text-3xl font-bold text-theme-400'>
            Política de Privacidade
          </h1>
          <p className='text-lg text-neutral-200'>{'UpBoost > Termos'}</p>
        </div>
      </header>
      <main className='container flex flex-col gap-3 py-20'>
        <h1 className='text-2xl font-bold text-theme-400'>
          Política de Privacidade - UpBoost
        </h1>

        <p>
          Esta Política de Privacidade descreve como a UpBoost coleta, usa,
          compartilha e protege as informações fornecidas pelos usuários ao
          utilizar os serviços de otimização de PCs. A UpBoost está comprometida
          em garantir a privacidade e segurança dos dados dos usuários, adotando
          as melhores práticas para proteger a confidencialidade das
          informações.
        </p>

        <h1 className='text-lg text-theme-400'>Dados Coletados</h1>

        <p className='text-sm text-neutral-200'>
          A UpBoost não coleta informações pessoais dos clientes. Os dados
          coletados durante a execução dos serviços de otimização são limitados
          a informações relacionadas ao desempenho do sistema e à configuração
          do computador, necessários para a realização do serviço de otimização,
          incluindo:
        </p>
        <p className='text-sm text-neutral-200'>
          Informações técnicas do sistema operacional e especificações de
          hardware do PC. Registros de desempenho, como FPS, temperatura e input
          lag, apenas para otimização e análise de desempenho. Finalidade do Uso
          dos Dados
        </p>

        <h1 className='text-lg text-theme-400'>
          Os dados técnicos são coletados com o objetivo de:
        </h1>

        <p className='text-sm text-neutral-200'>
          Realizar os serviços de otimização no sistema do cliente, como
          melhoria de desempenho, ajuste de temperatura e remoção de input lag.
          Verificar a eficácia da otimização e garantir que ela se mantenha
          conforme o esperado. Segurança dos Dados
        </p>

        <p className='text-sm text-neutral-200'>
          A UpBoost realiza todos os serviços remotamente e de forma segura.
          Para garantir a proteção dos dados, todas as interações e atendimentos
          realizados são gravados e armazenados em nuvem, seguindo rigorosos
          padrões de segurança para evitar acesso não autorizado, perda ou uso
          indevido.
        </p>
        <h1 className='text-lg text-theme-400'>Compartilhamento de Dados</h1>

        <p className='text-sm text-neutral-200'>
          A UpBoost não compartilha dados técnicos com terceiros, exceto quando
          necessário para:
        </p>

        <p className='text-sm text-neutral-200'>
          Cumprir com obrigações legais ou regulatórias. Proteger a segurança e
          integridade dos sistemas dos usuários. Armazenar dados em serviços de
          nuvem seguros, exclusivamente para fins de registro e monitoramento do
          atendimento. Retenção de Dados
        </p>

        <p className='text-sm text-neutral-200'>
          Os dados coletados são armazenados por até 30 dias após a conclusão do
          serviço de otimização, sendo usados apenas para fins de verificação da
          eficácia do serviço. Após esse período, os dados são removidos, exceto
          quando exigido por motivos legais ou de segurança.
        </p>
        <h1 className='text-lg text-theme-400'>Direitos dos Usuários</h1>

        <p className='text-sm text-neutral-200'>
          Embora a UpBoost não colete informações pessoais, os usuários têm o
          direito de:
        </p>

        <p className='text-sm text-neutral-200'>
          Solicitar informações sobre o tratamento de seus dados técnicos, como
          desempenho e configuração do sistema. Solicitar esclarecimentos ou
          remoção de dados relacionados aos atendimentos prestados, dentro do
          prazo de retenção. Alterações na Política de Privacidade
        </p>

        <p className='text-sm text-neutral-200'>
          A UpBoost pode atualizar esta Política de Privacidade periodicamente.
          Alterações significativas serão publicadas nesta página e, quando
          necessário, notificadas aos usuários.
        </p>
        <h1 className='text-lg text-theme-400'>Contato</h1>

        <p className='text-sm text-neutral-200'>
          Caso tenha dúvidas sobre esta Política de Privacidade ou deseje mais
          informações, entre em contato:
        </p>
        <p className='text-sm text-neutral-200'>
          E-mail: upboostpro@gmail.com Telefone: +55 65 9295-2018 Endereço: R.
          Comendador Henrique, Dom Aquino - Cuiabá, MT, 78015-050
        </p>

        <p className='text-sm text-neutral-200'>
          Ao utilizar os serviços da UpBoost, você concorda com esta Política de
          Privacidade e com o uso dos dados técnicos conforme descrito acima.
        </p>
      </main>
      <Footer />
    </>
  );
}
