import React from 'react';
import { motion } from 'framer-motion';
import { Card as CardType } from '../types/game';
import { getCardSymbol, getCardColor, getCardDisplayName } from '../utils/cardUtils';

interface CardProps {
  card: CardType;
  isFlipped?: boolean;
  isSelected?: boolean;
  onClick?: () => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Card: React.FC<CardProps> = ({
  card,
  isFlipped = false,
  isSelected = false,
  onClick,
  className = '',
  size = 'md'
}) => {
  const color = getCardColor(card.suit);
  const symbol = getCardSymbol(card.suit);
  const displayName = getCardDisplayName(card);

  const sizeClasses = {
    sm: 'w-12 h-16 text-xs',
    md: 'w-16 h-24 text-sm',
    lg: 'w-20 h-32 text-base'
  };

  const cardVariants = {
    hidden: { opacity: 0, y: -50, rotate: 10 },
    visible: { 
      opacity: 1, 
      y: 0, 
      rotate: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    },
    selected: {
      y: -10,
      scale: 1.05,
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.div
      className={`
        ${sizeClasses[size]}
        ${className}
        relative cursor-pointer select-none
        ${isSelected ? 'z-10' : 'z-0'}
        ${onClick ? 'hover:scale-105' : ''}
        transition-all duration-200
      `}
      onClick={onClick}
      variants={cardVariants}
      initial="hidden"
      animate={isSelected ? "selected" : "visible"}
      whileHover={onClick ? { scale: 1.05 } : {}}
      whileTap={onClick ? { scale: 0.95 } : {}}
    >
      <div className={`
        w-full h-full rounded-lg border-2 shadow-lg
        ${isFlipped 
          ? 'bg-gradient-to-br from-casino-gold to-yellow-600 border-casino-gold' 
          : 'bg-white border-gray-300'
        }
        ${isSelected ? 'ring-2 ring-casino-gold ring-opacity-50' : ''}
        flex flex-col justify-between p-1
        font-card font-bold
      `}>
        {isFlipped ? (
          // Задняя сторона карты
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-casino-gold text-2xl font-bold">
              🃏
            </div>
          </div>
        ) : (
          // Передняя сторона карты
          <>
            <div className={`
              text-left leading-none
              ${color === 'red' ? 'text-card-red' : 'text-card-black'}
            `}>
              <div className="text-xs">{card.rank}</div>
              <div className="text-lg">{symbol}</div>
            </div>
            
            <div className="flex-1 flex items-center justify-center">
              <div className={`
                text-3xl
                ${color === 'red' ? 'text-card-red' : 'text-card-black'}
              `}>
                {symbol}
              </div>
            </div>
            
            <div className={`
              text-right leading-none transform rotate-180
              ${color === 'red' ? 'text-card-red' : 'text-card-black'}
            `}>
              <div className="text-xs">{card.rank}</div>
              <div className="text-lg">{symbol}</div>
            </div>
          </>
        )}
      </div>
      
      {/* Тень для глубины */}
      <div className="absolute inset-0 rounded-lg bg-black opacity-10 -z-10 transform translate-y-1" />
    </motion.div>
  );
};

export default Card;
