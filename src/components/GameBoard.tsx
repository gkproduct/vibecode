import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { useSounds } from '../hooks/useSounds';
import PlayerHand from './PlayerHand';
import Chest from './Chest';
import QuestionPanel from './QuestionPanel';
import GameLog from './GameLog';
import { Player, Question } from '../types/game';

interface GameBoardProps {
  className?: string;
}

const GameBoard: React.FC<GameBoardProps> = ({ className = '' }) => {
  const { gameState, askQuestion, answerQuestion } = useGame();
  const sounds = useSounds();
  const [isChestRevealed, setIsChestRevealed] = useState(false);
  const [questionPhase, setQuestionPhase] = useState<'rank' | 'count' | 'color' | 'suit' | null>(null);

  // Сброс фазы вопроса при смене игрока
  useEffect(() => {
    if (gameState && !gameState.currentQuestion) {
      setQuestionPhase(null);
    }
  }, [gameState?.currentPlayerIndex, gameState?.currentQuestion]);

  if (!gameState) {
    return (
      <div className={`${className} flex items-center justify-center`}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center text-gray-400"
        >
          <div className="text-6xl mb-4">🎮</div>
          <p className="text-xl">Игра не начата</p>
        </motion.div>
      </div>
    );
  }

  const currentPlayer = gameState.players[gameState.currentPlayerIndex];
  const otherPlayers = gameState.players.filter((_, index) => index !== gameState.currentPlayerIndex);

  const handleAskQuestion = (question: Question) => {
    sounds.playQuestion();
    askQuestion(question);
    setQuestionPhase(null);
  };

  const handleAnswerQuestion = (answer: boolean) => {
    if (answer) {
      sounds.playCorrectAnswer();
    } else {
      sounds.playWrongAnswer();
    }
    answerQuestion(answer);
  };

  const handlePhaseSelect = (phase: 'rank' | 'count' | 'color' | 'suit') => {
    setQuestionPhase(phase);
  };

  const handleChestClick = () => {
    sounds.playChestOpen();
    setIsChestRevealed(!isChestRevealed);
  };

  if (gameState.gamePhase === 'finished' && gameState.winner) {
    return (
      <div className={`${className} flex items-center justify-center`}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center bg-velvet p-8 rounded-lg shadow-2xl border-2 border-casino-gold"
        >
          <motion.div
            className="text-8xl mb-4"
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          >
            🏆
          </motion.div>
          <h2 className="text-3xl font-bold text-casino-gold mb-2">
            Поздравляем!
          </h2>
          <p className="text-xl text-white mb-4">
            {gameState.winner.name} выиграл игру!
          </p>
          <motion.button
            className="px-6 py-3 bg-casino-gold hover:bg-yellow-600 text-velvet rounded-lg font-semibold transition-colors"
            onClick={() => window.location.reload()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Новая игра
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={`${className} h-screen flex flex-col bg-velvet`}>
      {/* Верхняя панель */}
      <motion.div
        className="bg-casino-burgundy text-white p-4 shadow-lg"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-casino-gold">
              🃏 Сундучок
            </h1>
            <div className="text-sm text-gray-300">
              Игроков: {gameState.players.length}
            </div>
          </div>
          
          <div className="flex space-x-2">
            <motion.button
              className="px-4 py-2 bg-casino-gold hover:bg-yellow-600 text-velvet rounded-lg font-semibold transition-colors"
              onClick={() => {
                sounds.playButtonClick();
                window.location.reload();
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Новая игра
            </motion.button>
            <motion.button
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-colors"
              onClick={() => sounds.playButtonClick()}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Онлайн
            </motion.button>
          </div>
        </div>
      </motion.div>

      <div className="flex-1 flex">
        {/* Основная игровая зона */}
        <div className="flex-1 flex flex-col p-4">
          {/* Сундучок */}
          <div className="flex justify-center mb-6">
            <Chest
              cards={gameState.chest}
              isRevealed={isChestRevealed}
              onChestClick={handleChestClick}
            />
          </div>

          {/* Игроки */}
          <div className="flex-1 flex flex-col space-y-4">
            {/* Текущий игрок */}
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <PlayerHand
                player={currentPlayer}
                isCurrentPlayer={true}
                showCards={true}
                className="bg-casino-green bg-opacity-20 p-4 rounded-lg"
              />
            </motion.div>

            {/* Остальные игроки */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {otherPlayers.map((player, index) => (
                <motion.div
                  key={player.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  <PlayerHand
                    player={player}
                    isCurrentPlayer={false}
                    showCards={false}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Правая панель - Лог игры */}
        <div className="w-80 bg-gray-900">
          <GameLog entries={gameState.gameLog} />
        </div>
      </div>

      {/* Нижняя панель - Вопросы */}
      <AnimatePresence>
        {!gameState.currentQuestion && !questionPhase && (
          <motion.div
            className="bg-velvet border-t-2 border-casino-gold p-4"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center space-y-4">
              <h3 className="text-lg font-bold text-casino-gold">
                Выберите тип вопроса
              </h3>
              <p className="text-gray-300">
                Ход игрока: {currentPlayer.name}
              </p>
              <div className="flex justify-center space-x-4">
                {[
                  { phase: 'rank' as const, label: 'Ранг карты', icon: '🎯' },
                  { phase: 'count' as const, label: 'Количество', icon: '🔢' },
                  { phase: 'color' as const, label: 'Цвет карт', icon: '🎨' },
                  { phase: 'suit' as const, label: 'Масть карт', icon: '♠️' }
                ].map(({ phase, label, icon }) => (
                  <motion.button
                    key={phase}
                    className="px-4 py-2 bg-casino-burgundy hover:bg-red-800 text-white rounded-lg font-semibold transition-colors flex items-center space-x-2"
                    onClick={() => {
                      sounds.playButtonClick();
                      handlePhaseSelect(phase);
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>{icon}</span>
                    <span>{label}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Панель вопросов */}
      <QuestionPanel
        currentPlayer={currentPlayer}
        players={gameState.players}
        questionPhase={questionPhase}
        onAskQuestion={handleAskQuestion}
        onAnswerQuestion={handleAnswerQuestion}
        currentQuestion={gameState.currentQuestion}
      />
    </div>
  );
};

export default GameBoard;
