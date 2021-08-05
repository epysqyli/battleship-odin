import { React, useState } from "react";
import Gameboard from "./components/Gameboard";

import createPlayer from "./lib/player";

import "./styles/app.scss";

const App = () => {
  const [player, setPlayer] = useState(createPlayer("player"));
  const [computer, setComputer] = useState(createPlayer("computer"));
  return (
    <div className="App">
      <div className="container">
        <Gameboard owner={player}></Gameboard>
        <Gameboard owner={computer}></Gameboard>
      </div>
    </div>
  );
};

export default App;
