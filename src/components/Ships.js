import React from "react";
import "../styles/ships.scss";

const Ships = () => {
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
