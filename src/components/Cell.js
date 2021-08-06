import React from "react";
import "../styles/cell.scss";

const Cell = (props) => {
  const cell = props.coords;
  const onCellClicked = props.onCellClicked;
  // const owner = props.owner;

  if (cell.ship) {
    return <div className="cell ship"></div>;
  } else {
    return <div className="cell" onClick={onCellClicked}></div>;
  }
};

export default Cell;
