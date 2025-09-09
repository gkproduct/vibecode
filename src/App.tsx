import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GameProvider, useGame } from './context/GameContext';
import GameSetup from './components/GameSetup';
import GameBoard from './components/GameBoard';
import { Player } from './types/game';
import './App.css';

const AppContent: React.FC = () => {
  const { gameState, startGame } = useGame();
  const [isGameStarted, setIsGameStarted] = useState(false);

  const handleStartGame = (players: Player[]) => {
    startGame(players);
    setIsGameStarted(true);
  };

  const handleNewGame = () => {
    setIsGameStarted(false);
  };

  return (
    <div className="min-h-screen bg-velvet">
      <AnimatePresence mode="wait">
        {!isGameStarted ? (
          <motion.div
            key="setup"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <GameSetup onStartGame={handleStartGame} />
          </motion.div>
        ) : (
          <motion.div
            key="game"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <GameBoard />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  );
};

export default App;
