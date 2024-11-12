import React from 'react';
import GameState from './GameState';

function GameOver({ gameState }) {
  switch (gameState) {
    case GameState.inProgress:
      return null;
    case GameState.playerOWin:
      return <div className="game-over">Máy Wins!</div>;
    case GameState.playerXWin:
      return <div className="game-over">Player Wins!</div>;
    case GameState.draw:
      return <div className="game-over">It's a Draw!</div>;
    default:
      return null;
  }
}

export default GameOver;
