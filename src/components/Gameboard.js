import { React, useEffect } from "react";
import Cell from "./Cell";
import "../styles/gameboard.scss";

const Gameboard = (props) => {
  const boardOwner = props.owner;
  const boardOwnerName = boardOwner.playerBoard.owner;
  const board = boardOwner.playerBoard.board;
  const getCellInfo = props.getCellInfo;
  const clickable = props.clickable;
  const firstStage = props.firstStage;
  board.sort((a, b) => (a.y > b.y ? 1 : -1));

  return (
    <div className="gameboard-container">
      <h2>{boardOwnerName} gameboard</h2>
      <div className="gameboard">
        {board.reverse().map((cell, index) => {
          return (
            <Cell
              coords={cell}
              owner={boardOwnerName}
              clickable={clickable}
              firstStage={firstStage}
              onCellClicked={() => getCellInfo(cell)}
              key={index}
            ></Cell>
          );
        })}
      </div>
    </div>
  );
};

export default Gameboard;
