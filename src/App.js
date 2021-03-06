import { React, useState, useEffect } from "react";
import Gameboard from "./components/Gameboard";
import Ships from "./components/Ships";
import createPlayer from "./lib/player";
import "./styles/app.scss";

const App = () => {
  const [player, setPlayer] = useState(createPlayer("player"));
  const [computer, setComputer] = useState(createPlayer("computer"));
  const [enoughShips, setEnoughShips] = useState(false);
  const [playerShipsPlaced, setPlayerShipsPlaced] = useState(false);
  const [currentShip, setCurrentShip] = useState();
  const [chosenCell, setChosenCell] = useState({ x: null, y: null });
  const [shipAmount, setShipAmount] = useState(0);
  const [shipPlaced, setShipPlaced] = useState([false, 0]);
  const [shipDirection, setShipDirection] = useState("horizontal");
  const [turnMessage, setTurnMessage] = useState("player's turn");
  const [playerMoved, setPlayerMoved] = useState(false);
  const [hitStreak, setHitStreak] = useState(false);
  const [computerMoved, setComputerMoved] = useState(false);
  const [computerStreak, setComputerStreak] = useState(false);
  const [randomCell, setRandomCell] = useState(null);
  const [randomCells, setRandomCells] = useState([]);
  const [winner, setWinner] = useState(null);

  const resetApp = () => {
    setPlayer(createPlayer("player"));
    setComputer(createPlayer("computer"));
    setEnoughShips(false);
    setPlayerShipsPlaced(false);
    setCurrentShip();
    setChosenCell({ x: null, y: null });
    setShipAmount(0);
    setShipPlaced([false, 0]);
    setShipDirection("horizontal");
    setTurnMessage("player's turn");
    setPlayerMoved(false);
    setHitStreak(false);
    setComputerMoved(false);
    setComputerStreak(false);
    setRandomCell(null);
    setRandomCells([]);
    setWinner(null);
  };

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
    setChosenCell({ x: cell.x, y: cell.y });
  };

  const generateRndCell = () => {
    let rndCell = computer.chooseRandomCell(player);
    while (randomCells.includes(rndCell)) {
      rndCell = computer.chooseRandomCell(player);
    }
    setRandomCell(rndCell);
    let newRandomCells = [...randomCells];
    newRandomCells.push(rndCell);
    setRandomCells(newRandomCells);
  };

  const checkWinner = () => {
    if (winner) console.log(`${winner} wins`);
  };

  const attackComputer = (cell) => {
    player.attack(cell.x, cell.y, computer);
    if (cell.ship) {
      setHitStreak(true);
      setPlayerMoved(false);
      if (computer.playerBoard.allSunk()) {
        setWinner(player.playerBoard.owner);
        checkWinner();
      }
      setTurnMessage("player's turn");
    } else {
      setHitStreak(false);
      setPlayerMoved(true);
      setTurnMessage("computer's turn");
    }
    setComputerMoved(false);
  };

  const attackPlayer = () => {
    generateRndCell();
    computer.randomAttack(player, randomCell.x, randomCell.y);
    if (randomCell.ship) {
      setComputerStreak(true);
      setComputerMoved(false);
      if (player.playerBoard.allSunk()) {
        setWinner(computer.playerBoard.owner);
        checkWinner();
      }
    } else {
      setComputerStreak(false);
      setComputerMoved(true);
      setTurnMessage("player's turn");
    }
    setPlayerMoved(false);
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
  };

  useEffect(() => {
    placeDefaultShips();
    generateRndCell();
  }, []);

  useEffect(() => {
    if (currentShip && chosenCell) {
      placeShip(currentShip.name, shipDirection, chosenCell.x, chosenCell.y);
    }
  }, [chosenCell]);

  // manages streak logic for player
  useEffect(() => {
    if (playerShipsPlaced && playerMoved && !hitStreak) {
      setTimeout(attackPlayer, 1000);
    }
  }, [hitStreak, playerMoved]);

  useEffect(() => {
    if (hitStreak) setPlayerMoved(true);
  }, [hitStreak, playerMoved]);
  // end of player streak logic

  // manages streak logic for computer
  useEffect(() => {
    if (computerStreak && computerMoved) setTimeout(attackPlayer, 1000);
  }, [computerStreak, computerMoved]);

  useEffect(() => {
    if (computerStreak) setComputerMoved(true);
  }, [computerStreak, computerMoved]);
  // end of computer streak logic

  useEffect(() => {
    if (shipAmount === 5) setEnoughShips(true);
  }, [shipAmount]);

  if (playerShipsPlaced) {
    return (
      <div className="App">
        <h1>Odin BattleShip</h1>
        <div className={winner ? "winner-box" : "hidden"}>
          <div>{winner} has won - congrats!</div>
          <div className="btn" onClick={() => resetApp()}>
            play again
          </div>
        </div>
        <div className={winner ? "container secondary" : "container"}>
          <Gameboard
            owner={player}
            firstStageOver={playerShipsPlaced}
            getCellInfo={attackPlayer}
          ></Gameboard>
          <Gameboard
            owner={computer}
            firstStageOver={playerShipsPlaced}
            getCellInfo={attackComputer}
          ></Gameboard>
        </div>
        <div className="turns-info">{turnMessage}</div>
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
            firstStage={playerShipsPlaced}
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
        <div
          className={enoughShips ? "game-start" : "game-start hidden"}
          onClick={() => {
            if (enoughShips) setPlayerShipsPlaced(true);
          }}
        >
          start game
        </div>
      </div>
    );
  }
};

export default App;
