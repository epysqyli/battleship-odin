import { React, useState } from "react";
import Gameboard from "./components/Gameboard";

import createPlayer from "./lib/player";

import "./styles/app.scss";

const App = () => {
  const [player, setPlayer] = useState(createPlayer("player"));
  const [computer, setComputer] = useState(createPlayer("computer"));
  return (
    <div className="App">
      <Gameboard owner={player}></Gameboard>
      <Gameboard owner={computer}></Gameboard>
    </div>
  );
};

export default App;
