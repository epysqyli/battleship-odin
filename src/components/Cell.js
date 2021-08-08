import React from "react";
import "../styles/cell.scss";

const Cell = (props) => {
  const cell = props.coords;
  const onCellClicked = props.onCellClicked;
  const clickable = props.clickable;
  const firstStage = props.firstStage;

  if (!firstStage) {
    if (cell.ship) {
      return (
        <div
          className={clickable ? "cell ship" : "cell ship clickable"}
          onClick={onCellClicked}
        ></div>
      );
    } else {
      return (
        <div
          className={clickable ? "cell" : "cell clickable"}
          onClick={onCellClicked}
        ></div>
      );
    }
  } else {
    if (cell.ship) {
      return (
        <div
          className={cell.attack ? "cell hit" : "cell clickable"}
          onClick={onCellClicked}
        ></div>
      );
    } else {
      return (
        <div
          className={cell.miss ? "cell miss" : "cell clickable"}
          onClick={onCellClicked}
        ></div>
      );
    }
  }
};

export default Cell;
