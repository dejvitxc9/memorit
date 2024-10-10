import { useStore } from "../../store";

const Timer = () => {
  const minutes = useStore((store) => store.minutes);
  const seconds = useStore((store) => store.seconds);
  return (
    <div>
      <h3>
        {minutes < 10 ? `0${minutes}` : minutes}:
        {seconds < 10 ? `0${seconds}` : seconds}
      </h3>
    </div>
  );
};
export default Timer;
