import React from "react";
import "../styles/cell.scss";

const Cell = (props) => {
  const cell = props.coords;
  const onCellClicked = props.onCellClicked;
  // const owner = props.owner;

  if (cell.ship) {
    return (
      <div className="cell ship">
        {cell.x}x {cell.y}y
      </div>
    );
  } else {
    return (
      <div className="cell" onClick={onCellClicked}>
        {cell.x}x {cell.y}y
      </div>
    );
  }
};

export default Cell;
