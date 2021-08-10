import gameboard from "../lib/gameboard";
import createPlayer from "../lib/player";

test("Gameboard has a 10x10 board with 100 cells", () => {
  const testBoard = gameboard();
  expect(testBoard.board.length).toBe(100);
});

test("Empty coords cell should have null ship property", () => {
  const player = createPlayer("player");
  let testBoard = player.playerBoard;
  expect(testBoard.board[25].ship).toBeNull();
});

describe("places the ships according to ship type and given coords", () => {
  test("places the carrier horizontally to take 5 cells", () => {
    const player = createPlayer("player");
    let testBoard = player.playerBoard;
    testBoard.placeShip("carrier", "horizontal", 3, 3);
    expect(testBoard.getCoords(3, 3).ship.name).toEqual("carrier");
    expect(testBoard.getCoords(4, 3).ship.name).toEqual("carrier");
    expect(testBoard.getCoords(5, 3).ship.name).toEqual("carrier");
    expect(testBoard.getCoords(6, 3).ship.name).toEqual("carrier");
    expect(testBoard.getCoords(7, 3).ship.name).toEqual("carrier");
  });

  test("places the carrier vertically to take 5 cells", () => {
    const player = createPlayer("player");
    let testBoard = player.playerBoard;
    testBoard.placeShip("carrier", "vertical", 3, 3);
    expect(testBoard.getCoords(3, 3).ship.name).toEqual("carrier");
    expect(testBoard.getCoords(3, 4).ship.name).toEqual("carrier");
    expect(testBoard.getCoords(3, 5).ship.name).toEqual("carrier");
    expect(testBoard.getCoords(3, 6).ship.name).toEqual("carrier");
    expect(testBoard.getCoords(3, 7).ship.name).toEqual("carrier");
  });

  test("places the cruiser vertically to take 3 cells", () => {
    const player = createPlayer("player");
    let testBoard = player.playerBoard;
    testBoard.placeShip("cruiser", "vertical", 3, 3);
    expect(testBoard.getCoords(3, 3).ship.name).toEqual("cruiser");
    expect(testBoard.getCoords(3, 4).ship.name).toEqual("cruiser");
    expect(testBoard.getCoords(3, 5).ship.name).toEqual("cruiser");
  });

  test("places the destroyer horizontally to take 2 cells", () => {
    const player = createPlayer("player");
    let testBoard = player.playerBoard;
    testBoard.placeShip("destroyer", "horizontal", 5, 5);
    expect(testBoard.getCoords(5, 5).ship.name).toEqual("destroyer");
    expect(testBoard.getCoords(6, 5).ship.name).toEqual("destroyer");
  });
});

describe("Throws error on invalid coordinates upon placing ships", () => {
  const player = createPlayer("player");
  let testBoard = player.playerBoard;

  test("if x or y are greater than 10", () => {
    expect(() => testBoard.placeShip("carrier", "horizontal", 11, 5)).toThrow(
      "Either x or y are not valid coordinates"
    );
  });

  test("if ship length causes horizontal overflow", () => {
    expect(() => testBoard.placeShip("carrier", "horizontal", 8, 8)).toThrow(
      "Ship does not fit on the board"
    );
  });

  test("if ship length causes vertical overflow", () => {
    expect(() => testBoard.placeShip("carrier", "vertical", 8, 8)).toThrow(
      "Ship does not fit on the board"
    );
  });

  test("if ship is longer than available ceels", () => {
    testBoard.placeShip("submarine", "vertical", 6, 5);
    expect(() => testBoard.placeShip("carrier", "horizontal", 4, 5)).toThrow(
      "Path is not free"
    );
  });
});

describe("Each gameboard has a reiceive attack method that takes coords and:", () => {
  test("records the missed attack", () => {
    const player = createPlayer("player");
    let testBoard = player.playerBoard;
    testBoard.receiveAttack(5, 5);
    const hitCell = testBoard.getCoords(5, 5);
    expect(hitCell.miss).toBeTruthy();
  });

  test("records the successful attack on the board cell level", () => {
    const player = createPlayer("player");
    let testBoard = player.playerBoard;
    testBoard.placeShip("submarine", "horizontal", 4, 5);
    testBoard.receiveAttack(5, 5);
    const hitCell = testBoard.getCoords(5, 5);
    expect(hitCell.attack).toBeTruthy();
  });

  test("calls the hit function on the attacked ship position horizontally", () => {
    const player = createPlayer("player");
    let testBoard = player.playerBoard;
    testBoard.placeShip("cruiser", "horizontal", 2, 2);
    testBoard.receiveAttack(4, 2);
    const hitCell = testBoard.getCoords(4, 2);
    const hitShip = hitCell.ship;
    expect(hitShip.hitRecord[2]).toEqual("hit");
  });

  test("calls the hit function on the attacked ship position vertically", () => {
    const player = createPlayer("player");
    let testBoard = player.playerBoard;
    testBoard.placeShip("submarine", "vertical", 6, 4);
    testBoard.receiveAttack(6, 5);
    const hitCell = testBoard.getCoords(6, 5);
    const hitShip = hitCell.ship;
    expect(hitShip.hitRecord[1]).toEqual("hit");
  });

  test("throws and error if the cell has already been hit", () => {
    const player = createPlayer("player");
    let testBoard = player.playerBoard;
    testBoard.receiveAttack(4, 4);
    expect(() => testBoard.receiveAttack(4, 4)).toThrow(
      "Cell has already been hit"
    );
  });
});

describe("gameboard reports whether all ships have been sunk", () => {
  test("returns false if not all ships are sunk", () => {
    const player = createPlayer("player");
    let testBoard = player.playerBoard;
    testBoard.placeShip("cruiser", "vertical", 4, 4);
    testBoard.placeShip("submarine", "horizontal", 2, 3);
    expect(testBoard.allSunk()).toBeFalsy();
  });

  test("returns true if all ships are sunk", () => {
    const player = createPlayer("player");
    let testBoard = player.playerBoard;
    testBoard.placeShip("submarine", "horizontal", 2, 3);
    testBoard.receiveAttack(2, 3);
    testBoard.receiveAttack(3, 3);
    testBoard.receiveAttack(4, 3);
    expect(testBoard.allSunk()).toBeTruthy();
  });
});
