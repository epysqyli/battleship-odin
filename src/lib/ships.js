import { shipFactory } from "./shipFactory";

const ships = [
  { carrier: shipFactory("carrier", 5, 1) },
  { battleship: shipFactory("battleship", 4, 1) },
  { cruiser: shipFactory("cruiser", 3, 1) },
  { submarine: shipFactory("submarine", 3, 2) },
  { destroyer: shipFactory("destroyer", 2, 2) },
];

export default ships;