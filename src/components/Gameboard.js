import React from "react";
import Cell from "./Cell";
import "../styles/gameboard.scss";

const Gameboard = (props) => {
  const boardOwner = props.owner;
  const board = props.owner.playerBoard.board;
  board.sort((a, b) => a.y > b.y ? 1 : -1);
  return (
    <div className="gameboard-container">
      {boardOwner.playerBoard.owner} gameboard
      <div className="gameboard">
        {board.reverse().map((cell, index) => {
          return <Cell coords={cell} key={index}></Cell>;
        })}
      </div>
    </div>
  );
};

export default Gameboard;
