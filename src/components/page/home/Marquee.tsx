import Marquee from '@/components/magicui/marquee';
import Image from 'next/image';

const items = [
  'cs2',
  'fivem',
  'fortnite',
  'gta',
  'pubg',
  'r6s',
  'valorant',
  'warzone',
];

export const MarqueeHome = () => {
  return (
    <section className='relative mb-[10px] mt-[40px] max-md:mb-[50px] max-md:mt-[150px]'>
      <Marquee className='items-center [--duration:20s] [--gap:100px] max-md:[--gap:80px]'>
        {items.map((item, index) => {
          return (
            <div
              key={index}
              className='flex w-20 items-center justify-center opacity-45 transition-all hover:opacity-100'
            >
              <Image
                src={`/images/tinified/${item}${item === 'gta' ? '.webp' : item === 'valorant' ? '.svg' : '.png'}`}
                alt={item}
                className='pointer-events-none select-none'
                width={120}
                height={120}
              />
            </div>
          );
        })}
      </Marquee>
      <div className='pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-theme-800'></div>
      <div className='pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-theme-800'></div>
    </section>
  );
};
