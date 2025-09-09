import React from 'react';
import { motion } from 'framer-motion';
import Card from './Card';
import { Card as CardType } from '../types/game';

interface ChestProps {
  cards: CardType[];
  isRevealed?: boolean;
  onChestClick?: () => void;
  className?: string;
}

const Chest: React.FC<ChestProps> = ({
  cards,
  isRevealed = false,
  onChestClick,
  className = ''
}) => {
  const chestVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5, ease: 'easeOut' }
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 }
    }
  };

  const cardStackVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        staggerChildren: 0.05
      }
    }
  };

  return (
    <motion.div
      className={`
        ${className}
        flex flex-col items-center space-y-4
      `}
      variants={chestVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
    >
      {/* Заголовок сундучка */}
      <div className="text-center">
        <h3 className="text-lg font-bold text-casino-gold mb-1">
          🗃️ Сундучок
        </h3>
        <p className="text-sm text-gray-300">
          {cards.length} карт
        </p>
      </div>

      {/* Сундучок с картами */}
      <motion.div
        className="relative cursor-pointer"
        onClick={onChestClick}
        variants={cardStackVariants}
      >
        {cards.length > 0 ? (
          <div className="relative">
            {/* Стек карт */}
            {cards.slice(0, Math.min(5, cards.length)).map((card, index) => (
              <motion.div
                key={card.id}
                className="absolute"
                style={{
                  transform: `translate(${index * 2}px, ${index * 2}px) rotate(${index * 2}deg)`,
                  zIndex: cards.length - index
                }}
                variants={{
                  hidden: { opacity: 0, y: 20, rotate: -10 },
                  visible: { 
                    opacity: 1, 
                    y: 0, 
                    rotate: index * 2,
                    transition: { 
                      duration: 0.6, 
                      delay: index * 0.1,
                      ease: 'easeOut' 
                    }
                  }
                }}
                initial="hidden"
                animate="visible"
              >
                <Card
                  card={card}
                  isFlipped={!isRevealed}
                  size="md"
                  className="shadow-lg"
                />
              </motion.div>
            ))}
            
            {/* Индикатор дополнительных карт */}
            {cards.length > 5 && (
              <motion.div
                className="absolute -bottom-2 -right-2 w-8 h-8 bg-casino-gold rounded-full flex items-center justify-center text-velvet font-bold text-xs shadow-lg"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8, duration: 0.3 }}
              >
                +{cards.length - 5}
              </motion.div>
            )}
          </div>
        ) : (
          <motion.div
            className="w-20 h-32 bg-gradient-to-br from-gray-600 to-gray-800 rounded-lg border-2 border-gray-500 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <span className="text-gray-400 text-2xl">📦</span>
          </motion.div>
        )}
      </motion.div>

      {/* Подсказка */}
      {onChestClick && (
        <motion.p
          className="text-xs text-gray-400 text-center max-w-32"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {isRevealed ? 'Нажмите, чтобы скрыть' : 'Нажмите, чтобы посмотреть'}
        </motion.p>
      )}
    </motion.div>
  );
};

export default Chest;
