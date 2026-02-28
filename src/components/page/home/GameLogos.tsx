'use client';

import { motion } from 'framer-motion';

const games = [
  {
    name: 'Valorant',
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current">
        <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.333l7.5 3.75v7.834l-7.5 3.75-7.5-3.75V8.083l7.5-3.75z" />
      </svg>
    ),
  },
  {
    name: 'Fortnite',
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current">
        <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.333l7.5 3.75v7.834l-7.5 3.75-7.5-3.75V8.083l7.5-3.75z" />
      </svg>
    ),
  },
  {
    name: 'CS2',
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current">
        <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.333l7.5 3.75v7.834l-7.5 3.75-7.5-3.75V8.083l7.5-3.75z" />
      </svg>
    ),
  },
  {
    name: 'Warzone',
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current">
        <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.333l7.5 3.75v7.834l-7.5 3.75-7.5-3.75V8.083l7.5-3.75z" />
      </svg>
    ),
  },
  {
    name: 'PUBG',
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current">
        <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.333l7.5 3.75v7.834l-7.5 3.75-7.5-3.75V8.083l7.5-3.75z" />
      </svg>
    ),
  },
  {
    name: 'GTA V',
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current">
        <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.333l7.5 3.75v7.834l-7.5 3.75-7.5-3.75V8.083l7.5-3.75z" />
      </svg>
    ),
  },
  {
    name: 'R6S',
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current">
        <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.333l7.5 3.75v7.834l-7.5 3.75-7.5-3.75V8.083l7.5-3.75z" />
      </svg>
    ),
  },
  {
    name: 'FiveM',
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current">
        <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.333l7.5 3.75v7.834l-7.5 3.75-7.5-3.75V8.083l7.5-3.75z" />
      </svg>
    ),
  },
];

export const GameLogos = () => {
  return (
    <div className="flex flex-wrap justify-center gap-8 py-8">
      {games.map((game, index) => (
        <motion.div
          key={game.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ scale: 1.1 }}
          className="flex flex-col items-center gap-2 group"
        >
          <div className="text-theme-400 group-hover:text-theme-300 transition-colors duration-300">
            {game.icon}
          </div>
          <span className="text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors duration-300">
            {game.name}
          </span>
        </motion.div>
      ))}
    </div>
  );
}; 