import { React, useState } from "react";
import { shipFactory } from "../lib/shipFactory";
import "../styles/ships.scss";

const ships = [
  shipFactory("carrier", 5),
  shipFactory("battleship", 4),
  shipFactory("cruiser", 3),
  shipFactory("submarine", 3),
  shipFactory("submarine", 3),
  shipFactory("carrier", 2),
  shipFactory("carrier", 2),
];

const Ships = () => {
  // const [shipsList, setShipsList] = useState();
  return (
    <div className="ships-placement">
      <h2>place your ships on the board</h2>
      <p>Click on the ship first and then on the desired cell</p>
      <div className="ships">
        {/* find a way to display ships efficiently */}
      </div>
    </div>
  );
};

export default Ships;
