import React from "react";
import "../styles/cell.scss";

const Cell = (props) => {
  const cell = props.coords;
  const onCellClicked = props.onCellClicked;
  const clickable = props.clickable;

  if (cell.ship) {
    return (
      <div
        className={clickable ? "cell ship" : "cell ship clickable"}
        onClick={onCellClicked}
      >{cell.x} {cell.y}</div>
    );
  } else {
    return (
      <div
        className={clickable ? "cell" : "cell clickable"}
        onClick={onCellClicked}
      >{cell.x} {cell.y}</div>
    );
  }
};

export default Cell;
