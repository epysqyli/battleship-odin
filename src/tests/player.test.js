import createPlayer from "../lib/player";

test("creates a player object with an associated gameboard having the player's name as attribute", () => {
  const bobby = createPlayer("bobby");
  expect(bobby.playerBoard.owner).toEqual("bobby");
});

test("sending attacks to the enemy gameboard changes the enemy's board state", () => {
  const bobby = createPlayer("bobby");
  const jimmy = createPlayer("jimmy");
  bobby.attack(4, 5, jimmy.playerBoard);
  expect(jimmy.playerBoard.getCoords(4, 5).miss).toBeTruthy();
})
