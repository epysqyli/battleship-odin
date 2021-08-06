import { React, useState } from "react";
import { shipFactory } from "../lib/shipFactory";
import "../styles/ships.scss";

const Ships = (props) => {
  // const [ships] = useState([
  //   shipFactory("carrier", 5),
  //   shipFactory("battleship", 4),
  //   shipFactory("cruiser", 3),
  //   shipFactory("submarine", 3),
  //   shipFactory("submarine", 3),
  //   shipFactory("destroyer", 2),
  //   shipFactory("destroyer", 2),
  // ]);

  const [ships, setShips] = useState([
    { unit: shipFactory("carrier", 5), active: false },
    { unit: shipFactory("battleship", 4), active: false },
    { unit: shipFactory("cruiser", 3), active: false },
    { unit: shipFactory("submarine", 3), active: false },
    { unit: shipFactory("submarine", 3), active: false },
    { unit: shipFactory("destroyer", 2), active: false },
    { unit: shipFactory("destroyer", 2), active: false },
  ]);

  const chooseShip = props.chooseShip;

  return (
    <div className="ships-placement">
      <h2>place your ships on the board</h2>
      <p>Click on the ship first and then on the desired cell</p>
      <div className="ships">
        {ships.map((ship, index) => {
          return (
            <div
              className={
                ship.active ? "ship-container selected-ship" : "ship-container"
              }
              onClick={() => {
                let newShips = [...ships];
                newShips[index] = {
                  unit: shipFactory(ship.unit.name, ship.unit.length),
                  active: true,
                };
                setShips(newShips);
                chooseShip(ship.unit);
              }}
              key={index}
            >
              <div className="ship-name">{ship.unit.name}</div>
              <div className="unit-container">
                {[...Array(ship.unit.length)].map((el, index) => {
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
