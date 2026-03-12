import { Footer } from '@/components/globals/site/Footer';
import { Navbar } from '@/components/globals/site/Navbar';
import { getLocale } from 'next-intl/server';

export async function generateMetadata() {
  const locale = await getLocale();
  return {
    title: locale === 'en' ? 'Legal Notice — UpBoost' : 'Aviso Legal — UpBoost',
  };
}

export default async function LegalNotice() {
  const locale = await getLocale();
  const en = locale === 'en';

  return (
    <>
      <header className='bg-theme-900 pt-24 pb-16'>
        <Navbar />
        <div className='container flex flex-col items-center justify-center text-center'>
          <h1 className='font-sora text-4xl font-bold text-theme-400 max-sm:text-3xl'>
            {en ? 'Legal Notice' : 'Aviso Legal'}
          </h1>
          <p className='mt-2 text-sm text-neutral-500'>
            UpBoost › {en ? 'Legal Notice' : 'Aviso Legal'}
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
                  All content on the UpBoost website, including but not limited to texts, logos,
                  images, visual elements, service descriptions, and institutional and commercial
                  materials, is the exclusive property of <strong className='text-white'>UpBoost</strong>,
                  registered under CNPJ <span className='font-mono text-neutral-300'>57.482.889/0001-08</span>,
                  or its respective licensors, and is protected by applicable intellectual property laws.
                </>
              ) : (
                <>
                  Todo o conteúdo presente no site da <strong className='text-white'>UpBoost</strong>,
                  incluindo, mas não se limitando a textos, logotipos, imagens, elementos visuais,
                  descrições de serviços e materiais institucionais e comerciais, é de propriedade
                  exclusiva da UpBoost, inscrita no CNPJ nº{' '}
                  <span className='font-mono text-neutral-300'>57.482.889/0001-08</span>, ou de seus
                  respectivos licenciadores, estando protegido pelas leis de propriedade intelectual
                  aplicáveis.
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
              ? 'By accessing and using the UpBoost website, you declare to be aware of and in agreement with the conditions described in this Legal Notice.'
              : 'Ao acessar e utilizar o site da UpBoost, o usuário declara estar ciente e de acordo com as condições descritas neste Aviso Legal.'}
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
    title: 'Propriedade Intelectual',
    content: (
      <>
        <p>
          É expressamente proibida a reprodução, distribuição, modificação ou utilização, total ou
          parcial, de qualquer conteúdo deste site sem autorização prévia e por escrito da UpBoost.
        </p>
        <p>
          O uso indevido de qualquer conteúdo poderá resultar na adoção das medidas administrativas,
          civis e legais cabíveis.
        </p>
      </>
    ),
  },
  {
    title: 'Uso do Site',
    content: (
      <>
        <p>
          Ao acessar e utilizar o site da UpBoost, o usuário compromete-se a utilizá-lo de forma
          responsável e em conformidade com a legislação aplicável.
        </p>
        <p>É proibido:</p>
        <ul className='ml-5 flex list-disc flex-col gap-1 text-neutral-500'>
          <li>Utilizar o site para fins ilegais ou fraudulentos</li>
          <li>Tentar comprometer a segurança da plataforma</li>
          <li>Explorar comercialmente conteúdos do site sem autorização</li>
          <li>Utilizar informações do site de forma que prejudique a empresa ou terceiros</li>
        </ul>
      </>
    ),
  },
  {
    title: 'Metodologia de Serviço',
    content: (
      <>
        <p>
          A UpBoost presta serviços de otimização de sistemas Windows, aplicando procedimentos
          técnicos e boas práticas de configuração com o objetivo de melhorar a eficiência e o
          desempenho geral do sistema operacional. Esses procedimentos consistem na análise do
          sistema, aplicação de configurações técnicas e ajustes de desempenho, realizados durante
          o atendimento remoto.
        </p>
        <p>
          A UpBoost não reivindica qualquer propriedade sobre o sistema operacional Windows, que é
          um produto da Microsoft. A empresa apenas realiza configurações e ajustes técnicos dentro
          das possibilidades oferecidas pelo próprio sistema operacional, com base em experiência
          técnica e boas práticas de otimização.
        </p>
      </>
    ),
  },
  {
    title: 'Limitação de Responsabilidade',
    content: (
      <>
        <p>A UpBoost não se responsabiliza por danos ou problemas decorrentes de:</p>
        <ul className='ml-5 flex list-disc flex-col gap-1 text-neutral-500'>
          <li>Falhas ou limitações de hardware do equipamento do cliente</li>
          <li>Presença de vírus, malwares ou softwares maliciosos</li>
          <li>Modificações realizadas no sistema após o atendimento</li>
          <li>Uso inadequado do computador pelo usuário</li>
          <li>Softwares ou configurações instaladas por terceiros</li>
        </ul>
        <p>
          A empresa também não garante que o site estará permanentemente livre de falhas técnicas
          ou interrupções.
        </p>
      </>
    ),
  },
  {
    title: 'Atualizações',
    content: (
      <>
        <p>
          A UpBoost reserva-se o direito de modificar, atualizar ou remover conteúdos deste site a
          qualquer momento, sem necessidade de aviso prévio.
        </p>
        <p>
          Recomenda-se que os usuários revisem esta página periodicamente para se manterem
          informados sobre eventuais alterações.
        </p>
      </>
    ),
  },
];

const sectionsEn: { title: string; content: React.ReactNode }[] = [
  {
    title: 'Intellectual Property',
    content: (
      <>
        <p>
          Reproduction, distribution, modification, or use — in whole or in part — of any content on
          this website without prior written authorization from UpBoost is expressly prohibited.
        </p>
        <p>
          Improper use of any content may result in administrative, civil, and legal measures being taken.
        </p>
      </>
    ),
  },
  {
    title: 'Use of the Website',
    content: (
      <>
        <p>
          By accessing and using the UpBoost website, the user commits to using it responsibly and in
          compliance with applicable legislation.
        </p>
        <p>The following are prohibited:</p>
        <ul className='ml-5 flex list-disc flex-col gap-1 text-neutral-500'>
          <li>Using the website for illegal or fraudulent purposes</li>
          <li>Attempting to compromise the security of the platform</li>
          <li>Commercially exploiting website content without authorization</li>
          <li>Using website information in a way that harms the company or third parties</li>
        </ul>
      </>
    ),
  },
  {
    title: 'Service Methodology',
    content: (
      <>
        <p>
          UpBoost provides Windows system optimization services, applying technical procedures and
          configuration best practices with the goal of improving the efficiency and overall performance
          of the operating system. These procedures consist of system analysis, application of technical
          configurations, and performance adjustments, carried out during the remote session.
        </p>
        <p>
          UpBoost does not claim any ownership over the Windows operating system, which is a Microsoft
          product. The company solely performs configurations and technical adjustments within the
          possibilities offered by the operating system itself, based on technical expertise and
          optimization best practices.
        </p>
      </>
    ),
  },
  {
    title: 'Limitation of Liability',
    content: (
      <>
        <p>UpBoost is not liable for damages or issues arising from:</p>
        <ul className='ml-5 flex list-disc flex-col gap-1 text-neutral-500'>
          <li>Hardware failures or limitations of the client's equipment</li>
          <li>Presence of viruses, malware, or malicious software</li>
          <li>System modifications made after the service session</li>
          <li>Improper use of the computer by the user</li>
          <li>Software or configurations installed by third parties</li>
        </ul>
        <p>
          The company also does not guarantee that the website will be permanently free from technical
          failures or interruptions.
        </p>
      </>
    ),
  },
  {
    title: 'Updates',
    content: (
      <>
        <p>
          UpBoost reserves the right to modify, update, or remove content from this website at any time,
          without prior notice.
        </p>
        <p>
          Users are encouraged to review this page periodically to stay informed about any changes.
        </p>
      </>
    ),
  },
];
