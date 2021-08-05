import gameboard from "./gameboard";

const createPlayer = (playerName) => {
  const playerBoard = gameboard(playerName);
  const attack = (x, y, enemyBoard) => {
    enemyBoard.receiveAttack(x, y);
  }
  return { playerBoard, attack };
};

export default createPlayer;