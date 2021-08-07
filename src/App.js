import { React, useState, useEffect } from "react";
import Gameboard from "./components/Gameboard";
import Ships from "./components/Ships";
import createPlayer from "./lib/player";
import "./styles/app.scss";

const App = () => {
  const [player, setPlayer] = useState(createPlayer("player"));
  const [computer, setComputer] = useState(createPlayer("computer"));
  const [playerShipsPlaced, setPlayerShipsPlaced] = useState(false);
  const [currentShip, setCurrentShip] = useState();
  const [chosenCell, setChosenCell] = useState({ x: null, y: null });
  const [shipAmount, setShipAmount] = useState(0);
  const [shipPlaced, setShipPlaced] = useState([false, 0]);
  const [shipDirection, setShipDirection] = useState("horizontal");

  const changeDirection = () => {
    if (shipDirection === "horizontal") {
      setShipDirection("vertical");
    } else {
      setShipDirection("horizontal");
    }
  };

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

  const attackComputer = (cell) => {
    player.attack(cell.x, cell.y, computer);
    console.log(cell);
  };

  const attackPlayer = (cell) => {
    computer.randomAttack(player);
    console.log(cell);
  };

  const placeShip = (shipName, direction, x, y) => {
    let newPlayerState = { ...player };
    newPlayerState.playerBoard.placeShip(shipName, direction, x, y);
    setPlayer(newPlayerState);
    // update shipPlaced state
    let newShipPlaced = shipPlaced;
    newShipPlaced = [true, shipPlaced[1]];
    setShipPlaced(newShipPlaced);
    // reset currentShip and chosenCell state
    setCurrentShip(null);
    setChosenCell(null);
    let newShipAmount = shipAmount;
    newShipAmount++;
    setShipAmount(newShipAmount);
    if (newShipAmount === 5) {
      setPlayerShipsPlaced(true);
    }
  };

  useEffect(() => {
    placeDefaultShips();
  }, []);

  useEffect(() => {
    if (currentShip && chosenCell) {
      placeShip(currentShip.name, shipDirection, chosenCell.x, chosenCell.y);
    }
  }, [chosenCell]);

  if (playerShipsPlaced) {
    return (
      <div className="App">
        <h1>Odin BattleShip</h1>
        <div className="container">
          <Gameboard owner={player} getCellInfo={attackPlayer}></Gameboard>
          <Gameboard owner={computer} getCellInfo={attackComputer}></Gameboard>
        </div>
      </div>
    );
  } else {
    return (
      <div className="App">
        <h1>Odin BattleShip</h1>
        <div className="container">
          <Gameboard
            owner={player}
            clickable={shipPlaced[0]}
            getCellInfo={getCell}
          ></Gameboard>

          <div className="ships-component">
            <Ships
              owner={player}
              chooseShip={onShipClick}
              hideShip={shipPlaced[0] ? shipPlaced : null}
            />
            <div className="direction-change" onClick={changeDirection}>
              {shipDirection === "horizontal" ? "h" : "v"}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default App;
