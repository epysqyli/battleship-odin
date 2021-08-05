import React from "react";

const Gameboard = (props) => {
  const boardOwner = props.owner;
  return <div>this is the gameboard of {boardOwner.playerBoard.owner}</div>;
};

export default Gameboard;
