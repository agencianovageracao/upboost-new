'use client';

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';
import { addPurchaseIntentToUser } from '@/functions/user.client';
import { cn } from '@/lib/utils';
import { DialogClose } from '@radix-ui/react-dialog';
import {
  CheckCircle,
  Gamepad2,
  KeyRound,
  Laptop2,
  ScreenShareOff,
  ShoppingCart,
  Tag,
} from 'lucide-react';
import { useCookies } from 'next-client-cookies';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const messageWhithoutDiscount =
  'https://wa.me/556592952018?text=Ol%C3%A1%2C%20vim%20atrav%C3%A9s%20do%20site%20e%20gostaria%20de%20comprar%20o%20(produto)';
const messageWithDiscount =
  'https://wa.me/556592952018?text=Ol%C3%A1%2C%20vim%20atrav%C3%A9s%20do%20site%20e%20queria%20comprar%20o%20(produto).%0A%0AEu%20tenho%20tamb%C3%A9m%20um%20cupom%3A%20*(cupom)*.';

type Plan = {
  name: string;
  description: string | string[];
  discounted_price: number;
  original_price: number;
  features?: {
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
};

const items = [
  {
    icon: <KeyRound />,
    title: 'Ativação do windows permanentemente',
    description: 'Válido para o windows 10 e 11',
    price: 19.9,
  },
  {
    icon: <ScreenShareOff />,
    title: 'Formatação padrão',
    description: 'Válido para o windows 10 e 11',
    price: 59.9,
  },
  {
    icon: <Laptop2 />,
    title: 'Formatação profissional',
    description:
      'Formatação profissional para o windows otimizado. Necessário PenDrive 4GB, válido windows 10 e 11',
    price: 99.9,
  },
  {
    icon: <Gamepad2 />,
    title: 'Remoção de delay para controle',
    description: 'De 5ms pra 1ms. Qualquer console/controle',
    price: 35.9,
  },
  {
    title: 'UPBOOST +',
    description: [
      'Limpeza pró plus',
      'Ativação do windows',
      'Otimizações básicas',
      'Otimizações na NVIDIA/AMD',
    ],
    price: 29.9,
  },
];

export const BuyProductDialog = ({
  children,
  selectedPlan,
}: {
  children: React.ReactNode;
  selectedPlan: Plan;
}) => {
  const [inputValue, setInputValue] = useState('');
  const [selectedAddons, setSelectedAddons] = useState<any[]>([]);

  const cookies = useCookies();
  const router = useRouter();

  const subTotal =
    selectedPlan.discounted_price +
    selectedAddons.reduce((sum, addon) => sum + addon.price, 0);

  useEffect(() => {
    const coupon = cookies.get('coupon');
    if (coupon) setInputValue(coupon);
  }, []);

  const onClickBuyButton = async () => {
    const coupon = cookies.get('coupon');
    let message = '';

    if (!coupon && inputValue.length > 0) {
      await addPurchaseIntentToUser(inputValue);
      message = `${messageWithDiscount
        .replaceAll('(produto)', selectedPlan.name)
        .replaceAll('*(cupom)*', inputValue)}`;
    } else if (!!coupon && inputValue.length > 0) {
      await addPurchaseIntentToUser(coupon);
      message = `${messageWithDiscount
        .replaceAll('(produto)', selectedPlan.name)
        .replaceAll('*(cupom)*', coupon)}`;
      cookies.remove('coupon');
    } else {
      message = `${messageWhithoutDiscount.replaceAll('(produto)', selectedPlan.name)}`;
    }

    if (selectedAddons.length > 0) {
      message += `%0A%0AAdicionais:`;
      selectedAddons.forEach((addon) => {
        message += `%0A%0A- ${addon.title}`;
      });
    }

    message += `%0A%0ATotal: ${subTotal.toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL',
    })}`;

    window.open(message);
  };

  const toggleItem = (addon: any) => {
    const index = selectedAddons.findIndex((item) => item.title === addon.title);
    if (index === -1) {
      setSelectedAddons([...selectedAddons, addon]);
    } else {
      const addons = [...selectedAddons];
      addons.splice(index, 1);
      setSelectedAddons(addons);
    }
  };

  const upboostItem = items[4];
  const upboostSelected = !!selectedAddons.find((a) => a.title === upboostItem.title);

  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) {
          setSelectedAddons([]);
          setInputValue('');
        }
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className='flex w-full flex-col overflow-hidden border-white/10 bg-theme-800/85 p-0 backdrop-blur-2xl sm:max-w-[425px] md:min-w-[700px] lg:min-w-[1000px] xl:min-w-[1200px] 2xl:min-w-[1400px]'>
        {/* Ambient top glow */}
        <div
          aria-hidden
          className='pointer-events-none absolute inset-0'
          style={{
            background:
              'radial-gradient(ellipse 80% 35% at 50% 0%, rgba(255,211,0,0.05) 0%, transparent 60%)',
          }}
        />

        {/* ── Header (fixo) ──────────────────────────────────── */}
        <div className='relative shrink-0 border-b border-white/5 px-8 py-6 pr-14 max-md:px-5 max-md:py-4'>
          <p className='text-[10px] font-bold uppercase tracking-widest text-theme-400'>
            UpBoost
          </p>
          <h2 className='font-sora mt-1 text-2xl font-bold text-white max-md:text-xl'>Finalizar compra</h2>
          <p className='mt-0.5 text-sm text-neutral-500 max-md:text-xs'>
            Adicione itens extras e finalize pelo WhatsApp.
          </p>
        </div>

        {/* ── Body (scrollável) ──────────────────────────────── */}
        <div className='relative flex min-h-0 flex-1 overflow-hidden max-lg:flex-col max-lg:overflow-y-auto'>

          {/* ── Left: Addons ── */}
          <div className='flex-1 p-8 max-lg:p-5 lg:overflow-y-auto'>
            <h3 className='font-sora text-base font-bold text-theme-400 max-md:text-sm'>
              Complemente sua otimização
            </h3>

            {/* 2-col grid */}
            <div className='mt-4 grid grid-cols-2 gap-3 max-md:grid-cols-1'>
              {items
                .filter((item) => typeof item.description === 'string')
                .map((item, index) => {
                  const isSelected = !!selectedAddons.find((a) => a.title === item.title);
                  return (
                    <button
                      key={index}
                      onClick={() => toggleItem(item)}
                      className={cn(
                        'relative rounded-xl border p-4 text-left transition-all',
                        isSelected
                          ? 'border-theme-400/40 bg-theme-400/5'
                          : 'border-white/8 bg-theme-700/40 hover:border-white/15 hover:bg-theme-700/60'
                      )}
                    >
                      {/* Checkbox */}
                      <div
                        className={cn(
                          'absolute right-3.5 top-3.5 flex h-5 w-5 items-center justify-center rounded-full border-2 transition-all',
                          isSelected
                            ? 'border-theme-400 bg-theme-400'
                            : 'border-white/20 bg-transparent'
                        )}
                      >
                        {isSelected && (
                          <CheckCircle className='h-3 w-3 text-theme-900' strokeWidth={3} />
                        )}
                      </div>

                      {/* Badge "Popular" no primeiro card */}
                      {index === 0 && (
                        <span className='mb-2 inline-flex items-center gap-1 rounded-full border border-theme-400/25 bg-theme-400/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-theme-400'>
                          ★ Popular
                        </span>
                      )}

                      {/* Icon */}
                      <span
                        className={cn(
                          'block [&>svg]:h-6 [&>svg]:w-6',
                          isSelected ? 'text-theme-400' : 'text-neutral-500'
                        )}
                      >
                        {item.icon}
                      </span>

                      <h4 className='mt-2 pr-6 text-sm font-bold leading-snug text-white'>
                        {item.title}
                      </h4>
                      <p className='mt-1 text-xs text-neutral-500'>
                        {item.description as string}
                      </p>

                      <div className='mt-3 flex items-baseline gap-2'>
                        <span className='text-xs text-neutral-600 line-through'>
                          {(item.price + 35).toLocaleString('pt-br', {
                            style: 'currency',
                            currency: 'BRL',
                          })}
                        </span>
                        <span className='text-base font-bold text-theme-400'>
                          {item.price.toLocaleString('pt-br', {
                            style: 'currency',
                            currency: 'BRL',
                          })}
                        </span>
                      </div>
                    </button>
                  );
                })}
            </div>

            {/* UPBOOST+ — destaque full-width */}
            <button
              onClick={() => toggleItem(upboostItem)}
              className={cn(
                'relative mt-3 w-full overflow-hidden rounded-xl border p-5 text-left transition-all',
                upboostSelected
                  ? 'border-theme-400/60 bg-theme-400/8 shadow-[0_0_24px_rgba(255,211,0,0.12)]'
                  : 'border-theme-400/30 bg-theme-400/5 hover:border-theme-400/50 hover:bg-theme-400/8'
              )}
            >
              {/* Glow interno */}
              <div
                aria-hidden
                className='pointer-events-none absolute inset-0'
                style={{
                  background:
                    'radial-gradient(ellipse 70% 60% at 0% 50%, rgba(255,211,0,0.07) 0%, transparent 70%)',
                }}
              />

              {/* Checkbox */}
              <div
                className={cn(
                  'absolute right-4 top-4 flex h-5 w-5 items-center justify-center rounded-full border-2 transition-all',
                  upboostSelected ? 'border-theme-400 bg-theme-400' : 'border-theme-400/40 bg-transparent'
                )}
              >
                {upboostSelected && (
                  <CheckCircle className='h-3 w-3 text-theme-900' strokeWidth={3} />
                )}
              </div>

              {/* Badge */}
              <span className='mb-3 inline-flex items-center gap-1.5 rounded-full border border-theme-400/25 bg-theme-400/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-theme-400'>
                ⚡ Oferta especial
              </span>

              <div className='flex items-start justify-between gap-6 pr-8 max-md:flex-col max-md:gap-3'>
                <div className='flex-1'>
                  <h4 className='font-sora text-lg font-bold text-theme-400'>{upboostItem.title}</h4>
                  <ul className='mt-2 flex flex-wrap gap-x-5 gap-y-1'>
                    {Array.isArray(upboostItem.description) &&
                      upboostItem.description.map((d) => (
                        <li key={d} className='flex items-center gap-1.5 text-xs text-neutral-300'>
                          <CheckCircle className='h-2.5 w-2.5 shrink-0 text-theme-400/60' />
                          {d}
                        </li>
                      ))}
                  </ul>
                </div>

                <div className='shrink-0 text-right max-md:text-left'>
                  <p className='text-xs text-neutral-600 line-through'>
                    {(upboostItem.price + 120).toLocaleString('pt-br', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </p>
                  <p className='font-sora text-2xl font-bold text-theme-400'>
                    {upboostItem.price.toLocaleString('pt-br', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </p>
                </div>
              </div>
            </button>
          </div>

          {/* Vertical divider (desktop) */}
          <div className='hidden w-px self-stretch bg-white/5 lg:block' />

          {/* ── Right: Summary ── */}
          <div className='w-full p-8 max-lg:border-t max-lg:border-white/5 max-lg:p-5 lg:w-80 lg:shrink-0 lg:overflow-y-auto xl:w-96'>
            <div>
              <h3 className='font-sora text-base font-bold text-white'>Resumo da compra</h3>

              {/* Plan card */}
              <div className='mt-3 rounded-xl border border-white/8 bg-theme-700/40 p-4'>
                <p className='text-[10px] font-bold uppercase tracking-widest text-neutral-500'>
                  Plano selecionado
                </p>
                <p className='mt-1 font-semibold text-white'>{selectedPlan.name}</p>

                {selectedPlan.features ? (
                  <ul className='mt-3 flex flex-col gap-1.5'>
                    {Object.entries(selectedPlan.features)
                      .filter(([, v]) => v)
                      .map(([key]) => (
                        <li key={key} className='flex items-center gap-2'>
                          <CheckCircle className='h-3 w-3 shrink-0 text-theme-400' />
                          <span className='text-xs text-neutral-400'>{key}</span>
                        </li>
                      ))}
                  </ul>
                ) : typeof selectedPlan.description !== 'string' ? (
                  <ul className='mt-3 flex flex-col gap-1.5'>
                    {selectedPlan.description.map((d, i) => (
                      <li key={i} className='flex items-center gap-2'>
                        <CheckCircle className='h-3 w-3 shrink-0 text-theme-400' />
                        <span className='text-xs text-neutral-400'>{d}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className='mt-2 text-xs text-neutral-400'>{selectedPlan.description}</p>
                )}

                <div className='mt-3 flex justify-between border-t border-white/5 pt-3'>
                  <span className='text-xs text-neutral-500'>Subtotal</span>
                  <span className='text-sm font-bold text-white'>
                    {selectedPlan.discounted_price.toLocaleString('pt-br', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </span>
                </div>
              </div>

              {/* Addon line items */}
              {selectedAddons.length > 0 && (
                <div className='mt-2 flex flex-col gap-1.5'>
                  {selectedAddons.map((addon, i) => (
                    <div
                      key={i}
                      className='flex items-center justify-between rounded-lg border border-white/5 bg-theme-700/20 px-3 py-2'
                    >
                      <span className='text-xs text-neutral-400'>{addon.title}</span>
                      <span className='text-xs font-bold text-white'>
                        +{' '}
                        {addon.price.toLocaleString('pt-br', {
                          style: 'currency',
                          currency: 'BRL',
                        })}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Coupon input */}
              <div className='mt-4 rounded-xl border border-theme-400/20 bg-theme-400/5 p-3'>
                <label className='mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-theme-400'>
                  <Tag className='h-3.5 w-3.5' />
                  Tem um cupom de desconto?
                </label>
                <input
                  type='text'
                  value={inputValue}
                  autoFocus={false}
                  className='w-full rounded-lg border border-theme-400/30 bg-theme-800/60 px-3 py-2.5 text-sm text-white placeholder-neutral-600 outline-none transition-colors focus:border-theme-400 focus:ring-1 focus:ring-theme-400/30'
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder='Digite seu cupom aqui'
                />
              </div>

              {/* Total */}
              <div className='mt-4 flex items-center justify-between rounded-xl border border-white/8 bg-theme-700/40 px-4 py-3'>
                <span className='text-sm font-semibold text-neutral-300'>Total</span>
                <span className='font-sora text-xl font-bold text-theme-400'>
                  {subTotal.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                </span>
              </div>

              {/* CTA */}
              <DialogClose asChild>
                <button
                  onClick={onClickBuyButton}
                  className='mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-theme-400 py-3 text-sm font-semibold text-theme-900 transition-colors hover:bg-theme-400/90'
                >
                  <ShoppingCart className='h-4 w-4' />
                  Adquirir produto
                </button>
              </DialogClose>

              <p className='mt-3 text-center text-xs text-neutral-600'>
                Você será redirecionado para o WhatsApp
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
