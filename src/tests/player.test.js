import createPlayer from "../lib/player";

test("creates a player object with an associated gameboard having the player's name as attribute", () => {
  const bobby = createPlayer("bobby");
  expect(bobby.playerBoard.owner).toEqual("bobby");
});
