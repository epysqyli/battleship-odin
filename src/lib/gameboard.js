import { shipFactory } from "./shipFactory";

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
  if (x > 10 || y > 10) {
    throw new Error("Either x or y are not valid coordinates");
  }

  const ship = ships.find((ship) => ship[shipType]);
  let shipLength = ship[shipType].length;

  if (direction === "horizontal") {
    if (x + shipLength > 10) {
      throw new Error("Ship is too long for these coordinates");
    }

    for (let i = 0; i < shipLength; i++) {
      this.board.forEach((coords) => {
        if (coords.x === x + i && coords.y === y) {
          coords.empty = false;
        }
      });
    }
  } else if (direction === "vertical") {
    if (y + shipLength > 10) {
      throw new Error("Ship is too long for these coordinates");
    }
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