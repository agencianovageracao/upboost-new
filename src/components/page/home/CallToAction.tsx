'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';

export const CallToAction = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const features = [
    {
      icon: (
        <svg viewBox='0 0 24 24' className='h-6 w-6 fill-current'>
          <path d='M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm0-2a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm1-9h3v2h-3v3h-2v-3H8v-2h3V8h2v3z' />
        </svg>
      ),
      title: 'Serviço feito remotamente.',
      description:
        'A UPBOOST realiza otimizações de alto nível 100% online, feito remotamente via anydesk. garantindo segurança e eficiência no seu PC sem a necessidade de deslocamento.',
    },
    {
      icon: (
        <svg viewBox='0 0 24 24' className='h-6 w-6 fill-current'>
          <path d='M13 9.874v10l-3.773-1.992c-3.301-1.74-4.461-5.55-2.608-8.577l3.774-6.142c1.853-3.027 5.933-4.084 9.234-2.343l.232.123c3.301 1.74 4.461 5.55 2.608 8.577l-3.774 6.142A6.754 6.754 0 0 1 13 9.874z' />
        </svg>
      ),
      title: 'Otimização de máquina por completo',
      description:
        'Nosso serviço ajusta cada detalhe do seu sistema operacional, maximizando o desempenho e eliminando processos desnecessários para uma performance superior.',
    },
    {
      icon: (
        <svg viewBox='0 0 24 24' className='h-6 w-6 fill-current'>
          <path d='M17 15.245v6.872a.5.5 0 0 1-.757.429L12 20l-4.243 2.546a.5.5 0 0 1-.757-.43v-6.87a8 8 0 1 1 10 0zm-8 1.173v3.05l3-1.8 3 1.8v-3.05A7.978 7.978 0 0 1 12 17a7.978 7.978 0 0 1-3-.582zM12 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12z' />
        </svg>
      ),
      title: 'Remoção de input-lag/input-delay',
      description:
        'Reduza significativamente o atraso nos comandos, garantindo respostas instantâneas e maior precisão em seus jogos competitivos.',
    },
    {
      icon: (
        <svg viewBox='0 0 24 24' className='h-6 w-6 fill-current'>
          <path d='M4 6.414L.757 3.172l1.415-1.415L5.414 5h15.242a1 1 0 0 1 .958 1.287l-2.4 8a1 1 0 0 1-.958.713H6v2h11v2H5a1 1 0 0 1-1-1V6.414zM6 7v6h11.512l1.8-6H6zm-.5 16a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm12 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z' />
        </svg>
      ),
      title: 'Aumento de FPS',
      description:
        'Aprimore sua experiência de jogo ajustando as configurações do sistema para obter mais FPS, estabilidade e fluidez nos games.',
    },
  ];

  return (
    <section className='relative overflow-hidden bg-theme-900 py-20'>
      {/* Animated background effects */}
      <div className='absolute inset-0'>
        <div className='absolute h-full w-full bg-[radial-gradient(circle_at_50%_50%,rgba(88,28,135,0.15),transparent_50%)]' />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 0.15, 0.3] }}
          transition={{ duration: 5, repeat: Infinity }}
          className='absolute -left-4 top-0 h-full w-3/4 bg-[conic-gradient(from_180deg_at_50%_50%,rgba(168,85,247,0.15)_0deg,transparent_180deg)]'
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.2, 0.1, 0.2] }}
          transition={{ duration: 5, repeat: Infinity, delay: 2.5 }}
          className='absolute -right-4 top-0 h-full w-3/4 bg-[conic-gradient(from_0deg_at_50%_50%,rgba(168,85,247,0.15)_0deg,transparent_180deg)]'
        />
      </div>

      {/* Header Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
        transition={{ duration: 0.7 }}
        className='relative mx-auto mb-20 max-w-4xl px-4 text-center'
      >
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className='relative inline-block'
        >
          <motion.span
            className='absolute -inset-1 rounded-lg bg-gradient-to-r from-theme-400/20 via-theme-400/10 to-transparent blur-xl'
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <h2 className='relative mb-6 text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl'>
            Domine como os pro players! Maximize sua performance,
            <br />
            <span className='text-theme-400'>
              e conquiste mais FPS com a UPBOOST.
            </span>
          </h2>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className='mt-12'
        >
          <Link href='#planos'>
            <Button
              size='lg'
              className='rounded-xl bg-theme-400 px-10 py-7 text-lg font-bold text-theme-900 shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all duration-300 hover:bg-theme-400/90 hover:shadow-[0_0_25px_rgba(168,85,247,0.4)]'
            >
              JUNTE-SE AGORA!
            </Button>
          </Link>
        </motion.div>
      </motion.div>

      {/* Features Grid */}
      <div className='relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div
          ref={ref}
          className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className='group relative'
            >
              <div className='to-theme-500/50 absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-theme-400/50 opacity-30 blur transition duration-500 group-hover:opacity-50' />
              <div className='relative h-full rounded-2xl border border-theme-400/20 bg-theme-800 p-8 backdrop-blur-sm transition duration-300'>
                <motion.div
                  className='group-hover:text-theme-300 mb-4 text-theme-400 transition-colors duration-300'
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className='group-hover:text-theme-300 mb-3 text-xl font-semibold text-theme-400 transition-colors duration-300'>
                  {feature.title}
                </h3>
                <p className='text-sm text-zinc-400 transition-colors duration-300 group-hover:text-zinc-300'>
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
