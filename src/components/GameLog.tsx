import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GameLogEntry } from '../types/game';

interface GameLogProps {
  entries: GameLogEntry[];
  className?: string;
}

const GameLog: React.FC<GameLogProps> = ({ entries, className = '' }) => {
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [entries]);

  const getEntryIcon = (type: GameLogEntry['type']) => {
    switch (type) {
      case 'question': return '❓';
      case 'answer': return '💬';
      case 'game_start': return '🎮';
      case 'game_end': return '🏆';
      case 'player_join': return '👋';
      case 'player_leave': return '👋';
      default: return '📝';
    }
  };

  const getEntryColor = (type: GameLogEntry['type']) => {
    switch (type) {
      case 'question': return 'text-blue-300';
      case 'answer': return 'text-green-300';
      case 'game_start': return 'text-casino-gold';
      case 'game_end': return 'text-yellow-400';
      case 'player_join': return 'text-green-400';
      case 'player_leave': return 'text-red-400';
      default: return 'text-gray-300';
    }
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('ru-RU', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className={`${className} h-full flex flex-col`}>
      <div className="bg-casino-burgundy text-white p-3 rounded-t-lg">
        <h3 className="text-lg font-bold flex items-center">
          <span className="mr-2">📜</span>
          Лог игры
        </h3>
      </div>
      
      <div 
        ref={logRef}
        className="flex-1 bg-gray-900 p-3 overflow-y-auto space-y-2 rounded-b-lg"
        style={{ maxHeight: '400px' }}
      >
        <AnimatePresence>
          {entries.map((entry) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="flex items-start space-x-2 p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
            >
              <span className="text-lg flex-shrink-0 mt-0.5">
                {getEntryIcon(entry.type)}
              </span>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-medium ${getEntryColor(entry.type)}`}>
                    {entry.message}
                  </span>
                  <span className="text-xs text-gray-400 flex-shrink-0 ml-2">
                    {formatTime(entry.timestamp)}
                  </span>
                </div>
                
                {entry.playerId && (
                  <div className="text-xs text-gray-500 mt-1">
                    Игрок: {entry.playerId}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {entries.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-500 py-8"
          >
            <div className="text-4xl mb-2">🎯</div>
            <p>Лог игры пуст</p>
            <p className="text-sm">События игры будут отображаться здесь</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default GameLog;
