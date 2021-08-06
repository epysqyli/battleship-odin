import { React, useState, useEffect } from "react";
import Gameboard from "./components/Gameboard";
import Ships from "./components/Ships";
import createPlayer from "./lib/player";
import "./styles/app.scss";

const App = () => {
  const [player, setPlayer] = useState(createPlayer("player"));
  const [computer, setComputer] = useState(createPlayer("computer"));
  const [playerShipPlaced, setPlayerShipPlaced] = useState(false);
  const [currentShip, setCurrentShip] = useState();
  const [chosenCell, setChosenCell] = useState({x: null, y: null});

  const placeDefaultShips = (human, cpu) => {
    // // player
    // let newHumanState = { ...player };
    // newHumanState.placeShipsDefault();
    // setPlayer(newHumanState);

    // computer
    let newCpuState = { ...computer };
    newCpuState.placeShipsDefault();
    setComputer(newCpuState);
  };

  const onShipClick = (selectedShip) => {
    setCurrentShip(selectedShip);
  };

  const getCell = (cell) => {
    console.log(cell);
  }

  const placeShip = (shipName, direction, x, y) => {
    let newPlayerBoard = { ...player };
    newPlayerBoard.placeShip(shipName, direction, x, y);
    setPlayer(newPlayerBoard);
  };

  useEffect(() => {
    placeDefaultShips(computer);
  }, []);

  if (playerShipPlaced) {
    return (
      <div className="App">
        <h1>Odin BattleShip</h1>
        <div className="container">
          <Gameboard owner={player}></Gameboard>
          <Gameboard owner={computer}></Gameboard>
        </div>
      </div>
    );
  } else {
    return (
      <div className="App">
        <h1>Odin BattleShip</h1>
        <div className="container">
          <Gameboard owner={player} getCellInfo={getCell}></Gameboard>
          <Ships chooseShip={onShipClick} />
        </div>
      </div>
    );
  }
};

export default App;

// game loop
// hit start
// manually place player ships
// random placement for computer ships
// alternate between player and computer until allSunks
