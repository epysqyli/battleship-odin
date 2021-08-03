import { shipFactory } from "./shipFactory";

const ships = [
  { carrier: shipFactory("carrier", 5) },
  { battleship: shipFactory("battleship", 4) },
  { cruiser: shipFactory("cruiser", 3) },
  { submarine: shipFactory("submarine", 2) },
  { destroyer: shipFactory("destroyer", 1) },
];

function getCoords(x, y) {
  return this.board.find((item) => (item.x === x) & (item.y === y));
}

const checkFreeCoords = (x1, y1, x2, y2, direction) => {
  // check whether all cells are free;
  if (direction === "horizontal") {
    // traverse horizontally
  }
};

function placeShip(shipType, direction, x, y) {
  if (x > 10 || y > 10) {
    throw new Error("Either x or y are not valid coordinates");
  }

  const coords = this.board.find(
    (coords) => (coords.x === x) & (coords.y === y)
  );
  if (coords.ship) {
    throw new Error("Coordinates not free");
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
          coords.ship = ship[shipType];
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
          coords.ship = ship[shipType];
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
        ship: null,
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
