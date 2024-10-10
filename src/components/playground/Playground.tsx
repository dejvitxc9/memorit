import { useStore } from "../../store";
import { CardProps } from "../../types/types";
import Card from "../card/Card";
import Timer from "../timer/Timer";

const Playground = () => {
  const cardsData = useStore((store) => store.cardsData);
  const handleCover = useStore((store) => store.handleCover);
  return (
    <>
      <div className="playground">
        {cardsData.map((card: CardProps, index: number) => (
          <Card
            key={index}
            content={card.content}
            pair={card.pair}
            isFrontFaced={card.isFrontFaced}
            isMatched={card.isMatched}
            onClick={() => handleCover(card.content, card.pair)}
          />
        ))}
      </div>
      <Timer />
    </>
  );
};
export default Playground;
