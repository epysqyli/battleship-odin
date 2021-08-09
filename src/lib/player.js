import gameboard from "./gameboard";

const createPlayer = (playerName) => {
  const playerBoard = gameboard(playerName);

  const placeShipsDefault = () => {
    playerBoard.placeShip("carrier", "horizontal", 1, 1);
    playerBoard.placeShip("battleship", "vertical", 1, 5);
    playerBoard.placeShip("cruiser", "vertical", 4, 7);
    playerBoard.placeShip("submarine", "horizontal", 6, 6);
    playerBoard.placeShip("destroyer", "horizontal", 4, 3);
  };

  const attack = (x, y, enemy) => {
    enemy.playerBoard.receiveAttack(x, y);
  };

  const chooseRandomCell = (enemy) => {
    let x = Math.floor(Math.random() * 10) + 1;
    let y = Math.floor(Math.random() * 10) + 1;
    const cell = enemy.playerBoard.getCoords(x, y);
    return cell;
  };

  const randomAttack = (enemy, x, y) => {
    enemy.playerBoard.receiveAttack(x, y);
  };

  return {
    playerBoard,
    attack,
    chooseRandomCell,
    randomAttack,
    placeShipsDefault,
  };
};

export default createPlayer;
