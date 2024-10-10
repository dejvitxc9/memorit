import { useStore } from "../../store";
import Timer from "../timer/Timer";
import "./gameStats.scss";

const GameStats = () => {
  const movesCount = useStore((store) => store.moves);
  const missesCount = useStore((store) => store.misses);

  return (
    <div className="summary-container">
      <div className="summary-content">
        <h4>Moves</h4>
        <h3>{movesCount}</h3>
      </div>
      <div className="summary-content">
        <h4>Misses</h4>
        <h3>{missesCount}</h3>
      </div>
      <div className="summary-content">
        <h4>Success rate</h4>
        <h3>
          {movesCount
            ? `${(((movesCount - missesCount) / movesCount) * 100).toFixed(1)}%`
            : "100%"}
        </h3>
      </div>
      <div className="summary-content">
        <h4>Time</h4>
        <Timer />
      </div>
    </div>
  );
};
export default GameStats;
