import { GameState, Player, Question, Card, GameLogEntry } from '../types/game';
import { createDeck, dealCards, getCardColor } from './cardUtils';

export const createNewGame = (players: Player[]): GameState => {
  const deck = createDeck();
  const { playerCards, chest } = dealCards(deck, players.length);
  
  const gamePlayers = players.map((player, index) => ({
    ...player,
    cards: playerCards[index],
    isActive: true,
    isCurrentPlayer: index === 0
  }));

  return {
    id: `game-${Date.now()}`,
    players: gamePlayers,
    currentPlayerIndex: 0,
    chest,
    gamePhase: 'playing',
    questionPhase: null,
    currentQuestion: null,
    gameLog: [{
      id: `log-${Date.now()}`,
      timestamp: Date.now(),
      type: 'game_start',
      message: 'Игра началась! Карты розданы.',
      data: { playerCount: players.length }
    }],
    winner: null
  };
};

export const canAskQuestion = (gameState: GameState, askingPlayerId: string): boolean => {
  const askingPlayer = gameState.players.find(p => p.id === askingPlayerId);
  if (!askingPlayer || !askingPlayer.isCurrentPlayer) return false;
  if (gameState.gamePhase !== 'playing') return false;
  return true;
};

export const askQuestion = (
  gameState: GameState, 
  question: Question
): GameState => {
  if (!canAskQuestion(gameState, question.askingPlayerId)) {
    return gameState;
  }

  const newLogEntry: GameLogEntry = {
    id: `log-${Date.now()}`,
    timestamp: Date.now(),
    type: 'question',
    message: formatQuestionMessage(question),
    playerId: question.askingPlayerId,
    data: question
  };

  return {
    ...gameState,
    currentQuestion: question,
    questionPhase: question.type,
    gameLog: [...gameState.gameLog, newLogEntry]
  };
};

export const answerQuestion = (
  gameState: GameState, 
  answer: boolean
): GameState => {
  if (!gameState.currentQuestion) return gameState;

  const question = gameState.currentQuestion;
  const targetPlayer = gameState.players.find(p => p.id === question.targetPlayerId);
  
  if (!targetPlayer) return gameState;

  const actualAnswer = checkQuestionAnswer(targetPlayer, question);
  const isCorrect = actualAnswer === answer;

  const newLogEntry: GameLogEntry = {
    id: `log-${Date.now()}`,
    timestamp: Date.now(),
    type: 'answer',
    message: `${targetPlayer.name} ответил: ${answer ? 'Да' : 'Нет'}. ${isCorrect ? 'Правильно!' : 'Неправильно!'}`,
    playerId: question.targetPlayerId,
    data: { question, answer, isCorrect }
  };

  const nextPlayerIndex = (gameState.currentPlayerIndex + 1) % gameState.players.length;
  const nextPlayer = gameState.players[nextPlayerIndex];

  return {
    ...gameState,
    currentPlayerIndex: nextPlayerIndex,
    players: gameState.players.map((player, index) => ({
      ...player,
      isCurrentPlayer: index === nextPlayerIndex
    })),
    currentQuestion: null,
    questionPhase: null,
    gameLog: [...gameState.gameLog, newLogEntry]
  };
};

export const checkQuestionAnswer = (player: Player, question: Question): boolean => {
  switch (question.type) {
    case 'rank':
      return player.cards.some(card => card.rank === question.rank);
    
    case 'count':
      if (!question.rank) return false;
      const count = player.cards.filter(card => card.rank === question.rank).length;
      return count >= (question.count || 0);
    
    case 'color':
      if (!question.color) return false;
      return player.cards.some(card => getCardColor(card.suit) === question.color);
    
    case 'suit':
      return player.cards.some(card => card.suit === question.suit);
    
    default:
      return false;
  }
};

export const checkWinCondition = (gameState: GameState): Player | null => {
  // Игрок выигрывает, если у него осталась только одна карта
  const winner = gameState.players.find(player => player.cards.length === 1);
  return winner || null;
};

export const formatQuestionMessage = (question: Question): string => {
  const askingPlayer = question.askingPlayerId;
  const targetPlayer = question.targetPlayerId;
  
  switch (question.type) {
    case 'rank':
      return `${askingPlayer} спрашивает у ${targetPlayer}: "Есть ли у тебя ${question.rank}?"`;
    
    case 'count':
      return `${askingPlayer} спрашивает у ${targetPlayer}: "Сколько у тебя ${question.rank}?"`;
    
    case 'color':
      const colorText = question.color === 'red' ? 'красных' : 'черных';
      return `${askingPlayer} спрашивает у ${targetPlayer}: "Есть ли у тебя ${colorText} карт?"`;
    
    case 'suit':
      return `${askingPlayer} спрашивает у ${targetPlayer}: "Есть ли у тебя ${question.suit}?"`;
    
    default:
      return 'Неизвестный вопрос';
  }
};

export const getCardsInChest = (gameState: GameState): Card[] => {
  return gameState.chest;
};

export const getPlayerCardCount = (player: Player): number => {
  return player.cards.length;
};
