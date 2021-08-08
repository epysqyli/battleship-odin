import { React, useState, useEffect } from "react";
import Gameboard from "./components/Gameboard";
import Ships from "./components/Ships";
import createPlayer from "./lib/player";
import "./styles/app.scss";

const App = () => {
  const [player, setPlayer] = useState(createPlayer("player"));
  const [computer, setComputer] = useState(createPlayer("computer"));
  const [playerShipsPlaced, setPlayerShipsPlaced] = useState(true);
  const [currentShip, setCurrentShip] = useState();
  const [chosenCell, setChosenCell] = useState({ x: null, y: null });
  const [shipAmount, setShipAmount] = useState(0);
  const [shipPlaced, setShipPlaced] = useState([false, 0]);
  const [shipDirection, setShipDirection] = useState("horizontal");
  const [gameOver, setGameOver] = useState(false);
  const [turnMessage, setTurnMessage] = useState("player's turn");
  const [playerMove, setPlayerMove] = useState(false);

  const changeDirection = () => {
    if (shipDirection === "horizontal") {
      setShipDirection("vertical");
    } else {
      setShipDirection("horizontal");
    }
  };

  const placeDefaultShips = () => {
    let newComputer = { ...computer };
    newComputer.placeShipsDefault();
    setComputer(newComputer);
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
    setPlayerMove(true);
    setTurnMessage("computer's turn");
  };

  const attackPlayer = () => {
    setTurnMessage("player's turn");
    computer.randomAttack(player);
    console.log("player randomly attacked");
  };

  const placeShip = (shipName, direction, x, y) => {
    // update player board state
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

    // update shipAmount
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

  useEffect(() => {
    if (playerMove) {
      setTimeout(attackPlayer, 1000);
    }
    setPlayerMove(false);
  }, [playerMove]);

  if (playerShipsPlaced) {
    return (
      <div className="App">
        <h1>Odin BattleShip</h1>
        <div className="container">
          <Gameboard owner={player} getCellInfo={attackPlayer}></Gameboard>
          <Gameboard owner={computer} getCellInfo={attackComputer}></Gameboard>
        </div>
        <div className="game-start">{turnMessage}</div>
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
              {shipDirection === "horizontal" ? "horizontal" : "vertical"}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default App;
