import { Footer } from '@/components/globals/site/Footer';
import { Navbar } from '@/components/globals/site/Navbar';

export default function RefundPolicy() {
  return (
    <>
      <header className='bg-theme-800 py-10'>
        <Navbar />
        <div className='flex flex-col items-center justify-center py-20 text-center'>
          <h1 className='text-3xl font-bold text-theme-400'>
            Política de Reembolso
          </h1>
          <p className='text-lg text-neutral-200'>{'UpBoost > Termos'}</p>
        </div>
      </header>
      <main className='container flex flex-col gap-3 py-20'>
        <h1 className='text-2xl font-bold text-theme-400'>
          Política de Reembolso – UpBoost
        </h1>

        <p>
          A UpBoost oferece serviços de otimização de PCs no modelo SAAS
          (Software as a Service), garantindo uma experiência eficiente e segura
          para todos os nossos clientes. Antes de realizar sua compra,
          recomendamos a leitura completa desta política para evitar dúvidas e
          garantir que você está ciente dos nossos termos.
        </p>

        <h1 className='text-lg text-theme-400'>
          Como funcionam os serviços da UpBoost?
        </h1>

        <p className='text-sm text-neutral-200'>
          <strong>Natureza do Serviço:</strong> Nosso serviço é intangível,
          sendo entregue de forma remota e diretamente configurado em seu
          dispositivo. Não enviamos nenhum item físico ou código de ativação.
          Toda a execução ocorre em tempo real, com acompanhamento do cliente e
          registro da sessão para sua segurança.
        </p>

        <p className='text-sm text-neutral-200'>
          <strong>Modelo SAAS:</strong> O serviço contratado segue o modelo
          SAAS, no qual a personalização e a otimização do sistema são feitas
          especificamente para cada cliente, com base em dados técnicos
          fornecidos antes e durante o atendimento.
        </p>

        <h1 className='text-lg text-theme-400'>
          Políticas de Cancelamento e Reembolso
        </h1>

        <h2 className='text-md font-bold text-theme-400'>
          1. Condições de Reembolso
        </h2>

        <p className='text-sm text-neutral-200'>
          Devido à natureza do serviço prestado, o reembolso não é aplicável
          após a execução do serviço, considerando que:
        </p>
        <ul className='list-disc pl-6 text-sm text-neutral-200'>
          <li>A otimização é personalizada e executada em tempo real.</li>
          <li>
            O serviço prestado não pode ser "desfeito" ou reutilizado, tornando
            inviável sua restituição.
          </li>
        </ul>

        <h2 className='text-md font-bold text-theme-400'>
          2. Exceções para Reembolso
        </h2>

        <p className='text-sm text-neutral-200'>
          Embora nossa política seja clara sobre a não aplicabilidade do
          reembolso após a execução, consideramos situações excepcionais para
          análise individual, como:
        </p>
        <ul className='list-disc pl-6 text-sm text-neutral-200'>
          <li>
            <strong>Erro na compra:</strong> O cliente deverá entrar em contato
            antes do início do serviço para solicitar cancelamento.
          </li>
          <li>
            <strong>Impossibilidade técnica:</strong> Se o serviço não puder ser
            concluído devido a limitações técnicas comprovadas pela equipe da
            UpBoost, o cliente pode optar por:
            <ul className='list-disc pl-6'>
              <li>Receber um crédito para outro serviço.</li>
              <li>
                Solicitar um reembolso parcial (deduzindo taxas administrativas
                e operacionais).
              </li>
            </ul>
          </li>
        </ul>

        <h2 className='text-md font-bold text-theme-400'>
          3. Direito de Arrependimento
        </h2>

        <p className='text-sm text-neutral-200'>
          De acordo com o Código de Defesa do Consumidor (art. 49), o cliente
          tem até 7 dias corridos para solicitar cancelamento e reembolso, desde
          que:
        </p>
        <ul className='list-disc pl-6 text-sm text-neutral-200'>
          <li>O serviço ainda não tenha sido iniciado.</li>
          <li>O pedido seja formalizado pelos nossos canais de atendimento.</li>
        </ul>

        <h1 className='text-lg text-theme-400'>Garantias e Suporte</h1>

        <p className='text-sm text-neutral-200'>
          A UpBoost preza pela qualidade e segurança de seus serviços:
        </p>
        <ul className='list-disc pl-6 text-sm text-neutral-200'>
          <li>
            Todos os atendimentos são gravados e armazenados para assegurar a
            transparência e o suporte ao cliente.
          </li>
          <li>
            Caso enfrente qualquer problema técnico após a execução, nossa
            equipe está disponível para suporte contínuo, dentro das condições
            acordadas no pacote contratado.
          </li>
        </ul>

        <h1 className='text-lg text-theme-400'>Contato e Atendimento</h1>

        <p className='text-sm text-neutral-200'>
          Se precisar de mais informações ou assistência, entre em contato
          conosco por meio dos nossos canais oficiais. Estamos comprometidos em
          oferecer soluções e garantir sua satisfação com os serviços UpBoost.
        </p>
      </main>
      <Footer />
    </>
  );
}
