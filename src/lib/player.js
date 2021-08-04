import gameboard from "./gameboard";

const createPlayer = (playerName) => {
  const playerBoard = gameboard(playerName);
  return { playerBoard };
};

export default createPlayer;