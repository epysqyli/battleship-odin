import React from "react";
import Cell from "./Cell";
import "../styles/gameboard.scss";

const Gameboard = (props) => {
  const boardOwner = props.owner;
  const boardOwnerName = boardOwner.playerBoard.owner;
  const board = boardOwner.playerBoard.board;
  board.sort((a, b) => (a.y > b.y ? 1 : -1));

  return (
    <div className="gameboard-container">
      <h2>{boardOwnerName} gameboard</h2>
      <div className="gameboard">
        {board.reverse().map((cell, index) => {
          return <Cell coords={cell} owner={boardOwnerName} key={index}></Cell>;
        })}
      </div>
    </div>
  );
};

export default Gameboard;
