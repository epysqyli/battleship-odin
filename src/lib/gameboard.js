import { shipFactory } from "./shipFactory";

const ships = [
  { carrier: shipFactory("carrier", 5, 1) },
  { battleship: shipFactory("battleship", 4, 1) },
  { cruiser: shipFactory("cruiser", 3, 1) },
  { submarine: shipFactory("submarine", 3, 2) },
  { destroyer: shipFactory("destroyer", 2, 2) },
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

  // // general coordinates validity check based on ship length
  if (direction === "horizontal") {
    let coordsToCheck = [];
    for (let i = 0; i < shipLength; i++) {
      this.board.forEach((coords) => {
        if (coords.x === x + i && coords.y === y) {
          coordsToCheck.push(coords);
        }
      });
    }
    if (coordsToCheck.every((coords) => !coords.ship)) {
      // do nothing
    } else {
      throw new Error("Path is not free");
    }
  } else if (direction == "vertical") {
    let coordsToCheck = [];
    for (let i = 0; i < shipLength; i++) {
      this.board.forEach((coords) => {
        if (coords.x === x && coords.y === y + 1) {
          coordsToCheck.push(coords);
        }
      });
    }
    if (coordsToCheck.every((coords) => !coords.ship)) {
      // do nothing
    } else {
      throw new Error("Path is not free");
    }
  }

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
