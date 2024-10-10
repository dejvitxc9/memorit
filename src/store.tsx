import { create } from "zustand";
import { Store, CardProps, memoritStatsItem } from "./types/types";
import emojiData from "./emojiData.json";

const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const getRandomEmojis = (
  emojiData: { content: string }[],
  numberOfEmojis: number
) => {
  const shuffledEmojis = shuffleArray([...emojiData]);
  return shuffledEmojis.slice(0, numberOfEmojis);
};

const generateCardsData = (
  emojiData: { content: string }[],
  numberOfPairs: number
) => {
  const randomEmojis = getRandomEmojis(emojiData, numberOfPairs);
  const cards: CardProps[] = randomEmojis.flatMap((emoji) => [
    {
      content: emoji.content,
      pair: "one",
      isMatched: false,
      isFrontFaced: false,
    },
    {
      content: emoji.content,
      pair: "two",
      isMatched: false,
      isFrontFaced: false,
    },
  ]);
  return shuffleArray(cards);
};

let intervalId: number = 0;

const startTimer = (set: any, get: any) => {
  if (!get().isRunning) {
    set({ isRunning: true });
    intervalId = setInterval(() => {
      set((state: any) => {
        if (state.seconds === 59) {
          return { minutes: state.minutes + 1, seconds: 0 };
        }
        return { seconds: state.seconds + 1 };
      });
    }, 1000);
  }
};

const stopTimer = (set: any) => {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = 0;
    set({ isRunning: false, isPlayable: false });
  }
};

const useStore = create<Store>((set, get) => ({
  cardsData: generateCardsData(emojiData, 3),
  revealedCards: [],
  memoritStats: [],
  level: 3,
  moves: 0,
  misses: 0,
  hits: 0,
  seconds: 0,
  minutes: 0,
  isRunning: false,
  isPlayable: true,
  handleCover: (content: string, pairId: string) => {
    const state = get();
    const revealedCards = state.revealedCards;

    if (revealedCards.length === 2) {
      const updatedCardsData = state.cardsData.map((card) => ({
        ...card,
        isFrontFaced: card.content === content && card.pair === pairId,
      }));

      return set({ cardsData: updatedCardsData, revealedCards: [content] });
    }

    const updatedRevealedCards = [...revealedCards, content];
    const updatedCardsData = state.cardsData.map((card) => {
      if (
        updatedRevealedCards.length === 2 &&
        updatedRevealedCards[0] === updatedRevealedCards[1] &&
        card.content === updatedRevealedCards[0]
      ) {
        return { ...card, isMatched: true };
      }
      if (card.pair === pairId && card.content === content) {
        return { ...card, isFrontFaced: true };
      }
      return card;
    });

    const updatedMoves =
      updatedRevealedCards.length === 2 ? state.moves + 1 : state.moves;
    const updatedMisses =
      updatedRevealedCards.length === 2 &&
      updatedRevealedCards[0] !== updatedRevealedCards[1]
        ? state.misses + 1
        : state.misses;
    const updatedHits =
      updatedRevealedCards.length === 2 &&
      updatedRevealedCards[0] === updatedRevealedCards[1]
        ? state.hits + 1
        : state.hits;

    set({
      cardsData: updatedCardsData,
      revealedCards: updatedRevealedCards,
      moves: updatedMoves,
      misses: updatedMisses,
      hits: updatedHits,
    });

    if (updatedMoves === 1 && !state.isRunning) {
      startTimer(set, get);
    }

    if (updatedHits === state.level) {
      stopTimer(set);
    }
  },
  setLevel: (newLevel: number) => {
    stopTimer(set);
    set({
      level: newLevel,
      cardsData: generateCardsData(emojiData, newLevel),
      revealedCards: [],
      moves: 0,
      misses: 0,
      hits: 0,
      seconds: 0,
      minutes: 0,
      isRunning: false,
      isPlayable: true,
    });
  },
  setMemoritStats: (memoritStats: memoritStatsItem[]) => {
    set({
      memoritStats: memoritStats
    })
  }
}));

export { useStore };
