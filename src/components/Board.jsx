import React from 'react';
import Tile from './Tile';

function Board({ tiles, onTileClick, playerTurn, strikeClass }) {
  return (
    <div className="board">
      {tiles.map((tile, index) => (
        <Tile
          key={index}
          value={tile}
          onClick={() => onTileClick(index)}
          className={`tile ${index % 3 === 2 ? '' : 'right-border'} ${index >= 6 ? '' : 'bottom-border'}`}
          playerTurn={playerTurn}
        />
      ))}
      <div className={`strike ${strikeClass}`} />
    </div>
  );
}

export default Board;
