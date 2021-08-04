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

  //  general coordinates validity check based on ship length
  if (direction === "horizontal") {
    if (x + shipLength > 10) {
      throw new Error("Ship does not fit on the board");
    }
  } else if (direction === "vertical") {
    if (y + shipLength > 10) {
      throw new Error("Ship does not fit on the board");
    }
  }

  if (direction === "horizontal") {
    let coordsToCheck = [];
    for (let i = 0; i < shipLength; i++) {
      this.board.forEach((coords) => {
        if (coords.x === x + i && coords.y === y) {
          coordsToCheck.push(coords);
        }
      });
    }
    if (coordsToCheck.some((coords) => coords.ship)) {
      throw new Error("Path is not free");
    }
  } else if (direction === "vertical") {
    let coordsToCheck = [];
    for (let i = 0; i < shipLength; i++) {
      this.board.forEach((coords) => {
        if (coords.x === x && coords.y === y + 1) {
          coordsToCheck.push(coords);
        }
      });
    }
    if (coordsToCheck.some((coords) => coords.ship)) {
      throw new Error("Path is not free");
    }
  }

  // place ship on the cells since all checks have been passed
  if (direction === "horizontal") {
    ship[shipType].direction = "horizontal";
    ship[shipType].start = {x, y};
    for (let i = 0; i < shipLength; i++) {
      this.board.forEach((coords) => {
        if (coords.x === x + i && coords.y === y) {
          coords.ship = ship[shipType];
        }
      });
    }
  } else if (direction === "vertical") {
    ship[shipType].direction = "vertical";
    ship[shipType].start = {x, y};
    for (let i = 0; i < shipLength; i++) {
      this.board.forEach((coords) => {
        if (coords.x === x && coords.y === y + i) {
          coords.ship = ship[shipType];
        }
      });
    }
  }
}

function receiveAttack(x, y) {
  this.board.forEach((coords) => {
    if (coords.x === x && coords.y === y) {
      if (coords.ship) {
        coords.attack = true;
        // implement hit function on the ship
      }
      else {
        coords.miss = true;
      }
    }
  });
}

const gameboard = () => {
  const board = [];
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
  return { board, getCoords, placeShip, receiveAttack };
};

export default gameboard;
