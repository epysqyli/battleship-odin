import { shipFactory } from "./shipFactory";

// in order to place a ship:
// x and y coords
// horizontal or vertical orientation
// x and y should be empty taking into account ship length and
// ship orientation
// ship cannot be placed, totally or partially, outside of the board

const ships = [
  { carrier: shipFactory(5), quantity: 1 },
  { battleship: shipFactory(4), quantity: 2 },
  { cruiser: shipFactory(3), quantity: 3 },
  { submarine: shipFactory(2), quantity: 4 },
  { destroyer: shipFactory(1), quantity: 5 },
];

function getCoords(x, y) {
  return this.board.find((item) => (item.x === x) & (item.y === y));
}

function placeShip(shipType, direction, x, y) {
  const ship = ships.find((ship) => ship[shipType]);
  let shipLength = ship[shipType].length;

  if (direction === "horizontal") {
    for (let i = 0; i < shipLength; i++) {
      this.board.forEach((coords) => {
        if (coords.x === x + i && coords.y === y) {
          coords.empty = false;
        }
      });
    }
  } else if (direction === "vertical") {
    for (let i = 0; i < shipLength; i++) {
      this.board.forEach((coords) => {
        if (coords.x === x && coords.y === y + i) {
          coords.empty = false;
        }
      });
    }
  }
}

const gameboard = () => {
  let board = [];
  let x = 1;
  let y = 1;
  while (x !== 10 && y <= 10) {
    x = 1;
    while (x <= 10) {
      board.push({
        x,
        y,
        empty: true,
        miss: false,
        attack: false,
      });
      x++;
    }
    y++;
  }
  return { board, getCoords, placeShip };
};

export default gameboard;
