import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSounds } from '../hooks/useSounds';
import { Player, Question, Suit, Rank } from '../types/game';
import { getSuitDisplayName, getRankDisplayName } from '../utils/cardUtils';

interface QuestionPanelProps {
  currentPlayer: Player;
  players: Player[];
  questionPhase: 'rank' | 'count' | 'color' | 'suit' | null;
  onAskQuestion: (question: Question) => void;
  onAnswerQuestion: (answer: boolean) => void;
  currentQuestion: Question | null;
  className?: string;
}

const QuestionPanel: React.FC<QuestionPanelProps> = ({
  currentPlayer,
  players,
  questionPhase,
  onAskQuestion,
  onAnswerQuestion,
  currentQuestion,
  className = ''
}) => {
  const sounds = useSounds();
  const [selectedPlayerId, setSelectedPlayerId] = useState<string>('');
  const [selectedRank, setSelectedRank] = useState<Rank | ''>('');
  const [selectedCount, setSelectedCount] = useState<number>(1);
  const [selectedColor, setSelectedColor] = useState<'red' | 'black' | ''>('');
  const [selectedSuit, setSelectedSuit] = useState<Suit | ''>('');

  const ranks: Rank[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
  const suits: Suit[] = ['hearts', 'diamonds', 'clubs', 'spades'];

  const handleAskQuestion = () => {
    if (!selectedPlayerId) return;

    sounds.playButtonClick();
    const question: Question = {
      type: questionPhase!,
      targetPlayerId: selectedPlayerId,
      askingPlayerId: currentPlayer.id,
      ...(questionPhase === 'rank' && { rank: selectedRank as Rank }),
      ...(questionPhase === 'count' && { rank: selectedRank as Rank, count: selectedCount }),
      ...(questionPhase === 'color' && { color: selectedColor as 'red' | 'black' }),
      ...(questionPhase === 'suit' && { suit: selectedSuit as Suit })
    };

    onAskQuestion(question);
  };

  const handleAnswerQuestion = (answer: boolean) => {
    sounds.playButtonClick();
    onAnswerQuestion(answer);
  };

  const resetForm = () => {
    sounds.playButtonClick();
    setSelectedPlayerId('');
    setSelectedRank('');
    setSelectedCount(1);
    setSelectedColor('');
    setSelectedSuit('');
  };

  const getPhaseTitle = () => {
    switch (questionPhase) {
      case 'rank': return 'Выберите ранг карты';
      case 'count': return 'Выберите ранг и количество';
      case 'color': return 'Выберите цвет карт';
      case 'suit': return 'Выберите масть';
      default: return 'Задайте вопрос';
    }
  };

  const getPhaseDescription = () => {
    switch (questionPhase) {
      case 'rank': return 'Спросите, есть ли у игрока карта определенного ранга';
      case 'count': return 'Спросите, сколько карт определенного ранга у игрока';
      case 'color': return 'Спросите, есть ли у игрока карты определенного цвета';
      case 'suit': return 'Спросите, есть ли у игрока карты определенной масти';
      default: return '';
    }
  };

  const canSubmit = () => {
    if (!selectedPlayerId) return false;
    
    switch (questionPhase) {
      case 'rank':
      case 'count':
        return selectedRank !== '';
      case 'color':
        return selectedColor !== '';
      case 'suit':
        return selectedSuit !== '';
      default:
        return false;
    }
  };

  return (
    <motion.div
      className={`
        ${className}
        bg-velvet border-t-2 border-casino-gold p-4
        rounded-t-lg shadow-lg
      `}
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <AnimatePresence mode="wait">
        {currentQuestion ? (
          // Панель ответа на вопрос
          <motion.div
            key="answer"
            className="text-center space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-lg font-bold text-casino-gold">
              Вопрос от {currentPlayer.name}
            </h3>
            <p className="text-white text-sm">
              {formatQuestionText(currentQuestion)}
            </p>
            <div className="flex justify-center space-x-4">
              <motion.button
                className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors"
                onClick={() => handleAnswerQuestion(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Да
              </motion.button>
              <motion.button
                className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors"
                onClick={() => handleAnswerQuestion(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Нет
              </motion.button>
            </div>
          </motion.div>
        ) : questionPhase ? (
          // Панель задания вопроса
          <motion.div
            key="question"
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center">
              <h3 className="text-lg font-bold text-casino-gold">
                {getPhaseTitle()}
              </h3>
              <p className="text-gray-300 text-sm">
                {getPhaseDescription()}
              </p>
            </div>

            <div className="space-y-3">
              {/* Выбор игрока */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Кому задать вопрос?
                </label>
                <select
                  value={selectedPlayerId}
                  onChange={(e) => setSelectedPlayerId(e.target.value)}
                  className="w-full p-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-casino-gold focus:border-transparent"
                >
                  <option value="">Выберите игрока</option>
                  {players
                    .filter(p => p.id !== currentPlayer.id)
                    .map(player => (
                      <option key={player.id} value={player.id}>
                        {player.name} ({player.cards.length} карт)
                      </option>
                    ))}
                </select>
              </div>

              {/* Дополнительные поля в зависимости от фазы */}
              {questionPhase === 'rank' && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Ранг карты
                  </label>
                  <select
                    value={selectedRank}
                    onChange={(e) => setSelectedRank(e.target.value as Rank)}
                    className="w-full p-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-casino-gold focus:border-transparent"
                  >
                    <option value="">Выберите ранг</option>
                    {ranks.map(rank => (
                      <option key={rank} value={rank}>
                        {getRankDisplayName(rank)}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {questionPhase === 'count' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Ранг карты
                    </label>
                    <select
                      value={selectedRank}
                      onChange={(e) => setSelectedRank(e.target.value as Rank)}
                      className="w-full p-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-casino-gold focus:border-transparent"
                    >
                      <option value="">Выберите ранг</option>
                      {ranks.map(rank => (
                        <option key={rank} value={rank}>
                          {getRankDisplayName(rank)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Количество
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="4"
                      value={selectedCount}
                      onChange={(e) => setSelectedCount(parseInt(e.target.value) || 1)}
                      className="w-full p-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-casino-gold focus:border-transparent"
                    />
                  </div>
                </>
              )}

              {questionPhase === 'color' && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Цвет карт
                  </label>
                  <div className="flex space-x-4">
                    <button
                      className={`flex-1 p-3 rounded-lg border-2 transition-colors ${
                        selectedColor === 'red'
                          ? 'border-red-500 bg-red-900 text-red-100'
                          : 'border-gray-600 bg-gray-800 text-gray-300 hover:border-red-400'
                      }`}
                      onClick={() => {
                        sounds.playButtonClick();
                        setSelectedColor('red');
                      }}
                    >
                      <div className="text-center">
                        <div className="text-2xl mb-1">♥ ♦</div>
                        <div className="text-sm">Красные</div>
                      </div>
                    </button>
                    <button
                      className={`flex-1 p-3 rounded-lg border-2 transition-colors ${
                        selectedColor === 'black'
                          ? 'border-gray-500 bg-gray-700 text-gray-100'
                          : 'border-gray-600 bg-gray-800 text-gray-300 hover:border-gray-400'
                      }`}
                      onClick={() => {
                        sounds.playButtonClick();
                        setSelectedColor('black');
                      }}
                    >
                      <div className="text-center">
                        <div className="text-2xl mb-1">♣ ♠</div>
                        <div className="text-sm">Черные</div>
                      </div>
                    </button>
                  </div>
                </div>
              )}

              {questionPhase === 'suit' && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Масть карт
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {suits.map(suit => (
                      <button
                        key={suit}
                        className={`p-3 rounded-lg border-2 transition-colors ${
                          selectedSuit === suit
                            ? 'border-casino-gold bg-casino-gold bg-opacity-20 text-casino-gold'
                            : 'border-gray-600 bg-gray-800 text-gray-300 hover:border-gray-400'
                        }`}
                        onClick={() => {
                          sounds.playButtonClick();
                          setSelectedSuit(suit);
                        }}
                      >
                        <div className="text-center">
                          <div className="text-2xl mb-1">
                            {suit === 'hearts' ? '♥' : suit === 'diamonds' ? '♦' : suit === 'clubs' ? '♣' : '♠'}
                          </div>
                          <div className="text-sm">{getSuitDisplayName(suit)}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-center space-x-4">
              <motion.button
                className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-colors"
                onClick={resetForm}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Сбросить
              </motion.button>
              <motion.button
                className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                  canSubmit()
                    ? 'bg-casino-gold hover:bg-yellow-600 text-velvet'
                    : 'bg-gray-500 text-gray-300 cursor-not-allowed'
                }`}
                onClick={handleAskQuestion}
                disabled={!canSubmit()}
                whileHover={canSubmit() ? { scale: 1.05 } : {}}
                whileTap={canSubmit() ? { scale: 0.95 } : {}}
              >
                Задать вопрос
              </motion.button>
            </div>
          </motion.div>
        ) : (
          // Панель выбора типа вопроса
          <motion.div
            key="select-phase"
            className="text-center space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-lg font-bold text-casino-gold">
              Выберите тип вопроса
            </h3>
            <p className="text-gray-300 text-sm">
              Ход игрока: {currentPlayer.name}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const formatQuestionText = (question: Question): string => {
  const targetPlayer = question.targetPlayerId;
  
  switch (question.type) {
    case 'rank':
      return `Есть ли у ${targetPlayer} карта ${question.rank}?`;
    case 'count':
      return `Сколько у ${targetPlayer} карт ${question.rank}? (минимум ${question.count})`;
    case 'color':
      const colorText = question.color === 'red' ? 'красных' : 'черных';
      return `Есть ли у ${targetPlayer} ${colorText} карт?`;
    case 'suit':
      return `Есть ли у ${targetPlayer} карт масти ${question.suit}?`;
    default:
      return 'Неизвестный вопрос';
  }
};

export default QuestionPanel;
