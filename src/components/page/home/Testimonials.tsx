import { Title } from '@/components/globals/site/Title';
import Marquee from '@/components/magicui/marquee';
import { motion } from 'framer-motion';

const reviews = [
  {
    name: '@danielrocha',
    body: 'Po mano trabalho sensacional, joguei uma aqui de valorant senti menos input e muito mais estabilidade meu Pc já não é aqueles do melhores posso dizer q vc milagre mano valeu',
  },
  {
    name: '@gvzin',
    body: '360 fps. Cai pra 330 fps, não desce, eu jurei q isso não ia funcionar, tô a 215 fps no warzone, obrigado mano.',
  },
  {
    name: '@varelaxlz_',
    body: 'Muito bom mano. Tô rodando liso pra caramba, no criativo rodava 144 e agr tô 240. Na partida meu fps dropava muito e agora tá muito mais cravado.',
  },
  {
    name: '@gbtns',
    body: 'Caraa, 180 FPS cravados, ficou top demais, o do meu irmão também um i3 8100 GTX 1050 144 fps cravado.',
  },
  {
    name: '@felps.gma',
    body: 'Tá aí irmão, parabéns. Jogo melhorou 100%, sem input, 200 fps cravado',
  },
  {
    name: '@l3ocampos',
    body: 'Eu não tava botando fé que ia funcionar não kkkkkk. Acabou as quedas de fps total.',
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

export const Testimonials = () => {
  return (
    <>
      <Marquee vertical className='items-center [--duration:20s] [--gap:20px]'>
        {firstRow.map((review, index) => {
          return (
            <div
              className='flex max-w-[250px] flex-col justify-center rounded-lg bg-theme-800 p-5 text-left shadow-sm shadow-theme-400/20'
              key={index}
            >
              <h1 className='font-sora text-2xl font-bold text-theme-400'>
                {review.name}
              </h1>
              <p className='mt-2 text-sm'>&ldquo;{review.body}&rdquo;</p>
            </div>
          );
        })}
      </Marquee>
      <Marquee
        vertical
        reverse
        className='items-center [--duration:20s] [--gap:20px]'
      >
        {secondRow.map((review, index) => {
          return (
            <div
              className='flex max-w-[250px] flex-col justify-center rounded-lg bg-theme-800 p-5 text-left shadow-sm shadow-theme-400/20'
              key={index}
            >
              <h1 className='font-sora text-2xl font-bold text-theme-400'>
                {review.name}
              </h1>
              <p className='mt-2 text-sm'>&ldquo;{review.body}&rdquo;</p>
            </div>
          );
        })}
      </Marquee>
      <div className='pointer-events-none absolute top-0 left-0 right-0 h-32 w-full bg-gradient-to-b from-theme-800 via-theme-800/95 to-transparent'></div>
      <div className='pointer-events-none absolute top-[630px] left-0 right-0 h-32 w-full bg-gradient-to-t from-theme-800 via-theme-800/95 to-transparent'></div>
      <motion.div
        initial={{ width: '0%' }}
        animate={{ width: '100%' }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
        className='absolute bottom-0 left-1/2 h-px -translate-x-1/2 bg-gradient-to-r from-transparent via-theme-400/20 to-transparent'
      ></motion.div>
    </>
  );
};
