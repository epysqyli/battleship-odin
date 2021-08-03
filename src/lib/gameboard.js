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

const gameboard = () => {
  // create array of 100 coord objects
  let board = []
  let x = 1;
  let y = 1;
  while (x !== 10 && y <= 10) {
    x = 1;
    while (x <= 10) {
      board.push({ x: { pos: x, empty: true, miss: false, attack: false }, y: { pos: y, empty: true, miss: false, attack: false } });
      x++;
    }
    y++;
  }
  return board;
};

export default gameboard;
