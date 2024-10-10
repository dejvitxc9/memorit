import "./App.scss";
import { useStore } from "./store";
import Playground from "./components/playground/Playground";
import SummaryScreen from "./components/summarScreen/SummaryScreen";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Stats from "./components/stats/Stats";
import GameStats from "./components/gameStats/GameStats";

const App = () => {
  const isPlayable = useStore((store) => store.isPlayable);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              isPlayable ? (
                <>
                  <Playground />
                  <GameStats />
                </>
              ) : (
                <SummaryScreen />
              )
            }
          ></Route>
          <Route path="/stats" element={<Stats />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
