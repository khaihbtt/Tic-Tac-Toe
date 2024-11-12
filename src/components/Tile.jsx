import React from 'react';

function Tile({ className, value, onClick, playerTurn }) {
  const hoverClass = value === null && playerTurn ? `${playerTurn.toLowerCase()}-hover` : '';
  return (
    <div onClick={onClick} className={`tile ${className} ${hoverClass}`}>
      {value}
    </div>
  );
}

export default Tile;
