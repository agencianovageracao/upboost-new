'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle, ChevronRight, ShoppingCart, Star, Zap } from 'lucide-react';
import { useState } from 'react';
import { BuyProductDialog } from './BuyProductDialog';

const ease = [0.22, 1, 0.36, 1] as const;

// ─── Types ────────────────────────────────────────────────────────────────────

type PlanFeatures = {
  'Otimização básica': boolean;
  'Otimização intermediária': boolean;
  'Otimização plus': boolean;
  'Otimização profissional': boolean;
  'Limpeza intermediária': boolean;
  'Limpeza avançada': boolean;
  'Remoção de input lag': boolean;
  'Remoção de input delay': boolean;
  'Ativação do Windows': boolean;
};

type Plan = {
  id: string;
  name: string;
  tagline: string;
  qty: number;
  price: number;
  originalPrice: number;
  badge: string | null;
  featured: boolean;
  buyName: string;
  buyDescription: string | string[];
  features: string[];
  featuresObj?: PlanFeatures;
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const premiumPlans: Plan[] = [
  {
    id: 'evolution',
    name: 'Evolution +',
    tagline: 'Dois pacotes completos pelo preço de um',
    qty: 390,
    price: 150,
    originalPrice: 350,
    badge: 'Mais vendido',
    featured: true,
    buyName: 'Pacote Evolution +',
    buyDescription: ['Pacote Streamer', 'Pacote Pro Player', '390 otimizações'],
    features: [
      'Pacote Streamer incluso',
      'Pacote Pro Player incluso',
      'Pode refazer 1× por R$ 75',
      'Atendimento prioritário',
    ],
  },
  {
    id: 'ultra-pro',
    name: 'Ultra Pro',
    tagline: 'O mais completo da linha individual',
    qty: 240,
    price: 100,
    originalPrice: 200,
    badge: null,
    featured: false,
    buyName: 'Pacote Ultra Pro',
    buyDescription: 'O pacote mais completo da UpBoost, preferido por pro players e streamers.',
    features: [
      'Otimização profissional',
      'Limpeza avançada',
      'Remoção de input delay',
      'Ativação do Windows',
      'Otimização privada UpBoost',
      'Brinde exclusivo',
    ],
    featuresObj: {
      'Otimização básica': true,
      'Otimização intermediária': true,
      'Otimização plus': true,
      'Otimização profissional': true,
      'Limpeza intermediária': true,
      'Limpeza avançada': true,
      'Remoção de input lag': true,
      'Remoção de input delay': true,
      'Ativação do Windows': true,
    },
  },
];

const acessivelPlans: Plan[] = [
  {
    id: 'pro-plus',
    name: 'Pro Plus',
    tagline: 'O preferido dos jogadores competitivos',
    qty: 180,
    price: 75,
    originalPrice: 150,
    badge: '2° mais vendido',
    featured: true,
    buyName: 'Pacote Pro Plus',
    buyDescription: 'O mais procurado por jogadores competitivos, com otimização e limpeza completa.',
    features: [
      'Otimização profissional',
      'Limpeza avançada',
      'Remoção de input lag',
      'Atendimento via WhatsApp',
    ],
    featuresObj: {
      'Otimização básica': true,
      'Otimização intermediária': true,
      'Otimização plus': true,
      'Otimização profissional': true,
      'Limpeza intermediária': true,
      'Limpeza avançada': true,
      'Remoção de input lag': true,
      'Remoção de input delay': false,
      'Ativação do Windows': false,
    },
  },
  {
    id: 'elite',
    name: 'Elite',
    tagline: 'Melhor custo-benefício do mercado',
    qty: 130,
    price: 50,
    originalPrice: 100,
    badge: null,
    featured: false,
    buyName: 'Pacote Elite',
    buyDescription: 'Otimização plus, limpeza intermediária e remoção de input lag.',
    features: [
      'Otimização plus',
      'Limpeza intermediária',
      'Remoção de input lag',
      'Atendimento via WhatsApp',
    ],
    featuresObj: {
      'Otimização básica': true,
      'Otimização intermediária': true,
      'Otimização plus': true,
      'Otimização profissional': false,
      'Limpeza intermediária': true,
      'Limpeza avançada': false,
      'Remoção de input lag': true,
      'Remoção de input delay': false,
      'Ativação do Windows': false,
    },
  },
];

// ─── Plan card ────────────────────────────────────────────────────────────────

const PlanCard = ({ plan, index }: { plan: Plan; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.35, ease, delay: index * 0.06 }}
    whileHover={{ y: -3, scale: 1.01 }}
    className='relative flex flex-col overflow-hidden rounded-2xl border border-white/8 bg-theme-800 p-7 max-sm:p-5'
  >
    {/* Ambient top glow — gold for featured, barely-there for normal */}
    <div
      aria-hidden
      className='pointer-events-none absolute inset-0'
      style={{
        background: plan.featured
          ? 'radial-gradient(ellipse 90% 45% at 50% 0%, rgba(255,211,0,0.06) 0%, transparent 70%)'
          : 'radial-gradient(ellipse 90% 45% at 50% 0%, rgba(255,255,255,0.015) 0%, transparent 70%)',
      }}
    />

    {/* Badge row — fixed height so both cards align below it */}
    <div className='relative z-10 mb-5 h-6'>
      {plan.badge && (
        <span className='inline-flex items-center gap-1.5 rounded-full border border-theme-400/25 bg-theme-400/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-theme-400'>
          <Star className='h-2.5 w-2.5 fill-theme-400' />
          {plan.badge}
        </span>
      )}
    </div>

    {/* Name + tagline */}
    <div className='relative z-10'>
      <h3 className='font-sora text-2xl font-bold text-white'>{plan.name}</h3>
      <p className='mt-0.5 text-sm text-neutral-500'>{plan.tagline}</p>
    </div>

    {/* Price — hero metric */}
    <div className='relative z-10 mt-5'>
      <p className='text-sm text-neutral-600 line-through'>
        R$ {plan.originalPrice.toFixed(2).replace('.', ',')}
      </p>
      <p className={`font-sora text-5xl font-bold leading-none ${plan.featured ? 'text-theme-400' : 'text-white'}`}>
        R$ {plan.price},<span className='text-3xl'>00</span>
      </p>
    </div>

    {/* Divider */}
    <div className='relative z-10 my-5 h-px bg-white/5' />

    {/* Optimization count — same visual weight for both */}
    <div className='relative z-10 mb-4 flex items-center gap-2 rounded-lg border border-white/5 bg-theme-700/50 px-3 py-2.5'>
      <Zap className={`h-3.5 w-3.5 shrink-0 ${plan.featured ? 'text-theme-400' : 'text-neutral-400'}`} />
      <span className={`text-sm font-bold ${plan.featured ? 'text-theme-400' : 'text-neutral-300'}`}>
        {plan.qty} otimizações incluídas
      </span>
    </div>

    {/* Features */}
    <ul className='relative z-10 flex flex-1 flex-col gap-2.5'>
      {plan.features.map(f => (
        <li key={f} className='flex items-center gap-2'>
          <CheckCircle className='h-3.5 w-3.5 shrink-0 text-theme-400' />
          <span className='text-xs text-neutral-300'>{f}</span>
        </li>
      ))}
    </ul>

    {/* CTA — same base style, featured gets gold fill */}
    <div className='relative z-10 mt-5'>
      <BuyProductDialog
        selectedPlan={{
          name: plan.buyName,
          description: plan.buyDescription,
          original_price: plan.originalPrice,
          discounted_price: plan.price,
          features: plan.featuresObj,
        }}
      >
        <button
          className={`flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-colors ${
            plan.featured
              ? 'bg-theme-400 text-theme-900 hover:bg-theme-400/90'
              : 'border border-white/10 bg-theme-700 text-white hover:border-white/15 hover:bg-theme-600'
          }`}
        >
          <ShoppingCart className='h-4 w-4' />
          Comprar agora
        </button>
      </BuyProductDialog>
    </div>
  </motion.div>
);

// ─── Component ────────────────────────────────────────────────────────────────

type Tab = 'premium' | 'acessivel';

export const Plans = () => {
  const [activeTab, setActiveTab] = useState<Tab>('premium');

  const switchTab = (tab: Tab) => setActiveTab(tab);

  const plans = activeTab === 'premium' ? premiumPlans : acessivelPlans;

  return (
    <section className='bg-theme-900 py-20'>
      <div className='container'>

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className='mb-10 text-center'
        >
          <h2 className='font-sora text-3xl font-bold max-lg:text-2xl'>
            Nossos <span className='text-theme-400'>planos</span>
          </h2>
          <p className='mt-2 text-sm text-neutral-400'>
            Cada otimização conta — escolha o plano certo para o seu setup
          </p>
        </motion.div>

        {/* ── Tab switcher ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease, delay: 0.1 }}
          className='mb-8 flex justify-center'
        >
          <div className='relative flex rounded-full border border-white/8 bg-theme-800 p-1'>
            {/* Sliding pill — fixed width, translates on x only */}
            <motion.div
              className='pointer-events-none absolute top-1 bottom-1 rounded-full bg-theme-400'
              style={{ left: 4, width: 'calc(50% - 4px)' }}
              animate={{ x: activeTab === 'premium' ? 0 : '100%' }}
              transition={{ type: 'spring', stiffness: 480, damping: 38, mass: 0.7 }}
            />
            {(['premium', 'acessivel'] as Tab[]).map(tab => (
              <button
                key={tab}
                onClick={() => switchTab(tab)}
                className={`relative z-10 min-w-[120px] rounded-full py-2 text-sm font-semibold transition-colors max-sm:min-w-[96px] ${
                  activeTab === tab ? 'text-theme-900' : 'text-neutral-400 hover:text-white'
                }`}
              >
                {tab === 'premium' ? 'Profissional' : 'Casual'}
              </button>
            ))}
          </div>
        </motion.div>

        {/* ── Plan cards ── */}
        <AnimatePresence mode='wait' initial={false}>
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
            className='grid grid-cols-2 gap-5 max-md:grid-cols-1'
          >
            {plans.map((plan, i) => (
              <PlanCard key={plan.id} plan={plan} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* ── Cross-tab copy ── */}
        <AnimatePresence mode='wait' initial={false}>
          <motion.div
            key={activeTab + '-copy'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className='mt-6 text-center'
          >
            {activeTab === 'premium' ? (
              <p className='text-sm text-neutral-600'>
                Você joga de forma casual ou está começando?{' '}
                <button
                  onClick={() => switchTab('acessivel')}
                  className='inline-flex items-center gap-0.5 text-neutral-400 transition-colors hover:text-theme-400'
                >
                  Ver planos de entrada
                  <ChevronRight className='h-3.5 w-3.5' />
                </button>
              </p>
            ) : (
              <p className='text-sm text-neutral-600'>
                Pro player, competitivo ou streamer?{' '}
                <button
                  onClick={() => switchTab('premium')}
                  className='inline-flex items-center gap-0.5 text-neutral-400 transition-colors hover:text-theme-400'
                >
                  Ver planos premium
                  <ChevronRight className='h-3.5 w-3.5' />
                </button>
              </p>
            )}
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};
