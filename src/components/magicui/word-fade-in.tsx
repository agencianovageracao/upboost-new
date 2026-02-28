'use client';

import { motion, Variants } from 'framer-motion';

import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

interface WordFadeInProps {
  words: string;
  className?: string;
  delay?: number;
  variants?: Variants;
  delayToAppear?: number;
}

export default function WordFadeIn({
  words,
  delay = 0.15,
  variants = {
    hidden: { opacity: 0 },
    visible: (i: any) => ({
      y: 0,
      opacity: 1,
      transition: { delay: i * delay },
    }),
  },
  className,
  delayToAppear,
}: WordFadeInProps) {
  const [appear, setAppear] = useState(!delayToAppear);
  const _words = words.split(' ');

  useEffect(() => {
    if (delayToAppear) {
      setAppear(false);

      setTimeout(() => setAppear(true), delayToAppear * 1000);
    }
  }, [delayToAppear]);

  if (appear) {
    return (
      <motion.h1
        variants={variants}
        initial='hidden'
        animate='visible'
        className={cn(
          'font-display text-center text-4xl font-bold tracking-[-0.02em] text-black drop-shadow-sm dark:text-white md:text-7xl md:leading-[5rem]',
          className
        )}
      >
        {_words.map((word, i) => (
          <motion.span key={word} variants={variants} custom={i}>
            {word}{' '}
          </motion.span>
        ))}
      </motion.h1>
    );
  }

  return '';
}
