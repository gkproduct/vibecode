import { Card, Suit, Rank } from '../types/game';

export const SUITS: Suit[] = ['hearts', 'diamonds', 'clubs', 'spades'];
export const RANKS: Rank[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

export const createDeck = (): Card[] => {
  const deck: Card[] = [];
  let id = 0;
  
  for (const suit of SUITS) {
    for (const rank of RANKS) {
      deck.push({
        suit,
        rank,
        id: `card-${id++}`
      });
    }
  }
  
  return deck;
};

export const shuffleDeck = (deck: Card[]): Card[] => {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const dealCards = (deck: Card[], playerCount: number): { playerCards: Card[][], chest: Card[] } => {
  const shuffledDeck = shuffleDeck(deck);
  const cardsPerPlayer = Math.floor(52 / playerCount);
  const remainingCards = 52 % playerCount;
  
  const playerCards: Card[][] = [];
  let cardIndex = 0;
  
  for (let i = 0; i < playerCount; i++) {
    const cardsToDeal = cardsPerPlayer + (i < remainingCards ? 1 : 0);
    playerCards.push(shuffledDeck.slice(cardIndex, cardIndex + cardsToDeal));
    cardIndex += cardsToDeal;
  }
  
  const chest = shuffledDeck.slice(cardIndex);
  
  return { playerCards, chest };
};

export const getCardColor = (suit: Suit): 'red' | 'black' => {
  return suit === 'hearts' || suit === 'diamonds' ? 'red' : 'black';
};

export const getCardSymbol = (suit: Suit): string => {
  const symbols = {
    hearts: '♥',
    diamonds: '♦',
    clubs: '♣',
    spades: '♠'
  };
  return symbols[suit];
};

export const getCardDisplayName = (card: Card): string => {
  const symbol = getCardSymbol(card.suit);
  return `${card.rank}${symbol}`;
};

export const getSuitDisplayName = (suit: Suit): string => {
  const names = {
    hearts: 'Черви',
    diamonds: 'Бубны',
    clubs: 'Трефы',
    spades: 'Пики'
  };
  return names[suit];
};

export const getRankDisplayName = (rank: Rank): string => {
  const names = {
    A: 'Туз',
    '2': 'Двойка',
    '3': 'Тройка',
    '4': 'Четверка',
    '5': 'Пятерка',
    '6': 'Шестерка',
    '7': 'Семерка',
    '8': 'Восьмерка',
    '9': 'Девятка',
    '10': 'Десятка',
    J: 'Валет',
    Q: 'Дама',
    K: 'Король'
  };
  return names[rank];
};
