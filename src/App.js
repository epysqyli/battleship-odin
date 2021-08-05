import { React, useState, useEffect } from "react";
import Gameboard from "./components/Gameboard";
import createPlayer from "./lib/player";
import "./styles/app.scss";

const App = () => {
  const [player, setPlayer] = useState(createPlayer("player"));
  const [computer, setComputer] = useState(createPlayer("computer"));

  const placeDefaultShips = (human, cpu) => {
    // player
    let newHumanState = { ...player };
    newHumanState.placeShipsDefault();
    setPlayer(newHumanState);
    // computer
    let newCpuState = { ...computer };
    newCpuState.placeShipsDefault();
    setComputer(newCpuState);
  };

  useEffect(() => {
    placeDefaultShips(player, computer);
  }, []);

  return (
    <div className="App">
      <h1>Odin BattleShip</h1>
      <div className="container">
        <Gameboard owner={player}></Gameboard>
        <Gameboard owner={computer}></Gameboard>
      </div>
    </div>
  );
};

export default App;
