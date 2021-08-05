import createPlayer from "./player";

// create the game loop

const gameLoop = () => {
  const player = createPlayer("player");
  const computer = createPlayer("computer");

  // place ships in some default configuration for both players
  player.playerBoard.placeShipsDefault();
  computer.playerBoard.placeShipsDefault();

  while (player.playerBoard.allSunk() || computer.playerBoard.allSunk()) {
    let x = prompt("enter the x coord");
    let y = prompt("enter the y coord");
    player.attack(x, y, computer.playerBoard);
    computer.randomAttack(player.playerBoard);
  }
};

export default gameLoop;
