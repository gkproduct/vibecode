import { useCallback, useRef } from 'react';

interface SoundOptions {
  volume?: number;
  playbackRate?: number;
}

export const useSounds = () => {
  const audioContextRef = useRef<AudioContext | null>(null);

  const initAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  const playTone = useCallback((frequency: number, duration: number, options: SoundOptions = {}) => {
    const audioContext = initAudioContext();
    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    oscillator.type = 'sine';

    const volume = options.volume || 0.1;
    const playbackRate = options.playbackRate || 1;

    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
  }, [initAudioContext]);

  const playCardDeal = useCallback(() => {
    // Звук раздачи карты - короткий высокий тон
    playTone(800, 0.1, { volume: 0.15 });
    setTimeout(() => playTone(600, 0.1, { volume: 0.1 }), 50);
  }, [playTone]);

  const playCardShuffle = useCallback(() => {
    // Звук перемешивания - серия быстрых тонов
    for (let i = 0; i < 8; i++) {
      setTimeout(() => {
        playTone(200 + Math.random() * 400, 0.05, { volume: 0.08 });
      }, i * 30);
    }
  }, [playTone]);

  const playCorrectAnswer = useCallback(() => {
    // Звук правильного ответа - восходящая мелодия
    const notes = [440, 554, 659, 880]; // A, C#, E, A
    notes.forEach((freq, index) => {
      setTimeout(() => {
        playTone(freq, 0.2, { volume: 0.12 });
      }, index * 100);
    });
  }, [playTone]);

  const playWrongAnswer = useCallback(() => {
    // Звук неправильного ответа - нисходящий тон
    playTone(400, 0.3, { volume: 0.1 });
    setTimeout(() => playTone(300, 0.3, { volume: 0.08 }), 150);
  }, [playTone]);

  const playGameStart = useCallback(() => {
    // Звук начала игры - торжественная мелодия
    const melody = [523, 659, 784, 1047]; // C, E, G, C
    melody.forEach((freq, index) => {
      setTimeout(() => {
        playTone(freq, 0.3, { volume: 0.15 });
      }, index * 200);
    });
  }, [playTone]);

  const playGameEnd = useCallback(() => {
    // Звук окончания игры - победная мелодия
    const melody = [523, 659, 784, 1047, 1319]; // C, E, G, C, E
    melody.forEach((freq, index) => {
      setTimeout(() => {
        playTone(freq, 0.4, { volume: 0.2 });
      }, index * 150);
    });
  }, [playTone]);

  const playButtonClick = useCallback(() => {
    // Звук нажатия кнопки
    playTone(600, 0.1, { volume: 0.05 });
  }, [playTone]);

  const playQuestion = useCallback(() => {
    // Звук вопроса
    playTone(500, 0.2, { volume: 0.08 });
    setTimeout(() => playTone(600, 0.2, { volume: 0.06 }), 100);
  }, [playTone]);

  const playChestOpen = useCallback(() => {
    // Звук открытия сундучка
    const frequencies = [200, 300, 400, 500];
    frequencies.forEach((freq, index) => {
      setTimeout(() => {
        playTone(freq, 0.15, { volume: 0.1 });
      }, index * 50);
    });
  }, [playTone]);

  return {
    playCardDeal,
    playCardShuffle,
    playCorrectAnswer,
    playWrongAnswer,
    playGameStart,
    playGameEnd,
    playButtonClick,
    playQuestion,
    playChestOpen
  };
};
