const buildHitRecord = (shipLength) => {
  let hitRecord = {};
  for ( let i = 0; i < shipLength; i++) {
    hitRecord[i] = "clear";
  }
  return hitRecord;
};

const shipFactory = (length) => {
  const hitRecord = buildHitRecord(length); 
  return { length, hitRecord , sunk: false };
};

export default shipFactory;
