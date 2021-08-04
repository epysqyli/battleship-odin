
const buildHitRecord = (shipLength) => {
  let hitRecord = {};
  for (let i = 0; i < shipLength; i++) {
    hitRecord[i] = "clear";
  }
  return hitRecord;
};

const shipFactory = (name, length, quantity) => {
  const hitRecord = buildHitRecord(length);

  const hit = (pos) => {
    hitRecord[pos] = "hit";
  };

  const isSunk = () => {
    if (Object.values(hitRecord).every((pos) => pos === "hit")) {
      return true;
    } else {
      return false;
    }
  };
  return {
    name,
    length,
    direction: null,
    start: null,
    quantity,
    hitRecord,
    sunk: false,
    hit,
    isSunk,
  };
};

export { buildHitRecord, shipFactory };
