import React from "react";
import "../styles/cell.scss";

const Cell = (props) => {
  const cell = props.coords;
  const owner = props.owner;

  const showCellInfo = (clickedCell, cellOwner) => {
    console.log(clickedCell);
    console.log(cellOwner);
  };

  if (cell.ship) {
    return (
      <div className="cell ship" onClick={() => showCellInfo(cell, owner)}>
        {cell.x}x {cell.y}y
      </div>
    );
  } else {
    return (
      <div className="cell" onClick={() => showCellInfo(cell, owner)}>
        {cell.x}x {cell.y}y
      </div>
    );
  }
};

export default Cell;
