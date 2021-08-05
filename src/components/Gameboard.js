import React from "react";
import Cell from "./Cell";
import "../styles/gameboard.scss";

const Gameboard = (props) => {
  const boardOwner = props.owner;
  const board = props.owner.playerBoard.board;
  return (
    <div className="gameboard-container">
      Gameboard of {boardOwner.playerBoard.owner}
      <div className="gameboard">
        {board.reverse().map((cell, index) => {
          return <Cell coords={cell} key={index}></Cell>
        })}
      </div>
    </div>
  );
};

export default Gameboard;
