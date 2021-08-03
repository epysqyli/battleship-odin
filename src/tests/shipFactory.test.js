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

test("shipFactory returns a ship object with length 5", () => {
  const ship = shipFactory(5);
  expect(ship.length).toBe(5);
  expect(ship.sunk).toBeFalsy();
});

test("hit marks a position as 'hit' from its  previous clear state", () => {
  const ship = shipFactory(5);
  ship.hit(3);
  expect(ship.hitRecord[3]).toEqual("hit");
});

test("isSunk returns true if all hitRecord properties are set to 'hit'", () => {
  const ship = shipFactory(2);
  ship.hit(0);
  ship.hit(1);
  expect(ship.isSunk()).toBeTruthy();
});
