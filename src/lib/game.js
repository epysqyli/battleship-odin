import createPlayer from "./player";

// create the game loop

const gameLoop = () => {
  const player = createPlayer("player");
  const computer = createPlayer("computer");

  // place ships in some default configuration for both players
  player.placeShipsDefault();
  computer.placeShipsDefault();
};

export default gameLoop;
