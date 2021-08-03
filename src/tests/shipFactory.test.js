import { buildHitRecord, shipFactory } from "../lib/shipFactory";

test("returns an all clear hitRecord object based on length", () => {
  expect(buildHitRecord(5)).toEqual({
    0: "clear",
    1: "clear",
    2: "clear",
    3: "clear",
    4: "clear",
  });
});

test("hit marks a position as 'hit' from its  previous clear state", () => {
  const ship = shipFactory(5);
  ship.hit(3);
  expect(ship.hitRecord[3]).toEqual("hit");
})

test("shipFactory returns a ship object with length 5", () => {
  const ship = shipFactory(5);
  expect(ship.length).toBe(5);
  expect(ship.sunk).toBeFalsy();
});
