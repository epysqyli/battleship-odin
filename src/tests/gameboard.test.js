import gameboard from "../lib/gameboard";

test("Gameboard has a 10x10 board with 100 cells", () => {
  const boardTest = gameboard();
  expect(boardTest.board.length).toBe(100);
});

describe("places the ships according to ship type and given coords", () => {
  test("places the carrier horizontally to take 5 cells", () => {
    let testBoard = gameboard();
    testBoard.placeShip("carrier", "horizontal", 3, 3);
    expect(testBoard.getCoords(3, 3).empty).toBeFalsy();
    expect(testBoard.getCoords(4, 3).empty).toBeFalsy();
    expect(testBoard.getCoords(5, 3).empty).toBeFalsy();
    expect(testBoard.getCoords(6, 3).empty).toBeFalsy();
    expect(testBoard.getCoords(7, 3).empty).toBeFalsy();
  });

  test("places the carrier vertically to take 5 cells", () => {
    let testBoard = gameboard();
    testBoard.placeShip("carrier", "vertical", 3, 3);
    expect(testBoard.getCoords(3, 3).empty).toBeFalsy();
    expect(testBoard.getCoords(3, 4).empty).toBeFalsy();
    expect(testBoard.getCoords(3, 5).empty).toBeFalsy();
    expect(testBoard.getCoords(3, 6).empty).toBeFalsy();
    expect(testBoard.getCoords(3, 7).empty).toBeFalsy();
  });

  test("places the cruiser vertically to take 3 cells", () => {
    let testBoard = gameboard();
    testBoard.placeShip("cruiser", "vertical", 3, 3);
    expect(testBoard.getCoords(3, 3).empty).toBeFalsy();
    expect(testBoard.getCoords(3, 4).empty).toBeFalsy();
    expect(testBoard.getCoords(3, 5).empty).toBeFalsy();
  });
});

describe("Throws error on invalid coordinates", () => {
  let testBoard = gameboard();

  test("if x or y are greater than 10", () => {
    expect(() => testBoard.placeShip("carrier", "horizontal", 11, 5)).toThrow(
      "Either x or y are not valid coordinates"
    );
  });

  test("Throws error if ship length causes horizontal overflow", () => {
    expect(() => testBoard.placeShip("carrier", "horizontal", 8, 8)).toThrow(
      "Ship is too long for these coordinates"
    );
  });

  test("Throws error if ship length causes vertical overflow", () => {
    expect(() => testBoard.placeShip("carrier", "vertical", 8, 8)).toThrow(
      "Ship is too long for these coordinates"
    );
  });
});
