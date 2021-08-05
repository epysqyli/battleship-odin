import React from "react";
import "../styles/cell.scss";

const Cell = (props) => {
  const cell = props.coords;
  if (cell.ship) {
    return (
      <div className="cell ship">
        {cell.x}x {cell.y}y
      </div>
    );
  } else {
    return (
      <div className="cell">
        {cell.x}x {cell.y}y
      </div>
    );
  }
};

export default Cell;
