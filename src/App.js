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
  const [chosenCell, setChosenCell] = useState({ x: null, y: null });
  const [shipAmount, setShipAmount] = useState(0);
  const [shipPlaced, setShipPlaced] = useState([false, 0]);

  const placeDefaultShips = () => {
    // computer
    let newCpuState = { ...computer };
    newCpuState.placeShipsDefault();
    setComputer(newCpuState);
  };

  const onShipClick = (selectedShip, i) => {
    setCurrentShip(selectedShip);
    setShipPlaced([false, i]);
  };

  const getCell = (cell) => {
    console.log(cell);
    setChosenCell({ x: cell.x, y: cell.y });
  };

  const placeShip = (shipName, direction, x, y) => {
    let newPlayerState = { ...player };
    newPlayerState.playerBoard.placeShip(shipName, direction, x, y);
    setPlayer(newPlayerState);
    let newShipPlaced = shipPlaced;
    newShipPlaced = [true, shipPlaced[1]];
    setShipPlaced(newShipPlaced);
    // reset currentShip and chosenCell state
    setCurrentShip(null);
    setChosenCell(null);
    let newShipAmount = shipAmount;
    newShipAmount++;
    setShipAmount(newShipAmount);
    if (newShipAmount === 7) {
      setPlayerShipPlaced(true);
    }
  };

  useEffect(() => {
    placeDefaultShips();
  }, []);

  useEffect(() => {
    if (currentShip && chosenCell) {
      placeShip(currentShip.name, "horizontal", chosenCell.x, chosenCell.y);
    }
  }, [chosenCell]);

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
          <Ships
            owner={player}
            chooseShip={onShipClick}
            hideShip={shipPlaced[0] ? shipPlaced : null}
          />
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
