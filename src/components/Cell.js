import React from "react";
import "../styles/cell.scss";

const Cell = (props) => {
  const cell = props.coords;
  const onCellClicked = props.onCellClicked;
  const clickable = props.clickable;

  if (cell.ship) {
    return (
      <div className={clickable ? "cell ship" : "cell ship clickable"}></div>
    );
  } else {
    return (
      <div
        className={clickable ? "cell" : "cell clickable"}
        onClick={onCellClicked}
      ></div>
    );
  }
};

export default Cell;
