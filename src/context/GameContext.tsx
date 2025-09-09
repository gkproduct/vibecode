import React, { createContext, useContext, useState, ReactNode } from 'react';
import { GameState, GameAction, Player, Question } from '../types/game';
import { createNewGame, askQuestion, answerQuestion, checkWinCondition } from '../utils/gameLogic';

interface GameContextType {
  gameState: GameState | null;
  dispatch: React.Dispatch<GameAction>;
  startGame: (players: Player[]) => void;
  askQuestion: (question: Question) => void;
  answerQuestion: (answer: boolean) => void;
  nextPlayer: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

const gameReducer = (state: GameState | null, action: GameAction): GameState | null => {
  if (!state) return state;

  switch (action.type) {
    case 'ASK_QUESTION':
      return askQuestion(state, action.question);
    
    case 'ANSWER_QUESTION':
      return answerQuestion(state, action.answer);
    
    case 'START_GAME':
      return state;
    
    case 'NEXT_PLAYER':
      const nextIndex = (state.currentPlayerIndex + 1) % state.players.length;
      return {
        ...state,
        currentPlayerIndex: nextIndex,
        players: state.players.map((player, index) => ({
          ...player,
          isCurrentPlayer: index === nextIndex
        }))
      };
    
    case 'END_GAME':
      return {
        ...state,
        gamePhase: 'finished',
        winner: action.winner
      };
    
    default:
      return state;
  }
};

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [gameState, setGameState] = useState<GameState | null>(null);

  const startGame = (players: Player[]) => {
    const newGame = createNewGame(players);
    setGameState(newGame);
  };

  const handleAskQuestion = (question: Question) => {
    if (gameState) {
      const newState = askQuestion(gameState, question);
      setGameState(newState);
    }
  };

  const handleAnswerQuestion = (answer: boolean) => {
    if (gameState) {
      const newState = answerQuestion(gameState, answer);
      setGameState(newState);
      
      // Проверяем условие победы после ответа
      const winner = checkWinCondition(newState);
      if (winner) {
        setGameState({ ...newState, gamePhase: 'finished', winner });
      }
    }
  };

  const nextPlayer = () => {
    if (gameState) {
      const nextIndex = (gameState.currentPlayerIndex + 1) % gameState.players.length;
      setGameState({
        ...gameState,
        currentPlayerIndex: nextIndex,
        players: gameState.players.map((player, index) => ({
          ...player,
          isCurrentPlayer: index === nextIndex
        }))
      });
    }
  };

  const value: GameContextType = {
    gameState,
    dispatch: () => {}, // Заглушка для совместимости
    startGame,
    askQuestion: handleAskQuestion,
    answerQuestion: handleAnswerQuestion,
    nextPlayer
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = (): GameContextType => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
