import { MouseEventHandler } from "react";

export interface CardProps {
  content: string;
  pair: string;
  isMatched?: boolean;
  isFrontFaced: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

// Typ reprezentujący store
export interface Store {
  level: number;
  moves: number;
  misses: number;
  hits: number;
  cardsData: CardProps[];
  revealedCards: string[];
  memoritStats: memoritStatsItem[];
  seconds: number;
  minutes: number;
  isRunning: boolean;
  isPlayable: boolean;
  handleCover: (content: string, pairId: string) => void;
  setLevel: (newLevel: number) => void;
  setMemoritStats: (memoritStats: memoritStatsItem[]) => void;
}

export interface memoritStatsItem {
  level: number;
  moves: number;
  misses: number;
  hits: number;
  seconds: number;
  minutes: number;
  date: string;
}
