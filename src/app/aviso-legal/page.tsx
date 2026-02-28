import { Footer } from '@/components/globals/site/Footer';
import { Navbar } from '@/components/globals/site/Navbar';

export default function LegalNotice() {
  return (
    <>
      <header className='bg-theme-800 py-10'>
        <Navbar />
        <div className='flex flex-col items-center justify-center py-20 text-center'>
          <h1 className='text-3xl font-bold text-theme-400'>Aviso Legal</h1>
          <p className='text-lg text-neutral-200'>{'UpBoost > Termos'}</p>
        </div>
      </header>
      <main className='container flex flex-col gap-3 py-20'>
        <h1 className='text-2xl font-bold text-theme-400'>
          Aviso Legal - UpBoost
        </h1>

        <p>
          Este site e todo o conteúdo relacionado aos serviços da UpBoost são de
          propriedade exclusiva da empresa, protegidos pelas leis de direitos
          autorais do Brasil e tratados internacionais aplicáveis. Ao acessar e
          utilizar nossos serviços, você concorda com os termos descritos
          abaixo.
        </p>

        <h1 className='text-lg text-theme-400'>Propriedade Intelectual</h1>

        <p className='text-sm text-neutral-200'>
          Todo o conteúdo deste site, incluindo, mas não se limitando a textos,
          gráficos, logotipos, imagens, vídeos, compilações de dados, descrições
          de serviços e software, é propriedade exclusiva da UpBoost ou de seus
          respectivos proprietários licenciados. Qualquer reprodução,
          distribuição ou uso não autorizado desse material está estritamente
          proibido sem o consentimento prévio por escrito da UpBoost.
        </p>

        <h1 className='text-lg text-theme-400'>Uso do Site e dos Serviços</h1>

        <p className='text-sm text-neutral-200'>
          Ao acessar este site ou contratar os serviços da UpBoost, você
          concorda em utilizar os recursos de forma responsável e em
          conformidade com a legislação aplicável. É expressamente proibido:
        </p>

        <ul className='list-disc pl-6 text-sm text-neutral-200'>
          <li>
            Reproduzir, copiar, distribuir ou explorar comercialmente qualquer
            conteúdo do site ou dos serviços sem autorização prévia.
          </li>
          <li>
            Utilizar o site ou os serviços para fins ilegais, fraudulentos ou
            prejudiciais à UpBoost, seus clientes ou terceiros.
          </li>
          <li>
            Tentar comprometer a segurança, integridade ou funcionamento do site
            ou dos serviços.
          </li>
        </ul>

        <h1 className='text-lg text-theme-400'>
          Limitação de Responsabilidade
        </h1>

        <p className='text-sm text-neutral-200'>
          A UpBoost não se responsabiliza por danos diretos, indiretos,
          incidentais, especiais ou consequenciais decorrentes do uso ou
          incapacidade de uso do site ou dos serviços, salvo disposição em
          contrário exigida por lei.
        </p>

        <p className='text-sm text-neutral-200'>
          As informações fornecidas neste site são meramente informativas e não
          constituem garantias adicionais além das especificadas em nossos
          contratos ou políticas.
        </p>

        <p className='text-sm text-neutral-200'>
          Embora envidemos todos os esforços para garantir que as informações e
          serviços sejam precisos e seguros, a UpBoost não pode garantir que o
          site ou os serviços estarão livres de erros, falhas ou interrupções.
        </p>

        <h1 className='text-lg text-theme-400'>Alterações no Aviso Legal</h1>

        <p className='text-sm text-neutral-200'>
          A UpBoost reserva-se o direito de alterar este aviso legal a qualquer
          momento e sem aviso prévio. É recomendável que os usuários revisem
          periodicamente esta seção para se manterem atualizados sobre eventuais
          mudanças.
        </p>

        <h1 className='text-lg text-theme-400'>Contato</h1>

        <p className='text-sm text-neutral-200'>
          Para dúvidas ou esclarecimentos relacionados a este aviso legal, entre
          em contato com nossa equipe pelos canais oficiais disponibilizados no
          site da UpBoost.
        </p>

        <p className='text-sm text-neutral-200'>
          Obrigado por confiar na UpBoost!
        </p>
      </main>
      <Footer />
    </>
  );
}
