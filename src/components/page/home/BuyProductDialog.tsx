import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { addPurchaseIntentToUser } from '@/functions/user.client';
import { cn } from '@/lib/utils';
import { DialogClose } from '@radix-ui/react-dialog';
import {
  CheckIcon,
  Gamepad2,
  KeyRound,
  Laptop2,
  ScreenShareOff,
  ShoppingCart,
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
    icon: <KeyRound size={48} />,
    title: 'Ativação do windows permanentemente',
    description: 'Válido para o windows 10 e 11',
    price: 19.9,
  },
  {
    icon: <ScreenShareOff size={48} />,
    title: 'Formatação padrão',
    description: 'Válido para o windows 10 e 11',
    price: 59.9,
  },
  {
    icon: <Laptop2 size={48} />,
    title: 'Formatação profissional',
    description:
      'Formatação profissional para o windows otimizado. Necessário PenDrive 4GB, válido windows 10 e 11',
    price: 99.9,
  },
  {
    icon: <Gamepad2 size={48} />,
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

    if (coupon) {
      setInputValue(coupon);
    }
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
    const index = selectedAddons.findIndex(
      (item) => item.title === addon.title
    );

    if (index === -1) {
      setSelectedAddons([...selectedAddons, addon]);
    } else {
      let addons = [...selectedAddons];

      addons.splice(index, 1);

      setSelectedAddons(addons);
    }
  };

  return (
    <Dialog
      onOpenChange={(e) => {
        if (!e) {
          setSelectedAddons([]);
          setInputValue('');
        }
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='max-h-screen w-full overflow-y-scroll sm:max-w-[425px] md:min-w-[700px] lg:min-w-[1000px] xl:min-w-[1200px] 2xl:min-w-[1400px]'>
        <DialogHeader>
          <DialogTitle>Compra de produto</DialogTitle>
          <DialogDescription>
            Ficamos felizes por você optar pela <b>UpBoost</b>. Agradecemos sua
            confiança.
          </DialogDescription>
        </DialogHeader>
        <div className='mt-5 flex items-start gap-10 max-lg:flex-col'>
          <div className='basis-2/3 lg:sticky lg:top-5'>
            <h1 className='text-xl font-bold text-theme-400'>
              Adicione mais um item e complemente sua otimização
            </h1>
            <div className='mt-3 flex flex-wrap items-center gap-3'>
              {items
                .filter((item) => typeof item.description === 'string')
                .map((item, index) => {
                  return (
                    <button
                      key={index}
                      onClick={() => {
                        toggleItem(item);
                      }}
                      className='relative aspect-square basis-[32%] overflow-hidden rounded-xl border border-theme-400 p-5 text-left max-lg:basis-[49%] max-md:aspect-auto max-md:basis-full'
                    >
                      {(() => {
                        const itemFind = selectedAddons.find(
                          (itemF) => itemF.title === item.title
                        );

                        return (
                          <div
                            className={cn(
                              'absolute right-5 top-5 flex aspect-square min-h-5 min-w-5 cursor-pointer items-center justify-center rounded-full border-2 border-theme-600 bg-theme-600',
                              !!itemFind ? 'border-theme-400 bg-theme-400' : ''
                            )}
                          >
                            {!!itemFind && (
                              <CheckIcon strokeWidth={5} size={12} />
                            )}
                          </div>
                        );
                      })()}
                      <span className='text-theme-400 max-md:hidden'>
                        {item.icon}
                      </span>
                      <h1 className='mt-2 text-lg font-bold text-theme-400 max-md:text-sm'>
                        {item.title}
                      </h1>
                      <p className='mt-2 text-sm text-neutral-100 max-md:text-xs'>
                        {item.description}
                      </p>
                      <div className='mt-4'>
                        <p className='text-sm text-neutral-300 line-through max-md:text-xs'>
                          {(item.price + 35).toLocaleString('pt-br', {
                            style: 'currency',
                            currency: 'BRL',
                          })}
                        </p>
                        <p className='text-2xl font-bold text-theme-400 max-md:text-lg'>
                          {item.price.toLocaleString('pt-br', {
                            style: 'currency',
                            currency: 'BRL',
                          })}
                        </p>
                      </div>
                    </button>
                  );
                })}

              <button
                onClick={() => toggleItem(items[4])}
                className='relative min-h-[279.25px] basis-[66%] rounded-xl border border-theme-100 p-5 text-left max-md:basis-[100%]'
              >
                {(() => {
                  const itemFind = selectedAddons.find(
                    (itemF) => itemF.title === items[4].title
                  );

                  return (
                    <div
                      className={cn(
                        'absolute right-5 top-5 flex aspect-square min-h-8 min-w-8 cursor-pointer items-center justify-center rounded-full border-2 border-theme-600 bg-theme-600 max-md:bottom-5 max-md:top-auto max-md:min-h-5 max-md:min-w-5',
                        !!itemFind ? 'border-theme-100 bg-theme-100' : ''
                      )}
                    >
                      {!!itemFind && <CheckIcon strokeWidth={5} size={12} />}
                    </div>
                  );
                })()}
                <h1 className='mt-2 text-lg font-bold text-theme-100'>
                  {items[4].title}
                </h1>
                <ul className='ml-4 mt-2 list-disc text-sm text-neutral-300'>
                  {typeof items[4].description === 'object' &&
                    items[4].description.map((description) => {
                      return <li key={description}>{description}</li>;
                    })}
                </ul>
                <div className='mt-4'>
                  <p className='text-sm text-neutral-300 line-through'>
                    {(items[4].price + 120).toLocaleString('pt-br', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </p>
                  <p className='text-2xl font-bold text-theme-100'>
                    {items[4].price.toLocaleString('pt-br', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </p>
                </div>
              </button>
            </div>
          </div>
          <div className='basis-1/3 border-l border-l-neutral-400 pl-8 max-lg:border-l-0 max-lg:pl-0'>
            <div className='grid gap-4 py-4'>
              <h1 className='text-2xl font-bold text-theme-400'>
                Resumo da sua compra
              </h1>
              <div className='rounded-xl border border-theme-400 p-5'>
                <h1 className='text-xl font-bold'>{selectedPlan.name}</h1>
                {typeof selectedPlan.description === 'string' && (
                  <p className='text-sm text-neutral-300'>
                    {selectedPlan.description}
                  </p>
                )}

                <ul className='ml-3 mt-10 list-disc text-sm text-neutral-300 accent-neutral-300'>
                  {!!selectedPlan.features &&
                    Object.values(selectedPlan.features).map((value, index) => {
                      if (value) {
                        return (
                          <li key={index}>
                            <span className='text-theme-500'>
                              {!!selectedPlan.features &&
                                Object.keys(selectedPlan.features)[index]}
                            </span>
                          </li>
                        );
                      }

                      return <></>;
                    })}

                  {typeof selectedPlan.description !== 'string' &&
                    selectedPlan.description.map((desc, index) => {
                      return (
                        <li key={index}>
                          <span className='text-theme-500'>{desc}</span>
                        </li>
                      );
                    })}
                </ul>
              </div>
              {selectedAddons.map((addon, index) => {
                return (
                  <div
                    key={index}
                    className='rounded-xl border border-theme-400 p-5'
                  >
                    <h1 className='text-xl font-bold'>{addon.title}</h1>

                    {typeof addon.description === 'string' ? (
                      <p className='text-sm text-neutral-200'>
                        {addon.description}
                      </p>
                    ) : (
                      <ul className='ml-3 mt-10 list-disc text-sm text-neutral-300 accent-neutral-300'>
                        {addon.description.map(
                          (value: string, index: number) => {
                            return (
                              <li key={index}>
                                <span className='text-theme-500'>{value}</span>
                              </li>
                            );
                          }
                        )}
                      </ul>
                    )}
                  </div>
                );
              })}
              <h1 className='text-sm'>
                Se tiver um cupom de desconto, digite ele aqui! Se não tiver,
                apenas clique em Adquirir produto.
              </h1>
              <input
                type='text'
                value={inputValue}
                autoFocus={false}
                className='rounded-lg bg-theme-800 p-5 focus:outline-theme-400 focus:ring-transparent'
                onChange={(e) => setInputValue(e.target.value)}
                placeholder='Insira seu cupom de desconto'
              />
              <h1 className='text-xl font-bold text-theme-400'>
                Total:{' '}
                {subTotal.toLocaleString('pt-br', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </h1>
              <DialogClose asChild>
                <Button onClick={onClickBuyButton} className='w-full'>
                  <ShoppingCart /> Adquirir produto
                </Button>
              </DialogClose>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
