import { React, useState, useEffect } from "react";
import { shipFactory } from "../lib/shipFactory";
import "../styles/ships.scss";

const Ships = (props) => {
  const [ships, setShips] = useState([
    { unit: shipFactory("carrier", 5), active: false, placed: false },
    { unit: shipFactory("battleship", 4), active: false, placed: false },
    { unit: shipFactory("cruiser", 3), active: false, placed: false },
    { unit: shipFactory("submarine", 3), active: false, placed: false },
    { unit: shipFactory("submarine", 3), active: false, placed: false },
    { unit: shipFactory("destroyer", 2), active: false, placed: false },
    { unit: shipFactory("destroyer", 2), active: false, placed: false },
  ]);
  const chooseShip = props.chooseShip;
  const hideShip = props.hideShip;

  const removeShip = (shipState, shipIndex) => {
    let newShips = [...ships];
    newShips[shipIndex].placed = shipState;
    setShips(newShips);
  };

  useEffect(() => {
    if (hideShip) removeShip(hideShip[0], hideShip[1]);
  }, [hideShip]);

  return (
    <div className="ships-placement">
      <h2>place your ships on the board</h2>
      <p>Click on the ship first and then on the desired cell</p>
      <div className="ships">
        {ships.map((ship, index) => {
          if (ship.placed) {
            return null;
          } else {
            return (
              <div
                className={
                  ship.active
                    ? "ship-container selected-ship"
                    : "ship-container"
                }
                onClick={() => {
                  let newShips = [...ships];
                  newShips.map((ship) => (ship.active = false));
                  setShips(newShips);
                  newShips = [...ships];
                  newShips[index] = {
                    unit: shipFactory(ship.unit.name, ship.unit.length),
                    active: true,
                  };
                  setShips(newShips);
                  chooseShip(ship.unit, index);
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
          }
        })}
      </div>
    </div>
  );
};

export default Ships;

// how to remove already placed ships from the player's choice?
