import { shipFactory } from "./shipFactory";

const ships = [
  { carrier: shipFactory("carrier", 5) },
  { battleship: shipFactory("battleship", 4) },
  { cruiser: shipFactory("cruiser", 3) },
  { submarine: shipFactory("submarine", 3) },
  { destroyer: shipFactory("destroyer", 2) },
];

export default ships;