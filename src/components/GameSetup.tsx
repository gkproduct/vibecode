import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSounds } from '../hooks/useSounds';
import { Player } from '../types/game';

interface GameSetupProps {
  onStartGame: (players: Player[]) => void;
  className?: string;
}

const GameSetup: React.FC<GameSetupProps> = ({ onStartGame, className = '' }) => {
  const sounds = useSounds();
  const [players, setPlayers] = useState<Player[]>([
    { id: 'player-1', name: 'Игрок 1', cards: [], isActive: true, isCurrentPlayer: false }
  ]);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [gameMode, setGameMode] = useState<'local' | 'online'>('local');

  const addPlayer = () => {
    if (newPlayerName.trim() && players.length < 6) {
      sounds.playButtonClick();
      const newPlayer: Player = {
        id: `player-${Date.now()}`,
        name: newPlayerName.trim(),
        cards: [],
        isActive: true,
        isCurrentPlayer: false
      };
      setPlayers([...players, newPlayer]);
      setNewPlayerName('');
    }
  };

  const removePlayer = (playerId: string) => {
    if (players.length > 1) {
      sounds.playButtonClick();
      setPlayers(players.filter(p => p.id !== playerId));
    }
  };

  const updatePlayerName = (playerId: string, newName: string) => {
    setPlayers(players.map(p => 
      p.id === playerId ? { ...p, name: newName } : p
    ));
  };

  const handleStartGame = () => {
    if (players.length >= 2) {
      sounds.playGameStart();
      onStartGame(players);
    }
  };

  const canStartGame = players.length >= 2 && players.every(p => p.name.trim());

  return (
    <motion.div
      className={`${className} min-h-screen bg-velvet flex items-center justify-center p-4`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="bg-casino-green bg-opacity-90 backdrop-blur-sm rounded-2xl shadow-2xl border-2 border-casino-gold p-8 max-w-2xl w-full"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        {/* Заголовок */}
        <div className="text-center mb-8">
          <motion.div
            className="text-6xl mb-4"
            animate={{ 
              rotate: [0, 5, -5, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          >
            🃏
          </motion.div>
          <h1 className="text-4xl font-bold text-casino-gold mb-2">
            Сундучок
          </h1>
          <p className="text-gray-300 text-lg">
            Классическая карточная игра
          </p>
        </div>

        {/* Режим игры */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Режим игры</h2>
          <div className="flex space-x-4">
            <motion.button
              className={`flex-1 p-4 rounded-lg border-2 transition-colors ${
                gameMode === 'local'
                  ? 'border-casino-gold bg-casino-gold bg-opacity-20 text-casino-gold'
                  : 'border-gray-600 bg-gray-800 text-gray-300 hover:border-gray-400'
              }`}
              onClick={() => {
                sounds.playButtonClick();
                setGameMode('local');
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="text-center">
                <div className="text-3xl mb-2">🏠</div>
                <div className="font-semibold">Локальная игра</div>
                <div className="text-sm opacity-75">На одном устройстве</div>
              </div>
            </motion.button>
            
            <motion.button
              className={`flex-1 p-4 rounded-lg border-2 transition-colors ${
                gameMode === 'online'
                  ? 'border-casino-gold bg-casino-gold bg-opacity-20 text-casino-gold'
                  : 'border-gray-600 bg-gray-800 text-gray-300 hover:border-gray-400'
              }`}
              onClick={() => {
                sounds.playButtonClick();
                setGameMode('online');
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="text-center">
                <div className="text-3xl mb-2">🌐</div>
                <div className="font-semibold">Онлайн игра</div>
                <div className="text-sm opacity-75">С друзьями</div>
              </div>
            </motion.button>
          </div>
        </div>

        {/* Настройка игроков */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">
            Игроки ({players.length}/6)
          </h2>
          
          <div className="space-y-3 mb-4">
            {players.map((player, index) => (
              <motion.div
                key={player.id}
                className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="w-8 h-8 bg-casino-gold rounded-full flex items-center justify-center text-velvet font-bold">
                  {index + 1}
                </div>
                <input
                  type="text"
                  value={player.name}
                  onChange={(e) => updatePlayerName(player.id, e.target.value)}
                  className="flex-1 bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-casino-gold rounded px-2 py-1"
                  placeholder={`Игрок ${index + 1}`}
                />
                {players.length > 1 && (
                  <motion.button
                    className="text-red-400 hover:text-red-300 p-1"
                    onClick={() => removePlayer(player.id)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    ✕
                  </motion.button>
                )}
              </motion.div>
            ))}
          </div>

          {/* Добавить игрока */}
          {players.length < 6 && (
            <motion.div
              className="flex space-x-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <input
                type="text"
                value={newPlayerName}
                onChange={(e) => setNewPlayerName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addPlayer()}
                className="flex-1 bg-gray-800 text-white placeholder-gray-400 border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-casino-gold"
                placeholder="Имя нового игрока"
              />
              <motion.button
                className="px-4 py-2 bg-casino-gold hover:bg-yellow-600 text-velvet rounded-lg font-semibold transition-colors"
                onClick={addPlayer}
                disabled={!newPlayerName.trim()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Добавить
              </motion.button>
            </motion.div>
          )}
        </div>

        {/* Правила игры */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Правила</h2>
          <div className="bg-gray-800 rounded-lg p-4 space-y-2 text-sm text-gray-300">
            <p>• Игроки по очереди задают вопросы о картах других игроков</p>
            <p>• Вопросы задаются по рангу, количеству, цвету или масти</p>
            <p>• Цель - первым избавиться от всех карт кроме одной</p>
            <p>• Карты в сундучке достаются победителю</p>
          </div>
        </div>

        {/* Кнопка старта */}
        <motion.div className="text-center">
          <motion.button
            className={`px-8 py-4 rounded-lg font-bold text-lg transition-colors ${
              canStartGame
                ? 'bg-casino-gold hover:bg-yellow-600 text-velvet'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
            onClick={handleStartGame}
            disabled={!canStartGame}
            whileHover={canStartGame ? { scale: 1.05 } : {}}
            whileTap={canStartGame ? { scale: 0.95 } : {}}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            {gameMode === 'online' ? 'Создать комнату' : 'Начать игру'}
          </motion.button>
          
          {!canStartGame && (
            <motion.p
              className="text-red-400 text-sm mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              Минимум 2 игрока для начала игры
            </motion.p>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default GameSetup;
