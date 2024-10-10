import { useEffect, useRef } from "react";
import { useStore } from "../../store";
import "./SummaryScreen.scss";
import GameStats from "../gameStats/GameStats";

const SummaryScreen = () => {
  const level = useStore((store) => store.level);
  const setLevel = useStore((store) => store.setLevel);
  const moves = useStore((store) => store.moves);
  const misses = useStore((store) => store.misses);
  const hits = useStore((store) => store.hits);
  const seconds = useStore((store) => store.seconds);
  const minutes = useStore((store) => store.minutes);

  const effectRun = useRef(false);


  const saveMyStats = () => {
    const newStats = {
      level: level,
      moves: moves,
      misses: misses,
      hits: hits,
      seconds: seconds,
      minutes: minutes,
      date: new Date().toISOString().split("T")[0],
    };

    const existingStats = localStorage.getItem("myMemoritStats");
    const statsArray = existingStats ? JSON.parse(existingStats) : [];

    statsArray.push(newStats);

    localStorage.setItem("myMemoritStats", JSON.stringify(statsArray));
  };

  useEffect(() => {
    if (effectRun.current) return;

    saveMyStats();
    effectRun.current = true;
  }, []);

  return (
    <div className="summary-screen">
      <h1 className="game-over">Game Over</h1>
      <button
        className="btn-replay"
        onClick={() => {
          setLevel(level);
        }}
      >
        Play Again
      </button>
      <GameStats />
    </div>
  );
};

export default SummaryScreen;
