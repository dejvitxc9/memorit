import { useEffect } from "react";
import { useStore } from "../../store";
import { memoritStatsItem } from "../../types/types";
import "./Stats.scss"

const Stats = () => {
  const memoritStats = useStore((store) => store.memoritStats);
  const setMemoritStats = useStore((store) => store.setMemoritStats);
  console.log(memoritStats);

  useEffect(() => {
    const storedStats = localStorage.getItem("myMemoritStats");
    if (storedStats) {
      try {
        const parsedStats = JSON.parse(storedStats);
        setMemoritStats(parsedStats);
      } catch (error) {
        console.error("Błąd podczas parsowania statystyk:", error);
      }
    }
  }, [setMemoritStats]);

  return (
    <div className="stats-container">
      {Array.isArray(memoritStats) && memoritStats.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Level</th>
              <th>Moves (Hits/Misses)</th>
              <th>Hits Ratio</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {memoritStats.map((item: memoritStatsItem, index: number) => (
              <tr key={index}>
                <td> {item.date}</td>
                <td>{item.level/3}</td>
                <td>{`${item.moves} (${item.hits}/${item.misses})`}</td>
                <td>
                  {item.moves
                    ? `${(
                        ((item.moves - item.misses) / item.moves) *
                        100
                      ).toFixed(1)}%`
                    : "unknown"}
                </td>
                <td>
                  {item.minutes}:
                  {item.seconds < 10 ? `0${item.seconds}` : item.seconds}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="stats-not-found">Nie znaleziono danych do wyświetlenia.</p>
      )}
    </div>
  );
};

export default Stats;
