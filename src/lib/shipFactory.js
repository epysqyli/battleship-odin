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

const shipFactory = (length) => {
  const hitRecord = buildHitRecord(length);
  return { length, hitRecord, sunk: false, hit };
};

export { buildHitRecord, shipFactory };
