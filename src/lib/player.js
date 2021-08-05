import gameboard from "./gameboard";

const createPlayer = (playerName) => {
  const playerBoard = gameboard(playerName);

  const placeShipsDefault = () => {
    playerBoard.placeShip("carrier", "horizontal", 1, 1);
    playerBoard.placeShip("battleship", "vertical", 1, 3);
    playerBoard.placeShip("cruiser", "vertical", 4, 4);
    playerBoard.placeShip("submarine", "horizontal", 7, 6);
    playerBoard.placeShip("submarine", "horizontal", 2, 8);
    playerBoard.placeShip("destroyer", "vertical", 7, 3);
    playerBoard.placeShip("destroyer", "vertical", 5, 5);
  }

  const attack = (x, y, enemy) => {
    enemy.playerBoard.receiveAttack(x, y);
  };

  let randomMoves = [];
  const randomAttack = (enemy) => {
    let x = Math.floor(Math.random() * 10) + 1;
    let y = Math.floor(Math.random() * 10) + 1;

    while (randomMoves.includes([x, y])) {
      x = Math.floor(Math.random() * 10) + 1;
      y = Math.floor(Math.random() * 10) + 1;
    }

    randomMoves.push([x, y]);
    enemy.playerBoard.receiveAttack(x, y);
  };

  return { playerBoard, attack, randomAttack, randomMoves, placeShipsDefault };
};

export default createPlayer;
