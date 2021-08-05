import React from "react";
import "../styles/cell.scss";

const Cell = (props) => {
  const cell = props.coords;
  return (
    <div className="cell">
      {cell.x}x - {cell.y}y
    </div>
  );
};

export default Cell;
