import gameboard from "./gameboard";

const createPlayer = (playerName) => {
  const playerBoard = gameboard(playerName);
  
  const attack = (x, y, enemyBoard) => {
    enemyBoard.receiveAttack(x, y);
  };

  let randomMoves = [];
  const randomAttack = (enemyBoard) => {
    let x = Math.floor(Math.random() * 10) + 1;
    let y = Math.floor(Math.random() * 10) + 1;

    while (randomMoves.includes([x, y])) {
      let x = Math.floor(Math.random() * 10) + 1;
      let y = Math.floor(Math.random() * 10) + 1;
    }

    randomMoves.push([x, y]);
    enemyBoard.receiveAttack(x, y);
  };
  return { playerBoard, attack, randomAttack, randomMoves };
};

export default createPlayer;
