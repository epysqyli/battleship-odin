import { React, useState } from "react";
import { shipFactory } from "../lib/shipFactory";
import "../styles/ships.scss";

const Ships = (props) => {
  const [ships] = useState([
    shipFactory("carrier", 5),
    shipFactory("battleship", 4),
    shipFactory("cruiser", 3),
    shipFactory("submarine", 3),
    shipFactory("submarine", 3),
    shipFactory("destroyer", 2),
    shipFactory("destroyer", 2),
  ]);

  const chooseShip = props.chooseShip;

  return (
    <div className="ships-placement">
      <h2>place your ships on the board</h2>
      <p>Click on the ship first and then on the desired cell</p>
      <div className="ships">
        {ships.map((ship, index) => {
          return (
            <div className="ship-container" onClick={() => chooseShip(ship)} key={index}>
              <div className="ship-name">{ship.name}</div>
              <div className="unit-container">
                {[...Array(ship.length)].map((el, index) => {
                  return <div className="unit-cell" key={index}></div>;
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Ships;
