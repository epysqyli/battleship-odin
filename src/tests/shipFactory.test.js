import shipFactory from "../lib/shipFactory";

// test ship object length, hit, sunk properties
test("shipFactory returns a ship object with length 5", () => {
  const ship = shipFactory(5);
  expect(ship.length).toBe(5);
  expect(ship.hitRecord).toEqual({
    0: "clear",
    1: "clear",
    2: "clear",
    3: "clear",
    4: "clear",
  });
  expect(ship.sunk).toBeFalsy();
});
