export type Suit = 'hearts' | 'diamonds' | 'clubs' | 'spades';
export type Rank = 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K';

export interface Card {
  suit: Suit;
  rank: Rank;
  id: string;
}

export interface Player {
  id: string;
  name: string;
  cards: Card[];
  isActive: boolean;
  isCurrentPlayer: boolean;
}

export interface GameState {
  id: string;
  players: Player[];
  currentPlayerIndex: number;
  chest: Card[];
  gamePhase: 'waiting' | 'playing' | 'finished';
  questionPhase: 'rank' | 'count' | 'color' | 'suit' | null;
  currentQuestion: Question | null;
  gameLog: GameLogEntry[];
  winner: Player | null;
}

export interface Question {
  type: 'rank' | 'count' | 'color' | 'suit';
  targetPlayerId: string;
  askingPlayerId: string;
  rank?: Rank;
  count?: number;
  color?: 'red' | 'black';
  suit?: Suit;
}

export interface GameLogEntry {
  id: string;
  timestamp: number;
  type: 'question' | 'answer' | 'game_start' | 'game_end' | 'player_join' | 'player_leave';
  message: string;
  playerId?: string;
  data?: any;
}

export interface Room {
  id: string;
  name: string;
  players: Player[];
  maxPlayers: number;
  isPrivate: boolean;
  gameState: GameState | null;
}

export type GameAction = 
  | { type: 'ASK_QUESTION'; question: Question }
  | { type: 'ANSWER_QUESTION'; answer: boolean }
  | { type: 'START_GAME' }
  | { type: 'JOIN_ROOM'; player: Player }
  | { type: 'LEAVE_ROOM'; playerId: string }
  | { type: 'NEXT_PLAYER' }
  | { type: 'END_GAME'; winner: Player };
