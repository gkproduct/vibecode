import React from 'react';
import { motion } from 'framer-motion';
import Card from './Card';
import { Player } from '../types/game';

interface PlayerHandProps {
  player: Player;
  isCurrentPlayer?: boolean;
  showCards?: boolean;
  onCardClick?: (cardIndex: number) => void;
  selectedCardIndex?: number;
  className?: string;
}

const PlayerHand: React.FC<PlayerHandProps> = ({
  player,
  isCurrentPlayer = false,
  showCards = false,
  onCardClick,
  selectedCardIndex,
  className = ''
}) => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20, rotate: -10 },
    visible: { 
      opacity: 1, 
      y: 0, 
      rotate: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  return (
    <motion.div
      className={`
        ${className}
        flex flex-col items-center space-y-2
        ${isCurrentPlayer ? 'ring-2 ring-casino-gold ring-opacity-50 rounded-lg p-2' : ''}
      `}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Имя игрока */}
      <div className={`
        text-sm font-semibold px-3 py-1 rounded-full
        ${isCurrentPlayer 
          ? 'bg-casino-gold text-velvet' 
          : 'bg-casino-burgundy text-white'
        }
        shadow-lg
      `}>
        {player.name}
        {isCurrentPlayer && ' (Ход)'}
      </div>

      {/* Количество карт */}
      <div className="text-xs text-gray-300">
        Карт: {player.cards.length}
      </div>

      {/* Карты */}
      <motion.div 
        className="flex flex-wrap justify-center gap-1 max-w-xs"
        variants={containerVariants}
      >
        {player.cards.map((card, index) => (
          <motion.div
            key={card.id}
            variants={cardVariants}
            className="relative"
            style={{ zIndex: player.cards.length - index }}
          >
            <Card
              card={card}
              isFlipped={!showCards}
              isSelected={selectedCardIndex === index}
              onClick={onCardClick ? () => onCardClick(index) : undefined}
              size="sm"
              className={`
                ${index > 0 ? '-ml-2' : ''}
                hover:z-50
              `}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Индикатор активности */}
      {isCurrentPlayer && (
        <motion.div
          className="w-3 h-3 bg-casino-gold rounded-full"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{ 
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      )}
    </motion.div>
  );
};

export default PlayerHand;
