import gameboard from "../lib/gameboard";

test("Gameboard has a 10x10 board with 100 cells", () => {
  const board = gameboard();
  expect(board.length).toBe(100);
});
