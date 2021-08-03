const buildHitRecord = (shipLength) => {
  let hitRecord = {};
  for (let i = 0; i < shipLength; i++) {
    hitRecord[i] = "clear";
  }
  return hitRecord;
};

function hit(pos) {
  this.hitRecord[pos] = "hit";
}

function isSunk() {
  if (Object.values(this.hitRecord).every((pos) => pos === "hit")) {
    return true;
  } else {
    return false;
  }
}

const shipFactory = (name, length) => {
  const hitRecord = buildHitRecord(length);
  return { name, length, hitRecord, sunk: false, hit, isSunk };
};

export { buildHitRecord, shipFactory };
