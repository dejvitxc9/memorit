import { CardProps } from "../../types/types";
import { useStore } from "../../store";
import "./Card.scss";

const Card = ({ content, pair, isFrontFaced, isMatched }: CardProps) => {
  const flipCard = useStore((store) => store.handleCover);

  return (
    <div
      className="card"
      onClick={() => {
        if (!(isFrontFaced || isMatched)) {
          navigator.vibrate(70);
          flipCard(content, pair);
        }
      }}
    >
      <div className={isFrontFaced || isMatched ? "inner rotate" : "inner"}>
        <div className="front">
          <p>?</p>
        </div>
        <div className="back">
          <p>{content}</p>
        </div>
      </div>
    </div>
  );
};
export default Card;
